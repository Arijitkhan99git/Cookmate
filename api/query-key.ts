import { createExtendedQueryKeys } from "./query-key-factory";

export const fetchQueryKey = createExtendedQueryKeys("home", {
  fullMealDetails: (id: string) => ["home", "fullMealDetails", id] as const,
  listAllCategories: () => ["home", "listAllCategories"] as const,
  listAllAreas: () => ["home", "listAllAreas"] as const,
  mealsByArea: (area: string) => ["home", "mealsByArea", area] as const,
  randomMeal: () => ["home", "randomMeal"] as const,
  searchMealbyName: (name: string) =>
    ["home", "searchMealbyName", name] as const,
  searchMealbyFirstLetter: (letter: string) =>
    ["home", "searchMealbyFirstLetter", letter] as const,
  mealsByCategory: (cat: string) => ["home", "mealsByCategory", cat] as const,
});
