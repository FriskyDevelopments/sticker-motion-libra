export interface AsciiFrame {
  content: string
  duration: number
}

export interface AsciiAnimation {
  name: string
  purpose: string
  frames: AsciiFrame[]
  tone: 'magic' | 'techno' | 'cute' | 'hybrid'
  placement: 'fullscreen' | 'card' | 'inline' | 'modal'
  loop: boolean
  performanceNotes: string
}

export const asciiAnimations: Record<string, AsciiAnimation> = {
  cloudBoot: {
    name: 'Cloud Boot',
    purpose: 'Initial application load - establishes cloud-native foundation',
    tone: 'hybrid',
    placement: 'fullscreen',
    loop: false,
    performanceNotes: 'Single playthrough on mount, 2.4s total duration',
    frames: [
      {
        content: `
    
    
         ·  ·  ·
    
    `,
        duration: 300
      },
      {
        content: `
    
      ~ ·  ·  · ~
         ◌ ◌ ◌
    
    `,
        duration: 300
      },
      {
        content: `
    
    ~ ~ ·  ✦  · ~ ~
       ◌  ○  ◌
      ░ ░ ░ ░ ░
    `,
        duration: 400
      },
      {
        content: `
    
  ~ ~ ~ ✦ ✧ ✦ ~ ~ ~
     ◌  ○  ○  ◌
    ░ ▒ ░ ░ ▒ ░
  STIX MAGIC STUDIO
    `,
        duration: 600
      },
      {
        content: `
    
  ~ ~ ~ ✦ ✧ ✦ ~ ~ ~
     ◌  ○  ○  ◌
    ░ ▒ ▓ ▓ ▒ ░
  STIX MAGIC STUDIO
   ✧ edge deployed ✧
    `,
        duration: 800
      }
    ]
  },

  uploadProgress: {
    name: 'Upload in Progress',
    purpose: 'Visual feedback during image upload to cloud',
    tone: 'techno',
    placement: 'modal',
    loop: true,
    performanceNotes: 'Lightweight CSS animation, 1.2s loop cycle',
    frames: [
      {
        content: `
    ◌ ◌ ◌ ◌ ◌
    
 Uploading ◌
    `,
        duration: 150
      },
      {
        content: `
    ○ ◌ ◌ ◌ ◌
    
 Uploading ◌
    `,
        duration: 150
      },
      {
        content: `
    ○ ○ ◌ ◌ ◌
    
 Uploading ◌
    `,
        duration: 150
      },
      {
        content: `
    ○ ○ ○ ◌ ◌
    
 Uploading ◌
    `,
        duration: 150
      },
      {
        content: `
    ○ ○ ○ ○ ◌
    
 Uploading ◌
    `,
        duration: 150
      },
      {
        content: `
    ○ ○ ○ ○ ○
    
 Uploading ◌
    `,
        duration: 150
      },
      {
        content: `
    ✦ ○ ○ ○ ○
    
   Ready ✦
    `,
        duration: 300
      }
    ]
  },

  maskApplication: {
    name: 'Mask Application',
    purpose: 'Shows mask being applied to uploaded image',
    tone: 'magic',
    placement: 'card',
    loop: true,
    performanceNotes: 'Smooth 1.6s loop, minimal DOM updates',
    frames: [
      {
        content: `
    
      ◇ ◇ ◇
     ◇ img ◇
      ◇ ◇ ◇
    
  Applying style ◌
    `,
        duration: 200
      },
      {
        content: `
    
     ✦◇ ◇ ◇✦
     ◇ img ◇
     ✦◇ ◇ ◇✦
    
  Applying style ◌
    `,
        duration: 200
      },
      {
        content: `
    
    ✦ ◇ ✧ ◇ ✦
     ◇ img ◇
    ✦ ◇ ✧ ◇ ✦
    
  Applying style ◌
    `,
        duration: 200
      },
      {
        content: `
    
   ✧✦ ◇ ✧ ◇✦✧
     ◇ img ◇
   ✧✦ ◇ ✧ ◇✦✧
    
  Style applied ✧
    `,
        duration: 400
      },
      {
        content: `
    
   ~ ✧ ✦ ✧ ~
     ◌ img ◌
   ~ ✧ ✦ ✧ ~
    
   Ready ✦
    `,
        duration: 600
      }
    ]
  },

  motionInfusion: {
    name: 'Motion Infusion',
    purpose: 'Visualization of motion preset being applied',
    tone: 'hybrid',
    placement: 'card',
    loop: true,
    performanceNotes: 'Dynamic 2s loop with smooth transitions',
    frames: [
      {
        content: `
    
      △
     ◌ ○ ◌
      ·
    
 Infusing motion ◌
    `,
        duration: 250
      },
      {
        content: `
    
      ✧
     ◌ ○ ◌
      △
    
 Infusing motion ◌
    `,
        duration: 250
      },
      {
        content: `
    
     △ ✧
    ◌ ○ ○ ◌
      △
    
 Infusing motion ◌
    `,
        duration: 250
      },
      {
        content: `
    
    ✧ △ ✧
   ◌ ○ ○ ○ ◌
     △ ✧
    
  Motion applied ✧
    `,
        duration: 400
      },
      {
        content: `
    
   ✦ ✧ △ ✧ ✦
  ◌ ○ ✧ ○ ◌
    ✦ ✧ ✦
    
 Bringing it to life
    `,
        duration: 850
      }
    ]
  },

  renderingLoop: {
    name: 'Rendering Loop',
    purpose: 'Shows frames being rendered in cloud workers',
    tone: 'techno',
    placement: 'modal',
    loop: true,
    performanceNotes: 'Optimized for long-running renders, 1.8s cycle',
    frames: [
      {
        content: `
  ░ ░ ░ ░ ░
  ░ ░ ░ ░ ░
  ░ ░ ░ ░ ░
    
 Your sticker is forming ◌
    `,
        duration: 200
      },
      {
        content: `
  ▒ ░ ░ ░ ░
  ▒ ░ ░ ░ ░
  ▒ ░ ░ ░ ░
    
 Your sticker is forming ◌
    `,
        duration: 200
      },
      {
        content: `
  ▒ ▒ ░ ░ ░
  ▒ ▒ ░ ░ ░
  ▒ ▒ ░ ░ ░
    
 Your sticker is forming ◌
    `,
        duration: 200
      },
      {
        content: `
  ▒ ▒ ▒ ░ ░
  ▒ ▓ ▒ ░ ░
  ▒ ▒ ▒ ░ ░
    
 Your sticker is forming ◌
    `,
        duration: 200
      },
      {
        content: `
  ▒ ▒ ▒ ▒ ░
  ▒ ▓ ▓ ▒ ░
  ▒ ▒ ▒ ▒ ░
    
 Your sticker is forming ◌
    `,
        duration: 200
      },
      {
        content: `
  ▒ ▒ ▒ ▒ ▒
  ▒ ▓ ▓ ▓ ▒
  ▒ ▒ ▒ ▒ ▒
    
 Your sticker is forming ◌
    `,
        duration: 200
      },
      {
        content: `
  ▓ ▓ ▓ ▓ ▓
  ▓ ✦ ✧ ✦ ▓
  ▓ ▓ ▓ ▓ ▓
    
 Ready ✦
    `,
        duration: 600
      }
    ]
  },

  packGeneration: {
    name: 'Pack Generation',
    purpose: 'Final pack assembly and optimization',
    tone: 'magic',
    placement: 'modal',
    loop: false,
    performanceNotes: 'Single-run animation, 3.2s total',
    frames: [
      {
        content: `
    
    ◌ ◌ ◌ ◌
    
  Building your pack ◌
    `,
        duration: 300
      },
      {
        content: `
    
    ○ ◌ ◌ ◌
    
  Assembling frames ✧
    `,
        duration: 400
      },
      {
        content: `
    
    ○ ○ ◌ ◌
    
 Adding your magic ✧
    `,
        duration: 400
      },
      {
        content: `
    
    ○ ○ ○ ◌
    
 Final touches △
    `,
        duration: 400
      },
      {
        content: `
    
   ✦○ ○ ○ ○✦
    
  Almost there ✧
    `,
        duration: 500
      },
      {
        content: `
    
  ✧✦○ ○ ○ ○✦✧
    
   Pack ready ✦
    `,
        duration: 1200
      }
    ]
  },

  deployment: {
    name: 'Deployment / Publish',
    purpose: 'Deploy sticker pack to edge network',
    tone: 'techno',
    placement: 'modal',
    loop: false,
    performanceNotes: 'Edge deployment visualization, 2.8s',
    frames: [
      {
        content: `
    
      · · ·
      
  Preparing deploy ◌
    `,
        duration: 300
      },
      {
        content: `
    
    · · · · ·
      ~ ~ ~
      
  Routing to edge ◌
    `,
        duration: 400
      },
      {
        content: `
  · · · · · · ·
   ~ ~ ~ ~ ~ ~
    ○ ○ ○ ○
      
 Deploying now ◌
    `,
        duration: 500
      },
      {
        content: `
 · · · ✦ · · · ·
  ~ ~ ○ ○ ○ ~ ~
   ○ ○ ○ ○ ○
      
 Spreading globally △
    `,
        duration: 600
      },
      {
        content: `
✧ · · ✦ ✧ ✦ · · ✧
 ~ ○ ○ ○ ○ ○ ~
  ○ ○ ○ ○ ○ ○
      
  Deploy complete ✦
    `,
        duration: 1000
      }
    ]
  },

  successConfirmation: {
    name: 'Success Confirmation',
    purpose: 'Celebratory confirmation of successful operation',
    tone: 'magic',
    placement: 'inline',
    loop: false,
    performanceNotes: 'Brief celebration animation, 1.6s',
    frames: [
      {
        content: `
    
      ○
    
    `,
        duration: 150
      },
      {
        content: `
    
     ✦○✦
    
    `,
        duration: 150
      },
      {
        content: `
    
   ✧ ✦○✦ ✧
    
    `,
        duration: 200
      },
      {
        content: `
    
  ✧ ✦ ✦○✦ ✦ ✧
    
   Success!
    `,
        duration: 300
      },
      {
        content: `
    
 · ✧ ✦ ✦○✦ ✦ ✧ ·
    
   Success! ✨
    `,
        duration: 800
      }
    ]
  },

  errorRetry: {
    name: 'Error / Retry State',
    purpose: 'Gentle error indication with retry affordance',
    tone: 'hybrid',
    placement: 'modal',
    loop: true,
    performanceNotes: 'Subtle pulse for attention, 2.4s loop',
    frames: [
      {
        content: `
    
      ◇
    
  Connection lost
    `,
        duration: 400
      },
      {
        content: `
    
     · ◇ ·
    
  Connection lost
    `,
        duration: 400
      },
      {
        content: `
    
    · ◌ ◇ ◌ ·
    
  Connection lost
    `,
        duration: 400
      },
      {
        content: `
    
   · ◌ · ◇ · ◌ ·
    
   Tap to retry
    `,
        duration: 600
      },
      {
        content: `
    
    · ◌ ◇ ◌ ·
    
   Tap to retry
    `,
        duration: 400
      },
      {
        content: `
    
     · ◇ ·
    
   Tap to retry
    `,
        duration: 200
      }
    ]
  },

  emptyState: {
    name: 'Empty State',
    purpose: 'Welcoming empty state when no stickers exist yet',
    tone: 'cute',
    placement: 'card',
    loop: true,
    performanceNotes: 'Gentle float animation, 3s loop',
    frames: [
      {
        content: `
    
      ~ ~ ~
     ·  ✧  ·
      ~ ~ ~
    
 No stickers yet
    `,
        duration: 500
      },
      {
        content: `
    
     ~ ~ ~ ~
    ·  ✧  ·
     ~ ~ ~ ~
    
 No stickers yet
    `,
        duration: 500
      },
      {
        content: `
    
    ~ ~ ~ ~ ~
      ·  ✧  ·
    ~ ~ ~ ~ ~
    
 Create your first
    `,
        duration: 500
      },
      {
        content: `
    
     ~ ~ ~ ~
    ·  ✧  ·
     ~ ~ ~ ~
    
 Create your first
    `,
        duration: 500
      },
      {
        content: `
    
      ~ ~ ~
     ·  ✧  ·
      ~ ~ ~
    
 Create your first
    `,
        duration: 500
      },
      {
        content: `
    
       ~
      ·  ✧  ·
       ~
    
 Create your first
    `,
        duration: 500
      }
    ]
  }
}

