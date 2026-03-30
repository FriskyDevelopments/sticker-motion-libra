import { useKV } from '@github/spark/hooks'
import { useEffect, useState } from 'react'

export type OnboardingStep = {
  id: string
  title: string
  description: string
  targetSelector: string
  position: 'top' | 'bottom' | 'left' | 'right' | 'center'
  action?: string
}

const ONBOARDING_STEPS: OnboardingStep[] = [
  {
    id: 'welcome',
    title: 'Welcome to STIX MAGIC ✦',
    description: 'Transform any image into animated magic with ready-made styles. Let\'s explore the three simple steps to create your sticker.',
    targetSelector: 'body',
    position: 'center',
  },
  {
    id: 'pick-style',
    title: 'Pick a style ✦',
    description: 'Browse our curated collection of animated styles. Each one combines edge finish and motion into a ready-made result.',
    targetSelector: '[data-tour="style-gallery"]',
    position: 'top',
  },
  {
    id: 'preview-style',
    title: 'See it come to life',
    description: 'Click any style card to preview it in detail and see how the motion and finish work together.',
    targetSelector: '[data-tour="style-card"]',
    position: 'bottom',
  },
  {
    id: 'upload-image',
    title: 'Apply to your image ✦',
    description: 'Ready to create? Switch to the "Your Image" tab to upload your photo and apply any style with one click.',
    targetSelector: '[data-tour="upload-tab"]',
    position: 'bottom',
  },
  {
    id: 'complete',
    title: 'You\'re ready to go ✦',
    description: 'That\'s it! Pick a style, upload your image, and watch the magic happen. Your transformed sticker will be ready to download as an animated GIF.',
    targetSelector: 'body',
    position: 'center',
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
