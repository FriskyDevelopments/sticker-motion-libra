import { useState } from 'react'
import { motion } from 'framer-motion'
import { DownloadSimple, FileArrowDown, Sparkle, Check } from '@phosphor-icons/react'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { toast } from 'sonner'
import { exportSticker, type StickerExportFormat, type StickerExportOptions } from '@/lib/exportUtils'
import type { StickerStyle } from '@/lib/stickerStyles'
import { cn } from '@/lib/utils'

interface ExportDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  imageDataUrl: string
  appliedStyle: StickerStyle | null
}

interface FormatOption {
  format: StickerExportFormat
  name: string
  description: string
  icon: typeof DownloadSimple
  available: boolean
  badge?: string
}

const formatOptions: FormatOption[] = [
  {
    format: 'png',
    name: 'PNG',
    description: 'High quality static image',
    icon: FileArrowDown,
    available: true
  },
  {
    format: 'webp',
    name: 'WebP',
    description: 'Optimized web format',
    icon: FileArrowDown,
    available: true
  },
  {
    format: 'gif',
    name: 'Animated GIF',
    description: 'Universal animated format',
    icon: Sparkle,
    available: false,
    badge: 'Coming Soon'
  },
  {
    format: 'apng',
    name: 'Animated PNG',
    description: 'High quality animation',
    icon: Sparkle,
    available: false,
    badge: 'Coming Soon'
  }
]

export function ExportDialog({ open, onOpenChange, imageDataUrl, appliedStyle }: ExportDialogProps) {
  const [selectedFormat, setSelectedFormat] = useState<StickerExportFormat>('png')
  const [exporting, setExporting] = useState(false)

  const handleExport = async () => {
    if (!imageDataUrl) {
      toast.error('No image to export')
      return
    }

    setExporting(true)

    const exportOptions: StickerExportOptions = {
      format: selectedFormat,
      quality: 1.0,
      includeMetadata: true,
      style: appliedStyle || undefined
    }

    const result = await exportSticker(imageDataUrl, exportOptions)

    if (result.success) {
      toast.success('Export complete ✦', {
        description: `Your sticker has been downloaded`
      })
      onOpenChange(false)
    } else {
      toast.error('Export failed', {
        description: result.error || 'Please try again'
      })
    }

    setExporting(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-2xl bg-card/95 backdrop-blur-xl border-border/50">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold gradient-text flex items-center gap-3">
            <DownloadSimple size={28} weight="duotone" className="text-primary" />
            Export Your Sticker ✦
          </DialogTitle>
          <DialogDescription className="text-base">
            Choose your preferred format and download your creation
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 mt-4">
          {appliedStyle && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-4 rounded-xl bg-muted/30 border border-border/30"
            >
              <div className="flex items-center gap-3">
                <Sparkle size={20} weight="duotone" className="text-accent" />
                <div className="flex-1">
                  <p className="text-sm font-semibold text-foreground">
                    {appliedStyle.name}
                  </p>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    {appliedStyle.mask.name} • {appliedStyle.motion.name}
                  </p>
                </div>
              </div>
            </motion.div>
          )}

          <div className="space-y-4">
            <p className="text-sm font-semibold text-foreground">Select Format</p>
            <div className="grid grid-cols-2 gap-3">
              {formatOptions.map((option) => {
                const Icon = option.icon
                const isSelected = selectedFormat === option.format
                
                return (
                  <motion.div
                    key={option.format}
                    whileHover={option.available ? { scale: 1.02 } : undefined}
                    whileTap={option.available ? { scale: 0.98 } : undefined}
                  >
                    <Card
                      className={cn(
                        'relative p-4 cursor-pointer transition-all duration-300',
                        'hover:shadow-lg',
                        isSelected && 'ring-2 ring-primary shadow-lg',
                        !option.available && 'opacity-50 cursor-not-allowed'
                      )}
                      onClick={() => option.available && setSelectedFormat(option.format)}
                    >
                      <div className="flex flex-col gap-3">
                        <div className="flex items-center justify-between">
                          <Icon 
                            size={24} 
                            weight="duotone" 
                            className={cn(
                              'transition-colors',
                              isSelected ? 'text-primary' : 'text-muted-foreground'
                            )} 
                          />
                          {isSelected && (
                            <motion.div
                              initial={{ scale: 0 }}
                              animate={{ scale: 1 }}
                              className="w-6 h-6 rounded-full bg-primary flex items-center justify-center"
                            >
                              <Check size={14} weight="bold" className="text-primary-foreground" />
                            </motion.div>
                          )}
                          {option.badge && (
                            <Badge variant="secondary" className="text-xs">
                              {option.badge}
                            </Badge>
                          )}
                        </div>
                        
                        <div className="space-y-1">
                          <p className={cn(
                            'font-semibold text-sm',
                            isSelected ? 'text-foreground' : 'text-foreground/80'
                          )}>
                            {option.name}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {option.description}
                          </p>
                        </div>
                      </div>
                    </Card>
                  </motion.div>
                )
              })}
            </div>
          </div>

          <div className="flex items-center justify-between pt-4 border-t border-border/30">
            <Button
              variant="ghost"
              onClick={() => onOpenChange(false)}
            >
              Cancel
            </Button>
            
            <Button
              onClick={handleExport}
              disabled={exporting || !imageDataUrl}
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
                  <span>Download Sticker ✦</span>
                </>
              )}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
