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
    <Card className={cn("p-8 md:p-12 bg-gradient-to-br from-card via-muted/10 to-card border-2 border-primary/20", className)}>
      <div className="text-center mb-10">
        <h2 className="text-2xl md:text-3xl font-bold mb-3">How it comes to life ✦</h2>
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
        <Badge variant="outline" className="bg-accent/10 border-accent/30 text-accent-foreground">
          All magic happens in one flow
        </Badge>
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
    >
      <div className="relative">
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
            "w-24 h-24 md:w-28 md:h-28 rounded-xl overflow-hidden",
            withGlow && "shadow-lg shadow-primary/50"
          )}
        >
          <img 
            src={image} 
            alt={label}
            className={cn(
              "w-full h-full object-cover",
              isAnimated ? "" : "animate-none"
            )}
          />
        </motion.div>
        {isFinal && (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1, rotate: [0, 10, 0] }}
            transition={{ delay: delay + 0.3, duration: 0.5 }}
            className="absolute -top-2 -right-2 text-3xl animate-glow-pulse"
          >
            ✦
          </motion.div>
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
      className="hidden md:flex justify-center text-muted-foreground/40"
    >
      <ArrowRight size={24} weight="bold" />
    </motion.div>
  )
}
