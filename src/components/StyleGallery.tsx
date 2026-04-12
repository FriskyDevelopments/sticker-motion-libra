import { featuredStyles } from '@/lib/featuredStyles'
import { vibeInfo, type VibeCategory, type StickerStyle } from '@/lib/stickerStyles'
import { StickerStyleCard } from '@/components/StickerStyleCard'
import { StyleDetailPanel } from '@/components/StyleDetailPanel'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs'
import { X, Sparkle, Heart } from '@phosphor-icons/react'
import { useState, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useFavorites } from '@/hooks/use-favorites'
import { toast } from 'sonner'
import { InteractiveHotspot } from '@/components/InteractiveHotspot'

interface StyleGalleryProps {
  onStyleSelect?: (style: StickerStyle) => void
}

export function StyleGallery({ onStyleSelect }: StyleGalleryProps = {}) {
  const [selectedStyleId, setSelectedStyleId] = useState<string | null>(null)
  const [selectedVibe, setSelectedVibe] = useState<VibeCategory | 'all' | 'favorites'>('all')
  const { isFavorite, toggleFavorite, getFavoriteStyles, hasFavorites, favoriteCount } = useFavorites()
  
  const handleStyleSelect = (style: StickerStyle) => {
    if (onStyleSelect) {
      onStyleSelect(style)
    }
  }

  const handleToggleFavorite = (styleId: string) => {
    const style = featuredStyles.find(s => s.id === styleId)
    const willBeFavorite = !isFavorite(styleId)
    
    toggleFavorite(styleId)
    
    if (willBeFavorite) {
      toast.success(`${style?.name || 'Style'} saved ✦`, {
        description: 'Added to your favorites'
      })
    } else {
      toast(`${style?.name || 'Style'} removed`, {
        description: 'Removed from favorites'
      })
    }
  }

  const selectedStyle = useMemo(
    () => featuredStyles.find(s => s.id === selectedStyleId) || null,
    [selectedStyleId]
  )

  const filteredStyles = useMemo(() => {
    if (selectedVibe === 'favorites') {
      return getFavoriteStyles(featuredStyles)
    }
    if (selectedVibe === 'all') return featuredStyles
    return featuredStyles.filter(s => s.vibe === selectedVibe)
  }, [selectedVibe, getFavoriteStyles])

  const vibeCategories = Object.keys(vibeInfo) as VibeCategory[]

  return (
    <div className="space-y-8" data-tour="style-gallery">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
      >
        <div className="flex items-center justify-center gap-3 mb-6">
          <motion.div
            animate={{ 
              rotate: [0, 15, -15, 0],
              scale: [1, 1.2, 1]
            }}
            transition={{ 
              duration: 3,
              repeat: Infinity,
              repeatDelay: 2
            }}
          >
            <Sparkle size={32} weight="duotone" className="text-accent" />
          </motion.div>
          
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center gradient-text px-4">
            Choose Your Style ✦
          </h2>
          
          <motion.div
            animate={{ 
              rotate: [0, -15, 15, 0],
              scale: [1, 1.2, 1]
            }}
            transition={{ 
              duration: 3,
              repeat: Infinity,
              repeatDelay: 2,
              delay: 0.5
            }}
          >
            <Sparkle size={28} weight="duotone" className="sm:w-8 sm:h-8 text-primary" />
          </motion.div>
        </div>
        
        <Tabs value={selectedVibe} onValueChange={(v) => setSelectedVibe(v as VibeCategory | 'all' | 'favorites')} className="space-y-4 sm:space-y-6">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.4 }}
          >
            <TabsList className="w-full grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 h-auto p-2 gap-2 sm:gap-2 bg-card/60 backdrop-blur-md border border-border/40 shadow-xl">
              <TabsTrigger 
                value="all" 
                className="py-3 sm:py-4 px-3 text-xs sm:text-sm data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-lg data-[state=active]:shadow-primary/30 transition-all duration-300 min-h-[48px] md:min-h-[52px]"
              >
                <span className="truncate">All Styles</span>
                <Badge variant="secondary" className="ml-2 text-xs bg-muted/80 py-1 px-2">
                  {featuredStyles.length}
                </Badge>
              </TabsTrigger>
              <InteractiveHotspot
                id="favorites-tab"
                title="Save Your Favorite Styles"
                description="Click the heart ♥ on any style card to save it here for quick access later. Build your personal collection of magic ✦"
                position="bottom"
                autoShow={false}
              >
                <TabsTrigger 
                  value="favorites"
                  className="py-3 sm:py-4 px-3 text-xs sm:text-sm data-[state=active]:bg-accent data-[state=active]:text-accent-foreground data-[state=active]:shadow-lg data-[state=active]:shadow-accent/30 transition-all duration-300 w-full min-h-[48px] md:min-h-[52px]"
                >
                  <Heart size={16} weight={hasFavorites ? 'fill' : 'regular'} className="mr-2 sm:w-5 sm:h-5" />
                  <span className="truncate">Favorites</span>
                  {hasFavorites && (
                    <Badge variant="secondary" className="ml-2 text-xs bg-muted/80 py-1 px-2">
                      {favoriteCount}
                    </Badge>
                  )}
                </TabsTrigger>
              </InteractiveHotspot>
              {vibeCategories.map((vibe, index) => {
                const info = vibeInfo[vibe]
                const count = featuredStyles.filter(s => s.vibe === vibe).length
                return index === 0 ? (
                  <InteractiveHotspot
                    key={vibe}
                    id={`vibe-filter-${vibe}`}
                    title="Filter Sticker Styles by Vibe"
                    description={`${info.name} styles: ${info.description} Perfect for creating ${info.name.toLowerCase()} Telegram stickers. Click to filter.`}
                    position="bottom"
                    autoShow={false}
                  >
                    <TabsTrigger 
                      value={vibe} 
                      className="py-3 sm:py-4 px-3 text-xs sm:text-sm data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-lg data-[state=active]:shadow-primary/30 transition-all duration-300 w-full min-h-[48px] md:min-h-[52px]"
                    >
                      <span className="truncate">{info.name}</span>
                      <Badge variant="secondary" className="ml-2 text-xs bg-muted/80 py-1 px-2">
                        {count}
                      </Badge>
                    </TabsTrigger>
                  </InteractiveHotspot>
                ) : (
                  <TabsTrigger 
                    key={vibe} 
                    value={vibe} 
                    className="py-3 sm:py-4 px-3 text-xs sm:text-sm data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-lg data-[state=active]:shadow-primary/30 transition-all duration-300 min-h-[48px] md:min-h-[52px]"
                  >
                    <span className="truncate">{info.name}</span>
                    <Badge variant="secondary" className="ml-2 text-xs bg-muted/80 py-1 px-2">
                      {count}
                    </Badge>
                  </TabsTrigger>
                )
              })}
            </TabsList>
          </motion.div>

          <AnimatePresence mode="wait">
            <TabsContent value={selectedVibe} className="mt-4 sm:mt-6">
              {filteredStyles.length === 0 ? (
                <motion.div 
                  className="text-center py-16"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3 }}
                >
                  {selectedVibe === 'favorites' ? (
                    <>
                      <Heart size={48} weight="duotone" className="mx-auto mb-4 text-muted-foreground" />
                      <p className="text-lg font-semibold text-foreground mb-2">No favorites yet</p>
                      <p className="text-muted-foreground mb-6">Click the heart ♥ on styles to save them here</p>
                      <Button 
                        variant="outline" 
                        onClick={() => setSelectedVibe('all')}
                        className="group"
                      >
                        Browse styles ✦
                      </Button>
                    </>
                  ) : (
                    <>
                      <p className="text-muted-foreground mb-4">No styles found</p>
                      <Button 
                        variant="outline" 
                        onClick={() => setSelectedVibe('all')}
                        className="group"
                      >
                        <X size={16} className="mr-2 group-hover:rotate-90 transition-transform duration-300" />
                        Clear filter
                      </Button>
                    </>
                  )}
                </motion.div>
              ) : (
                <motion.div 
                  className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.4 }}
                >
                  {filteredStyles.map((style, index) => (
                    <motion.div
                      key={style.id}
                      data-tour={index === 0 ? "style-card" : undefined}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ 
                        delay: index * 0.05,
                        duration: 0.4,
                        ease: 'easeOut'
                      }}
                    >
                      <StickerStyleCard
                        style={style}
                        onClick={() => setSelectedStyleId(style.id)}
                        isFavorite={isFavorite(style.id)}
                        onToggleFavorite={handleToggleFavorite}
                      />
                    </motion.div>
                  ))}
                </motion.div>
              )}
            </TabsContent>
          </AnimatePresence>
        </Tabs>
      </motion.div>

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
