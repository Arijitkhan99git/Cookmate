import axios from "axios";
import { MealResponse } from "../model/fetchMealById-model";
import { API_ENDPOINTS } from "../url";

export async function searchMealByFirstLetter(
  letter: string,
): Promise<MealResponse> {
  const response = await axios.get(API_ENDPOINTS.searchMeal, {
    params: { f: letter },
  });

  return response.data;
}
