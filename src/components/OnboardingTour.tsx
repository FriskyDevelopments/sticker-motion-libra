import { useOnboarding } from '@/hooks/use-onboarding'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { X, ArrowLeft, ArrowRight, Sparkle, Image as ImageIcon, Funnel, MagicWand, Rocket, Hand, Play } from '@phosphor-icons/react'
import { useEffect, useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const stepIcons = {
  'welcome': Rocket,
  'pick-style': Funnel,
  'preview-style': MagicWand,
  'upload-image': ImageIcon,
  'complete': Sparkle,
}

const stepColors = {
  'welcome': 'oklch(0.68 0.22 280)',
  'pick-style': 'oklch(0.72 0.19 320)',
  'preview-style': 'oklch(0.65 0.18 200)',
  'upload-image': 'oklch(0.70 0.16 170)',
  'complete': 'oklch(0.68 0.22 280)',
}

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
  const [isVideoPlaying, setIsVideoPlaying] = useState(false)
  const videoRef = useRef<HTMLVideoElement>(null)

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
          ? window.innerHeight / 2 - 180
          : rect.top + window.scrollY + rect.height / 2

        const tooltipLeft = currentStep.position === 'left'
          ? rect.left + window.scrollX - 450
          : currentStep.position === 'right'
          ? rect.right + window.scrollX + 20
          : currentStep.position === 'center'
          ? window.innerWidth / 2 - 250
          : rect.left + window.scrollX + rect.width / 2 - 250

        setTooltipPosition({
          top: tooltipTop,
          left: Math.max(20, Math.min(tooltipLeft, window.innerWidth - 520)),
        })
      } else {
        setTargetElement(null)
        setTooltipPosition({
          top: window.innerHeight / 2 - 180,
          left: window.innerWidth / 2 - 250,
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

  const StepIcon = stepIcons[currentStep.id as keyof typeof stepIcons] || Sparkle
  const stepColor = stepColors[currentStep.id as keyof typeof stepColors] || 'oklch(0.68 0.22 280)'

  return (
    <div className="fixed inset-0 z-[9999] pointer-events-none">
      <div className="fixed inset-0 bg-background/85 backdrop-blur-md pointer-events-auto" onClick={skipOnboarding} />
      
      <AnimatePresence mode="wait">
        {targetElement && currentStep.position !== 'center' && (
          <motion.div
            key={`highlight-${currentStep.id}`}
            className="absolute pointer-events-none"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.4, ease: 'easeOut' }}
            style={{
              top: highlightPosition.top - 12,
              left: highlightPosition.left - 12,
              width: highlightPosition.width + 24,
              height: highlightPosition.height + 24,
              border: '3px solid',
              borderColor: stepColor,
              borderRadius: '1.25rem',
              boxShadow: `
                0 0 0 6px ${stepColor}15,
                0 0 50px ${stepColor}40,
                inset 0 0 30px ${stepColor}15
              `,
            }}
          >
            <motion.div
              className="absolute inset-0 rounded-[1.25rem]"
              style={{
                border: '2px dashed',
                borderColor: stepColor,
                opacity: 0.3,
              }}
              animate={{
                rotate: [0, 360],
              }}
              transition={{
                duration: 20,
                repeat: Infinity,
                ease: 'linear',
              }}
            />
            
            {[...Array(3)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute inset-0 rounded-[1.25rem]"
                style={{
                  border: '2px solid',
                  borderColor: stepColor,
                  opacity: 0,
                }}
                animate={{
                  opacity: [0, 0.3, 0],
                  scale: [1, 1.15, 1.3],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  delay: i * 0.6,
                  ease: 'easeOut',
                }}
              />
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div
        key={`tooltip-${currentStep.id}`}
        className="absolute pointer-events-auto"
        initial={{ opacity: 0, y: 30, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: -20, scale: 0.95 }}
        transition={{ duration: 0.5, ease: [0.34, 1.56, 0.64, 1] }}
        style={{
          top: tooltipPosition.top,
          left: tooltipPosition.left,
        }}
      >
        <Card className="w-[500px] bg-card/98 backdrop-blur-xl border-2 border-primary/40 shadow-2xl relative overflow-hidden">
          <div 
            className="absolute top-0 left-0 right-0 h-1 opacity-80"
            style={{
              background: `linear-gradient(90deg, ${stepColor}, ${stepColor}80, ${stepColor})`,
            }}
          />
          
          <div 
            className="absolute inset-0 opacity-5 pointer-events-none"
            style={{
              background: `radial-gradient(circle at 20% 20%, ${stepColor} 0%, transparent 50%)`,
            }}
          />
          
          <CardContent className="p-8 space-y-6 relative">
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-4">
                  <motion.div
                    className="relative"
                    animate={{
                      rotate: [0, 5, -5, 0],
                      scale: [1, 1.1, 1.1, 1],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: 'easeInOut',
                    }}
                  >
                    <div 
                      className="absolute inset-0 rounded-xl opacity-30 blur-xl"
                      style={{ backgroundColor: stepColor }}
                    />
                    <div 
                      className="relative rounded-xl p-3"
                      style={{
                        backgroundColor: `${stepColor}20`,
                        border: `2px solid ${stepColor}40`,
                      }}
                    >
                      <StepIcon 
                        size={32} 
                        weight="duotone" 
                        style={{ color: stepColor }}
                      />
                    </div>
                  </motion.div>
                  
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold text-foreground leading-tight">
                      {currentStep.title}
                    </h3>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-xs font-medium text-muted-foreground">
                        Step {currentStepIndex + 1} of {totalSteps}
                      </span>
                      <div className="flex gap-1">
                        {Array.from({ length: totalSteps }).map((_, index) => (
                          <motion.div
                            key={index}
                            className="h-1 w-6 rounded-full"
                            style={{
                              backgroundColor: index <= currentStepIndex ? stepColor : 'oklch(0.28 0.025 260)',
                            }}
                            initial={false}
                            animate={{
                              scale: index === currentStepIndex ? [1, 1.2, 1] : 1,
                            }}
                            transition={{
                              duration: 0.8,
                              repeat: index === currentStepIndex ? Infinity : 0,
                              ease: 'easeInOut',
                            }}
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                <p className="text-base text-muted-foreground leading-relaxed">
                  {currentStep.description}
                </p>
                
                {currentStep.tutorialHighlights && currentStep.tutorialHighlights.length > 0 && (
                  <motion.div
                    className="mt-5 space-y-2"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                  >
                    {currentStep.tutorialHighlights.map((highlight, index) => (
                      <motion.div
                        key={index}
                        className="flex items-start gap-3 text-sm"
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.3 + index * 0.1 }}
                      >
                        <div 
                          className="mt-0.5 w-1.5 h-1.5 rounded-full flex-shrink-0"
                          style={{ backgroundColor: stepColor }}
                        />
                        <span className="text-foreground/80 leading-relaxed">{highlight}</span>
                      </motion.div>
                    ))}
                  </motion.div>
                )}
                
                {currentStep.videoUrl && (
                  <motion.div
                    className="relative mt-6"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                  >
                    <div className="mb-3 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div 
                          className="w-2 h-2 rounded-full animate-pulse"
                          style={{ backgroundColor: stepColor }}
                        />
                        <span className="text-sm font-semibold text-foreground">
                          Video Tutorial
                        </span>
                      </div>
                      <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-muted/40 border border-border/30">
                        <Sparkle size={12} weight="fill" style={{ color: stepColor }} />
                        <span className="text-xs font-medium text-muted-foreground">
                          Step {currentStepIndex + 1}
                        </span>
                      </div>
                    </div>
                    
                    <div className="relative rounded-xl overflow-hidden border-2 border-border/50 video-glow">
                      {currentStep.videoUrl.endsWith('.gif') ? (
                        <img 
                          src={currentStep.videoUrl} 
                          alt={`${currentStep.title} tutorial`}
                          className="w-full h-auto"
                        />
                      ) : (
                        <>
                          <video
                            ref={videoRef}
                            className="w-full h-auto"
                            poster={currentStep.videoPoster}
                            loop
                            muted
                            playsInline
                            onPlay={() => setIsVideoPlaying(true)}
                            onPause={() => setIsVideoPlaying(false)}
                            onEnded={() => setIsVideoPlaying(false)}
                            autoPlay
                          >
                            <source src={currentStep.videoUrl} type="video/mp4" />
                          </video>
                          
                          {!isVideoPlaying && (
                            <motion.button
                              className="absolute inset-0 flex items-center justify-center bg-background/60 backdrop-blur-sm cursor-pointer group"
                              onClick={() => videoRef.current?.play()}
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              exit={{ opacity: 0 }}
                              whileHover={{ backgroundColor: 'oklch(0.12 0.015 260 / 0.7)' }}
                            >
                              <motion.div
                                className="relative"
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.95 }}
                              >
                                <div 
                                  className="absolute inset-0 rounded-full opacity-40 blur-2xl"
                                  style={{ backgroundColor: stepColor }}
                                />
                                <div 
                                  className="relative w-20 h-20 rounded-full bg-primary/95 backdrop-blur flex items-center justify-center border-2"
                                  style={{
                                    borderColor: stepColor,
                                    boxShadow: `0 10px 50px ${stepColor}70`,
                                  }}
                                >
                                  <Play size={36} weight="fill" className="text-primary-foreground ml-1" />
                                </div>
                              </motion.div>
                            </motion.button>
                          )}
                        </>
                      )}
                      
                      <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between pointer-events-none">
                        <div 
                          className="flex items-center gap-2 px-3 py-1.5 rounded-full backdrop-blur-md border"
                          style={{
                            backgroundColor: 'oklch(0.12 0.015 260 / 0.8)',
                            borderColor: `${stepColor}40`,
                          }}
                        >
                          <Sparkle size={14} weight="fill" style={{ color: stepColor }} />
                          <span className="text-xs font-medium text-foreground">
                            {currentStep.videoUrl.endsWith('.gif') 
                              ? 'Animated guide' 
                              : isVideoPlaying 
                              ? 'Tutorial playing...' 
                              : 'Click to play'}
                          </span>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </div>

              <Button
                variant="ghost"
                size="icon"
                className="h-9 w-9 rounded-full hover:bg-destructive/20 hover:text-destructive -mt-1"
                onClick={skipOnboarding}
              >
                <X size={20} weight="bold" />
              </Button>
            </div>

            {currentStep.position === 'center' && !currentStep.videoUrl && (
              <motion.div
                className="flex items-center justify-center py-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <div className="relative">
                  {[...Array(8)].map((_, i) => (
                    <motion.div
                      key={i}
                      className="absolute"
                      style={{
                        left: '50%',
                        top: '50%',
                        marginLeft: '-4px',
                        marginTop: '-4px',
                      }}
                      animate={{
                        x: Math.cos((i / 8) * Math.PI * 2) * 60,
                        y: Math.sin((i / 8) * Math.PI * 2) * 60,
                        opacity: [0, 1, 0],
                        scale: [0, 1, 0],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        delay: i * 0.1,
                        ease: 'easeOut',
                      }}
                    >
                      <Sparkle size={16} weight="fill" style={{ color: stepColor }} />
                    </motion.div>
                  ))}
                  
                  <motion.div
                    animate={{
                      rotate: 360,
                      scale: [1, 1.1, 1],
                    }}
                    transition={{
                      rotate: { duration: 4, repeat: Infinity, ease: 'linear' },
                      scale: { duration: 2, repeat: Infinity, ease: 'easeInOut' },
                    }}
                  >
                    <Hand size={48} weight="duotone" style={{ color: stepColor }} />
                  </motion.div>
                </div>
              </motion.div>
            )}

            <div className="flex items-center justify-between pt-2 border-t border-border/50">
              <div className="flex items-center gap-2">
                {currentStepIndex > 0 && (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={previousStep}
                    className="gap-2 border-border/50 hover:border-border"
                  >
                    <ArrowLeft size={16} weight="bold" />
                    Back
                  </Button>
                )}
              </div>
              
              <div className="flex items-center gap-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={skipOnboarding}
                  className="text-muted-foreground hover:text-foreground"
                >
                  Skip tour
                </Button>
                
                <Button
                  size="sm"
                  onClick={nextStep}
                  className="gap-2 relative overflow-hidden group"
                  style={{
                    backgroundColor: stepColor,
                    color: 'white',
                  }}
                >
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="absolute inset-0 bg-white/20" />
                  </div>
                  <span className="relative z-10">
                    {currentStepIndex === totalSteps - 1 ? (
                      <>
                        Finish ✦
                      </>
                    ) : (
                      <>
                        Next
                        <ArrowRight size={16} weight="bold" />
                      </>
                    )}
                  </span>
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}
