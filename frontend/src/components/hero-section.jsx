import { useEffect, useRef, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { FaCode, FaUsers, FaGithub, FaArrowDown, FaLaptopCode ,FaBookOpen,FaHandshake} from "react-icons/fa"

// Terminal typing effect with blinking cursor
const TypedText = ({ text, className, speed = 50 }) => {
  const [displayText, setDisplayText] = useState("");
  const index = useRef(0);

  // Reset when text changes
  useEffect(() => {
    index.current = 0;
    setDisplayText("");
  }, [text]);

  useEffect(() => {
    if (index.current < text.length) {
      const timeout = setTimeout(() => {
        setDisplayText((prev) => prev + text.charAt(index.current));
        index.current += 1;
      }, speed);

      return () => clearTimeout(timeout);
    }
  }, [displayText, text, speed]);

  return (
    <span className={className}>
      {displayText}
      <span className="inline-block w-2 h-5 bg-teal-400 ml-1 animate-blink"></span>
    </span>
  );
};

// Animated particle system
const ParticleSystem = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    // Create particles
    const particlesArray = [];
    const numberOfParticles = Math.min(100, window.innerWidth / 20);
    
    class Particle {
      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 3 + 1;
        this.speedX = (Math.random() - 0.5) * 0.5;
        this.speedY = (Math.random() - 0.5) * 0.5;
        this.color = `rgba(${Math.floor(Math.random() * 50)}, ${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 150) + 100}, ${Math.random() * 0.5 + 0.2})`;
        this.connections = [];
      }
      
      update() {
        this.x += this.speedX;
        this.y += this.speedY;
        
        // Bounce off edges
        if (this.x > canvas.width || this.x < 0) {
          this.speedX = -this.speedX;
        }
        if (this.y > canvas.height || this.y < 0) {
          this.speedY = -this.speedY;
        }
      }
      
      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.fill();
      }
    }

    function createParticles() {
      for (let i = 0; i < numberOfParticles; i++) {
        particlesArray.push(new Particle());
      }
    }

    function connectParticles() {
      let opacityValue = 1;
      for (let a = 0; a < particlesArray.length; a++) {
        for (let b = a; b < particlesArray.length; b++) {
          const dx = particlesArray[a].x - particlesArray[b].x;
          const dy = particlesArray[a].y - particlesArray[b].y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          if (distance < 100) {
            opacityValue = 1 - (distance / 100);
            ctx.strokeStyle = `rgba(0, 255, 190, ${opacityValue * 0.2})`;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(particlesArray[a].x, particlesArray[a].y);
            ctx.lineTo(particlesArray[b].x, particlesArray[b].y);
            ctx.stroke();
          }
        }
      }
    }

    function animate() {
      requestAnimationFrame(animate);
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      for (let i = 0; i < particlesArray.length; i++) {
        particlesArray[i].update();
        particlesArray[i].draw();
      }
      connectParticles();
    }

    // Handle window resize
    function handleResize() {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      particlesArray.length = 0;
      createParticles();
    }

    window.addEventListener('resize', handleResize);
    createParticles();
    animate();

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return <canvas ref={canvasRef} className="absolute inset-0 z-0 opacity-40" />;
};

// Matrix background effect with enhanced visuals
const MatrixBackground = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const fontSize = 14;
    const columns = Math.ceil(canvas.width / fontSize);
    const drops = Array(columns).fill(1);
    
    // Mix of code-related characters and symbols
    const matrix = "10アイウエオカキクケコサシスセソタチツテト{}[]=><&|!;:~^%$#@*/\\+-_ナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン";

    function draw() {
      ctx.fillStyle = "rgba(0, 0, 0, 0.05)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      for (let i = 0; i < drops.length; i++) {
        // Vary the color slightly for visual interest
        const green = 200 + Math.floor(Math.random() * 55);
        ctx.fillStyle = `rgba(0, ${green}, ${Math.floor(green/2)}, 0.8)`;
        ctx.font = `${fontSize}px 'JetBrains Mono', monospace`;
        
        const text = matrix[Math.floor(Math.random() * matrix.length)];
        ctx.fillText(text, i * fontSize, drops[i] * fontSize);

        // Add random dots occasionally for texture
        if (Math.random() > 0.995) {
          ctx.fillStyle = "rgba(0, 255, 170, 0.3)";
          ctx.fillRect(i * fontSize, drops[i] * fontSize, fontSize, fontSize);
        }

        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
          drops[i] = 0;
        }
        drops[i]++;
      }
    }

    const interval = setInterval(draw, 35);
    
    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    
    window.addEventListener('resize', handleResize);
    
    return () => {
      clearInterval(interval);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return <canvas ref={canvasRef} className="absolute inset-0 z-0 opacity-20" />;
};



