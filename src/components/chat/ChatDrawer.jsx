import React, { useState, useRef, useEffect } from "react";
import { X, Send, Loader2, Plus, Calendar } from "lucide-react";
import { base44 } from "@/api/base44Client";
import { services } from "@/components/clinic/ServicesSection";

const PALETTE = {
  cream: "#FBF8F3",
  linen: "#F1E8DD",
  espresso: "#2A1E1A",
  cocoa: "#6B5A52",
  champagne: "#C9AE7E",
  rose: "#C39A8B",
  taupe: "#8B7468",
};

const QUICK_REPLIES = {
  es: [
    "Recomiéndame un servicio",
    "Precios",
    "¿Cuál es el depósito?",
    "Disponibilidad",
  ],
  en: [
    "Recommend a service",
    "Pricing",
    "What's the deposit?",
    "Availability",
  ],
};

export default function ChatDrawer({ isOpen, onClose, lang, onAddToCart, scrollToBooking }) {
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      content: lang === "es"
        ? "¡Hola! Soy tu asistente personal de AIKOPR222. ¿En qué puedo ayudarte hoy?"
        : "Hi! I'm your personal AIKOPR222 assistant. How can I help you today?",
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  const handleSend = async (text = input) => {
    if (!text.trim() || isLoading) return;

    const userMessage = { role: "user", content: text };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    try {
      const response = await base44.functions.invoke("chat", {
        lang,
        messages: [...messages, userMessage],
        context: {
          services: services.map((s) => ({
            id: s.id,
            nameEs: s.nameEs,
            nameEn: s.nameEn,
            descEs: s.descEs,
            descEn: s.descEn,
            duration: s.duration,
            price: s.price,
            idealEs: s.idealEs,
            idealEn: s.idealEn,
          })),
        },
      });

      if (response.data.reply) {
        setMessages((prev) => [
          ...prev,
          { role: "assistant", content: response.data.reply },
        ]);
      } else {
        throw new Error("No reply");
      }
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: lang === "es"
            ? "Lo siento, hubo un error. Por favor intenta de nuevo."
            : "Sorry, there was an error. Please try again.",
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleQuickReply = (text) => {
    handleSend(text);
  };

  const handleAddService = (serviceId) => {
    const service = services.find((s) => s.id === serviceId);
    if (service) {
      onAddToCart(service);
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: lang === "es"
            ? `¡Perfecto! He agregado ${service.nameEs} a tu cita. ¿Algo más en lo que pueda ayudarte?`
            : `Perfect! I've added ${service.nameEn} to your appointment. Anything else I can help with?`,
        },
      ]);
    }
  };

  const handleBookNow = () => {
    scrollToBooking();
    onClose();
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 z-50 backdrop-blur-sm"
        style={{ backgroundColor: "rgba(42,30,26,0.25)" }}
        onClick={onClose}
      />

      {/* Drawer */}
      <div
        className="fixed inset-y-0 right-0 z-50 flex w-full max-w-md flex-col overflow-hidden border-l shadow-[0_50px_140px_rgba(42,30,26,0.35)] md:max-w-[420px]"
        style={{
          backgroundColor: "rgba(251,248,243,0.95)",
          borderColor: "rgba(42,30,26,0.10)",
          backdropFilter: "blur(20px)",
        }}
      >
        {/* Glow */}
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(900px_420px_at_50%_0%,rgba(201,174,126,0.18),transparent_55%)]" />

        {/* Header */}
        <div
          className="relative flex items-center justify-between border-b px-6 py-4"
          style={{ borderColor: "rgba(42,30,26,0.10)" }}
        >
          <div>
            <div className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full" style={{ backgroundColor: PALETTE.champagne }} />
              <h3 className="text-lg font-medium" style={{ color: PALETTE.espresso }}>
                {lang === "es" ? "Asistente AI" : "AI Assistant"}
              </h3>
            </div>
            <p className="mt-1 text-xs" style={{ color: PALETTE.taupe }}>
              {lang === "es"
                ? "Te ayudo a elegir el mejor tratamiento"
                : "I'll help you choose the right treatment"}
            </p>
          </div>

          <button
            onClick={onClose}
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border transition"
            style={{
              backgroundColor: "rgba(255,252,248,0.70)",
              borderColor: "rgba(42,30,26,0.12)",
            }}
          >
            <X className="h-5 w-5" style={{ color: PALETTE.cocoa }} />
          </button>
        </div>

        {/* Messages */}
        <div className="relative flex-1 overflow-y-auto px-6 py-6">
          {/* Quick Replies (show only at start) */}
          {messages.length === 1 && (
            <div className="mb-6 flex flex-wrap gap-2">
              {QUICK_REPLIES[lang].map((reply) => (
                <button
                  key={reply}
                  onClick={() => handleQuickReply(reply)}
                  className="rounded-full border px-4 py-2 text-xs font-medium transition hover:scale-105"
                  style={{
                    backgroundColor: "rgba(195,154,139,0.12)",
                    borderColor: "rgba(195,154,139,0.25)",
                    color: PALETTE.rose,
                  }}
                >
                  {reply}
                </button>
              ))}
            </div>
          )}

          {/* Message List */}
          <div className="space-y-4">
            {messages.map((msg, idx) => (
              <MessageBubble
                key={idx}
                message={msg}
                lang={lang}
                onAddService={handleAddService}
                onBookNow={handleBookNow}
              />
            ))}

            {isLoading && (
              <div className="flex items-start gap-3">
                <div
                  className="rounded-2xl border px-4 py-3"
                  style={{
                    backgroundColor: "rgba(255,252,248,0.80)",
                    borderColor: "rgba(42,30,26,0.10)",
                  }}
                >
                  <Loader2 className="h-4 w-4 animate-spin" style={{ color: PALETTE.champagne }} />
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>
        </div>

        {/* Input */}
        <div
          className="relative border-t px-6 py-4"
          style={{ borderColor: "rgba(42,30,26,0.10)" }}
        >
          <div className="flex gap-3">
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && handleSend()}
              placeholder={lang === "es" ? "Escribe tu mensaje..." : "Type your message..."}
              className="flex-1 rounded-xl border px-4 py-3 text-sm outline-none transition focus:border-opacity-50"
              style={{
                backgroundColor: "rgba(241,232,221,0.60)",
                borderColor: "rgba(42,30,26,0.12)",
                color: PALETTE.espresso,
              }}
              disabled={isLoading}
            />
            <button
              onClick={() => handleSend()}
              disabled={!input.trim() || isLoading}
              className="inline-flex h-12 w-12 items-center justify-center rounded-xl transition disabled:opacity-50"
              style={{
                backgroundColor: PALETTE.rose,
                color: "#FFFFFF",
              }}
            >
              <Send className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

function MessageBubble({ message, lang, onAddService, onBookNow }) {
  const isUser = message.role === "user";

  // Check if message mentions specific services
  const mentionedServices = services.filter((s) => {
    const name = lang === "es" ? s.nameEs : s.nameEn;
    return message.content.toLowerCase().includes(name.toLowerCase());
  });

  return (
    <div className={`flex ${isUser ? "justify-end" : "justify-start"}`}>
      <div className={`max-w-[85%] ${isUser ? "flex flex-col items-end" : ""}`}>
        <div
          className="rounded-2xl px-4 py-3"
          style={{
            backgroundColor: isUser ? PALETTE.rose : "rgba(255,252,248,0.80)",
            borderColor: isUser ? "transparent" : "rgba(42,30,26,0.10)",
            border: isUser ? "none" : "1px solid",
            color: isUser ? "#FFFFFF" : PALETTE.cocoa,
          }}
        >
          <p className="text-sm leading-relaxed">{message.content}</p>
        </div>

        {/* Action buttons for assistant messages */}
        {!isUser && mentionedServices.length > 0 && (
          <div className="mt-2 flex flex-wrap gap-2">
            {mentionedServices.slice(0, 2).map((service) => (
              <button
                key={service.id}
                onClick={() => onAddService(service.id)}
                className="inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-medium transition hover:scale-105"
                style={{
                  backgroundColor: "rgba(195,154,139,0.12)",
                  borderColor: "rgba(195,154,139,0.25)",
                  color: PALETTE.rose,
                }}
              >
                <Plus className="h-3 w-3" />
                {lang === "es" ? "Agregar" : "Add"} {lang === "es" ? service.nameEs : service.nameEn}
              </button>
            ))}
            <button
              onClick={onBookNow}
              className="inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-medium transition hover:scale-105"
              style={{
                backgroundColor: "rgba(42,30,26,0.08)",
                borderColor: "rgba(42,30,26,0.15)",
                color: PALETTE.espresso,
              }}
            >
              <Calendar className="h-3 w-3" />
              {lang === "es" ? "Reservar ahora" : "Book now"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}