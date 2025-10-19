/**
 * Configuration options for initializing the Noodles SDK client.
 * 
 * @example
 * ```typescript
 * const config: NoodlesConfig = {
 *   apiKey: 'your-api-key',
 *   timeout: 30000
 * };
 * ```
 */
export interface NoodlesConfig {
  /** 
   * Your Noodles API key. Required for authentication.
   * Get your API key from https://noodles.fi
   */
  apiKey: string;
  
  /** 
   * Request timeout in milliseconds.
   * @default 30000 (30 seconds)
   */
  timeout?: number;
}

/**
 * Standard API response wrapper returned by all Noodles API endpoints.
 * 
 * @template T - The type of data returned in the response
 * 
 * @example
 * ```typescript
 * const response: ApiResponse<CoinDetailData> = await client.coin.getDetail({ coin_id: '...' });
 * if (response.code === 200) {
 *   console.log(response.data);
 * }
 * ```
 */
export interface ApiResponse<T> {
  /** HTTP status code (200 for success, 4xx/5xx for errors) */
  code: number;
  
  /** Human-readable message describing the response */
  message: string;
  
  /** The response payload. Will be null if the request failed */
  data: T | null;
}

/**
 * Error response structure returned when API requests fail.
 * Used internally by the SDK to create typed error classes.
 */
export interface ApiError {
  /** HTTP error status code */
  code: number;
  
  /** Error message describing what went wrong */
  message: string;
  
  /** Additional error data (always null in current API version) */
  data: null;
}

export * from './ohlcv';
export * from './coin';
export * from './pool';
export * from './portfolio';