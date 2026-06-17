import { createAnimatedGif } from './gifEncoder'
import type { StickerStyle } from './stickerStyles'

export interface BatchExportItem {
  id: string
  image: string
  style: StickerStyle
}

export interface BatchExportOptions {
  format: 'gif' | 'png' | 'webp'
  quality?: number
  onProgress?: (progress: number) => void
}

export interface BatchExportResult {
  success: boolean
  error?: string
  exportedCount?: number
}

export async function exportBatchStickers(
  items: BatchExportItem[],
  options: BatchExportOptions
): Promise<BatchExportResult> {
  try {
    if (items.length === 0) {
      return {
        success: false,
        error: 'No items to export'
      }
    }

    let exported = 0

    for (const item of items) {
      await exportSingleSticker(item, options.format)
      exported++
      
      if (options.onProgress) {
        const progress = (exported / items.length) * 100
        options.onProgress(progress)
      }

      await delay(100)
    }

    return {
      success: true,
      exportedCount: exported
    }
  } catch (error) {
    console.error('Batch export error:', error)
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Batch export failed'
    }
  }
}

async function exportSingleSticker(
  item: BatchExportItem,
  format: 'gif' | 'png' | 'webp'
): Promise<void> {
  const timestamp = new Date().toISOString().replace(/[:.]/g, '-').slice(0, -5)
  const styleName = toKebabCase(item.style.name)
  const filename = `stix-magic-${styleName}-${timestamp}.${format}`

  if (format === 'png' || format === 'webp') {
    downloadImageFromDataUrl(item.image, filename)
    return
  }

  if (format === 'gif') {
    const gifBlob = await createGifFromImage(item.image, item.style)
    downloadBlob(gifBlob, filename)
    return
  }
}

async function createGifFromImage(
  imageDataUrl: string,
  style: StickerStyle
): Promise<Blob> {
  const canvas = document.createElement('canvas')
  const ctx = canvas.getContext('2d')
  
  if (!ctx) {
    throw new Error('Could not create canvas context')
  }

  const img = new Image()
  await new Promise<void>((resolve, reject) => {
    img.onload = () => resolve()
    img.onerror = reject
    img.src = imageDataUrl
  })

  const targetSize = 512
  canvas.width = targetSize
  canvas.height = targetSize

  const totalFrames = 24
  const fps = 12

  const applyAnimationFrame = (frameIndex: number, totalFrames: number) => {
    const progress = frameIndex / totalFrames
    
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    ctx.save()

    const centerX = canvas.width / 2
    const centerY = canvas.height / 2

    ctx.translate(centerX, centerY)

    if (style?.motion) {
      applyMotionToContext(ctx, style.motion, progress)
    }

    const imgSize = targetSize * 0.9
    ctx.drawImage(
      img,
      -imgSize / 2,
      -imgSize / 2,
      imgSize,
      imgSize
    )

    ctx.restore()
  }

  return await createAnimatedGif(canvas, totalFrames, fps, applyAnimationFrame)
}

function applyMotionToContext(
  ctx: CanvasRenderingContext2D,
  motion: { id: string; name: string; behavior: string },
  progress: number
) {
  const t = progress * Math.PI * 2

  switch (motion.id) {
    case 'breathing-glow': {
      const glowScale = 1 + Math.sin(t) * 0.08
      ctx.scale(glowScale, glowScale)
      ctx.globalAlpha = 0.7 + Math.sin(t) * 0.3
      break
    }

    case 'spin':
      ctx.rotate(t)
      break

    case 'wobble': {
      const wobbleAngle = Math.sin(t * 2) * 0.15
      ctx.rotate(wobbleAngle)
      break
    }

    case 'bounce': {
      const bounceY = Math.abs(Math.sin(t)) * -20
      ctx.translate(0, bounceY)
      break
    }

    case 'heartbeat': {
      const beatScale = 1 + Math.sin(t * 4) * 0.1
      ctx.scale(beatScale, beatScale)
      break
    }

    case 'sway': {
      const swayX = Math.sin(t) * 10
      const swayRotate = Math.sin(t) * 0.05
      ctx.translate(swayX, 0)
      ctx.rotate(swayRotate)
      break
    }

    case 'pulse-ring': {
      const pulseScale = 1 + Math.sin(t * 3) * 0.12
      ctx.scale(pulseScale, pulseScale)
      break
    }

    case 'flicker':
      ctx.globalAlpha = Math.random() > 0.3 ? 1 : 0.7
      break

    default:
      break
  }
}

function downloadImageFromDataUrl(dataUrl: string, filename: string) {
  const link = document.createElement('a')
  link.href = dataUrl
  link.download = filename
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
}

function downloadBlob(blob: Blob, filename: string) {
  const url = URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = url
  link.download = filename
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
  URL.revokeObjectURL(url)
}

function toKebabCase(str: string): string {
  return str
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

function delay(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms))
}
