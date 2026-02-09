/**
 * Share Modal Component
 * Copy share link to clipboard
 */

import { useState } from 'react';
import { X, Copy, Check } from 'lucide-react';
import { copyToClipboard } from '../../lib/utils';
import type { Report } from '../../types/api';

interface ShareModalProps {
  report: Report | null;
  onClose: () => void;
}

export function ShareModal({ report, onClose }: ShareModalProps) {
  const [copied, setCopied] = useState(false);

  if (!report) return null;

  const shareUrl = `${window.location.origin}/report/${report.share_token}`;

  const handleCopy = async () => {
    const success = await copyToClipboard(shareUrl);
    if (success) {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
      onClick={handleBackdropClick}
    >
      <div className="bg-white rounded-xl shadow-xl max-w-lg w-full mx-4">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-slate-200">
          <h2 className="text-xl font-semibold text-slate-900">Share Report</h2>
          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Share Link
            </label>
            <div className="flex items-center gap-2">
              <input
                type="text"
                value={shareUrl}
                readOnly
                className="flex-1 px-4 py-2 border border-slate-300 rounded-lg bg-slate-50 text-sm text-slate-700 focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              />
              <button
                onClick={handleCopy}
                className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
              >
                {copied ? (
                  <>
                    <Check className="h-4 w-4" />
                    Copied!
                  </>
                ) : (
                  <>
                    <Copy className="h-4 w-4" />
                    Copy
                  </>
                )}
              </button>
            </div>
          </div>

          <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
            <p className="text-sm text-amber-800">
              <strong>Note:</strong> This link will expire on{' '}
              {new Date(report.expires_at).toLocaleDateString()}. Anyone with
              this link can view the report without logging in.
            </p>
          </div>

          <div className="text-sm text-slate-600">
            <p className="font-medium mb-1">Report Details:</p>
            <ul className="space-y-1 text-sm">
              <li>• {report.metadata.jabbs_count} Quick JABBs</li>
              <li>• Score: {report.metadata.score_percentage}%</li>
              <li>• Views: {report.views}</li>
            </ul>
          </div>
        </div>

        {/* Footer */}
        <div className="flex justify-end gap-3 p-6 border-t border-slate-200">
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50 rounded-lg border border-slate-300 transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
