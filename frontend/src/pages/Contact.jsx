import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaEnvelope, FaUser, FaComment, FaPaperPlane, FaDiscord, FaTwitter, FaInstagram, FaLinkedin, FaGithub, FaBuilding } from "react-icons/fa";
import TerminalEffect from "../components/terminal-effect";
import useScrollTop from "../hooks/useScrollTop";
import PageLoader from "../components/PageLoader";

// Circuit line animation component
const CircuitLines = () => {
  return (
    <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
      {/* Horizontal circuit lines */}
      {Array.from({ length: 8 }).map((_, i) => (
        <motion.div
          key={`h-${i}`}
          className="absolute h-px left-0 right-0 bg-gradient-to-r from-cyan-500/0 via-cyan-500/70 to-cyan-500/0"
          style={{ top: `${i * 12.5}%` }}
          initial={{ scaleX: 0, opacity: 0 }}
          animate={{ 
            scaleX: [0, 1, 1, 0],
            opacity: [0, 0.7, 0.7, 0],
            left: ["0%", "0%", "0%", "100%"]
          }}
          transition={{
            duration: 8 + Math.random() * 4,
            repeat: Infinity,
            repeatType: "loop",
            ease: "easeInOut",
            delay: i * 0.5,
            times: [0, 0.2, 0.8, 1]
          }}
        />
      ))}

      {/* Vertical circuit lines */}
      {Array.from({ length: 8 }).map((_, i) => (
        <motion.div
          key={`v-${i}`}
          className="absolute w-px top-0 bottom-0 bg-gradient-to-b from-purple-500/0 via-purple-500/70 to-purple-500/0"
          style={{ left: `${i * 12.5}%` }}
          initial={{ scaleY: 0, opacity: 0 }}
          animate={{ 
            scaleY: [0, 1, 1, 0],
            opacity: [0, 0.7, 0.7, 0],
            top: ["0%", "0%", "0%", "100%"]
          }}
          transition={{
            duration: 8 + Math.random() * 4,
            repeat: Infinity,
            repeatType: "loop",
            ease: "easeInOut",
            delay: i * 0.5,
            times: [0, 0.2, 0.8, 1]
          }}
        />
      ))}

      {/* Data nodes at intersections */}
      {Array.from({ length: 5 }).map((_, i) => (
        <motion.div
          key={`node-${i}`}
          className="absolute w-2 h-2 rounded-full bg-cyan-400 shadow-glow"
          style={{ 
            left: `${20 + Math.random() * 60}%`, 
            top: `${20 + Math.random() * 60}%` 
          }}
          initial={{ opacity: 0, scale: 0 }}
          animate={{ 
            opacity: [0, 1, 1, 0],
            scale: [0, 1, 1, 0]
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            repeatType: "loop",
            ease: "easeInOut",
            delay: Math.random() * 5
          }}
        />
      ))}
    </div>
  );
};

