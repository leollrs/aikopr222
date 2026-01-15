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

export default function ChatWidget({ lang, onAddToCart, scrollToBooking }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Floating Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 z-40 inline-flex items-center gap-2 rounded-full border px-4 py-3 shadow-[0_24px_80px_rgba(195,154,139,0.35)] transition-all hover:scale-105 hover:shadow-[0_32px_100px_rgba(195,154,139,0.45)]"
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

      <ChatDrawer
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        lang={lang}
        onAddToCart={onAddToCart}
        scrollToBooking={scrollToBooking}
      />
    </>
  );
}