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
          ? "¡Hola! Soy el asistente de AIKOPR222. ¿En qué puedo ayudarte?"
          : "Hi! I’m the AIKOPR222 assistant. How can I help you?",
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    if (isOpen) inputRef.current?.focus();
  }, [isOpen]);

  async function sendToWebhook(text) {
    const res = await fetch(webhookUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        message: text,
        language: lang,
      }),
    });

    const data = await res.json();
    return data.answer;
  }

  const handleSend = async (text = input) => {
    const clean = text.trim();
    if (!clean || isLoading) return;

    setMessages((prev) => [...prev, { role: "user", content: clean }]);
    setInput("");
    setIsLoading(true);

    try {
      const answer = await sendToWebhook(clean);
      setMessages((prev) => [...prev, { role: "assistant", content: answer }]);
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content:
            lang === "es"
              ? "Ocurrió un error. Intenta nuevamente."
              : "Something went wrong. Please try again.",
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddService = (serviceId) => {
    const service = services.find((s) => s.id === serviceId);
    if (!service) return;

    onAddToCart?.(service);

    setMessages((prev) => [
      ...prev,
      {
        role: "assistant",
        content:
          lang === "es"
            ? `Agregué ${service.nameEs}. ¿Deseas reservar ahora?`
            : `I added ${service.nameEn}. Would you like to book now?`,
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

      <div className="fixed inset-y-0 right-0 z-50 w-full max-w-md bg-[#FBF8F3] shadow-xl flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b">
          <h3 className="text-lg font-medium">
            {lang === "es" ? "Asistente AI" : "AI Assistant"}
          </h3>
          <button onClick={onClose}>
            <X />
          </button>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto px-6 py-6">
          {messages.length === 1 && (
            <div className="mb-6 flex gap-2 flex-wrap">
              {QUICK_REPLIES[lang].map((r) => (
                <button
                  key={r}
                  onClick={() => handleSend(r)}
                  className="rounded-full border px-4 py-2 text-xs"
                >
                  {r}
                </button>
              ))}
            </div>
          )}

          {messages.map((msg, i) => (
            <MessageBubble
              key={i}
              message={msg}
              lang={lang}
              onAddService={handleAddService}
              onBookNow={handleBookNow}
            />
          ))}

          {isLoading && <Loader2 className="animate-spin mt-4" />}
          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <div className="border-t px-6 py-4 flex gap-3">
          <input
            ref={inputRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSend()}
            placeholder={lang === "es" ? "Escribe tu mensaje…" : "Type your message…"}
            className="flex-1 rounded-xl border px-4 py-3 text-[16px]"
            disabled={isLoading}
          />
          <button
            onClick={() => handleSend()}
            disabled={!input.trim() || isLoading}
            className="h-12 w-12 rounded-xl flex items-center justify-center"
            style={{ backgroundColor: PALETTE.rose, color: "#fff" }}
          >
            <Send />
          </button>
        </div>
      </div>
    </>
  );
}

function MessageBubble({ message, lang, onAddService, onBookNow }) {
  const isUser = message.role === "user";

  const mentionedServices = !isUser
    ? services.filter((s) =>
        message.content
          .toLowerCase()
          .includes((lang === "es" ? s.nameEs : s.nameEn).toLowerCase())
      )
    : [];

  return (
    <div className={`flex ${isUser ? "justify-end" : "justify-start"} mb-3`}>
      <div className="max-w-[85%]">
        <div className="rounded-2xl px-4 py-3 border">
          <p className="text-sm whitespace-pre-wrap">{message.content}</p>
        </div>

        {!isUser && mentionedServices.length > 0 && (
          <div className="mt-2 flex flex-wrap gap-2">
            {mentionedServices.slice(0, 2).map((s) => (
              <button
                key={s.id}
                onClick={() => onAddService(s.id)}
                className="text-xs border rounded-full px-3 py-1"
              >
                <Plus className="inline h-3 w-3" />{" "}
                {lang === "es" ? "Agregar" : "Add"}{" "}
                {lang === "es" ? s.nameEs : s.nameEn}
              </button>
            ))}

            <button
              onClick={onBookNow}
              className="text-xs border rounded-full px-3 py-1"
            >
              <Calendar className="inline h-3 w-3" />{" "}
              {lang === "es" ? "Reservar" : "Book"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}