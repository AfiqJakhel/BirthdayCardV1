import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const Counter = () => {
  const [together, setTogether] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [birthday, setBirthday] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    // 7 September 2024
    const startDate = new Date('2024-09-07T00:00:00');
    
    const calculateTime = () => {
      const now = new Date();
      
      // Together Since
      const diffTogether = now - startDate;
      setTogether({
        days: Math.floor(diffTogether / (1000 * 60 * 60 * 24)),
        hours: Math.floor((diffTogether / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((diffTogether / 1000 / 60) % 60),
        seconds: Math.floor((diffTogether / 1000) % 60)
      });

      // Next Birthday (8 June)
      let currentYear = now.getFullYear();
      let nextBirthday = new Date(currentYear, 5, 8); // Month is 0-indexed (5 = June)
      
      // If birthday has passed this year and it's not today, look to next year
      if (now.getTime() > nextBirthday.getTime() + 24 * 60 * 60 * 1000) {
        nextBirthday = new Date(currentYear + 1, 5, 8);
      }
      
      const diffBday = nextBirthday - now;
      if (diffBday > 0) {
        setBirthday({
          days: Math.floor(diffBday / (1000 * 60 * 60 * 24)),
          hours: Math.floor((diffBday / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((diffBday / 1000 / 60) % 60),
          seconds: Math.floor((diffBday / 1000) % 60)
        });
      } else {
        // It is her birthday today!
        setBirthday({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    };

    calculateTime();
    const timer = setInterval(calculateTime, 1000);
    return () => clearInterval(timer);
  }, []);

  const TimeBlock = ({ value, label }) => (
    <div className="flex flex-col items-center justify-center w-[4.5rem] h-[4.5rem] sm:w-20 sm:h-20 md:w-28 md:h-28 bg-white/40 border-2 md:border-4 border-luxury-gold/40 rounded-full backdrop-blur-md shadow-[0_8px_30px_rgba(225,29,72,0.15)] hover:scale-105 transition-transform duration-300 flex-shrink-0">
      <span className="text-xl sm:text-2xl md:text-4xl font-serif text-luxury-gold leading-none mb-1">{value}</span>
      <span className="text-[8px] sm:text-[9px] md:text-[10px] uppercase tracking-widest text-luxury-burgundy/70 font-bold">{label}</span>
    </div>
  );

  return (
    <section className="relative w-full py-32 bg-transparent z-10 overflow-hidden">
      {/* Top Blur */}
      <div className="absolute top-0 left-0 w-full h-32 blur-divider-top z-20 pointer-events-none"></div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 flex flex-col items-center justify-center relative z-30">
        
        {/* Together Counter */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="flex flex-col items-center w-full"
        >
          <h3 className="text-3xl md:text-5xl font-serif text-luxury-rose mb-4 tracking-widest uppercase text-center">Together Since</h3>
          <p className="text-luxury-burgundy/60 mb-12 text-lg font-light italic font-medium">September 7, 2024</p>
          <div className="flex justify-center gap-3 sm:gap-6 md:gap-10 mt-2 w-full max-w-full">
            <TimeBlock value={together.days} label="Days" />
            <TimeBlock value={together.hours} label="Hours" />
            <TimeBlock value={together.minutes} label="Mins" />
            <TimeBlock value={together.seconds} label="Secs" />
          </div>
        </motion.div>

      </div>

      {/* Bottom Blur */}
      <div className="absolute bottom-0 left-0 w-full h-32 blur-divider-bottom z-20 pointer-events-none"></div>
    </section>
  );
};

export default Counter;
