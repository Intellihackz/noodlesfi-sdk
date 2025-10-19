import { HttpClient } from '../client';
import { ApiResponse } from '../types/common';
import {
  OhlcvParams,
  OhlcvResponse,
  OhlcvPairParams,
  OhlcvPairResponse,
} from '../types/ohlcv';

/**
 * Resource class for OHLCV (Open, High, Low, Close, Volume) candlestick data endpoints.
 * Provides methods for fetching historical price and volume data for coins and trading pairs.
 */
export class OhlcvResource {
  constructor(private client: HttpClient) {}

  /**
   * Fetches OHLCV candlestick data for a single coin.
   * 
   * @param params - Parameters including coin ID, time bucket, and optional filters
   * @returns Promise resolving to OHLCV data points
   * 
   * @example
   * ```typescript
   * const response = await client.ohlcv.get({
   *   coin_id: '0x2::sui::SUI',
   *   bucket: 240,     // 4-hour candles
   *   limit: 24        // Last 24 candles (4 days)
   * });
   * 
   * if (response.code === 200 && response.data) {
   *   response.data.data.forEach(([timestamp, open, high, low, close, volume]) => {
   *     console.log(`${new Date(timestamp * 1000)}: $${close}, Volume: ${volume}`);
   *   });
   * }
   * ```
   */
  async get(params: OhlcvParams): Promise<ApiResponse<OhlcvResponse>> {
    return this.client.get<OhlcvResponse>('/api/v1/partner/ohlcv', params);
  }

  /**
   * Fetches OHLCV candlestick data for a trading pair.
   * 
   * @param params - Parameters including coin pair, time bucket, and optional filters
   * @returns Promise resolving to OHLCV pair data points with dual volume metrics
   * 
   * @example
   * ```typescript
   * const response = await client.ohlcv.getPair({
   *   coin_a: '0x06864a6f921804860930db6ddbe2e16acdf8504495ea7481637a1c8b9a8fe54b::cetus::CETUS',
   *   coin_b: '0x2::sui::SUI',
   *   bucket: 60,      // 1-hour candles
   *   limit: 100,      // Last 100 candles
   *   from: 1697760000 // Optional: start timestamp
   * });
   * 
   * if (response.code === 200 && response.data) {
   *   response.data.data.forEach(([timestamp, open, high, low, close, volumeA, volumeB]) => {
   *     console.log(`${new Date(timestamp * 1000)}: $${close}`);
   *     console.log(`  CETUS volume: ${volumeA}, SUI volume: ${volumeB}`);
   *   });
   * }
   * ```
   */
  async getPair(params: OhlcvPairParams): Promise<ApiResponse<OhlcvPairResponse>> {
    return this.client.get<OhlcvPairResponse>('/api/v1/partner/ohlcv-pair', params);
  }
}