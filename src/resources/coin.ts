import { HttpClient } from "../client";
import { ApiResponse } from "../types/common";
import {
  CoinDetailParams,
  CoinDetailData,
  CoinTrendingParams,
  CoinTrendingData,
  CoinTopParams,
  CoinTopData,
  CoinNewParams,
  CoinNewData,
  CoinPriceParams,
  CoinPriceData,
  CoinPriceMultiParamsGet,
  CoinPriceMultiParamsPost,
  CoinPriceMultiData,
  CoinPriceVolumeParams,
  CoinPriceVolumeData,
  CoinPriceVolumeMultiParams,
  CoinPriceVolumeMultiData,
  CoinHistoricalPriceParams,
  CoinHistoricalPriceData,
  CoinBasicMetricMultiParams,
  CoinBasicMetricMultiData,
  CoinInfoListParams,
  CoinInfoListData,
  CoinLiquidityParams,
  CoinLiquidityData,
  CoinBuySellParams,
  CoinBuySellData,
} from "../types/coin";

export class CoinResource {
  constructor(private client: HttpClient) {}

  async getDetail(
    params: CoinDetailParams,
    chain: string = "sui"
  ): Promise<ApiResponse<CoinDetailData>> {
    const originalHeaders = (this.client as any).axiosInstance.defaults.headers;
    (this.client as any).axiosInstance.defaults.headers["x-chain"] = chain;

    try {
      return await this.client.get<CoinDetailData>(
        "/api/v1/partner/coin-detail",
        params
      );
    } finally {
      delete (this.client as any).axiosInstance.defaults.headers["x-chain"];
    }
  }

  async getTrending(params: CoinTrendingParams): Promise<CoinTrendingData> {
    const response = await this.client.post<CoinTrendingData>(
      "/api/v1/partner/coin-trending",
      params
    );
    return response.data!;
  }

  async getTop(params: CoinTopParams = {}): Promise<CoinTopData> {
    const response = await this.client.post<CoinTopData>(
      "/api/v1/partner/coin-top",
      params
    );
    return response.data!;
  }

  async getNew(params: CoinNewParams = {}): Promise<CoinNewData> {
    const response = await this.client.post<CoinNewData>(
      "/api/v1/partner/coin-new",
      params
    );
    return response.data!;
  }

  async getPrice(
    params: CoinPriceParams,
    chain: string = "sui"
  ): Promise<ApiResponse<CoinPriceData>> {
    const originalHeaders = (this.client as any).axiosInstance.defaults.headers;
    (this.client as any).axiosInstance.defaults.headers["x-chain"] = chain;

    try {
      return await this.client.get<CoinPriceData>(
        "/api/v1/partner/coin-price",
        params
      );
    } finally {
      delete (this.client as any).axiosInstance.defaults.headers["x-chain"];
    }
  }

  async getPriceMulti(
    params: CoinPriceMultiParamsGet | CoinPriceMultiParamsPost,
    chain: string = "sui",
    method: "GET" | "POST" = "POST"
  ): Promise<ApiResponse<CoinPriceMultiData>> {
    const originalHeaders = (this.client as any).axiosInstance.defaults.headers;
    (this.client as any).axiosInstance.defaults.headers["x-chain"] = chain;

    try {
      if (method === "GET") {
        return await this.client.get<CoinPriceMultiData>(
          "/api/v1/partner/coin-price-multi",
          params as CoinPriceMultiParamsGet
        );
      } else {
        return await this.client.post<CoinPriceMultiData>(
          "/api/v1/partner/coin-price-multi",
          params as CoinPriceMultiParamsPost
        );
      }
    } finally {
      delete (this.client as any).axiosInstance.defaults.headers["x-chain"];
    }
  }

  async getPriceVolume(
    params: CoinPriceVolumeParams
  ): Promise<ApiResponse<CoinPriceVolumeData>> {
    return await this.client.get<CoinPriceVolumeData>(
      "/api/v1/partner/coin-price-volume",
      params
    );
  }

  async getPriceVolumeMulti(
    params: CoinPriceVolumeMultiParams,
    chain: string = "sui"
  ): Promise<ApiResponse<CoinPriceVolumeMultiData>> {
    const originalHeaders = (this.client as any).axiosInstance.defaults.headers;
    (this.client as any).axiosInstance.defaults.headers["x-chain"] = chain;

    try {
      return await this.client.post<CoinPriceVolumeMultiData>(
        "/api/v1/partner/coin-price-volume-multi",
        params
      );
    } finally {
      delete (this.client as any).axiosInstance.defaults.headers["x-chain"];
    }
  }

  async getHistoricalPrice(
    params: CoinHistoricalPriceParams,
    chain: string = "sui"
  ): Promise<ApiResponse<CoinHistoricalPriceData>> {
    const originalHeaders = (this.client as any).axiosInstance.defaults.headers;
    (this.client as any).axiosInstance.defaults.headers["x-chain"] = chain;

    try {
      return await this.client.get<CoinHistoricalPriceData>(
        "/api/v1/partner/coin-historical-price",
        params
      );
    } finally {
      delete (this.client as any).axiosInstance.defaults.headers["x-chain"];
    }
  }

  async getBasicMetricMulti(
    params: CoinBasicMetricMultiParams,
    chain: string = "sui"
  ): Promise<ApiResponse<CoinBasicMetricMultiData>> {
    const originalHeaders = (this.client as any).axiosInstance.defaults.headers;
    (this.client as any).axiosInstance.defaults.headers["x-chain"] = chain;

    try {
      return await this.client.post<CoinBasicMetricMultiData>(
        "/api/v1/partner/coin-basic-metric-multi",
        params
      );
    } finally {
      delete (this.client as any).axiosInstance.defaults.headers["x-chain"];
    }
  }

  async getBuySell(
    params: CoinBuySellParams
  ): Promise<ApiResponse<CoinBuySellData>> {
    return await this.client.get<CoinBuySellData>(
      "/api/v1/partner/coin-buy-sell",
      params
    );
  }

  async getInfoList(
    params: CoinInfoListParams = {}
  ): Promise<CoinInfoListData> {
    const response = await this.client.get<CoinInfoListData>(
      "/api/v1/partner/coin-info-list",
      params
    );
    return response.data!;
  }

  async getLiquidity(
    params: CoinLiquidityParams
  ): Promise<ApiResponse<CoinLiquidityData>> {
    return await this.client.get<CoinLiquidityData>(
      "/api/v1/partner/coin/liquidity",
      params
    );
  }
}
