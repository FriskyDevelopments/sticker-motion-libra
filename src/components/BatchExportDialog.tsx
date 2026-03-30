import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { DownloadSimple, CheckSquare, Square, Sparkle, Package, X } from '@phosphor-icons/react'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { Separator } from '@/components/ui/separator'
import { toast } from 'sonner'
import { cn } from '@/lib/utils'
import { exportBatchStickers, type BatchExportOptions } from '@/lib/batchExportUtils'
import type { StickerStyle } from '@/lib/stickerStyles'
import type { TransformationStep } from '@/lib/transformationEngine'

interface BatchExportDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  transformationHistory: TransformationStep[]
  originalImage: string
}

interface ExportItem {
  id: string
  image: string
  style: StickerStyle
  selected: boolean
}

export function BatchExportDialog({
  open,
  onOpenChange,
  transformationHistory,
  originalImage
}: BatchExportDialogProps) {
  const [exportItems, setExportItems] = useState<ExportItem[]>(() => {
    return transformationHistory.map((step) => ({
      id: step.id,
      image: step.resultImage,
      style: step.styleApplied,
      selected: true
    }))
  })

  const [exporting, setExporting] = useState(false)
  const [exportProgress, setExportProgress] = useState(0)

  const selectedCount = exportItems.filter(item => item.selected).length
  const allSelected = exportItems.length > 0 && selectedCount === exportItems.length

  const toggleItem = (id: string) => {
    setExportItems(prev => prev.map(item =>
      item.id === id ? { ...item, selected: !item.selected } : item
    ))
  }

  const toggleAll = () => {
    const newValue = !allSelected
    setExportItems(prev => prev.map(item => ({ ...item, selected: newValue })))
  }

  const handleBatchExport = async () => {
    const selectedItems = exportItems.filter(item => item.selected)

    if (selectedItems.length === 0) {
      toast.error('No stickers selected', {
        description: 'Please select at least one sticker to export'
      })
      return
    }

    setExporting(true)
    setExportProgress(0)

    const options: BatchExportOptions = {
      format: 'gif',
      quality: 1.0,
      onProgress: (progress) => {
        setExportProgress(progress)
      }
    }

    const result = await exportBatchStickers(selectedItems, options)

    if (result.success) {
      toast.success('Batch export complete ✦', {
        description: `${selectedItems.length} sticker${selectedItems.length > 1 ? 's' : ''} exported successfully`
      })
      onOpenChange(false)
    } else {
      toast.error('Batch export failed', {
        description: result.error || 'Please try again'
      })
    }

    setExporting(false)
    setExportProgress(0)
  }

  if (exportItems.length === 0) {
    return (
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="sm:max-w-2xl bg-card/95 backdrop-blur-xl border-border/50">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold gradient-text flex items-center gap-3">
              <Package size={28} weight="duotone" className="text-primary" />
              Batch Export ✦
            </DialogTitle>
          </DialogHeader>

          <div className="py-12 text-center space-y-4">
            <Package size={64} weight="duotone" className="mx-auto text-muted-foreground opacity-50" />
            <p className="text-lg font-semibold text-foreground">
              No stickers to export
            </p>
            <p className="text-sm text-muted-foreground max-w-md mx-auto">
              Apply different styles to your image to create multiple stickers, then export them all at once
            </p>
          </div>

          <div className="flex justify-end pt-4 border-t border-border/30">
            <Button variant="ghost" onClick={() => onOpenChange(false)}>
              Close
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    )
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-4xl max-h-[90vh] bg-card/95 backdrop-blur-xl border-border/50 flex flex-col">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold gradient-text flex items-center gap-3">
            <Package size={28} weight="duotone" className="text-primary" />
            Batch Export ✦
          </DialogTitle>
          <DialogDescription className="text-base">
            Select stickers to export as animated GIFs
          </DialogDescription>
        </DialogHeader>

        <div className="flex-1 overflow-y-auto space-y-4 mt-4">
          <div className="flex items-center justify-between p-3 bg-muted/20 rounded-lg border border-border/30">
            <button
              onClick={toggleAll}
              className="flex items-center gap-3 text-sm font-medium hover:text-primary transition-colors"
            >
              {allSelected ? (
                <CheckSquare size={20} weight="fill" className="text-primary" />
              ) : (
                <Square size={20} weight="regular" />
              )}
              <span>Select All ({exportItems.length})</span>
            </button>

            <div className="flex items-center gap-2">
              <Badge variant="secondary" className="text-xs">
                {selectedCount} selected
              </Badge>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <AnimatePresence mode="popLayout">
              {exportItems.map((item, index) => (
                <motion.div
                  key={item.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <Card
                    className={cn(
                      'relative p-4 cursor-pointer transition-all duration-300',
                      'hover:shadow-lg',
                      item.selected && 'ring-2 ring-primary shadow-lg bg-primary/5'
                    )}
                    onClick={() => toggleItem(item.id)}
                  >
                    <div className="flex gap-4">
                      <div className="flex-shrink-0">
                        <div className={cn(
                          'w-20 h-20 rounded-lg overflow-hidden border-2 transition-colors',
                          item.selected ? 'border-primary' : 'border-border'
                        )}>
                          <img
                            src={item.image}
                            alt={item.style.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                      </div>

                      <div className="flex-1 min-w-0 space-y-2">
                        <div className="flex items-start justify-between gap-2">
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-semibold text-foreground truncate">
                              {item.style.name}
                            </p>
                            <p className="text-xs text-muted-foreground mt-0.5">
                              {item.style.mask.name} • {item.style.motion.name}
                            </p>
                          </div>

                          <div className="flex-shrink-0">
                            {item.selected ? (
                              <motion.div
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                className="w-6 h-6 rounded-full bg-primary flex items-center justify-center"
                              >
                                <CheckSquare size={16} weight="fill" className="text-primary-foreground" />
                              </motion.div>
                            ) : (
                              <div className="w-6 h-6 rounded-full border-2 border-border flex items-center justify-center" />
                            )}
                          </div>
                        </div>

                        <div className="flex items-center gap-2 flex-wrap">
                          {Array.isArray(item.style.vibe) && item.style.vibe.slice(0, 2).map((tag: string) => (
                            <Badge key={tag} variant="outline" className="text-xs">
                              {tag}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>

        {exporting && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-2 p-4 bg-muted/20 rounded-lg border border-border/30"
          >
            <div className="flex items-center justify-between text-sm">
              <span className="font-medium text-foreground">Exporting stickers...</span>
              <span className="text-muted-foreground">{Math.round(exportProgress)}%</span>
            </div>
            <Progress value={exportProgress} className="h-2" />
          </motion.div>
        )}

        <Separator className="my-2" />

        <div className="flex items-center justify-between pt-2">
          <div className="text-sm text-muted-foreground">
            {selectedCount > 0 ? (
              <span>
                {selectedCount} sticker{selectedCount > 1 ? 's' : ''} will be exported as animated GIF{selectedCount > 1 ? 's' : ''}
              </span>
            ) : (
              <span>No stickers selected</span>
            )}
          </div>

          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              onClick={() => onOpenChange(false)}
              disabled={exporting}
            >
              Cancel
            </Button>

            <Button
              onClick={handleBatchExport}
              disabled={exporting || selectedCount === 0}
              className="gap-2 bg-primary hover:bg-primary/90"
            >
              {exporting ? (
                <>
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                  >
                    <Sparkle size={18} weight="duotone" />
                  </motion.div>
                  <span>Exporting...</span>
                </>
              ) : (
                <>
                  <DownloadSimple size={18} weight="bold" />
                  <span>Export {selectedCount} Sticker{selectedCount > 1 ? 's' : ''} ✦</span>
                </>
              )}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
