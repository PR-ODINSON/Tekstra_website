import { Terminal, Instagram, Twitter, Github, Linkedin } from "lucide-react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="py-12 border-t border-cyan-500/40 bg-black relative font-['Rajdhani'] text-cyan-300">
      <div className="container mx-auto px-6">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Logo and Description */}
          <div>
            <Link to="/" className="flex items-center gap-3 mb-5 group">
              <Terminal className="h-8 w-8 text-cyan-400 transition-transform group-hover:scale-110" />
              <span className="text-3xl font-['Orbitron'] font-bold text-cyan-400 neon-glow">
                TEKSTRA
              </span>
            </Link>
            <p className="text-cyan-300/80 text-base font-['Rajdhani'] leading-relaxed">
              Welcome to IITRAM's elite coding club, pushing the limits of
              innovation, AI, and cybernetics.
            </p>
          </div>

          {/* Quick Links */}
          <div className="text-center">
  <h3 className="text-magenta-300 font-bold text-xl mb-5 neon-glow uppercase tracking-widest">
    Quick Links
  </h3>
  <ul className="space-y-3">
    {[
      {name: "Home", link: "/home"},
      { name: "About", link: "/about" },
      { name: "Events", link: "/events" },
      
      { name: "Team", link: "/team" },
      { name: "Archievements", link: "/archievements" },
      {name: "Contact", link: "/contact"},
      
      
    ].map(({ name, link }) => (
      <li key={name} className="group text-lg font-['JetBrains_Mono'] tracking-wide uppercase">
        <Link
          to={link}
          className="text-cyan-300/80 hover:text-cyan-300 transition-all relative flex items-center justify-center"
        >
          <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-magenta-500">&lt;</span>
          <span className="mx-2">{name}</span>
          <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-magenta-500">&gt;</span>
        </Link>
      </li>
    ))}
  </ul>
</div>


          {/* Contact Info */}
          <div>
            <h3 className="text-magenta-300 font-bold text-lg mb-5 neon-glow uppercase tracking-wider">
              Connect With Us
            </h3>
            <p className="text-cyan-300/80 mb-3 text-sm">
              IITRAM Campus, Maninagar East, Ahmedabad, Gujarat 380026
            </p>
            <p className="text-cyan-300/80 mb-6 text-sm">
              tekstra@iitram.ac.in
            </p>

            {/* Social Media Icons */}
            <div className="flex space-x-5">
              {[
                { icon: <Instagram />, link: "https://instagram.com" },
                
                { icon: <Linkedin />, link: "https://linkedin.com" },
              ].map(({ icon, link }, index) => (
                <a
                  key={index}
                  href={link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 rounded-lg bg-cyan-500/20 flex items-center justify-center hover:bg-cyan-500/50 transition-all neon-button shadow-lg"
                >
                  <span className="w-6 h-6 text-cyan-400">{icon}</span>
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-cyan-500/20 mt-12 pt-6 text-center">
          <p className="text-cyan-300/60 text-sm font-['Rajdhani'] tracking-wide">
            &copy; {new Date().getFullYear()} Tekstra - IITRAM Coding Club. All
            rights reserved.
          </p>
        </div>
      </div>

      {/* Background Effects */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 via-transparent to-magenta-500/10 opacity-30"></div>
      </div>
    </footer>
  );
};

export default Footer;
