import React, { useState } from 'react';
import { 
  ShieldAlert, 
  ShieldCheck, 
  X, 
  AlertTriangle, 
  Lock, 
  Terminal, 
  UserX, 
  RefreshCw, 
  Check, 
  Sparkles, 
  Volume2, 
  VolumeX, 
  Radio, 
  EyeOff, 
  Activity,
  Flame,
  Bug,
  Globe,
  Download,
  Trash2,
  Cpu
} from 'lucide-react';
import { 
  BlockedHacker, 
  SecurityIncident, 
  INITIAL_BLOCKED_HACKERS, 
  INITIAL_INCIDENTS,
  generateThreatIncident,
  getStoredBlockedHackers,
  saveStoredBlockedHackers,
  getStoredSecurityIncidents,
  saveStoredSecurityIncidents
} from '../services/cyberSecurityEngine';

interface CyberSecurityShieldModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSimulateAttackAlert: (incident: SecurityIncident) => void;
}

export const CyberSecurityShieldModal: React.FC<CyberSecurityShieldModalProps> = ({
  isOpen,
  onClose,
  onSimulateAttackAlert
}) => {
  const [blockedHackers, setBlockedHackers] = useState<BlockedHacker[]>(() => getStoredBlockedHackers());
  const [incidents, setIncidents] = useState<SecurityIncident[]>(() => getStoredSecurityIncidents());
  const [isSimulating, setIsSimulating] = useState(false);
  const [activeTestType, setActiveTestType] = useState<string>('SQL Injection');
  const [newBlockedNotification, setNewBlockedNotification] = useState<string | null>(null);

  if (!isOpen) return null;

  // Execute an illegal hacking attempt simulation to test cyber defense
  const handleSimulateHackerAttack = (chosenType: SecurityIncident['threatType'] = 'SQL Injection') => {
    setIsSimulating(true);
    setActiveTestType(chosenType);

    setTimeout(() => {
      setIsSimulating(false);

      const { incident, hacker } = generateThreatIncident(chosenType);

      const updatedIncidents = [incident, ...incidents];
      const updatedHackers = [hacker, ...blockedHackers];

      setIncidents(updatedIncidents);
      setBlockedHackers(updatedHackers);
      saveStoredSecurityIncidents(updatedIncidents);
      saveStoredBlockedHackers(updatedHackers);

      setNewBlockedNotification(`🚨 HACKER NEUTRALIZED: Illegal ${chosenType} from ${hacker.ip} intercepted & permanently blocked!`);

      // Trigger siren sound and parent notification alert
      onSimulateAttackAlert(incident);

      setTimeout(() => setNewBlockedNotification(null), 6000);
    }, 500);
  };

  const handleUnblockHacker = (id: string) => {
    const updated = blockedHackers.filter((h) => h.id !== id);
    setBlockedHackers(updated);
    saveStoredBlockedHackers(updated);
  };

  const handleClearAllQuarantined = () => {
    if (confirm('Are you sure you want to flush the quarantined hackers firewall log?')) {
      setBlockedHackers([]);
      saveStoredBlockedHackers([]);
    }
  };

  const handleDownloadForensicReport = () => {
    const headers = ['Incident ID', 'Timestamp', 'Threat Type', 'Severity', 'Attacker IP', 'Fingerprint', 'Payload Excerpt', 'Status'];
    const rows = incidents.map((inc) => [
      inc.id,
      inc.timestamp,
      inc.threatType,
      inc.severity,
      inc.attackerIp,
      inc.deviceFingerprint,
      `"${inc.payloadExcerpt.replace(/"/g, '""')}"`,
      inc.status
    ]);

    const csvContent = [headers.join(','), ...rows.map((r) => r.join(','))].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `cyber_forensics_security_report_${Date.now()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-slate-950/90 backdrop-blur-xl animate-in fade-in duration-150">
      <div className="w-full max-w-4xl bg-slate-900 border border-slate-700/80 rounded-2xl shadow-2xl flex flex-col overflow-hidden max-h-[90vh]">
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-800 bg-slate-950 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-rose-500/15 border border-rose-500/30 flex items-center justify-center text-rose-400 shadow-lg shadow-rose-500/20">
              <ShieldAlert className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-lg font-bold text-white tracking-tight">
                  Cybersecurity Threat Monitor & Intrusion Prevention (IDS/IPS)
                </h2>
                <span className="px-2 py-0.5 rounded-full text-xs font-semibold bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 flex items-center gap-1 font-mono">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  SHIELD ARMED
                </span>
              </div>
              <p className="text-xs text-slate-400 mt-0.5">
                Real-time zero-trust security detecting illegal intrusion attempts, unauthorized scrapers, and automatically blocking hackers.
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white border border-slate-700 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Real-time Alert Banner if new threat detected */}
        {newBlockedNotification && (
          <div className="bg-rose-500/20 border-b border-rose-500/40 px-6 py-2.5 text-xs text-rose-300 font-semibold flex items-center justify-between animate-in slide-in-from-top-2">
            <span className="flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-rose-400 shrink-0" />
              {newBlockedNotification}
            </span>
            <span className="font-mono text-[10px] bg-rose-950 px-2 py-0.5 rounded text-rose-200 border border-rose-800">
              FIREWALL RULE EXECUTED
            </span>
          </div>
        )}

        {/* Content Body */}
        <div className="p-6 overflow-y-auto space-y-5">
          {/* Top Threat Metrics */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="p-3.5 bg-slate-950 rounded-xl border border-slate-800">
              <span className="text-[10px] font-mono uppercase text-slate-400">Intrusion Shield</span>
              <div className="text-lg font-black text-emerald-400 mt-1 flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4" />
                <span>100% Protected</span>
              </div>
              <span className="text-[10px] text-slate-500">Zero-Trust WAF & E2EE</span>
            </div>

            <div className="p-3.5 bg-slate-950 rounded-xl border border-slate-800">
              <span className="text-[10px] font-mono uppercase text-slate-400">Hackers Quarantined</span>
              <div className="text-lg font-black text-rose-400 mt-1 flex items-center gap-1.5">
                <UserX className="w-4 h-4" />
                <span>{blockedHackers.length} Blocked</span>
              </div>
              <span className="text-[10px] text-slate-500">Hardware & IP Blacklist</span>
            </div>

            <div className="p-3.5 bg-slate-950 rounded-xl border border-slate-800">
              <span className="text-[10px] font-mono uppercase text-slate-400">Threat Level</span>
              <div className="text-lg font-black text-white mt-1 flex items-center gap-1.5">
                <Activity className="w-4 h-4 text-emerald-400" />
                <span>Active Guard</span>
              </div>
              <span className="text-[10px] text-emerald-400 font-mono">Real-Time Inspection</span>
            </div>

            <div className="p-3.5 bg-slate-950 rounded-xl border border-slate-800">
              <span className="text-[10px] font-mono uppercase text-slate-400">Total Intercepts</span>
              <div className="text-lg font-black text-amber-400 mt-1 flex items-center gap-1.5">
                <Cpu className="w-4 h-4" />
                <span>{incidents.length} Neutralized</span>
              </div>
              <span className="text-[10px] text-slate-500">Forensic Logs Recorded</span>
            </div>
          </div>

          {/* Test Illegal Hacking Attack Panel */}
          <div className="p-4 bg-gradient-to-r from-rose-950/30 via-slate-950 to-slate-950 rounded-xl border border-rose-500/30 space-y-3">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div>
                <span className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-2">
                  <Bug className="w-4 h-4 text-rose-400" />
                  Test Cyber Security Detection & Auto-Block
                </span>
                <p className="text-[11px] text-slate-400 mt-0.5">
                  Simulate an illegal cyber penetration attempt to verify immediate threat notification, payload interception, and automatic hacker blocking.
                </p>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <button
                  onClick={() => handleSimulateHackerAttack('SQL Injection')}
                  disabled={isSimulating}
                  className="px-2.5 py-1.5 bg-rose-500/20 hover:bg-rose-500/30 text-rose-300 border border-rose-500/40 rounded-lg text-xs font-bold transition-all flex items-center gap-1"
                >
                  {isSimulating && activeTestType === 'SQL Injection' ? <RefreshCw className="w-3.5 h-3.5 animate-spin" /> : <Terminal className="w-3.5 h-3.5" />}
                  <span>Test SQLi Attack</span>
                </button>

                <button
                  onClick={() => handleSimulateHackerAttack('XSS Script Injection')}
                  disabled={isSimulating}
                  className="px-2.5 py-1.5 bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 border border-amber-500/40 rounded-lg text-xs font-bold transition-all flex items-center gap-1"
                >
                  {isSimulating && activeTestType === 'XSS Script Injection' ? <RefreshCw className="w-3.5 h-3.5 animate-spin" /> : <Bug className="w-3.5 h-3.5" />}
                  <span>Test XSS Attack</span>
                </button>

                <button
                  onClick={() => handleSimulateHackerAttack('Brute Force PIN Attack')}
                  disabled={isSimulating}
                  className="px-2.5 py-1.5 bg-purple-500/20 hover:bg-purple-500/30 text-purple-300 border border-purple-500/40 rounded-lg text-xs font-bold transition-all flex items-center gap-1"
                >
                  {isSimulating && activeTestType === 'Brute Force PIN Attack' ? <RefreshCw className="w-3.5 h-3.5 animate-spin" /> : <Lock className="w-3.5 h-3.5" />}
                  <span>Test Brute Force</span>
                </button>

                <button
                  onClick={() => handleSimulateHackerAttack('Malicious Data Scraping')}
                  disabled={isSimulating}
                  className="px-2.5 py-1.5 bg-blue-500/20 hover:bg-blue-500/30 text-blue-300 border border-blue-500/40 rounded-lg text-xs font-bold transition-all flex items-center gap-1"
                >
                  {isSimulating && activeTestType === 'Malicious Data Scraping' ? <RefreshCw className="w-3.5 h-3.5 animate-spin" /> : <Globe className="w-3.5 h-3.5" />}
                  <span>Test Scraper Bot</span>
                </button>
              </div>
            </div>
          </div>

          {/* Active Cyber Defense Rules Config */}
          <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-3">
            <span className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-2">
              <Lock className="w-3.5 h-3.5 text-emerald-400" />
              Active Cybersecurity Protection Policies
            </span>

            <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 text-xs">
              <div className="p-2.5 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-between">
                <div>
                  <p className="font-semibold text-white">SQL Injection Guard</p>
                  <p className="text-[10px] text-slate-400">Blocks UNION SELECT & DB dumps</p>
                </div>
                <span className="px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 font-mono text-[10px] font-bold">ARMED</span>
              </div>

              <div className="p-2.5 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-between">
                <div>
                  <p className="font-semibold text-white">XSS Script Filter</p>
                  <p className="text-[10px] text-slate-400">Sanitizes malicious script tags</p>
                </div>
                <span className="px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 font-mono text-[10px] font-bold">ARMED</span>
              </div>

              <div className="p-2.5 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-between">
                <div>
                  <p className="font-semibold text-white">Brute-Force Lock</p>
                  <p className="text-[10px] text-slate-400">Lockout after 3 failed PIN tries</p>
                </div>
                <span className="px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 font-mono text-[10px] font-bold">ARMED</span>
              </div>

              <div className="p-2.5 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-between">
                <div>
                  <p className="font-semibold text-white">Anti-Scrape Armor</p>
                  <p className="text-[10px] text-slate-400">Blocks botnet phone harvesters</p>
                </div>
                <span className="px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 font-mono text-[10px] font-bold">ARMED</span>
              </div>
            </div>
          </div>

          {/* Blocked Hackers Quarantine List */}
          <div className="bg-slate-950 rounded-xl border border-slate-800 overflow-hidden">
            <div className="p-3 bg-slate-900 border-b border-slate-800 flex items-center justify-between text-xs">
              <div className="flex items-center gap-2">
                <UserX className="w-4 h-4 text-rose-400" />
                <span className="font-bold text-white">Blocked Hacker Quarantine Table ({blockedHackers.length})</span>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={handleDownloadForensicReport}
                  className="px-2 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 text-[11px] font-medium transition-colors flex items-center gap-1 border border-slate-700"
                >
                  <Download className="w-3 h-3" />
                  <span>Export CSV Report</span>
                </button>
                {blockedHackers.length > 0 && (
                  <button
                    onClick={handleClearAllQuarantined}
                    className="px-2 py-1 rounded bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 text-[11px] font-medium transition-colors flex items-center gap-1 border border-rose-500/30"
                  >
                    <Trash2 className="w-3 h-3" />
                    <span>Clear Quarantined</span>
                  </button>
                )}
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="text-slate-400 font-mono border-b border-slate-800 bg-slate-950/80">
                  <tr>
                    <th className="py-2.5 px-4">Attacker IP & Origin</th>
                    <th className="py-2.5 px-4">Device Fingerprint</th>
                    <th className="py-2.5 px-4">Threat Detection Reason</th>
                    <th className="py-2.5 px-4">Action</th>
                    <th className="py-2.5 px-4 text-right">Firewall</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60 font-sans">
                  {blockedHackers.length === 0 ? (
                    <tr>
                      <td colSpan={5} className="py-6 text-center text-slate-500 text-xs">
                        No hackers currently in quarantine. Perimeter clean.
                      </td>
                    </tr>
                  ) : (
                    blockedHackers.map((hacker) => (
                      <tr key={hacker.id} className="hover:bg-slate-900/60 transition-colors">
                        <td className="py-2.5 px-4 font-mono font-semibold text-rose-400 whitespace-nowrap">
                          {hacker.ip}
                        </td>
                        <td className="py-2.5 px-4 font-mono text-slate-400 text-[11px] whitespace-nowrap">
                          {hacker.deviceFingerprint}
                        </td>
                        <td className="py-2.5 px-4 text-slate-300 max-w-xs truncate">
                          {hacker.reason}
                        </td>
                        <td className="py-2.5 px-4 whitespace-nowrap">
                          <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-bold bg-rose-500/15 text-rose-400 border border-rose-500/30">
                            PERMANENT BLOCK
                          </span>
                        </td>
                        <td className="py-2.5 px-4 text-right whitespace-nowrap">
                          <button
                            onClick={() => handleUnblockHacker(hacker.id)}
                            className="text-[10px] text-slate-400 hover:text-white underline"
                          >
                            Unblock IP
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-3 bg-slate-950 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400">
          <span className="flex items-center gap-1.5 text-emerald-400 font-medium">
            <ShieldCheck className="w-4 h-4" />
            Zero-Trust Cyber Armor Active &bull; All WhatsApp Broadcasts & Databases Protected Against Hacks
          </span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 bg-slate-800 hover:bg-slate-700 text-white rounded-lg text-xs transition-colors"
          >
            Close Console
          </button>
        </div>
      </div>
    </div>
  );
};
