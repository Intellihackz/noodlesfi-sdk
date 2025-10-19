/**
 * Parameters for fetching detailed information about a specific coin.
 */
export interface CoinDetailParams {
  /** Full coin type identifier */
  coin_id: string;
}

/**
 * Core information about a cryptocurrency coin.
 */
export interface CoinObject {
  /** Full coin type identifier (e.g., '0x2::sui::SUI') */
  coin_type: string;
  
  /** Coin symbol (e.g., 'SUI', 'USDC') */
  symbol: string;
  
  /** Full name of the coin */
  name: string;
  
  /** URL to the coin's logo image */
  logo: string | null;
  
  /** Description of the coin/project */
  description: string | null;
  
  /** Total liquidity in USD */
  liquidity: string | null;
  
  /** Market capitalization in USD */
  market_cap: string | null;
  
  /** Fully diluted valuation in USD */
  fdv: string | null;
  
  /** Circulating supply of the coin */
  circulating_supply: string | null;
  
  /** Total supply of the coin */
  total_supply: string | null;
  
  /** Number of unique holders */
  holders: number | null;
  
  /** Address of the coin creator */
  creator: string | null;
  
  /** ISO 8601 timestamp when the coin was published */
  published_at: string | null;
  
  /** Whether the coin has been verified by Noodles */
  verified: boolean;
  
  /** Number of decimal places for the coin */
  decimals?: number | null;
}

/**
 * Price and price change information for a coin across multiple time periods.
 */
export interface PriceChangeObject {
  /** Current price in USD */
  price: string;
  
  /** Price change percentage over the last 1 hour */
  price_change_1h: number | null;
  
  /** Price change percentage over the last 6 hours */
  price_change_6h: number | null;
  
  /** Price change percentage over the last 24 hours */
  price_change_1d: number | null;
  
  /** Price change percentage over the last 7 days */
  price_change_7d: number | null;
  
  /** Lowest price in the last 24 hours (USD) */
  price_24h_low: string | null;
  
  /** Highest price in the last 24 hours (USD) */
  price_24h_high: string | null;
  
  /** All-time high price (USD) */
  ath: string | null;
  
  /** All-time low price (USD) */
  atl: string | null;
}

/**
 * Social media and external links for a coin/project.
 */
export interface SocialMediaObject {
  /** X (x) profile URL */
  x: string | null;
  
  /** Official website URL */
  website: string | null;
  
  /** Discord server invite URL */
  discord: string | null;
  
  /** CoinGecko listing URL */
  coingecko_url: string | null;
  
  /** CoinMarketCap listing URL */
  coinmarketcap_url: string | null;
  
  /** Documentation URL */
  docs: string | null;
}

/**
 * Category tag for a coin (e.g., 'DeFi', 'NFT', 'Gaming').
 */
export interface TagObject {
  /** Unique tag identifier */
  id: number;
  
  /** Tag name/label */
  name: string;
}

/**
 * Security and risk information for a coin.
 */
export interface SecurityObject {
  /** Whether the coin supply is mintable */
  /** Whether the coin supply is mintable */
  mintable: boolean;
  
  /** Whether the coin has a blacklist mechanism */
  blacklist: boolean;
  
  /** Percentage of supply held by top 10 holders */
  top_10_holders: number | null;
}

/**
 * Complete detailed information about a coin, including price, social media, and metadata.
 */
export interface CoinDetailData {
  /** Core coin information */
  coin: CoinObject;
  
  /** Price and price change data */
  price_change: PriceChangeObject;
  
  /** Social media links and external URLs */
  social_media: SocialMediaObject | null;
  
  /** Category tags for the coin */
  tags: TagObject[] | null;
  
  /** Trending rank (if applicable) */
  rank: number | null;
  
  /** Security and risk information */
  security: SecurityObject | null;
}

/**
 * Parameters for fetching trending coins.
 * 
 * @example
 * ```typescript
 * const params: CoinTrendingParams = {
 *   score_period: '24h',
 *   pagination: { limit: 50, offset: 0 },
 *   filters: { coin_ids: ['0x2::sui::SUI'] }
 * };
 * ```
 */
