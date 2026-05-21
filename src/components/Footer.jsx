import React from 'react';
import { Mail, Phone, MapPin, Globe, Share2, MessageSquare } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-accent text-white py-16 dark:bg-black border-t dark:border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          <div className="space-y-4">
            <h3 className="text-2xl font-serif font-bold">Uganda<span className="text-primary">Travel</span></h3>
            <p className="text-gray-400 leading-relaxed">
              Curating luxury experiences across the Pearl of Africa. From gorilla trekking to safari adventures.
            </p>
          </div>
          
          <div>
            <h4 className="font-bold mb-6">Quick Links</h4>
            <ul className="space-y-4 text-gray-400">
              <li><a href="#" className="hover:text-primary transition-colors">About Us</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Destinations</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Tour Packages</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Contact</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold mb-6">Contact Us</h4>
            <ul className="space-y-4 text-gray-400">
              <li className="flex items-center space-x-3">
                <MapPin size={18} className="text-primary" />
                <span>Kampala Road, Kampala, Uganda</span>
              </li>
              <li className="flex items-center space-x-3">
                <Phone size={18} className="text-primary" />
                <span>+256 700 000 000</span>
              </li>
              <li className="flex items-center space-x-3">
                <Mail size={18} className="text-primary" />
                <span>info@ugandatravel.com</span>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold mb-6">Follow Us</h4>
            <div className="flex space-x-4">
              <a href="#" className="p-2 bg-white/5 rounded-full hover:bg-primary transition-colors">
                <Globe size={20} />
              </a>
              <a href="#" className="p-2 bg-white/5 rounded-full hover:bg-primary transition-colors">
                <Share2 size={20} />
              </a>
              <a href="#" className="p-2 bg-white/5 rounded-full hover:bg-primary transition-colors">
                <MessageSquare size={20} />
              </a>
            </div>
          </div>
        </div>
        
        <div className="border-t border-white/10 mt-12 pt-8 text-center text-gray-500 text-sm">
          <p>&copy; {new Date().getFullYear()} Uganda Travel. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
