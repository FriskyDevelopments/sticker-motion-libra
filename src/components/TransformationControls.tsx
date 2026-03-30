import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowCounterClockwise, ArrowClockwise, ArrowUUpLeft, Sparkle, DownloadSimple, Package } from '@phosphor-icons/react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Card } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { ExportDialog } from '@/components/ExportDialog'
import { BatchExportDialog } from '@/components/BatchExportDialog'
import { cn } from '@/lib/utils'
import type { StickerStyle } from '@/lib/stickerStyles'
import type { TransformationStep } from '@/lib/transformationEngine'

interface TransformationControlsProps {
  appliedStyle: StickerStyle | null
  canUndo: boolean
  canRedo: boolean
  hasTransformation: boolean
  currentImage: string
  transformationHistory?: TransformationStep[]
  originalImage?: string
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
  currentImage,
  transformationHistory = [],
  originalImage = '',
  onUndo,
  onRedo,
  onRevert,
  className
}: TransformationControlsProps) {
  const [exportDialogOpen, setExportDialogOpen] = useState(false)
  const [batchExportDialogOpen, setBatchExportDialogOpen] = useState(false)
  
  const hasBatchExport = transformationHistory.length > 1
  
  if (!hasTransformation && !appliedStyle) {
    return null
  }

  return (
    <>
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

              <div className="flex items-center gap-2 flex-wrap">
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
                  <span className="hidden sm:inline">Revert</span>
                </Button>

                <Separator orientation="vertical" className="h-6" />

                {hasBatchExport && (
                  <>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setBatchExportDialogOpen(true)}
                      className="gap-2"
                    >
                      <Package size={16} weight="bold" />
                      <span className="hidden sm:inline">Batch Export ✦</span>
                      <span className="sm:hidden">Batch</span>
                    </Button>
                    <Separator orientation="vertical" className="h-6" />
                  </>
                )}

                <Button
                  data-tour="export-button"
                  size="sm"
                  onClick={() => setExportDialogOpen(true)}
                  disabled={!hasTransformation}
                  className="gap-2 bg-primary hover:bg-primary/90"
                >
                  <DownloadSimple size={16} weight="bold" />
                  <span className="hidden sm:inline">Download ✦</span>
                  <span className="sm:hidden">Export</span>
                </Button>
              </div>
            </div>
          </Card>
        </motion.div>
      </AnimatePresence>

      <ExportDialog
        open={exportDialogOpen}
        onOpenChange={setExportDialogOpen}
        imageDataUrl={currentImage}
        appliedStyle={appliedStyle}
      />

      <BatchExportDialog
        open={batchExportDialogOpen}
        onOpenChange={setBatchExportDialogOpen}
        transformationHistory={transformationHistory}
        originalImage={originalImage}
      />
    </>
  )
}
