const BASE_URL =
  process.env.EXPO_COOK_BASE_URL ?? "https://www.themealdb.com/api/json/v1/1/";

export const API_ENDPOINTS = {
  listAllCategories: `${BASE_URL}categories.php`,
};
