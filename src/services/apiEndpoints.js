const BASE_URL = `${import.meta.env.VITE_BASE_URL}/api/v1`;

export const endpoints = {
  // #region authEndpoints
  SEND_OTP_API: `${BASE_URL}/auth/send-otp`,
  SIGNUP_API: `${BASE_URL}/auth/signup`,
  LOGIN_API: `${BASE_URL}/auth/login`,
  RESET_PASSWORD_TOKEN_API: `${BASE_URL}/auth/reset-password-token`,
  RESET_PASSWORD_API: `${BASE_URL}/auth/reset-password`,
  CHANGE_PASSWORD_API: `${BASE_URL}/auth/change-password`,
  
  // #region profile
  USER_DETAILS_API: `${BASE_URL}/profile/get-user-details`,
  PROFILE_UPDATE_API: `${BASE_URL}/profile/update-profile`,
  UPLOAD_PROFILE_PICTURE_API: `${BASE_URL}/profile/update-display-picture`,
  VIEW_ENROLLED_COURSES_API: `${BASE_URL}/profile/get-enrolled-courses`,

  // #region categories
  VIEW_ALL_CATEGORIES: `${BASE_URL}/course/get-all-categories`,
  VIEW_ALL_COURSES: `${BASE_URL}/course/get-all-courses`,
};

export default endpoints;
