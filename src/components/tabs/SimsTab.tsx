import React from 'react';
import { 
  Radio, 
  ShieldCheck, 
  Smartphone, 
  Zap, 
  CheckCircle2, 
  AlertTriangle, 
  Activity, 
  RotateCw, 
  Lock, 
  Globe,
  Sliders
} from 'lucide-react';
import { SIMConfig } from '../../types';

interface SimsTabProps {
  sims: SIMConfig[];
  onOpenMessageAll: () => void;
}

export const SimsTab: React.FC<SimsTabProps> = ({ sims, onOpenMessageAll }) => {
  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-slate-900/80 border border-slate-800 p-5 rounded-2xl">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-lg font-bold text-white tracking-tight">
              WhatsApp Multi-SIM Broadcaster & Anti-Ban Hub
            </h1>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">
              3 Hardware Lines Active
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Active round-robin rotation distributes message throughput evenly across physical lines to protect sender reputation and deliverability.
          </p>
        </div>

        <button
          onClick={onOpenMessageAll}
          className="px-4 py-2.5 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs rounded-xl flex items-center gap-2 transition-colors shadow-lg shadow-emerald-500/20 shrink-0"
        >
          <Zap className="w-4 h-4 fill-current" />
          <span>⚡ Broadcast Using All 3 SIMs [M]</span>
        </button>
      </div>

      {/* SIM Gateways Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {sims.map((sim, index) => {
          const quotaPercent = Math.round((sim.sentToday / sim.dailyLimit) * 100);
          return (
            <div
              key={sim.id}
              className="bg-slate-900/90 border border-slate-800 hover:border-emerald-500/40 rounded-2xl p-5 space-y-4 transition-all shadow-xl relative overflow-hidden"
            >
              {/* Top Bar */}
              <div className="flex items-start justify-between">
                <div>
                  <span className="text-[10px] uppercase font-mono text-emerald-400 font-bold tracking-wider">
                    SIM Line 0{index + 1}
                  </span>
                  <h3 className="text-sm font-bold text-white mt-0.5">{sim.name}</h3>
                  <p className="text-xs font-mono text-slate-400 mt-0.5">{sim.number}</p>
                </div>
                <div className="w-9 h-9 rounded-xl bg-emerald-500/10 border border-emerald-500/25 flex items-center justify-center text-emerald-400">
                  <Smartphone className="w-4 h-4" />
                </div>
              </div>

              {/* Network Details */}
              <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 space-y-2 text-xs">
                <div className="flex justify-between text-slate-400">
                  <span>Carrier:</span>
                  <span className="font-semibold text-slate-200">{sim.carrier}</span>
                </div>
                <div className="flex justify-between text-slate-400">
                  <span>IP ASN:</span>
                  <span className="font-mono text-slate-300 text-[11px] truncate max-w-[170px] text-right">
                    {sim.ipLocation}
                  </span>
                </div>
                <div className="flex justify-between text-slate-400">
                  <span>Last Transmission:</span>
                  <span className="text-emerald-400 font-mono">{sim.lastUsed || 'Active now'}</span>
                </div>
              </div>

              {/* Quota Progress */}
              <div className="space-y-1.5">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-slate-400 font-medium">Daily Quota</span>
                  <span className="font-mono text-white font-bold">
                    {sim.sentToday} / {sim.dailyLimit} ({quotaPercent}%)
                  </span>
                </div>
                <div className="w-full h-2.5 bg-slate-950 rounded-full overflow-hidden border border-slate-800">
                  <div
                    className="h-full bg-emerald-500 rounded-full transition-all"
                    style={{ width: `${quotaPercent}%` }}
                  />
                </div>
              </div>

              {/* Health Score Pill */}
              <div className="pt-2 border-t border-slate-800 flex items-center justify-between">
                <div className="flex items-center gap-1.5 text-xs text-emerald-400 font-semibold">
                  <ShieldCheck className="w-4 h-4" />
                  <span>Sender Health: {sim.healthScore}%</span>
                </div>
                <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                  Active
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Anti-Ban & Delivery Architecture Specs */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 space-y-3">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-emerald-400" />
            <h2 className="text-sm font-bold text-white uppercase tracking-wider">
              Anti-Ban Safeguards & Best Practices
            </h2>
          </div>
          <p className="text-xs text-slate-400 leading-relaxed">
            WhatsBlast Pro applies enterprise-grade protections to ensure your WhatsApp accounts remain completely safe from automated spam detection:
          </p>
          <ul className="space-y-2 text-xs text-slate-300">
            <li className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
              <span><strong>Humanized Jitter Delay:</strong> Every message wait time is randomized between 2s and 5s so traffic does not resemble automated bursts.</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
              <span><strong>Round-Robin SIM Rotation:</strong> Workload rotates sequential messages 1 &rarr; 2 &rarr; 3 so no single line exceeds carrier bursts.</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
              <span><strong>Deep Dynamic Variable Interpolation:</strong> Unique company names, discounts, and personalized links eliminate byte-for-byte duplicate content detection.</span>
            </li>
          </ul>
        </div>

        <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 space-y-3">
          <div className="flex items-center gap-2">
            <Activity className="w-5 h-5 text-sky-400" />
            <h2 className="text-sm font-bold text-white uppercase tracking-wider">
              Carrier Throughput Benchmarks
            </h2>
          </div>
          <div className="space-y-2.5 text-xs">
            <div className="p-2.5 rounded-xl bg-slate-950 border border-slate-800 flex justify-between items-center">
              <div>
                <p className="font-semibold text-white">Recommended Hourly Pace</p>
                <p className="text-[11px] text-slate-400">Up to 120 messages per SIM per hour</p>
              </div>
              <span className="font-mono text-emerald-400 font-bold">Safe Tier</span>
            </div>
            <div className="p-2.5 rounded-xl bg-slate-950 border border-slate-800 flex justify-between items-center">
              <div>
                <p className="font-semibold text-white">Combined Daily Capacity</p>
                <p className="text-[11px] text-slate-400">1,500 personalized messages across 3 SIMs</p>
              </div>
              <span className="font-mono text-sky-400 font-bold">1,500 / day</span>
            </div>
            <div className="p-2.5 rounded-xl bg-slate-950 border border-slate-800 flex justify-between items-center">
              <div>
                <p className="font-semibold text-white">Quick Keyboard Trigger</p>
                <p className="text-[11px] text-slate-400">Press <strong>[M]</strong> to open Broadcaster, <strong>[4]</strong> to return here</p>
              </div>
              <kbd className="px-2 py-0.5 rounded bg-slate-800 text-slate-300 font-mono text-[11px]">
                [M] / [4]
              </kbd>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
