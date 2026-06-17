import { motion, type TargetAndTransition } from 'framer-motion'
import { MotionPreset } from '@/lib/motionPresets'

interface AnimatedPreviewProps {
  preset: MotionPreset
  className?: string
}

interface AnimationConfig {
  animate: TargetAndTransition
}

const getAnimationVariants = (preset: MotionPreset): AnimationConfig => {
  switch (preset.id) {
    case 'breathing-glow':
      return {
        animate: {
          filter: ['drop-shadow(0 0 10px oklch(0.75 0.15 200 / 0.3))', 'drop-shadow(0 0 25px oklch(0.75 0.15 200 / 0.7))', 'drop-shadow(0 0 10px oklch(0.75 0.15 200 / 0.3))'],
          scale: [1, 1.08, 1],
          transition: { duration: 3, repeat: Infinity, ease: 'easeInOut' }
        }
      }
    
    case 'flicker':
      return {
        animate: {
          opacity: [1, 0.7, 1, 0.8, 1, 0.75, 1],
          transition: { duration: 0.8, repeat: Infinity, times: [0, 0.1, 0.2, 0.4, 0.5, 0.7, 1] }
        }
      }
    
    case 'shimmer':
      return {
        animate: {
          backgroundPosition: ['200% 0', '-200% 0'],
          transition: { duration: 2, repeat: Infinity, repeatDelay: 3, ease: 'linear' }
        }
      }
    
    case 'pulse-ring':
      return {
        animate: {
          scale: [1, 2.2, 1],
          opacity: [0.8, 0, 0.8],
          transition: { duration: 1.5, repeat: Infinity, repeatDelay: 0.5 }
        }
      }
    
    case 'lightning-flash':
      return {
        animate: {
          filter: [
            'brightness(1)',
            'brightness(2.5) drop-shadow(0 0 20px oklch(0.75 0.15 200))',
            'brightness(1)',
            'brightness(2) drop-shadow(0 0 15px oklch(0.75 0.15 200))',
            'brightness(1)'
          ],
          transition: { duration: 0.6, repeat: Infinity, repeatDelay: 3, times: [0, 0.1, 0.2, 0.3, 1] }
        }
      }
    
    case 'spin':
      return {
        animate: {
          rotate: [0, 360],
          transition: { duration: 4, repeat: Infinity, ease: 'linear' }
        }
      }
    
    case 'wobble':
      return {
        animate: {
          rotate: [-12, 12, -12],
          transition: { duration: 2, repeat: Infinity, ease: 'easeInOut' }
        }
      }
    
    case 'orbit':
      return {
        animate: {
          rotate: [0, 360],
          transition: { duration: 3, repeat: Infinity, ease: 'linear' }
        }
      }
    
    case 'spiral':
      return {
        animate: {
          rotate: [0, 360],
          scale: [0.95, 1.08, 0.95],
          transition: { duration: 5, repeat: Infinity, ease: 'easeInOut' }
        }
      }
    
    case 'bounce':
      return {
        animate: {
          y: [0, -25, 0],
          scaleY: [1, 1, 0.9, 1],
          transition: { duration: 1.2, repeat: Infinity, ease: 'easeOut', times: [0, 0.4, 0.6, 1] }
        }
      }
    
    case 'heartbeat':
      return {
        animate: {
          scale: [1, 1.15, 1, 1.08, 1],
          transition: { duration: 1.2, repeat: Infinity, repeatDelay: 0.8, times: [0, 0.15, 0.25, 0.35, 1] }
        }
      }
    
    case 'elastic-pop':
      return {
        animate: {
          scale: [1, 1.3, 0.9, 1.05, 1],
          transition: { duration: 0.6, repeat: Infinity, repeatDelay: 2, times: [0, 0.3, 0.5, 0.8, 1] }
        }
      }
    
    case 'sway':
      return {
        animate: {
          x: [-8, 8, -8],
          rotate: [-5, 5, -5],
          transition: { duration: 3.5, repeat: Infinity, ease: 'easeInOut' }
        }
      }
    
    case 'rgb-glitch':
      return {
        animate: {
          x: [0, -3, 3, -2, 0],
          filter: [
            'none',
            'drop-shadow(-5px 0 0 red) drop-shadow(5px 0 0 cyan)',
            'none',
            'drop-shadow(3px 0 0 red) drop-shadow(-3px 0 0 cyan)',
            'none'
          ],
          transition: { duration: 0.4, repeat: Infinity, repeatDelay: 1.5, times: [0, 0.2, 0.4, 0.7, 1] }
        }
      }
    
    case 'static-noise':
      return {
        animate: {
          opacity: [1, 0.7, 1, 0.8, 1],
          filter: ['blur(0px)', 'blur(1px)', 'blur(0px)', 'blur(0.5px)', 'blur(0px)'],
          transition: { duration: 0.3, repeat: Infinity, repeatDelay: 2 }
        }
      }
    
    case 'data-corrupt':
      return {
        animate: {
          x: [0, -8, 5, -3, 0],
          scaleX: [1, 1.05, 0.98, 1.02, 1],
          transition: { duration: 0.3, repeat: Infinity, repeatDelay: 2.5 }
        }
      }
    
    case 'sparkle-burst':
      return {
        animate: {
          scale: [1, 1.1, 1],
          filter: [
            'drop-shadow(0 0 0px oklch(0.75 0.15 200))',
            'drop-shadow(0 0 15px oklch(0.75 0.15 200)) drop-shadow(0 0 25px oklch(0.70 0.18 290))',
            'drop-shadow(0 0 0px oklch(0.75 0.15 200))'
          ],
          transition: { duration: 0.8, repeat: Infinity, repeatDelay: 1.5 }
        }
      }
    
    case 'confetti-rain':
      return {
        animate: {
          y: [0, 15, 0],
          x: [-3, 3, -3],
          rotate: [0, 180, 360],
          transition: { duration: 2.5, repeat: Infinity, ease: 'easeInOut' }
        }
      }
    
    case 'cloud-drift':
      return {
        animate: {
          x: [-30, 30, -30],
          transition: { duration: 10, repeat: Infinity, ease: 'linear' }
        }
      }
    
    case 'pixel-trail':
      return {
        animate: {
          x: [-5, 5, -5],
          filter: [
            'drop-shadow(5px 0 0 oklch(0.75 0.15 200 / 0.6))',
            'drop-shadow(-5px 0 0 oklch(0.75 0.15 200 / 0.6))',
            'drop-shadow(5px 0 0 oklch(0.75 0.15 200 / 0.6))'
          ],
          transition: { duration: 2, repeat: Infinity, ease: 'easeInOut' }
        }
      }
    
    case 'blink':
      return {
        animate: {
          scaleY: [1, 0.1, 1],
          transition: { duration: 0.24, repeat: Infinity, repeatDelay: 4, times: [0, 0.33, 1] }
        }
      }
    
    case 'eye-shift':
      return {
        animate: {
          x: [0, 8, 0, -8, 0],
          transition: { duration: 3, repeat: Infinity, times: [0, 0.2, 0.5, 0.7, 1] }
        }
      }
    
    case 'smile-grow':
      return {
        animate: {
          scaleX: [1, 1.3, 1],
          scaleY: [1, 1.1, 1],
          transition: { duration: 0.4, repeat: Infinity, repeatDelay: 2.5 }
        }
      }
    
    case 'head-tilt':
      return {
        animate: {
          rotate: [0, -15, 0, 15, 0],
          transition: { duration: 4, repeat: Infinity, ease: 'easeInOut' }
        }
      }
    
    case 'cheek-blush':
      return {
        animate: {
          opacity: [0, 0.8, 0.6, 0.8],
          scale: [0.8, 1, 1, 1],
          transition: { duration: 2, repeat: Infinity, ease: 'easeInOut' }
        }
      }
    
    default:
      return {
        animate: {
          scale: [1, 1.05, 1],
          transition: { duration: 2, repeat: Infinity }
        }
      }
  }
}

