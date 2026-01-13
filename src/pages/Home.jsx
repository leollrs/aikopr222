import React, { useState, useRef } from 'react';
import Header from '@/components/clinic/Header';
import Hero from '@/components/clinic/Hero';
import ServicesSection from '@/components/clinic/ServicesSection';
import ServiceModal from '@/components/clinic/ServiceModal';
import CartDrawer from '@/components/clinic/CartDrawer';
import AddedModal from '@/components/clinic/AddedModal';
import ResultsSection from '@/components/clinic/ResultsSection';
import TestimonialsSection from '@/components/clinic/TestimonialsSection';
import BookingSection from '@/components/clinic/BookingSection';
import PaymentSection from '@/components/clinic/PaymentSection';
import ContactSection from '@/components/clinic/ContactSection';
import Footer from '@/components/clinic/Footer';
import ServicePickerModal from '@/components/clinic/ServicePickerModal';

export default function Home() {
  // Language
  const [lang, setLang] = useState('es');
  
  // Cart state
  const [cart, setCart] = useState([]);
  
  // Modal states
  const [selectedService, setSelectedService] = useState(null);
  const [showServiceModal, setShowServiceModal] = useState(false);
  const [showCartDrawer, setShowCartDrawer] = useState(false);
  const [showAddedModal, setShowAddedModal] = useState(false);
  const [lastAddedService, setLastAddedService] = useState(null);
  const [showPickerModal, setShowPickerModal] = useState(false);
  
  // Booking state
  const [bookingData, setBookingData] = useState(null);
  const [showPayment, setShowPayment] = useState(false);
  
  // Refs for scrolling
  const servicesRef = useRef(null);
  const bookingRef = useRef(null);
  const paymentRef = useRef(null);

  // Handlers
  const handleAddService = (service) => {
    setCart([...cart, service]);
    setLastAddedService(service);
    setShowAddedModal(true);
  };

  const handleViewDetails = (service) => {
    setSelectedService(service);
    setShowServiceModal(true);
  };

  const handleRemoveFromCart = (index) => {
    setCart(cart.filter((_, i) => i !== index));
  };

  const handleClearCart = () => {
    setCart([]);
    setShowCartDrawer(false);
  };

  const handleContinueToBooking = () => {
    setShowAddedModal(false);
    setShowCartDrawer(false);
    setTimeout(() => {
      bookingRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  const handleContinueToPayment = (data) => {
    setBookingData(data);
    setShowPayment(true);
    setTimeout(() => {
      paymentRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  const handleConfirmPayment = () => {
    // Payment confirmed
  };

  const handleAddMoreServices = () => {
    setShowPickerModal(true);
  };

  const scrollToServices = () => {
    servicesRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToBooking = () => {
    bookingRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-[#F4EEE6]">
      {/* Header */}
      <Header 
        lang={lang}
        setLang={setLang}
        cartCount={cart.length}
        onCartClick={() => setShowCartDrawer(true)}
        onBookClick={scrollToBooking}
      />

      {/* Hero */}
      <Hero 
        lang={lang}
        onBookClick={scrollToBooking}
        onServicesClick={scrollToServices}
      />

      {/* Services */}
      <ServicesSection 
        lang={lang}
        onAddService={handleAddService}
        onViewDetails={handleViewDetails}
        sectionRef={servicesRef}
      />

      {/* Real Results */}
      <ResultsSection lang={lang} />

      {/* Testimonials */}
      <TestimonialsSection lang={lang} />

      {/* Booking */}
      <BookingSection 
        lang={lang}
        cart={cart}
        onRemoveFromCart={handleRemoveFromCart}
        onContinueToPayment={handleContinueToPayment}
        onOpenServicePicker={handleAddMoreServices}
        sectionRef={bookingRef}
      />

      {/* Payment */}
      {showPayment && (
        <PaymentSection 
          lang={lang}
          bookingData={bookingData}
          onConfirm={handleConfirmPayment}
          onOpenServicePicker={handleAddMoreServices}
          sectionRef={paymentRef}
        />
      )}

      {/* Contact */}
      <ContactSection lang={lang} />

      {/* Footer */}
      <Footer lang={lang} />

      {/* Modals */}
      <ServiceModal 
        service={selectedService}
        lang={lang}
        isOpen={showServiceModal}
        onClose={() => setShowServiceModal(false)}
        onAddService={handleAddService}
      />

      <CartDrawer 
        isOpen={showCartDrawer}
        onClose={() => setShowCartDrawer(false)}
        cart={cart}
        lang={lang}
        onRemove={handleRemoveFromCart}
        onClear={handleClearCart}
        onContinue={handleContinueToBooking}
      />

      <AddedModal 
        isOpen={showAddedModal}
        onClose={() => setShowAddedModal(false)}
        onAddMore={() => {
          setShowAddedModal(false);
          scrollToServices();
        }}
        onContinue={handleContinueToBooking}
        lang={lang}
        serviceName={lastAddedService ? (lang === 'es' ? lastAddedService.nameEs : lastAddedService.nameEn) : ''}
      />

      <ServicePickerModal 
        isOpen={showPickerModal}
        onClose={() => setShowPickerModal(false)}
        lang={lang}
        onAddService={(service) => {
          handleAddService(service);
          setShowPickerModal(false);
        }}
      />
    </div>
  );
}