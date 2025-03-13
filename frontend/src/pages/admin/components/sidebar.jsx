import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  FaChartLine, 
  FaTrophy, 
  FaCalendarAlt, 
  FaImages, 
  FaUsers, 
  FaEnvelope 
} from 'react-icons/fa';

const Sidebar = ({ isMobile, closeSidebar }) => {
  const location = useLocation();

  const links = [
   
    { 
      name: 'Achievements', 
      path: '/admin/achievements',
      icon: <FaTrophy className="w-5 h-5" />
    },
    { 
      name: 'Events', 
      path: '/admin/events',
      icon: <FaCalendarAlt className="w-5 h-5" />
    },
    { 
      name: 'Gallery', 
      path: '/admin/gallery',
      icon: <FaImages className="w-5 h-5" />
    },
    { 
      name: 'Team', 
      path: '/admin/team',
      icon: <FaUsers className="w-5 h-5" />
    },
    { 
      name: 'Contacts', 
      path: '/admin/contact',
      icon: <FaEnvelope className="w-5 h-5" />
    },
  ];

  return (
    <div className="w-64 h-full bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 text-white flex flex-col p-4 shadow-lg">
      <div className="mb-6 pb-4 border-b border-gray-700">
        <h2 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-purple-400">Admin Panel</h2>
      </div>
      
      <nav className="flex-1 space-y-2">
        {links.map((link) => (
          <Link
            key={link.path}
            to={link.path}
            onClick={isMobile ? closeSidebar : undefined}
            className={`flex items-center px-4 py-3 rounded-lg text-lg transition-all relative overflow-hidden ${
              location.pathname === link.path 
                ? 'bg-gradient-to-r from-cyan-900/70 to-purple-900/70 text-white shadow-md' 
                : 'hover:bg-gray-700/60 text-gray-300 hover:text-white'
            }`}
          >
            {/* Left accent on active */}
            {location.pathname === link.path && (
              <div className="absolute left-0 top-0 h-full w-1 bg-gradient-to-b from-cyan-400 to-purple-500"></div>
            )}
            
            {/* Icon with glow effect */}
            <div className={`mr-3 transition-all duration-200 ${
              location.pathname === link.path
                ? 'text-cyan-400 drop-shadow-[0_0_6px_rgba(34,211,238,0.5)]'
                : 'text-gray-400'
            }`}>
              {link.icon}
            </div>
            
            {link.name}
            
            {/* Indicator dot */}
            {location.pathname === link.path && (
              <div className="ml-auto h-2 w-2 rounded-full bg-cyan-400 animate-pulse"></div>
            )}
          </Link>
        ))}
      </nav>
      
      <div className="mt-auto pt-4 border-t border-gray-700">
        <p className="text-sm text-gray-400">Logged in as Admin</p>
      </div>
    </div>
  );
};

export default Sidebar;
