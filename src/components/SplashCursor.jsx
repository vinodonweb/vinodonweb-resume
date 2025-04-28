import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useMotionValue } from 'framer-motion';

const SplashCursor = ({ color = '#3b82f6' }) => {
  const cursorRef = useRef(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [cursorVariant, setCursorVariant] = useState('default');
  const [splashes, setSplashes] = useState([]);
  const [trailDots, setTrailDots] = useState([]);
  const [isClicking, setIsClicking] = useState(false);
  const [isHoveringLink, setIsHoveringLink] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  
  const lastTrailTimestamp = useRef(0);
  const mouseXMotion = useMotionValue(0);
  const mouseYMotion = useMotionValue(0);

  // Check if mobile device
  useEffect(() => {
    const checkMobile = () => {
      const isMobileDevice = window.matchMedia("(max-width: 768px)").matches;
      setIsMobile(isMobileDevice);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => {
      window.removeEventListener('resize', checkMobile);
    };
  }, []);

  // Don't render on mobile
  if (isMobile) return null;

  // Handle mouse movement with improved accuracy
  useEffect(() => {
    const handleMouseMove = (e) => {
      const { clientX, clientY } = e;
      
      // Update motion values for smoother animation
      mouseXMotion.set(clientX);
      mouseYMotion.set(clientY);
      
      // Update state
      setMousePosition({ x: clientX, y: clientY });
      
      // Add trail effect with speed-based intensity
      const now = Date.now();
      if (now - lastTrailTimestamp.current > 40) { // Limit trail generation rate
        lastTrailTimestamp.current = now;
        
        // Calculate mouse speed for dynamic trail effect
        const prevTrail = trailDots[0];
        const speed = prevTrail 
          ? Math.sqrt(Math.pow(clientX - prevTrail.x, 2) + Math.pow(clientY - prevTrail.y, 2)) 
          : 0;
        
        // Adjust trail dot size based on speed
        const dotSize = Math.min(5 + speed * 0.2, 12);
        
        const newDot = {
          id: now,
          x: clientX,
          y: clientY,
          size: dotSize,
          opacity: 0.5
        };
        
        setTrailDots(prev => [newDot, ...prev.slice(0, 10)]); // Keep last 10 dots
      }
    };

    // Accurately capture mouse coords
    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [trailDots, mouseXMotion, mouseYMotion]);

  // Handle mouse click events
  useEffect(() => {
    const handleMouseDown = () => {
      setIsClicking(true);
      setCursorVariant('clicking');
      
      // Create multiple splashes with improved dynamics
      const splashCount = Math.floor(Math.random() * 3) + 5; // 5-7 splashes
      
      const baseHue = Math.random() * 360; // Base hue for color variation
      
      const newSplashes = Array.from({ length: splashCount }, (_, i) => {
        // Add more natural randomness to position
        const angle = Math.random() * Math.PI * 2;
        const distance = Math.random() * 30;
        const offsetX = Math.cos(angle) * distance;
        const offsetY = Math.sin(angle) * distance;
        
        // Vary hue slightly for each splash
        const hueVariation = (Math.random() * 40) - 20;
        const splashHue = (baseHue + hueVariation) % 360;
        
        return {
          id: Date.now() + i,
          x: mousePosition.x + offsetX,
          y: mousePosition.y + offsetY,
          scale: Math.random() * 2 + 2, // Random scale between 2-4
          duration: Math.random() * 0.8 + 0.7, // Random duration between 0.7-1.5s
          color: `hsl(${splashHue}, 70%, 60%)`
        };
      });
      
      setSplashes((prevSplashes) => [...prevSplashes, ...newSplashes]);
      
      // Remove splashes after animation completes
      setTimeout(() => {
        const ids = newSplashes.map(splash => splash.id);
        setSplashes((prevSplashes) => 
          prevSplashes.filter(splash => !ids.includes(splash.id))
        );
      }, 1500); // Slightly longer than the longest possible animation
    };

    const handleMouseUp = () => {
      setIsClicking(false);
      setCursorVariant(isHoveringLink ? 'hover' : 'default');
    };

    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);

    return () => {
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [mousePosition, isHoveringLink]);

  // Clear trail dots after they fade
  useEffect(() => {
    const trailCleanup = setInterval(() => {
      setTrailDots(prev => prev.filter(dot => Date.now() - dot.id < 500)); // Remove dots older than 500ms
    }, 100);
    
    return () => clearInterval(trailCleanup);
  }, []);

  // Handle hovering over clickable elements
  useEffect(() => {
    const handleMouseOver = (e) => {
      const targetElement = e.target;
      const isClickable = 
        targetElement.tagName === 'A' || 
        targetElement.tagName === 'BUTTON' || 
        targetElement.tagName === 'INPUT' || 
        targetElement.role === 'button' || 
        targetElement.tagName === 'SELECT' ||
        targetElement.tabIndex === 0 ||
        targetElement.className.includes('clickable');
      
      if (isClickable) {
        setIsHoveringLink(true);
        setCursorVariant('hover');
      }
    };

    const handleMouseOut = (e) => {
      const targetElement = e.target;
      const isClickable = 
        targetElement.tagName === 'A' || 
        targetElement.tagName === 'BUTTON' || 
        targetElement.tagName === 'INPUT' || 
        targetElement.role === 'button' || 
        targetElement.tagName === 'SELECT' ||
        targetElement.tabIndex === 0 ||
        targetElement.className.includes('clickable');
      
      if (isClickable) {
        setIsHoveringLink(false);
        setCursorVariant(isClicking ? 'clicking' : 'default');
      }
    };

    document.addEventListener('mouseover', handleMouseOver, { passive: true });
    document.addEventListener('mouseout', handleMouseOut, { passive: true });

    return () => {
      document.removeEventListener('mouseover', handleMouseOver);
      document.removeEventListener('mouseout', handleMouseOut);
    };
  }, [isClicking]);

  // Cursor variants
  const cursorVariants = {
    default: {
      x: mousePosition.x - 12,
      y: mousePosition.y - 12,
      height: 24,
      width: 24,
      backgroundColor: color,
      mixBlendMode: 'difference',
      opacity: 0.7,
      borderRadius: '50%',
      transition: {
        type: 'spring',
        mass: 0.2,
        stiffness: 800,
        damping: 25,
        restDelta: 0.001
      }
    },
    hover: {
      x: mousePosition.x - 20,
      y: mousePosition.y - 20,
      height: 40,
      width: 40,
      backgroundColor: color,
      mixBlendMode: 'difference',
      opacity: 0.8,
      borderRadius: '50%',
      transition: {
        type: 'spring',
        mass: 0.5,
        stiffness: 600,
        damping: 30
      }
    },
    clicking: {
      x: mousePosition.x - 24,
      y: mousePosition.y - 24,
      height: 48,
      width: 48,
      backgroundColor: color,
      mixBlendMode: 'difference',
      opacity: 0.9,
      borderRadius: '50%',
      transition: {
        type: 'spring',
        mass: 0.3,
        stiffness: 400,
        damping: 20
      }
    }
  };

  return (
    <>
      {/* Cursor trail */}
      <AnimatePresence>
        {trailDots.map((dot, i) => (
          <motion.div
            key={dot.id}
            initial={{ opacity: 0.7, scale: 1 }}
            animate={{ 
              opacity: 0,
              scale: 0.5,
              transition: { duration: 0.5, ease: "easeOut" }
            }}
            exit={{ opacity: 0 }}
            style={{
              position: 'fixed',
              top: dot.y,
              left: dot.x,
              width: dot.size,
              height: dot.size,
              backgroundColor: color,
              borderRadius: '50%',
              zIndex: 9997,
              pointerEvents: 'none',
              mixBlendMode: 'difference',
              transform: 'translate(-50%, -50%)',
              opacity: 0.7 - (i * 0.07) // Fade out based on position in trail
            }}
          />
        ))}
      </AnimatePresence>

      {/* Custom cursor */}
      <motion.div
        ref={cursorRef}
        className="cursor"
        variants={cursorVariants}
        animate={cursorVariant}
        style={{
          position: 'fixed',
          zIndex: 9999,
          pointerEvents: 'none',
          boxShadow: '0 0 10px rgba(255, 255, 255, 0.3)',
          mixBlendMode: 'difference'
        }}
      />

      {/* Splash effects */}
      <AnimatePresence>
        {splashes.map((splash) => (
          <motion.div
            key={splash.id}
            initial={{ 
              opacity: 0.9, 
              scale: 0.2,
              backgroundColor: splash.color || color
            }}
            animate={{ 
              opacity: 0, 
              scale: splash.scale || 3,
              backgroundColor: splash.color || color,
              transition: {
                duration: splash.duration || 0.8,
                ease: "easeOut"
              }
            }}
            exit={{ opacity: 0 }}
            style={{
              position: 'fixed',
              top: splash.y,
              left: splash.x,
              width: '12px',
              height: '12px',
              borderRadius: '50%',
              zIndex: 9998,
              pointerEvents: 'none',
              mixBlendMode: 'difference',
              transform: 'translate(-50%, -50%)',
              boxShadow: `0 0 20px ${splash.color || color}`
            }}
          />
        ))}
      </AnimatePresence>
    </>
  );
};

export default SplashCursor; 