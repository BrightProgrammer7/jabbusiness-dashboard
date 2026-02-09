/**
 * Score Trend Chart Component
 * Line chart showing score over time
 */

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { format } from 'date-fns';

interface ScoreTrendChartProps {
  data: Array<{
    date: string;
    score: number;
  }>;
  loading?: boolean;
}

export function ScoreTrendChart({ data, loading }: ScoreTrendChartProps) {
  if (loading) {
    return (
      <div className="bg-white rounded-xl border border-slate-200 p-6">
        <div className="h-4 bg-slate-200 rounded w-1/3 mb-4 animate-pulse"></div>
        <div className="h-64 bg-slate-100 rounded animate-pulse"></div>
      </div>
    );
  }

  // Format data for chart
  const chartData = data.map((item) => ({
    date: format(new Date(item.date), 'MMM dd'),
    score: item.score,
  }));

  return (
    <div className="bg-white rounded-xl border border-slate-200 p-6">
      <h3 className="text-lg font-semibold text-slate-900 mb-4">Score Trend (30 days)</h3>

      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
          <XAxis
            dataKey="date"
            tick={{ fill: '#64748b', fontSize: 12 }}
            tickLine={{ stroke: '#e2e8f0' }}
          />
          <YAxis
            tick={{ fill: '#64748b', fontSize: 12 }}
            tickLine={{ stroke: '#e2e8f0' }}
            domain={[0, 100]}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: '#fff',
              border: '1px solid #e2e8f0',
              borderRadius: '8px',
              boxShadow: '0 1px 3px rgba(0,0,0,0.08)',
            }}
            labelStyle={{ color: '#1e293b', fontWeight: 600 }}
          />
          <Line
            type="monotone"
            dataKey="score"
            stroke="#6366f1"
            strokeWidth={2}
            dot={{ fill: '#6366f1', r: 4 }}
            activeDot={{ r: 6 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
