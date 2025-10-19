import { HttpClient } from '../client';
import { ApiResponse } from '../types/common';
import { PortfolioCoinsParams, PortfolioCoinsData } from '../types/portfolio';

export class PortfolioResource {
  constructor(private client: HttpClient) {}

  async getCoins(
    params: PortfolioCoinsParams
  ): Promise<ApiResponse<PortfolioCoinsData>> {
    return await this.client.get<PortfolioCoinsData>(
      '/api/v1/partner/portfolio/coins',
      params
    );
  }
}