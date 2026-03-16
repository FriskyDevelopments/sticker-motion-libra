export type IntensityLevel = 'soft' | 'medium' | 'strong'
export type LoopStyle = 'continuous' | 'pulse' | 'triggered' | 'bounce'
export type StickerStyle = 'cute' | 'neon' | 'magic' | 'techno' | 'mascot'
export type MotionCategory = 
  | 'glow-and-light'
  | 'rotation-and-orbit'
  | 'bounce-and-body'
  | 'glitch-and-distortion'
  | 'particles-and-trails'
  | 'facial-and-character'

export interface MotionPreset {
  id: string
  name: string
  category: MotionCategory
  visualBehavior: string
  emotionalVibe: string
  intensity: IntensityLevel
  loopStyle: LoopStyle
  useCases: string[]
  compatibleStyles: StickerStyle[]
  technicalNotes?: string
}

export const motionPresets: MotionPreset[] = [
  {
    id: 'breathing-glow',
    name: 'Breathing Glow',
    category: 'glow-and-light',
    visualBehavior: 'Soft pulsing outer glow that expands and contracts rhythmically, like breathing. Glow radius varies 10-25px with opacity 0.3-0.7.',
    emotionalVibe: 'Calming, alive, ethereal',
    intensity: 'soft',
    loopStyle: 'continuous',
    useCases: [
      'Meditation or wellness stickers',
      'Character idle states',
      'Ambient background elements',
      'Peaceful nature themes'
    ],
    compatibleStyles: ['cute', 'magic', 'mascot'],
    technicalNotes: '3s ease-in-out loop, scale 1.0-1.15'
  },
  {
    id: 'flicker',
    name: 'Flicker',
    category: 'glow-and-light',
    visualBehavior: 'Rapid, irregular brightness variations mimicking candle flame or old neon sign. Opacity flickers between 0.7-1.0 with random intervals.',
    emotionalVibe: 'Vintage, mysterious, energetic',
    intensity: 'medium',
    loopStyle: 'continuous',
    useCases: [
      'Retro gaming stickers',
      'Halloween or spooky themes',
      'Old-school arcade aesthetics',
      'Unstable magical effects'
    ],
    compatibleStyles: ['neon', 'techno', 'magic'],
    technicalNotes: 'Random intervals 0.05-0.2s, irregular timing pattern'
  },
  {
    id: 'shimmer',
    name: 'Shimmer',
    category: 'glow-and-light',
    visualBehavior: 'Diagonal light sweep across sticker surface, like light catching a reflective surface. Gradient mask travels left-to-right creating highlight effect.',
    emotionalVibe: 'Premium, polished, attractive',
    intensity: 'soft',
    loopStyle: 'pulse',
    useCases: [
      'Product or brand stickers',
      'Achievement badges',
      'Jewelry or luxury items',
      'Call-to-action highlights'
    ],
    compatibleStyles: ['cute', 'neon', 'magic', 'mascot'],
    technicalNotes: '2s duration, 3s pause between sweeps, 45deg angle'
  },
  {
    id: 'pulse-ring',
    name: 'Pulse Ring',
    category: 'glow-and-light',
    visualBehavior: 'Concentric rings emanate outward from sticker center, fading as they expand. Creates sonar or ripple effect.',
    emotionalVibe: 'Attention-grabbing, radiating energy, impactful',
    intensity: 'strong',
    loopStyle: 'pulse',
    useCases: [
      'Notification indicators',
      'Power-up or special items',
      'Location markers',
      'Alert or attention stickers'
    ],
    compatibleStyles: ['neon', 'techno', 'magic'],
    technicalNotes: '1.5s expansion, scale 1.0-2.5, opacity 0.8-0.0'
  },
  {
    id: 'lightning-flash',
    name: 'Lightning Flash',
    category: 'glow-and-light',
    visualBehavior: 'Quick, intense brightness spike with electric glow, followed by afterglow fade. Double-flash pattern for impact.',
    emotionalVibe: 'Electric, powerful, shocking',
    intensity: 'strong',
    loopStyle: 'triggered',
    useCases: [
      'Power or energy themes',
      'Impact moments',
      'Storm or weather stickers',
      'Electric or tech elements'
    ],
    compatibleStyles: ['neon', 'techno', 'magic'],
    technicalNotes: 'Flash: 0.1s at 200% brightness, afterglow: 0.4s fade'
  },

  {
    id: 'spin',
    name: 'Spin',
    category: 'rotation-and-orbit',
    visualBehavior: 'Continuous 360° rotation around center axis at steady speed. Clockwise or counterclockwise.',
    emotionalVibe: 'Dynamic, perpetual, hypnotic',
    intensity: 'medium',
    loopStyle: 'continuous',
    useCases: [
      'Loading indicators',
      'Coin or token stickers',
      'Wheels or circular objects',
      'Dizziness or confusion emotion'
    ],
    compatibleStyles: ['cute', 'neon', 'techno', 'mascot'],
    technicalNotes: '4s per rotation, linear timing function'
  },
  {
    id: 'wobble',
    name: 'Wobble',
    category: 'rotation-and-orbit',
    visualBehavior: 'Gentle rocking rotation ±15° around center, like a metronome or pendulum. Smooth back-and-forth motion.',
    emotionalVibe: 'Playful, unstable, contemplative',
    intensity: 'soft',
    loopStyle: 'continuous',
    useCases: [
      'Thinking or pondering states',
      'Jello or soft objects',
      'Playful idle animations',
      'Drunk or dizzy effects'
    ],
    compatibleStyles: ['cute', 'mascot'],
    technicalNotes: '2s cycle, ease-in-out, ±12-15deg rotation'
  },
  {
    id: 'orbit',
    name: 'Orbit',
    category: 'rotation-and-orbit',
    visualBehavior: 'Circular path around sticker with small satellite element (star, dot, sparkle) orbiting the perimeter.',
    emotionalVibe: 'Cosmic, flowing, complete',
    intensity: 'medium',
    loopStyle: 'continuous',
    useCases: [
      'Space or cosmic themes',
      'Loading or processing states',
      'Planetary or astronomical stickers',
      'Magic spell effects'
    ],
    compatibleStyles: ['magic', 'techno', 'neon'],
    technicalNotes: '3s orbit, 120% sticker radius, secondary element required'
  },
  {
    id: 'spiral',
    name: 'Spiral',
    category: 'rotation-and-orbit',
    visualBehavior: 'Rotation combined with scale pulsing, creating hypnotic spiral-in and spiral-out effect.',
    emotionalVibe: 'Mesmerizing, surreal, transformative',
    intensity: 'strong',
    loopStyle: 'continuous',
    useCases: [
      'Hypnosis or trance themes',
      'Portal or wormhole effects',
      'Psychedelic aesthetics',
      'Transformation moments'
    ],
    compatibleStyles: ['magic', 'neon', 'techno'],
    technicalNotes: '5s cycle, rotation + scale 0.95-1.08, synchronized'
  },

  {
    id: 'bounce',
    name: 'Bounce',
    category: 'bounce-and-body',
    visualBehavior: 'Vertical bouncing motion with squash-and-stretch. Object compresses on impact, extends at peak.',
    emotionalVibe: 'Energetic, playful, bouncy',
    intensity: 'medium',
    loopStyle: 'continuous',
    useCases: [
      'Excited or happy emotions',
      'Ball or bouncy objects',
      'Jump or hop actions',
      'Celebration moments'
    ],
    compatibleStyles: ['cute', 'mascot'],
    technicalNotes: '1.2s cycle, scaleY: 0.9-1.0, translateY: -15px, ease-out'
  },
  {
    id: 'heartbeat',
    name: 'Heartbeat',
    category: 'bounce-and-body',
    visualBehavior: 'Double-pump scale animation (ba-bump rhythm) with slight pause between beats. Mimics cardiac rhythm.',
    emotionalVibe: 'Loving, alive, intense',
    intensity: 'soft',
    loopStyle: 'pulse',
    useCases: [
      'Love or romance stickers',
      'Health or wellness themes',
      'Favorite or like indicators',
      'Emotional emphasis'
    ],
    compatibleStyles: ['cute', 'mascot'],
    technicalNotes: 'Beat 1: 0.15s, Beat 2: 0.12s, pause: 0.8s, scale: 1.0-1.15-1.0-1.08-1.0'
  },
  {
    id: 'elastic-pop',
    name: 'Elastic Pop',
    category: 'bounce-and-body',
    visualBehavior: 'Sudden expansion with elastic overshoot and bounce-back. Object grows quickly, overshoots, then settles.',
    emotionalVibe: 'Surprising, delightful, impactful',
    intensity: 'strong',
    loopStyle: 'triggered',
    useCases: [
      'Appear animations',
      'Reaction stickers',
      'Pop-up notifications',
      'Surprise moments'
    ],
    compatibleStyles: ['cute', 'neon', 'mascot'],
    technicalNotes: '0.6s total, scale: 0-1.3-0.9-1.0, spring physics'
  },
  {
    id: 'sway',
    name: 'Sway',
    category: 'bounce-and-body',
    visualBehavior: 'Gentle side-to-side rocking motion with subtle scale variation, like swaying in wind.',
    emotionalVibe: 'Peaceful, flowing, gentle',
    intensity: 'soft',
    loopStyle: 'continuous',
    useCases: [
      'Plants or trees',
      'Calm or meditative states',
      'Water or wind elements',
      'Idle background animations'
    ],
    compatibleStyles: ['cute', 'magic', 'mascot'],
    technicalNotes: '3.5s cycle, translateX: ±8px, rotate: ±5deg, ease-in-out'
  },

  {
    id: 'rgb-glitch',
    name: 'RGB Glitch',
    category: 'glitch-and-distortion',
    visualBehavior: 'Color channel separation with horizontal offset. Red, green, blue channels split and realign randomly.',
    emotionalVibe: 'Digital, corrupted, cyberpunk',
    intensity: 'strong',
    loopStyle: 'triggered',
    useCases: [
      'Tech error or malfunction',
      'Cyberpunk or digital themes',
      'Hacker or code aesthetics',
      'Corruption or instability'
    ],
    compatibleStyles: ['techno', 'neon'],
    technicalNotes: 'Channel offset: ±5px, 0.1s duration, random intervals 0.8-2s'
  },
  {
    id: 'static-noise',
    name: 'Static Noise',
    category: 'glitch-and-distortion',
    visualBehavior: 'Brief overlay of TV static or digital noise texture, flickering rapidly with transparency.',
    emotionalVibe: 'Chaotic, unstable, retro-digital',
    intensity: 'medium',
    loopStyle: 'pulse',
    useCases: [
      'VHS or retro aesthetics',
      'Signal loss themes',
      'Horror or creepy effects',
      'Digital interference'
    ],
    compatibleStyles: ['techno', 'neon'],
    technicalNotes: '0.15s bursts, noise opacity: 0.3-0.6, random timing'
  },
  {
    id: 'data-corrupt',
    name: 'Data Corrupt',
    category: 'glitch-and-distortion',
    visualBehavior: 'Horizontal slice displacement creating scanline effect. Random rows shift left/right briefly.',
    emotionalVibe: 'Broken, unstable, fragmented',
    intensity: 'strong',
    loopStyle: 'triggered',
    useCases: [
      'Error states',
      'Matrix or code themes',
      'Hacking visuals',
      'System failure moments'
    ],
    compatibleStyles: ['techno', 'neon'],
    technicalNotes: '3-5 horizontal slices, offset: ±10-30px, 0.08s duration'
  },

  {
    id: 'sparkle-burst',
    name: 'Sparkle Burst',
    category: 'particles-and-trails',
    visualBehavior: 'Multiple small sparkles emit from sticker center in starburst pattern, scaling up and fading out.',
    emotionalVibe: 'Magical, celebratory, dazzling',
    intensity: 'medium',
    loopStyle: 'pulse',
    useCases: [
      'Magic or fantasy themes',
      'Success or achievement',
      'Special or rare items',
      'Celebration moments'
    ],
    compatibleStyles: ['magic', 'cute'],
    technicalNotes: '8-12 particles, radial emission 360°, 0.8s lifespan, scale: 0-1-0'
  },
  {
    id: 'confetti-rain',
    name: 'Confetti Rain',
    category: 'particles-and-trails',
    visualBehavior: 'Colorful confetti pieces fall from top, rotating and tumbling with slight horizontal drift.',
    emotionalVibe: 'Joyful, festive, victorious',
    intensity: 'strong',
    loopStyle: 'continuous',
    useCases: [
      'Celebration or party themes',
      'Victory or win states',
      'Birthday or special events',
      'Achievement unlocks'
    ],
    compatibleStyles: ['cute', 'neon', 'mascot'],
    technicalNotes: '6-10 particles, fall speed: 2-3s, rotation: 0-720deg, varying colors'
  },
  {
    id: 'cloud-drift',
    name: 'Cloud Drift',
    category: 'particles-and-trails',
    visualBehavior: 'Soft, semi-transparent clouds slowly drift horizontally across sticker, creating dreamy atmosphere.',
    emotionalVibe: 'Dreamy, peaceful, floating',
    intensity: 'soft',
    loopStyle: 'continuous',
    useCases: [
      'Sky or weather themes',
      'Dreams or sleep states',
      'Peaceful backgrounds',
      'Heaven or angelic themes'
    ],
    compatibleStyles: ['cute', 'magic', 'mascot'],
    technicalNotes: '2-3 cloud layers, 8-12s drift, opacity: 0.2-0.4, blur: 2px'
  },
  {
    id: 'pixel-trail',
    name: 'Pixel Trail',
    category: 'particles-and-trails',
    visualBehavior: 'Motion trail of pixelated afterimages following sticker movement, fading progressively.',
    emotionalVibe: 'Retro, speedy, arcade',
    intensity: 'medium',
    loopStyle: 'continuous',
    useCases: [
      'Retro gaming aesthetics',
      'Speed or fast movement',
      '8-bit or pixel art themes',
      'Action or dash effects'
    ],
    compatibleStyles: ['techno', 'neon'],
    technicalNotes: '3-5 trail copies, 0.3s fade, decreasing opacity: 0.6-0.4-0.2'
  },

  {
    id: 'blink',
    name: 'Blink',
    category: 'facial-and-character',
    visualBehavior: 'Quick eye closure and reopening. Eyes compress vertically to thin line, then restore.',
    emotionalVibe: 'Lifelike, attentive, natural',
    intensity: 'soft',
    loopStyle: 'pulse',
    useCases: [
      'Character idle states',
      'Mascot animations',
      'Facial expressions',
      'Living object themes'
    ],
    compatibleStyles: ['cute', 'mascot'],
    technicalNotes: 'Close: 0.08s, pause: 0.04s, open: 0.12s, interval: 3-5s random'
  },
  {
    id: 'eye-shift',
    name: 'Eye Shift',
    category: 'facial-and-character',
    visualBehavior: 'Eyes move left-right or up-down, pupils tracking as if looking around curiously.',
    emotionalVibe: 'Curious, alert, sneaky',
    intensity: 'soft',
    loopStyle: 'pulse',
    useCases: [
      'Suspicious or cautious expressions',
      'Curious character states',
      'Looking animation',
      'Interactive awareness'
    ],
    compatibleStyles: ['cute', 'mascot'],
    technicalNotes: 'Shift: ±8-12px, 0.3s movement, 1s hold, random direction'
  },
  {
    id: 'smile-grow',
    name: 'Smile Grow',
    category: 'facial-and-character',
    visualBehavior: 'Mouth expands from neutral to wide smile, often with eyes squinting or closing slightly.',
    emotionalVibe: 'Delighted, warming, friendly',
    intensity: 'medium',
    loopStyle: 'triggered',
    useCases: [
      'Happy reactions',
      'Positive feedback',
      'Greeting moments',
      'Joy expressions'
    ],
    compatibleStyles: ['cute', 'mascot'],
    technicalNotes: '0.4s expansion, scaleX: 1.0-1.3, scaleY: 1.0-1.1'
  },
  {
    id: 'head-tilt',
    name: 'Head Tilt',
    category: 'facial-and-character',
    visualBehavior: 'Character tilts head to one side, rotating 10-15°, conveying curiosity or confusion.',
    emotionalVibe: 'Curious, confused, adorable',
    intensity: 'soft',
    loopStyle: 'pulse',
    useCases: [
      'Question or confusion states',
      'Cute character moments',
      'Listening or attentive poses',
      'Endearing expressions'
    ],
    compatibleStyles: ['cute', 'mascot'],
    technicalNotes: '0.5s tilt, hold 1.5s, return 0.5s, ±12-15deg rotation'
  },
  {
    id: 'cheek-blush',
    name: 'Cheek Blush',
    category: 'facial-and-character',
    visualBehavior: 'Rosy cheek circles fade in with gentle pulsing glow, suggesting embarrassment or warmth.',
    emotionalVibe: 'Shy, warm, endearing',
    intensity: 'soft',
    loopStyle: 'pulse',
    useCases: [
      'Embarrassed or shy emotions',
      'Love or crush reactions',
      'Compliment responses',
      'Cute character states'
    ],
    compatibleStyles: ['cute', 'mascot'],
    technicalNotes: 'Fade in: 0.4s, pulse opacity: 0.6-0.8, pink/red tint'
  }
]

