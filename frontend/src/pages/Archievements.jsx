import React, { useState, useRef } from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import CountUp from "react-countup";
import { FaTrophy, FaUsers, FaCode, FaLaptopCode, FaCertificate, FaMedal, FaAward, FaGlobe, FaBrain } from "react-icons/fa";
import useScrollTop from "../hooks/useScrollTop";

// Example achievements data
const achievementsData = [
  {
    id: 1,
    title: "National Coding Championship",
    year: "2023",
    icon: <FaTrophy className="text-4xl text-yellow-400" />,
    description: "First place in the prestigious National Coding Championship, competing against 500+ teams from across the country.",
    category: "Competition"
  },
  {
    id: 2,
    title: "Google Developer Conference",
    year: "2022",
    icon: <FaCode className="text-4xl text-blue-400" />,
    description: "Selected to present our innovative AI solution at the annual Google Developer Conference in San Francisco.",
    category: "Recognition"
  },
  {
    id: 3,
    title: "Microsoft Student Partner Program",
    year: "2023",
    icon: <FaLaptopCode className="text-4xl text-green-400" />,
    description: "Five team members selected for the exclusive Microsoft Student Partner program, representing our university.",
    category: "Partnership"
  },
  {
    id: 4,
    title: "Open Source Contribution Award",
    year: "2022",
    icon: <FaGlobe className="text-4xl text-purple-400" />,
    description: "Recognized for significant contributions to major open source projects, with over 200+ pull requests merged.",
    category: "Community"
  },
  {
    id: 5,
    title: "Hackathon Series Champion",
    year: "2023",
    icon: <FaAward className="text-4xl text-pink-400" />,
    description: "Won three consecutive major hackathons, developing innovative solutions for healthcare, education, and sustainability.",
    category: "Competition"
  },
  {
    id: 6,
    title: "AI Research Publication",
    year: "2023",
    icon: <FaBrain className="text-4xl text-cyan-400" />,
    description: "Research paper on novel machine learning algorithms accepted and published in a leading international journal.",
    category: "Research"
  },
  {
    id: 7,
    title: "Tech Workshop Series",
    year: "2022",
    icon: <FaUsers className="text-4xl text-orange-400" />,
    description: "Successfully conducted a series of technical workshops, training over 500 students in emerging technologies.",
    category: "Education"
  },
  {
    id: 8,
    title: "Industry Certification Program",
    year: "2023",
    icon: <FaCertificate className="text-4xl text-indigo-400" />,
    description: "Established a certification program in partnership with leading tech companies, with 100+ certified graduates.",
    category: "Education"
  },
];

// Stats data
const statsData = [
  { id: 1, title: "Awards Won", value: 42, icon: <FaTrophy className="text-yellow-400" /> },
  { id: 2, title: "Team Members", value: 120, icon: <FaUsers className="text-cyan-400" /> },
  { id: 3, title: "Projects Completed", value: 75, icon: <FaCode className="text-purple-400" /> },
  { id: 4, title: "Workshops Conducted", value: 65, icon: <FaLaptopCode className="text-green-400" /> },
];

// Circuit Background Component
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

