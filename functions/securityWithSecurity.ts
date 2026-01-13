/**
 * Security Wrapper for Base44 Functions
 * Applies rate limiting, validation, sanitization, and secure error handling
 */

import { enforceRateLimit, getClientIP } from './securityRateLimit.js';
import { sanitizeObject } from './securitySanitize.js';
import { ValidationError } from './securityValidation.js';

/**
 * Verify webhook secret (timing-safe comparison)
 */
function verifyWebhookSecret(req, secretEnvVar) {
  const providedSecret = req.headers.get('x-aiko-webhook-secret') || 
                         req.headers.get('x-webhook-secret') ||
                         new URL(req.url).searchParams.get('secret');
  
  const expectedSecret = Deno.env.get(secretEnvVar);
  
  if (!expectedSecret) {
    console.error(`Missing environment variable: ${secretEnvVar}`);
    return false;
  }

  if (!providedSecret) {
    return false;
  }

  // Timing-safe comparison
  if (providedSecret.length !== expectedSecret.length) {
    return false;
  }

  let mismatch = 0;
  for (let i = 0; i < expectedSecret.length; i++) {
    mismatch |= providedSecret.charCodeAt(i) ^ expectedSecret.charCodeAt(i);
  }

  return mismatch === 0;
}

/**
 * Parse request body safely
 */
async function parseRequestBody(req) {
  try {
    const contentType = req.headers.get('content-type') || '';
    
    if (contentType.includes('application/json')) {
      const text = await req.text();
      if (!text || text.trim().length === 0) {
        return {};
      }
      return JSON.parse(text);
    }
    
    return {};
  } catch (error) {
    throw new Error('Invalid request body');
  }
}

/**
 * Create standardized error response
 */
function errorResponse(status, message, retryAfter = null) {
  const headers = {
    'Content-Type': 'application/json',
  };
  
  if (retryAfter) {
    headers['Retry-After'] = String(retryAfter);
  }

  return new Response(
    JSON.stringify({ error: message }),
    { status, headers }
  );
}

/**
 * Create standardized success response
 */
function successResponse(data) {
  return new Response(
    JSON.stringify(data),
    {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    }
  );
}

/**
 * Security wrapper for Base44 functions
 * 
 * @param {Function} handler - The actual handler function
 * @param {Object} options - Security options
 *   - endpoint: Endpoint name for rate limiting (required)
 *   - rateLimits: { perMinute, perHour } (optional)
 *   - requireWebhookSecret: Secret env var name (optional)
 *   - validatePayload: Validation function (optional)
 *   - sanitize: Whether to sanitize input (default: true)
 */
export function withSecurity(handler, options = {}) {
  const {
    endpoint,
    rateLimits = { perMinute: 10, perHour: 60 },
    requireWebhookSecret = null,
    validatePayload = null,
    sanitize = true,
  } = options;

  if (!endpoint) {
    throw new Error('endpoint is required for withSecurity');
  }

  return async (req) => {
    const startTime = Date.now();
    const ip = getClientIP(req);
    const requestId = crypto.randomUUID();

    try {
      // 1. Webhook secret verification (if required)
      if (requireWebhookSecret) {
        if (!verifyWebhookSecret(req, requireWebhookSecret)) {
          console.warn(`[${endpoint}] Unauthorized webhook attempt from ${ip}`);
          return errorResponse(401, 'Unauthorized');
        }
      }

      // 2. Parse request body
      let payload = await parseRequestBody(req);

      // 3. Rate limiting
      const identifier = payload.email || payload.identifier || null;
      const rateLimitResult = enforceRateLimit(req, endpoint, {
        ...rateLimits,
        identifier,
      });

      if (!rateLimitResult.allowed) {
        console.warn(
          `[${endpoint}] Rate limit exceeded for ${ip}` +
          (identifier ? ` (${identifier})` : '')
        );
        return errorResponse(429, rateLimitResult.message, rateLimitResult.retryAfter);
      }

      // 4. Sanitization
      if (sanitize && payload) {
        payload = sanitizeObject(payload);
      }

      // 5. Validation
      if (validatePayload) {
        try {
          payload = validatePayload(payload);
        } catch (error) {
          if (error instanceof ValidationError) {
            console.warn(`[${endpoint}] Validation failed: ${error.message}`);
            return errorResponse(400, `Validation error: ${error.message}`);
          }
          throw error;
        }
      }

      // 6. Call handler
      const result = await handler(req, payload, { ip, requestId });

      // 7. Log success
      const duration = Date.now() - startTime;
      console.log(`[${endpoint}] Success from ${ip} in ${duration}ms`);

      return successResponse(result);

    } catch (error) {
      // Log error with minimal details
      const duration = Date.now() - startTime;
      console.error(
        `[${endpoint}] Error from ${ip} in ${duration}ms:`,
        error.message
      );

      // Never expose internal errors to client
      if (error.message === 'Invalid request body') {
        return errorResponse(400, 'Invalid request format');
      }

      return errorResponse(500, 'Internal server error');
    }
  };
}