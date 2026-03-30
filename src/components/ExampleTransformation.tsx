import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { ArrowRight } from '@phosphor-icons/react'
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'
import exampleGif from '@/assets/images/gemini_generated_video_7DC02353.gif'
import logoExample from '@/assets/images/lorelogp2.jpeg'

interface ExampleTransformationProps {
  className?: string
}

export function ExampleTransformation({ className }: ExampleTransformationProps) {
  return (
    <Card className={cn("p-8 md:p-12 bg-gradient-to-br from-card via-muted/10 to-card border-2 border-primary/20 relative overflow-hidden", className)}>
      <motion.div 
        className="absolute top-0 left-0 w-64 h-64 bg-primary/10 rounded-full blur-[120px]"
        animate={{ 
          x: [0, 100, 0],
          y: [0, 80, 0],
          scale: [1, 1.5, 1]
        }}
        transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div 
        className="absolute bottom-0 right-0 w-64 h-64 bg-accent/10 rounded-full blur-[120px]"
        animate={{ 
          x: [0, -100, 0],
          y: [0, -80, 0],
          scale: [1, 1.5, 1]
        }}
        transition={{ duration: 15, repeat: Infinity, ease: 'easeInOut' }}
      />
      
      <div className="relative z-10">
        <div className="text-center mb-10">
          <motion.h2 
            className="text-2xl md:text-3xl font-bold mb-3 gradient-text"
            animate={{ 
              backgroundPosition: ['0% 50%', '100% 50%', '0% 50%']
            }}
            transition={{ duration: 5, repeat: Infinity }}
          >
            How it comes to life ✦
          </motion.h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            See how your image transforms with mask refinement and motion magic
          </p>
        </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 md:gap-4 items-center max-w-5xl mx-auto">
        <TransformStep
          image={logoExample}
          label="Your Image"
          description="Upload or select"
          delay={0}
        />

        <ArrowIcon delay={0.1} />

        <TransformStep
          image={logoExample}
          label="Edge refined △"
          description="Mask applied"
          delay={0.2}
          withGlow
        />

        <ArrowIcon delay={0.3} />

        <TransformStep
          image={exampleGif}
          label="Motion infused ✧"
          description="Magic added"
          delay={0.4}
          withGlow
          withPulse
          isAnimated
        />

        <ArrowIcon delay={0.5} />

        <TransformStep
          image={exampleGif}
          label="Ready to apply ✦"
          description="Your sticker"
          delay={0.6}
          withGlow
          withPulse
          isFinal
          isAnimated
        />
      </div>

        <div className="mt-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
          >
            <Badge variant="outline" className="bg-accent/10 border-accent/30 text-accent-foreground shadow-lg shadow-accent/10">
              All magic happens in one flow
            </Badge>
          </motion.div>
        </div>
      </div>
    </Card>
  )
}

interface TransformStepProps {
  image: string
  label: string
  description: string
  delay: number
  withGlow?: boolean
  withPulse?: boolean
  isFinal?: boolean
  isAnimated?: boolean
}

function TransformStep({ image, label, description, delay, withGlow, withPulse, isFinal, isAnimated }: TransformStepProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.5 }}
      className="flex flex-col items-center space-y-3"
      whileHover={{ scale: 1.05 }}
    >
      <div className="relative">
        {withGlow && (
          <motion.div
            className="absolute -inset-2 bg-gradient-to-r from-primary/30 via-accent/30 to-primary/30 rounded-xl blur-lg"
            animate={{
              opacity: [0.3, 0.6, 0.3]
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        )}
        <motion.div
          animate={withPulse ? {
            scale: [1, 1.05, 1],
          } : {}}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className={cn(
            "w-24 h-24 md:w-28 md:h-28 rounded-xl overflow-hidden relative border-2",
            withGlow ? "border-primary/50 shadow-2xl shadow-primary/40" : "border-border/50"
          )}
        >
          {withPulse && (
            <motion.div
              className="absolute inset-0 bg-gradient-to-br from-primary/20 via-transparent to-accent/20"
              animate={{
                opacity: [0.3, 0.6, 0.3]
              }}
              transition={{
                duration: 2,
                repeat: Infinity
              }}
            />
          )}
          <img 
            src={image} 
            alt={label}
            className={cn(
              "w-full h-full object-cover relative z-10",
              isAnimated ? "" : "animate-none"
            )}
          />
        </motion.div>
        {isFinal && (
          <>
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1, rotate: [0, 10, -10, 0] }}
              transition={{ delay: delay + 0.3, duration: 0.8, rotate: { duration: 2, repeat: Infinity } }}
              className="absolute -top-3 -right-3 text-3xl"
              style={{
                filter: 'drop-shadow(0 0 10px oklch(0.68 0.22 280 / 0.8))'
              }}
            >
              ✦
            </motion.div>
            {[...Array(3)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-1.5 h-1.5 bg-accent rounded-full"
                style={{
                  top: '50%',
                  left: '50%',
                }}
                animate={{
                  x: [0, Math.cos((i / 3) * Math.PI * 2) * 50],
                  y: [0, Math.sin((i / 3) * Math.PI * 2) * 50],
                  opacity: [0, 1, 0],
                  scale: [0, 1.5, 0]
                }}
                transition={{
                  duration: 2.5,
                  repeat: Infinity,
                  delay: i * 0.3
                }}
              />
            ))}
          </>
        )}
      </div>
      
      <div className="text-center">
        <div className={cn(
          "font-semibold text-sm mb-1",
          isFinal && "gradient-text"
        )}>
          {label}
        </div>
        <div className="text-xs text-muted-foreground">
          {description}
        </div>
      </div>
    </motion.div>
  )
}

function ArrowIcon({ delay }: { delay: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay, duration: 0.4 }}
      className="hidden md:flex justify-center"
    >
      <motion.div
        animate={{ 
          x: [0, 5, 0],
          opacity: [0.4, 1, 0.4]
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      >
        <ArrowRight 
          size={24} 
          weight="bold" 
          className="text-primary drop-shadow-[0_0_8px_oklch(0.68_0.22_280/0.4)]" 
        />
      </motion.div>
    </motion.div>
  )
}
