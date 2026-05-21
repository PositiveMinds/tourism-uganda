import React from 'react';
import { motion } from 'framer-motion';
import Swal from 'sweetalert2';
import { Mail, Lock, LogIn } from 'lucide-react';
import { Link } from 'react-router-dom';

const Login = () => {
  const handleLogin = (e) => {
    e.preventDefault();
    Swal.fire({
      title: 'Welcome Back!',
      text: 'Redirecting you to your personalized travel dashboard.',
      icon: 'success',
      confirmButtonColor: '#B8860B',
      background: document.documentElement.classList.contains('dark') ? '#1A1A1A' : '#FFFFFF',
      color: document.documentElement.classList.contains('dark') ? '#FFFFFF' : '#000000',
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center pt-24 pb-12 px-4">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="max-w-5xl w-full bg-white dark:bg-[#1A1A1A] rounded-[2rem] shadow-2xl overflow-hidden flex flex-col md:flex-row-reverse"
      >
        {/* Right Side - Image */}
        <div className="md:w-1/2 relative hidden md:block">
          <img 
            src="https://images.unsplash.com/photo-1549366021-9f761d450615?auto=format&fit=crop&q=80&w=1000" 
            alt="Login" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex flex-col justify-end p-12 text-white text-right">
            <h2 className="text-3xl font-serif font-bold mb-4">Your Journey Continues</h2>
            <p className="opacity-80">Sign in to manage your bookings and access exclusive itineraries.</p>
          </div>
        </div>

        {/* Left Side - Form */}
        <div className="md:w-1/2 p-8 md:p-12">
          <div className="text-center mb-10">
            <h1 className="text-3xl font-serif font-bold mb-2">Member Login</h1>
            <p className="text-gray-500 text-sm">Welcome back to Uganda Travel.</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-widest text-gray-500">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                <input 
                  type="email" 
                  required
                  placeholder="john@example.com"
                  className="w-full pl-12 pr-4 py-4 bg-gray-50 dark:bg-white/5 border border-gray-100 dark:border-white/10 rounded-2xl focus:ring-2 focus:ring-primary outline-none transition-all"
                />
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <label className="text-xs font-bold uppercase tracking-widest text-gray-500">Password</label>
                <button type="button" className="text-[10px] text-primary font-bold hover:underline uppercase tracking-tighter">Forgot?</button>
              </div>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                <input 
                  type="password" 
                  required
                  placeholder="••••••••"
                  className="w-full pl-12 pr-4 py-4 bg-gray-50 dark:bg-white/5 border border-gray-100 dark:border-white/10 rounded-2xl focus:ring-2 focus:ring-primary outline-none transition-all"
                />
              </div>
            </div>

            <button 
              type="submit"
              className="w-full py-4 bg-primary hover:bg-primary-dark text-white font-bold rounded-2xl transition-all shadow-lg shadow-primary/30 mt-4 flex items-center justify-center space-x-2"
            >
              <LogIn size={20} />
              <span>Sign In</span>
            </button>
          </form>

          <p className="text-center mt-8 text-sm text-gray-500">
            New to our community? <Link to="/register" className="text-primary font-bold hover:underline">Create Account</Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default Login;
