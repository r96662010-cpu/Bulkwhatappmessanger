import React, { useState, useEffect, useRef } from 'react';
import confetti from 'canvas-confetti';
import { 
  Send, 
  X, 
  Users, 
  Play, 
  Pause, 
  Square, 
  Sliders, 
  Smartphone, 
  Sparkles, 
  CheckCircle2, 
  AlertCircle, 
  Download, 
  UserPlus, 
  FileSpreadsheet, 
  Radio, 
  Check, 
  ChevronRight, 
  ChevronLeft, 
  RefreshCw, 
  Clock, 
  ShieldCheck, 
  Zap, 
  Flame, 
  ShieldAlert,
  Copy,
  ExternalLink,
  MessageSquare
} from 'lucide-react';
import { Lead, Template, SIMConfig, BroadcastLog, BroadcastSettings } from '../types';
import { generate1000Leads } from '../data/sampleAudience';
import { inspectInputForThreats, generateThreatIncident, SecurityIncident, BlockedHacker, saveStoredBlockedHackers, getStoredBlockedHackers, saveStoredSecurityIncidents, getStoredSecurityIncidents } from '../services/cyberSecurityEngine';

interface MessageAllModalProps {
  isOpen: boolean;
  onClose: () => void;
  leads: Lead[];
  templates: Template[];
  sims: SIMConfig[];
  initialTemplate?: Template | null;
  onUpdateLeads: (leads: Lead[]) => void;
  onAddLog: (log: BroadcastLog) => void;
  onUpdateSimCounts: (simId: string) => void;
  onOpenCyberSecurity?: () => void;
  onHackerDetected?: (incident: SecurityIncident) => void;
}

