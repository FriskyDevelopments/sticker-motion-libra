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
import { Switch } from '@/components/ui/switch'
import { Label } from '@/components/ui/label'
import type { StickerStyle } from '@/lib/stickerStyles'
import { vibeInfo, maskPresets } from '@/lib/stickerStyles'
import type { MagicLevel, SpeedLevel } from '@/lib/featuredStyles'
import { 
  Sparkle, 
  Lightning,
  Info,
} from '@phosphor-icons/react'
import { toast } from 'sonner'
import { useState } from 'react'

interface StyleDetailPanelProps {
  style: StickerStyle | null
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function StyleDetailPanel({ 
  style, 
  open, 
  onOpenChange,
}: StyleDetailPanelProps) {
  const [extraMagic, setExtraMagic] = useState(false)
  const [energy, setEnergy] = useState<MagicLevel>('enhanced')
  const [speed, setSpeed] = useState<SpeedLevel>(style?.motion.speed || 'normal')

  if (!style) return null

  const handleApply = () => {
    toast.success('Ready to apply ✦', {
      description: `${style.name} will be applied to your image`
    })
  }

  const maskInfo = maskPresets[style.mask.type]
  
  const baseEnergyMultiplier = style.motion.energy === 'soft' ? 0.7 : style.motion.energy === 'strong' ? 1.4 : 1
  const extraMultiplier = extraMagic ? (energy === 'clean' ? 0.85 : energy === 'intense' ? 1.3 : 1.1) : 1
  const energyMultiplier = baseEnergyMultiplier * extraMultiplier
  
  const baseSpeedMultiplier = style.motion.speed === 'slow' ? 1.5 : style.motion.speed === 'fast' ? 0.65 : 1
  const adjustedSpeedMultiplier = extraMagic ? (speed === 'slow' ? 1.3 : speed === 'fast' ? 0.75 : 1) : 1
  const speedMultiplier = baseSpeedMultiplier * adjustedSpeedMultiplier

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
              transition={getDetailMotionTransition(style.motion.id, speedMultiplier)}
              style={{
                filter: extraMagic && energy !== 'clean' 
                  ? `drop-shadow(0 0 ${12 * energyMultiplier}px rgba(var(--primary), ${0.5 * energyMultiplier}))` 
                  : 'none'
              }}
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
            className="p-4 rounded-lg text-center space-y-3"
            style={{ 
              backgroundColor: vibeInfo[style.vibe].color + '15',
              color: vibeInfo[style.vibe].color,
              border: `2px solid ${vibeInfo[style.vibe].color}40`
            }}
          >
            <p className="font-semibold text-lg">
              ✧ {style.conversionPitch}
            </p>
            <p className="text-sm opacity-80">
              {style.movementPersonality}
            </p>
          </div>

          <Button 
            className="w-full gap-2 bg-gradient-to-r from-primary to-accent hover:opacity-90 text-lg py-6"
            size="lg"
            onClick={handleApply}
          >
            <Sparkle weight="fill" size={24} />
            Apply to my image ✦
          </Button>

          <Separator />

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <Label htmlFor="extra-magic" className="text-base font-semibold flex items-center gap-2">
                <Sparkle size={18} weight="duotone" className="text-accent" />
                Add extra magic ✧
              </Label>
              <Switch
                id="extra-magic"
                checked={extraMagic}
                onCheckedChange={setExtraMagic}
              />
            </div>

            {extraMagic && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="space-y-4 pt-2"
              >
                <div className="p-4 rounded-lg bg-accent/10 border border-accent/20 space-y-4">
                  <div className="space-y-2">
                    <Label className="text-sm font-semibold">Energy</Label>
                    <div className="grid grid-cols-3 gap-2">
                      <Button
                        variant={energy === 'clean' ? 'default' : 'outline'}
                        size="sm"
                        onClick={() => setEnergy('clean')}
                        className="text-xs"
                      >
                        Soft
                      </Button>
                      <Button
                        variant={energy === 'enhanced' ? 'default' : 'outline'}
                        size="sm"
                        onClick={() => setEnergy('enhanced')}
                        className="text-xs"
                      >
                        Medium
                      </Button>
                      <Button
                        variant={energy === 'intense' ? 'default' : 'outline'}
                        size="sm"
                        onClick={() => setEnergy('intense')}
                        className="text-xs"
                      >
                        Strong
                      </Button>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label className="text-sm font-semibold">Speed</Label>
                    <div className="grid grid-cols-3 gap-2">
                      <Button
                        variant={speed === 'slow' ? 'default' : 'outline'}
                        size="sm"
                        onClick={() => setSpeed('slow')}
                        className="text-xs"
                      >
                        Slow
                      </Button>
                      <Button
                        variant={speed === 'normal' ? 'default' : 'outline'}
                        size="sm"
                        onClick={() => setSpeed('normal')}
                        className="text-xs"
                      >
                        Normal
                      </Button>
                      <Button
                        variant={speed === 'fast' ? 'default' : 'outline'}
                        size="sm"
                        onClick={() => setSpeed('fast')}
                        className="text-xs"
                      >
                        Fast
                      </Button>
                    </div>
                  </div>

                  <p className="text-xs text-muted-foreground text-center pt-2">
                    {extraMagic && energy !== 'enhanced' ? 'Magic enhanced ✦' : 'Adjusting motion and effects...'}
                  </p>
                </div>
              </motion.div>
            )}
          </div>

