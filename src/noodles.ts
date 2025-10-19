import { HttpClient } from './client';
import { NoodlesConfig } from './types/common';
import { OhlcvResource } from './resources/ohlcv';
import { CoinResource } from './resources/coin';
import { PoolResource } from './resources/pool';
import { PortfolioResource } from './resources/portfolio';

/**
 * Main Noodles SDK client for interacting with the Noodles API.
 * 
 * @example
 * ```typescript
 * import { Noodles } from 'noodlesfi-sdk';
 * 
 * const client = new Noodles({
 *   apiKey: 'your-api-key',
 *   timeout: 30000
 * });
 * 
 * // Fetch OHLCV data
 * const ohlcvData = await client.ohlcv.getPair({
 *   coin_a: '0x06864a6f921804860930db6ddbe2e16acdf8504495ea7481637a1c8b9a8fe54b::cetus::CETUS',
 *   coin_b: '0x2::sui::SUI',
 *   bucket: 60,
 *   limit: 100
 * });
 * 
 * // Fetch coin details
 * const coinData = await client.coin.getDetail({
 *   coin_id: '0x2::sui::SUI'
 * });
 * ```
 */
export class Noodles {
  private client: HttpClient;
  
  /** OHLCV (candlestick) data endpoints */
  public ohlcv: OhlcvResource;
  
  /** Coin information and pricing endpoints */
  public coin: CoinResource;
  
  /** Liquidity pool data endpoints */
  public pool: PoolResource;
  
  /** Portfolio tracking endpoints */
  public portfolio: PortfolioResource;

  /**
   * Creates a new Noodles SDK client instance.
   * 
   * @param config - Configuration options including API key
   * @throws {Error} If API key is not provided
   * 
   * @example
   * ```typescript
   * const client = new Noodles({ apiKey: 'your-api-key' });
   * ```
   */
  constructor(config: NoodlesConfig) {
    if (!config.apiKey) {
      throw new Error('API key is required');
    }

    this.client = new HttpClient(config);
    this.ohlcv = new OhlcvResource(this.client);
    this.coin = new CoinResource(this.client);
    this.pool = new PoolResource(this.client);
    this.portfolio = new PortfolioResource(this.client);
  }
}