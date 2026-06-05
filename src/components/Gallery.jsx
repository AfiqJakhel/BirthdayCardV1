import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const memories = [
  {
    id: 1,
    year: '2024',
    title: 'The Beginning',
    desc: 'The day we started our beautiful journey. Every moment since has been pure magic.',
    image: 'https://images.unsplash.com/photo-1518199266791-5375a83190b7?auto=format&fit=crop&q=80&w=800',
    type: 'Year 1'
  },
  {
    id: 2,
    year: '2024',
    title: 'First Trip Together',
    desc: 'Exploring new places with you makes everything look like a luxury painting.',
    image: 'https://images.unsplash.com/photo-1499856871958-5b9627545d1a?auto=format&fit=crop&q=80&w=800',
    type: 'Travels'
  },
  {
    id: 3,
    year: '2025',
    title: 'Elegant Evenings',
    desc: 'Fine dining, deep conversations, and your beautiful smile lighting up the room.',
    image: 'https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?auto=format&fit=crop&q=80&w=800',
    type: 'Year 2'
  },
  {
    id: 4,
    year: '2025',
    title: 'Quiet Moments',
    desc: 'Even doing nothing feels like everything when I am with you.',
    image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&q=80&w=800',
    type: 'Daily Life'
  }
];

const MemoryItem = ({ memo, index }) => {
  const { ref, inView } = useInView({
    triggerOnce: false,
    threshold: 0.2,
  });

  return (
    <div ref={ref} className={`relative flex flex-col md:flex-row items-center justify-between w-full mb-32 ${index % 2 === 0 ? 'md:flex-row-reverse' : ''}`}>
      {/* Connector Node */}
      <div className="hidden md:block absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-luxury-gold shadow-[0_0_15px_rgba(212,175,55,0.8)] z-20"></div>

      {/* Content */}
      <motion.div 
        initial={{ opacity: 0, x: index % 2 === 0 ? 50 : -50 }}
        animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: index % 2 === 0 ? 50 : -50 }}
        transition={{ duration: 1, ease: "easeOut" }}
        className="w-full md:w-[45%] flex flex-col justify-center px-4 text-center md:text-left"
      >
        <span className="text-luxury-gold tracking-widest text-sm font-bold mb-2">{memo.year} — {memo.type}</span>
        <h3 className="text-3xl font-serif text-luxury-burgundy mb-4">{memo.title}</h3>
        <p className="text-luxury-burgundy/80 font-light leading-relaxed">{memo.desc}</p>
      </motion.div>

      {/* Image with Lazy Load and Hover Parallax */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.9, filter: "blur(10px)" }}
        animate={inView ? { opacity: 1, scale: 1, filter: "blur(0px)" } : { opacity: 0, scale: 0.9, filter: "blur(10px)" }}
        transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
        className="w-full md:w-[45%] mt-8 md:mt-0 relative group px-4 md:px-0"
      >
        <div className="aspect-[4/5] rounded-lg overflow-hidden relative shadow-[0_10px_30px_rgba(0,0,0,0.5)] border border-luxury-gold/20">
          <img 
            src={memo.image} 
            alt={memo.title}
            loading="lazy"
            className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
          />
          {/* <!-- INSERT PHOTO: Replace src above with your actual photo path --> */}
          <div className="absolute inset-0 bg-gradient-to-t from-luxury-burgundy/90 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end p-8">
            <span className="text-luxury-goldLight font-serif text-2xl italic drop-shadow-md">"{memo.title}"</span>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

const Gallery = () => {
  return (
    <section className="relative w-full bg-transparent py-32 px-6 z-10">
      <div className="max-w-7xl mx-auto relative">
        
        <div className="text-center mb-32">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="text-5xl md:text-7xl font-serif text-gold-shimmer mb-6"
          >
            Our Journey
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.3 }}
            className="text-luxury-burgundy/70 font-light max-w-2xl mx-auto text-lg"
          >
            A timeline of our most beautiful moments together, preserved forever.
          </motion.p>
        </div>

        {/* Central Timeline Line */}
        <div className="absolute left-1/2 top-48 bottom-0 w-px bg-gradient-to-b from-luxury-gold via-luxury-rose to-transparent hidden md:block opacity-30"></div>

        <div className="relative">
          {memories.map((memo, index) => (
            <MemoryItem key={memo.id} memo={memo} index={index} />
          ))}
        </div>

      </div>
      
      {/* Blur divider bottom */}
      <div className="absolute bottom-0 left-0 w-full h-32 blur-divider-bottom z-20 pointer-events-none"></div>
    </section>
  );
};

export default Gallery;
