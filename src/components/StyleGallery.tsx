import { featuredStyles } from '@/lib/featuredStyles'
import { vibeInfo, type VibeCategory } from '@/lib/stickerStyles'
import { StickerStyleCard } from '@/components/StickerStyleCard'
import { StyleDetailPanel } from '@/components/StyleDetailPanel'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs'
import { X, Sparkle } from '@phosphor-icons/react'
import { useState, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export function StyleGallery() {
  const [selectedStyleId, setSelectedStyleId] = useState<string | null>(null)
  const [selectedVibe, setSelectedVibe] = useState<VibeCategory | 'all'>('all')

  const selectedStyle = useMemo(
    () => featuredStyles.find(s => s.id === selectedStyleId) || null,
    [selectedStyleId]
  )

  const filteredStyles = useMemo(() => {
    if (selectedVibe === 'all') return featuredStyles
    return featuredStyles.filter(s => s.vibe === selectedVibe)
  }, [selectedVibe])

  const vibeCategories = Object.keys(vibeInfo) as VibeCategory[]

  return (
    <div className="space-y-8">
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
          
          <h2 className="text-3xl md:text-4xl font-bold text-center gradient-text">
            Pick a style
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
            <Sparkle size={32} weight="duotone" className="text-primary" />
          </motion.div>
        </div>
        
        <Tabs value={selectedVibe} onValueChange={(v) => setSelectedVibe(v as VibeCategory | 'all')} className="space-y-6">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.4 }}
          >
            <TabsList className="w-full grid grid-cols-2 md:grid-cols-5 h-auto p-1 bg-muted/50 backdrop-blur-sm border border-border/50">
              <TabsTrigger 
                value="all" 
                className="py-2.5 data-[state=active]:bg-background data-[state=active]:shadow-sm transition-all duration-300"
              >
                All Styles
                <Badge variant="secondary" className="ml-2 text-xs">
                  {featuredStyles.length}
                </Badge>
              </TabsTrigger>
              {vibeCategories.map((vibe, index) => {
                const info = vibeInfo[vibe]
                const count = featuredStyles.filter(s => s.vibe === vibe).length
                return (
                  <TabsTrigger 
                    key={vibe} 
                    value={vibe} 
                    className="py-2.5 text-sm data-[state=active]:bg-background data-[state=active]:shadow-sm transition-all duration-300"
                  >
                    {info.name}
                    <Badge variant="secondary" className="ml-2 text-xs">
                      {count}
                    </Badge>
                  </TabsTrigger>
                )
              })}
            </TabsList>
          </motion.div>

          <AnimatePresence mode="wait">
            <TabsContent value={selectedVibe} className="mt-6">
              {filteredStyles.length === 0 ? (
                <motion.div 
                  className="text-center py-16"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3 }}
                >
                  <p className="text-muted-foreground mb-4">No styles found</p>
                  <Button 
                    variant="outline" 
                    onClick={() => setSelectedVibe('all')}
                    className="group"
                  >
                    <X size={16} className="mr-2 group-hover:rotate-90 transition-transform duration-300" />
                    Clear filter
                  </Button>
                </motion.div>
              ) : (
                <motion.div 
                  className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.4 }}
                >
                  {filteredStyles.map((style, index) => (
                    <motion.div
                      key={style.id}
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
