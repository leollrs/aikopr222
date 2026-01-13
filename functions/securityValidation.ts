/**
 * Input Validation Schemas
 * Strict validation for all endpoints
 */

// Email regex (RFC 5322 simplified)
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Time format HH:MM (24h)
const TIME_REGEX = /^([01]\d|2[0-3]):([0-5]\d)$/;

// Date format YYYY-MM-DD
const DATE_REGEX = /^\d{4}-\d{2}-\d{2}$/;

// Valid service IDs (from ServicesSection)
const VALID_SERVICE_IDS = [1, 2, 3, 4, 5, 6, 7, 8];

/**
 * Validation error class
 */
export class ValidationError extends Error {
  constructor(message, field = null) {
    super(message);
    this.name = 'ValidationError';
    this.field = field;
  }
}

/**
 * Validate string field
 */
function validateString(value, fieldName, { min = 1, max = 255, pattern = null, required = true } = {}) {
  if (value === undefined || value === null || value === '') {
    if (required) {
      throw new ValidationError(`${fieldName} is required`, fieldName);
    }
    return null;
  }

  if (typeof value !== 'string') {
    throw new ValidationError(`${fieldName} must be a string`, fieldName);
  }

  const trimmed = value.trim();

  if (trimmed.length < min) {
    throw new ValidationError(`${fieldName} must be at least ${min} characters`, fieldName);
  }

  if (trimmed.length > max) {
    throw new ValidationError(`${fieldName} must be at most ${max} characters`, fieldName);
  }

  if (pattern && !pattern.test(trimmed)) {
    throw new ValidationError(`${fieldName} has invalid format`, fieldName);
  }

  return trimmed;
}

/**
 * Validate email
 */
export function validateEmail(value, required = true) {
  const email = validateString(value, 'email', { min: 3, max: 120, required });
  if (!email) return null;

  if (!EMAIL_REGEX.test(email)) {
    throw new ValidationError('Invalid email format', 'email');
  }

  return email.toLowerCase();
}

/**
 * Validate phone
 */
export function validatePhone(value, required = true) {
  const phone = validateString(value, 'phone', { min: 7, max: 20, required });
  if (!phone) return null;

  // Allow only digits, spaces, +, -, ()
  if (!/^[\d\s+\-()]+$/.test(phone)) {
    throw new ValidationError('Invalid phone format', 'phone');
  }

  return phone;
}

/**
 * Validate name
 */
export function validateName(value, fieldName = 'name', required = true) {
  return validateString(value, fieldName, { min: 2, max: 80, required });
}

/**
 * Validate language
 */
export function validateLanguage(value) {
  if (!value || !['es', 'en'].includes(value)) {
    return 'es'; // Default
  }
  return value;
}

/**
 * Validate date
 */
export function validateDate(value, required = true) {
  const date = validateString(value, 'date', { required });
  if (!date) return null;

  if (!DATE_REGEX.test(date)) {
    throw new ValidationError('Invalid date format (expected YYYY-MM-DD)', 'date');
  }

  // Check if valid date
  const parsed = new Date(date);
  if (isNaN(parsed.getTime())) {
    throw new ValidationError('Invalid date value', 'date');
  }

  return date;
}

/**
 * Validate time
 */
export function validateTime(value, required = true) {
  const time = validateString(value, 'time', { required });
  if (!time) return null;

  if (!TIME_REGEX.test(time)) {
    throw new ValidationError('Invalid time format (expected HH:MM)', 'time');
  }

  return time;
}

/**
 * Validate services array
 */
export function validateServices(value, required = true) {
  if (!value) {
    if (required) {
      throw new ValidationError('Services are required', 'services');
    }
    return [];
  }

  if (!Array.isArray(value)) {
    throw new ValidationError('Services must be an array', 'services');
  }

  if (value.length === 0 && required) {
    throw new ValidationError('At least one service is required', 'services');
  }

  if (value.length > 20) {
    throw new ValidationError('Too many services (max 20)', 'services');
  }

  // Validate each service
  const validated = value.map((service, index) => {
    if (!service || typeof service !== 'object') {
      throw new ValidationError(`Service ${index} is invalid`, 'services');
    }

    const { id, nameEs, nameEn, duration, price } = service;

    if (!VALID_SERVICE_IDS.includes(id)) {
      throw new ValidationError(`Invalid service ID: ${id}`, 'services');
    }

    return { id, nameEs, nameEn, duration, price };
  });

  return validated;
}

/**
 * Validate message
 */
export function validateMessage(value, required = true) {
  return validateString(value, 'message', { min: 1, max: 2000, required });
}

/**
 * Validate booking/appointment payload
 */
export function validateBookingPayload(payload) {
  const errors = [];
  const validated = {};

  try {
    validated.fullName = validateName(payload.fullName, 'fullName');
  } catch (e) {
    errors.push(e.message);
  }

  try {
    validated.email = validateEmail(payload.email);
  } catch (e) {
    errors.push(e.message);
  }

  try {
    validated.phone = validatePhone(payload.phone);
  } catch (e) {
    errors.push(e.message);
  }

  try {
    validated.date = validateDate(payload.date);
  } catch (e) {
    errors.push(e.message);
  }

  try {
    validated.time = validateTime(payload.time);
  } catch (e) {
    errors.push(e.message);
  }

  try {
    validated.services = validateServices(payload.services);
  } catch (e) {
    errors.push(e.message);
  }

  try {
    validated.lang = validateLanguage(payload.lang);
  } catch (e) {
    errors.push(e.message);
  }

  if (errors.length > 0) {
    throw new ValidationError(errors.join('; '));
  }

  return validated;
}

/**
 * Validate contact form payload
 */
export function validateContactPayload(payload) {
  const errors = [];
  const validated = {};

  try {
    validated.fullName = validateName(payload.fullName, 'fullName');
  } catch (e) {
    errors.push(e.message);
  }

  try {
    validated.email = validateEmail(payload.email);
  } catch (e) {
    errors.push(e.message);
  }

  try {
    validated.phone = validatePhone(payload.phone, false);
  } catch (e) {
    errors.push(e.message);
  }

  try {
    validated.message = validateMessage(payload.message);
  } catch (e) {
    errors.push(e.message);
  }

  try {
    validated.lang = validateLanguage(payload.lang);
  } catch (e) {
    errors.push(e.message);
  }

  if (errors.length > 0) {
    throw new ValidationError(errors.join('; '));
  }

  return validated;
}

/**
 * Validate chat payload
 */
export function validateChatPayload(payload) {
  const errors = [];
  const validated = {};

  try {
    validated.lang = validateLanguage(payload.lang);
  } catch (e) {
    errors.push(e.message);
  }

  try {
    validated.message = validateMessage(payload.message || payload.text, false);
  } catch (e) {
    errors.push(e.message);
  }

  // Validate messages array if present
  if (payload.messages) {
    if (!Array.isArray(payload.messages)) {
      errors.push('messages must be an array');
    } else if (payload.messages.length > 100) {
      errors.push('Too many messages (max 100)');
    } else {
      validated.messages = payload.messages.slice(0, 100).map((msg, i) => {
        if (!msg || typeof msg !== 'object') {
          errors.push(`Message ${i} is invalid`);
          return null;
        }
        return {
          role: ['user', 'assistant'].includes(msg.role) ? msg.role : 'user',
          content: validateString(msg.content, `message ${i}`, { max: 5000, required: true }),
        };
      }).filter(Boolean);
    }
  }

  if (errors.length > 0) {
    throw new ValidationError(errors.join('; '));
  }

  return validated;
}