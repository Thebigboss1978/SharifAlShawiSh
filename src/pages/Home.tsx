import React from 'react';
import { motion } from 'motion/react';
import { ArrowRight, MapPin, Sparkles, Building2 } from 'lucide-react';
import { Link } from 'react-router-dom';

export function Home() {
  return (
    <div className="relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-0 left-0 w-full h-[800px] bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[var(--color-nile-blue)] via-[var(--color-obsidian)] to-[var(--color-obsidian)] -z-10"></div>
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[var(--color-pharaoh-gold)]/10 rounded-full blur-3xl -z-10"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-24">
        <div className="text-center max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[var(--color-pharaoh-gold)]/30 bg-[var(--color-pharaoh-gold)]/10 text-[var(--color-pharaoh-gold)] mb-8"
          >
            <Sparkles size={16} />
            <span className="text-sm font-medium uppercase tracking-wider">The Future of Giza Tourism</span>
          </motion.div>
          
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-5xl md:text-7xl font-serif font-bold mb-6 leading-tight"
          >
            Experience the Pyramids <br />
            <span className="text-gradient-gold">Digitally Reimagined</span>
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-xl text-gray-300 mb-12 max-w-2xl mx-auto font-sans"
          >
            AlArab Club 777 merges ancient Pharaonic history with cutting-edge AI technology. 
            Discover luxury stays, immersive tours, and crypto-consulting in Nazlet El-Semman.
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-col sm:flex-row gap-6 justify-center"
          >
            <Link
              to="/hotel-generator"
              className="group relative inline-flex items-center justify-center gap-3 px-8 py-4 bg-[var(--color-pharaoh-gold)] text-black font-bold rounded-full overflow-hidden transition-all hover:scale-105"
            >
              <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform"></div>
              <Building2 size={20} />
              <span>Generate Hotel Page</span>
              <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
            </Link>
            
            <Link
              to="/image-analyzer"
              className="group inline-flex items-center justify-center gap-3 px-8 py-4 bg-transparent border border-[var(--color-pharaoh-gold)]/50 text-[var(--color-pharaoh-gold)] font-bold rounded-full transition-all hover:bg-[var(--color-pharaoh-gold)]/10"
            >
              <MapPin size={20} />
              <span>Analyze Pyramids Image</span>
            </Link>
          </motion.div>
        </div>
      </div>

      {/* Features Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 border-t border-[var(--color-pharaoh-gold)]/10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              title: "Smart Hotel Generation",
              desc: "Paste a Google Maps link and instantly generate a luxury landing page with dynamic pricing.",
              icon: Building2
            },
            {
              title: "AI Voice Assistant",
              desc: "Interact with our intelligent agent speaking Egyptian Arabic for seamless bookings.",
              icon: Sparkles
            },
            {
              title: "Image Understanding",
              desc: "Upload photos of the Pyramids and let Gemini AI analyze and describe them in detail.",
              icon: MapPin
            }
          ].map((feature, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.2 }}
              className="glass-panel p-8 rounded-2xl border border-[var(--color-pharaoh-gold)]/20 hover:border-[var(--color-pharaoh-gold)]/50 transition-colors"
            >
              <div className="w-14 h-14 rounded-full bg-[var(--color-pharaoh-gold)]/10 flex items-center justify-center mb-6 border border-[var(--color-pharaoh-gold)]/30">
                <feature.icon className="text-[var(--color-pharaoh-gold)]" size={28} />
              </div>
              <h3 className="text-xl font-serif font-bold text-white mb-3">{feature.title}</h3>
              <p className="text-gray-400 leading-relaxed">{feature.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