// Form feedback component for success/error states
const FormFeedback = ({ status, message, onClose }) => {
  return (
    <AnimatePresence>
      {status && (
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.8 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -20, scale: 0.8 }}
          transition={{ duration: 0.3 }}
          className={`absolute top-0 left-0 right-0 p-4 m-4 rounded-lg backdrop-blur-md border ${
            status === "success" 
              ? "bg-green-900/50 border-green-500/50 text-green-300" 
              : "bg-red-900/50 border-red-500/50 text-red-300"
          }`}
        >
          <div className="flex items-center justify-between">
            <p className="font-mono text-sm">{message}</p>
            <button 
              onClick={onClose}
              className="text-white/70 hover:text-white"
            >
              ✕
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

const Contact = () => { 
  useScrollTop(); // Scroll to top on component mount

  const [formData, setFormData] = useState({ 
    name: "", 
    email: "", 
    subject: "",
    organization: "",
    message: "", 
  });
  
  const [formStatus, setFormStatus] = useState(null);
  const [statusMessage, setStatusMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  
  const formRef = useRef(null);
  
  // Track mouse position for spotlight effect
  const handleMouseMove = (e) => {
    setMousePosition({ x: e.clientX, y: e.clientY });
  };
  
  useEffect(() => {
    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => { 
    e.preventDefault(); 
    setIsSubmitting(true);
    
    // Simulate form submission with timeout
    setTimeout(() => {
      setIsSubmitting(false);
      setFormStatus("success");
      setStatusMessage("Your message has been sent successfully! We'll get back to you soon.");
      
      // Reset form after successful submission
      setFormData({
        name: "",
        email: "",
        subject: "",
        organization: "",
        message: ""
      });
    }, 1500);
  };
  
  const resetStatus = () => {
    setFormStatus(null);
    setStatusMessage("");
  };

  // Input style classes for reusability
  const inputClass = "w-full px-4 py-3 bg-black/50 text-white border border-cyan-500/30 rounded-md focus:ring-2 focus:ring-cyan-400/50 focus:border-cyan-400 transition duration-300 hover:border-cyan-400/70 placeholder-gray-500 backdrop-blur-sm font-mono text-sm";

  return ( 
 
      <div 
        className="relative min-h-screen bg-black text-white py-20 px-4 overflow-hidden flex items-center justify-center"
        onMouseMove={handleMouseMove}
      >
        {/* Cyberpunk background elements */}
      <div className="absolute inset-0 z-0"> 
          {/* Gradient background */}
          <div className="absolute w-full h-full bg-gradient-to-b from-black via-blue-950/20 to-black"></div>
          
          {/* Grid pattern */}
          <div
            className="absolute w-full h-full opacity-10"
          style={{ 
            backgroundImage: ` 
                linear-gradient(to right, rgba(6, 182, 212, 0.1) 1px, transparent 1px),
                linear-gradient(to bottom, rgba(6, 182, 212, 0.1) 1px, transparent 1px)
              `,
              backgroundSize: "40px 40px",
            }}
        ></div> 

          {/* Circuit lines animation */}
          <CircuitLines />
          
          {/* Mouse spotlight effect */}
          <div 
            className="pointer-events-none absolute w-[500px] h-[500px] rounded-full blur-[100px] opacity-20 bg-cyan-500"
            style={{ 
              left: mousePosition.x - 250, 
              top: mousePosition.y - 250,
              transition: "left 1s ease-out, top 1s ease-out"
            }}
          />
        </div>

        {/* Content container - Centered Form */}
        <div className="container mx-auto relative z-10 max-w-2xl">
          {/* Page header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-10"
          >
            <div className="inline-block px-3 py-1 mb-4 border border-cyan-500/30 bg-cyan-500/10 text-cyan-400 text-xs font-mono rounded-full">
              05_CONNECT
      </div> 

            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              <span className="text-transparent bg-clip-text font-audiowide bg-gradient-to-r from-cyan-400 to-purple-400 animate-gradient">
                Contact
              </span>
            </h1>
 
            <div className="h-1 w-32 bg-gradient-to-r from-transparent via-cyan-500 to-transparent mx-auto mb-4"></div>

            <p className="text-gray-300 text-base md:text-lg max-w-xl mx-auto font-mono leading-relaxed">
              <TerminalEffect text="Let's connect the circuits. Reach out to us with your questions or proposals." />
            </p>
          </motion.div>

          {/* Contact form - Centered */}
      <motion.div 
            initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }} 
            transition={{ duration: 0.8, delay: 0.3 }}
            className="relative mb-16 w-full mx-auto"
          >
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-cyan-500/10 to-purple-500/10 border border-cyan-500/20 backdrop-blur-md shadow-lg overflow-hidden">
              {/* Animated border */}
              <div className="absolute inset-0 overflow-hidden">
                <motion.div
                  className="absolute inset-0 opacity-30"
                  animate={{
                    background: [
                      'linear-gradient(0deg, rgba(6, 182, 212, 0.3) 0%, rgba(139, 92, 246, 0) 100%)',
                      'linear-gradient(90deg, rgba(6, 182, 212, 0) 0%, rgba(139, 92, 246, 0.3) 100%)',
                      'linear-gradient(180deg, rgba(6, 182, 212, 0) 0%, rgba(139, 92, 246, 0.3) 100%)',
                      'linear-gradient(270deg, rgba(6, 182, 212, 0.3) 0%, rgba(139, 92, 246, 0) 100%)',
                    ]
                  }}
                  transition={{
                    duration: 10,
                    repeat: Infinity,
                    repeatType: "loop"
                  }}
                />
              </div>
            </div>

            <div className="relative z-10 p-6 md:p-8">
              <h2 className="text-2xl font-bold mb-6 font-rajdhani text-center">Send Us a Message</h2>
              
              <form ref={formRef} onSubmit={handleSubmit} className="space-y-4">
                <FormFeedback status={formStatus} message={statusMessage} onClose={resetStatus} />
                
                <div className="flex flex-col md:flex-row gap-4">
                  <div className="flex-1">
                    <label className="block text-cyan-400 text-sm font-mono mb-2">Name</label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-cyan-500">
                        <FaUser />
                      </div>
          <input 
            type="text" 
            name="name" 
                        placeholder="Your full name"
            value={formData.name} 
            onChange={handleChange} 
                        className={`${inputClass} pl-10`}
            required 
                      />
                    </div>
                  </div>
                  
                  <div className="flex-1">
                    <label className="block text-cyan-400 text-sm font-mono mb-2">Email</label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-cyan-500">
                        <FaEnvelope />
                      </div>
          <input 
            type="email" 
            name="email" 
                        placeholder="your.email@example.com"
            value={formData.email} 
                        onChange={handleChange}
                        className={`${inputClass} pl-10`}
                        required
                      />
                    </div>
                  </div>
                </div>
                
                <div className="flex flex-col md:flex-row gap-4">
                  <div className="flex-1">
                    <label className="block text-cyan-400 text-sm font-mono mb-2">Subject</label>
                    <input
                      type="text"
                      name="subject"
                      placeholder="What's this about?"
                      value={formData.subject}
            onChange={handleChange} 
                      className={inputClass}
            required 
                    />
                  </div>
                  
                  <div className="flex-1">
                    <label className="block text-cyan-400 text-sm font-mono mb-2">Organization <span className="text-gray-500">(Optional)</span></label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-cyan-500">
                        <FaBuilding />
                      </div>
                      <input
                        type="text"
                        name="organization"
                        placeholder="Your company or school"
                        value={formData.organization}
                        onChange={handleChange}
                        className={`${inputClass} pl-10`}
                      />
                    </div>
                  </div>
                </div>
                
                <div>
                  <label className="block text-cyan-400 text-sm font-mono mb-2">Message</label>
                  <div className="relative">
                    <div className="absolute top-3 left-3 text-cyan-500">
                      <FaComment />
                    </div>
          <textarea 
            name="message" 
                      rows="5"
                      placeholder="Tell us about your project, question, or just say hi..."
            value={formData.message} 
            onChange={handleChange} 
                      className={`${inputClass} pl-10`}
            required 
          ></textarea> 
                  </div>
                </div>

          <motion.button 
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-4 mt-6 bg-black text-white font-bold relative overflow-hidden shadow-lg font-rajdhani disabled:opacity-70 disabled:cursor-not-allowed group"
                >
                  {/* Clean geometric frame */}
                  <div className="absolute inset-0 bg-gradient-to-r from-cyan-900/20 to-purple-900/20"></div>
                  
                  {/* Outer border with gradient */}
                  <div className="absolute inset-0 border-2 border-transparent bg-clip-padding">
                    <div className="absolute -inset-[2px] bg-gradient-to-r from-cyan-500 to-purple-500 z-[-1]"></div>
                  </div>
                  
                  {/* Clean inner border - visible on hover */}
                  <div className="absolute inset-[3px] border border-cyan-500/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  
                  {/* Shine effect */}
                  <motion.div 
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-cyan-500/10 to-transparent"
                    animate={{ 
                      x: ['-100%', '100%']
                    }}
                    transition={{ 
                      repeat: Infinity, 
                      duration: 1.5, 
                      ease: "linear" 
                    }}
                  />
                  
                  {/* Button content */}
                  <div className="relative z-10 flex items-center justify-center">
                    {isSubmitting ? (
                      <div className="flex items-center space-x-2">
                        <motion.div 
                          animate={{ rotate: 360 }}
                          transition={{ 
                            duration: 1, 
                            repeat: Infinity, 
                            ease: "linear" 
                          }}
                          className="w-5 h-5"
                        >
                          <svg className="w-full h-full text-cyan-400" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M12 3C16.9706 3 21 7.02944 21 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                          </svg>
                        </motion.div>
                        <span className="text-cyan-100 tracking-widest text-lg font-light">SENDING</span>
                      </div>
                    ) : (
                      <div className="flex items-center space-x-3">
                        <FaPaperPlane className="text-cyan-400" />
                        <span className="text-cyan-100 tracking-widest text-lg font-light">SEND MESSAGE</span>
                      </div>
                    )}
                  </div>
                  
                  {/* Bottom highlight */}
                  <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-cyan-500 to-purple-500"></div>
          </motion.button> 
        </form> 
            </div>
          </motion.div>
          
          {/* Footer decorative element */}
          <motion.div 
            className="relative h-px w-full" 
            initial={{ opacity: 0, width: "0%" }}
            whileInView={{ opacity: 1, width: "100%" }}
            transition={{ duration: 2 }}
            viewport={{ once: true }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-cyan-500/70 to-transparent"></div>
      </motion.div> 

          <div className="text-center mt-8 font-mono text-cyan-500/80 text-sm">
            // END OF TRANSMISSION
          </div>
        </div>
    </div> 
   
  ); 
}; 

export default Contact; 

 