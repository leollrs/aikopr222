/**
 * Input Sanitization Utilities
 * Prevents XSS, header injection, and other attacks
 */

/**
 * Escape HTML special characters
 */
export function escapeHtml(str) {
  if (typeof str !== 'string') return '';
  
  const htmlEscapes = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#x27;',
    '/': '&#x2F;',
  };
  
  return str.replace(/[&<>"'/]/g, (char) => htmlEscapes[char]);
}

/**
 * Strip control characters (CR, LF, NULL, etc.)
 */
export function stripControlChars(str) {
  if (typeof str !== 'string') return '';
  // Remove all control characters except tab
  return str.replace(/[\x00-\x08\x0B-\x0C\x0E-\x1F\x7F]/g, '');
}

/**
 * Safe email header value (prevent header injection)
 */
export function safeEmailHeader(str) {
  if (typeof str !== 'string') return '';
  // Remove CR, LF, and NULL to prevent header injection
  return str.replace(/[\r\n\0]/g, '').trim();
}

/**
 * Normalize phone number (allow only safe characters)
 */
export function normalizePhone(str) {
  if (typeof str !== 'string') return '';
  // Allow: digits, +, -, (), spaces
  return str.replace(/[^\d\s+\-()]/g, '').trim();
}

/**
 * Normalize name (collapse spaces, trim)
 */
export function normalizeName(str) {
  if (typeof str !== 'string') return '';
  return str
    .replace(/\s+/g, ' ')
    .trim()
    .slice(0, 100); // Max length
}

/**
 * Sanitize text message (general purpose)
 */
export function sanitizeText(str, maxLength = 2000) {
  if (typeof str !== 'string') return '';
  return stripControlChars(str).trim().slice(0, maxLength);
}

/**
 * Validate and normalize email
 */
export function normalizeEmail(str) {
  if (typeof str !== 'string') return '';
  return str.toLowerCase().trim().slice(0, 120);
}

/**
 * Sanitize all fields in an object
 */
export function sanitizeObject(obj) {
  if (!obj || typeof obj !== 'object') return {};
  
  const sanitized = {};
  
  for (const [key, value] of Object.entries(obj)) {
    if (typeof value === 'string') {
      sanitized[key] = stripControlChars(value).trim();
    } else if (Array.isArray(value)) {
      sanitized[key] = value.map(item => 
        typeof item === 'string' ? stripControlChars(item).trim() : item
      );
    } else {
      sanitized[key] = value;
    }
  }
  
  return sanitized;
}