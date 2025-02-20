const BASE_URL = import.meta.env.VITE_BASE_URL;

const endpoints = {
  VIEW_ALL_CATEGORIES: `${BASE_URL}/course/get-all-categories`,
};

export default endpoints;
