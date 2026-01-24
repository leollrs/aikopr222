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
import PaymentSectionWrapper from '@/components/clinic/PaymentSectionWrapper';
import ContactSection from '@/components/clinic/ContactSection';
import Footer from '@/components/clinic/Footer';
import ServicePickerModal from '@/components/clinic/ServicePickerModal';
import ChatWidget from '@/components/chat/ChatWidget';

export default function Home() {
  // Language
  const [lang, setLang] = useState('es');
  
  // Cart state
  const [cart, setCart] = useState([]);

  // Define signature service for Hero
  const signatureService = {
    id: 999, // unique ID for signature service
    nameEs: "Láser Rejuvenation",
    nameEn: "Laser Rejuvenation",
    descEs: "Sesión personalizada para mejorar textura, tono y luminosidad. Plan diseñado según tu piel.",
    descEn: "A tailored session to improve texture, tone, and glow. Your plan is designed around your skin.",
    duration: "60-75 min",
    price: 150, // placeholder price
    benefits: [],
    caseStudy: null
  };
  
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

  // Chat state
  const [chatOpen, setChatOpen] = useState(false);
  const [chatInitialMessage, setChatInitialMessage] = useState('');

  // Handlers
  const handleAddService = (service) => {
    // Check if service already in cart (avoid duplicates)
    const alreadyInCart = cart.some(item => item.id === service.id);
    if (alreadyInCart) {
      // Just scroll to booking if already added
      scrollToBooking();
      return;
    }
    
    setCart([...cart, service]);
    setLastAddedService(service);
    setShowAddedModal(true);
  };

  const handleAskAboutService = (service) => {
    const question = lang === 'es' 
      ? `Cuéntame más sobre el servicio: ${service.nameEs}`
      : `Tell me more about the service: ${service.nameEn || service.nameEs}`;
    setChatInitialMessage(question);
    setChatOpen(true);
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
    // Store only booking details (date/time/contact) - cart is the source of truth for services
    const { services, ...bookingDetails } = data;
    setBookingData(bookingDetails);
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
        onViewServices={scrollToServices}
        onAddService={handleAddService}
        signatureService={signatureService}
      />

      {/* Services */}
      <ServicesSection 
        lang={lang}
        onAddToCart={handleAddService}
        onAskAboutService={handleAskAboutService}
        sectionRef={servicesRef}
      />
      
      // Cuando me Manden las fotos lo vuelvo a añadir. 
      //{/* Real Results */}
      //<ResultsSection lang={lang} /> 

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
        <PaymentSectionWrapper 
          lang={lang}
          bookingData={bookingData}
          cart={cart}
          onConfirm={handleConfirmPayment}
          onClearCart={() => setCart([])}
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
          setShowPickerModal(true);
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

      {/* AI Chat Widget */}
      <ChatWidget 
        lang={lang}
        onAddToCart={handleAddService}
        scrollToBooking={scrollToBooking}
        isOpen={chatOpen}
        onClose={() => {
          setChatOpen(false);
          setChatInitialMessage('');
        }}
        initialMessage={chatInitialMessage}
      />
    </div>
  );
}