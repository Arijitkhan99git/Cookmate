import { useQueries } from "@tanstack/react-query";
import { QUERY_CONFIG } from "../config";

import { Meal } from "../model/fetchMealById-model";
import { fetchQueryKey } from "../query-key";
import { fetchMealById } from "../services/fetchMealById-services";

export function useFetchMealsByIds(ids: string[]) {
  const queries = useQueries({
    queries: ids.map((id) => ({
      queryKey: fetchQueryKey.fullMealDetails(id),
      queryFn: () => fetchMealById(id),
      enabled: !!id,
      ...QUERY_CONFIG.default,
    })),
  });

  const isLoading = queries.some((q) => q.isLoading);
  const isError = queries.some((q) => q.isError);

  // Flatten all meals from all query results into a single array
  const meals: Meal[] = queries.flatMap((q) => q.data?.meals ?? []);

  return { meals, isLoading, isError };
}
