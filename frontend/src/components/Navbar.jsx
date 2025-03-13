import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Terminal, ChevronRight, Menu, X } from "lucide-react";
import ParticleBackground from "./ParticleBackground";

const NavItem = ({ label, onClick }) => {
  return (
    <Link
      to={`/${label.toLowerCase().replace(" ", "-")}`}
      className="relative group transition-all duration-300 px-6 py-2 inline-block text-lg font-mono tracking-wider"
      onClick={onClick}
      style={{ color: "#00ffff" }} // neon-blue
    >
      {/* Main Text */}
      <span className="relative z-10">{label}</span>
      
      {/* Only Cyberpunk Brackets on Hover - Same color as text */}
      <span className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
        <span style={{ color: "#00ffff" }} className="mr-1">&lt;</span>
        <span style={{ color: "#00ffff" }}>{label}</span>
        <span style={{ color: "#00ffff" }} className="ml-1">&gt;</span>
      </span>
    </Link>
  );
};

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  
  const navItems = ["About", "Events", "Archivements", "Team", "Gallery","Contact"];
  
  return (
    <div className="overflow-hidden relative" style={{ backgroundColor: "black", color: "#00ffff" }}>
      <ParticleBackground />
      
      {/* Navbar */}
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled ? "backdrop-blur-md py-2" : "py-4"
        }`}
        style={{ 
          backgroundColor: scrolled ? "rgba(0, 0, 0, 0.8)" : "transparent",
          borderBottom: scrolled ? "1px solid rgba(0, 255, 255, 0.3)" : "none"
        }}
      >
        <div className="container mx-auto px-6 flex justify-between items-center">
          <Link to="/" className="flex items-center gap-3">
            <Terminal className="h-6 w-6" style={{ 
              color: "#00ffff",
              filter: "drop-shadow(0px 0px 8px rgba(0, 255, 255, 0.8))"
            }} />
            <span className="text-xl font-mono font-bold relative overflow-hidden" style={{ color: "#00ffff" }}>
              TEKSTRA
              <span className="absolute -top-1 right-0 w-1 h-1 animate-pulse" style={{ backgroundColor: "#ff00ff" }}></span>
            </span>
          </Link>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-3">
            <NavItem key="Home" label="Home" />
            {navItems.map((item) => (
              <NavItem key={item} label={item} />
            ))}
           
          </nav>
          
          {/* Mobile Menu Toggle */}
          <button
            className="md:hidden transition-colors relative"
            onClick={toggleMenu}
            aria-label="Toggle menu"
            style={{ color: "#00ffff" }}
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            <span 
              className="absolute -bottom-1 left-0 w-full h-[1px] scale-x-0 group-hover:scale-x-100"
              style={{ 
                backgroundColor: "#00ffff",
                boxShadow: "0 0 5px #00ffff"
              }}
            ></span>
          </button>
        </div>
        
        {/* Mobile Navigation */}
        <div
          className={`md:hidden absolute top-full left-0 right-0 backdrop-blur-md transition-all duration-300 overflow-hidden ${
            isMenuOpen ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"
          }`}
          style={{ 
            backgroundColor: "rgba(0, 0, 0, 0.9)",
            borderTop: "1px solid rgba(0, 255, 255, 0.3)"
          }}
        >
          <div className="container mx-auto px-6 py-4 flex flex-col gap-4">
            <Link
              to="/"
              className="py-3 px-4 rounded flex items-center relative group overflow-hidden"
              onClick={() => setIsMenuOpen(false)}
              style={{ 
                color: "#00ffff",
                backgroundColor: "rgba(0, 0, 0, 0.6)",
                border: "1px solid rgba(0, 255, 255, 0.4)",
                animationDelay: "0ms",
                transition: "all 0.3s ease"
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.boxShadow = "0 0 10px rgba(0, 255, 255, 0.5)";
                e.currentTarget.style.borderColor = "rgba(0, 255, 255, 0.8)";
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.boxShadow = "none";
                e.currentTarget.style.borderColor = "rgba(0, 255, 255, 0.4)";
              }}
            >
              <span style={{ color: "#ff00ff" }} className="mr-2 opacity-70">&gt;</span> Home
              <span 
                className="absolute bottom-0 left-0 w-0 h-[2px] group-hover:w-full transition-all duration-500"
                style={{ 
                  backgroundColor: "#00ffff",
                  boxShadow: "0 0 10px #00ffff"
                }}
              ></span>
            </Link>
            {navItems.map((item, index) => (
              <Link
                key={item}
                to={`/${item.toLowerCase().replace(" ", "-")}`}
                className="py-3 px-4 rounded flex items-center relative group overflow-hidden"
                onClick={() => setIsMenuOpen(false)}
                style={{ 
                  color: "#00ffff",
                  backgroundColor: "rgba(0, 0, 0, 0.6)",
                  border: "1px solid rgba(0, 255, 255, 0.4)",
                  animationDelay: `${index * 100}ms`,
                  transition: "all 0.3s ease"
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.boxShadow = "0 0 10px rgba(0, 255, 255, 0.5)";
                  e.currentTarget.style.borderColor = "rgba(0, 255, 255, 0.8)";
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.boxShadow = "none";
                  e.currentTarget.style.borderColor = "rgba(0, 255, 255, 0.4)";
                }}
              >
                <span style={{ color: "#ff00ff" }} className="mr-2 opacity-70">&gt;</span> {item}
                <span 
                  className="absolute bottom-0 left-0 w-0 h-[2px] group-hover:w-full transition-all duration-500"
                  style={{ 
                    backgroundColor: "#00ffff",
                    boxShadow: "0 0 10px #00ffff"
                  }}
                ></span>
              </Link>
            ))}
           
          </div>
        </div>
      </header>
    </div>
  );
};

export default Navbar;