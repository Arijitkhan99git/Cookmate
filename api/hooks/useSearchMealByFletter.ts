import { useQuery } from "@tanstack/react-query";
import { QUERY_CONFIG } from "../config";
import { fetchQueryKey } from "../query-key";
import { searchMealByFirstLetter } from "../services/searchMealByFLetter-service";

export const useSearchMealByFLetter = (letter: string) => {
  return useQuery({
    queryKey: fetchQueryKey.searchMealbyFirstLetter(letter),
    queryFn: () => searchMealByFirstLetter(letter),
    enabled: !!letter,
    ...QUERY_CONFIG.default,
  });
};
