import React from 'react';
import { Button } from "@/components/ui/button";
import { Sparkles, Cpu, UserCheck, Leaf } from 'lucide-react';

const content = {
  es: {
    title: 'Estética Avanzada y Tratamientos Láser',
    subtitle: 'Especialistas en depilación láser, tratamientos faciales y rejuvenecimiento con tecnología avanzada.',
    cta1: 'Agendar Cita',
    cta2: 'Ver Servicios',
    chips: [
      { icon: UserCheck, text: 'Evaluación personalizada' },
      { icon: Cpu, text: 'Tecnología avanzada' },
      { icon: Sparkles, text: 'Cuidado profesional' },
      { icon: Leaf, text: 'Resultados naturales' }
    ]
  },
  en: {
    title: 'Advanced Aesthetics & Laser Treatments',
    subtitle: 'Specialists in laser hair removal, facial treatments, and advanced rejuvenation.',
    cta1: 'Book Appointment',
    cta2: 'View Services',
    chips: [
      { icon: UserCheck, text: 'Personalized evaluation' },
      { icon: Cpu, text: 'Advanced technology' },
      { icon: Sparkles, text: 'Professional care' },
      { icon: Leaf, text: 'Natural results' }
    ]
  }
};

export default function Hero({ lang, onBookClick, onServicesClick }) {
  const t = content[lang];

  return (
    <section className="relative min-h-[90vh] bg-[#F4EEE6] flex items-center">
      {/* Subtle gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#F4EEE6] via-[#F4EEE6] to-[#E9DDCF] opacity-60" />
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 py-28 md:py-36">
        <div className="max-w-3xl">
          {/* Headline */}
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-light text-[#241814] leading-tight tracking-tight mb-6">
            {t.title}
          </h1>
          
          {/* Subtitle */}
          <p className="text-lg md:text-xl text-[#6E5B50] leading-relaxed mb-10 max-w-2xl">
            {t.subtitle}
          </p>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 mb-14">
            <Button
              onClick={onBookClick}
              className="bg-[#B07A7A] hover:bg-[#9A6969] text-white px-8 py-6 text-base font-medium rounded-md transition-all"
            >
              {t.cta1}
            </Button>
            <Button
              onClick={onServicesClick}
              variant="outline"
              className="border-[rgba(36,24,20,0.2)] text-[#241814] hover:bg-[#E9DDCF] px-8 py-6 text-base font-medium rounded-md transition-all"
            >
              {t.cta2}
            </Button>
          </div>

          {/* Trust Chips */}
          <div className="flex flex-wrap gap-3">
            {t.chips.map((chip, idx) => (
              <div 
                key={idx}
                className="flex items-center gap-2 px-4 py-2 bg-[#FFFCF8] border border-[rgba(36,24,20,0.08)] rounded-full"
              >
                <chip.icon className="w-4 h-4 text-[#C7AE86]" />
                <span className="text-sm text-[#6E5B50]">{chip.text}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Decorative element */}
      <div className="absolute right-0 top-1/2 -translate-y-1/2 w-1/3 h-2/3 bg-gradient-to-l from-[#E9DDCF]/30 to-transparent hidden lg:block" />
    </section>
  );
}