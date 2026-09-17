import { useQuery } from "@tanstack/react-query";
import { QUERY_CONFIG } from "../config";
import { fetchQueryKey } from "../query-key";
import { fetchAllAreasList } from "../services/areas-services";

export function useFetchAllAreaList() {
  return useQuery({
    queryKey: fetchQueryKey.listAllAreas(),
    queryFn: () => fetchAllAreasList(),
    ...QUERY_CONFIG.default,
  });
}
