import { useQuery } from "@tanstack/react-query";
import { QUERY_CONFIG } from "../config";
import { fetchQueryKey } from "../query-key";
import { fetchMealsByArea } from "../services/areas-services";

export function useFetchMealsByArea(area: string) {
  return useQuery({
    queryKey: fetchQueryKey.mealsByArea(area),
    queryFn: () => fetchMealsByArea(area),
    enabled: !!area, // ← don't fetch if area is empty
    ...QUERY_CONFIG.default,
  });
}
