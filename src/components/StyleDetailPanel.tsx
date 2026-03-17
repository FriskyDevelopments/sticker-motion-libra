import { motion } from 'framer-motion'
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import type { StickerStyle } from '@/lib/stickerStyles'
import { vibeInfo, maskPresets } from '@/lib/stickerStyles'
import { 
  DownloadSimple, 
  Sliders, 
  Sparkle, 
  Lightning,
  Info,
  CheckCircle 
} from '@phosphor-icons/react'
import { toast } from 'sonner'

interface StyleDetailPanelProps {
  style: StickerStyle | null
  open: boolean
  onOpenChange: (open: boolean) => void
  onOpenPlayground: () => void
}

export function StyleDetailPanel({ 
  style, 
  open, 
  onOpenChange,
  onOpenPlayground 
}: StyleDetailPanelProps) {
  if (!style) return null

  const handleExportJSON = () => {
    try {
      const content = JSON.stringify(style, null, 2)
      const blob = new Blob([content], { type: 'application/json' })
      const url = URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = `${style.id}-style.json`
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
      URL.revokeObjectURL(url)
      
      toast.success('Style exported', {
        description: `${style.name} downloaded as JSON`
      })
    } catch (error) {
      toast.error('Export failed', {
        description: 'Could not export the style'
      })
    }
  }

  const maskInfo = maskPresets[style.mask.type]

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="w-full sm:max-w-xl overflow-y-auto">
        <SheetHeader>
          <div className="flex items-start gap-4 pb-4">
            <div className="text-6xl">{style.previewEmoji}</div>
            <div className="flex-1">
              <SheetTitle className="text-2xl mb-2">{style.name}</SheetTitle>
              <SheetDescription className="text-base">
                {style.description}
              </SheetDescription>
            </div>
          </div>
        </SheetHeader>

        <div className="space-y-6 py-6">
          <div className="aspect-square bg-gradient-to-br from-muted/30 to-muted/50 rounded-lg flex items-center justify-center overflow-hidden relative border border-border/30">
            <motion.div
              className="text-[12rem]"
              animate={getDetailMotionAnimation(style.motion.id)}
              transition={getDetailMotionTransition(style.motion.id)}
            >
              {style.previewEmoji}
            </motion.div>
            
            <div className="absolute top-3 right-3">
              <Badge 
                variant="secondary" 
                className="text-sm font-mono bg-background/90 backdrop-blur-sm"
              >
                {style.intensity}
              </Badge>
            </div>
          </div>

          <div 
            className="p-4 rounded-lg text-center font-semibold text-lg"
            style={{ 
              backgroundColor: vibeInfo[style.vibe].color + '15',
              color: vibeInfo[style.vibe].color,
              border: `2px solid ${vibeInfo[style.vibe].color}40`
            }}
          >
            {style.conversionPitch}
          </div>

          <div className="flex gap-2">
            <Button 
              className="flex-1 gap-2 bg-gradient-to-r from-primary to-accent hover:opacity-90"
              size="lg"
            >
              <Sparkle weight="fill" />
              Apply to My Image
            </Button>
            <Button
              variant="outline"
              size="lg"
              onClick={onOpenPlayground}
              className="gap-2"
            >
              <Sliders weight="bold" />
              Playground
            </Button>
          </div>

          <Separator />

          <div className="space-y-4">
            <div className="flex items-center gap-2 text-muted-foreground text-sm font-semibold uppercase tracking-wider">
              <Info weight="fill" />
              Style Breakdown
            </div>

            <div className="space-y-3">
              <div className="p-4 rounded-lg bg-card border border-border/50">
                <div className="flex items-start gap-3 mb-2">
                  <Lightning weight="duotone" className="text-accent mt-0.5" size={20} />
                  <div className="flex-1">
                    <h4 className="font-semibold mb-1">Motion Effect</h4>
                    <p className="text-sm text-muted-foreground mb-2">
                      {style.motion.behavior}
                    </p>
                    <Badge variant="outline" className="font-mono text-xs">
                      {style.motion.name}
                    </Badge>
                  </div>
                </div>
              </div>

              <div className="p-4 rounded-lg bg-card border border-border/50">
                <div className="flex items-start gap-3 mb-2">
                  <Sparkle weight="duotone" className="text-accent mt-0.5" size={20} />
                  <div className="flex-1">
                    <h4 className="font-semibold mb-1">Mask Treatment</h4>
                    <p className="text-sm text-muted-foreground mb-2">
                      {maskInfo.description}
                    </p>
                    <Badge variant="outline" className="font-mono text-xs">
                      {style.mask.name}
                    </Badge>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <Separator />

          <div className="space-y-4">
            <div className="flex items-center gap-2 text-muted-foreground text-sm font-semibold uppercase tracking-wider">
              <CheckCircle weight="fill" />
              Best Used For
            </div>

            <div className="grid grid-cols-1 gap-2">
              {style.bestFor.map((useCase, index) => (
                <div 
                  key={index}
                  className="flex items-center gap-2 p-3 rounded-md bg-muted/30 text-sm"
                >
                  <div className="w-1.5 h-1.5 rounded-full bg-accent" />
                  {useCase}
                </div>
              ))}
            </div>
          </div>

          <Separator />

          <div className="space-y-3">
            <div className="text-muted-foreground text-sm font-semibold uppercase tracking-wider">
              Tags
            </div>
            <div className="flex flex-wrap gap-2">
              {style.tags.map((tag) => (
                <Badge 
                  key={tag} 
                  variant="outline" 
                  className="border-accent/40 text-accent"
                >
                  {tag}
                </Badge>
              ))}
            </div>
          </div>

          <div className="space-y-3">
            <div className="text-muted-foreground text-sm font-semibold uppercase tracking-wider">
              Vibe Category
            </div>
            <div 
              className="p-3 rounded-md font-medium"
              style={{ 
                backgroundColor: vibeInfo[style.vibe].color + '20',
                color: vibeInfo[style.vibe].color,
                border: `1px solid ${vibeInfo[style.vibe].color}40`
              }}
            >
              {vibeInfo[style.vibe].name}
            </div>
            <p className="text-sm text-muted-foreground">
              {vibeInfo[style.vibe].description}
            </p>
          </div>

          <Separator />

          <div className="space-y-3">
            <Button
              variant="outline"
              className="w-full gap-2"
              onClick={handleExportJSON}
            >
              <DownloadSimple weight="bold" />
              Export Style as JSON
            </Button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  )
}

