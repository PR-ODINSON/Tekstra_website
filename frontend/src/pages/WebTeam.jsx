import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import useScrollTop from "../hooks/useScrollTop";
import TerminalEffect from "../components/terminal-effect";

// Simplified team member data with just name, role, and description
const webTeamMembers = [
  {
    id: 1,
    name: "Alex Chen",
    role: "Lead Developer",
    photo: "/team/developer-1.jpg",
    description: "Full-stack developer with 5+ years of experience specializing in React and Node.js. Leads architecture decisions and mentors junior developers."
  },
  {
    id: 2,
    name: "Priya Patel",
    role: "UI/UX Designer",
    photo: "/team/designer-1.jpg",
    description: "Creative designer with an eye for detail and user-centric approach. Transforms complex requirements into intuitive, accessible interfaces."
  },
  {
    id: 3,
    name: "Marcus Johnson",
    role: "Backend Developer",
    photo: "/team/developer-2.jpg",
    description: "Database expert and API architect who ensures our systems are robust, secure, and scalable. Specializes in performance optimization."
  },
  {
    id: 4,
    name: "Sophie Kim",
    role: "Frontend Developer",
    photo: "/team/developer-3.jpg",
    description: "Animation and interaction specialist who creates seamless user experiences. Passionate about accessibility and responsive design."
  },
  {
    id: 5,
    name: "David Rodriguez",
    role: "Mobile Developer",
    photo: "/team/developer-4.jpg",
    description: "Cross-platform mobile expert who bridges the gap between web and native applications. Focuses on performance and offline capabilities."
  },
  {
    id: 6,
    name: "Emma Wilson",
    role: "AI Integration Specialist",
    photo: "/team/developer-5.jpg",
    description: "Combines ML models with web applications to create intelligent user experiences. Passionate about ethical AI and data privacy."
  },
  {
    id: 7,
    name: "Michael Novak",
    role: "PHP Developer",
    photo: "/team/developer-6.jpg",
    description: "Experienced PHP developer specializing in Laravel and WordPress. Creates robust backend solutions and maintains legacy systems with modern best practices."
  },
  {
    id: 8,
    name: "Sarah Thompson",
    role: "PHP/CMS Specialist",
    photo: "/team/developer-7.jpg",
    description: "Expert in PHP-based content management systems including WordPress, Drupal, and custom CMS solutions. Focuses on security and performance optimization."
  }
];

// Simple elegant background component
const ElegantBackground = () => (
  <div className="absolute inset-0 z-0 overflow-hidden">
    {/* Gradient background */}
    <div className="absolute w-full h-full bg-gradient-to-b from-gray-950 via-slate-900/10 to-gray-950"></div>
    
    {/* Subtle grid pattern */}
    <div
      className="absolute w-full h-full opacity-10"
      style={{
        backgroundImage: `
          linear-gradient(to right, rgba(148, 163, 184, 0.08) 1px, transparent 1px),
          linear-gradient(to bottom, rgba(148, 163, 184, 0.08) 1px, transparent 1px)
        `,
        backgroundSize: "40px 40px",
      }}
    ></div>
    
    {/* Simple horizontal accent line */}
    <div 
      className="absolute h-px w-full opacity-15"
      style={{ 
        top: `50%`,
        background: "linear-gradient(90deg, transparent 0%, rgba(148, 163, 184, 0.4) 50%, transparent 100%)" 
      }}
    />
  </div>
);