          <Separator />

          <div className="space-y-4">
            <div className="flex items-center gap-2 text-muted-foreground text-sm font-semibold uppercase tracking-wider">
              <Info weight="fill" />
              What's in this style
            </div>

            <div className="space-y-3">
              <div className="p-4 rounded-lg bg-card border border-border/50">
                <div className="flex items-start gap-3">
                  <Lightning weight="duotone" className="text-accent mt-0.5" size={20} />
                  <div className="flex-1">
                    <h4 className="font-semibold mb-1 text-sm">Motion</h4>
                    <p className="text-xs text-muted-foreground">
                      {style.motion.behavior}
                    </p>
                  </div>
                </div>
              </div>

              <div className="p-4 rounded-lg bg-card border border-border/50">
                <div className="flex items-start gap-3">
                  <Sparkle weight="duotone" className="text-accent mt-0.5" size={20} />
                  <div className="flex-1">
                    <h4 className="font-semibold mb-1 text-sm">Finish</h4>
                    <p className="text-xs text-muted-foreground">
                      {maskInfo.description}
                    </p>
                  </div>
                </div>
              </div>
            </div>
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

function getDetailMotionTransition(motionId: string, speedMultiplier: number = 1) {
  const baseDuration = (duration: number) => duration * speedMultiplier

  switch (motionId) {
    case 'breathing-glow':
      return { duration: baseDuration(3), repeat: Infinity, ease: 'easeInOut' as const }
    case 'pulse-ring':
      return { duration: baseDuration(1.5), repeat: Infinity, ease: 'easeOut' as const, repeatDelay: 0.5 }
    case 'shimmer':
      return { duration: baseDuration(2), repeat: Infinity, ease: 'easeInOut' as const, repeatDelay: 1 }
    case 'data-corrupt':
      return { duration: baseDuration(0.3), repeat: Infinity, repeatDelay: 1.5 }
    case 'rgb-glitch':
      return { duration: baseDuration(0.15), repeat: Infinity, repeatDelay: 2 }
    case 'bounce':
      return { duration: baseDuration(1), repeat: Infinity, ease: 'easeOut' as const }
    case 'heartbeat':
      return { duration: baseDuration(1.2), repeat: Infinity, times: [0, 0.2, 0.35, 0.5, 1], repeatDelay: 0.5 }
    case 'wobble':
      return { duration: baseDuration(2.5), repeat: Infinity, ease: 'easeInOut' as const }
    case 'sparkle-burst':
      return { duration: baseDuration(1), repeat: Infinity, repeatDelay: 1 }
    case 'confetti-rain':
      return { duration: baseDuration(3), repeat: Infinity, ease: 'linear' as const }
    case 'cloud-drift':
      return { duration: baseDuration(8), repeat: Infinity, ease: 'easeInOut' as const }
    case 'lightning-flash':
      return { duration: baseDuration(0.8), repeat: Infinity, repeatDelay: 2, times: [0, 0.1, 0.2, 0.3, 1] }
    case 'spin':
      return { duration: baseDuration(4), repeat: Infinity, ease: 'linear' as const }
    case 'orbit':
      return { duration: baseDuration(3), repeat: Infinity, ease: 'linear' as const }
    case 'spiral':
      return { duration: baseDuration(5), repeat: Infinity, ease: 'linear' as const }
    case 'elastic-pop':
      return { duration: baseDuration(0.6), repeat: Infinity, repeatDelay: 1.5, ease: 'easeOut' as const }
    case 'flicker':
      return { duration: baseDuration(0.5), repeat: Infinity, times: [0, 0.2, 0.4, 0.7, 1] }
    case 'sway':
      return { duration: baseDuration(3.5), repeat: Infinity, ease: 'easeInOut' as const }
    case 'pixel-trail':
      return { duration: baseDuration(0.4), repeat: Infinity, ease: 'easeOut' as const, repeatDelay: 0.3 }
    case 'static-noise':
      return { duration: baseDuration(0.2), repeat: Infinity, times: [0, 0.3, 0.5, 0.8, 1] }
    default:
      return { duration: baseDuration(2), repeat: Infinity, ease: 'easeInOut' as const }
  }
}
