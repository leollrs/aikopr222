import React, { useState } from 'react';
import { Calendar, Clock, User, Phone, Mail, Trash2 } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const timeSlots = [
  '09:00', '10:00', '11:00', '12:00', '14:00', '15:00', '16:00', '17:00'
];

export default function BookingSection({ lang, cart, onRemoveFromCart, onContinueToPayment, sectionRef }) {
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: ''
  });

  const handleContinue = () => {
    if (cart.length > 0 && selectedDate && selectedTime && formData.name && formData.phone && formData.email) {
      onContinueToPayment({
        services: cart,
        date: selectedDate,
        time: selectedTime,
        ...formData
      });
    }
  };

  const isFormValid = cart.length > 0 && selectedDate && selectedTime && formData.name && formData.phone && formData.email;

  // Generate next 14 days
  const getAvailableDates = () => {
    const dates = [];
    const today = new Date();
    for (let i = 1; i <= 14; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + i);
      if (date.getDay() !== 0) { // Exclude Sundays
        dates.push(date);
      }
    }
    return dates;
  };

  const availableDates = getAvailableDates();

  return (
    <section ref={sectionRef} className="bg-[#E9DDCF] py-16 md:py-20 lg:py-28">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-10">
        {/* Section Header */}
        <div className="text-center mb-10 md:mb-12">
          <h2 className="text-3xl md:text-4xl font-light text-[#241814] mb-4">
            {lang === 'es' ? 'Reserva tu Cita' : 'Book Your Appointment'}
          </h2>
          <p className="text-[#6E5B50]">
            {lang === 'es' 
              ? 'Selecciona fecha, hora y completa tus datos.'
              : 'Select date, time and complete your details.'}
          </p>
        </div>

        <div className="bg-[#FFFCF8] rounded-xl border border-[rgba(36,24,20,0.08)] shadow-sm p-6 md:p-8">
          {/* Selected Services */}
          <div className="mb-8">
            <h3 className="text-sm font-medium text-[#241814] mb-4 flex items-center gap-2">
              <Calendar className="w-4 h-4 text-[#C7AE86]" />
              {lang === 'es' ? 'Servicios seleccionados' : 'Selected services'}
            </h3>
            
            {cart.length === 0 ? (
              <p className="text-sm text-[#6E5B50] italic">
                {lang === 'es' ? 'No hay servicios seleccionados' : 'No services selected'}
              </p>
            ) : (
              <div className="space-y-2">
                {cart.map((service, idx) => (
                  <div 
                    key={`${service.id}-${idx}`}
                    className="flex items-center justify-between bg-[#F4EEE6] rounded-lg px-4 py-3"
                  >
                    <div>
                      <span className="text-sm text-[#241814]">
                        {lang === 'es' ? service.nameEs : service.nameEn}
                      </span>
                      <span className="text-xs text-[#6E5B50] ml-2">
                        ${service.price}
                      </span>
                    </div>
                    <button
                      onClick={() => onRemoveFromCart(idx)}
                      className="p-1 text-[#6E5B50] hover:text-[#B07A7A] transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Date Selection */}
          <div className="mb-8">
            <h3 className="text-sm font-medium text-[#241814] mb-4 flex items-center gap-2">
              <Calendar className="w-4 h-4 text-[#C7AE86]" />
              {lang === 'es' ? 'Selecciona fecha' : 'Select date'}
            </h3>
            <div className="flex flex-wrap gap-2">
              {availableDates.map((date) => {
                const dateStr = date.toISOString().split('T')[0];
                const dayName = date.toLocaleDateString(lang === 'es' ? 'es-ES' : 'en-US', { weekday: 'short' });
                const dayNum = date.getDate();
                const month = date.toLocaleDateString(lang === 'es' ? 'es-ES' : 'en-US', { month: 'short' });
                
                return (
                  <button
                    key={dateStr}
                    onClick={() => setSelectedDate(dateStr)}
                    className={`px-4 py-3 rounded-lg text-center transition-colors ${
                      selectedDate === dateStr
                        ? 'bg-[#B07A7A] text-white'
                        : 'bg-[#F4EEE6] text-[#241814] hover:bg-[#E9DDCF]'
                    }`}
                  >
                    <div className="text-xs uppercase">{dayName}</div>
                    <div className="text-lg font-medium">{dayNum}</div>
                    <div className="text-xs">{month}</div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Time Selection */}
          <div className="mb-8">
            <h3 className="text-sm font-medium text-[#241814] mb-4 flex items-center gap-2">
              <Clock className="w-4 h-4 text-[#C7AE86]" />
              {lang === 'es' ? 'Selecciona hora' : 'Select time'}
            </h3>
            <div className="flex flex-wrap gap-2">
              {timeSlots.map((time) => (
                <button
                  key={time}
                  onClick={() => setSelectedTime(time)}
                  className={`px-5 py-2.5 rounded-lg text-sm transition-colors ${
                    selectedTime === time
                      ? 'bg-[#B07A7A] text-white'
                      : 'bg-[#F4EEE6] text-[#241814] hover:bg-[#E9DDCF]'
                  }`}
                >
                  {time}
                </button>
              ))}
            </div>
          </div>

          {/* Contact Form */}
          <div className="mb-8">
            <h3 className="text-sm font-medium text-[#241814] mb-4 flex items-center gap-2">
              <User className="w-4 h-4 text-[#C7AE86]" />
              {lang === 'es' ? 'Tus datos' : 'Your details'}
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#6E5B50]" />
                <Input
                  type="text"
                  placeholder={lang === 'es' ? 'Nombre completo' : 'Full name'}
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  className="pl-10 bg-[#F4EEE6] border-[rgba(36,24,20,0.1)] focus:border-[#B07A7A] text-[#241814] placeholder:text-[#6E5B50]/60"
                />
              </div>
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#6E5B50]" />
                <Input
                  type="tel"
                  placeholder={lang === 'es' ? 'Teléfono' : 'Phone'}
                  value={formData.phone}
                  onChange={(e) => setFormData({...formData, phone: e.target.value})}
                  className="pl-10 bg-[#F4EEE6] border-[rgba(36,24,20,0.1)] focus:border-[#B07A7A] text-[#241814] placeholder:text-[#6E5B50]/60"
                />
              </div>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#6E5B50]" />
                <Input
                  type="email"
                  placeholder={lang === 'es' ? 'Correo electrónico' : 'Email'}
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  className="pl-10 bg-[#F4EEE6] border-[rgba(36,24,20,0.1)] focus:border-[#B07A7A] text-[#241814] placeholder:text-[#6E5B50]/60"
                />
              </div>
            </div>
          </div>

          {/* Continue Button */}
          <Button
            onClick={handleContinue}
            disabled={!isFormValid}
            className="w-full bg-[#B07A7A] hover:bg-[#9A6969] disabled:bg-[#E9DDCF] disabled:text-[#6E5B50] text-white py-4 text-base font-medium rounded-md transition-colors"
          >
            {lang === 'es' ? 'Continuar al depósito' : 'Continue to deposit'}
          </Button>
        </div>
      </div>
    </section>
  );
}