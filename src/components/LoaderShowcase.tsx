import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { 
  loaders, 
  loaderFamilyInfo, 
  stageInfo,
  type LoaderFamily, 
  type ProcessingStage,
  type Loader 
} from '@/lib/loaderSystem'
import { 
  UploadSimple, 
  Scissors, 
  Sparkle, 
  Eye, 
  Package,
  Play,
  Pause,
  ArrowClockwise
} from '@phosphor-icons/react'

const stageIcons: Record<ProcessingStage, React.ReactNode> = {
  'uploading': <UploadSimple size={20} weight="duotone" />,
  'background-removal': <Scissors size={20} weight="duotone" />,
  'style-application': <Sparkle size={20} weight="duotone" />,
  'rendering': <Eye size={20} weight="duotone" />,
  'exporting': <Package size={20} weight="duotone" />
}

interface AnimatedLoaderProps {
  loader: Loader
  isPlaying: boolean
}

function AnimatedLoader({ loader, isPlaying }: AnimatedLoaderProps) {
  const familyColor = loaderFamilyInfo[loader.family].color

  const renderLoaderAnimation = () => {
    switch (loader.id) {
      case 'dot-pulse':
        return (
          <div className="flex items-center justify-center gap-2">
            {[0, 1, 2].map((i) => (
              <motion.div
                key={i}
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: familyColor }}
                animate={isPlaying ? {
                  scale: [1, 1.3, 1],
                  opacity: [0.5, 1, 0.5]
                } : {}}
                transition={{
                  duration: 1.2,
                  repeat: Infinity,
                  delay: i * 0.2
                }}
              />
            ))}
          </div>
        )

      case 'ring-spin':
        return (
          <motion.div
            className="w-12 h-12 rounded-full border-4 border-transparent"
            style={{ 
              borderTopColor: familyColor,
              borderRightColor: `${familyColor}50`
            }}
            animate={isPlaying ? { rotate: 360 } : {}}
            transition={{
              duration: 1,
              repeat: Infinity,
              ease: 'linear'
            }}
          />
        )

      case 'bounce-dots':
        return (
          <div className="flex items-end justify-center gap-1.5 h-12">
            {[0, 1, 2].map((i) => (
              <motion.div
                key={i}
                className="w-2.5 h-2.5 rounded-full"
                style={{ backgroundColor: familyColor }}
                animate={isPlaying ? {
                  y: [0, -16, 0]
                } : {}}
                transition={{
                  duration: 0.6,
                  repeat: Infinity,
                  delay: i * 0.15,
                  ease: 'easeInOut'
                }}
              />
            ))}
          </div>
        )

      case 'fade-pulse':
        return (
          <motion.div
            className="w-16 h-16 rounded-full"
            style={{ backgroundColor: familyColor }}
            animate={isPlaying ? {
              opacity: [0.3, 1, 0.3],
              scale: [0.9, 1, 0.9]
            } : {}}
            transition={{
              duration: 1.4,
              repeat: Infinity,
              ease: 'easeInOut'
            }}
          />
        )

      case 'conjuring':
        return (
          <div className="relative w-20 h-20">
            {[0, 1, 2, 3, 4, 5].map((i) => (
              <motion.div
                key={i}
                className="absolute w-2 h-2 rounded-full"
                style={{ 
                  backgroundColor: familyColor,
                  left: '50%',
                  top: '50%'
                }}
                animate={isPlaying ? {
                  x: [0, Math.cos(i * Math.PI / 3) * 30, 0],
                  y: [0, Math.sin(i * Math.PI / 3) * 30, 0],
                  scale: [0, 1, 0],
                  opacity: [0, 1, 0]
                } : {}}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  delay: i * 0.1,
                  ease: 'easeInOut'
                }}
              />
            ))}
          </div>
        )

      case 'sparkle-forge':
        return (
          <div className="relative w-20 h-20">
            {[0, 1, 2, 3, 4].map((i) => (
              <motion.div
                key={i}
                className="absolute text-2xl"
                style={{ 
                  color: familyColor,
                  left: '50%',
                  top: '50%',
                  marginLeft: '-12px',
                  marginTop: '-12px'
                }}
                animate={isPlaying ? {
                  rotate: [0, 360],
                  x: [0, Math.cos(i * Math.PI * 2 / 5) * 25],
                  y: [0, Math.sin(i * Math.PI * 2 / 5) * 25],
                  opacity: [0, 1, 0]
                } : {}}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  delay: i * 0.2
                }}
              >
                ✦
              </motion.div>
            ))}
          </div>
        )

      case 'glow-orb':
        return (
          <div className="relative w-20 h-20 flex items-center justify-center">
            <motion.div
              className="absolute w-12 h-12 rounded-full"
              style={{ backgroundColor: familyColor }}
              animate={isPlaying ? {
                scale: [1, 1.2, 1],
                opacity: [0.8, 1, 0.8]
              } : {}}
              transition={{
                duration: 1.8,
                repeat: Infinity,
                ease: 'easeInOut'
              }}
            />
            {[0, 1, 2].map((i) => (
              <motion.div
                key={i}
                className="absolute w-16 h-16 rounded-full border-2"
                style={{ borderColor: familyColor }}
                animate={isPlaying ? {
                  scale: [1, 1.5],
                  opacity: [0.6, 0]
                } : {}}
                transition={{
                  duration: 1.8,
                  repeat: Infinity,
                  delay: i * 0.6,
                  ease: 'easeOut'
                }}
              />
            ))}
          </div>
        )

      case 'refining':
        return (
          <div className="relative w-24 h-16 overflow-hidden rounded-lg border border-border">
            <motion.div
              className="absolute h-full w-8 opacity-60"
              style={{
                background: `linear-gradient(90deg, transparent, ${familyColor}, transparent)`
              }}
              animate={isPlaying ? {
                x: [-32, 96]
              } : {}}
              transition={{
                duration: 2.2,
                repeat: Infinity,
                ease: 'linear'
              }}
            />
          </div>
        )

      case 'rendering':
        return (
          <div className="relative w-24 h-16 rounded-lg border border-border overflow-hidden">
            {[...Array(8)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-full h-0.5"
                style={{ 
                  backgroundColor: familyColor,
                  top: `${i * 12.5}%`
                }}
                animate={isPlaying ? {
                  scaleX: [0, 1, 0]
                } : {}}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  delay: i * 0.1,
                  ease: 'easeInOut'
                }}
              />
            ))}
          </div>
        )

      case 'packing':
        return (
          <div className="grid grid-cols-4 gap-1 w-20 h-20">
            {[...Array(16)].map((_, i) => (
              <motion.div
                key={i}
                className="w-full h-full rounded-sm"
                style={{ backgroundColor: familyColor }}
                animate={isPlaying ? {
                  opacity: [0.2, 1, 0.2]
                } : {}}
                transition={{
                  duration: 1.6,
                  repeat: Infinity,
                  delay: i * 0.05,
                  ease: 'easeInOut'
                }}
              />
            ))}
          </div>
        )

      case 'data-stream':
        return (
          <div className="flex gap-1 h-20 items-center">
            {[0, 1, 2, 3].map((i) => (
              <div key={i} className="relative w-1 h-full overflow-hidden">
                <motion.div
                  className="absolute w-full font-mono text-[6px] leading-tight"
                  style={{ color: familyColor }}
                  animate={isPlaying ? {
                    y: ['-100%', '100%']
                  } : {}}
                  transition={{
                    duration: 1.4,
                    repeat: Infinity,
                    delay: i * 0.1,
                    ease: 'linear'
                  }}
                >
                  {Array.from({ length: 20 }, () => Math.random() > 0.5 ? '1' : '0').join('\n')}
                </motion.div>
              </div>
            ))}
          </div>
        )

      case 'prism-shift':
        return (
          <motion.div
            className="w-16 h-16 rounded-full"
            style={{
              background: `conic-gradient(from 0deg, ${familyColor}, oklch(0.75 0.20 100), oklch(0.75 0.20 200), ${familyColor})`
            }}
            animate={isPlaying ? {
              rotate: 360
            } : {}}
            transition={{
              duration: 2.4,
              repeat: Infinity,
              ease: 'linear'
            }}
          />
        )

      case 'morphing-shapes':
        return (
          <motion.div
            className="w-16 h-16"
            style={{ backgroundColor: familyColor }}
            animate={isPlaying ? {
              borderRadius: ['50%', '0%', '50%']
            } : {}}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: 'easeInOut'
            }}
          />
        )

      case 'aurora-wave':
        return (
          <div className="relative w-24 h-16 overflow-hidden rounded-lg">
            {[0, 1, 2].map((i) => (
              <motion.div
                key={i}
                className="absolute inset-0 opacity-40"
                style={{
                  background: `linear-gradient(${i * 45}deg, ${familyColor}, oklch(0.70 0.18 290))`
                }}
                animate={isPlaying ? {
                  backgroundPosition: ['0% 50%', '100% 50%', '0% 50%']
                } : {}}
                transition={{
                  duration: 2.5,
                  repeat: Infinity,
                  delay: i * 0.3,
                  ease: 'easeInOut'
                }}
              />
            ))}
          </div>
        )

      case 'circuit-pulse':
        return (
          <div className="relative w-20 h-20">
            <svg viewBox="0 0 80 80" className="w-full h-full">
              {[[10, 40, 70, 40], [40, 10, 40, 70], [10, 10, 70, 70]].map((coords, i) => (
                <motion.line
                  key={i}
                  x1={coords[0]}
                  y1={coords[1]}
                  x2={coords[2]}
                  y2={coords[3]}
                  stroke={familyColor}
                  strokeWidth="2"
                  strokeDasharray="4"
                  animate={isPlaying ? {
                    strokeDashoffset: [0, 8]
                  } : {}}
                  transition={{
                    duration: 1.7,
                    repeat: Infinity,
                    delay: i * 0.2,
                    ease: 'linear'
                  }}
                />
              ))}
            </svg>
          </div>
        )

      case 'crystal-grow':
        return (
          <div className="relative w-20 h-20 flex items-center justify-center">
            {[0, 1, 2].map((i) => (
              <motion.div
                key={i}
                className="absolute"
                style={{
                  width: `${(3 - i) * 16}px`,
                  height: `${(3 - i) * 16}px`,
                  borderLeft: `2px solid ${familyColor}`,
                  borderRight: `2px solid ${familyColor}`,
                  transform: 'rotate(45deg)'
                }}
                animate={isPlaying ? {
                  scale: [0, 1],
                  opacity: [0, 1]
                } : {}}
                transition={{
                  duration: 2.1,
                  repeat: Infinity,
                  delay: i * 0.3,
                  ease: 'easeOut'
                }}
              />
            ))}
          </div>
        )

      case 'vortex-spin':
        return (
          <div className="relative w-20 h-20">
            {[0, 1, 2, 3].map((i) => (
              <motion.div
                key={i}
                className="absolute w-1 h-8 rounded-full"
                style={{ 
                  backgroundColor: familyColor,
                  left: '50%',
                  top: '50%',
                  transformOrigin: '0 0'
                }}
                animate={isPlaying ? {
                  rotate: 360
                } : {}}
                transition={{
                  duration: 1.9,
                  repeat: Infinity,
                  delay: i * 0.1,
                  ease: 'linear'
                }}
              />
            ))}
          </div>
        )

      case 'infusing':
        return (
          <div className="relative w-20 h-20">
            {[0, 1, 2, 3].map((i) => (
              <motion.div
                key={i}
                className="absolute w-1 h-12 rounded-full"
                style={{ 
                  backgroundColor: familyColor,
                  left: '50%',
                  top: '50%',
                  marginLeft: '-2px'
                }}
                animate={isPlaying ? {
                  rotate: i * 90,
                  scaleY: [1, 0.5, 1],
                  opacity: [0.5, 1, 0.5]
                } : {}}
                transition={{
                  duration: 1.8,
                  repeat: Infinity,
                  delay: i * 0.2,
                  ease: 'easeInOut'
                }}
              />
            ))}
          </div>
        )

      case 'shimmer-cascade':
        return (
          <div className="relative w-20 h-24 overflow-hidden">
            {[0, 1, 2, 3, 4].map((i) => (
              <motion.div
                key={i}
                className="absolute w-1 h-1 rounded-full"
                style={{ 
                  backgroundColor: familyColor,
                  left: `${20 + i * 15}%`
                }}
                animate={isPlaying ? {
                  y: [-10, 96],
                  opacity: [0, 1, 0]
                } : {}}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  delay: i * 0.15,
                  ease: 'easeIn'
                }}
              />
            ))}
          </div>
        )

      case 'pixel-assemble':
        return (
          <div className="grid grid-cols-8 gap-0.5 w-20 h-20">
            {[...Array(64)].map((_, i) => (
              <motion.div
                key={i}
                className="w-full h-full"
                style={{ backgroundColor: familyColor }}
                animate={isPlaying ? {
                  opacity: [0, 1]
                } : {}}
                transition={{
                  duration: 1.6,
                  repeat: Infinity,
                  delay: Math.random() * 1.6,
                  ease: 'easeOut'
                }}
              />
            ))}
          </div>
        )

      default:
        return (
          <motion.div
            className="w-12 h-12 rounded-full"
            style={{ backgroundColor: familyColor }}
            animate={isPlaying ? {
              scale: [1, 1.2, 1],
              opacity: [0.5, 1, 0.5]
            } : {}}
            transition={{
              duration: loader.duration / 1000,
              repeat: Infinity
            }}
          />
        )
    }
  }

  return (
    <div className="flex items-center justify-center min-h-[120px]">
      {renderLoaderAnimation()}
    </div>
  )
}

