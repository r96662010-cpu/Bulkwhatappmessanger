import React from 'react';
import { 
  Send, 
  Users, 
  FileText, 
  Radio, 
  History, 
  Keyboard, 
  Search, 
  Volume2, 
  VolumeX, 
  Zap, 
  ShieldCheck, 
  Lock, 
  FileSpreadsheet, 
  Bot, 
  Sparkles
} from 'lucide-react';
import { TabType, SIMConfig } from '../types';

interface NavbarProps {
  activeTab: TabType;
  onSelectTab: (tab: TabType) => void;
  onOpenMessageAll: () => void;
  onOpenTemplates: () => void;
  onOpenShortcuts: () => void;
  onOpenCommandPalette: () => void;
  onOpenEncryptedAppModal: () => void;
  onOpenCyberSecurityModal: () => void;
  onLockApp: () => void;
  soundEnabled: boolean;
  setSoundEnabled: (val: boolean) => void;
  selectedLeadsCount: number;
  sims: SIMConfig[];
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  onSelectTab,
  onOpenMessageAll,
  onOpenTemplates,
  onOpenShortcuts,
  onOpenCommandPalette,
  onOpenEncryptedAppModal,
  onOpenCyberSecurityModal,
  onLockApp,
  soundEnabled,
  setSoundEnabled,
  selectedLeadsCount,
  sims
}) => {
  const tabs: { id: TabType; label: string; icon: React.ReactNode; shortcut: string }[] = [
    { id: 'console', label: 'Console', icon: <Radio className="w-3.5 h-3.5" />, shortcut: '1' },
    { id: 'audience', label: 'Audience', icon: <Users className="w-3.5 h-3.5" />, shortcut: '2' },
    { id: 'recruitment', label: 'Recruitment CRM', icon: <FileSpreadsheet className="w-3.5 h-3.5" />, shortcut: '3' },
    { id: 'templates', label: 'Templates', icon: <FileText className="w-3.5 h-3.5" />, shortcut: '4' },
    { id: 'ai-workflow', label: 'AI Agent & Drip', icon: <Bot className="w-3.5 h-3.5" />, shortcut: '5' },
    { id: 'creator-studio', label: 'Posters & Videos', icon: <Sparkles className="w-3.5 h-3.5" />, shortcut: '6' },
    { id: 'sims', label: 'SIM Hub', icon: <Radio className="w-3.5 h-3.5" />, shortcut: '7' },
    { id: 'logs', label: 'Audit Logs', icon: <History className="w-3.5 h-3.5" />, shortcut: '8' }
  ];

  const totalSentToday = sims.reduce((acc, s) => acc + s.sentToday, 0);

  return (
    <header className="sticky top-0 z-30 bg-slate-900/95 backdrop-blur-md border-b border-slate-800">
      {/* Top micro status ticker */}
      <div className="bg-slate-950 px-4 py-1.5 border-b border-slate-800/80 flex items-center justify-between text-[11px] text-slate-400">
        <div className="flex items-center gap-3">
          <span className="flex items-center gap-1.5 text-emerald-400 font-semibold">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            WhatsApp Engine Online
          </span>
          <span className="text-slate-600 hidden md:inline">|</span>
          <button
            onClick={onOpenEncryptedAppModal}
            className="flex items-center gap-1 text-slate-300 hover:text-emerald-400 transition-colors"
          >
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
            <span>Encrypted App (AES-256 E2EE)</span>
          </button>
          <span className="text-slate-600 hidden md:inline">|</span>
          <button
            onClick={onOpenCyberSecurityModal}
            className="flex items-center gap-1.5 text-rose-400 hover:text-rose-300 transition-colors font-medium"
            title="Open Cyber Security Intrusion Prevention System"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-rose-400 animate-ping" />
            <span>Cyber Shield: Hacker Detection Active</span>
          </button>
          <span className="text-slate-600 hidden lg:inline">|</span>
          <span className="hidden lg:inline text-slate-400">
            Shri Shyam Consulting Staffing & Automation Suite
          </span>
        </div>

        <div className="flex items-center gap-3">
          {/* Lock App Screen Button */}
          <button
            onClick={onLockApp}
            className="flex items-center gap-1 text-rose-400 hover:text-rose-300 transition-colors"
            title="Lock confidential app vault (L)"
          >
            <Lock className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Lock App</span>
            <kbd className="px-1 py-0.2 rounded bg-slate-900 text-[10px] font-mono text-slate-400 border border-slate-700">
              L
            </kbd>
          </button>

          <span className="text-slate-700 hidden sm:inline">|</span>

          <button
            onClick={() => setSoundEnabled(!soundEnabled)}
            className="flex items-center gap-1 text-slate-400 hover:text-slate-200 transition-colors"
            title="Toggle keyboard feedback sound"
          >
            {soundEnabled ? (
              <Volume2 className="w-3.5 h-3.5 text-emerald-400" />
            ) : (
              <VolumeX className="w-3.5 h-3.5 text-slate-500" />
            )}
            <span className="hidden sm:inline">{soundEnabled ? 'Audio Pips' : 'Muted'}</span>
          </button>

          <button
            onClick={onOpenShortcuts}
            className="flex items-center gap-1 text-slate-300 hover:text-emerald-400 transition-colors"
            title="Open Keyboard Shortcuts Manager (?)"
          >
            <Keyboard className="w-3.5 h-3.5 text-emerald-400" />
            <span>Shortcuts</span>
            <kbd className="px-1.5 py-0.2 rounded bg-slate-800 text-[10px] text-slate-300 font-mono border border-slate-700">
              ?
            </kbd>
          </button>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="max-w-7xl mx-auto px-3 sm:px-6 py-2 flex items-center justify-between gap-3">
        {/* Brand */}
        <div className="flex items-center gap-2.5 shrink-0">
          <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center text-slate-950 shadow-md shadow-emerald-500/20 font-black text-base">
            <Zap className="w-4 h-4 fill-current" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="text-sm sm:text-base font-extrabold tracking-tight text-white">
                WhatsBlast<span className="text-emerald-400">Pro</span>
              </span>
              <span className="px-1.5 py-0.2 rounded-full text-[9px] font-bold bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">
                Encrypted
              </span>
            </div>
            <p className="text-[9px] text-slate-400 leading-none">
              WhatsApp & Recruitment Suite
            </p>
          </div>
        </div>

        {/* Navigation Tabs */}
        <nav className="hidden xl:flex items-center gap-1 bg-slate-950/80 p-1 rounded-xl border border-slate-800">
          {tabs.map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => onSelectTab(tab.id)}
                className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                  isActive
                    ? 'bg-emerald-500 text-slate-950 shadow-sm'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
                }`}
              >
                {tab.icon}
                <span className="whitespace-nowrap">{tab.label}</span>
                <kbd
                  className={`text-[9px] font-mono px-1 rounded ${
                    isActive
                      ? 'bg-emerald-600/40 text-slate-950'
                      : 'bg-slate-800 text-slate-400 border border-slate-700/80'
                  }`}
                >
                  {tab.shortcut}
                </kbd>
              </button>
            );
          })}
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-2">
          {/* Command Palette Trigger */}
          <button
            onClick={onOpenCommandPalette}
            className="hidden sm:flex items-center gap-1.5 px-2.5 py-1.5 bg-slate-800 hover:bg-slate-750 border border-slate-700 rounded-lg text-xs text-slate-300 transition-colors"
            title="Search or execute actions (⌘K)"
          >
            <Search className="w-3.5 h-3.5 text-slate-400" />
            <kbd className="px-1.5 py-0.5 rounded bg-slate-900 border border-slate-700 text-[10px] font-mono text-slate-400">
              ⌘K
            </kbd>
          </button>

          {/* Primary "⚡ Message All" Button */}
          <button
            onClick={onOpenMessageAll}
            className="flex items-center gap-1.5 px-3 py-1.5 sm:px-4 sm:py-2 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-slate-950 font-bold text-xs sm:text-sm rounded-xl transition-all shadow-lg shadow-emerald-500/20 active:scale-95"
            title="Launch Message All Broadcaster (M)"
          >
            <Send className="w-3.5 h-3.5 fill-current" />
            <span>⚡ Message All</span>
            <kbd className="hidden sm:inline-block px-1.5 py-0.2 rounded bg-slate-950/20 text-slate-950 text-[10px] font-mono font-bold">
              M
            </kbd>
          </button>
        </div>
      </div>

      {/* Overflow Mobile/Tablet Tab Bar */}
      <div className="xl:hidden flex items-center gap-1 overflow-x-auto px-2 py-1.5 bg-slate-950 border-t border-slate-800 scrollbar-none">
        {tabs.map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => onSelectTab(tab.id)}
              className={`flex items-center gap-1.5 py-1 px-2.5 rounded-lg text-[11px] font-medium whitespace-nowrap transition-colors ${
                isActive ? 'bg-emerald-500 text-slate-950 font-bold' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              {tab.icon}
              <span>{tab.label}</span>
              <span className="text-[9px] opacity-75">[{tab.shortcut}]</span>
            </button>
          );
        })}
      </div>
    </header>
  );
};
