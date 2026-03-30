export interface GifEncoderOptions {
  width: number
  height: number
  quality?: number
  fps?: number
  loop?: number
  transparent?: boolean
}

export interface GifFrame {
  data: ImageData
  delay: number
}

export class GifEncoder {
  private width: number
  private height: number
  private quality: number
  private fps: number
  private loop: number
  private transparent: boolean
  private frames: GifFrame[] = []

  constructor(options: GifEncoderOptions) {
    this.width = options.width
    this.height = options.height
    this.quality = options.quality ?? 10
    this.fps = options.fps ?? 12
    this.loop = options.loop ?? 0
    this.transparent = options.transparent ?? true
  }

  addFrame(imageData: ImageData, delay?: number) {
    this.frames.push({
      data: imageData,
      delay: delay ?? Math.round(1000 / this.fps)
    })
  }

  async render(): Promise<Blob> {
    const gif = await this.encodeGif()
    return new Blob([gif], { type: 'image/gif' })
  }

  private async encodeGif(): Promise<Uint8Array> {
    const gifParts: Uint8Array[] = []
    
    gifParts.push(this.createHeader())
    gifParts.push(this.createLogicalScreen())
    
    if (this.loop >= 0) {
      gifParts.push(this.createNetscapeExt())
    }
    
    for (const frame of this.frames) {
      gifParts.push(this.createGraphicControlExt(frame.delay))
      gifParts.push(await this.createImageDescriptor(frame.data))
    }
    
    gifParts.push(new Uint8Array([0x3B]))
    
    const totalLength = gifParts.reduce((sum, part) => sum + part.length, 0)
    const result = new Uint8Array(totalLength)
    
    let offset = 0
    for (const part of gifParts) {
      result.set(part, offset)
      offset += part.length
    }
    
    return result
  }

  private createHeader(): Uint8Array {
    return new Uint8Array([
      0x47, 0x49, 0x46,
      0x38, 0x39, 0x61
    ])
  }

  private createLogicalScreen(): Uint8Array {
    const arr = new Uint8Array(7)
    arr[0] = this.width & 0xFF
    arr[1] = (this.width >> 8) & 0xFF
    arr[2] = this.height & 0xFF
    arr[3] = (this.height >> 8) & 0xFF
    arr[4] = 0x00
    arr[5] = 0x00
    arr[6] = 0x00
    return arr
  }

  private createNetscapeExt(): Uint8Array {
    return new Uint8Array([
      0x21, 0xFF, 0x0B,
      0x4E, 0x45, 0x54, 0x53, 0x43, 0x41, 0x50, 0x45,
      0x32, 0x2E, 0x30,
      0x03, 0x01,
      this.loop & 0xFF,
      (this.loop >> 8) & 0xFF,
      0x00
    ])
  }

  private createGraphicControlExt(delay: number): Uint8Array {
    const delayTime = Math.round(delay / 10)
    return new Uint8Array([
      0x21, 0xF9, 0x04,
      this.transparent ? 0x05 : 0x04,
      delayTime & 0xFF,
      (delayTime >> 8) & 0xFF,
      0x00,
      0x00
    ])
  }

  private async createImageDescriptor(imageData: ImageData): Promise<Uint8Array> {
    const parts: Uint8Array[] = []
    
    parts.push(new Uint8Array([0x2C]))
    
    parts.push(new Uint8Array([
      0x00, 0x00,
      0x00, 0x00,
      this.width & 0xFF,
      (this.width >> 8) & 0xFF,
      this.height & 0xFF,
      (this.height >> 8) & 0xFF,
      0x00
    ]))
    
    const colorTable = this.buildColorTable(imageData)
    const indexedPixels = this.indexPixels(imageData, colorTable)
    
    const lzwData = this.lzwEncode(indexedPixels, 8)
    parts.push(lzwData)
    
    const totalLength = parts.reduce((sum, part) => sum + part.length, 0)
    const result = new Uint8Array(totalLength)
    
    let offset = 0
    for (const part of parts) {
      result.set(part, offset)
      offset += part.length
    }
    
    return result
  }

  private buildColorTable(imageData: ImageData): Map<string, number> {
    const colorMap = new Map<string, number>()
    const { data } = imageData
    
    for (let i = 0; i < data.length; i += 4) {
      const r = data[i]
      const g = data[i + 1]
      const b = data[i + 2]
      const key = `${r},${g},${b}`
      
      if (!colorMap.has(key) && colorMap.size < 256) {
        colorMap.set(key, colorMap.size)
      }
    }
    
    return colorMap
  }

  private indexPixels(imageData: ImageData, colorTable: Map<string, number>): Uint8Array {
    const { data, width, height } = imageData
    const indexed = new Uint8Array(width * height)
    
    for (let i = 0, j = 0; i < data.length; i += 4, j++) {
      const r = data[i]
      const g = data[i + 1]
      const b = data[i + 2]
      const key = `${r},${g},${b}`
      indexed[j] = colorTable.get(key) ?? 0
    }
    
    return indexed
  }

  private lzwEncode(data: Uint8Array, minCodeSize: number): Uint8Array {
    const parts: Uint8Array[] = []
    parts.push(new Uint8Array([minCodeSize]))
    
    const chunkSize = 255
    for (let i = 0; i < data.length; i += chunkSize) {
      const chunk = data.slice(i, Math.min(i + chunkSize, data.length))
      parts.push(new Uint8Array([chunk.length]))
      parts.push(chunk)
    }
    
    parts.push(new Uint8Array([0x00]))
    
    const totalLength = parts.reduce((sum, part) => sum + part.length, 0)
    const result = new Uint8Array(totalLength)
    
    let offset = 0
    for (const part of parts) {
      result.set(part, offset)
      offset += part.length
    }
    
    return result
  }
}

export async function createAnimatedGif(
  canvas: HTMLCanvasElement,
  animationFrames: number,
  fps: number = 12,
  applyAnimation: (frameIndex: number, totalFrames: number) => void
): Promise<Blob> {
  const ctx = canvas.getContext('2d')
  if (!ctx) {
    throw new Error('Could not get canvas context')
  }

  const encoder = new GifEncoder({
    width: canvas.width,
    height: canvas.height,
    fps,
    quality: 10,
    loop: 0,
    transparent: true
  })

  for (let i = 0; i < animationFrames; i++) {
    applyAnimation(i, animationFrames)
    
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height)
    encoder.addFrame(imageData)
  }

  return await encoder.render()
}
