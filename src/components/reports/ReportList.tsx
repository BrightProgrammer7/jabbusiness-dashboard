/**
 * Report List Component
 * Table of generated reports
 */

import { Download, Share2, Trash2 } from 'lucide-react';
import { formatDateRange, formatDate } from '../../lib/utils';
import { useDeleteReport } from '../../hooks/use-reports';
import { api } from '../../lib/api';
import type { Report } from '../../types/api';

interface ReportListProps {
  reports: Report[];
  loading?: boolean;
  onShareClick: (report: Report) => void;
}

export function ReportList({ reports, loading, onShareClick }: ReportListProps) {
  const deleteReport = useDeleteReport();

  if (loading) {
    return (
      <div className="bg-white rounded-xl border border-slate-200 p-6">
        <div className="space-y-3">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-20 bg-slate-100 rounded animate-pulse"></div>
          ))}
        </div>
      </div>
    );
  }

  if (!reports || reports.length === 0) {
    return (
      <div className="bg-white rounded-xl border border-slate-200 p-12 text-center">
        <p className="text-slate-500 mb-4">No reports generated yet</p>
        <p className="text-sm text-slate-400">
          Use the filters on the left to generate your first report
        </p>
      </div>
    );
  }

  const handleDownload = (report: Report) => {
    const url = api.reports.downloadUrl(report.report_id);
    window.open(url, '_blank');
  };

  const handleDelete = (reportId: string) => {
    if (confirm('Are you sure you want to delete this report?')) {
      deleteReport.mutate(reportId);
    }
  };

  return (
    <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
      <div className="p-6 border-b border-slate-200">
        <h3 className="text-lg font-semibold text-slate-900">
          Generated Reports ({reports.length})
        </h3>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-slate-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                Period
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                JABBs
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                Score
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                Generated
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                Views
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-slate-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {reports.map((report) => (
              <tr key={report.report_id} className="hover:bg-slate-50 transition-colors">
                <td className="px-6 py-4 text-sm text-slate-900 font-medium">
                  {formatDateRange(
                    report.metadata.start_date,
                    report.metadata.end_date
                  )}
                </td>
                <td className="px-6 py-4 text-sm text-slate-600">
                  {report.metadata.jabbs_count}
                </td>
                <td className="px-6 py-4">
                  <span
                    className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                      report.metadata.score_percentage >= 70
                        ? 'bg-green-50 text-green-700'
                        : report.metadata.score_percentage >= 50
                        ? 'bg-yellow-50 text-yellow-700'
                        : 'bg-red-50 text-red-700'
                    }`}
                  >
                    {report.metadata.score_percentage}%
                  </span>
                </td>
                <td className="px-6 py-4 text-sm text-slate-600">
                  {formatDate(report.created_at)}
                </td>
                <td className="px-6 py-4 text-sm text-slate-600">
                  {report.views}
                </td>
                <td className="px-6 py-4 text-right">
                  <div className="flex items-center justify-end gap-2">
                    <button
                      onClick={() => handleDownload(report)}
                      className="p-2 text-slate-600 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors"
                      title="Download PDF"
                    >
                      <Download className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => onShareClick(report)}
                      className="p-2 text-slate-600 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors"
                      title="Share link"
                    >
                      <Share2 className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => handleDelete(report.report_id)}
                      disabled={deleteReport.isPending}
                      className="p-2 text-slate-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors disabled:opacity-50"
                      title="Delete report"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
