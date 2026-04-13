import { motion, AnimatePresence } from 'framer-motion';
import { ReactNode } from 'react';

export const PageTransition = ({ children, key }: { children: ReactNode; key?: string }) => (
  <AnimatePresence mode="wait">
    <motion.div
      key={key}
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -6 }}
      transition={{ duration: 0.25, ease: 'easeOut' }}
      className="min-h-screen"
    >
      {children}
    </motion.div>
  </AnimatePresence>
);
