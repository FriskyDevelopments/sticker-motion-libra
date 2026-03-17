import { motion } from 'framer-motion'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import type { StickerStyle } from '@/lib/stickerStyles'

interface SimpleStyleCardProps {
  style: StickerStyle
  onClick: () => void
  index: number
}

export function SimpleStyleCard({ style, onClick, index }: SimpleStyleCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: index * 0.05, duration: 0.4, ease: 'easeOut' }}
    >
      <Card
        className="group relative overflow-hidden cursor-pointer transition-all duration-300 hover:scale-[1.03] border-2 border-transparent hover:border-accent/40 hover:shadow-2xl hover:shadow-accent/20"
        onClick={onClick}
      >
        <div className="aspect-square bg-gradient-to-br from-muted/20 via-background to-muted/30 flex items-center justify-center overflow-hidden relative">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,oklch(0.65_0.20_160/0.08),transparent_70%)] group-hover:opacity-100 opacity-0 transition-opacity duration-500" />
          
          <motion.div
            className="text-9xl relative z-10"
            animate={getSimpleAnimation(style.motion.id, style.intensity)}
            transition={getSimpleTransition(style.motion.id)}
          >
            {style.previewEmoji}
          </motion.div>
          
          <div className="absolute top-3 left-3">
            <Badge 
              variant="secondary" 
              className="text-xs font-medium bg-background/90 backdrop-blur-sm border-border/50"
            >
              {style.intensity}
            </Badge>
          </div>
        </div>

        <div className="p-5 space-y-3 bg-card">
          <div>
            <h3 className="text-lg font-bold mb-1 group-hover:text-accent transition-colors">
              {style.name}
            </h3>
            <p className="text-sm text-muted-foreground line-clamp-1">
              {style.description}
            </p>
          </div>

          <div className="flex flex-wrap gap-1.5">
            {style.tags.slice(0, 3).map((tag) => (
              <Badge 
                key={tag} 
                variant="outline" 
                className="text-xs border-accent/30 text-accent/90"
              >
                {tag}
              </Badge>
            ))}
          </div>

          <div className="pt-2 border-t border-border/50">
            <div className="text-sm font-medium text-primary group-hover:text-accent transition-colors">
              Pick this style →
            </div>
          </div>
        </div>
      </Card>
    </motion.div>
  )
}

function getSimpleAnimation(motionId: string, intensity: string) {
  const intensityMultiplier = intensity === 'subtle' ? 0.7 : intensity === 'intense' ? 1.3 : 1.0

  switch (motionId) {
    case 'breathing-glow':
      return { scale: [1, 1.08 * intensityMultiplier, 1], opacity: [0.85, 1, 0.85] }
    case 'pulse-ring':
      return { scale: [1, 1.12 * intensityMultiplier, 1] }
    case 'bounce':
      return { y: [0, -20 * intensityMultiplier, 0], scaleY: [1, 0.95, 1] }
    case 'wobble':
      return { rotate: [-8 * intensityMultiplier, 8 * intensityMultiplier, -8 * intensityMultiplier] }
    case 'sparkle-burst':
      return { scale: [1, 1.1 * intensityMultiplier, 1], rotate: [0, 12, 0] }
    case 'heartbeat':
      return { scale: [1, 1.12 * intensityMultiplier, 1, 1.08 * intensityMultiplier, 1] }
    case 'spin':
      return { rotate: 360 }
    case 'shimmer':
      return { rotate: [0, 5, -5, 0] }
    case 'data-corrupt':
    case 'rgb-glitch':
      return { x: [0, 3 * intensityMultiplier, -3 * intensityMultiplier, 0] }
    case 'sway':
      return { x: [-6 * intensityMultiplier, 6 * intensityMultiplier, -6 * intensityMultiplier] }
    default:
      return { scale: [1, 1.05 * intensityMultiplier, 1] }
  }
}

function getSimpleTransition(motionId: string) {
  switch (motionId) {
    case 'breathing-glow':
      return { duration: 3, repeat: Infinity, ease: 'easeInOut' as const }
    case 'pulse-ring':
      return { duration: 1.5, repeat: Infinity, ease: 'easeOut' as const, repeatDelay: 0.5 }
    case 'bounce':
      return { duration: 1, repeat: Infinity, ease: 'easeOut' as const }
    case 'wobble':
      return { duration: 2.5, repeat: Infinity, ease: 'easeInOut' as const }
    case 'sparkle-burst':
      return { duration: 1, repeat: Infinity, repeatDelay: 1 }
    case 'heartbeat':
      return { duration: 1.2, repeat: Infinity, times: [0, 0.2, 0.35, 0.5, 1], repeatDelay: 0.5 }
    case 'spin':
      return { duration: 4, repeat: Infinity, ease: 'linear' as const }
    case 'shimmer':
      return { duration: 2, repeat: Infinity, ease: 'easeInOut' as const, repeatDelay: 1 }
    case 'data-corrupt':
    case 'rgb-glitch':
      return { duration: 0.3, repeat: Infinity, repeatDelay: 1.5 }
    case 'sway':
      return { duration: 3.5, repeat: Infinity, ease: 'easeInOut' as const }
    default:
      return { duration: 2, repeat: Infinity, ease: 'easeInOut' as const }
  }
}
