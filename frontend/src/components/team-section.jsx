import { motion } from "framer-motion"; 
import { FaGithub, FaLinkedin, FaTwitter, FaArrowRight } from "react-icons/fa"; 
import TerminalEffect from "./terminal-effect"; 
import { Link, useNavigate } from "react-router-dom";
import { useState, useRef } from "react"; 

const teamMembers = [ 
  { 
    id: 1, 
    name: "Alex Chen", 
    role: "President", 
    image: "https://www.pngitem.com/pimgs/m/22-220721_circled-user-male-type-user-colorful-icon-png.png", 
    bio: "Full-stack developer with a passion for AI and machine learning.", 
    social: { 
      github: "#", 
      linkedin: "#", 
      twitter: "#", 
    }, 
  }, 
  { 
    id: 2, 
    name: "Samantha Kim", 
    role: "Vice President", 
    image: "https://www.pngitem.com/pimgs/m/22-220721_circled-user-male-type-user-colorful-icon-png.png", 
    bio: "Cybersecurity specialist and competitive programmer.", 
    social: { 
      github: "#", 
      linkedin: "#", 
      twitter: "#", 
    }, 
  }, 
  { 
    id: 3, 
    name: "Marcus Johnson", 
    role: "Technical Lead", 
    image: "https://static.vecteezy.com/system/resources/previews/000/439/863/original/vector-users-icon.jpg", 
    bio: "Backend developer with expertise in distributed systems.", 
    social: { 
      github: "#", 
      linkedin: "#", 
      twitter: "#", 
    }, 
  }, 
  { 
    id: 4, 
    name: "Priya Patel", 
    role: "Design Lead", 
    image: "/placeholder.svg?height=400&width=400", 
    bio: "UI/UX designer with a background in frontend development.", 
    social: { 
      github: "#", 
      linkedin: "#", 
      twitter: "#", 
    }, 
  }, 
]; 

// Improved circuit grid with minimal animation
const CircuitGrid = () => {
  return (
    <div className="absolute inset-0 z-0 opacity-10 pointer-events-none overflow-hidden">
      {/* Horizontal lines */}
      {Array.from({ length: 10 }).map((_, i) => (
        <div
          key={`h-${i}`}
          className="absolute h-px w-full bg-blue-500/50"
          style={{ top: `${i * 10}%` }}
        />
      ))}
      {/* Vertical lines */}
      {Array.from({ length: 10 }).map((_, i) => (
        <div
          key={`v-${i}`}
          className="absolute w-px h-full bg-blue-500/50"
          style={{ left: `${i * 10}%` }}
        />
      ))}
      {/* Circles at intersections - only animate a few of them */}
      {Array.from({ length: 10 }).map((_, i) => (
        Array.from({ length: 10 }).map((_, j) => {
          // Only animate every 3rd circle for minimal effect
          const shouldAnimate = (i + j) % 3 === 0;
          
          return shouldAnimate ? (
            <motion.div
              key={`c-${i}-${j}`}
              className="absolute w-1 h-1 rounded-full bg-blue-400/70"
              style={{ top: `${i * 10}%`, left: `${j * 10}%` }}
              animate={{ opacity: [0.3, 0.8, 0.3] }}
              transition={{ 
                duration: 3 + Math.random() * 2, 
                repeat: Infinity, 
                repeatType: "reverse",
                ease: "easeInOut"
              }}
            />
          ) : (
            <div
              key={`c-${i}-${j}`}
              className="absolute w-1 h-1 rounded-full bg-blue-400/70"
              style={{ top: `${i * 10}%`, left: `${j * 10}%` }}
            />
          );
        })
      ))}
    </div>
  );
};

