import axios from "axios";
import { MealResponse } from "../model/fetchMealById-model";
import { API_ENDPOINTS } from "../url";

export async function fetchMealById(id: string): Promise<MealResponse> {
  const response = await axios.get(API_ENDPOINTS.fullMealDetails, {
    params: { i: id },
  });

  return response.data;
}
