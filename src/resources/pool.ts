import { HttpClient } from '../client';
import { ApiResponse } from '../types/common';
import {
  PoolStatsParams,
  PoolStats,
  PoolStatsMultiParams,
  PoolStatsMultiData,
  PoolTradeEventParams,
  PoolTradeEventData,
  PoolLiquidityEventParams,
  PoolLiquidityEventData,
  PoolOhlcvParams,
  PoolOhlcvData,
} from '../types/pool';

export class PoolResource {
  constructor(private client: HttpClient) {}

  async getStats(params: PoolStatsParams): Promise<ApiResponse<PoolStats>> {
    return await this.client.get<PoolStats>(
      '/api/v1/partner/pool/stats',
      params
    );
  }

  async getStatsMulti(
    params: PoolStatsMultiParams
  ): Promise<ApiResponse<PoolStatsMultiData>> {
    return await this.client.get<PoolStatsMultiData>(
      '/api/v1/partner/pool/stats-multi',
      params
    );
  }

  async getTradeEvents(
    params: PoolTradeEventParams
  ): Promise<ApiResponse<PoolTradeEventData>> {
    return await this.client.get<PoolTradeEventData>(
      '/api/v1/partner/pool/event/trade',
      params
    );
  }

  async getLiquidityEvents(
    params: PoolLiquidityEventParams
  ): Promise<ApiResponse<PoolLiquidityEventData>> {
    return await this.client.get<PoolLiquidityEventData>(
      '/api/v1/partner/pool/event/liquidity',
      params
    );
  }

  async getOhlcv(
    params: PoolOhlcvParams
  ): Promise<ApiResponse<PoolOhlcvData>> {
    return await this.client.get<PoolOhlcvData>(
      '/api/v1/partner/pool/ohlcv',
      params
    );
  }
}