export function LoaderShowcase() {
  const [selectedFamily, setSelectedFamily] = useState<LoaderFamily | 'all'>('all')
  const [selectedStage, setSelectedStage] = useState<ProcessingStage | 'all'>('all')
  const [isPlaying, setIsPlaying] = useState(true)

  const filteredLoaders = loaders.filter(loader => {
    const familyMatch = selectedFamily === 'all' || loader.family === selectedFamily
    const stageMatch = selectedStage === 'all' || loader.compatibleStages.includes(selectedStage)
    return familyMatch && stageMatch
  })

  const stages = Object.keys(stageInfo) as ProcessingStage[]
  const families = Object.keys(loaderFamilyInfo) as LoaderFamily[]

  return (
    <div className="space-y-8">
      <div className="text-center space-y-4">
        <div className="flex items-center justify-center gap-3">
          <Sparkle size={40} weight="duotone" className="text-accent" />
          <h2 className="text-4xl font-bold">Loader System</h2>
        </div>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          {loaders.length} branded loaders across {families.length} families, designed for {stages.length} processing stages
        </p>
      </div>

      <Card className="p-6 space-y-6">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold">Filters</h3>
          <div className="flex items-center gap-2">
            <Button
              size="sm"
              variant={isPlaying ? 'default' : 'outline'}
              onClick={() => setIsPlaying(!isPlaying)}
            >
              {isPlaying ? (
                <>
                  <Pause size={16} weight="fill" className="mr-1.5" />
                  Pause
                </>
              ) : (
                <>
                  <Play size={16} weight="fill" className="mr-1.5" />
                  Play
                </>
              )}
            </Button>
            <Button
              size="sm"
              variant="outline"
              onClick={() => {
                setSelectedFamily('all')
                setSelectedStage('all')
              }}
            >
              <ArrowClockwise size={16} weight="bold" className="mr-1.5" />
              Reset
            </Button>
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <label className="text-sm font-medium mb-2 block">Family</label>
            <div className="flex flex-wrap gap-2">
              <Badge
                variant={selectedFamily === 'all' ? 'default' : 'outline'}
                className="cursor-pointer px-3 py-1.5"
                onClick={() => setSelectedFamily('all')}
              >
                All ({loaders.length})
              </Badge>
              {families.map((family) => {
                const count = loaders.filter(l => l.family === family).length
                const info = loaderFamilyInfo[family]
                return (
                  <Badge
                    key={family}
                    variant={selectedFamily === family ? 'default' : 'outline'}
                    className="cursor-pointer px-3 py-1.5"
                    style={{
                      backgroundColor: selectedFamily === family ? info.color : undefined,
                      borderColor: info.color,
                      color: selectedFamily === family ? 'white' : info.color
                    }}
                    onClick={() => setSelectedFamily(family)}
                  >
                    {info.name} ({count})
                  </Badge>
                )
              })}
            </div>
          </div>

          <div>
            <label className="text-sm font-medium mb-2 block">Processing Stage</label>
            <div className="flex flex-wrap gap-2">
              <Badge
                variant={selectedStage === 'all' ? 'default' : 'outline'}
                className="cursor-pointer px-3 py-1.5"
                onClick={() => setSelectedStage('all')}
              >
                All Stages
              </Badge>
              {stages.map((stage) => {
                const info = stageInfo[stage]
                return (
                  <Badge
                    key={stage}
                    variant={selectedStage === stage ? 'default' : 'outline'}
                    className="cursor-pointer px-3 py-1.5 flex items-center gap-1.5"
                    onClick={() => setSelectedStage(stage)}
                  >
                    {stageIcons[stage]}
                    {info.name}
                  </Badge>
                )
              })}
            </div>
          </div>
        </div>
      </Card>

      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h3 className="text-xl font-semibold">
            {filteredLoaders.length} {filteredLoaders.length === 1 ? 'Loader' : 'Loaders'}
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence mode="sync">
            {filteredLoaders.map((loader) => {
              const familyInfo = loaderFamilyInfo[loader.family]
              return (
                <motion.div
                  key={loader.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.2 }}
                >
                  <Card className="p-6 hover:shadow-lg transition-shadow">
                    <div className="space-y-4">
                      <div className="flex items-start justify-between">
                        <div>
                          <h4 className="font-semibold text-lg mb-1">{loader.name}</h4>
                          <p className="text-xs text-muted-foreground">{loader.vibe}</p>
                        </div>
                        <Badge 
                          variant="outline"
                          style={{
                            borderColor: familyInfo.color,
                            color: familyInfo.color
                          }}
                        >
                          {familyInfo.name}
                        </Badge>
                      </div>

                      <AnimatedLoader loader={loader} isPlaying={isPlaying} />

                      <Separator />

                      <div className="space-y-2 text-sm">
                        <p className="text-muted-foreground">{loader.description}</p>
                        <div className="flex items-center gap-2 text-xs">
                          <Badge variant="secondary" className="font-mono">
                            {loader.duration}ms
                          </Badge>
                          <span className="text-muted-foreground">duration</span>
                        </div>
                      </div>

                      <div>
                        <p className="text-xs font-medium mb-2">Compatible Stages</p>
                        <div className="flex flex-wrap gap-1.5">
                          {loader.compatibleStages.map((stage) => (
                            <Badge
                              key={stage}
                              variant="outline"
                              className="text-xs px-2 py-0.5 flex items-center gap-1"
                            >
                              {stageIcons[stage]}
                              {stageInfo[stage].name}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              )
            })}
          </AnimatePresence>
        </div>
      </div>

      {selectedFamily !== 'all' && (
        <Card className="p-6 bg-gradient-to-br from-card to-muted/20">
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <div 
                className="w-10 h-10 rounded-lg flex items-center justify-center font-bold text-white"
                style={{ backgroundColor: loaderFamilyInfo[selectedFamily].color }}
              >
                {loaders.filter(l => l.family === selectedFamily).length}
              </div>
              <div>
                <h4 className="font-bold text-lg">{loaderFamilyInfo[selectedFamily].name}</h4>
                <p className="text-sm text-muted-foreground">{loaderFamilyInfo[selectedFamily].description}</p>
              </div>
            </div>
            <p className="text-sm">
              <span className="font-medium">Mood:</span> {loaderFamilyInfo[selectedFamily].mood}
            </p>
          </div>
        </Card>
      )}
    </div>
  )
}
