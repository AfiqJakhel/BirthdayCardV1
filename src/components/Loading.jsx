import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const Loading = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const duration = 500; // 1 seconds loading  
    const interval = 25;
    const step = 50 / (duration / interval);
    
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          setTimeout(() => onComplete(), 1500); // Waktu tahan dipercepat
          return 100;
        }
        return prev + step;
      });
    }, interval);

    return () => clearInterval(timer);
  }, [onComplete]);

  return (
    <motion.div
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-gradient-to-br from-pink-50 via-rose-100 to-pink-200"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 1.05, filter: "blur(10px)" }}
      transition={{ duration: 1.5, ease: "easeInOut" }}
    >
      {/* Gold 'N' Logo */}
      <motion.div
        initial={{ opacity: 0, scale: 0.7 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
        className="mb-12 relative"
      >
        <motion.h1 
          animate={{ backgroundPosition: ["0% center", "200% center"] }}
          transition={{ duration: 1, repeat: 1, ease: "linear" }}
          className="text-8xl md:text-9xl font-serif tracking-widest font-bold 
                     bg-gradient-to-r from-yellow-600 via-yellow-100 to-yellow-600 
                     text-transparent bg-clip-text drop-shadow-[0_4px_15px_rgba(0,0,0,0.1)]"
          style={{ backgroundSize: "200% auto" }}
        >
          N
        </motion.h1>
        {/* Elegant White Halo behind N for contrast */}
        <div className="absolute inset-0 bg-white blur-[60px] opacity-60 -z-10 rounded-full scale-150"></div>
      </motion.div>

      {/* Progress Bar Container */}
      <div className="w-64 h-1 bg-white rounded-full overflow-hidden relative shadow-sm mt-4">
        <motion.div 
          animate={{ backgroundPosition: ["0% center", "200% center"] }}
          transition={{ duration: 1.5, repeat: 1, ease: "linear" }}
          className="absolute top-0 left-0 h-full bg-gradient-to-r from-yellow-600 via-yellow-100 to-yellow-600"
          style={{ width: `${progress}%`, backgroundSize: "200% auto" }}
        />
      </div>

      {/* Welcome Text (Selalu ada ruangnya agar tidak naik ke atas) */}
      <div className="h-10 mt-6 flex items-center justify-center">
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={progress >= 100 ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          className="text-sm tracking-[0.3em] text-rose-900 uppercase font-medium"
        >
          Selamat Datang...
        </motion.p>
      </div>
    </motion.div>
  );
};

export default Loading;
