import type { MaskType, VibeCategory, MaskPreset, StickerStyle } from './stickerStyles'

export const featuredStyles: StickerStyle[] = [
  {
    id: 'dream-glow',
    name: 'Dream Glow',
    vibe: 'magic-effects',
    tags: ['Dreamy', 'Soft', 'Magical'],
    mask: {
      type: 'glow',
      name: 'Glow Edge',
      description: 'Luminous edges with outer glow'
    },
    motion: {
      id: 'breathing-glow',
      name: 'Breathing Glow',
      behavior: 'Pulsing radiance that expands and contracts like breathing',
      speed: 'slow',
      energy: 'soft'
    },
    previewEmoji: '🌙',
    description: 'Soft dreamy glow perfect for peaceful, magical stickers',
    conversionPitch: 'Transform into a luminous dream',
    movementPersonality: 'Glows with gentle floating motion',
    intensity: 'subtle',
    bestFor: ['Peaceful', 'Magical', 'Dreamy', 'Wellness']
  },
  
  {
    id: 'neon-pulse',
    name: 'Neon Pulse',
    vibe: 'energy-tech',
    tags: ['Electric', 'Bold', 'Modern'],
    mask: {
      type: 'glow',
      name: 'Glow Edge',
      description: 'Luminous edges with outer glow'
    },
    motion: {
      id: 'pulse-ring',
      name: 'Pulse Ring',
      behavior: 'Radiating rings emanate outward like sonar',
      speed: 'normal',
      energy: 'strong'
    },
    previewEmoji: '⚡',
    description: 'Electric pulsing energy for high-impact stickers',
    conversionPitch: 'Electrify with neon power',
    movementPersonality: 'Pulses with high-energy neon movement',
    intensity: 'intense',
    bestFor: ['Tech', 'Energy', 'Modern', 'Impact']
  },
  
  {
    id: 'mascot-bounce',
    name: 'Mascot Bounce',
    vibe: 'character-motion',
    tags: ['Playful', 'Happy', 'Cute'],
    mask: {
      type: 'soft',
      name: 'Soft Edge',
      description: 'Gentle feathered edges for smooth blending'
    },
    motion: {
      id: 'bounce',
      name: 'Bounce',
      behavior: 'Vertical bounce with squash-and-stretch physics',
      speed: 'normal',
      energy: 'medium'
    },
    previewEmoji: '🎾',
    description: 'Playful bouncing perfect for characters and mascots',
    conversionPitch: 'Add joyful bouncing energy',
    movementPersonality: 'Moves with cheerful bounce and wobble',
    intensity: 'medium',
    bestFor: ['Characters', 'Playful', 'Happy', 'Mascots']
  },
  
  {
    id: 'cosmic-drift',
    name: 'Cosmic Drift',
    vibe: 'atmosphere',
    tags: ['Space', 'Smooth', 'Flowing'],
    mask: {
      type: 'aura',
      name: 'Aura Edge',
      description: 'Diffused atmospheric halo around subject'
    },
    motion: {
      id: 'orbit',
      name: 'Orbit',
      behavior: 'Particles orbit around the sticker perimeter',
      speed: 'slow',
      energy: 'medium',
      secondaryMotion: {
        id: 'cloud-drift',
        name: 'Cloud Drift'
      }
    },
    previewEmoji: '🌍',
    description: 'Celestial orbit effect for space and magical themes',
    conversionPitch: 'Float in cosmic space',
    movementPersonality: 'Drifts with particle trail',
    intensity: 'medium',
    bestFor: ['Space', 'Magic', 'Flowing', 'Celestial']
  },
  
  {
    id: 'glitch-pop',
    name: 'Glitch Pop',
    vibe: 'energy-tech',
    tags: ['Glitch', 'Digital', 'Bold'],
    mask: {
      type: 'clean',
      name: 'Clean Cut',
      description: 'Sharp sticker cut with crisp edges'
    },
    motion: {
      id: 'rgb-glitch',
      name: 'RGB Glitch',
      behavior: 'Color channel separation with random triggers',
      speed: 'fast',
      energy: 'strong'
    },
    previewEmoji: '📺',
    description: 'Digital glitch effect for cyberpunk aesthetics',
    conversionPitch: 'Break into digital glitch',
    movementPersonality: 'Glitch jump with RGB distortion',
    intensity: 'intense',
    bestFor: ['Cyberpunk', 'Digital', 'Tech', 'Glitch']
  },
  
  {
    id: 'shimmer-luxury',
    name: 'Shimmer Luxury',
    vibe: 'magic-effects',
    tags: ['Premium', 'Elegant', 'Polished'],
    mask: {
      type: 'soft',
      name: 'Soft Edge',
      description: 'Gentle feathered edges for smooth blending'
    },
    motion: {
      id: 'shimmer',
      name: 'Shimmer',
      behavior: 'Light sweep across surface like catching reflection',
      speed: 'slow',
      energy: 'soft'
    },
    previewEmoji: '💎',
    description: 'Premium shimmer for luxury and achievement',
    conversionPitch: 'Add premium polish',
    movementPersonality: 'Shimmers with elegant sweep',
    intensity: 'subtle',
    bestFor: ['Luxury', 'Premium', 'Achievement', 'Elegant']
  },
  
  {
    id: 'heartbeat-love',
    name: 'Heartbeat Love',
    vibe: 'character-motion',
    tags: ['Love', 'Cute', 'Emotional'],
    mask: {
      type: 'soft',
      name: 'Soft Edge',
      description: 'Gentle feathered edges for smooth blending'
    },
    motion: {
      id: 'heartbeat',
      name: 'Heartbeat',
      behavior: 'Double-pump rhythm like a heart beating',
      speed: 'normal',
      energy: 'medium'
    },
    previewEmoji: '💗',
    description: 'Sweet rhythmic pulse for romantic stickers',
    conversionPitch: 'Beat with love and warmth',
    movementPersonality: 'Beats with loving rhythm',
    intensity: 'subtle',
    bestFor: ['Love', 'Romance', 'Cute', 'Emotional']
  },
  
  {
    id: 'sparkle-burst',
    name: 'Sparkle Burst',
    vibe: 'atmosphere',
    tags: ['Magic', 'Celebration', 'Sparkles'],
    mask: {
      type: 'aura',
      name: 'Aura Edge',
      description: 'Diffused atmospheric halo around subject'
    },
    motion: {
      id: 'sparkle-burst',
      name: 'Sparkle Burst',
      behavior: 'Particles emit in starburst pattern with fade',
      speed: 'normal',
      energy: 'medium'
    },
    previewEmoji: '✨',
    description: 'Magical sparkle explosion for special moments',
    conversionPitch: 'Burst with magical sparkles',
    movementPersonality: 'Bursts with particle sparkles',
    intensity: 'medium',
    bestFor: ['Magic', 'Celebration', 'Special', 'Sparkles']
  },
  
  {
    id: 'wobble-jelly',
    name: 'Wobble Jelly',
    vibe: 'character-motion',
    tags: ['Cute', 'Soft', 'Playful'],
    mask: {
      type: 'soft',
      name: 'Soft Edge',
      description: 'Gentle feathered edges for smooth blending'
    },
    motion: {
      id: 'wobble',
      name: 'Wobble',
      behavior: 'Gentle rocking side-to-side motion',
      speed: 'slow',
      energy: 'soft'
    },
    previewEmoji: '🍮',
    description: 'Jiggly wobble for soft, squishy characters',
    conversionPitch: 'Wobble with cute softness',
    movementPersonality: 'Wobbles with playful sway',
    intensity: 'subtle',
    bestFor: ['Cute', 'Soft', 'Squishy', 'Playful']
  },
  
  {
    id: 'cloud-drift',
    name: 'Cloud Dream',
    vibe: 'atmosphere',
    tags: ['Peaceful', 'Dreamy', 'Soft'],
    mask: {
      type: 'aura',
      name: 'Aura Edge',
      description: 'Diffused atmospheric halo around subject'
    },
    motion: {
      id: 'cloud-drift',
      name: 'Cloud Drift',
      behavior: 'Gentle drifting like floating clouds',
      speed: 'slow',
      energy: 'soft'
    },
    previewEmoji: '☁️',
    description: 'Peaceful cloud drift for dreamy atmospheres',
    conversionPitch: 'Float in dreamy clouds',
    movementPersonality: 'Drifts with gentle float',
    intensity: 'subtle',
    bestFor: ['Dreams', 'Peaceful', 'Sky', 'Soft']
  },
  
  {
    id: 'lightning-flash',
    name: 'Lightning Flash',
    vibe: 'energy-tech',
    tags: ['Power', 'Electric', 'Impact'],
    mask: {
      type: 'glow',
      name: 'Glow Edge',
      description: 'Luminous edges with outer glow'
    },
    motion: {
      id: 'lightning-flash',
      name: 'Lightning Flash',
      behavior: 'Sudden bright flash with electric afterglow',
      speed: 'fast',
      energy: 'strong'
    },
    previewEmoji: '⚡',
    description: 'Powerful electric flash for high-impact moments',
    conversionPitch: 'Strike with lightning power',
    movementPersonality: 'Flashes with electric flicker',
    intensity: 'intense',
    bestFor: ['Power', 'Electric', 'Impact', 'Energy']
  },
  
  {
    id: 'spin-hypnotic',
    name: 'Hypnotic Spin',
    vibe: 'character-motion',
    tags: ['Dynamic', 'Mesmerizing', 'Smooth'],
    mask: {
      type: 'clean',
      name: 'Clean Cut',
      description: 'Sharp sticker cut with crisp edges'
    },
    motion: {
      id: 'spin',
      name: 'Spin',
      behavior: 'Steady 360° continuous rotation',
      speed: 'normal',
      energy: 'medium'
    },
    previewEmoji: '💫',
    description: 'Smooth perpetual spin for continuous motion',
    conversionPitch: 'Spin in endless rotation',
    movementPersonality: 'Spins with steady rotation',
    intensity: 'medium',
    bestFor: ['Loading', 'Spin', 'Dynamic', 'Continuous']
  }
]

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

