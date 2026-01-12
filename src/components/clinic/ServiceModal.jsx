import React from 'react';
import { X, Check } from 'lucide-react';
import { Button } from "@/components/ui/button";

export default function ServiceModal({ service, lang, isOpen, onClose, onAddService }) {
  if (!isOpen || !service) return null;

  const name = lang === 'es' ? service.nameEs : service.nameEn;
  const ideal = lang === 'es' ? service.idealEs : service.idealEn;
  const benefits = lang === 'es' ? service.benefitsEs : service.benefitsEn;
  const desc = lang === 'es' ? service.descEs : service.descEn;

  return (
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50"
        onClick={onClose}
      />
      
      {/* Modal - Desktop centered, Mobile bottom drawer */}
      <div className="fixed inset-x-0 bottom-0 md:inset-0 md:flex md:items-center md:justify-center z-50 p-4 md:p-6">
        <div className="bg-[#FFFCF8] rounded-t-2xl md:rounded-2xl max-w-lg w-full max-h-[85vh] overflow-y-auto shadow-2xl">
          {/* Header */}
          <div className="sticky top-0 bg-[#FFFCF8] px-6 py-4 border-b border-[rgba(36,24,20,0.08)] flex items-center justify-between">
            <h3 className="text-xl font-medium text-[#241814]">{name}</h3>
            <button 
              onClick={onClose}
              className="p-2 hover:bg-[#F4EEE6] rounded-full transition-colors"
            >
              <X className="w-5 h-5 text-[#6E5B50]" />
            </button>
          </div>

          {/* Content */}
          <div className="p-6 space-y-6">
            {/* Meta */}
            <p className="text-sm text-[#6E5B50]">
              {service.duration} · {lang === 'es' ? 'Desde' : 'From'} ${service.price}
            </p>

            {/* Description */}
            <p className="text-[#6E5B50] leading-relaxed">
              {desc}
            </p>

            {/* Ideal for */}
            <div>
              <h4 className="text-sm font-medium text-[#241814] mb-2">
                {lang === 'es' ? 'Ideal para' : 'Ideal for'}
              </h4>
              <p className="text-sm text-[#6E5B50]">{ideal}</p>
            </div>

            {/* Benefits */}
            <div>
              <h4 className="text-sm font-medium text-[#241814] mb-3">
                {lang === 'es' ? 'Beneficios' : 'Benefits'}
              </h4>
              <ul className="space-y-2">
                {benefits.map((benefit, idx) => (
                  <li key={idx} className="flex items-center gap-2 text-sm text-[#6E5B50]">
                    <Check className="w-4 h-4 text-[#C7AE86]" />
                    {benefit}
                  </li>
                ))}
              </ul>
            </div>

            {/* Before/After Case Study */}
            <div className="bg-[#F4EEE6] rounded-lg p-4">
              <h4 className="text-sm font-medium text-[#241814] mb-3">
                {lang === 'es' ? 'Caso destacado' : 'Featured case'}
              </h4>
              
              {/* Placeholder images */}
              <div className="flex gap-3 mb-3">
                <div className="flex-1 aspect-square bg-[#E9DDCF] rounded-lg flex items-center justify-center">
                  <span className="text-xs text-[#6E5B50]">{lang === 'es' ? 'Antes' : 'Before'}</span>
                </div>
                <div className="flex-1 aspect-square bg-[#DBCAB6] rounded-lg flex items-center justify-center">
                  <span className="text-xs text-[#6E5B50]">{lang === 'es' ? 'Después' : 'After'}</span>
                </div>
              </div>
              
              <p className="text-sm text-[#6E5B50]">
                {service.caseStudy.sessions} {lang === 'es' ? 'sesiones' : 'sessions'} · {service.caseStudy.months} {lang === 'es' ? 'meses' : 'months'} · ~{service.caseStudy.improvement} {lang === 'es' ? 'mejora' : 'improvement'}
              </p>
              
              <p className="text-xs text-[#6E5B50]/70 mt-2 italic">
                {lang === 'es' 
                  ? 'Los resultados pueden variar según cada paciente.'
                  : 'Results may vary depending on each patient.'}
              </p>
            </div>
          </div>

          {/* Footer */}
          <div className="sticky bottom-0 bg-[#FFFCF8] px-6 py-4 border-t border-[rgba(36,24,20,0.08)] flex gap-3">
            <Button
              onClick={() => {
                onAddService(service);
                onClose();
              }}
              className="flex-1 bg-[#B07A7A] hover:bg-[#9A6969] text-white py-3 font-medium rounded-md transition-colors"
            >
              {lang === 'es' ? 'Agregar a cita' : 'Add to appointment'}
            </Button>
            <Button
              onClick={onClose}
              variant="outline"
              className="border-[rgba(36,24,20,0.15)] text-[#241814] hover:bg-[#F4EEE6] py-3 px-6 font-medium rounded-md transition-colors"
            >
              {lang === 'es' ? 'Cerrar' : 'Close'}
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}