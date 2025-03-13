import { useEffect, useRef } from "react"; 

 

const ParticleBackground = () => { 

  const canvasRef = useRef(null); 

 

  useEffect(() => { 

    const canvas = canvasRef.current; 

    if (!canvas) return; 

    const ctx = canvas.getContext("2d"); 

    if (!ctx) return; 

 

    // Set canvas to full screen 

    const resizeCanvas = () => { 

      canvas.width = window.innerWidth; 

      canvas.height = window.innerHeight; 

    }; 

 

    resizeCanvas(); 

    window.addEventListener("resize", resizeCanvas); 

 

    // Particle properties 

    const particleCount = 100; 

    const particles = Array.from({ length: particleCount }, () => ({ 

      x: Math.random() * canvas.width, 

      y: Math.random() * canvas.height, 

      size: Math.random() * 2 + 0.5, 

      speedX: (Math.random() - 0.5) * 0.5, 

      speedY: (Math.random() - 0.5) * 0.5, 

      color: getRandomColor(), 

      alpha: Math.random() * 0.5 + 0.1, 

    })); 

 

    function getRandomColor() { 

      const colors = ["#00ff00", "#00ffff", "#ff00ff", "#0088ff"]; 

      return colors[Math.floor(Math.random() * colors.length)]; 

    } 

 

    // Animation loop 

    let animationFrameId; 

    const render = () => { 

      ctx.clearRect(0, 0, canvas.width, canvas.height); 

 

      particles.forEach((particle, index) => { 

        ctx.beginPath(); 

        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2); 

        ctx.fillStyle = particle.color; 

        ctx.globalAlpha = particle.alpha; 

        ctx.fill(); 

 

        // Update position 

        particle.x += particle.speedX; 

        particle.y += particle.speedY; 

 

        // Boundary check 

        if (particle.x < 0 || particle.x > canvas.width) particle.speedX *= -1; 

        if (particle.y < 0 || particle.y > canvas.height) particle.speedY *= -1; 

 

        // Connect particles with lines 

        for (let j = index + 1; j < particles.length; j++) { 

          const dx = particles[j].x - particle.x; 

          const dy = particles[j].y - particle.y; 

          const distance = Math.sqrt(dx * dx + dy * dy); 

          if (distance < 100) { 

            ctx.beginPath(); 

            ctx.strokeStyle = particle.color; 

            ctx.globalAlpha = (100 - distance) / 300; 

            ctx.lineWidth = 0.5; 

            ctx.moveTo(particle.x, particle.y); 

            ctx.lineTo(particles[j].x, particles[j].y); 

            ctx.stroke(); 

          } 

        } 

      }); 

 

      animationFrameId = requestAnimationFrame(render); 

    }; 

 

    render(); 

 

    return () => { 

      window.removeEventListener("resize", resizeCanvas); 

      cancelAnimationFrame(animationFrameId); 

    }; 

  }, []); 

 

  return <canvas ref={canvasRef} className="fixed top-0 left-0 w-full h-full -z-10 bg-black" aria-hidden="true" />; 

}; 

export default ParticleBackground; 

 
