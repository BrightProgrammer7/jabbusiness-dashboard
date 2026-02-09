/**
 * TypeScript interfaces for JABBusiness API
 * Matches backend API contract
 */

export interface AnalyticsParams {
  start_date: string;
  end_date: string;
  location_id?: string;
  type?: 'location' | 'digital';
}

export interface AnalyticsResponse {
  total_jabbs: number;
  avg_score: number;
  locations_covered: number;
  trend_pct: number;
  up_rate: number;
  down_rate: number;
  score_trend: Array<{
    date: string;
    score: number;
  }>;
  top_themes_negative: Array<{
    label: string;
    mentions: number;
    severity: 'MINEUR' | 'MAJEUR' | 'CRITIQUE';
  }>;
  recent_jabbs: Array<{
    id: string;
    type: 'location' | 'digital';
    subtype: string;
    score_percentage: number;
    jabber_name: string;
    created_at: string;
  }>;
}

export interface GenerateReportPayload {
  start_date: string;
  end_date: string;
  filters?: {
    type?: 'location' | 'digital';
    subtype?: string;
    location_ids?: string[];
  };
}

export interface GenerateReportResponse {
  report_id: string;
  pdf_url: string;
  share_token: string;
  share_url: string;
  metadata: {
    jabbs_count: number;
    score_percentage: number;
    up_rate: number;
    down_rate: number;
    generated_at: string;
  };
}

export interface Report {
  report_id: string;
  metadata: {
    jabbs_count: number;
    score_percentage: number;
    up_rate: number;
    down_rate: number;
    start_date: string;
    end_date: string;
    filters?: Record<string, any>;
  };
  created_at: string;
  expires_at: string;
  share_token: string;
  views: number;
  last_viewed_at: string | null;
}

export interface ReportsListResponse {
  reports: Report[];
  total: number;
  page: number;
  pages: number;
}

export interface ListReportsParams {
  page?: number;
  limit?: number;
  sort?: string;
}

export interface QuickJabbsParams {
  page?: number;
  limit?: number;
  type?: 'location' | 'digital';
  subtype?: string;
  location_id?: string;
  start_date?: string;
  end_date?: string;
}

export interface QuickJabb {
  id: string;
  type: 'location' | 'digital';
  subtype: string;
  score_percentage: number;
  jabber_name: string;
  location?: {
    address: string;
    latitude?: number;
    longitude?: number;
  };
  target_name?: string;
  created_at: string;
  status: string;
}

export interface QuickJabbsResponse {
  jabbs: QuickJabb[];
  total: number;
  page: number;
  pages: number;
}

export interface ReportByTokenResponse {
  report_id: string;
  pdf_url: string;
  metadata: Report['metadata'];
  created_at: string;
  expires_at: string;
}

export interface LoginPayload {
  username: string;
  password: string;
}

export interface LoginResponse {
  success: boolean;
  token?: string;
  user?: {
    id: string;
    email: string;
    role: string;
    client_id?: string;
  };
  error?: string;
}
