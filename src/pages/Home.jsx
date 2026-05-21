import React, { useState } from 'react';
import Hero from '../components/Hero';
import { ugandanDestinations, testimonials, sampleItinerary } from '../data/ugandaData';
import { Star, MapPin, ArrowRight, Quote, CheckCircle2, ChevronDown, Send } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';

const FAQItem = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="border-b border-gray-100 dark:border-white/5">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-full py-6 flex justify-between items-center text-left group"
      >
        <span className="text-lg font-bold group-hover:text-primary transition-colors">{question}</span>
        <ChevronDown className={`transition-transform duration-300 ${isOpen ? 'rotate-180 text-primary' : 'text-gray-400'}`} />
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden"
          >
            <p className="pb-6 text-gray-500 dark:text-gray-400 leading-relaxed">
              {answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const DestinationCard = ({ destination }) => (
  <motion.div 
    layout
    initial={{ opacity: 0, scale: 0.9 }}
    animate={{ opacity: 1, scale: 1 }}
    exit={{ opacity: 0, scale: 0.9 }}
    whileHover={{ y: -10 }}
    className="bg-white dark:bg-[#1A1A1A] rounded-3xl overflow-hidden shadow-2xl border border-gray-100 dark:border-white/5 group"
  >
    <div className="relative h-72 overflow-hidden">
      <img 
        src={destination.image} 
        alt={destination.name}
        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
      />
      <div className="absolute top-6 right-6 bg-white/90 dark:bg-black/80 backdrop-blur-md px-4 py-1.5 rounded-full flex items-center space-x-1 shadow-lg">
        <Star className="w-4 h-4 text-primary fill-primary" />
        <span className="text-sm font-bold">{destination.rating}</span>
      </div>
      <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/80 to-transparent">
        <div className="flex items-center text-white/90 text-xs font-bold uppercase tracking-widest">
          <MapPin className="w-3 h-3 mr-1 text-primary" />
          {destination.location}
        </div>
      </div>
    </div>
    <div className="p-8">
      <h3 className="text-2xl font-bold mb-3 font-serif group-hover:text-primary transition-colors leading-tight">{destination.name}</h3>
      <p className="text-gray-500 dark:text-gray-400 text-sm mb-6 line-clamp-2 leading-relaxed">
        {destination.description}
      </p>
      <div className="flex justify-between items-center pt-6 border-t dark:border-white/10">
        <div>
          <span className="text-[10px] text-gray-400 uppercase tracking-[0.2em] font-bold">Starting from</span>
          <div className="text-2xl font-bold text-primary">
            {new Intl.NumberFormat('en-UG', { style: 'currency', currency: 'UGX', maximumFractionDigits: 0 }).format(destination.price)}
          </div>
        </div>
        <Link 
          to="/reservations" 
          className="w-12 h-12 bg-gray-50 dark:bg-white/5 rounded-full flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-all shadow-inner"
        >
          <ArrowRight className="w-5 h-5" />
        </Link>
      </div>
    </div>
  </motion.div>
);

const Home = () => {
  const [filter, setFilter] = useState('All');
  const categories = ['All', 'Wildlife', 'Adventure', 'Water Sports', 'Wilderness'];

  const filteredDestinations = filter === 'All' 
    ? ugandanDestinations 
    : ugandanDestinations.filter(d => d.category === filter);

  React.useEffect(() => {
    if (window.location.hash === '#destinations') {
      const element = document.getElementById('destinations');
      if (element) element.scrollIntoView({ behavior: 'smooth' });
    }
  }, []);

  return (
    <div className="pb-20">
      <Hero />
      
      {/* Featured Section */}
      <section id="destinations" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-32 relative">
        <div className="text-center mb-16">
          <motion.span 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-primary font-bold tracking-[0.4em] uppercase text-xs"
          >
            The Pearl of Africa
          </motion.span>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-4xl md:text-6xl font-serif font-bold mt-6 mb-8"
          >
            Curated Destinations
          </motion.h2>
          
          {/* Filters */}
          <div className="flex flex-wrap justify-center gap-3 mb-16">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`px-6 py-2 rounded-full text-sm font-medium transition-all ${filter === cat ? 'bg-primary text-white shadow-lg shadow-primary/30' : 'bg-gray-100 dark:bg-white/5 hover:bg-gray-200 dark:hover:bg-white/10'}`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        <motion.div 
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10"
        >
          <AnimatePresence mode="popLayout">
            {filteredDestinations.map((dest) => (
              <DestinationCard key={dest.id} destination={dest} />
            ))}
          </AnimatePresence>
        </motion.div>
      </section>

      {/* Experience Section with Parallax Feel */}
      <section className="bg-primary/[0.03] dark:bg-primary/[0.05] py-32 mt-32 pattern-bg overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col lg:flex-row items-center gap-20">
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="flex-1 relative"
          >
            <div className="absolute -top-10 -left-10 w-40 h-40 bg-primary/10 rounded-full blur-3xl" />
            <img 
              src="https://images.unsplash.com/photo-1540573133985-87b6da6d54a9?auto=format&fit=crop&q=80&w=800" 
              alt="Experience Uganda" 
              className="rounded-[3rem] shadow-2xl relative z-10"
            />
            <div className="absolute -bottom-6 -right-6 bg-white dark:bg-accent p-8 rounded-3xl shadow-xl z-20 hidden md:block">
              <div className="text-4xl font-bold text-primary mb-1">10+</div>
              <div className="text-xs font-bold uppercase tracking-wider text-gray-500">Years of Luxury</div>
            </div>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="flex-1 space-y-8"
          >
            <h2 className="text-4xl md:text-6xl font-serif font-bold leading-tight">Beyond a Safari, <br/><span className="text-primary">A Connection.</span></h2>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed text-lg italic">
              "Uganda is a fairy-tale. You climb up a railway instead of a beanstalk, and at the end there is a wonderful new world." — Winston Churchill
            </p>
            <div className="space-y-4">
              {['Elite Local Private Guides', 'Sustainable Luxury Eco-Lodges', 'VIP Airport Fast-Track'].map((item) => (
                <div key={item} className="flex items-center space-x-4">
                  <CheckCircle2 className="text-primary w-6 h-6" />
                  <span className="font-semibold text-lg">{item}</span>
                </div>
              ))}
            </div>
            <button className="px-10 py-4 bg-accent dark:bg-primary text-white rounded-full font-bold hover:scale-105 transition-transform shadow-xl">
              Design Your Journey
            </button>
          </motion.div>
        </div>
      </section>

      {/* Cinematic Video Section - Epic Redesign */}
      <section className="relative h-screen w-full overflow-hidden flex items-center justify-center">
        {/* Background Video */}
        <video 
          autoPlay 
          muted 
          loop 
          playsInline
          className="absolute inset-0 w-full h-full object-cover scale-105"
        >
          <source src="https://assets.mixkit.co/videos/preview/mixkit-african-savanna-at-sunset-4122-large.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        
        {/* Cinematic Overlays */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black/80" />
        <div className="absolute inset-0 bg-black/20 backdrop-blur-[1px]" />
        
        {/* Letterbox Effect (Top/Bottom cinematic bars) */}
        <div className="absolute top-0 left-0 right-0 h-16 bg-black z-20 opacity-40 md:opacity-60" />
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-black z-20 opacity-40 md:opacity-60" />

        <div className="relative z-10 w-full max-w-7xl mx-auto px-4 md:px-8">
          <div className="flex flex-col items-center text-center space-y-8">
            {/* Floating Badge */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="px-6 py-2 glass rounded-full border border-white/20 shadow-2xl"
            >
              <span className="text-primary font-bold tracking-[0.5em] text-[10px] uppercase">Immersion</span>
            </motion.div>

            {/* Main Headline */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.8 }}
              className="space-y-4"
            >
              <h2 className="text-5xl md:text-9xl font-serif font-bold text-white tracking-tight">
                The Pearl <br className="hidden md:block"/>
                <span className="text-primary italic">of Africa</span>
              </h2>
            </motion.div>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 1 }}
              className="text-white/70 text-lg md:text-2xl font-light max-w-3xl leading-relaxed italic"
            >
              "In the heart of the continent lies a world of untamed majesty. From the roar of the falls to the silence of the forest, Uganda is not just a destination—it is an awakening."
            </motion.p>

            {/* CTA Button */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
            >
              <button className="group relative px-12 py-5 overflow-hidden rounded-full bg-white text-black font-bold transition-all hover:bg-primary hover:text-white">
                <span className="relative z-10 flex items-center space-x-3">
                  <span>Begin the Adventure</span>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
                </span>
                <div className="absolute inset-0 bg-primary translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
              </button>
            </motion.div>
          </div>
        </div>

        {/* Decorative Scroll Hint */}
        <motion.div 
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="absolute bottom-24 left-1/2 -translate-x-1/2 flex flex-col items-center space-y-2 opacity-50"
        >
          <div className="w-[1px] h-12 bg-gradient-to-b from-transparent to-white" />
          <span className="text-[8px] uppercase tracking-[0.3em] text-white font-bold">Scroll</span>
        </motion.div>
      </section>

      {/* Signature Experience Section */}
      <section className="py-32 bg-white dark:bg-[#0A0A0A] overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-24">
            <motion.span 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              className="text-primary font-bold tracking-[0.4em] uppercase text-xs"
            >
              The Signature Journey
            </motion.span>
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="text-4xl md:text-7xl font-serif font-bold mt-6"
            >
              A Three-Day Masterpiece
            </motion.h2>
          </div>

          <div className="space-y-32">
            {sampleItinerary.map((item, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                className={`flex flex-col lg:items-center gap-12 lg:gap-24 ${idx % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'}`}
              >
                {/* Image Side */}
                <div className="flex-1 relative group">
                  <div className="absolute -inset-4 bg-primary/5 rounded-[3rem] scale-95 group-hover:scale-100 transition-transform duration-700" />
                  <div className="relative h-[400px] md:h-[500px] overflow-hidden rounded-[2.5rem] shadow-2xl">
                    <img 
                      src={item.image} 
                      alt={item.title} 
                      className="w-full h-full object-cover transition-transform duration-[2000ms] group-hover:scale-110"
                    />
                    <div className="absolute top-8 left-8 bg-white/90 dark:bg-black/80 backdrop-blur-md px-6 py-2 rounded-full shadow-xl">
                      <span className="text-primary font-bold tracking-widest">{item.day}</span>
                    </div>
                  </div>
                </div>

                {/* Content Side */}
                <div className="flex-1 space-y-6 lg:px-12">
                  <div className="w-12 h-1 bg-primary/30" />
                  <h3 className="text-3xl md:text-5xl font-serif font-bold leading-tight">{item.title}</h3>
                  <p className="text-gray-600 dark:text-gray-400 text-lg leading-relaxed font-light">
                    {item.description}
                  </p>
                  <ul className="grid grid-cols-2 gap-4 pt-4">
                    {['Luxury Lodge', 'Private Guide', 'Gourmet Dining', 'VIP Service'].map((feat) => (
                      <li key={feat} className="flex items-center space-x-2 text-sm font-medium text-gray-500">
                        <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                  <button className="pt-8 text-primary font-bold uppercase tracking-widest text-sm flex items-center group">
                    View Day Details 
                    <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-2" />
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="bg-white dark:bg-[#080808] py-32 border-t dark:border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Quote className="w-12 h-12 text-primary/20 mx-auto mb-8" />
          <h2 className="text-3xl md:text-5xl font-serif font-bold mb-20">Traveler Voices</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {testimonials.map((t) => (
              <motion.div 
                key={t.id}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                className="p-10 bg-gray-50 dark:bg-white/5 rounded-[2.5rem] relative"
              >
                <img src={t.avatar} className="w-20 h-20 rounded-full mx-auto mb-6 border-4 border-white dark:border-black shadow-xl -mt-20" alt={t.name} />
                <p className="text-gray-600 dark:text-gray-400 mb-8 italic leading-loose">"{t.text}"</p>
                <div className="font-bold text-lg">{t.name}</div>
                <div className="text-primary text-xs font-bold uppercase tracking-widest mt-1">{t.country}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Counter Section */}
      <section className="py-24 bg-primary text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-12 text-center">
            {[
              { label: "Gorilla Population", value: "50%", suffix: "" },
              { label: "Bird Species", value: "1,000", suffix: "+" },
              { label: "National Parks", value: "10", suffix: "" },
              { label: "Safe Journeys", value: "5,000", suffix: "+" }
            ].map((stat, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                <div className="text-4xl md:text-6xl font-serif font-bold mb-2">
                  {stat.value}{stat.suffix}
                </div>
                <div className="text-xs font-bold uppercase tracking-widest opacity-80">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-32 max-w-4xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-serif font-bold mb-4">Common Inquiries</h2>
          <p className="text-gray-500">Everything you need to know before your journey</p>
        </div>
        <div className="space-y-2">
          <FAQItem 
            question="When is the best time to visit Uganda?" 
            answer="The best time is during the dry seasons from June to August and December to February. This is ideal for gorilla trekking and wildlife viewing as animals gather around water sources."
          />
          <FAQItem 
            question="Do I need a visa to enter Uganda?" 
            answer="Most nationalities require an e-Visa, which should be applied for in advance via the official Ugandan Immigration portal. We recommend doing this at least 2 weeks before travel."
          />
          <FAQItem 
            question="Is it safe to track gorillas in Bwindi?" 
            answer="Yes, gorilla trekking is highly regulated and safe. You will be accompanied by professional armed rangers and experienced guides at all times during the trek."
          />
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="max-w-7xl mx-auto px-4 mb-32">
        <div className="glass p-12 md:p-24 rounded-[3rem] text-center relative overflow-hidden">
          <div className="absolute -top-24 -left-24 w-64 h-64 bg-primary/10 rounded-full blur-3xl" />
          <div className="absolute -bottom-24 -right-24 w-64 h-64 bg-primary/10 rounded-full blur-3xl" />
          
          <div className="relative z-10 max-w-2xl mx-auto space-y-8">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4"
            >
              <Send className="text-primary w-8 h-8" />
            </motion.div>
            <h2 className="text-3xl md:text-6xl font-serif font-bold">The Inner Circle</h2>
            <p className="text-gray-500 dark:text-gray-400 text-lg">
              Join our exclusive community of travelers. Receive seasonal luxury offers and hidden gem itineraries directly in your inbox.
            </p>
            <form 
              onSubmit={(e) => {
                e.preventDefault();
                Swal.fire({
                  title: 'Welcome to the Circle!',
                  text: 'You have successfully subscribed to our luxury newsletter.',
                  icon: 'success',
                  confirmButtonColor: '#B8860B'
                });
              }}
              className="flex flex-col md:flex-row gap-4 max-w-lg mx-auto"
            >
              <input 
                type="email" 
                required 
                placeholder="Your email address" 
                className="flex-1 px-8 py-4 bg-white dark:bg-black border border-gray-100 dark:border-white/10 rounded-full outline-none focus:ring-2 focus:ring-primary"
              />
              <button className="px-10 py-4 bg-primary text-white rounded-full font-bold hover:scale-105 transition-transform shadow-xl">
                Subscribe
              </button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
