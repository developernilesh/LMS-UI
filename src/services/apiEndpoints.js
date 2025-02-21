const BASE_URL = `${import.meta.env.VITE_BASE_URL}/api/v1`;

// Auth API Endpoints
const authEndpoints = {
  SEND_OTP_API: `${BASE_URL}/auth/send-otp`,
  LOGIN_API: `${BASE_URL}/auth/login`,
  SIGNUP_API: `${BASE_URL}/auth/signup`,
  RESET_PASSWORD_TOKEN_API: `${BASE_URL}/auth/reset-password-token`,
  RESET_PASSWORD_API: `${BASE_URL}/auth/reset-password`,
};

const endpoints = {
  VIEW_ALL_CATEGORIES: `${BASE_URL}/course/get-all-categories`,
};

export default endpoints;
