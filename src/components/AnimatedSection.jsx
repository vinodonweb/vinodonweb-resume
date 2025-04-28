import React from 'react';
import { motion } from 'framer-motion';

// Animation variants for sections
const sectionVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { 
      duration: 0.6,
      when: "beforeChildren",
      staggerChildren: 0.2
    }
  }
};

// Animation variants for section children
const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.5 }
  }
};

const AnimatedSection = ({ 
  id, 
  className, 
  children, 
  childrenClassName = "", 
  delay = 0,
  noStagger = false
}) => {
  return (
    <motion.section
      id={id}
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      variants={sectionVariants}
      transition={{ delay }}
    >
      {noStagger ? (
        children
      ) : (
        <motion.div className={childrenClassName} variants={itemVariants}>
          {children}
        </motion.div>
      )}
    </motion.section>
  );
};

export const AnimatedItem = ({ children, className, delay = 0 }) => {
  return (
    <motion.div
      className={className}
      variants={itemVariants}
      transition={{ delay }}
    >
      {children}
    </motion.div>
  );
};

export default AnimatedSection; 