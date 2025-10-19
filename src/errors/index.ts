/**
 * Base error class for all Noodles SDK errors.
 * Extends the native Error class with additional context.
 * 
 * @example
 * ```typescript
 * try {
 *   await client.ohlcv.getPair(params);
 * } catch (error) {
 *   if (error instanceof NoodlesError) {
 *     console.error(`Error ${error.code}: ${error.message}`);
 *     console.error('Additional data:', error.data);
 *   }
 * }
 * ```
 */
export class NoodlesError extends Error {
  /** HTTP status code associated with the error */
  public code: number;
  
  /** Additional error context data from the API */
  public data: any;

  constructor(message: string, code: number, data?: any) {
    super(message);
    this.name = 'NoodlesError';
    this.code = code;
    this.data = data;
    
    // Maintains proper stack trace for where our error was thrown
    Error.captureStackTrace(this, this.constructor);
  }
}

/**
 * Error thrown when the request is invalid (HTTP 400).
 * Common causes:
 * - Invalid parameters
 * - Missing required fields
 * - Malformed coin IDs
 * 
 * @example
 * ```typescript
 * try {
 *   await client.coin.getDetail({ coin_id: 'invalid' });
 * } catch (error) {
 *   if (error instanceof BadRequestError) {
 *     console.error('Invalid request:', error.message);
 *   }
 * }
 * ```
 */
export class BadRequestError extends NoodlesError {
  constructor(message: string, data?: any) {
    super(message, 400, data);
    this.name = 'BadRequestError';
  }
}

/**
 * Error thrown when authentication fails (HTTP 401).
 * Common causes:
 * - Invalid API key
 * - Missing API key
 * - Expired API key
 * 
 * @example
 * ```typescript
 * try {
 *   const client = new Noodles({ apiKey: 'invalid-key' });
 *   await client.coin.getTrending(params);
 * } catch (error) {
 *   if (error instanceof UnauthorizedError) {
 *     console.error('Authentication failed. Check your API key.');
 *   }
 * }
 * ```
 */
export class UnauthorizedError extends NoodlesError {
  constructor(message: string, data?: any) {
    super(message, 401, data);
    this.name = 'UnauthorizedError';
  }
}

/**
 * Error thrown when rate limit is exceeded (HTTP 429).
 * You're making too many requests in a short period.
 * Consider implementing exponential backoff or request throttling.
 * 
 * @example
 * ```typescript
 * try {
 *   // Making too many requests
 *   const promises = Array(100).fill(0).map(() => client.coin.getPrice({ coin_id: '...' }));
 *   await Promise.all(promises);
 * } catch (error) {
 *   if (error instanceof RateLimitError) {
 *     console.error('Rate limit exceeded. Slow down requests.');
 *     // Implement retry with exponential backoff
 *   }
 * }
 * ```
 */
export class RateLimitError extends NoodlesError {
  constructor(message: string, data?: any) {
    super(message, 429, data);
    this.name = 'RateLimitError';
  }
}

/**
 * Error thrown when the server encounters an error (HTTP 500).
 * This indicates a problem on Noodles' end.
 * Safe to retry the request after a short delay.
 * 
 * @example
 * ```typescript
 * try {
 *   await client.ohlcv.getPair(params);
 * } catch (error) {
 *   if (error instanceof InternalServerError) {
 *     console.error('Server error. Retrying in 5 seconds...');
 *     await new Promise(resolve => setTimeout(resolve, 5000));
 *     // Retry the request
 *   }
 * }
 * ```
 */
export class InternalServerError extends NoodlesError {
  constructor(message: string, data?: any) {
    super(message, 500, data);
    this.name = 'InternalServerError';
  }
}