function getDetailMotionAnimation(motionId: string) {
  switch (motionId) {
    case 'breathing-glow':
      return { scale: [1, 1.15, 1], opacity: [0.8, 1, 0.8] }
    case 'pulse-ring':
      return { scale: [1, 1.2, 1] }
    case 'shimmer':
      return { rotate: [0, 5, -5, 0] }
    case 'data-corrupt':
      return { x: [0, 4, -4, 0], skewX: [0, 3, -3, 0] }
    case 'rgb-glitch':
      return { x: [0, 5, -5, 0] }
    case 'bounce':
      return { y: [0, -25, 0], scaleY: [1, 0.9, 1] }
    case 'heartbeat':
      return { scale: [1, 1.15, 1, 1.1, 1] }
    case 'wobble':
      return { rotate: [-12, 12, -12] }
    case 'sparkle-burst':
      return { scale: [1, 1.15, 1], rotate: [0, 15, 0] }
    case 'confetti-rain':
      return { y: [0, 15, 0], rotate: [0, 360] }
    case 'cloud-drift':
      return { x: [-15, 15, -15] }
    case 'lightning-flash':
      return { opacity: [1, 0.4, 1, 0.4, 1] }
    case 'spin':
      return { rotate: 360 }
    case 'orbit':
      return { rotate: 360 }
    case 'spiral':
      return { rotate: 360, scale: [1, 1.08, 1] }
    case 'elastic-pop':
      return { scale: [1, 1.3, 0.9, 1] }
    case 'flicker':
      return { opacity: [1, 0.6, 1, 0.7, 1] }
    case 'sway':
      return { x: [-8, 8, -8], rotate: [-5, 5, -5] }
    case 'pixel-trail':
      return { x: [0, 8, 0] }
    case 'static-noise':
      return { opacity: [1, 0.7, 1, 0.85, 1] }
    default:
      return { scale: [1, 1.08, 1] }
  }
}

function getDetailMotionTransition(motionId: string) {
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
