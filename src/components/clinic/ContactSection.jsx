import React from 'react';
import { MapPin, Phone, Mail, Clock } from 'lucide-react';

export default function ContactSection({ lang }) {
  return (
    <section className="bg-[#F4EEE6] py-16 md:py-20 lg:py-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10">
        {/* Section Header */}
        <div className="text-center mb-10 md:mb-12">
          <h2 className="text-3xl md:text-4xl font-light text-[#241814] mb-4">
            {lang === 'es' ? 'Contáctanos' : 'Contact Us'}
          </h2>
          <p className="text-[#6E5B50] max-w-2xl mx-auto">
            {lang === 'es' 
              ? 'Estamos aquí para responder tus preguntas.'
              : 'We are here to answer your questions.'}
          </p>
        </div>

        {/* Contact Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {/* Location */}
          <div className="bg-[#FFFCF8] rounded-lg p-6 border border-[rgba(36,24,20,0.08)] text-center">
            <div className="w-12 h-12 bg-[#B07A7A]/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <MapPin className="w-5 h-5 text-[#B07A7A]" />
            </div>
            <h3 className="text-sm font-medium text-[#241814] mb-2">
              {lang === 'es' ? 'Ubicación' : 'Location'}
            </h3>
            <p className="text-sm text-[#6E5B50]">
              Av. Principal #123<br />
              Ciudad, CP 12345
            </p>
          </div>

          {/* Phone */}
          <div className="bg-[#FFFCF8] rounded-lg p-6 border border-[rgba(36,24,20,0.08)] text-center">
            <div className="w-12 h-12 bg-[#B07A7A]/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <Phone className="w-5 h-5 text-[#B07A7A]" />
            </div>
            <h3 className="text-sm font-medium text-[#241814] mb-2">
              {lang === 'es' ? 'Teléfono' : 'Phone'}
            </h3>
            <p className="text-sm text-[#6E5B50]">
              +1 (555) 123-4567
            </p>
          </div>

          {/* Email */}
          <div className="bg-[#FFFCF8] rounded-lg p-6 border border-[rgba(36,24,20,0.08)] text-center">
            <div className="w-12 h-12 bg-[#B07A7A]/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <Mail className="w-5 h-5 text-[#B07A7A]" />
            </div>
            <h3 className="text-sm font-medium text-[#241814] mb-2">
              {lang === 'es' ? 'Correo' : 'Email'}
            </h3>
            <p className="text-sm text-[#6E5B50]">
              info@aikopr222.clinic
            </p>
          </div>

          {/* Hours */}
          <div className="bg-[#FFFCF8] rounded-lg p-6 border border-[rgba(36,24,20,0.08)] text-center">
            <div className="w-12 h-12 bg-[#B07A7A]/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <Clock className="w-5 h-5 text-[#B07A7A]" />
            </div>
            <h3 className="text-sm font-medium text-[#241814] mb-2">
              {lang === 'es' ? 'Horario' : 'Hours'}
            </h3>
            <p className="text-sm text-[#6E5B50]">
              {lang === 'es' ? 'Lun - Sáb: 9am - 6pm' : 'Mon - Sat: 9am - 6pm'}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}