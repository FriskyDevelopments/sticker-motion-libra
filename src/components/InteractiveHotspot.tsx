import { motion, AnimatePresence } from 'framer-motion'
import { useState, useEffect } from 'react'
import { X, Sparkle } from '@phosphor-icons/react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

interface InteractiveHotspotProps {
  id: string
  title: string
  description: string
  position?: 'top' | 'bottom' | 'left' | 'right'
  autoShow?: boolean
  delay?: number
  persistent?: boolean
  className?: string
  children?: React.ReactNode
}

export function InteractiveHotspot({
  id,
  title,
  description,
  position = 'top',
  autoShow = false,
  delay = 0,
  persistent = false,
  className,
  children
}: InteractiveHotspotProps) {
  const [isVisible, setIsVisible] = useState(false)
  const [hasBeenSeen, setHasBeenSeen] = useState(false)
  const [isDismissed, setIsDismissed] = useState(false)

  useEffect(() => {
    const seenKey = `hotspot-seen-${id}`
    const seen = localStorage.getItem(seenKey) === 'true'
    setHasBeenSeen(seen)

    if (autoShow && !seen && !isDismissed) {
      const timer = setTimeout(() => {
        setIsVisible(true)
      }, delay)
      return () => clearTimeout(timer)
    }
  }, [id, autoShow, delay, isDismissed])

  const handleDismiss = () => {
    setIsVisible(false)
    setIsDismissed(true)
    if (!persistent) {
      localStorage.setItem(`hotspot-seen-${id}`, 'true')
      setHasBeenSeen(true)
    }
  }

  const handleInteract = () => {
    if (!isVisible) {
      setIsVisible(true)
    }
  }

  const tooltipPositionClasses = {
    top: 'bottom-full left-1/2 -translate-x-1/2 mb-3',
    bottom: 'top-full left-1/2 -translate-x-1/2 mt-3',
    left: 'right-full top-1/2 -translate-y-1/2 mr-3',
    right: 'left-full top-1/2 -translate-y-1/2 ml-3'
  }

  const arrowPositionClasses = {
    top: 'top-full left-1/2 -translate-x-1/2 -mt-[1px]',
    bottom: 'bottom-full left-1/2 -translate-x-1/2 -mb-[1px]',
    left: 'left-full top-1/2 -translate-y-1/2 -ml-[1px]',
    right: 'right-full top-1/2 -translate-y-1/2 -mr-[1px]'
  }

  const arrowRotation = {
    top: 'rotate-180',
    bottom: 'rotate-0',
    left: 'rotate-90',
    right: '-rotate-90'
  }

  if (hasBeenSeen && !persistent && !isVisible) return null

  return (
    <div className={cn('relative inline-block', className)}>
      <motion.div
        className="relative"
        whileHover={{ scale: 1.05 }}
        transition={{ type: 'spring', stiffness: 400, damping: 20 }}
      >
        <div onClick={handleInteract}>
          {children}
        </div>

        <motion.div
          className="absolute -top-1 -right-1 pointer-events-none"
          initial={{ scale: 0, opacity: 0 }}
          animate={
            !hasBeenSeen || persistent
              ? {
                  scale: [1, 1.3, 1],
                  opacity: [0.8, 1, 0.8]
                }
              : { scale: 0, opacity: 0 }
          }
          transition={{
            duration: 2,
            repeat: Infinity,
            repeatDelay: 1
          }}
        >
          <div className="relative">
            <Sparkle
              size={20}
              weight="fill"
              className="text-accent drop-shadow-[0_0_8px_oklch(0.72_0.19_320/0.6)]"
            />
            <motion.div
              className="absolute inset-0 -z-10"
              animate={{
                scale: [1, 1.5, 1],
                opacity: [0.5, 0, 0.5]
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                repeatDelay: 1
              }}
            >
              <div className="w-full h-full rounded-full bg-accent/30 blur-md" />
            </motion.div>
          </div>
        </motion.div>
      </motion.div>

      <AnimatePresence>
        {isVisible && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: position === 'top' ? 10 : position === 'bottom' ? -10 : 0 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ type: 'spring', stiffness: 300, damping: 25 }}
            className={cn(
              'absolute z-50 w-72',
              tooltipPositionClasses[position]
            )}
          >
            <div className="relative">
              <div className="rounded-xl bg-card border-2 border-accent/40 shadow-2xl shadow-accent/20 p-4 backdrop-blur-xl">
                <div className="absolute -inset-[1px] rounded-xl bg-gradient-to-r from-accent/20 via-primary/20 to-accent/20 opacity-50 blur-sm -z-10" />
                
                <div className="flex items-start justify-between gap-3 mb-2">
                  <div className="flex items-start gap-2">
                    <Sparkle size={18} weight="duotone" className="text-accent mt-0.5 flex-shrink-0" />
                    <h4 className="font-bold text-sm gradient-text leading-tight">
                      {title}
                    </h4>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-6 w-6 -mt-1 -mr-1 flex-shrink-0"
                    onClick={handleDismiss}
                  >
                    <X size={14} weight="bold" />
                  </Button>
                </div>

                <p className="text-xs text-muted-foreground leading-relaxed">
                  {description}
                </p>

                <div className="mt-3 pt-3 border-t border-border/50">
                  <Button
                    size="sm"
                    variant="outline"
                    className="w-full text-xs gap-1.5 border-accent/30 hover:bg-accent/10 hover:border-accent/50"
                    onClick={handleDismiss}
                  >
                    Got it ✦
                  </Button>
                </div>
              </div>

              <div className={cn('absolute w-3 h-3', arrowPositionClasses[position])}>
                <div className={cn('w-3 h-3 bg-card border-accent/40 rotate-45', arrowRotation[position])} style={{
                  borderWidth: position === 'top' ? '0 2px 2px 0' : position === 'bottom' ? '2px 0 0 2px' : position === 'left' ? '2px 2px 0 0' : '0 0 2px 2px'
                }} />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
