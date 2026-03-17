export type LoaderFamily = 
  | 'minimal'
  | 'magical'
  | 'premium-glow'
  | 'techno-energy'
  | 'experimental'

export type ProcessingStage = 
  | 'uploading'
  | 'background-removal'
  | 'style-application'
  | 'rendering'
  | 'exporting'

export interface Loader {
  id: string
  name: string
  family: LoaderFamily
  description: string
  vibe: string
  animationPattern: string
  duration: number
  compatibleStages: ProcessingStage[]
}

export const loaderFamilyInfo: Record<LoaderFamily, {
  name: string
  description: string
  color: string
  mood: string
}> = {
  minimal: {
    name: 'Minimal',
    description: 'Clean and simple animations',
    color: 'oklch(0.60 0.05 240)',
    mood: 'Professional and understated'
  },
  magical: {
    name: 'Magical',
    description: 'Enchanting and mystical effects',
    color: 'oklch(0.70 0.18 290)',
    mood: 'Wonder-filled and transformative'
  },
  'premium-glow': {
    name: 'Premium Glow',
    description: 'Luxurious radiant animations',
    color: 'oklch(0.75 0.20 50)',
    mood: 'High-end and polished'
  },
  'techno-energy': {
    name: 'Techno Energy',
    description: 'Digital and futuristic',
    color: 'oklch(0.65 0.22 200)',
    mood: 'Tech-forward and dynamic'
  },
  experimental: {
    name: 'Experimental',
    description: 'Unique and unconventional',
    color: 'oklch(0.72 0.24 320)',
    mood: 'Creative and surprising'
  }
}

