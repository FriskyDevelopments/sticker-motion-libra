import { Toaster } from '@/components/ui/sonner'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs'
import { Sparkle, Image as ImageIcon, Funnel } from '@phosphor-icons/react'
import { StyleGallery } from '@/components/StyleGallery'
import { ImageUpload } from '@/components/ImageUpload'
import { ExampleTransformation } from '@/components/ExampleTransformation'
import { useState } from 'react'
import logoImage from '@/assets/images/stixmagic2.jpeg'
import heroPoster from '@/assets/images/stix-magic-poster.png'
import heroVideo from '@/assets/video/stix-magic.mp4'

function App() {
  const [uploadedImage, setUploadedImage] = useState<{file: File, dataUrl: string} | null>(null)

  const handleImageSelect = (file: File, dataUrl: string) => {
    setUploadedImage({ file, dataUrl })
  }

  const handleClear = () => {
    setUploadedImage(null)
  }

  return (
    <div className="min-h-screen mesh-background">
      <Toaster position="top-right" richColors />
      
      <div className="container mx-auto px-6 md:px-8 lg:px-12 py-12 md:py-16">
        <header className="mb-12 text-center space-y-6">
          <div className="inline-flex items-center justify-center gap-4 mb-6">
            <div className="logo-container">
              <img 
                src={logoImage} 
                alt="STIX MAGIC" 
                className="w-20 h-20 md:w-24 md:h-24 rounded-2xl object-cover animate-float-gentle relative z-10"
              />
            </div>
            <Sparkle size={48} weight="duotone" className="text-accent animate-pulse" />
          </div>
          
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold gradient-text tracking-tight mb-4">
            STIX MAGIC
          </h1>
          
          <p className="text-xl md:text-2xl text-foreground/80 max-w-2xl mx-auto leading-relaxed">
            Pick a style ✦ Bring it to life ✧ Create your sticker
          </p>
          
          <p className="text-base md:text-lg text-muted-foreground max-w-xl mx-auto">
            Transform any image into an animated sticker with ready-made magic
          </p>

          <div className="mt-8 max-w-3xl mx-auto rounded-2xl overflow-hidden video-glow">
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
        </header>

        <ExampleTransformation className="mb-16" />

        <Tabs defaultValue="styles" className="space-y-8">
          <TabsList className="grid w-full max-w-xl mx-auto grid-cols-2 h-auto p-1">
            <TabsTrigger value="styles" className="flex items-center gap-2 py-3">
              <Funnel size={20} weight="duotone" />
              Pick a Style
            </TabsTrigger>
            <TabsTrigger value="upload" className="flex items-center gap-2 py-3">
              <ImageIcon size={20} weight="duotone" />
              Your Image
            </TabsTrigger>
          </TabsList>

          <TabsContent value="styles" className="space-y-8">
            <StyleGallery />
          </TabsContent>

          <TabsContent value="upload" className="space-y-8">
            <ImageUpload 
              onImageSelect={handleImageSelect}
              currentImage={uploadedImage?.dataUrl}
              onClear={handleClear}
            />
          </TabsContent>
        </Tabs>

        <footer className="mt-24 pt-12 border-t border-border/50 text-center">
          <div className="flex flex-col items-center gap-6">
            <div className="logo-container">
              <img 
                src={logoImage} 
                alt="STIX MAGIC Logo" 
                className="w-16 h-16 rounded-xl object-cover opacity-80 hover:opacity-100 transition-opacity"
              />
            </div>
            
            <div className="space-y-2">
              <p className="text-sm font-medium gradient-text">
                STIX MAGIC
              </p>
              <p className="text-xs text-muted-foreground max-w-md">
                Transform images into animated stickers with ready-made magic ✦
              </p>
            </div>

            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <span>Powered by</span>
              <span className="font-mono">◌</span>
              <span>cloud magic</span>
            </div>
          </div>
        </footer>
      </div>
    </div>
  )
}

export default App
