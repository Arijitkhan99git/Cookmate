/**
 * TanStack Query configuration constants
 * Centralized configuration for consistent query behavior across the application
 */

// Cache timing configurations (in milliseconds)
export const CACHE_CONFIG = {
  staleTime: {
    short: 1 * 60 * 1000, // 1 minute - for frequently changing data
    medium: 5 * 60 * 1000, // 5 minutes - default for most queries
    long: 15 * 60 * 1000, // 15 minutes - for relatively static data
    veryLong: 60 * 60 * 1000, // 1 hour - for very static data like settings
  },
  gcTime: {
    short: 5 * 60 * 1000, // 5 minutes
    medium: 10 * 60 * 1000, // 10 minutes - default
    long: 30 * 60 * 1000, // 30 minutes
    veryLong: 60 * 60 * 1000, // 1 hour
  },
} as const;

// Retry configurations
export const RETRY_CONFIG = {
  default: {
    retry: 3,
    retryDelay: (attemptIndex: number) =>
      Math.min(1000 * 2 ** attemptIndex, 30000), // Exponential backoff with max 30s
  },
  aggressive: {
    retry: 5,
    retryDelay: (attemptIndex: number) =>
      Math.min(500 * 2 ** attemptIndex, 15000), // Faster retry with max 15s
  },
  conservative: {
    retry: 2,
    retryDelay: (attemptIndex: number) =>
      Math.min(2000 * 2 ** attemptIndex, 60000), // Slower retry with max 60s
  },
  none: {
    retry: false,
    retryDelay: 0,
  },
} as const;

// Combined query configurations for common use cases
export const QUERY_CONFIG = {
  // For standard data fetching (most common)
  default: {
    ...RETRY_CONFIG.default,
    staleTime: CACHE_CONFIG.staleTime.medium,
    gcTime: CACHE_CONFIG.gcTime.medium,
  },

  // For real-time or frequently changing data
  realtime: {
    ...RETRY_CONFIG.aggressive,
    staleTime: CACHE_CONFIG.staleTime.short,
    gcTime: CACHE_CONFIG.gcTime.short,
  },

  // For static or rarely changing data
  static: {
    ...RETRY_CONFIG.conservative,
    staleTime: CACHE_CONFIG.staleTime.veryLong,
    gcTime: CACHE_CONFIG.gcTime.veryLong,
  },

  // For critical mutations or sensitive operations
  critical: {
    ...RETRY_CONFIG.none,
    staleTime: 0, // Always fresh
    gcTime: CACHE_CONFIG.gcTime.short,
  },
} as const;

// Specific configurations for different data types

export const DATA_TYPE_CONFIG = {
  banner: QUERY_CONFIG.static,
};
