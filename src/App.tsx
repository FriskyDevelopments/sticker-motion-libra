import { useState, useMemo } from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Toaster } from '@/components/ui/sonner'
import { 
  stickerStyles,
  vibeInfo,
  maskPresets,
  type VibeCategory,
  type StickerStyle,
  type MaskType
} from '@/lib/stickerStyles'
import { StickerStyleCard } from '@/components/StickerStyleCard'
import { StyleDetailPanel } from '@/components/StyleDetailPanel'
import { AnimationPlayground } from '@/components/AnimationPlayground'
import { Sparkle, Funnel, X, DownloadSimple, Sliders, MagicWand, CaretLeft, CaretRight, Scissors } from '@phosphor-icons/react'
import { toast } from 'sonner'

const ITEMS_PER_PAGE = 9

function App() {
  const [selectedVibe, setSelectedVibe] = useState<VibeCategory | 'all'>('all')
  const [selectedIntensity, setSelectedIntensity] = useState<string[]>([])
  const [selectedMasks, setSelectedMasks] = useState<MaskType[]>([])
  const [currentPage, setCurrentPage] = useState(1)
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

    if (selectedMasks.length > 0) {
      filtered = filtered.filter(s => 
        selectedMasks.includes(s.mask.type)
      )
    }

    return filtered
  }, [selectedVibe, selectedIntensity, selectedMasks])

  const totalPages = Math.ceil(filteredStyles.length / ITEMS_PER_PAGE)
  const paginatedStyles = useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE
    const endIndex = startIndex + ITEMS_PER_PAGE
    return filteredStyles.slice(startIndex, endIndex)
  }, [filteredStyles, currentPage])

  const handleIntensityToggle = (intensity: string) => {
    setSelectedIntensity(prev => 
      prev.includes(intensity) 
        ? prev.filter(i => i !== intensity)
        : [...prev, intensity]
    )
    setCurrentPage(1)
  }

  const handleMaskToggle = (mask: MaskType) => {
    setSelectedMasks(prev => 
      prev.includes(mask) 
        ? prev.filter(m => m !== mask)
        : [...prev, mask]
    )
    setCurrentPage(1)
  }

  const handleClearFilters = () => {
    setSelectedVibe('all')
    setSelectedIntensity([])
    setSelectedMasks([])
    setCurrentPage(1)
  }

  const handleVibeChange = (val: string) => {
    setSelectedVibe(val as VibeCategory | 'all')
    setCurrentPage(1)
  }

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
    window.scrollTo({ top: 0, behavior: 'smooth' })
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

  const hasActiveFilters = selectedVibe !== 'all' || selectedIntensity.length > 0 || selectedMasks.length > 0

  const availableMasks = Array.from(new Set(stickerStyles.map(s => s.mask.type)))

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
          <div className="flex flex-col gap-4">
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

            <div className="flex items-center gap-2 flex-wrap">
              <Scissors className="text-muted-foreground" weight="bold" />
              <span className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
                Mask:
              </span>
              {availableMasks.slice(0, 6).map(maskType => (
                <Button
                  key={maskType}
                  variant={selectedMasks.includes(maskType) ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => handleMaskToggle(maskType)}
                  className="text-xs capitalize"
                >
                  {maskPresets[maskType].name}
                </Button>
              ))}
            </div>

            {hasActiveFilters && (
              <div className="flex justify-end">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleClearFilters}
                  className="text-accent hover:text-accent/80"
                >
                  <X weight="bold" className="mr-2" />
                  Clear Filters
                </Button>
              </div>
            )}
          </div>

          <Tabs value={selectedVibe} onValueChange={handleVibeChange}>
            <TabsList className="w-full flex-wrap h-auto p-1 bg-card/50 backdrop-blur">
              <TabsTrigger value="all" className="flex items-center gap-2">
                <Sparkle weight="fill" />
                All Styles
                <Badge variant="secondary" className="ml-1 text-xs">
                  {selectedVibe === 'all' && selectedIntensity.length === 0 && selectedMasks.length === 0
                    ? stickerStyles.length 
                    : filteredStyles.length}
                </Badge>
              </TabsTrigger>
              {(Object.keys(vibeInfo) as VibeCategory[]).map(vibe => {
                let count = stickerStyles.filter(s => s.vibe === vibe).length
                if (selectedVibe === vibe && (selectedIntensity.length > 0 || selectedMasks.length > 0)) {
                  count = filteredStyles.length
                }
                
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
                <>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
                    {paginatedStyles.map((style, index) => (
                      <StickerStyleCard
                        key={style.id}
                        style={style}
                        onClick={() => handleStyleClick(style)}
                        index={index}
                      />
                    ))}
                  </div>

                  {totalPages > 1 && (
                    <div className="flex items-center justify-center gap-2 mt-8">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handlePageChange(currentPage - 1)}
                        disabled={currentPage === 1}
                        className="gap-1"
                      >
                        <CaretLeft weight="bold" />
                        Previous
                      </Button>
                      
                      <div className="flex items-center gap-1">
                        {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                          <Button
                            key={page}
                            variant={currentPage === page ? 'default' : 'outline'}
                            size="sm"
                            onClick={() => handlePageChange(page)}
                            className="min-w-[2.5rem]"
                          >
                            {page}
                          </Button>
                        ))}
                      </div>

                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handlePageChange(currentPage + 1)}
                        disabled={currentPage === totalPages}
                        className="gap-1"
                      >
                        Next
                        <CaretRight weight="bold" />
                      </Button>
                    </div>
                  )}
                </>
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
