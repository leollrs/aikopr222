import React, { useState } from 'react';
import { CreditCard, Lock, Check, Plus } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function PaymentSection({ lang, bookingData, onConfirm, onAddMore, sectionRef }) {
  const [cardData, setCardData] = useState({
    number: '',
    expiry: '',
    cvv: '',
    name: ''
  });
  const [confirmed, setConfirmed] = useState(false);

  const handleConfirm = () => {
    if (cardData.number && cardData.expiry && cardData.cvv && cardData.name) {
      setConfirmed(true);
      onConfirm();
    }
  };

  const totalServices = bookingData?.services?.reduce((sum, s) => sum + s.price, 0) || 0;

  if (confirmed) {
    return (
      <section ref={sectionRef} className="bg-[#DBCAB6] py-16 md:py-20 lg:py-28">
        <div className="max-w-lg mx-auto px-4 sm:px-6 lg:px-10">
          <div className="bg-[#FFFCF8] rounded-xl border border-[rgba(36,24,20,0.08)] shadow-sm p-8 text-center">
            <div className="w-20 h-20 bg-[#B07A7A]/10 rounded-full flex items-center justify-center mx-auto mb-6">
              <Check className="w-10 h-10 text-[#B07A7A]" />
            </div>
            <h2 className="text-2xl font-light text-[#241814] mb-3">
              {lang === 'es' ? '¡Cita Confirmada!' : 'Appointment Confirmed!'}
            </h2>
            <p className="text-[#6E5B50] mb-6">
              {lang === 'es' 
                ? 'Te hemos enviado un correo con los detalles de tu cita.'
                : 'We have sent you an email with your appointment details.'}
            </p>
            <div className="bg-[#F4EEE6] rounded-lg p-4 text-left mb-6">
              <p className="text-sm text-[#6E5B50]">{lang === 'es' ? 'Fecha' : 'Date'}</p>
              <p className="text-[#241814] font-medium">{bookingData?.date}</p>
              <p className="text-sm text-[#6E5B50] mt-3">{lang === 'es' ? 'Hora' : 'Time'}</p>
              <p className="text-[#241814] font-medium">{bookingData?.time}</p>
            </div>
            <Button
              onClick={onAddMore}
              variant="outline"
              className="border-[rgba(36,24,20,0.15)] text-[#241814] hover:bg-[#F4EEE6] py-3 px-6 font-medium rounded-md transition-colors"
            >
              <Plus className="w-4 h-4 mr-2" />
              {lang === 'es' ? 'Agregar más servicios' : 'Add more services'}
            </Button>
          </div>
        </div>
      </section>
    );
  }

  if (!bookingData) {
    return null;
  }

  return (
    <section ref={sectionRef} className="bg-[#DBCAB6] py-16 md:py-20 lg:py-28">
      <div className="max-w-lg mx-auto px-4 sm:px-6 lg:px-10">
        {/* Section Header */}
        <div className="text-center mb-10 md:mb-12">
          <h2 className="text-3xl md:text-4xl font-light text-[#241814] mb-4">
            {lang === 'es' ? 'Confirma tu Depósito' : 'Confirm Your Deposit'}
          </h2>
          <p className="text-[#6E5B50]">
            {lang === 'es' 
              ? 'Depósito reembolsable de $30 para reservar tu cita.'
              : '$30 refundable deposit to reserve your appointment.'}
          </p>
        </div>

        <div className="bg-[#FFFCF8] rounded-xl border border-[rgba(36,24,20,0.08)] shadow-sm p-6 md:p-8">
          {/* Summary */}
          <div className="mb-6 pb-6 border-b border-[rgba(36,24,20,0.08)]">
            <h3 className="text-sm font-medium text-[#241814] mb-4">
              {lang === 'es' ? 'Resumen' : 'Summary'}
            </h3>
            <div className="space-y-2">
              {bookingData?.services?.map((service, idx) => (
                <div key={idx} className="flex justify-between text-sm">
                  <span className="text-[#6E5B50]">
                    {lang === 'es' ? service.nameEs : service.nameEn}
                  </span>
                  <span className="text-[#241814]">${service.price}</span>
                </div>
              ))}
              <div className="flex justify-between text-sm pt-2 border-t border-[rgba(36,24,20,0.08)]">
                <span className="text-[#6E5B50]">{lang === 'es' ? 'Total servicios' : 'Services total'}</span>
                <span className="text-[#241814]">${totalServices}</span>
              </div>
            </div>
            
            <div className="flex justify-between items-center mt-4 pt-4 border-t border-[rgba(36,24,20,0.08)]">
              <span className="font-medium text-[#241814]">
                {lang === 'es' ? 'Depósito a pagar hoy' : 'Deposit to pay today'}
              </span>
              <span className="text-xl font-semibold text-[#B07A7A]">$30</span>
            </div>
          </div>

          {/* Card Form */}
          <div className="space-y-4">
            <div className="relative">
              <CreditCard className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#6E5B50]" />
              <Input
                type="text"
                placeholder="4242 4242 4242 4242"
                value={cardData.number}
                onChange={(e) => setCardData({...cardData, number: e.target.value})}
                className="pl-10 bg-[#F4EEE6] border-[rgba(36,24,20,0.1)] focus:border-[#B07A7A] text-[#241814] placeholder:text-[#6E5B50]/60"
              />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <Input
                type="text"
                placeholder="MM/YY"
                value={cardData.expiry}
                onChange={(e) => setCardData({...cardData, expiry: e.target.value})}
                className="bg-[#F4EEE6] border-[rgba(36,24,20,0.1)] focus:border-[#B07A7A] text-[#241814] placeholder:text-[#6E5B50]/60"
              />
              <Input
                type="text"
                placeholder="CVV"
                value={cardData.cvv}
                onChange={(e) => setCardData({...cardData, cvv: e.target.value})}
                className="bg-[#F4EEE6] border-[rgba(36,24,20,0.1)] focus:border-[#B07A7A] text-[#241814] placeholder:text-[#6E5B50]/60"
              />
            </div>
            
            <Input
              type="text"
              placeholder={lang === 'es' ? 'Nombre en la tarjeta' : 'Name on card'}
              value={cardData.name}
              onChange={(e) => setCardData({...cardData, name: e.target.value})}
              className="bg-[#F4EEE6] border-[rgba(36,24,20,0.1)] focus:border-[#B07A7A] text-[#241814] placeholder:text-[#6E5B50]/60"
            />
          </div>

          {/* Secure Notice */}
          <div className="flex items-center justify-center gap-2 text-xs text-[#6E5B50] my-6">
            <Lock className="w-3 h-3" />
            {lang === 'es' ? 'Pago seguro y encriptado' : 'Secure and encrypted payment'}
          </div>

          {/* Confirm Button */}
          <Button
            onClick={handleConfirm}
            className="w-full bg-[#B07A7A] hover:bg-[#9A6969] text-white py-4 text-base font-medium rounded-md transition-colors"
          >
            {lang === 'es' ? 'Confirmar cita - $30' : 'Confirm appointment - $30'}
          </Button>

          {/* Add More Services */}
          <Button
            onClick={onAddMore}
            variant="outline"
            className="w-full mt-3 border-[rgba(36,24,20,0.15)] text-[#241814] hover:bg-[#F4EEE6] py-3 font-medium rounded-md transition-colors"
          >
            <Plus className="w-4 h-4 mr-2" />
            {lang === 'es' ? 'Agregar más servicios' : 'Add more services'}
          </Button>
        </div>
      </div>
    </section>
  );
}