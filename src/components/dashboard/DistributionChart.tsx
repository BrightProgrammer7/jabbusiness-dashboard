/**
 * Distribution Chart Component
 * Donut chart showing UP/DOWN distribution
 */

import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';

interface DistributionChartProps {
  upRate: number;
  downRate: number;
  loading?: boolean;
}

const COLORS = {
  up: '#10b981', // green-500
  down: '#ef4444', // red-500
};

export function DistributionChart({ upRate, downRate, loading }: DistributionChartProps) {
  if (loading) {
    return (
      <div className="bg-white rounded-xl border border-slate-200 p-6">
        <div className="h-4 bg-slate-200 rounded w-1/2 mb-4 animate-pulse"></div>
        <div className="h-64 bg-slate-100 rounded animate-pulse"></div>
      </div>
    );
  }

  const data = [
    { name: 'UP', value: upRate * 100, color: COLORS.up },
    { name: 'DOWN', value: downRate * 100, color: COLORS.down },
  ];

  return (
    <div className="bg-white rounded-xl border border-slate-200 p-6">
      <h3 className="text-lg font-semibold text-slate-900 mb-4">UP/DOWN Distribution</h3>

      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={60}
            outerRadius={100}
            paddingAngle={2}
            dataKey="value"
            label={({ value }) => `${value.toFixed(0)}%`}
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Pie>
          <Tooltip
            formatter={(value) => `${(value as number).toFixed(1)}%`}
            contentStyle={{
              backgroundColor: '#fff',
              border: '1px solid #e2e8f0',
              borderRadius: '8px',
              boxShadow: '0 1px 3px rgba(0,0,0,0.08)',
            }}
          />
          <Legend
            verticalAlign="bottom"
            height={36}
            iconType="circle"
            formatter={(value) => (
              <span className="text-sm font-medium text-slate-700">{value}</span>
            )}
          />
        </PieChart>
      </ResponsiveContainer>

      <div className="mt-4 grid grid-cols-2 gap-4">
        <div className="text-center">
          <p className="text-2xl font-bold text-green-600">
            {(upRate * 100).toFixed(0)}%
          </p>
          <p className="text-sm text-slate-600">Positive</p>
        </div>
        <div className="text-center">
          <p className="text-2xl font-bold text-red-600">
            {(downRate * 100).toFixed(0)}%
          </p>
          <p className="text-sm text-slate-600">Negative</p>
        </div>
      </div>
    </div>
  );
}
