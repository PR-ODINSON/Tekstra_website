import React from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { FaCalendarAlt, FaClock, FaMapMarkerAlt, FaLightbulb } from "react-icons/fa";
import TerminalEffect from "./terminal-effect";

const events = [
  {
    id: 1,
    title: "Hackathon 2023",
    date: "Dec 15-17, 2023",
    time: "48 Hours",
    location: "Main Campus",
    description:
      "Join us for a 48-hour coding marathon. Build innovative solutions and compete for amazing prizes.",
    image: "/placeholder.svg?height=400&width=600",
    tags: ["Hackathon", "Competition"],
  },
  {
    id: 2,
    title: "Web3 Workshop",
    date: "Nov 25, 2023",
    time: "2:00 PM - 5:00 PM",
    location: "Tech Lab",
    description:
      "Learn the fundamentals of blockchain technology and build your first decentralized application.",
    image: "/placeholder.svg?height=400&width=600",
    tags: ["Workshop", "Web3"],
  },
  {
    id: 3,
    title: "AI Conference",
    date: "Jan 10, 2024",
    time: "10:00 AM - 4:00 PM",
    location: "Virtual",
    description:
      "Explore the latest advancements in artificial intelligence and machine learning.",
    image: "/placeholder.svg?height=400&width=600",
    tags: ["Conference", "AI"],
  },
];

const EventsSection = () => {
  const navigate = useNavigate();
  return (
    <div className="relative">
      {/* Background enhancement */}
      <div className="absolute inset-0 bg-gradient-to-b from-cyan-900/10 to-purple-900/10 pointer-events-none"></div>
      
      <div className="container mx-auto px-4 py-16 relative z-10">
        {/* Section Title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="inline-block mb-4 px-6 py-2 bg-gradient-to-r from-cyan-500/20 to-purple-500/20 rounded-full border border-cyan-500/30">
            <span className="text-cyan-300 font-mono text-sm">02_EVENTS</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-6 relative">
            <span className="absolute -inset-4 bg-cyan-500/10 rounded-2xl blur-2xl opacity-70"></span>
            <span className="text-transparent bg-clip-text font-orbitron bg-gradient-to-r from-cyan-300 to-purple-400 relative">
              Upcoming Events
            </span>
          </h2>
          <div className="h-1 w-32 bg-gradient-to-r from-cyan-500 to-purple-500 mx-auto mb-6 rounded-full"></div>
          <p className="text-gray-200 max-w-2xl mx-auto text-lg font-jetbrains-mono bg-black/30 p-4 rounded-lg  shadow-lg shadow-cyan-500/5">
            <TerminalEffect text="Join us for exciting workshops, hackathons, and tech talks. Stay at the cutting edge of technology." />
          </p>
        </motion.div>

        {/* Event Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {events.map((event, index) => (
            <motion.div
              key={event.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-gradient-to-b from-gray-800/90 to-gray-900/90 backdrop-blur-sm border-2 border-cyan-500/40 rounded-xl overflow-hidden hover:shadow-xl hover:shadow-cyan-500/30 transition-all group relative"
            >
              {/* Highlights instead of dark overlays */}
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 to-purple-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              
              {/* Corner accent */}
              <div className="absolute top-0 right-0 w-16 h-16 overflow-hidden">
                <div className="absolute top-0 right-0 w-16 h-1 bg-cyan-400 transform rotate-45 translate-y-[22px] translate-x-[-18px]"></div>
              </div>

              {/* Event Image with lighter overlay */}
              <div className="relative h-56 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 via-gray-900/40 to-cyan-900/20 z-10"></div>
                <img
                  src={event.image || "/placeholder.svg"}
                  alt={event.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute top-4 right-4 z-20">
                  <span className="inline-block px-3 py-1 bg-cyan-400 text-black text-xs font-bold rounded-full font-jetbrains-mono shadow-lg shadow-cyan-500/30">
                    {event.tags[0]}
                  </span>
                </div>
              </div>

              {/* Event Details with improved visibility */}
              <div className="p-6 bg-gradient-to-b from-gray-800/50 to-gray-900/50 backdrop-blur-sm">
                <h3 className="text-2xl font-bold mb-4 text-white group-hover:text-cyan-300 transition-colors font-fira-code">
                  {event.title}
                </h3>

                <div className="flex flex-col gap-3 mb-6 text-sm text-gray-200 font-jetbrains-mono">
                  <div className="flex items-center bg-black/20 p-2 rounded-lg">
                    <FaCalendarAlt className="mr-3 text-cyan-400" />
                    {event.date}
                  </div>
                  <div className="flex items-center bg-black/20 p-2 rounded-lg">
                    <FaClock className="mr-3 text-cyan-400" />
                    {event.time}
                  </div>
                  <div className="flex items-center bg-black/20 p-2 rounded-lg">
                    <FaMapMarkerAlt className="mr-3 text-cyan-400" />
                    {event.location}
                  </div>
                </div>

                <p className="text-gray-200 mb-6 text-sm leading-relaxed font-jetbrains-mono bg-black/20 p-3 rounded-lg border border-cyan-500/10">
                  {event.description}
                </p>

                <div className="flex justify-between items-center">
                  <div className="flex gap-2 flex-wrap">
                    {event.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2 py-1 bg-cyan-500/20 text-cyan-300 text-xs rounded-full font-jetbrains-mono border border-cyan-500/30"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                  <button className="px-4 py-2 bg-cyan-500/30 text-cyan-100 rounded-lg text-sm hover:bg-cyan-500/50 transition-colors font-jetbrains-mono relative overflow-hidden shadow-lg shadow-cyan-500/10">
                    <span className="relative z-10 flex items-center">
                      Register
                      <FaLightbulb className="ml-2 text-cyan-300" />
                    </span>
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* View All Events Button - Improved visibility */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <button
            onClick={() => navigate("/events")}
            className="px-8 py-3 bg-gradient-to-r from-cyan-500/30 to-purple-500/30 border-2 border-cyan-400 text-cyan-100 rounded-lg hover:bg-cyan-500/40 transition-all text-lg font-jetbrains-mono relative overflow-hidden shadow-lg shadow-cyan-500/20"
          >
            <span className="relative z-10">View All Events</span>
            <div className="absolute inset-0 opacity-0 hover:opacity-100 transition-opacity duration-300">
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-400/20 to-purple-400/20"></div>
              <div className="h-full w-20 bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-30 animate-shimmer"></div>
            </div>
          </button>
        </motion.div>
      </div>
    </div>
  );
};

export default EventsSection;