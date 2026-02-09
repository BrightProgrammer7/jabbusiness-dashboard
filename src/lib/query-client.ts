/**
 * TanStack Query Client Configuration
 * Server state management with caching
 */

import { QueryClient } from '@tanstack/react-query';

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 2 * 60 * 1000, // Fresh for 2 minutes
      gcTime: 5 * 60 * 1000, // Keep in cache for 5 minutes
      retry: 1,
      refetchOnWindowFocus: false,
    },
    mutations: {
      retry: false,
    },
  },
});
