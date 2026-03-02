import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
} from 'react';
import {authService} from '../services/auth/authService';
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
      setAuthState(prev => ({...prev, isLoading: true}));

      try {
        const response = await authService.login(username, password);

        if (response.error) {
          setAuthState(prev => ({...prev, isLoading: false}));
          return {
            success: false,
            error: response.error.message,
          };
        }

        if (response.data) {
          setAuthState({
            user: response.data.user,
            token: response.data.access_token,
            isAuthenticated: true,
            isLoading: false,
          });

          // TODO: Store token securely using react-native-keychain
          // await Keychain.setGenericPassword('token', response.data.access_token);

          return {success: true};
        }

        return {
          success: false,
          error: 'Login failed',
        };
      } catch (error) {
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

      // TODO: Clear stored token
      // await Keychain.resetGenericPassword();

      setAuthState({
        user: null,
        token: null,
        isAuthenticated: false,
        isLoading: false,
      });
    } catch (error) {
      console.error('Logout error:', error);
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
    // TODO: Check for stored token on mount
    // const loadStoredToken = async () => {
    //   try {
    //     const credentials = await Keychain.getGenericPassword();
    //     if (credentials && credentials.password) {
    //       const verifyResponse = await authService.verifyToken(credentials.password);
    //       if (verifyResponse.data?.valid) {
    //         // Token is valid, restore session
    //       }
    //     }
    //   } catch (error) {
    //     console.error('Error loading stored token:', error);
    //   }
    // };
    // loadStoredToken();
  }, []);

  const value: AuthContextType = {
    ...authState,
    login,
    logout,
    refreshToken,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