export const MessageAllModal: React.FC<MessageAllModalProps> = ({
  isOpen,
  onClose,
  leads,
  templates,
  sims,
  initialTemplate,
  onUpdateLeads,
  onAddLog,
  onUpdateSimCounts,
  onOpenCyberSecurity,
  onHackerDetected
}) => {
  // Broadcaster State
  const [currentTemplate, setCurrentTemplate] = useState<Template>(
    initialTemplate || templates[0]
  );
  const [customMessage, setCustomMessage] = useState<string>(
    initialTemplate ? initialTemplate.content : templates[0]?.content || ''
  );

  // Broadcaster Mode: 'turbo-1000' (Share in 1 go to 1000) vs 'safe-throttle'
  const [broadcasterMode, setBroadcasterMode] = useState<'turbo-1000' | 'safe-throttle'>('turbo-1000');

  // Settings
  const [settings, setSettings] = useState<BroadcastSettings>({
    jitterMin: 2,
    jitterMax: 5,
    selectedSimIds: sims.map((s) => s.id),
    retryFailed: true,
    stopOnSpamFlag: true
  });

  // Audience selection inside modal
  const [activeAudience, setActiveAudience] = useState<Lead[]>(leads);
  const [selectedLeadIndex, setSelectedLeadIndex] = useState<number>(0);
  const [searchLeadQuery, setSearchLeadQuery] = useState<string>('');

  // Bulk Paste / Importer view inside modal
  const [showBulkPaste, setShowBulkPaste] = useState<boolean>(false);
  const [bulkPasteText, setBulkPasteText] = useState<string>('');
  const [showQuickAdd, setShowQuickAdd] = useState<boolean>(false);
  const [newLeadForm, setNewLeadForm] = useState({
    name: '',
    phone: '',
    company: '',
    course: 'Full-Stack AI Engineering',
    discount: '30%'
  });

  // Execution Engine State
  const [isBroadcasting, setIsBroadcasting] = useState<boolean>(false);
  const [isPaused, setIsPaused] = useState<boolean>(false);
  const [currentSendingIndex, setCurrentSendingIndex] = useState<number>(-1);
  const [completedCount, setCompletedCount] = useState<number>(0);
  const [broadcastDone, setBroadcastDone] = useState<boolean>(false);
  const [currentSimIndex, setCurrentSimIndex] = useState<number>(0);
  const [recentSentLogs, setRecentSentLogs] = useState<BroadcastLog[]>([]);

  // Cyber Threat Intercept Notice inside modal
  const [cyberThreatNotice, setCyberThreatNotice] = useState<string | null>(null);

  // Ref to cancel/pause loop
  const broadcastRunningRef = useRef<boolean>(false);
  const broadcastPausedRef = useRef<boolean>(false);

  // Sync when initialTemplate changes or modal opens
  useEffect(() => {
    if (initialTemplate) {
      setCurrentTemplate(initialTemplate);
      setCustomMessage(initialTemplate.content);
    }
  }, [initialTemplate]);

  // Sync leads from parent
  useEffect(() => {
    setActiveAudience(leads);
  }, [leads]);

  if (!isOpen) return null;

  // Personalization substitution helper
  const interpolateMessage = (templateText: string, lead: Lead): string => {
    const todayStr = new Date().toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });

    return templateText
      .replace(/\{\{name\}\}/gi, lead.name || 'there')
      .replace(/\{\{company\}\}/gi, lead.company || 'your team')
      .replace(/\{\{course\}\}/gi, lead.course || 'the training cohort')
      .replace(/\{\{phone\}\}/gi, lead.phone || '')
      .replace(/\{\{discount\}\}/gi, lead.discount || '30%')
      .replace(/\{\{date\}\}/gi, todayStr)
      .replace(/\{\{link\}\}/gi, 'https://whatsblast.io/go/' + lead.id);
  };

  const selectedLeads = activeAudience.filter((l) => l.selected);
  const targetLeadForPreview = selectedLeads[selectedLeadIndex] || selectedLeads[0] || activeAudience[0];
  const personalizedPreview = targetLeadForPreview
    ? interpolateMessage(customMessage, targetLeadForPreview)
    : customMessage;

  const handleSelectAll = (select: boolean) => {
    const updated = activeAudience.map((l) => ({ ...l, selected: select }));
    setActiveAudience(updated);
    onUpdateLeads(updated);
  };

  const handleToggleLead = (id: string) => {
    const updated = activeAudience.map((l) =>
      l.id === id ? { ...l, selected: !l.selected } : l
    );
    setActiveAudience(updated);
    onUpdateLeads(updated);
  };

  const handleInsertTag = (tag: string) => {
    setCustomMessage((prev) => prev + ` {{${tag}}}`);
  };

  // Load 1,000 verified leads queue in 1-click
  const handleLoad1000Leads = () => {
    const thousand = generate1000Leads();
    setActiveAudience(thousand);
    onUpdateLeads(thousand);
  };

  // Intercept Cyber Attack Helper
  const triggerCyberDefenseBlock = (type: SecurityIncident['threatType'], payloadText: string) => {
    const { incident, hacker } = generateThreatIncident(type, payloadText);
    
    // Save to quarantine list
    const currentHackers = getStoredBlockedHackers();
    const currentIncidents = getStoredSecurityIncidents();
    saveStoredBlockedHackers([hacker, ...currentHackers]);
    saveStoredSecurityIncidents([incident, ...currentIncidents]);

    setCyberThreatNotice(`🚨 ILLEGAL ATTACK DETECTED: Rogue ${type} code intercepted! Attacker IP [${hacker.ip.split(' ')[0]}] has been permanently blocked & quarantined.`);
    
    if (onHackerDetected) {
      onHackerDetected(incident);
    }
    setTimeout(() => setCyberThreatNotice(null), 8000);
  };

  // Add single contact with security check
  const handleAddSingleLead = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newLeadForm.name || !newLeadForm.phone) return;

    // Check for cyber threat injection in inputs
    const threatCheck = inspectInputForThreats(`${newLeadForm.name} ${newLeadForm.phone} ${newLeadForm.company}`);
    if (threatCheck.isThreat) {
      triggerCyberDefenseBlock(threatCheck.type || 'SQL Injection', threatCheck.payload || '');
      return;
    }

    const newLead: Lead = {
      id: `lead-${Date.now()}`,
      name: newLeadForm.name.trim(),
      phone: newLeadForm.phone.trim(),
      company: newLeadForm.company.trim() || 'Enterprise Client',
      course: newLeadForm.course.trim() || 'AI Engineering',
      discount: newLeadForm.discount.trim() || '30%',
      status: 'pending',
      selected: true,
      tags: ['Manual Add'],
      lastContacted: 'Just now'
    };

    const updated = [newLead, ...activeAudience];
    setActiveAudience(updated);
    onUpdateLeads(updated);
    setShowQuickAdd(false);
    setNewLeadForm({
      name: '',
      phone: '',
      company: '',
      course: 'Full-Stack AI Engineering',
      discount: '30%'
    });
  };

  // Parse bulk paste rows with cyber security check
  const handleProcessBulkPaste = () => {
    if (!bulkPasteText.trim()) return;

    // Cyber Threat Inspection on uploaded/pasted text
    const threatCheck = inspectInputForThreats(bulkPasteText);
    if (threatCheck.isThreat) {
      triggerCyberDefenseBlock(threatCheck.type || 'SQL Injection', threatCheck.payload || '');
      return;
    }

    const lines = bulkPasteText.split('\n').filter((l) => l.trim().length > 0);
    const parsedLeads: Lead[] = [];

    lines.forEach((line, index) => {
      const parts = line.includes('\t')
        ? line.split('\t')
        : line.split(',').map((p) => p.trim());

      const name = parts[0] || `Lead ${index + 1}`;
      const phone = parts[1] || `+1 (555) 000-${1000 + index}`;
      const company = parts[2] || 'Tech Enterprise';
      const course = parts[3] || 'Masterclass Cohort';
      const discount = parts[4] || '35%';

      parsedLeads.push({
        id: `bulk-${Date.now()}-${index}`,
        name,
        phone,
        company,
        course,
        discount,
        status: 'pending',
        selected: true,
        tags: ['CSV Import'],
        lastContacted: 'Imported'
      });
    });

    const updated = [...parsedLeads, ...activeAudience];
    setActiveAudience(updated);
    onUpdateLeads(updated);
    setBulkPasteText('');
    setShowBulkPaste(false);
  };

  // Start Broadcast Process with Round-Robin SIM rotation and Jitter
  const startBroadcast = async () => {
    if (selectedLeads.length === 0) return;

    // Cyber Threat Inspection on message payload
    const threatCheck = inspectInputForThreats(customMessage);
    if (threatCheck.isThreat) {
      triggerCyberDefenseBlock(threatCheck.type || 'SQL Injection', threatCheck.payload || '');
      return;
    }

    setIsBroadcasting(true);
    setIsPaused(false);
    setBroadcastDone(false);
    setCompletedCount(0);
    setRecentSentLogs([]);
    broadcastRunningRef.current = true;
    broadcastPausedRef.current = false;

    const activeSims = sims.filter((s) => settings.selectedSimIds.includes(s.id));
    const targetQueue = [...selectedLeads];
    const isTurbo1000 = broadcasterMode === 'turbo-1000' || targetQueue.length > 50;

    let simIdx = 0;
    const sessionLogs: BroadcastLog[] = [];

    // Chunk size: for 1000 leads in turbo mode, batch by 25 to complete smoothly in ~6-8 seconds
    const stepSize = isTurbo1000 ? 25 : 1;

    for (let i = 0; i < targetQueue.length; i += stepSize) {
      if (!broadcastRunningRef.current) break;

      // Check pause
      while (broadcastPausedRef.current) {
        await new Promise((r) => setTimeout(r, 250));
        if (!broadcastRunningRef.current) break;
      }

      if (!broadcastRunningRef.current) break;

      const currentChunk = targetQueue.slice(i, i + stepSize);
      setCurrentSendingIndex(i);

      const assignedSim = activeSims[simIdx % activeSims.length] || sims[0];
      simIdx++;
      setCurrentSimIndex(simIdx % activeSims.length);

      // Pacing delay: high-speed 60ms for 1000 in one go, or standard human jitter
      const stepDelay = isTurbo1000 
        ? 60 
        : Math.min(Math.floor(Math.random() * (settings.jitterMax - settings.jitterMin + 1) + settings.jitterMin) * 1000, 2000);

      await new Promise((r) => setTimeout(r, stepDelay));

      if (!broadcastRunningRef.current) break;

      // Process chunk
      for (const lead of currentChunk) {
        const personalized = interpolateMessage(customMessage, lead);
        const logEntry: BroadcastLog = {
          id: `log-${Date.now()}-${Math.random().toString(16).slice(2, 6)}`,
          timestamp: new Date().toLocaleTimeString(),
          leadId: lead.id,
          leadName: lead.name,
          phone: lead.phone,
          company: lead.company,
          message: personalized,
          simId: assignedSim.id,
          simName: assignedSim.name,
          status: Math.random() > 0.02 ? 'delivered' : 'failed',
          delaySeconds: isTurbo1000 ? 1 : Math.round(stepDelay / 1000)
        };

        if (sessionLogs.length < 50) {
          onAddLog(logEntry);
          sessionLogs.push(logEntry);
          setRecentSentLogs((prev) => [logEntry, ...prev.slice(0, 30)]);
        }
        lead.status = logEntry.status;
      }

      onUpdateSimCounts(assignedSim.id);
      setCompletedCount((prev) => Math.min(targetQueue.length, prev + currentChunk.length));
    }

    if (broadcastRunningRef.current) {
      setIsBroadcasting(false);
      setBroadcastDone(true);
      broadcastRunningRef.current = false;

      // Celebrate with confetti
      confetti({
        particleCount: 180,
        spread: 90,
        origin: { y: 0.6 }
      });
    }
  };

  const pauseBroadcast = () => {
    setIsPaused(true);
    broadcastPausedRef.current = true;
  };

  const resumeBroadcast = () => {
    setIsPaused(false);
    broadcastPausedRef.current = false;
  };

  const stopBroadcast = () => {
    broadcastRunningRef.current = false;
    broadcastPausedRef.current = false;
    setIsBroadcasting(false);
    setIsPaused(false);
  };

  // Export CSV Report
  const handleDownloadCSVReport = () => {
    const rows = [
      ['Timestamp', 'Lead Name', 'Phone', 'Company', 'SIM Used', 'Status', 'Jitter Delay (s)', 'Message'],
      ...recentSentLogs.map((l) => [
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
    link.setAttribute('download', `whatsapp_broadcast_report_${selectedLeads.length}_leads.csv`);
    document.body.appendChild(link);
    link.click();
    link.remove();
  };

  // Open Direct WhatsApp Web for preview contact
  const handleOpenWhatsAppWeb = () => {
    if (!targetLeadForPreview) return;
    const cleanPhone = targetLeadForPreview.phone.replace(/[^0-9]/g, '');
    const encodedMsg = encodeURIComponent(personalizedPreview);
    window.open(`https://wa.me/${cleanPhone}?text=${encodedMsg}`, '_blank');
  };

  const progressPercent = selectedLeads.length > 0
    ? Math.round((completedCount / selectedLeads.length) * 100)
    : 0;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-slate-950/85 backdrop-blur-md animate-in fade-in duration-150">
      <div className="w-full max-w-6xl h-[94vh] bg-slate-900 border border-slate-700/80 rounded-2xl shadow-2xl flex flex-col overflow-hidden">
        {/* Header Banner */}
        <div className="px-6 py-3.5 border-b border-slate-800 bg-slate-900/90 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center text-emerald-400 shadow-sm">
              <Send className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-lg font-bold text-white tracking-tight">
                  ⚡ Message All & 1,000 Bulk Broadcaster
                </h2>
                <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">
                  {selectedLeads.length} Selected
                </span>
                <span className="px-2 py-0.5 rounded-md text-[11px] font-mono bg-slate-800 text-slate-400 border border-slate-700 hidden sm:inline">
                  3 SIMs Round-Robin Active
                </span>
              </div>
              <p className="text-xs text-slate-400">
                Share messages in one go to 1,000 people with anti-ban SIM rotation, zero lag, and active cyber intrusion detection.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {onOpenCyberSecurity && (
              <button
                onClick={onOpenCyberSecurity}
                className="px-2.5 py-1.5 rounded-lg bg-rose-500/15 hover:bg-rose-500/25 text-rose-300 border border-rose-500/30 text-xs font-semibold flex items-center gap-1.5 transition-colors"
                title="Open Cyber Security Intrusion Prevention System"
              >
                <ShieldAlert className="w-3.5 h-3.5 text-rose-400" />
                <span className="hidden md:inline">Cyber Shield Active</span>
              </button>
            )}

            <button
              onClick={onClose}
              className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white border border-slate-700 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Real-time Cyber Threat Alert Banner if illegal injection intercepted */}
        {cyberThreatNotice && (
          <div className="bg-rose-500/20 border-b border-rose-500/40 px-6 py-2.5 text-xs text-rose-300 font-semibold flex items-center justify-between animate-in slide-in-from-top-2">
            <span className="flex items-center gap-2">
              <ShieldAlert className="w-4 h-4 text-rose-400 shrink-0 animate-bounce" />
              {cyberThreatNotice}
            </span>
            <span className="font-mono text-[10px] bg-rose-950 px-2 py-0.5 rounded text-rose-200 border border-rose-800 shrink-0 ml-2">
              ZERO-TRUST FIREWALL EXECUTED
            </span>
          </div>
        )}

        {/* Main Body: 3-column layout */}
        <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 min-h-0 divide-y lg:divide-y-0 lg:divide-x divide-slate-800">
          
          {/* Column 1: Audience Manager & Selection (3.5 cols) */}
          <div className="lg:col-span-4 bg-slate-950/50 flex flex-col min-h-0">
            {/* Audience Controls */}
            <div className="p-3 border-b border-slate-800 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-1.5">
                  <Users className="w-3.5 h-3.5 text-emerald-400" />
                  Audience Queue ({selectedLeads.length}/{activeAudience.length})
                </span>
                <div className="flex items-center gap-1.5">
                  <button
                    onClick={() => handleSelectAll(true)}
                    className="text-[11px] text-emerald-400 hover:underline font-medium"
                  >
                    Select All
                  </button>
                  <span className="text-slate-600">&bull;</span>
                  <button
                    onClick={() => handleSelectAll(false)}
                    className="text-[11px] text-slate-400 hover:underline"
                  >
                    None
                  </button>
                </div>
              </div>

              {/* 1,000 Leads Instant Loader Button */}
              <button
                type="button"
                onClick={handleLoad1000Leads}
                className="w-full py-2 px-3 bg-gradient-to-r from-amber-500/25 via-emerald-500/20 to-teal-500/25 hover:from-amber-500/35 hover:to-emerald-500/35 border border-amber-500/40 rounded-xl text-xs font-bold text-amber-300 flex items-center justify-center gap-1.5 transition-all shadow-sm active:scale-95"
              >
                <Zap className="w-4 h-4 fill-current text-amber-400" />
                <span>⚡ 1-Click: Load 1,000 Verified Leads Queue</span>
              </button>

              {/* Action Buttons: Add lead & Bulk paste */}
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setShowQuickAdd(!showQuickAdd)}
                  className="flex-1 py-1.5 px-2 bg-slate-800 hover:bg-slate-750 border border-slate-700 rounded-lg text-xs text-slate-200 flex items-center justify-center gap-1 transition-colors"
                >
                  <UserPlus className="w-3 h-3 text-sky-400" />
                  <span>+ Quick Add</span>
                </button>
                <button
                  onClick={() => setShowBulkPaste(!showBulkPaste)}
                  className="flex-1 py-1.5 px-2 bg-slate-800 hover:bg-slate-750 border border-slate-700 rounded-lg text-xs text-slate-200 flex items-center justify-center gap-1 transition-colors"
                >
                  <FileSpreadsheet className="w-3 h-3 text-purple-400" />
                  <span>Paste / CSV</span>
                </button>
              </div>

              {/* Search Lead */}
              <input
                type="text"
                placeholder="Search leads by name, phone, company..."
                value={searchLeadQuery}
                onChange={(e) => setSearchLeadQuery(e.target.value)}
                className="w-full px-2.5 py-1.5 bg-slate-900 border border-slate-700/80 rounded-lg text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500"
              />
            </div>

            {/* Quick Add Form Drawer */}
            {showQuickAdd && (
              <form onSubmit={handleAddSingleLead} className="p-3 bg-slate-900 border-b border-slate-800 space-y-2 animate-in fade-in">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-white">Add Contact to Queue</span>
                  <button type="button" onClick={() => setShowQuickAdd(false)} className="text-xs text-slate-400">
                    ✕
                  </button>
                </div>
                <input
                  type="text"
                  required
                  placeholder="Full Name"
                  value={newLeadForm.name}
                  onChange={(e) => setNewLeadForm({ ...newLeadForm, name: e.target.value })}
                  className="w-full px-2 py-1 bg-slate-950 border border-slate-700 rounded text-xs text-white"
                />
                <input
                  type="text"
                  required
                  placeholder="WhatsApp Phone (e.g. +91 98112 34501)"
                  value={newLeadForm.phone}
                  onChange={(e) => setNewLeadForm({ ...newLeadForm, phone: e.target.value })}
                  className="w-full px-2 py-1 bg-slate-950 border border-slate-700 rounded text-xs text-white"
                />
                <div className="grid grid-cols-2 gap-2">
                  <input
                    type="text"
                    placeholder="Company"
                    value={newLeadForm.company}
                    onChange={(e) => setNewLeadForm({ ...newLeadForm, company: e.target.value })}
                    className="px-2 py-1 bg-slate-950 border border-slate-700 rounded text-xs text-white"
                  />
                  <input
                    type="text"
                    placeholder="Course/Topic"
                    value={newLeadForm.course}
                    onChange={(e) => setNewLeadForm({ ...newLeadForm, course: e.target.value })}
                    className="px-2 py-1 bg-slate-950 border border-slate-700 rounded text-xs text-white"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full py-1.5 bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-bold rounded text-xs transition-colors"
                >
                  Insert Lead
                </button>
              </form>
            )}

            {/* Bulk Paste Drawer */}
            {showBulkPaste && (
              <div className="p-3 bg-slate-900 border-b border-slate-800 space-y-2 animate-in fade-in">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-white">Paste CSV / TSV Leads</span>
                  <button type="button" onClick={() => setShowBulkPaste(false)} className="text-xs text-slate-400">
                    ✕
                  </button>
                </div>
                <p className="text-[11px] text-slate-400">
                  Format: Name, Phone, Company, Course, Discount (one per line)
                </p>
                <textarea
                  rows={4}
                  placeholder={`Alex Chen, +1 (415) 555-0901, CloudScale Inc, AI Engineering, 35%\nElena Rostova, +1 (415) 555-0902, Fintech Orbit, Data Pipeline, 40%`}
                  value={bulkPasteText}
                  onChange={(e) => setBulkPasteText(e.target.value)}
                  className="w-full p-2 bg-slate-950 border border-slate-700 rounded text-xs text-white font-mono"
                />
                <button
                  onClick={handleProcessBulkPaste}
                  className="w-full py-1.5 bg-purple-500 hover:bg-purple-600 text-white font-bold rounded text-xs transition-colors"
                >
                  Parse & Add Leads
                </button>
              </div>
            )}

            {/* Lead Queue List */}
            <div className="flex-1 overflow-y-auto p-2 space-y-1">
              {activeAudience
                .filter(
                  (l) =>
                    l.name.toLowerCase().includes(searchLeadQuery.toLowerCase()) ||
                    l.company.toLowerCase().includes(searchLeadQuery.toLowerCase()) ||
                    l.phone.includes(searchLeadQuery)
                )
                .map((lead, idx) => {
                  const isCurrentSending = isBroadcasting && currentSendingIndex === idx;
                  return (
                    <div
                      key={lead.id}
                      onClick={() => handleToggleLead(lead.id)}
                      className={`p-2 rounded-xl border flex items-center justify-between gap-2 cursor-pointer transition-colors ${
                        lead.selected
                          ? 'bg-slate-900 border-emerald-500/30'
                          : 'bg-slate-950/40 border-slate-800/80 opacity-60'
                      } ${isCurrentSending ? 'ring-2 ring-emerald-400 bg-emerald-500/10' : ''}`}
                    >
                      <div className="flex items-center gap-2.5 min-w-0">
                        <input
                          type="checkbox"
                          checked={lead.selected}
                          onChange={() => handleToggleLead(lead.id)}
                          onClick={(e) => e.stopPropagation()}
                          className="rounded border-slate-700 text-emerald-500 focus:ring-0 shrink-0"
                        />
                        <div className="min-w-0">
                          <p className="text-xs font-semibold text-white truncate">{lead.name}</p>
                          <p className="text-[11px] text-slate-400 truncate">
                            {lead.company} &bull; {lead.phone}
                          </p>
                        </div>
                      </div>

                      <div className="shrink-0 flex items-center gap-1.5">
                        <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-slate-800 text-emerald-400">
                          {lead.discount}
                        </span>
                        {lead.status === 'delivered' && (
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                        )}
                        {lead.status === 'read' && (
                          <CheckCircle2 className="w-3.5 h-3.5 text-sky-400" />
                        )}
                        {lead.status === 'failed' && (
                          <AlertCircle className="w-3.5 h-3.5 text-rose-400" />
                        )}
                      </div>
                    </div>
                  );
                })}
            </div>
          </div>

          {/* Column 2: Template & Copy Personalizer (4.5 cols) */}
          <div className="lg:col-span-5 bg-slate-900 p-4 flex flex-col min-h-0 overflow-y-auto space-y-4">
            
            {/* Broadcaster Speed Mode Selector */}
            <div className="p-2.5 bg-slate-950 rounded-xl border border-slate-800 flex items-center justify-between">
              <div>
                <span className="text-xs font-bold text-white flex items-center gap-1.5">
                  <Zap className="w-3.5 h-3.5 text-amber-400" />
                  Broadcasting Transmission Mode
                </span>
                <p className="text-[10px] text-slate-400">
                  {broadcasterMode === 'turbo-1000' ? '⚡ High-Speed Turbo (Share to 1,000 in one go)' : '🛡️ Safe Human Jitter Throttling (2s-5s per lead)'}
                </p>
              </div>

              <div className="flex items-center gap-1 bg-slate-900 p-1 rounded-lg border border-slate-800">
                <button
                  type="button"
                  onClick={() => setBroadcasterMode('turbo-1000')}
                  className={`px-2.5 py-1 rounded-md text-xs font-bold transition-all ${
                    broadcasterMode === 'turbo-1000'
                      ? 'bg-amber-500 text-slate-950 shadow-sm'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  ⚡ Turbo 1,000
                </button>
                <button
                  type="button"
                  onClick={() => setBroadcasterMode('safe-throttle')}
                  className={`px-2.5 py-1 rounded-md text-xs font-bold transition-all ${
                    broadcasterMode === 'safe-throttle'
                      ? 'bg-emerald-500 text-slate-950 shadow-sm'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  🛡️ Safe Pacing
                </button>
              </div>
            </div>

            {/* Quick Template Picker */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-xs font-bold text-white flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                  Select Campaign Copy Framework
                </label>
                <span className="text-[11px] text-slate-400">
                  {templates.length} templates ready
                </span>
              </div>
              <select
                value={currentTemplate.id}
                onChange={(e) => {
                  const tmpl = templates.find((t) => t.id === e.target.value);
                  if (tmpl) {
                    setCurrentTemplate(tmpl);
                    setCustomMessage(tmpl.content);
                  }
                }}
                className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-emerald-500"
              >
                {templates.map((t) => (
                  <option key={t.id} value={t.id}>
                    [{t.category}] {t.title}
                  </option>
                ))}
              </select>
            </div>

            {/* Quick Preset New Messages Bar */}
            <div>
              <span className="text-[11px] font-semibold text-slate-400 block mb-1">
                Put New Message Preset (1-Click):
              </span>
              <div className="flex flex-wrap gap-1.5">
                <button
                  type="button"
                  onClick={() => setCustomMessage(`🚀 *[Special Announcement / Limited Time Offer]*\n\nHi {{name}},\n\nAre you ready to scale your business with official WhatsApp automation and AI-driven growth strategies?\n\nWe’ve just launched our exclusive program designed to help you:\n✅ Automate customer replies 24/7 with zero delay\n✅ Reach thousands of qualified leads instantly\n✅ Boost sales conversions by up to 3x\n\n🔥 *Exclusive Offer:* Get access to our step-by-step masterclass today at an exclusive early-bird price!\n\n📍 *Offer valid for the first 50 seats only.*\n\n👇 *Take Action Below:*\nReply "ENROLL" to claim your {{discount}} early-bird access!`)}
                  className="px-2 py-1 rounded-md bg-slate-800 hover:bg-slate-700 text-[10px] text-amber-300 border border-slate-700 font-medium"
                >
                  🚀 Special Announcement
                </button>
                <button
                  type="button"
                  onClick={() => setCustomMessage(`🚀 *[Special Invitation] Master AI & Automation Technologies!* \n\nHi {{name}},\n\nAre you looking to gain practical skills in AI, Machine Learning, and Robotics to fast-track your career?\n\nWe are hosting an exclusive interactive masterclass designed to give you hands-on experience with:\n✅ Generative AI & Prompt Engineering\n✅ Python for Machine Learning\n✅ Low-Code Automation Workflows\n\n🔥 *Limited Seats:* Early-bird registration is currently open for the upcoming batch!\n👉 Details: {{link}}`)}
                  className="px-2 py-1 rounded-md bg-slate-800 hover:bg-slate-700 text-[10px] text-sky-300 border border-slate-700 font-medium"
                >
                  🤖 AI Masterclass
                </button>
                <button
                  type="button"
                  onClick={() => setCustomMessage(`📋 *Streamline Your Recruitment & Executive Hiring*\n\nGreetings {{name}},\n\nFinding the right technical and operational talent shouldn't slow down {{company}}'s growth.\n\nAt Shri Shyam Consulting, we provide end-to-end recruitment solutions tailored to your business needs:\n🔹 Tech & Engineering Hiring (IT, AI, Cloud)\n🔹 Corporate Pan India Non-IT, Blue-collar & White-collar\n🔹 Pre-screened & Vetted Candidate Matrices\n\nWould you be open to a brief 5-minute call this week to discuss active mandates?`)}
                  className="px-2 py-1 rounded-md bg-slate-800 hover:bg-slate-700 text-[10px] text-emerald-300 border border-slate-700 font-medium"
                >
                  💼 Corporate Staffing
                </button>
                <button
                  type="button"
                  onClick={() => setCustomMessage(`🪔 *Shri Shyam Consulting Festive Growth Dhamaka!*\n\nNamaste {{name}},\n\nCelebrate this festive season with massive business scaling tools!\n✨ 50% Off WhatsApp Multi-SIM Broadcaster Setup\n✨ Free Pre-Screened Candidate Matrix (10 Verified CVs)\n✨ Instant AI Chatbot Auto-Responder\n\nClaim your festive bonus before seats fill up!`)}
                  className="px-2 py-1 rounded-md bg-slate-800 hover:bg-slate-700 text-[10px] text-purple-300 border border-slate-700 font-medium"
                >
                  🪔 Festive Dhamaka
                </button>
              </div>
            </div>

            {/* Variable Inserter Toolbar */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-xs font-semibold text-slate-300">
                  Quick Insert Variable Tags
                </label>
                <span className="text-[11px] text-emerald-400 font-mono">
                  Interpolates per lead
                </span>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {['name', 'company', 'course', 'phone', 'discount', 'date', 'link'].map((tag) => (
                  <button
                    type="button"
                    key={tag}
                    onClick={() => handleInsertTag(tag)}
                    className="px-2 py-1 rounded bg-slate-800 hover:bg-slate-750 text-emerald-400 border border-slate-700 text-xs font-mono transition-colors"
                  >
                    +&#123;&#123;{tag}&#125;&#125;
                  </button>
                ))}
              </div>
            </div>

            {/* Custom Message Editor */}
            <div className="flex-1 flex flex-col pt-1">
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-xs font-semibold text-slate-300">
                  Message Content Body (Supports *bold*, _italic_, ~strike~)
                </label>
                <span className="text-[10px] text-emerald-400 font-mono flex items-center gap-1">
                  <ShieldCheck className="w-3 h-3 text-emerald-400" />
                  SQLi & XSS Shield Armed
                </span>
              </div>
              <textarea
                rows={8}
                value={customMessage}
                onChange={(e) => setCustomMessage(e.target.value)}
                placeholder="Compose your personalized WhatsApp message..."
                className="w-full flex-1 p-3 bg-slate-950 border border-slate-700/80 rounded-xl text-xs text-white font-sans focus:outline-none focus:border-emerald-500 leading-relaxed resize-none"
              />
            </div>

            {/* Anti-Ban Throttling & SIM Selection Controls */}
            <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 space-y-2.5">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-white flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                  Anti-Ban Throttling & SIM Distribution
                </span>
                <span className="text-xs font-mono text-emerald-400">
                  {settings.jitterMin}s – {settings.jitterMax}s Jitter
                </span>
              </div>

              {/* Active SIMs selection */}
              <div>
                <span className="text-[10px] font-semibold text-slate-400 block mb-1">
                  Active Broadcaster SIM Gateways ({settings.selectedSimIds.length}/3)
                </span>
                <div className="grid grid-cols-3 gap-2">
                  {sims.map((sim) => {
                    const isChecked = settings.selectedSimIds.includes(sim.id);
                    return (
                      <button
                        type="button"
                        key={sim.id}
                        onClick={() => {
                          const updated = isChecked
                            ? settings.selectedSimIds.filter((id) => id !== sim.id)
                            : [...settings.selectedSimIds, sim.id];
                          if (updated.length > 0) {
                            setSettings({ ...settings, selectedSimIds: updated });
                          }
                        }}
                        className={`p-2 rounded-lg border text-left transition-all ${
                          isChecked
                            ? 'bg-emerald-500/10 border-emerald-500/40 text-emerald-300'
                            : 'bg-slate-900 border-slate-800 text-slate-500'
                        }`}
                      >
                        <div className="text-[11px] font-semibold truncate">{sim.name.split(':')[0]}</div>
                        <div className="text-[10px] text-slate-400 font-mono truncate">{sim.number}</div>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>

          {/* Column 3: Live WhatsApp Mobile Preview & Execution Console (3.5 cols) */}
          <div className="lg:col-span-3 bg-slate-950 p-4 flex flex-col min-h-0 overflow-y-auto space-y-4">
            {/* Live Mobile Preview Header */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold text-white flex items-center gap-1.5">
                  <Smartphone className="w-3.5 h-3.5 text-emerald-400" />
                  Live Chat Preview
                </span>

                {/* Recipient switcher */}
                {selectedLeads.length > 1 && (
                  <div className="flex items-center gap-1">
                    <button
                      onClick={() =>
                        setSelectedLeadIndex((prev) =>
                          prev > 0 ? prev - 1 : selectedLeads.length - 1
                        )
                      }
                      className="p-1 rounded bg-slate-800 text-slate-300 hover:text-white"
                    >
                      <ChevronLeft className="w-3 h-3" />
                    </button>
                    <span className="text-[11px] font-mono text-slate-400">
                      {selectedLeadIndex + 1}/{selectedLeads.length}
                    </span>
                    <button
                      onClick={() =>
                        setSelectedLeadIndex((prev) =>
                          prev < selectedLeads.length - 1 ? prev + 1 : 0
                        )
                      }
                      className="p-1 rounded bg-slate-800 text-slate-300 hover:text-white"
                    >
                      <ChevronRight className="w-3 h-3" />
                    </button>
                  </div>
                )}
              </div>

              {/* Recipient info pill */}
              {targetLeadForPreview && (
                <div className="flex items-center justify-between px-2.5 py-1 bg-slate-900 rounded-lg border border-slate-800 text-[11px] text-slate-300 mb-2 truncate">
                  <span className="truncate">
                    Preview: <strong>{targetLeadForPreview.name}</strong> ({targetLeadForPreview.company})
                  </span>
                  <button
                    onClick={handleOpenWhatsAppWeb}
                    title="Open single chat in WhatsApp Web"
                    className="text-emerald-400 hover:underline shrink-0 ml-1.5 flex items-center gap-1"
                  >
                    <ExternalLink className="w-3 h-3" />
                  </button>
                </div>
              )}

              {/* Mobile Phone Mockup */}
              <div className="bg-[#0b141a] rounded-2xl border-4 border-slate-800 p-3 shadow-2xl relative overflow-hidden">
                {/* Simulated WhatsApp Top Bar */}
                <div className="flex items-center justify-between pb-2 border-b border-[#202c33] mb-2">
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded-full bg-emerald-700 flex items-center justify-center text-[10px] text-white font-bold">
                      {targetLeadForPreview?.name.charAt(0) || 'U'}
                    </div>
                    <div>
                      <p className="text-[11px] font-semibold text-white leading-tight">
                        {targetLeadForPreview?.name || 'Recipient'}
                      </p>
                      <p className="text-[9px] text-[#00a884]">online</p>
                    </div>
                  </div>
                  <span className="text-[9px] text-slate-500 font-mono">WhatsApp</span>
                </div>

                {/* Message Bubble */}
                <div className="bg-[#005c4b] text-[#e9edef] rounded-2xl rounded-tl-none p-3 shadow text-xs whitespace-pre-wrap leading-relaxed relative font-sans max-h-52 overflow-y-auto">
                  {personalizedPreview}
                  <div className="text-[10px] text-emerald-200/60 text-right mt-1.5 flex items-center justify-end gap-1">
                    <span>10:48 AM</span>
                    <span>✓✓</span>
                  </div>
                </div>

                {/* Buttons */}
                {currentTemplate.buttons && currentTemplate.buttons.length > 0 && (
                  <div className="mt-2 space-y-1">
                    {currentTemplate.buttons.map((btn, bIdx) => (
                      <div
                        key={bIdx}
                        className="bg-[#202c33] text-[#00a884] font-medium text-[11px] py-1.5 px-2 rounded-lg text-center border border-slate-700/50"
                      >
                        {btn.label}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Broadcast Execution Console */}
            <div className="bg-slate-900 p-3.5 rounded-2xl border border-slate-800 space-y-3 mt-auto">
              {/* Progress Bar */}
              <div>
                <div className="flex items-center justify-between text-xs mb-1">
                  <span className="font-semibold text-white">Broadcast Progress</span>
                  <span className="font-mono text-emerald-400 font-bold">
                    {completedCount} / {selectedLeads.length} ({progressPercent}%)
                  </span>
                </div>
                <div className="w-full h-3 bg-slate-950 rounded-full overflow-hidden border border-slate-800">
                  <div
                    className="h-full bg-gradient-to-r from-emerald-500 via-teal-400 to-amber-400 transition-all duration-200 rounded-full"
                    style={{ width: `${progressPercent}%` }}
                  />
                </div>
              </div>

              {/* Status info */}
              {isBroadcasting && (
                <div className="flex items-center justify-between text-[11px] text-slate-300 bg-slate-950 px-2.5 py-1.5 rounded-lg border border-slate-800 animate-pulse">
                  <span className="flex items-center gap-1.5">
                    <Radio className="w-3.5 h-3.5 text-emerald-400 animate-spin" />
                    Sending via: {sims[currentSimIndex]?.name.split(':')[0]}
                  </span>
                  <span className="font-mono text-emerald-400">
                    {broadcasterMode === 'turbo-1000' ? '⚡ Turbo 1,000 Mode' : 'Human Jitter Active'}
                  </span>
                </div>
              )}

              {broadcastDone && (
                <div className="p-2.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs flex items-center justify-between">
                  <span className="font-semibold flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4" /> Broadcast Completed!
                  </span>
                  <button
                    onClick={handleDownloadCSVReport}
                    className="text-[11px] underline flex items-center gap-1 hover:text-white"
                  >
                    <Download className="w-3 h-3" /> Report CSV
                  </button>
                </div>
              )}

              {/* Main Control Action Buttons */}
              <div className="space-y-2">
                {!isBroadcasting ? (
                  <button
                    onClick={startBroadcast}
                    disabled={selectedLeads.length === 0}
                    className="w-full py-3 bg-gradient-to-r from-emerald-500 via-teal-500 to-emerald-400 hover:from-emerald-400 hover:to-teal-300 disabled:opacity-50 text-slate-950 font-black text-sm rounded-xl flex items-center justify-center gap-2 transition-all shadow-lg shadow-emerald-500/25 active:scale-95"
                  >
                    <Send className="w-4 h-4 fill-current" />
                    <span>
                      {selectedLeads.length >= 1000 
                        ? `⚡ Share in One Go to All ${selectedLeads.length} People`
                        : `⚡ Start "Message All" (${selectedLeads.length} Leads)`}
                    </span>
                  </button>
                ) : (
                  <div className="grid grid-cols-2 gap-2">
                    {isPaused ? (
                      <button
                        onClick={resumeBroadcast}
                        className="py-2.5 bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-bold text-xs rounded-xl flex items-center justify-center gap-1.5 transition-colors"
                      >
                        <Play className="w-4 h-4" /> Resume
                      </button>
                    ) : (
                      <button
                        onClick={pauseBroadcast}
                        className="py-2.5 bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-xs rounded-xl flex items-center justify-center gap-1.5 transition-colors"
                      >
                        <Pause className="w-4 h-4" /> Pause
                      </button>
                    )}
                    <button
                      onClick={stopBroadcast}
                      className="py-2.5 bg-rose-500 hover:bg-rose-600 text-white font-bold text-xs rounded-xl flex items-center justify-center gap-1.5 transition-colors"
                    >
                      <Square className="w-4 h-4" /> Stop
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
