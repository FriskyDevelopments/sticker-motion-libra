import { stickerStyles, vibeInfo, type VibeCategory } from '@/lib/stickerStyles'
import { StickerStyleCard } from '@/components/StickerStyleCard'
import { StyleDetailPanel } from '@/components/StyleDetailPanel'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs'
import { X } from '@phosphor-icons/react'
import { useState, useMemo } from 'react'

export function StyleGallery() {
  const [selectedStyleId, setSelectedStyleId] = useState<string | null>(null)
  const [selectedVibe, setSelectedVibe] = useState<VibeCategory | 'all'>('all')

  const selectedStyle = useMemo(
    () => stickerStyles.find(s => s.id === selectedStyleId) || null,
    [selectedStyleId]
  )

  const filteredStyles = useMemo(() => {
    if (selectedVibe === 'all') return stickerStyles
    return stickerStyles.filter(s => s.vibe === selectedVibe)
  }, [selectedVibe])

  const vibeCategories = Object.keys(vibeInfo) as VibeCategory[]

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl md:text-4xl font-bold mb-6 text-center">
          Pick a style ✦
        </h2>
        
        <Tabs value={selectedVibe} onValueChange={(v) => setSelectedVibe(v as VibeCategory | 'all')} className="space-y-6">
          <TabsList className="w-full grid grid-cols-2 md:grid-cols-5 h-auto p-1">
            <TabsTrigger value="all" className="py-2.5">
              All Styles
              <Badge variant="secondary" className="ml-2 text-xs">
                {stickerStyles.length}
              </Badge>
            </TabsTrigger>
            {vibeCategories.map((vibe) => {
              const info = vibeInfo[vibe]
              const count = stickerStyles.filter(s => s.vibe === vibe).length
              return (
                <TabsTrigger key={vibe} value={vibe} className="py-2.5 text-sm">
                  {info.name}
                  <Badge variant="secondary" className="ml-2 text-xs">
                    {count}
                  </Badge>
                </TabsTrigger>
              )
            })}
          </TabsList>

          <TabsContent value={selectedVibe} className="mt-6">
            {filteredStyles.length === 0 ? (
              <div className="text-center py-16">
                <p className="text-muted-foreground mb-4">No styles found</p>
                <Button variant="outline" onClick={() => setSelectedVibe('all')}>
                  <X size={16} className="mr-2" />
                  Clear filter
                </Button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredStyles.map((style) => (
                  <StickerStyleCard
                    key={style.id}
                    style={style}
                    onClick={() => setSelectedStyleId(style.id)}
                  />
                ))}
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>

      {selectedStyle && (
        <StyleDetailPanel
          style={selectedStyle}
          open={!!selectedStyleId}
          onOpenChange={(open) => {
            if (!open) setSelectedStyleId(null)
          }}
        />
      )}
    </div>
  )
}
