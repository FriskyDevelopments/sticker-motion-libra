import type { BaseStyle, AssetCompatibility } from './styleLibrary'
import type { Overlay } from './overlaySystem'
import { motionPresets } from './motionPresets'
import type { MotionPreset } from './motionPresets'

export interface StyleCombo {
  id: string
  name: string
  baseStyle: BaseStyle
  overlay?: Overlay
  motion: MotionPreset
  description: string
  intensity: 'subtle' | 'medium' | 'intense'
  previewEmoji: string
}

export interface ComboRule {
  isValid: boolean
  reason?: string
  recommendation?: string
}

export function validateCombo(
  baseStyle: BaseStyle,
  overlay: Overlay | null,
  motion: MotionPreset
): ComboRule {
  if (overlay && !baseStyle.compatibleOverlays.includes(overlay.id)) {
    return {
      isValid: false,
      reason: `${overlay.name} overlay is not compatible with ${baseStyle.name}`,
      recommendation: `Try overlays like: ${baseStyle.compatibleOverlays.slice(0, 2).join(', ')}`
    }
  }

  if (!baseStyle.compatibleMotions.includes(motion.id)) {
    return {
      isValid: false,
      reason: `${motion.name} motion is not compatible with ${baseStyle.name}`,
      recommendation: `Try motions like: ${baseStyle.compatibleMotions.slice(0, 2).join(', ')}`
    }
  }

  if (overlay && !overlay.compatibleStyles.some(family => 
    baseStyle.family === family
  )) {
    return {
      isValid: false,
      reason: `${overlay.name} overlay doesn't work well with ${baseStyle.family} family`,
      recommendation: `This overlay works best with: ${overlay.compatibleStyles.join(', ')}`
    }
  }

  return {
    isValid: true
  }
}

export function createCombo(
  baseStyle: BaseStyle,
  overlay: Overlay | null,
  motion: MotionPreset
): StyleCombo | null {
  const validation = validateCombo(baseStyle, overlay, motion)
  
  if (!validation.isValid) {
    console.warn(`Invalid combo: ${validation.reason}`)
    return null
  }

  const comboIntensity = calculateComboIntensity(baseStyle, overlay, motion)
  const comboName = generateComboName(baseStyle, overlay, motion)
  const comboDescription = generateComboDescription(baseStyle, overlay, motion)

  return {
    id: `${baseStyle.id}-${motion.id}${overlay ? `-${overlay.id}` : ''}`,
    name: comboName,
    baseStyle,
    overlay: overlay || undefined,
    motion,
    description: comboDescription,
    intensity: comboIntensity,
    previewEmoji: baseStyle.previewEmoji
  }
}

function calculateComboIntensity(
  baseStyle: BaseStyle,
  overlay: Overlay | null,
  motion: MotionPreset
): 'subtle' | 'medium' | 'intense' {
  const intensityScores: Record<string, number> = {
    subtle: 1,
    soft: 1,
    medium: 2,
    intense: 3,
    strong: 3
  }

  let totalScore = intensityScores[baseStyle.intensity] || 2
  
  if (overlay) {
    totalScore += intensityScores[overlay.intensity] || 2
  }
  
  totalScore += intensityScores[motion.intensity] || 2

  if (totalScore <= 3) return 'subtle'
  if (totalScore <= 5) return 'medium'
  return 'intense'
}

function generateComboName(
  baseStyle: BaseStyle,
  overlay: Overlay | null,
  motion: MotionPreset
): string {
  if (overlay) {
    return `${baseStyle.name} + ${motion.name} + ${overlay.name}`
  }
  return `${baseStyle.name} + ${motion.name}`
}

function generateComboDescription(
  baseStyle: BaseStyle,
  overlay: Overlay | null,
  motion: MotionPreset
): string {
  const parts = [
    baseStyle.description,
    `with ${motion.name.toLowerCase()} animation`
  ]
  
  if (overlay) {
    parts.push(`and ${overlay.name.toLowerCase()} effect`)
  }
  
  return parts.join(' ')
}

export function generateRecommendedCombos(baseStyle: BaseStyle, count: number = 3): StyleCombo[] {
  const combos: StyleCombo[] = []
  
  const compatibleMotions = motionPresets.filter(m => 
    baseStyle.compatibleMotions.includes(m.id)
  )
  
  for (const motion of compatibleMotions.slice(0, count)) {
    const combo = createCombo(baseStyle, null, motion)
    if (combo) {
      combos.push(combo)
    }
  }
  
  return combos
}

export function exploreComboSpace(
  baseStyles: BaseStyle[],
  overlays: Overlay[],
  motions: MotionPreset[]
): {
  totalPossible: number
  validCombos: number
  exampleCombos: StyleCombo[]
} {
  let validCount = 0
  const exampleCombos: StyleCombo[] = []
  
  for (const style of baseStyles) {
    for (const motion of motions) {
      if (validateCombo(style, null, motion).isValid) {
        validCount++
        
        if (exampleCombos.length < 10) {
          const combo = createCombo(style, null, motion)
          if (combo) exampleCombos.push(combo)
        }
      }
      
      for (const overlay of overlays) {
        if (validateCombo(style, overlay, motion).isValid) {
          validCount++
          
          if (exampleCombos.length < 10) {
            const combo = createCombo(style, overlay, motion)
            if (combo) exampleCombos.push(combo)
          }
        }
      }
    }
  }
  
  const totalPossibleNoOverlay = baseStyles.length * motions.length
  const totalPossibleWithOverlay = baseStyles.length * motions.length * overlays.length
  
  return {
    totalPossible: totalPossibleNoOverlay + totalPossibleWithOverlay,
    validCombos: validCount,
    exampleCombos
  }
}

export interface ComboFilter {
  intensity?: 'subtle' | 'medium' | 'intense'
  styleFamily?: string
  motionCategory?: string
  overlayFamily?: string
  assetCompatibility?: string
}

export function filterCombos(combos: StyleCombo[], filter: ComboFilter): StyleCombo[] {
  return combos.filter(combo => {
    if (filter.intensity && combo.intensity !== filter.intensity) {
      return false
    }
    
    if (filter.styleFamily && combo.baseStyle.family !== filter.styleFamily) {
      return false
    }
    
    if (filter.motionCategory && combo.motion.category !== filter.motionCategory) {
      return false
    }
    
    if (filter.overlayFamily && combo.overlay && combo.overlay.family !== filter.overlayFamily) {
      return false
    }
    
    if (filter.assetCompatibility && 
        !combo.baseStyle.compatibleAssets.includes(filter.assetCompatibility as AssetCompatibility)) {
      return false
    }
    
    return true
  })
}
