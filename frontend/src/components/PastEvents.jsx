import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import TerminalEffect from "./terminal-effect";
import { FaUsers, FaCode, FaTrophy, FaBuilding, FaCalendar, FaRegClock, FaArrowRight } from "react-icons/fa";

const pastEvents = [
  {
    id: 1,
    title: "Hackathon 2023",
    date: "October 15-16, 2023",
    image: "/events/hackathon.jpg", 
    description: "48-hour coding marathon where teams built innovative solutions for real-world problems.",
    stats: {
      participants: 150,
      projects: 32,
      prizes: "$5000"
    }
  },
  {
    id: 2, 
    title: "Web Development Workshop",
    date: "September 5, 2023",
    image: "/events/webdev.jpg",
    description: "Hands-on workshop covering modern web technologies including React, Node.js and MongoDB.",
    stats: {
      participants: 75,
      duration: "6 hours",
      projects: 25
    }
  },
  {
    id: 3,
    title: "Competitive Programming Contest",
    date: "August 20, 2023", 
    image: "/events/coding.jpg",
    description: "Intense coding competition testing algorithmic and problem-solving skills.",
    stats: {
      participants: 100,
      problems: 8,
      winners: 3
    }
  },
  {
    id: 4,
    title: "Tech Talk Series",
    date: "July 10, 2023",
    image: "/events/techtalk.jpg", 
    description: "Industry experts sharing insights on emerging technologies and career guidance.",
    stats: {
      speakers: 4,
      attendees: 200,
      duration: "3 hours"
    }
  }
];

// Sample sponsors data
const sponsors = [
  {
    id: 1,
    name: "TechCorp Industries",
    logo: "/sponsors/techcorp.svg", // These would need real images
    tier: "Platinum",
    website: "https://techcorp.example.com",
    description: "Leading technology solutions provider specializing in cloud infrastructure."
  },
  {
    id: 2,
    name: "DevTools Pro",
    logo: "/sponsors/devtools.svg",
    tier: "Gold",
    website: "https://devtools.example.com",
    description: "Professional development tools and services for modern engineers."
  },
  {
    id: 3,
    name: "Neural Networks Inc",
    logo: "/sponsors/neural.svg",
    tier: "Gold",
    website: "https://neural.example.com",
    description: "Cutting-edge AI research and development company."
  },
  {
    id: 4,
    name: "ByteWorks",
    logo: "/sponsors/byteworks.svg",
    tier: "Silver",
    website: "https://byteworks.example.com",
    description: "Software development and consulting services."
  }
];

// Circuit Background Component - Simplified
const CircuitPattern = () => (
  <div className="absolute inset-0 pointer-events-none opacity-10">
    <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
      <pattern id="circuit-pattern" x="0" y="0" width="100" height="100" patternUnits="userSpaceOnUse">
        <path d="M0,50 L100,50 M50,0 L50,100 M25,25 L75,75 M75,25 L25,75" stroke="#14b8a6" strokeWidth="0.5" fill="none" />
        <circle cx="50" cy="50" r="3" fill="#14b8a6" />
        <circle cx="25" cy="25" r="2" fill="#14b8a6" />
        <circle cx="75" cy="75" r="2" fill="#14b8a6" />
        <circle cx="75" cy="25" r="2" fill="#14b8a6" />
        <circle cx="25" cy="75" r="2" fill="#14b8a6" />
      </pattern>
      <rect width="100%" height="100%" fill="url(#circuit-pattern)" />
    </svg>
  </div>
);

// Terminal-style section header - simplified animation
const SectionHeader = ({ title, subtitle }) => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ duration: 0.4 }}
    className="text-center mb-16"
  >
    <div className="inline-block mb-3 px-4 py-1 rounded-full bg-cyan-900/30 border border-cyan-500/30">
      <span className="text-cyan-400 text-sm font-mono">02_PAST_EVENTS</span>
    </div>
    <h1 className="text-5xl md:text-6xl font-bold mb-6 font-rajdhani relative">
      <span className="absolute -inset-4 bg-cyan-500/20 rounded-2xl blur-3xl opacity-20"></span>
      <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-cyan-400 to-purple-500">
        {title}
      </span>
    </h1>
    <div className="h-px w-32 bg-gradient-to-r from-transparent via-cyan-500 to-transparent mx-auto mb-8"></div>
    <p className="text-gray-300 text-lg md:text-xl max-w-2xl mx-auto">
      <TerminalEffect text={subtitle} />
    </p>
  </motion.div>
);

