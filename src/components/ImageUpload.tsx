import { useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Upload, X, Image as ImageIcon, MagicWand } from '@phosphor-icons/react'
import { Button } from '@/components/ui/button'
import { Switch } from '@/components/ui/switch'
import { Label } from '@/components/ui/label'
import { cn } from '@/lib/utils'
import { toast } from 'sonner'
import { useBackgroundRemoval } from '@/hooks/use-background-removal'

interface ImageUploadProps {
  onImageSelect: (file: File, dataUrl: string) => void
  currentImage?: string
  onClear?: () => void
  className?: string
}

export function ImageUpload({ onImageSelect, currentImage, onClear, className }: ImageUploadProps) {
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [isDragging, setIsDragging] = useState(false)
  const [originalImage, setOriginalImage] = useState<string | null>(null)
  const [bgRemovalEnabled, setBgRemovalEnabled] = useState(false)
  const { removeBackground, isProcessing, processedImage } = useBackgroundRemoval()

  const handleFileSelect = (file: File) => {
    if (!file.type.startsWith('image/')) {
      toast.error('Invalid file type', {
        description: 'Please upload an image file (PNG, JPG, GIF, etc.)'
      })
      return
    }

    if (file.size > 10 * 1024 * 1024) {
      toast.error('File too large', {
        description: 'Please upload an image smaller than 10MB'
      })
      return
    }

    const reader = new FileReader()
    reader.onload = (e) => {
      const dataUrl = e.target?.result as string
      setOriginalImage(dataUrl)
      onImageSelect(file, dataUrl)
      toast.success('Image uploaded ✦', {
        description: 'Ready to apply your magic'
      })
    }
    reader.readAsDataURL(file)
    reader.onerror = () => { toast.error('Failed to read file', { description: 'Please try again or try a different file.' }) }
  }

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      handleFileSelect(file)
    }
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(true)
  }

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
    
    const file = e.dataTransfer.files?.[0]
    if (file) {
      handleFileSelect(file)
    }
  }

  const handleClick = () => {
    fileInputRef.current?.click()
  }

  const handleClear = (e: React.MouseEvent) => {
    e.stopPropagation()
    setOriginalImage(null)
    setBgRemovalEnabled(false)
    onClear?.()
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
    toast.info('Image cleared', {
      description: 'Upload a new image to continue'
    })
  }

  const handleBgRemovalToggle = async (enabled: boolean) => {
    setBgRemovalEnabled(enabled)
    
    if (enabled && originalImage) {
      const result = await removeBackground(originalImage)
      if (result.success && result.imageDataUrl) {
        const response = await fetch(result.imageDataUrl)
        const blob = await response.blob()
        const file = new File([blob], 'processed-image.png', { type: 'image/png' })
        onImageSelect(file, result.imageDataUrl)
      }
    } else if (!enabled && originalImage) {
      const response = await fetch(originalImage)
      const blob = await response.blob()
      const file = new File([blob], 'original-image.png', { type: 'image/png' })
      onImageSelect(file, originalImage)
    }
  }

  return (
    <div className={cn('relative', className)}>
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileInputChange}
        className="hidden"
        id="image-upload-input"
      />

      <motion.div
        onClick={handleClick}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        className={cn(
          'relative overflow-hidden rounded-2xl border-2 border-dashed transition-all cursor-pointer',
          'hover:border-accent hover:bg-accent/5',
          isDragging && 'border-accent bg-accent/10 scale-[0.98]',
          currentImage ? 'border-border' : 'border-border/50'
        )}
        whileHover={{ scale: currentImage ? 1 : 1.01 }}
        whileTap={{ scale: 0.98 }}
      >
        <AnimatePresence mode="wait">
          {currentImage ? (
            <motion.div
              key="preview"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="relative aspect-square w-full"
            >
              <div className="relative w-full h-full">
                {isProcessing && (
                  <div className="absolute inset-0 bg-background/80 backdrop-blur-sm flex items-center justify-center z-20">
                    <div className="text-center space-y-3">
                      <MagicWand size={48} weight="duotone" className="mx-auto text-primary animate-pulse" />
                      <p className="text-sm font-medium">Removing background ◌</p>
                    </div>
                  </div>
                )}
                
                <img
                  src={currentImage}
                  alt="Uploaded preview"
                  className="w-full h-full object-contain"
                />
              </div>
              
              <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent opacity-0 hover:opacity-100 transition-opacity flex items-end justify-center p-6">
                <Button
                  variant="secondary"
                  size="sm"
                  className="gap-2 min-h-[44px]"
                >
                  <Upload size={16} className="md:w-5 md:h-5" />
                  Change image
                </Button>
              </div>

              {onClear && (
                <Button
                  variant="destructive"
                  size="icon"
                  className="absolute top-3 right-3 h-9 w-9 md:h-11 md:w-11 rounded-full"
                  onClick={handleClear}
                >
                  <X size={18} weight="bold" className="md:w-5 md:h-5" />
                </Button>
              )}
            </motion.div>
          ) : (
            <motion.div
              key="empty"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="aspect-square w-full flex flex-col items-center justify-center p-8 bg-gradient-to-br from-muted/20 via-background to-muted/30"
            >
              <div className="relative">
                <motion.div
                  animate={{ 
                    scale: isDragging ? 1.1 : 1,
                    rotate: isDragging ? 5 : 0
                  }}
                  transition={{ type: 'spring', stiffness: 300 }}
                >
                  {isDragging ? (
                    <Upload size={64} weight="duotone" className="text-accent" />
                  ) : (
                    <ImageIcon size={64} weight="duotone" className="text-muted-foreground" />
                  )}
                </motion.div>
                
                {isDragging && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 0.5, repeat: Infinity }}
                    className="absolute -inset-4 rounded-full bg-accent/20 blur-xl -z-10"
                  />
                )}
              </div>

              <div className="mt-6 text-center space-y-2">
                <p className="text-lg font-semibold">
                  {isDragging ? 'Drop your image ✦' : 'Upload your image'}
                </p>
                <p className="text-sm text-muted-foreground">
                  {isDragging 
                    ? 'Release to upload' 
                    : 'Click or drag & drop • PNG, JPG, GIF • Max 10MB'}
                </p>
              </div>

              <div className="mt-6">
                <Button 
                  variant="outline" 
                  className="gap-2 pointer-events-none"
                  size="sm"
                >
                  <Upload size={16} />
                  Choose file
                </Button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {originalImage && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-4 p-4 rounded-xl bg-card border border-border space-y-3"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <MagicWand size={20} weight="duotone" className="text-primary" />
              <div>
                <Label htmlFor="bg-removal" className="text-sm font-semibold cursor-pointer">
                  Remove Background
                </Label>
                <p className="text-xs text-muted-foreground">
                  AI-powered subject isolation
                </p>
              </div>
            </div>
            <Switch
              id="bg-removal"
              checked={bgRemovalEnabled}
              onCheckedChange={handleBgRemovalToggle}
              disabled={isProcessing}
            />
          </div>

          {bgRemovalEnabled && processedImage && (
            <div className="pt-2 border-t border-border">
              <p className="text-xs text-muted-foreground flex items-center gap-2">
                <span className="inline-block w-2 h-2 rounded-full bg-primary animate-pulse" />
                Background removed ✦ Subject isolated
              </p>
            </div>
          )}
        </motion.div>
      )}
    </div>
  )
}