export function AnimatedPreview({ preset, className = '' }: AnimatedPreviewProps) {
  const variants = getAnimationVariants(preset)
  
  const isShimmer = preset.id === 'shimmer'
  const isOrbit = preset.id === 'orbit'
  const isPulseRing = preset.id === 'pulse-ring'
  
  return (
    <div className={`relative flex items-center justify-center ${className}`}>
      {isPulseRing && (
        <motion.div
          className="absolute w-16 h-16 rounded-full border-2 border-accent"
          {...variants}
        />
      )}
      
      {isOrbit && (
        <motion.div
          className="absolute w-full h-full"
          {...variants}
        >
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-accent" />
        </motion.div>
      )}
      
      <motion.div
        className={`w-16 h-16 rounded-2xl bg-gradient-to-br from-primary via-secondary to-accent flex items-center justify-center text-2xl ${
          isShimmer ? 'relative overflow-hidden' : ''
        }`}
        {...variants}
      >
        {isShimmer && (
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
            style={{ backgroundSize: '200% 100%' }}
            animate={{
              backgroundPosition: ['200% 0', '-200% 0']
            }}
            transition={{ duration: 2, repeat: Infinity, repeatDelay: 3, ease: 'linear' }}
          />
        )}
        ✨
      </motion.div>
    </div>
  )
}
