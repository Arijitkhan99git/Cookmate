import { useQueries, useQuery } from "@tanstack/react-query";
import { QUERY_CONFIG } from "../config";
import { CountryMeal } from "../model/listAllAreas-model";
import { fetchQueryKey } from "../query-key";
import {
  fetchAllAreasList,
  fetchMealsByArea,
} from "../services/areas-services";

export function useFetchAllAreaList() {
  return useQuery({
    queryKey: fetchQueryKey.listAllAreas(),
    queryFn: () => fetchAllAreasList(),
    ...QUERY_CONFIG.default,
  });
}

export function useFetchMealsByAreasLists(areas: CountryMeal[]) {
  const queries = useQueries({
    queries: areas.map((area) => ({
      queryKey: fetchQueryKey.mealsByArea(area.strCountry),
      queryFn: () => fetchMealsByArea(area.strCountry),
      enabled: !!area.strCountry,
      ...QUERY_CONFIG.default,
    })),
  });

  const isLoading = queries.some((q) => q.isLoading);
  const isError = queries.some((q) => q.isError);
  const error = queries.find((q) => q.error)?.error;

  const areaData = queries.flatMap((item) => {
    const count = item.data?.meals?.length ?? 0;
    if (count > 0) {
      const firstData = item.data?.meals[0];
      // Guard: skip if any required field is missing
      if (
        !firstData?.idMeal ||
        !firstData?.strArea ||
        !firstData?.strMealThumb
      ) {
        return [];
      }
      return [
        {
          id: firstData.idMeal,
          title: firstData.strArea,
          image: firstData.strMealThumb,
          totalMealCount: count,
        },
      ];
    }
    return []; // skip loading / empty queries — no undefined pollution
  });

  const isRefetching = queries.some((q) => q.isRefetching);
  const refetch = () => queries.forEach((q) => q.refetch());

  return { areaData, isLoading, isError, error, refetch, isRefetching };
}
