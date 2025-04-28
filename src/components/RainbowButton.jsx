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
      className={`relative px-6 py-3 rounded-md text-blue-500 border border-blue-600 hover:bg-blue-900/20 transition-colors font-medium ${className}`}
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