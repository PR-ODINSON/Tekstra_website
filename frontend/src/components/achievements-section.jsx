import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { 
  FaTrophy, FaMedal, FaAward, FaCode, FaStar, 
  FaChevronRight, FaChevronLeft, FaExternalLinkAlt 
} from "react-icons/fa";
import TerminalEffect from "./terminal-effect"; 
import CountUp from "react-countup"; 
import { useInView } from "react-intersection-observer"; 

// Achievement data
const achievements = [ 
  { 
    id: 1, 
    title: "National Hackathon Champions", 
    description: "First place at the National Collegiate Hackathon 2023", 
    icon: <FaTrophy className="text-yellow-500 text-4xl" />, 
    year: "2023", 
    category: "Competition"
  }, 
  { 
    id: 2, 
    title: "Google Solution Challenge", 
    description: "Top 10 finalist in the Google Solution Challenge", 
    icon: <FaAward className="text-cyan-400 text-4xl" />, 
    year: "2022", 
    category: "Recognition"
  }, 
  { 
    id: 3, 
    title: "ACM-ICPC Regional", 
    description: "3rd place at the ACM-ICPC Regional Programming Contest", 
    icon: <FaMedal className="text-amber-600 text-4xl" />, 
    year: "2023", 
    category: "Competition"
  }, 
  { 
    id: 4, 
    title: "GitHub Campus Expert", 
    description: "Two members selected as GitHub Campus Experts", 
    icon: <FaCode className="text-purple-500 text-4xl" />, 
    year: "2022", 
    category: "Recognition"
  }, 
]; 

// Stats data
const stats = [ 
  { id: 1, value: 50, label: "Events Organized", icon: <FaCode className="text-cyan-400" /> },
  { id: 2, value: 1000, label: "Active Members", icon: <FaStar className="text-purple-400" /> },
  { id: 3, value: 25, label: "Awards Won", icon: <FaTrophy className="text-yellow-400" /> },
  { id: 4, value: 100, label: "Projects Completed", icon: <FaCode className="text-green-400" /> },
];

// Circuit Background Component
const CircuitPattern = () => (
  <div className="absolute inset-0 pointer-events-none opacity-10">
    <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
      <pattern id="circuit-pattern" x="0" y="0" width="100" height="100" patternUnits="userSpaceOnUse">
        <path d="M0,50 L100,50 M50,0 L50,100 M25,25 L75,75 M75,25 L25,75" stroke="#8B5CF6" strokeWidth="0.5" fill="none" />
        <circle cx="50" cy="50" r="3" fill="#8B5CF6" />
        <circle cx="25" cy="25" r="2" fill="#8B5CF6" />
        <circle cx="75" cy="75" r="2" fill="#8B5CF6" />
        <circle cx="75" cy="25" r="2" fill="#8B5CF6" />
        <circle cx="25" cy="75" r="2" fill="#8B5CF6" />
      </pattern>
      <rect width="100%" height="100%" fill="url(#circuit-pattern)" />
    </svg>
  </div>
);

// Grid Pattern Component
const GridPattern = () => (
  <div className="absolute inset-0 pointer-events-none opacity-5">
    <div className="h-full w-full" style={{
      backgroundImage: "linear-gradient(to right, #8B5CF620 1px, transparent 1px), linear-gradient(to bottom, #8B5CF620 1px, transparent 1px)",
      backgroundSize: "20px 20px"
    }}></div>
  </div>
);

// Category Tabs Component
const CategoryTabs = ({ categories, activeCategory, setActiveCategory }) => {
  return ( 
    <div className="flex flex-wrap justify-center gap-3 mb-10">
      {categories.map((category) => (
        <motion.button
          key={category}
          onClick={() => setActiveCategory(category)}
          className={`px-4 py-1.5 rounded-full text-sm font-mono transition-all duration-300 relative overflow-hidden ${
            activeCategory === category 
              ? "text-white border border-purple-500 bg-purple-500/20" 
              : "text-gray-400 border border-gray-800 hover:border-purple-500/50 hover:text-purple-400"
          }`}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          {activeCategory === category && (
            <motion.span 
              className="absolute inset-0 bg-purple-500/10"
              layoutId="activeCategoryHighlight"
              initial={false}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
            />
          )}
          <span className="relative z-10">{category}</span>
        </motion.button>
      ))}
    </div>
  );
};

