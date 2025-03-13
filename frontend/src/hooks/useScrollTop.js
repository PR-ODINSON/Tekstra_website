import { useEffect, useRef } from 'react';

/**
 * Hook to automatically scroll to the top of the page or a specific element.
 * 
 * @param {Object} options - Configuration options
 * @param {boolean} options.enabled - Whether scrolling is enabled (default: true)
 * @param {string} options.behavior - Scroll behavior: 'auto', 'smooth' (default: 'smooth')
 * @param {number} options.delay - Delay before scrolling in ms (default: 0)
 * @param {Array} options.dependencies - Dependencies array to trigger scroll (default: [])
 * @param {HTMLElement} options.targetElement - Element to scroll to (default: null - scrolls to top)
 * @param {string} options.block - Scroll alignment: 'start', 'center', 'end', 'nearest' (default: 'start')
 * @returns {Object} - Object containing the elementRef and scrollToTop function
 */
const useScrollTop = ({
  enabled = true,
  behavior = 'smooth',
  delay = 0,
  dependencies = [],
  targetElement = null,
  block = 'start'
} = {}) => {
  const elementRef = useRef(null);

  // Function to scroll to top
  const scrollToTop = () => {
    if (!enabled) return;

    setTimeout(() => {
      if (targetElement) {
        // If target element is provided, scroll to it
        targetElement.scrollIntoView({ behavior, block });
      } else if (elementRef.current) {
        // If ref is attached, scroll to the element
        elementRef.current.scrollIntoView({ behavior, block });
      } else {
        // Default: scroll to the top of the page
        window.scrollTo({
          top: 0,
          left: 0,
          behavior
        });
      }
    }, delay);
  };

  // Effect to scroll on mount or when dependencies change
  useEffect(() => {
    scrollToTop();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, dependencies);

  return { elementRef, scrollToTop };
};

export default useScrollTop; 