// Clean, elegant team member card component
const MemberCard = ({ member, index }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5, delay: index * 0.1 }}
    whileHover={{ y: -5 }}
    className="relative overflow-hidden rounded-xl p-6 backdrop-blur-sm transition-all duration-300 shadow-md group"
    style={{ 
      background: "linear-gradient(145deg, rgba(17, 24, 39, 0.9), rgba(17, 24, 39, 0.7))" 
    }}
  >
    {/* Card border */}
    <div className="absolute inset-0 border border-slate-700 rounded-xl z-0 group-hover:border-indigo-500/30 transition-colors duration-300"></div>
    
    {/* Subtle corner accents */}
    <div className="absolute top-0 left-0 w-12 h-12 overflow-hidden z-0">
      <div className="absolute h-px w-12 bg-gradient-to-r from-indigo-500/30 to-transparent"></div>
      <div className="absolute w-px h-12 bg-gradient-to-b from-indigo-500/30 to-transparent"></div>
    </div>
    <div className="absolute bottom-0 right-0 w-12 h-12 overflow-hidden z-0">
      <div className="absolute h-px w-12 bg-gradient-to-l from-indigo-500/30 to-transparent bottom-0"></div>
      <div className="absolute w-px h-12 bg-gradient-to-t from-indigo-500/30 to-transparent right-0"></div>
    </div>
    
    <div className="relative z-10">
      {/* Team member photo with clean circular design */}
      <div className="flex justify-center mb-6">
        <div className="relative group">
          {/* Simple glow effect */}
          <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500/40 to-purple-500/40 rounded-full opacity-0 blur-sm group-hover:opacity-70 transition-opacity duration-300"></div>
          
          {/* Photo container */}
          <div className="relative rounded-full w-36 h-36 overflow-hidden border-2 border-slate-700 group-hover:border-indigo-400 transition-colors duration-300">
            <img 
              src={member.photo} 
              alt={`${member.name} - ${member.role}`}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = '/placeholder.svg?height=200&width=200';
              }}
            />
          </div>
        </div>
      </div>
      
      {/* Name with elegant styling */}
      <h3 className="text-2xl font-bold mb-3 font-rajdhani text-center">
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-slate-200 to-white">
          {member.name}
        </span>
      </h3>
      
      {/* Role with elegant badge */}
      <div className="flex justify-center mb-4">
        <div className="px-4 py-1.5 bg-slate-800/60 border border-slate-700 rounded-full text-indigo-300 text-sm font-mono">
          {member.role}
        </div>
      </div>
      
      {/* Description with clean styling */}
      <p className="text-slate-300 leading-relaxed text-center mb-5 font-light">
        {member.description}
      </p>
      
      {/* Simple accent line */}
      <div className="h-px w-24 mx-auto mt-4 bg-gradient-to-r from-transparent via-indigo-500/40 to-transparent"></div>
    </div>
  </motion.div>
);

const WebTeam = () => {
  // Ensure page scrolls to top on component mount
  useScrollTop();

  return (
    <div 
      className="relative min-h-screen bg-gray-950 text-white py-24 px-4 overflow-hidden"
    >
      {/* Background elements */}
      <ElegantBackground />
      
      <div className="container mx-auto max-w-6xl relative z-10">
        {/* Elegant Page Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ duration: 0.6 }} 
          className="text-center mb-20 relative"
        >
          {/* Section identifier */}
          <div className="inline-block mb-5 px-5 py-2 bg-slate-800/40 rounded-full border border-slate-700">
            <span className="text-indigo-300 text-sm font-mono">DEVELOPMENT TEAM</span>
          </div>
          
          {/* Main title with elegant styling */}
          <h1 className="text-5xl md:text-6xl font-bold mb-5 font-audiowide">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-400">
              Web Team
            </span>
          </h1>
          
          {/* Simple divider */}
          <div className="h-px w-40 mx-auto mb-8 bg-gradient-to-r from-transparent via-indigo-500/60 to-transparent"></div>
          
          {/* Subtitle with terminal effect */}
          <div className="text-slate-300 text-lg max-w-2xl mx-auto font-mono">
            <TerminalEffect text="Meet the architects behind our digital presence. Our team combines technical expertise with creative vision." />
          </div>
        </motion.div>
        
        {/* Team Members Grid - Clean Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
          {webTeamMembers.map((member, index) => (
            <MemberCard key={member.id} member={member} index={index} />
          ))}
        </div>
        
        {/* Footer element */}
        <div className="relative h-px w-full my-16 bg-gradient-to-r from-transparent via-slate-700 to-transparent"></div>
        
        <div className="text-center mt-10 font-mono text-indigo-400/70 text-sm">
          // TEAM MODULE
        </div>
      </div>
    </div>
  );
};

export default WebTeam;
