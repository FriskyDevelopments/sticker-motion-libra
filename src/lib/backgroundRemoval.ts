export interface BackgroundRemovalResult {
  success: boolean
  processedImageUrl?: string
  error?: string
}

export async function removeBackground(imageDataUrl: string): Promise<BackgroundRemovalResult> {
  try {
    const prompt = window.spark.llmPrompt`You are an AI that processes images to remove backgrounds. 

Given an image, identify the main subject and provide instructions for background removal that would isolate the subject with a transparent background.

Analyze this image and return a JSON object describing:
1. The main subject detected (e.g., "person", "cat", "product", "logo")
2. The confidence level (0-100) that a clear subject was detected
3. Suggested edge handling ("soft", "hard", "feathered")
4. Whether the image is suitable for background removal

Return the result as a valid JSON object with a single property called "analysis" that contains an object with these fields:
{
"analysis": {
"subject": "description of main subject",
"confidence": 85,
"edgeHandling": "soft",
"suitable": true,
"reason": "explanation"
}
}`

    const response = await window.spark.llm(prompt, 'gpt-4o-mini', true)
    const result = JSON.parse(response)
    
    if (!result.analysis.suitable || result.analysis.confidence < 60) {
      return {
        success: false,
        error: result.analysis.reason || 'Unable to detect a clear subject for background removal'
      }
    }

    const processedUrl = await simulateBackgroundRemoval(imageDataUrl, result.analysis.edgeHandling)
    
    return {
      success: true,
      processedImageUrl: processedUrl
    }
  } catch (error) {
    console.error('Background removal error:', error)
    return {
      success: false,
      error: 'Failed to process image. Please try again.'
    }
  }
}

async function simulateBackgroundRemoval(imageDataUrl: string, edgeHandling: string): Promise<string> {
  return new Promise((resolve, reject) => {
    const img = new Image()
    img.onerror = () => reject(new Error('Failed to load image for background removal'))
    img.onload = () => {
      const canvas = document.createElement('canvas')
      const ctx = canvas.getContext('2d')
      
      if (!ctx) {
        resolve(imageDataUrl)
        return
      }

      canvas.width = img.width
      canvas.height = img.height

      ctx.drawImage(img, 0, 0)

      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height)
      const data = imageData.data

      const centerX = canvas.width / 2
      const centerY = canvas.height / 2
      const maxRadius = Math.min(canvas.width, canvas.height) * 0.45

      for (let y = 0; y < canvas.height; y++) {
        for (let x = 0; x < canvas.width; x++) {
          const index = (y * canvas.width + x) * 4
          
          const dx = x - centerX
          const dy = y - centerY
          const distance = Math.sqrt(dx * dx + dy * dy)
          
          let alpha = 255
          
          if (distance > maxRadius) {
            if (edgeHandling === 'hard') {
              alpha = 0
            } else {
              const featherZone = edgeHandling === 'soft' ? maxRadius * 0.3 : maxRadius * 0.15
              const fadeStart = maxRadius
              const fadeEnd = maxRadius + featherZone
              
              if (distance > fadeEnd) {
                alpha = 0
              } else {
                const fadeProgress = (distance - fadeStart) / featherZone
                alpha = Math.floor(255 * (1 - fadeProgress))
              }
            }
          }
          
          data[index + 3] = alpha
        }
      }

      ctx.putImageData(imageData, 0, 0)

      resolve(canvas.toDataURL('image/png'))
    }

    img.src = imageDataUrl
  })
}
