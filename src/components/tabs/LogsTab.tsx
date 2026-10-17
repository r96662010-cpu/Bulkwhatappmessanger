import React, { useState } from 'react';
import { 
  History, 
  Search, 
  Download, 
  Trash2, 
  CheckCircle2, 
  AlertCircle, 
  Radio, 
  Clock, 
  Send
} from 'lucide-react';
import { BroadcastLog } from '../../types';

interface LogsTabProps {
  logs: BroadcastLog[];
  onClearLogs: () => void;
  onOpenMessageAll: () => void;
}

export const LogsTab: React.FC<LogsTabProps> = ({ logs, onClearLogs, onOpenMessageAll }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'delivered' | 'read' | 'failed'>('all');

  const handleExportCSV = () => {
    if (logs.length === 0) return;

    const rows = [
      ['Log ID', 'Timestamp', 'Lead Name', 'Phone', 'Company', 'SIM Used', 'Status', 'Jitter Delay (s)', 'Message Preview'],
      ...logs.map((l) => [
        l.id,
        l.timestamp,
        `"${l.leadName}"`,
        `"${l.phone}"`,
        `"${l.company}"`,
        `"${l.simName}"`,
        l.status,
        l.delaySeconds,
        `"${l.message.replace(/"/g, '""')}"`
      ])
    ];

    const csvContent =
      'data:text/csv;charset=utf-8,' + rows.map((e) => e.join(',')).join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `whatsapp_broadcast_logs_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    link.remove();
  };

  const filteredLogs = logs.filter((log) => {
    if (statusFilter !== 'all' && log.status !== statusFilter) return false;
    const q = searchQuery.toLowerCase();
    return (
      log.leadName.toLowerCase().includes(q) ||
      log.company.toLowerCase().includes(q) ||
      log.phone.includes(q) ||
      log.simName.toLowerCase().includes(q) ||
      log.message.toLowerCase().includes(q)
    );
  });

  return (
    <div className="space-y-5 animate-in fade-in duration-200">
      {/* Top Controls Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-slate-900/80 border border-slate-800 p-4 rounded-2xl">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-lg font-bold text-white tracking-tight">
              Delivery Logs & WhatsApp Audit Trail
            </h1>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">
              {logs.length} Recorded Transmissions
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-0.5">
            Full compliance audit log recording exact recipient phone numbers, SIM carrier routes, anti-ban jitter delays, and timestamps.
          </p>
        </div>

        <div className="flex items-center gap-2">
          {logs.length > 0 && (
            <>
              <button
                onClick={onClearLogs}
                className="px-3 py-2 bg-slate-800 hover:bg-rose-500/10 text-slate-400 hover:text-rose-400 border border-slate-700 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-colors"
                title="Clear audit trail"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>Clear Logs</span>
              </button>

              <button
                onClick={handleExportCSV}
                className="px-3 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-colors"
                title="Export CSV (E)"
              >
                <Download className="w-3.5 h-3.5 text-purple-400" />
                <span>Export CSV Audit Report [E]</span>
              </button>
            </>
          )}

          <button
            onClick={onOpenMessageAll}
            className="px-4 py-2 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs rounded-xl flex items-center gap-1.5 transition-colors shadow-lg shadow-emerald-500/20"
            title="Message All (M)"
          >
            <Send className="w-3.5 h-3.5 fill-current" />
            <span>⚡ Message All [M]</span>
          </button>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 bg-slate-900/60 p-3 rounded-2xl border border-slate-800">
        <div className="relative flex-1 w-full">
          <Search className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search logs by lead name, phone, message text, SIM..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500"
          />
        </div>

        {/* Status Pills */}
        <div className="flex items-center gap-1.5 w-full sm:w-auto">
          {(['all', 'delivered', 'read', 'failed'] as const).map((s) => (
            <button
              key={s}
              onClick={() => setStatusFilter(s)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold capitalize transition-all ${
                statusFilter === s
                  ? 'bg-emerald-500 text-slate-950'
                  : 'bg-slate-800/80 hover:bg-slate-800 text-slate-400'
              }`}
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      {/* Logs Table */}
      <div className="bg-slate-900/80 border border-slate-800 rounded-2xl overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-950/50 text-slate-400 font-semibold border-b border-slate-800">
              <tr>
                <th className="py-3 px-4">Time</th>
                <th className="py-3 px-4">Recipient</th>
                <th className="py-3 px-4">Company</th>
                <th className="py-3 px-4">SIM Gateway</th>
                <th className="py-3 px-4">Delay Jitter</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4">Dispatched Message Preview</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {filteredLogs.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-16 text-center text-slate-500">
                    {logs.length === 0 ? (
                      <div className="space-y-2">
                        <History className="w-8 h-8 mx-auto text-slate-600 opacity-60" />
                        <p className="font-medium text-slate-400">No broadcasts recorded yet</p>
                        <p className="text-xs text-slate-500">
                          Press <strong>[M]</strong> to launch the Message All Broadcaster and start dispatching.
                        </p>
                      </div>
                    ) : (
                      'No logs matching the current filter.'
                    )}
                  </td>
                </tr>
              ) : (
                filteredLogs.map((log) => (
                  <tr key={log.id} className="hover:bg-slate-850/40 transition-colors">
                    <td className="py-3 px-4 font-mono text-slate-400 whitespace-nowrap">
                      {log.timestamp}
                    </td>
                    <td className="py-3 px-4">
                      <div className="font-semibold text-white">{log.leadName}</div>
                      <div className="text-[11px] text-slate-400 font-mono">{log.phone}</div>
                    </td>
                    <td className="py-3 px-4 text-slate-300 font-medium">{log.company}</td>
                    <td className="py-3 px-4 font-mono text-slate-300">
                      <span className="flex items-center gap-1.5">
                        <Radio className="w-3 h-3 text-emerald-400" />
                        {log.simName.split(':')[0]}
                      </span>
                    </td>
                    <td className="py-3 px-4 font-mono text-emerald-400">
                      {log.delaySeconds}s jitter
                    </td>
                    <td className="py-3 px-4 whitespace-nowrap">
                      {log.status === 'delivered' && (
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                          <CheckCircle2 className="w-3 h-3" /> Delivered
                        </span>
                      )}
                      {log.status === 'read' && (
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold bg-sky-500/10 text-sky-400 border border-sky-500/20">
                          <CheckCircle2 className="w-3 h-3" /> Read ✓✓
                        </span>
                      )}
                      {log.status === 'failed' && (
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold bg-rose-500/10 text-rose-400 border border-rose-500/20">
                          <AlertCircle className="w-3 h-3" /> Failed
                        </span>
                      )}
                    </td>
                    <td className="py-3 px-4 text-slate-400 max-w-xs truncate font-sans">
                      {log.message}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
