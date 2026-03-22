import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import { VoiceAgent } from './VoiceAgent';
import { Pyramid, Map, Image as ImageIcon } from 'lucide-react';

export function Layout() {
  return (
    <div className="min-h-screen flex flex-col font-sans">
      <header className="sticky top-0 z-40 glass-panel border-b border-[var(--color-pharaoh-gold)]/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <Link to="/" className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-[var(--color-pharaoh-gold)]/20 flex items-center justify-center border border-[var(--color-pharaoh-gold)]">
                <Pyramid className="text-[var(--color-pharaoh-gold)]" size={24} />
              </div>
              <div>
                <h1 className="text-xl font-serif font-bold text-gradient-gold tracking-wider uppercase">AlArab Club 777</h1>
                <p className="text-[10px] text-gray-400 tracking-widest uppercase">Nazlet El-Semman</p>
              </div>
            </Link>
            
            <nav className="hidden md:flex items-center gap-8">
              <Link to="/" className="text-sm font-medium text-gray-300 hover:text-[var(--color-pharaoh-gold)] transition-colors">Home</Link>
              <Link to="/hotel-generator" className="text-sm font-medium text-gray-300 hover:text-[var(--color-pharaoh-gold)] transition-colors flex items-center gap-2">
                <Map size={16} />
                Hotel Generator
              </Link>
              <Link to="/image-analyzer" className="text-sm font-medium text-gray-300 hover:text-[var(--color-pharaoh-gold)] transition-colors flex items-center gap-2">
                <ImageIcon size={16} />
                Image Analyzer
              </Link>
            </nav>
          </div>
        </div>
      </header>

      <main className="flex-grow">
        <Outlet />
      </main>

      <footer className="border-t border-[var(--color-pharaoh-gold)]/20 bg-[var(--color-nile-blue-light)]/50 py-8 mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="flex justify-center mb-4">
            <Pyramid className="text-[var(--color-pharaoh-gold)]/50" size={32} />
          </div>
          <p className="text-gray-400 text-sm">Made with love from Nazlet El-Semman</p>
          <p className="text-gray-500 text-xs mt-2">&copy; {new Date().getFullYear()} AlArab Club 777. All rights reserved.</p>
        </div>
      </footer>

      <VoiceAgent />
    </div>
  );
}
