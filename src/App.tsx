import { Toaster } from '@/components/ui/sonner'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs'
import { Sparkle, Image as ImageIcon, Funnel } from '@phosphor-icons/react'
import { StyleGallery } from '@/components/StyleGallery'
import { ImageUpload } from '@/components/ImageUpload'
import { ExampleTransformation } from '@/components/ExampleTransformation'
import { ParticleField } from '@/components/ParticleField'
import { TransformationControls } from '@/components/TransformationControls'
import { OnboardingTour } from '@/components/OnboardingTour'
import { SettingsMenu } from '@/components/SettingsMenu'
import { InteractiveHotspot } from '@/components/InteractiveHotspot'
import { useTransformation } from '@/hooks/use-transformation'
import { useState, useEffect } from 'react'
import logoImage from '@/assets/images/stixmagic2.jpeg'
import heroPoster from '@/assets/images/stix-magic-poster.png'
import heroVideo from '@/assets/video/stix-magic.mp4'

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
      <ParticleField />
      <Toaster position="top-center" richColors className="sm:!top-4" />
      <OnboardingTour />
      <SettingsMenu />
      
      <div className="container mx-auto px-4 sm:px-6 md:px-8 lg:px-12 py-8 sm:py-12 md:py-16 relative z-10">
        <header className="mb-12 sm:mb-16 text-center space-y-6 sm:space-y-8 relative">
          <div className="absolute inset-0 -top-20 overflow-hidden pointer-events-none">
            <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-[120px] animate-pulse" />
            <div className="absolute top-1/3 right-1/4 w-80 h-80 bg-accent/8 rounded-full blur-[100px] animate-pulse" style={{ animationDelay: '1s' }} />
          </div>
          
          <div className="relative z-10 space-y-4 sm:space-y-6">
            <div className="inline-flex items-center justify-center gap-3 sm:gap-4 mb-4 sm:mb-6">
              <div className="logo-container">
                <img 
                  src={logoImage} 
                  alt="STIX MAGIC" 
                  className="w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 rounded-2xl object-cover animate-float-gentle relative z-10 border-2 border-primary/20"
                />
              </div>
              <Sparkle size={48} weight="duotone" className="sm:w-14 sm:h-14 text-accent animate-pulse drop-shadow-[0_0_20px_oklch(0.72_0.19_320/0.5)]" />
            </div>
            
            <h1 className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-bold gradient-text tracking-tight mb-4 sm:mb-6 drop-shadow-2xl px-2">
              STIX MAGIC
            </h1>
            
            <p className="text-lg sm:text-xl md:text-3xl text-foreground/90 max-w-2xl mx-auto leading-relaxed font-medium px-4">
              Pick a style ✦ Bring it to life ✦ Create your sticker
            </p>
            
            <p className="text-base sm:text-lg md:text-xl text-muted-foreground/80 max-w-xl mx-auto px-4">
              Transform any image into animated magic with ready-made styles
            </p>

            <div className="mt-8 sm:mt-10 max-w-3xl mx-auto rounded-xl sm:rounded-2xl overflow-hidden video-glow relative">
              <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent z-10 pointer-events-none" />
              <video 
                autoPlay 
                loop 
                muted 
                playsInline
                poster={heroPoster}
                className="w-full h-auto"
              >
                <source src={heroVideo} type="video/mp4" />
              </video>
            </div>
          </div>
        </header>

        <ExampleTransformation className="mb-12 sm:mb-16" />

        <Tabs value={selectedTab} onValueChange={setSelectedTab} className="space-y-8 sm:space-y-10">
          <TabsList className="grid w-full max-w-2xl mx-auto grid-cols-2 h-auto p-1 sm:p-1.5 gap-1 sm:gap-0 bg-card/50 backdrop-blur-md border border-border/50 shadow-xl">
            <InteractiveHotspot
              id="styles-tab"
              title="Browse Style Gallery"
              description="Explore our curated collection of animated sticker styles. Each style combines unique motion, edge effects, and visual magic ✦"
              position="bottom"
              autoShow={true}
              delay={2000}
            >
              <TabsTrigger value="styles" className="flex items-center justify-center gap-2 sm:gap-3 py-3 sm:py-4 text-sm sm:text-base data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-lg transition-all duration-300 min-h-[44px]">
                <Funnel size={20} weight="duotone" className="sm:w-[22px] sm:h-[22px]" />
                <span className="whitespace-nowrap">Pick a Style ✦</span>
              </TabsTrigger>
            </InteractiveHotspot>
            <InteractiveHotspot
              id="upload-tab"
              title="Upload Your Image"
              description="Add your own image to transform it with STIX MAGIC. Supports PNG, JPG, and GIF files up to 10MB."
              position="bottom"
              autoShow={false}
            >
              <TabsTrigger data-tour="upload-tab" value="upload" className="flex items-center justify-center gap-2 sm:gap-3 py-3 sm:py-4 text-sm sm:text-base data-[state=active]:bg-accent data-[state=active]:text-accent-foreground data-[state=active]:shadow-lg transition-all duration-300 min-h-[44px]">
                <ImageIcon size={20} weight="duotone" className="sm:w-[22px] sm:h-[22px]" />
                <span className="whitespace-nowrap">Your Image</span>
              </TabsTrigger>
            </InteractiveHotspot>
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
                      Ready for magic ✦
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Switch to the "Pick a Style" tab to transform your image
                    </p>
                  </div>
                )}
              </div>
            )}
          </TabsContent>
        </Tabs>

        <footer className="mt-24 sm:mt-32 pt-12 sm:pt-16 border-t border-border/30 text-center relative">
          <div className="absolute inset-0 bg-gradient-to-t from-card/20 via-transparent to-transparent pointer-events-none" />
          
          <div className="relative z-10 flex flex-col items-center gap-6 sm:gap-8 px-4">
            <div className="logo-container group cursor-pointer">
              <img 
                src={logoImage} 
                alt="STIX MAGIC Logo" 
                className="w-16 h-16 sm:w-20 sm:h-20 rounded-xl object-cover opacity-70 group-hover:opacity-100 transition-all duration-500 border border-border/30 group-hover:border-primary/40"
              />
            </div>
            
            <div className="space-y-2 sm:space-y-3">
              <p className="text-base sm:text-lg font-bold gradient-text">
                STIX MAGIC
              </p>
              <p className="text-xs sm:text-sm text-muted-foreground/70 max-w-md leading-relaxed px-4">
                Transform images into animated stickers with ready-made magic ✦
              </p>
            </div>

            <div className="flex items-center gap-2 sm:gap-3 text-xs sm:text-sm text-muted-foreground/60 px-4">
              <span>🐾 Forged with a frisky paw and a daring heart</span>
            </div>
          </div>
        </footer>
      </div>
    </div>
  )
}

export default App
