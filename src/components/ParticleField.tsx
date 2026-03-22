import { useEffect, useRef } from 'react'

interface Particle {
  x: number
  y: number
  size: number
  speedX: number
  speedY: number
  opacity: number
  fadeDirection: number
  type: 'star' | 'sparkle' | 'dot'
}

export function ParticleField() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const updateCanvasSize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    updateCanvasSize()
    window.addEventListener('resize', updateCanvasSize)

    const particles: Particle[] = []
    const particleCount = 60

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 2.5 + 0.5,
        speedX: (Math.random() - 0.5) * 0.3,
        speedY: (Math.random() - 0.5) * 0.3,
        opacity: Math.random() * 0.5 + 0.2,
        fadeDirection: Math.random() > 0.5 ? 1 : -1,
        type: Math.random() > 0.7 ? 'star' : Math.random() > 0.5 ? 'sparkle' : 'dot'
      })
    }

    const drawStar = (x: number, y: number, size: number, opacity: number) => {
      ctx.save()
      ctx.translate(x, y)
      
      const gradient = ctx.createRadialGradient(0, 0, 0, 0, 0, size * 3)
      gradient.addColorStop(0, `rgba(168, 85, 247, ${opacity * 0.8})`)
      gradient.addColorStop(0.5, `rgba(147, 51, 234, ${opacity * 0.4})`)
      gradient.addColorStop(1, `rgba(147, 51, 234, 0)`)
      
      ctx.fillStyle = gradient
      ctx.fillRect(-size * 3, -size * 3, size * 6, size * 6)
      
      ctx.fillStyle = `rgba(196, 181, 253, ${opacity})`
      ctx.fillRect(-size, -1, size * 2, 2)
      ctx.fillRect(-1, -size, 2, size * 2)
      
      ctx.restore()
    }

    const drawSparkle = (x: number, y: number, size: number, opacity: number) => {
      ctx.save()
      ctx.translate(x, y)
      
      const gradient = ctx.createRadialGradient(0, 0, 0, 0, 0, size * 4)
      gradient.addColorStop(0, `rgba(139, 92, 246, ${opacity * 0.9})`)
      gradient.addColorStop(0.3, `rgba(167, 139, 250, ${opacity * 0.6})`)
      gradient.addColorStop(1, `rgba(167, 139, 250, 0)`)
      
      ctx.fillStyle = gradient
      ctx.fillRect(-size * 4, -size * 4, size * 8, size * 8)
      
      ctx.fillStyle = `rgba(221, 214, 254, ${opacity * 1.2})`
      ctx.beginPath()
      ctx.arc(0, 0, size * 0.6, 0, Math.PI * 2)
      ctx.fill()
      
      ctx.restore()
    }

    const drawDot = (x: number, y: number, size: number, opacity: number) => {
      ctx.save()
      
      const gradient = ctx.createRadialGradient(x, y, 0, x, y, size * 2)
      gradient.addColorStop(0, `rgba(167, 139, 250, ${opacity})`)
      gradient.addColorStop(0.5, `rgba(147, 51, 234, ${opacity * 0.5})`)
      gradient.addColorStop(1, `rgba(147, 51, 234, 0)`)
      
      ctx.fillStyle = gradient
      ctx.beginPath()
      ctx.arc(x, y, size * 2, 0, Math.PI * 2)
      ctx.fill()
      
      ctx.restore()
    }

    let animationFrameId: number

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      particles.forEach(particle => {
        particle.x += particle.speedX
        particle.y += particle.speedY

        particle.opacity += particle.fadeDirection * 0.002
        if (particle.opacity >= 0.7) particle.fadeDirection = -1
        if (particle.opacity <= 0.1) particle.fadeDirection = 1

        if (particle.x < -20) particle.x = canvas.width + 20
        if (particle.x > canvas.width + 20) particle.x = -20
        if (particle.y < -20) particle.y = canvas.height + 20
        if (particle.y > canvas.height + 20) particle.y = -20

        if (particle.type === 'star') {
          drawStar(particle.x, particle.y, particle.size, particle.opacity)
        } else if (particle.type === 'sparkle') {
          drawSparkle(particle.x, particle.y, particle.size, particle.opacity)
        } else {
          drawDot(particle.x, particle.y, particle.size, particle.opacity)
        }
      })

      animationFrameId = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      window.removeEventListener('resize', updateCanvasSize)
      cancelAnimationFrame(animationFrameId)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
      style={{ mixBlendMode: 'screen' }}
    />
  )
}