export interface CoinTrendingParams {
  /** Pagination options */
  pagination?: {
    /** Maximum number of results to return */
    limit?: number;
    /** Number of results to skip */
    offset?: number;
  };
  
  /** 
   * Time period for calculating trending score.
   * - '30m': Last 30 minutes
   * - '1h': Last 1 hour
   * - '4h': Last 4 hours
   * - '6h': Last 6 hours
   * - '24h': Last 24 hours
   */
  score_period: '30m' | '1h' | '4h' | '6h' | '24h';
  
  /** Optional filters */
  filters?: {
    /** Filter to specific coin IDs */
    coin_ids?: string[];
  };
}

/**
 * Trending coin data with activity metrics.
 */
/**
 * Trending coin data with activity metrics.
 */
export interface TrendingCoin {
  coin_type: string;
  name: string;
  symbol: string;
  logo: string;
  price: string;
  price_change_1d: number;
  price_change_6h: number;
  price_change_4h: number;
  price_change_1h: number;
  price_change_30m: number;
  vol_change_1d: number;
  liq_change_1d: number;
  tx_change_1d: number;
  tx_24h: number;
  volume_24h: string;
  volume_6h: string;
  volume_4h: string;
  volume_30m: string;
  maker_24h: number;
  market_cap: string;
  liquidity_usd: string;
  circulating_supply: string;
  total_supply: string;
  published_at: string;
  verified: boolean;
  rank: number;
  decimals: number;
}

/**
 * Response containing trending coins data.
 */
export interface CoinTrendingData {
  /** Array of trending coins */
  data: TrendingCoin[];
  
  /** Pagination information */
  pagination: {
    offset: number;
    limit: number;
  };
}

/**
 * Parameters for fetching top coins by market cap.
 */
export interface CoinTopParams {
  /** Pagination options */
  pagination?: {
    limit?: number;
    offset?: number;
  };
  
  /** Optional filters */
  filters?: {
    coin_ids?: string[];
  };
}

/**
 * Parameters for fetching newly listed coins.
 */
export interface CoinNewParams {
  /** Pagination options */
  pagination?: {
    limit?: number;
    offset?: number;
  };
  
  /** Optional filters */
  filters?: {
    coin_ids?: string[];
  };
}

/**
 * Top coin data with market metrics.
 */
/**
 * Top coin data with market metrics.
 */
export interface TopCoin {
  coin_type: string;
  name: string;
  symbol: string;
  logo: string;
  price: string;
  price_change_1h: number;
  price_change_6h: number;
  price_change_1d: number;
  vol_change_1d: number;
  liq_change_1d: number;
  tx_change_1d: number;
  tx_24h: number;
  volume_24h: string;
  maker_24h: number;
  market_cap: string;
  liquidity_usd: string;
  circulating_supply: string;
  total_supply: string;
  published_at: string;
  verified: boolean;
  decimals: number;
}

/**
 * Newly listed coin data.
 */
export interface NewCoin {
  coin_type: string;
  name: string;
  symbol: string;
  logo: string;
  price: string;
  price_change_1h: number;
  price_change_6h: number;
  price_change_1d: number;
  vol_change_1d: number;
  liq_change_1d: number;
  tx_change_1d: number;
  tx_24h: number;
  volume_24h: string;
  maker_24h: number;
  market_cap: string;
  liquidity_usd: string;
  circulating_supply: string;
  total_supply: string;
  published_at: string;
  verified: boolean;
  decimals: number;
}

/**
 * Response containing top coins data.
 */
export interface CoinTopData {
  data: TopCoin[];
  pagination: {
    offset: number;
    limit: number;
  };
}

/**
 * Response containing newly listed coins data.
 */
export interface CoinNewData {
  data: NewCoin[];
  pagination: {
    offset: number;
    limit: number;
  };
}

/**
 * Parameters for fetching a single coin's price.
 */
export interface CoinPriceParams {
  /** Full coin type identifier */
  coin_id: string;
}

/**
 * Price data for a coin across multiple time periods.
 */
export interface CoinPriceData {
  /** Current price in USD */
  price: number;
  
  /** Price change percentage over 24 hours */
  price_change_24h: number | null;
  
