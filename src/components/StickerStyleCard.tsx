import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import type { StickerStyle } from '@/lib/stickerStyles'
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'

interface StickerStyleCardProps {
  style: StickerStyle
  onClick: () => void
}

export function StickerStyleCard({ style, onClick }: StickerStyleCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -4, scale: 1.02 }}
      transition={{ duration: 0.2 }}
    >
      <Card
        className="group cursor-pointer overflow-hidden border-2 hover:border-primary/40 transition-all duration-300 hover:shadow-xl"
        onClick={onClick}
      >
        <div className="p-6 space-y-4">
          <div className="flex items-center justify-between mb-3">
            <Badge variant="secondary" className="text-xs">
              {style.mask.name}
            </Badge>
            <Badge 
              variant="outline" 
              className={cn(
                "text-xs",
                style.intensity === 'subtle' && "border-green-500/50 text-green-600",
                style.intensity === 'medium' && "border-yellow-500/50 text-yellow-600",
                style.intensity === 'intense' && "border-red-500/50 text-red-600"
              )}
            >
              {style.intensity}
            </Badge>
          </div>

          <div className="flex justify-center">
            <motion.div
              animate={{
                scale: [1, 1.05, 1],
                rotate: style.motion.id.includes('spin') ? [0, 360] : 0,
              }}
              transition={{
                duration: style.motion.id.includes('lightning') ? 0.3 : 2,
                repeat: Infinity,
                ease: style.motion.id.includes('elastic') ? "easeOut" : "easeInOut",
              }}
              className="text-7xl drop-shadow-lg"
              style={{
                filter: (style.mask.type === 'glow' || style.mask.type === 'aura')
                  ? 'drop-shadow(0 0 12px rgba(100, 200, 150, 0.5))'
                  : 'none'
              }}
            >
              {style.previewEmoji}
            </motion.div>
          </div>

          <div className="space-y-2">
            <h3 className="font-bold text-lg">{style.name}</h3>
            <p className="text-sm text-muted-foreground line-clamp-2">
              {style.description}
            </p>
          </div>

          <div className="flex flex-wrap gap-1.5">
            {style.tags.slice(0, 3).map((tag) => (
              <Badge key={tag} variant="outline" className="text-xs">
                {tag}
              </Badge>
            ))}
          </div>

          <div className="pt-3 border-t border-border/50">
            <p className="text-xs font-medium text-primary/80">
              {style.conversionPitch}
            </p>
          </div>
        </div>
      </Card>
    </motion.div>
  )
}
