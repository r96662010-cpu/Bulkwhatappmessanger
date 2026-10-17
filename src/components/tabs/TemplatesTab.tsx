import React, { useState } from 'react';
import { 
  FileText, 
  Search, 
  Plus, 
  Download, 
  Sparkles, 
  Send, 
  Copy, 
  Check, 
  ExternalLink, 
  Phone, 
  MessageSquare,
  Tag
} from 'lucide-react';
import { Template, TemplateCategory } from '../../types';

interface TemplatesTabProps {
  templates: Template[];
  onOpenTemplateManager: () => void;
  onSelectForBroadcast: (template: Template) => void;
  onOpenMessageAll: () => void;
}

export const TemplatesTab: React.FC<TemplatesTabProps> = ({
  templates,
  onOpenTemplateManager,
  onSelectForBroadcast,
  onOpenMessageAll
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<TemplateCategory | 'All'>('All');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const categories: (TemplateCategory | 'All')[] = [
    'All',
    'Free YouTube Video Promo',
    'Masterclass & Training',
    'Corporate Staffing',
    '48-Hour Flash Offers',
    'Live Webinars',
    'Invoice Reminders',
    'VIP Onboarding',
    'Win-Back Campaigns',
    'Course Syllabus Downloads',
    'Custom'
  ];

  const filteredTemplates = templates.filter((t) => {
    const matchesCat = selectedCategory === 'All' || t.category === selectedCategory;
    const q = searchQuery.toLowerCase();
    const matchesQuery =
      t.title.toLowerCase().includes(q) ||
      t.content.toLowerCase().includes(q) ||
      t.category.toLowerCase().includes(q);
    return matchesCat && matchesQuery;
  });

  const handleCopy = (t: Template) => {
    navigator.clipboard.writeText(t.content);
    setCopiedId(t.id);
    setTimeout(() => setCopiedId(null), 1800);
  };

  const handleExportJSON = () => {
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(templates, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute('download', `whatsblast_templates_${new Date().toISOString().slice(0, 10)}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  return (
    <div className="space-y-5 animate-in fade-in duration-200">
      {/* Top Controls Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-slate-900/80 border border-slate-800 p-4 rounded-2xl">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-lg font-bold text-white tracking-tight">
              WhatsApp Templates & High-Converting Frameworks
            </h1>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-amber-500/15 text-amber-400 border border-amber-500/30">
              {templates.length} Pre-Loaded
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-0.5">
            Battle-tested copy frameworks for training cohorts, webinars, flash sales, Rashmi Sondhi YouTube promos, and invoices.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleExportJSON}
            className="px-3 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-colors"
          >
            <Download className="w-3.5 h-3.5 text-purple-400" />
            <span>Export JSON Pack</span>
          </button>

          <button
            onClick={onOpenTemplateManager}
            className="px-4 py-2 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs rounded-xl flex items-center gap-1.5 transition-colors shadow-lg shadow-emerald-500/20"
            title="Open Template Manager (T)"
          >
            <Plus className="w-4 h-4" />
            <span>Manage / Add Template [T]</span>
          </button>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-slate-900/60 p-3 rounded-2xl border border-slate-800 space-y-3">
        <div className="relative">
          <Search className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search templates by keyword, category, or title..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500"
          />
        </div>

        {/* Category Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1">
          {categories.map((c) => (
            <button
              key={c}
              onClick={() => setSelectedCategory(c)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-all ${
                selectedCategory === c
                  ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40 font-semibold shadow-sm'
                  : 'bg-slate-800/80 hover:bg-slate-800 text-slate-400'
              }`}
            >
              {c}
            </button>
          ))}
        </div>
      </div>

      {/* Templates Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredTemplates.length === 0 ? (
          <div className="col-span-full py-16 text-center text-slate-500 text-sm">
            No templates match the selected category or search filter.
          </div>
        ) : (
          filteredTemplates.map((template) => (
            <div
              key={template.id}
              className="bg-slate-900/90 border border-slate-800 hover:border-slate-700/80 rounded-2xl p-4 flex flex-col justify-between space-y-3 transition-all hover:shadow-xl group"
            >
              {/* Header */}
              <div>
                <div className="flex items-start justify-between gap-2">
                  <span className="text-[11px] font-semibold text-amber-400 bg-amber-500/10 border border-amber-500/20 px-2 py-0.5 rounded-md">
                    {template.category}
                  </span>
                  {template.conversionRate && (
                    <span className="text-[10px] font-mono font-bold text-emerald-400 bg-emerald-500/10 px-1.5 py-0.5 rounded border border-emerald-500/20">
                      {template.conversionRate} Conv
                    </span>
                  )}
                </div>
                <h3 className="text-sm font-bold text-white mt-2 group-hover:text-emerald-400 transition-colors line-clamp-1">
                  {template.title}
                </h3>
              </div>

              {/* Chat Bubble Card Preview */}
              <div className="bg-[#0b141a] p-3 rounded-xl border border-slate-800/80 shadow-inner">
                <div className="bg-[#005c4b] text-[#e9edef] rounded-xl rounded-tl-none p-2.5 text-xs whitespace-pre-wrap leading-relaxed line-clamp-6 font-sans">
                  {template.content}
                </div>

                {template.buttons && template.buttons.length > 0 && (
                  <div className="mt-2 space-y-1">
                    {template.buttons.map((b, bIdx) => (
                      <div
                        key={bIdx}
                        className="bg-[#202c33] text-[#00a884] text-[10px] font-semibold py-1 px-2 rounded text-center truncate border border-slate-700/40"
                      >
                        {b.label}
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Dynamic Variables */}
              <div className="flex items-center gap-1.5 flex-wrap">
                <span className="text-[10px] text-slate-500">Tags:</span>
                {template.variables.map((v) => (
                  <span
                    key={v}
                    className="text-[10px] font-mono text-emerald-400 bg-slate-950 px-1.5 py-0.2 rounded border border-slate-800"
                  >
                    &#123;&#123;{v}&#125;&#125;
                  </span>
                ))}
              </div>

              {/* Footer Actions */}
              <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between gap-2">
                <button
                  onClick={() => handleCopy(template)}
                  className="px-2.5 py-1.5 bg-slate-800 hover:bg-slate-750 text-slate-300 rounded-lg text-xs flex items-center gap-1 transition-colors border border-slate-700"
                >
                  {copiedId === template.id ? (
                    <>
                      <Check className="w-3 h-3 text-emerald-400" />
                      <span className="text-emerald-400">Copied</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3 h-3" />
                      <span>Copy</span>
                    </>
                  )}
                </button>

                <button
                  onClick={() => {
                    onSelectForBroadcast(template);
                    onOpenMessageAll();
                  }}
                  className="flex-1 py-1.5 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs rounded-lg flex items-center justify-center gap-1 transition-colors shadow-sm"
                >
                  <Send className="w-3 h-3 fill-current" />
                  <span>Use in "Message All"</span>
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
