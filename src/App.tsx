import { useState, useMemo } from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Toaster } from '@/components/ui/sonner'
import { 
  stickerStyles,
  vibeInfo,
  type VibeCategory,
  type StickerStyle 
} from '@/lib/stickerStyles'
import { StickerStyleCard } from '@/components/StickerStyleCard'
import { StyleDetailPanel } from '@/components/StyleDetailPanel'
import { AnimationPlayground } from '@/components/AnimationPlayground'
import { Sparkle, Funnel, X, DownloadSimple, Sliders, MagicWand } from '@phosphor-icons/react'
import { toast } from 'sonner'

function App() {
  const [selectedVibe, setSelectedVibe] = useState<VibeCategory | 'all'>('all')
  const [selectedIntensity, setSelectedIntensity] = useState<string[]>([])
  const [selectedStyle, setSelectedStyle] = useState<StickerStyle | null>(null)
  const [detailPanelOpen, setDetailPanelOpen] = useState(false)
  const [playgroundOpen, setPlaygroundOpen] = useState(false)

  const filteredStyles = useMemo(() => {
    let filtered = stickerStyles

    if (selectedVibe !== 'all') {
      filtered = filtered.filter(s => s.vibe === selectedVibe)
    }

    if (selectedIntensity.length > 0) {
      filtered = filtered.filter(s => 
        selectedIntensity.includes(s.intensity)
      )
    }

    return filtered
  }, [selectedVibe, selectedIntensity])

  const handleIntensityToggle = (intensity: string) => {
    setSelectedIntensity(prev => 
      prev.includes(intensity) 
        ? prev.filter(i => i !== intensity)
        : [...prev, intensity]
    )
  }

  const handleClearFilters = () => {
    setSelectedVibe('all')
    setSelectedIntensity([])
  }

  const handleStyleClick = (style: StickerStyle) => {
    setSelectedStyle(style)
    setDetailPanelOpen(true)
  }

  const handleOpenPlayground = () => {
    setPlaygroundOpen(true)
  }

  const handleExportAll = () => {
    try {
      const stylesToExport = filteredStyles.length > 0 ? filteredStyles : stickerStyles
      const content = JSON.stringify(stylesToExport, null, 2)
      const count = stylesToExport.length
      
      const blob = new Blob([content], { type: 'application/json' })
      const url = URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = 'stix-magic-styles-library.json'
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
      URL.revokeObjectURL(url)
      
      toast.success(`Exported ${count} sticker styles`, {
        description: 'Complete styles library downloaded as JSON'
      })
    } catch (error) {
      toast.error('Export failed', {
        description: 'There was an error exporting the styles'
      })
    }
  }

  const hasActiveFilters = selectedVibe !== 'all' || selectedIntensity.length > 0

  return (
    <div className="min-h-screen mesh-background">
      <Toaster position="top-right" richColors />
      <div className="container mx-auto px-6 md:px-8 lg:px-12 py-8 md:py-12">
        <header className="mb-12 space-y-4">
          <div className="flex items-center gap-4">
            <MagicWand size={48} weight="duotone" className="text-accent" />
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold gradient-text tracking-tight">
              STIX MAGIC Studio
            </h1>
          </div>
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <p className="text-lg text-muted-foreground max-w-3xl">
              Pick a vibe, apply to your image, get a full animated sticker pack. 
              Explore {stickerStyles.length} conversion-ready styles.
            </p>
            <div className="flex gap-2">
              <Button
                onClick={() => setPlaygroundOpen(true)}
                variant="default"
                className="gap-2 bg-gradient-to-r from-primary to-accent hover:opacity-90"
              >
                <Sliders weight="bold" />
                Playground
              </Button>
              <Button
                onClick={handleExportAll}
                variant="outline"
                className="gap-2 border-accent/40 hover:border-accent hover:bg-accent/10"
              >
                <DownloadSimple weight="bold" />
                Export All
              </Button>
            </div>
          </div>
        </header>

        <div className="space-y-6">
          <div className="flex flex-col md:flex-row gap-4 md:items-center md:justify-between">
            <div className="flex items-center gap-2 flex-wrap">
              <Funnel className="text-muted-foreground" weight="bold" />
              <span className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
                Intensity:
              </span>
              {['subtle', 'medium', 'intense'].map(intensity => (
                <Button
                  key={intensity}
                  variant={selectedIntensity.includes(intensity) ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => handleIntensityToggle(intensity)}
                  className="text-xs capitalize"
                >
                  {intensity}
                </Button>
              ))}
            </div>

            {hasActiveFilters && (
              <Button
                variant="ghost"
                size="sm"
                onClick={handleClearFilters}
                className="text-accent hover:text-accent/80"
              >
                <X weight="bold" className="mr-2" />
                Clear Filters
              </Button>
            )}
          </div>

          <Tabs value={selectedVibe} onValueChange={(val) => setSelectedVibe(val as VibeCategory | 'all')}>
            <TabsList className="w-full flex-wrap h-auto p-1 bg-card/50 backdrop-blur">
              <TabsTrigger value="all" className="flex items-center gap-2">
                <Sparkle weight="fill" />
                All Styles
                <Badge variant="secondary" className="ml-1 text-xs">
                  {selectedVibe === 'all' && selectedIntensity.length === 0 
                    ? stickerStyles.length 
                    : filteredStyles.length}
                </Badge>
              </TabsTrigger>
              {(Object.keys(vibeInfo) as VibeCategory[]).map(vibe => {
                const count = selectedVibe === vibe && selectedIntensity.length > 0
                  ? filteredStyles.length
                  : stickerStyles.filter(s => s.vibe === vibe).length
                
                return (
                  <TabsTrigger key={vibe} value={vibe} className="flex items-center gap-2">
                    {vibeInfo[vibe].name}
                    <Badge variant="secondary" className="ml-1 text-xs">
                      {count}
                    </Badge>
                  </TabsTrigger>
                )
              })}
            </TabsList>

            <TabsContent value={selectedVibe} className="mt-8">
              {filteredStyles.length === 0 ? (
                <div className="text-center py-20">
                  <div className="text-6xl mb-4 opacity-20">✨</div>
                  <h3 className="text-2xl font-semibold mb-2">No styles found</h3>
                  <p className="text-muted-foreground mb-6">
                    Try adjusting your filters to see more results
                  </p>
                  <Button onClick={handleClearFilters} variant="outline">
                    Clear All Filters
                  </Button>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
                  {filteredStyles.map((style, index) => (
                    <StickerStyleCard
                      key={style.id}
                      style={style}
                      onClick={() => handleStyleClick(style)}
                      index={index}
                    />
                  ))}
                </div>
              )}
            </TabsContent>
          </Tabs>
        </div>
      </div>

      <StyleDetailPanel
        style={selectedStyle}
        open={detailPanelOpen}
        onOpenChange={setDetailPanelOpen}
        onOpenPlayground={handleOpenPlayground}
      />

      <AnimationPlayground
        open={playgroundOpen}
        onOpenChange={setPlaygroundOpen}
        initialPreset={null}
      />
    </div>
  )
}

export default App
