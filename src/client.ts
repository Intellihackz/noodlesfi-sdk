import axios, { AxiosInstance, AxiosError } from "axios";
import { BASE_URL, DEFAULT_TIMEOUT } from "./constants";
import { NoodlesConfig, ApiResponse, ApiError } from "./types/common";
import {
  NoodlesError,
  BadRequestError,
  UnauthorizedError,
  RateLimitError,
  InternalServerError,
} from "./errors";

/**
 * Internal HTTP client for making authenticated requests to the Noodles API.
 * Handles request configuration, authentication, and error transformation.
 * 
 * @internal This class is used internally by the SDK and should not be instantiated directly.
 */
export class HttpClient {
  private axiosInstance: AxiosInstance;

  constructor(config: NoodlesConfig) {
    this.axiosInstance = axios.create({
      baseURL: BASE_URL,
      timeout: config.timeout || DEFAULT_TIMEOUT,
      headers: {
        "x-api-key": config.apiKey,
        "Accept-Encoding": "application/json",
        "Content-Type": "application/json",
      },
    });

    // Response interceptor for error handling
    this.axiosInstance.interceptors.response.use(
      (response) => response,
      (error: AxiosError<ApiError>) => {
        return Promise.reject(this.handleError(error));
      }
    );
  }

  /**
   * Transforms Axios errors into typed Noodles SDK errors.
   * @private
   */
  private handleError(error: AxiosError<ApiError>): NoodlesError {
    if (error.response) {
      const { code, message, data } = error.response.data;

      switch (code) {
        case 400:
          return new BadRequestError(message, data);
        case 401:
          return new UnauthorizedError(message, data);
        case 429:
          return new RateLimitError(message, data);
        case 500:
          return new InternalServerError(message, data);
        default:
          return new NoodlesError(message, code, data);
      }
    }

    // Network error or timeout
    return new NoodlesError(error.message || "Network error occurred", 0, null);
  }

  /**
   * Performs a GET request to the Noodles API.
   * @internal
   */
  public async get<T>(url: string, params?: any): Promise<ApiResponse<T>> {
    const response = await this.axiosInstance.get<ApiResponse<T>>(url, {
      params,
    });
    return response.data;
  }

  /**
   * Performs a POST request to the Noodles API.
   * @internal
   */
  public async post<T>(url: string, data?: any): Promise<ApiResponse<T>> {
    const response = await this.axiosInstance.post<ApiResponse<T>>(url, data);
    return response.data;
  }

//   public async put<T>(url: string, data?: any): Promise<ApiResponse<T>> {
//     const response = await this.axiosInstance.put<ApiResponse<T>>(url, data);
//     return response.data;
//   }

//   public async delete<T>(url: string): Promise<ApiResponse<T>> {
//     const response = await this.axiosInstance.delete<ApiResponse<T>>(url);
//     return response.data;
//   }
}