const Achievements = () => {
  const [selectedFilter, setSelectedFilter] = useState("All");
  const headerRef = useRef(null);
  
  // Use scroll hook to ensure page scrolls to top
  useScrollTop();
  
  const categories = ["All", ...new Set(achievementsData.map(item => item.category))];
  
  const filteredAchievements = selectedFilter === "All" 
    ? achievementsData 
    : achievementsData.filter(achievement => achievement.category === selectedFilter);

  return (
    <div className="relative min-h-screen bg-black pb-20">
      {/* Background Effects */}
      <div className="fixed inset-0 bg-gradient-to-b from-purple-900/10 via-black to-black pointer-events-none"></div>
      <CircuitPattern />
      
      {/* Header Section */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-4xl mx-auto"
          >
            <div className="inline-block mb-3 px-4 py-1 rounded-full bg-purple-900/30 border border-purple-500/30">
              <span className="text-purple-400 text-sm font-mono">01_ACHIEVEMENTS</span>
            </div>
            <h1 className="text-5xl md:text-6xl font-bold mb-6 font-rajdhani relative">
              <span className="absolute -inset-4 bg-purple-500/20 rounded-2xl blur-3xl opacity-20 animate-pulse-slow"></span>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-cyan-400 to-purple-500">
                Our Achievements
              </span>
            </h1>
            <div className="h-px w-32 bg-gradient-to-r from-transparent via-purple-500 to-transparent mx-auto mb-8"></div>
            <p className="text-gray-300 text-lg">
              Celebrating excellence and innovation in technology. Our team's accomplishments reflect our commitment to pushing boundaries and creating impact.
            </p>
          </motion.div>
        </div>
      </section>
      
      {/* Stats Section */}
      <section className="relative py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {statsData.map((stat, index) => (
              <motion.div
                key={stat.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="relative bg-gradient-to-b from-purple-900/20 to-black/60 backdrop-blur-md p-8 rounded-lg border border-purple-500/30 overflow-hidden group"
              >
                <div className="absolute -inset-0.5 bg-gradient-to-tr from-purple-500/0 via-purple-500/30 to-cyan-500/0 opacity-0 group-hover:opacity-100 blur transition-all duration-700 rounded-lg"></div>
                <div className="relative z-10">
                  <div className="flex justify-center mb-4">{stat.icon}</div>
                  <StatNumber value={stat.value} />
                  <div className="text-center text-gray-400 font-medium">{stat.title}</div>
                </div>
                <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-purple-500 to-cyan-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Category Filter */}
      <section className="pt-16 pb-8">
  <div className="container mx-auto px-4">
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
      className="mb-12"
    >
      <h2 className="text-3xl font-bold text-white text-center font-rajdhani">
        Explore By Category
      </h2>
      <div className="flex flex-wrap justify-center gap-4 mt-6">
        {categories.map((category, index) => (
          <button
            key={category}
            onClick={() => setSelectedFilter(category)}
            className={`px-5 py-2 rounded-full text-sm font-mono transition-all duration-300 border ${
              selectedFilter === category
                ? "bg-purple-600 text-white border-purple-500 shadow-md shadow-purple-500/50"
                : "bg-gray-800 text-gray-300 border-gray-600 hover:bg-purple-500 hover:text-white hover:border-purple-400"
            }`}
          >
            {category}
          </button>
        ))}
      </div>
    </motion.div>
  </div>
</section>

      
      {/* Achievements Cards */}
      <section className="py-8">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredAchievements.map((achievement, index) => (
              <motion.div
                key={achievement.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="relative bg-gradient-to-b from-black to-purple-950/30 backdrop-blur-md rounded-xl overflow-hidden group"
              >
                {/* Card Border */}
                <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 via-cyan-500/20 to-purple-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-xl"></div>
                <div className="absolute inset-px bg-black rounded-xl z-10"></div>
                
                {/* Card Content */}
                <div className="relative z-20 p-6 border border-purple-500/30 rounded-xl h-full flex flex-col">
                  <div className="flex justify-between items-start mb-4">
                    <div className="p-3 bg-purple-900/30 rounded-lg">
                      {achievement.icon}
                    </div>
                    <div className="px-3 py-1 bg-purple-900/30 text-purple-400 rounded-full text-xs font-mono border border-purple-500/30">
                      {achievement.year}
                    </div>
                  </div>
                  
                  <h3 className="text-xl font-bold mb-3 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-400 font-rajdhani">
                    {achievement.title}
                  </h3>
                  
                  <p className="text-gray-400 mb-4 flex-grow">{achievement.description}</p>
                  
                  <div className="flex justify-between items-center">
                    <span className="text-xs font-mono text-purple-400 rounded-full px-2 py-1 bg-purple-900/20 border border-purple-500/20">
                      #{achievement.category}
                    </span>
                    <button className="text-cyan-400 text-sm hover:text-cyan-300 transition-colors font-mono group">
                      <span>Details</span>
                      <span className="inline-block ml-1 transition-transform group-hover:translate-x-1">→</span>
                    </button>
                  </div>
                </div>
                
                {/* Hover Effect */}
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-purple-500 via-cyan-400 to-purple-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 z-30"></div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

// Animated Counter Component
const StatNumber = ({ value }) => {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.5 });
  const duration = value > 100 ? Math.log(value) * 0.5 : Math.log(value) + 1;

  return (
    <div
      ref={ref}
      className="text-4xl md:text-5xl font-bold mb-2 text-center relative"
    >
      <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-400 font-rajdhani">
        {inView ? <CountUp start={0} end={value} duration={duration} /> : "0"}
      </span>
      <span className="absolute -top-1 -right-1 h-2 w-2 rounded-full bg-purple-500 animate-ping opacity-75"></span>
    </div>
  );
};

export default Achievements;
