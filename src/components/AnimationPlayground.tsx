import { useState, useMemo } from 'react'
import { motion } from 'framer-motion'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Slider } from '@/components/ui/slider'
import { Separator } from '@/components/ui/separator'
import { Badge } from '@/components/ui/badge'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Switch } from '@/components/ui/switch'
import { MotionPreset, motionPresets } from '@/lib/motionPresets'
import { 
  Play, 
  Pause, 
  ArrowCounterClockwise, 
  Copy, 
  FileJs, 
  FileTs, 
  FileCss,
  Sliders
} from '@phosphor-icons/react'
import { toast } from 'sonner'

interface AnimationPlaygroundProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  initialPreset?: MotionPreset | null
}

interface PlaygroundParams {
  duration: number
  delay: number
  scale: number
  rotation: number
  opacity: [number, number]
  xOffset: number
  yOffset: number
  easing: string
  repeatDelay: number
  iterations: number | 'infinite'
}

const defaultParams: PlaygroundParams = {
  duration: 2,
  delay: 0,
  scale: 1.1,
  rotation: 0,
  opacity: [1, 1],
  xOffset: 0,
  yOffset: 0,
  easing: 'easeInOut',
  repeatDelay: 0,
  iterations: 'infinite'
}

const easingOptions = [
  'linear',
  'easeIn',
  'easeOut',
  'easeInOut',
  'circIn',
  'circOut',
  'circInOut',
  'backIn',
  'backOut',
  'backInOut',
  'anticipate'
]

