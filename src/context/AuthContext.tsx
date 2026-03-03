import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
} from 'react';
import {authService} from '../services/auth/authService';
import {AuthStorage} from '../storage/AuthStorage';
import type {User, AuthState} from '../types/auth';

interface AuthContextType extends AuthState {
  login: (username: string, password: string) => Promise<{success: boolean; error?: string}>;
  logout: () => Promise<void>;
  refreshToken: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: React.ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({children}) => {
  const [authState, setAuthState] = useState<AuthState>({
    user: null,
    token: null,
    isAuthenticated: false,
    isLoading: false,
  });

  const login = useCallback(
    async (username: string, password: string): Promise<{success: boolean; error?: string}> => {
      console.log('[AuthContext] Login attempt started for username:', username);
      setAuthState(prev => ({...prev, isLoading: true}));

      try {
        console.log('[AuthContext] Calling authService.login...');
        const response = await authService.login(username, password);
        console.log('[AuthContext] authService.login response:', JSON.stringify(response, null, 2));

        if (response.error) {
          console.error('[AuthContext] Login failed with error:', response.error);
          setAuthState(prev => ({...prev, isLoading: false}));
          return {
            success: false,
            error: response.error.message,
          };
        }

        if (response.data) {
          console.log('[AuthContext] Login successful, user:', response.data.user);
          
          // Save token and user data to secure storage
          await AuthStorage.saveToken(response.data.access_token);
          await AuthStorage.saveUser(response.data.user);
          
          setAuthState({
            user: response.data.user,
            token: response.data.access_token,
            isAuthenticated: true,
            isLoading: false,
          });

          return {success: true};
        }

        console.warn('[AuthContext] Login response has no data and no error');
        return {
          success: false,
          error: 'Login failed',
        };
      } catch (error) {
        console.error('[AuthContext] Login exception:', error);
        setAuthState(prev => ({...prev, isLoading: false}));
        return {
          success: false,
          error: error instanceof Error ? error.message : 'An error occurred',
        };
      }
    },
    [],
  );

  const logout = useCallback(async () => {
    setAuthState(prev => ({...prev, isLoading: true}));

    try {
      if (authState.token) {
        await authService.logout(authState.token);
      }

      // Clear stored auth data
      await AuthStorage.clearAuth();

      setAuthState({
        user: null,
        token: null,
        isAuthenticated: false,
        isLoading: false,
      });
    } catch (error) {
      console.error('Logout error:', error);
      
      // Still clear local storage even if API call fails
      await AuthStorage.clearAuth();
      
      setAuthState({
        user: null,
        token: null,
        isAuthenticated: false,
        isLoading: false,
      });
    }
  }, [authState.token]);

  const refreshToken = useCallback(async () => {
    // TODO: Implement token refresh logic
    // This will be implemented when refresh tokens are added
    console.log('Token refresh not yet implemented');
  }, []);

  useEffect(() => {
    const loadStoredAuth = async () => {
      try {
        console.log('[AuthContext] Checking for stored auth data...');
        const token = await AuthStorage.getToken();
        const user = await AuthStorage.getUser();
        
        if (token && user) {
          console.log('[AuthContext] Found stored auth, verifying token...');
          const verifyResponse = await authService.verifyToken(token);
          
          if (verifyResponse.data?.valid) {
            console.log('[AuthContext] Token valid, restoring session');
            setAuthState({
              user,
              token,
              isAuthenticated: true,
              isLoading: false,
            });
          } else {
            console.log('[AuthContext] Token invalid, clearing storage');
            await AuthStorage.clearAuth();
          }
        } else {
          console.log('[AuthContext] No stored auth found');
        }
      } catch (error) {
        console.error('[AuthContext] Error loading stored auth:', error);
        await AuthStorage.clearAuth();
      }
    };
    
    loadStoredAuth();
  }, []);

  const value: AuthContextType = {
    ...authState,
    login,
    logout,
    refreshToken,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
