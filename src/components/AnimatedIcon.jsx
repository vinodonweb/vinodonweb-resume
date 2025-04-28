import React from 'react';
import { motion } from 'framer-motion';

const iconVariants = {
  hidden: { scale: 0, opacity: 0 },
  visible: {
    scale: 1,
    opacity: 1,
    transition: {
      type: 'spring',
      stiffness: 260,
      damping: 20,
      delay: 0.1
    }
  },
  hover: {
    scale: 1.2,
    rotate: [0, 10, -10, 0],
    transition: {
      duration: 0.5
    }
  }
};

const AnimatedIcon = ({ icon: Icon, className, delay = 0, color }) => {
  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      whileHover="hover"
      viewport={{ once: true }}
      variants={iconVariants}
      custom={delay}
    >
      <Icon className={color} />
    </motion.div>
  );
};

export const FloatingIcon = ({ icon: Icon, className, color }) => {
  return (
    <motion.div
      className={className}
      animate={{
        y: [0, -10, 0],
      }}
      transition={{
        duration: 2,
        repeat: Infinity,
        repeatType: 'reverse',
      }}
    >
      <Icon className={color} />
    </motion.div>
  );
};

export const PulsingIcon = ({ icon: Icon, className, color }) => {
  return (
    <motion.div
      className={className}
      animate={{
        scale: [1, 1.1, 1],
        opacity: [0.8, 1, 0.8],
      }}
      transition={{
        duration: 2,
        repeat: Infinity,
        repeatType: 'reverse',
      }}
    >
      <Icon className={color} />
    </motion.div>
  );
};

export default AnimatedIcon; 