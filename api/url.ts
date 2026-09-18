const BASE_URL =
  process.env.EXPO_COOK_BASE_URL ?? "https://www.themealdb.com/api/json/v1/1/";

export const API_ENDPOINTS = {
  fullMealDetails: `${BASE_URL}lookup.php`,
  listAllCategories: `${BASE_URL}categories.php`,
  listAllAreas: `${BASE_URL}list.php?a=list`,
  filterMeal: `${BASE_URL}filter.php`,
  randomMeal: `${BASE_URL}random.php`,
};
