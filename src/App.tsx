import { useState } from 'react'
import { Toaster } from '@/components/ui/sonner'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { featuredStyles } from '@/lib/featuredStyles'
import { SimpleStyleCard } from '@/components/SimpleStyleCard'
import { SimpleDetailPanel } from '@/components/SimpleDetailPanel'
import type { StickerStyle } from '@/lib/stickerStyles'
import { Sparkle, ImageSquare } from '@phosphor-icons/react'

function App() {
  const [selectedStyle, setSelectedStyle] = useState<StickerStyle | null>(null)
  const [detailPanelOpen, setDetailPanelOpen] = useState(false)

  const handleStyleClick = (style: StickerStyle) => {
    setSelectedStyle(style)
    setDetailPanelOpen(true)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
      <Toaster position="top-right" richColors />
      
      <div className="container mx-auto px-6 md:px-8 lg:px-12 py-12 md:py-16">
        <header className="mb-16 text-center space-y-6">
          <div className="inline-flex items-center gap-3 mb-4">
            <Sparkle size={56} weight="duotone" className="text-accent" />
          </div>
          
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold gradient-text tracking-tight">
            STIX MAGIC
          </h1>
          
          <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Pick a style, bring it to life
          </p>
          
          <div className="flex items-center justify-center gap-3 flex-wrap">
            <Badge variant="secondary" className="px-4 py-2 text-sm">
              {featuredStyles.length} Premium Styles
            </Badge>
            <Badge variant="secondary" className="px-4 py-2 text-sm">
              Magic Enhancement
            </Badge>
            <Badge variant="secondary" className="px-4 py-2 text-sm">
              Instant Preview
            </Badge>
          </div>
        </header>

        <div className="space-y-10">
          <div className="text-center space-y-3">
            <h2 className="text-2xl font-bold flex items-center justify-center gap-3">
              <ImageSquare size={32} weight="duotone" className="text-primary" />
              Pick Your Style
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Each style combines motion, effects, and visual treatment. Click to preview and customize.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {featuredStyles.map((style, index) => (
              <SimpleStyleCard
                key={style.id}
                style={style}
                onClick={() => handleStyleClick(style)}
                index={index}
              />
            ))}
          </div>
        </div>

        <div className="mt-20 text-center">
          <div className="inline-flex flex-col items-center gap-4 p-8 rounded-2xl bg-gradient-to-br from-muted/30 to-muted/10 border border-border/50">
            <Sparkle size={40} weight="duotone" className="text-accent" />
            <div>
              <h3 className="text-lg font-semibold mb-1">Ready to create?</h3>
              <p className="text-sm text-muted-foreground">
                Pick any style above to get started
              </p>
            </div>
          </div>
        </div>
      </div>

      <SimpleDetailPanel
        style={selectedStyle}
        open={detailPanelOpen}
        onOpenChange={setDetailPanelOpen}
      />
    </div>
  )
}

export default App
