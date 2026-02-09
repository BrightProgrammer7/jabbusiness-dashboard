/**
 * Dashboard Overview Page
 * Analytics at a glance with KPIs and charts
 */

import { useState, useMemo } from 'react';
import { MainLayout } from '../components/layout/MainLayout';
import { StatsCard } from '../components/dashboard/StatsCard';
import { ScoreTrendChart } from '../components/dashboard/ScoreTrendChart';
import { DistributionChart } from '../components/dashboard/DistributionChart';
import { RecentActivity } from '../components/dashboard/RecentActivity';
import { useAnalytics } from '../hooks/use-analytics';
import { BarChart3, MapPin, Target, TrendingUp } from 'lucide-react';
import { subDays } from 'date-fns';

export function DashboardPage() {
  // Date range: last 30 days by default
  const [dateRange] = useState(() => {
    const end = new Date();
    const start = subDays(end, 30);
    return {
      start_date: start.toISOString(),
      end_date: end.toISOString(),
    };
  });

  // Fetch analytics data
  const { data: analytics, isLoading } = useAnalytics(dateRange);

  // Format stats for display
  const stats = useMemo(
    () => [
      {
        title: 'Total JABBs',
        value: analytics?.total_jabbs || 0,
        icon: <BarChart3 className="h-6 w-6" />,
      },
      {
        title: 'Avg Score',
        value: analytics ? `${analytics.avg_score}%` : '0%',
        icon: <Target className="h-6 w-6" />,
      },
      {
        title: 'Locations',
        value: analytics?.locations_covered || 0,
        icon: <MapPin className="h-6 w-6" />,
      },
      {
        title: 'Trend',
        value: analytics ? `${analytics.trend_pct > 0 ? '+' : ''}${analytics.trend_pct}%` : '0%',
        trend: analytics?.trend_pct || 0,
        icon: <TrendingUp className="h-6 w-6" />,
      },
    ],
    [analytics]
  );

  return (
    <MainLayout>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Dashboard Overview</h1>
          <p className="mt-1 text-sm text-slate-600">
            Analytics for the last 30 days
          </p>
        </div>

        {/* Hero Stats */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat, index) => (
            <StatsCard
              key={index}
              title={stat.title}
              value={stat.value}
              trend={stat.trend}
              icon={stat.icon}
              loading={isLoading}
            />
          ))}
        </div>

        {/* Charts Row */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          <ScoreTrendChart
            data={analytics?.score_trend || []}
            loading={isLoading}
          />
          <DistributionChart
            upRate={analytics?.up_rate || 0}
            downRate={analytics?.down_rate || 0}
            loading={isLoading}
          />
        </div>

        {/* Recent Activity */}
        <RecentActivity
          jabbs={analytics?.recent_jabbs || []}
          loading={isLoading}
        />

        {/* Quick Actions */}
        <div className="bg-white rounded-xl border border-slate-200 p-6">
          <h3 className="text-lg font-semibold text-slate-900 mb-4">Quick Actions</h3>
          <div className="flex gap-4">
            <a
              href="/reports"
              className="inline-flex items-center justify-center rounded-lg bg-indigo-600 px-6 py-3 text-sm font-medium text-white hover:bg-indigo-700 transition-colors"
            >
              Generate Flash Report
            </a>
            <a
              href="/reports"
              className="inline-flex items-center justify-center rounded-lg border border-slate-300 bg-white px-6 py-3 text-sm font-medium text-slate-700 hover:bg-slate-50 transition-colors"
            >
              View All Reports
            </a>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
