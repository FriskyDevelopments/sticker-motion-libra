import { MotionPreset } from './motionPresets'
import type { StickerStyle } from './stickerStyles'
import { createAnimatedGif } from './gifEncoder'

export type ExportFormat = 'json' | 'typescript' | 'css' | 'framer-motion'
export type StickerExportFormat = 'png' | 'webp' | 'gif' | 'apng'

export function downloadFile(content: string, filename: string, mimeType: string) {
  const blob = new Blob([content], { type: mimeType })
  const url = URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = url
  link.download = filename
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
  URL.revokeObjectURL(url)
}

export function downloadImageFromDataUrl(dataUrl: string, filename: string) {
  const link = document.createElement('a')
  link.href = dataUrl
  link.download = filename
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
}

export function exportPresetAsJSON(preset: MotionPreset): string {
  return JSON.stringify(preset, null, 2)
}

export function exportPresetAsTypeScript(preset: MotionPreset): string {
  return `import { MotionPreset } from './types'

export const ${toCamelCase(preset.name)}Preset: MotionPreset = ${JSON.stringify(preset, null, 2)}
`
}

export function exportPresetAsCSS(preset: MotionPreset): string {
  const animationName = toKebabCase(preset.name)
  
  let css = `/* ${preset.name} Animation
 * Category: ${preset.category}
 * Emotional Vibe: ${preset.emotionalVibe}
 * Intensity: ${preset.intensity}
 * Loop Style: ${preset.loopStyle}
 */

`

  switch (preset.id) {
    case 'breathing-glow':
      css += `.${animationName} {
  animation: ${animationName} 3s ease-in-out infinite;
}

@keyframes ${animationName} {
  0%, 100% {
    transform: scale(1);
    filter: drop-shadow(0 0 10px currentColor);
    opacity: 0.3;
  }
  50% {
    transform: scale(1.15);
    filter: drop-shadow(0 0 25px currentColor);
    opacity: 0.7;
  }
}`
      break

    case 'flicker':
      css += `.${animationName} {
  animation: ${animationName} 0.15s steps(2) infinite;
}

@keyframes ${animationName} {
  0%, 40%, 60%, 100% { opacity: 1; }
  20%, 50%, 80% { opacity: 0.7; }
}`
      break

    case 'shimmer':
      css += `.${animationName} {
  position: relative;
  overflow: hidden;
}

.${animationName}::after {
  content: '';
  position: absolute;
  top: -50%;
  left: -50%;
  width: 200%;
  height: 200%;
  background: linear-gradient(
    45deg,
    transparent 30%,
    rgba(255, 255, 255, 0.3) 50%,
    transparent 70%
  );
  animation: ${animationName}-sweep 5s ease-in-out infinite;
}

@keyframes ${animationName}-sweep {
  0%, 100% { transform: translateX(-100%); }
  20%, 80% { transform: translateX(-100%); }
  50% { transform: translateX(100%); }
}`
      break

    case 'pulse-ring':
      css += `.${animationName} {
  position: relative;
}

.${animationName}::before {
  content: '';
  position: absolute;
  inset: -5%;
  border: 2px solid currentColor;
  border-radius: inherit;
  animation: ${animationName} 1.5s ease-out infinite;
}

@keyframes ${animationName} {
  0% {
    transform: scale(1);
    opacity: 0.8;
  }
  100% {
    transform: scale(2.5);
    opacity: 0;
  }
}`
      break

    case 'spin':
      css += `.${animationName} {
  animation: ${animationName} 4s linear infinite;
}

@keyframes ${animationName} {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}`
      break

    case 'wobble':
      css += `.${animationName} {
  animation: ${animationName} 2s ease-in-out infinite;
}

@keyframes ${animationName} {
  0%, 100% { transform: rotate(0deg); }
  25% { transform: rotate(15deg); }
  75% { transform: rotate(-15deg); }
}`
      break

    case 'bounce':
      css += `.${animationName} {
  animation: ${animationName} 1.2s ease-out infinite;
}

@keyframes ${animationName} {
  0%, 100% { 
    transform: translateY(0) scaleY(1);
  }
  50% { 
    transform: translateY(-15px) scaleY(1);
  }
  60% {
    transform: translateY(0) scaleY(0.9);
  }
}`
      break

    case 'heartbeat':
      css += `.${animationName} {
  animation: ${animationName} 1.5s ease-in-out infinite;
}

@keyframes ${animationName} {
  0%, 40%, 100% { transform: scale(1); }
  10% { transform: scale(1.15); }
  20% { transform: scale(1); }
  30% { transform: scale(1.08); }
}`
      break

    case 'sway':
      css += `.${animationName} {
  animation: ${animationName} 3.5s ease-in-out infinite;
}

@keyframes ${animationName} {
  0%, 100% { transform: translateX(0) rotate(0deg); }
  25% { transform: translateX(8px) rotate(5deg); }
  75% { transform: translateX(-8px) rotate(-5deg); }
}`
      break

    default:
      css += `.${animationName} {
  /* Custom implementation required */
  /* See technical notes: ${preset.technicalNotes || 'N/A'} */
}

@keyframes ${animationName} {
  /* Define keyframes based on preset specifications */
}`
  }

  return css
}

