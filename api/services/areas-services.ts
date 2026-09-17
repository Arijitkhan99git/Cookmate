import axios from "axios";
import { FilterByAreaResponse } from "../model/filterByArea-model";
import { ListAllAreasResponse } from "../model/listAllAreas-model";
import { API_ENDPOINTS } from "../url";

export async function fetchAllAreasList(): Promise<ListAllAreasResponse> {
  const response = await axios.get(API_ENDPOINTS.listAllAreas);

  return response.data;
}

export async function fetchMealsByArea(
  area: string,
): Promise<FilterByAreaResponse> {
  const response = await axios.get(API_ENDPOINTS.filterMeal, {
    params: { a: area },
  });

  return response.data;
}
