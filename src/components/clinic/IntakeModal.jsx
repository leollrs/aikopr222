import React, { useState, useEffect } from "react";
import { X, Upload, Loader2, CheckCircle2 } from "lucide-react";
import { base44 } from "@/api/base44Client";

const PALETTE = {
  linen: "#F1E8DD",
  espresso: "#2A1E1A",
  cocoa: "#6B5A52",
  champagne: "#C9AE7E",
  rose: "#C39A8B",
};

export default function IntakeModal({ 
  isOpen, 
  onClose, 
  lang,
  bookingData,
  serviceName,
  onSubmitComplete
}) {
  const isEs = lang === "es";
  
  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    email: "",
    serviceName: serviceName || "",
    appointmentDate: bookingData?.date || "",
    appointmentTime: bookingData?.time || "",
    serviceType: "clinic",
    address: "",
    isFirstVisit: "",
    mainGoal: "",
    photos: [],
    pregnancy: false,
    activeIrritation: false,
    recentSunExposure: false,
    sensitiveSkin: false,
    scarringTendency: false,
    understands: false,
    contactMethod: "whatsapp",
    additionalNotes: "",
  });

  const [uploading, setUploading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!isOpen) return;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  useEffect(() => {
    if (isOpen && bookingData) {
      setFormData(prev => ({
        ...prev,
        fullName: bookingData.name || "",
        phone: bookingData.phone || "",
        email: bookingData.email || "",
        appointmentDate: bookingData.date || "",
        appointmentTime: bookingData.time || "",
        address: bookingData.address || "",
      }));
    }
  }, [isOpen, bookingData]);

  const handleFileUpload = async (e) => {
    const files = Array.from(e.target.files).slice(0, 3);
    if (files.length === 0) return;

    setUploading(true);
    try {
      const uploadedUrls = [];
      for (const file of files) {
        const { file_url } = await base44.integrations.Core.UploadFile({ file });
        uploadedUrls.push(file_url);
      }
      setFormData(prev => ({ ...prev, photos: uploadedUrls }));
    } catch (err) {
      setError(isEs ? "Error al subir fotos" : "Error uploading photos");
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.fullName || !formData.phone || !formData.email) {
      setError(isEs ? "Por favor completa todos los campos requeridos" : "Please complete all required fields");
      return;
    }

    if (!formData.understands) {
      setError(isEs ? "Debes aceptar los términos" : "You must accept the terms");
      return;
    }

    // Don't submit to webhook yet - just pass data to parent and show success
    setSubmitted(true);
    
    // Call onSubmitComplete with form data after a brief delay
    setTimeout(() => {
      onSubmitComplete?.(formData);
    }, 1500);
  };

  if (!isOpen) return null;

  if (submitted) {
    return (
      <div className="fixed inset-0 z-[100]">
        <div
          className="absolute inset-0 w-full h-full backdrop-blur-sm"
          style={{ background: "rgba(0,0,0,0.64)" }}
        />
        
        <div className="relative mx-auto w-full max-w-2xl px-4 pt-20 pb-10">
          <div
            className="rounded-3xl border p-8 sm:p-12 text-center"
            style={{
              background: "linear-gradient(180deg, rgba(255,255,255,0.95), rgba(255,255,255,0.88))",
              borderColor: "rgba(42,30,26,0.12)",
              boxShadow: "0 40px 120px rgba(42,30,26,0.20)",
              backdropFilter: "blur(14px)",
            }}
          >
            <div
              className="mx-auto h-16 w-16 rounded-full flex items-center justify-center mb-6"
              style={{ backgroundColor: "rgba(201,174,126,0.18)" }}
            >
              <CheckCircle2 className="h-8 w-8" style={{ color: PALETTE.champagne }} />
            </div>

            <h3
              className="font-display text-2xl sm:text-3xl font-medium mb-4"
              style={{ color: PALETTE.espresso }}
            >
              {isEs ? "¡Formulario enviado!" : "Form submitted!"}
            </h3>

            <p className="text-base sm:text-lg mb-8" style={{ color: PALETTE.cocoa }}>
              {isEs
                ? "Gracias por completar tu evaluación previa. Nos pondremos en contacto contigo pronto."
                : "Thank you for completing your pre-appointment evaluation. We'll contact you soon."}
            </p>

            <button
              onClick={onClose}
              className="rounded-2xl px-6 py-3 text-sm font-semibold"
              style={{
                backgroundColor: PALETTE.rose,
                color: "#FFFFFF",
              }}
            >
              {isEs ? "Cerrar" : "Close"}
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-[100]">
      <div
        className="absolute inset-0 w-full h-full backdrop-blur-sm"
        style={{ background: "rgba(0,0,0,0.64)" }}
      />

      <div className="relative mx-auto w-full max-w-3xl px-3 sm:px-6 h-full flex flex-col py-6">
        <div
          className="rounded-3xl border overflow-hidden flex flex-col max-h-full"
          style={{
            background: "linear-gradient(180deg, rgba(255,255,255,0.95), rgba(255,255,255,0.88))",
            borderColor: "rgba(42,30,26,0.12)",
            boxShadow: "0 40px 120px rgba(42,30,26,0.20)",
            backdropFilter: "blur(14px)",
          }}
        >
          {/* Header */}
          <div
            className="px-5 sm:px-7 py-5 border-b flex items-center justify-between"
            style={{ borderColor: "rgba(42,30,26,0.10)" }}
          >
            <div>
              <h3
                className="font-display text-xl sm:text-2xl font-medium"
                style={{ color: PALETTE.espresso }}
              >
                {isEs ? "Evaluación previa" : "Pre-appointment evaluation"}
              </h3>
              <p className="text-sm mt-1" style={{ color: PALETTE.cocoa }}>
                {isEs
                  ? "Completa esta información para personalizar tu cita"
                  : "Complete this form to personalize your appointment"}
              </p>
            </div>

            <button
              onClick={onClose}
              className="rounded-full p-2 border"
              style={{
                backgroundColor: "rgba(255,255,255,0.70)",
                borderColor: "rgba(42,30,26,0.14)",
              }}
            >
              <X className="h-5 w-5" style={{ color: PALETTE.espresso }} />
            </button>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto px-5 sm:px-7 py-6">
            <div className="space-y-6">
              {/* Basic Info */}
              <section>
                <h4 className="text-sm font-semibold mb-3" style={{ color: PALETTE.espresso }}>
                  {isEs ? "Información básica" : "Basic information"}
                </h4>
                <div className="space-y-3">
                  <input
                    type="text"
                    placeholder={isEs ? "Nombre completo *" : "Full name *"}
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    required
                    className="w-full rounded-xl border px-4 py-3 text-sm outline-none"
                    style={{
                      backgroundColor: "rgba(241,232,221,0.40)",
                      borderColor: "rgba(42,30,26,0.12)",
                      color: PALETTE.espresso,
                    }}
                  />
                  <input
                    type="tel"
                    placeholder={isEs ? "Teléfono *" : "Phone *"}
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    required
                    className="w-full rounded-xl border px-4 py-3 text-sm outline-none"
                    style={{
                      backgroundColor: "rgba(241,232,221,0.40)",
                      borderColor: "rgba(42,30,26,0.12)",
                      color: PALETTE.espresso,
                    }}
                  />
                  <input
                    type="email"
                    placeholder={isEs ? "Email *" : "Email *"}
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    required
                    className="w-full rounded-xl border px-4 py-3 text-sm outline-none"
                    style={{
                      backgroundColor: "rgba(241,232,221,0.40)",
                      borderColor: "rgba(42,30,26,0.12)",
                      color: PALETTE.espresso,
                    }}
                  />
                </div>
              </section>

              {/* Service Type */}
              <section>
                <h4 className="text-sm font-semibold mb-3" style={{ color: PALETTE.espresso }}>
                  {isEs ? "Tipo de servicio" : "Service type"}
                </h4>
                <div className="flex gap-3">
                  <label className="flex-1 flex items-center gap-2 rounded-xl border px-4 py-3 cursor-pointer">
                    <input
                      type="radio"
                      name="serviceType"
                      value="clinic"
                      checked={formData.serviceType === "clinic"}
                      onChange={(e) => setFormData({ ...formData, serviceType: e.target.value })}
                      style={{ accentColor: PALETTE.rose }}
                    />
                    <span className="text-sm" style={{ color: PALETTE.espresso }}>
                      {isEs ? "En cabina" : "In clinic"}
                    </span>
                  </label>
                  <label className="flex-1 flex items-center gap-2 rounded-xl border px-4 py-3 cursor-pointer">
                    <input
                      type="radio"
                      name="serviceType"
                      value="home"
                      checked={formData.serviceType === "home"}
                      onChange={(e) => setFormData({ ...formData, serviceType: e.target.value })}
                      style={{ accentColor: PALETTE.rose }}
                    />
                    <span className="text-sm" style={{ color: PALETTE.espresso }}>
                      {isEs ? "A domicilio" : "Home service"}
                    </span>
                  </label>
                </div>

                {formData.serviceType === "home" && (
                  <input
                    type="text"
                    placeholder={isEs ? "Dirección" : "Address"}
                    value={formData.address}
                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                    className="w-full rounded-xl border px-4 py-3 text-sm outline-none mt-3"
                    style={{
                      backgroundColor: "rgba(241,232,221,0.40)",
                      borderColor: "rgba(42,30,26,0.12)",
                      color: PALETTE.espresso,
                    }}
                  />
                )}
              </section>

              {/* Client Context */}
              <section>
                <h4 className="text-sm font-semibold mb-3" style={{ color: PALETTE.espresso }}>
                  {isEs ? "Contexto" : "Context"}
                </h4>
                <div className="space-y-3">
                  <div className="flex gap-3">
                    <label className="flex-1 flex items-center gap-2 rounded-xl border px-4 py-3 cursor-pointer">
                      <input
                        type="radio"
                        name="isFirstVisit"
                        value="yes"
                        checked={formData.isFirstVisit === "yes"}
                        onChange={(e) => setFormData({ ...formData, isFirstVisit: e.target.value })}
                        style={{ accentColor: PALETTE.rose }}
                      />
                      <span className="text-sm" style={{ color: PALETTE.espresso }}>
                        {isEs ? "Primera visita" : "First visit"}
                      </span>
                    </label>
                    <label className="flex-1 flex items-center gap-2 rounded-xl border px-4 py-3 cursor-pointer">
                      <input
                        type="radio"
                        name="isFirstVisit"
                        value="no"
                        checked={formData.isFirstVisit === "no"}
                        onChange={(e) => setFormData({ ...formData, isFirstVisit: e.target.value })}
                        style={{ accentColor: PALETTE.rose }}
                      />
                      <span className="text-sm" style={{ color: PALETTE.espresso }}>
                        {isEs ? "Cliente regular" : "Returning client"}
                      </span>
                    </label>
                  </div>

                  <textarea
                    placeholder={isEs ? "Objetivo principal para este tratamiento" : "Main goal for this treatment"}
                    value={formData.mainGoal}
                    onChange={(e) => setFormData({ ...formData, mainGoal: e.target.value })}
                    rows={3}
                    className="w-full rounded-xl border px-4 py-3 text-sm outline-none resize-none"
                    style={{
                      backgroundColor: "rgba(241,232,221,0.40)",
                      borderColor: "rgba(42,30,26,0.12)",
                      color: PALETTE.espresso,
                    }}
                  />

                  <div>
                    <label
                      className="block text-xs mb-2"
                      style={{ color: PALETTE.cocoa }}
                    >
                      {isEs ? "Fotos del área (máx 3)" : "Photos of area (max 3)"}
                    </label>
                    <label
                      className="flex items-center justify-center gap-2 rounded-xl border px-4 py-3 cursor-pointer"
                      style={{
                        backgroundColor: "rgba(241,232,221,0.40)",
                        borderColor: "rgba(42,30,26,0.12)",
                      }}
                    >
                      <input
                        type="file"
                        accept="image/*"
                        multiple
                        onChange={handleFileUpload}
                        className="hidden"
                        disabled={uploading}
                      />
                      {uploading ? (
                        <Loader2 className="h-4 w-4 animate-spin" style={{ color: PALETTE.cocoa }} />
                      ) : (
                        <Upload className="h-4 w-4" style={{ color: PALETTE.cocoa }} />
                      )}
                      <span className="text-sm" style={{ color: PALETTE.cocoa }}>
                        {formData.photos.length > 0
                          ? `${formData.photos.length} ${isEs ? "foto(s)" : "photo(s)"}`
                          : isEs ? "Subir fotos" : "Upload photos"}
                      </span>
                    </label>
                  </div>
                </div>
              </section>

              {/* Safety Screening */}
              <section>
                <h4 className="text-sm font-semibold mb-3" style={{ color: PALETTE.espresso }}>
                  {isEs ? "Evaluación estética" : "Esthetic evaluation"}
                </h4>
                <div className="space-y-2">
                  {[
                    { key: "pregnancy", label: isEs ? "Embarazo o lactancia" : "Pregnancy or breastfeeding" },
                    { key: "activeIrritation", label: isEs ? "Irritación o infección activa en el área" : "Active irritation or infection in area" },
                    { key: "recentSunExposure", label: isEs ? "Exposición solar intensa reciente (7-14 días)" : "Recent intense sun exposure (7-14 days)" },
                    { key: "sensitiveSkin", label: isEs ? "Piel extremadamente sensible" : "Extremely sensitive skin" },
                    { key: "scarringTendency", label: isEs ? "Tendencia a cicatrización anormal" : "Abnormal scarring tendency" },
                  ].map(({ key, label }) => (
                    <label key={key} className="flex items-start gap-3 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={formData[key]}
                        onChange={(e) => setFormData({ ...formData, [key]: e.target.checked })}
                        className="mt-1"
                        style={{ accentColor: PALETTE.rose }}
                      />
                      <span className="text-sm" style={{ color: PALETTE.espresso }}>
                        {label}
                      </span>
                    </label>
                  ))}
                </div>

                <label className="flex items-start gap-3 mt-4 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.understands}
                    onChange={(e) => setFormData({ ...formData, understands: e.target.checked })}
                    className="mt-1"
                    style={{ accentColor: PALETTE.rose }}
                    required
                  />
                  <span className="text-sm" style={{ color: PALETTE.espresso }}>
                    {isEs
                      ? "Entiendo que esta es una evaluación estética y el plan de tratamiento puede ajustarse."
                      : "I understand this is an esthetic evaluation and the treatment plan may be adjusted."}
                  </span>
                </label>
              </section>

              {/* Additional */}
              <section>
                <h4 className="text-sm font-semibold mb-3" style={{ color: PALETTE.espresso }}>
                  {isEs ? "Contacto preferido" : "Preferred contact"}
                </h4>
                <select
                  value={formData.contactMethod}
                  onChange={(e) => setFormData({ ...formData, contactMethod: e.target.value })}
                  className="w-full rounded-xl border px-4 py-3 text-sm outline-none"
                  style={{
                    backgroundColor: "rgba(241,232,221,0.40)",
                    borderColor: "rgba(42,30,26,0.12)",
                    color: PALETTE.espresso,
                  }}
                >
                  <option value="call">{isEs ? "Llamada" : "Call"}</option>
                  <option value="whatsapp">WhatsApp</option>
                  <option value="sms">SMS</option>
                </select>

                <textarea
                  placeholder={isEs ? "¿Algo que debamos saber antes de tu cita?" : "Anything we should know before your appointment?"}
                  value={formData.additionalNotes}
                  onChange={(e) => setFormData({ ...formData, additionalNotes: e.target.value })}
                  rows={3}
                  className="w-full rounded-xl border px-4 py-3 text-sm outline-none resize-none mt-3"
                  style={{
                    backgroundColor: "rgba(241,232,221,0.40)",
                    borderColor: "rgba(42,30,26,0.12)",
                    color: PALETTE.espresso,
                  }}
                />
              </section>
            </div>

            {error && (
              <div
                className="mt-4 rounded-xl px-4 py-3 text-sm"
                style={{
                  backgroundColor: "rgba(220,38,38,0.10)",
                  color: "#DC2626",
                }}
              >
                {error}
              </div>
            )}
          </form>

          {/* Footer */}
          <div
            className="px-5 sm:px-7 py-4 border-t"
            style={{ borderColor: "rgba(42,30,26,0.10)" }}
          >
            <button
              type="submit"
              onClick={handleSubmit}
              disabled={submitting}
              className="w-full rounded-2xl px-6 py-3 text-sm font-semibold flex items-center justify-center gap-2 disabled:opacity-50"
              style={{
                backgroundColor: PALETTE.rose,
                color: "#FFFFFF",
              }}
            >
              {submitting ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  {isEs ? "Enviando..." : "Submitting..."}
                </>
              ) : (
                isEs ? "Enviar formulario" : "Submit form"
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}