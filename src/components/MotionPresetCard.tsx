import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { MotionPreset, styleInfo } from '@/lib/motionPresets'
import { AnimatedPreview } from './AnimatedPreview'
import { motion } from 'framer-motion'

interface MotionPresetCardProps {
  preset: MotionPreset
  onClick: () => void
  index: number
}

const intensityColors = {
  soft: 'bg-secondary/20 text-secondary-foreground border-secondary/30',
  medium: 'bg-primary/20 text-primary-foreground border-primary/30',
  strong: 'bg-accent/20 text-accent-foreground border-accent/30'
}

export function MotionPresetCard({ preset, onClick, index }: MotionPresetCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05, duration: 0.4 }}
    >
      <Card
        className="gradient-border overflow-hidden cursor-pointer transition-all duration-300 hover:scale-[1.02] hover:shadow-lg hover:shadow-primary/20 group"
        onClick={onClick}
      >
        <CardContent className="p-5 space-y-4">
          <div className="flex items-start justify-between gap-3">
            <div className="flex-1 min-w-0">
              <h3 className="font-semibold text-lg mb-1 truncate">{preset.name}</h3>
              <Badge className={`text-xs ${intensityColors[preset.intensity]}`}>
                {preset.intensity}
              </Badge>
            </div>
            <div className="flex-shrink-0">
              <AnimatedPreview preset={preset} className="w-24 h-24" />
            </div>
          </div>

          <p className="text-sm text-muted-foreground line-clamp-2 leading-relaxed">
            {preset.emotionalVibe}
          </p>

          <div className="flex flex-wrap gap-1.5">
            {preset.compatibleStyles.slice(0, 3).map((style) => (
              <Badge
                key={style}
                variant="outline"
                className="text-xs"
                style={{ borderColor: styleInfo[style].color }}
              >
                {styleInfo[style].label}
              </Badge>
            ))}
            {preset.compatibleStyles.length > 3 && (
              <Badge variant="outline" className="text-xs">
                +{preset.compatibleStyles.length - 3}
              </Badge>
            )}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}
