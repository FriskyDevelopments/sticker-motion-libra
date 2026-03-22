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
      behavior: 'Pulsing radiance that expands and contracts like breathing'
    },
    previewEmoji: '🌙',
    description: 'Soft dreamy glow perfect for peaceful, magical stickers',
    conversionPitch: 'Transform into a luminous dream',
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
      behavior: 'Radiating rings emanate outward like sonar'
    },
    previewEmoji: '⚡',
    description: 'Electric pulsing energy for high-impact stickers',
    conversionPitch: 'Electrify with neon power',
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
      behavior: 'Vertical bounce with squash-and-stretch physics'
    },
    previewEmoji: '🎾',
    description: 'Playful bouncing perfect for characters and mascots',
    conversionPitch: 'Add joyful bouncing energy',
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
      behavior: 'Particles orbit around the sticker perimeter'
    },
    previewEmoji: '🌍',
    description: 'Celestial orbit effect for space and magical themes',
    conversionPitch: 'Float in cosmic space',
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
      behavior: 'Color channel separation with random triggers'
    },
    previewEmoji: '📺',
    description: 'Digital glitch effect for cyberpunk aesthetics',
    conversionPitch: 'Break into digital glitch',
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
      behavior: 'Light sweep across surface like catching reflection'
    },
    previewEmoji: '💎',
    description: 'Premium shimmer for luxury and achievement',
    conversionPitch: 'Add premium polish',
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
      behavior: 'Double-pump rhythm like a heart beating'
    },
    previewEmoji: '💗',
    description: 'Sweet rhythmic pulse for romantic stickers',
    conversionPitch: 'Beat with love and warmth',
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
      behavior: 'Particles emit in starburst pattern with fade'
    },
    previewEmoji: '✨',
    description: 'Magical sparkle explosion for special moments',
    conversionPitch: 'Burst with magical sparkles',
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
      behavior: 'Gentle rocking side-to-side motion'
    },
    previewEmoji: '🍮',
    description: 'Jiggly wobble for soft, squishy characters',
    conversionPitch: 'Wobble with cute softness',
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
      behavior: 'Gentle drifting like floating clouds'
    },
    previewEmoji: '☁️',
    description: 'Peaceful cloud drift for dreamy atmospheres',
    conversionPitch: 'Float in dreamy clouds',
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
      behavior: 'Sudden bright flash with electric afterglow'
    },
    previewEmoji: '⚡',
    description: 'Powerful electric flash for high-impact moments',
    conversionPitch: 'Strike with lightning power',
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
      behavior: 'Steady 360° continuous rotation'
    },
    previewEmoji: '💫',
    description: 'Smooth perpetual spin for continuous motion',
    conversionPitch: 'Spin in endless rotation',
    intensity: 'medium',
    bestFor: ['Loading', 'Spin', 'Dynamic', 'Continuous']
  }
]

export type MagicLevel = 'clean' | 'enhanced' | 'intense'
export type SpeedLevel = 'slow' | 'normal' | 'fast'

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
