/**
 * Reports Page
 * Report generation and history
 */

import { useState } from 'react';
import { MainLayout } from '../components/layout/MainLayout';
import { ReportFilters } from '../components/reports/ReportFilters';
import { ReportList } from '../components/reports/ReportList';
import { ShareModal } from '../components/reports/ShareModal';
import { useReports, useGenerateReport } from '../hooks/use-reports';
import { FileText, Loader2 } from 'lucide-react';
import type { Report, GenerateReportPayload } from '../types/api';

export function ReportsPage() {
  const [filters, setFilters] = useState<GenerateReportPayload>({
    start_date: '',
    end_date: '',
  });
  const [selectedReport, setSelectedReport] = useState<Report | null>(null);

  // Fetch reports
  const { data: reportsData, isLoading: reportsLoading } = useReports({
    page: 1,
    limit: 20,
    sort: '-created_at',
  });

  // Generate report mutation
  const generateReport = useGenerateReport();

  const handleFilterChange = (newFilters: any) => {
    setFilters({
      start_date: newFilters.start_date,
      end_date: newFilters.end_date,
      filters: {
        ...(newFilters.type && { type: newFilters.type }),
        ...(newFilters.subtype && { subtype: newFilters.subtype }),
      },
    });
  };

  const handleGenerateReport = () => {
    if (!filters.start_date || !filters.end_date) {
      alert('Please select a date range');
      return;
    }

    generateReport.mutate(filters);
  };

  const canGenerate = filters.start_date && filters.end_date && !generateReport.isPending;

  return (
    <MainLayout>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Flash Reports</h1>
          <p className="mt-1 text-sm text-slate-600">
            Generate and manage your Quick JABB flash reports
          </p>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Panel - Filters */}
          <div className="lg:col-span-1 space-y-6">
            <ReportFilters
              onFilterChange={handleFilterChange}
              loading={false}
            />

            {/* Generate Button */}
            <button
              onClick={handleGenerateReport}
              disabled={!canGenerate}
              className="w-full flex items-center justify-center gap-2 px-6 py-4 bg-indigo-600 text-white rounded-xl font-medium hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors shadow-sm"
            >
              {generateReport.isPending ? (
                <>
                  <Loader2 className="h-5 w-5 animate-spin" />
                  Generating Report...
                </>
              ) : (
                <>
                  <FileText className="h-5 w-5" />
                  Generate Flash Report
                </>
              )}
            </button>

            {generateReport.isPending && (
              <div className="bg-indigo-50 border border-indigo-200 rounded-lg p-4">
                <p className="text-sm text-indigo-800 font-medium mb-2">
                  Generating your report...
                </p>
                <div className="space-y-2 text-sm text-indigo-700">
                  <div className="flex items-center gap-2">
                    <div className="h-2 flex-1 bg-indigo-200 rounded-full overflow-hidden">
                      <div className="h-full bg-indigo-600 rounded-full animate-pulse w-1/3"></div>
                    </div>
                  </div>
                  <p className="text-xs">This may take 15-30 seconds...</p>
                </div>
              </div>
            )}
          </div>

          {/* Right Panel - Report List */}
          <div className="lg:col-span-2">
            <ReportList
              reports={reportsData?.reports || []}
              loading={reportsLoading}
              onShareClick={setSelectedReport}
            />
          </div>
        </div>
      </div>

      {/* Share Modal */}
      <ShareModal report={selectedReport} onClose={() => setSelectedReport(null)} />
    </MainLayout>
  );
}
