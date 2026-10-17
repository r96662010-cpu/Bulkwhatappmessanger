import React from 'react';
import { 
  Send, 
  Users, 
  FileText, 
  Radio, 
  Sparkles, 
  CheckCircle2, 
  ArrowUpRight, 
  ShieldCheck, 
  TrendingUp, 
  Clock, 
  Zap, 
  ChevronRight,
  Keyboard
} from 'lucide-react';
import { Lead, Template, SIMConfig, BroadcastLog } from '../../types';

interface ConsoleTabProps {
  leads: Lead[];
  templates: Template[];
  sims: SIMConfig[];
  logs: BroadcastLog[];
  onOpenMessageAll: () => void;
  onOpenTemplates: () => void;
  onNavigateTab: (tab: 'console' | 'audience' | 'templates' | 'sims' | 'logs') => void;
  onOpenShortcuts: () => void;
  onOpenCyberSecurity?: () => void;
  onLoad1000AndBlast?: () => void;
}

export const ConsoleTab: React.FC<ConsoleTabProps> = ({
  leads,
  templates,
  sims,
  logs,
  onOpenMessageAll,
  onOpenTemplates,
  onNavigateTab,
  onOpenShortcuts,
  onOpenCyberSecurity,
  onLoad1000AndBlast
}) => {
  const selectedLeads = leads.filter((l) => l.selected);
  const deliveredCount = leads.filter((l) => l.status === 'delivered' || l.status === 'read').length;
  const readCount = leads.filter((l) => l.status === 'read').length;
  const totalSentToday = sims.reduce((acc, s) => acc + s.sentToday, 0);

  // Top converting template
  const featuredTemplate = templates.find((t) => t.category === 'Free YouTube Video Promo') || templates[0];

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Hero Quick Dispatch Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-slate-900 via-emerald-950/40 to-slate-900 border border-emerald-500/30 p-6 sm:p-8 shadow-2xl">
        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-2 max-w-xl">
            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 text-xs font-semibold">
                <Zap className="w-3.5 h-3.5 fill-current" />
                <span>Multi-SIM Automated Broadcaster Ready</span>
                <kbd className="bg-slate-950/60 px-1.5 py-0.2 rounded text-[10px] font-mono text-emerald-300">
                  [M]
                </kbd>
              </span>

              {onOpenCyberSecurity && (
                <button
                  onClick={onOpenCyberSecurity}
                  className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-500/15 border border-rose-500/30 text-rose-300 hover:text-white text-xs font-semibold transition-colors"
                >
                  <span className="w-2 h-2 rounded-full bg-rose-400 animate-pulse" />
                  <span>Zero-Trust Cyber Shield Armed</span>
                </button>
              )}
            </div>

            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              High-Converting WhatsApp Blasts & Personalization Engine
            </h1>
            <p className="text-sm text-slate-300 leading-relaxed">
              Broadcast verified campaigns across 3 round-robin SIMs with human jitter throttling, 12+ pre-tested templates, and live personalized chat previews. Share to 1,000 recipients in one go.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 shrink-0 w-full md:w-auto">
            {onLoad1000AndBlast && (
              <button
                onClick={onLoad1000AndBlast}
                className="px-5 py-3.5 bg-gradient-to-r from-amber-500 to-amber-400 hover:from-amber-400 hover:to-amber-300 text-slate-950 font-black text-sm rounded-xl flex items-center justify-center gap-2 transition-all shadow-xl shadow-amber-500/20 active:scale-95"
                title="Load 1,000 verified leads and blast in one go"
              >
                <Zap className="w-4 h-4 fill-current text-slate-950" />
                <span>⚡ Blast 1,000 in One Go</span>
              </button>
            )}

            <button
              onClick={onOpenMessageAll}
              className="px-6 py-3.5 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-extrabold text-sm rounded-xl flex items-center justify-center gap-2.5 transition-all shadow-xl shadow-emerald-500/25 active:scale-95"
            >
              <Send className="w-4 h-4 fill-current" />
              <span>Launch "Message All" ({selectedLeads.length})</span>
              <kbd className="px-1.5 py-0.5 rounded bg-slate-950/20 text-slate-950 text-xs font-mono font-bold">
                M
              </kbd>
            </button>

            <button
              onClick={onOpenTemplates}
              className="px-4 py-3.5 bg-slate-800/90 hover:bg-slate-750 text-slate-200 border border-slate-700 rounded-xl text-xs sm:text-sm font-semibold flex items-center justify-center gap-2 transition-colors"
            >
              <FileText className="w-4 h-4 text-amber-400" />
              <span>Browse 12+ Templates</span>
              <kbd className="px-1.5 py-0.5 rounded bg-slate-900 text-slate-400 text-xs font-mono border border-slate-700">
                T
              </kbd>
            </button>
          </div>
        </div>

        {/* Ambient subtle glow */}
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
      </div>

      {/* KPI Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 shadow-sm">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-xs font-medium">Audience Verified</span>
            <Users className="w-4 h-4 text-sky-400" />
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-black text-white">{leads.length}</span>
            <span className="text-xs text-emerald-400 font-medium">100% Mobile Ready</span>
          </div>
          <p className="text-[11px] text-slate-400 mt-1">
            {selectedLeads.length} currently queued for broadcast
          </p>
        </div>

        <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 shadow-sm">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-xs font-medium">Delivery Success Rate</span>
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-black text-emerald-400">98.4%</span>
            <span className="text-xs text-slate-400 font-mono">0 Flags</span>
          </div>
          <p className="text-[11px] text-slate-400 mt-1">
            {deliveredCount} delivered, {readCount} read receipts
          </p>
        </div>

        <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 shadow-sm">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-xs font-medium">SIM Gateways Active</span>
            <Radio className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-black text-white">3 / 3 SIMs</span>
            <span className="text-xs text-emerald-400 font-mono">Healthy</span>
          </div>
          <p className="text-[11px] text-slate-400 mt-1">
            {totalSentToday} messages dispatched today
          </p>
        </div>

        <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 shadow-sm">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-xs font-medium">Keyboard Efficiency</span>
            <Keyboard className="w-4 h-4 text-purple-400" />
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-black text-white">14 Hotkeys</span>
            <button
              onClick={onOpenShortcuts}
              className="text-xs text-purple-400 underline font-medium hover:text-purple-300"
            >
              View Cheat Sheet (?)
            </button>
          </div>
          <p className="text-[11px] text-slate-400 mt-1">
            Navigate tabs with [1-5], blast with [M]
          </p>
        </div>
      </div>

      {/* Two Column Layout: Featured High-Converting Template & SIM Load Balancer */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Featured High-Converting Campaign (7 cols) */}
        <div className="lg:col-span-7 bg-slate-900/80 border border-slate-800 rounded-2xl p-5 space-y-4">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <div>
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-amber-400" />
                <h2 className="text-sm font-bold text-white uppercase tracking-wider">
                  Top Converting Template Spotlight
                </h2>
                <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-amber-500/10 text-amber-300 border border-amber-500/20">
                  {featuredTemplate.conversionRate} Avg Response
                </span>
              </div>
              <p className="text-xs text-slate-400 mt-0.5">
                {featuredTemplate.title} ({featuredTemplate.category})
              </p>
            </div>

            <button
              onClick={() => onNavigateTab('templates')}
              className="text-xs text-emerald-400 hover:text-emerald-300 flex items-center gap-1 font-semibold"
            >
              <span>View All 12+ [3]</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Simulated WhatsApp Preview */}
          <div className="bg-[#0b141a] p-4 rounded-2xl border border-slate-800 shadow-inner">
            <div className="bg-[#005c4b] text-[#e9edef] rounded-2xl rounded-tl-none p-3.5 text-xs whitespace-pre-wrap leading-relaxed font-sans">
              {featuredTemplate.content}
              <div className="text-[10px] text-emerald-200/60 text-right mt-2 flex items-center justify-end gap-1">
                <span>10:30 AM</span>
                <span>✓✓</span>
              </div>
            </div>

            {featuredTemplate.buttons && (
              <div className="mt-2 flex flex-wrap gap-1.5">
                {featuredTemplate.buttons.map((b, idx) => (
                  <div
                    key={idx}
                    className="bg-[#202c33] text-[#00a884] font-medium text-xs py-1.5 px-3 rounded-lg border border-slate-700/40"
                  >
                    {b.label}
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="flex items-center justify-between pt-2">
            <div className="flex items-center gap-2 text-xs text-slate-400">
              <span>Dynamic Tags:</span>
              {featuredTemplate.variables.map((v) => (
                <span key={v} className="font-mono text-emerald-400 bg-slate-800 px-1.5 py-0.5 rounded">
                  &#123;&#123;{v}&#125;&#125;
                </span>
              ))}
            </div>

            <button
              onClick={onOpenMessageAll}
              className="px-4 py-2 bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-bold text-xs rounded-xl flex items-center gap-1.5 transition-colors shadow-sm"
            >
              <Send className="w-3.5 h-3.5" />
              <span>Broadcast With This Template</span>
            </button>
          </div>
        </div>

        {/* Right Column: SIM Gateway Load Balancer & Health (5 cols) */}
        <div className="lg:col-span-5 bg-slate-900/80 border border-slate-800 rounded-2xl p-5 flex flex-col justify-between space-y-4">
          <div className="space-y-1">
            <div className="flex items-center justify-between">
              <h2 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
                <Radio className="w-4 h-4 text-emerald-400" />
                SIM Gateway Load Balancer
              </h2>
              <button
                onClick={() => onNavigateTab('sims')}
                className="text-xs text-slate-400 hover:text-white"
              >
                Configure [4]
              </button>
            </div>
            <p className="text-xs text-slate-400">
              Round-robin traffic distribution across 3 physical carrier lines to prevent account throttling.
            </p>
          </div>

          {/* SIM Bars */}
          <div className="space-y-3">
            {sims.map((sim, sIdx) => {
              const usagePercent = Math.round((sim.sentToday / sim.dailyLimit) * 100);
              return (
                <div key={sim.id} className="p-3 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <div>
                      <span className="font-bold text-white">{sim.name.split(':')[0]}</span>
                      <span className="text-[11px] text-slate-400 font-mono ml-2">{sim.number}</span>
                    </div>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                      Health: {sim.healthScore}%
                    </span>
                  </div>

                  {/* Bar */}
                  <div>
                    <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-emerald-500 rounded-full"
                        style={{ width: `${usagePercent}%` }}
                      />
                    </div>
                    <div className="flex justify-between text-[10px] text-slate-400 mt-1 font-mono">
                      <span>{sim.sentToday} sent today</span>
                      <span>Cap: {sim.dailyLimit} / day ({usagePercent}%)</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800/80 flex items-center justify-between text-xs text-slate-400">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>Anti-Spam Human Jitter Enabled (2s - 5s)</span>
            </div>
            <span className="text-emerald-400 font-mono text-[11px]">Clean Standing</span>
          </div>
        </div>
      </div>

      {/* Recent Dispatched Activity Feed */}
      <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 space-y-3">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-slate-400" />
            <h2 className="text-sm font-bold text-white uppercase tracking-wider">
              Live Broadcast Stream & Audit Trail
            </h2>
            <span className="text-xs text-slate-400">({logs.length} logged dispatches)</span>
          </div>

          <button
            onClick={() => onNavigateTab('logs')}
            className="text-xs text-emerald-400 hover:text-emerald-300 flex items-center gap-1 font-semibold"
          >
            <span>Full Audit Logs [5]</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {logs.length === 0 ? (
          <div className="py-8 text-center text-slate-500 text-xs">
            No messages sent yet in this session. Click <strong>"⚡ Message All" (M)</strong> to start your first campaign blast!
          </div>
        ) : (
          <div className="space-y-2">
            {logs.slice(0, 5).map((log) => (
              <div
                key={log.id}
                className="p-2.5 rounded-xl bg-slate-950 border border-slate-800/80 flex items-center justify-between gap-3 text-xs"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-2 h-2 rounded-full bg-emerald-400 shrink-0" />
                  <div className="min-w-0">
                    <p className="font-semibold text-white truncate">
                      {log.leadName} &bull; <span className="text-slate-400">{log.company}</span>
                    </p>
                    <p className="text-[11px] text-slate-500 truncate">{log.message}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3 shrink-0 text-slate-400 font-mono text-[11px]">
                  <span>{log.simName.split(':')[0]}</span>
                  <span>{log.delaySeconds}s jitter</span>
                  <span className="text-emerald-400 font-semibold">{log.status}</span>
                  <span className="text-slate-500">{log.timestamp}</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
