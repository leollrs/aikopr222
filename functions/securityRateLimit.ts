/**
 * Rate Limiting Utility
 * Implements IP-based and identifier-based rate limiting
 */

const rateLimitStore = new Map();

// Cleanup old entries every 5 minutes
setInterval(() => {
  const now = Date.now();
  for (const [key, data] of rateLimitStore.entries()) {
    if (now - data.windowStart > data.windowMs) {
      rateLimitStore.delete(key);
    }
  }
}, 5 * 60 * 1000);

/**
 * Extract client IP from request headers
 */
export function getClientIP(req) {
  const headers = req.headers;
  return (
    headers.get('cf-connecting-ip') ||
    headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
    headers.get('x-real-ip') ||
    'unknown'
  );
}

/**
 * Check and enforce rate limit
 * @param {string} key - Rate limit key (e.g., "chat:192.168.1.1")
 * @param {number} maxRequests - Max requests allowed
 * @param {number} windowMs - Time window in milliseconds
 * @returns {Object} { allowed: boolean, retryAfter: number }
 */
export function checkRateLimit(key, maxRequests, windowMs) {
  const now = Date.now();
  const record = rateLimitStore.get(key);

  if (!record) {
    rateLimitStore.set(key, {
      count: 1,
      windowStart: now,
      windowMs,
    });
    return { allowed: true, retryAfter: 0 };
  }

  // Check if window has expired
  if (now - record.windowStart > windowMs) {
    record.count = 1;
    record.windowStart = now;
    return { allowed: true, retryAfter: 0 };
  }

  // Increment counter
  record.count++;

  if (record.count > maxRequests) {
    const retryAfter = Math.ceil((record.windowStart + windowMs - now) / 1000);
    return { allowed: false, retryAfter };
  }

  return { allowed: true, retryAfter: 0 };
}

/**
 * Apply rate limiting with multiple tiers
 * @param {Request} req
 * @param {string} endpoint - Endpoint identifier
 * @param {Object} limits - { perMinute, perHour, identifier }
 */
export function enforceRateLimit(req, endpoint, limits) {
  const ip = getClientIP(req);
  const { perMinute = 10, perHour = 60, identifier = null } = limits;

  // Check per-minute limit (IP-based)
  const minuteKey = `${endpoint}:minute:${ip}`;
  const minuteCheck = checkRateLimit(minuteKey, perMinute, 60 * 1000);
  
  if (!minuteCheck.allowed) {
    return {
      allowed: false,
      retryAfter: minuteCheck.retryAfter,
      message: 'Rate limit exceeded. Please try again later.',
    };
  }

  // Check per-hour limit (IP-based)
  const hourKey = `${endpoint}:hour:${ip}`;
  const hourCheck = checkRateLimit(hourKey, perHour, 60 * 60 * 1000);
  
  if (!hourCheck.allowed) {
    return {
      allowed: false,
      retryAfter: hourCheck.retryAfter,
      message: 'Hourly rate limit exceeded. Please try again later.',
    };
  }

  // Optional: identifier-based limit (e.g., email)
  if (identifier) {
    const identifierKey = `${endpoint}:identifier:${identifier}`;
    const identifierCheck = checkRateLimit(identifierKey, perHour, 60 * 60 * 1000);
    
    if (!identifierCheck.allowed) {
      return {
        allowed: false,
        retryAfter: identifierCheck.retryAfter,
        message: 'Rate limit exceeded for this account. Please try again later.',
      };
    }
  }

  return { allowed: true };
}