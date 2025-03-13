import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useLocation,
} from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";

import Home from "./pages/Home";
import Events from "./pages/Events";
import Achievements from "./pages/Archievements";
import TeamSection from "./pages/Team";
import Gallery from "./pages/Gallery";
import About from "./pages/About";
import Contact from "./pages/Contact";

import AdminLayout from "./pages/admin/components/AdminLayout";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ScrollToTop from "./components/ScrollToTop";
import ScrollButton from "./components/ScrollButton";
import AdminEventsPage from "./pages/admin/pages/EventsPage";
import AchievementsPage from "./pages/admin/pages/AchievementsPage";
import TeamPage from "./pages/admin/pages/TeamPage";
import GalleryPage from "./pages/admin/pages/GalleryPage";
import ContactPage from "./pages/admin/pages/ContactPage";

// This component handles the page transition animations
const AnimatedRoutes = () => {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith("/admin");

  return (
    <>
      {!isAdminRoute && <Navbar />} {/* Hide Navbar for admin routes */}
      <AnimatePresence mode="wait">
        <motion.div
          key={location.pathname}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          <Routes location={location}>
            {/* Main Routes */}
            <Route path="/" element={<Navigate to="/home" />} />
            <Route path="/home" element={<Home />} />
            <Route path="/events" element={<Events />} />
            <Route path="/achievements" element={<Achievements />} />
            <Route path="/team" element={<TeamSection />} />
            <Route path="/gallery" element={<Gallery />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />

            {/* Admin Routes */}
            <Route path="/admin" element={<AdminLayout />}>
    
    <Route path="events" element={<AdminEventsPage />} />
    <Route path="achievements" element={<AchievementsPage />} />
    <Route path="team" element={<TeamPage />} />
    <Route path="gallery" element={<GalleryPage />} />
    <Route path="contact" element={<ContactPage />} />
  </Route>
          </Routes>
        </motion.div>
      </AnimatePresence>
      {!isAdminRoute && <Footer />} {/* Hide Footer for admin routes */}
    </>
  );
};

function App() {
  return (
    <Router>
      <ScrollToTop />
      <AnimatedRoutes />
      <ScrollButton />
    </Router>
  );
}

export default App;
