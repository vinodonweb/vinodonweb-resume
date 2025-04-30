import React from 'react';
import { motion } from 'framer-motion';

// Letter animation
const letterVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: { 
    opacity: 1,
    y: 0,
  }
};

// Word animation
const wordVariants = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1,
    transition: { 
      staggerChildren: 0.01,
      delayChildren: 0.01,
      when: "beforeChildren"
    }
  }
};

export const AnimatedTitle = ({ text, className, delay = 0 }) => {
  // Ensure text is a string and not undefined
  const safeText = typeof text === 'string' ? text : '';
  
  // If no text, don't render anything
  if (!safeText) {
    return null;
  }
  
  // Fall back to simple animation if there's an issue with the animated letters
  return (
    <motion.h2 
      className={className}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
    >
      {safeText}
    </motion.h2>
  );
};

export const AnimatedHeading = ({ text, className, delay = 0, tag = 'h3' }) => {
  const words = text.split(' ');
  const Component = motion[tag];
  
  return (
    <Component
      className={className}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
    >
      {text}
    </Component>
  );
};

export const AnimatedParagraph = ({ text, className, delay = 0 }) => {
  return (
    <motion.p
      className={className}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
    >
      {text}
    </motion.p>
  );
};

export default AnimatedTitle; 