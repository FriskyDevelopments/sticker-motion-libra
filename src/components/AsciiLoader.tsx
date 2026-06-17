import { useEffect, useState, useRef } from 'react'
import { asciiAnimations, heroLoadingScenes, getFrameAtTime } from '@/lib/asciiAnimations'
import { cn } from '@/lib/utils'

interface AsciiLoaderProps {
  animationKey: keyof typeof asciiAnimations
  className?: string
  onComplete?: () => void
  syncWithProgress?: number
}

export function AsciiLoader({ 
  animationKey, 
  className,
  onComplete,
  syncWithProgress
}: AsciiLoaderProps) {
  const animation = asciiAnimations[animationKey]
  const [currentFrame, setCurrentFrame] = useState(() => animation.frames[0]?.content || '')
  const startTimeRef = useRef<number>(0)
  const rafRef = useRef<number | undefined>(undefined)

  useEffect(() => {
    startTimeRef.current = Date.now()

    const animate = () => {
      const now = Date.now()
      const newElapsed = now - startTimeRef.current

      if (syncWithProgress !== undefined) {
        const totalDuration = animation.frames.reduce((sum, f) => sum + f.duration, 0)
        const progressElapsed = Math.floor(syncWithProgress * totalDuration)
        setCurrentFrame(getFrameAtTime(animation, progressElapsed))
      } else {
        setCurrentFrame(getFrameAtTime(animation, newElapsed))
      }

      const totalDuration = animation.frames.reduce((sum, f) => sum + f.duration, 0)
      
      if (!animation.loop && newElapsed >= totalDuration) {
        onComplete?.()
        return
      }

      rafRef.current = requestAnimationFrame(animate)
    }

    rafRef.current = requestAnimationFrame(animate)

    return () => {
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current)
      }
    }
  }, [animationKey, animation, onComplete, syncWithProgress])

  return (
    <div className={cn(
      'ascii-loader font-mono text-center select-none',
      'whitespace-pre leading-tight',
      className
    )}>
      {currentFrame}
    </div>
  )
}

interface HeroLoaderProps {
  sceneKey: keyof typeof heroLoadingScenes
  className?: string
  onComplete?: () => void
}

export function HeroLoader({ sceneKey, className, onComplete }: HeroLoaderProps) {
  const scene = heroLoadingScenes[sceneKey]
  const [currentFrame, setCurrentFrame] = useState(scene.frames[0].content)

  useEffect(() => {
    setCurrentFrame(scene.frames[0].content)

    let currentIndex = 0
    let timeoutId: ReturnType<typeof setTimeout>

    const showNextFrame = () => {
      if (currentIndex >= scene.frames.length - 1) {
        onComplete?.()
        currentIndex = 0
      } else {
        currentIndex++
      }
      
      setCurrentFrame(scene.frames[currentIndex].content)
      
      if (currentIndex < scene.frames.length - 1 || scene.frames.length > 1) {
        timeoutId = setTimeout(showNextFrame, scene.frames[currentIndex].duration)
      }
    }

    timeoutId = setTimeout(showNextFrame, scene.frames[0].duration)

    return () => {
      clearTimeout(timeoutId)
    }
  }, [sceneKey, scene, onComplete])

  return (
    <div className={cn(
      'hero-loader font-mono text-center select-none',
      'whitespace-pre leading-tight text-lg',
      className
    )}>
      {currentFrame}
    </div>
  )
}

interface InlineLoaderProps {
  type: 'dots' | 'circles' | 'sparkles'
  className?: string
}

export function InlineLoader({ type, className }: InlineLoaderProps) {
  const [frame, setFrame] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setFrame(f => (f + 1) % 4)
    }, 200)

    return () => clearInterval(interval)
  }, [])

  const getSymbol = () => {
    if (type === 'dots') {
      return ['·', '··', '···', '····'][frame]
    }
    if (type === 'circles') {
      return ['◌', '○', '◌', '○'][frame]
    }
    return ['✦', '✧', '✦', '✧'][frame]
  }

  return (
    <span className={cn('inline-loader font-mono', className)}>
      {getSymbol()}
    </span>
  )
}

interface ProgressBarAsciiProps {
  progress: number
  className?: string
  showPercentage?: boolean
}

export function ProgressBarAscii({ progress, className, showPercentage = true }: ProgressBarAsciiProps) {
  const blocks = 20
  const filled = Math.floor((progress / 100) * blocks)
  
  const bar = Array.from({ length: blocks }, (_, i) => {
    if (i < filled - 1) return '▓'
    if (i === filled - 1) return '▒'
    if (i === filled) return '░'
    return '·'
  }).join('')

  return (
    <div className={cn('progress-bar-ascii font-mono text-center', className)}>
      <div className="text-sm mb-1">{bar}</div>
      {showPercentage && (
        <div className="text-xs text-muted-foreground">
          {Math.round(progress)}%
        </div>
      )}
    </div>
  )
}

interface AdaptiveLoaderProps {
  operation: 'upload' | 'mask' | 'motion' | 'render' | 'pack' | 'deploy'
  progress?: number
  style?: 'neon' | 'cute' | 'techno' | 'magic'
  className?: string
}

export function AdaptiveLoader({ operation, progress, style = 'magic', className }: AdaptiveLoaderProps) {
  const operationMap: Record<typeof operation, keyof typeof asciiAnimations> = {
    upload: 'uploadProgress',
    mask: 'maskApplication',
    motion: 'motionInfusion',
    render: 'renderingLoop',
    pack: 'packGeneration',
    deploy: 'deployment'
  }

  const styleColors = {
    neon: 'text-accent',
    cute: 'text-pink-400',
    techno: 'text-cyan-400',
    magic: 'text-purple-400'
  }

  return (
    <div className={cn('adaptive-loader', styleColors[style], className)}>
      <AsciiLoader 
        animationKey={operationMap[operation]} 
        syncWithProgress={progress}
      />
    </div>
  )
}

interface CloudStatusProps {
  status: 'idle' | 'connecting' | 'connected' | 'error'
  className?: string
}

export function CloudStatus({ status, className }: CloudStatusProps) {
  const symbols = {
    idle: '~ ~ ~',
    connecting: '~ ○ ~',
    connected: '~ ✦ ~',
    error: '~ ◇ ~'
  }

  const colors = {
    idle: 'text-muted-foreground',
    connecting: 'text-blue-400',
    connected: 'text-green-400',
    error: 'text-destructive'
  }

  return (
    <div className={cn(
      'cloud-status font-mono text-xs',
      colors[status],
      className
    )}>
      {symbols[status]}
    </div>
  )
}
