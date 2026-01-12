import React from 'react';
import { Star } from 'lucide-react';

const testimonials = [
  {
    id: 1,
    nameEs: 'María G.',
    nameEn: 'Maria G.',
    serviceEs: 'Depilación Láser',
    serviceEn: 'Laser Hair Removal',
    reviewEs: 'Después de 6 sesiones, mi piel está completamente suave. El equipo es muy profesional y el proceso fue cómodo.',
    reviewEn: 'After 6 sessions, my skin is completely smooth. The team is very professional and the process was comfortable.',
    stars: 5
  },
  {
    id: 2,
    nameEs: 'Carlos M.',
    nameEn: 'Carlos M.',
    serviceEs: 'Eliminación de Tatuaje',
    serviceEn: 'Tattoo Removal',
    reviewEs: 'Excelente resultado. Mi tatuaje antiguo ya casi no se nota. Muy recomendado.',
    reviewEn: 'Excellent result. My old tattoo is barely visible now. Highly recommended.',
    stars: 5
  },
  {
    id: 3,
    nameEs: 'Ana L.',
    nameEn: 'Ana L.',
    serviceEs: 'Hollywood Peel',
    serviceEn: 'Hollywood Peel',
    reviewEs: 'Mi piel nunca había lucido tan radiante. Perfecto para eventos especiales.',
    reviewEn: 'My skin has never looked so radiant. Perfect for special events.',
    stars: 5
  },
  {
    id: 4,
    nameEs: 'Roberto S.',
    nameEn: 'Roberto S.',
    serviceEs: 'HIFU Rejuvenecimiento',
    serviceEn: 'HIFU Rejuvenation',
    reviewEs: 'Noté mejoras desde la primera sesión. El lifting es natural y sin cirugía.',
    reviewEn: 'I noticed improvements from the first session. The lift is natural and non-surgical.',
    stars: 5
  }
];

export default function TestimonialsSection({ lang }) {
  return (
    <section className="bg-[#F4EEE6] py-16 md:py-20 lg:py-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10">
        {/* Section Header */}
        <div className="text-center mb-10 md:mb-12">
          <h2 className="text-3xl md:text-4xl font-light text-[#241814] mb-4">
            {lang === 'es' ? 'Lo Que Dicen Nuestros Pacientes' : 'What Our Patients Say'}
          </h2>
          <p className="text-[#6E5B50] max-w-2xl mx-auto">
            {lang === 'es' 
              ? 'Testimonios reales de quienes han confiado en nosotros.'
              : 'Real testimonials from those who have trusted us.'}
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {testimonials.map((testimonial) => (
            <div 
              key={testimonial.id}
              className="bg-[#FFFCF8] rounded-lg p-6 border border-[rgba(36,24,20,0.08)] shadow-sm"
            >
              {/* Stars */}
              <div className="flex gap-1 mb-4">
                {[...Array(testimonial.stars)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-[#C7AE86] text-[#C7AE86]" />
                ))}
              </div>
              
              {/* Review */}
              <p className="text-sm text-[#6E5B50] leading-relaxed mb-4">
                "{lang === 'es' ? testimonial.reviewEs : testimonial.reviewEn}"
              </p>
              
              {/* Author */}
              <div className="border-t border-[rgba(36,24,20,0.08)] pt-4">
                <p className="text-sm font-medium text-[#241814]">
                  {lang === 'es' ? testimonial.nameEs : testimonial.nameEn}
                </p>
                <p className="text-xs text-[#6E5B50] mt-0.5">
                  {lang === 'es' ? testimonial.serviceEs : testimonial.serviceEn}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}