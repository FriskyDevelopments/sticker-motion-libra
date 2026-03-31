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
    hotspots: [
      {
        id: 'intro-styles',
        timeRange: [0.5, 3],
        position: { x: 30, y: 45 },
        title: 'Style Gallery',
        description: 'Discover dozens of animated styles ready to apply',
        icon: 'sparkle',
        color: 'oklch(0.68 0.22 280)',
      },
      {
        id: 'intro-upload',
        timeRange: [3, 6],
        position: { x: 70, y: 45 },
        title: 'Image Upload',
        description: 'Transform your photos with one-click magic',
        icon: 'arrow',
        color: 'oklch(0.72 0.19 320)',
      },
      {
        id: 'intro-export',
        timeRange: [6, 9],
        position: { x: 50, y: 70 },
        title: 'Export & Share',
        description: 'Download as animated GIF and share your creations',
        icon: 'hand',
        color: 'oklch(0.65 0.18 200)',
      },
    ],
    annotations: [
      { time: 1, text: 'Watch the magic unfold ✦' },
      { time: 3, text: 'Multiple styles in one place' },
      { time: 6, text: 'Easy to use workflow' },
      { time: 9, text: 'Let\'s get started!' },
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
      'Click any card to see details',
    ],
    hotspots: [
      {
        id: 'style-preview',
        timeRange: [0, 4],
        position: { x: 35, y: 40 },
        title: 'Live Preview',
        description: 'Each card shows the style in motion so you know exactly what you\'re getting',
        icon: 'sparkle',
        color: 'oklch(0.68 0.22 280)',
      },
      {
        id: 'vibe-tags',
        timeRange: [2, 6],
        position: { x: 35, y: 70 },
        title: 'Vibe Tags',
        description: 'Tags help you find the right mood - magical, playful, neon, or dreamy',
        icon: 'info',
        color: 'oklch(0.72 0.19 320)',
      },
      {
        id: 'style-name',
        timeRange: [1, 5],
        position: { x: 65, y: 40 },
        title: 'Style Name',
        description: 'Each style has a unique name reflecting its personality',
        icon: 'info',
        color: 'oklch(0.65 0.18 200)',
      },
      {
        id: 'click-card',
        timeRange: [4, 8],
        position: { x: 65, y: 70 },
        title: 'Click to Explore',
        description: 'Click any card to see a larger preview and more details',
        icon: 'hand',
        color: 'oklch(0.70 0.16 170)',
      },
    ],
    annotations: [
      { time: 0.5, text: 'Hover to see style cards' },
      { time: 3, text: 'Multiple categories available' },
      { time: 6, text: 'Each style is unique ✦' },
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
      'Adjust energy and speed',
    ],
    hotspots: [
      {
        id: 'detail-preview',
        timeRange: [0, 4],
        position: { x: 50, y: 25 },
        title: 'Larger Preview',
        description: 'See the full animation in detail before applying',
        icon: 'sparkle',
        color: 'oklch(0.65 0.18 200)',
      },
      {
        id: 'style-description',
        timeRange: [1, 5],
        position: { x: 30, y: 55 },
        title: 'Description',
        description: 'Learn what makes this style unique and when to use it',
        icon: 'info',
        color: 'oklch(0.68 0.22 280)',
      },
      {
        id: 'extra-magic',
        timeRange: [3, 7],
        position: { x: 70, y: 55 },
        title: 'Extra Magic Toggle',
        description: 'Fine-tune energy, speed, and effect intensity',
        icon: 'hand',
        color: 'oklch(0.70 0.16 170)',
      },
      {
        id: 'apply-button-detail',
        timeRange: [5, 9],
        position: { x: 50, y: 85 },
        title: 'Apply to Image',
        description: 'Click to apply this style to your uploaded image',
        icon: 'arrow',
        color: 'oklch(0.72 0.19 320)',
      },
    ],
    annotations: [
      { time: 1, text: 'Click any card to expand' },
      { time: 4, text: 'Customize with extra magic ✧' },
      { time: 7, text: 'Ready to apply ✦' },
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
      'Watch transformation happen',
    ],
    hotspots: [
      {
        id: 'upload-tab',
        timeRange: [0, 2],
        position: { x: 60, y: 15 },
        title: 'Your Image Tab',
        description: 'Switch to this tab to upload your photo',
        icon: 'arrow',
        color: 'oklch(0.72 0.19 320)',
      },
      {
        id: 'upload-zone',
        timeRange: [2, 5],
        position: { x: 50, y: 40 },
        title: 'Upload Zone',
        description: 'Drag and drop your image or click to browse',
        icon: 'hand',
        color: 'oklch(0.68 0.22 280)',
      },
      {
        id: 'background-removal',
        timeRange: [5, 8],
        position: { x: 30, y: 70 },
        title: 'Background Removal',
        description: 'Optional AI-powered background removal for cleaner stickers',
        icon: 'sparkle',
        color: 'oklch(0.65 0.18 200)',
      },
      {
        id: 'apply-style-upload',
        timeRange: [8, 11],
        position: { x: 70, y: 70 },
        title: 'Apply Style',
        description: 'Go to styles tab and click apply to transform your image',
        icon: 'arrow',
        color: 'oklch(0.70 0.16 170)',
      },
    ],
    annotations: [
      { time: 1, text: 'Upload your image ○' },
      { time: 5, text: 'Processing edge △' },
      { time: 8, text: 'Magic applied ✦' },
      { time: 11, text: 'Ready to export!' },
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
      'Restart tour from settings anytime',
    ],
    hotspots: [
      {
        id: 'final-styles',
        timeRange: [0, 3],
        position: { x: 25, y: 40 },
        title: 'Explore Styles',
        description: 'Try different styles to find your perfect match',
        icon: 'sparkle',
        color: 'oklch(0.68 0.22 280)',
      },
      {
        id: 'final-export',
        timeRange: [3, 6],
        position: { x: 50, y: 40 },
        title: 'Export Options',
        description: 'Download individual stickers or batch export',
        icon: 'arrow',
        color: 'oklch(0.72 0.19 320)',
      },
      {
        id: 'final-settings',
        timeRange: [6, 9],
        position: { x: 75, y: 40 },
        title: 'Settings',
        description: 'Access settings to restart tour or customize preferences',
        icon: 'info',
        color: 'oklch(0.65 0.18 200)',
      },
    ],
    annotations: [
      { time: 2, text: 'Start creating magic ✦' },
      { time: 5, text: 'Share your creations' },
      { time: 8, text: 'Have fun! ✦' },
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
