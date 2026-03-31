import { useKV } from '@github/spark/hooks'
import { useEffect, useState } from 'react'
import welcomeVideo from '@/assets/video/stix-magic.mp4'
import welcomePoster from '@/assets/images/stix-magic-poster.png'
import styleGalleryGif from '@/assets/images/gemini_generated_video_7DC02353.gif'
import transformationGif from '@/assets/images/Untitled_2.gif'
import watermarkGif from '@/assets/images/4E8234E0-7702-4E37-9300-B345284E630F_2026-03-21T12-29-00_create_a_minimal__watermarked_2.gif'

export type VideoHotspot = {
  id: string
  timeRange: [number, number]
  position: {
    x: number
    y: number
  }
  title: string
  description: string
  icon?: 'sparkle' | 'info' | 'hand' | 'arrow'
  color?: string
}

export type VideoAnnotation = {
  time: number
  text: string
  position?: 'top' | 'bottom' | 'center'
}

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
  hotspots?: VideoHotspot[]
  annotations?: VideoAnnotation[]
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
    annotations: [
      { time: 1, text: 'Watch the magic unfold ✦' },
      { time: 3, text: 'Multiple styles in one place' },
      { time: 6, text: 'Easy to use workflow' },
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
    hotspots: [
      {
        id: 'style-preview',
        timeRange: [0, 3],
        position: { x: 50, y: 40 },
        title: 'Live Preview',
        description: 'Each card shows the style in motion so you know exactly what you\'re getting',
        icon: 'sparkle',
        color: 'oklch(0.68 0.22 280)',
      },
      {
        id: 'vibe-tags',
        timeRange: [2, 5],
        position: { x: 50, y: 70 },
        title: 'Vibe Tags',
        description: 'Tags help you find the right mood - magical, playful, neon, or dreamy',
        icon: 'info',
        color: 'oklch(0.72 0.19 320)',
      },
    ],
    annotations: [
      { time: 0.5, text: 'Hover to see style cards' },
      { time: 3, text: 'Multiple categories available' },
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
    hotspots: [
      {
        id: 'detail-preview',
        timeRange: [0, 4],
        position: { x: 50, y: 30 },
        title: 'Larger Preview',
        description: 'See the full animation in detail before applying',
        icon: 'sparkle',
        color: 'oklch(0.65 0.18 200)',
      },
      {
        id: 'extra-magic',
        timeRange: [3, 6],
        position: { x: 50, y: 75 },
        title: 'Extra Magic Toggle',
        description: 'Fine-tune energy, speed, and effect intensity',
        icon: 'hand',
        color: 'oklch(0.70 0.16 170)',
      },
    ],
    annotations: [
      { time: 1, text: 'Click any card to expand' },
      { time: 4, text: 'Customize with extra magic ✧' },
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
    hotspots: [
      {
        id: 'upload-zone',
        timeRange: [0, 3],
        position: { x: 50, y: 40 },
        title: 'Upload Zone',
        description: 'Drag and drop your image or click to browse',
        icon: 'arrow',
        color: 'oklch(0.68 0.22 280)',
      },
      {
        id: 'apply-button',
        timeRange: [3, 6],
        position: { x: 70, y: 85 },
        title: 'Apply Style',
        description: 'Click to transform your image with the selected style',
        icon: 'hand',
        color: 'oklch(0.72 0.19 320)',
      },
    ],
    annotations: [
      { time: 1, text: 'Upload your image ○' },
      { time: 4, text: 'Magic applied ✦' },
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
    annotations: [
      { time: 2, text: 'Start creating magic ✦' },
      { time: 5, text: 'Share your creations' },
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