export function exportPresetAsFramerMotion(preset: MotionPreset): string {
  const componentName = toPascalCase(preset.name)
  
  let variants = {}
  let transition = {}

  switch (preset.id) {
    case 'breathing-glow':
      variants = {
        initial: { scale: 1, opacity: 0.3 },
        animate: { scale: 1.15, opacity: 0.7 }
      }
      transition = {
        duration: 3,
        repeat: Infinity,
        repeatType: 'reverse',
        ease: 'easeInOut'
      }
      break

    case 'spin':
      variants = {
        animate: { rotate: 360 }
      }
      transition = {
        duration: 4,
        repeat: Infinity,
        ease: 'linear'
      }
      break

    case 'bounce':
      variants = {
        animate: {
          y: [0, -15, 0],
          scaleY: [1, 1, 0.9, 1]
        }
      }
      transition = {
        duration: 1.2,
        repeat: Infinity,
        ease: 'easeOut'
      }
      break

    case 'heartbeat':
      variants = {
        animate: {
          scale: [1, 1.15, 1, 1.08, 1]
        }
      }
      transition = {
        duration: 1.5,
        repeat: Infinity,
        ease: 'easeInOut',
        times: [0, 0.1, 0.2, 0.3, 0.4]
      }
      break

    case 'wobble':
      variants = {
        animate: {
          rotate: [0, 15, -15, 0]
        }
      }
      transition = {
        duration: 2,
        repeat: Infinity,
        ease: 'easeInOut'
      }
      break

    case 'elastic-pop':
      variants = {
        initial: { scale: 0 },
        animate: { scale: [0, 1.3, 0.9, 1] }
      }
      transition = {
        duration: 0.6,
        ease: 'easeOut'
      }
      break

    default:
      variants = {
        animate: {}
      }
      transition = {
        duration: 1,
        repeat: Infinity
      }
  }

  return `import { motion } from 'framer-motion'

/**
 * ${preset.name}
 * ${preset.emotionalVibe}
 * 
 * Category: ${preset.category}
 * Intensity: ${preset.intensity}
 * Loop Style: ${preset.loopStyle}
 */

const ${componentName}Variants = ${JSON.stringify(variants, null, 2)}

const ${componentName}Transition = ${JSON.stringify(transition, null, 2)}

export function ${componentName}({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      variants={${componentName}Variants}
      animate="animate"
      transition={${componentName}Transition}
    >
      {children}
    </motion.div>
  )
}

// Usage:
// <${componentName}>
//   <YourContent />
// </${componentName}>
`
}

export function downloadPreset(preset: MotionPreset, format: ExportFormat) {
  let content: string
  let filename: string
  let mimeType: string

  const baseName = toKebabCase(preset.name)

  switch (format) {
    case 'json':
      content = exportPresetAsJSON(preset)
      filename = `${baseName}-preset.json`
      mimeType = 'application/json'
      break
    case 'typescript':
      content = exportPresetAsTypeScript(preset)
      filename = `${baseName}-preset.ts`
      mimeType = 'text/typescript'
      break
    case 'css':
      content = exportPresetAsCSS(preset)
      filename = `${baseName}-animation.css`
      mimeType = 'text/css'
      break
    case 'framer-motion':
      content = exportPresetAsFramerMotion(preset)
      filename = `${componentName(preset.name)}.tsx`
      mimeType = 'text/typescript'
      break
  }

  downloadFile(content, filename, mimeType)
}

