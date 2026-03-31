import { useKV } from '@github/spark/hooks'
import { useEffect, useState } from 'react'
import welcomeVideo from '@/assets/video/stix-magic.mp4'
import welcomePoster from '@/assets/images/stix-magic-poster.png'
import styleGalleryGif from '@/assets/images/gemini_generated_video_7DC02353.gif'
import transformationGif from '@/assets/images/Untitled_2.gif'
import watermarkGif from '@/assets/images/4E8234E0-7702-4E37-9300-B345284E630F_2026-03-21T12-29-00_create_a_minimal__watermarked_2.gif'

export type OnboardingStep = {
  id: string
  title: string
  description: string
  targetSelector: string
  position: 'top' | 'bottom' | 'left' | 'right' | 'center'
  action?: string
  videoUrl?: string
  videoPoster?: string
  tutorialHighlights?: string[]
}

const ONBOARDING_STEPS: OnboardingStep[] = [
  {
    id: 'welcome',
    title: 'Welcome to STIX MAGIC ✦',
    description: 'Transform any image into animated magic with ready-made styles. This tutorial will guide you through the complete workflow in just a few steps.',
    targetSelector: 'body',
    position: 'center',
    videoUrl: welcomeVideo,
    videoPoster: welcomePoster,
    tutorialHighlights: [
      'Browse curated animated styles',
      'Upload and transform your images',
      'Export as animated stickers',
    ],
  },
  {
    id: 'pick-style',
    title: 'Pick a style ✦',
    description: 'Browse our curated collection of animated styles. Each card shows a live preview with unique motion and finish. Watch how different styles create different vibes.',
    targetSelector: '[data-tour="style-gallery"]',
    position: 'top',
    videoUrl: styleGalleryGif,
    videoPoster: welcomePoster,
    tutorialHighlights: [
      'Scroll through style categories',
      'See live animated previews',
      'Read vibe tags and descriptions',
    ],
  },
  {
    id: 'preview-style',
    title: 'See it come to life',
    description: 'Click any style card to open the detail panel. See a larger preview, understand the motion personality, and learn when to use this style. You can also toggle extra magic for more control.',
    targetSelector: '[data-tour="style-card"]',
    position: 'bottom',
    videoUrl: transformationGif,
    videoPoster: welcomePoster,
    tutorialHighlights: [
      'Click card to open detail view',
      'Watch larger animated preview',
      'Toggle extra magic options',
    ],
  },
  {
    id: 'upload-image',
    title: 'Apply to your image ✦',
    description: 'Switch to the "Your Image" tab to upload your photo. Drag and drop or click to browse. Once uploaded, go back to styles and click "Apply" to see your image transform with motion and magic.',
    targetSelector: '[data-tour="upload-tab"]',
    position: 'bottom',
    videoUrl: watermarkGif,
    videoPoster: welcomePoster,
    tutorialHighlights: [
      'Switch to "Your Image" tab',
      'Upload via drag-drop or browse',
      'Apply styles with one click',
    ],
  },
  {
    id: 'complete',
    title: 'You\'re ready to go ✦',
    description: 'That\'s the complete workflow! Pick styles, upload images, apply transformations, and export animated stickers. You can restart this tour anytime from settings.',
    targetSelector: 'body',
    position: 'center',
    videoUrl: welcomeVideo,
    videoPoster: welcomePoster,
    tutorialHighlights: [
      'Explore unlimited style combinations',
      'Download as animated GIF',
      'Create magic sticker packs',
    ],
  },
]

export function useOnboarding() {
  const [hasCompletedOnboarding, setHasCompletedOnboarding] = useKV<boolean>('onboarding-completed', false)
  const [currentStepIndex, setCurrentStepIndex] = useState(0)
  const [isActive, setIsActive] = useState(false)

  useEffect(() => {
    if (!hasCompletedOnboarding && !isActive) {
      const timer = setTimeout(() => {
        setIsActive(true)
      }, 1000)
      return () => clearTimeout(timer)
    }
  }, [hasCompletedOnboarding, isActive])

  const currentStep = isActive ? ONBOARDING_STEPS[currentStepIndex] : null

  const nextStep = () => {
    if (currentStepIndex < ONBOARDING_STEPS.length - 1) {
      setCurrentStepIndex((prev) => prev + 1)
    } else {
      completeOnboarding()
    }
  }

  const previousStep = () => {
    if (currentStepIndex > 0) {
      setCurrentStepIndex((prev) => prev - 1)
    }
  }

  const skipOnboarding = () => {
    setIsActive(false)
    setHasCompletedOnboarding(() => true)
  }

  const completeOnboarding = () => {
    setIsActive(false)
    setHasCompletedOnboarding(() => true)
  }

  const restartOnboarding = () => {
    setCurrentStepIndex(0)
    setIsActive(true)
    setHasCompletedOnboarding(() => false)
  }

  return {
    isActive,
    currentStep,
    currentStepIndex,
    totalSteps: ONBOARDING_STEPS.length,
    nextStep,
    previousStep,
    skipOnboarding,
    completeOnboarding,
    restartOnboarding,
    hasCompletedOnboarding,
  }
}
