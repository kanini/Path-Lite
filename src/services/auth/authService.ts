import {apiClient, ApiResponse} from '../../utils/api';
import {AUTH_ENDPOINTS} from '../../constants/api';
import type {
  LoginRequest,
  LoginResponse,
  RefreshTokenRequest,
  RefreshTokenResponse,
} from '../../types/auth';

class AuthService {
  async login(
    username: string,
    password: string,
  ): Promise<ApiResponse<LoginResponse>> {
    if (!username.trim() || !password.trim()) {
      return {
        error: {
          message: 'Username and password are required',
          code: 'VALIDATION_ERROR',
        },
      };
    }

    const loginData: LoginRequest = {
      username: username.trim(),
      password,
    };

    return apiClient.post<LoginResponse, LoginRequest>(
      AUTH_ENDPOINTS.LOGIN,
      loginData,
    );
  }

  async logout(token: string): Promise<ApiResponse<void>> {
    return apiClient.post<void>(AUTH_ENDPOINTS.LOGOUT, {}, token);
  }

  async refreshToken(
    refreshToken: string,
  ): Promise<ApiResponse<RefreshTokenResponse>> {
    const refreshData: RefreshTokenRequest = {
      refresh_token: refreshToken,
    };

    return apiClient.post<RefreshTokenResponse, RefreshTokenRequest>(
      AUTH_ENDPOINTS.REFRESH,
      refreshData,
    );
  }

  async verifyToken(token: string): Promise<ApiResponse<{valid: boolean}>> {
    return apiClient.get<{valid: boolean}>(AUTH_ENDPOINTS.VERIFY, token);
  }
}

export const authService = new AuthService();
