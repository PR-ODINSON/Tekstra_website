import { motion } from "framer-motion";
import { FaGithub, FaLinkedin, FaTwitter, FaUsers, FaStar } from "react-icons/fa";
import TerminalEffect from "../components/terminal-effect";
import { useState, useRef, useEffect } from "react";
import useScrollTop from "../hooks/useScrollTop";

// Separated team members into executives and associates
const executiveMembers = [
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

const associateMembers = [
  {
    id: 5,
    name: "John Doe",
    role: "Frontend Developer",
    image: "/placeholder.svg?height=400&width=400",
    bio: "Frontend developer specializing in React and Next.js.",
    social: {
      github: "#",
      linkedin: "#",
      twitter: "#",
    },
  },
  {
    id: 6,
    name: "Jane Smith",
    role: "Backend Developer",
    image: "/placeholder.svg?height=400&width=400",
    bio: "Backend developer with expertise in Node.js and Python.",
    social: {
      github: "#",
      linkedin: "#",
      twitter: "#",
    },
  },
  {
    id: 7,
    name: "David Wilson",
    role: "Mobile Developer",
    image: "/placeholder.svg?height=400&width=400",
    bio: "Mobile app developer focused on cross-platform solutions.",
    social: {
      github: "#",
      linkedin: "#",
      twitter: "#",
    },
  },
  {
    id: 8,
    name: "Maria Rodriguez",
    role: "UI/UX Designer",
    image: "/placeholder.svg?height=400&width=400",
    bio: "UI/UX designer passionate about creating intuitive user experiences.",
    social: {
      github: "#",
      linkedin: "#",
      twitter: "#",
    },
  },
  {
    id: 9,
    name: "James Taylor",
    role: "Data Scientist",
    image: "/placeholder.svg?height=400&width=400",
    bio: "Data scientist with expertise in machine learning and data analytics.",
    social: {
      github: "#",
      linkedin: "#",
      twitter: "#",
    },
  },
  {
    id: 10,
    name: "Emily White",
    role: "Quality Assurance",
    image: "/placeholder.svg?height=400&width=400",
    bio: "QA specialist ensuring high-quality software delivery.",
    social: {
      github: "#",
      linkedin: "#",
      twitter: "#",
    },
  },
];

// Add a new array for tech visionaries (past members)
const techVisionaryMembers = [
  {
    id: 101,
    name: "Eleanor Wright",
    role: "Founding President",
    image: "/placeholder.svg?height=400&width=400",
    bio: "Founded the club in 2018 and established our core technical direction.",
    years: "2018-2020",
    social: {
      github: "#",
      linkedin: "#",
      twitter: "#",
    },
  },
  {
    id: 102,
    name: "Michael Zhang",
    role: "Technical Architect",
    image: "/placeholder.svg?height=400&width=400",
    bio: "Designed our first cloud infrastructure and mentored numerous members.",
    years: "2019-2021",
    social: {
      github: "#",
      linkedin: "#",
      twitter: "#",
    },
  },
  {
    id: 103,
    name: "Sophia Lee",
    role: "Innovation Lead",
    image: "/placeholder.svg?height=400&width=400",
    bio: "Pioneered our AI research initiatives and led multiple award-winning projects.",
    years: "2018-2022",
    social: {
      github: "#",
      linkedin: "#",
      twitter: "#",
    },
  },
  {
    id: 104,
    name: "Robert Jackson",
    role: "Outreach Director",
    image: "/placeholder.svg?height=400&width=400",
    bio: "Established partnerships with industry leaders and expanded our network.",
    years: "2020-2023",
    social: {
      github: "#",
      linkedin: "#",
      twitter: "#",
    },
  },
];

// Member Card Component for reusability
const MemberCard = ({ member, index, animationDelay = 0 }) => (
  <motion.div 
    key={member.id} 
    initial={{ opacity: 0, y: 20, scale: 0.8 }} 
    whileInView={{ opacity: 1, y: 0, scale: 1 }} 
    transition={{ duration: 0.5, delay: animationDelay }} 
    viewport={{ once: true }} 
    className="bg-gradient-to-b from-gray-900 to-black border border-blue-500/30 rounded-xl overflow-hidden group relative transform transition-transform duration-500 hover:scale-105"
  > 
    <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-xl"></div>

    <div className="relative flex justify-center py-6"> 
      <motion.img 
        src={member.image || "/placeholder.svg"} 
        alt={member.name} 
        className="w-32 h-32 rounded-full object-cover border-4 border-blue-500/50 shadow-lg" 
        initial={{ opacity: 0, scale: 0.8 }} 
        whileInView={{ opacity: 1, scale: 1 }} 
        transition={{ duration: 0.5, delay: animationDelay + 0.1 }} 
        viewport={{ once: true }} 
      />
    </div>

    <div className="p-6 text-center"> 
      <h3 className="text-xl font-bold text-white mb-1 font-orbitron">{member.name}</h3> 
      <div className="inline-block px-3 py-1 bg-blue-500/20 text-blue-400 rounded-full text-xs font-jetbrains-mono border border-blue-500/30"> 
        {member.role} 
      </div> 
      <p className="text-gray-400 text-sm mt-3 font-jetbrains-mono">{member.bio}</p> 

      <div className="flex justify-center gap-4 mt-4"> 
        <a href={member.social.github} className="text-gray-400 hover:text-blue-400 transition-colors duration-300"> 
          <FaGithub className="text-2xl" /> 
        </a> 
        <a href={member.social.linkedin} className="text-gray-400 hover:text-blue-500 transition-colors duration-300"> 
          <FaLinkedin className="text-2xl" /> 
        </a> 
        <a href={member.social.twitter} className="text-gray-400 hover:text-cyan-400 transition-colors duration-300"> 
          <FaTwitter className="text-2xl" /> 
        </a> 
      </div> 
    </div> 
  </motion.div>
);

export default function TeamSection() {
  const [activeTab, setActiveTab] = useState("all");
  const headerRef = useRef(null);
  
  // Use scroll hook to ensure page scrolls to top
  useScrollTop();
  
  // For animated marquee effect
  const [marqueeWidth, setMarqueeWidth] = useState(0);
  const marqueeRef = useRef(null);
  
  useEffect(() => {
    if (marqueeRef.current) {
      // Calculate the width of all items in the marquee
      setMarqueeWidth(marqueeRef.current.scrollWidth / 2);
    }
  }, [associateMembers]);
  
  // Filter team members based on active tab (only applies to executives in this new implementation)
  const filteredExecutives = activeTab === "all" 
    ? executiveMembers 
    : executiveMembers.filter(member => member.role.toLowerCase().includes(activeTab));

  return (
    <div className="bg-black min-h-screen text-white pb-20">
      <div className="container mx-auto px-4 pt-20 pb-12" ref={headerRef}>
        <motion.div 
          initial={{ opacity: 0, y: 20 }} 
          whileInView={{ opacity: 1, y: 0 }} 
          transition={{ duration: 0.5 }} 
          viewport={{ once: true }} 
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl mb-6 tracking-wide font-orbitron">
            <span className="text-5xl md:text-6xl mb-6 text-transparent bg-clip-text font-audiowide bg-gradient-to-r from-purple-400 to-cyan-400 animate-gradient">
              Team
            </span>
          </h2>
          <p className="text-gray-300 text-lg md:text-xl max-w-2xl mx-auto font-audiowide leading-relaxed">
            <TerminalEffect text="Meet the innovators and collaborators behind our success. Our team is driven by passion and excellence." />
          </p>
        </motion.div>

        {/* Executive Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="mb-20"
        >
          <div className="flex items-center mb-12">
            <div className="h-px flex-grow bg-gradient-to-r from-transparent via-blue-500/30 to-transparent"></div>
            <div className="px-4 py-2 bg-blue-500/10 rounded-full border border-blue-500/30 flex items-center space-x-2">
              <FaStar className="text-blue-400" />
              <span className="text-blue-400 font-mono text-sm">EXECUTIVE MEMBERS</span>
            </div>
            <div className="h-px flex-grow bg-gradient-to-r from-transparent via-blue-500/30 to-transparent"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"> 
            {filteredExecutives.map((member, index) => (
              <MemberCard key={member.id} member={member} index={index} animationDelay={index * 0.1} />
            ))} 
          </div>
        </motion.div>

        {/* Associate Members Marquee Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <div className="flex items-center mb-12">
            <div className="h-px flex-grow bg-gradient-to-r from-transparent via-purple-500/30 to-transparent"></div>
            <div className="px-4 py-2 bg-purple-500/10 rounded-full  flex items-center space-x-2">
              <FaUsers className="text-purple-400" />
              <span className="text-purple-400 font-mono text-sm">ASSOCIATE MEMBERS</span>
            </div>
            <div className="h-px flex-grow bg-gradient-to-r from-transparent via-purple-500/30 to-transparent"></div>
          </div>
          
          {/* Marquee Container */}
          <div className="relative overflow-hidden border border-purple-500/30 rounded-xl bg-black/50 shadow-lg shadow-purple-500/10">
            <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
            
            {/* First Marquee (Left to Right) */}
            <div className="py-6 relative">
              <motion.div
                ref={marqueeRef}
                className="flex"
                animate={{
                  x: [0, -marqueeWidth],
                }}
                transition={{
                  x: {
                    repeat: Infinity,
                    repeatType: "loop",
                    duration: 40,
                    ease: "linear",
                  },
                }}
                style={{
                  width: "fit-content",
                }}
              >
                {/* First set of associate members */}
                {associateMembers.map((member) => (
                  <div 
                    key={`first-${member.id}`} 
                    className="flex-shrink-0 w-64 mx-4 bg-gradient-to-b from-gray-900/80 to-black/80 border border-purple-500/30 rounded-xl overflow-hidden group relative hover:border-purple-400/50 transform transition-all duration-500 hover:scale-105 hover:shadow-lg hover:shadow-purple-500/20"
                  >
                    <div className="relative flex justify-center py-4">
                      <img
                        src={member.image || "/placeholder.svg"}
                        alt={member.name}
                        className="w-20 h-20 rounded-full object-cover border-2 border-purple-500/50 shadow-lg group-hover:border-purple-400"
                      />
                    </div>
                    <div className="p-4 text-center">
                      <h3 className="text-lg font-bold text-white mb-1 font-orbitron">{member.name}</h3>
                      <div className="inline-block px-3 py-1 bg-purple-500/20 text-purple-400 rounded-full text-xs font-jetbrains-mono border border-purple-500/30">
                        {member.role}
                      </div>
                      <div className="flex justify-center gap-3 mt-3">
                        <a href={member.social.github} className="text-gray-400 hover:text-purple-400 transition-colors duration-300">
                          <FaGithub className="text-lg" />
                        </a>
                        <a href={member.social.linkedin} className="text-gray-400 hover:text-purple-500 transition-colors duration-300">
                          <FaLinkedin className="text-lg" />
                        </a>
                        <a href={member.social.twitter} className="text-gray-400 hover:text-cyan-400 transition-colors duration-300">
                          <FaTwitter className="text-lg" />
                        </a>
                      </div>
                    </div>
                  </div>
                ))}
                
                {/* Duplicate for seamless loop */}
                {associateMembers.map((member) => (
                  <div 
                    key={`second-${member.id}`} 
                    className="flex-shrink-0 w-64 mx-4 bg-gradient-to-b from-gray-900/80 to-black/80 border border-purple-500/30 rounded-xl overflow-hidden group relative hover:border-purple-400/50 transform transition-all duration-500 hover:scale-105 hover:shadow-lg hover:shadow-purple-500/20"
                  >
                    <div className="relative flex justify-center py-4">
                      <img
                        src={member.image || "/placeholder.svg"}
                        alt={member.name}
                        className="w-20 h-20 rounded-full object-cover border-2 border-purple-500/50 shadow-lg group-hover:border-purple-400"
                      />
                    </div>
                    <div className="p-4 text-center">
                      <h3 className="text-lg font-bold text-white mb-1 font-orbitron">{member.name}</h3>
                      <div className="inline-block px-3 py-1 bg-purple-500/20 text-purple-400 rounded-full text-xs font-jetbrains-mono border border-purple-500/30">
                        {member.role}
                      </div>
                      <div className="flex justify-center gap-3 mt-3">
                        <a href={member.social.github} className="text-gray-400 hover:text-purple-400 transition-colors duration-300">
                          <FaGithub className="text-lg" />
                        </a>
                        <a href={member.social.linkedin} className="text-gray-400 hover:text-purple-500 transition-colors duration-300">
                          <FaLinkedin className="text-lg" />
                        </a>
                        <a href={member.social.twitter} className="text-gray-400 hover:text-cyan-400 transition-colors duration-300">
                          <FaTwitter className="text-lg" />
                        </a>
                      </div>
                    </div>
                  </div>
                ))}
              </motion.div>
            </div>
            
            {/* Second Marquee (Right to Left) - Opposite Direction */}
            <div className="py-6 relative">
              <motion.div
                className="flex"
                animate={{
                  x: [-marqueeWidth, 0],
                }}
                transition={{
                  x: {
                    repeat: Infinity,
                    repeatType: "loop",
                    duration: 35,
                    ease: "linear",
                  },
                }}
                style={{
                  width: "fit-content",
                }}
              >
                {/* First set of associate members (reversed) */}
                {[...associateMembers].reverse().map((member) => (
                  <div 
                    key={`third-${member.id}`} 
                    className="flex-shrink-0 w-64 mx-4 bg-gradient-to-b from-gray-900/80 to-black/80 border border-cyan-500/30 rounded-xl overflow-hidden group relative hover:border-cyan-400/50 transform transition-all duration-500 hover:scale-105 hover:shadow-lg hover:shadow-cyan-500/20"
                  >
                    <div className="relative flex justify-center py-4">
                      <img
                        src={member.image || "/placeholder.svg"}
                        alt={member.name}
                        className="w-20 h-20 rounded-full object-cover border-2 border-cyan-500/50 shadow-lg group-hover:border-cyan-400"
                      />
                    </div>
                    <div className="p-4 text-center">
                      <h3 className="text-lg font-bold text-white mb-1 font-orbitron">{member.name}</h3>
                      <div className="inline-block px-3 py-1 bg-cyan-500/20 text-cyan-400 rounded-full text-xs font-jetbrains-mono border border-cyan-500/30">
                        {member.role}
                      </div>
                      <div className="flex justify-center gap-3 mt-3">
                        <a href={member.social.github} className="text-gray-400 hover:text-cyan-400 transition-colors duration-300">
                          <FaGithub className="text-lg" />
                        </a>
                        <a href={member.social.linkedin} className="text-gray-400 hover:text-cyan-500 transition-colors duration-300">
                          <FaLinkedin className="text-lg" />
                        </a>
                        <a href={member.social.twitter} className="text-gray-400 hover:text-cyan-400 transition-colors duration-300">
                          <FaTwitter className="text-lg" />
                        </a>
                      </div>
                    </div>
                  </div>
                ))}
                
                {/* Duplicate for seamless loop (reversed) */}
                {[...associateMembers].reverse().map((member) => (
                  <div 
                    key={`fourth-${member.id}`} 
                    className="flex-shrink-0 w-64 mx-4 bg-gradient-to-b from-gray-900/80 to-black/80 border border-cyan-500/30 rounded-xl overflow-hidden group relative hover:border-cyan-400/50 transform transition-all duration-500 hover:scale-105 hover:shadow-lg hover:shadow-cyan-500/20"
                  >
                    <div className="relative flex justify-center py-4">
                      <img
                        src={member.image || "/placeholder.svg"}
                        alt={member.name}
                        className="w-20 h-20 rounded-full object-cover border-2 border-cyan-500/50 shadow-lg group-hover:border-cyan-400"
                      />
                    </div>
                    <div className="p-4 text-center">
                      <h3 className="text-lg font-bold text-white mb-1 font-orbitron">{member.name}</h3>
                      <div className="inline-block px-3 py-1 bg-cyan-500/20 text-cyan-400 rounded-full text-xs font-jetbrains-mono border border-cyan-500/30">
                        {member.role}
                      </div>
                      <div className="flex justify-center gap-3 mt-3">
                        <a href={member.social.github} className="text-gray-400 hover:text-cyan-400 transition-colors duration-300">
                          <FaGithub className="text-lg" />
                        </a>
                        <a href={member.social.linkedin} className="text-gray-400 hover:text-cyan-500 transition-colors duration-300">
                          <FaLinkedin className="text-lg" />
                        </a>
                        <a href={member.social.twitter} className="text-gray-400 hover:text-cyan-400 transition-colors duration-300">
                          <FaTwitter className="text-lg" />
                        </a>
                      </div>
                    </div>
                  </div>
                ))}
              </motion.div>
            </div>
          </div>
        </motion.div>

        {/* Tech Visionaries Section (Past Members) */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="mt-20"
        >
          <div className="flex items-center mb-12">
            <div className="h-px flex-grow bg-gradient-to-r from-transparent via-cyan-500/30 to-transparent"></div>
            <div className="px-4 py-2 bg-cyan-500/10 rounded-full border border-cyan-500/30 flex items-center space-x-2">
              <svg 
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 text-cyan-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" 
                />
              </svg>
              <span className="text-cyan-400 font-mono text-sm">TECH VISIONARIES</span>
            </div>
            <div className="h-px flex-grow bg-gradient-to-r from-transparent via-cyan-500/30 to-transparent"></div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {techVisionaryMembers.map((member, index) => (
              <motion.div 
                key={member.id} 
                initial={{ opacity: 0, y: 20, scale: 0.8 }} 
                whileInView={{ opacity: 1, y: 0, scale: 1 }} 
                transition={{ duration: 0.5, delay: index * 0.1 }} 
                viewport={{ once: true }} 
                className="bg-gradient-to-b from-gray-900 to-black border border-cyan-500/30 rounded-xl overflow-hidden group relative transform transition-transform duration-500 hover:scale-105"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-xl"></div>
                
                <div className="relative flex justify-center py-6">
                  <motion.img 
                    src={member.image || "/placeholder.svg"} 
                    alt={member.name} 
                    className="w-32 h-32 rounded-full object-cover border-4 border-cyan-500/50 shadow-lg" 
                    initial={{ opacity: 0, scale: 0.8 }} 
                    whileInView={{ opacity: 1, scale: 1 }} 
                    transition={{ duration: 0.5, delay: index * 0.2 }} 
                    viewport={{ once: true }} 
                  />
                  
                  {/* Years badge */}
                  <motion.div
                    className="absolute -bottom-2 px-3 py-1 bg-cyan-900/80 text-cyan-300 rounded-full text-xs font-mono border border-cyan-500/50 backdrop-blur-sm"
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.2 + 0.2 }}
                    viewport={{ once: true }}
                  >
                    {member.years}
                  </motion.div>
                </div>
                
                <div className="p-6 text-center">
                  <h3 className="text-xl font-bold text-white mb-1 font-orbitron">{member.name}</h3>
                  <div className="inline-block px-3 py-1 bg-cyan-500/20 text-cyan-400 rounded-full text-xs font-jetbrains-mono border border-cyan-500/30">
                    {member.role}
                  </div>
                  <p className="text-gray-400 text-sm mt-3 font-jetbrains-mono">{member.bio}</p>
                  
                  <div className="flex justify-center gap-4 mt-4">
                    <a href={member.social.github} className="text-gray-400 hover:text-cyan-400 transition-colors duration-300">
                      <FaGithub className="text-2xl" />
                    </a>
                    <a href={member.social.linkedin} className="text-gray-400 hover:text-cyan-500 transition-colors duration-300">
                      <FaLinkedin className="text-2xl" />
                    </a>
                    <a href={member.social.twitter} className="text-gray-400 hover:text-blue-400 transition-colors duration-300">
                      <FaTwitter className="text-2xl" />
                    </a>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
          
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
            viewport={{ once: true }}
            className="text-center mt-12 relative"
          >
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="h-px w-full max-w-md bg-gradient-to-r from-transparent via-cyan-500/30 to-transparent"></div>
            </div>
            <span className="relative bg-black px-6 text-cyan-400 text-sm font-mono">
              HONORING OUR HISTORY
            </span>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}