/**
 * Parameters for fetching OHLCV data for a trading pair.
 * 
 * @example
 * ```typescript
 * const params: OhlcvPairParams = {
 *   coin_a: '0x06864a6f921804860930db6ddbe2e16acdf8504495ea7481637a1c8b9a8fe54b::cetus::CETUS',
 *   coin_b: '0x2::sui::SUI',
 *   bucket: 60,     // 1-hour candles
 *   limit: 100      // Last 100 candles
 * };
 * ```
 */
export interface OhlcvPairParams {
  /** Full coin type identifier for the first coin in the pair */
  coin_a: string;
  
  /** Full coin type identifier for the second coin in the pair */
  coin_b: string;
  
  /** 
   * Time interval for each candle in minutes.
   * - 1: 1 minute
   * - 5: 5 minutes
   * - 15: 15 minutes
   * - 60: 1 hour
   * - 240: 4 hours
   * - 1440: 1 day
   * - 10080: 1 week
   * - 43200: 1 month (30 days)
   */
  bucket: 1 | 5 | 15 | 60 | 240 | 1440 | 10080 | 43200;
  
  /** 
   * Start timestamp in seconds (Unix epoch).
   * @optional If not provided, returns most recent data
   */
  from?: number;
  
  /** 
   * End timestamp in seconds (Unix epoch).
   * @optional If not provided, uses current time
   */
  to?: number;
  
  /** 
   * Maximum number of candles to return.
   * @optional Default varies by API endpoint
   */
  limit?: number;
}

/**
 * Parameters for fetching OHLCV data for a single coin.
 * 
 * @example
 * ```typescript
 * const params: OhlcvParams = {
 *   coin_id: '0x2::sui::SUI',
 *   bucket: 240,    // 4-hour candles
 *   limit: 24       // Last 24 candles (4 days)
 * };
 * ```
 */
export interface OhlcvParams {
  /** Full coin type identifier */
  coin_id: string;
  
  /** 
   * Time interval for each candle in minutes.
   * - 1: 1 minute
   * - 5: 5 minutes
   * - 15: 15 minutes
   * - 60: 1 hour
   * - 240: 4 hours
   * - 1440: 1 day
   * - 10080: 1 week
   * - 43200: 1 month (30 days)
   */
  bucket: 1 | 5 | 15 | 60 | 240 | 1440 | 10080 | 43200;
  
  /** 
   * Start timestamp in seconds (Unix epoch).
   * @optional If not provided, returns most recent data
   */
  from?: number;
  
  /** 
   * End timestamp in seconds (Unix epoch).
   * @optional If not provided, uses current time
   */
  to?: number;
  
  /** 
   * Maximum number of candles to return.
   * @optional Default varies by API endpoint
   */
  limit?: number;
}

/**
 * OHLCV (Open, High, Low, Close, Volume) candlestick data point for a single coin.
 * Data is returned as an ordered array for efficient transmission.
 * 
 * @example
 * ```typescript
 * const [timestamp, open, high, low, close, volume] = dataPoint;
 * console.log(`At ${new Date(timestamp * 1000)}, price: $${close}`);
 * ```
 */
export type OhlcvDataPoint = [
  /** Unix timestamp in seconds */
  timestamp: number,
  /** Opening price in USD */
  open: number,
  /** Highest price in USD during the period */
  high: number,
  /** Lowest price in USD during the period */
  low: number,
  /** Closing price in USD */
  close: number,
  /** Total trading volume during the period */
  volume: number
];

/**
 * OHLCV candlestick data point for a trading pair.
 * Includes volume data for both coins in the pair.
 * Data is returned as an ordered array for efficient transmission.
 * 
 * @example
 * ```typescript
 * const [timestamp, open, high, low, close, volumeA, volumeB] = dataPoint;
 * console.log(`CETUS volume: ${volumeA}, SUI volume: ${volumeB}`);
 * ```
 */
export type OhlcvPairDataPoint = [
  /** Unix timestamp in seconds */
  timestamp: number,
  /** Opening price (coin_a/coin_b ratio) */
  open: number,
  /** Highest price during the period */
  high: number,
  /** Lowest price during the period */
  low: number,
  /** Closing price (coin_a/coin_b ratio) */
  close: number,
  /** Trading volume of coin_a */
  volume_a: number,
  /** Trading volume of coin_b */
  volume_b: number
];

/**
 * Response containing OHLCV data for a single coin.
 */
export interface OhlcvResponse {
  /** Array of OHLCV data points, ordered by timestamp */
  data: OhlcvDataPoint[];
}

/**
 * Response containing OHLCV data for a trading pair.
 */
export interface OhlcvPairResponse {
  /** Array of OHLCV pair data points, ordered by timestamp */
  data: OhlcvPairDataPoint[];
}