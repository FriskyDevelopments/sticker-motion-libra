import { useState } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Slider } from '@/components/ui/slider'
import { 
  AsciiLoader, 
  HeroLoader, 
  InlineLoader, 
  ProgressBarAscii, 
  AdaptiveLoader,
  CloudStatus 
} from '@/components/AsciiLoader'
import { asciiAnimations, heroLoadingScenes } from '@/lib/asciiAnimations'
import { Play, CloudArrowUp } from '@phosphor-icons/react'

interface AsciiShowcaseProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function AsciiShowcase({ open, onOpenChange }: AsciiShowcaseProps) {
  const [progress, setProgress] = useState(0)
  const [selectedHero, setSelectedHero] = useState<keyof typeof heroLoadingScenes>('conjuringMagic')

  const startProgressDemo = () => {
    setProgress(0)
    const interval = setInterval(() => {
      setProgress(p => {
        if (p >= 100) {
          clearInterval(interval)
          return 100
        }
        return p + 2
      })
    }, 50)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-2xl">
            <CloudArrowUp weight="duotone" className="text-accent" />
            STIX MAGIC ASCII Cloud System
          </DialogTitle>
          <DialogDescription>
            Premium ASCII-based interaction layer for loading, processing, and transition states across our Cloudflare-deployed platform
          </DialogDescription>
        </DialogHeader>

        <Tabs defaultValue="core" className="mt-4">
          <TabsList className="w-full">
            <TabsTrigger value="core">Core Animations</TabsTrigger>
            <TabsTrigger value="hero">Hero Scenes</TabsTrigger>
            <TabsTrigger value="utility">Utilities</TabsTrigger>
            <TabsTrigger value="adaptive">Adaptive</TabsTrigger>
          </TabsList>

          <TabsContent value="core" className="space-y-4 mt-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {Object.entries(asciiAnimations).map(([key, animation]) => (
                <Card key={key} className="gradient-border">
                  <CardHeader>
                    <CardTitle className="text-base">{animation.name}</CardTitle>
                    <CardDescription className="text-xs">
                      {animation.purpose}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="bg-muted/30 rounded-lg p-4 min-h-[140px] flex items-center justify-center">
                      <AsciiLoader 
                        animationKey={key as keyof typeof asciiAnimations}
                        className="text-sm"
                      />
                    </div>
                    <div className="mt-2 flex flex-wrap gap-2 text-xs text-muted-foreground">
                      <span className="px-2 py-0.5 bg-primary/10 rounded">
                        {animation.tone}
                      </span>
                      <span className="px-2 py-0.5 bg-secondary/50 rounded">
                        {animation.placement}
                      </span>
                      {animation.loop && (
                        <span className="px-2 py-0.5 bg-accent/10 rounded">
                          looping
                        </span>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="hero" className="space-y-4 mt-4">
            <Card>
              <CardHeader>
                <CardTitle>Hero Loading Scenes</CardTitle>
                <CardDescription>
                  Signature STIX MAGIC loading moments with branded copy and rotating elements
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex gap-2">
                  {Object.keys(heroLoadingScenes).map((key) => (
                    <Button
                      key={key}
                      variant={selectedHero === key ? 'default' : 'outline'}
                      size="sm"
                      onClick={() => setSelectedHero(key as keyof typeof heroLoadingScenes)}
                      className="text-xs"
                    >
                      {heroLoadingScenes[key as keyof typeof heroLoadingScenes].name}
                    </Button>
                  ))}
                </div>
                <div className="bg-gradient-to-br from-primary/5 to-accent/5 rounded-lg p-8 min-h-[200px] flex items-center justify-center">
                  <HeroLoader 
                    sceneKey={selectedHero}
                    className="text-base text-primary"
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="utility" className="space-y-4 mt-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Inline Loaders</CardTitle>
                  <CardDescription className="text-xs">
                    Lightweight inline spinners for text contexts
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center gap-2 text-sm">
                    Loading <InlineLoader type="dots" />
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    Processing <InlineLoader type="circles" className="text-primary" />
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    Transmuting <InlineLoader type="sparkles" className="text-accent" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Progress Bar ASCII</CardTitle>
                  <CardDescription className="text-xs">
                    Text-based progress indicator with real sync
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <ProgressBarAscii progress={progress} />
                  <Button 
                    size="sm" 
                    onClick={startProgressDemo}
                    className="w-full gap-2"
                  >
                    <Play weight="fill" />
                    Start Demo
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Cloud Status</CardTitle>
                  <CardDescription className="text-xs">
                    Real-time edge connection indicators
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Idle</span>
                    <CloudStatus status="idle" />
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Connecting</span>
                    <CloudStatus status="connecting" />
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Connected</span>
                    <CloudStatus status="connected" />
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Error</span>
                    <CloudStatus status="error" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Progress Sync</CardTitle>
                  <CardDescription className="text-xs">
                    Animations synced to real progress values
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-xs text-muted-foreground">
                      Progress: {Math.round(progress)}%
                    </label>
                    <Slider 
                      value={[progress]} 
                      onValueChange={(v) => setProgress(v[0])}
                      max={100}
                      step={1}
                    />
                  </div>
                  <div className="bg-muted/30 rounded-lg p-4 min-h-[120px] flex items-center justify-center">
                    <AsciiLoader 
                      animationKey="uploadProgress"
                      syncWithProgress={progress / 100}
                      className="text-sm text-primary"
                    />
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="adaptive" className="space-y-4 mt-4">
            <Card>
              <CardHeader>
                <CardTitle>Adaptive Loaders</CardTitle>
                <CardDescription>
                  Context-aware loaders that adapt to operation type and visual style
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {(['upload', 'mask', 'motion', 'render', 'pack', 'deploy'] as const).map((op) => (
                    <div key={op} className="space-y-2">
                      <div className="text-xs font-semibold uppercase text-muted-foreground">
                        {op}
                      </div>
                      <div className="bg-muted/30 rounded-lg p-3 min-h-[100px] flex items-center justify-center">
                        <AdaptiveLoader 
                          operation={op}
                          style="magic"
                          className="text-sm"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-base">Style Variants</CardTitle>
                <CardDescription>
                  Same operation, different visual styles to match sticker vibes
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {(['neon', 'cute', 'techno', 'magic'] as const).map((style) => (
                    <div key={style} className="space-y-2">
                      <div className="text-xs font-semibold uppercase text-muted-foreground">
                        {style}
                      </div>
                      <div className="bg-muted/30 rounded-lg p-3 min-h-[100px] flex items-center justify-center">
                        <AdaptiveLoader 
                          operation="motion"
                          style={style}
                          className="text-sm"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <div className="mt-6 p-4 bg-muted/30 rounded-lg border border-border">
          <h4 className="text-sm font-semibold mb-2">Implementation Notes</h4>
          <ul className="text-xs text-muted-foreground space-y-1">
            <li>✦ All animations use requestAnimationFrame for smooth 60fps performance</li>
            <li>✦ Lightweight CSS-based rendering - no heavy assets or libraries</li>
            <li>✦ Animations can sync with real progress data (not fake loaders)</li>
            <li>✦ Gracefully stoppable and non-blocking</li>
            <li>✦ Adaptive intensity based on operation speed and sticker style</li>
            <li>✦ Cloud-native design language for Cloudflare edge deployment</li>
          </ul>
        </div>
      </DialogContent>
    </Dialog>
  )
}
