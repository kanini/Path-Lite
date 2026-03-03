export const API_CONFIG = {
  BASE_URL: __DEV__ 
    ? 'http://localhost:8000' // Using adb reverse for port forwarding
    : 'https://api.pathlite.com',
  TIMEOUT: 10000, // Reduced to 10 seconds for faster feedback
  MAX_RETRIES: 1, // Reduced retries during testing
  RETRY_DELAY: 1000,
};

export const AUTH_ENDPOINTS = {
  LOGIN: '/api/v1/auth/login',
  LOGOUT: '/api/v1/auth/logout',
  REFRESH: '/api/v1/auth/refresh',
  VERIFY: '/api/v1/auth/verify',
};

export const PATIENT_ENDPOINTS = {
  LIST: '/api/v1/patients',
  SEARCH: '/api/v1/patients/search',
  CREATE: '/api/v1/patients',
  UPDATE: '/api/v1/patients/:id',
  DELETE: '/api/v1/patients/:id',
};

export const HOSPITAL_ENDPOINTS = {
  LIST: '/api/v1/hospitals',
  GET: '/api/v1/hospitals/:id',
};
