import React from 'react';
import { motion } from 'framer-motion';

const cardVariants = {
  hidden: { 
    opacity: 0,
    y: 50,
    scale: 0.9
  },
  visible: { 
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      type: 'spring',
      stiffness: 100,
      damping: 20
    }
  },
  hover: {
    y: -10,
    boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.2), 0 10px 10px -5px rgba(0, 0, 0, 0.1)",
    transition: {
      type: 'spring',
      stiffness: 300,
      damping: 25
    }
  }
};

const AnimatedCard = ({ children, className, delay = 0 }) => {
  return (
    <motion.div
      className={className}
      variants={cardVariants}
      initial="hidden"
      whileInView="visible"
      whileHover="hover"
      viewport={{ once: true, margin: "-50px" }}
      transition={{
        delay: delay * 0.2
      }}
    >
      {children}
    </motion.div>
  );
};

export const AnimatedProject = ({ children, className, delay = 0 }) => {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ 
        opacity: 1, 
        y: 0,
        transition: {
          type: 'spring',
          stiffness: 100,
          damping: 20,
          delay: delay * 0.2
        }
      }}
      whileHover={{ 
        scale: 1.02,
        transition: {
          type: 'spring',
          stiffness: 300,
          damping: 25
        }
      }}
      viewport={{ once: true, margin: "-50px" }}
    >
      {children}
    </motion.div>
  );
};

export default AnimatedCard; 