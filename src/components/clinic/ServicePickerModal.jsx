import React from 'react';
import { X, Plus } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { services } from './ServicesSection';

export default function ServicePickerModal({ isOpen, onClose, lang, onAddService }) {
  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50"
        onClick={onClose}
      />
      
      {/* Modal */}
      <div className="fixed inset-x-0 bottom-0 md:inset-0 md:flex md:items-center md:justify-center z-50 p-4 md:p-6">
        <div className="bg-[#FFFCF8] rounded-t-2xl md:rounded-2xl max-w-2xl w-full max-h-[80vh] overflow-hidden shadow-2xl">
          {/* Header */}
          <div className="sticky top-0 bg-[#FFFCF8] px-6 py-4 border-b border-[rgba(36,24,20,0.08)] flex items-center justify-between">
            <h3 className="text-xl font-medium text-[#241814]">
              {lang === 'es' ? 'Agregar Servicio' : 'Add Service'}
            </h3>
            <button 
              onClick={onClose}
              className="p-2 hover:bg-[#F4EEE6] rounded-full transition-colors"
            >
              <X className="w-5 h-5 text-[#6E5B50]" />
            </button>
          </div>

          {/* Services List */}
          <div className="overflow-y-auto max-h-[60vh] p-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {services.map(service => (
                <div 
                  key={service.id}
                  className="bg-[#F4EEE6] rounded-lg p-4 flex items-center justify-between"
                >
                  <div>
                    <h4 className="text-sm font-medium text-[#241814]">
                      {lang === 'es' ? service.nameEs : service.nameEn}
                    </h4>
                    <p className="text-xs text-[#6E5B50] mt-1">
                      {service.duration} · ${service.price}
                    </p>
                  </div>
                  <Button
                    onClick={() => {
                      onAddService(service);
                      onClose();
                    }}
                    size="sm"
                    className="bg-[#B07A7A] hover:bg-[#9A6969] text-white"
                  >
                    <Plus className="w-4 h-4" />
                  </Button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}