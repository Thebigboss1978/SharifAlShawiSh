import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MapPin, Search, Star, Phone, MessageCircle, CheckCircle2, Loader2, ArrowRight } from 'lucide-react';

interface HotelData {
  name: string;
  rating: number;
  reviews: number;
  phone: string;
  originalPrice: number;
  discountedPrice: number;
  images: string[];
  description: string;
}

export function HotelGenerator() {
  const [url, setUrl] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [hotelData, setHotelData] = useState<HotelData | null>(null);

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!url) return;

    setIsGenerating(true);
    // Simulate API call to extract data from Google Maps
    await new Promise(resolve => setTimeout(resolve, 2500));
    
    // Mock data for "Sky Hotel Pyramids View INN"
    setHotelData({
      name: "Sky Hotel Pyramids View INN",
      rating: 4.8,
      reviews: 1240,
      phone: "+20 123 456 7890",
      originalPrice: 150,
      discountedPrice: 120, // 777 Discount
      images: [
        "https://images.unsplash.com/photo-1539650116574-8efeb43e2750?auto=format&fit=crop&q=80&w=1000",
        "https://images.unsplash.com/photo-1590523277543-a94d2e4eb00b?auto=format&fit=crop&q=80&w=1000",
        "https://images.unsplash.com/photo-1580834345972-328d0856dea3?auto=format&fit=crop&q=80&w=1000"
      ],
      description: "Experience the majesty of the Great Pyramids from your private balcony. Located in the heart of Nazlet El-Semman, our luxury inn offers unparalleled views, authentic Egyptian hospitality, and modern amenities."
    });
    setIsGenerating(false);
  };

  const handleCall = () => {
    if (window.confirm("Open phone dialer to call " + hotelData?.name + "?")) {
      window.location.href = `tel:${hotelData?.phone.replace(/\s/g, '')}`;
    }
  };

  const handleWhatsApp = () => {
    if (window.confirm("Open WhatsApp to message " + hotelData?.name + "?")) {
      window.open(`https://wa.me/${hotelData?.phone.replace(/[^0-9+]/g, '')}`, '_blank');
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-serif font-bold mb-4">
          Automated Hotel <span className="text-gradient-gold">Landing Pages</span>
        </h1>
        <p className="text-gray-400 max-w-2xl mx-auto">
          Paste a Google Maps link of a hotel in Giza, and our AI will extract the details to generate a luxury landing page with exclusive "777 Discounts".
        </p>
      </div>

      <div className="max-w-3xl mx-auto mb-16">
        <form onSubmit={handleGenerate} className="relative">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <MapPin className="text-gray-500" size={20} />
          </div>
          <input
            type="url"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="https://maps.google.com/..."
            className="w-full pl-12 pr-32 py-4 bg-[var(--color-nile-blue-light)] border border-[var(--color-pharaoh-gold)]/30 rounded-full text-white placeholder-gray-500 focus:outline-none focus:border-[var(--color-pharaoh-gold)] focus:ring-1 focus:ring-[var(--color-pharaoh-gold)] transition-all"
            required
          />
          <button
            type="submit"
            disabled={isGenerating}
            className="absolute inset-y-2 right-2 px-6 bg-[var(--color-pharaoh-gold)] text-black font-bold rounded-full hover:bg-[var(--color-pharaoh-gold-light)] transition-colors disabled:opacity-70 flex items-center gap-2"
          >
            {isGenerating ? (
              <Loader2 className="animate-spin" size={18} />
            ) : (
              <>
                Generate <ArrowRight size={16} />
              </>
            )}
          </button>
        </form>
      </div>

      <AnimatePresence>
        {hotelData && (
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            className="glass-panel rounded-3xl overflow-hidden border border-[var(--color-pharaoh-gold)]/40"
          >
            {/* Hero Image */}
            <div className="relative h-[400px] md:h-[500px] w-full">
              <img 
                src={hotelData.images[0]} 
                alt={hotelData.name}
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-obsidian)] via-[var(--color-obsidian)]/50 to-transparent"></div>
              
              <div className="absolute bottom-0 left-0 w-full p-8 md:p-12">
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                  <div>
                    <div className="flex items-center gap-2 mb-3">
                      <div className="flex items-center text-[var(--color-pharaoh-gold)]">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} size={18} fill={i < Math.floor(hotelData.rating) ? "currentColor" : "none"} />
                        ))}
                      </div>
                      <span className="text-white font-medium">{hotelData.rating}</span>
                      <span className="text-gray-400 text-sm">({hotelData.reviews} reviews)</span>
                    </div>
                    <h2 className="text-4xl md:text-5xl font-serif font-bold text-white mb-2">{hotelData.name}</h2>
                    <p className="text-gray-300 flex items-center gap-2">
                      <MapPin size={16} className="text-[var(--color-pharaoh-gold)]" />
                      Nazlet El-Semman, Giza, Egypt
                    </p>
                  </div>
                  
                  <div className="bg-[var(--color-nile-blue)]/80 backdrop-blur-md p-6 rounded-2xl border border-[var(--color-pharaoh-gold)]/30 min-w-[250px]">
                    <div className="text-sm text-gray-400 mb-1 uppercase tracking-wider font-semibold">AlArab Club 777 Price</div>
                    <div className="flex items-baseline gap-3 mb-2">
                      <span className="text-4xl font-bold text-[var(--color-pharaoh-gold)]">${hotelData.discountedPrice}</span>
                      <span className="text-lg text-gray-500 line-through">${hotelData.originalPrice}</span>
                      <span className="text-xs text-green-400 font-medium px-2 py-1 bg-green-400/10 rounded-full">Save 20%</span>
                    </div>
                    <p className="text-xs text-gray-400 mb-4">per night, taxes included</p>
                    <button className="w-full py-3 bg-[var(--color-pharaoh-gold)] text-black font-bold rounded-xl hover:bg-[var(--color-pharaoh-gold-light)] transition-colors">
                      Book Now
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Content Section */}
            <div className="p-8 md:p-12 grid grid-cols-1 lg:grid-cols-3 gap-12">
              <div className="lg:col-span-2">
                <h3 className="text-2xl font-serif font-bold mb-4 text-[var(--color-pharaoh-gold)]">About the Hotel</h3>
                <p className="text-gray-300 leading-relaxed mb-8 text-lg">
                  {hotelData.description}
                </p>
                
                <h3 className="text-xl font-serif font-bold mb-4 text-white">Amenities</h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-8">
                  {['Pyramids View', 'Free WiFi', 'Airport Shuttle', 'Restaurant', 'Room Service', 'Air Conditioning'].map((amenity, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-gray-300">
                      <CheckCircle2 size={16} className="text-[var(--color-pharaoh-gold)]" />
                      <span>{amenity}</span>
                    </div>
                  ))}
                </div>

                <div className="grid grid-cols-2 gap-4">
                  {hotelData.images.slice(1).map((img, idx) => (
                    <img 
                      key={idx} 
                      src={img} 
                      alt={`Gallery ${idx + 1}`} 
                      className="w-full h-48 object-cover rounded-xl border border-[var(--color-pharaoh-gold)]/20"
                      referrerPolicy="no-referrer"
                    />
                  ))}
                </div>
              </div>

              {/* Smart Call System */}
              <div className="bg-[var(--color-nile-blue-light)]/50 p-8 rounded-2xl border border-[var(--color-pharaoh-gold)]/20 h-fit">
                <h3 className="text-xl font-serif font-bold mb-6 text-center text-white">Smart Contact System</h3>
                <p className="text-sm text-gray-400 text-center mb-8">
                  Connect directly with {hotelData.name} reception. No commissions, just direct booking.
                </p>
                
                <div className="flex flex-col gap-4">
                  <button 
                    onClick={handleCall}
                    className="flex items-center justify-center gap-3 w-full py-4 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl transition-colors text-white font-medium"
                  >
                    <Phone className="text-[var(--color-pharaoh-gold)]" size={20} />
                    Call Direct
                  </button>
                  
                  <button 
                    onClick={handleWhatsApp}
                    className="flex items-center justify-center gap-3 w-full py-4 bg-[#25D366]/10 hover:bg-[#25D366]/20 border border-[#25D366]/30 rounded-xl transition-colors text-white font-medium"
                  >
                    <MessageCircle className="text-[#25D366]" size={20} />
                    WhatsApp Message
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
