import axios from "axios";
import { MealResponse } from "../model/fetchMealById-model";
import { API_ENDPOINTS } from "../url";

export async function fetchRandomMeal(): Promise<MealResponse> {
  const response = await axios.get(API_ENDPOINTS.randomMeal);

  return response.data;
}
