import { createExtendedQueryKeys } from "./query-key-factory";

export const fetchQueryKey = createExtendedQueryKeys("home", {
  listAllCategories: () => ["home", "listAllCategories"] as const,
});
