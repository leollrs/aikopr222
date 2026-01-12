import React from 'react';
import { X, Trash2, ShoppingBag } from 'lucide-react';
import { Button } from "@/components/ui/button";

export default function CartDrawer({ isOpen, onClose, cart, lang, onRemove, onClear, onContinue }) {
  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50"
        onClick={onClose}
      />
      
      {/* Drawer */}
      <div className="fixed inset-y-0 right-0 w-full max-w-md bg-[#FFFCF8] shadow-2xl z-50 flex flex-col">
        {/* Header */}
        <div className="px-6 py-4 border-b border-[rgba(36,24,20,0.08)] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 text-[#241814]" />
            <h3 className="text-lg font-medium text-[#241814]">
              {lang === 'es' ? 'Tu Selección' : 'Your Selection'}
            </h3>
          </div>
          <button 
            onClick={onClose}
            className="p-2 hover:bg-[#F4EEE6] rounded-full transition-colors"
          >
            <X className="w-5 h-5 text-[#6E5B50]" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6">
          {cart.length === 0 ? (
            <div className="text-center py-12">
              <ShoppingBag className="w-12 h-12 text-[#E9DDCF] mx-auto mb-4" />
              <p className="text-[#6E5B50]">
                {lang === 'es' ? 'No hay servicios seleccionados' : 'No services selected'}
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {cart.map((service, idx) => (
                <div 
                  key={`${service.id}-${idx}`}
                  className="bg-[#F4EEE6] rounded-lg p-4 flex items-start justify-between"
                >
                  <div>
                    <h4 className="font-medium text-[#241814] text-sm">
                      {lang === 'es' ? service.nameEs : service.nameEn}
                    </h4>
                    <p className="text-xs text-[#6E5B50] mt-1">
                      {service.duration} · ${service.price}
                    </p>
                  </div>
                  <button
                    onClick={() => onRemove(idx)}
                    className="p-2 text-[#6E5B50] hover:text-[#B07A7A] transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        {cart.length > 0 && (
          <div className="px-6 py-4 border-t border-[rgba(36,24,20,0.08)] space-y-3">
            <div className="flex justify-between text-sm">
              <span className="text-[#6E5B50]">{lang === 'es' ? 'Servicios' : 'Services'}</span>
              <span className="text-[#241814] font-medium">{cart.length}</span>
            </div>
            
            <Button
              onClick={onContinue}
              className="w-full bg-[#B07A7A] hover:bg-[#9A6969] text-white py-3 font-medium rounded-md transition-colors"
            >
              {lang === 'es' ? 'Continuar a reserva' : 'Continue to booking'}
            </Button>
            
            <Button
              onClick={onClear}
              variant="outline"
              className="w-full border-[rgba(36,24,20,0.15)] text-[#6E5B50] hover:bg-[#F4EEE6] py-2.5 text-sm font-medium rounded-md transition-colors"
            >
              {lang === 'es' ? 'Limpiar selección' : 'Clear selection'}
            </Button>
          </div>
        )}
      </div>
    </>
  );
}