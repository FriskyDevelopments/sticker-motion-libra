export type StyleFamily = 
  | 'neon'
  | 'magic'
  | 'cute'
  | 'techno'
  | 'mascot'
  | 'glitch'
  | 'dreamy'
  | 'cosmic'
  | 'soft-glow'
  | 'energy'

export type AssetCompatibility = 'logo' | 'face' | 'mascot' | 'symbol' | 'icon'
export type StyleIntensity = 'subtle' | 'medium' | 'intense'

export interface BaseStyle {
  id: string
  name: string
  family: StyleFamily
  description: string
  vibe: string
  intensity: StyleIntensity
  compatibleAssets: AssetCompatibility[]
  compatibleMotions: string[]
  compatibleOverlays: string[]
  previewEmoji: string
  cssFilters: string
  maskType: string
}

export const styleFamilyInfo: Record<StyleFamily, {
  name: string
  description: string
  color: string
  mood: string
}> = {
  neon: {
    name: 'Neon',
    description: 'Electric glows and vibrant light',
    color: 'oklch(0.75 0.20 200)',
    mood: 'Bold, attention-grabbing, cyberpunk'
  },
  magic: {
    name: 'Magic',
    description: 'Ethereal shimmers and enchantment',
    color: 'oklch(0.70 0.18 290)',
    mood: 'Mystical, wonder, transformative'
  },
  cute: {
    name: 'Cute',
    description: 'Soft, playful, and adorable',
    color: 'oklch(0.75 0.15 350)',
    mood: 'Friendly, approachable, joyful'
  },
  techno: {
    name: 'Techno',
    description: 'Digital, futuristic, and precise',
    color: 'oklch(0.60 0.18 250)',
    mood: 'Tech-forward, sharp, modern'
  },
  mascot: {
    name: 'Mascot',
    description: 'Character-driven and expressive',
    color: 'oklch(0.70 0.15 50)',
    mood: 'Personality, living, dynamic'
  },
  glitch: {
    name: 'Glitch',
    description: 'Corrupted digital aesthetics',
    color: 'oklch(0.65 0.22 330)',
    mood: 'Chaotic, edgy, broken'
  },
  dreamy: {
    name: 'Dreamy',
    description: 'Soft focus and atmospheric',
    color: 'oklch(0.80 0.10 260)',
    mood: 'Peaceful, floating, surreal'
  },
  cosmic: {
    name: 'Cosmic',
    description: 'Space-inspired and celestial',
    color: 'oklch(0.55 0.20 270)',
    mood: 'Vast, mysterious, infinite'
  },
  'soft-glow': {
    name: 'Soft Glow',
    description: 'Gentle radiance and warmth',
    color: 'oklch(0.85 0.08 80)',
    mood: 'Warm, inviting, gentle'
  },
  energy: {
    name: 'Energy',
    description: 'Pulsing power and intensity',
    color: 'oklch(0.70 0.25 120)',
    mood: 'Dynamic, powerful, charged'
  }
}