export default function PastEvents() {
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [visible, setVisible] = useState(2); // Initially show 2 events
  
  // This effect adds a glowing cursor effect to terminal-style elements
  useEffect(() => {
    const interval = setInterval(() => {
      const cursors = document.querySelectorAll('.terminal-cursor');
      cursors.forEach(cursor => {
        cursor.classList.toggle('opacity-0');
      });
    }, 500);
    
    return () => clearInterval(interval);
  }, []);

  const loadMore = () => {
    setVisible(prev => Math.min(prev + 2, pastEvents.length));
  };

  return (
    <div className="relative bg-black pb-16">
      {/* Background Effects - changed from fixed to absolute to prevent overlap */}
      <div className="absolute inset-0 bg-gradient-to-b from-cyan-900/10 via-black to-black pointer-events-none z-[-1]"></div>
      <CircuitPattern />
      
      {/* Header Section */}
      <section className="relative pt-16 pb-8 overflow-hidden">
        <div className="container mx-auto px-4">
          <SectionHeader 
            title="Past Events" 
            subtitle="A chronicle of our technical endeavors and community gatherings." 
          />
        </div>
      </section>

      {/* Events Section - simplified animations */}
      <section className="relative py-8">
        <div className="container mx-auto px-4">
          {/* All events appear together instead of staggered */}
          <motion.div 
            className="grid grid-cols-1 lg:grid-cols-2 gap-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4 }}
          >
            {pastEvents.slice(0, visible).map((event) => (
              <div
                key={event.id}
                className="group relative rounded-xl overflow-hidden"
              >
                {/* Background glow */}
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                
                {/* Card content */}
                <div className="relative bg-gradient-to-b from-gray-900 to-black border border-cyan-500/30 rounded-xl overflow-hidden transition-all duration-300 group-hover:border-cyan-400/60 group-hover:shadow-lg group-hover:shadow-cyan-500/20 h-full">
                  {/* Image with overlay - simplified transition */}
                  <div className="relative h-64 overflow-hidden">
                    <img 
                      src={event.image} 
                      alt={event.title}
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent"></div>
                    
                    {/* Date badge */}
                    <div className="absolute top-4 right-4 px-3 py-1 bg-black/70 backdrop-blur-sm border border-cyan-500/30 rounded-full">
                      <div className="flex items-center text-cyan-400 text-sm font-mono">
                        <FaCalendar className="mr-2 text-xs" />
                        {event.date}
                      </div>
                    </div>
                  </div>
                  
                  <div className="p-6">
                    {/* Title and action button */}
                    <div className="flex justify-between items-start mb-4">
                      <h3 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400 font-rajdhani">
                        {event.title}
                      </h3>
                      <button 
                        onClick={() => setSelectedEvent(event)}
                        className="text-xs px-3 py-1 rounded-full border border-purple-500/50 text-purple-400 hover:bg-purple-500/10 transition-colors duration-300 flex items-center"
                      >
                        Details <FaArrowRight className="ml-1" />
                      </button>
                    </div>
                    
                    {/* Description */}
                    <p className="text-gray-300 mb-6">{event.description}</p>
                    
                    {/* Event stats - render directly without animations */}
                    <div className="grid grid-cols-3 gap-3">
                      {Object.entries(event.stats).map(([key, value]) => (
                        <div 
                          key={key} 
                          className="bg-gray-800/50 backdrop-blur-sm rounded-lg p-3 border border-gray-700/50 hover:border-cyan-500/30 transition-colors duration-300"
                        >
                          <div className="flex items-center justify-center mb-2">
                            {key === 'participants' && <FaUsers className="text-cyan-400" />}
                            {key === 'projects' && <FaCode className="text-purple-400" />}
                            {key === 'prizes' && <FaTrophy className="text-yellow-400" />}
                            {key === 'duration' && <FaRegClock className="text-green-400" />}
                            {key === 'winners' && <FaTrophy className="text-rose-400" />}
                            {key === 'problems' && <FaCode className="text-orange-400" />}
                            {key === 'speakers' && <FaUsers className="text-blue-400" />}
                            {key === 'attendees' && <FaUsers className="text-indigo-400" />}
                          </div>
                          <div className="text-center">
                            <div className="text-lg font-bold text-white group-hover:text-cyan-300 transition-colors duration-300">
                              {value}
                            </div>
                            <div className="text-xs text-gray-400 capitalize group-hover:text-gray-300 transition-colors duration-300">
                              {key}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </motion.div>
          
          {/* Load more button - simplified */}
          {visible < pastEvents.length && (
            <div className="flex justify-center mt-12">
              <button 
                onClick={loadMore}
                className="group relative px-8 py-3 bg-black border border-cyan-500/50 rounded-full overflow-hidden"
              >
                <span className="absolute inset-0 w-0 bg-gradient-to-r from-cyan-500/20 to-purple-500/20 transition-all duration-300 group-hover:w-full"></span>
                <span className="relative text-cyan-400 font-mono flex items-center">
                  Load More Events
                  <FaArrowRight className="ml-2 group-hover:translate-x-1 transition-transform duration-300" />
                </span>
              </button>
            </div>
          )}
        </div>
      </section>
      
      {/* Sponsors Section - simplified animations */}
      <section className="relative py-16">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold mb-4 inline-block">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400 font-rajdhani">
                Our Sponsors
              </span>
            </h2>
            <div className="h-px w-24 bg-gradient-to-r from-transparent via-cyan-500 to-transparent mx-auto mb-6"></div>
            <p className="text-gray-300 max-w-2xl mx-auto">
              <TerminalEffect text="These amazing organizations make our events possible." />
            </p>
          </motion.div>
          
          {/* Sponsors Grid - batch render instead of individual animations */}
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4 }}
          >
            {sponsors.map((sponsor) => (
              <div
                key={sponsor.id}
                className="bg-gradient-to-b from-gray-900 to-black border border-gray-800 hover:border-cyan-500/30 rounded-xl p-6 text-center group transition-all duration-300 hover:shadow-lg hover:shadow-cyan-500/10"
              >
                <div className="flex items-center justify-center h-20 mb-4">
                  {/* If logo is not available, display name instead */}
                  {sponsor.logo ? (
                    <img src={sponsor.logo} alt={sponsor.name} className="max-h-full max-w-full object-contain" />
                  ) : (
                    <div className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400">
                      {sponsor.name}
                    </div>
                  )}
                </div>
                
                <div className="mb-2">
                  <span className={`inline-block px-3 py-1 rounded-full text-xs font-mono ${
                    sponsor.tier === 'Platinum' ? 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/30' :
                    sponsor.tier === 'Gold' ? 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/30' :
                    'bg-gray-500/20 text-gray-400 border border-gray-500/30'
                  }`}>
                    {sponsor.tier} Sponsor
                  </span>
                </div>
                
                <div className="h-px w-3/4 mx-auto mb-4 bg-gradient-to-r from-transparent via-gray-700 to-transparent opacity-50"></div>
                
                <p className="text-gray-400 text-sm mb-4 line-clamp-2">{sponsor.description}</p>
                
                <a 
                  href={sponsor.website} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center text-sm text-cyan-400 hover:text-cyan-300 transition-colors duration-300"
                >
                  <FaBuilding className="mr-1" /> Visit Website
                  <FaArrowRight className="ml-1 text-xs group-hover:translate-x-1 transition-transform duration-300" />
                </a>
              </div>
            ))}
          </motion.div>
        </div>
      </section>
      
      {/* Simplified gradient */}
      <div className="relative w-full h-12 bg-gradient-to-t from-cyan-900/10 to-transparent mt-10"></div>
    </div>
  );
}
