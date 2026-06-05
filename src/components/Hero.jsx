import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ChevronDown, Music, Music2 } from 'lucide-react';

const Hero = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);

  const togglePlay = () => {
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  // Autoplay & Interaction logic
  useEffect(() => {
    // Set audio volume to 75%
    if (audioRef.current) {
      audioRef.current.volume = 0.75;
    }

    const tryPlayAudio = () => {
      if (audioRef.current && audioRef.current.paused) {
        audioRef.current.play().then(() => {
          setIsPlaying(true);
          // Remove listeners once successfully played
          window.removeEventListener('scroll', tryPlayAudio);
          window.removeEventListener('click', tryPlayAudio);
          window.removeEventListener('touchstart', tryPlayAudio);
        }).catch(() => {
          console.log("Autoplay blocked, waiting for interaction...");
        });
      }
    };

    // Attempt autoplay immediately
    tryPlayAudio();

    // If blocked, wait for any user interaction (scroll, click, touch) to start music
    window.addEventListener('scroll', tryPlayAudio);
    window.addEventListener('click', tryPlayAudio);
    window.addEventListener('touchstart', tryPlayAudio);

    return () => {
      window.removeEventListener('scroll', tryPlayAudio);
      window.removeEventListener('click', tryPlayAudio);
      window.removeEventListener('touchstart', tryPlayAudio);
    };
  }, []);

  return (
    <section className="relative w-full min-h-screen flex flex-col items-center justify-center bg-transparent overflow-hidden px-4 md:px-10 z-10">
      
      {/* Audio Element */}
      <audio ref={audioRef} loop src="/lany-xxl.mp3" autoPlay />

      {/* Blur Divider Bottom */}
      <div className="absolute bottom-0 left-0 w-full h-32 blur-divider-bottom z-20 pointer-events-none"></div>

      {/* Music Button */}
      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 2, delay: 1 }}
        onClick={togglePlay}
        className={`absolute top-8 right-8 z-30 w-12 h-12 rounded-full border border-luxury-gold/30 bg-white/50 backdrop-blur-md flex items-center justify-center transition-all duration-300 shadow-sm ${isPlaying ? 'text-luxury-gold shadow-[0_0_15px_rgba(212,175,55,0.4)]' : 'text-luxury-burgundy/60'}`}
        title="Play LANY - XXL"
      >
        {isPlaying ? <Music className="w-5 h-5 animate-pulse" /> : <Music2 className="w-5 h-5" />}
      </motion.button>

      <div className="relative z-20 text-center max-w-4xl mx-auto mt-10 md:mt-20">
        <motion.h2 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.5 }}
          className="text-5xl md:text-8xl font-serif mb-6 text-gold-shimmer"
        >
          Nayla
        </motion.h2>
        
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.5, delay: 0.3 }}
          className="w-24 h-px bg-luxury-goldLight mx-auto mb-6"
        ></motion.div>

        <motion.p 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.5, delay: 0.5 }}
          className="text-lg md:text-2xl text-luxury-burgundy/80 font-serif italic px-4 leading-relaxed max-w-2xl mx-auto"
        >
           "You make my life feel calmer, brighter, and more meaningful in ways I’ve always hoped for."
        </motion.p>
      </div>

      {/* Scroll Down Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 1.5, duration: 1 }}
        className="absolute bottom-12 flex flex-col items-center z-30"
      >
        <span className="text-xs text-luxury-gold/60 uppercase tracking-widest mb-3 font-medium">Scroll to explore</span>
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
        >
          <ChevronDown className="w-6 h-6 text-luxury-gold" />
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Hero;
