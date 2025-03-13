import React, { useState, useEffect } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import Sidebar from './sidebar';

const AdminLayout = () => {
  const [isMobileView, setIsMobileView] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  // Get current page title
  const getPageTitle = () => {
    const path = location.pathname;
    if (path === '/admin') return 'Dashboard';
    if (path.includes('/admin/events')) return 'Events Management';
    if (path.includes('/admin/achievements')) return 'Achievements Management';
    if (path.includes('/admin/team')) return 'Team Management';
    if (path.includes('/admin/gallery')) return 'Gallery Management';
    if (path.includes('/admin/contact')) return 'Contact Messages';
    return 'Admin Portal';
  };

  useEffect(() => {
    const handleResize = () => {
      setIsMobileView(window.innerWidth < 1024);
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="flex h-screen bg-gray-100 dark:bg-gray-900 overflow-hidden">
      {/* Sidebar - Fixed on desktop, toggleable on mobile */}
      <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} isMobileView={isMobileView} />

      {/* Main content area */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="flex items-center justify-between p-4 bg-white dark:bg-gray-800 shadow-md">
          <button
            onClick={toggleSidebar}
            className="text-gray-500 focus:outline-none lg:hidden"
            aria-label="Toggle sidebar"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
            </svg>
          </button>
          <h1 className="text-xl font-bold text-gray-800 dark:text-white">{getPageTitle()}</h1>
        </header>

        {/* Content */}
        <main className="flex-1 overflow-y-auto p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
