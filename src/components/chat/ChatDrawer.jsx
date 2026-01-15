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
  es: ["Precios", "Depósito", "Disponibilidad"],
  en: ["Pricing", "Deposit", "Availability"],
};

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
  }, [messages, isLoading]);

  // Focus input when opened
  useEffect(() => {
    if (isOpen && inputRef.current) inputRef.current.focus();
  }, [isOpen]);

  // Prevent body scroll behind the drawer
  useEffect(() => {
    if (!isOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [isOpen]);

  async function callWebhook(nextMessages) {
    if (!webhookUrl) throw new Error("Missing webhookUrl");

    const res = await fetch(webhookUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        lang,
        // send full conversation so your model has context
        messages: nextMessages.map((m) => ({
          role: m.role,
          content: m.content,
        })),
      }),
    });

    if (!res.ok) {
      const text = await res.text().catch(() => "");
      throw new Error(`Webhook error ${res.status}: ${text}`);
    }

    const data = await res.json().catch(() => ({}));

    // Accept multiple possible keys so you don't get undefined
    const reply =
      data.reply ??
      data.answer ??
      data.response ??
      data?.data?.reply ??
      data?.data?.answer ??
      "";

    return String(reply || "");
  }

  const handleSend = async (text = input) => {
    const clean = String(text || "").trim();
    if (!clean || isLoading) return;

    const userMessage = { role: "user", content: clean };

    // build the conversation we will send to webhook
    const nextMessages = [...messages, userMessage];

    setMessages(nextMessages);
    setInput("");
    setIsLoading(true);

    try {
      const replyText = await callWebhook(nextMessages);

      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content:
            replyText.trim().length > 0
              ? replyText
              : isEs
              ? "No pude generar una respuesta. Intenta de nuevo."
              : "I couldn't generate a reply. Please try again.",
        },
      ]);
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: isEs
            ? "Lo siento — ocurrió un error. Por favor intenta de nuevo."
            : "Sorry — something went wrong. Please try again.",
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
          ? `¡Listo! Agregué ${service.nameEs} a tu cita. ¿Deseas reservar ahora?`
          : `Done! I added ${service.nameEn} to your appointment. Would you like to book now?`,
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
          WebkitTextSizeAdjust: "100%",
          overscrollBehavior: "contain",
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
              <span
                className="h-2 w-2 rounded-full"
                style={{ backgroundColor: PALETTE.champagne }}
              />
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

        {/* Messages */}
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

        {/* Input */}
        <div className="relative border-t px-6 py-4" style={{ borderColor: "rgba(42,30,26,0.10)" }}>
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
            {isEs ? "Consejo: usa los botones de arriba para respuestas rápidas." : "Tip: use the buttons above for quick replies."}
          </p>
        </div>
      </div>
    </>
  );
}

function MessageBubble({ message, lang, onAddService, onBookNow }) {
  const isUser = message.role === "user";
  const isEs = lang === "es";

  const content = String(message.content || "");
  const mentionedServices = !isUser
    ? services.filter((s) => {
        const name = isEs ? s.nameEs : s.nameEn;
        return content.toLowerCase().includes(String(name || "").toLowerCase());
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
          <p className="text-sm leading-relaxed whitespace-pre-wrap">{content}</p>
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