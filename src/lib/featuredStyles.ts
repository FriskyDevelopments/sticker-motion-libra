import type { StickerStyle } from './stickerStyles'
import { stickerStyles } from './stickerStyles'

export type MagicLevel = 'clean' | 'enhanced' | 'intense'
export type SpeedLevel = 'slow' | 'normal' | 'fast'

export interface MagicEnhancement {
  energy: MagicLevel
  speed: SpeedLevel
}

export const defaultEnhancement: MagicEnhancement = {
  energy: 'enhanced',
  speed: 'normal'
}

export const featuredStyles: StickerStyle[] = [
  stickerStyles[0],
  stickerStyles[4],
  stickerStyles[6],
  stickerStyles[10],
  stickerStyles[14],
  stickerStyles[18],
  stickerStyles[22],
  stickerStyles[26],
  stickerStyles[30],
  stickerStyles[34],
  stickerStyles[38],
  stickerStyles[42],
].filter(Boolean)

export function getAnimationMultipliers(enhancement: MagicEnhancement) {
  const energyMultiplier = {
    clean: 0.7,
    enhanced: 1.0,
    intense: 1.4
  }[enhancement.energy]

  const speedMultiplier = {
    slow: 1.5,
    normal: 1.0,
    fast: 0.65
  }[enhancement.speed]

  return {
    scale: energyMultiplier,
    duration: speedMultiplier,
    intensity: energyMultiplier
  }
}

export function getEnergyLabel(level: MagicLevel): string {
  return {
    clean: 'Soft & Subtle',
    enhanced: 'Balanced Magic',
    intense: 'Maximum Energy'
  }[level]
}

export function getSpeedLabel(level: SpeedLevel): string {
  return {
    slow: 'Gentle Flow',
    normal: 'Smooth Motion',
    fast: 'Quick & Snappy'
  }[level]
}
