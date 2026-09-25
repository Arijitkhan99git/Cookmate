import { useQuery } from "@tanstack/react-query";
import { QUERY_CONFIG } from "../config";
import { fetchQueryKey } from "../query-key";
import { searchMealbyName } from "../services/searchMealByName-service";

export const useSearchMealByName = (name: string) => {
  return useQuery({
    queryKey: fetchQueryKey.searchMealbyName(name),
    queryFn: () => searchMealbyName(name),
    enabled: !!name,
    ...QUERY_CONFIG.default,
  });
};
