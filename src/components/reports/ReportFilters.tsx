/**
 * Report Filters Component
 * Date range picker and filter controls
 */

import { useState } from 'react';
import { Calendar } from 'lucide-react';
import { subDays } from 'date-fns';

interface ReportFiltersProps {
  onFilterChange: (filters: {
    start_date: string;
    end_date: string;
    type?: 'location' | 'digital';
    subtype?: string;
  }) => void;
  matchingCount?: number;
  loading?: boolean;
}

export function ReportFilters({ onFilterChange, matchingCount, loading }: ReportFiltersProps) {
  const [startDate, setStartDate] = useState(() =>
    subDays(new Date(), 30).toISOString().split('T')[0]
  );
  const [endDate, setEndDate] = useState(() =>
    new Date().toISOString().split('T')[0]
  );
  const [type, setType] = useState<string>('');
  const [subtype] = useState<string>('');

  const handleDateChange = (start: string, end: string) => {
    setStartDate(start);
    setEndDate(end);
    onFilterChange({
      start_date: new Date(start).toISOString(),
      end_date: new Date(end).toISOString(),
      ...(type && { type: type as 'location' | 'digital' }),
      ...(subtype && { subtype }),
    });
  };

  const handleTypeChange = (newType: string) => {
    setType(newType);
    onFilterChange({
      start_date: new Date(startDate).toISOString(),
      end_date: new Date(endDate).toISOString(),
      ...(newType && { type: newType as 'location' | 'digital' }),
      ...(subtype && { subtype }),
    });
  };

  const handleQuickSelect = (days: number) => {
    const end = new Date();
    const start = subDays(end, days);
    handleDateChange(start.toISOString().split('T')[0], end.toISOString().split('T')[0]);
  };

  return (
    <div className="bg-white rounded-xl border border-slate-200 p-6 space-y-6">
      <h3 className="text-lg font-semibold text-slate-900">Filters</h3>

      {/* Quick Date Selectors */}
      <div>
        <label className="block text-sm font-medium text-slate-700 mb-2">
          Quick Select
        </label>
        <div className="grid grid-cols-3 gap-2">
          <button
            onClick={() => handleQuickSelect(7)}
            className="px-3 py-2 text-sm font-medium rounded-lg border border-slate-300 hover:bg-slate-50 transition-colors"
          >
            Last 7 days
          </button>
          <button
            onClick={() => handleQuickSelect(30)}
            className="px-3 py-2 text-sm font-medium rounded-lg border border-slate-300 hover:bg-slate-50 transition-colors"
          >
            Last 30 days
          </button>
          <button
            onClick={() => handleQuickSelect(90)}
            className="px-3 py-2 text-sm font-medium rounded-lg border border-slate-300 hover:bg-slate-50 transition-colors"
          >
            Last 90 days
          </button>
        </div>
      </div>

      {/* Date Range */}
      <div>
        <label className="block text-sm font-medium text-slate-700 mb-2">
          <Calendar className="inline h-4 w-4 mr-1" />
          Date Range
        </label>
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-xs text-slate-500 mb-1">Start</label>
            <input
              type="date"
              value={startDate}
              onChange={(e) => handleDateChange(e.target.value, endDate)}
              className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-xs text-slate-500 mb-1">End</label>
            <input
              type="date"
              value={endDate}
              onChange={(e) => handleDateChange(startDate, e.target.value)}
              className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            />
          </div>
        </div>
      </div>

      {/* Type Filter */}
      <div>
        <label className="block text-sm font-medium text-slate-700 mb-2">
          Type
        </label>
        <select
          value={type}
          onChange={(e) => handleTypeChange(e.target.value)}
          className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
        >
          <option value="">All Types</option>
          <option value="location">Location JABBs</option>
          <option value="digital">Digital JABBs</option>
        </select>
      </div>

      {/* Matching Count */}
      <div className="pt-4 border-t border-slate-200">
        <p className="text-sm text-slate-600">
          {loading ? (
            <span className="animate-pulse">Loading...</span>
          ) : matchingCount !== undefined ? (
            <>
              <span className="font-semibold text-indigo-600">{matchingCount}</span>{' '}
              Quick JABBs match these filters
            </>
          ) : (
            'Select date range to see matching JABBs'
          )}
        </p>
      </div>
    </div>
  );
}
