import {API_CONFIG} from '../constants/api';

export interface ApiError {
  message: string;
  statusCode?: number;
  code?: string;
}

export interface ApiResponse<T> {
  data?: T;
  error?: ApiError;
}

class ApiClient {
  private baseUrl: string;
  private timeout: number;
  private maxRetries: number;
  private retryDelay: number;

  constructor() {
    this.baseUrl = API_CONFIG.BASE_URL;
    this.timeout = API_CONFIG.TIMEOUT;
    this.maxRetries = API_CONFIG.MAX_RETRIES;
    this.retryDelay = API_CONFIG.RETRY_DELAY;
  }

  private async fetchWithTimeout(
    url: string,
    options: RequestInit,
  ): Promise<Response> {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), this.timeout);

    try {
      const response = await fetch(url, {
        ...options,
        signal: controller.signal,
      });
      clearTimeout(timeoutId);
      return response;
    } catch (error) {
      clearTimeout(timeoutId);
      if (error instanceof Error && error.name === 'AbortError') {
        throw new Error('Connection timeout. Please try again.');
      }
      throw error;
    }
  }

  private async retryRequest<T>(
    fn: () => Promise<T>,
    retries: number = this.maxRetries,
  ): Promise<T> {
    try {
      return await fn();
    } catch (error) {
      if (retries > 0 && this.isRetryableError(error)) {
        await this.delay(this.retryDelay * (this.maxRetries - retries + 1));
        return this.retryRequest(fn, retries - 1);
      }
      throw error;
    }
  }

  private isRetryableError(error: unknown): boolean {
    if (error instanceof Error) {
      return (
        error.message.includes('network') ||
        error.message.includes('timeout') ||
        error.message.includes('fetch')
      );
    }
    return false;
  }

  private delay(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  private async handleResponse<T>(response: Response): Promise<T> {
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      const error: ApiError = {
        message: errorData.detail || errorData.message || 'An error occurred',
        statusCode: response.status,
        code: errorData.code,
      };

      if (response.status === 401) {
        error.message = 'Invalid username or password';
      } else if (response.status === 403) {
        error.message = 'Access forbidden';
      } else if (response.status === 404) {
        error.message = 'Resource not found';
      } else if (response.status >= 500) {
        error.message = 'Server error. Please try again later.';
      }

      throw error;
    }

    return response.json();
  }

  async get<T>(
    endpoint: string,
    token?: string,
  ): Promise<ApiResponse<T>> {
    try {
      const headers: Record<string, string> = {
        'Content-Type': 'application/json',
      };

      if (token) {
        headers.Authorization = `Bearer ${token}`;
      }

      const response = await this.retryRequest(() =>
        this.fetchWithTimeout(`${this.baseUrl}${endpoint}`, {
          method: 'GET',
          headers,
        }),
      );

      const data = await this.handleResponse<T>(response);
      return {data};
    } catch (error) {
      return {
        error: error as ApiError,
      };
    }
  }

  async post<T, D = unknown>(
    endpoint: string,
    data: D,
    token?: string,
  ): Promise<ApiResponse<T>> {
    try {
      const headers: Record<string, string> = {
        'Content-Type': 'application/json',
      };

      if (token) {
        headers.Authorization = `Bearer ${token}`;
      }

      const response = await this.retryRequest(() =>
        this.fetchWithTimeout(`${this.baseUrl}${endpoint}`, {
          method: 'POST',
          headers,
          body: JSON.stringify(data),
        }),
      );

      const responseData = await this.handleResponse<T>(response);
      return {data: responseData};
    } catch (error) {
      return {
        error: error as ApiError,
      };
    }
  }

  async put<T, D = unknown>(
    endpoint: string,
    data: D,
    token?: string,
  ): Promise<ApiResponse<T>> {
    try {
      const headers: Record<string, string> = {
        'Content-Type': 'application/json',
      };

      if (token) {
        headers.Authorization = `Bearer ${token}`;
      }

      const response = await this.retryRequest(() =>
        this.fetchWithTimeout(`${this.baseUrl}${endpoint}`, {
          method: 'PUT',
          headers,
          body: JSON.stringify(data),
        }),
      );

      const responseData = await this.handleResponse<T>(response);
      return {data: responseData};
    } catch (error) {
      return {
        error: error as ApiError,
      };
    }
  }

  async delete<T>(
    endpoint: string,
    token?: string,
  ): Promise<ApiResponse<T>> {
    try {
      const headers: Record<string, string> = {
        'Content-Type': 'application/json',
      };

      if (token) {
        headers.Authorization = `Bearer ${token}`;
      }

      const response = await this.retryRequest(() =>
        this.fetchWithTimeout(`${this.baseUrl}${endpoint}`, {
          method: 'DELETE',
          headers,
        }),
      );

      const data = await this.handleResponse<T>(response);
      return {data};
    } catch (error) {
      return {
        error: error as ApiError,
      };
    }
  }
}

export const apiClient = new ApiClient();
