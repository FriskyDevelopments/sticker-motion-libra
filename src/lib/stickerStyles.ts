export type MaskType = 
  | 'clean'
  | 'soft'
  | 'glow'
  | 'aura'

export type VibeCategory = 
  | 'magic-effects'
  | 'energy-tech'
  | 'character-motion'
  | 'atmosphere'

export interface MaskPreset {
  id: string
  name: string
  description: string
  technicalSpec: string
}

export interface StickerStyle {
  id: string
  name: string
  vibe: VibeCategory
  tags: string[]
  
  mask: {
    type: MaskType
    name: string
    description: string
  }
  
  motion: {
    id: string
    name: string
    behavior: string
  }
  
  previewEmoji: string
  description: string
  conversionPitch: string
  
  intensity: 'subtle' | 'medium' | 'intense'
  bestFor: string[]
}

export const vibeInfo: Record<VibeCategory, { 
  name: string
  description: string
  color: string 
}> = {
  'magic-effects': {
    name: '✨ Magic Effects',
    description: 'Ethereal glows, shimmers, and enchanting animations',
    color: 'oklch(0.75 0.18 290)'
  },
  'energy-tech': {
    name: '⚡ Energy & Tech',
    description: 'Glitches, pulses, and cyberpunk vibes',
    color: 'oklch(0.65 0.20 250)'
  },
  'character-motion': {
    name: '🐾 Character Motion',
    description: 'Bounces, wobbles, and living personality',
    color: 'oklch(0.75 0.15 350)'
  },
  'atmosphere': {
    name: '🌌 Atmosphere',
    description: 'Particles, drifts, and ambient magic',
    color: 'oklch(0.70 0.15 200)'
  }
}

