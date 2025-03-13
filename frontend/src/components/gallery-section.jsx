import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

// Gallery images data
const galleryImages = [
  { id: 1, src: "https://static.vecteezy.com/system/resources/previews/000/584/921/original/vector-coding-concept-with-laptop.jpg", alt: "Hackathon 2023" },
  { id: 2, src: "https://static.vecteezy.com/system/resources/previews/000/584/921/original/vector-coding-concept-with-laptop.jpg", alt: "Workshop Session" },
  { id: 3, src: "https://static.vecteezy.com/system/resources/previews/000/584/921/original/vector-coding-concept-with-laptop.jpg", alt: "Team Building" },
  { id: 4, src: "https://static.vecteezy.com/system/resources/previews/000/584/921/original/vector-coding-concept-with-laptop.jpg", alt: "Networking Event" },
  { id: 5, src: "https://static.vecteezy.com/system/resources/previews/000/584/921/original/vector-coding-concept-with-laptop.jpg", alt: "Panel Discussion" },
  { id: 6, src: "https://static.vecteezy.com/system/resources/previews/000/584/921/original/vector-coding-concept-with-laptop.jpg", alt: "Tech Talk" },
  { id: 7, src: "https://static.vecteezy.com/system/resources/previews/000/584/921/original/vector-coding-concept-with-laptop.jpg", alt: "Innovation Conference" },
  { id: 8, src: "https://static.vecteezy.com/system/resources/previews/000/584/921/original/vector-coding-concept-with-laptop.jpg", alt: "Startup Pitch" },
  { id: 9, src: "https://static.vecteezy.com/system/resources/previews/000/584/921/original/vector-coding-concept-with-laptop.jpg", alt: "Programming Contest" },
  { id: 10, src: "https://static.vecteezy.com/system/resources/previews/000/584/921/original/vector-coding-concept-with-laptop.jpg", alt: "AI & ML Workshop" },
];

const InfiniteGallery = () => {
  const navigate = useNavigate();

  return (
    <div className="container mx-auto px-6 py-16 font-orbitron bg-black min-h-screen">
      {/* Title */}
      <h2 className="text-6xl font-bold text-center font-Rajdhani text-white uppercase tracking-wide relative">
        <span className="bg-gradient-to-r from-purple-400 via-cyan-400 to-blue-500 bg-clip-text text-transparent">
          Stunning Moments
        </span>
        <span className="block mt-2 text-lg text-gray-400 font-light">Captured in Our Gallery</span>
      </h2>

      {/* Marquee Row 1 (Left to Right) */}
      <div className="relative flex overflow-hidden mt-12">
        <motion.div
          className="flex min-w-full"
          animate={{ x: ["0%", "-100%"] }}
          transition={{ ease: "linear", duration: 10, repeat: Infinity }}
        >
          {[...galleryImages, ...galleryImages].map((image, index) => (
            <img
              key={index}
              src={image.src}
              alt={image.alt}
              className="h-48 w-72 object-cover rounded-lg shadow-lg shadow-cyan-500/20 mx-2"
            />
          ))}
        </motion.div>
      </div>

      {/* Marquee Row 2 (Right to Left) */}
      <div className="relative flex overflow-hidden mt-8">
        <motion.div
          className="flex min-w-full"
          animate={{ x: ["-100%", "0%"] }}
          transition={{ ease: "linear", duration: 10, repeat: Infinity }}
        >
          {[...galleryImages, ...galleryImages].map((image, index) => (
            <img
              key={index}
              src={image.src}
              alt={image.alt}
              className="h-48 w-72 object-cover rounded-lg shadow-lg shadow-purple-500/20 mx-2"
            />
          ))}
        </motion.div>
      </div>

      {/* Button */}
      <div className="flex justify-center mt-12">
        <motion.button
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => navigate("/gallery")}
          className="px-10 py-4 rounded-lg bg-gradient-to-r from-purple-500 to-cyan-500 text-white font-bold text-lg shadow-lg shadow-cyan-500/30 transition-all duration-300 hover:shadow-cyan-400/50"
        >
          Explore Full Gallery
        </motion.button>
      </div>
    </div>
  );
};

export default InfiniteGallery;