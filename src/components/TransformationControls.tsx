import { motion, AnimatePresence } from 'framer-motion'
import { ArrowCounterClockwise, ArrowClockwise, ArrowUUpLeft, Sparkle } from '@phosphor-icons/react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Card } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { cn } from '@/lib/utils'
import type { StickerStyle } from '@/lib/stickerStyles'

interface TransformationControlsProps {
  appliedStyle: StickerStyle | null
  canUndo: boolean
  canRedo: boolean
  hasTransformation: boolean
  onUndo: () => void
  onRedo: () => void
  onRevert: () => void
  className?: string
}

export function TransformationControls({
  appliedStyle,
  canUndo,
  canRedo,
  hasTransformation,
  onUndo,
  onRedo,
  onRevert,
  className
}: TransformationControlsProps) {
  
  if (!hasTransformation && !appliedStyle) {
    return null
  }

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 20 }}
        className={cn('w-full', className)}
      >
        <Card className="p-4 bg-card/50 backdrop-blur-md border-border/50">
          <div className="flex items-center justify-between gap-4 flex-wrap">
            <div className="flex items-center gap-3 flex-1 min-w-0">
              <Sparkle size={20} weight="duotone" className="text-primary flex-shrink-0" />
              <div className="min-w-0 flex-1">
                <p className="text-sm font-semibold text-foreground truncate">
                  {appliedStyle ? appliedStyle.name : 'Magic Applied'}
                </p>
                {appliedStyle && (
                  <div className="flex items-center gap-2 mt-1 flex-wrap">
                    <Badge variant="secondary" className="text-xs">
                      {appliedStyle.mask.name}
                    </Badge>
                    <Badge variant="outline" className="text-xs">
                      {appliedStyle.motion.name}
                    </Badge>
                  </div>
                )}
              </div>
            </div>

            <Separator orientation="vertical" className="h-10 hidden md:block" />

            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={onUndo}
                disabled={!canUndo}
                className="gap-2"
              >
                <ArrowCounterClockwise size={16} weight="bold" />
                <span className="hidden sm:inline">Undo</span>
              </Button>

              <Button
                variant="ghost"
                size="sm"
                onClick={onRedo}
                disabled={!canRedo}
                className="gap-2"
              >
                <ArrowClockwise size={16} weight="bold" />
                <span className="hidden sm:inline">Redo</span>
              </Button>

              <Separator orientation="vertical" className="h-6" />

              <Button
                variant="outline"
                size="sm"
                onClick={onRevert}
                disabled={!hasTransformation}
                className="gap-2 text-muted-foreground hover:text-foreground"
              >
                <ArrowUUpLeft size={16} weight="bold" />
                <span className="hidden sm:inline">Revert to Original</span>
                <span className="sm:hidden">Revert</span>
              </Button>
            </div>
          </div>
        </Card>
      </motion.div>
    </AnimatePresence>
  )
}