export const stickerStyles: StickerStyle[] = [
  {
    id: 'aurora-neon-glow',
    name: 'Aurora Neon Glow',
    vibe: 'magic-effects',
    tags: ['Neon', 'Ethereal', 'Soft'],
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
    description: 'Calming ethereal glow perfect for dreamy, mystical stickers',
    conversionPitch: 'Transform your image into a mesmerizing luminous sticker',
    intensity: 'subtle',
    bestFor: ['Meditation', 'Wellness', 'Ambient', 'Peaceful themes']
  },
  
  {
    id: 'electric-pulse-ring',
    name: 'Electric Pulse Ring',
    vibe: 'energy-tech',
    tags: ['Techno', 'Bold', 'Attention'],
    mask: {
      type: 'outline-stroke',
      name: 'Outline Stroke',
      description: 'Clean vector outline with sharp definition'
    },
    motion: {
      id: 'pulse-ring',
      name: 'Pulse Ring',
      behavior: 'Radiating rings emanate outward like sonar'
    },
    previewEmoji: '⚡',
    description: 'High-impact pulsing energy for attention-grabbing stickers',
    conversionPitch: 'Make your sticker demand attention with electric pulses',
    intensity: 'intense',
    bestFor: ['Notifications', 'Alerts', 'Power-ups', 'Tech themes']
  },
  
  {
    id: 'shimmer-luxury',
    name: 'Shimmer Luxury',
    vibe: 'magic-effects',
    tags: ['Premium', 'Polished', 'Elegant'],
    mask: {
      type: 'gradient-fade',
      name: 'Gradient Fade',
      description: 'Smooth gradient transparency for refined edges'
    },
    motion: {
      id: 'shimmer',
      name: 'Shimmer',
      behavior: 'Light sweep across surface like catching reflection'
    },
    previewEmoji: '💎',
    description: 'Premium shimmer effect for luxury and achievement stickers',
    conversionPitch: 'Give your sticker that premium, polished shine',
    intensity: 'subtle',
    bestFor: ['Brands', 'Achievements', 'Luxury items', 'Highlights']
  },
  
  {
    id: 'data-corrupt-glitch',
    name: 'Data Corrupt',
    vibe: 'energy-tech',
    tags: ['Glitch', 'Cyberpunk', 'Digital'],
    mask: {
      type: 'pixelated-border',
      name: 'Pixelated Border',
      description: '8-bit style pixelated edges for retro digital feel'
    },
    motion: {
      id: 'data-corrupt',
      name: 'Data Corrupt',
      behavior: 'Scanline slices with horizontal displacement'
    },
    previewEmoji: '🔧',
    description: 'Chaotic digital corruption for hacker and tech aesthetics',
    conversionPitch: 'Corrupt your image with cyberpunk glitch vibes',
    intensity: 'intense',
    bestFor: ['Hacking', 'Errors', 'Tech', 'Matrix themes']
  },
  
  {
    id: 'rgb-chromatic',
    name: 'RGB Chromatic',
    vibe: 'energy-tech',
    tags: ['Glitch', 'Color', 'Modern'],
    mask: {
      type: 'chromatic-edge',
      name: 'Chromatic Edge',
      description: 'Color-separated edge with RGB shift'
    },
    motion: {
      id: 'rgb-glitch',
      name: 'RGB Glitch',
      behavior: 'Color channel separation with random triggers'
    },
    previewEmoji: '📺',
    description: 'Retro VHS color separation for nostalgic digital vibes',
    conversionPitch: 'Split your sticker into trippy RGB chromatic glory',
    intensity: 'intense',
    bestFor: ['Cyberpunk', 'Retro', 'Digital art', 'Tech errors']
  },
  
  {
    id: 'bounce-joy',
    name: 'Bounce Joy',
    vibe: 'character-motion',
    tags: ['Playful', 'Happy', 'Energetic'],
    mask: {
      type: 'soft-edge-glow',
      name: 'Soft Edge Glow',
      description: 'Gentle glow with smooth edges'
    },
    motion: {
      id: 'bounce',
      name: 'Bounce',
      behavior: 'Vertical bounce with squash-and-stretch physics'
    },
    previewEmoji: '🎾',
    description: 'Energetic bouncing perfect for happy, excited emotions',
    conversionPitch: 'Add playful bouncing energy to your character',
    intensity: 'medium',
    bestFor: ['Happy emotions', 'Celebrations', 'Playful characters', 'Joy']
  },
  
  {
    id: 'heartbeat-love',
    name: 'Heartbeat Love',
    vibe: 'character-motion',
    tags: ['Cute', 'Love', 'Emotional'],
    mask: {
      type: 'gradient-fade',
      name: 'Gradient Fade',
      description: 'Soft gradient edges for gentle appearance'
    },
    motion: {
      id: 'heartbeat',
      name: 'Heartbeat',
      behavior: 'Double-pump rhythm like a heart beating'
    },
    previewEmoji: '💗',
    description: 'Sweet rhythmic pulse for romantic and loving stickers',
    conversionPitch: 'Make your sticker beat with love and warmth',
    intensity: 'subtle',
    bestFor: ['Romance', 'Love', 'Favorites', 'Emotional moments']
  },
  
  {
    id: 'wobble-jelly',
    name: 'Wobble Jelly',
    vibe: 'character-motion',
    tags: ['Playful', 'Soft', 'Cute'],
    mask: {
      type: 'cloud-soft',
      name: 'Cloud Soft',
      description: 'Ultra-soft diffused edges like clouds'
    },
    motion: {
      id: 'wobble',
      name: 'Wobble',
      behavior: 'Gentle rocking side-to-side motion'
    },
    previewEmoji: '🍮',
    description: 'Jiggly wobble motion for soft, squishy characters',
    conversionPitch: 'Give your sticker that adorable jiggly wobble',
    intensity: 'subtle',
    bestFor: ['Cute characters', 'Soft objects', 'Playful moods', 'Jelly']
  },
  
  {
    id: 'sparkle-burst-magic',
    name: 'Sparkle Burst',
    vibe: 'atmosphere',
    tags: ['Magic', 'Celebration', 'Sparkles'],
    mask: {
      type: 'starburst-rays',
      name: 'Starburst Rays',
      description: 'Radiating points creating star shape'
    },
    motion: {
      id: 'sparkle-burst',
      name: 'Sparkle Burst',
      behavior: 'Particles emit in starburst pattern with fade'
    },
    previewEmoji: '✨',
    description: 'Magical sparkle explosion for special moments',
    conversionPitch: 'Surround your sticker with dazzling sparkle magic',
    intensity: 'medium',
    bestFor: ['Magic', 'Achievements', 'Special items', 'Celebrations']
  },
  
  {
    id: 'confetti-celebration',
    name: 'Confetti Party',
    vibe: 'atmosphere',
    tags: ['Party', 'Joy', 'Festive'],
    mask: {
      type: 'hard-cutout',
      name: 'Hard Cutout',
      description: 'Sharp clean edges with no feathering'
    },
    motion: {
      id: 'confetti-rain',
      name: 'Confetti Rain',
      behavior: 'Colorful pieces tumble and fall from above'
    },
    previewEmoji: '🎉',
    description: 'Festive confetti rain for celebration and victory',
    conversionPitch: 'Celebrate with your sticker in a shower of confetti',
    intensity: 'intense',
    bestFor: ['Celebrations', 'Wins', 'Parties', 'Birthdays']
  },
  
  {
    id: 'cloud-dream',
    name: 'Cloud Dream',
    vibe: 'atmosphere',
    tags: ['Dreamy', 'Peaceful', 'Soft'],
    mask: {
      type: 'cloud-soft',
      name: 'Cloud Soft',
      description: 'Dreamy soft edges with blur'
    },
    motion: {
      id: 'cloud-drift',
      name: 'Cloud Drift',
      behavior: 'Gentle drifting clouds across the scene'
    },
    previewEmoji: '☁️',
    description: 'Peaceful drifting clouds for dreamy atmospheres',
    conversionPitch: 'Float your sticker in a dreamy cloud atmosphere',
    intensity: 'subtle',
    bestFor: ['Dreams', 'Sleep', 'Peace', 'Sky themes']
  },
  
  {
    id: 'lightning-flash-power',
    name: 'Lightning Flash',
    vibe: 'energy-tech',
    tags: ['Electric', 'Power', 'Impact'],
    mask: {
      type: 'outline-stroke',
      name: 'Outline Stroke',
      description: 'Bold outline for high contrast'
    },
    motion: {
      id: 'lightning-flash',
      name: 'Lightning Flash',
      behavior: 'Sudden bright flash with electric afterglow'
    },
    previewEmoji: '⚡',
    description: 'Powerful electric flash for high-impact moments',
    conversionPitch: 'Electrify your sticker with lightning power',
    intensity: 'intense',
    bestFor: ['Power', 'Energy', 'Thunder', 'Impact']
  },
  
  {
    id: 'spin-hypnotic',
    name: 'Hypnotic Spin',
    vibe: 'character-motion',
    tags: ['Dynamic', 'Continuous', 'Mesmerizing'],
    mask: {
      type: 'hard-cutout',
      name: 'Hard Cutout',
      description: 'Clean edges for clear rotation'
    },
    motion: {
      id: 'spin',
      name: 'Spin',
      behavior: 'Steady 360° continuous rotation'
    },
    previewEmoji: '💫',
    description: 'Smooth perpetual spin for coins, wheels, and loading',
    conversionPitch: 'Set your sticker spinning in endless rotation',
    intensity: 'medium',
    bestFor: ['Loading', 'Coins', 'Wheels', 'Dizziness']
  },
  
  {
    id: 'orbit-cosmic',
    name: 'Cosmic Orbit',
    vibe: 'atmosphere',
    tags: ['Space', 'Magic', 'Flowing'],
    mask: {
      type: 'soft-edge-glow',
      name: 'Soft Edge Glow',
      description: 'Glowing edges for cosmic feel'
    },
    motion: {
      id: 'orbit',
      name: 'Orbit',
      behavior: 'Particles orbit around the sticker perimeter'
    },
    previewEmoji: '🌍',
    description: 'Celestial orbit effect for space and magical themes',
    conversionPitch: 'Give your sticker orbiting cosmic satellites',
    intensity: 'medium',
    bestFor: ['Space', 'Planets', 'Magic spells', 'Loading']
  },
  
  {
    id: 'spiral-trance',
    name: 'Spiral Trance',
    vibe: 'magic-effects',
    tags: ['Hypnotic', 'Psychedelic', 'Surreal'],
    mask: {
      type: 'gradient-fade',
      name: 'Gradient Fade',
      description: 'Smooth fade for seamless spiral'
    },
    motion: {
      id: 'spiral',
      name: 'Spiral',
      behavior: 'Rotation combined with pulsing scale'
    },
    previewEmoji: '🌀',
    description: 'Mesmerizing spiral for hypnotic and transformative effects',
    conversionPitch: 'Hypnotize with spiraling psychedelic motion',
    intensity: 'intense',
    bestFor: ['Hypnosis', 'Portals', 'Psychedelic', 'Transformation']
  },
  
  {
    id: 'elastic-pop-surprise',
    name: 'Elastic Pop',
    vibe: 'character-motion',
    tags: ['Surprise', 'Impact', 'Playful'],
    mask: {
      type: 'soft-edge-glow',
      name: 'Soft Edge Glow',
      description: 'Soft glow enhances pop effect'
    },
    motion: {
      id: 'elastic-pop',
      name: 'Elastic Pop',
      behavior: 'Sudden expansion with elastic bounce-back'
    },
    previewEmoji: '💥',
    description: 'Surprising elastic pop for impactful appearances',
    conversionPitch: 'Pop your sticker into view with elastic surprise',
    intensity: 'intense',
    bestFor: ['Reactions', 'Surprises', 'Pop-ups', 'Notifications']
  },
  
  {
    id: 'flicker-neon-sign',
    name: 'Neon Sign Flicker',
    vibe: 'energy-tech',
    tags: ['Retro', 'Neon', 'Vintage'],
    mask: {
      type: 'outline-stroke',
      name: 'Outline Stroke',
      description: 'Bold stroke mimicking neon tubes'
    },
    motion: {
      id: 'flicker',
      name: 'Flicker',
      behavior: 'Irregular brightness variations like old neon'
    },
    previewEmoji: '🪧',
    description: 'Vintage neon sign flicker for retro aesthetics',
    conversionPitch: 'Give your sticker that iconic neon sign flicker',
    intensity: 'medium',
    bestFor: ['Retro', 'Arcade', 'Neon', 'Vintage']
  },
  
  {
    id: 'sway-breeze',
    name: 'Gentle Breeze',
    vibe: 'atmosphere',
    tags: ['Peaceful', 'Natural', 'Flowing'],
    mask: {
      type: 'cloud-soft',
      name: 'Cloud Soft',
      description: 'Soft natural edges'
    },
    motion: {
      id: 'sway',
      name: 'Sway',
      behavior: 'Gentle side-to-side rocking like wind'
    },
    previewEmoji: '🌿',
    description: 'Calm swaying motion for plants and peaceful scenes',
    conversionPitch: 'Sway your sticker gently in an invisible breeze',
    intensity: 'subtle',
    bestFor: ['Plants', 'Nature', 'Calm', 'Wind']
  },
  
  {
    id: 'pixel-trail-retro',
    name: 'Pixel Trail',
    vibe: 'energy-tech',
    tags: ['Retro', '8-bit', 'Speed'],
    mask: {
      type: 'pixelated-border',
      name: 'Pixelated Border',
      description: 'Chunky pixel edges for retro feel'
    },
    motion: {
      id: 'pixel-trail',
      name: 'Pixel Trail',
      behavior: 'Afterimage trail with pixel aesthetic'
    },
    previewEmoji: '🎮',
    description: 'Retro gaming trail effect for speed and action',
    conversionPitch: 'Add retro pixel motion trails to your sticker',
    intensity: 'medium',
    bestFor: ['Gaming', 'Speed', '8-bit', 'Retro']
  },
  
  {
    id: 'static-vhs',
    name: 'VHS Static',
    vibe: 'energy-tech',
    tags: ['Retro', 'Horror', 'Analog'],
    mask: {
      type: 'torn-edge',
      name: 'Torn Edge',
      description: 'Rough irregular edges'
    },
    motion: {
      id: 'static-noise',
      name: 'Static Noise',
      behavior: 'TV static overlay with flicker'
    },
    previewEmoji: '📼',
    description: 'VHS tape static for retro horror and analog aesthetics',
    conversionPitch: 'Corrupt your sticker with nostalgic VHS static',
    intensity: 'medium',
    bestFor: ['VHS', 'Horror', 'Retro', 'Analog']
  }
]

export const maskPresets: Record<MaskType, MaskPreset> = {
  clean: {
    id: 'clean',
    name: 'Clean Cut',
    description: 'Sharp sticker cut with crisp edges',
    technicalSpec: 'contrast(1.05) brightness(1.02)'
  },
  soft: {
    id: 'soft',
    name: 'Soft Edge',
    description: 'Gentle feathered edges for smooth blending',
    technicalSpec: 'blur(0.5px) contrast(0.98)'
  },
  glow: {
    id: 'glow',
    name: 'Glow Edge',
    description: 'Luminous edges with outer glow',
    technicalSpec: 'drop-shadow(0 0 8px oklch(0.65 0.20 160)) brightness(1.1)'
  },
  aura: {
    id: 'aura',
    name: 'Aura Edge',
    description: 'Diffused atmospheric halo around subject',
    technicalSpec: 'drop-shadow(0 0 16px oklch(0.75 0.15 280)) blur(0.3px) brightness(1.15)'
  }
}
