import { useKV } from '@github/spark/hooks'
import { useEffect, useState } from 'react'
import welcomeVideo from '@/assets/video/stix-magic.mp4'
import welcomePoster from '@/assets/images/stix-magic-poster.png'

export type OnboardingStep = {
  id: string
  title: string
  description: string
  targetSelector: string
  position: 'top' | 'bottom' | 'left' | 'right' | 'center'
  action?: string
  videoUrl?: string
  videoPoster?: string
}

const ONBOARDING_STEPS: OnboardingStep[] = [
  {
    id: 'welcome',
    title: 'Welcome to STIX MAGIC ✦',
    description: 'Transform any image into animated magic with ready-made styles. Watch this quick intro to see how it works.',
    targetSelector: 'body',
    position: 'center',
    videoUrl: welcomeVideo,
    videoPoster: welcomePoster,
  },
  {
    id: 'pick-style',
    title: 'Pick a style ✦',
    description: 'Browse our curated collection of animated styles. Each one combines edge finish and motion into a ready-made result. Click any card to see the magic in action.',
    targetSelector: '[data-tour="style-gallery"]',
    position: 'top',
    videoUrl: welcomeVideo,
    videoPoster: welcomePoster,
  },
  {
    id: 'preview-style',
    title: 'See it come to life',
    description: 'Click any style card to preview it in detail and see how the motion and finish work together. Every style is fully animated and ready to apply.',
    targetSelector: '[data-tour="style-card"]',
    position: 'bottom',
    videoUrl: welcomeVideo,
    videoPoster: welcomePoster,
  },
  {
    id: 'upload-image',
    title: 'Apply to your image ✦',
    description: 'Switch to the "Your Image" tab to upload your photo. Once uploaded, apply any style with one click and watch your image transform into an animated sticker.',
    targetSelector: '[data-tour="upload-tab"]',
    position: 'bottom',
    videoUrl: welcomeVideo,
    videoPoster: welcomePoster,
  },
  {
    id: 'complete',
    title: 'You\'re ready to go ✦',
    description: 'That\'s it! Pick a style, upload your image, and watch the magic happen. Your transformed sticker will be ready to download as an animated GIF or share online.',
    targetSelector: 'body',
    position: 'center',
    videoUrl: welcomeVideo,
    videoPoster: welcomePoster,
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
