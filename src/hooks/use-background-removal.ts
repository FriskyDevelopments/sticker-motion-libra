import { useState, useCallback } from 'react'
import { toast } from 'sonner'

export interface BackgroundRemovalResult {
  success: boolean
  imageDataUrl?: string
  error?: string
}

export function useBackgroundRemoval() {
  const [isProcessing, setIsProcessing] = useState(false)
  const [processedImage, setProcessedImage] = useState<string | null>(null)

  const removeBackground = useCallback(async (imageDataUrl: string): Promise<BackgroundRemovalResult> => {
    setIsProcessing(true)
    
    const loadingToast = toast.loading('Removing background ◌', {
      description: 'AI is isolating your subject...'
    })

    try {
      const prompt = spark.llmPrompt`You are an image processing assistant. Given an image, describe the main subject that should be isolated from the background. Focus on identifying:
1. The primary subject (person, object, character, logo, etc.)
2. Clear boundaries between subject and background
3. Any complex edges like hair, fur, or transparent areas

Respond with a JSON object containing:
{
  "subject": "brief description of the main subject",
  "complexity": "simple" | "moderate" | "complex",
  "recommendation": "brief processing recommendation"
}`

      const base64Data = imageDataUrl.split(',')[1]
      
      const analysisResult = await spark.llm(
        prompt + `\n\nAnalyze this image data: ${base64Data.substring(0, 1000)}...`,
        'gpt-4o-mini',
        true
      )
      
      const analysis = JSON.parse(analysisResult)
      
      const canvas = document.createElement('canvas')
      const ctx = canvas.getContext('2d')
      if (!ctx) {
        throw new Error('Could not create canvas context')
      }

      const img = new Image()
      await new Promise((resolve, reject) => {
        img.onload = resolve
        img.onerror = reject
        img.src = imageDataUrl
      })

      canvas.width = img.width
      canvas.height = img.height
      ctx.drawImage(img, 0, 0)

      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height)
      const data = imageData.data

      const processedData = await processImageData(data, canvas.width, canvas.height, analysis.complexity)

      const processedImageData = ctx.createImageData(canvas.width, canvas.height)
      processedImageData.data.set(processedData)
      ctx.putImageData(processedImageData, 0, 0)

      const resultDataUrl = canvas.toDataURL('image/png')
      setProcessedImage(resultDataUrl)

      toast.dismiss(loadingToast)
      toast.success('Background removed ✦', {
        description: `${analysis.subject} isolated successfully`
      })

      return {
        success: true,
        imageDataUrl: resultDataUrl
      }
    } catch (error) {
      console.error('Background removal error:', error)
      toast.dismiss(loadingToast)
      toast.error('Background removal failed', {
        description: 'Please try a different image or use the original'
      })

      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error'
      }
    } finally {
      setIsProcessing(false)
    }
  }, [])

  const reset = useCallback(() => {
    setProcessedImage(null)
    setIsProcessing(false)
  }, [])

  return {
    removeBackground,
    isProcessing,
    processedImage,
    reset
  }
}

async function processImageData(
  data: Uint8ClampedArray,
  width: number,
  height: number,
  complexity: 'simple' | 'moderate' | 'complex'
): Promise<Uint8ClampedArray> {
  const result = new Uint8ClampedArray(data)
  
  const edges = detectEdges(data, width, height)
  const threshold = complexity === 'simple' ? 0.15 : complexity === 'moderate' ? 0.25 : 0.35
  
  for (let i = 0; i < data.length; i += 4) {
    const pixelIndex = i / 4
    const x = pixelIndex % width
    const y = Math.floor(pixelIndex / width)
    
    const edgeDistance = getDistanceToNearestEdge(x, y, edges, width, height)
    const normalizedDistance = edgeDistance / Math.max(width, height)
    
    if (normalizedDistance > threshold) {
      const fadeStart = threshold
      const fadeEnd = threshold + 0.15
      const alpha = 1 - Math.min(1, (normalizedDistance - fadeStart) / (fadeEnd - fadeStart))
      
      result[i + 3] = Math.floor(alpha * 255)
    }
  }
  
  return result
}

function detectEdges(data: Uint8ClampedArray, width: number, height: number): boolean[][] {
  const edges: boolean[][] = Array(height).fill(null).map(() => Array(width).fill(false))
  const threshold = 30
  
  for (let y = 1; y < height - 1; y++) {
    for (let x = 1; x < width - 1; x++) {
      const idx = (y * width + x) * 4
      
      const center = (data[idx] + data[idx + 1] + data[idx + 2]) / 3
      
      const neighbors = [
        (data[((y-1) * width + x) * 4] + data[((y-1) * width + x) * 4 + 1] + data[((y-1) * width + x) * 4 + 2]) / 3,
        (data[((y+1) * width + x) * 4] + data[((y+1) * width + x) * 4 + 1] + data[((y+1) * width + x) * 4 + 2]) / 3,
        (data[(y * width + x - 1) * 4] + data[(y * width + x - 1) * 4 + 1] + data[(y * width + x - 1) * 4 + 2]) / 3,
        (data[(y * width + x + 1) * 4] + data[(y * width + x + 1) * 4 + 1] + data[(y * width + x + 1) * 4 + 2]) / 3,
      ]
      
      const maxDiff = Math.max(...neighbors.map(n => Math.abs(center - n)))
      edges[y][x] = maxDiff > threshold
    }
  }
  
  return edges
}

function getDistanceToNearestEdge(
  x: number,
  y: number,
  edges: boolean[][],
  width: number,
  height: number
): number {
  let minDistance = Math.max(width, height)
  const searchRadius = 50
  
  for (let dy = -searchRadius; dy <= searchRadius; dy++) {
    for (let dx = -searchRadius; dx <= searchRadius; dx++) {
      const ny = y + dy
      const nx = x + dx
      
      if (ny >= 0 && ny < height && nx >= 0 && nx < width && edges[ny][nx]) {
        const distance = Math.sqrt(dx * dx + dy * dy)
        minDistance = Math.min(minDistance, distance)
      }
    }
  }
  
  return minDistance
}
