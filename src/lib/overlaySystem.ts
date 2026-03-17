export type OverlayFamily = 
  | 'particles'
  | 'rings'
  | 'atmospheric'
  | 'geometric'
  | 'effects'

export interface Overlay {
  id: string
  name: string
  family: OverlayFamily
  description: string
  vibe: string
  visualEffect: string
  compatibleStyles: string[]
  intensity: 'subtle' | 'medium' | 'intense'
}

export const overlayFamilyInfo: Record<OverlayFamily, {
  name: string
  description: string
  color: string
}> = {
  particles: {
    name: 'Particles',
    description: 'Floating elements and sparkles',
    color: 'oklch(0.75 0.18 50)'
  },
  rings: {
    name: 'Rings & Halos',
    description: 'Circular frames and glows',
    color: 'oklch(0.70 0.20 200)'
  },
  atmospheric: {
    name: 'Atmospheric',
    description: 'Veils, mists, and ambient layers',
    color: 'oklch(0.80 0.10 260)'
  },
  geometric: {
    name: 'Geometric',
    description: 'Shapes and structural overlays',
    color: 'oklch(0.65 0.18 280)'
  },
  effects: {
    name: 'Effects',
    description: 'Special visual treatments',
    color: 'oklch(0.72 0.22 320)'
  }
}

