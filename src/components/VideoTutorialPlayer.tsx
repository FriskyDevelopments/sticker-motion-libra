import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Play, Pause, SpeakerHigh, SpeakerSlash, ArrowsOut, ArrowsIn, Sparkle, Info, Hand, CaretRight } from '@phosphor-icons/react'
import { Button } from '@/components/ui/button'
import { Slider } from '@/components/ui/slider'
import { Card } from '@/components/ui/card'

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

type VideoTutorialPlayerProps = {
  videoUrl: string
  poster?: string
  hotspots?: VideoHotspot[]
  annotations?: {
    time: number
    text: string
    position?: 'top' | 'bottom' | 'center'
  }[]
  autoPlay?: boolean
  className?: string
}

const iconMap = {
  sparkle: Sparkle,
  info: Info,
  hand: Hand,
  arrow: CaretRight,
}

export function VideoTutorialPlayer({
  videoUrl,
  poster,
  hotspots = [],
  annotations = [],
  autoPlay = false,
  className = '',
}: VideoTutorialPlayerProps) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const [isPlaying, setIsPlaying] = useState(autoPlay)
  const [isMuted, setIsMuted] = useState(true)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [activeHotspots, setActiveHotspots] = useState<VideoHotspot[]>([])
  const [selectedHotspot, setSelectedHotspot] = useState<VideoHotspot | null>(null)
  const [activeAnnotation, setActiveAnnotation] = useState<string | null>(null)
  const [showControls, setShowControls] = useState(true)

  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    const handleTimeUpdate = () => {
      setCurrentTime(video.currentTime)
      
      const active = hotspots.filter(
        h => video.currentTime >= h.timeRange[0] && video.currentTime <= h.timeRange[1]
      )
      setActiveHotspots(active)

      const currentAnnotation = annotations.find(
        a => Math.abs(video.currentTime - a.time) < 0.5
      )
      setActiveAnnotation(currentAnnotation?.text || null)
    }

    const handleLoadedMetadata = () => {
      setDuration(video.duration)
    }

    const handlePlay = () => setIsPlaying(true)
    const handlePause = () => setIsPlaying(false)

    video.addEventListener('timeupdate', handleTimeUpdate)
    video.addEventListener('loadedmetadata', handleLoadedMetadata)
    video.addEventListener('play', handlePlay)
    video.addEventListener('pause', handlePause)

    return () => {
      video.removeEventListener('timeupdate', handleTimeUpdate)
      video.removeEventListener('loadedmetadata', handleLoadedMetadata)
      video.removeEventListener('play', handlePlay)
      video.removeEventListener('pause', handlePause)
    }
  }, [hotspots, annotations])

  useEffect(() => {
    if (autoPlay && videoRef.current) {
      videoRef.current.play()
    }
  }, [autoPlay])

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause()
      } else {
        videoRef.current.play()
      }
    }
  }

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted
      setIsMuted(!isMuted)
    }
  }

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      containerRef.current?.requestFullscreen()
      setIsFullscreen(true)
    } else {
      document.exitFullscreen()
      setIsFullscreen(false)
    }
  }

  const handleSeek = (value: number[]) => {
    if (videoRef.current) {
      videoRef.current.currentTime = value[0]
      setCurrentTime(value[0])
    }
  }

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = Math.floor(seconds % 60)
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  return (
    <div
      ref={containerRef}
      className={`relative rounded-2xl overflow-hidden border-2 border-border/50 bg-card ${className}`}
      onMouseEnter={() => setShowControls(true)}
      onMouseLeave={() => setShowControls(true)}
    >
      <div className="relative aspect-video">
        <video
          ref={videoRef}
          className="w-full h-full object-cover"
          poster={poster}
          loop
          muted={isMuted}
          playsInline
          onClick={togglePlay}
        >
          <source src={videoUrl} type="video/mp4" />
        </video>

        {!isPlaying && (
          <motion.div
            className="absolute inset-0 flex items-center justify-center bg-background/50 backdrop-blur-sm cursor-pointer"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={togglePlay}
          >
            <motion.div
              className="relative"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <div className="absolute inset-0 rounded-full opacity-40 blur-2xl bg-primary" />
              <div className="relative w-24 h-24 rounded-full bg-primary/95 backdrop-blur flex items-center justify-center border-2 border-primary shadow-2xl">
                <Play size={48} weight="fill" className="text-primary-foreground ml-2" />
              </div>
            </motion.div>
          </motion.div>
        )}

        <AnimatePresence>
          {activeHotspots.map((hotspot) => {
            const Icon = iconMap[hotspot.icon || 'sparkle']
            const color = hotspot.color || 'oklch(0.68 0.22 280)'
            
            return (
              <motion.div
                key={hotspot.id}
                className="absolute cursor-pointer"
                style={{
                  left: `${hotspot.position.x}%`,
                  top: `${hotspot.position.y}%`,
                  transform: 'translate(-50%, -50%)',
                }}
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0 }}
                transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                onClick={() => setSelectedHotspot(selectedHotspot?.id === hotspot.id ? null : hotspot)}
              >
                <motion.div
                  className="relative"
                  animate={{
                    scale: [1, 1.2, 1],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: 'easeInOut',
                  }}
                >
                  <div
                    className="absolute inset-0 rounded-full opacity-30 blur-xl"
                    style={{ backgroundColor: color }}
                  />
                  <div
                    className="relative w-12 h-12 rounded-full flex items-center justify-center border-2 backdrop-blur-md"
                    style={{
                      backgroundColor: `${color}30`,
                      borderColor: color,
                      boxShadow: `0 0 30px ${color}60`,
                    }}
                  >
                    <Icon size={24} weight="duotone" style={{ color }} />
                  </div>
                  
                  {[...Array(3)].map((_, i) => (
                    <motion.div
                      key={i}
                      className="absolute inset-0 rounded-full"
                      style={{
                        border: '2px solid',
                        borderColor: color,
                      }}
                      animate={{
                        opacity: [0.5, 0, 0],
                        scale: [1, 1.5, 2],
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

                <AnimatePresence>
                  {selectedHotspot?.id === hotspot.id && (
                    <motion.div
                      initial={{ opacity: 0, y: 10, scale: 0.9 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -10, scale: 0.9 }}
                      transition={{ type: 'spring', stiffness: 300, damping: 25 }}
                      className="absolute top-full mt-3 left-1/2 -translate-x-1/2 w-64 pointer-events-auto"
                    >
                      <Card className="p-4 bg-card/98 backdrop-blur-xl border-2 shadow-2xl" style={{ borderColor: `${color}60` }}>
                        <div
                          className="absolute -top-2 left-1/2 -translate-x-1/2 w-4 h-4 rotate-45 border-l-2 border-t-2"
                          style={{
                            backgroundColor: 'oklch(0.16 0.02 260)',
                            borderColor: `${color}60`,
                          }}
                        />
                        <div className="relative">
                          <div className="flex items-start gap-2 mb-2">
                            <Icon size={20} weight="duotone" style={{ color }} className="flex-shrink-0 mt-0.5" />
                            <h4 className="font-bold text-foreground text-sm leading-tight">
                              {hotspot.title}
                            </h4>
                          </div>
                          <p className="text-xs text-muted-foreground leading-relaxed">
                            {hotspot.description}
                          </p>
                        </div>
                      </Card>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            )
          })}
        </AnimatePresence>

        <AnimatePresence>
          {activeAnnotation && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="absolute bottom-24 left-1/2 -translate-x-1/2 px-6 py-3 rounded-full bg-background/95 backdrop-blur-md border border-primary/40 shadow-xl"
            >
              <div className="flex items-center gap-2">
                <Sparkle size={16} weight="fill" className="text-primary" />
                <p className="text-sm font-medium text-foreground whitespace-nowrap">
                  {activeAnnotation}
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {showControls && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-background/95 via-background/80 to-transparent backdrop-blur-sm p-4 pt-16"
            >
              <div className="space-y-3">
                <Slider
                  value={[currentTime]}
                  max={duration || 100}
                  step={0.1}
                  onValueChange={handleSeek}
                  className="cursor-pointer"
                />
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-9 w-9 hover:bg-primary/20 hover:text-primary"
                      onClick={togglePlay}
                    >
                      {isPlaying ? (
                        <Pause size={20} weight="fill" />
                      ) : (
                        <Play size={20} weight="fill" />
                      )}
                    </Button>
                    
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-9 w-9 hover:bg-primary/20 hover:text-primary"
                      onClick={toggleMute}
                    >
                      {isMuted ? (
                        <SpeakerSlash size={20} weight="fill" />
                      ) : (
                        <SpeakerHigh size={20} weight="fill" />
                      )}
                    </Button>
                    
                    <span className="text-xs font-medium text-muted-foreground ml-2">
                      {formatTime(currentTime)} / {formatTime(duration)}
                    </span>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    {hotspots.length > 0 && (
                      <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-primary/10 border border-primary/30">
                        <Sparkle size={12} weight="fill" className="text-primary" />
                        <span className="text-xs font-medium text-foreground">
                          {hotspots.length} hotspot{hotspots.length !== 1 ? 's' : ''}
                        </span>
                      </div>
                    )}
                    
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-9 w-9 hover:bg-primary/20 hover:text-primary"
                      onClick={toggleFullscreen}
                    >
                      {isFullscreen ? (
                        <ArrowsIn size={20} weight="bold" />
                      ) : (
                        <ArrowsOut size={20} weight="bold" />
                      )}
                    </Button>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}