export const baseStyles: BaseStyle[] = [
  {
    id: 'neon-halo',
    name: 'Neon Halo',
    family: 'neon',
    description: 'Vibrant outer glow with electric edge',
    vibe: 'Bold and electric',
    intensity: 'medium',
    compatibleAssets: ['logo', 'symbol', 'icon', 'mascot'],
    compatibleMotions: ['breathing-glow', 'pulse-ring', 'shimmer'],
    compatibleOverlays: ['spark-dust', 'prism-veil', 'echo-glow'],
    previewEmoji: '⚡',
    cssFilters: 'drop-shadow(0 0 12px oklch(0.75 0.20 200)) brightness(1.1)',
    maskType: 'soft-edge-glow'
  },
  {
    id: 'neon-ring',
    name: 'Neon Ring',
    family: 'neon',
    description: 'Clean outline with glowing stroke',
    vibe: 'Sharp and luminous',
    intensity: 'intense',
    compatibleAssets: ['logo', 'symbol', 'icon'],
    compatibleMotions: ['pulse-ring', 'spin', 'orbit'],
    compatibleOverlays: ['soft-ring', 'echo-glow'],
    previewEmoji: '💫',
    cssFilters: 'drop-shadow(0 0 8px oklch(0.75 0.22 190))',
    maskType: 'outline-stroke'
  },
  {
    id: 'cloud-bloom',
    name: 'Cloud Bloom',
    family: 'dreamy',
    description: 'Soft diffused edges with atmospheric blur',
    vibe: 'Dreamy and peaceful',
    intensity: 'subtle',
    compatibleAssets: ['face', 'mascot', 'symbol'],
    compatibleMotions: ['cloud-drift', 'sway', 'breathing-glow'],
    compatibleOverlays: ['prism-veil', 'spark-dust'],
    previewEmoji: '☁️',
    cssFilters: 'blur(1px) brightness(1.05)',
    maskType: 'cloud-soft'
  },
  {
    id: 'mascot-bounce',
    name: 'Mascot Bounce',
    family: 'mascot',
    description: 'Playful with personality and life',
    vibe: 'Energetic and alive',
    intensity: 'medium',
    compatibleAssets: ['mascot', 'face'],
    compatibleMotions: ['bounce', 'wobble', 'heartbeat', 'elastic-pop'],
    compatibleOverlays: ['spark-dust'],
    previewEmoji: '🐾',
    cssFilters: 'saturate(1.1) brightness(1.05)',
    maskType: 'soft-edge-glow'
  },
  {
    id: 'pixel-spell',
    name: 'Pixel Spell',
    family: 'techno',
    description: '8-bit edges with retro digital charm',
    vibe: 'Retro gaming magic',
    intensity: 'medium',
    compatibleAssets: ['symbol', 'icon', 'logo'],
    compatibleMotions: ['pixel-trail', 'spin', 'flicker'],
    compatibleOverlays: ['echo-glow'],
    previewEmoji: '🎮',
    cssFilters: 'contrast(1.1)',
    maskType: 'pixelated-border'
  },
  {
    id: 'dream-orbit',
    name: 'Dream Orbit',
    family: 'cosmic',
    description: 'Celestial glow with space vibes',
    vibe: 'Cosmic and mysterious',
    intensity: 'medium',
    compatibleAssets: ['symbol', 'icon', 'logo', 'mascot'],
    compatibleMotions: ['orbit', 'spiral', 'breathing-glow'],
    compatibleOverlays: ['soft-ring', 'prism-veil', 'spark-dust'],
    previewEmoji: '🌌',
    cssFilters: 'drop-shadow(0 0 16px oklch(0.55 0.20 270)) saturate(1.2)',
    maskType: 'soft-edge-glow'
  },
  {
    id: 'magic-shimmer',
    name: 'Magic Shimmer',
    family: 'magic',
    description: 'Enchanted sparkle with ethereal quality',
    vibe: 'Mystical and wonder-filled',
    intensity: 'subtle',
    compatibleAssets: ['logo', 'symbol', 'icon', 'face', 'mascot'],
    compatibleMotions: ['shimmer', 'sparkle-burst', 'breathing-glow'],
    compatibleOverlays: ['spark-dust', 'prism-veil'],
    previewEmoji: '✨',
    cssFilters: 'brightness(1.15) saturate(1.1)',
    maskType: 'gradient-fade'
  },
  {
    id: 'glitch-fracture',
    name: 'Glitch Fracture',
    family: 'glitch',
    description: 'Broken digital with chromatic split',
    vibe: 'Chaotic and corrupted',
    intensity: 'intense',
    compatibleAssets: ['logo', 'symbol', 'icon'],
    compatibleMotions: ['rgb-glitch', 'data-corrupt', 'static-noise'],
    compatibleOverlays: ['echo-glow'],
    previewEmoji: '📺',
    cssFilters: 'contrast(1.2)',
    maskType: 'chromatic-edge'
  },
  {
    id: 'soft-radiance',
    name: 'Soft Radiance',
    family: 'soft-glow',
    description: 'Gentle warm glow with comfort',
    vibe: 'Warm and inviting',
    intensity: 'subtle',
    compatibleAssets: ['face', 'mascot', 'symbol', 'logo'],
    compatibleMotions: ['breathing-glow', 'sway', 'heartbeat'],
    compatibleOverlays: ['prism-veil'],
    previewEmoji: '🌟',
    cssFilters: 'drop-shadow(0 0 20px oklch(0.85 0.08 80)) brightness(1.08)',
    maskType: 'soft-edge-glow'
  },
  {
    id: 'energy-pulse',
    name: 'Energy Pulse',
    family: 'energy',
    description: 'Charged power with intensity',
    vibe: 'Dynamic and powerful',
    intensity: 'intense',
    compatibleAssets: ['logo', 'symbol', 'icon'],
    compatibleMotions: ['pulse-ring', 'lightning-flash', 'breathing-glow'],
    compatibleOverlays: ['soft-ring', 'echo-glow'],
    previewEmoji: '⚡',
    cssFilters: 'drop-shadow(0 0 10px oklch(0.70 0.25 120)) saturate(1.3)',
    maskType: 'soft-edge-glow'
  },
  {
    id: 'cute-bubble',
    name: 'Cute Bubble',
    family: 'cute',
    description: 'Soft rounded with playful charm',
    vibe: 'Adorable and friendly',
    intensity: 'subtle',
    compatibleAssets: ['mascot', 'face', 'symbol'],
    compatibleMotions: ['bounce', 'wobble', 'heartbeat'],
    compatibleOverlays: ['spark-dust'],
    previewEmoji: '🫧',
    cssFilters: 'saturate(1.15) brightness(1.1)',
    maskType: 'cloud-soft'
  },
  {
    id: 'techno-grid',
    name: 'Techno Grid',
    family: 'techno',
    description: 'Precise lines with digital structure',
    vibe: 'Clean and futuristic',
    intensity: 'medium',
    compatibleAssets: ['logo', 'symbol', 'icon'],
    compatibleMotions: ['spin', 'pulse-ring', 'flicker'],
    compatibleOverlays: ['echo-glow'],
    previewEmoji: '🔷',
    cssFilters: 'contrast(1.15) brightness(1.05)',
    maskType: 'hard-cutout'
  },
  {
    id: 'cosmic-nebula',
    name: 'Cosmic Nebula',
    family: 'cosmic',
    description: 'Starfield atmosphere with depth',
    vibe: 'Vast and mysterious',
    intensity: 'medium',
    compatibleAssets: ['symbol', 'logo', 'icon'],
    compatibleMotions: ['spiral', 'orbit', 'cloud-drift'],
    compatibleOverlays: ['prism-veil', 'spark-dust'],
    previewEmoji: '🌠',
    cssFilters: 'drop-shadow(0 0 18px oklch(0.50 0.22 280)) saturate(1.25)',
    maskType: 'gradient-fade'
  },
  {
    id: 'magic-aurora',
    name: 'Magic Aurora',
    family: 'magic',
    description: 'Flowing color shifts with enchantment',
    vibe: 'Ethereal and transformative',
    intensity: 'medium',
    compatibleAssets: ['logo', 'symbol', 'icon', 'mascot'],
    compatibleMotions: ['shimmer', 'sway', 'breathing-glow'],
    compatibleOverlays: ['prism-veil', 'spark-dust'],
    previewEmoji: '🌈',
    cssFilters: 'hue-rotate(5deg) saturate(1.2) brightness(1.1)',
    maskType: 'gradient-fade'
  },
  {
    id: 'glitch-static',
    name: 'Glitch Static',
    family: 'glitch',
    description: 'VHS corruption with analog noise',
    vibe: 'Retro corrupted',
    intensity: 'intense',
    compatibleAssets: ['logo', 'symbol', 'icon'],
    compatibleMotions: ['static-noise', 'flicker', 'rgb-glitch'],
    compatibleOverlays: ['echo-glow'],
    previewEmoji: '📼',
    cssFilters: 'contrast(1.3) brightness(0.95)',
    maskType: 'torn-edge'
  },
  {
    id: 'dreamy-haze',
    name: 'Dreamy Haze',
    family: 'dreamy',
    description: 'Soft focus with atmospheric feel',
    vibe: 'Peaceful and floating',
    intensity: 'subtle',
    compatibleAssets: ['face', 'mascot', 'symbol'],
    compatibleMotions: ['cloud-drift', 'sway', 'breathing-glow'],
    compatibleOverlays: ['prism-veil'],
    previewEmoji: '💭',
    cssFilters: 'blur(0.5px) opacity(0.95) brightness(1.1)',
    maskType: 'cloud-soft'
  },
  {
    id: 'neon-cyber',
    name: 'Neon Cyber',
    family: 'neon',
    description: 'Cyberpunk edge with electric intensity',
    vibe: 'Futuristic and edgy',
    intensity: 'intense',
    compatibleAssets: ['logo', 'symbol', 'icon'],
    compatibleMotions: ['pulse-ring', 'flicker', 'rgb-glitch'],
    compatibleOverlays: ['soft-ring', 'echo-glow'],
    previewEmoji: '🔮',
    cssFilters: 'drop-shadow(0 0 10px oklch(0.70 0.25 310)) contrast(1.2)',
    maskType: 'outline-stroke'
  },
  {
    id: 'energy-charge',
    name: 'Energy Charge',
    family: 'energy',
    description: 'Building power with electric feel',
    vibe: 'Charged and ready',
    intensity: 'intense',
    compatibleAssets: ['logo', 'symbol', 'icon'],
    compatibleMotions: ['lightning-flash', 'pulse-ring', 'breathing-glow'],
    compatibleOverlays: ['soft-ring', 'echo-glow', 'spark-dust'],
    previewEmoji: '🔋',
    cssFilters: 'drop-shadow(0 0 12px oklch(0.75 0.28 130)) saturate(1.35)',
    maskType: 'soft-edge-glow'
  },
  {
    id: 'cute-candy',
    name: 'Cute Candy',
    family: 'cute',
    description: 'Sweet pastel with cheerful energy',
    vibe: 'Sweet and joyful',
    intensity: 'medium',
    compatibleAssets: ['mascot', 'face', 'symbol', 'icon'],
    compatibleMotions: ['bounce', 'wobble', 'shimmer'],
    compatibleOverlays: ['spark-dust'],
    previewEmoji: '🍭',
    cssFilters: 'saturate(1.3) brightness(1.15) hue-rotate(-5deg)',
    maskType: 'soft-edge-glow'
  },
  {
    id: 'techno-chrome',
    name: 'Techno Chrome',
    family: 'techno',
    description: 'Metallic sheen with precision',
    vibe: 'Sleek and polished',
    intensity: 'medium',
    compatibleAssets: ['logo', 'symbol', 'icon'],
    compatibleMotions: ['shimmer', 'spin', 'pulse-ring'],
    compatibleOverlays: ['echo-glow', 'prism-veil'],
    previewEmoji: '⚙️',
    cssFilters: 'contrast(1.2) brightness(1.1) saturate(0.9)',
    maskType: 'hard-cutout'
  },
  {
    id: 'mascot-charm',
    name: 'Mascot Charm',
    family: 'mascot',
    description: 'Character personality with warmth',
    vibe: 'Friendly and expressive',
    intensity: 'subtle',
    compatibleAssets: ['mascot', 'face'],
    compatibleMotions: ['heartbeat', 'wobble', 'bounce', 'sway'],
    compatibleOverlays: ['spark-dust'],
    previewEmoji: '🦊',
    cssFilters: 'saturate(1.1) brightness(1.08)',
    maskType: 'soft-edge-glow'
  },
  {
    id: 'cosmic-star',
    name: 'Cosmic Star',
    family: 'cosmic',
    description: 'Stellar radiance with celestial glow',
    vibe: 'Bright and infinite',
    intensity: 'intense',
    compatibleAssets: ['symbol', 'icon', 'logo'],
    compatibleMotions: ['sparkle-burst', 'spiral', 'breathing-glow'],
    compatibleOverlays: ['spark-dust', 'soft-ring'],
    previewEmoji: '⭐',
    cssFilters: 'drop-shadow(0 0 20px oklch(0.85 0.15 60)) brightness(1.2)',
    maskType: 'starburst-rays'
  },
  {
    id: 'magic-crystal',
    name: 'Magic Crystal',
    family: 'magic',
    description: 'Prismatic refraction with enchantment',
    vibe: 'Precious and mystical',
    intensity: 'medium',
    compatibleAssets: ['symbol', 'icon', 'logo'],
    compatibleMotions: ['shimmer', 'spin', 'sparkle-burst'],
    compatibleOverlays: ['prism-veil', 'spark-dust'],
    previewEmoji: '💎',
    cssFilters: 'saturate(1.4) brightness(1.15) contrast(1.1)',
    maskType: 'gradient-fade'
  },
  {
    id: 'glitch-matrix',
    name: 'Glitch Matrix',
    family: 'glitch',
    description: 'Code rain with digital corruption',
    vibe: 'Hacker aesthetic',
    intensity: 'intense',
    compatibleAssets: ['logo', 'symbol', 'icon'],
    compatibleMotions: ['data-corrupt', 'rgb-glitch', 'pixel-trail'],
    compatibleOverlays: ['echo-glow'],
    previewEmoji: '🖥️',
    cssFilters: 'contrast(1.25) brightness(0.98) hue-rotate(90deg)',
    maskType: 'pixelated-border'
  },
  {
    id: 'dreamy-float',
    name: 'Dreamy Float',
    family: 'dreamy',
    description: 'Weightless drift with soft atmosphere',
    vibe: 'Serene and floating',
    intensity: 'subtle',
    compatibleAssets: ['face', 'mascot', 'symbol'],
    compatibleMotions: ['cloud-drift', 'sway', 'breathing-glow'],
    compatibleOverlays: ['prism-veil'],
    previewEmoji: '🎈',
    cssFilters: 'blur(0.8px) brightness(1.12) opacity(0.92)',
    maskType: 'cloud-soft'
  },
  {
    id: 'soft-warmth',
    name: 'Soft Warmth',
    family: 'soft-glow',
    description: 'Cozy glow with gentle embrace',
    vibe: 'Comfortable and safe',
    intensity: 'subtle',
    compatibleAssets: ['face', 'mascot', 'symbol', 'logo'],
    compatibleMotions: ['breathing-glow', 'heartbeat', 'sway'],
    compatibleOverlays: ['prism-veil'],
    previewEmoji: '🕯️',
    cssFilters: 'drop-shadow(0 0 24px oklch(0.80 0.10 70)) brightness(1.1)',
    maskType: 'soft-edge-glow'
  },
  {
    id: 'neon-pulse',
    name: 'Neon Pulse',
    family: 'neon',
    description: 'Rhythmic glow with vibrant energy',
    vibe: 'Pulsing and alive',
    intensity: 'medium',
    compatibleAssets: ['logo', 'symbol', 'icon', 'mascot'],
    compatibleMotions: ['pulse-ring', 'breathing-glow', 'heartbeat'],
    compatibleOverlays: ['soft-ring', 'echo-glow'],
    previewEmoji: '💓',
    cssFilters: 'drop-shadow(0 0 14px oklch(0.72 0.23 340)) saturate(1.2)',
    maskType: 'soft-edge-glow'
  },
  {
    id: 'energy-blast',
    name: 'Energy Blast',
    family: 'energy',
    description: 'Explosive power with radiating force',
    vibe: 'Powerful and impactful',
    intensity: 'intense',
    compatibleAssets: ['symbol', 'icon', 'logo'],
    compatibleMotions: ['lightning-flash', 'pulse-ring', 'sparkle-burst'],
    compatibleOverlays: ['soft-ring', 'echo-glow', 'spark-dust'],
    previewEmoji: '💥',
    cssFilters: 'drop-shadow(0 0 16px oklch(0.68 0.30 110)) brightness(1.2) saturate(1.4)',
    maskType: 'starburst-rays'
  },
  {
    id: 'cute-hearts',
    name: 'Cute Hearts',
    family: 'cute',
    description: 'Loving warmth with adorable charm',
    vibe: 'Loveable and sweet',
    intensity: 'medium',
    compatibleAssets: ['mascot', 'face', 'symbol'],
    compatibleMotions: ['heartbeat', 'bounce', 'sparkle-burst'],
    compatibleOverlays: ['spark-dust'],
    previewEmoji: '💕',
    cssFilters: 'saturate(1.25) brightness(1.12)',
    maskType: 'soft-edge-glow'
  },
  {
    id: 'techno-scan',
    name: 'Techno Scan',
    family: 'techno',
    description: 'Scanning lines with digital precision',
    vibe: 'Technical and analytical',
    intensity: 'medium',
    compatibleAssets: ['logo', 'symbol', 'icon'],
    compatibleMotions: ['shimmer', 'data-corrupt', 'pulse-ring'],
    compatibleOverlays: ['echo-glow'],
    previewEmoji: '🔬',
    cssFilters: 'contrast(1.18) brightness(1.08)',
    maskType: 'hard-cutout'
  },
  {
    id: 'mascot-joy',
    name: 'Mascot Joy',
    family: 'mascot',
    description: 'Expressive happiness with personality',
    vibe: 'Joyful and animated',
    intensity: 'medium',
    compatibleAssets: ['mascot', 'face'],
    compatibleMotions: ['bounce', 'elastic-pop', 'wobble'],
    compatibleOverlays: ['spark-dust'],
    previewEmoji: '😊',
    cssFilters: 'saturate(1.15) brightness(1.1)',
    maskType: 'soft-edge-glow'
  },
  {
    id: 'cosmic-void',
    name: 'Cosmic Void',
    family: 'cosmic',
    description: 'Deep space with mysterious depth',
    vibe: 'Mysterious and profound',
    intensity: 'medium',
    compatibleAssets: ['symbol', 'logo', 'icon'],
    compatibleMotions: ['spiral', 'orbit', 'breathing-glow'],
    compatibleOverlays: ['prism-veil'],
    previewEmoji: '🌑',
    cssFilters: 'drop-shadow(0 0 22px oklch(0.45 0.25 290)) saturate(1.3) brightness(0.95)',
    maskType: 'gradient-fade'
  },
  {
    id: 'magic-spell',
    name: 'Magic Spell',
    family: 'magic',
    description: 'Arcane energy with mystical power',
    vibe: 'Enchanting and powerful',
    intensity: 'intense',
    compatibleAssets: ['symbol', 'icon', 'logo'],
    compatibleMotions: ['sparkle-burst', 'spiral', 'orbit'],
    compatibleOverlays: ['spark-dust', 'prism-veil', 'soft-ring'],
    previewEmoji: '🔮',
    cssFilters: 'drop-shadow(0 0 18px oklch(0.65 0.22 300)) saturate(1.35) brightness(1.18)',
    maskType: 'starburst-rays'
  },
  {
    id: 'glitch-pixel',
    name: 'Glitch Pixel',
    family: 'glitch',
    description: 'Retro corruption with 8-bit edges',
    vibe: 'Retro broken',
    intensity: 'medium',
    compatibleAssets: ['logo', 'symbol', 'icon'],
    compatibleMotions: ['pixel-trail', 'static-noise', 'flicker'],
    compatibleOverlays: ['echo-glow'],
    previewEmoji: '👾',
    cssFilters: 'contrast(1.15) brightness(1.0)',
    maskType: 'pixelated-border'
  },
  {
    id: 'dreamy-pastel',
    name: 'Dreamy Pastel',
    family: 'dreamy',
    description: 'Soft colors with gentle atmosphere',
    vibe: 'Gentle and soothing',
    intensity: 'subtle',
    compatibleAssets: ['face', 'mascot', 'symbol', 'logo'],
    compatibleMotions: ['sway', 'breathing-glow', 'cloud-drift'],
    compatibleOverlays: ['prism-veil'],
    previewEmoji: '🌸',
    cssFilters: 'saturate(0.85) brightness(1.15) blur(0.3px)',
    maskType: 'cloud-soft'
  },
  {
    id: 'soft-moonlight',
    name: 'Soft Moonlight',
    family: 'soft-glow',
    description: 'Cool gentle radiance with calm',
    vibe: 'Peaceful and lunar',
    intensity: 'subtle',
    compatibleAssets: ['face', 'mascot', 'symbol', 'logo'],
    compatibleMotions: ['breathing-glow', 'sway'],
    compatibleOverlays: ['prism-veil'],
    previewEmoji: '🌙',
    cssFilters: 'drop-shadow(0 0 20px oklch(0.82 0.06 240)) brightness(1.08)',
    maskType: 'soft-edge-glow'
  },
  {
    id: 'neon-flare',
    name: 'Neon Flare',
    family: 'neon',
    description: 'Bright burst with electric intensity',
    vibe: 'Explosive and bright',
    intensity: 'intense',
    compatibleAssets: ['symbol', 'icon', 'logo'],
    compatibleMotions: ['lightning-flash', 'pulse-ring', 'sparkle-burst'],
    compatibleOverlays: ['soft-ring', 'echo-glow', 'spark-dust'],
    previewEmoji: '🌟',
    cssFilters: 'drop-shadow(0 0 18px oklch(0.78 0.28 180)) brightness(1.25) saturate(1.4)',
    maskType: 'starburst-rays'
  },
  {
    id: 'energy-volt',
    name: 'Energy Volt',
    family: 'energy',
    description: 'Electric shock with raw power',
    vibe: 'Electrified and intense',
    intensity: 'intense',
    compatibleAssets: ['symbol', 'icon', 'logo'],
    compatibleMotions: ['lightning-flash', 'rgb-glitch', 'pulse-ring'],
    compatibleOverlays: ['echo-glow', 'soft-ring'],
    previewEmoji: '⚡',
    cssFilters: 'drop-shadow(0 0 14px oklch(0.75 0.32 140)) contrast(1.25) saturate(1.45)',
    maskType: 'chromatic-edge'
  },
  {
    id: 'cute-sparkle',
    name: 'Cute Sparkle',
    family: 'cute',
    description: 'Twinkling charm with playful magic',
    vibe: 'Delightful and charming',
    intensity: 'subtle',
    compatibleAssets: ['mascot', 'face', 'symbol', 'icon'],
    compatibleMotions: ['sparkle-burst', 'shimmer', 'breathing-glow'],
    compatibleOverlays: ['spark-dust'],
    previewEmoji: '✨',
    cssFilters: 'saturate(1.2) brightness(1.12)',
    maskType: 'gradient-fade'
  },
  {
    id: 'techno-circuit',
    name: 'Techno Circuit',
    family: 'techno',
    description: 'Digital pathways with tech precision',
    vibe: 'Connected and systematic',
    intensity: 'medium',
    compatibleAssets: ['logo', 'symbol', 'icon'],
    compatibleMotions: ['pulse-ring', 'spin', 'shimmer'],
    compatibleOverlays: ['echo-glow'],
    previewEmoji: '🔌',
    cssFilters: 'contrast(1.2) brightness(1.1) saturate(1.1)',
    maskType: 'hard-cutout'
  },
  {
    id: 'mascot-wiggle',
    name: 'Mascot Wiggle',
    family: 'mascot',
    description: 'Playful movement with character',
    vibe: 'Playful and lively',
    intensity: 'medium',
    compatibleAssets: ['mascot', 'face'],
    compatibleMotions: ['wobble', 'sway', 'bounce'],
    compatibleOverlays: ['spark-dust'],
    previewEmoji: '🐶',
    cssFilters: 'saturate(1.12) brightness(1.08)',
    maskType: 'soft-edge-glow'
  },
  {
    id: 'cosmic-galaxy',
    name: 'Cosmic Galaxy',
    family: 'cosmic',
    description: 'Swirling stars with galactic depth',
    vibe: 'Vast and beautiful',
    intensity: 'intense',
    compatibleAssets: ['symbol', 'logo', 'icon'],
    compatibleMotions: ['spiral', 'orbit', 'sparkle-burst'],
    compatibleOverlays: ['prism-veil', 'spark-dust'],
    previewEmoji: '🌌',
    cssFilters: 'drop-shadow(0 0 24px oklch(0.52 0.28 275)) saturate(1.4) brightness(1.05)',
    maskType: 'gradient-fade'
  },
  {
    id: 'magic-portal',
    name: 'Magic Portal',
    family: 'magic',
    description: 'Dimensional gateway with mystical energy',
    vibe: 'Transformative and otherworldly',
    intensity: 'intense',
    compatibleAssets: ['symbol', 'icon', 'logo'],
    compatibleMotions: ['spiral', 'orbit', 'pulse-ring'],
    compatibleOverlays: ['prism-veil', 'soft-ring'],
    previewEmoji: '🌀',
    cssFilters: 'drop-shadow(0 0 20px oklch(0.62 0.24 285)) saturate(1.38)',
    maskType: 'gradient-fade'
  },
  {
    id: 'glitch-tear',
    name: 'Glitch Tear',
    family: 'glitch',
    description: 'Reality rip with torn edges',
    vibe: 'Broken and chaotic',
    intensity: 'intense',
    compatibleAssets: ['logo', 'symbol', 'icon'],
    compatibleMotions: ['data-corrupt', 'rgb-glitch', 'static-noise'],
    compatibleOverlays: ['echo-glow'],
    previewEmoji: '💔',
    cssFilters: 'contrast(1.3) brightness(0.95)',
    maskType: 'torn-edge'
  },
  {
    id: 'dreamy-mist',
    name: 'Dreamy Mist',
    family: 'dreamy',
    description: 'Foggy atmosphere with ethereal quality',
    vibe: 'Mysterious and soft',
    intensity: 'subtle',
    compatibleAssets: ['face', 'mascot', 'symbol'],
    compatibleMotions: ['cloud-drift', 'sway', 'breathing-glow'],
    compatibleOverlays: ['prism-veil'],
    previewEmoji: '🌫️',
    cssFilters: 'blur(1.2px) brightness(1.1) opacity(0.9)',
    maskType: 'cloud-soft'
  },
  {
    id: 'soft-sunrise',
    name: 'Soft Sunrise',
    family: 'soft-glow',
    description: 'Dawn radiance with hopeful warmth',
    vibe: 'Hopeful and fresh',
    intensity: 'subtle',
    compatibleAssets: ['face', 'mascot', 'symbol', 'logo'],
    compatibleMotions: ['breathing-glow', 'shimmer'],
    compatibleOverlays: ['prism-veil'],
    previewEmoji: '🌅',
    cssFilters: 'drop-shadow(0 0 22px oklch(0.83 0.12 60)) brightness(1.15)',
    maskType: 'gradient-fade'
  },
  {
    id: 'neon-streak',
    name: 'Neon Streak',
    family: 'neon',
    description: 'Motion trails with electric speed',
    vibe: 'Fast and dynamic',
    intensity: 'intense',
    compatibleAssets: ['logo', 'symbol', 'icon'],
    compatibleMotions: ['pixel-trail', 'spin', 'pulse-ring'],
    compatibleOverlays: ['echo-glow'],
    previewEmoji: '💨',
    cssFilters: 'drop-shadow(0 0 12px oklch(0.73 0.24 210)) saturate(1.3)',
    maskType: 'outline-stroke'
  },
  {
    id: 'energy-thunder',
    name: 'Energy Thunder',
    family: 'energy',
    description: 'Storm power with lightning force',
    vibe: 'Stormy and powerful',
    intensity: 'intense',
    compatibleAssets: ['symbol', 'icon', 'logo'],
    compatibleMotions: ['lightning-flash', 'pulse-ring', 'flicker'],
    compatibleOverlays: ['soft-ring', 'echo-glow'],
    previewEmoji: '⛈️',
    cssFilters: 'drop-shadow(0 0 16px oklch(0.70 0.30 150)) contrast(1.22) saturate(1.35)',
    maskType: 'chromatic-edge'
  },
  {
    id: 'cute-puff',
    name: 'Cute Puff',
    family: 'cute',
    description: 'Fluffy softness with gentle bounce',
    vibe: 'Soft and cuddly',
    intensity: 'subtle',
    compatibleAssets: ['mascot', 'face', 'symbol'],
    compatibleMotions: ['bounce', 'wobble', 'breathing-glow'],
    compatibleOverlays: ['spark-dust'],
    previewEmoji: '☁️',
    cssFilters: 'saturate(1.1) brightness(1.15) blur(0.2px)',
    maskType: 'cloud-soft'
  },
  {
    id: 'techno-hologram',
    name: 'Techno Hologram',
    family: 'techno',
    description: 'Projected light with sci-fi tech',
    vibe: 'Futuristic and transparent',
    intensity: 'medium',
    compatibleAssets: ['logo', 'symbol', 'icon'],
    compatibleMotions: ['shimmer', 'flicker', 'pulse-ring'],
    compatibleOverlays: ['prism-veil', 'echo-glow'],
    previewEmoji: '👁️',
    cssFilters: 'opacity(0.92) contrast(1.18) brightness(1.12)',
    maskType: 'gradient-fade'
  },
  {
    id: 'mascot-dance',
    name: 'Mascot Dance',
    family: 'mascot',
    description: 'Rhythmic movement with energy',
    vibe: 'Energetic and fun',
    intensity: 'medium',
    compatibleAssets: ['mascot', 'face'],
    compatibleMotions: ['bounce', 'wobble', 'sway'],
    compatibleOverlays: ['spark-dust'],
    previewEmoji: '💃',
    cssFilters: 'saturate(1.18) brightness(1.1)',
    maskType: 'soft-edge-glow'
  },
  {
    id: 'cosmic-comet',
    name: 'Cosmic Comet',
    family: 'cosmic',
    description: 'Trailing star with celestial speed',
    vibe: 'Swift and celestial',
    intensity: 'medium',
    compatibleAssets: ['symbol', 'icon', 'logo'],
    compatibleMotions: ['pixel-trail', 'orbit', 'shimmer'],
    compatibleOverlays: ['spark-dust', 'echo-glow'],
    previewEmoji: '☄️',
    cssFilters: 'drop-shadow(0 0 18px oklch(0.75 0.18 50)) saturate(1.25)',
    maskType: 'gradient-fade'
  }
]
