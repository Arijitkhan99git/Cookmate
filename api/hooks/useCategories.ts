import { useQuery } from "@tanstack/react-query";
import { QUERY_CONFIG } from "../config";
import { AllCategoriesResponse } from "../model/categories-model";
import { fetchQueryKey } from "../query-key";
import { fetchAllCategories } from "../services/categories-service";

export function useFetchAllCategories() {
  const { data, isLoading, isError, error, refetch, isRefetching } =
    useQuery<AllCategoriesResponse>({
      queryKey: fetchQueryKey.listAllCategories(),
      queryFn: () => fetchAllCategories(),
      ...QUERY_CONFIG.default,
    });

  return { data, isLoading, isError, error, refetch, isRefetching };
}