  /** Price change percentage over 7 days */
  price_change_7d: number | null;
  
  /** Price change percentage over 30 days */
  price_change_30d: number | null;
}

/**
 * Parameters for fetching multiple coins' prices via GET request.
 */
export interface CoinPriceMultiParamsGet {
  /** Comma-separated list of coin IDs */
  coin_ids: string;
}

/**
 * Parameters for fetching multiple coins' prices via POST request.
 */
export interface CoinPriceMultiParamsPost {
  /** Array of coin IDs */
  coin_ids: string[];
}

/**
 * Response containing prices for multiple coins.
 * Keys are coin IDs, values are price data (or null if not found).
 */
export interface CoinPriceMultiData {
  [coin_id: string]: CoinPriceData | null;
}

/**
 * Parameters for fetching a coin's price and volume.
 */
export interface CoinPriceVolumeParams {
  /** Full coin type identifier */
  coin_id: string;
}

/**
 * Price and volume data for a coin.
 */
export interface CoinPriceVolumeData {
  /** Current price in USD */
  price: number;
  
  /** Trading volume over 24 hours */
  volume_24h: number;
  
  /** Price change percentage over 24 hours */
  price_change_24h: number;
  
  /** Volume change percentage over 24 hours */
  volume_change_24h: number;
}

export interface CoinPriceVolumeMultiParams {
  coin_ids: string[];
}

export interface CoinPriceVolumeMultiData {
  [coin_id: string]: CoinPriceVolumeData;
}

export interface CoinHistoricalPriceParams {
  coin_id: string;
  bucket: number;
  from: number;
  to: number;
}

export interface CoinHistoricalPriceData {
  timestamp: number[];
  price: number[];
}

export interface CoinBasicMetricMultiParams {
  coin_ids: string[];
}

export interface CoinBasicMetric {
  price: number;
  volume_24h: number;
  price_change_1h: number;
  price_change_24h: number;
  price_change_7d: number;
  price_change_30d: number;
  liquidity_usd: number;
}

export interface CoinBasicMetricMultiData {
  [coin_id: string]: CoinBasicMetric;
}

export interface CoinBuySellParams {
  coin_id: string;
  duration: '30m' | '1H' | '4H' | '6H' | '1d' | '1w';
}

export interface TransactionStats {
  tx: number;
  vol: number;
  sender: number;
}

export interface CoinBuySellData {
  buy: TransactionStats;
  sell: TransactionStats;
  unique_sender: number;
  unique_tx: number;
}

export interface CoinInfoListParams {
  coin?: string;
  verified?: boolean;
  limit?: number;
  offset?: number;
}

export interface CoinInfo {
  coin_ident: string;
  name: string;
  symbol: string;
  icon_url: string;
  decimals: number;
  verified: boolean;
  volume_24h: number | null;
  volume_change_24h: number | null;
  price: number | null;
  price_change_1d: number | null;
  published_at: string;
}

export interface CoinInfoListData {
  data: CoinInfo[];
  pagination: {
    offset: number;
    limit: number;
  };
}

export interface CoinLiquidityParams {
  coin_type: string;
}

export interface CoinObjectInPool {
  coin_type: string;
  symbol: string;
  decimals: number;
  icon_url: string;
  verified: boolean;
}

export interface DexLiquidityPool {
  pool_id: string;
  protocol: string;
  coin_a: CoinObjectInPool;
  coin_b: CoinObjectInPool;
  amount_a: number;
  amount_b: number;
  amount_a_usd: number;
  amount_b_usd: number;
  price_a: number;
  price_b: number;
  price_ab: number;
  tvl_usd: number;
  fee_rate: number;
}

export interface LendingLiquidityPool {
  pool_id: string;
  protocol: string;
  coin: CoinObjectInPool;
  deposit: number;
  deposit_usd: number;
  borrow: number;
  borrow_usd: number;
  deposit_apr: number;
  borrow_apr: number;
  utilization: number;
}

export interface CoinLiquidityData {
  coin_type: string;
  symbol: string;
  decimals: number;
  icon_url: string | null;
  verified: boolean;
  dex_liquidity: DexLiquidityPool[];
  lending_liquidity: LendingLiquidityPool[];
}