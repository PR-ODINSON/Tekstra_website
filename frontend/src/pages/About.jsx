import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { 
  FaGithub, FaLinkedin, FaEnvelope, FaMapMarkerAlt, FaPhone, 
  FaCode, FaLaptopCode, FaServer, FaRobot, FaUserNinja, FaUserShield,
  FaChevronRight, FaNetworkWired, FaShieldAlt, FaHome, FaArrowLeft
} from "react-icons/fa";
import { Link } from "react-router-dom";
import TerminalEffect from "../components/terminal-effect";
import useScrollTop from "../hooks/useScrollTop";



const CircuitPattern = ({ className }) => (
  <div className={`absolute inset-0 pointer-events-none opacity-20 ${className}`}>
    <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
      <pattern id="circuit-pattern" x="0" y="0" width="100" height="100" patternUnits="userSpaceOnUse">
        <path d="M0,50 L100,50 M50,0 L50,100 M25,25 L75,75 M75,25 L25,75" stroke="currentColor" strokeWidth="0.5" fill="none" />
        <circle cx="50" cy="50" r="3" fill="currentColor" />
        <circle cx="25" cy="25" r="2" fill="currentColor" />
        <circle cx="75" cy="75" r="2" fill="currentColor" />
        <circle cx="75" cy="25" r="2" fill="currentColor" />
        <circle cx="25" cy="75" r="2" fill="currentColor" />
      </pattern>
      <rect width="100%" height="100%" fill="url(#circuit-pattern)" />
    </svg>
  </div>
);

const HexagonalPattern = ({ className }) => (
  <div className={`absolute inset-0 pointer-events-none opacity-10 ${className}`}>
    <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
      <pattern id="hexagon-pattern" x="0" y="0" width="120" height="120" patternUnits="userSpaceOnUse">
        <path d="M30,0 L90,0 L120,60 L90,120 L30,120 L0,60 Z" stroke="currentColor" strokeWidth="0.5" fill="none" />
        <path d="M60,30 L90,60 L60,90 L30,60 Z" stroke="currentColor" strokeWidth="0.5" fill="none" />
      </pattern>
      <rect width="100%" height="100%" fill="url(#hexagon-pattern)" />
    </svg>
  </div>
);

const CyberHeading = ({ children, className }) => {
  return (
    <div className={`relative ${className}`}>
      <div className="absolute -inset-1 bg-gradient-to-r from-teal-500/20 via-cyan-500/20 to-purple-500/20 blur-xl opacity-70 rounded-lg"></div>
      <h2 className="relative z-10 text-transparent bg-clip-text bg-gradient-to-r from-teal-400 via-cyan-300 to-purple-400 font-bold text-4xl font-rajdhani">
        {children}
      </h2>
      <div className="absolute -bottom-2 left-0 h-0.5 w-full bg-gradient-to-r from-teal-500 via-cyan-400 to-purple-500 opacity-70"></div>
    </div>
  );
};

const NeonCard = ({ icon: Icon, title, children, color = "teal", delay = 0 }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay }}
      viewport={{ once: true }}
      className={`group relative bg-gray-900/70 backdrop-blur-sm p-8 rounded-lg border border-${color}-500/30 hover:border-${color}-400/60 transition-all duration-300`}
    >
      <div className={`absolute inset-0 bg-gradient-to-r from-${color}-500/0 via-${color}-500/5 to-${color}-500/0 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500`}></div>
      <div className={`absolute -inset-px bg-${color}-500/20 rounded-lg opacity-0 group-hover:opacity-30 blur-lg transition-opacity duration-500`}></div>
      
      <Icon className={`text-4xl text-${color}-400 mx-auto mb-6 group-hover:text-${color}-300 transition-colors duration-300`} />
      <h3 className={`text-2xl font-bold text-${color}-400 mb-4 group-hover:text-${color}-300 transition-colors duration-300`}>{title}</h3>
      <div className="text-gray-300 text-lg group-hover:text-white transition-colors duration-300">
        {children}
      </div>
    </motion.div>
  );
};

const MatrixRain = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;

    const characters = "01アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン";
    const fontSize = 12;
    const columns = Math.floor(canvas.width / fontSize);
    const drops = [];

    for (let i = 0; i < columns; i++) {
      drops[i] = Math.floor(Math.random() * canvas.height);
    }

    const draw = () => {
      ctx.fillStyle = "rgba(0, 0, 0, 0.05)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.fillStyle = "#0fa";
      ctx.font = `${fontSize}px monospace`;

      for (let i = 0; i < drops.length; i++) {
        const text = characters.charAt(Math.floor(Math.random() * characters.length));
        ctx.fillText(text, i * fontSize, drops[i] * fontSize);

        if (drops[i] * fontSize > canvas.height && Math.random() > 0.99) {
          drops[i] = 0;
        }

        drops[i]++;
      }
    };

    const interval = setInterval(draw, 33);
    return () => clearInterval(interval);
  }, []);

  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full opacity-20" />;
};

