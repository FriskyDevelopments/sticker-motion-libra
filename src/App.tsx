import { Toaster } from '@/components/ui/sonner'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs'
import { Sparkle, Stack, Cube, Circle, Resize, Lightning, HourglassMedium } from '@phosphor-icons/react'
import { baseStyles, styleFamilyInfo, type StyleFamily } from '@/lib/styleLibrary'
import { overlays, overlayFamilyInfo } from '@/lib/overlaySystem'
import { loaders, loaderFamilyInfo } from '@/lib/loaderSystem'
import { sizeProfiles } from '@/lib/sizeProfiles'
import { motionPresets } from '@/lib/motionPresets'
import { exploreComboSpace } from '@/lib/comboEngine'
import { LoaderShowcase } from '@/components/LoaderShowcase'
import { useMemo } from 'react'

function App() {
  const comboStats = useMemo(() => 
    exploreComboSpace(baseStyles, overlays, motionPresets),
    []
  )

  const styleFamilies = Object.keys(styleFamilyInfo) as StyleFamily[]

  return (
    <div className="min-h-screen mesh-background">
      <Toaster position="top-right" richColors />
      
      <div className="container mx-auto px-6 md:px-8 lg:px-12 py-12 md:py-16">
        <header className="mb-12 text-center space-y-8">
          <div className="inline-flex items-center gap-3 mb-6">
            <Sparkle size={72} weight="duotone" className="text-accent animate-pulse" />
          </div>
          
          <h1 className="text-6xl md:text-7xl lg:text-8xl font-bold gradient-text tracking-tight mb-6">
            STIX MAGIC
          </h1>
          
          <p className="text-2xl md:text-3xl text-foreground/80 max-w-3xl mx-auto leading-relaxed font-medium">
            A modular magic system
          </p>
          
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
            From a simple preset gallery to a scalable library producing <span className="text-accent font-bold">{comboStats.validCombos.toLocaleString()}+</span> polished style outcomes through intelligent combination
          </p>
        </header>

        <Tabs defaultValue="overview" className="space-y-8">
          <TabsList className="grid w-full max-w-2xl mx-auto grid-cols-2 h-auto p-1">
            <TabsTrigger value="overview" className="flex items-center gap-2 py-3">
              <Stack size={20} weight="duotone" />
              System Overview
            </TabsTrigger>
            <TabsTrigger value="loaders" className="flex items-center gap-2 py-3">
              <HourglassMedium size={20} weight="duotone" />
              Loader Showcase
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-16">

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          <Card className="gradient-border p-8 space-y-6">
            <div className="flex items-center gap-3">
              <Stack size={32} weight="duotone" className="text-primary" />
              <h2 className="text-3xl font-bold">The System</h2>
            </div>
            
            <div className="space-y-4">
              <div className="flex items-start gap-4">
                <Badge variant="secondary" className="mt-1">1</Badge>
                <div>
                  <h3 className="font-bold text-lg mb-1">Style Library</h3>
                  <p className="text-muted-foreground text-sm">
                    <span className="text-accent font-semibold">{baseStyles.length} base styles</span> organized into {styleFamilies.length} families
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <Badge variant="secondary" className="mt-1">2</Badge>
                <div>
                  <h3 className="font-bold text-lg mb-1">Motion Behaviors</h3>
                  <p className="text-muted-foreground text-sm">
                    <span className="text-accent font-semibold">{motionPresets.length} motion presets</span> from breathing glows to particle bursts
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <Badge variant="secondary" className="mt-1">3</Badge>
                <div>
                  <h3 className="font-bold text-lg mb-1">Overlay System</h3>
                  <p className="text-muted-foreground text-sm">
                    <span className="text-accent font-semibold">{overlays.length} overlay effects</span> adding atmospheric layers
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <Badge variant="secondary" className="mt-1">4</Badge>
                <div>
                  <h3 className="font-bold text-lg mb-1">Loader System</h3>
                  <p className="text-muted-foreground text-sm">
                    <span className="text-accent font-semibold">{loaders.length} branded loaders</span> for every processing stage
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <Badge variant="secondary" className="mt-1">5</Badge>
                <div>
                  <h3 className="font-bold text-lg mb-1">Size Profiles</h3>
                  <p className="text-muted-foreground text-sm">
                    <span className="text-accent font-semibold">{Object.keys(sizeProfiles).length} output formats</span> for different platforms
                  </p>
                </div>
              </div>
            </div>
          </Card>

          <Card className="gradient-border p-8 space-y-6 bg-gradient-to-br from-card to-muted/20">
            <div className="flex items-center gap-3">
              <Lightning size={32} weight="duotone" className="text-accent" />
              <h2 className="text-3xl font-bold">The Power</h2>
            </div>
            
            <div className="space-y-6">
              <div>
                <div className="text-5xl font-bold gradient-text mb-2">
                  {comboStats.validCombos.toLocaleString()}
                </div>
                <p className="text-muted-foreground">
                  Valid style combinations generated from {baseStyles.length + motionPresets.length + overlays.length} components
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="bg-background/50 backdrop-blur-sm rounded-lg p-4 border border-border/50">
                  <div className="text-2xl font-bold text-primary mb-1">{baseStyles.length}</div>
                  <div className="text-sm text-muted-foreground">Base Styles</div>
                </div>
                <div className="bg-background/50 backdrop-blur-sm rounded-lg p-4 border border-border/50">
                  <div className="text-2xl font-bold text-primary mb-1">{motionPresets.length}</div>
                  <div className="text-sm text-muted-foreground">Motions</div>
                </div>
                <div className="bg-background/50 backdrop-blur-sm rounded-lg p-4 border border-border/50">
                  <div className="text-2xl font-bold text-primary mb-1">{overlays.length}</div>
                  <div className="text-sm text-muted-foreground">Overlays</div>
                </div>
                <div className="bg-background/50 backdrop-blur-sm rounded-lg p-4 border border-border/50">
                  <div className="text-2xl font-bold text-primary mb-1">{loaders.length}</div>
                  <div className="text-sm text-muted-foreground">Loaders</div>
                </div>
              </div>

              <div className="bg-accent/10 border border-accent/20 rounded-lg p-4">
                <p className="text-sm text-accent-foreground">
                  <span className="font-semibold">Scalable by design:</span> Not 200 random presets, but a system that generates 200+ polished outcomes through intelligent rules.
                </p>
              </div>
            </div>
          </Card>
        </div>

        <div className="space-y-12">
          <div className="text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 flex items-center justify-center gap-3">
              <Cube size={36} weight="duotone" className="text-primary" />
              Style Families
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto mb-8">
              {styleFamilies.length} distinct families, each with unique aesthetics and moods
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {styleFamilies.map((family) => {
              const info = styleFamilyInfo[family]
              const count = baseStyles.filter(s => s.family === family).length
              return (
                <Card 
                  key={family}
                  className="group p-6 text-center hover:scale-105 transition-all duration-300 cursor-pointer border-2 hover:border-primary/40"
                  style={{
                    borderColor: `color-mix(in oklch, ${info.color}, transparent 70%)`
                  }}
                >
                  <div 
                    className="w-12 h-12 rounded-full mx-auto mb-3 flex items-center justify-center text-2xl"
                    style={{
                      background: `${info.color}20`,
                      color: info.color
                    }}
                  >
                    ✦
                  </div>
                  <h3 className="font-bold mb-1">{info.name}</h3>
                  <p className="text-xs text-muted-foreground mb-2">{info.description}</p>
                  <Badge variant="outline" className="text-xs">
                    {count} styles
                  </Badge>
                </Card>
              )
            })}
          </div>
        </div>

        <div className="mt-20 space-y-8">
          <div className="text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 flex items-center justify-center gap-3">
              <Circle size={36} weight="duotone" className="text-primary" />
              Overlay Effects
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto mb-8">
              {overlays.length} atmospheric overlays organized into {Object.keys(overlayFamilyInfo).length} families
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {Object.entries(overlayFamilyInfo).map(([familyId, info]) => {
              const count = overlays.filter(o => o.family === familyId).length
              return (
                <Card key={familyId} className="p-6 hover:shadow-xl transition-all duration-300">
                  <div 
                    className="w-10 h-10 rounded-lg mb-3 flex items-center justify-center font-bold"
                    style={{
                      background: `${info.color}30`,
                      color: info.color
                    }}
                  >
                    {count}
                  </div>
                  <h3 className="font-bold mb-1">{info.name}</h3>
                  <p className="text-sm text-muted-foreground">{info.description}</p>
                </Card>
              )
            })}
          </div>
        </div>

        <div className="mt-20 space-y-8">
          <div className="text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 flex items-center justify-center gap-3">
              <Resize size={36} weight="duotone" className="text-primary" />
              Output Profiles
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto mb-8">
              {Object.keys(sizeProfiles).length} size and format profiles for different use cases
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Object.values(sizeProfiles).map((profile) => (
              <Card key={profile.id} className="p-6 hover:scale-[1.02] transition-all duration-300">
                <div className="flex items-start justify-between mb-3">
                  <h3 className="font-bold text-lg">{profile.name}</h3>
                  <Badge variant="secondary">{profile.aspectRatio}</Badge>
                </div>
                <p className="text-sm text-muted-foreground mb-4">{profile.description}</p>
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-xs">
                    <Badge variant="outline" className="font-mono">
                      {profile.dimensions.width}×{profile.dimensions.height}
                    </Badge>
                    <Badge variant="outline">{profile.exportFormat.toUpperCase()}</Badge>
                    <Badge variant="outline">{profile.qualityTier}</Badge>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>

        <div className="mt-24 text-center">
          <Card className="inline-flex flex-col items-center gap-6 p-12 bg-gradient-to-br from-primary/10 to-accent/10 border-2 border-primary/20">
            <Sparkle size={48} weight="duotone" className="text-primary" />
            <div className="max-w-2xl">
              <h3 className="text-2xl font-bold mb-3">Modular Magic at Scale</h3>
              <p className="text-muted-foreground mb-6">
                This isn't chaos—it's a carefully designed system where every combination feels intentional, branded, and premium.
              </p>
              <div className="flex flex-wrap items-center justify-center gap-3">
                <Button size="lg" className="bg-primary hover:bg-primary/90">
                  Explore the Library
                </Button>
                <Button size="lg" variant="outline">
                  See Combinations
                </Button>
              </div>
            </div>
          </Card>
        </div>
          </TabsContent>

          <TabsContent value="loaders">
            <LoaderShowcase />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

export default App
