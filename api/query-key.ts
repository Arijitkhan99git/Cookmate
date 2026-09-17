import { createExtendedQueryKeys } from "./query-key-factory";

export const fetchQueryKey = createExtendedQueryKeys("home", {
  fullMealDetails: (id: string) => ["home", "fullMealDetails", id] as const,
  listAllCategories: () => ["home", "listAllCategories"] as const,
  listAllAreas: () => ["home", "listAllAreas"] as const,
  mealsByArea: (area: string) => ["home", "mealsByArea", area] as const,
});
