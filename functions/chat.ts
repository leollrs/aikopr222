import { createClientFromRequest } from 'npm:@base44/sdk@0.8.6';
import { withSecurity } from './securityWithSecurity.js';
import { validateChatPayload } from './securityValidation.js';

/**
 * Chat endpoint handler
 * Provides predefined responses for common questions
 */
async function chatHandler(req, payload, meta) {
  const base44 = createClientFromRequest(req);
  
  // Optional: check if user is authenticated
  // const user = await base44.auth.me();
  
  const { lang = 'es', message = '', messages = [] } = payload;
  const isEs = lang === 'es';

  // Get the last user message if messages array is provided
  const lastMessage = message || (messages.length > 0 ? messages[messages.length - 1]?.content : '');
  
  if (!lastMessage) {
    return {
      reply: isEs
        ? '¿En qué puedo ayudarte hoy?'
        : 'How can I help you today?',
    };
  }

  // Generate predefined reply based on message content
  const reply = getPredefinedReply(lastMessage, isEs);

  return { reply };
}

/**
 * Get predefined reply based on message content
 */
function getPredefinedReply(text, isEs) {
  const msg = String(text || '').toLowerCase().trim();

  if (isEs) {
    if (msg.includes('recom') || msg.includes('recomiéndame') || msg.includes('recomiendame')) {
      return (
        'Claro — dime qué deseas tratar (depilación, acné/textura, tatuaje, reafirmación) y en qué área. ' +
        'Mientras tanto, opciones populares son Depilación Láser, Carbon Peel, Remoción de Tatuajes y HIFU.'
      );
    }
    
    if (
      msg.includes('precio') ||
      msg.includes('precios') ||
      msg.includes('costo') ||
      msg.includes('costos') ||
      msg.includes('cuanto') ||
      msg.includes('cuánto')
    ) {
      return (
        'Los precios dependen del tratamiento y el área. Si me dices el servicio + el área, te oriento. ' +
        'También puedes agregar un servicio a tu cita y ver el total antes de confirmar.'
      );
    }
    
    if (msg.includes('depósito') || msg.includes('deposito')) {
      return (
        'Es posible que se requiera un depósito para asegurar tu cita. ' +
        'Si me dices qué servicio deseas, te confirmamos el depósito exacto por mensaje.'
      );
    }
    
    if (msg.includes('dispon') || msg.includes('disponibilidad') || msg.includes('horario') || msg.includes('citas')) {
      return (
        'Las citas están disponibles en fechas y horarios específicos. ' +
        'Presiona "Reservar ahora", elige fecha/hora y te confirmaremos por mensaje.'
      );
    }

    return (
      'Gracias — un asesor de AIKOPR222 te responderá en breve para ayudarte. ' +
      'Mientras tanto, puedes tocar "Reservar ahora" para escoger fecha y hora.'
    );
  }

  // English
  if (msg.includes('recommend') || msg.includes('recom')) {
    return (
      'Sure — tell me what you want to treat (hair removal, acne/texture, tattoo, tightening) and the area. ' +
      'Meanwhile, popular options are Laser Hair Removal, Carbon Peel, Tattoo Removal, and HIFU.'
    );
  }
  
  if (msg.includes('pricing') || msg.includes('price') || msg.includes('cost')) {
    return (
      'Pricing depends on the treatment and area. If you tell me the service + area, I'll guide you. ' +
      'You can also add a service to your appointment and see the total before confirming.'
    );
  }
  
  if (msg.includes('deposit')) {
    return (
      'A deposit may be required to secure your appointment. ' +
      'If you share the service you want, we'll confirm the exact deposit amount by message.'
    );
  }
  
  if (msg.includes('availability') || msg.includes('available') || msg.includes('schedule')) {
    return (
      'Appointments are available on select dates and time slots. ' +
      'Tap "Book now" and choose a date/time — we'll confirm by message.'
    );
  }

  return (
    'Thanks — an AIKOPR222 advisor will reply shortly to help you. ' +
    'In the meantime, you can tap "Book now" to pick a date and time.'
  );
}

// Export secured endpoint
export default withSecurity(chatHandler, {
  endpoint: 'chat',
  rateLimits: {
    perMinute: 10,
    perHour: 30,
  },
  validatePayload: validateChatPayload,
  sanitize: true,
});

// For Deno Deploy
Deno.serve(withSecurity(chatHandler, {
  endpoint: 'chat',
  rateLimits: {
    perMinute: 10,
    perHour: 30,
  },
  validatePayload: validateChatPayload,
  sanitize: true,
}));