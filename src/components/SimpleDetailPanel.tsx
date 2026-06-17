import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import type { StickerStyle } from '@/lib/stickerStyles'
import { 
  type MagicEnhancement, 
  defaultEnhancement, 
  getAnimationMultipliers,
  getEnergyLabel,
  getSpeedLabel,
  type MagicLevel,
  type SpeedLevel
} from '@/lib/featuredStyles'
import { removeBackground } from '@/lib/backgroundRemoval'
import { Sparkle, Sliders, ImageSquare, Download, Scissors } from '@phosphor-icons/react'
import { toast } from 'sonner'
import { ImageUpload } from './ImageUpload'

interface SimpleDetailPanelProps {
  style: StickerStyle | null
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function SimpleDetailPanel({ style, open, onOpenChange }: SimpleDetailPanelProps) {
  const [magicEnabled, setMagicEnabled] = useState(false)
  const [enhancement, setEnhancement] = useState<MagicEnhancement>(defaultEnhancement)
  const [uploadedImage, setUploadedImage] = useState<string | undefined>(undefined)
  const [processedImage, setProcessedImage] = useState<string | undefined>(undefined)
  const [bgRemovalEnabled, setBgRemovalEnabled] = useState(false)
  const [isProcessing, setIsProcessing] = useState(false)
  const [activeTab, setActiveTab] = useState<'preview' | 'upload'>('preview')

  if (!style) return null

  const multipliers = getAnimationMultipliers(enhancement)
  const displayImage = bgRemovalEnabled && processedImage ? processedImage : uploadedImage

  const handleImageSelect = (_file: File, dataUrl: string) => {
    setUploadedImage(dataUrl)
    setProcessedImage(undefined)
    setBgRemovalEnabled(false)
    setActiveTab('upload')
  }

  const handleClearImage = () => {
    setUploadedImage(undefined)
    setProcessedImage(undefined)
    setBgRemovalEnabled(false)
    setActiveTab('preview')
  }

  const handleBgRemovalToggle = async (enabled: boolean) => {
    if (!uploadedImage) return

    if (enabled) {
      setIsProcessing(true)
      toast.loading('Removing background...', { id: 'bg-removal' })
      
      try {
        const result = await removeBackground(uploadedImage)
        
        if (result.success && result.processedImageUrl) {
          setProcessedImage(result.processedImageUrl)
          setBgRemovalEnabled(true)
          toast.success('Background removed ✦', {
            id: 'bg-removal',
            description: 'Your sticker is ready for magic'
          })
        } else {
          setBgRemovalEnabled(false)
          toast.error('Could not remove background', {
            id: 'bg-removal',
            description: result.error || 'Please try a different image'
          })
        }
      } catch {
        setBgRemovalEnabled(false)
        toast.error('Processing failed', {
          id: 'bg-removal',
          description: 'Please try again'
        })
      } finally {
        setIsProcessing(false)
      }
    } else {
      setBgRemovalEnabled(false)
      toast.info('Using original image', {
        description: 'Background removal disabled'
      })
    }
  }

  const handleDownload = () => {
    if (!uploadedImage) {
      toast.error('Upload an image first', {
        description: 'Add your image to apply this style'
      })
      return
    }

    toast.success('Rendering your sticker ◌', {
      description: 'Your magic-infused creation is forming...'
    })
    
    setTimeout(() => {
      toast.success('Sticker ready ✦', {
        description: `${style.name} with your image`
      })
    }, 2000)
  }

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="w-full sm:max-w-2xl overflow-y-auto">
        <SheetHeader>
          <div className="flex items-start gap-4 pb-4">
            <div className="text-6xl">{style.previewEmoji}</div>
            <div className="flex-1">
              <SheetTitle className="text-3xl mb-2">{style.name}</SheetTitle>
              <SheetDescription className="text-base">
                {style.description}
              </SheetDescription>
            </div>
          </div>
        </SheetHeader>

        <div className="space-y-8 py-6">
          <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as 'preview' | 'upload')} className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-6 h-auto p-2 gap-2">
              <TabsTrigger value="preview" className="gap-2.5 py-4 px-4 text-base min-h-[56px]">
                <Sparkle size={20} weight="duotone" />
                Style Preview
              </TabsTrigger>
              <TabsTrigger value="upload" className="gap-2.5 py-4 px-4 text-base min-h-[56px]">
                <ImageSquare size={20} weight="duotone" />
                Your Image
              </TabsTrigger>
            </TabsList>

            <TabsContent value="preview" className="mt-0">
              <div className="aspect-square bg-gradient-to-br from-muted/20 via-background to-muted/30 rounded-2xl flex items-center justify-center overflow-hidden relative border-2 border-border/30">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,oklch(0.65_0.20_160/0.12),transparent_70%)]" />
                
                <motion.div
                  key={`${enhancement.energy}-${enhancement.speed}-${magicEnabled}`}
                  className="text-[14rem] relative z-10"
                  animate={getEnhancedAnimation(style.motion.id, style.intensity, magicEnabled ? multipliers : { scale: 1, duration: 1, intensity: 1 })}
                  transition={getEnhancedTransition(style.motion.id, magicEnabled ? multipliers : { scale: 1, duration: 1, intensity: 1 })}
                >
                  {style.previewEmoji}
                </motion.div>
                
                {magicEnabled && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="absolute top-4 right-4"
                  >
                    <Badge className="bg-accent/90 text-accent-foreground border-0 gap-2 px-3 py-1">
                      <Sparkle weight="fill" size={14} />
                      Extra magic ✧
                    </Badge>
                  </motion.div>
                )}
                
                <div className="absolute bottom-4 left-4">
                  <Badge 
                    variant="secondary" 
                    className="text-sm font-mono bg-background/90 backdrop-blur-sm"
                  >
                    {style.intensity}
                  </Badge>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="upload" className="mt-0">
              <div className="relative">
                <ImageUpload
                  onImageSelect={handleImageSelect}
                  currentImage={displayImage}
                  onClear={handleClearImage}
                />
                
                {uploadedImage && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="absolute inset-0 pointer-events-none flex items-center justify-center"
                  >
                    <motion.div
                      key={`${enhancement.energy}-${enhancement.speed}-${magicEnabled}`}
                      className="text-8xl opacity-40 blur-[2px]"
                      animate={getEnhancedAnimation(style.motion.id, style.intensity, magicEnabled ? multipliers : { scale: 1, duration: 1, intensity: 1 })}
                      transition={getEnhancedTransition(style.motion.id, magicEnabled ? multipliers : { scale: 1, duration: 1, intensity: 1 })}
                    >
                      {style.previewEmoji}
                    </motion.div>
                  </motion.div>
                )}
              </div>
              
              {uploadedImage && (
                <>
                  <div className="mt-4 p-4 rounded-lg bg-muted/30 border border-border/50">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <Scissors size={24} weight="duotone" className="text-primary" />
                        <div>
                          <Label htmlFor="bg-removal-toggle" className="text-base font-semibold cursor-pointer">
                            Remove background ✂
                          </Label>
                          <p className="text-sm text-muted-foreground">
                            AI-powered subject isolation
                          </p>
                        </div>
                      </div>
                      <Switch
                        id="bg-removal-toggle"
                        checked={bgRemovalEnabled}
                        onCheckedChange={handleBgRemovalToggle}
                        disabled={isProcessing}
                        className="data-[state=checked]:bg-primary"
                      />
                    </div>
                  </div>
                  
                  <div className="mt-4 p-4 rounded-lg bg-accent/10 border border-accent/30">
                    <div className="flex items-center gap-2 text-sm text-accent-foreground">
                      <Sparkle size={16} weight="fill" className="text-accent" />
                      <span>
                        {bgRemovalEnabled && processedImage 
                          ? `Clean cutout ready! ${style.name} will be applied.` 
                          : `${style.name} will be applied to your image`}
                      </span>
                    </div>
                  </div>
                </>
              )}
            </TabsContent>
          </Tabs>

          <div className="space-y-5">
            <div className="flex items-center justify-between p-4 rounded-lg bg-muted/30 border border-border/50">
              <div className="flex items-center gap-3">
                <Sliders size={24} weight="duotone" className="text-accent" />
                <div>
                  <Label htmlFor="magic-toggle" className="text-base font-semibold cursor-pointer">
                    Add extra magic ✧
                  </Label>
                  <p className="text-sm text-muted-foreground">
                    Boost energy and speed
                  </p>
                </div>
              </div>
              <Switch
                id="magic-toggle"
                checked={magicEnabled}
                onCheckedChange={setMagicEnabled}
                className="data-[state=checked]:bg-accent"
              />
            </div>

            <AnimatePresence>
              {magicEnabled && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-5 overflow-hidden"
                >
                  <div className="p-5 rounded-lg bg-gradient-to-br from-accent/5 to-primary/5 border border-accent/20 space-y-4">
                    <div className="space-y-3">
                      <Label className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
                        Energy ✧
                      </Label>
                      <div className="grid grid-cols-3 gap-3">
                        {(['clean', 'enhanced', 'intense'] as MagicLevel[]).map((level) => (
                          <Button
                            key={level}
                            variant={enhancement.energy === level ? 'default' : 'outline'}
                            size="lg"
                            onClick={() => setEnhancement({ ...enhancement, energy: level })}
                            className={`min-h-[52px] text-base ${enhancement.energy === level ? 'bg-accent hover:bg-accent/90' : ''}`}
                          >
                            {getEnergyLabel(level).split(' ')[0]}
                          </Button>
                        ))}
                      </div>
                      <p className="text-xs text-muted-foreground">
                        {getEnergyLabel(enhancement.energy)}
                      </p>
                    </div>

                    <Separator />

                    <div className="space-y-3">
                      <Label className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
                        Speed △
                      </Label>
                      <div className="grid grid-cols-3 gap-3">
                        {(['slow', 'normal', 'fast'] as SpeedLevel[]).map((level) => (
                          <Button
                            key={level}
                            variant={enhancement.speed === level ? 'default' : 'outline'}
                            size="lg"
                            onClick={() => setEnhancement({ ...enhancement, speed: level })}
                            className={`min-h-[52px] text-base ${enhancement.speed === level ? 'bg-accent hover:bg-accent/90' : ''}`}
                          >
                            {getSpeedLabel(level).split(' ')[0]}
                          </Button>
                        ))}
                      </div>
                      <p className="text-xs text-muted-foreground">
                        {getSpeedLabel(enhancement.speed)}
                      </p>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <Separator />

          <div className="space-y-3">
            {!uploadedImage && (
              <Button 
                className="w-full gap-3 h-14 text-lg bg-gradient-to-r from-primary via-accent to-primary hover:opacity-90 bg-[length:200%_100%] hover:bg-right transition-all duration-500"
                size="lg"
                onClick={() => setActiveTab('upload')}
              >
                <ImageSquare weight="duotone" size={24} />
                Upload your image ✦
              </Button>
            )}

            {uploadedImage && (
              <Button 
                className="w-full gap-3 h-14 text-lg bg-gradient-to-r from-primary via-accent to-primary hover:opacity-90 bg-[length:200%_100%] hover:bg-right transition-all duration-500"
                size="lg"
                onClick={handleDownload}
              >
                <Download weight="duotone" size={24} />
                Create sticker ✦
              </Button>
            )}
          </div>

          <div className="grid grid-cols-2 gap-3 pt-2">
            {style.bestFor.slice(0, 4).map((useCase, index) => (
              <div 
                key={index}
                className="flex items-center gap-2 p-3 rounded-md bg-muted/30 text-sm border border-border/30"
              >
                <Sparkle size={14} weight="fill" className="text-accent shrink-0" />
                <span className="line-clamp-1">{useCase}</span>
              </div>
            ))}
          </div>
        </div>
      </SheetContent>
    </Sheet>
  )
}

