/**
 * Stats Card Component
 * Displays KPI metrics with trend indicator
 */

import { TrendingUp, TrendingDown } from 'lucide-react';
import { cn } from '../../lib/utils';

interface StatsCardProps {
  title: string;
  value: string | number;
  trend?: number;
  icon?: React.ReactNode;
  loading?: boolean;
}

export function StatsCard({ title, value, trend, icon, loading }: StatsCardProps) {
  if (loading) {
    return (
      <div className="bg-white rounded-xl border border-slate-200 p-6 animate-pulse">
        <div className="h-4 bg-slate-200 rounded w-1/2 mb-4"></div>
        <div className="h-8 bg-slate-200 rounded w-3/4"></div>
      </div>
    );
  }

  const isPositive = trend !== undefined && trend > 0;
  const isNegative = trend !== undefined && trend < 0;

  return (
    <div className="bg-white rounded-xl border border-slate-200 p-6 hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className="text-sm font-medium text-slate-600">{title}</p>
          <p className="mt-2 text-3xl font-bold text-slate-900">{value}</p>

          {trend !== undefined && (
            <div className="mt-2 flex items-center gap-1">
              {isPositive && <TrendingUp className="h-4 w-4 text-green-600" />}
              {isNegative && <TrendingDown className="h-4 w-4 text-red-600" />}
              <span
                className={cn(
                  'text-sm font-medium',
                  isPositive && 'text-green-600',
                  isNegative && 'text-red-600',
                  !isPositive && !isNegative && 'text-slate-600'
                )}
              >
                {isPositive && '+'}
                {trend.toFixed(1)}%
              </span>
            </div>
          )}
        </div>

        {icon && (
          <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-indigo-50 text-indigo-600">
            {icon}
          </div>
        )}
      </div>
    </div>
  );
}
