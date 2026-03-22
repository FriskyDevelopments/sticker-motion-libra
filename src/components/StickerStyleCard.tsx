import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import type { StickerStyle } from '@/lib/stickerStyles'
import { motion, AnimatePresence } from 'framer-motion'
import { cn } from '@/lib/utils'
import { Sparkle, MagicWand } from '@phosphor-icons/react'
import { useState } from 'react'

interface StickerStyleCardProps {
  style: StickerStyle
  onClick: () => void
}

export function StickerStyleCard({ style, onClick }: StickerStyleCardProps) {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      whileHover={{ y: -8, scale: 1.03 }}
      transition={{ 
        duration: 0.4, 
        ease: [0.34, 1.56, 0.64, 1],
        y: { type: "spring", stiffness: 300, damping: 25 }
      }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      <Card
        className="group cursor-pointer overflow-hidden border-2 border-border hover:border-primary/50 transition-all duration-500 hover:shadow-2xl hover:shadow-primary/20 relative"
        onClick={onClick}
      >
        <motion.div
          className="absolute inset-0 bg-gradient-to-br from-primary/5 via-accent/5 to-transparent opacity-0 group-hover:opacity-100"
          transition={{ duration: 0.6 }}
        />

        <motion.div 
          className="absolute -inset-[1px] bg-gradient-to-r from-primary/30 via-accent/30 to-primary/30 opacity-0 group-hover:opacity-100 blur-lg -z-10"
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

        <div className="p-6 space-y-4 relative z-10">
          <div className="flex items-center justify-between mb-3">
            <motion.div
              initial={{ x: -10, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.1 }}
            >
              <Badge 
                variant="secondary" 
                className="text-xs backdrop-blur-sm bg-background/95 border-border/50 group-hover:border-primary/40 transition-colors duration-300"
              >
                {style.mask.name}
              </Badge>
            </motion.div>
            
            <motion.div
              initial={{ x: 10, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.15 }}
            >
              <Badge 
                variant="outline" 
                className={cn(
                  "text-xs transition-all duration-300",
                  style.intensity === 'subtle' && "border-green-500/50 text-green-600 group-hover:border-green-500/70 group-hover:bg-green-500/5",
                  style.intensity === 'medium' && "border-yellow-500/50 text-yellow-600 group-hover:border-yellow-500/70 group-hover:bg-yellow-500/5",
                  style.intensity === 'intense' && "border-red-500/50 text-red-600 group-hover:border-red-500/70 group-hover:bg-red-500/5"
                )}
              >
                {style.intensity}
              </Badge>
            </motion.div>
          </div>

          <div className="flex justify-center relative">
            <AnimatePresence>
              {isHovered && (
                <motion.div
                  initial={{ scale: 0, opacity: 0, rotate: -180 }}
                  animate={{ scale: 1, opacity: 0.6, rotate: 0 }}
                  exit={{ scale: 0, opacity: 0, rotate: 180 }}
                  transition={{ duration: 0.4 }}
                  className="absolute -top-4 -right-4 text-accent"
                >
                  <MagicWand size={28} weight="duotone" />
                </motion.div>
              )}
            </AnimatePresence>

            <motion.div
              animate={{
                scale: [1, 1.08, 1],
                rotate: style.motion.id.includes('spin') ? [0, 360] : 0,
              }}
              transition={{
                duration: style.motion.id.includes('lightning') ? 0.3 : 2.5,
                repeat: Infinity,
                ease: style.motion.id.includes('elastic') ? "easeOut" : "easeInOut",
              }}
              className="text-7xl relative z-10"
              style={{
                filter: getEnhancedFilter(style.mask.type, style.intensity)
              }}
            >
              {style.previewEmoji}
            </motion.div>

            <motion.div
              className="absolute inset-0 rounded-full bg-gradient-radial from-primary/20 to-transparent opacity-0 group-hover:opacity-100 blur-xl"
              animate={{
                scale: [1, 1.2, 1],
                opacity: isHovered ? [0.3, 0.6, 0.3] : 0
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
          </div>

          <motion.div 
            className="space-y-2"
            initial={{ opacity: 0.8 }}
            whileHover={{ opacity: 1 }}
          >
            <motion.h3 
              className="font-bold text-lg group-hover:gradient-text transition-all duration-300"
              layout
            >
              {style.name}
            </motion.h3>
            <p className="text-sm text-muted-foreground line-clamp-2">
              {style.description}
            </p>
          </motion.div>

          <div className="flex flex-wrap gap-1.5">
            {style.tags.slice(0, 3).map((tag, i) => (
              <motion.div
                key={tag}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2 + i * 0.05 }}
              >
                <Badge 
                  variant="outline" 
                  className="text-xs group-hover:border-accent/50 group-hover:bg-accent/5 transition-all duration-300"
                >
                  {tag}
                </Badge>
              </motion.div>
            ))}
          </div>

          <motion.div 
            className="pt-3 border-t border-border/50 group-hover:border-primary/30 transition-colors duration-300"
            whileHover={{ x: 3 }}
            transition={{ type: "spring", stiffness: 400, damping: 20 }}
          >
            <div className="flex items-center gap-2">
              <p className="text-xs font-medium text-primary/80 group-hover:text-accent transition-colors duration-300 flex-1">
                {style.conversionPitch}
              </p>
              <motion.div
                animate={{ 
                  rotate: [0, 15, -15, 0],
                  scale: [1, 1.2, 1]
                }}
                transition={{ 
                  duration: 2,
                  repeat: Infinity,
                  repeatDelay: 2
                }}
              >
                <Sparkle size={16} weight="duotone" className="text-accent" />
              </motion.div>
            </div>
          </motion.div>
        </div>
      </Card>
    </motion.div>
  )
}

function getEnhancedFilter(maskType: string, intensity: string): string {
  const intensityValue = intensity === 'subtle' ? 0.7 : intensity === 'intense' ? 1.4 : 1.0
  
  switch (maskType) {
    case 'glow':
      return `drop-shadow(0 0 ${16 * intensityValue}px rgba(100, 200, 150, 0.7)) drop-shadow(0 0 ${32 * intensityValue}px rgba(100, 200, 150, 0.4))`
    case 'aura':
      return `drop-shadow(0 0 ${20 * intensityValue}px rgba(150, 100, 200, 0.6)) drop-shadow(0 0 ${40 * intensityValue}px rgba(150, 100, 200, 0.3))`
    case 'soft':
      return `drop-shadow(0 6px ${12 * intensityValue}px rgba(0, 0, 0, 0.2))`
    default:
      return `drop-shadow(0 4px ${8 * intensityValue}px rgba(0, 0, 0, 0.15))`
  }
}
