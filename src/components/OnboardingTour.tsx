import { useOnboarding } from '@/hooks/use-onboarding'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { X, ArrowLeft, ArrowRight, Sparkle } from '@phosphor-icons/react'
import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export function OnboardingTour() {
  const {
    isActive,
    currentStep,
    currentStepIndex,
    totalSteps,
    nextStep,
    previousStep,
    skipOnboarding,
  } = useOnboarding()

  const [targetElement, setTargetElement] = useState<HTMLElement | null>(null)
  const [highlightPosition, setHighlightPosition] = useState({ top: 0, left: 0, width: 0, height: 0 })
  const [tooltipPosition, setTooltipPosition] = useState({ top: 0, left: 0 })

  useEffect(() => {
    if (!isActive || !currentStep) {
      setTargetElement(null)
      return
    }

    const updatePositions = () => {
      const element = document.querySelector(currentStep.targetSelector)
      
      if (element instanceof HTMLElement) {
        setTargetElement(element)
        const rect = element.getBoundingClientRect()
        
        setHighlightPosition({
          top: rect.top + window.scrollY,
          left: rect.left + window.scrollX,
          width: rect.width,
          height: rect.height,
        })

        const tooltipTop = currentStep.position === 'top' 
          ? rect.top + window.scrollY - 20
          : currentStep.position === 'bottom'
          ? rect.bottom + window.scrollY + 20
          : currentStep.position === 'center'
          ? window.innerHeight / 2 - 150
          : rect.top + window.scrollY + rect.height / 2

        const tooltipLeft = currentStep.position === 'left'
          ? rect.left + window.scrollX - 400
          : currentStep.position === 'right'
          ? rect.right + window.scrollX + 20
          : currentStep.position === 'center'
          ? window.innerWidth / 2 - 200
          : rect.left + window.scrollX + rect.width / 2 - 200

        setTooltipPosition({
          top: tooltipTop,
          left: Math.max(20, Math.min(tooltipLeft, window.innerWidth - 420)),
        })
      } else {
        setTargetElement(null)
        setTooltipPosition({
          top: window.innerHeight / 2 - 150,
          left: window.innerWidth / 2 - 200,
        })
      }
    }

    updatePositions()
    window.addEventListener('resize', updatePositions)
    window.addEventListener('scroll', updatePositions)

    return () => {
      window.removeEventListener('resize', updatePositions)
      window.removeEventListener('scroll', updatePositions)
    }
  }, [isActive, currentStep])

  if (!isActive || !currentStep) return null

  return (
    <div className="fixed inset-0 z-[9999] pointer-events-none">
      <div className="fixed inset-0 bg-background/80 backdrop-blur-sm pointer-events-auto" onClick={skipOnboarding} />
      
      <AnimatePresence mode="wait">
        {targetElement && currentStep.position !== 'center' && (
          <motion.div
            key={`highlight-${currentStep.id}`}
            className="absolute pointer-events-none"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            style={{
              top: highlightPosition.top - 8,
              left: highlightPosition.left - 8,
              width: highlightPosition.width + 16,
              height: highlightPosition.height + 16,
              border: '3px solid',
              borderColor: 'oklch(0.68 0.22 280)',
              borderRadius: '1rem',
              boxShadow: `
                0 0 0 4px oklch(0.68 0.22 280 / 0.1),
                0 0 40px oklch(0.68 0.22 280 / 0.4),
                inset 0 0 20px oklch(0.68 0.22 280 / 0.15)
              `,
            }}
          />
        )}
      </AnimatePresence>

      <motion.div
        key={`tooltip-${currentStep.id}`}
        className="absolute pointer-events-auto"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.4, ease: 'easeOut' }}
        style={{
          top: tooltipPosition.top,
          left: tooltipPosition.left,
        }}
      >
        <Card className="w-[400px] bg-card/95 backdrop-blur-md border-2 border-primary/30 shadow-2xl">
          <CardContent className="p-6 space-y-4">
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-center gap-2">
                <Sparkle size={24} weight="duotone" className="text-primary animate-pulse" />
                <h3 className="text-lg font-bold text-foreground">
                  {currentStep.title}
                </h3>
              </div>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 -mt-1 -mr-1"
                onClick={skipOnboarding}
              >
                <X size={18} />
              </Button>
            </div>

            <p className="text-sm text-muted-foreground leading-relaxed">
              {currentStep.description}
            </p>

            <div className="flex items-center justify-between pt-2">
              <div className="text-xs text-muted-foreground font-medium">
                Step {currentStepIndex + 1} of {totalSteps}
              </div>

              <div className="flex items-center gap-2">
                {currentStepIndex > 0 && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={previousStep}
                    className="gap-2"
                  >
                    <ArrowLeft size={16} />
                    Back
                  </Button>
                )}
                
                <Button
                  size="sm"
                  onClick={nextStep}
                  className="gap-2 bg-primary hover:bg-primary/90"
                >
                  {currentStepIndex === totalSteps - 1 ? (
                    <>
                      Finish ✦
                    </>
                  ) : (
                    <>
                      Next
                      <ArrowRight size={16} />
                    </>
                  )}
                </Button>
              </div>
            </div>

            <div className="flex gap-1.5 pt-2">
              {Array.from({ length: totalSteps }).map((_, index) => (
                <div
                  key={index}
                  className={`h-1.5 flex-1 rounded-full transition-all duration-300 ${
                    index === currentStepIndex
                      ? 'bg-primary'
                      : index < currentStepIndex
                      ? 'bg-primary/50'
                      : 'bg-muted'
                  }`}
                />
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}
