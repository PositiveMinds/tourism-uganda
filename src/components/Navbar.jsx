import React, { useState, useEffect } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { Menu, X, Sun, Moon, MapPin } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [time, setTime] = useState('');
  const { isDarkMode, toggleTheme } = useTheme();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    
    const updateTime = () => {
      const kampalaTime = new Date().toLocaleTimeString('en-GB', {
        timeZone: 'Africa/Kampala',
        hour: '2-digit',
        minute: '2-digit',
      });
      setTime(kampalaTime);
    };
    
    updateTime();
    const interval = setInterval(updateTime, 60000);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearInterval(interval);
    };
  }, []);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Destinations', path: '/#destinations' },
    { name: 'Reservations', path: '/reservations' },
    { name: 'Register', path: '/register' },
    { name: 'Login', path: '/login' },
  ];

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? 'glass py-4 shadow-lg' : 'bg-transparent py-6'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          <Link to="/" className="flex items-center space-x-2">
            <MapPin className="text-primary w-8 h-8" />
            <span className={`text-2xl font-serif font-bold ${scrolled ? 'text-gray-900 dark:text-white' : 'text-white'}`}>
              Uganda<span className="text-primary">Travel</span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <NavLink
                key={link.name}
                to={link.path}
                className={({ isActive }) => `text-sm font-medium transition-colors hover:text-primary ${isActive ? 'text-primary' : scrolled ? 'text-gray-700 dark:text-gray-200' : 'text-white'}`}
              >
                {link.name}
              </NavLink>
            ))}
            <div className="flex items-center space-x-2 border-l border-gray-200 dark:border-white/10 pl-6 ml-2">
              <span className={`text-[10px] font-bold uppercase tracking-widest ${scrolled ? 'text-gray-400' : 'text-white/60'}`}>Kampala</span>
              <span className={`text-sm font-medium ${scrolled ? 'text-gray-700 dark:text-gray-200' : 'text-white'}`}>{time}</span>
            </div>
            <button onClick={toggleTheme} className="p-2 rounded-full hover:bg-black/10 dark:hover:bg-white/10 transition-colors">
              {isDarkMode ? <Sun className="text-yellow-400 w-5 h-5" /> : <Moon className={`${scrolled ? 'text-gray-700 dark:text-gray-200' : 'text-white'} w-5 h-5`} />}
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center space-x-4">
            <button onClick={toggleTheme} className="p-2">
              {isDarkMode ? <Sun className="text-yellow-400 w-5 h-5" /> : <Moon className={`${scrolled ? 'text-gray-700 dark:text-gray-200' : 'text-white'} w-5 h-5`} />}
            </button>
            <button onClick={() => setIsOpen(!isOpen)} className={scrolled ? 'text-gray-900 dark:text-white' : 'text-white'}>
              {isOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Nav */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white dark:bg-accent border-b dark:border-white/10"
          >
            <div className="px-4 pt-2 pb-6 space-y-2">
              {navLinks.map((link) => (
                <NavLink
                  key={link.name}
                  to={link.path}
                  onClick={() => setIsOpen(false)}
                  className="block px-3 py-4 text-base font-medium border-b border-gray-100 dark:border-white/5 last:border-0"
                >
                  {link.name}
                </NavLink>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
