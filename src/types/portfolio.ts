export interface PortfolioCoinsParams {
  address: string;
}

export interface CoinHolding {
  coin_type: string;
  symbol: string;
  decimals: number;
  icon_url: string | null;
  amount: number;
  usd_value: number;
  verified: boolean;
  price: number;
  pnl_today: number | null;
  pnl_percent_today: number | null;
  price_change_1d: number | null;
  price_change_7d: number | null;
  price_change_30d: number | null;
}

export interface PortfolioCoinsData {
  data: CoinHolding[];
}