import { useQuery } from "@tanstack/react-query";
import { QUERY_CONFIG } from "../config";
import { fetchQueryKey } from "../query-key";
import { fetchMealsByCategory } from "../services/categories-service";

export const useFetchMealsByCategory = (cat: string) => {
  return useQuery({
    queryKey: fetchQueryKey.mealsByCategory(cat),
    queryFn: () => fetchMealsByCategory(cat),
    enabled: !!cat,
    ...QUERY_CONFIG.default,
  });
};
