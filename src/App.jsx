import React, { useState } from 'react';
import Loading from './components/Loading';
import SparkleBackground from './components/SparkleBackground';
import Hero from './components/Hero';
import Counter from './components/Counter';
import Timeline from './components/Timeline';
import Letter from './components/Letter';
import Surprise from './components/Surprise';
import { AnimatePresence, motion } from 'framer-motion';

function App() {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <div className="bg-gradient-to-br from-pink-50 via-luxury-blush to-luxury-blushDark min-h-screen text-luxury-burgundy overflow-x-hidden">
      <AnimatePresence mode="wait">
        {isLoading ? (
          <Loading key="loading" onComplete={() => setIsLoading(false)} />
        ) : (
          <motion.div
            key="main-content"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.5, ease: "easeOut", delay: 0.2 }}
            className="relative z-10 w-full overflow-x-hidden"
          >
            <SparkleBackground />
            <Hero />
            <Counter />
            <Timeline />
            <Letter />
            <Surprise />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default App;
