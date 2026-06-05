import React, { useRef, useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const allGalleryPhotos = [
  "/WhatsApp Image 2026-06-01 at 21.31.29.jpeg",
  "/WhatsApp Image 2026-06-01 at 21.31.46.jpeg",
  "/WhatsApp Image 2026-06-01 at 21.33.13.jpeg",
  "/WhatsApp Image 2026-06-01 at 21.33.29.jpeg",
  "/WhatsApp Image 2026-06-01 at 21.34.03.jpeg",
  "/WhatsApp Image 2026-06-01 at 21.34.55.jpeg",
  "/WhatsApp Image 2026-06-01 at 21.36.15.jpeg",
  "/WhatsApp Image 2026-06-01 at 21.37.13.jpeg",
  "/WhatsApp Image 2026-06-01 at 21.38.01.jpeg",
  "/WhatsApp Image 2026-06-01 at 21.38.17.jpeg",
  "/WhatsApp Image 2026-06-01 at 21.39.05.jpeg", 
  "/WhatsApp Image 2026-06-01 at 21.39.33.jpeg",
  "/WhatsApp Image 2026-06-01 at 21.41.00.jpeg",
  "/WhatsApp Image 2026-06-01 at 21.42.11.jpeg",
  "/WhatsApp Image 2026-06-01 at 21.42.29.jpeg",
  "/WhatsApp Image 2026-06-01 at 21.43.10.jpeg",
  "/WhatsApp Image 2026-06-01 at 21.46.11 (1).jpeg",
  "/WhatsApp Image 2026-06-01 at 21.46.11 (2).jpeg",
  "/WhatsApp Image 2026-06-01 at 21.46.11 (3).jpeg",
  "/WhatsApp Image 2026-06-01 at 21.46.11.jpeg",
  "/WhatsApp Image 2026-06-01 at 21.46.12.jpeg",
  "/WhatsApp Image 2026-06-01 at 21.47.49.jpeg",
  "/WhatsApp Image 2026-06-01 at 21.47.50.jpeg",
  "/WhatsApp Image 2026-06-05 at 22.43.45.jpeg",
  "/WhatsApp Image 2026-06-05 at 22.45.17.jpeg",
  "/WhatsApp Image 2026-06-05 at 22.48.35.jpeg",
  "/WhatsApp Image 2026-06-05 at 22.49.00.jpeg"
];

const Timeline = () => {
  const containerRef = useRef(null);
  const [positions, setPositions] = useState([]);

  useEffect(() => {
    // Generate random positions, but keep them generally within 10-80% of the container
    // so they are fully visible and scatter naturally.
    const newPositions = allGalleryPhotos.map(() => ({
      left: 5 + Math.random() * 75, // 5% to 80% width
      top: 5 + Math.random() * 80,  // 5% to 85% height
      rotate: Math.random() * 60 - 30, // -30deg to 30deg
      scale: 0.9 + Math.random() * 0.2 // slightly varied scale
    }));
    setPositions(newPositions);
  }, []);

  return (
    <section 
      ref={containerRef}
      className="min-h-[120vh] bg-transparent relative overflow-hidden flex flex-col items-center py-20"
    >
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent opacity-30"></div>
      
      {/* Background Decor */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#D4AF37]/5 rounded-full blur-[100px] pointer-events-none"></div>

      <div className="z-20 text-center mb-8 pointer-events-none px-6 mt-10">
        <h2 className="text-4xl md:text-6xl font-serif text-luxury-burgundy mb-4 drop-shadow-sm">
          Wall of Memories
        </h2>
        <div className="w-24 h-px bg-[#D4AF37] mx-auto mb-6"></div>
        <p className="text-luxury-burgundy/70 font-light italic text-base md:text-lg max-w-xl mx-auto bg-white/60 px-6 py-3 rounded-full shadow-sm backdrop-blur-md">
          Happy Birthday yaa sayanggkuu, Semoga kamu gaa sedih lagi yaa sayangg —Sabtu, 6 Juni 2026
        </p>
      </div>

      {/* Interactive Drag Canvas */}
      <div className="flex-1 w-full relative h-full">
        {positions.map((pos, index) => (
          <motion.div
            key={index}
            drag
            dragConstraints={containerRef}
            dragElastic={0.3}
            whileDrag={{ scale: 1.15, zIndex: 100, cursor: "grabbing" }}
            initial={{ opacity: 0, scale: 0, rotate: pos.rotate }}
            whileInView={{ opacity: 1, scale: pos.scale, rotate: pos.rotate }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ 
              type: "spring", 
              stiffness: 260, 
              damping: 20, 
              delay: index * 0.03 
            }}
            className="absolute cursor-grab bg-white p-2 pb-8 md:p-3 md:pb-12 shadow-[0_15px_35px_rgba(0,0,0,0.15)] border border-[#D4AF37]/20 flex flex-col items-center w-28 md:w-44 lg:w-52"
            style={{ 
              left: `${pos.left}%`,
              top: `${pos.top}%`,
              zIndex: Math.floor(Math.random() * 50)
            }}
          >
            <div className="w-full aspect-[4/5] overflow-hidden rounded-sm bg-gray-100 pointer-events-none">
              <img 
                src={allGalleryPhotos[index]} 
                alt="Memory" 
                className="w-full h-full object-cover" 
                draggable={false}
                loading="lazy"
              />
            </div>
          </motion.div>
        ))}
      </div>

      <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent opacity-30"></div>
    </section>
  );
};

export default Timeline;