export const heroLoadingScenes = {
  conjuringMagic: {
    name: 'Conjuring Magic',
    frames: [
      {
        content: `
    
    
       ◌ ◌ ◌
    
    
  Conjuring sticker magic…
    `,
        duration: 400
      },
      {
        content: `
    
      ✦
     ◌ ○ ◌
       ·
    
  Conjuring sticker magic…
    `,
        duration: 400
      },
      {
        content: `
    
     ✧ ✦ ✧
    ◌ ○ ○ ◌
      · ·
    
  Conjuring sticker magic…
    `,
        duration: 400
      },
      {
        content: `
    
   ✧ ✦ ✧ ✦ ✧
   ◌ ○ ○ ○ ◌
     · · ·
    
  Conjuring sticker magic…
    `,
        duration: 400
      },
      {
        content: `
    
  ✧ ✦ ✧ ✦ ✧ ✦ ✧
  ◌ ○ ○ ✨ ○ ○ ◌
    · · · · ·
    
  Conjuring sticker magic…
    `,
        duration: 600
      }
    ]
  },

  routingSparkle: {
    name: 'Routing Sparkle',
    frames: [
      {
        content: `
  ·
    ·
      ○
        ·
          ·
    
Routing sparkle through the cloud…
    `,
        duration: 200
      },
      {
        content: `
    ·
      ·
        ○
          ·
            ·
    
Routing sparkle through the cloud…
    `,
        duration: 200
      },
      {
        content: `
      ·
        ·
          ○
            ·
              ✦
    
Routing sparkle through the cloud…
    `,
        duration: 200
      },
      {
        content: `
        ·
          ·
            ○
              ✦
                ✧
    
Routing sparkle through the cloud…
    `,
        duration: 200
      },
      {
        content: `
          ·
            ·
              ✦
                ✧
                  ✦
    
Routing sparkle through the cloud…
    `,
        duration: 300
      },
      {
        content: `
            ·
              ✦
                ✧
                  ✦
                    ✧
    
Routing sparkle through the cloud…
    `,
        duration: 300
      }
    ]
  },

  transmutingPixels: {
    name: 'Transmuting Pixels',
    frames: [
      {
        content: `
    
  ░ ░ ░ ░ ░
  ░ ░ ░ ░ ░
    
Transmuting pixels into STIX…
    `,
        duration: 300
      },
      {
        content: `
    
  ░ ▒ ░ ░ ░
  ░ ░ ▒ ░ ░
    
Transmuting pixels into STIX…
    `,
        duration: 300
      },
      {
        content: `
    
  ▒ ▒ ░ ░ ░
  ░ ▒ ▒ ░ ░
    
Transmuting pixels into STIX…
    `,
        duration: 300
      },
      {
        content: `
    
  ▒ ▓ ▒ ░ ░
  ░ ▒ ▓ ▒ ░
    
Transmuting pixels into STIX…
    `,
        duration: 300
      },
      {
        content: `
    
  ▓ ✦ ▓ ▒ ░
  ░ ▒ ✦ ▓ ▒
    
Transmuting pixels into STIX…
    `,
        duration: 400
      },
      {
        content: `
    
  ✦ ✧ ✦ ▓ ▒
  ▒ ▓ ✧ ✦ ▓
    
  Transmutation complete!
    `,
        duration: 600
      }
    ]
  },

  deployingCharm: {
    name: 'Deploying Charm',
    frames: [
      {
        content: `
    
    ~ ~ ~ ~ ~
      ○ ○ ○
    
Deploying charm at the edge…
    `,
        duration: 350
      },
      {
        content: `
    
   ~ ~ ✧ ~ ~ ~
     ○ ○ ○ ○
    
Deploying charm at the edge…
    `,
        duration: 350
      },
      {
        content: `
    
  ~ ~ ✧ ✦ ✧ ~ ~
    ○ ○ ○ ○ ○
    
Deploying charm at the edge…
    `,
        duration: 350
      },
      {
        content: `
    
 ~ ✧ ✦ ✧ ✦ ✧ ~ ~
   ○ ○ ○ ○ ○ ○
    
Deploying charm at the edge…
    `,
        duration: 400
      },
      {
        content: `
    
· ✧ ✦ ✧ ✦ ✧ ✦ ✧ ·
  ○ ○ ○ ✨ ○ ○ ○
    
  Charm deployed globally!
    `,
        duration: 700
      }
    ]
  }
}

export function getAnimationDuration(animation: AsciiAnimation): number {
  return animation.frames.reduce((total, frame) => total + frame.duration, 0)
}

export function getFrameAtTime(animation: AsciiAnimation, elapsed: number): string {
  const totalDuration = getAnimationDuration(animation)
  
  if (animation.loop) {
    elapsed = elapsed % totalDuration
  } else if (elapsed >= totalDuration) {
    return animation.frames[animation.frames.length - 1].content
  }

  let accumulatedTime = 0
  for (const frame of animation.frames) {
    accumulatedTime += frame.duration
    if (elapsed < accumulatedTime) {
      return frame.content
    }
  }

  return animation.frames[animation.frames.length - 1].content
}