function getEnhancedAnimation(motionId: string, intensity: string, multipliers: { scale: number; intensity: number }) {
  const baseIntensity = intensity === 'subtle' ? 0.7 : intensity === 'intense' ? 1.3 : 1.0
  const totalScale = baseIntensity * multipliers.scale * multipliers.intensity

  switch (motionId) {
    case 'breathing-glow':
      return { scale: [1, 1.15 * totalScale, 1], opacity: [0.8, 1, 0.8] }
    case 'pulse-ring':
      return { scale: [1, 1.2 * totalScale, 1] }
    case 'bounce':
      return { y: [0, -30 * totalScale, 0], scaleY: [1, 0.9, 1] }
    case 'wobble':
      return { rotate: [-12 * totalScale, 12 * totalScale, -12 * totalScale] }
    case 'sparkle-burst':
      return { scale: [1, 1.15 * totalScale, 1], rotate: [0, 15, 0] }
    case 'heartbeat':
      return { scale: [1, 1.15 * totalScale, 1, 1.1 * totalScale, 1] }
    case 'spin':
      return { rotate: 360 }
    case 'shimmer':
      return { rotate: [0, 6 * totalScale, -6 * totalScale, 0] }
    case 'data-corrupt':
    case 'rgb-glitch':
      return { x: [0, 5 * totalScale, -5 * totalScale, 0], skewX: [0, 2, -2, 0] }
    case 'sway':
      return { x: [-10 * totalScale, 10 * totalScale, -10 * totalScale], rotate: [-4, 4, -4] }
    default:
      return { scale: [1, 1.08 * totalScale, 1] }
  }
}

