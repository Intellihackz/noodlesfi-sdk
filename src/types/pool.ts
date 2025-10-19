export interface PoolStatsParams {
  pool_address: string;
}

export interface PoolStatsMultiParams {
  pool_addresses: string; // comma-separated string
}

export interface PoolStats {
  pool_address: string;
  coin_a_type: string;
  coin_b_type: string;
  coin_a_symbol: string;
  coin_b_symbol: string;
  liquidity: string;
  amount_a: number;
  amount_b: number;
  amount_a_usd: number;
  amount_b_usd: number;
  tvl_usd: number;
  volume_24h: number;
  volume_1w: number;
  fee_24h: number;
  fee_1w: number;
  fee_rate: number;
  apr_24h: number;
  apr_1w: number;
}

export interface PoolStatsMultiData {
  data: PoolStats[];
}

export interface PoolEventParams {
  pool_address: string;
  limit?: number;
  desc?: boolean;
  cursor?: number;
  timestamp?: number;
}

export interface PoolTradeEventParams extends PoolEventParams {}

export interface PoolLiquidityEventParams extends PoolEventParams {
  action?: 'join' | 'exit';
}

export interface TradeEvent {
  id: number;
  timestamp: number;
  action: string;
  pool_address: string;
  coin_a_type: string;
  coin_b_type: string;
  coin_a_symbol: string;
  coin_b_symbol: string;
  price: number;
  amount_a: number;
  amount_b: number;
  a_to_b: boolean;
  tx_digest: string;
  sender: string;
  source: string | null;
}

export interface LiquidityEvent {
  id: number;
  timestamp: number;
  action: string;
  pool_address: string;
  coin_a_type: string;
  coin_b_type: string;
  coin_a_symbol: string;
  coin_b_symbol: string;
  amount_a: number;
  amount_b: number;
  tx_digest: string;
  sender: string;
}

export interface EventPagination {
  last_cursor: number | null;
  last_timestamp: number | null;
  limit: number;
}

export interface PoolTradeEventData {
  data: TradeEvent[];
  pagination: EventPagination;
}

export interface PoolLiquidityEventData {
  data: LiquidityEvent[];
  pagination: EventPagination;
}


export interface PoolOhlcvParams {
  pool_address: string;
  bucket: 1 | 5 | 15 | 60 | 240 | 1440 | 10080 | 43200;
  from?: number;
  to?: number;
  limit?: number;
}

export type PoolOhlcvDataPoint = [
  timestamp: number,
  open: number,
  high: number,
  low: number,
  close: number,
  volume: number
];

export interface PoolOhlcvData {
  data: PoolOhlcvDataPoint[];
}