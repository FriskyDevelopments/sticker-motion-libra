import { motion } from 'framer-motion'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Sparkle } from '@phosphor-icons/react'
import type { StickerStyle } from '@/lib/stickerStyles'

interface StickerStyleCardProps {
  style: StickerStyle
  onClick: () => void
}

export function StickerStyleCard({ style, onClick }: StickerStyleCardProps) {
  const animation = getStyleAnimation(style)
  const transition = getStyleTransition(style)

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      whileHover={{ scale: 1.03, y: -8 }}
      transition={{ 
        duration: 0.5, 
        ease: [0.34, 1.56, 0.64, 1],
        scale: { type: "spring", stiffness: 300, damping: 20 }
      }}
    >
      <Card
        className="group relative overflow-hidden cursor-pointer border-2 border-border/40 bg-card/80 backdrop-blur-sm hover:border-primary/50 shadow-xl hover:shadow-2xl hover:shadow-primary/30 transition-all duration-500"
        onClick={onClick}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-primary/8 via-accent/6 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
        
        <motion.div 
          className="absolute -inset-1 bg-gradient-to-r from-primary/30 via-accent/30 to-primary/30 opacity-0 group-hover:opacity-100 blur-2xl"
          animate={{ 
            backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'] 
          }}
          transition={{ 
            duration: 3, 
            repeat: Infinity, 
            ease: 'linear' 
          }}
          style={{ 
            backgroundSize: '200% 200%' 
          }}
        />

        <div className="aspect-square bg-gradient-to-br from-background/40 via-card to-background/30 flex items-center justify-center overflow-hidden relative">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,oklch(0.68_0.22_280/0.15),transparent_65%)] group-hover:opacity-100 opacity-60 transition-opacity duration-700" />
          
          <motion.div
            className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          >
            <Sparkle size={24} weight="duotone" className="text-accent" />
          </motion.div>

          <motion.div
            className="text-9xl relative z-10 filter drop-shadow-lg"
            animate={animation}
            transition={transition}
            style={{
              filter: getStyleFilter(style)
            }}
          >
            {style.previewEmoji}
          </motion.div>
          
          <div className="absolute top-3 left-3">
            <Badge 
              variant="secondary" 
              className="text-xs font-medium bg-background/95 backdrop-blur-md border-border/50 shadow-sm group-hover:border-accent/40 transition-colors duration-300"
            >
              {style.intensity}
            </Badge>
          </div>

          <div className="absolute bottom-3 left-3">
            <Badge 
              variant="outline" 
              className="text-xs font-medium bg-background/90 backdrop-blur-sm border-border/40"
            >
              {getSpeedDisplay(style.motion.speed)}
            </Badge>
          </div>
        </div>

        <div className="p-5 space-y-3 bg-card relative z-10">
          <div>
            <h3 className="text-lg font-bold mb-1 group-hover:gradient-text transition-all duration-300">
              {style.name}
            </h3>
            <p className="text-xs text-muted-foreground line-clamp-1 mb-2">
              {style.movementPersonality}
            </p>
          </div>

          <div className="flex flex-wrap gap-1.5">
            {style.tags.slice(0, 3).map((tag) => (
              <Badge 
                key={tag}
                variant="outline" 
                className="text-xs border-accent/30 text-accent/90 group-hover:border-accent/60 group-hover:bg-accent/5 transition-all duration-300"
              >
                {tag}
              </Badge>
            ))}
          </div>

          <div className="pt-2 border-t border-border/50 group-hover:border-accent/30 transition-colors duration-300">
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">{style.mask.name}</span>
              <motion.span
                className="font-medium text-primary group-hover:text-accent transition-colors duration-300"
                animate={{ 
                  scale: [1, 1.2, 1],
                  rotate: [0, 12, -12, 0]
                }}
                transition={{ 
                  duration: 2,
                  repeat: Infinity,
                  repeatDelay: 1
                }}
              >
                ✦
              </motion.span>
            </div>
          </div>
        </div>
      </Card>
    </motion.div>
  )
}

function getStyleFilter(style: StickerStyle): string {
  const intensityValue = style.intensity === 'subtle' ? 0.5 : style.intensity === 'intense' ? 1.5 : 1.0
  const energyMultiplier = style.motion.energy === 'soft' ? 0.7 : style.motion.energy === 'strong' ? 1.3 : 1.0
  const totalIntensity = intensityValue * energyMultiplier
  
  switch (style.mask.type) {
    case 'glow':
      return `drop-shadow(0 0 ${12 * totalIntensity}px rgba(100, 200, 150, 0.6)) drop-shadow(0 0 ${24 * totalIntensity}px rgba(100, 200, 150, 0.3))`
    case 'aura':
      return `drop-shadow(0 0 ${16 * totalIntensity}px rgba(150, 100, 200, 0.5)) drop-shadow(0 0 ${32 * totalIntensity}px rgba(150, 100, 200, 0.25))`
    case 'soft':
      return `drop-shadow(0 4px ${8 * totalIntensity}px rgba(0, 0, 0, 0.15))`
    default:
      return `drop-shadow(0 2px ${4 * totalIntensity}px rgba(0, 0, 0, 0.1))`
  }
}

