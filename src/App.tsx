import { useState, useMemo } from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Toaster } from '@/components/ui/sonner'
import { 
  motionPresets, 
  categoryInfo, 
  styleInfo, 
  type MotionCategory, 
  type MotionPreset,
  type StickerStyle 
} from '@/lib/motionPresets'
import { MotionPresetCard } from '@/components/MotionPresetCard'
import { PresetDetailPanel } from '@/components/PresetDetailPanel'
import { ArrowsClockwise, Funnel, X, DownloadSimple } from '@phosphor-icons/react'
import { downloadFile, exportPresetAsJSON } from '@/lib/exportUtils'
import { toast } from 'sonner'

function App() {
  const [selectedCategory, setSelectedCategory] = useState<MotionCategory | 'all'>('all')
  const [selectedStyles, setSelectedStyles] = useState<StickerStyle[]>([])
  const [selectedPreset, setSelectedPreset] = useState<MotionPreset | null>(null)
  const [detailPanelOpen, setDetailPanelOpen] = useState(false)

  const filteredPresets = useMemo(() => {
    let filtered = motionPresets

    if (selectedCategory !== 'all') {
      filtered = filtered.filter(p => p.category === selectedCategory)
    }

    if (selectedStyles.length > 0) {
      filtered = filtered.filter(p => 
        selectedStyles.some(style => p.compatibleStyles.includes(style))
      )
    }

    return filtered
  }, [selectedCategory, selectedStyles])

  const handleStyleToggle = (style: StickerStyle) => {
    setSelectedStyles(prev => 
      prev.includes(style) 
        ? prev.filter(s => s !== style)
        : [...prev, style]
    )
  }

  const handleClearFilters = () => {
    setSelectedCategory('all')
    setSelectedStyles([])
  }

  const handlePresetClick = (preset: MotionPreset) => {
    setSelectedPreset(preset)
    setDetailPanelOpen(true)
  }

  const handleExportAll = () => {
    try {
      const presetsToExport = filteredPresets.length > 0 ? filteredPresets : motionPresets
      const content = JSON.stringify(presetsToExport, null, 2)
      const count = presetsToExport.length
      downloadFile(content, 'motion-presets-library.json', 'application/json')
      toast.success(`Exported ${count} presets`, {
        description: 'All presets have been downloaded as JSON'
      })
    } catch (error) {
      toast.error('Export failed', {
        description: 'There was an error exporting the presets'
      })
    }
  }

  const hasActiveFilters = selectedCategory !== 'all' || selectedStyles.length > 0

  return (
    <div className="min-h-screen mesh-background">
      <Toaster position="top-right" richColors />
      <div className="container mx-auto px-6 md:px-8 lg:px-12 py-8 md:py-12">
        <header className="mb-12 space-y-4">
          <div className="flex items-center gap-4">
            <ArrowsClockwise size={48} weight="duotone" className="text-accent" />
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold gradient-text tracking-tight">
              Sticker Motion Library
            </h1>
          </div>
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <p className="text-lg text-muted-foreground max-w-3xl">
              A comprehensive collection of reusable motion presets for creative sticker artwork. 
              Explore {motionPresets.length} animations across 6 categories.
            </p>
            <Button
              onClick={handleExportAll}
              variant="outline"
              className="gap-2 border-accent/40 hover:border-accent hover:bg-accent/10"
            >
              <DownloadSimple weight="bold" />
              Export All
            </Button>
          </div>
        </header>

        <div className="space-y-6">
          <div className="flex flex-col md:flex-row gap-4 md:items-center md:justify-between">
            <div className="flex items-center gap-2 flex-wrap">
              <Funnel className="text-muted-foreground" weight="bold" />
              <span className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
                Filter by Style:
              </span>
              {(Object.keys(styleInfo) as StickerStyle[]).map(style => (
                <Button
                  key={style}
                  variant={selectedStyles.includes(style) ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => handleStyleToggle(style)}
                  className="text-xs"
                  style={
                    selectedStyles.includes(style)
                      ? {
                          backgroundColor: styleInfo[style].color,
                          borderColor: styleInfo[style].color,
                        }
                      : { borderColor: styleInfo[style].color + '60' }
                  }
                >
                  {styleInfo[style].label}
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

          <Tabs value={selectedCategory} onValueChange={(val) => setSelectedCategory(val as MotionCategory | 'all')}>
            <TabsList className="w-full flex-wrap h-auto p-1 bg-card/50 backdrop-blur">
              <TabsTrigger value="all" className="flex items-center gap-2">
                All Presets
                <Badge variant="secondary" className="ml-1 text-xs">
                  {selectedCategory === 'all' && selectedStyles.length === 0 
                    ? motionPresets.length 
                    : filteredPresets.length}
                </Badge>
              </TabsTrigger>
              {(Object.keys(categoryInfo) as MotionCategory[]).map(category => {
                const count = selectedCategory === category && selectedStyles.length > 0
                  ? filteredPresets.length
                  : motionPresets.filter(p => p.category === category).length
                
                return (
                  <TabsTrigger key={category} value={category} className="flex items-center gap-2">
                    {categoryInfo[category].name}
                    <Badge variant="secondary" className="ml-1 text-xs">
                      {count}
                    </Badge>
                  </TabsTrigger>
                )
              })}
            </TabsList>

            <TabsContent value={selectedCategory} className="mt-8">
              {filteredPresets.length === 0 ? (
                <div className="text-center py-20">
                  <div className="text-6xl mb-4 opacity-20">✨</div>
                  <h3 className="text-2xl font-semibold mb-2">No presets found</h3>
                  <p className="text-muted-foreground mb-6">
                    Try adjusting your filters to see more results
                  </p>
                  <Button onClick={handleClearFilters} variant="outline">
                    Clear All Filters
                  </Button>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
                  {filteredPresets.map((preset, index) => (
                    <MotionPresetCard
                      key={preset.id}
                      preset={preset}
                      onClick={() => handlePresetClick(preset)}
                      index={index}
                    />
                  ))}
                </div>
              )}
            </TabsContent>
          </Tabs>
        </div>
      </div>

      <PresetDetailPanel
        preset={selectedPreset}
        open={detailPanelOpen}
        onOpenChange={setDetailPanelOpen}
      />
    </div>
  )
}

export default App
