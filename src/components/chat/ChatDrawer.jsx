import React, { useState, useRef, useEffect } from "react";
import { X, Send, Loader2, Plus, Calendar } from "lucide-react";
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
  es: ["Recomiéndame un servicio", "Precios", "¿Cuál es el depósito?", "Disponibilidad"],
  en: ["Recommend a service", "Pricing", "What's the deposit?", "Availability"],
};

function getPredefinedReply({ lang, text }) {
  const t = (s) => String(s || "").toLowerCase().trim();
  const msg = t(text);

  if (lang === "en") {
    if (msg.includes("recommend") || msg.includes("recom")) {
      return (
        "Sure — tell me what you want to treat (hair removal, acne/texture, tattoo, tightening) and the area. " +
        "Meanwhile, popular options are Laser Hair Removal, Carbon Peel, Tattoo Removal, and HIFU."
      );
    }
    if (msg.includes("pricing") || msg.includes("price") || msg.includes("cost")) {
      return (
        "Pricing depends on the treatment and area. If you tell me the service + area, I'll guide you. " +
        "You can also add a service to your appointment and see the total before confirming."
      );
    }
    if (msg.includes("deposit")) {
      return (
        "A deposit may be required to secure your appointment. " +
        "If you share the service you want, we'll confirm the exact deposit amount by message."
      );
    }
    if (msg.includes("availability") || msg.includes("available") || msg.includes("schedule")) {
      return (
        "Appointments are available on select dates and time slots. " +
        "Tap "Book now" and choose a date/time — we'll confirm by message."
      );
    }
    return null;
  }

  if (msg.includes("recom") || msg.includes("recomiéndame") || msg.includes("recomiendame")) {
    return (
      "Claro — dime qué deseas tratar (depilación, acné/textura, tatuaje, reafirmación) y en qué área. " +
      "Mientras tanto, opciones populares son Depilación Láser, Carbon Peel, Remoción de Tatuajes y HIFU."
    );
  }
  if (
    msg.includes("precio") ||
    msg.includes("precios") ||
    msg.includes("costo") ||
    msg.includes("costos") ||
    msg.includes("cuanto") ||
    msg.includes("cuánto")
  ) {
    return (
      "Los precios dependen del tratamiento y el área. Si me dices el servicio + el área, te oriento. " +
      "También puedes agregar un servicio a tu cita y ver el total antes de confirmar."
    );
  }
  if (msg.includes("depósito") || msg.includes("deposito")) {
    return (
      "Es posible que se requiera un depósito para asegurar tu cita. " +
      "Si me dices qué servicio deseas, te confirmamos el depósito exacto por mensaje."
    );
  }
  if (msg.includes("dispon") || msg.includes("disponibilidad") || msg.includes("horario") || msg.includes("citas")) {
    return (
      "Las citas están disponibles en fechas y horarios específicos. " +
      "Presiona "Reservar ahora", elige fecha/hora y te confirmaremos por mensaje."
    );
  }

  return null;
}

