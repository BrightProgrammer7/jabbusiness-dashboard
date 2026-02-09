/**
 * Reports Hook
 * Manages report generation and listing
 */

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { api } from '../lib/api';
import { toast } from 'sonner';
import type { ListReportsParams, GenerateReportPayload } from '../types/api';

export function useReports(params: ListReportsParams = {}) {
  return useQuery({
    queryKey: ['reports', params],
    queryFn: () => api.reports.list(params),
    staleTime: 1 * 60 * 1000, // Fresh for 1 minute
  });
}

export function useGenerateReport() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: GenerateReportPayload) =>
      api.reports.generate(payload),
    onSuccess: async () => {
      // Invalidate reports list to show new report
      await queryClient.invalidateQueries({
        queryKey: ['reports'],
      });

      // Invalidate analytics to update counts
      await queryClient.invalidateQueries({
        queryKey: ['analytics'],
      });

      toast.success('Report generated successfully!');
    },
    onError: (error: Error) => {
      toast.error(`Failed to generate report: ${error.message}`);
    },
  });
}

export function useDeleteReport() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (reportId: string) => api.reports.delete(reportId),
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ['reports'],
      });
      toast.success('Report deleted successfully');
    },
    onError: (error: Error) => {
      toast.error(`Failed to delete report: ${error.message}`);
    },
  });
}

export function useReportByToken(token: string) {
  return useQuery({
    queryKey: ['report-by-token', token],
    queryFn: () => api.reports.getByToken(token),
    enabled: !!token,
  });
}
