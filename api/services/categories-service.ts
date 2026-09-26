import axios from "axios";
import { AllCategoriesResponse } from "../model/categories-model";
import { ListMealsByCategoryResponse } from "../model/listMealsByCategory";
import { API_ENDPOINTS } from "../url";

export async function fetchAllCategories(): Promise<AllCategoriesResponse> {
  const response = await axios.get(API_ENDPOINTS.listAllCategories);

  return response.data;
}

export async function fetchMealsByCategory(
  cat: string,
): Promise<ListMealsByCategoryResponse> {
  const response = await axios.get(API_ENDPOINTS.filterMeal, {
    params: { c: cat },
  });

  return response.data;
}
