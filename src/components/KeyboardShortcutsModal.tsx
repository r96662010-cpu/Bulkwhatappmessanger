import React, { useState } from 'react';
import { 
  Keyboard, 
  X, 
  Search, 
  Volume2, 
  VolumeX, 
  Sparkles, 
  ArrowRight,
  Laptop,
  CheckCircle2,
  Lock
} from 'lucide-react';
import { TabType } from '../types';

interface ShortcutDefinition {
  keys: string[];
  description: string;
  category: 'Navigation' | 'Broadcasting' | 'Audience' | 'General';
  actionName: string;
  onRun?: () => void;
}

interface KeyboardShortcutsModalProps {
  isOpen: boolean;
  onClose: () => void;
  soundEnabled: boolean;
  setSoundEnabled: (val: boolean) => void;
  onNavigateTab: (tab: TabType) => void;
  onOpenMessageAll: () => void;
  onOpenTemplates: () => void;
  onOpenAddLead: () => void;
  onSelectAllLeads: () => void;
  onDeselectAllLeads: () => void;
  onExportCSV: () => void;
  onOpenCommandPalette: () => void;
  onLockApp: () => void;
}

export const KeyboardShortcutsModal: React.FC<KeyboardShortcutsModalProps> = ({
  isOpen,
  onClose,
  soundEnabled,
  setSoundEnabled,
  onNavigateTab,
  onOpenMessageAll,
  onOpenTemplates,
  onOpenAddLead,
  onSelectAllLeads,
  onDeselectAllLeads,
  onExportCSV,
  onOpenCommandPalette,
  onLockApp
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [lastExecuted, setLastExecuted] = useState<string | null>(null);

  if (!isOpen) return null;

  const shortcuts: ShortcutDefinition[] = [
    // Navigation
    {
      keys: ['1'],
      description: 'Switch to Campaign Console workbench',
      category: 'Navigation',
      actionName: 'Open Console',
      onRun: () => onNavigateTab('console')
    },
    {
      keys: ['2'],
      description: 'Switch to Audience & Verified Leads table',
      category: 'Navigation',
      actionName: 'Open Audience',
      onRun: () => onNavigateTab('audience')
    },
    {
      keys: ['3'],
      description: 'Switch to Recruitment & AI Calling CRM (Excel Sheet)',
      category: 'Navigation',
      actionName: 'Open Recruitment CRM',
      onRun: () => onNavigateTab('recruitment')
    },
    {
      keys: ['4'],
      description: 'Switch to Templates Library (Special Offers, Masterclass, Staffing)',
      category: 'Navigation',
      actionName: 'Open Templates',
      onRun: () => onNavigateTab('templates')
    },
    {
      keys: ['5'],
      description: 'Switch to AI Agent Prompt & Drip Workflow Studio',
      category: 'Navigation',
      actionName: 'Open AI Workflow',
      onRun: () => onNavigateTab('ai-workflow')
    },
    {
      keys: ['6'],
      description: 'Switch to Posters, YouTube Video Maker & Google Extractor',
      category: 'Navigation',
      actionName: 'Open Creator Studio',
      onRun: () => onNavigateTab('creator-studio')
    },
    {
      keys: ['7'],
      description: 'Switch to SIMs & Anti-Ban Throttling Hub',
      category: 'Navigation',
      actionName: 'Open SIM Hub',
      onRun: () => onNavigateTab('sims')
    },
    {
      keys: ['8'],
      description: 'Switch to Delivery Logs & Audit Trail',
      category: 'Navigation',
      actionName: 'Open Logs',
      onRun: () => onNavigateTab('logs')
    },

    // Broadcasting & Security
    {
      keys: ['M'],
      description: 'Launch "⚡ Message All" bulk broadcast modal',
      category: 'Broadcasting',
      actionName: 'Message All',
      onRun: onOpenMessageAll
    },
    {
      keys: ['T'],
      description: 'Open Templates Manager modal to pick or build',
      category: 'Broadcasting',
      actionName: 'Template Manager',
      onRun: onOpenTemplates
    },
    {
      keys: ['L'],
      description: 'Lock App Screen with 256-bit Encrypted Vault Passcode',
      category: 'General',
      actionName: 'Lock App Vault',
      onRun: onLockApp
    },

    // Audience
    {
      keys: ['N'],
      description: 'Quick add a new contact or lead',
      category: 'Audience',
      actionName: 'New Contact',
      onRun: onOpenAddLead
    },
    {
      keys: ['A'],
      description: 'Select all leads in current view',
      category: 'Audience',
      actionName: 'Select All Leads',
      onRun: onSelectAllLeads
    },
    {
      keys: ['C'],
      description: 'Clear lead selections / deselect all',
      category: 'Audience',
      actionName: 'Deselect All',
      onRun: onDeselectAllLeads
    },
    {
      keys: ['E'],
      description: 'Export CSV audit report of all broadcasts & candidates',
      category: 'Audience',
      actionName: 'Export CSV Report',
      onRun: onExportCSV
    },

    // General
    {
      keys: ['⌘', 'K'],
      description: 'Open quick Command Palette search',
      category: 'General',
      actionName: 'Command Palette',
      onRun: onOpenCommandPalette
    },
    {
      keys: ['?'],
      description: 'Toggle this Keyboard Shortcuts Manager',
      category: 'General',
      actionName: 'Shortcuts Help'
    },
    {
      keys: ['ESC'],
      description: 'Close active modal, dialog, or drawer',
      category: 'General',
      actionName: 'Dismiss / Close',
      onRun: onClose
    }
  ];

  const filteredShortcuts = shortcuts.filter((s) => {
    const matchesCategory = activeCategory === 'All' || s.category === activeCategory;
    const matchesQuery =
      s.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.actionName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.keys.join(' ').toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesQuery;
  });

  const categories = ['All', 'Navigation', 'Broadcasting', 'Audience', 'General'];

  const executeShortcut = (s: ShortcutDefinition) => {
    if (s.onRun) {
      s.onRun();
      setLastExecuted(s.actionName);
      setTimeout(() => setLastExecuted(null), 1800);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-150">
      <div 
        className="w-full max-w-3xl bg-slate-900 border border-slate-700/80 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[85vh]"
        role="dialog"
        aria-modal="true"
      >
        {/* Header */}
        <div className="px-6 py-5 border-b border-slate-800 bg-slate-900/90 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center text-emerald-400 shadow-sm">
              <Keyboard className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-lg font-bold text-white tracking-tight">
                  Global Keyboard Shortcut Manager
                </h2>
                <span className="px-2 py-0.5 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                  Active
                </span>
              </div>
              <p className="text-xs text-slate-400 mt-0.5">
                Navigate all 8 tabs instantly with [1-8], broadcast with [M], lock app with [L].
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setSoundEnabled(!soundEnabled)}
              title={soundEnabled ? 'Mute keyboard sound pips' : 'Enable keyboard sound pips'}
              className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors flex items-center gap-1.5 text-xs font-medium border border-slate-700"
            >
              {soundEnabled ? (
                <>
                  <Volume2 className="w-4 h-4 text-emerald-400" />
                  <span className="text-slate-300 hidden sm:inline">Sound ON</span>
                </>
              ) : (
                <>
                  <VolumeX className="w-4 h-4 text-slate-400" />
                  <span className="text-slate-400 hidden sm:inline">Muted</span>
                </>
              )}
            </button>
            <button
              onClick={onClose}
              className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors border border-slate-700"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Filter & Search Bar */}
        <div className="p-4 bg-slate-950/60 border-b border-slate-800 flex flex-col sm:flex-row items-center gap-3">
          <div className="relative flex-1 w-full">
            <Search className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search shortcuts (e.g., 'recruitment', 'template', 'lock', '1')..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 bg-slate-900 border border-slate-700/80 rounded-xl text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-emerald-500 transition-colors"
            />
          </div>

          {/* Category Tabs */}
          <div className="flex items-center gap-1 overflow-x-auto w-full sm:w-auto pb-1 sm:pb-0">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all whitespace-nowrap ${
                  activeCategory === cat
                    ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 shadow-sm'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/80'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Toast if an action was run from here */}
        {lastExecuted && (
          <div className="bg-emerald-500/15 border-b border-emerald-500/30 px-6 py-2 text-xs text-emerald-400 flex items-center justify-between animate-in slide-in-from-top-2">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>Executed: <strong>{lastExecuted}</strong></span>
            </div>
            <span className="text-emerald-500/80">Triggered successfully</span>
          </div>
        )}

        {/* Shortcuts List */}
        <div className="flex-1 overflow-y-auto p-6 space-y-3 divide-y divide-slate-800/60">
          {filteredShortcuts.length === 0 ? (
            <div className="text-center py-12 text-slate-500">
              <Laptop className="w-10 h-10 mx-auto text-slate-600 mb-2 opacity-50" />
              <p className="text-sm font-medium">No matching keyboard shortcuts found</p>
              <p className="text-xs text-slate-500 mt-1">Try another search keyword or category.</p>
            </div>
          ) : (
            filteredShortcuts.map((s, idx) => (
              <div
                key={idx}
                className="pt-3 first:pt-0 flex items-center justify-between gap-4 group hover:bg-slate-850/50 -mx-3 px-3 py-2 rounded-xl transition-colors"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div className="flex items-center gap-1.5 shrink-0">
                    {s.keys.map((k, kIdx) => (
                      <kbd
                        key={kIdx}
                        className="min-w-[28px] h-7 px-2.5 flex items-center justify-center rounded-lg bg-slate-800 border border-slate-700 shadow-[0_2px_0_0_rgba(15,23,42,0.8)] text-slate-200 font-mono text-xs font-semibold group-hover:border-emerald-500/40 group-hover:text-emerald-400 transition-colors"
                      >
                        {k}
                      </kbd>
                    ))}
                  </div>
                  <div className="min-w-0">
                    <p className="text-sm font-medium text-slate-200 group-hover:text-white transition-colors truncate">
                      {s.description}
                    </p>
                    <span className="text-[11px] text-slate-500 font-mono flex items-center gap-1 mt-0.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-slate-600 group-hover:bg-emerald-400" />
                      {s.category} &bull; {s.actionName}
                    </span>
                  </div>
                </div>

                {s.onRun && (
                  <button
                    onClick={() => executeShortcut(s)}
                    className="shrink-0 opacity-0 group-hover:opacity-100 transition-opacity px-2.5 py-1 text-xs font-medium text-emerald-400 bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/30 rounded-lg flex items-center gap-1"
                  >
                    <span>Run</span>
                    <ArrowRight className="w-3 h-3" />
                  </button>
                )}
              </div>
            ))
          )}
        </div>

        {/* Footer tips */}
        <div className="px-6 py-4 bg-slate-950 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-400">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-emerald-400" />
            <span>Press <kbd className="px-1.5 py-0.5 rounded bg-slate-800 text-slate-300 font-mono text-[10px] border border-slate-700">?</kbd> anywhere to bring up this manager.</span>
          </div>
          <div className="flex items-center gap-2">
            <span>Passcode Lock active via <kbd className="px-1.5 py-0.5 rounded bg-slate-800 text-slate-300 font-mono text-[10px] border border-slate-700">[L]</kbd></span>
          </div>
        </div>
      </div>
    </div>
  );
};
