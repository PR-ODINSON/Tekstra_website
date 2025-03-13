import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { FaLock, FaUnlock, FaShieldAlt, FaCode, FaServer, FaSyncAlt } from 'react-icons/fa';

// Enhanced circuit pattern with more visual details
const CyberCircuits = () => {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden mix-blend-lighten">
      {/* Animated circuit lines */}
      <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg" className="opacity-40">
        <defs>
          <linearGradient id="circuit-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#06b6d4" stopOpacity="0.6" />
            <stop offset="50%" stopColor="#8b5cf6" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#06b6d4" stopOpacity="0.6" />
          </linearGradient>
        </defs>
        
        {/* Horizontal circuit lines */}
        {Array.from({ length: 8 }).map((_, i) => (
          <motion.path
            key={`h-${i}`}
            d={`M0,${30 + i * 60} H${window.innerWidth}`}
            stroke="url(#circuit-gradient)"
            strokeWidth="0.5"
            fill="none"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ 
              pathLength: [0, 1, 1, 1, 1, 1, 0],
              opacity: [0, 1, 1, 1, 1, 1, 0],
              strokeWidth: [0.5, 1, 1.5, 1, 1.5, 1, 0.5]
            }}
            transition={{ 
              duration: 8, 
              repeat: Infinity, 
              repeatType: "loop",
              times: [0, 0.1, 0.3, 0.5, 0.7, 0.9, 1],
              delay: i * 0.5 
            }}
          />
        ))}
        
        {/* Vertical circuit lines */}
        {Array.from({ length: 12 }).map((_, i) => (
          <motion.path
            key={`v-${i}`}
            d={`M${40 + i * 100},0 V${window.innerHeight}`}
            stroke="url(#circuit-gradient)"
            strokeWidth="0.5"
            fill="none"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ 
              pathLength: [0, 1, 1, 1, 1, 1, 0],
              opacity: [0, 1, 1, 1, 1, 1, 0],
              strokeWidth: [0.5, 1, 1.5, 1, 1.5, 1, 0.5]
            }}
            transition={{ 
              duration: 10, 
              repeat: Infinity, 
              repeatType: "loop",
              times: [0, 0.1, 0.3, 0.5, 0.7, 0.9, 1],
              delay: i * 0.2 
            }}
          />
        ))}
        
        {/* Connection nodes */}
        {Array.from({ length: 15 }).map((_, i) => (
          <motion.circle
            key={`node-${i}`}
            cx={100 + Math.random() * (window.innerWidth - 200)}
            cy={100 + Math.random() * (window.innerHeight - 200)}
            r={2 + Math.random() * 3}
            fill="#06b6d4"
            initial={{ opacity: 0.3, r: 1 }}
            animate={{ 
              opacity: [0.3, 1, 0.3],
              r: [1, 3, 1],
              filter: ["blur(0px)", "blur(2px)", "blur(0px)"]
            }}
            transition={{ 
              duration: 2 + Math.random() * 3, 
              repeat: Infinity,
              repeatType: "reverse",
              ease: "easeInOut",
              delay: Math.random() * 2
            }}
          />
        ))}
      </svg>
    </div>
  );
};

// Background hexagon grid pattern
const HexagonGrid = () => {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-20">
      <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
        <pattern id="hexagon-pattern" width="40" height="40" patternUnits="userSpaceOnUse" patternTransform="scale(0.5)">
          <path d="M14.9282,4.01175 L5.78394,9.01175 C5.30167,9.2906 5,9.80021 5,10.35 L5,20.35 C5,20.8998 5.30167,21.4094 5.78394,21.6882 L14.9282,26.6882 C15.414,26.9694 16.0023,26.9694 16.4877,26.6882 L25.6318,21.6882 C26.1141,21.4094 26.4155,20.8998 26.4155,20.35 L26.4155,10.35 C26.4155,9.80021 26.1141,9.2906 25.6318,9.01175 L16.4877,4.01175 C16.0023,3.73062 15.414,3.73062 14.9282,4.01175 Z" 
                fill="none" stroke="#06b6d4" strokeWidth="0.3" />
        </pattern>
        <rect width="100%" height="100%" fill="url(#hexagon-pattern)" />
      </svg>
    </div>
  );
};

// Vibrant glow effect for text
const GlowingText = ({ children, className = "", glowColor = "cyan" }) => {
  const colors = {
    cyan: "from-cyan-400 to-cyan-200 shadow-cyan-500/50",
    purple: "from-purple-400 to-purple-200 shadow-purple-500/50",
    blue: "from-blue-400 to-blue-200 shadow-blue-500/50"
  };
  
  return (
    <span className={`relative font-rajdhani font-bold ${className}`}>
      <span className={`absolute inset-0 blur-md bg-gradient-to-br ${colors[glowColor]} opacity-70`}></span>
      <span className={`relative bg-gradient-to-br text-transparent bg-clip-text ${colors[glowColor]}`}>
        {children}
      </span>
    </span>
  );
};

