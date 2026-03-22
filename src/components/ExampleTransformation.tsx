import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { ArrowRight } from '@phosphor-icons/react'
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'

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
          emoji="🌸"
          label="Your Image"
          description="Upload or select"
          delay={0}
        />

        <ArrowIcon delay={0.1} />

        <TransformStep
          emoji="🌸"
          label="Edge refined"
          description="Mask applied"
          delay={0.2}
          withGlow
        />

        <ArrowIcon delay={0.3} />

        <TransformStep
          emoji="🌸"
          label="Motion infused"
          description="Magic added"
          delay={0.4}
          withGlow
          withPulse
        />

        <ArrowIcon delay={0.5} />

        <TransformStep
          emoji="🌸"
          label="Ready to apply ✦"
          description="Your sticker"
          delay={0.6}
          withGlow
          withPulse
          isFinal
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
  emoji: string
  label: string
  description: string
  delay: number
  withGlow?: boolean
  withPulse?: boolean
  isFinal?: boolean
}

function TransformStep({ emoji, label, description, delay, withGlow, withPulse, isFinal }: TransformStepProps) {
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
            "text-6xl md:text-7xl",
            withGlow && "drop-shadow-[0_0_12px_oklch(0.65_0.20_160)]"
          )}
        >
          {emoji}
        </motion.div>
        {isFinal && (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1, rotate: [0, 10, 0] }}
            transition={{ delay: delay + 0.3, duration: 0.5 }}
            className="absolute -top-2 -right-2 text-2xl"
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
