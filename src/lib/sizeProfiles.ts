export type SizeProfile = 
  | 'sticker'
  | 'badge'
  | 'portrait'
  | 'symbol'
  | 'pack-tile'
  | 'story'

export interface SizeProfileConfig {
  id: SizeProfile
  name: string
  description: string
  dimensions: {
    width: number
    height: number
  }
  aspectRatio: string
  bestFor: string[]
  recommendedStyles: string[]
  exportFormat: 'png' | 'webp' | 'gif'
  qualityTier: 'standard' | 'high' | 'premium'
}

export const sizeProfiles: Record<SizeProfile, SizeProfileConfig> = {
  sticker: {
    id: 'sticker',
    name: 'Sticker',
    description: 'Standard sticker size for messaging apps',
    dimensions: {
      width: 512,
      height: 512
    },
    aspectRatio: '1:1',
    bestFor: ['Messaging apps', 'Telegram', 'WhatsApp', 'iMessage'],
    recommendedStyles: ['cute', 'mascot', 'magic', 'neon'],
    exportFormat: 'webp',
    qualityTier: 'high'
  },
  badge: {
    id: 'badge',
    name: 'Badge',
    description: 'Small icon or badge format',
    dimensions: {
      width: 256,
      height: 256
    },
    aspectRatio: '1:1',
    bestFor: ['Icons', 'Profile badges', 'Achievements', 'App icons'],
    recommendedStyles: ['techno', 'neon', 'energy'],
    exportFormat: 'png',
    qualityTier: 'standard'
  },
  portrait: {
    id: 'portrait',
    name: 'Portrait',
    description: 'Vertical format for faces and characters',
    dimensions: {
      width: 512,
      height: 768
    },
    aspectRatio: '2:3',
    bestFor: ['Character portraits', 'Face stickers', 'Vertical compositions'],
    recommendedStyles: ['mascot', 'cute', 'dreamy', 'soft-glow'],
    exportFormat: 'webp',
    qualityTier: 'high'
  },
  symbol: {
    id: 'symbol',
    name: 'Symbol',
    description: 'Square format for logos and symbols',
    dimensions: {
      width: 1024,
      height: 1024
    },
    aspectRatio: '1:1',
    bestFor: ['Logos', 'Symbols', 'Brand marks', 'High-res icons'],
    recommendedStyles: ['techno', 'neon', 'cosmic', 'magic'],
    exportFormat: 'png',
    qualityTier: 'premium'
  },
  'pack-tile': {
    id: 'pack-tile',
    name: 'Pack Tile',
    description: 'Compact tile for sticker pack previews',
    dimensions: {
      width: 192,
      height: 192
    },
    aspectRatio: '1:1',
    bestFor: ['Sticker pack covers', 'Grid displays', 'Thumbnails'],
    recommendedStyles: ['cute', 'magic', 'neon'],
    exportFormat: 'webp',
    qualityTier: 'standard'
  },
  story: {
    id: 'story',
    name: 'Story',
    description: 'Vertical format for social stories',
    dimensions: {
      width: 1080,
      height: 1920
    },
    aspectRatio: '9:16',
    bestFor: ['Instagram Stories', 'Reels', 'TikTok', 'Snapchat'],
    recommendedStyles: ['cosmic', 'dreamy', 'magic', 'energy'],
    exportFormat: 'png',
    qualityTier: 'premium'
  }
}

export function getSizeProfile(profileId: SizeProfile): SizeProfileConfig {
  return sizeProfiles[profileId]
}

export function getCompatibleProfiles(assetType: 'logo' | 'face' | 'mascot' | 'symbol' | 'icon'): SizeProfile[] {
  const compatibility: Record<string, SizeProfile[]> = {
    logo: ['symbol', 'badge', 'sticker'],
    face: ['portrait', 'sticker', 'story'],
    mascot: ['sticker', 'portrait', 'pack-tile'],
    symbol: ['symbol', 'badge', 'sticker'],
    icon: ['badge', 'sticker', 'pack-tile']
  }
  
  return compatibility[assetType] || ['sticker']
}