function getEnhancedTransition(motionId: string, multipliers: { duration: number }) {
  const baseDuration = {
    'breathing-glow': 3,
    'pulse-ring': 1.5,
    'bounce': 1,
    'wobble': 2.5,
    'sparkle-burst': 1,
    'heartbeat': 1.2,
    'spin': 4,
    'shimmer': 2,
    'data-corrupt': 0.3,
    'rgb-glitch': 0.3,
    'sway': 3.5,
  }[motionId] || 2

  const duration = baseDuration * multipliers.duration

  switch (motionId) {
    case 'breathing-glow':
      return { duration, repeat: Infinity, ease: 'easeInOut' as const }
    case 'pulse-ring':
      return { duration, repeat: Infinity, ease: 'easeOut' as const, repeatDelay: 0.5 }
    case 'bounce':
      return { duration, repeat: Infinity, ease: 'easeOut' as const }
    case 'wobble':
      return { duration, repeat: Infinity, ease: 'easeInOut' as const }
    case 'sparkle-burst':
      return { duration, repeat: Infinity, repeatDelay: 1 }
    case 'heartbeat':
      return { duration, repeat: Infinity, times: [0, 0.2, 0.35, 0.5, 1], repeatDelay: 0.5 }
    case 'spin':
      return { duration, repeat: Infinity, ease: 'linear' as const }
    case 'shimmer':
      return { duration, repeat: Infinity, ease: 'easeInOut' as const, repeatDelay: 1 }
    case 'data-corrupt':
    case 'rgb-glitch':
      return { duration, repeat: Infinity, repeatDelay: 1.5 }
    case 'sway':
      return { duration, repeat: Infinity, ease: 'easeInOut' as const }
    default:
      return { duration, repeat: Infinity, ease: 'easeInOut' as const }
  }
}