export default function ChatDrawer({
  isOpen,
  onClose,
  lang,
  onAddToCart,
  scrollToBooking,
  webhookUrl,
}) {
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      content:
        lang === "es"
          ? "¡Hola! Soy tu asistente de AIKOPR222. Puedes preguntar por precios, depósito o disponibilidad."
          : "Hi! I'm your AIKOPR222 assistant. You can ask about pricing, deposit, or availability.",
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  const isEs = lang === "es";

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (isOpen && inputRef.current) inputRef.current.focus();
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [isOpen]);

  const advisorFallback = isEs
    ? "Gracias — un asesor de AIKOPR222 te responderá en breve para ayudarte. Mientras tanto, puedes tocar "Reservar ahora" para escoger fecha y hora."
    : "Thanks — an AIKOPR222 advisor will reply shortly to help you. In the meantime, you can tap "Book now" to pick a date and time.";

  const handleSend = async (text = input) => {
    if (!text.trim() || isLoading) return;

    const userMessage = { role: "user", content: text };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    try {
      const predefined = getPredefinedReply({ lang, text });
      const reply = predefined || advisorFallback;

      await new Promise((r) => setTimeout(r, 450));
      setMessages((prev) => [...prev, { role: "assistant", content: reply }]);
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: isEs
            ? "Lo siento, hubo un error. Por favor intenta de nuevo."
            : "Sorry, there was an error. Please try again.",
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleQuickReply = (text) => handleSend(text);

  const handleAddService = (serviceId) => {
    const service = services.find((s) => s.id === serviceId);
    if (!service) return;

    onAddToCart?.(service);

    setMessages((prev) => [
      ...prev,
      {
        role: "assistant",
        content: isEs
          ? `¡Listo! Agregué ${service.nameEs} a tu cita. ¿Deseas agregar otro servicio o reservar?`
          : `Done! I added ${service.nameEn} to your appointment. Want to add another service or book?`,
      },
    ]);
  };

  const handleBookNow = () => {
    scrollToBooking?.();
    onClose?.();
  };

  if (!isOpen) return null;

  return (
    <>
      <div
        className="fixed inset-0 z-50 backdrop-blur-sm"
        style={{ backgroundColor: "rgba(42,30,26,0.25)" }}
        onClick={onClose}
      />

      <div
        className="fixed inset-y-0 right-0 z-50 flex w-full max-w-md flex-col overflow-hidden border-l shadow-[0_50px_140px_rgba(42,30,26,0.35)] md:max-w-[420px]"
        style={{
          backgroundColor: "rgba(251,248,243,0.95)",
          borderColor: "rgba(42,30,26,0.10)",
          backdropFilter: "blur(20px)",
          WebkitTextSizeAdjust: "100%",
          overscrollBehavior: "contain",
        }}
      >
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(900px_420px_at_50%_0%,rgba(201,174,126,0.18),transparent_55%)]" />

        <div
          className="relative flex items-center justify-between border-b px-6 py-4"
          style={{ borderColor: "rgba(42,30,26,0.10)" }}
        >
          <div>
            <div className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full" style={{ backgroundColor: PALETTE.champagne }} />
              <h3 className="text-lg font-medium" style={{ color: PALETTE.espresso }}>
                {isEs ? "Asistente AI" : "AI Assistant"}
              </h3>
            </div>
            <p className="mt-1 text-xs" style={{ color: PALETTE.taupe }}>
              {isEs ? "Respuestas rápidas + ayuda para reservar" : "Quick answers + help booking"}
            </p>
          </div>

          <button
            onClick={onClose}
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border transition"
            style={{
              backgroundColor: "rgba(255,252,248,0.70)",
              borderColor: "rgba(42,30,26,0.12)",
            }}
            aria-label={isEs ? "Cerrar" : "Close"}
          >
            <X className="h-5 w-5" style={{ color: PALETTE.cocoa }} />
          </button>
        </div>

        <div className="relative flex-1 overflow-y-auto px-6 py-6" style={{ overscrollBehavior: "contain" }}>
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
              onKeyDown={(e) => e.key === "Enter" && handleSend()}
              onFocus={() => {
                setTimeout(() => scrollToBottom(), 120);
              }}
              placeholder={isEs ? "Escribe tu mensaje..." : "Type your message..."}
              className="flex-1 rounded-xl border px-4 py-3 text-[16px] md:text-sm outline-none transition focus:border-opacity-50"
              style={{
                backgroundColor: "rgba(241,232,221,0.60)",
                borderColor: "rgba(42,30,26,0.12)",
                color: PALETTE.espresso,
              }}
              disabled={isLoading}
              inputMode="text"
              autoCorrect="on"
              autoCapitalize="sentences"
            />

            <button
              onClick={() => handleSend()}
              disabled={!input.trim() || isLoading}
              className="inline-flex h-12 w-12 items-center justify-center rounded-xl transition disabled:opacity-50"
              style={{ backgroundColor: PALETTE.rose, color: "#FFFFFF" }}
              aria-label={isEs ? "Enviar" : "Send"}
            >
              <Send className="h-5 w-5" />
            </button>
          </div>

          <p className="mt-2 text-[11px]" style={{ color: "rgba(139,116,104,0.9)" }}>
            {isEs
              ? "Consejo: usa los botones de arriba para respuestas rápidas."
              : "Tip: use the buttons above for quick replies."}
          </p>
        </div>
      </div>
    </>
  );
}

function MessageBubble({ message, lang, onAddService, onBookNow }) {
  const isUser = message.role === "user";
  const isEs = lang === "es";

  const mentionedServices = !isUser
    ? services.filter((s) => {
        const name = isEs ? s.nameEs : s.nameEn;
        return (message.content || "").toLowerCase().includes((name || "").toLowerCase());
      })
    : [];

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
          <p className="text-sm leading-relaxed whitespace-pre-wrap">{message.content}</p>
        </div>

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
                {isEs ? "Agregar" : "Add"} {isEs ? service.nameEs : service.nameEn}
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
              {isEs ? "Reservar ahora" : "Book now"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}