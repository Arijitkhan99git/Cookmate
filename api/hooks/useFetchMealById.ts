import { useQuery } from "@tanstack/react-query";
import { QUERY_CONFIG } from "../config";
import { fetchQueryKey } from "../query-key";
import { fetchMealById } from "../services/fetchMealById-services";

export const useFetchMealById = (id: string) => {
  return useQuery({
    queryKey: fetchQueryKey.fullMealDetails(id),
    queryFn: () => fetchMealById(id),
    enabled: !!id,
    ...QUERY_CONFIG.default,
  });
};
