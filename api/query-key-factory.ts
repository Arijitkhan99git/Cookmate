/**
 * Query Key Factory Utilities
 * Provides standardized query key creation functions for consistent cache management
 */

/**
 * Factory function to create standardized query keys for all features
 *
 * @param baseName The base name for the query key (e.g., 'faq', 'dashboard', 'user', etc.)
 * @returns A set of query key functions for standard operations
 *
 * @example
 * ```typescript
 * const userQueryKeys = createQueryKeys('user')
 *
 * // Usage examples:
 * userQueryKeys.all               // ['user']
 * userQueryKeys.lists()           // ['user', 'list']
 * userQueryKeys.list({ active: true }) // ['user', 'list', { filters: { active: true } }]
 * userQueryKeys.details()         // ['user', 'detail']
 * userQueryKeys.detail('123')     // ['user', 'detail', '123']
 * userQueryKeys.statusChanges()   // ['user', 'status']
 * userQueryKeys.statusChange('123') // ['user', 'status', '123']
 * ```
 */
export function createQueryKeys(baseName: string) {
  const all = [baseName] as const;

  return {
    /**
     * Base query key for all operations related to this feature
     * Used for invalidating all queries related to this feature
     */
    all,

    /**
     * Query key for list operations (without filters)
     * Use this for general list queries
     */
    lists: () => [...all, "list"] as const,

    /**
     * Query key for filtered list operations
     * @param filters Object containing filter parameters
     */
    list: (filters: Record<string, unknown>) => {
      const lists = [...all, "list"] as const;
      return [...lists, { filters }] as const;
    },

    /**
     * Query key for detail operations (without specific ID)
     * Use this for invalidating all detail queries
     */
    details: () => [...all, "detail"] as const,

    /**
     * Query key for specific detail operations
     * @param id The unique identifier for the resource
     */
    detail: (id: string) => {
      const details = [...all, "detail"] as const;
      return [...details, id] as const;
    },

    /**
     * Query key for status change operations (without specific ID)
     * Use this for invalidating all status-related queries
     */
    statusChanges: () => [...all, "status"] as const,

    /**
     * Query key for specific status change operations
     * @param id The unique identifier for the resource
     */
    statusChange: (id: string) => {
      const statusChanges = [...all, "status"] as const;
      return [...statusChanges, id] as const;
    },

    /**
     * Query key for custom operations
     * @param operation The operation name (e.g., 'search', 'analytics', etc.)
     * @param params Optional parameters for the operation
     */
    custom: (operation: string, params?: Record<string, unknown>) => {
      const base = [...all, operation] as const;
      return params ? ([...base, params] as const) : base;
    },
  };
}

/**
 * Extended factory function for features that need additional specialized query keys
 *
 * @param baseName The base name for the query key
 * @param extensions Additional query key functions specific to the feature
 * @returns Combined standard and extended query key functions
 *
 * @example
 * ```typescript
 * const dashboardQueryKeys = createExtendedQueryKeys('dashboard', {
 *   activeUsersByMonth: (year: number) => ['dashboard', 'activeUsersByMonth', year],
 *   activeUsersVsResume: (year: number) => ['dashboard', 'activeUsersVsResume', year],
 * })
 * ```
 */
export function createExtendedQueryKeys<
  T extends Record<string, (...args: any[]) => readonly unknown[]>,
>(baseName: string, extensions: T) {
  const baseKeys = createQueryKeys(baseName);

  return {
    ...baseKeys,
    ...extensions,
  };
}

/**
 * Utility function to create simple query keys for straightforward operations
 *
 * @param parts Array of query key parts
 * @returns Readonly tuple of query key parts
 *
 * @example
 * ```typescript
 * const simpleKey = createSimpleQueryKey(['user', 'profile', userId])
 * // Returns: ['user', 'profile', userId] as const
 * ```
 */
export function createSimpleQueryKey<T extends readonly unknown[]>(
  parts: T,
): T {
  return parts;
}
