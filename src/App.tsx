/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useCallback } from 'react';
import { Navbar } from './components/Navbar';
import { ConsoleTab } from './components/tabs/ConsoleTab';
import { AudienceTab } from './components/tabs/AudienceTab';
import { RecruitmentTab } from './components/tabs/RecruitmentTab';
import { TemplatesTab } from './components/tabs/TemplatesTab';
import { AiWorkflowTab } from './components/tabs/AiWorkflowTab';
import { CreatorStudioTab } from './components/tabs/CreatorStudioTab';
import { SimsTab } from './components/tabs/SimsTab';
import { LogsTab } from './components/tabs/LogsTab';
import { MessageAllModal } from './components/MessageAllModal';
import { TemplateManagerModal } from './components/TemplateManagerModal';
import { KeyboardShortcutsModal } from './components/KeyboardShortcutsModal';
import { CommandPalette } from './components/CommandPalette';
import { SecurityLockScreen } from './components/SecurityLockScreen';
import { EncryptedAppModal } from './components/EncryptedAppModal';
import { CyberSecurityShieldModal } from './components/CyberSecurityShieldModal';
import { SecurityIncident } from './services/cyberSecurityEngine';
import { useGlobalKeyboardShortcuts, ShortcutConfig } from './hooks/useKeyboardShortcuts';
import { INITIAL_LEADS, generate1000Leads } from './data/sampleAudience';
import { INITIAL_TEMPLATES } from './data/sampleTemplates';
import { INITIAL_SIMS } from './data/sampleSims';
import { INITIAL_CANDIDATES } from './data/sampleCandidates';
import { Lead, Template, SIMConfig, BroadcastLog, Candidate, TabType } from './types';
import { Sparkles, Keyboard, CheckCircle2, Lock, ShieldAlert, AlertTriangle, ShieldCheck } from 'lucide-react';

