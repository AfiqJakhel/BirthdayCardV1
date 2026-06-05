import React from 'react';
import { motion } from 'framer-motion';

const Letter = () => {
  return (
    <section className="relative py-32 bg-transparent z-10 px-6 flex justify-center">
      {/* Top Blur */}
      <div className="absolute top-0 left-0 w-full h-32 blur-divider-top z-20 pointer-events-none"></div>

      <motion.div 
        initial={{ opacity: 0, y: 50, rotateX: 10 }}
        whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1.5, ease: "easeOut" }}
        style={{ perspective: 1000 }}
        className="w-full max-w-3xl"
      >
        <div className="paper-texture rounded-sm shadow-[0_20px_50px_rgba(0,0,0,0.8)] border border-luxury-goldDark/30 p-12 md:p-20 relative">
          
          <div className="absolute -top-8 left-1/2 -translate-x-1/2 wax-seal z-30"></div>
          
          <p className="text-luxury-burgundy font-serif text-lg md:text-xl leading-loose text-center italic mb-10 mt-6">
            To my love, Nayla
          </p>
          
          <div className="space-y-6 text-luxury-black/90 font-serif text-base md:text-lg leading-relaxed text-justify">
            <p>
              Since the night I confessed my love and was rejected, you still tried to keep me from leaving, that was the moment I realized how happy I felt being by your side. You brought color into my life, gave me the strength to keep going, and became the best support system I have ever had.            </p>
            <p>
              Every year we have spent together, through both the difficult and beautiful moments, has become proof of the journey we have shared in this story. Your smile, your personality, and the way you have helped me become a better person have left a deep mark on my heart.
            </p>
            <p>
              Today is your special day, my love. You are now 21 years old, and on this Monday, as you begin your journey to Malaysia, I want you to know that you are the person I love and cherish the most. You have given me so many beautiful moments and so much happiness in my life.
            </p>
            <p>
              No matter where you go or what you do, I will always be here supporting you, loving you, and cheering you on. I'm so proud of the person you've become, and I can't wait to see what amazing things you'll achieve in the future. I'll miss you every day, but I'll always be with you in spirit. Love you more than words can say.
            </p>
            <p>
              Happy birthday, my love. May all your dreams and wishes come true.
            </p>
          </div>
          
          <p className="text-luxury-burgundy font-serif text-xl mt-12 text-right italic">
            Forever Yours,<br/>
            <span className="text-2xl mt-2 block">Mpung♥️</span>
          </p>
        </div>
      </motion.div>

      {/* Bottom Blur */}
      <div className="absolute bottom-0 left-0 w-full h-32 blur-divider-bottom z-20 pointer-events-none"></div>
    </section>
  );
};

export default Letter;
