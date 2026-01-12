import React, { useState, useEffect } from 'react';
import { ShoppingBag } from 'lucide-react';
import { Button } from "@/components/ui/button";

export default function Header({ lang, setLang, cartCount, onCartClick, onBookClick }) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled 
          ? 'bg-[#F4EEE6]/95 backdrop-blur-md border-b border-[rgba(36,24,20,0.12)]' 
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo / Clinic Name */}
          <div className="flex items-center">
            <span className="text-xl md:text-2xl font-light tracking-wide text-[#241814]">
              LUMIÈRE
            </span>
            <span className="hidden sm:inline text-xs text-[#6E5B50] ml-2 tracking-widest uppercase">
              Aesthetic Clinic
            </span>
          </div>

          {/* Right side */}
          <div className="flex items-center gap-3 md:gap-5">
            {/* Language Toggle */}
            <div className="flex items-center text-sm font-medium">
              <button
                onClick={() => setLang('es')}
                className={`px-2 py-1 transition-colors ${
                  lang === 'es' ? 'text-[#241814]' : 'text-[#6E5B50] hover:text-[#241814]'
                }`}
              >
                ES
              </button>
              <span className="text-[#6E5B50]">|</span>
              <button
                onClick={() => setLang('en')}
                className={`px-2 py-1 transition-colors ${
                  lang === 'en' ? 'text-[#241814]' : 'text-[#6E5B50] hover:text-[#241814]'
                }`}
              >
                EN
              </button>
            </div>

            {/* Cart */}
            <button 
              onClick={onCartClick}
              className="relative p-2 text-[#241814] hover:text-[#B07A7A] transition-colors"
            >
              <ShoppingBag className="w-5 h-5" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-[#B07A7A] text-white text-xs rounded-full flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </button>

            {/* CTA Button */}
            <Button
              onClick={onBookClick}
              className="bg-[#B07A7A] hover:bg-[#9A6969] text-white px-4 md:px-6 py-2 text-sm font-medium rounded-md transition-colors"
            >
              {lang === 'es' ? 'Agendar Cita' : 'Book Appointment'}
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}