export function AnimationPlayground({ open, onOpenChange, initialPreset }: AnimationPlaygroundProps) {
  const [selectedPreset, setSelectedPreset] = useState<MotionPreset | null>(initialPreset || null)
  const [params, setParams] = useState<PlaygroundParams>(defaultParams)
  const [isPlaying, setIsPlaying] = useState(true)
  const [activeTab, setActiveTab] = useState('motion')

  const updateParam = <K extends keyof PlaygroundParams>(key: K, value: PlaygroundParams[K]) => {
    setParams(prev => ({ ...prev, [key]: value }))
  }

  const handlePresetSelect = (presetId: string) => {
    const preset = motionPresets.find(p => p.id === presetId)
    if (preset) {
      setSelectedPreset(preset)
      setParams(defaultParams)
    }
  }

  const resetParams = () => {
    setParams(defaultParams)
    toast.success('Parameters reset to defaults')
  }

  const animationConfig = useMemo(() => ({
    scale: [1, params.scale, 1],
    rotate: [0, params.rotation, 0],
    opacity: params.opacity,
    x: [-params.xOffset, params.xOffset, -params.xOffset],
    y: [-params.yOffset, params.yOffset, -params.yOffset],
  }), [params])

  const transitionConfig = useMemo(() => ({
    duration: params.duration,
    delay: params.delay,
    ease: params.easing as any,
    repeat: params.iterations === 'infinite' ? Infinity : params.iterations,
    repeatDelay: params.repeatDelay,
  }), [params])

  const generateCodeSnippet = (format: 'framer' | 'css' | 'json') => {
    if (format === 'framer') {
      return `// Framer Motion Configuration
const animationConfig = {
  animate: {
    scale: [1, ${params.scale}, 1],
    rotate: [0, ${params.rotation}, 0],
    opacity: [${params.opacity[0]}, ${params.opacity[1]}],
    x: [${-params.xOffset}, ${params.xOffset}, ${-params.xOffset}],
    y: [${-params.yOffset}, ${params.yOffset}, ${-params.yOffset}],
  },
  transition: {
    duration: ${params.duration},
    delay: ${params.delay},
    ease: "${params.easing}",
    repeat: ${params.iterations === 'infinite' ? 'Infinity' : params.iterations},
    repeatDelay: ${params.repeatDelay},
  }
}

// Usage:
<motion.div {...animationConfig}>
  {/* Your content */}
</motion.div>`
    } else if (format === 'css') {
      return `/* CSS Animation */
@keyframes customAnimation {
  0% {
    transform: scale(1) rotate(0deg) translate(${-params.xOffset}px, ${-params.yOffset}px);
    opacity: ${params.opacity[0]};
  }
  50% {
    transform: scale(${params.scale}) rotate(${params.rotation}deg) translate(${params.xOffset}px, ${params.yOffset}px);
    opacity: ${params.opacity[1]};
  }
  100% {
    transform: scale(1) rotate(0deg) translate(${-params.xOffset}px, ${-params.yOffset}px);
    opacity: ${params.opacity[0]};
  }
}

.animated-element {
  animation: customAnimation ${params.duration}s ${params.easing} ${params.delay}s ${params.iterations === 'infinite' ? 'infinite' : params.iterations};
  animation-delay: ${params.repeatDelay}s;
}`
    } else {
      return JSON.stringify({
        presetBase: selectedPreset?.id || 'custom',
        parameters: params
      }, null, 2)
    }
  }

  const copyCode = (format: 'framer' | 'css' | 'json') => {
    const code = generateCodeSnippet(format)
    navigator.clipboard.writeText(code)
    toast.success(`${format.toUpperCase()} code copied to clipboard`)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-6xl max-h-[90vh] p-0">
        <DialogHeader className="px-6 pt-6 pb-4">
          <div className="flex items-center gap-3">
            <Sliders size={32} weight="duotone" className="text-accent" />
            <div>
              <DialogTitle className="text-2xl gradient-text">Animation Playground</DialogTitle>
              <DialogDescription>
                Experiment with animation parameters and preview in real-time
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 px-6 pb-6 overflow-hidden">
          <div className="space-y-4">
            <div className="space-y-3">
              <Label htmlFor="preset-select" className="text-sm font-semibold uppercase tracking-wider">
                Base Preset
              </Label>
              <Select 
                value={selectedPreset?.id || ''} 
                onValueChange={handlePresetSelect}
              >
                <SelectTrigger id="preset-select">
                  <SelectValue placeholder="Start from scratch or select a preset" />
                </SelectTrigger>
                <SelectContent>
                  {motionPresets.map(preset => (
                    <SelectItem key={preset.id} value={preset.id}>
                      {preset.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <Separator />

            <ScrollArea className="h-[450px] pr-4">
              <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="motion">Motion</TabsTrigger>
                  <TabsTrigger value="timing">Timing</TabsTrigger>
                </TabsList>

                <TabsContent value="motion" className="space-y-6 mt-4">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <Label className="text-sm">Scale</Label>
                      <Badge variant="secondary" className="font-mono text-xs">
                        {params.scale.toFixed(2)}
                      </Badge>
                    </div>
                    <Slider
                      value={[params.scale]}
                      onValueChange={([value]) => updateParam('scale', value)}
                      min={0.5}
                      max={2}
                      step={0.05}
                      className="w-full"
                    />
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <Label className="text-sm">Rotation (degrees)</Label>
                      <Badge variant="secondary" className="font-mono text-xs">
                        {params.rotation}°
                      </Badge>
                    </div>
                    <Slider
                      value={[params.rotation]}
                      onValueChange={([value]) => updateParam('rotation', value)}
                      min={-360}
                      max={360}
                      step={15}
                      className="w-full"
                    />
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <Label className="text-sm">X Offset (px)</Label>
                      <Badge variant="secondary" className="font-mono text-xs">
                        {params.xOffset}px
                      </Badge>
                    </div>
                    <Slider
                      value={[params.xOffset]}
                      onValueChange={([value]) => updateParam('xOffset', value)}
                      min={0}
                      max={100}
                      step={5}
                      className="w-full"
                    />
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <Label className="text-sm">Y Offset (px)</Label>
                      <Badge variant="secondary" className="font-mono text-xs">
                        {params.yOffset}px
                      </Badge>
                    </div>
                    <Slider
                      value={[params.yOffset]}
                      onValueChange={([value]) => updateParam('yOffset', value)}
                      min={0}
                      max={100}
                      step={5}
                      className="w-full"
                    />
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <Label className="text-sm">Opacity Range</Label>
                      <Badge variant="secondary" className="font-mono text-xs">
                        {params.opacity[0].toFixed(2)} → {params.opacity[1].toFixed(2)}
                      </Badge>
                    </div>
                    <div className="space-y-2">
                      <Label className="text-xs text-muted-foreground">Start</Label>
                      <Slider
                        value={[params.opacity[0]]}
                        onValueChange={([value]) => updateParam('opacity', [value, params.opacity[1]])}
                        min={0}
                        max={1}
                        step={0.1}
                        className="w-full"
                      />
                      <Label className="text-xs text-muted-foreground">End</Label>
                      <Slider
                        value={[params.opacity[1]]}
                        onValueChange={([value]) => updateParam('opacity', [params.opacity[0], value])}
                        min={0}
                        max={1}
                        step={0.1}
                        className="w-full"
                      />
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="timing" className="space-y-6 mt-4">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <Label className="text-sm">Duration (seconds)</Label>
                      <Badge variant="secondary" className="font-mono text-xs">
                        {params.duration.toFixed(1)}s
                      </Badge>
                    </div>
                    <Slider
                      value={[params.duration]}
                      onValueChange={([value]) => updateParam('duration', value)}
                      min={0.1}
                      max={10}
                      step={0.1}
                      className="w-full"
                    />
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <Label className="text-sm">Initial Delay (seconds)</Label>
                      <Badge variant="secondary" className="font-mono text-xs">
                        {params.delay.toFixed(1)}s
                      </Badge>
                    </div>
                    <Slider
                      value={[params.delay]}
                      onValueChange={([value]) => updateParam('delay', value)}
                      min={0}
                      max={5}
                      step={0.1}
                      className="w-full"
                    />
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <Label className="text-sm">Repeat Delay (seconds)</Label>
                      <Badge variant="secondary" className="font-mono text-xs">
                        {params.repeatDelay.toFixed(1)}s
                      </Badge>
                    </div>
                    <Slider
                      value={[params.repeatDelay]}
                      onValueChange={([value]) => updateParam('repeatDelay', value)}
                      min={0}
                      max={5}
                      step={0.1}
                      className="w-full"
                    />
                  </div>

                  <div className="space-y-3">
                    <Label htmlFor="easing-select" className="text-sm">Easing Function</Label>
                    <Select 
                      value={params.easing} 
                      onValueChange={(value) => updateParam('easing', value)}
                    >
                      <SelectTrigger id="easing-select">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {easingOptions.map(easing => (
                          <SelectItem key={easing} value={easing}>
                            {easing}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="flex items-center justify-between">
                    <Label htmlFor="infinite-toggle" className="text-sm">
                      Infinite Loop
                    </Label>
                    <Switch
                      id="infinite-toggle"
                      checked={params.iterations === 'infinite'}
                      onCheckedChange={(checked) => updateParam('iterations', checked ? 'infinite' : 1)}
                    />
                  </div>

                  {params.iterations !== 'infinite' && (
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <Label className="text-sm">Iterations</Label>
                        <Badge variant="secondary" className="font-mono text-xs">
                          {params.iterations}
                        </Badge>
                      </div>
                      <Slider
                        value={[params.iterations as number]}
                        onValueChange={([value]) => updateParam('iterations', value)}
                        min={1}
                        max={10}
                        step={1}
                        className="w-full"
                      />
                    </div>
                  )}
                </TabsContent>
              </Tabs>
            </ScrollArea>

            <div className="flex gap-2 pt-4">
              <Button
                variant="outline"
                size="sm"
                onClick={resetParams}
                className="gap-2 flex-1"
              >
                <ArrowCounterClockwise weight="bold" />
                Reset
              </Button>
              <Button
                variant={isPlaying ? 'secondary' : 'default'}
                size="sm"
                onClick={() => setIsPlaying(!isPlaying)}
                className="gap-2 flex-1"
              >
                {isPlaying ? (
                  <>
                    <Pause weight="fill" />
                    Pause
                  </>
                ) : (
                  <>
                    <Play weight="fill" />
                    Play
                  </>
                )}
              </Button>
            </div>
          </div>

          <div className="space-y-4">
            <div className="bg-gradient-to-br from-muted/30 via-muted/20 to-transparent rounded-xl border-2 border-border p-8 flex items-center justify-center min-h-[400px] relative overflow-hidden">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_40%,oklch(0.45_0.18_300/0.08),transparent_50%)]" />
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_60%,oklch(0.75_0.15_200/0.06),transparent_50%)]" />
              
              <motion.div
                key={`${params.duration}-${params.scale}-${params.rotation}-${isPlaying}`}
                className="w-32 h-32 rounded-3xl bg-gradient-to-br from-primary via-accent to-secondary flex items-center justify-center text-5xl shadow-2xl relative z-10"
                animate={isPlaying ? animationConfig : {}}
                transition={transitionConfig}
              >
                ✨
              </motion.div>
            </div>

            <div className="space-y-3">
              <Label className="text-sm font-semibold uppercase tracking-wider">Export Configuration</Label>
              <div className="grid grid-cols-3 gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => copyCode('framer')}
                  className="gap-2"
                >
                  <FileJs />
                  Framer
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => copyCode('css')}
                  className="gap-2"
                >
                  <FileCss />
                  CSS
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => copyCode('json')}
                  className="gap-2"
                >
                  <FileTs />
                  JSON
                </Button>
              </div>
            </div>

            <ScrollArea className="h-[200px] rounded-lg bg-muted/30 p-4 border">
              <pre className="text-xs font-mono">
                <code>{generateCodeSnippet('framer')}</code>
              </pre>
            </ScrollArea>

            {selectedPreset && (
              <div className="bg-primary/10 border border-primary/20 rounded-lg p-4 space-y-2">
                <div className="flex items-start gap-2">
                  <Badge variant="secondary" className="mt-0.5">
                    Base: {selectedPreset.name}
                  </Badge>
                </div>
                <p className="text-xs text-muted-foreground">
                  {selectedPreset.visualBehavior}
                </p>
              </div>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
