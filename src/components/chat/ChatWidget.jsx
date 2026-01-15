import React, { useState } from "react";
import { MessageCircle, X } from "lucide-react";
import ChatDrawer from "./ChatDrawer";

const PALETTE = {
  cream: "#FBF8F3",
  linen: "#F1E8DD",
  espresso: "#2A1E1A",
  cocoa: "#6B5A52",
  champagne: "#C9AE7E",
  rose: "#C39A8B",
  taupe: "#8B7468",
};

// ✅ YOUR N8N WEBHOOK
const N8N_WEBHOOK_URL =
  "https://leollrs.app.n8n.cloud/webhook/aikopr222/chat";

export default function ChatWidget({ lang, onAddToCart, scrollToBooking }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Floating Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 z-40 inline-flex items-center gap-2 rounded-full border px-4 py-3 transition-all hover:scale-105"
        style={{
          backgroundColor: PALETTE.rose,
          borderColor: "rgba(255,255,255,0.20)",
          color: "#FFFFFF",
        }}
        aria-label={lang === "es" ? "Abrir asistente" : "Open assistant"}
      >
        {isOpen ? (
          <X className="h-5 w-5" />
        ) : (
          <>
            <MessageCircle className="h-5 w-5" />
            <span className="text-sm font-medium">
              {lang === "es" ? "Asistente" : "Assistant"}
            </span>
          </>
        )}
      </button>

      {/* Chat Drawer */}
      <ChatDrawer
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        lang={lang}
        onAddToCart={onAddToCart}
        scrollToBooking={scrollToBooking}
        webhookUrl={N8N_WEBHOOK_URL}
      />
    </>
  );
}