export const loaders: Loader[] = [
  {
    id: 'conjuring',
    name: 'Conjuring',
    family: 'magical',
    description: 'Mystical particles gathering and dispersing',
    vibe: 'Magical summoning energy',
    animationPattern: 'Particles spiral inward then burst outward in rhythm',
    duration: 2000,
    compatibleStages: ['uploading', 'style-application', 'rendering']
  },
  {
    id: 'infusing',
    name: 'Infusing',
    family: 'magical',
    description: 'Energy flowing into the center',
    vibe: 'Power building up',
    animationPattern: 'Flowing streams converging to center with glow',
    duration: 1800,
    compatibleStages: ['style-application', 'rendering']
  },
  {
    id: 'refining',
    name: 'Refining',
    family: 'premium-glow',
    description: 'Polish shimmer with elegant motion',
    vibe: 'Premium craftsmanship',
    animationPattern: 'Sweeping light with shimmer trail',
    duration: 2200,
    compatibleStages: ['background-removal', 'style-application', 'rendering']
  },
  {
    id: 'rendering',
    name: 'Rendering',
    family: 'techno-energy',
    description: 'Scan lines building the image',
    vibe: 'Technical processing',
    animationPattern: 'Horizontal scanlines filling from top to bottom',
    duration: 1500,
    compatibleStages: ['rendering', 'exporting']
  },
  {
    id: 'packing',
    name: 'Packing',
    family: 'techno-energy',
    description: 'Data compression visual',
    vibe: 'Efficient bundling',
    animationPattern: 'Grid cells filling with pulse',
    duration: 1600,
    compatibleStages: ['exporting']
  },
  {
    id: 'dot-pulse',
    name: 'Dot Pulse',
    family: 'minimal',
    description: 'Simple pulsing dots',
    vibe: 'Clean and minimal',
    animationPattern: 'Three dots pulsing in sequence',
    duration: 1200,
    compatibleStages: ['uploading', 'background-removal', 'style-application', 'rendering', 'exporting']
  },
  {
    id: 'ring-spin',
    name: 'Ring Spin',
    family: 'minimal',
    description: 'Rotating circular ring',
    vibe: 'Simple and continuous',
    animationPattern: 'Single ring rotating with gradient tail',
    duration: 1000,
    compatibleStages: ['uploading', 'background-removal', 'style-application', 'rendering', 'exporting']
  },
  {
    id: 'glow-orb',
    name: 'Glow Orb',
    family: 'premium-glow',
    description: 'Pulsing radiant sphere',
    vibe: 'Luxurious and warm',
    animationPattern: 'Sphere with expanding glow rings',
    duration: 1800,
    compatibleStages: ['style-application', 'rendering']
  },
  {
    id: 'sparkle-forge',
    name: 'Sparkle Forge',
    family: 'magical',
    description: 'Creating magic with sparkles',
    vibe: 'Crafting enchantment',
    animationPattern: 'Sparkles appearing and orbiting before fading',
    duration: 2000,
    compatibleStages: ['style-application', 'rendering']
  },
  {
    id: 'data-stream',
    name: 'Data Stream',
    family: 'techno-energy',
    description: 'Binary code flowing',
    vibe: 'Digital processing',
    animationPattern: 'Vertical streams of binary characters',
    duration: 1400,
    compatibleStages: ['uploading', 'background-removal', 'exporting']
  },
  {
    id: 'prism-shift',
    name: 'Prism Shift',
    family: 'premium-glow',
    description: 'Color spectrum rotating',
    vibe: 'Elegant and colorful',
    animationPattern: 'Rotating gradient with chromatic shift',
    duration: 2400,
    compatibleStages: ['style-application', 'rendering']
  },
  {
    id: 'morphing-shapes',
    name: 'Morphing Shapes',
    family: 'experimental',
    description: 'Geometric transformations',
    vibe: 'Creative and dynamic',
    animationPattern: 'Shapes morphing between circle, square, triangle',
    duration: 2000,
    compatibleStages: ['uploading', 'style-application', 'rendering']
  },
  {
    id: 'pixel-assemble',
    name: 'Pixel Assemble',
    family: 'techno-energy',
    description: 'Retro pixel building effect',
    vibe: '8-bit nostalgia',
    animationPattern: 'Pixels appearing randomly to form shape',
    duration: 1600,
    compatibleStages: ['rendering', 'exporting']
  },
  {
    id: 'aurora-wave',
    name: 'Aurora Wave',
    family: 'magical',
    description: 'Flowing color waves',
    vibe: 'Ethereal and flowing',
    animationPattern: 'Gradient waves undulating with color shift',
    duration: 2500,
    compatibleStages: ['style-application', 'rendering']
  },
  {
    id: 'bounce-dots',
    name: 'Bounce Dots',
    family: 'minimal',
    description: 'Playful bouncing animation',
    vibe: 'Light and fun',
    animationPattern: 'Dots bouncing up and down with different timing',
    duration: 1300,
    compatibleStages: ['uploading', 'background-removal', 'style-application', 'rendering', 'exporting']
  },
  {
    id: 'circuit-pulse',
    name: 'Circuit Pulse',
    family: 'techno-energy',
    description: 'Electric pathways lighting up',
    vibe: 'Connected and energized',
    animationPattern: 'Circuit lines glowing in sequence',
    duration: 1700,
    compatibleStages: ['background-removal', 'style-application', 'rendering']
  },
  {
    id: 'crystal-grow',
    name: 'Crystal Grow',
    family: 'magical',
    description: 'Crystalline formation emerging',
    vibe: 'Natural magic forming',
    animationPattern: 'Crystal shapes growing from center outward',
    duration: 2100,
    compatibleStages: ['style-application', 'rendering']
  },
  {
    id: 'shimmer-cascade',
    name: 'Shimmer Cascade',
    family: 'premium-glow',
    description: 'Falling light particles',
    vibe: 'Elegant and graceful',
    animationPattern: 'Shimmering particles cascading downward',
    duration: 2000,
    compatibleStages: ['style-application', 'rendering', 'exporting']
  },
  {
    id: 'vortex-spin',
    name: 'Vortex Spin',
    family: 'experimental',
    description: 'Spiraling energy vortex',
    vibe: 'Intense and hypnotic',
    animationPattern: 'Spiral arms rotating with particles',
    duration: 1900,
    compatibleStages: ['style-application', 'rendering']
  },
  {
    id: 'fade-pulse',
    name: 'Fade Pulse',
    family: 'minimal',
    description: 'Simple opacity pulsing',
    vibe: 'Subtle and clean',
    animationPattern: 'Single element fading in and out',
    duration: 1400,
    compatibleStages: ['uploading', 'background-removal', 'style-application', 'rendering', 'exporting']
  }
]

export const stageInfo: Record<ProcessingStage, {
  name: string
  description: string
  typicalDuration: number
}> = {
  uploading: {
    name: 'Uploading',
    description: 'Transferring your image',
    typicalDuration: 1500
  },
  'background-removal': {
    name: 'Background Removal',
    description: 'AI isolating the subject',
    typicalDuration: 3000
  },
  'style-application': {
    name: 'Style Application',
    description: 'Applying magical effects',
    typicalDuration: 2000
  },
  rendering: {
    name: 'Rendering',
    description: 'Finalizing your sticker',
    typicalDuration: 2500
  },
  exporting: {
    name: 'Exporting',
    description: 'Preparing download',
    typicalDuration: 1000
  }
}

export function getLoaderForStage(stage: ProcessingStage, family?: LoaderFamily): Loader {
  const compatibleLoaders = loaders.filter(loader => 
    loader.compatibleStages.includes(stage) &&
    (!family || loader.family === family)
  )
  
  if (compatibleLoaders.length === 0) {
    return loaders.find(l => l.id === 'dot-pulse')!
  }
  
  return compatibleLoaders[0]
}
