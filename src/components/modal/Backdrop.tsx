import React, { ReactNode } from 'react';
import { motion } from 'framer-motion';

const Backdrop: React.FC<{ onClick: any, children: ReactNode }> = ({ children, onClick }) => {
  return (
    <motion.div
      onClick={onClick}
      className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-30 flex items-center justify-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: .1 }}
      exit={{ opacity: 0 }}
    >
      {children}
    </motion.div>
  );
}

export default Backdrop;