const About = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const aboutHeaderRef = useRef(null);
  
  // Use scroll hook to ensure page scrolls to top
  useScrollTop();
  
  const handleMouseMove = (e) => {
    setMousePosition({ x: e.clientX, y: e.clientY });
  };

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className="min-h-screen bg-black text-gray-100 font-jetbrains-mono overflow-hidden">
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-b from-teal-900/10 via-purple-900/5 to-black"></div>
        <MatrixRain />
        <CircuitPattern className="text-teal-500" />
        <HexagonalPattern className="text-cyan-500" />
      </div>
      
      {/* Spotlight effect following mouse */}
      <div 
        className="fixed inset-0 bg-radial-gradient opacity-20 pointer-events-none z-0" 
        style={{
          background: `radial-gradient(circle 200px at ${mousePosition.x}px ${mousePosition.y}px, rgba(20, 184, 166, 0.15), transparent)`,
        }}
      ></div>

      {/* Header Section */}
      <section className="relative py-32 overflow-hidden">
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <div className="inline-block px-4 py-1 border border-teal-500/30 rounded-full bg-black/50 mb-4">
              <span className="text-teal-400">$</span>
              <TerminalEffect text=" cybersystem: profile.load --target=tekstra" typingSpeed={30} />
            </div>
            
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="relative mb-4"
            >
              <div className="absolute -inset-4 bg-teal-500/20 rounded-lg blur-3xl opacity-20 animate-pulse-slow"></div>
              <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold font-audiowide relative ">
  <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-400 via-cyan-300 to-purple-400">
    ABOUT_TEKSTRA
  </span>
  <span className="absolute -top-1 sm:-top-2 -right-1 sm:-right-2 text-[8px] sm:text-xs text-teal-400 opacity-70">
    v2.0
  </span>