// Interactive data display with animating numbers
const DataDisplay = ({ label, value, icon, color }) => {
  const [displayValue, setDisplayValue] = useState(0);
  
  useEffect(() => {
    let timeout;
    let interval;
    
    // Start animating after a short delay
    timeout = setTimeout(() => {
      // Step up to the target value
      let current = 0;
      interval = setInterval(() => {
        current += Math.ceil(value / 20);
        if (current >= value) {
          current = value;
          clearInterval(interval);
        }
        setDisplayValue(current);
      }, 30);
    }, Math.random() * 1000);
    
    return () => {
      clearTimeout(timeout);
      clearInterval(interval);
    };
  }, [value]);
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className={`flex items-center space-x-2 px-3 py-1.5 bg-gradient-to-r ${
        color === 'cyan' ? 'from-cyan-900/30 to-cyan-800/20 border-cyan-600/30' :
        color === 'purple' ? 'from-purple-900/30 to-purple-800/20 border-purple-600/30' :
        'from-blue-900/30 to-blue-800/20 border-blue-600/30'
      } border rounded-lg backdrop-blur-sm`}
    >
      <span className={`text-${color}-400`}>{icon}</span>
      <div className="flex flex-col">
        <span className={`text-${color}-300 text-xs uppercase tracking-wider`}>{label}</span>
        <span className="text-white font-mono text-sm font-bold">{displayValue}</span>
      </div>
    </motion.div>
  );
};

