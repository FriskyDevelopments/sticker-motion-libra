import { motion } from 'framer-motion'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import type { StickerStyle } from '@/lib/stickerStyles'
import { vibeInfo } from '@/lib/stickerStyles'

interface StickerStyleCardProps {
  style: StickerStyle
  onClick: () => void
  index: number
}

export function StickerStyleCard({ style, onClick, index }: StickerStyleCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.03, duration: 0.3 }}
    >
      <Card
        className="group relative overflow-hidden cursor-pointer transition-all duration-300 hover:scale-[1.02] border-border/50 hover:border-accent/60 hover:shadow-xl hover:shadow-accent/20 gradient-border"
        onClick={onClick}
      >
        <div className="p-6 space-y-4">
          <div className="flex items-start justify-between gap-3">
            <div className="flex-1">
              <h3 className="text-xl font-bold mb-1 group-hover:text-accent transition-colors">
                {style.name}
              </h3>
              <p className="text-sm text-muted-foreground line-clamp-2">
                {style.description}
              </p>
            </div>
            
            <div className="text-5xl shrink-0 group-hover:scale-110 transition-transform duration-300">
              {style.previewEmoji}
            </div>
          </div>

          <div className="aspect-square bg-gradient-to-br from-muted/30 to-muted/50 rounded-lg flex items-center justify-center overflow-hidden relative border border-border/30">
            <motion.div
              className="text-8xl"
              animate={getMotionAnimation(style.motion.id)}
              transition={getMotionTransition(style.motion.id)}
            >
              {style.previewEmoji}
            </motion.div>
            
            <div className="absolute bottom-2 right-2">
              <Badge 
                variant="secondary" 
                className="text-xs font-mono bg-background/80 backdrop-blur-sm"
              >
                {style.intensity}
              </Badge>
            </div>
          </div>

          <div className="flex flex-wrap gap-1.5">
            {style.tags.map((tag) => (
              <Badge 
                key={tag} 
                variant="outline" 
                className="text-xs border-accent/30 text-accent"
              >
                {tag}
              </Badge>
            ))}
          </div>

          <div 
            className="text-xs px-3 py-2 rounded-md font-medium text-center transition-all duration-200 group-hover:scale-[1.02]"
            style={{ 
              backgroundColor: vibeInfo[style.vibe].color + '20',
              color: vibeInfo[style.vibe].color,
              border: `1px solid ${vibeInfo[style.vibe].color}40`
            }}
          >
            {vibeInfo[style.vibe].name}
          </div>

          <div className="border-t border-border/50 pt-3 space-y-2">
            <div className="text-xs text-muted-foreground">
              <span className="font-semibold text-foreground">Mask:</span> {style.mask.name}
            </div>
            <div className="text-xs text-muted-foreground">
              <span className="font-semibold text-foreground">Motion:</span> {style.motion.name}
            </div>
          </div>

          <div className="pt-2">
            <div className="text-sm font-medium text-primary/90 group-hover:text-primary transition-colors">
              {style.conversionPitch} →
            </div>
          </div>
        </div>
      </Card>
    </motion.div>
  )
}

function getMotionAnimation(motionId: string) {
  switch (motionId) {
    case 'breathing-glow':
      return { scale: [1, 1.1, 1], opacity: [0.8, 1, 0.8] }
    case 'pulse-ring':
      return { scale: [1, 1.15, 1] }
    case 'shimmer':
      return { rotate: [0, 5, -5, 0] }
    case 'data-corrupt':
      return { x: [0, 2, -2, 0], skewX: [0, 2, -2, 0] }
    case 'rgb-glitch':
      return { x: [0, 3, -3, 0] }
    case 'bounce':
      return { y: [0, -15, 0], scaleY: [1, 0.95, 1] }
    case 'heartbeat':
      return { scale: [1, 1.12, 1, 1.08, 1] }
    case 'wobble':
      return { rotate: [-8, 8, -8] }
    case 'sparkle-burst':
      return { scale: [1, 1.1, 1], rotate: [0, 10, 0] }
    case 'confetti-rain':
      return { y: [0, 10, 0], rotate: [0, 360] }
    case 'cloud-drift':
      return { x: [-10, 10, -10] }
    case 'lightning-flash':
      return { opacity: [1, 0.5, 1, 0.5, 1] }
    case 'spin':
      return { rotate: 360 }
    case 'orbit':
      return { rotate: 360 }
    case 'spiral':
      return { rotate: 360, scale: [1, 1.05, 1] }
    case 'elastic-pop':
      return { scale: [1, 1.2, 0.95, 1] }
    case 'flicker':
      return { opacity: [1, 0.7, 1, 0.8, 1] }
    case 'sway':
      return { x: [-5, 5, -5], rotate: [-3, 3, -3] }
    case 'pixel-trail':
      return { x: [0, 5, 0] }
    case 'static-noise':
      return { opacity: [1, 0.8, 1, 0.9, 1] }
    default:
      return { scale: [1, 1.05, 1] }
  }
}

function getMotionTransition(motionId: string) {
  switch (motionId) {
    case 'breathing-glow':
      return { duration: 3, repeat: Infinity, ease: 'easeInOut' as const }
    case 'pulse-ring':
      return { duration: 1.5, repeat: Infinity, ease: 'easeOut' as const, repeatDelay: 0.5 }
    case 'shimmer':
      return { duration: 2, repeat: Infinity, ease: 'easeInOut' as const, repeatDelay: 1 }
    case 'data-corrupt':
      return { duration: 0.3, repeat: Infinity, repeatDelay: 1.5 }
    case 'rgb-glitch':
      return { duration: 0.15, repeat: Infinity, repeatDelay: 2 }
    case 'bounce':
      return { duration: 1, repeat: Infinity, ease: 'easeOut' as const }
    case 'heartbeat':
      return { duration: 1.2, repeat: Infinity, times: [0, 0.2, 0.35, 0.5, 1], repeatDelay: 0.5 }
    case 'wobble':
      return { duration: 2.5, repeat: Infinity, ease: 'easeInOut' as const }
    case 'sparkle-burst':
      return { duration: 1, repeat: Infinity, repeatDelay: 1 }
    case 'confetti-rain':
      return { duration: 3, repeat: Infinity, ease: 'linear' as const }
    case 'cloud-drift':
      return { duration: 8, repeat: Infinity, ease: 'easeInOut' as const }
    case 'lightning-flash':
      return { duration: 0.8, repeat: Infinity, repeatDelay: 2, times: [0, 0.1, 0.2, 0.3, 1] }
    case 'spin':
      return { duration: 4, repeat: Infinity, ease: 'linear' as const }
    case 'orbit':
      return { duration: 3, repeat: Infinity, ease: 'linear' as const }
    case 'spiral':
      return { duration: 5, repeat: Infinity, ease: 'linear' as const }
    case 'elastic-pop':
      return { duration: 0.6, repeat: Infinity, repeatDelay: 1.5, ease: 'easeOut' as const }
    case 'flicker':
      return { duration: 0.5, repeat: Infinity, times: [0, 0.2, 0.4, 0.7, 1] }
    case 'sway':
      return { duration: 3.5, repeat: Infinity, ease: 'easeInOut' as const }
    case 'pixel-trail':
      return { duration: 0.4, repeat: Infinity, ease: 'easeOut' as const, repeatDelay: 0.3 }
    case 'static-noise':
      return { duration: 0.2, repeat: Infinity, times: [0, 0.3, 0.5, 0.8, 1] }
    default:
      return { duration: 2, repeat: Infinity, ease: 'easeInOut' as const }
  }
}
