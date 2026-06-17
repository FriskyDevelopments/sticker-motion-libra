import { useState, useCallback } from 'react'
import { transformationEngine, type TransformationState, type TransformationResult } from '@/lib/transformationEngine'
import type { StickerStyle } from '@/lib/stickerStyles'
import { toast } from 'sonner'

export function useTransformation() {
  const [state, setState] = useState<TransformationState>(transformationEngine.getState())
  const [isProcessing, setIsProcessing] = useState(false)

  const updateState = useCallback(() => {
    setState(transformationEngine.getState())
  }, [])

  const loadImage = useCallback((imageDataUrl: string) => {
    transformationEngine.initialize(imageDataUrl)
    updateState()
  }, [updateState])

  const applyStyle = useCallback(async (style: StickerStyle): Promise<TransformationResult> => {
    setIsProcessing(true)
    
    const loadingToast = toast.loading('Infusing magic ✧', {
      description: `Applying ${style.name}...`
    })

    try {
      const result = await transformationEngine.applyStyle(style)
      
      toast.dismiss(loadingToast)
      
      if (result.success) {
        toast.success('Magic applied ✦', {
          description: `${style.name} has been applied to your image`
        })
      } else {
        toast.error('Failed to apply style', {
          description: result.error || 'Please try again'
        })
      }

      updateState()
      return result
    } catch {
      toast.dismiss(loadingToast)
      toast.error('Transformation failed', {
        description: 'An unexpected error occurred'
      })
      return {
        success: false,
        error: 'Transformation failed'
      }
    } finally {
      setIsProcessing(false)
    }
  }, [updateState])

  const revertToOriginal = useCallback(() => {
    const result = transformationEngine.revertToOriginal()
    
    if (result.success) {
      toast.info('Reverted to original ○', {
        description: 'All transformations have been removed'
      })
    } else {
      toast.error('Cannot revert', {
        description: result.error || 'No original image found'
      })
    }
    
    updateState()
    return result
  }, [updateState])

  const undo = useCallback(() => {
    const result = transformationEngine.undo()
    
    if (result.success) {
      toast.info('Undone △')
    } else {
      toast.error('Cannot undo', {
        description: result.error || 'Nothing to undo'
      })
    }
    
    updateState()
    return result
  }, [updateState])

  const redo = useCallback(() => {
    const result = transformationEngine.redo()
    
    if (result.success) {
      toast.info('Redone ✧')
    } else {
      toast.error('Cannot redo', {
        description: result.error || 'Nothing to redo'
      })
    }
    
    updateState()
    return result
  }, [updateState])

  const reset = useCallback(() => {
    transformationEngine.reset()
    updateState()
    toast.info('Reset complete', {
      description: 'Transformation engine cleared'
    })
  }, [updateState])

  const getCurrentImage = useCallback(() => {
    return transformationEngine.getCurrentImage()
  }, [])

  const getAppliedStyle = useCallback(() => {
    return transformationEngine.getAppliedStyle()
  }, [])

  const hasImage = useCallback(() => {
    return transformationEngine.hasImage()
  }, [])

  const hasTransformation = useCallback(() => {
    return transformationEngine.hasTransformation()
  }, [])

  return {
    state,
    isProcessing,
    loadImage,
    applyStyle,
    revertToOriginal,
    undo,
    redo,
    reset,
    getCurrentImage,
    getAppliedStyle,
    hasImage,
    hasTransformation,
  }
}
