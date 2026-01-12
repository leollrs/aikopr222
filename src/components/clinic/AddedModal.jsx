import React from 'react';
import { Check } from 'lucide-react';
import { Button } from "@/components/ui/button";

export default function AddedModal({ isOpen, onClose, onAddMore, onContinue, lang, serviceName }) {
  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50"
        onClick={onClose}
      />
      
      {/* Modal */}
      <div className="fixed inset-0 flex items-center justify-center z-50 p-4">
        <div className="bg-[#FFFCF8] rounded-2xl max-w-sm w-full p-6 shadow-2xl text-center">
          {/* Success Icon */}
          <div className="w-16 h-16 bg-[#B07A7A]/10 rounded-full flex items-center justify-center mx-auto mb-4">
            <Check className="w-8 h-8 text-[#B07A7A]" />
          </div>
          
          {/* Message */}
          <h3 className="text-lg font-medium text-[#241814] mb-2">
            {lang === 'es' ? '¡Servicio agregado!' : 'Service added!'}
          </h3>
          <p className="text-sm text-[#6E5B50] mb-6">
            {serviceName}
          </p>
          <p className="text-sm text-[#6E5B50] mb-6">
            {lang === 'es' ? '¿Deseas agregar otro servicio?' : 'Would you like to add another service?'}
          </p>

          {/* Buttons */}
          <div className="flex flex-col gap-3">
            <Button
              onClick={onAddMore}
              variant="outline"
              className="w-full border-[rgba(36,24,20,0.15)] text-[#241814] hover:bg-[#F4EEE6] py-3 font-medium rounded-md transition-colors"
            >
              {lang === 'es' ? 'Agregar otro' : 'Add another'}
            </Button>
            <Button
              onClick={onContinue}
              className="w-full bg-[#B07A7A] hover:bg-[#9A6969] text-white py-3 font-medium rounded-md transition-colors"
            >
              {lang === 'es' ? 'Continuar a reserva' : 'Continue to booking'}
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}