function toKebabCase(str: string): string {
  return str
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

function toCamelCase(str: string): string {
  return str
    .replace(/[^a-zA-Z0-9]+(.)/g, (_, chr) => chr.toUpperCase())
    .replace(/^[A-Z]/, (chr) => chr.toLowerCase())
}

function toPascalCase(str: string): string {
  return str
    .replace(/[^a-zA-Z0-9]+(.)/g, (_, chr) => chr.toUpperCase())
    .replace(/^[a-z]/, (chr) => chr.toUpperCase())
}

function componentName(str: string): string {
  return toPascalCase(str)
}

export interface StickerExportOptions {
  format: StickerExportFormat
  quality?: number
  includeMetadata?: boolean
  style?: StickerStyle
}

export async function exportSticker(
  imageDataUrl: string,
  options: StickerExportOptions
): Promise<{ success: boolean; error?: string }> {
  try {
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-').slice(0, -5)
    const styleName = options.style ? toKebabCase(options.style.name) : 'sticker'
    const filename = `stix-magic-${styleName}-${timestamp}.${options.format}`
    
    if (options.format === 'png' || options.format === 'webp') {
      downloadImageFromDataUrl(imageDataUrl, filename)
      return { success: true }
    }
    
    if (options.format === 'gif') {
      const gifBlob = await exportAsAnimatedGif(imageDataUrl, options.style)
      downloadBlob(gifBlob, filename)
      return { success: true }
    }
    
    if (options.format === 'apng') {
      return {
        success: false,
        error: 'APNG export coming soon ✦'
      }
    }
    
    return { success: false, error: 'Unsupported format' }
  } catch (error) {
    console.error('Export error:', error)
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Export failed'
    }
  }
}

async function exportAsAnimatedGif(
  imageDataUrl: string,
  style: StickerStyle | undefined
): Promise<Blob> {
  const canvas = document.createElement('canvas')
  const ctx = canvas.getContext('2d')
  
  if (!ctx) {
    throw new Error('Could not create canvas context')
  }

  const img = new Image()
  await new Promise((resolve, reject) => {
    img.onload = resolve
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
    case 'breathing-glow':
      const glowScale = 1 + Math.sin(t) * 0.08
      ctx.scale(glowScale, glowScale)
      ctx.globalAlpha = 0.7 + Math.sin(t) * 0.3
      break

    case 'spin':
      ctx.rotate(t)
      break

    case 'wobble':
      const wobbleAngle = Math.sin(t * 2) * 0.15
      ctx.rotate(wobbleAngle)
      break

    case 'bounce':
      const bounceY = Math.abs(Math.sin(t)) * -20
      ctx.translate(0, bounceY)
      break

    case 'heartbeat':
      const beatScale = 1 + Math.sin(t * 4) * 0.1
      ctx.scale(beatScale, beatScale)
      break

    case 'sway':
      const swayX = Math.sin(t) * 10
      const swayRotate = Math.sin(t) * 0.05
      ctx.translate(swayX, 0)
      ctx.rotate(swayRotate)
      break

    case 'pulse-ring':
      const pulseScale = 1 + Math.sin(t * 3) * 0.12
      ctx.scale(pulseScale, pulseScale)
      break

    case 'flicker':
      ctx.globalAlpha = Math.random() > 0.3 ? 1 : 0.7
      break

    default:
      break
  }
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

export async function exportStickerPack(
  images: string[],
  packName: string
): Promise<{ success: boolean; error?: string }> {
  try {
    if (images.length === 0) {
      return { success: false, error: 'No images to export' }
    }
    
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-').slice(0, -5)
    const zipName = `${toKebabCase(packName)}-pack-${timestamp}.zip`
    
    return {
      success: false,
      error: 'Pack export coming soon ✦'
    }
  } catch (error) {
    console.error('Pack export error:', error)
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Pack export failed'
    }
  }
}
