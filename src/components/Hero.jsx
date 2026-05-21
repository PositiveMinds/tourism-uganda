import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { heroSlides } from '../data/ugandaData';
import { ChevronRight, ChevronLeft } from 'lucide-react';

const Hero = () => {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev === heroSlides.length - 1 ? 0 : prev + 1));
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => setCurrent(current === heroSlides.length - 1 ? 0 : current + 1);
  const prevSlide = () => setCurrent(current === 0 ? heroSlides.length - 1 : current - 1);

  return (
    <div className="relative h-screen w-full overflow-hidden">
      <AnimatePresence mode="wait">
        <motion.div
          key={current}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.5 }}
          className="absolute inset-0"
        >
          <motion.div 
            initial={{ scale: 1.2 }}
            animate={{ scale: 1 }}
            transition={{ duration: 6 }}
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url("${heroSlides[current].image}")` }}
          />
          <div className="absolute inset-0 bg-black/40" />
          
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4">
            <motion.h1 
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="text-4xl md:text-7xl font-serif font-bold text-white mb-6"
            >
              {heroSlides[current].title}
            </motion.h1>
            <motion.p 
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.7, duration: 0.8 }}
              className="text-lg md:text-2xl text-white/90 max-w-2xl font-light italic"
            >
              {heroSlides[current].subtitle}
            </motion.p>
            <motion.button
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.9, duration: 0.8 }}
              className="mt-10 px-8 py-3 bg-primary hover:bg-primary-dark text-white rounded-full font-medium transition-all transform hover:scale-105"
            >
              Start Your Adventure
            </motion.button>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Controls */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex space-x-4">
        {heroSlides.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrent(idx)}
            className={`w-3 h-3 rounded-full transition-all ${idx === current ? 'bg-primary w-8' : 'bg-white/50'}`}
          />
        ))}
      </div>

      <button onClick={prevSlide} className="absolute left-4 top-1/2 -translate-y-1/2 p-2 bg-white/10 hover:bg-white/20 text-white rounded-full hidden md:block">
        <ChevronLeft size={32} />
      </button>
      <button onClick={nextSlide} className="absolute right-4 top-1/2 -translate-y-1/2 p-2 bg-white/10 hover:bg-white/20 text-white rounded-full hidden md:block">
        <ChevronRight size={32} />
      </button>
    </div>
  );
};

export default Hero;
