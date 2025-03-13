

import { useEffect, useRef } from "react"

export default function MatrixRain() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    canvas.width = window.innerWidth
    canvas.height = window.innerHeight

    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    window.addEventListener("resize", resize)

    const fontSize = 14
    const columns = canvas.width / fontSize

    const drops = []
    for (let i = 0; i < columns; i++) {
      drops[i] = 1
    }

    const matrix = "01"

    function draw() {
      ctx.fillStyle = "rgba(0, 0, 0, 0.05)"
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      ctx.fillStyle = "#0f0"
      ctx.font = `${fontSize}px monospace`

      for (let i = 0; i < drops.length; i++) {
        const text = matrix[Math.floor(Math.random() * matrix.length)]
        ctx.fillText(text, i * fontSize, drops[i] * fontSize)

        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
          drops[i] = 0
        }

        drops[i]++
      }
    }

    const interval = setInterval(draw, 35)

    return () => {
      clearInterval(interval)
      window.removeEventListener("resize", resize)
    }
  }, [])

  return <canvas ref={canvasRef} className="w-full h-full" />
}

