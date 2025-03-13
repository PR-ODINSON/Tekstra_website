import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { useState, useRef, useEffect } from "react";
import TerminalEffect from "../components/terminal-effect";
import { FaCalendar, FaBuilding, FaStar, FaExpand, FaChevronRight, FaChevronLeft, FaCamera, FaSync } from "react-icons/fa";
import PageLoader from "../components/PageLoader";

// Background elements for cyberpunk theme
const CyberGrid = () => (
  <div className="absolute inset-0 z-0 opacity-5 pointer-events-none overflow-hidden">
    <div className="absolute inset-0 bg-grid-pattern"></div>
    {/* Horizontal lines */}
    {Array.from({ length: 20 }).map((_, i) => (
      <motion.div
        key={`h-${i}`}
        className="absolute h-px w-full bg-cyan-500/30"
        style={{ top: `${(i * 5) + 2}%` }}
        animate={{
          opacity: [0.1, 0.3, 0.1],
          width: ["0%", "100%", "0%"],
          left: ["0%", "0%", "100%"],
        }}
        transition={{
          duration: 15 + Math.random() * 10,
          repeat: Infinity,
          ease: "linear",
          delay: Math.random() * 5,
        }}
      />
    ))}
    {/* Vertical lines */}
    {Array.from({ length: 20 }).map((_, i) => (
      <motion.div
        key={`v-${i}`}
        className="absolute w-px h-full bg-purple-500/30"
        style={{ left: `${(i * 5) + 2}%` }}
        animate={{
          opacity: [0.1, 0.3, 0.1],
          height: ["0%", "100%", "0%"],
          top: ["0%", "0%", "100%"],
        }}
        transition={{
          duration: 15 + Math.random() * 10,
          repeat: Infinity,
          ease: "linear",
          delay: Math.random() * 5,
        }}
      />
    ))}
  </div>
);

