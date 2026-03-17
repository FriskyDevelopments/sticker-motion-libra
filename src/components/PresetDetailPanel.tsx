import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Button } from '@/components/ui/button'
import { MotionPreset, styleInfo, categoryInfo } from '@/lib/motionPresets'
import { AnimatedPreview } from './AnimatedPreview'
import { Sparkle, Clock, Target, Repeat, DownloadSimple, Code, FileJs, FileTs, FileCss, Sliders } from '@phosphor-icons/react'
import { downloadPreset, type ExportFormat } from '@/lib/exportUtils'
import { toast } from 'sonner'

interface PresetDetailPanelProps {
  preset: MotionPreset | null
  open: boolean
  onOpenChange: (open: boolean) => void
  onOpenPlayground?: () => void
}

const intensityInfo = {
  soft: { label: 'Soft', description: 'Subtle and understated' },
  medium: { label: 'Medium', description: 'Balanced and noticeable' },
  strong: { label: 'Strong', description: 'Bold and impactful' }
}

const loopStyleInfo = {
  continuous: { label: 'Continuous', description: 'Loops seamlessly without pause' },
  pulse: { label: 'Pulse', description: 'Repeats with intervals' },
  triggered: { label: 'Triggered', description: 'Plays occasionally' },
  bounce: { label: 'Bounce', description: 'Back-and-forth motion' }
}

export function PresetDetailPanel({ preset, open, onOpenChange, onOpenPlayground }: PresetDetailPanelProps) {
  if (!preset) return null

  const categoryConfig = categoryInfo[preset.category]

  const handleExport = (format: ExportFormat) => {
    try {
      downloadPreset(preset, format)
      toast.success(`Exported as ${format.toUpperCase()}`, {
        description: `${preset.name} preset downloaded successfully`
      })
    } catch (error) {
      toast.error('Export failed', {
        description: 'There was an error exporting the preset'
      })
    }
  }

  const handleOpenPlayground = () => {
    onOpenPlayground?.()
    onOpenChange(false)
  }

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="w-full sm:max-w-xl backdrop-blur-md bg-card/95">
        <SheetHeader>
          <SheetTitle className="text-2xl gradient-text">{preset.name}</SheetTitle>
          <SheetDescription>
            {categoryConfig.name}
          </SheetDescription>
        </SheetHeader>

        <ScrollArea className="h-[calc(100vh-120px)] pr-4 mt-6">
          <div className="space-y-6">
            <div className="flex items-center justify-center py-8 bg-muted/30 rounded-xl">
              <AnimatedPreview preset={preset} className="w-32 h-32" />
            </div>

            {onOpenPlayground && (
              <Button
                onClick={handleOpenPlayground}
                className="w-full gap-2 bg-gradient-to-r from-primary to-accent hover:opacity-90"
                size="lg"
              >
                <Sliders weight="bold" />
                Test in Playground
              </Button>
            )}

            <div className="space-y-3">
              <div className="flex items-center gap-2 mb-2">
                <DownloadSimple className="text-accent" weight="duotone" />
                <h3 className="font-semibold text-sm uppercase tracking-wider">Export Preset</h3>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleExport('json')}
                  className="gap-2"
                >
                  <FileJs />
                  JSON
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleExport('typescript')}
                  className="gap-2"
                >
                  <FileTs />
                  TypeScript
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleExport('css')}
                  className="gap-2"
                >
                  <FileCss />
                  CSS
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleExport('framer-motion')}
                  className="gap-2"
                >
                  <Code />
                  Framer
                </Button>
              </div>
            </div>

            <Separator />

            <div className="space-y-4">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <Sparkle className="text-accent" weight="duotone" />
                  <h3 className="font-semibold text-sm uppercase tracking-wider">Visual Behavior</h3>
                </div>
                <p className="text-sm text-foreground/80 leading-relaxed bg-muted/20 p-4 rounded-lg">
                  {preset.visualBehavior}
                </p>
              </div>

              <Separator />

              <div>
                <div className="flex items-center gap-2 mb-2">
                  <Target className="text-accent" weight="duotone" />
                  <h3 className="font-semibold text-sm uppercase tracking-wider">Emotional Vibe</h3>
                </div>
                <p className="text-base font-medium text-foreground">
                  {preset.emotionalVibe}
                </p>
              </div>

              <Separator />

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <Clock className="text-accent" weight="duotone" size={18} />
                    <h3 className="font-semibold text-xs uppercase tracking-wider">Intensity</h3>
                  </div>
                  <Badge className="bg-primary/20 text-primary-foreground border-primary/30">
                    {intensityInfo[preset.intensity].label}
                  </Badge>
                  <p className="text-xs text-muted-foreground mt-1">
                    {intensityInfo[preset.intensity].description}
                  </p>
                </div>

                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <Repeat className="text-accent" weight="duotone" size={18} />
                    <h3 className="font-semibold text-xs uppercase tracking-wider">Loop Style</h3>
                  </div>
                  <Badge variant="outline">
                    {loopStyleInfo[preset.loopStyle].label}
                  </Badge>
                  <p className="text-xs text-muted-foreground mt-1">
                    {loopStyleInfo[preset.loopStyle].description}
                  </p>
                </div>
              </div>

              <Separator />

              <div>
                <h3 className="font-semibold text-sm uppercase tracking-wider mb-3">Compatible Styles</h3>
                <div className="flex flex-wrap gap-2">
                  {preset.compatibleStyles.map((style) => (
                    <Badge
                      key={style}
                      className="text-sm px-3 py-1"
                      style={{
                        backgroundColor: styleInfo[style].color + '30',
                        borderColor: styleInfo[style].color,
                        color: 'var(--foreground)'
                      }}
                    >
                      {styleInfo[style].label}
                    </Badge>
                  ))}
                </div>
              </div>

              <Separator />

              <div>
                <h3 className="font-semibold text-sm uppercase tracking-wider mb-3">Recommended Use Cases</h3>
                <ul className="space-y-2">
                  {preset.useCases.map((useCase, index) => (
                    <li key={index} className="text-sm text-foreground/80 flex items-start gap-2">
                      <span className="text-accent mt-1">●</span>
                      <span>{useCase}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {preset.technicalNotes && (
                <>
                  <Separator />
                  <div>
                    <h3 className="font-semibold text-sm uppercase tracking-wider mb-2">Technical Notes</h3>
                    <code className="text-xs font-mono bg-muted/40 p-3 rounded-lg block text-foreground/70">
                      {preset.technicalNotes}
                    </code>
                  </div>
                </>
              )}
            </div>
          </div>
        </ScrollArea>
      </SheetContent>
    </Sheet>
  )
}