// Main Loading component with impressive visuals
export default function Loading({ progress: externalProgress }) {
  const [progress, setProgress] = useState(0);
  const [currentIcon, setCurrentIcon] = useState(0);
  const [glitchActive, setGlitchActive] = useState(false);
  const containerRef = useRef(null);
  
  const icons = [
    <FaServer key="server" className="text-cyan-400" />,
    <FaLock key="lock" className="text-purple-400" />,
    <FaCode key="chip" className="text-cyan-400" />,
    <FaCode key="code" className="text-blue-400" />,
    <FaShieldAlt key="shield" className="text-green-400" />,
    <FaUnlock key="unlock" className="text-yellow-400" />
  ];
  
  useEffect(() => {
    // Handle progress updates
    if (externalProgress !== undefined) {
      setProgress(externalProgress);
    } else {
      const interval = setInterval(() => {
        setProgress(prev => prev >= 100 ? 100 : prev + 1);
      }, 30);
      return () => clearInterval(interval);
    }
    
    // Cycle through icons
    const iconInterval = setInterval(() => {
      setCurrentIcon(prev => (prev + 1) % icons.length);
    }, 800);
    
    // Occasional glitch effect
    const glitchInterval = setInterval(() => {
      if (Math.random() > 0.8) {
        setGlitchActive(true);
        setTimeout(() => setGlitchActive(false), 150);
      }
    }, 1200);
    
    return () => {
      clearInterval(iconInterval);
      clearInterval(glitchInterval);
    };
  }, [externalProgress, icons.length]);
  
  // Status message based on progress
  const getStatusMessage = () => {
    if (progress < 20) return "ESTABLISHING CONNECTION";
    if (progress < 40) return "INITIALIZING CORE SYSTEMS";
    if (progress < 60) return "LOADING DATA MODULES";
    if (progress < 80) return "CONFIGURING INTERFACE";
    if (progress < 95) return "FINALIZING SETUP";
    return "SYSTEM READY";
  };
  
  // Calculate visual elements based on progress
  const progressSpinRate = 10 - (progress / 10); // spin faster at start, slower at end
  
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-900/95 backdrop-blur-md z-50 overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-gray-900 via-gray-900 to-black"></div>
      <HexagonGrid />
      <CyberCircuits />
      
      {/* Radial glow that pulses */}
      <motion.div 
        className="absolute inset-0 bg-[radial-gradient(circle_500px_at_center,_var(--tw-gradient-stops))]"
        style={{ 
          backgroundImage: `radial-gradient(circle 400px at center, rgba(6, 182, 212, 0.15), transparent)`,
        }}
        animate={{ 
          opacity: [0.3, 0.5, 0.3],
          scale: [0.8, 1, 0.8]
        }}
        transition={{ 
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      
      {/* Main content container */}
      <div 
        ref={containerRef} 
        className={`relative overflow-hidden rounded-lg w-96 ${glitchActive ? 'translate-x-1' : ''}`}
      >
        {/* Content wrapper with glassmorphism effect */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className={`relative backdrop-blur-md rounded-xl border-2 border-cyan-500/30 overflow-hidden shadow-2xl shadow-cyan-500/20 ${
            glitchActive ? 'border-purple-500/50' : ''
          }`}
        >
          {/* Animated border glow */}
          <motion.div 
            className="absolute inset-0 opacity-50"
            animate={{ 
              background: [
                'linear-gradient(0deg, rgba(6, 182, 212, 0.3) 0%, rgba(139, 92, 246, 0) 100%)',
                'linear-gradient(90deg, rgba(6, 182, 212, 0) 0%, rgba(139, 92, 246, 0.3) 100%)',
                'linear-gradient(180deg, rgba(6, 182, 212, 0) 0%, rgba(139, 92, 246, 0.3) 100%)',
                'linear-gradient(270deg, rgba(6, 182, 212, 0.3) 0%, rgba(139, 92, 246, 0) 100%)',
                'linear-gradient(0deg, rgba(6, 182, 212, 0.3) 0%, rgba(139, 92, 246, 0) 100%)',
              ]
            }}
            transition={{ 
              duration: 8, 
              repeat: Infinity,
              repeatType: "loop"
            }}
          />
          
          {/* Content area with dark gradient */}
          <div className="bg-gradient-to-b from-gray-900/80 to-black/90 py-8 px-10 relative z-10">
            {/* Header with cyberpunk logo */}
            <div className="relative mb-8 text-center">
              {/* Decorative top corner elements */}
              <div className="absolute top-0 left-0 w-10 h-10 border-l-2 border-t-2 border-cyan-500/40 opacity-80"></div>
              <div className="absolute top-0 right-0 w-10 h-10 border-r-2 border-t-2 border-cyan-500/40 opacity-80"></div>
              
              {/* Logo with subtle animations */}
              <motion.div
                animate={{ 
                  filter: glitchActive ? ["drop-shadow(0 0 8px #06b6d4)", "drop-shadow(0 0 2px #8b5cf6)", "drop-shadow(0 0 8px #06b6d4)"] : ["drop-shadow(0 0 5px #06b6d4)", "drop-shadow(0 0 8px #06b6d4)", "drop-shadow(0 0 5px #06b6d4)"]
                }}
                transition={{ duration: 3, repeat: Infinity }}
                className="mb-2"
              >
                <GlowingText className="text-3xl">TEKSTRA</GlowingText>
              </motion.div>
              
              <motion.div
                animate={{ opacity: [0.7, 1, 0.7] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="text-sm text-cyan-300/80 uppercase tracking-widest font-mono"
              >
                System Initialization
              </motion.div>
              
              {/* Animated separator line */}
              <motion.div 
                className="h-px w-full bg-gradient-to-r from-transparent via-cyan-500 to-transparent mt-4 mb-3"
                animate={{ 
                  opacity: [0.3, 0.8, 0.3],
                  width: ["60%", "80%", "60%"]
                }}
                transition={{ 
                  duration: 3,
                  repeat: Infinity,
                  repeatType: "reverse"
                }}
                style={{ margin: "0 auto" }}
              />
            </div>
            
            {/* Spinning cyber loader with progress display */}
            <div className="flex justify-center mb-6 relative">
              <div className="relative w-32 h-32">
                {/* Background glow */}
                <motion.div 
                  className="absolute inset-0 rounded-full bg-cyan-500/10 blur-xl"
                  animate={{ scale: [0.9, 1.1, 0.9], opacity: [0.2, 0.4, 0.2] }}
                  transition={{ duration: 3, repeat: Infinity }}
                />
                
                {/* Outer ring */}
                <svg viewBox="0 0 100 100" className="absolute inset-0 w-full h-full">
                  <motion.circle
                    cx="50"
                    cy="50"
                    r="46"
                    fill="none"
                    stroke="url(#progress-gradient)"
                    strokeWidth="2"
                    strokeDasharray="289.2"
                    strokeDashoffset={289.2 - (289.2 * (progress / 100))}
                    animate={{ rotate: 360 }}
                    transition={{ duration: progressSpinRate, repeat: Infinity, ease: "linear" }}
                  />
                  <defs>
                    <linearGradient id="progress-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#8b5cf6" />
                      <stop offset="100%" stopColor="#06b6d4" />
                    </linearGradient>
                  </defs>
                </svg>
                
                {/* Inner rotating elements */}
                <motion.div
                  className="absolute inset-0 w-full h-full"
                  animate={{ rotate: -360 }}
                  transition={{ duration: progressSpinRate / 1.5, repeat: Infinity, ease: "linear" }}
                >
                  <svg viewBox="0 0 100 100" className="w-full h-full">
                    <path 
                      d="M50,10 L50,20 M80,20 L72,28 M90,50 L80,50 M80,80 L72,72 M50,90 L50,80 M20,80 L28,72 M10,50 L20,50 M20,20 L28,28" 
                      stroke="#06b6d4" 
                      strokeWidth="3" 
                      strokeLinecap="round" 
                    />
                  </svg>
                </motion.div>
                
                {/* Center element with progress percentage */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="relative bg-gray-900 rounded-full w-20 h-20 flex items-center justify-center">
                    <motion.div
                      className="absolute inset-0 rounded-full"
                      style={{ 
                        background: `conic-gradient(from 0deg, #06b6d4 0%, #06b6d4 ${progress}%, transparent ${progress}%, transparent 100%)` 
                      }}
                      animate={{ opacity: [0.3, 0.5, 0.3] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    />
                    <div className="relative z-10 text-2xl font-bold text-white font-mono">
                      {progress}%
                    </div>
                    
                    {/* Spinning indicator */}
                    <motion.div 
                      className="absolute top-0 inset-x-0 flex justify-center"
                      animate={{ rotate: 360 }}
                      transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                    >
                      <FaSyncAlt className="text-cyan-500 opacity-80" size={16} />
                    </motion.div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Status indicators and messages */}
            <div className="mb-4">
              <div className="flex justify-between items-center mb-2">
                <div className="flex items-center space-x-2 text-cyan-400">
                  <span className="animate-pulse">{icons[currentIcon]}</span>
                  <span className="font-mono text-sm">{getStatusMessage()}</span>
                </div>
                
                {/* Animated indicator dots */}
                <div className="flex space-x-1">
                  <motion.div
                    animate={{ opacity: [0, 1, 0] }}
                    transition={{ duration: 1, repeat: Infinity, delay: 0 }}
                    className="w-1.5 h-1.5 rounded-full bg-cyan-400"
                  />
                  <motion.div
                    animate={{ opacity: [0, 1, 0] }}
                    transition={{ duration: 1, repeat: Infinity, delay: 0.3 }}
                    className="w-1.5 h-1.5 rounded-full bg-cyan-400"
                  />
                  <motion.div
                    animate={{ opacity: [0, 1, 0] }}
                    transition={{ duration: 1, repeat: Infinity, delay: 0.6 }}
                    className="w-1.5 h-1.5 rounded-full bg-cyan-400"
                  />
                </div>
              </div>
              
              {/* Metrics grid with animated data */}
              <div className="grid grid-cols-2 gap-2 mt-5">
                <DataDisplay 
                  label="Memory" 
                  value={progress < 50 ? Math.floor(progress * 2.56) : 256} 
                  icon={<FaCode size={12} />} 
                  color="cyan" 
                />
                <DataDisplay 
                  label="Modules" 
                  value={progress < 60 ? Math.floor(progress / 10) : 10} 
                  icon={<FaCode size={12} />} 
                  color="purple" 
                />
                <DataDisplay 
                  label="Security" 
                  value={progress < 80 ? Math.floor((progress / 100) * 100) : 100} 
                  icon={<FaShieldAlt size={12} />} 
                  color="blue" 
                />
                <DataDisplay 
                  label="Network" 
                  value={progress < 70 ? Math.floor((progress / 100) * 500) : 500} 
                  icon={<FaServer size={12} />} 
                  color="cyan" 
                />
              </div>
            </div>
            
            {/* Footer elements with animated border */}
            <div className="mt-6 relative pt-4">
              <motion.div 
                className="absolute top-0 h-px w-full bg-gradient-to-r from-transparent via-cyan-500 to-transparent"
                animate={{ 
                  opacity: [0.3, 0.7, 0.3],
                  width: ["60%", "90%", "60%"],
                  left: ["20%", "5%", "20%"]
                }}
                transition={{ 
                  duration: 4,
                  repeat: Infinity,
                  repeatType: "mirror"
                }}
              />
              
              <div className="flex items-center justify-between">
                <div className="text-xs text-cyan-400 font-mono">{progress >= 100 ? "READY" : "LOADING"}</div>
                <motion.div
                  animate={{ opacity: [0.6, 1, 0.6] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                  className="text-xs text-cyan-400 font-mono uppercase"
                >
                  {progress >= 100 ? "Press any key to continue" : "Please wait"}
                </motion.div>
              </div>
              
              {/* Decorative bottom corner elements */}
              <div className="absolute bottom-0 left-0 w-10 h-10 border-l-2 border-b-2 border-cyan-500/40 opacity-80"></div>
              <div className="absolute bottom-0 right-0 w-10 h-10 border-r-2 border-b-2 border-cyan-500/40 opacity-80"></div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
} 



