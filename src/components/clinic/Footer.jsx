import React from 'react';
import { Instagram, Facebook } from 'lucide-react';

export default function Footer({ lang }) {
  return (
    <footer className="bg-[#241814] py-12 md:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
          {/* Brand */}
          <div>
            <h3 className="text-xl font-light text-[#FFFCF8] mb-4">LUMIÈRE</h3>
            <p className="text-sm text-[#FFFCF8]/60 leading-relaxed">
              {lang === 'es' 
                ? 'Especialistas en estética avanzada y tratamientos láser.'
                : 'Specialists in advanced aesthetics and laser treatments.'}
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-sm font-medium text-[#FFFCF8] mb-4 uppercase tracking-wider">
              {lang === 'es' ? 'Enlaces' : 'Links'}
            </h4>
            <ul className="space-y-2 text-sm text-[#FFFCF8]/60">
              <li><a href="#" className="hover:text-[#FFFCF8] transition-colors">{lang === 'es' ? 'Servicios' : 'Services'}</a></li>
              <li><a href="#" className="hover:text-[#FFFCF8] transition-colors">{lang === 'es' ? 'Resultados' : 'Results'}</a></li>
              <li><a href="#" className="hover:text-[#FFFCF8] transition-colors">{lang === 'es' ? 'Testimonios' : 'Testimonials'}</a></li>
              <li><a href="#" className="hover:text-[#FFFCF8] transition-colors">{lang === 'es' ? 'Contacto' : 'Contact'}</a></li>
            </ul>
          </div>

          {/* Social */}
          <div>
            <h4 className="text-sm font-medium text-[#FFFCF8] mb-4 uppercase tracking-wider">
              {lang === 'es' ? 'Síguenos' : 'Follow Us'}
            </h4>
            <div className="flex gap-4">
              <a href="#" className="w-10 h-10 bg-[#FFFCF8]/10 rounded-full flex items-center justify-center hover:bg-[#FFFCF8]/20 transition-colors">
                <Instagram className="w-5 h-5 text-[#FFFCF8]" />
              </a>
              <a href="#" className="w-10 h-10 bg-[#FFFCF8]/10 rounded-full flex items-center justify-center hover:bg-[#FFFCF8]/20 transition-colors">
                <Facebook className="w-5 h-5 text-[#FFFCF8]" />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-12 pt-8 border-t border-[#FFFCF8]/10 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-[#FFFCF8]/40">
            © 2024 AIKOPR222 Aesthetic Clinic. {lang === 'es' ? 'Todos los derechos reservados.' : 'All rights reserved.'}
          </p>
          <div className="flex gap-6 text-xs text-[#FFFCF8]/40">
            <a href="#" className="hover:text-[#FFFCF8]/60 transition-colors">
              {lang === 'es' ? 'Privacidad' : 'Privacy'}
            </a>
            <a href="#" className="hover:text-[#FFFCF8]/60 transition-colors">
              {lang === 'es' ? 'Términos' : 'Terms'}
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}