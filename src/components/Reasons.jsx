import React from 'react';
import { motion } from 'framer-motion';
import { Heart, Star, Compass, Sparkles } from 'lucide-react';

const reasons = [
  { icon: Heart, title: "Your Heart", desc: "The purest and kindest soul I've ever known." },
  { icon: Star, title: "Your Elegance", desc: "You carry yourself with a grace that captivates everyone." },
  { icon: Compass, title: "Our Adventures", desc: "You make every trip an unforgettable luxury." },
  { icon: Sparkles, title: "Your Smile", desc: "The gold that lights up my darkest days." }
];

const containerVariants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.2 }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 50, filter: "blur(10px)", scale: 0.9 },
  show: { opacity: 1, y: 0, filter: "blur(0px)", scale: 1, transition: { duration: 0.8, ease: "easeOut" } }
};

const Reasons = () => {
  return (
    <section className="relative py-32 bg-transparent z-10 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-24">
          <motion.h2 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="text-4xl md:text-6xl font-serif text-gold-shimmer mb-6"
          >
            Why I Adore You
          </motion.h2>
          <p className="text-luxury-burgundy/70 font-light text-lg">Just a few of the million reasons...</p>
        </div>

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
        >
          {reasons.map((r, i) => (
            <motion.div 
              key={i}
              variants={itemVariants}
              className="bg-white/40 backdrop-blur-md border border-luxury-rose/40 p-8 rounded-2xl flex flex-col items-center text-center hover:bg-white/60 transition-colors duration-300 shadow-sm hover:shadow-md"
            >
              <div className="w-16 h-16 rounded-full bg-luxury-burgundy/50 border border-luxury-gold/50 flex items-center justify-center mb-6 shadow-[0_0_15px_rgba(212,175,55,0.2)]">
                <r.icon className="w-8 h-8 text-luxury-gold" />
              </div>
              <h3 className="text-2xl font-serif text-luxury-burgundy mb-4">{r.title}</h3>
              <p className="text-luxury-burgundy/80 font-light leading-relaxed">{r.desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Reasons;
