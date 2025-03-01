const BASE_URL = `${import.meta.env.VITE_BASE_URL}/api/v1`;

export const endpoints = {
  // #region authEndpoints
  SEND_OTP_API: `${BASE_URL}/auth/send-otp`,
  SIGNUP_API: `${BASE_URL}/auth/signup`,
  LOGIN_API: `${BASE_URL}/auth/login`,
  RESET_PASSWORD_TOKEN_API: `${BASE_URL}/auth/reset-password-token`,
  RESET_PASSWORD_API: `${BASE_URL}/auth/reset-password`,
  
  // #region profile
  USER_DETAILS_API: `${BASE_URL}/profile/get-user-details`,

  // #region categories
  VIEW_ALL_CATEGORIES: `${BASE_URL}/course/get-all-categories`,
};

export default endpoints;
