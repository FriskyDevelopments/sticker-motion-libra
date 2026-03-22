export type MaskType = 
  | 'clean'
  | 'soft'
  | 'glow'
  | 'aura'

export interface MaskConfig {
  type: MaskType
  name: string
  description: string
  cssFilter: string
  edgeStyle: 'sharp' | 'feathered' | 'glowing' | 'diffused'
}

export const maskPresets: Record<MaskType, MaskConfig> = {
  clean: {
    type: 'clean',
    name: 'Clean Cut',
    description: 'Sharp sticker cut with crisp edges',
    cssFilter: 'contrast(1.05) brightness(1.02)',
    edgeStyle: 'sharp'
  },
  soft: {
    type: 'soft',
    name: 'Soft Edge',
    description: 'Gentle feathered edges for smooth blending',
    cssFilter: 'blur(0.5px) contrast(0.98)',
    edgeStyle: 'feathered'
  },
  glow: {
    type: 'glow',
    name: 'Glow Edge',
    description: 'Luminous edges with outer glow',
    cssFilter: 'drop-shadow(0 0 8px oklch(0.65 0.20 160)) brightness(1.1)',
    edgeStyle: 'glowing'
  },
  aura: {
    type: 'aura',
    name: 'Aura Edge',
    description: 'Diffused atmospheric halo around subject',
    cssFilter: 'drop-shadow(0 0 16px oklch(0.75 0.15 280)) blur(0.3px) brightness(1.15)',
    edgeStyle: 'diffused'
  }
}

export function applyMask(imageElement: HTMLImageElement, maskType: MaskType): string {
  const config = maskPresets[maskType]
  
  const canvas = document.createElement('canvas')
  const ctx = canvas.getContext('2d')
  if (!ctx) throw new Error('Canvas context not available')

  canvas.width = imageElement.naturalWidth || imageElement.width
  canvas.height = imageElement.naturalHeight || imageElement.height

  ctx.filter = config.cssFilter
  ctx.drawImage(imageElement, 0, 0, canvas.width, canvas.height)

  return canvas.toDataURL('image/png')
}

export function getMaskStyles(maskType: MaskType): React.CSSProperties {
  const config = maskPresets[maskType]
  
  return {
    filter: config.cssFilter,
  }
}

export function applyStyleToImage(
  imageDataUrl: string,
  maskType: MaskType,
  motionId: string
): Promise<string> {
  return new Promise((resolve, reject) => {
    const img = new Image()
    img.crossOrigin = 'anonymous'
    
    img.onload = () => {
      try {
        const maskedDataUrl = applyMask(img, maskType)
        resolve(maskedDataUrl)
      } catch (error) {
        reject(error)
      }
    }
    
    img.onerror = () => {
      reject(new Error('Failed to load image'))
    }
    
    img.src = imageDataUrl
  })
}
