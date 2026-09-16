import axios from "axios";
import { AllCategoriesResponse } from "../model/categories-model";
import { API_ENDPOINTS } from "../url";

export async function fetchAllCategories(): Promise<AllCategoriesResponse> {
  const response = await axios.get(API_ENDPOINTS.listAllCategories);

  return response.data;
}
