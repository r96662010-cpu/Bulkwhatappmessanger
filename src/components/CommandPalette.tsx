import React, { useState, useEffect, useRef } from 'react';
import { 
  Search, 
  Send, 
  Users, 
  FileText, 
  Radio, 
  History, 
  UserPlus, 
  Download, 
  ArrowRight, 
  Sparkles, 
  X,
  FileSpreadsheet,
  Bot,
  Lock,
  Palette,
  Youtube,
  Globe
} from 'lucide-react';
import { Lead, Template, TabType } from '../types';

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigateTab: (tab: TabType) => void;
  onOpenMessageAll: () => void;
  onOpenTemplates: () => void;
  onOpenAddLead: () => void;
  onExportCSV: () => void;
  onLockApp: () => void;
  leads: Lead[];
  templates: Template[];
}

export const CommandPalette: React.FC<CommandPaletteProps> = ({
  isOpen,
  onClose,
  onNavigateTab,
  onOpenMessageAll,
  onOpenTemplates,
  onOpenAddLead,
  onExportCSV,
  onLockApp,
  leads,
  templates
}) => {
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setQuery('');
      setSelectedIndex(0);
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  interface CommandItem {
    id: string;
    title: string;
    subtitle: string;
    category: 'Actions' | 'Navigation' | 'Templates' | 'Leads';
    icon: React.ReactNode;
    shortcut?: string;
    action: () => void;
  }

  const baseItems: CommandItem[] = [
    {
      id: 'act-broadcast',
      title: '⚡ Launch "Message All" Broadcaster',
      subtitle: 'Dispatch personalized WhatsApp queue across round-robin SIMs',
      category: 'Actions',
      icon: <Send className="w-4 h-4 text-emerald-400" />,
      shortcut: 'M',
      action: () => {
        onClose();
        onOpenMessageAll();
      }
    },
    {
      id: 'act-lock-app',
      title: '🔒 Lock App Screen (Encrypted Vault)',
      subtitle: 'Require 256-bit passcode PIN to view candidate CTCs & broadcast keys',
      category: 'Actions',
      icon: <Lock className="w-4 h-4 text-rose-400" />,
      shortcut: 'L',
      action: () => {
        onClose();
        onLockApp();
      }
    },
    {
      id: 'act-new-lead',
      title: 'Quick Add Lead / Contact',
      subtitle: 'Insert single recipient or open bulk paste importer',
      category: 'Actions',
      icon: <UserPlus className="w-4 h-4 text-sky-400" />,
      shortcut: 'N',
      action: () => {
        onClose();
        onOpenAddLead();
      }
    },
    {
      id: 'act-open-templates',
      title: 'Open Template Manager',
      subtitle: 'Special announcements, Masterclass AI, Shri Shyam corporate staffing',
      category: 'Actions',
      icon: <FileText className="w-4 h-4 text-amber-400" />,
      shortcut: 'T',
      action: () => {
        onClose();
        onOpenTemplates();
      }
    },
    {
      id: 'act-export-csv',
      title: 'Export CSV Audit Report',
      subtitle: 'Download logs and delivery receipts in CSV format',
      category: 'Actions',
      icon: <Download className="w-4 h-4 text-purple-400" />,
      shortcut: 'E',
      action: () => {
        onClose();
        onExportCSV();
      }
    },
    {
      id: 'nav-console',
      title: 'Go to Campaign Console',
      subtitle: 'Broadcasting workbench and SIM traffic monitor',
      category: 'Navigation',
      icon: <Radio className="w-4 h-4 text-slate-300" />,
      shortcut: '1',
      action: () => {
        onClose();
        onNavigateTab('console');
      }
    },
    {
      id: 'nav-audience',
      title: 'Go to Audience Table',
      subtitle: 'Browse 14+ verified leads, filter by delivery status',
      category: 'Navigation',
      icon: <Users className="w-4 h-4 text-slate-300" />,
      shortcut: '2',
      action: () => {
        onClose();
        onNavigateTab('audience');
      }
    },
    {
      id: 'nav-recruitment',
      title: 'Go to Recruitment CRM (Excel Sheet)',
      subtitle: 'Manage candidate salary, CTC, notice period, CVs & calling follow-ups',
      category: 'Navigation',
      icon: <FileSpreadsheet className="w-4 h-4 text-emerald-400" />,
      shortcut: '3',
      action: () => {
        onClose();
        onNavigateTab('recruitment');
      }
    },
    {
      id: 'nav-templates',
      title: 'Go to Templates Catalog',
      subtitle: 'Review 14+ preloaded high-converting copy frameworks',
      category: 'Navigation',
      icon: <FileText className="w-4 h-4 text-slate-300" />,
      shortcut: '4',
      action: () => {
        onClose();
        onNavigateTab('templates');
      }
    },
    {
      id: 'nav-ai-workflow',
      title: 'Go to AI Agent & Drip Workflow Studio',
      subtitle: 'Shri Shyam Consulting system prompt, 24/7 simulator & 3-day funnel',
      category: 'Navigation',
      icon: <Bot className="w-4 h-4 text-purple-400" />,
      shortcut: '5',
      action: () => {
        onClose();
        onNavigateTab('ai-workflow');
      }
    },
    {
      id: 'nav-creator-studio',
      title: 'Go to Posters, Videos & Google Extractor',
      subtitle: 'Free festival poster generator, YouTube video maker & Google leads extractor',
      category: 'Navigation',
      icon: <Sparkles className="w-4 h-4 text-amber-400" />,
      shortcut: '6',
      action: () => {
        onClose();
        onNavigateTab('creator-studio');
      }
    },
    {
      id: 'nav-sims',
      title: 'Go to SIMs & Anti-Ban Config',
      subtitle: '3 SIM rotation gateways, daily quotas, jitter delay',
      category: 'Navigation',
      icon: <Radio className="w-4 h-4 text-slate-300" />,
      shortcut: '7',
      action: () => {
        onClose();
        onNavigateTab('sims');
      }
    },
    {
      id: 'nav-logs',
      title: 'Go to Delivery Logs',
      subtitle: 'Live audit log of all dispatched WhatsApp messages',
      category: 'Navigation',
      icon: <History className="w-4 h-4 text-slate-300" />,
      shortcut: '8',
      action: () => {
        onClose();
        onNavigateTab('logs');
      }
    }
  ];

  // Also include matching templates
  const templateItems: CommandItem[] = templates.map((t) => ({
    id: `tmpl-${t.id}`,
    title: t.title,
    subtitle: `${t.category} • ${t.variables.join(', ')}`,
    category: 'Templates',
    icon: <Sparkles className="w-4 h-4 text-emerald-400" />,
    action: () => {
      onClose();
      onNavigateTab('templates');
    }
  }));

  // Also include matching leads
  const leadItems: CommandItem[] = leads.map((l) => ({
    id: `lead-${l.id}`,
    title: `${l.name} (${l.company})`,
    subtitle: `${l.course} • ${l.phone} • Status: ${l.status}`,
    category: 'Leads',
    icon: <Users className="w-4 h-4 text-sky-400" />,
    action: () => {
      onClose();
      onNavigateTab('audience');
    }
  }));

  const allItems = [...baseItems, ...templateItems, ...leadItems];

  const filteredItems = query.trim() === ''
    ? baseItems
    : allItems.filter(
        (item) =>
          item.title.toLowerCase().includes(query.toLowerCase()) ||
          item.subtitle.toLowerCase().includes(query.toLowerCase()) ||
          item.category.toLowerCase().includes(query.toLowerCase())
      ).slice(0, 10);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev + 1) % filteredItems.length);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev - 1 + filteredItems.length) % filteredItems.length);
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (filteredItems[selectedIndex]) {
        filteredItems[selectedIndex].action();
      }
    } else if (e.key === 'Escape') {
      e.preventDefault();
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-100">
      <div 
        className="w-full max-w-2xl bg-slate-900 border border-slate-700/80 rounded-2xl shadow-2xl overflow-hidden flex flex-col"
        onKeyDown={handleKeyDown}
      >
        {/* Search Input */}
        <div className="p-4 border-b border-slate-800 flex items-center gap-3 bg-slate-900/90">
          <Search className="w-5 h-5 text-emerald-400 shrink-0" />
          <input
            ref={inputRef}
            type="text"
            placeholder="Type a command or search (e.g. 'recruitment', 'poster', 'lock', 'rashmi', 'staffing')..."
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setSelectedIndex(0);
            }}
            className="w-full bg-transparent text-white placeholder-slate-500 text-sm focus:outline-none"
          />
          <button
            onClick={onClose}
            className="p-1 rounded-lg hover:bg-slate-800 text-slate-400 hover:text-white transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Results */}
        <div className="max-h-[50vh] overflow-y-auto p-2 space-y-1">
          {filteredItems.length === 0 ? (
            <div className="py-8 text-center text-slate-500 text-sm">
              No matching actions or leads found.
            </div>
          ) : (
            filteredItems.map((item, index) => {
              const isSelected = index === selectedIndex;
              return (
                <div
                  key={item.id}
                  onClick={item.action}
                  onMouseEnter={() => setSelectedIndex(index)}
                  className={`flex items-center justify-between p-3 rounded-xl cursor-pointer transition-colors ${
                    isSelected
                      ? 'bg-emerald-500/15 border border-emerald-500/30 text-white'
                      : 'hover:bg-slate-800/60 text-slate-200 border border-transparent'
                  }`}
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="p-2 rounded-lg bg-slate-800 border border-slate-700/60 shrink-0">
                      {item.icon}
                    </div>
                    <div className="min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-medium truncate">{item.title}</span>
                        <span className="text-[10px] uppercase font-mono px-1.5 py-0.5 rounded bg-slate-800 text-slate-400 border border-slate-700">
                          {item.category}
                        </span>
                      </div>
                      <p className="text-xs text-slate-400 truncate mt-0.5">{item.subtitle}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 shrink-0 ml-3">
                    {item.shortcut && (
                      <kbd className="px-2 py-1 rounded bg-slate-800 border border-slate-700 text-[11px] font-mono text-slate-300">
                        {item.shortcut}
                      </kbd>
                    )}
                    {isSelected && <ArrowRight className="w-4 h-4 text-emerald-400" />}
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Footer shortcuts */}
        <div className="px-4 py-2.5 bg-slate-950 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-400 font-mono">
          <div className="flex items-center gap-3">
            <span>↑↓ Navigate</span>
            <span>↵ Select</span>
            <span>ESC Close</span>
          </div>
          <span className="text-emerald-400 text-[11px]">WhatsBlast Pro Command Mode</span>
        </div>
      </div>
    </div>
  );
};