// Achievement Card Component
const AchievementCard = ({ achievement, index }) => {
  const [isHovered, setIsHovered] = useState(false);
  
  return (
          <motion.div 
            key={achievement.id} 
            initial={{ opacity: 0, y: 20 }} 
            whileInView={{ opacity: 1, y: 0 }} 
            transition={{ duration: 0.5, delay: index * 0.1 }} 
            viewport={{ once: true }} 
      className="bg-gradient-to-b from-gray-900 to-black border border-purple-500/30 rounded-xl overflow-hidden hover:shadow-lg hover:shadow-purple-500/20 transition-all group relative"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Top highlight bar */}
      <div className="h-1 w-full bg-gradient-to-r from-purple-500 to-cyan-500 transform origin-left transition-transform duration-500 scale-x-0 group-hover:scale-x-100"></div>

            {/* Glowing Border */} 
            <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-cyan-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div> 

      <div className="p-6 relative z-10">
        {/* Icon with glowing effect */}
        <div className="mb-4 relative">
          <div className="absolute inset-0 bg-purple-500/20 blur-xl rounded-full scale-0 group-hover:scale-100 transition-transform duration-500 opacity-0 group-hover:opacity-100"></div>
          <motion.div
            animate={{ rotate: isHovered ? 360 : 0 }}
            transition={{ duration: 2, ease: "linear", repeat: isHovered ? Infinity : 0 }}
          >
            {achievement.icon}
          </motion.div>
        </div>
        
        {/* Year badge */}
            <div className="inline-block px-3 py-1 bg-purple-500/10 text-purple-400 rounded-full text-xs font-mono border border-purple-500/30 mb-4"> 
          <span className="text-gray-500 mr-1">Y:</span>{achievement.year}
            </div> 

        {/* Title with animation */}
            <h3 className="text-xl font-bold mb-2 text-white group-hover:text-purple-400 transition-colors font-orbitron"> 
              {achievement.title} 
            </h3> 

        {/* Description with reveal animation */}
        <p className="text-gray-400 text-sm font-jetbrains-mono transition-all duration-300 group-hover:text-gray-300">
              {achievement.description} 
        </p>
        
        {/* Read more link - appears on hover */}
        <div className="mt-4 h-0 overflow-hidden group-hover:h-7 transition-all duration-300">
          <a href="#" className="text-purple-400 flex items-center text-xs font-mono hover:text-purple-300 transition-colors">
            Read case study <FaExternalLinkAlt className="ml-2 text-[10px]" />
          </a>
      </div> 
        </div> 

      {/* Category indicator */}
      <div className="absolute top-3 right-3 px-2 py-0.5 bg-black/50 backdrop-blur-sm rounded-full border border-purple-500/20 text-[10px] text-purple-400 font-mono opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        {achievement.category}
        </div> 
      </motion.div> 
  ); 
};
 
// Animated counter component
const StatNumber = ({ value }) => { 
  const { ref, inView } = useInView({ 
    triggerOnce: true, 
    threshold: 0.5, 
  });

  const duration = Math.min(Math.log(value) * 0.6, 3);

  return ( 
    <div 
      ref={ref} 
      className="text-4xl md:text-5xl font-bold mb-2 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-400 font-orbitron"
    > 
      {inView ? (
        <CountUp 
          start={0} 
          end={value} 
          duration={duration} 
          separator="," 
          useEasing={true}
        />
      ) : (
        "0"
      )}
    </div> 
  ); 
};

