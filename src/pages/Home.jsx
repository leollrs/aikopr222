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
import IntakeModal from '@/components/clinic/IntakeModal';
import ChatWidget from '@/components/chat/ChatWidget';

export default function Home() {
  // Language
  const [lang, setLang] = useState('es');
  
  // Cart state
  const [cart, setCart] = useState([]);

  // Define signature service for Hero
  const signatureService = {
    id: "co2-laser-fraccionado",
    name: { es: "CO₂ LÁSER FRACCIONADO", en: "FRACTIONAL CO₂ LASER" },
    description: { 
      es: "Piel más lisa, poros más finos y una apariencia más rejuvenecida. Diseñado para mejorar textura, tono y marcas visibles dentro del alcance estético.",
      en: "Smoother skin, refined pores, and a more refreshed look. Designed to improve texture, tone, and visible marks within the aesthetic scope."
    },
    extra: {
      es: "Trabaja con microzonas térmicas controladas que estimulan renovación cutánea y colágeno de forma progresiva. El resultado se vuelve más evidente con el paso de las semanas.",
      en: "Uses controlled micro-thermal zones to stimulate skin renewal and collagen progressively. Results become more noticeable over the following weeks.",
    },
    duration: { es: "45–60 minutos", en: "45–60 minutes" },
    price: 230,
    badges: [
      { es: "Servicios profesionales", en: "Professional service" },
      { es: "Evaluación previa obligatoria (estética)", en: "Pre-evaluation required (aesthetic)" },
    ],
    modal: {
      sections: [
        {
          title: { es: "Lo que puedes notar", en: "What you may notice" },
          bullets: [
            { es: "Textura más suave y uniforme", en: "Smoother, more even texture" },
            { es: "Poros visualmente más finos", en: "Pores look more refined" },
            { es: "Piel con mejor firmeza y apariencia general", en: "Improved firmness and overall look" },
            { es: "Tono más parejo y piel menos apagada", en: "More even tone and less dullness" },
            { es: "Marcas visibles más difuminadas (según evaluación estética)", en: "Visible marks appear softer (based on evaluation)" },
          ],
        },
        {
          title: { es: "Ideal para ti si…", en: "Ideal for you if…" },
          bullets: [
            { es: "Sientes textura irregular o poros marcados", en: "You feel uneven texture or noticeable pores" },
            { es: "Tienes marcas visibles (acné / procedimientos estéticos previos)", en: "You have visible marks (acne / prior aesthetic procedures)" },
            { es: "Quieres un cambio notable sin cirugía", en: "You want a noticeable change without surgery" },
            { es: "Tu piel se ve cansada, opaca o fotoenvejecida", en: "Your skin looks tired, dull, or sun-aged" },
          ],
        },
        {
          title: { es: "Sesiones recomendadas", en: "Recommended sessions" },
          text: {
            es: "1 a 3 sesiones. Intervalos de 4 a 6 semanas (según evaluación estética).",
            en: "1 to 3 sessions. Spaced 4 to 6 weeks apart (based on aesthetic evaluation).",
          },
        },
        { title: { es: "Duración", en: "Duration" }, text: { es: "45–60 minutos.", en: "45–60 minutes." } },
        {
          title: { es: "Cuidados post", en: "Aftercare" },
          bullets: [
            { es: "Evitar sol directo y usar protector solar diariamente", en: "Avoid direct sun and use sunscreen daily" },
            { es: "Hidratación profunda", en: "Deep hydration" },
            { es: "Evitar maquillaje por varios días (según tu caso)", en: "Avoid makeup for a few days (case-dependent)" },
            { es: "No manipular la piel durante la recuperación", en: "Do not pick or manipulate healing skin" },
          ],
        },
        {
          title: { es: "Importante", en: "Important" },
          text: {
            es: "Evaluación previa obligatoria (estética). Servicio dentro del alcance estético, no médico.",
            en: "Pre-evaluation required (aesthetic). Service within the aesthetic scope, not medical.",
          },
        },
      ],
    },
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
  const [intakeData, setIntakeData] = useState(null);
  const [showIntakeModal, setShowIntakeModal] = useState(false);
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
    const serviceName = typeof service.name === 'string' 
      ? service.name 
      : (lang === 'es' ? service.name?.es : service.name?.en) || service.name?.es || '';
    const question = lang === 'es' 
      ? `Cuéntame más sobre el servicio: ${serviceName}`
      : `Tell me more about the service: ${serviceName}`;
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
    // Store booking details and show intake modal first
    const { services, ...bookingDetails } = data;
    setBookingData(bookingDetails);
    setShowIntakeModal(true);
  };

  const handleIntakeComplete = (data) => {
    // Store intake data and show payment
    setIntakeData(data);
    setShowIntakeModal(false);
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
        onViewDetails={handleViewDetails}
        signatureService={signatureService}
      />

      {/* Services */}
      <ServicesSection 
        lang={lang}
        cart={cart}
        onAddToCart={handleAddService}
        onAskAboutService={handleAskAboutService}
        sectionRef={servicesRef}
      />
      
      {/*
      // Cuando me Manden las fotos lo vuelvo a añadir. 
      //<ResultsSection lang={lang} /> 
      */}

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
          intakeData={intakeData}
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
        serviceName={lastAddedService ? (typeof lastAddedService.name === 'string' ? lastAddedService.name : (lang === 'es' ? lastAddedService.name?.es : lastAddedService.name?.en) || '') : ''}
      />

      <ServicePickerModal 
        isOpen={showPickerModal}
        onClose={() => setShowPickerModal(false)}
        lang={lang}
        cart={cart}
        onAddService={(service) => {
          handleAddService(service);
          setShowPickerModal(false);
        }}
      />

      <IntakeModal
        isOpen={showIntakeModal}
        onClose={() => setShowIntakeModal(false)}
        lang={lang}
        bookingData={bookingData}
        serviceName={cart[0] ? (typeof cart[0].name === 'string' ? cart[0].name : (lang === 'es' ? cart[0].name?.es : cart[0].name?.en) || '') : ''}
        onSubmitComplete={handleIntakeComplete}
      />

      {/* AI Chat Widget */}
      <ChatWidget 
        lang={lang}
        onAddToCart={handleAddService}
        scrollToBooking={scrollToBooking}
        isOpen={chatOpen}
        onOpen={() => setChatOpen(true)}
        onClose={() => {
          setChatOpen(false);
          setChatInitialMessage('');
        }}
        initialMessage={chatInitialMessage}
      />
    </div>
  );
}