function getStyleAnimation(style: StickerStyle) {
  const intensityMultiplier = style.intensity === 'subtle' ? 0.7 : style.intensity === 'intense' ? 1.3 : 1.0
  const energyMultiplier = style.motion.energy === 'soft' ? 0.7 : style.motion.energy === 'strong' ? 1.3 : 1.0
  const total = intensityMultiplier * energyMultiplier

  switch (style.motion.id) {
    case 'breathing-glow':
      return { scale: [1, 1.08 * total, 1], opacity: [0.85, 1, 0.85] }
    case 'pulse-ring':
      return { scale: [1, 1.12 * total, 1] }
    case 'bounce':
      return { y: [0, -20 * total, 0], scaleY: [1, 0.95, 1] }
    case 'wobble':
      return { rotate: [-8 * total, 8 * total, -8 * total] }
    case 'sparkle-burst':
      return { scale: [1, 1.1 * total, 1], rotate: [0, 12, 0] }
    case 'heartbeat':
      return { scale: [1, 1.12 * total, 1, 1.08 * total, 1] }
    case 'spin':
      return { rotate: 360 }
    case 'shimmer':
      return { rotate: [0, 5, -5, 0] }
    case 'rgb-glitch':
    case 'data-corrupt':
      return { x: [0, 3 * total, -3 * total, 0] }
    case 'sway':
    case 'cloud-drift':
      return { x: [-6 * total, 6 * total, -6 * total] }
    case 'orbit':
      return { rotate: 360, scale: [1, 1.05 * total, 1] }
    case 'lightning-flash':
      return { opacity: [1, 0.3, 1, 0.5, 1], scale: [1, 1.1 * total, 1] }
    default:
      return { scale: [1, 1.05 * total, 1] }
  }
}

function getStyleTransition(style: StickerStyle) {
  const speedMultiplier = style.motion.speed === 'slow' ? 1.5 : style.motion.speed === 'fast' ? 0.6 : 1.0
  
  const baseDuration = {
    'breathing-glow': 3,
    'pulse-ring': 1.5,
    'bounce': 1,
    'wobble': 2.5,
    'sparkle-burst': 1,
    'heartbeat': 1.2,
    'spin': 4,
    'shimmer': 2,
    'rgb-glitch': 0.3,
    'data-corrupt': 0.3,
    'sway': 3.5,
    'cloud-drift': 4,
    'orbit': 5,
    'lightning-flash': 0.8,
  }[style.motion.id] || 2

  const duration = baseDuration * speedMultiplier

  switch (style.motion.id) {
    case 'breathing-glow':
      return { duration, repeat: Infinity, ease: 'easeInOut' as const }
    case 'pulse-ring':
      return { duration, repeat: Infinity, ease: 'easeOut' as const, repeatDelay: 0.5 }
    case 'bounce':
      return { duration, repeat: Infinity, ease: 'easeOut' as const }
    case 'wobble':
      return { duration, repeat: Infinity, ease: 'easeInOut' as const }
    case 'sparkle-burst':
      return { duration, repeat: Infinity, repeatDelay: 1 }
    case 'heartbeat':
      return { duration, repeat: Infinity, times: [0, 0.2, 0.35, 0.5, 1], repeatDelay: 0.5 }
    case 'spin':
    case 'orbit':
      return { duration, repeat: Infinity, ease: 'linear' as const }
    case 'shimmer':
      return { duration, repeat: Infinity, ease: 'easeInOut' as const, repeatDelay: 1 }
    case 'rgb-glitch':
    case 'data-corrupt':
      return { duration, repeat: Infinity, repeatDelay: 1.5 }
    case 'sway':
    case 'cloud-drift':
      return { duration, repeat: Infinity, ease: 'easeInOut' as const }
    case 'lightning-flash':
      return { duration, repeat: Infinity, repeatDelay: 2 }
    default:
      return { duration, repeat: Infinity, ease: 'easeInOut' as const }
  }
}

function getSpeedDisplay(speed: 'slow' | 'normal' | 'fast'): string {
  return { slow: '◌', normal: '△', fast: '✧' }[speed]
}
