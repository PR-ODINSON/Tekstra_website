import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

// This component automatically scrolls the window to the top whenever
// the pathname changes (i.e., route navigation happens)
export default function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    // Smooth scroll to the top of the page
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth'
    });
    
    // Alternatively, for instant scrolling without animation:
    // window.scrollTo(0, 0);
  }, [pathname]);

  // This component doesn't render anything, it just performs the scrolling side effect
  return null;
} 