import React, { useEffect } from 'react';

const ScrollObserver = () => {
  useEffect(() => {
    // Function to check if an element is in viewport
    const isInViewport = (element) => {
      const rect = element.getBoundingClientRect();
      return (
        rect.top <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.bottom >= 0
      );
    };

    // Function to handle scroll and intersection
    const handleScroll = () => {
      const skillItems = document.querySelectorAll('.skill-item');
      
      skillItems.forEach(item => {
        if (isInViewport(item)) {
          item.classList.add('is-visible');
        }
      });
    };

    // Initial check on load
    handleScroll();
    
    // Add scroll event listener
    window.addEventListener('scroll', handleScroll);
    
    // Clean up
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return null; // This is a non-visual component
};

export default ScrollObserver; 