export interface FinishOption {
  type: MaskType
  name: string
  description: string
}

export const finishOptions: FinishOption[] = [
  {
    type: 'clean',
    name: 'Clean cut',
    description: 'Sharp edges, crisp sticker'
  },
  {
    type: 'soft',
    name: 'Soft edge',
    description: 'Gentle feathered blending'
  },
  {
    type: 'glow',
    name: 'Glow edge',
    description: 'Luminous outer glow'
  },
  {
    type: 'aura',
    name: 'Aura edge',
    description: 'Diffused atmospheric halo'
  }
]

export function getAnimationMultipliers(enhancement: MagicEnhancement): {
  scale: number
  duration: number
  intensity: number
} {
  const energyMap: Record<MagicLevel, number> = {
    clean: 0.7,
    enhanced: 1.0,
    intense: 1.4
  }
  
  const speedMap: Record<SpeedLevel, number> = {
    slow: 1.5,
    normal: 1.0,
    fast: 0.6
  }
  
  return {
    scale: energyMap[enhancement.energy],
    duration: speedMap[enhancement.speed],
    intensity: energyMap[enhancement.energy]
  }
}

export function getEnergyLabel(level: MagicLevel): string {
  const labels: Record<MagicLevel, string> = {
    clean: 'Clean • Subtle motion',
    enhanced: 'Enhanced • Balanced magic',
    intense: 'Intense • Maximum energy'
  }
  return labels[level]
}

export function getSpeedLabel(level: SpeedLevel): string {
  const labels: Record<SpeedLevel, string> = {
    slow: 'Slow • Calm drift',
    normal: 'Normal • Smooth flow',
    fast: 'Fast • Quick pulse'
  }
  return labels[level]
}