export const overlays: Overlay[] = [
  {
    id: 'spark-dust',
    name: 'Spark Dust',
    family: 'particles',
    description: 'Floating sparkles drifting around the sticker',
    vibe: 'Magical and delicate',
    visualEffect: 'Small twinkling particles in random motion',
    compatibleStyles: ['neon', 'magic', 'cute', 'cosmic', 'soft-glow'],
    intensity: 'subtle'
  },
  {
    id: 'soft-ring',
    name: 'Soft Ring',
    family: 'rings',
    description: 'Gentle circular halo surrounding the sticker',
    vibe: 'Focused and centered',
    visualEffect: 'Diffused ring with subtle pulse',
    compatibleStyles: ['neon', 'energy', 'cosmic', 'magic'],
    intensity: 'medium'
  },
  {
    id: 'prism-veil',
    name: 'Prism Veil',
    family: 'atmospheric',
    description: 'Semi-transparent color-shifting overlay',
    vibe: 'Ethereal and iridescent',
    visualEffect: 'Gradient veil with chromatic shift',
    compatibleStyles: ['magic', 'dreamy', 'cosmic', 'soft-glow'],
    intensity: 'subtle'
  },
  {
    id: 'echo-glow',
    name: 'Echo Glow',
    family: 'effects',
    description: 'Layered glow copies creating depth',
    vibe: 'Dimensional and rich',
    visualEffect: 'Multiple offset glow layers',
    compatibleStyles: ['neon', 'techno', 'energy', 'glitch'],
    intensity: 'medium'
  },
  {
    id: 'orbit-ring',
    name: 'Orbit Ring',
    family: 'rings',
    description: 'Rotating ring with orbital particles',
    vibe: 'Dynamic and celestial',
    visualEffect: 'Spinning ring with satellite elements',
    compatibleStyles: ['cosmic', 'techno', 'energy', 'magic'],
    intensity: 'intense'
  },
  {
    id: 'sparkle-field',
    name: 'Sparkle Field',
    family: 'particles',
    description: 'Dense field of twinkling stars',
    vibe: 'Celebratory and magical',
    visualEffect: 'Many small sparkles with random twinkle timing',
    compatibleStyles: ['magic', 'cosmic', 'cute', 'neon'],
    intensity: 'medium'
  },
  {
    id: 'scanline-shimmer',
    name: 'Scanline Shimmer',
    family: 'geometric',
    description: 'Horizontal scanning lines with tech feel',
    vibe: 'Technical and digital',
    visualEffect: 'Moving horizontal lines with glow',
    compatibleStyles: ['techno', 'glitch', 'neon'],
    intensity: 'subtle'
  },
  {
    id: 'crystal-shards',
    name: 'Crystal Shards',
    family: 'geometric',
    description: 'Floating geometric crystal fragments',
    vibe: 'Mystical and sharp',
    visualEffect: 'Angular shapes drifting with rotation',
    compatibleStyles: ['magic', 'techno', 'cosmic'],
    intensity: 'medium'
  },
  {
    id: 'pulse-veil',
    name: 'Pulse Veil',
    family: 'atmospheric',
    description: 'Pulsing transparent layer with rhythm',
    vibe: 'Alive and breathing',
    visualEffect: 'Full coverage veil with opacity pulse',
    compatibleStyles: ['energy', 'magic', 'cosmic', 'soft-glow'],
    intensity: 'subtle'
  },
  {
    id: 'neon-halo',
    name: 'Neon Halo',
    family: 'rings',
    description: 'Bright electric ring with intense glow',
    vibe: 'Bold and electric',
    visualEffect: 'Vibrant ring with chromatic aberration',
    compatibleStyles: ['neon', 'energy', 'techno'],
    intensity: 'intense'
  },
  {
    id: 'dream-mist',
    name: 'Dream Mist',
    family: 'atmospheric',
    description: 'Soft foggy layer with gentle movement',
    vibe: 'Dreamy and soft',
    visualEffect: 'Diffused mist with slow drift',
    compatibleStyles: ['dreamy', 'soft-glow', 'magic', 'cosmic'],
    intensity: 'subtle'
  },
  {
    id: 'pixel-grid',
    name: 'Pixel Grid',
    family: 'geometric',
    description: 'Retro 8-bit grid overlay',
    vibe: 'Retro and digital',
    visualEffect: 'Pixelated grid with subtle flicker',
    compatibleStyles: ['techno', 'glitch', 'neon'],
    intensity: 'medium'
  },
  {
    id: 'star-trail',
    name: 'Star Trail',
    family: 'particles',
    description: 'Trailing star particles with motion blur',
    vibe: 'Swift and cosmic',
    visualEffect: 'Streaking particles with fade',
    compatibleStyles: ['cosmic', 'energy', 'magic'],
    intensity: 'medium'
  },
  {
    id: 'energy-waves',
    name: 'Energy Waves',
    family: 'effects',
    description: 'Radiating energy ripples',
    vibe: 'Powerful and dynamic',
    visualEffect: 'Concentric waves emanating outward',
    compatibleStyles: ['energy', 'neon', 'cosmic'],
    intensity: 'intense'
  },
  {
    id: 'confetti-burst',
    name: 'Confetti Burst',
    family: 'particles',
    description: 'Colorful confetti pieces raining down',
    vibe: 'Celebratory and joyful',
    visualEffect: 'Multi-colored shapes falling and rotating',
    compatibleStyles: ['cute', 'magic', 'mascot'],
    intensity: 'intense'
  },
  {
    id: 'hologram-lines',
    name: 'Hologram Lines',
    family: 'geometric',
    description: 'Horizontal scan lines with holographic effect',
    vibe: 'Futuristic and transparent',
    visualEffect: 'Moving lines with color shift and transparency',
    compatibleStyles: ['techno', 'cosmic', 'neon'],
    intensity: 'subtle'
  },
  {
    id: 'magic-circle',
    name: 'Magic Circle',
    family: 'rings',
    description: 'Arcane circle with mystical symbols',
    vibe: 'Mystical and ancient',
    visualEffect: 'Rotating circle with runic patterns',
    compatibleStyles: ['magic', 'cosmic'],
    intensity: 'medium'
  },
  {
    id: 'bubble-float',
    name: 'Bubble Float',
    family: 'particles',
    description: 'Gentle floating bubbles rising upward',
    vibe: 'Playful and light',
    visualEffect: 'Transparent spheres with slow rise',
    compatibleStyles: ['cute', 'dreamy', 'soft-glow', 'magic'],
    intensity: 'subtle'
  },
  {
    id: 'glitch-bars',
    name: 'Glitch Bars',
    family: 'effects',
    description: 'Distorted horizontal slices with displacement',
    vibe: 'Corrupted and chaotic',
    visualEffect: 'Random horizontal strips with offset',
    compatibleStyles: ['glitch', 'techno', 'neon'],
    intensity: 'intense'
  },
  {
    id: 'aurora-veil',
    name: 'Aurora Veil',
    family: 'atmospheric',
    description: 'Color-shifting northern lights effect',
    vibe: 'Celestial and flowing',
    visualEffect: 'Flowing gradient waves with color shift',
    compatibleStyles: ['magic', 'cosmic', 'dreamy'],
    intensity: 'medium'
  }
]
