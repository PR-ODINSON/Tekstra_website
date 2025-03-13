import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaArrowUp } from 'react-icons/fa';

const ScrollButton = () => {
  const [isVisible, setIsVisible] = useState(false);

  // Show button when page is scrolled down
  const toggleVisibility = () => {
    if (window.pageYOffset > 300) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  // Scroll to top smoothly
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  useEffect(() => {
    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 p-3 rounded-full z-50 bg-gradient-to-r from-cyan-600/80 to-purple-600/80 backdrop-blur-sm border border-cyan-400/30 shadow-lg shadow-cyan-500/20"
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.5 }}
          whileHover={{ 
            scale: 1.1,
            boxShadow: "0 0 15px rgba(6, 182, 212, 0.4)"
          }}
          whileTap={{ scale: 0.9 }}
          transition={{ duration: 0.2 }}
        >
          <FaArrowUp className="text-white text-xl" />
          
          {/* Animated glow effect */}
          <motion.div 
            className="absolute inset-0 rounded-full -z-10 opacity-60 blur-md"
            animate={{ 
              boxShadow: [
                "0 0 5px 0px rgba(6, 182, 212, 0.3)",
                "0 0 15px 0px rgba(6, 182, 212, 0.6)",
                "0 0 5px 0px rgba(6, 182, 212, 0.3)"
              ]
            }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        </motion.button>
      )}
    </AnimatePresence>
  );
};

export default ScrollButton; 