// Scanner line effect for photo loading
const ScannerEffect = () => (
  <motion.div
    className="absolute inset-0 backdrop-blur-sm bg-gray-900/40 flex items-center justify-center z-10"
    initial={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    transition={{ duration: 0.3 }}
  >
    <div className="relative w-full h-full overflow-hidden">
      {/* Scanning line moving from top to bottom */}
      <motion.div
        className="absolute inset-x-0 h-1 bg-gradient-to-r from-cyan-500/0 via-cyan-500 to-cyan-500/0"
        animate={{ 
          top: ["0%", "100%"], 
          opacity: [0.7, 1, 0.7],
        }}
        transition={{ 
          duration: 1.5, 
          repeat: Infinity,
          ease: "linear" 
        }}
      />
      
      {/* Subtle grid effect */}
      <div className="absolute inset-0 bg-grid-pattern opacity-20"></div>
      
      {/* Central loading indicator */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="relative">
          <motion.div 
            className="absolute inset-0 rounded-full bg-cyan-500/20"
            animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0.7, 0.5] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          />
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            className="relative z-10 text-cyan-400"
          >
            <FaSync size={24} />
          </motion.div>
        </div>
      </div>
    </div>
  </motion.div>
);

// Data remains the same as provided
const events = [
  {
    id: 1,
    name: "Pulse 2023",
    sponsor: "TechCorp Industries",
    description: "Annual flagship hackathon event bringing together innovators and developers from across the country. 36 hours of non-stop innovation, coding and building the future.",
    date: "October 15-16, 2023",
    featured: true,
    photos: [
      "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?ixlib=rb-4.0.3",
      "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?ixlib=rb-4.0.3",
      "https://images.unsplash.com/photo-1515187029135-18ee286d815b?ixlib=rb-4.0.3",
      "https://images.unsplash.com/photo-1520333789090-1afc82db536a?ixlib=rb-4.0.3"
    ]
  },
  {
    id: 2,
    name: "CodeCraft Workshop",
    sponsor: "DevTools Pro",
    description: "Intensive hands-on workshop covering modern web development technologies including React, Node.js and cloud deployment. Led by industry experts.",
    date: "September 5, 2023",
    featured: false,
    photos: [
      "https://images.unsplash.com/photo-1531482615713-2afd69097998?ixlib=rb-4.0.3",
      "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?ixlib=rb-4.0.3",
      "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?ixlib=rb-4.0.3"
    ]
  },
  {
    id: 3,
    name: "AI Summit",
    sponsor: "Neural Networks Inc",
    description: "Premier conference exploring cutting-edge developments in artificial intelligence and machine learning. Featuring keynotes from leading researchers and hands-on demos.",
    date: "August 20, 2023",
    featured: true,
    photos: [
      "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?ixlib=rb-4.0.3",
      "https://images.unsplash.com/photo-1573164713988-8665fc963095?ixlib=rb-4.0.3",
      "https://images.unsplash.com/photo-1559036376-8b0c870be1e0?ixlib=rb-4.0.3",
      "https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3"
    ]
  }
];

// Single photo component with loading state
const GalleryPhoto = ({ photo, photoIndex, eventName, onClick }) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isError, setIsError] = useState(false);
  
  return (
      <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      whileInView={{ opacity: 1, scale: 1 }}
      whileHover={{ 
        scale: 1.03, 
        boxShadow: "0 0 20px rgba(6, 182, 212, 0.4)",
        transition: { duration: 0.2 } 
      }}
      transition={{ duration: 0.5, delay: photoIndex * 0.1 }}
        viewport={{ once: true }}
      onClick={onClick}
      className="relative aspect-video overflow-hidden rounded-xl backdrop-blur-md border-2 border-cyan-500/30 shadow-lg shadow-cyan-500/20 cursor-pointer group"
    >
      {/* Animated border glow */}
      <div className="absolute inset-px rounded-lg overflow-hidden z-0">
        <motion.div 
          className="absolute inset-0 opacity-30"
          animate={{ 
            background: [
              'linear-gradient(0deg, rgba(6, 182, 212, 0.5) 0%, rgba(139, 92, 246, 0) 100%)',
              'linear-gradient(90deg, rgba(6, 182, 212, 0) 0%, rgba(139, 92, 246, 0.5) 100%)',
              'linear-gradient(180deg, rgba(6, 182, 212, 0) 0%, rgba(139, 92, 246, 0.5) 100%)',
              'linear-gradient(270deg, rgba(6, 182, 212, 0.5) 0%, rgba(139, 92, 246, 0) 100%)',
              'linear-gradient(0deg, rgba(6, 182, 212, 0.5) 0%, rgba(139, 92, 246, 0) 100%)',
            ]
          }}
          transition={{ 
            duration: 8, 
            repeat: Infinity,
            repeatType: "loop"
          }}
        />
      </div>
      
      {/* Decorative corner elements */}
      <div className="absolute top-0 left-0 w-5 h-5 border-t-2 border-l-2 border-cyan-400/50 group-hover:border-cyan-400 z-10"></div>
      <div className="absolute top-0 right-0 w-5 h-5 border-t-2 border-r-2 border-cyan-400/50 group-hover:border-cyan-400 z-10"></div>
      <div className="absolute bottom-0 left-0 w-5 h-5 border-b-2 border-l-2 border-cyan-400/50 group-hover:border-cyan-400 z-10"></div>
      <div className="absolute bottom-0 right-0 w-5 h-5 border-b-2 border-r-2 border-cyan-400/50 group-hover:border-cyan-400 z-10"></div>
      
      {/* Background gradient overlay (always visible) */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/60 opacity-60 group-hover:opacity-0 transition-opacity duration-300 z-20"></div>
      
      {/* Image */}
      <img
        src={photo}
        alt={`${eventName} photo ${photoIndex + 1}`}
        className="w-full h-full object-cover transform transition-all duration-700 group-hover:scale-110"
        onLoad={() => setIsLoaded(true)}
        onError={() => setIsError(true)}
        style={{ opacity: isLoaded ? 1 : 0 }}
      />
      
      {/* Loading state */}
      <AnimatePresence>
        {!isLoaded && !isError && (
          <ScannerEffect />
        )}
      </AnimatePresence>
      
      {/* Error state */}
      {isError && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-900/80 z-10">
          <div className="text-red-400 text-center p-4">
            <div className="mb-2">⚠️</div>
            <div className="text-sm font-mono">Image failed to load</div>
          </div>
        </div>
      )}
      
      {/* Hover state overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300 z-30">
        <div className="absolute bottom-3 right-3">
          <motion.button
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.9 }}
            className="bg-cyan-500/20 p-2 rounded-full backdrop-blur-sm border border-cyan-400/30"
          >
            <FaExpand className="text-cyan-400" />
          </motion.button>
        </div>
        
        <div className="absolute top-3 left-3 flex items-center space-x-1 bg-black/40 backdrop-blur-sm rounded-full px-3 py-1.5 border border-cyan-500/30">
          <FaCamera className="text-cyan-400" size={10} />
          <span className="text-cyan-300 text-xs font-mono">#{photoIndex + 1}</span>
        </div>
      </div>
    </motion.div>
  );
};

// Enhanced Photo Viewer component
const PhotoViewer = ({ photos, eventName }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isExpanded, setIsExpanded] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  
  const nextPhoto = () => {
    setImageLoaded(false);
    setCurrentIndex((prev) => (prev + 1) % photos.length);
  };
  
  const prevPhoto = () => {
    setImageLoaded(false);
    setCurrentIndex((prev) => (prev - 1 + photos.length) % photos.length);
  };
  
  useEffect(() => {
    // Reset image loaded state when expanded view is closed
    if (!isExpanded) {
      setImageLoaded(false);
    }
  }, [isExpanded]);
  
  // Calculate animation duration based on number of photos
  const animationDuration = Math.max(20, photos.length * 5);
  
  // Calculate the number of copies needed for a smooth looping effect
  const marqueeItems = [...photos, ...photos, ...photos]; // Triple the array for smooth looping
  
  return (
    <div className="relative">
      {/* Marquee Gallery View (instead of grid) */}
      {!isExpanded && (
        <div className="mb-8">
          {/* Marquee title */}
          <div className="flex items-center mb-4">
            <div className="h-px flex-grow bg-gradient-to-r from-transparent via-cyan-500/30 to-transparent"></div>
            <span className="px-4 text-cyan-400 text-sm font-mono">EVENT GALLERY</span>
            <div className="h-px flex-grow bg-gradient-to-r from-transparent via-cyan-500/30 to-transparent"></div>
          </div>
          
          {/* Marquee container with stylish border */}
          <div className="relative overflow-hidden rounded-xl border border-cyan-500/30 shadow-lg shadow-cyan-500/20 py-2 bg-gradient-to-r from-black to-gray-900/50">
            <motion.div
              className="flex items-center"
              animate={{ x: [0, `-${photos.length * 400}px`] }}
              transition={{ 
                ease: "linear", 
                duration: animationDuration,
                repeat: Infinity
              }}
            >
              {/* Marquee items - maintainining original aspect ratio and size */}
              {marqueeItems.map((photo, photoIndex) => (
                <div 
                  key={photoIndex} 
                  className="flex-shrink-0 mx-2 relative group"
                  onClick={() => {
                    setCurrentIndex(photoIndex % photos.length);
                    setIsExpanded(true);
                    setImageLoaded(false);
                  }}
                >
                  <div className="relative aspect-video w-[350px] overflow-hidden rounded-xl backdrop-blur-md border-2 border-cyan-500/30 shadow-lg shadow-cyan-500/20 cursor-pointer group">
                    {/* Animated border glow */}
                    <div className="absolute inset-px rounded-lg overflow-hidden z-0">
                      <motion.div 
                        className="absolute inset-0 opacity-30"
                        animate={{ 
                          background: [
                            'linear-gradient(0deg, rgba(6, 182, 212, 0.5) 0%, rgba(139, 92, 246, 0) 100%)',
                            'linear-gradient(90deg, rgba(6, 182, 212, 0) 0%, rgba(139, 92, 246, 0.5) 100%)',
                            'linear-gradient(180deg, rgba(6, 182, 212, 0) 0%, rgba(139, 92, 246, 0.5) 100%)',
                            'linear-gradient(270deg, rgba(6, 182, 212, 0.5) 0%, rgba(139, 92, 246, 0) 100%)',
                            'linear-gradient(0deg, rgba(6, 182, 212, 0.5) 0%, rgba(139, 92, 246, 0) 100%)',
                          ]
                        }}
                        transition={{ 
                          duration: 8, 
                          repeat: Infinity,
                          repeatType: "loop"
                        }}
                      />
                    </div>
                    
                    {/* Image */}
                    <img
                      src={photo}
                      alt={`${eventName} photo ${(photoIndex % photos.length) + 1}`}
                      className="w-full h-full object-cover transform transition-all duration-700 group-hover:scale-110"
                    />
                    
                    {/* Hover state overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300 z-30">
                      <div className="absolute bottom-3 right-3">
                        <motion.button
                          whileHover={{ scale: 1.2 }}
                          whileTap={{ scale: 0.9 }}
                          className="bg-cyan-500/20 p-2 rounded-full backdrop-blur-sm border border-cyan-400/30"
                        >
                          <FaExpand className="text-cyan-400" />
                        </motion.button>
                      </div>
                      
                      <div className="absolute top-3 left-3 flex items-center space-x-1 bg-black/40 backdrop-blur-sm rounded-full px-3 py-1.5 border border-cyan-500/30">
                        <FaCamera className="text-cyan-400" size={10} />
                        <span className="text-cyan-300 text-xs font-mono">#{(photoIndex % photos.length) + 1}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </motion.div>
          </div>
          
          {/* Reverse direction marquee (second row) */}
          {photos.length > 2 && (
            <div className="relative overflow-hidden rounded-xl border border-purple-500/30 shadow-lg shadow-purple-500/20 py-2 mt-4 bg-gradient-to-r from-gray-900/50 to-black">
              <motion.div
                className="flex items-center"
                animate={{ x: [`-${photos.length * 400}px`, '0px'] }}
                transition={{ 
                  ease: "linear", 
                  duration: animationDuration * 1.2,
                  repeat: Infinity
                }}
              >
                {/* Reverse direction marquee items */}
                {[...marqueeItems].reverse().map((photo, photoIndex) => (
                  <div 
                    key={`reverse-${photoIndex}`} 
                    className="flex-shrink-0 mx-2 relative group"
                    onClick={() => {
                      setCurrentIndex((photos.length - 1) - (photoIndex % photos.length));
                      setIsExpanded(true);
                      setImageLoaded(false);
                    }}
                  >
                    <div className="relative aspect-video w-[350px] overflow-hidden rounded-xl backdrop-blur-md border-2 border-purple-500/30 shadow-lg shadow-purple-500/20 cursor-pointer group">
                      {/* Animated border glow */}
                      <div className="absolute inset-px rounded-lg overflow-hidden z-0">
                        <motion.div 
                          className="absolute inset-0 opacity-30"
                          animate={{ 
                            background: [
                              'linear-gradient(0deg, rgba(139, 92, 246, 0.5) 0%, rgba(6, 182, 212, 0) 100%)',
                              'linear-gradient(90deg, rgba(139, 92, 246, 0) 0%, rgba(6, 182, 212, 0.5) 100%)',
                              'linear-gradient(180deg, rgba(139, 92, 246, 0) 0%, rgba(6, 182, 212, 0.5) 100%)',
                              'linear-gradient(270deg, rgba(139, 92, 246, 0.5) 0%, rgba(6, 182, 212, 0) 100%)',
                              'linear-gradient(0deg, rgba(139, 92, 246, 0.5) 0%, rgba(6, 182, 212, 0) 100%)',
                            ]
                          }}
                          transition={{ 
                            duration: 8, 
                            repeat: Infinity,
                            repeatType: "loop"
                          }}
                        />
                      </div>
                      
                      {/* Image */}
                      <img
                        src={photo}
                        alt={`${eventName} photo ${(photos.length - (photoIndex % photos.length)) + 1}`}
                        className="w-full h-full object-cover transform transition-all duration-700 group-hover:scale-110"
                      />
                      
                      {/* Hover state overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300 z-30">
                        <div className="absolute bottom-3 right-3">
                          <motion.button
                            whileHover={{ scale: 1.2 }}
                            whileTap={{ scale: 0.9 }}
                            className="bg-purple-500/20 p-2 rounded-full backdrop-blur-sm border border-purple-400/30"
                          >
                            <FaExpand className="text-purple-400" />
                          </motion.button>
                        </div>
                        
                        <div className="absolute top-3 left-3 flex items-center space-x-1 bg-black/40 backdrop-blur-sm rounded-full px-3 py-1.5 border border-purple-500/30">
                          <FaCamera className="text-purple-400" size={10} />
                          <span className="text-purple-300 text-xs font-mono">#{(photos.length - (photoIndex % photos.length)) + 1}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
      </motion.div>
            </div>
          )}
        </div>
      )}

      {/* Expanded View */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-50 bg-black/90 backdrop-blur-xl flex items-center justify-center p-4"
          >
            <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
            
            {/* Animated pulse circles in the background */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
              <motion.div 
                className="absolute top-1/2 left-1/2 w-[600px] h-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full"
                style={{
                  background: 'radial-gradient(circle, rgba(6, 182, 212, 0.1) 0%, transparent 70%)'
                }}
                animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
                transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
              />
            </div>
            
            <div className="relative w-full max-w-6xl z-10">
              <motion.button
                onClick={() => setIsExpanded(false)}
                className="absolute right-2 top-2 z-20 bg-gray-900/80 rounded-full p-3 text-white border border-cyan-500/30 backdrop-blur-sm hover:bg-cyan-500/20 transition-colors duration-300"
                whileHover={{ scale: 1.1, boxShadow: "0 0 15px rgba(6, 182, 212, 0.3)" }}
                whileTap={{ scale: 0.9 }}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </motion.button>
              
              <div className="flex items-center justify-center">
                <motion.button
                  onClick={prevPhoto}
                  className="absolute left-4 bg-gray-900/50 rounded-full p-4 text-white backdrop-blur-sm border border-cyan-500/30 hover:bg-cyan-500/20 transition-colors duration-300"
                  whileHover={{ scale: 1.1, x: -5, boxShadow: "0 0 15px rgba(6, 182, 212, 0.3)" }}
                  whileTap={{ scale: 0.9 }}
                >
                  <FaChevronLeft />
                </motion.button>
                
                <motion.div 
                  key={`expanded-${currentIndex}`}
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.9, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="relative overflow-hidden rounded-xl border-2 border-cyan-500/50 shadow-2xl shadow-cyan-500/20 max-h-[80vh] bg-black/30 backdrop-blur-sm"
                >
                  {/* Loading state for expanded view */}
                  <AnimatePresence>
                    {!imageLoaded && (
                      <motion.div
                        initial={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="absolute inset-0 bg-gray-900/60 backdrop-blur-sm flex flex-col items-center justify-center z-10"
                      >
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                          className="text-cyan-400 mb-3"
                        >
                          <FaSync size={30} />
                        </motion.div>
                        <div className="text-sm font-mono text-cyan-300">
                          LOADING IMAGE
                        </div>
                        
                        {/* Progress bar simulation */}
                        <div className="w-32 h-1 bg-gray-800 rounded-full mt-3 overflow-hidden">
                          <motion.div
                            className="h-full bg-gradient-to-r from-cyan-500 to-purple-500"
                            initial={{ width: "0%" }}
                            animate={{ width: "100%" }}
                            transition={{ duration: 1.5 }}
                          />
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                  
                  <img
                    src={photos[currentIndex]}
                    alt={`${eventName} expanded view`}
                    className="max-h-[80vh] w-auto max-w-full object-contain"
                    onLoad={() => setImageLoaded(true)}
                    style={{ opacity: imageLoaded ? 1 : 0.3 }}
                  />
                  
                  <div className="absolute bottom-0 inset-x-0 p-4 bg-gradient-to-t from-black/80 to-transparent">
                    <div className="flex justify-between items-center">
                      <div className="text-white font-mono">
                        <h4 className="font-bold">{eventName}</h4>
                        <div className="text-cyan-400 text-sm">Photo {currentIndex + 1} of {photos.length}</div>
                      </div>
                      
                      <div className="flex space-x-2">
                        {photos.map((_, idx) => (
                          <motion.button
                            key={idx}
                            onClick={() => {
                              setImageLoaded(false);
                              setCurrentIndex(idx);
                            }}
                            className={`w-2 h-2 rounded-full ${
                              idx === currentIndex 
                                ? 'bg-cyan-400 shadow-glow-sm' 
                                : 'bg-gray-600 hover:bg-gray-400'
                            }`}
                            whileHover={{ scale: 1.5 }}
                            whileTap={{ scale: 0.8 }}
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.div>
                
                <motion.button
                  onClick={nextPhoto}
                  className="absolute right-4 bg-gray-900/50 rounded-full p-4 text-white backdrop-blur-sm border border-cyan-500/30 hover:bg-cyan-500/20 transition-colors duration-300"
                  whileHover={{ scale: 1.1, x: 5, boxShadow: "0 0 15px rgba(6, 182, 212, 0.3)" }}
                  whileTap={{ scale: 0.9 }}
                >
                  <FaChevronRight />
                </motion.button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

// Enhanced EventCard component
const EventCard = ({ event, eventIndex }) => {
  const cardRef = useRef(null);
  
  // Parallax effect on scroll
  const { scrollYProgress } = useScroll({ 
    target: cardRef,
    offset: ["start end", "end start"] 
  });
  
  const yOffset = useTransform(scrollYProgress, [0, 1], [50, -50]);
  
  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: eventIndex * 0.15 }}
      viewport={{ once: true, margin: "-100px" }}
      className="relative"
      style={{ marginTop: eventIndex > 0 ? '8rem' : '2rem' }}
    >
      {/* Background glow effect */}
      <motion.div 
        className="absolute -inset-2 rounded-2xl blur-xl opacity-75 z-0"
        style={{
          background: event.featured 
            ? 'linear-gradient(45deg, rgba(139, 92, 246, 0.3), rgba(6, 182, 212, 0.3), rgba(59, 130, 246, 0.3))'
            : 'linear-gradient(45deg, rgba(6, 182, 212, 0.2), rgba(59, 130, 246, 0.2))'
        }}
        animate={{
          opacity: [0.4, 0.6, 0.4],
          background: event.featured 
            ? [
                'linear-gradient(45deg, rgba(139, 92, 246, 0.3), rgba(6, 182, 212, 0.3), rgba(59, 130, 246, 0.3))',
                'linear-gradient(190deg, rgba(139, 92, 246, 0.3), rgba(6, 182, 212, 0.3), rgba(59, 130, 246, 0.3))',
                'linear-gradient(45deg, rgba(139, 92, 246, 0.3), rgba(6, 182, 212, 0.3), rgba(59, 130, 246, 0.3))'
              ]
            : [
                'linear-gradient(45deg, rgba(6, 182, 212, 0.2), rgba(59, 130, 246, 0.2))',
                'linear-gradient(190deg, rgba(6, 182, 212, 0.2), rgba(59, 130, 246, 0.2))',
                'linear-gradient(45deg, rgba(6, 182, 212, 0.2), rgba(59, 130, 246, 0.2))'
              ] 
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          repeatType: "reverse"
        }}
      />
      
      {/* Card Content */}
      <motion.div 
        className="relative rounded-xl overflow-hidden z-10"
        style={{ y: yOffset }}
      >
        <div className="bg-gradient-to-b from-gray-900/90 to-black/95 border-2 border-blue-500/30 rounded-xl overflow-hidden backdrop-blur-xl shadow-2xl">
          {/* Decorative lines */}
          <div className="absolute top-0 left-4 right-4 h-px bg-gradient-to-r from-transparent via-cyan-500/70 to-transparent"></div>
          <div className="absolute bottom-0 left-4 right-4 h-px bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent"></div>
          
              <div className="p-8">
            {/* Header Section */}
            <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8 border-b border-cyan-900/30 pb-6">
                  <div className="flex items-center space-x-4">
                {/* Event ID Badge */}
                <div className="text-xs font-mono bg-cyan-950/40 border border-cyan-500/30 px-3 py-1 rounded-full text-cyan-400">
                  ID#{event.id.toString().padStart(3, '0')}
                </div>
                
                <h3 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-cyan-300 via-cyan-100 to-purple-300 font-rajdhani">
                      {event.name}
                    </h3>
                
                    {event.featured && (
                  <div className="relative">
                    <div className="absolute inset-0 rounded-full bg-yellow-500/20 blur-md animate-pulse"></div>
                    <FaStar className="text-yellow-500 relative z-10 text-xl" />
                  </div>
                    )}
                  </div>
                  
                  <div className="flex flex-wrap gap-4 mt-4 md:mt-0">
                    <motion.span 
                  whileHover={{ scale: 1.05, y: -2 }}
                  className="flex items-center px-6 py-2 bg-gradient-to-r from-blue-500/20 to-cyan-500/20 text-cyan-400 rounded-full text-sm font-mono border border-cyan-500/30 backdrop-blur-md"
                    >
                      <FaCalendar className="mr-2" />
                      {event.date}
                    </motion.span>
                
                    <motion.span 
                  whileHover={{ scale: 1.05, y: -2 }}
                  className="flex items-center px-6 py-2 bg-gradient-to-r from-purple-500/20 to-blue-500/20 text-purple-400 rounded-full text-sm font-mono border border-purple-500/30 backdrop-blur-md"
                    >
                      <FaBuilding className="mr-2" />
                      {event.sponsor}
                    </motion.span>
                  </div>
                </div>

            {/* Description Section with glowing border */}
            <div className="relative mb-12 p-5 bg-gradient-to-r from-gray-900/50 to-black/50 rounded-lg border border-cyan-900/50">
              <div className="absolute inset-0 rounded-lg overflow-hidden">
                <motion.div 
                  className="absolute inset-0 opacity-20"
                  animate={{ 
                    background: [
                      'radial-gradient(circle at 20% 50%, rgba(6, 182, 212, 0.2) 0%, transparent 50%)',
                      'radial-gradient(circle at 80% 50%, rgba(139, 92, 246, 0.2) 0%, transparent 50%)',
                      'radial-gradient(circle at 20% 50%, rgba(6, 182, 212, 0.2) 0%, transparent 50%)'
                    ]
                  }}
                  transition={{ duration: 10, repeat: Infinity }}
                />
              </div>
              
              <p className="text-gray-300 text-lg font-mono leading-relaxed max-w-4xl relative">
                  {event.description}
                </p>
            </div>

            {/* Photo Gallery */}
            <PhotoViewer photos={event.photos} eventName={event.name} />
                </div>
              </div>
      </motion.div>
    </motion.div>
  );
};

export default function Gallery() {
  // Mouse position for spotlight effect
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [pageLoaded, setPageLoaded] = useState(false);
  const headerRef = useRef(null); // Add a ref for the header
  
  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    
    // Simulate some page loading time
    const timer = setTimeout(() => {
      setPageLoaded(true);
    }, 500);

    // Ensure scroll to top on page load and focus the header
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth'
    });

    // Optional: If you want to specifically focus on the header after load
    if (headerRef.current) {
      const headerTimer = setTimeout(() => {
        headerRef.current.scrollIntoView({ 
          behavior: 'smooth',
          block: 'start'
        });
      }, 100);
      
      return () => {
        clearTimeout(headerTimer);
        window.removeEventListener('mousemove', handleMouseMove);
        clearTimeout(timer);
      };
    }
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      clearTimeout(timer);
    };
  }, []);

  return (
    
      <div className="relative bg-black min-h-screen overflow-hidden pb-20">
        {/* Background Elements */}
        <CyberGrid />
        
        {/* Spotlight effect that follows cursor */}
        <div 
          className="pointer-events-none fixed inset-0 z-10 mix-blend-lighten opacity-50"
          style={{
            background: `radial-gradient(circle 150px at ${mousePosition.x}px ${mousePosition.y}px, rgba(6, 182, 212, 0.15), transparent)`,
          }}
        />
        
        <div className="container mx-auto px-4 py-16 relative z-20">
          {/* Page Header */}
          <motion.div
            ref={headerRef} // Add the ref here
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, type: "spring" }}
            className="text-center mb-20"
          >
            <div className="inline-block mb-4 px-6 py-2 bg-gradient-to-r from-cyan-500/20 to-purple-500/20 rounded-full border border-cyan-500/30">
              <span className="text-cyan-400 text-sm font-mono">04_VISUAL_ARCHIVE</span>
            </div>
            
            <h2 className="text-5xl md:text-6xl font-bold mb-6 relative font-rajdhani">
              <span className="absolute -inset-6 bg-cyan-500/10 rounded-full blur-3xl opacity-50"></span>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400 relative drop-shadow-sm">
                Event Gallery
              </span>
            </h2>
            
            <div className="h-1 w-32 bg-gradient-to-r from-transparent via-cyan-500 to-transparent mx-auto mb-8"></div>
            
            <p className="text-gray-300 text-lg md:text-xl max-w-3xl mx-auto font-mono leading-relaxed">
              <TerminalEffect text="Explore our digital memory vault - where every pixel tells a story of innovation and achievement. Swipe through the visual history of Tekstra's journey." />
            </p>
          </motion.div>

          {/* Events Display */}
          <div className="space-y-16">
            {events.map((event, eventIndex) => (
              <EventCard key={event.id} event={event} eventIndex={eventIndex} />
            ))}
          </div>
          
          {/* Footer decorative element */}
          <motion.div 
            className="mt-32 relative h-px w-full" 
            initial={{ opacity: 0, width: "0%" }}
            whileInView={{ opacity: 1, width: "100%" }}
            transition={{ duration: 2 }}
            viewport={{ once: true }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-cyan-500/70 to-transparent"></div>
          </motion.div>
          
          <div className="text-center mt-12 font-mono text-cyan-500/80 text-sm">
            // END OF GALLERY ARCHIVE
          </div>
        </div>
      </div>
 
  );
}




