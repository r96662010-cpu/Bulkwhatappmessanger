import React, { useState } from 'react';
import { 
  Users, 
  Search, 
  UserPlus, 
  FileSpreadsheet, 
  Send, 
  Download, 
  CheckCircle2, 
  Clock, 
  AlertCircle, 
  Tag, 
  Trash2, 
  Check, 
  Filter,
  CheckSquare,
  Square,
  Zap
} from 'lucide-react';
import { Lead } from '../../types';
import { generate1000Leads } from '../../data/sampleAudience';

interface AudienceTabProps {
  leads: Lead[];
  onUpdateLeads: (updated: Lead[]) => void;
  onOpenMessageAll: () => void;
  onExportCSV: () => void;
}

export const AudienceTab: React.FC<AudienceTabProps> = ({
  leads,
  onUpdateLeads,
  onOpenMessageAll,
  onExportCSV
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'selected' | 'pending' | 'delivered' | 'read'>('all');
  const [showAddDrawer, setShowAddDrawer] = useState(false);
  const [showBulkPasteDrawer, setShowBulkPasteDrawer] = useState(false);
  const [bulkPasteText, setBulkPasteText] = useState('');

  // Single Add form
  const [newLead, setNewLead] = useState({
    name: '',
    phone: '',
    company: '',
    course: 'Full-Stack AI Engineering',
    discount: '35%',
    tag: 'Inbound Lead'
  });

  const selectedCount = leads.filter((l) => l.selected).length;

  const handleToggleSelectAll = (select: boolean) => {
    onUpdateLeads(leads.map((l) => ({ ...l, selected: select })));
  };

  const handleToggleSingle = (id: string) => {
    onUpdateLeads(
      leads.map((l) => (l.id === id ? { ...l, selected: !l.selected } : l))
    );
  };

  const handleDeleteLead = (id: string) => {
    onUpdateLeads(leads.filter((l) => l.id !== id));
  };

  const handleLoad1000 = () => {
    const thousand = generate1000Leads();
    onUpdateLeads(thousand);
  };

  const handleAddSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newLead.name || !newLead.phone) return;

    const created: Lead = {
      id: `lead-${Date.now()}`,
      name: newLead.name.trim(),
      phone: newLead.phone.trim(),
      company: newLead.company.trim() || 'Tech Enterprise',
      course: newLead.course.trim(),
      discount: newLead.discount.trim() || '30%',
      status: 'pending',
      selected: true,
      tags: [newLead.tag.trim() || 'Verified Lead'],
      lastContacted: 'Just now'
    };

    onUpdateLeads([created, ...leads]);
    setShowAddDrawer(false);
    setNewLead({
      name: '',
      phone: '',
      company: '',
      course: 'Full-Stack AI Engineering',
      discount: '35%',
      tag: 'Inbound Lead'
    });
  };

  const handleBulkPasteSubmit = () => {
    if (!bulkPasteText.trim()) return;

    const lines = bulkPasteText.split('\n').filter((l) => l.trim().length > 0);
    const parsed: Lead[] = [];

    lines.forEach((line, index) => {
      const parts = line.includes('\t')
        ? line.split('\t')
        : line.split(',').map((p) => p.trim());

      const name = parts[0] || `Lead ${index + 1}`;
      const phone = parts[1] || `+1 (555) 000-${1200 + index}`;
      const company = parts[2] || 'Corporate Client';
      const course = parts[3] || 'AI & Cloud Cohort';
      const discount = parts[4] || '35%';

      parsed.push({
        id: `bulk-${Date.now()}-${index}`,
        name,
        phone,
        company,
        course,
        discount,
        status: 'pending',
        selected: true,
        tags: ['CSV Import'],
        lastContacted: 'Today'
      });
    });

    onUpdateLeads([...parsed, ...leads]);
    setBulkPasteText('');
    setShowBulkPasteDrawer(false);
  };

  const filteredLeads = leads.filter((l) => {
    // Status filter
    if (statusFilter === 'selected' && !l.selected) return false;
    if (statusFilter === 'pending' && l.status !== 'pending') return false;
    if (statusFilter === 'delivered' && l.status !== 'delivered') return false;
    if (statusFilter === 'read' && l.status !== 'read') return false;

    // Search query
    const q = searchQuery.toLowerCase();
    return (
      l.name.toLowerCase().includes(q) ||
      l.company.toLowerCase().includes(q) ||
      l.course.toLowerCase().includes(q) ||
      l.phone.includes(q) ||
      l.tags.some((t) => t.toLowerCase().includes(q))
    );
  });

  return (
    <div className="space-y-5 animate-in fade-in duration-200">
      {/* Top Controls Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-slate-900/80 border border-slate-800 p-4 rounded-2xl">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-lg font-bold text-white tracking-tight">
              Audience Manager & Verified Leads
            </h1>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">
              {leads.length} Leads
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-0.5">
            Filter, search, toggle recipients, or paste batch CSV records. Keyboard hotkeys: <strong>[A]</strong> Select All &bull; <strong>[C]</strong> Deselect All &bull; <strong>[N]</strong> Add Lead.
          </p>
        </div>

        <div className="flex items-center gap-2 flex-wrap sm:flex-nowrap w-full sm:w-auto">
          <button
            onClick={() => setShowAddDrawer(true)}
            className="px-3 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-colors"
            title="Add contact (N)"
          >
            <UserPlus className="w-3.5 h-3.5 text-sky-400" />
            <span>+ Add Contact</span>
            <kbd className="px-1 py-0.2 rounded bg-slate-900 text-[10px] font-mono text-slate-400 border border-slate-700">
              N
            </kbd>
          </button>

          <button
            onClick={() => setShowBulkPasteDrawer(true)}
            className="px-3 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-colors"
          >
            <FileSpreadsheet className="w-3.5 h-3.5 text-purple-400" />
            <span>Bulk Paste / CSV</span>
          </button>

          <button
            onClick={onExportCSV}
            className="px-3 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-colors"
            title="Export CSV (E)"
          >
            <Download className="w-3.5 h-3.5 text-emerald-400" />
            <span>Export [E]</span>
          </button>

          <button
            onClick={handleLoad1000}
            className="px-3 py-2 bg-gradient-to-r from-amber-500/25 to-emerald-500/25 hover:from-amber-500/35 hover:to-emerald-500/35 text-amber-300 border border-amber-500/40 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all shadow-sm active:scale-95"
            title="Populate 1,000 verified leads in 1 click"
          >
            <Zap className="w-3.5 h-3.5 fill-current text-amber-400" />
            <span>⚡ Load 1,000 Leads</span>
          </button>

          <button
            onClick={onOpenMessageAll}
            className="px-4 py-2 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs rounded-xl flex items-center gap-1.5 transition-colors shadow-lg shadow-emerald-500/20"
            title="Message All (M)"
          >
            <Send className="w-3.5 h-3.5 fill-current" />
            <span>⚡ Message All ({selectedCount}) [M]</span>
          </button>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 bg-slate-900/60 p-3 rounded-2xl border border-slate-800">
        <div className="relative flex-1 w-full">
          <Search className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search leads by name, company, phone, course, tags..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500"
          />
        </div>

        {/* Status Pills */}
        <div className="flex items-center gap-1.5 w-full sm:w-auto overflow-x-auto pb-1 sm:pb-0">
          {(['all', 'selected', 'pending', 'delivered', 'read'] as const).map((s) => (
            <button
              key={s}
              onClick={() => setStatusFilter(s)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold capitalize whitespace-nowrap transition-all ${
                statusFilter === s
                  ? 'bg-emerald-500 text-slate-950'
                  : 'bg-slate-800/80 hover:bg-slate-800 text-slate-400'
              }`}
            >
              {s === 'selected' ? `Selected (${selectedCount})` : s}
            </button>
          ))}
        </div>
      </div>

      {/* Quick Add Contact Modal/Drawer */}
      {showAddDrawer && (
        <div className="p-4 bg-slate-900 border border-slate-700/80 rounded-2xl space-y-3 animate-in fade-in">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <UserPlus className="w-4 h-4 text-sky-400" />
              Add Verified Contact to WhatsApp Audience
            </h3>
            <button
              onClick={() => setShowAddDrawer(false)}
              className="text-xs text-slate-400 hover:text-white"
            >
              ✕ Close
            </button>
          </div>

          <form onSubmit={handleAddSubmit} className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <input
              type="text"
              required
              placeholder="Full Name *"
              value={newLead.name}
              onChange={(e) => setNewLead({ ...newLead, name: e.target.value })}
              className="px-3 py-2 bg-slate-950 border border-slate-700 rounded-lg text-xs text-white"
            />
            <input
              type="text"
              required
              placeholder="WhatsApp Phone Number *"
              value={newLead.phone}
              onChange={(e) => setNewLead({ ...newLead, phone: e.target.value })}
              className="px-3 py-2 bg-slate-950 border border-slate-700 rounded-lg text-xs text-white"
            />
            <input
              type="text"
              placeholder="Company / Organization"
              value={newLead.company}
              onChange={(e) => setNewLead({ ...newLead, company: e.target.value })}
              className="px-3 py-2 bg-slate-950 border border-slate-700 rounded-lg text-xs text-white"
            />
            <input
              type="text"
              placeholder="Course Interest"
              value={newLead.course}
              onChange={(e) => setNewLead({ ...newLead, course: e.target.value })}
              className="px-3 py-2 bg-slate-950 border border-slate-700 rounded-lg text-xs text-white"
            />
            <input
              type="text"
              placeholder="Discount Code/Percent (e.g. 40%)"
              value={newLead.discount}
              onChange={(e) => setNewLead({ ...newLead, discount: e.target.value })}
              className="px-3 py-2 bg-slate-950 border border-slate-700 rounded-lg text-xs text-white"
            />
            <input
              type="text"
              placeholder="Tag (e.g. VIP, Inbound, C-Suite)"
              value={newLead.tag}
              onChange={(e) => setNewLead({ ...newLead, tag: e.target.value })}
              className="px-3 py-2 bg-slate-950 border border-slate-700 rounded-lg text-xs text-white"
            />

            <div className="sm:col-span-3 flex items-center justify-end gap-2 pt-1">
              <button
                type="button"
                onClick={() => setShowAddDrawer(false)}
                className="px-3 py-1.5 rounded-lg bg-slate-800 text-slate-300 text-xs"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-1.5 rounded-lg bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-bold text-xs"
              >
                Save Contact
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Bulk Paste Drawer */}
      {showBulkPasteDrawer && (
        <div className="p-4 bg-slate-900 border border-slate-700/80 rounded-2xl space-y-3 animate-in fade-in">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <FileSpreadsheet className="w-4 h-4 text-purple-400" />
              Batch Paste Leads from Sheets or CSV
            </h3>
            <button
              onClick={() => setShowBulkPasteDrawer(false)}
              className="text-xs text-slate-400 hover:text-white"
            >
              ✕ Close
            </button>
          </div>
          <p className="text-xs text-slate-400">
            Copy and paste rows straight from Google Sheets, Excel, or CSV. Expected order: <strong>Name, Phone, Company, Course, Discount</strong>
          </p>
          <textarea
            rows={5}
            value={bulkPasteText}
            onChange={(e) => setBulkPasteText(e.target.value)}
            placeholder={`Alisha Roy, +1 (415) 555-0811, AlphaScale Tech, AI Fullstack, 40%\nDevon Vance, +1 (415) 555-0812, Vance Global, Executive PM, 30%`}
            className="w-full p-3 bg-slate-950 border border-slate-700 rounded-xl text-xs text-white font-mono"
          />
          <div className="flex items-center justify-end gap-2">
            <button
              onClick={() => setShowBulkPasteDrawer(false)}
              className="px-3 py-1.5 rounded-lg bg-slate-800 text-slate-300 text-xs"
            >
              Cancel
            </button>
            <button
              onClick={handleBulkPasteSubmit}
              className="px-4 py-1.5 rounded-lg bg-purple-500 hover:bg-purple-600 text-white font-bold text-xs"
            >
              Parse & Append
            </button>
          </div>
        </div>
      )}

      {/* Leads Table */}
      <div className="bg-slate-900/80 border border-slate-800 rounded-2xl overflow-hidden shadow-xl">
        <div className="p-3 bg-slate-950/80 border-b border-slate-800 flex items-center justify-between text-xs text-slate-400">
          <div className="flex items-center gap-3">
            <button
              onClick={() => handleToggleSelectAll(selectedCount < leads.length)}
              className="flex items-center gap-1.5 text-slate-300 hover:text-white font-semibold"
            >
              {selectedCount === leads.length ? (
                <CheckSquare className="w-4 h-4 text-emerald-400" />
              ) : (
                <Square className="w-4 h-4 text-slate-500" />
              )}
              <span>
                {selectedCount === leads.length ? 'Deselect All (C)' : 'Select All (A)'}
              </span>
            </button>
            <span>&bull;</span>
            <span>
              Showing {filteredLeads.length} of {leads.length} contacts
            </span>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-[11px] font-mono text-emerald-400">
              {selectedCount} Queued
            </span>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-950/50 text-slate-400 font-semibold border-b border-slate-800">
              <tr>
                <th className="py-3 px-4 w-10"></th>
                <th className="py-3 px-4">Contact</th>
                <th className="py-3 px-4">Company</th>
                <th className="py-3 px-4">Course / Topic</th>
                <th className="py-3 px-4">Discount</th>
                <th className="py-3 px-4">Delivery Status</th>
                <th className="py-3 px-4">Tags</th>
                <th className="py-3 px-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {filteredLeads.length === 0 ? (
                <tr>
                  <td colSpan={8} className="py-12 text-center text-slate-500">
                    No leads matching current search or filters.
                  </td>
                </tr>
              ) : (
                filteredLeads.map((lead) => (
                  <tr
                    key={lead.id}
                    onClick={() => handleToggleSingle(lead.id)}
                    className={`hover:bg-slate-800/40 cursor-pointer transition-colors ${
                      lead.selected ? 'bg-emerald-500/5' : ''
                    }`}
                  >
                    <td className="py-3 px-4" onClick={(e) => e.stopPropagation()}>
                      <input
                        type="checkbox"
                        checked={lead.selected}
                        onChange={() => handleToggleSingle(lead.id)}
                        className="rounded border-slate-700 text-emerald-500 focus:ring-0"
                      />
                    </td>
                    <td className="py-3 px-4">
                      <div className="font-semibold text-white">{lead.name}</div>
                      <div className="text-[11px] text-slate-400 font-mono">{lead.phone}</div>
                    </td>
                    <td className="py-3 px-4 font-medium text-slate-300">{lead.company}</td>
                    <td className="py-3 px-4 text-slate-300">{lead.course}</td>
                    <td className="py-3 px-4 font-mono text-emerald-400 font-semibold">
                      {lead.discount}
                    </td>
                    <td className="py-3 px-4">
                      {lead.status === 'delivered' && (
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                          <CheckCircle2 className="w-3 h-3" /> Delivered
                        </span>
                      )}
                      {lead.status === 'read' && (
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold bg-sky-500/10 text-sky-400 border border-sky-500/20">
                          <CheckCircle2 className="w-3 h-3" /> Read ✓✓
                        </span>
                      )}
                      {lead.status === 'pending' && (
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold bg-amber-500/10 text-amber-400 border border-amber-500/20">
                          <Clock className="w-3 h-3" /> Ready to Send
                        </span>
                      )}
                      {lead.status === 'failed' && (
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold bg-rose-500/10 text-rose-400 border border-rose-500/20">
                          <AlertCircle className="w-3 h-3" /> Failed
                        </span>
                      )}
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex flex-wrap gap-1">
                        {lead.tags.map((tag) => (
                          <span
                            key={tag}
                            className="text-[10px] px-1.5 py-0.2 rounded bg-slate-800 text-slate-300 border border-slate-700/80"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </td>
                    <td className="py-3 px-4 text-right" onClick={(e) => e.stopPropagation()}>
                      <button
                        onClick={() => handleDeleteLead(lead.id)}
                        className="p-1 text-slate-500 hover:text-rose-400 transition-colors"
                        title="Delete contact"
                      >
                        <Trash2 className="w-4 h-4" />
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
  );
};
