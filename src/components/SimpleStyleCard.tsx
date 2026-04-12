import { motion } from 'framer-motion'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Sparkle } from '@phosphor-icons/react'
import type { StickerStyle } from '@/lib/stickerStyles'

interface SimpleStyleCardProps {
  style: StickerStyle
  onClick: () => void
  index: number
}

export function SimpleStyleCard({ style, onClick, index }: SimpleStyleCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.92, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      whileHover={{ scale: 1.05, y: -8 }}
      transition={{ 
        delay: index * 0.05, 
        duration: 0.5, 
        ease: [0.34, 1.56, 0.64, 1],
        scale: { type: "spring", stiffness: 300, damping: 20 }
      }}
    >
      <Card
        className="group relative overflow-hidden cursor-pointer border-2 border-border/50 hover:border-accent/60 shadow-lg hover:shadow-2xl hover:shadow-primary/20 transition-all duration-500"
        onClick={onClick}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-accent/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
        
        <motion.div 
          className="absolute -inset-1 bg-gradient-to-r from-primary/20 via-accent/20 to-primary/20 opacity-0 group-hover:opacity-100 blur-xl"
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

        <div className="aspect-square bg-gradient-to-br from-muted/30 via-background to-muted/20 flex items-center justify-center overflow-hidden relative">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,oklch(0.65_0.20_160/0.12),transparent_60%)] group-hover:opacity-100 opacity-0 transition-opacity duration-700" />
          
          <motion.div
            className="absolute top-4 right-4 opacity-0 group-hover:opacity-100"
            initial={{ scale: 0, rotate: -180 }}
            whileHover={{ scale: 1, rotate: 0 }}
            transition={{ duration: 0.4, ease: 'easeOut' }}
          >
            <Sparkle size={24} weight="duotone" className="text-accent" />
          </motion.div>

          <motion.div
            className="text-9xl relative z-10 filter drop-shadow-lg"
            animate={getSimpleAnimation(style.motion.id, style.intensity)}
            transition={getSimpleTransition(style.motion.id)}
            style={{
              filter: getMagicFilter(style.mask.type, style.intensity)
            }}
          >
            {style.previewEmoji}
          </motion.div>
          
          <motion.div 
            className="absolute top-3 left-3"
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: index * 0.05 + 0.2, duration: 0.5 }}
          >
            <Badge 
              variant="secondary" 
              className="text-xs font-medium bg-background/95 backdrop-blur-md border-border/50 shadow-sm group-hover:border-accent/40 transition-colors duration-300"
            >
              {style.intensity}
            </Badge>
          </motion.div>

          <motion.div
            className="absolute inset-0 pointer-events-none"
            initial={{ opacity: 0 }}
            whileHover={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            <div className="absolute inset-0 bg-gradient-to-t from-accent/10 to-transparent" />
          </motion.div>
        </div>

        <div className="p-6 md:p-7 space-y-4 bg-card relative z-10">
          <div>
            <motion.h3 
              className="text-xl md:text-2xl font-bold mb-2 group-hover:gradient-text transition-all duration-300"
              initial={{ x: 0 }}
              whileHover={{ x: 4 }}
            >
              {style.name}
            </motion.h3>
            <p className="text-base md:text-lg text-muted-foreground line-clamp-2">
              {style.description}
            </p>
          </div>

          <motion.div 
            className="flex flex-wrap gap-2.5"
            initial={{ opacity: 0.8 }}
            whileHover={{ opacity: 1 }}
          >
            {style.tags.slice(0, 3).map((tag, i) => (
              <motion.div
                key={tag}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.05 + 0.1 + i * 0.05 }}
              >
                <Badge 
                  variant="outline" 
                  className="text-sm md:text-base px-3 py-1.5 border-accent/30 text-accent/90 group-hover:border-accent/60 group-hover:bg-accent/5 transition-all duration-300"
                >
                  {tag}
                </Badge>
              </motion.div>
            ))}
          </motion.div>

          <motion.div 
            className="pt-3 border-t border-border/50 group-hover:border-accent/30 transition-colors duration-300"
            whileHover={{ x: 2 }}
          >
            <div className="flex items-center gap-2.5 text-base md:text-lg font-medium text-primary group-hover:text-accent transition-colors duration-300">
              <span>Try this</span>
              <motion.span
                animate={{ 
                  scale: [1, 1.2, 1],
                  rotate: [0, 12, -12, 0]
                }}
                transition={{ 
                  duration: 2,
                  repeat: Infinity,
                  repeatDelay: 1
                }}
                className="text-xl"
              >
                ✦
              </motion.span>
            </div>
          </motion.div>
        </div>
      </Card>
    </motion.div>
  )
}

function getMagicFilter(maskType: string, intensity: string): string {
  const intensityValue = intensity === 'subtle' ? 0.5 : intensity === 'intense' ? 1.5 : 1.0
  
  switch (maskType) {
    case 'glow':
      return `drop-shadow(0 0 ${12 * intensityValue}px rgba(100, 200, 150, 0.6)) drop-shadow(0 0 ${24 * intensityValue}px rgba(100, 200, 150, 0.3))`
    case 'aura':
      return `drop-shadow(0 0 ${16 * intensityValue}px rgba(150, 100, 200, 0.5)) drop-shadow(0 0 ${32 * intensityValue}px rgba(150, 100, 200, 0.25))`
    case 'soft':
      return `drop-shadow(0 4px ${8 * intensityValue}px rgba(0, 0, 0, 0.15))`
    default:
      return `drop-shadow(0 2px ${4 * intensityValue}px rgba(0, 0, 0, 0.1))`
  }
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