</h1>

            </motion.div>
            
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 1, ease: "easeInOut" }}
              className="h-px w-32 md:w-64 bg-gradient-to-r from-transparent via-teal-500 to-transparent mx-auto mb-8"
            ></motion.div>
            
            <div className="backdrop-blur-sm py-2 inline-block px-6 rounded-lg">
              <TerminalEffect text="// Where Code Meets Innovation //" />
            </div>
          </motion.div>
        </div>
      </section>

      {/* About Us Section */}
      <section className="relative py-24">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="space-y-8"
            >
              <div className="flex items-center">
                <div className="h-10 w-1 bg-gradient-to-b from-teal-400 to-cyan-400 mr-4 rounded-full"></div>
                <CyberHeading>Our Story</CyberHeading>
              </div>
              
              <div className="space-y-6">
                <p className="text-gray-300 leading-relaxed text-lg backdrop-blur-sm p-4 border-l-2 border-teal-500/50 bg-black/30">
                  <span className="text-teal-400 font-bold">Tekstra</span> is more than just a coding club - it's a collective of cyber warriors,
                  digital architects, and tech pioneers united by our passion for technology and innovation.
                </p>
                <p className="text-gray-300 leading-relaxed text-lg backdrop-blur-sm p-4 border-l-2 border-purple-500/50 bg-black/30">
                  Founded with a vision to push the boundaries of what's possible in the digital realm,
                  we've evolved into a hub where cutting-edge ideas are born, tested, and deployed.
                </p>
                
                <div className="relative">
                  <div className="absolute -inset-2 bg-gradient-to-r from-teal-500/10 to-cyan-500/10 blur-md rounded-lg"></div>
                  <div className="relative flex items-center space-x-2 text-teal-400 font-mono p-3 border border-teal-500/30 rounded-lg bg-black/40">
                    <span className="animate-pulse text-green-400">▶</span>
                    <TerminalEffect text="System Status: [OPERATIONAL]" />
                  </div>
                </div>
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="absolute -inset-4 bg-gradient-to-r from-teal-500/20 via-cyan-500/10 to-purple-500/20 blur-2xl rounded-lg"></div>
              <div className="relative bg-gray-900/50 backdrop-blur-md p-8 rounded-lg border border-teal-500/30">
                <h3 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-cyan-400 mb-6 font-rajdhani flex items-center">
                  <FaNetworkWired className="mr-3 text-teal-400" />
                  Our Mission
                </h3>
                <ul className="space-y-6">
                  <li className="flex items-start space-x-4 group">
                    <div className="flex-shrink-0 mt-1 w-6 h-6 rounded-full border border-teal-500/50 flex items-center justify-center group-hover:border-teal-400 transition-colors duration-300">
                      <span className="text-teal-500 text-sm group-hover:text-teal-400 transition-colors duration-300">01</span>
                    </div>
                    <div>
                      <h4 className="text-teal-400 font-bold mb-2 group-hover:text-teal-300 transition-colors duration-300 flex items-center">
                        <span>Innovate & Disrupt</span>
                        <span className="ml-2 text-teal-500/50 text-xs">[PRIORITY_HIGH]</span>
                      </h4>
                      <p className="text-gray-300 group-hover:text-gray-200 transition-colors duration-300">
                        Foster a culture where innovation thrives and conventional limits are challenged.
                      </p>
                    </div>
                  </li>
                  <li className="flex items-start space-x-4 group">
                    <div className="flex-shrink-0 mt-1 w-6 h-6 rounded-full border border-cyan-500/50 flex items-center justify-center group-hover:border-cyan-400 transition-colors duration-300">
                      <span className="text-cyan-500 text-sm group-hover:text-cyan-400 transition-colors duration-300">02</span>
                    </div>
                    <div>
                      <h4 className="text-cyan-400 font-bold mb-2 group-hover:text-cyan-300 transition-colors duration-300 flex items-center">
                        <span>Build & Deploy</span>
                        <span className="ml-2 text-cyan-500/50 text-xs">[ACTIVE]</span>
                      </h4>
                      <p className="text-gray-300 group-hover:text-gray-200 transition-colors duration-300">
                        Transform ideas into functioning solutions through collaborative development.
                      </p>
                    </div>
                  </li>
                  <li className="flex items-start space-x-4 group">
                    <div className="flex-shrink-0 mt-1 w-6 h-6 rounded-full border border-purple-500/50 flex items-center justify-center group-hover:border-purple-400 transition-colors duration-300">
                      <span className="text-purple-500 text-sm group-hover:text-purple-400 transition-colors duration-300">03</span>
                    </div>
                    <div>
                      <h4 className="text-purple-400 font-bold mb-2 group-hover:text-purple-300 transition-colors duration-300 flex items-center">
                        <span>Connect & Grow</span>
                        <span className="ml-2 text-purple-500/50 text-xs">[ONGOING]</span>
                      </h4>
                      <p className="text-gray-300 group-hover:text-gray-200 transition-colors duration-300">
                        Establish a network of tech enthusiasts and industry professionals for knowledge exchange.
                      </p>
                    </div>
                  </li>
                </ul>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

     

      {/* Club Info Section */}
      <section className="py-24 relative">
        <motion.div
          initial={{ opacity: 0, y: 100 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="absolute right-0 top-0 h-full w-1/3 border-r border-cyan-500/20 opacity-20 pointer-events-none"
        />
        <motion.div
          initial={{ opacity: 0, y: 100 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          viewport={{ once: true }}
          className="absolute left-0 bottom-0 h-1/3 w-full border-b border-teal-500/20 opacity-20 pointer-events-none"
        />
        
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              <CyberHeading className="inline-block">WHAT WE DO</CyberHeading>
            </motion.div>
            <motion.div 
              className="h-px w-48 bg-gradient-to-r from-transparent via-teal-500 to-transparent mx-auto mt-6"
              initial={{ width: 0, opacity: 0 }}
              whileInView={{ width: "12rem", opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
            ></motion.div>
            <motion.p 
              className="text-gray-400 mt-6 max-w-2xl mx-auto"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              viewport={{ once: true }}
            >
              Explore our core activities and how we're shaping the future of technology
            </motion.p>
          </motion.div>
          
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <NeonCard icon={FaLaptopCode} title="Hackathons" color="teal" delay={0.1}>
              <p>48-hour coding marathons where teams compete to build innovative solutions to real-world problems.</p>
             
            </NeonCard>
            
            <NeonCard icon={FaUserNinja} title="Workshops" color="cyan" delay={0.2}>
              <p>Hands-on sessions on cutting-edge technologies taught by industry professionals and expert members.</p>
              
            </NeonCard>
            
            <NeonCard icon={FaCode} title="Projects" color="purple" delay={0.3}>
              <p>Collaborative development of real-world applications, open-source contributions, and research initiatives.</p>
              
            </NeonCard>
            
            <NeonCard icon={FaServer} title="Network" color="emerald" delay={0.4}>
              <p>Building connections with alumni, industry partners, and other tech communities around the world.</p>
             
            </NeonCard>
            
            <NeonCard icon={FaRobot} title="Research" color="blue" delay={0.5}>
              <p>Exploring emerging fields like AI, machine learning, blockchain, and quantum computing.</p>
             
            </NeonCard>
            
            <NeonCard icon={FaUserShield} title="Mentorship" color="pink" delay={0.6}>
              <p>Guiding new members through personalized learning paths and career development opportunities.</p>
              
            </NeonCard>
          </motion.div>
        </div>
      </section>

      {/* Contact Section */}
     
    </div>
  );
};

export default About;