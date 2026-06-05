import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Gift, Mail } from 'lucide-react';
import MemoryBook from './MemoryBook';
import SaturnFinale from './SaturnFinale';
import SparkleBackground from './SparkleBackground';

const Surprise = () => {
  const [layer, setLayer] = useState(1); 
  // 1 = Gift Box
  // 2 = Envelope
  // 3 = Memory Book
  // 4 = Saturn Finale

  return (
    <>
      <section className="min-h-[70vh] flex flex-col items-center justify-center bg-transparent text-luxury-burgundy relative overflow-hidden px-6 py-20 z-10">
        <div className="absolute top-0 left-0 w-full h-32 blur-divider-top z-20 pointer-events-none"></div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="text-center z-30 w-full max-w-4xl"
        >
          <AnimatePresence mode="wait">
            
            {/* LAYER 1: The Box */}
            {layer === 1 && (
              <motion.div
                key="layer1"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.8 }}
                className="flex flex-col items-center"
              >
                <h2 className="text-4xl md:text-5xl font-serif text-luxury-gold mb-6">One Last Surprise</h2>
                <p className="text-luxury-burgundy/70 mb-12 font-light max-w-md mx-auto font-medium">
                  A glimpse of the beautiful journey of my little love, who is celebrating her special day today.                </p>
                <motion.button
                  whileHover={{ scale: 1.05, rotate: [-2, 2, -2, 0] }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setLayer(2)}
                  className="group relative px-10 py-5 rounded-full overflow-hidden border border-luxury-gold/50 bg-white/50 hover:bg-white/80 backdrop-blur-md transition-all duration-300 shadow-sm"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-luxury-gold/0 via-luxury-gold/20 to-luxury-gold/0 -translate-x-full group-hover:animate-[shimmer_1.5s_infinite]"></div>
                  <div className="flex items-center space-x-3 text-luxury-gold">
                    <Gift className="w-6 h-6 group-hover:animate-bounce" />
                    <span className="font-serif tracking-widest uppercase font-bold">Open Gift</span>
                  </div>
                </motion.button>
              </motion.div>
            )}

            {/* LAYER 2: The Envelope */}
            {layer === 2 && (
              <motion.div
                key="layer2"
                initial={{ opacity: 0, scale: 0.5, rotate: -5 }}
                animate={{ opacity: 1, scale: 1, rotate: 0 }}
                exit={{ opacity: 0, y: 50 }}
                className="flex flex-col items-center"
              >
                <motion.button
                  whileHover={{ scale: 1.05, y: -10 }}
                  onClick={() => setLayer(3)}
                  className="relative cursor-pointer group"
                >
                  <div className="w-64 h-48 bg-[#FFF8E7] rounded-md shadow-[0_15px_40px_rgba(107,15,58,0.2)] border border-[#EFA8C2]/30 flex items-center justify-center relative overflow-hidden">
                    {/* Envelope Flap visual */}
                    <div className="absolute top-0 w-full h-1/2 bg-[#F9D7E3] origin-top transform scale-y-110 shadow-sm" style={{ clipPath: 'polygon(0 0, 100% 0, 50% 100%)' }}></div>
                    {/* Wax Seal */}
                    <div className="absolute z-10 w-12 h-12 bg-luxury-burgundy rounded-full flex items-center justify-center shadow-lg border-2 border-luxury-gold/50 group-hover:bg-luxury-rose transition-colors duration-300">
                      <Mail className="w-5 h-5 text-luxury-goldLight" />
                    </div>
                  </div>
                  <p className="mt-6 font-serif text-luxury-burgundy font-bold italic tracking-widest group-hover:text-luxury-rose transition-colors">
                    Click to break the seal
                  </p>
                </motion.button>
              </motion.div>
            )}

            {/* LAYER 3: The Memory Book with custom background */}
            {layer === 3 && (
              <>
                <motion.div
                  key="layer3-bg"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 1.5 }}
                  className="fixed inset-0 z-[90] bg-[#0A0A0A]"
                >
                  <SparkleBackground />
                </motion.div>
                
                <motion.div
                  key="layer3-book"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 1.5 }}
                  className="fixed inset-0 z-[100] flex items-center justify-center overflow-hidden"
                >
                  <div className="flex items-center justify-center w-full h-full portrait:w-[100vh] portrait:h-[100vw] portrait:-rotate-90 origin-center transition-transform duration-500">
                    <MemoryBook onComplete={() => setLayer(4)} />
                  </div>
                </motion.div>
              </>
            )}
          </AnimatePresence>
        </motion.div>
      </section>

      {/* LAYER 4: Saturn Finale (Rendered outside normal flow to cover screen) */}
      <AnimatePresence>
        {layer === 4 && <SaturnFinale />}
      </AnimatePresence>
    </>
  );
};

export default Surprise;