// Main component
export default function AchievementsSection() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  
  // Get unique categories from achievements data
  const categories = ["All", ...new Set(achievements.map(item => item.category))];
  
  // Filter achievements based on active category
  const filteredAchievements = activeCategory === "All" 
    ? achievements 
    : achievements.filter(achievement => achievement.category === activeCategory);
  
  // Track mouse position for spotlight effect
  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return ( 
    <div className="relative min-h-screen bg-black py-20 overflow-hidden">
      {/* Background Effects */}
      <div className="fixed inset-0 bg-gradient-to-b from-purple-900/10 via-black to-black pointer-events-none"></div>
      <CircuitPattern />
      <GridPattern />
      
      {/* Spotlight effect following mouse */}
      <div 
        className="fixed inset-0 bg-radial-gradient opacity-20 pointer-events-none" 
        style={{
          background: `radial-gradient(circle 200px at ${mousePosition.x}px ${mousePosition.y}px, rgba(124, 58, 237, 0.15), transparent)`,
        }}
      ></div>
      
      <div className="container mx-auto px-4 relative z-10">
        {/* Section Title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="inline-block mb-3 px-4 py-1 rounded-full bg-purple-900/30 border border-purple-500/30">
            <span className="text-purple-400 text-sm font-mono">03_ACHIEVEMENTS</span>
          </div>
          <h2 className="text-5xl md:text-6xl font-bold mb-6 font-rajdhani relative">
            <span className="absolute -inset-4 bg-purple-500/20 rounded-2xl blur-3xl opacity-20 animate-pulse-slow"></span>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-cyan-400 to-purple-500">
              Our Achievements
            </span>
          </h2>
          <div className="h-px w-32 bg-gradient-to-r from-transparent via-purple-500 to-transparent mx-auto mb-8"></div>
          <p className="text-gray-300 max-w-2xl mx-auto text-lg">
            <TerminalEffect text="Celebrating our victories and milestones in the tech community. A testament to our dedication and innovation." />
          </p>
        </motion.div>

        {/* Category Filter */}
        <CategoryTabs 
          categories={categories} 
          activeCategory={activeCategory} 
          setActiveCategory={setActiveCategory} 
        />

        {/* Achievements Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
          <AnimatePresence>
            {filteredAchievements.map((achievement, index) => (
              <AchievementCard 
                key={achievement.id} 
                achievement={achievement} 
                index={index} 
              />
            ))}
          </AnimatePresence>
          
          {filteredAchievements.length === 0 && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="col-span-full py-16 text-center"
            >
              <div className="text-purple-400 mb-4 opacity-50">
                <FaStar className="text-4xl mx-auto" />
              </div>
              <p className="text-gray-400 font-mono">No achievements found in this category.</p>
            </motion.div>
          )}
        </div>

        {/* Stats Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="relative py-16 px-8 rounded-2xl overflow-hidden mb-16"
        >
          {/* Gradient Background */}
          <div className="absolute inset-0 bg-gradient-to-r from-purple-900/30 to-cyan-900/30 z-0"></div>
          <div className="absolute inset-0 backdrop-blur-sm z-0"></div>
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-purple-500/20 via-transparent to-transparent z-0"></div>
          
          {/* Animated border */}
          <div className="absolute inset-0 border border-purple-500/20 z-0">
            <div className="absolute top-0 left-0 w-20 h-0.5 bg-gradient-to-r from-purple-500 to-transparent animate-pulse-slow"></div>
            <div className="absolute top-0 left-0 w-0.5 h-20 bg-gradient-to-b from-purple-500 to-transparent animate-pulse-slow"></div>
            <div className="absolute bottom-0 right-0 w-20 h-0.5 bg-gradient-to-l from-purple-500 to-transparent animate-pulse-slow"></div>
            <div className="absolute bottom-0 right-0 w-0.5 h-20 bg-gradient-to-t from-purple-500 to-transparent animate-pulse-slow"></div>
          </div>

          <div className="relative z-10 grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.id}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center group"
              >
                <div className="mb-3 relative flex justify-center">
                  <div className="absolute inset-0 bg-purple-500/20 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 scale-0 group-hover:scale-100"></div>
                  <div className="relative text-2xl">
                    {stat.icon}
                  </div>
    </div> 

                {/* Animated Counter */}
                <StatNumber value={stat.value} />

                <div className="text-gray-400 font-jetbrains-mono text-sm group-hover:text-gray-300 transition-colors">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Partners Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-10"
        >
          <h3 className="text-2xl font-bold mb-6 inline-block">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-400 font-rajdhani">
              Trusted Partners
            </span>
          </h3>
          <div className="h-px w-24 bg-gradient-to-r from-transparent via-purple-500 to-transparent mx-auto mb-10"></div>

          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16">
            {["Google", "Microsoft", "GitHub", "AWS", "IBM"].map((partner, index) => (
              <motion.div
                key={partner}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.05 }}
                className="text-gray-500 text-xl font-bold font-jetbrains-mono hover:text-purple-400 transition-colors duration-300 cursor-pointer"
              >
                {partner}
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}