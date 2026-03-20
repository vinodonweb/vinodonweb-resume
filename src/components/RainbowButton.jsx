import { motion } from 'framer-motion';

export default function PrimaryButton({ children, onClick, className = '', outline = false }) {
  return (
    <motion.button
      onClick={onClick}
      className={`${outline ? 'btn-outline' : 'btn-primary'} ${className}`}
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.97 }}
    >
      {children}
    </motion.button>
  );
}