export const categoryInfo: Record<MotionCategory, { name: string; description: string; icon: string }> = {
  'glow-and-light': {
    name: 'Glow & Light Effects',
    description: 'Luminous animations that add radiance and energy',
    icon: 'Sparkles'
  },
  'rotation-and-orbit': {
    name: 'Rotation & Orbit',
    description: 'Circular and spinning motion patterns',
    icon: 'ArrowsClockwise'
  },
  'bounce-and-body': {
    name: 'Bounce & Body Motion',
    description: 'Physical movements with squash and stretch',
    icon: 'ArrowsOutCardinal'
  },
  'glitch-and-distortion': {
    name: 'Glitch & Distortion',
    description: 'Digital corruption and cyberpunk effects',
    icon: 'Lightning'
  },
  'particles-and-trails': {
    name: 'Particles & Trails',
    description: 'Emitters and atmospheric effects',
    icon: 'Snowflake'
  },
  'facial-and-character': {
    name: 'Facial & Character',
    description: 'Micro-animations for living characters',
    icon: 'Smiley'
  }
}

export const styleInfo: Record<StickerStyle, { color: string; label: string }> = {
  cute: { color: 'oklch(0.75 0.15 350)', label: 'Cute' },
  neon: { color: 'oklch(0.75 0.20 200)', label: 'Neon' },
  magic: { color: 'oklch(0.70 0.18 290)', label: 'Magic' },
  techno: { color: 'oklch(0.60 0.18 250)', label: 'Techno' },
  mascot: { color: 'oklch(0.70 0.15 50)', label: 'Mascot' }
}
