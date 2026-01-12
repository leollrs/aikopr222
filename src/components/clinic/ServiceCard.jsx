import React from 'react';
import { Button } from "@/components/ui/button";

export default function ServiceCard({ service, lang, onAddService, onViewDetails }) {
  const name = lang === 'es' ? service.nameEs : service.nameEn;
  const desc = lang === 'es' ? service.descEs : service.descEn;

  return (
    <div className="bg-[#FFFCF8] border border-[rgba(36,24,20,0.08)] rounded-lg p-6 flex flex-col h-full shadow-sm hover:shadow-md transition-shadow duration-300">
      {/* Service Name */}
      <h3 className="text-lg font-medium text-[#241814] mb-2">
        {name}
      </h3>

      {/* Meta Line */}
      <p className="text-sm text-[#6E5B50] mb-3">
        {service.duration} · {lang === 'es' ? 'Desde' : 'From'} ${service.price}
      </p>

      {/* Description */}
      <p className="text-sm text-[#6E5B50] leading-relaxed mb-6 flex-grow">
        {desc}
      </p>

      {/* Buttons */}
      <div className="flex flex-col gap-2">
        <Button
          onClick={() => onAddService(service)}
          className="w-full bg-[#B07A7A] hover:bg-[#9A6969] text-white py-2.5 text-sm font-medium rounded-md transition-colors"
        >
          {lang === 'es' ? 'Quiero este servicio' : 'I want this service'}
        </Button>
        <Button
          onClick={() => onViewDetails(service)}
          variant="outline"
          className="w-full border-[rgba(36,24,20,0.15)] text-[#241814] hover:bg-[#F4EEE6] py-2.5 text-sm font-medium rounded-md transition-colors"
        >
          {lang === 'es' ? 'Ver detalles' : 'View details'}
        </Button>
      </div>
    </div>
  );
}