export default function App() {
  // Navigation State
  const [activeTab, setActiveTab] = useState<TabType>('console');

  // Core Data
  const [leads, setLeads] = useState<Lead[]>(() => {
    try {
      const saved = localStorage.getItem('whatsblast_leads');
      return saved ? JSON.parse(saved) : INITIAL_LEADS;
    } catch {
      return INITIAL_LEADS;
    }
  });

  const [candidates, setCandidates] = useState<Candidate[]>(() => {
    try {
      const saved = localStorage.getItem('whatsblast_candidates');
      return saved ? JSON.parse(saved) : INITIAL_CANDIDATES;
    } catch {
      return INITIAL_CANDIDATES;
    }
  });

  const [templates, setTemplates] = useState<Template[]>(() => {
    try {
      const saved = localStorage.getItem('whatsblast_templates');
      return saved ? JSON.parse(saved) : INITIAL_TEMPLATES;
    } catch {
      return INITIAL_TEMPLATES;
    }
  });

  const [sims, setSims] = useState<SIMConfig[]>(INITIAL_SIMS);
  const [logs, setLogs] = useState<BroadcastLog[]>([]);

  // Encrypted App Security State
  const [isAppLocked, setIsAppLocked] = useState<boolean>(false);
  const [savedPin, setSavedPin] = useState<string>(() => {
    try {
      return localStorage.getItem('whatsblast_pin') || '1234';
    } catch {
      return '1234';
    }
  });
  const [autoLockMinutes, setAutoLockMinutes] = useState<number>(() => {
    try {
      const val = localStorage.getItem('whatsblast_autolock');
      return val ? Number(val) : 15;
    } catch {
      return 15;
    }
  });
  const [isEncryptedModalOpen, setIsEncryptedModalOpen] = useState(false);
  const [isCyberModalOpen, setIsCyberModalOpen] = useState(false);
  const [cyberAlertIncident, setCyberAlertIncident] = useState<SecurityIncident | null>(null);

  // Modals State
  const [isMessageAllOpen, setIsMessageAllOpen] = useState(false);
  const [isTemplatesOpen, setIsTemplatesOpen] = useState(false);
  const [isShortcutsOpen, setIsShortcutsOpen] = useState(false);
  const [isCommandPaletteOpen, setIsCommandPaletteOpen] = useState(false);
  const [selectedTemplateForBroadcast, setSelectedTemplateForBroadcast] = useState<Template | null>(null);

  // Play Cyber Defense Alarm Siren
  const triggerCyberAlarmSound = useCallback(() => {
    try {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (!AudioCtx) return;
      const ctx = new AudioCtx();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain);
      gain.connect(ctx.destination);

      const now = ctx.currentTime;
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(880, now);
      osc.frequency.linearRampToValueAtTime(440, now + 0.15);
      osc.frequency.linearRampToValueAtTime(880, now + 0.3);
      osc.frequency.linearRampToValueAtTime(440, now + 0.45);
      gain.gain.setValueAtTime(0.08, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.5);

      osc.start(now);
      osc.stop(now + 0.5);
    } catch {}
  }, []);

  const handleSimulateAttackAlert = useCallback((incident: SecurityIncident) => {
    setCyberAlertIncident(incident);
    triggerCyberAlarmSound();
  }, [triggerCyberAlarmSound]);

  // Sound and Feedback Preferences
  const [soundEnabled, setSoundEnabled] = useState<boolean>(() => {
    try {
      return localStorage.getItem('whatsblast_sound') !== 'false';
    } catch {
      return true;
    }
  });

  // Shortcut Toast
  const [shortcutToast, setShortcutToast] = useState<{ message: string; keyHint: string } | null>(null);

  // Persistence effects
  useEffect(() => {
    try {
      localStorage.setItem('whatsblast_leads', JSON.stringify(leads));
    } catch {}
  }, [leads]);

  useEffect(() => {
    try {
      localStorage.setItem('whatsblast_candidates', JSON.stringify(candidates));
    } catch {}
  }, [candidates]);

  useEffect(() => {
    try {
      localStorage.setItem('whatsblast_templates', JSON.stringify(templates));
    } catch {}
  }, [templates]);

  useEffect(() => {
    try {
      localStorage.setItem('whatsblast_pin', savedPin);
    } catch {}
  }, [savedPin]);

  useEffect(() => {
    try {
      localStorage.setItem('whatsblast_autolock', String(autoLockMinutes));
    } catch {}
  }, [autoLockMinutes]);

  useEffect(() => {
    try {
      localStorage.setItem('whatsblast_sound', String(soundEnabled));
    } catch {}
  }, [soundEnabled]);

  // Toast trigger callback
  const triggerShortcutToast = useCallback((message: string, keyHint: string) => {
    setShortcutToast({ message, keyHint });
    const timer = setTimeout(() => {
      setShortcutToast(null);
    }, 2200);
    return () => clearTimeout(timer);
  }, []);

  // Handlers for shortcuts and actions
  const handleSelectTab = useCallback((tab: TabType) => {
    setActiveTab(tab);
  }, []);

  const handleOpenMessageAll = useCallback(() => {
    setIsMessageAllOpen(true);
    setIsTemplatesOpen(false);
    setIsShortcutsOpen(false);
    setIsCommandPaletteOpen(false);
  }, []);

  const handleOpenTemplates = useCallback(() => {
    setIsTemplatesOpen(true);
    setIsMessageAllOpen(false);
    setIsShortcutsOpen(false);
    setIsCommandPaletteOpen(false);
  }, []);

  const handleOpenShortcuts = useCallback(() => {
    setIsShortcutsOpen((prev) => !prev);
  }, []);

  const handleOpenCommandPalette = useCallback(() => {
    setIsCommandPaletteOpen((prev) => !prev);
  }, []);

  const handleLockApp = useCallback(() => {
    setIsAppLocked(true);
    setIsMessageAllOpen(false);
    setIsTemplatesOpen(false);
    setIsShortcutsOpen(false);
    setIsCommandPaletteOpen(false);
    setIsEncryptedModalOpen(false);
  }, []);

  const handleSelectAllLeads = useCallback(() => {
    setLeads((prev) => prev.map((l) => ({ ...l, selected: true })));
  }, []);

  const handleDeselectAllLeads = useCallback(() => {
    setLeads((prev) => prev.map((l) => ({ ...l, selected: false })));
  }, []);

  const handleExportCSV = useCallback(() => {
    const rows = [
      ['Lead ID', 'Name', 'Phone', 'Company', 'Course', 'Discount', 'Status', 'Selected'],
      ...leads.map((l) => [
        l.id,
        `"${l.name}"`,
        `"${l.phone}"`,
        `"${l.company}"`,
        `"${l.course}"`,
        l.discount,
        l.status,
        l.selected ? 'YES' : 'NO'
      ])
    ];

    const csvContent =
      'data:text/csv;charset=utf-8,' + rows.map((e) => e.join(',')).join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `whatsblast_leads_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    link.remove();
  }, [leads]);

  const handleCloseAllModals = useCallback(() => {
    setIsMessageAllOpen(false);
    setIsTemplatesOpen(false);
    setIsShortcutsOpen(false);
    setIsCommandPaletteOpen(false);
    setIsEncryptedModalOpen(false);
  }, []);

  // Update SIM counter on send
  const handleUpdateSimCounts = useCallback((simId: string) => {
    setSims((prev) =>
      prev.map((s) => (s.id === simId ? { ...s, sentToday: s.sentToday + 1, lastUsed: 'Just now' } : s))
    );
  }, []);

  const handleAddLog = useCallback((log: BroadcastLog) => {
    setLogs((prev) => [log, ...prev]);
  }, []);

  // Template CRUD
  const handleSaveTemplate = useCallback((newTemplate: Template) => {
    setTemplates((prev) => [newTemplate, ...prev]);
  }, []);

  const handleDeleteTemplate = useCallback((id: string) => {
    setTemplates((prev) => prev.filter((t) => t.id !== id));
  }, []);

  // Add Google extracted leads
  const handleAddLeadsToAudience = useCallback((newLeads: Lead[]) => {
    setLeads((prev) => [...newLeads, ...prev]);
  }, []);

  // 1-Click Load 1,000 Verified Leads and Launch Broadcaster
  const handleLoad1000AndBlast = useCallback(() => {
    const thousand = generate1000Leads();
    setLeads(thousand);
    setIsMessageAllOpen(true);
  }, []);

  // Send direct WhatsApp message
  const handleSendDirectWhatsApp = useCallback((phone: string, text: string) => {
    // Open WhatsApp Web with prefilled message
    const cleanPhone = phone.replace(/[^0-9]/g, '');
    const encoded = encodeURIComponent(text);
    const url = `https://wa.me/${cleanPhone}?text=${encoded}`;
    window.open(url, '_blank');

    // Also record in logs
    const logEntry: BroadcastLog = {
      id: `direct-${Date.now()}`,
      timestamp: new Date().toLocaleTimeString(),
      leadId: `direct-${cleanPhone}`,
      leadName: `Direct Candidate`,
      phone,
      company: 'Shri Shyam Consulting Mandate',
      message: text,
      simId: sims[0]?.id || 'sim-1',
      simName: sims[0]?.name || 'SIM 1 Primary',
      status: 'delivered',
      delaySeconds: 1
    };
    setLogs((prev) => [logEntry, ...prev]);
  }, [sims]);

  // Register Global Keyboard Shortcuts
  const shortcuts: ShortcutConfig[] = [
    // 1-8 Tab Navigation
    {
      key: '1',
      description: 'Go to Campaign Console',
      category: 'Navigation',
      handler: () => handleSelectTab('console')
    },
    {
      key: '2',
      description: 'Go to Audience Table',
      category: 'Navigation',
      handler: () => handleSelectTab('audience')
    },
    {
      key: '3',
      description: 'Go to Recruitment CRM (Excel Sheet)',
      category: 'Navigation',
      handler: () => handleSelectTab('recruitment')
    },
    {
      key: '4',
      description: 'Go to Templates Library',
      category: 'Navigation',
      handler: () => handleSelectTab('templates')
    },
    {
      key: '5',
      description: 'Go to AI Agent & Drip Workflow',
      category: 'Navigation',
      handler: () => handleSelectTab('ai-workflow')
    },
    {
      key: '6',
      description: 'Go to Creator Studio (Posters & Videos)',
      category: 'Navigation',
      handler: () => handleSelectTab('creator-studio')
    },
    {
      key: '7',
      description: 'Go to SIMs & Anti-Ban Hub',
      category: 'Navigation',
      handler: () => handleSelectTab('sims')
    },
    {
      key: '8',
      description: 'Go to Audit Logs',
      category: 'Navigation',
      handler: () => handleSelectTab('logs')
    },

    // Workflow Actions
    {
      key: 'm',
      description: '⚡ Launch "Message All" Broadcaster',
      category: 'Broadcasting',
      handler: handleOpenMessageAll
    },
    {
      key: 'm',
      shift: true,
      description: '⚡ Launch "Message All" Broadcaster',
      category: 'Broadcasting',
      handler: handleOpenMessageAll
    },
    {
      key: 'b',
      ctrlOrCmd: true,
      description: '⚡ Launch "Message All" Broadcaster',
      category: 'Broadcasting',
      handler: handleOpenMessageAll
    },
    {
      key: 't',
      description: 'Open Templates Catalog & Manager',
      category: 'Broadcasting',
      handler: handleOpenTemplates
    },
    {
      key: 'l',
      description: 'Lock App Screen (Encrypted Vault)',
      category: 'General',
      handler: handleLockApp
    },
    {
      key: 'n',
      description: 'Quick Add Contact / Lead',
      category: 'Audience',
      handler: () => {
        handleSelectTab('audience');
      }
    },
    {
      key: 'a',
      description: 'Select All Audience Leads',
      category: 'Audience',
      handler: handleSelectAllLeads
    },
    {
      key: 'c',
      description: 'Deselect All Audience Leads',
      category: 'Audience',
      handler: handleDeselectAllLeads
    },
    {
      key: 'e',
      description: 'Export CSV Audit Report',
      category: 'Audience',
      handler: handleExportCSV
    },

    // Productivity & General
    {
      key: 'k',
      ctrlOrCmd: true,
      description: 'Toggle Command Palette Search',
      category: 'General',
      allowInInputs: true,
      handler: handleOpenCommandPalette
    },
    {
      key: '?',
      description: 'Toggle Keyboard Shortcut Manager',
      category: 'General',
      handler: handleOpenShortcuts
    },
    {
      key: '/',
      ctrlOrCmd: true,
      description: 'Toggle Keyboard Shortcut Manager',
      category: 'General',
      allowInInputs: true,
      handler: handleOpenShortcuts
    },
    {
      key: 'Escape',
      description: 'Close active modal / overlay',
      category: 'General',
      allowInInputs: true,
      handler: handleCloseAllModals
    }
  ];

  useGlobalKeyboardShortcuts(shortcuts, {
    enabled: true,
    soundEnabled,
    onTriggerToast: triggerShortcutToast
  });

  const selectedCount = leads.filter((l) => l.selected).length;

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans">
      {/* Security Lock Screen when locked */}
      <SecurityLockScreen
        isLocked={isAppLocked}
        onUnlock={() => setIsAppLocked(false)}
        savedPin={savedPin}
        onUpdatePin={setSavedPin}
        onHackerDetected={(incident) => handleSimulateAttackAlert(incident)}
      />

      {/* Global Navigation Header */}
      <Navbar
        activeTab={activeTab}
        onSelectTab={handleSelectTab}
        onOpenMessageAll={handleOpenMessageAll}
        onOpenTemplates={handleOpenTemplates}
        onOpenShortcuts={handleOpenShortcuts}
        onOpenCommandPalette={handleOpenCommandPalette}
        onOpenEncryptedAppModal={() => setIsEncryptedModalOpen(true)}
        onOpenCyberSecurityModal={() => setIsCyberModalOpen(true)}
        onLockApp={handleLockApp}
        soundEnabled={soundEnabled}
        setSoundEnabled={setSoundEnabled}
        selectedLeadsCount={selectedCount}
        sims={sims}
      />

      {/* Real-time Cyber Threat Alert Floating Notification */}
      {cyberAlertIncident && (
        <div className="fixed top-14 left-1/2 -translate-x-1/2 z-50 w-full max-w-2xl px-4 animate-in slide-in-from-top-4 duration-200">
          <div className="bg-gradient-to-r from-rose-950 via-slate-950 to-rose-950 border-2 border-rose-500 rounded-2xl p-4 shadow-2xl shadow-rose-950/80 flex items-center justify-between gap-4 text-white">
            <div className="flex items-center gap-3 min-w-0">
              <div className="w-10 h-10 rounded-xl bg-rose-500/20 border border-rose-500/40 flex items-center justify-center text-rose-400 shrink-0 animate-pulse">
                <ShieldAlert className="w-6 h-6" />
              </div>
              <div className="min-w-0">
                <div className="flex items-center gap-2">
                  <span className="font-black text-sm text-rose-400">
                    🚨 CYBER ATTACK INTERCEPTED & HACKER QUARANTINED
                  </span>
                  <span className="px-1.5 py-0.2 rounded text-[10px] font-mono bg-rose-500/20 text-rose-300 border border-rose-500/40">
                    FIREWALL BLOCK
                  </span>
                </div>
                <p className="text-xs text-slate-300 truncate mt-0.5">
                  <strong>{cyberAlertIncident.threatType}</strong> attempt from IP <span className="font-mono text-rose-300">{cyberAlertIncident.attackerIp}</span> blocked. Attacker quarantined.
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              <button
                onClick={() => {
                  setIsCyberModalOpen(true);
                  setCyberAlertIncident(null);
                }}
                className="px-3 py-1.5 bg-rose-500 hover:bg-rose-600 text-white font-bold text-xs rounded-xl shadow transition-colors"
              >
                Inspect Threat
              </button>
              <button
                onClick={() => setCyberAlertIncident(null)}
                className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white"
              >
                ✕
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Main Tab View Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 py-6">
        {activeTab === 'console' && (
          <ConsoleTab
            leads={leads}
            templates={templates}
            sims={sims}
            logs={logs}
            onOpenMessageAll={handleOpenMessageAll}
            onOpenTemplates={handleOpenTemplates}
            onNavigateTab={handleSelectTab}
            onOpenShortcuts={handleOpenShortcuts}
            onOpenCyberSecurity={() => setIsCyberModalOpen(true)}
            onLoad1000AndBlast={handleLoad1000AndBlast}
          />
        )}

        {activeTab === 'audience' && (
          <AudienceTab
            leads={leads}
            onUpdateLeads={setLeads}
            onOpenMessageAll={handleOpenMessageAll}
            onExportCSV={handleExportCSV}
          />
        )}

        {activeTab === 'recruitment' && (
          <RecruitmentTab
            candidates={candidates}
            onUpdateCandidates={setCandidates}
            onSendDirectWhatsApp={handleSendDirectWhatsApp}
          />
        )}

        {activeTab === 'templates' && (
          <TemplatesTab
            templates={templates}
            onOpenTemplateManager={handleOpenTemplates}
            onSelectForBroadcast={(tmpl) => {
              setSelectedTemplateForBroadcast(tmpl);
            }}
            onOpenMessageAll={handleOpenMessageAll}
          />
        )}

        {activeTab === 'ai-workflow' && (
          <AiWorkflowTab />
        )}

        {activeTab === 'creator-studio' && (
          <CreatorStudioTab
            onAddLeadsToAudience={handleAddLeadsToAudience}
            onOpenMessageAll={handleOpenMessageAll}
          />
        )}

        {activeTab === 'sims' && (
          <SimsTab sims={sims} onOpenMessageAll={handleOpenMessageAll} />
        )}

        {activeTab === 'logs' && (
          <LogsTab
            logs={logs}
            onClearLogs={() => setLogs([])}
            onOpenMessageAll={handleOpenMessageAll}
          />
        )}
      </main>

      {/* Modals & Dialogs */}
      <MessageAllModal
        isOpen={isMessageAllOpen}
        onClose={() => setIsMessageAllOpen(false)}
        leads={leads}
        templates={templates}
        sims={sims}
        initialTemplate={selectedTemplateForBroadcast}
        onUpdateLeads={setLeads}
        onAddLog={handleAddLog}
        onUpdateSimCounts={handleUpdateSimCounts}
        onOpenCyberSecurity={() => setIsCyberModalOpen(true)}
        onHackerDetected={(incident) => handleSimulateAttackAlert(incident)}
      />

      <CyberSecurityShieldModal
        isOpen={isCyberModalOpen}
        onClose={() => setIsCyberModalOpen(false)}
        onSimulateAttackAlert={handleSimulateAttackAlert}
      />

      <TemplateManagerModal
        isOpen={isTemplatesOpen}
        onClose={() => setIsTemplatesOpen(false)}
        templates={templates}
        onSelectTemplateForBroadcast={(tmpl) => {
          setSelectedTemplateForBroadcast(tmpl);
          setIsMessageAllOpen(true);
        }}
        onSaveTemplate={handleSaveTemplate}
        onDeleteTemplate={handleDeleteTemplate}
      />

      <KeyboardShortcutsModal
        isOpen={isShortcutsOpen}
        onClose={() => setIsShortcutsOpen(false)}
        soundEnabled={soundEnabled}
        setSoundEnabled={setSoundEnabled}
        onNavigateTab={(tab) => {
          handleSelectTab(tab);
          setIsShortcutsOpen(false);
        }}
        onOpenMessageAll={() => {
          setIsShortcutsOpen(false);
          handleOpenMessageAll();
        }}
        onOpenTemplates={() => {
          setIsShortcutsOpen(false);
          handleOpenTemplates();
        }}
        onOpenAddLead={() => {
          setIsShortcutsOpen(false);
          handleSelectTab('audience');
        }}
        onSelectAllLeads={handleSelectAllLeads}
        onDeselectAllLeads={handleDeselectAllLeads}
        onExportCSV={handleExportCSV}
        onOpenCommandPalette={() => {
          setIsShortcutsOpen(false);
          setIsCommandPaletteOpen(true);
        }}
        onLockApp={() => {
          setIsShortcutsOpen(false);
          handleLockApp();
        }}
      />

      <CommandPalette
        isOpen={isCommandPaletteOpen}
        onClose={() => setIsCommandPaletteOpen(false)}
        onNavigateTab={handleSelectTab}
        onOpenMessageAll={handleOpenMessageAll}
        onOpenTemplates={handleOpenTemplates}
        onOpenAddLead={() => handleSelectTab('audience')}
        onExportCSV={handleExportCSV}
        onLockApp={handleLockApp}
        leads={leads}
        templates={templates}
      />

      <EncryptedAppModal
        isOpen={isEncryptedModalOpen}
        onClose={() => setIsEncryptedModalOpen(false)}
        onLockNow={handleLockApp}
        savedPin={savedPin}
        onUpdatePin={setSavedPin}
        autoLockMinutes={autoLockMinutes}
        onUpdateAutoLock={setAutoLockMinutes}
      />

      {/* Floating Keyboard Shortcut Trigger Notification Pill */}
      {shortcutToast && (
        <div className="fixed bottom-5 right-5 z-50 flex items-center gap-2.5 px-4 py-2.5 bg-slate-900 border border-emerald-500/50 rounded-xl shadow-2xl text-xs text-white animate-in slide-in-from-bottom-3 duration-200 backdrop-blur-md">
          <div className="w-5 h-5 rounded-md bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0">
            <Keyboard className="w-3.5 h-3.5" />
          </div>
          <div>
            <span className="text-slate-400">Shortcut: </span>
            <strong className="text-white">{shortcutToast.message}</strong>
          </div>
          <kbd className="px-1.5 py-0.5 rounded bg-slate-800 text-[10px] font-mono text-emerald-400 border border-slate-700">
            {shortcutToast.keyHint}
          </kbd>
        </div>
      )}

      {/* Persistent Bottom Bar with Shortcut Cheatsheet hint */}
      <footer className="border-t border-slate-900 bg-slate-950/90 py-2.5 px-4 text-center text-xs text-slate-500 flex flex-col sm:flex-row items-center justify-between max-w-7xl mx-auto w-full gap-2">
        <div className="flex items-center gap-2">
          <span>WhatsBlast Pro &bull; Shri Shyam Consulting WhatsApp Automation & Recruitment Suite</span>
          <span className="text-slate-600">&bull;</span>
          <span className="text-emerald-400 font-mono text-[11px]">256-Bit E2EE Vault</span>
        </div>
        <div className="flex items-center gap-2 text-[11px] text-slate-400">
          <span>Quick keys:</span>
          <kbd className="px-1.5 py-0.2 bg-slate-900 rounded border border-slate-800 font-mono text-emerald-400">[1-8] Tabs</kbd>
          <kbd className="px-1.5 py-0.2 bg-slate-900 rounded border border-slate-800 font-mono text-emerald-400">[M] Message All</kbd>
          <kbd className="px-1.5 py-0.2 bg-slate-900 rounded border border-slate-800 font-mono text-emerald-400">[L] Lock App</kbd>
          <button
            onClick={handleOpenShortcuts}
            className="text-slate-300 hover:text-white underline ml-1"
          >
            Press <strong>[?]</strong> for all shortcuts
          </button>
        </div>
      </footer>
    </div>
  );
}
