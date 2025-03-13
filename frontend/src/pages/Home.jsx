import { useEffect, useState, useRef } from "react";
import HeroSection from "../components/hero-section";
import EventsSection from "../components/events-section";
import AchievementsSection from "../components/achievements-section";
import TeamSection from "../components/team-section";
import GallerySection from "../components/gallery-section";
import PastEvents from "../components/PastEvents";
import { motion } from "framer-motion";
import useScrollTop from "../hooks/useScrollTop";
import WebTeam from "./WebTeam";

export default function Home() {
  const [mounted, setMounted] = useState(false);
  const heroRef = useRef(null);
  
  // Use scroll hook to ensure page scrolls to top
  useScrollTop();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="relative text-gray-900">
      {/* Main Content with fade-in effect */}
      <motion.main 
        className="relative"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <section id="home" className="py-10">
          <HeroSection />
        </section>

        <section id="events" className="py-10">
          <EventsSection />
        </section>

        <section id="achievements" className="py-10">
          <AchievementsSection />
        </section>

        <section id="team" className="py-10">
          <TeamSection />
        </section>

        <section id="gallery" className="py-10">
          <GallerySection />
        </section>
        
        <section id="webteam" className="py-10">
          <WebTeam />
        </section>
      </motion.main>
    </div>
  );
}
