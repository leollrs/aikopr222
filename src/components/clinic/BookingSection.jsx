import React, { useState, useEffect } from "react";
import { Calendar, Clock, User, Phone, Mail, Trash2, Plus, MapPin, Building2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { base44 } from "@/api/base44Client";

const timeSlots = ["09:00", "10:00", "11:00", "12:00", "14:00", "15:00", "16:00", "17:00"];

const PALETTE = {
  cream: "#FBF8F3",
  linen: "#F1E8DD",
  sand: "#E7D8C7",
  espresso: "#2A1E1A",
  cocoa: "#6B5A52",
  taupe: "#8B7468",
  champagne: "#C9AE7E",
  rose: "#C39A8B",
};

const unwrap = (res) => res?.data ?? res?.result ?? res ?? {};

const toLocalYYYYMMDD = (d) => {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
};

const makeLocalDateTime = (dateStr, timeStr) => new Date(`${dateStr}T${timeStr}:00`);

export default function BookingSection({
  lang,
  cart,
  onRemoveFromCart,
  onContinueToPayment,
  onOpenServicePicker,
  sectionRef,
}) {
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const [formData, setFormData] = useState({ name: "", phone: "", email: "" });
  const [serviceType, setServiceType] = useState("");
  const [address, setAddress] = useState({ line1: "", city: "", zip: "", notes: "" });

  const [blockedTimes, setBlockedTimes] = useState([]);
  const [isLoadingAvailability, setIsLoadingAvailability] = useState(false);
  const [bookingError, setBookingError] = useState("");

  const durationToMinutes = (duration) => {
    const s = String(duration || "").toLowerCase().trim();
    const hrMatch = s.match(/(\d+)\s*(h|hr|hrs|hour|hours)\b/);
    const minMatch = s.match(/(\d+)\s*(m|min|mins|minute|minutes)\b/);
    if (hrMatch || minMatch) {
      const h = hrMatch ? parseInt(hrMatch[1], 10) : 0;
      const m = minMatch ? parseInt(minMatch[1], 10) : 0;
      const total = h * 60 + m;
      return Number.isFinite(total) ? total : 0;
    }
    const nums = s.match(/\d+/g) || [];
    if (nums.length === 1) return Number(nums[0]) || 0;
    if (nums.length >= 2) return (Number(nums[0]) || 0) * 60 + (Number(nums[1]) || 0);
    return 0;
  };

  const computeBlockedTimes = (busySlots, dateStr) => {
    const blockedSet = new Set();
    busySlots.forEach((slot) => {
      const start = new Date(slot.start);
      const end = new Date(slot.end);
      if (Number.isNaN(start.getTime()) || Number.isNaN(end.getTime())) return;
      timeSlots.forEach((time) => {
        const slotTime = makeLocalDateTime(dateStr, time);
        if (slotTime >= start && slotTime < end) blockedSet.add(time);
      });
    });
    return Array.from(blockedSet);
  };

  useEffect(() => {
    if (!selectedDate) {
      setBlockedTimes([]);
      return;
    }
    const fetchAvailability = async () => {
      setIsLoadingAvailability(true);
      setBookingError("");
      setBlockedTimes([]);
      setSelectedTime("");
      try {
        const res = await base44.functions.invoke("calendarSync", {
          action: "checkAvailability",
          date: selectedDate,
        });
        const data = unwrap(res);
        if (!data.ok) {
          setBookingError(
            lang === "es"
              ? `No pudimos verificar disponibilidad: ${data.error || "Unknown error"}`
              : `Couldn't check availability: ${data.error || "Unknown error"}`
          );
          return;
        }
        const busySlots = data.busySlots || [];
        setBlockedTimes(computeBlockedTimes(busySlots, selectedDate));
      } catch (error) {
        const msg =
          error?.message ||
          error?.response?.data?.error ||
          error?.data?.error ||
          "Unknown error";
        setBookingError(
          lang === "es"
            ? `No pudimos verificar disponibilidad: ${msg}`
            : `Couldn't check availability: ${msg}`
        );
      } finally {
        setIsLoadingAvailability(false);
      }
    };
    fetchAvailability();
  }, [selectedDate, lang]);

  const formatPhone = (value) => {
    const digits = String(value || "").replace(/\D/g, "").slice(0, 10);
    if (digits.length === 0) return "";
    const a = digits.slice(0, 3);
    const b = digits.slice(3, 6);
    const c = digits.slice(6, 10);
    if (digits.length <= 3) return `(${a}`;
    if (digits.length <= 6) return `(${a}) ${b}`;
    return `(${a}) ${b} - ${c}`;
  };

  const isFormValid =
    cart.length > 0 &&
    selectedDate &&
    selectedTime &&
    formData.name &&
    formData.phone &&
    formData.email &&
    serviceType &&
    (serviceType === "onsite" || (address.line1 && address.city && address.zip));

  const handleContinue = async () => {
    if (!isFormValid) return;
    
    // Just pass data to payment - calendar event created after payment succeeds
    onContinueToPayment({
      services: cart,
      date: selectedDate,
      time: selectedTime,
      ...formData,
      serviceType,
      ...(serviceType === "mobile" ? { address } : {}),
    });
  };

  const getAvailableDates = () => {
    const dates = [];
    const today = new Date();
    for (let i = 1; i <= 14; i++) {
      const d = new Date(today);
      d.setDate(today.getDate() + i);
      if (d.getDay() !== 0) dates.push(d);
    }
    return dates;
  };

  const availableDates = getAvailableDates();

  const steps = [
    { id: 1, label: lang === "es" ? "Servicios" : "Services" },
    { id: 2, label: lang === "es" ? "Fecha y hora" : "Date & time" },
    { id: 3, label: lang === "es" ? "Detalles" : "Details" },
  ];

  const currentStep = !cart.length ? 1 : !selectedDate || !selectedTime ? 2 : 3;

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden py-28 md:py-36 lg:py-44"
      style={{ backgroundColor: PALETTE.linen }}
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(1200px_600px_at_50%_20%,rgba(201,174,126,0.06),transparent_70%),linear-gradient(to_bottom,rgba(251,248,243,0.4),rgba(241,232,221,0.8))]" />

      <div className="relative mx-auto max-w-3xl px-6 sm:px-8">
        <div className="text-center mb-16">
          <h2
            className="font-display text-4xl md:text-5xl font-medium tracking-tight mb-6"
            style={{ color: PALETTE.espresso }}
          >
            {lang === "es" ? "Reserva tu Cita" : "Book Your Appointment"}
          </h2>
          <p className="font-body text-lg max-w-xl mx-auto" style={{ color: PALETTE.cocoa, opacity: 0.88 }}>
            {lang === "es"
              ? "Selecciona servicios, fecha y hora, y completa tus datos."
              : "Select services, date and time, then enter your details."}
          </p>

          <div className="mt-12 flex items-center justify-center gap-3">
            {steps.map((step, idx) => (
              <div key={step.id} className="flex items-center gap-3">
                <div className="flex flex-col items-center gap-2">
                  <div
                    className="flex h-10 w-10 items-center justify-center rounded-full border-2 text-sm font-medium transition-all"
                    style={{
                      backgroundColor: currentStep >= step.id ? PALETTE.champagne : "transparent",
                      borderColor: currentStep >= step.id ? PALETTE.champagne : "rgba(42,30,26,0.15)",
                      color: currentStep >= step.id ? "#FFFFFF" : PALETTE.taupe,
                    }}
                  >
                    {step.id}
                  </div>
                  <span className="text-xs font-medium" style={{ color: currentStep >= step.id ? PALETTE.espresso : PALETTE.taupe }}>
                    {step.label}
                  </span>
                </div>
                {idx < steps.length - 1 && (
                  <div
                    className="h-px w-16 mt-[-20px]"
                    style={{
                      backgroundColor: currentStep > step.id ? PALETTE.champagne : "rgba(42,30,26,0.15)",
                    }}
                  />
                )}
              </div>
            ))}
          </div>
        </div>

        <div
          className="relative overflow-hidden rounded-3xl border p-6 md:p-8 shadow-[0_36px_110px_rgba(42,30,26,0.22)] backdrop-blur"
          style={{
            backgroundColor: "rgba(255,252,248,0.90)",
            borderColor: "rgba(42,30,26,0.10)",
          }}
        >
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(900px_420px_at_25%_10%,rgba(201,174,126,0.18),transparent_55%),radial-gradient(900px_420px_at_80%_20%,rgba(195,154,139,0.12),transparent_60%)]" />

          <div className="relative mx-auto max-w-2xl">
            {/* Selected Services */}
            <div className="mb-10">
              <div className="flex items-center justify-between mb-4">
                <h3
                  className="text-sm font-semibold flex items-center gap-2 tracking-[0.12em] uppercase"
                  style={{ color: PALETTE.espresso }}
                >
                  <Calendar className="w-4 h-4" style={{ color: PALETTE.champagne }} />
                  {lang === "es" ? "Servicios seleccionados" : "Selected services"}
                </h3>

                <button
                  onClick={onOpenServicePicker}
                  className="inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-medium transition hover:scale-105"
                  style={{
                    backgroundColor: "rgba(195,154,139,0.15)",
                    borderColor: "rgba(195,154,139,0.35)",
                    color: PALETTE.rose,
                  }}
                >
                  <Plus className="h-3.5 w-3.5" />
                  <span>{lang === "es" ? "Agregar servicio" : "Add service"}</span>
                </button>
              </div>

              {cart.length === 0 ? (
                <div className="text-center py-4">
                  <p className="text-sm italic mb-3" style={{ color: PALETTE.taupe }}>
                    {lang === "es" ? "No hay servicios seleccionados." : "No services selected."}
                  </p>
                  <button
                    onClick={onOpenServicePicker}
                    className="inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-medium transition hover:scale-105"
                    style={{
                      backgroundColor: "rgba(195,154,139,0.12)",
                      borderColor: "rgba(195,154,139,0.30)",
                      color: PALETTE.rose,
                    }}
                  >
                    <Plus className="h-4 w-4" />
                    {lang === "es" ? "Agregar tu primer servicio" : "Add your first service"}
                  </button>
                </div>
              ) : (
                <div className="mx-auto max-w-xl space-y-2">
                  {cart.map((service, idx) => (
                    <div
                      key={`${service.id}-${idx}`}
                      className="flex items-center justify-between rounded-2xl px-4 py-3 border"
                      style={{
                        backgroundColor: "rgba(241,232,221,0.65)",
                        borderColor: "rgba(42,30,26,0.08)",
                      }}
                    >
                      <div className="min-w-0">
                        <div className="text-sm font-medium truncate" style={{ color: PALETTE.espresso }}>
                          {typeof service.name === 'string' ? service.name : (lang === "es" ? service.name?.es : service.name?.en) || ''}
                        </div>
                        <div className="text-xs" style={{ color: PALETTE.cocoa }}>
                          {typeof service.duration === 'string' ? service.duration : (lang === "es" ? service.duration?.es : service.duration?.en) || ''}
                        </div>
                      </div>

                      <button
                        onClick={() => onRemoveFromCart(idx)}
                        className="ml-3 inline-flex h-9 w-9 items-center justify-center rounded-full border transition"
                        style={{
                          borderColor: "rgba(42,30,26,0.10)",
                          backgroundColor: "rgba(255,252,248,0.70)",
                        }}
                        aria-label={lang === "es" ? "Eliminar" : "Remove"}
                      >
                        <Trash2 className="w-4 h-4" style={{ color: PALETTE.rose }} />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Date Selection */}
            <div className="mb-10">
              <h3
                className="text-sm font-semibold mb-4 flex items-center justify-center gap-2 tracking-[0.12em] uppercase"
                style={{ color: PALETTE.espresso }}
              >
                <Calendar className="w-4 h-4" style={{ color: PALETTE.champagne }} />
                {lang === "es" ? "Selecciona fecha" : "Select date"}
              </h3>

              <div className="mx-auto flex max-w-xl flex-wrap justify-center gap-2">
                {availableDates.map((date) => {
                  const dateStr = toLocalYYYYMMDD(date);
                  const dayName = date.toLocaleDateString(lang === "es" ? "es-ES" : "en-US", {
                    weekday: "short",
                  });
                  const dayNum = date.getDate();
                  const month = date.toLocaleDateString(lang === "es" ? "es-ES" : "en-US", {
                    month: "short",
                  });

                  const isActive = selectedDate === dateStr;

                  return (
                    <button
                      key={dateStr}
                      onClick={() => setSelectedDate(dateStr)}
                      className="rounded-2xl px-4 py-3 text-center border transition focus:outline-none focus:ring-2"
                      style={{
                        backgroundColor: isActive ? "rgba(195,154,139,0.95)" : "rgba(251,248,243,0.72)",
                        borderColor: isActive ? "rgba(195,154,139,0.55)" : "rgba(42,30,26,0.10)",
                        color: isActive ? "#FFFFFF" : PALETTE.espresso,
                        boxShadow: isActive
                          ? "0 18px 55px rgba(195,154,139,0.30)"
                          : "0 10px 30px rgba(42,30,26,0.08)",
                      }}
                    >
                      <div className="text-[11px] uppercase tracking-[0.16em]" style={{ opacity: isActive ? 0.9 : 0.75 }}>
                        {dayName}
                      </div>
                      <div className="text-lg font-medium">{dayNum}</div>
                      <div className="text-[11px]" style={{ opacity: isActive ? 0.9 : 0.75 }}>
                        {month}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Time Selection */}
            <div className="mb-10">
              <h3
                className="text-sm font-semibold mb-4 flex items-center justify-center gap-2 tracking-[0.12em] uppercase"
                style={{ color: PALETTE.espresso }}
              >
                <Clock className="w-4 h-4" style={{ color: PALETTE.champagne }} />
                {lang === "es" ? "Selecciona hora" : "Select time"}
              </h3>

              <div className="mx-auto flex max-w-xl flex-wrap justify-center gap-2">
                {timeSlots.map((time) => {
                  const isActive = selectedTime === time;
                  const isBlocked = blockedTimes.includes(time);
                  const isDisabled = isLoadingAvailability || isBlocked;

                  return (
                    <button
                      key={time}
                      onClick={() => !isDisabled && setSelectedTime(time)}
                      disabled={isDisabled}
                      className="rounded-2xl px-5 py-2.5 text-sm border transition focus:outline-none focus:ring-2"
                      style={{
                        backgroundColor: isActive ? "rgba(42,30,26,0.92)" : "rgba(251,248,243,0.72)",
                        borderColor: isActive ? "rgba(42,30,26,0.45)" : "rgba(42,30,26,0.10)",
                        color: isActive ? "#FFFFFF" : PALETTE.espresso,
                        boxShadow: isActive
                          ? "0 18px 55px rgba(42,30,26,0.22)"
                          : "0 10px 30px rgba(42,30,26,0.08)",
                        opacity: isDisabled ? 0.4 : 1,
                        cursor: isDisabled ? "not-allowed" : "pointer",
                      }}
                    >
                      {time}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Contact Form */}
            <div className="mb-10">
              <h3
                className="text-sm font-semibold mb-4 flex items-center justify-center gap-2 tracking-[0.12em] uppercase"
                style={{ color: PALETTE.espresso }}
              >
                <User className="w-4 h-4" style={{ color: PALETTE.champagne }} />
                {lang === "es" ? "Tus datos" : "Your details"}
              </h3>

              <div className="mx-auto grid max-w-xl grid-cols-1 gap-4 md:grid-cols-3">
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4" style={{ color: PALETTE.taupe }} />
                  <Input
                    type="text"
                    placeholder={lang === "es" ? "Nombre completo" : "Full name"}
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="pl-10 rounded-2xl"
                    style={{
                      backgroundColor: "rgba(241,232,221,0.65)",
                      borderColor: "rgba(42,30,26,0.12)",
                      color: PALETTE.espresso,
                    }}
                  />
                </div>

                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4" style={{ color: PALETTE.taupe }} />
                  <Input
                    type="tel"
                    inputMode="tel"
                    autoComplete="tel"
                    placeholder={lang === "es" ? "Teléfono" : "Phone"}
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: formatPhone(e.target.value) })}
                    className="pl-10 rounded-2xl"
                    style={{
                      backgroundColor: "rgba(241,232,221,0.65)",
                      borderColor: "rgba(42,30,26,0.12)",
                      color: PALETTE.espresso,
                      fontVariantNumeric: "tabular-nums",
                      letterSpacing: "0.04em",
                    }}
                  />
                </div>

                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4" style={{ color: PALETTE.taupe }} />
                  <Input
                    type="email"
                    placeholder={lang === "es" ? "Correo electrónico" : "Email"}
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="pl-10 rounded-2xl"
                    style={{
                      backgroundColor: "rgba(241,232,221,0.65)",
                      borderColor: "rgba(42,30,26,0.12)",
                      color: PALETTE.espresso,
                    }}
                  />
                </div>
              </div>

              <p className="mt-4 text-center text-xs" style={{ color: PALETTE.taupe }}>
                {lang === "es"
                  ? "Confirmaremos tu cita por mensaje tan pronto recibamos tu solicitud."
                  : "We'll confirm your appointment by message as soon as we receive your request."}
              </p>
            </div>

            {/* Service Location Choice */}
            <div className="mb-10">
              <h3
                className="text-sm font-semibold mb-4 flex items-center justify-center gap-2 tracking-[0.12em] uppercase"
                style={{ color: PALETTE.espresso }}
              >
                <MapPin className="w-4 h-4" style={{ color: PALETTE.champagne }} />
                {lang === "es" ? "¿Dónde será el servicio?" : "Where will the service take place?"}
              </h3>

              <div className="mx-auto max-w-xl grid grid-cols-2 gap-3">
                <button
                  onClick={() => setServiceType("mobile")}
                  className="rounded-2xl px-6 py-4 border transition focus:outline-none focus:ring-2"
                  style={{
                    backgroundColor: serviceType === "mobile" ? "rgba(195,154,139,0.95)" : "rgba(251,248,243,0.72)",
                    borderColor: serviceType === "mobile" ? "rgba(195,154,139,0.55)" : "rgba(42,30,26,0.10)",
                    color: serviceType === "mobile" ? "#FFFFFF" : PALETTE.espresso,
                    boxShadow: serviceType === "mobile"
                      ? "0 18px 55px rgba(195,154,139,0.30)"
                      : "0 10px 30px rgba(42,30,26,0.08)",
                  }}
                >
                  <MapPin className="mx-auto mb-2 h-6 w-6" style={{ color: serviceType === "mobile" ? "#FFFFFF" : PALETTE.champagne }} />
                  <div className="text-sm font-medium">
                    {lang === "es" ? "A domicilio" : "Mobile"}
                  </div>
                  <div className="text-xs mt-1" style={{ opacity: 0.85 }}>
                    {lang === "es" ? "En tu hogar" : "At your home"}
                  </div>
                </button>

                <button
                  onClick={() => {
                    setServiceType("onsite");
                    setAddress({ line1: "", city: "", zip: "", notes: "" });
                  }}
                  className="rounded-2xl px-6 py-4 border transition focus:outline-none focus:ring-2"
                  style={{
                    backgroundColor: serviceType === "onsite" ? "rgba(195,154,139,0.95)" : "rgba(251,248,243,0.72)",
                    borderColor: serviceType === "onsite" ? "rgba(195,154,139,0.55)" : "rgba(42,30,26,0.10)",
                    color: serviceType === "onsite" ? "#FFFFFF" : PALETTE.espresso,
                    boxShadow: serviceType === "onsite"
                      ? "0 18px 55px rgba(195,154,139,0.30)"
                      : "0 10px 30px rgba(42,30,26,0.08)",
                  }}
                >
                  <Building2 className="mx-auto mb-2 h-6 w-6" style={{ color: serviceType === "onsite" ? "#FFFFFF" : PALETTE.champagne }} />
                  <div className="text-sm font-medium">
                    {lang === "es" ? "En Local" : "In-studio"}
                  </div>
                  <div className="text-xs mt-1" style={{ opacity: 0.85 }}>
                    {lang === "es" ? "En nuestra ubicación" : "At our location"}
                  </div>
                </button>
              </div>

              {serviceType === "mobile" && (
                <div className="mt-6 mx-auto max-w-xl space-y-4 animate-in fade-in slide-in-from-top-4 duration-300">
                  <Input
                    type="text"
                    placeholder={lang === "es" ? "Dirección" : "Address Line 1"}
                    value={address.line1}
                    onChange={(e) => setAddress({ ...address, line1: e.target.value })}
                    className="rounded-2xl"
                    style={{
                      backgroundColor: "rgba(241,232,221,0.65)",
                      borderColor: "rgba(42,30,26,0.12)",
                      color: PALETTE.espresso,
                    }}
                  />

                  <div className="grid grid-cols-2 gap-3">
                    <Input
                      type="text"
                      placeholder={lang === "es" ? "Ciudad" : "City"}
                      value={address.city}
                      onChange={(e) => setAddress({ ...address, city: e.target.value })}
                      className="rounded-2xl"
                      style={{
                        backgroundColor: "rgba(241,232,221,0.65)",
                        borderColor: "rgba(42,30,26,0.12)",
                        color: PALETTE.espresso,
                      }}
                    />

                    <Input
                      type="text"
                      placeholder={lang === "es" ? "Código Postal" : "ZIP Code"}
                      value={address.zip}
                      onChange={(e) => setAddress({ ...address, zip: e.target.value })}
                      className="rounded-2xl"
                      style={{
                        backgroundColor: "rgba(241,232,221,0.65)",
                        borderColor: "rgba(42,30,26,0.12)",
                        color: PALETTE.espresso,
                      }}
                    />
                  </div>

                  <Textarea
                    placeholder={lang === "es" ? "Notas opcionales (código de portón, estacionamiento, etc.)" : "Optional notes (gate code, parking, etc.)"}
                    value={address.notes}
                    onChange={(e) => setAddress({ ...address, notes: e.target.value })}
                    className="rounded-2xl resize-none"
                    rows={3}
                    style={{
                      backgroundColor: "rgba(241,232,221,0.65)",
                      borderColor: "rgba(42,30,26,0.12)",
                      color: PALETTE.espresso,
                    }}
                  />
                </div>
              )}
            </div>

            {bookingError && (
              <div className="mb-6 text-center text-sm" style={{ color: PALETTE.rose }}>
                {bookingError}
              </div>
            )}

            <div className="mt-12 flex justify-center">
              <Button
                onClick={handleContinue}
                disabled={!isFormValid}
                className="w-full max-w-xl py-4 text-base font-medium rounded-2xl transition"
                style={{
                  backgroundColor: isFormValid ? PALETTE.rose : "rgba(195,154,139,0.25)",
                  color: isFormValid ? "#FFFFFF" : PALETTE.cocoa,
                  boxShadow: isFormValid ? "0 22px 70px rgba(195,154,139,0.30)" : "none",
                }}
              >
                {lang === "es" ? "Continuar" : "Continue"}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}