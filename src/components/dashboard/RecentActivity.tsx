/**
 * Recent Activity Component
 * Table showing recent Quick JABB submissions
 */

import { formatDate } from '../../lib/utils';
import type { AnalyticsResponse } from '../../types/api';

interface RecentActivityProps {
  jabbs: AnalyticsResponse['recent_jabbs'];
  loading?: boolean;
}

export function RecentActivity({ jabbs, loading }: RecentActivityProps) {
  if (loading) {
    return (
      <div className="bg-white rounded-xl border border-slate-200 p-6">
        <div className="h-4 bg-slate-200 rounded w-1/3 mb-4 animate-pulse"></div>
        <div className="space-y-3">
          {[1, 2, 3, 4, 5].map((i) => (
            <div key={i} className="h-12 bg-slate-100 rounded animate-pulse"></div>
          ))}
        </div>
      </div>
    );
  }

  if (!jabbs || jabbs.length === 0) {
    return (
      <div className="bg-white rounded-xl border border-slate-200 p-6">
        <h3 className="text-lg font-semibold text-slate-900 mb-4">Recent Activity</h3>
        <p className="text-slate-500 text-center py-8">No recent activity</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl border border-slate-200 p-6">
      <h3 className="text-lg font-semibold text-slate-900 mb-4">
        Recent Activity ({jabbs.length})
      </h3>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-slate-200">
              <th className="text-left text-xs font-medium text-slate-500 uppercase tracking-wider pb-3">
                Date
              </th>
              <th className="text-left text-xs font-medium text-slate-500 uppercase tracking-wider pb-3">
                Type
              </th>
              <th className="text-left text-xs font-medium text-slate-500 uppercase tracking-wider pb-3">
                Score
              </th>
              <th className="text-left text-xs font-medium text-slate-500 uppercase tracking-wider pb-3">
                JABBer
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {jabbs.map((jabb) => (
              <tr key={jabb.id} className="hover:bg-slate-50 transition-colors">
                <td className="py-3 text-sm text-slate-600">
                  {formatDate(jabb.created_at)}
                </td>
                <td className="py-3">
                  <span className="inline-flex items-center rounded-full bg-indigo-50 px-2.5 py-0.5 text-xs font-medium text-indigo-700">
                    {jabb.subtype}
                  </span>
                </td>
                <td className="py-3">
                  <span
                    className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                      jabb.score_percentage >= 70
                        ? 'bg-green-50 text-green-700'
                        : jabb.score_percentage >= 50
                        ? 'bg-yellow-50 text-yellow-700'
                        : 'bg-red-50 text-red-700'
                    }`}
                  >
                    {jabb.score_percentage}%
                  </span>
                </td>
                <td className="py-3 text-sm text-slate-600">{jabb.jabber_name}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