// Floating code snippets that appear randomly
const FloatingCodeSnippets = () => {
  const snippets = [
    "function solve(algorithm) { return optimal_solution; }",
    "const tekstra = new CodingClub({ passion: true });",
    "import { success } from 'your-future';",
    "while(true) { improve(skills); }",
    "git commit -m 'Join Tekstra today!'",
    "class Developer extends Student { constructor() { super(motivation); } }"
  ];

  return (
    <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
      {snippets.map((snippet, index) => (
        <motion.div
          key={index}
          initial={{ 
            opacity: 0, 
            x: Math.random() * window.innerWidth, 
            y: Math.random() * window.innerHeight 
          }}
          animate={{ 
            opacity: [0, 0.7, 0],
            x: Math.random() * window.innerWidth,
            y: Math.random() * window.innerHeight
          }}
          transition={{ 
            duration: 10,
            delay: index * 2, 
            repeat: Infinity,
            repeatType: "loop"
          }}
          className="absolute text-teal-500/20 text-sm font-mono whitespace-nowrap"
        >
          {snippet}
        </motion.div>
      ))}
    </div>
  );
};

// Glitch text effect

// Main hero component
export default function TekstraHero() {
  const [activeSection, setActiveSection] = useState(0);
  
  // Cycle through different text sections
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveSection((prev) => (prev + 1) % 3);
    }, 4000);
    
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative min-h-screen overflow-hidden bg-gray-950 flex items-center justify-center text-white">
      {/* Define animations in the style tag */}
      <style jsx global>{`
        @keyframes blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }
        
        @keyframes shimmer {
          0%, 100% { transform: translateX(-100%); }
          50% { transform: translateX(100%); }
        }
        
        @keyframes glitch-1 {
          0%, 100% { transform: translate(0); }
          20% { transform: translate(-2px, 2px); }
          40% { transform: translate(-2px, -2px); }
          60% { transform: translate(2px, 2px); }
          80% { transform: translate(2px, -2px); }
        }
        
        @keyframes glitch-2 {
          0%, 100% { transform: translate(0); }
          20% { transform: translate(2px, -2px); }
          40% { transform: translate(2px, 2px); }
          60% { transform: translate(-2px, -2px); }
          80% { transform: translate(-2px, 2px); }
        }
        
        .animate-blink {
          animation: blink 0.8s infinite;
        }
        
        .animate-shimmer {
          animation: shimmer 3s infinite;
        }
        
        .animate-glitch-1 {
          animation: glitch-1 0.5s infinite alternate-reverse;
        }
        
        .animate-glitch-2 {
          animation: glitch-2 0.5s infinite alternate-reverse;
        }
      `}</style>
      
      {/* Background elements */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-teal-900/20 via-gray-950 to-gray-950 z-0"></div>
      <MatrixBackground />
      <ParticleSystem />
      <FloatingCodeSnippets />
      
      {/* Decorative grid lines */}
      <div className="absolute inset-0 z-0 opacity-10" 
        style={{ 
          backgroundImage: "linear-gradient(to right, #0f6 1px, transparent 1px), linear-gradient(to bottom, #0f6 1px, transparent 1px)",
          backgroundSize: "40px 40px" 
        }}>
      </div>
      
      {/* Content container */}
      <div className="container mx-auto px-4 z-10 py-8">
        <div className="flex flex-col items-center text-center max-w-4xl mx-auto">
          {/* Badge with pulse effect */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ 
              duration: 0.6,
              type: "spring",
              stiffness: 200
            }}
            className="mb-6"
          >
            <div className="relative inline-flex items-center px-6 py-3 bg-teal-900/80 text-teal-300 rounded-md border border-teal-500 shadow-lg text-lg font-mono overflow-hidden">
      {/* Shimmer Background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="w-full h-full bg-gradient-to-r from-transparent via-teal-600/30 to-transparent animate-shimmer"></div>
      </div>

      {/* Code Icon */}
      <FaCode className="mr-3 text-teal-400 animate-pulse text-xl" />

      {/* Typing Text */}
      <p>console.log("IITRAM's Coding Community");</p>
    </div>
          </motion.div>

          {/* Main title with glitch effect */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
  transition={{
    duration: 0.8,
    delay: 0.2,
    type: "spring",
    damping: 12,
  }}
  className="text-5xl md:text-7xl font-bold mb-6 relative font-['Fira Code', monospace] tracking-tight"
>
  <span className="absolute -inset-4 bg-cyan-400/20 blur-2xl opacity-30 animate-pulse rounded-full"></span>
  <span className="bg-gradient-to-r font-jetbrains-mono from-cyan-400 to-purple-500 bg-clip-text text-transparent">
    WELCOME TO TEKSTRA
            </span>
          </motion.h1>


          
          {/* Subtitle with rotating text */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mb-8 h-24"
          >
            <AnimatePresence mode="wait">
              <motion.h2 
                key={activeSection}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
                className="text-2xl md:text-3xl text-gray-300 font-['JetBrains Mono', monospace]"
              >
                {activeSection === 0 && (
                  <>
                    <span className="text-teal-400">{"function "}</span>
                    <span className="text-cyan-300">{"Tekstra"}</span>
                    <span className="text-gray-400">{"() {"}</span>
                    <span className="block mt-2 text-xl md:text-2xl">
                      <span className="text-purple-400 ml-8">{"return "}</span>
                      <span className="text-orange-300">{"'Code. Collaborate. Create.'"}</span>
                    </span>
                    <span className="text-gray-400">{"}"}</span>
                  </>
                )}
                {activeSection === 1 && (
                 <>
                 <span className="text-teal-400">{"if"}</span>
                 <span className="text-gray-300">{" (curiosity && perseverance) {"}</span>
                 <span className="block mt-2 text-xl md:text-2xl">
                   <span className="text-purple-400 ml-8">{"growWith"}</span>
                   <span className="text-gray-300">{"("}</span>
                   <span className="text-orange-300">{"'Tekstra'"}</span>
                   <span className="text-gray-300">{");"}</span>
                 </span>
                 <span className="text-gray-400">{"}"}</span>
               </>
               
                )}
                {activeSection === 2 && (
                 <>
                 <span className="text-teal-400">{"class "}</span>
                 <span className="text-cyan-300">{"CodeExplorer "}</span>
                 <span className="text-purple-400">{"extends "}</span>
                 <span className="text-orange-300">{"LifelongLearner"}</span>
                 <span className="text-gray-300">{" {"}</span>
                 <span className="block mt-2 text-xl md:text-2xl text-gray-400 ml-8">
                   {"// Sharing knowledge, solving problems, growing together."}
                 </span>
                 <span className="text-gray-300">{"}"}</span>
               </>
               
                
                )}
              </motion.h2>
            </AnimatePresence>
          </motion.div>

         
          
          {/* CTA buttons with animated effects */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.6, delay: 1.2 }}
  className="flex flex-col sm:flex-row gap-4 mt-10"
>
  <motion.button 
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.95 }}
    className="relative px-8 py-4 bg-gradient-to-r from-cyan-400 to-purple-500 rounded-md text-black font-bold transition-all shadow-lg shadow-cyan-500/20 font-['JetBrains Mono', monospace] overflow-hidden group"
  >
    <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-cyan-300/0 via-white/30 to-purple-300/0 transform -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></span>
    <span className="flex items-center gap-2 relative z-10">
      <FaBookOpen className="group-hover:rotate-12 transition-transform" />
      Read Our Magazine
    </span>
  </motion.button>
  
  <motion.button 
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.95 }}
    className="relative px-8 py-4 bg-gray-900/50 backdrop-blur-sm border border-cyan-400 rounded-md text-cyan-400 transition-all font-['JetBrains Mono', monospace] overflow-hidden group"
  >
    <span className="absolute inset-0 w-1/2 h-full bg-cyan-500/10 transform -skew-x-20 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></span>
    <span className="flex items-center gap-2 relative z-10">
      <FaHandshake className="group-hover:rotate-12 transition-transform" />
      Let's Collaborate
    </span>
  </motion.button>
            </motion.div>


          
       
          
         
        </div>
      </div>

    </section>
  );
}