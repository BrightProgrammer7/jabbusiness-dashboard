/**
 * Analytics Hook
 * Fetches dashboard analytics data
 */

import { useQuery } from '@tanstack/react-query';
import { api } from '../lib/api';
import type { AnalyticsParams } from '../types/api';

export function useAnalytics(params: AnalyticsParams) {
  return useQuery({
    queryKey: ['analytics', params],
    queryFn: () => api.analytics.get(params),
    enabled: !!params.start_date && !!params.end_date,
    staleTime: 2 * 60 * 1000, // Fresh for 2 minutes
  });
}
