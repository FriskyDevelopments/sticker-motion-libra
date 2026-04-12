import { Toaster } from '@/components/ui/sonner'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs'
import { Sparkle, Image as ImageIcon, Funnel } from '@phosphor-icons/react'
import { StyleGallery } from '@/components/StyleGallery'
import { ImageUpload } from '@/components/ImageUpload'
import { ExampleTransformation } from '@/components/ExampleTransformation'
import { TransformationControls } from '@/components/TransformationControls'
import { SettingsMenu } from '@/components/SettingsMenu'
import { useTransformation } from '@/hooks/use-transformation'
import { useState, useEffect } from 'react'
import logoImage from '@/assets/images/stixmagic2.jpeg'

function App() {
  const [uploadedImage, setUploadedImage] = useState<{file: File, dataUrl: string} | null>(null)
  const [selectedTab, setSelectedTab] = useState('styles')
  const transformation = useTransformation()

  const handleImageSelect = (file: File, dataUrl: string) => {
    setUploadedImage({ file, dataUrl })
    transformation.loadImage(dataUrl)
  }

  const handleClear = () => {
    setUploadedImage(null)
    transformation.reset()
  }

  useEffect(() => {
    if (transformation.hasImage() && !uploadedImage) {
      setSelectedTab('upload')
    }
  }, [transformation, uploadedImage])

  return (
    <div className="min-h-screen mesh-background relative">
      <Toaster position="top-center" richColors className="sm:!top-4" />
      <SettingsMenu />
      
      <div className="container mx-auto px-4 sm:px-6 md:px-8 py-6 sm:py-8 md:py-12 relative z-10">
        <header className="mb-8 sm:mb-12 text-center space-y-4 sm:space-y-6 relative">
          <div className="relative z-10 space-y-3 sm:space-y-4">
            <div className="inline-flex items-center justify-center gap-3 mb-3 sm:mb-4">
              <img 
                src={logoImage} 
                alt="STIX MΛGIC" 
                className="w-16 h-16 sm:w-20 sm:h-20 rounded-xl object-cover border border-primary/20"
              />
              <Sparkle size={32} weight="duotone" className="sm:w-10 sm:h-10 text-accent" />
            </div>
            
            <h1 className="text-3xl sm:text-4xl md:text-6xl font-bold gradient-text tracking-tight">
              STIX MΛGIC
            </h1>
            
            <p className="text-lg sm:text-xl md:text-2xl text-foreground/90 max-w-xl mx-auto font-semibold px-4">
              Telegram Sticker Engine
            </p>
            
            <p className="text-sm sm:text-base text-muted-foreground/80 max-w-md mx-auto px-4">
              Pick a style ✦ Apply to your image ✦ Export for Telegram
            </p>
          </div>
        </header>

        <ExampleTransformation className="mb-8 sm:mb-12" />

        <Tabs value={selectedTab} onValueChange={setSelectedTab} className="space-y-6 sm:space-y-8">
          <TabsList className="grid w-full max-w-2xl mx-auto grid-cols-2 h-auto p-3 gap-4 bg-card/80 backdrop-blur-sm border border-border shadow-lg rounded-2xl">
            <TabsTrigger 
              value="styles" 
              className="flex items-center justify-center gap-3 py-6 sm:py-7 px-5 text-lg sm:text-xl font-semibold data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-md transition-all duration-200 rounded-xl min-h-[68px] sm:min-h-[76px] touch-manipulation"
            >
              <Funnel size={28} weight="duotone" className="sm:w-8 sm:h-8" />
              <span>Styles ✦</span>
            </TabsTrigger>
            <TabsTrigger 
              value="upload" 
              className="flex items-center justify-center gap-3 py-6 sm:py-7 px-5 text-lg sm:text-xl font-semibold data-[state=active]:bg-accent data-[state=active]:text-accent-foreground data-[state=active]:shadow-md transition-all duration-200 rounded-xl min-h-[68px] sm:min-h-[76px] touch-manipulation"
            >
              <ImageIcon size={28} weight="duotone" className="sm:w-8 sm:h-8" />
              <span>Your Image</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="styles" className="space-y-8 mt-0">
            <div data-tour="style-gallery">
              <StyleGallery onStyleSelect={(style) => {
                if (transformation.hasImage()) {
                  transformation.applyStyle(style)
                }
              }} />
            </div>
          </TabsContent>

          <TabsContent value="upload" className="space-y-8 mt-0">
            <ImageUpload 
              onImageSelect={handleImageSelect}
              currentImage={transformation.hasImage() ? transformation.getCurrentImage() : uploadedImage?.dataUrl}
              onClear={handleClear}
            />

            {transformation.hasImage() && (
              <div className="space-y-6">
                <TransformationControls
                  appliedStyle={transformation.state.appliedStyle}
                  canUndo={transformation.state.canUndo}
                  canRedo={transformation.state.canRedo}
                  hasTransformation={transformation.hasTransformation()}
                  currentImage={transformation.getCurrentImage()}
                  transformationHistory={transformation.state.history}
                  originalImage={transformation.state.originalImage}
                  onUndo={transformation.undo}
                  onRedo={transformation.redo}
                  onRevert={transformation.revertToOriginal}
                />
                
                {!transformation.hasTransformation() && (
                  <div className="text-center p-8 rounded-xl bg-muted/30 border-2 border-dashed border-border">
                    <Sparkle size={48} weight="duotone" className="mx-auto mb-4 text-muted-foreground" />
                    <p className="text-lg font-semibold text-foreground mb-2">
                      Ready to create your sticker ✦
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Switch to "Styles" to pick a style and bring your sticker to life
                    </p>
                  </div>
                )}
              </div>
            )}
          </TabsContent>
        </Tabs>

        <footer className="mt-16 sm:mt-20 pt-8 sm:pt-12 border-t border-border/20 text-center">
          <div className="flex flex-col items-center gap-4 px-4">
            <img 
              src={logoImage} 
              alt="STIX MΛGIC Logo" 
              className="w-12 h-12 sm:w-14 sm:h-14 rounded-lg object-cover opacity-60 border border-border/20"
            />
            
            <div className="space-y-1">
              <p className="text-sm sm:text-base font-bold gradient-text">
                STIX MΛGIC
              </p>
              <p className="text-xs text-muted-foreground/60">
                Telegram Sticker Engine ✦
              </p>
            </div>

            <p className="text-xs text-muted-foreground/50">
              🐾 Forged with a frisky paw and a daring heart
            </p>
          </div>
        </footer>
      </div>
    </div>
  )
}

export default App
