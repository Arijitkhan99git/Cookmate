import { useQuery } from "@tanstack/react-query";
import { QUERY_CONFIG } from "../config";
import { fetchQueryKey } from "../query-key";
import { fetchRandomMeal } from "../services/fetchRandomMeal";

export const useFetchRandomMeal = () => {
  return useQuery({
    queryKey: fetchQueryKey.randomMeal(),
    queryFn: () => fetchRandomMeal(),
    ...QUERY_CONFIG.default,
  });
};