export default function TeamSection() { 
  const navigate = useNavigate();
  const sectionRef = useRef(null);
  
  // Always display only 4 members in the homepage section
  const displayMembers = teamMembers.slice(0, 4);

  // Simple card variants for clean animations
  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (index) => ({
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
        delay: index * 0.1
      }
    })
  };

  // Function to handle navigation
  const handleNavigation = () => {
    navigate("/team");
  };

  return ( 
    <div ref={sectionRef} className="relative min-h-[60vh] overflow-hidden py-20">
      <CircuitGrid />
      
      <div className="container mx-auto px-4 relative z-10"> 
        {/* Section Title */} 
        <motion.div 
          initial={{ opacity: 0, y: -20 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ duration: 0.6, ease: "easeOut" }} 
          className="text-center mb-16" 
        > 
          <div className="inline-block mb-4 px-6 py-2 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-full border border-blue-500/30">
            <span className="text-blue-400 text-sm font-mono">04_TEAM_MEMBERS</span>
          </div>
          
          <h2 className="text-4xl md:text-5xl mb-6 font-orbitron font-bold"> 
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400"> 
              Our Team
            </span> 
          </h2>
          
          <motion.div 
            className="h-1 w-32 bg-gradient-to-r from-transparent via-blue-500 to-transparent mx-auto mb-8"
            initial={{ width: 0 }}
            animate={{ width: "8rem" }}
            transition={{ duration: 1.2, ease: "easeOut" }}
          />
          
          <p className="text-gray-300 text-lg max-w-2xl mx-auto font-mono leading-relaxed"> 
            <TerminalEffect text="Meet the innovators, creators, and leaders driving our community forward." /> 
          </p> 
        </motion.div> 

        {/* Team Members */} 
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"> 
          {displayMembers.map((member, index) => ( 
            <motion.div 
              key={member.id} 
              custom={index}
              variants={cardVariants}
              initial="hidden"
              animate="visible"
              whileHover={{ y: -5 }}
              className="bg-gradient-to-b from-gray-900 to-black border border-blue-500/30 rounded-xl overflow-hidden hover:border-blue-400/50 transition-all duration-300 shadow-lg hover:shadow-blue-500/20 group" 
            > 
              {/* Card inner glow effect */} 
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-blue-500/10 rounded-xl blur-md"></div>
              </div>

              {/* Team Member Image */} 
              <div className="relative flex justify-center pt-8 pb-4"> 
                <div className="relative group-hover:scale-105 transition-transform duration-300">
                  <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full opacity-50 blur-sm group-hover:opacity-75 transition-opacity duration-300"></div>
                  <img 
                    src={member.image || "/placeholder.svg"} 
                    alt={member.name} 
                    className="relative w-32 h-32 rounded-full object-cover border-2 border-blue-500/50 z-10"
                  />
                </div>
              </div> 

              {/* Team Member Info */} 
              <div className="p-6 text-center relative z-10"> 
                <h3 className="text-xl font-bold text-white mb-2 group-hover:text-blue-300 transition-colors duration-300">{member.name}</h3> 
                <div className="inline-block px-4 py-1 bg-blue-500/20 text-blue-400 rounded-full text-sm font-mono border border-blue-500/30 mb-4 group-hover:bg-blue-500/30 transition-colors duration-300"> 
                  {member.role} 
                </div> 
                <p className="text-gray-400 text-sm font-mono leading-relaxed">{member.bio}</p> 

                {/* Social Links */} 
                <div className="flex justify-center gap-5 mt-5 pt-4 border-t border-blue-500/20"> 
                  <motion.a 
                    href={member.social.github} 
                    className="text-gray-400 hover:text-blue-400 transition-colors duration-300"
                    whileHover={{ scale: 1.15 }}
                  > 
                    <FaGithub className="text-2xl" /> 
                  </motion.a> 
                  <motion.a 
                    href={member.social.linkedin} 
                    className="text-gray-400 hover:text-blue-500 transition-colors duration-300"
                    whileHover={{ scale: 1.15 }}
                  > 
                    <FaLinkedin className="text-2xl" /> 
                  </motion.a> 
                  <motion.a 
                    href={member.social.twitter} 
                    className="text-gray-400 hover:text-cyan-400 transition-colors duration-300"
                    whileHover={{ scale: 1.15 }}
                  > 
                    <FaTwitter className="text-2xl" /> 
                  </motion.a> 
                </div> 
              </div> 
            </motion.div> 
          ))} 
        </div> 

        {/* Meet the Team Button - with simplified animations */}
        <motion.div 
          initial={{ opacity: 0 }} 
          animate={{ opacity: 1 }} 
          transition={{ duration: 0.6, delay: 0.5 }} 
          className="text-center mt-16"
        > 
          <motion.button
            onClick={handleNavigation}
            whileHover={{ 
              scale: 1.05,
              boxShadow: "0 0 20px rgba(59, 130, 246, 0.6)" 
            }}
            whileTap={{ scale: 0.98 }}
            className="group relative px-6 py-4 rounded-xl text-white font-bold text-lg transition-all duration-300 
              overflow-hidden flex items-center justify-center mx-auto"
          > 
            {/* Button background with static gradient */}
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600 via-purple-600 to-blue-600 bg-size-200 
              rounded-xl"></div>
            
            {/* Button glow effect */}
            <div className="absolute -inset-px bg-gradient-to-r from-blue-400 to-purple-500 rounded-xl opacity-0 
              group-hover:opacity-100 blur-md transition-opacity duration-300"></div>
            
            {/* Button border */}
            <div className="absolute inset-0 rounded-xl border border-blue-400/50 group-hover:border-blue-400/80 
              transition-colors duration-300"></div>
            
            {/* Button content */}
            <div className="flex items-center justify-center space-x-2 relative z-10 font-orbitron">
              <span>Meet Our Full Team</span>
              <FaArrowRight className="ml-2 group-hover:translate-x-1 transition-transform duration-300" />
            </div>
          </motion.button>
        </motion.div>
      </div> 
    </div> 
  ); 
}