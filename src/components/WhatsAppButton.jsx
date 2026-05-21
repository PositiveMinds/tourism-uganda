import React from 'react';
import { MessageCircle } from 'lucide-react';
import { motion } from 'framer-motion';

const WhatsAppButton = () => {
  const phoneNumber = "256700000000"; // Replace with real number
  const message = "Hello Uganda Travel, I'm interested in planning a luxury trip!";

  return (
    <motion.a
      href={`https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      className="fixed bottom-8 right-8 z-[100] flex items-center space-x-3 bg-[#25D366] text-white px-6 py-4 rounded-full shadow-2xl transition-all group"
    >
      <div className="flex flex-col items-end mr-1">
        <span className="text-[10px] font-bold uppercase tracking-widest opacity-80 leading-none">Concierge</span>
        <span className="text-sm font-bold">WhatsApp</span>
      </div>
      <div className="relative">
        <div className="absolute inset-0 bg-white rounded-full animate-ping opacity-20" />
        <MessageCircle size={28} className="relative z-10" />
      </div>
    </motion.a>
  );
};

export default WhatsAppButton;
