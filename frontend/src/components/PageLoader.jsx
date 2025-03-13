import { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import Loading from './Loading';

/**
 * PageLoader - A reusable component for page loading animations
 * @param {boolean} isEnabled - Whether the loader is enabled
 * @param {number} duration - Duration of the loading animation in milliseconds
 * @param {Function} onLoadComplete - Callback when loading is complete
 * @param {ReactNode} children - The page content to be rendered after loading
 */
const PageLoader = ({ 
  isEnabled = true, 
  duration = 2000, 
  onLoadComplete = () => {}, 
  children 
}) => {
  const [isLoading, setIsLoading] = useState(isEnabled);
  const [loadingProgress, setLoadingProgress] = useState(0);
  
  useEffect(() => {
    if (!isEnabled) {
      setIsLoading(false);
      return;
    }
    
    // Simulate loading progress
    const progressInterval = setInterval(() => {
      setLoadingProgress(prev => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          return 100;
        }
        return prev + Math.floor(Math.random() * 4) + 2;
      });
    }, 80);
    
    // Hide loader after specified duration
    const timer = setTimeout(() => {
      clearInterval(progressInterval);
      setLoadingProgress(100);
      
      // Delay hiding slightly to show 100% completion
      setTimeout(() => {
        setIsLoading(false);
        onLoadComplete();
      }, 300);
    }, duration);
    
    return () => {
      clearTimeout(timer);
      clearInterval(progressInterval);
    };
  }, [isEnabled, duration, onLoadComplete]);
  
  return (
    <>
      {/* Loading Screen */}
      <AnimatePresence>
        {isLoading && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="fixed inset-0 z-50"
          >
            <Loading progress={loadingProgress} />
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Page Content */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: isLoading ? 0 : 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        {children}
      </motion.div>
    </>
  );
};

export default PageLoader; 