import { applyStyleToImage } from './maskSystem'
import type { StickerStyle } from './stickerStyles'

export interface TransformationState {
  originalImage: string
  currentImage: string
  appliedStyle: StickerStyle | null
  history: TransformationStep[]
  canUndo: boolean
  canRedo: boolean
}

export interface TransformationStep {
  id: string
  timestamp: number
  styleApplied: StickerStyle
  resultImage: string
  action: 'apply' | 'revert'
}

export interface TransformationResult {
  success: boolean
  transformedImage?: string
  error?: string
  processingTime?: number
}

export class TransformationEngine {
  private state: TransformationState = {
    originalImage: '',
    currentImage: '',
    appliedStyle: null,
    history: [],
    canUndo: false,
    canRedo: false
  }

  private maxHistorySize = 20
  private currentHistoryIndex = -1

  initialize(imageDataUrl: string): void {
    this.state = {
      originalImage: imageDataUrl,
      currentImage: imageDataUrl,
      appliedStyle: null,
      history: [],
      canUndo: false,
      canRedo: false
    }
    this.currentHistoryIndex = -1
  }

  async applyStyle(style: StickerStyle): Promise<TransformationResult> {
    const startTime = performance.now()

    try {
      if (!this.state.originalImage) {
        return {
          success: false,
          error: 'No image loaded. Please upload an image first.'
        }
      }

      const baseImage = this.state.currentImage || this.state.originalImage

      const transformedImage = await applyStyleToImage(
        baseImage,
        style.mask.type,
        style.motion.id
      )

      const step: TransformationStep = {
        id: `transform-${Date.now()}`,
        timestamp: Date.now(),
        styleApplied: style,
        resultImage: transformedImage,
        action: 'apply'
      }

      this.currentHistoryIndex++
      this.state.history = this.state.history.slice(0, this.currentHistoryIndex)
      this.state.history.push(step)

      if (this.state.history.length > this.maxHistorySize) {
        this.state.history.shift()
        this.currentHistoryIndex--
      }

      this.state.currentImage = transformedImage
      this.state.appliedStyle = style
      this.state.canUndo = true
      this.state.canRedo = false

      const processingTime = performance.now() - startTime

      return {
        success: true,
        transformedImage,
        processingTime
      }
    } catch (error) {
      console.error('Transformation error:', error)
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to apply style'
      }
    }
  }

  revertToOriginal(): TransformationResult {
    if (!this.state.originalImage) {
      return {
        success: false,
        error: 'No original image to revert to'
      }
    }

    this.state.currentImage = this.state.originalImage
    this.state.appliedStyle = null
    this.currentHistoryIndex = -1
    this.state.canUndo = false
    this.state.canRedo = this.state.history.length > 0

    return {
      success: true,
      transformedImage: this.state.originalImage
    }
  }

  undo(): TransformationResult {
    if (!this.state.canUndo || this.currentHistoryIndex < 0) {
      return {
        success: false,
        error: 'Nothing to undo'
      }
    }

    this.currentHistoryIndex--

    if (this.currentHistoryIndex < 0) {
      this.state.currentImage = this.state.originalImage
      this.state.appliedStyle = null
      this.state.canUndo = false
    } else {
      const step = this.state.history[this.currentHistoryIndex]
      this.state.currentImage = step.resultImage
      this.state.appliedStyle = step.styleApplied
      this.state.canUndo = this.currentHistoryIndex >= 0
    }

    this.state.canRedo = true

    return {
      success: true,
      transformedImage: this.state.currentImage
    }
  }

  redo(): TransformationResult {
    if (!this.state.canRedo || this.currentHistoryIndex >= this.state.history.length - 1) {
      return {
        success: false,
        error: 'Nothing to redo'
      }
    }

    this.currentHistoryIndex++
    const step = this.state.history[this.currentHistoryIndex]
    
    this.state.currentImage = step.resultImage
    this.state.appliedStyle = step.styleApplied
    this.state.canUndo = true
    this.state.canRedo = this.currentHistoryIndex < this.state.history.length - 1

    return {
      success: true,
      transformedImage: this.state.currentImage
    }
  }

  getState(): TransformationState {
    return { ...this.state }
  }

  getCurrentImage(): string {
    return this.state.currentImage || this.state.originalImage
  }

  getAppliedStyle(): StickerStyle | null {
    return this.state.appliedStyle
  }

  hasImage(): boolean {
    return !!this.state.originalImage
  }

  hasTransformation(): boolean {
    return !!this.state.appliedStyle
  }

  getHistory(): TransformationStep[] {
    return [...this.state.history]
  }

  clearHistory(): void {
    this.state.history = []
    this.currentHistoryIndex = -1
    this.state.canUndo = false
    this.state.canRedo = false
  }

  reset(): void {
    this.state = {
      originalImage: '',
      currentImage: '',
      appliedStyle: null,
      history: [],
      canUndo: false,
      canRedo: false
    }
    this.currentHistoryIndex = -1
  }
}

export const transformationEngine = new TransformationEngine()
