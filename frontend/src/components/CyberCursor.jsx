import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const CyberCursor = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [trailPositions, setTrailPositions] = useState([]);
  const [isPointer, setIsPointer] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  
  // Track mouse position
  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
      
      // Add current position to trail, limit to 6 points for better performance
      setTrailPositions(prev => {
        const updated = [{ x: e.clientX, y: e.clientY }, ...prev];
        return updated.slice(0, 6);
      });
    };
    
    // Track if mouse is over clickable elements
    const handleMouseOver = (e) => {
      const element = e.target;
      const isClickable = element.tagName === 'BUTTON' ||
                          element.tagName === 'A' ||
                          element.onclick !== null ||
                          window.getComputedStyle(element).cursor === 'pointer';
      
      setIsPointer(isClickable);
    };
    
    // Track mouse clicks to add click effect
    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);
    
    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseover', handleMouseOver);
    document.addEventListener('mousedown', handleMouseDown);
    document.addEventListener('mouseup', handleMouseUp);
    
    // Hide default cursor
    document.body.style.cursor = 'none';
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseover', handleMouseOver);
      document.removeEventListener('mousedown', handleMouseDown);
      document.removeEventListener('mouseup', handleMouseUp);
      document.body.style.cursor = 'auto';
    };
  }, []);
  
  // Colors based on state
  const getColors = () => {
    if (isClicking) {
      return {
        primary: 'rgba(255, 0, 128, 0.95)',    // Hot pink when clicking
        secondary: 'rgba(128, 0, 255, 0.8)',   // Purple glow
        tertiary: 'rgba(255, 80, 0, 0.6)',     // Orange accent
        shadow: '0 0 50px 25px rgba(255, 0, 128, 0.8), 0 0 100px 50px rgba(255, 0, 128, 0.4)'
      };
    }
    
    if (isPointer) {
      return {
        primary: 'rgba(0, 255, 255, 0.95)',    // Cyan for interactive elements
        secondary: 'rgba(0, 128, 255, 0.8)',   // Blue glow
        tertiary: 'rgba(0, 255, 170, 0.6)',    // Teal accent
        shadow: '0 0 40px 20px rgba(0, 255, 255, 0.7), 0 0 80px 40px rgba(0, 255, 255, 0.3)'
      };
    }
    
    return {
      primary: 'rgba(170, 0, 255, 0.9)',       // Purple default
      secondary: 'rgba(0, 255, 255, 0.7)',     // Cyan glow
      tertiary: 'rgba(255, 0, 255, 0.5)',      // Magenta accent
      shadow: '0 0 30px 15px rgba(170, 0, 255, 0.6), 0 0 70px 35px rgba(170, 0, 255, 0.3)'
    };
  };
  
  const colors = getColors();
  
  return (
    <div className="cyber-cursor-container fixed inset-0 pointer-events-none z-[9999]">
      {/* Extra large ambient glow */}
      <div 
        className="fixed rounded-full pointer-events-none mix-blend-lighten"
        style={{
          left: mousePosition.x,
          top: mousePosition.y,
          transform: 'translate(-50%, -50%)',
          width: isPointer ? '800px' : '700px',
          height: isPointer ? '800px' : '700px',
          background: `radial-gradient(circle, ${colors.tertiary}10 0%, ${colors.primary}05 40%, rgba(0,0,0,0) 70%)`,
          filter: 'blur(50px)',
          opacity: 0.15,
          zIndex: 9985
        }}
      />
      
      {/* Large spotlight/torch effect */}
      <div 
        className="fixed rounded-full pointer-events-none mix-blend-lighten"
        style={{
          left: mousePosition.x,
          top: mousePosition.y,
          transform: 'translate(-50%, -50%)',
          width: isPointer ? '1200px' : '1000px',
          height: isPointer ? '1200px' : '1000px',
          background: `radial-gradient(circle, ${colors.primary}40 0%, ${colors.secondary}30 30%, rgba(0,0,0,0) 70%)`,
          filter: 'blur(40px)',
          opacity: 0.4,
          zIndex: 9990
        }}
      />
      
      {/* Medium spotlight/torch effect */}
      <motion.div 
        className="fixed rounded-full pointer-events-none mix-blend-screen"
        style={{
          left: mousePosition.x,
          top: mousePosition.y,
          transform: 'translate(-50%, -50%)',
          width: '300px',
          height: '300px',
          zIndex: 9991
        }}
        animate={{
          background: `radial-gradient(circle, ${colors.primary}60 0%, ${colors.secondary}30 50%, rgba(0,0,0,0) 70%)`,
          opacity: [0.5, 0.4, 0.5],
        }}
        transition={{
          opacity: {
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          },
          background: { duration: 0.5 }
        }}
      />
      
      {/* Cyberpunk grid effect */}
      <motion.div
        className="fixed rounded-full overflow-hidden pointer-events-none mix-blend-lighten"
        style={{
          left: mousePosition.x,
          top: mousePosition.y,
          transform: 'translate(-50%, -50%)',
          width: '400px',
          height: '400px',
          opacity: 0.15,
          zIndex: 9992,
          backgroundImage: `radial-gradient(circle, transparent 0%, transparent 60%, rgba(0,0,0,0) 70%), 
                            linear-gradient(to right, ${colors.primary}50 1px, transparent 1px),
                            linear-gradient(to bottom, ${colors.primary}50 1px, transparent 1px)`,
          backgroundSize: '100% 100%, 20px 20px, 20px 20px',
          filter: 'blur(0.5px)'
        }}
        animate={{
          rotate: [0, 360],
        }}
        transition={{
          rotate: {
            duration: 20,
            repeat: Infinity,
            ease: "linear"
          }
        }}
      />
      
      {/* Glowing trail */}
      {trailPositions.map((pos, index) => (
        <motion.div
          key={`trail-${index}`}
          className="fixed rounded-full pointer-events-none mix-blend-screen"
          style={{
            left: pos.x,
            top: pos.y,
            opacity: 0.9 - index * 0.15, // Fade out older trail points
            transform: `translate(-50%, -50%) scale(${1 - index * 0.15})`,
            width: isPointer ? '16px' : '14px',  
            height: isPointer ? '16px' : '14px',
            background: `radial-gradient(circle, ${colors.primary} 30%, ${colors.secondary} 70%)`,
            boxShadow: `0 0 20px 10px ${colors.primary}60`,
            zIndex: 9995 - index
          }}
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.3 }}
        />
      ))}
      
      {/* Core cursor with pulsing effect */}
      <motion.div
        className="fixed rounded-full pointer-events-none mix-blend-screen"
        style={{
          left: mousePosition.x,
          top: mousePosition.y,
          transform: 'translate(-50%, -50%)',
          width: isPointer ? '28px' : '22px',
          height: isPointer ? '28px' : '22px',
          zIndex: 10000
        }}
        animate={{
          boxShadow: colors.shadow,
          scale: isClicking ? [1, 1.5, 1] : [1, 1.1, 1],
        }}
        transition={{
          scale: {
            duration: isClicking ? 0.3 : 2,
            repeat: Infinity,
            ease: isClicking ? "easeOut" : "easeInOut"
          },
          boxShadow: { duration: 0.3 }
        }}
      >
        {/* Outer ring */}
        <motion.div 
          className="absolute inset-0 rounded-full"
          style={{
            background: `radial-gradient(circle, ${colors.primary} 30%, transparent 70%)`,
            border: `2px solid ${colors.primary}`,
          }}
          animate={{
            opacity: [0.9, 1, 0.9]
          }}
          transition={{
            opacity: {
              duration: 1.5,
              repeat: Infinity,
              ease: "easeInOut"
            }
          }}
        />
        
        {/* Inner core of cursor */}
        <motion.div 
          className="absolute rounded-full"
          style={{
            inset: '5px',
            background: colors.primary,
            boxShadow: `0 0 10px 5px ${colors.primary}`,
          }}
          animate={{
            opacity: [1, 0.8, 1]
          }}
          transition={{
            opacity: {
              duration: 1,
              repeat: Infinity,
              ease: "easeInOut"
            }
          }}
        />
      </motion.div>
      
      {/* Click ripple effect - appears only when clicking */}
      {isClicking && (
        <motion.div
          className="fixed rounded-full pointer-events-none"
          style={{
            left: mousePosition.x,
            top: mousePosition.y,
            transform: 'translate(-50%, -50%)',
            border: `3px solid ${colors.primary}`,
            zIndex: 9989
          }}
          initial={{ width: 0, height: 0, opacity: 1 }}
          animate={{ width: 100, height: 100, opacity: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          onAnimationComplete={() => setIsClicking(false)}
        />
      )}
    </div>
  );
};

export default CyberCursor; 