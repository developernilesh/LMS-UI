const BASE_URL = `${import.meta.env.VITE_BASE_URL}/api/v1`;

export const endpoints = {
  // #region auth endpoints
  SEND_OTP_API: `${BASE_URL}/auth/send-otp`,
  SIGNUP_API: `${BASE_URL}/auth/signup`,
  LOGIN_API: `${BASE_URL}/auth/login`,
  RESET_PASSWORD_TOKEN_API: `${BASE_URL}/auth/reset-password-token`,
  RESET_PASSWORD_API: `${BASE_URL}/auth/reset-password`,
  CHANGE_PASSWORD_API: `${BASE_URL}/auth/change-password`,
  
  // #region profile endpoints
  USER_DETAILS_API: `${BASE_URL}/profile/get-user-details`,
  PROFILE_UPDATE_API: `${BASE_URL}/profile/update-profile`,
  UPLOAD_PROFILE_PICTURE_API: `${BASE_URL}/profile/update-display-picture`,
  VIEW_ENROLLED_COURSES_API: `${BASE_URL}/profile/get-enrolled-courses`,

  // #region course endpoints
  VIEW_ALL_CATEGORIES_API: `${BASE_URL}/course/get-all-categories`,
  VIEW_ALL_COURSES_API: `${BASE_URL}/course/get-all-courses`,
  VIEW_CATEGORY_PAGE_DETAILS_API: `${BASE_URL}/course/get-category-page-details`,
  CREATE_COURSE_API: `${BASE_URL}/course/create-course`,
  EDIT_COURSE_API: `${BASE_URL}/course/edit-course`,
  DELETE_COURSE_API: `${BASE_URL}/course/delete-course`,
  PUBLISH_COURSE_API: `${BASE_URL}/course/publish-course`,
  GET_SPECIFIC_COURSE_API: `${BASE_URL}/course/get-courses-details`,
  ADD_SECTION_API: `${BASE_URL}/course/add-section`,
  UPDATE_SECTION_API: `${BASE_URL}/course/update-section`,
  DELETE_SECTION_API: `${BASE_URL}/course/delete-section`,
  ADD_SUB_SECTION_API: `${BASE_URL}/course/add-sub-section`,
  EDIT_SUB_SECTION_API: `${BASE_URL}/course/update-sub-section`,
  DELETE_SUB_SECTION_API: `${BASE_URL}/course/delete-sub-section`,
  MARK_UNMARK_LECTURE_API: `${BASE_URL}/course/toggle-marking-lecture`,
  
  // #region cart endpoints
  ADD_TO_CART_API: `${BASE_URL}/course/add-to-cart`,
  REMOVE_FROM_CART_API: `${BASE_URL}/course/remove-from-cart`,
  GET_CART_ITEMS_API: `${BASE_URL}/course/get-cart-items`,
  CLEAR_CART_ITEMS_API: `${BASE_URL}/course/clear-cart`,
  
  // #region rating and review endpoints
  GET_ALL_RATING_REVIEW_API: `${BASE_URL}/course/get-all-ratings-and-reviews`,
  ADD_RATING_REVIEW_API: `${BASE_URL}/course/add-rating-and-review`,
  
  // #region payment endpoints
  CAPTURE_PAYMENT_API: `${BASE_URL}/payment/capture-payment`,
  VERIFY_PAYMENT_API: `${BASE_URL}/payment/verify-payment`,
  SEND_PAYMENT_SUCCESSFUL_EMAIL_API: `${BASE_URL}/payment/payment-successful-email`,
  
  // #region contact-us form endpoints
  CONTACT_US_FORM_SUBMISSION_API: `${BASE_URL}/contact/contact-us`,
};

export default endpoints;
