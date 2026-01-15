import React, { useEffect, useState } from "react";
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

// ✅ Robust env lookup (covers naming differences)
const WEBHOOK_URL =
  import.meta.env.VITE_Webhooks_chatwidget ??
  import.meta.env.VITE_WEBHOOKS_CHATWIDGET ??
  import.meta.env.VITE_WEBHOOK_URL ??
  null;

export default function ChatWidget({ lang, onAddToCart, scrollToBooking }) {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    console.log("VITE_Webhooks_chatwidget =", import.meta.env.VITE_Webhooks_chatwidget);
    console.log("VITE_WEBHOOKS_CHATWIDGET =", import.meta.env.VITE_WEBHOOKS_CHATWIDGET);
    console.log("VITE_WEBHOOK_URL =", import.meta.env.VITE_WEBHOOK_URL);
    console.log("[ChatWidget] webhook secret present?", Boolean(WEBHOOK_URL));
    console.log("[ChatWidget] env keys:", Object.keys(import.meta.env || {}));
  }, []);

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

      {/* ✅ Always render the drawer so the UI works even if webhook is missing */}
      <ChatDrawer
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        lang={lang}
        onAddToCart={onAddToCart}
        scrollToBooking={scrollToBooking}
        webhookUrl={WEBHOOK_URL}
      />
    </>
  );
}