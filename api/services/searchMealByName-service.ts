import axios from "axios";
import { MealResponse } from "../model/fetchMealById-model";
import { API_ENDPOINTS } from "../url";

export async function searchMealbyName(name: string): Promise<MealResponse> {
  const response = await axios.get(API_ENDPOINTS.searchMeal, {
    params: { s: name },
  });

  return response.data;
}
