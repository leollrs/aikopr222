import React, { useState } from "react";
import { Calendar, Clock, User, Phone, Mail, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const timeSlots = ["09:00", "10:00", "11:00", "12:00", "14:00", "15:00", "16:00", "17:00"];

// NEW PALETTE (warm premium, no harsh black)
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

export default function BookingSection({
  lang,
  cart,
  onRemoveFromCart,
  onContinueToPayment,
  sectionRef,
}) {
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const [formData, setFormData] = useState({ name: "", phone: "", email: "" });

  const handleContinue = () => {
    if (
      cart.length > 0 &&
      selectedDate &&
      selectedTime &&
      formData.name &&
      formData.phone &&
      formData.email
    ) {
      onContinueToPayment({
        services: cart,
        date: selectedDate,
        time: selectedTime,
        ...formData,
      });
    }
  };

  const isFormValid =
    cart.length > 0 &&
    selectedDate &&
    selectedTime &&
    formData.name &&
    formData.phone &&
    formData.email;

  // Generate next 14 days (excluding Sundays)
  const getAvailableDates = () => {
    const dates = [];
    const today = new Date();
    for (let i = 1; i <= 14; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + i);
      if (date.getDay() !== 0) dates.push(date);
    }
    return dates;
  };

  const availableDates = getAvailableDates();

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden py-16 md:py-20 lg:py-28"
      style={{ backgroundColor: PALETTE.linen }}
    >
      {/* subtle premium background texture */}
      <div className="pointer-events-none absolute inset-0 opacity-90 bg-[radial-gradient(900px_520px_at_15%_10%,rgba(201,174,126,0.18),transparent_60%),radial-gradient(900px_520px_at_85%_20%,rgba(195,154,139,0.14),transparent_60%),linear-gradient(to_bottom,rgba(251,248,243,0.55),rgba(241,232,221,0.78))]" />
      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-10">
        {/* Header */}
        <div className="text-center mb-10 md:mb-12">
          <h2
            className="text-3xl md:text-4xl font-light mb-4 tracking-[-0.02em]"
            style={{ color: PALETTE.espresso }}
          >
            {lang === "es" ? "Reserva tu Cita" : "Book Your Appointment"}
          </h2>
          <p className="max-w-2xl mx-auto" style={{ color: PALETTE.cocoa }}>
            {lang === "es"
              ? "Selecciona fecha y hora, y completa tus datos para confirmar."
              : "Select a date and time, then enter your details to confirm."}
          </p>
        </div>

        {/* Main Card */}
        <div
          className="relative overflow-hidden rounded-3xl border p-6 md:p-8 shadow-[0_36px_110px_rgba(42,30,26,0.22)] backdrop-blur"
          style={{
            backgroundColor: "rgba(255,252,248,0.90)",
            borderColor: "rgba(42,30,26,0.10)",
          }}
        >
          {/* inner glow */}
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(900px_420px_at_25%_10%,rgba(201,174,126,0.18),transparent_55%),radial-gradient(900px_420px_at_80%_20%,rgba(195,154,139,0.12),transparent_60%)]" />

          <div className="relative">
            {/* Selected Services */}
            <div className="mb-10">
              <h3
                className="text-sm font-semibold mb-4 flex items-center gap-2 tracking-[0.12em] uppercase"
                style={{ color: PALETTE.espresso }}
              >
                <Calendar className="w-4 h-4" style={{ color: PALETTE.champagne }} />
                {lang === "es" ? "Servicios seleccionados" : "Selected services"}
              </h3>

              {cart.length === 0 ? (
                <p className="text-sm italic" style={{ color: PALETTE.taupe }}>
                  {lang === "es"
                    ? "No hay servicios seleccionados."
                    : "No services selected."}
                </p>
              ) : (
                <div className="space-y-2">
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
                        <div
                          className="text-sm font-medium truncate"
                          style={{ color: PALETTE.espresso }}
                        >
                          {lang === "es" ? service.nameEs : service.nameEn}
                        </div>
                        <div className="text-xs" style={{ color: PALETTE.cocoa }}>
                          {service.duration}
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
                className="text-sm font-semibold mb-4 flex items-center gap-2 tracking-[0.12em] uppercase"
                style={{ color: PALETTE.espresso }}
              >
                <Calendar className="w-4 h-4" style={{ color: PALETTE.champagne }} />
                {lang === "es" ? "Selecciona fecha" : "Select date"}
              </h3>

              <div className="flex flex-wrap gap-2">
                {availableDates.map((date) => {
                  const dateStr = date.toISOString().split("T")[0];
                  const dayName = date.toLocaleDateString(
                    lang === "es" ? "es-ES" : "en-US",
                    { weekday: "short" }
                  );
                  const dayNum = date.getDate();
                  const month = date.toLocaleDateString(
                    lang === "es" ? "es-ES" : "en-US",
                    { month: "short" }
                  );

                  const isActive = selectedDate === dateStr;

                  return (
                    <button
                      key={dateStr}
                      onClick={() => setSelectedDate(dateStr)}
                      className="rounded-2xl px-4 py-3 text-center border transition focus:outline-none focus:ring-2"
                      style={{
                        backgroundColor: isActive
                          ? "rgba(195,154,139,0.95)"
                          : "rgba(251,248,243,0.72)",
                        borderColor: isActive
                          ? "rgba(195,154,139,0.55)"
                          : "rgba(42,30,26,0.10)",
                        color: isActive ? "#FFFFFF" : PALETTE.espresso,
                        boxShadow: isActive
                          ? "0 18px 55px rgba(195,154,139,0.30)"
                          : "0 10px 30px rgba(42,30,26,0.08)",
                      }}
                    >
                      <div
                        className="text-[11px] uppercase tracking-[0.16em]"
                        style={{ opacity: isActive ? 0.9 : 0.75 }}
                      >
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
                className="text-sm font-semibold mb-4 flex items-center gap-2 tracking-[0.12em] uppercase"
                style={{ color: PALETTE.espresso }}
              >
                <Clock className="w-4 h-4" style={{ color: PALETTE.champagne }} />
                {lang === "es" ? "Selecciona hora" : "Select time"}
              </h3>

              <div className="flex flex-wrap gap-2">
                {timeSlots.map((time) => {
                  const isActive = selectedTime === time;
                  return (
                    <button
                      key={time}
                      onClick={() => setSelectedTime(time)}
                      className="rounded-2xl px-5 py-2.5 text-sm border transition focus:outline-none focus:ring-2"
                      style={{
                        backgroundColor: isActive
                          ? "rgba(42,30,26,0.92)"
                          : "rgba(251,248,243,0.72)",
                        borderColor: isActive
                          ? "rgba(42,30,26,0.45)"
                          : "rgba(42,30,26,0.10)",
                        color: isActive ? "#FFFFFF" : PALETTE.espresso,
                        boxShadow: isActive
                          ? "0 18px 55px rgba(42,30,26,0.22)"
                          : "0 10px 30px rgba(42,30,26,0.08)",
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
                className="text-sm font-semibold mb-4 flex items-center gap-2 tracking-[0.12em] uppercase"
                style={{ color: PALETTE.espresso }}
              >
                <User className="w-4 h-4" style={{ color: PALETTE.champagne }} />
                {lang === "es" ? "Tus datos" : "Your details"}
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* Name */}
                <div className="relative">
                  <User
                    className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4"
                    style={{ color: PALETTE.taupe }}
                  />
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

                {/* Phone */}
                <div className="relative">
                  <Phone
                    className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4"
                    style={{ color: PALETTE.taupe }}
                  />
                  <Input
                    type="tel"
                    placeholder={lang === "es" ? "Teléfono" : "Phone"}
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="pl-10 rounded-2xl"
                    style={{
                      backgroundColor: "rgba(241,232,221,0.65)",
                      borderColor: "rgba(42,30,26,0.12)",
                      color: PALETTE.espresso,
                    }}
                  />
                </div>

                {/* Email */}
                <div className="relative">
                  <Mail
                    className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4"
                    style={{ color: PALETTE.taupe }}
                  />
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

              {/* helper text */}
              <p className="mt-4 text-xs" style={{ color: PALETTE.taupe }}>
                {lang === "es"
                  ? "Confirmaremos tu cita por mensaje tan pronto recibamos tu solicitud."
                  : "We’ll confirm your appointment by message as soon as we receive your request."}
              </p>
            </div>

            {/* Continue Button */}
            <Button
              onClick={handleContinue}
              disabled={!isFormValid}
              className="w-full py-4 text-base font-medium rounded-2xl transition"
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
    </section>
  );
}