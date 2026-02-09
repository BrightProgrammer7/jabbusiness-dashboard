/**
 * API Client for JABBusiness Backend
 * Uses fetch with JWT authentication
 */

import type {
  AnalyticsParams,
  AnalyticsResponse,
  GenerateReportPayload,
  GenerateReportResponse,
  ListReportsParams,
  ReportsListResponse,
  QuickJabbsParams,
  QuickJabbsResponse,
  ReportByTokenResponse,
  LoginPayload,
  LoginResponse,
} from '../types/api';

const API_BASE = import.meta.env.VITE_API_URL || 'http://127.0.0.1:5500/api/v1';

/**
 * Generic fetch wrapper with authentication
 */
async function fetchAPI<T>(
  endpoint: string,
  options?: RequestInit
): Promise<T> {
  const token = localStorage.getItem('jabbusiness_token');

  const response = await fetch(`${API_BASE}${endpoint}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...(token && { 'Authorization': `Bearer ${token}` }),
      ...options?.headers,
    },
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({}));
    throw new Error(error.error || error.message || `API Error: ${response.statusText}`);
  }

  return response.json();
}

export const api = {
  auth: {
    login: (payload: LoginPayload) =>
      fetchAPI<LoginResponse>('/clients/auth/login', {
        method: 'POST',
        body: JSON.stringify(payload),
      }),

    logout: () => {
      localStorage.removeItem('jabbusiness_token');
      localStorage.removeItem('jabbusiness_user');
    },

    getToken: () => localStorage.getItem('jabbusiness_token'),

    setToken: (token: string) => {
      localStorage.setItem('jabbusiness_token', token);
    },

    getUser: () => {
      const user = localStorage.getItem('jabbusiness_user');
      return user ? JSON.parse(user) : null;
    },

    setUser: (user: any) => {
      localStorage.setItem('jabbusiness_user', JSON.stringify(user));
    },
  },

  analytics: {
    get: (params: AnalyticsParams) =>
      fetchAPI<AnalyticsResponse>(
        `/jabbusiness/analytics?${new URLSearchParams(params as any)}`
      ),
  },

  reports: {
    generate: (payload: GenerateReportPayload) =>
      fetchAPI<GenerateReportResponse>('/jabbusiness/reports/generate', {
        method: 'POST',
        body: JSON.stringify(payload),
      }),

    list: (params: ListReportsParams = {}) =>
      fetchAPI<ReportsListResponse>(
        `/jabbusiness/reports?${new URLSearchParams({
          page: String(params.page || 1),
          limit: String(params.limit || 20),
          ...(params.sort && { sort: params.sort }),
        })}`
      ),

    delete: (reportId: string) =>
      fetchAPI<{ message: string }>(`/jabbusiness/reports/${reportId}`, {
        method: 'DELETE',
      }),

    getByToken: (token: string) =>
      fetchAPI<ReportByTokenResponse>(
        `/jabbusiness/reports/by-token/${token}`
      ),

    downloadUrl: (reportId: string, shareToken?: string) => {
      const url = `${API_BASE}/jabbusiness/reports/${reportId}/download`;
      return shareToken ? `${url}?token=${shareToken}` : url;
    },
  },

  quickJabbs: {
    list: (params: QuickJabbsParams = {}) =>
      fetchAPI<QuickJabbsResponse>(
        `/jabbusiness/quick-jabbs?${new URLSearchParams(
          Object.entries(params)
            .filter(([_, v]) => v !== undefined)
            .reduce((acc, [k, v]) => ({ ...acc, [k]: String(v) }), {})
        )}`
      ),

    get: (jabbId: string) =>
      fetchAPI<any>(`/jabbusiness/quick-jabbs/${jabbId}`),
  },
};
