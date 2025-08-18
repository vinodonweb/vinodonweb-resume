import React from 'react';
import { motion } from 'framer-motion';

const RainbowButton = ({ 
  children, 
  onClick, 
  className = '',
  disabled = false,
  type = 'button',
  ...props 
}) => {
  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className={`relative px-6 py-3 rounded-md rainbow-button bg-[#f5c842] dark:bg-transparent border border-[#f5c842] hover:bg-[#ffd700] dark:hover:bg-[#f5c842]/20 transition-colors font-medium ${className}`}
      onClick={onClick}
      disabled={disabled}
      type={type}
      {...props}
    >
      {children}
    </motion.button>
  );
};

export default RainbowButton; 