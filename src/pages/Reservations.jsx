import React, { useState } from 'react';
import Swal from 'sweetalert2';
import { Calendar, Users, MapPin, CreditCard } from 'lucide-react';
import { ugandanDestinations } from '../data/ugandaData';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const Reservations = () => {
  const [formData, setFormData] = useState({
    destination: '',
    date: new Date(),
    guests: '1',
    name: '',
    email: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    Swal.fire({
      title: 'Booking Confirmed!',
      text: `Thank you, ${formData.name}. Your reservation for ${formData.destination} on ${formData.date.toLocaleDateString()} is being processed.`,
      icon: 'success',
      confirmButtonColor: '#B8860B',
      background: document.documentElement.classList.contains('dark') ? '#1A1A1A' : '#FFFFFF',
      color: document.documentElement.classList.contains('dark') ? '#FFFFFF' : '#000000',
    });
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleDateChange = (date) => {
    setFormData({ ...formData, date: date });
  };

  return (
    <div className="pt-32 pb-20 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-6xl font-serif font-bold mb-4">Make a Reservation</h1>
          <p className="text-gray-600 dark:text-gray-400">Secure your spot in the heart of Africa's wilderness.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-2">
            <form onSubmit={handleSubmit} className="bg-white dark:bg-[#1A1A1A] p-8 rounded-3xl shadow-xl space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium flex items-center space-x-2">
                    <MapPin size={16} className="text-primary" />
                    <span>Select Destination</span>
                  </label>
                  <select 
                    name="destination"
                    required
                    onChange={handleChange}
                    className="w-full p-4 bg-gray-50 dark:bg-white/5 border border-gray-100 dark:border-white/10 rounded-xl focus:ring-2 focus:ring-primary outline-none"
                  >
                    <option value="">Choose a place...</option>
                    {ugandanDestinations.map(d => <option key={d.id} value={d.name}>{d.name}</option>)}
                  </select>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium flex items-center space-x-2">
                    <Calendar size={16} className="text-primary" />
                    <span>Preferred Date</span>
                  </label>
                  <DatePicker
                    selected={formData.date}
                    onChange={handleDateChange}
                    minDate={new Date()}
                    portalId="root"
                    placeholderText="Select a date"
                    className="w-full p-4 bg-gray-50 dark:bg-white/5 border border-gray-100 dark:border-white/10 rounded-xl focus:ring-2 focus:ring-primary outline-none cursor-pointer"
                    dateFormat="MMMM d, yyyy"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium flex items-center space-x-2">
                    <Users size={16} className="text-primary" />
                    <span>Number of Guests</span>
                  </label>
                  <input 
                    type="number" 
                    name="guests"
                    min="1"
                    defaultValue="1"
                    onChange={handleChange}
                    className="w-full p-4 bg-gray-50 dark:bg-white/5 border border-gray-100 dark:border-white/10 rounded-xl focus:ring-2 focus:ring-primary outline-none"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium flex items-center space-x-2">
                    <CreditCard size={16} className="text-primary" />
                    <span>Contact Name</span>
                  </label>
                  <input 
                    type="text" 
                    name="name"
                    placeholder="Full Name"
                    required
                    onChange={handleChange}
                    className="w-full p-4 bg-gray-50 dark:bg-white/5 border border-gray-100 dark:border-white/10 rounded-xl focus:ring-2 focus:ring-primary outline-none"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Email Address</label>
                <input 
                  type="email" 
                  name="email"
                  placeholder="email@example.com"
                  required
                  onChange={handleChange}
                  className="w-full p-4 bg-gray-50 dark:bg-white/5 border border-gray-100 dark:border-white/10 rounded-xl focus:ring-2 focus:ring-primary outline-none"
                />
              </div>

              <button 
                type="submit"
                className="w-full py-4 bg-primary hover:bg-primary-dark text-white font-bold rounded-xl transition-all transform hover:scale-[1.02]"
              >
                Confirm Reservation
              </button>
            </form>
          </div>

          <div className="space-y-6">
            <div className="bg-primary text-white p-8 rounded-3xl shadow-lg">
              <h3 className="text-xl font-bold mb-4">Why Book With Us?</h3>
              <ul className="space-y-4 text-sm opacity-90">
                <li className="flex items-start space-x-3">
                  <div className="mt-1">✓</div>
                  <p>Secure payments & instant confirmation</p>
                </li>
                <li className="flex items-start space-x-3">
                  <div className="mt-1">✓</div>
                  <p>Flexible cancellation up to 48 hours</p>
                </li>
                <li className="flex items-start space-x-3">
                  <div className="mt-1">✓</div>
                  <p>24/7 dedicated local support</p>
                </li>
              </ul>
            </div>
            
            <div className="bg-white dark:bg-accent p-8 rounded-3xl shadow-lg border dark:border-white/5">
              <h4 className="font-bold mb-4">Need Help?</h4>
              <p className="text-sm text-gray-500 mb-4">Our travel experts are ready to help you plan your dream trip.</p>
              <button className="text-primary font-bold hover:underline">Contact Support</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reservations;
