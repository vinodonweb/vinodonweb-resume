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
      staggerChildren: 0.03,
      delayChildren: 0.03
    }
  }
};

export const AnimatedTitle = ({ text, className, delay = 0 }) => {
  const words = text.split(' ');
  
  return (
    <motion.h2 
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      transition={{ delay }}
    >
      {words.map((word, wordIndex) => (
        <motion.span
          key={wordIndex}
          className="inline-block mr-2"
          variants={wordVariants}
        >
          {Array.from(word).map((letter, letterIndex) => (
            <motion.span
              key={letterIndex}
              className="inline-block"
              variants={letterVariants}
            >
              {letter}
            </motion.span>
          ))}
        </motion.span>
      ))}
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