import React from 'react';
import { motion } from 'framer-motion';

const Marquee = ({ 
  children, 
  direction = 'left', 
  speed = 50, 
  pauseOnHover = false,
  className = '',
  repeat = 2
}) => {
  const marqueeVariants = {
    animate: {
      x: direction === 'left' ? ['0%', '-100%'] : ['-100%', '0%'],
      transition: {
        x: {
          repeat: Infinity,
          repeatType: 'loop',
          duration: speed,
          ease: 'linear',
        },
      },
    },
  };

  return (
    <div className={`overflow-hidden whitespace-nowrap ${className}`}>
      <motion.div
        className="inline-block"
        variants={marqueeVariants}
        animate="animate"
        style={{ whiteSpace: 'nowrap' }}
        whileHover={pauseOnHover ? { animationPlayState: 'paused' } : {}}
      >
        {Array.from({ length: repeat }, (_, i) => (
          <span key={i} className="inline-block mr-8">
            {children}
          </span>
        ))}
      </motion.div>
    </div>
  );
};

export default Marquee;
