import React, { useState } from 'react';
import { 
  FileText, 
  X, 
  Search, 
  Plus, 
  Download, 
  Sparkles, 
  Copy, 
  Check, 
  ExternalLink, 
  Phone, 
  MessageSquare, 
  Trash2, 
  Send
} from 'lucide-react';
import { Template, TemplateCategory, TemplateButton } from '../types';

interface TemplateManagerModalProps {
  isOpen: boolean;
  onClose: () => void;
  templates: Template[];
  onSelectTemplateForBroadcast: (template: Template) => void;
  onSaveTemplate: (newTemplate: Template) => void;
  onDeleteTemplate: (templateId: string) => void;
}

export const TemplateManagerModal: React.FC<TemplateManagerModalProps> = ({
  isOpen,
  onClose,
  templates,
  onSelectTemplateForBroadcast,
  onSaveTemplate,
  onDeleteTemplate
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<TemplateCategory | 'All'>('All');
  const [selectedTemplate, setSelectedTemplate] = useState<Template | null>(templates[0] || null);
  const [isCreating, setIsCreating] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // New template form state
  const [newTitle, setNewTitle] = useState('');
  const [newCategory, setNewCategory] = useState<TemplateCategory>('Masterclass & Training');
  const [newContent, setNewContent] = useState('');
  const [newButtons, setNewButtons] = useState<TemplateButton[]>([
    { type: 'url', label: 'Claim Offer Now 🚀', value: 'https://whatsblast.io' }
  ]);

  if (!isOpen) return null;

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
    const matchesQuery =
      t.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.category.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesQuery;
  });

  const handleCopyContent = (t: Template) => {
    navigator.clipboard.writeText(t.content);
    setCopiedId(t.id);
    setTimeout(() => setCopiedId(null), 2000);
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

  const handleInsertTag = (tag: string) => {
    setNewContent((prev) => prev + ` {{${tag}}}`);
  };

  const handleAddButton = () => {
    if (newButtons.length < 3) {
      setNewButtons([...newButtons, { type: 'quick_reply', label: 'Reply YES', value: 'YES' }]);
    }
  };

  const handleRemoveButton = (index: number) => {
    setNewButtons(newButtons.filter((_, i) => i !== index));
  };

  const handleUpdateButton = (index: number, field: keyof TemplateButton, value: string) => {
    const updated = [...newButtons];
    updated[index] = { ...updated[index], [field]: value };
    setNewButtons(updated);
  };

  const handleSaveNewTemplate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim() || !newContent.trim()) return;

    // Detect variables automatically like {{name}}, {{company}}
    const detectedVars = Array.from(
      new Set(
        (newContent.match(/\{\{([a-zA-Z0-9_]+)\}\}/g) || []).map((v) =>
          v.replace(/[{}]/g, '')
        )
      )
    );

    const created: Template = {
      id: `tmpl-custom-${Date.now()}`,
      title: newTitle.trim(),
      category: newCategory,
      content: newContent.trim(),
      buttons: newButtons.length > 0 ? newButtons : undefined,
      variables: detectedVars.length > 0 ? detectedVars : ['name', 'company'],
      createdDate: new Date().toISOString().slice(0, 10),
      isCustom: true,
      conversionRate: 'New'
    };

    onSaveTemplate(created);
    setSelectedTemplate(created);
    setIsCreating(false);
    // Reset form
    setNewTitle('');
    setNewContent('');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/85 backdrop-blur-md animate-in fade-in duration-150">
      <div className="w-full max-w-5xl h-[88vh] bg-slate-900 border border-slate-700/80 rounded-2xl shadow-2xl flex flex-col overflow-hidden">
        {/* Top Header */}
        <div className="px-6 py-4 border-b border-slate-800 bg-slate-900/90 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500/15 border border-amber-500/30 flex items-center justify-center text-amber-400">
              <FileText className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-lg font-bold text-white tracking-tight">WhatsApp Templates Suite</h2>
                <span className="px-2 py-0.5 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                  {templates.length} Ready Frameworks
                </span>
              </div>
              <p className="text-xs text-slate-400">
                12+ conversion-tested copy structures, interactive CTA buttons, and dynamic tag injection.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleExportJSON}
              className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 text-xs font-medium flex items-center gap-1.5 transition-colors"
            >
              <Download className="w-3.5 h-3.5 text-purple-400" />
              <span>Export JSON</span>
            </button>
            <button
              onClick={() => setIsCreating(true)}
              className="px-3 py-1.5 rounded-lg bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-semibold text-xs flex items-center gap-1.5 transition-colors shadow-sm"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>New Template</span>
            </button>
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white border border-slate-700 transition-colors ml-2"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Content Body */}
        <div className="flex-1 flex flex-col md:flex-row min-h-0">
          {/* Left Sidebar: Catalog & Categories */}
          <div className="w-full md:w-80 border-r border-slate-800 bg-slate-950/50 flex flex-col min-h-0">
            {/* Search & Category Filter */}
            <div className="p-3 border-b border-slate-800 space-y-2">
              <div className="relative">
                <Search className="w-3.5 h-3.5 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Search templates..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-8 pr-3 py-1.5 bg-slate-900 border border-slate-700/80 rounded-lg text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500"
                />
              </div>

              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value as TemplateCategory | 'All')}
                className="w-full bg-slate-900 border border-slate-700/80 rounded-lg px-2.5 py-1.5 text-xs text-slate-200 focus:outline-none focus:border-emerald-500"
              >
                {categories.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </div>

            {/* Template list */}
            <div className="flex-1 overflow-y-auto p-2 space-y-1.5">
              {filteredTemplates.length === 0 ? (
                <div className="text-center py-8 text-xs text-slate-500">
                  No matching templates
                </div>
              ) : (
                filteredTemplates.map((t) => {
                  const isSelected = selectedTemplate?.id === t.id;
                  return (
                    <div
                      key={t.id}
                      onClick={() => {
                        setSelectedTemplate(t);
                        setIsCreating(false);
                      }}
                      className={`p-2.5 rounded-xl cursor-pointer transition-all border ${
                        isSelected
                          ? 'bg-emerald-500/10 border-emerald-500/40 text-white shadow-sm'
                          : 'bg-slate-900/60 hover:bg-slate-850 border-slate-800/80 text-slate-300'
                      }`}
                    >
                      <div className="flex items-start justify-between gap-1">
                        <span className="text-xs font-semibold line-clamp-1">{t.title}</span>
                        {t.conversionRate && (
                          <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-slate-800 text-emerald-400 shrink-0">
                            {t.conversionRate}
                          </span>
                        )}
                      </div>
                      <span className="text-[10px] text-slate-400 mt-1 inline-block">
                        {t.category}
                      </span>
                      <p className="text-[11px] text-slate-500 line-clamp-2 mt-1 font-sans">
                        {t.content.replace(/[\n\r]+/g, ' ')}
                      </p>
                    </div>
                  );
                })
              )}
            </div>
          </div>

          {/* Right Area: Preview or Create Form */}
          <div className="flex-1 flex flex-col min-h-0 bg-slate-900 overflow-y-auto p-6">
            {isCreating ? (
              /* Create Template Form */
              <form onSubmit={handleSaveNewTemplate} className="space-y-4 max-w-2xl">
                <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                  <div>
                    <h3 className="text-base font-bold text-white flex items-center gap-2">
                      <Sparkles className="w-4 h-4 text-emerald-400" />
                      Create Custom WhatsApp Template
                    </h3>
                    <p className="text-xs text-slate-400 mt-0.5">
                      Define custom copy, interactive buttons, and auto-interpolated recipient variables.
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => setIsCreating(false)}
                    className="text-xs text-slate-400 hover:text-white"
                  >
                    Cancel
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-medium text-slate-300 mb-1">
                      Template Title *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Q4 Executive Masterclass Invite"
                      value={newTitle}
                      onChange={(e) => setNewTitle(e.target.value)}
                      className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-lg text-xs text-white focus:outline-none focus:border-emerald-500"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-slate-300 mb-1">
                      Category
                    </label>
                    <select
                      value={newCategory}
                      onChange={(e) => setNewCategory(e.target.value as TemplateCategory)}
                      className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-lg text-xs text-white focus:outline-none focus:border-emerald-500"
                    >
                      {categories.filter((c) => c !== 'All').map((c) => (
                        <option key={c} value={c}>
                          {c}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Variable inserter bar */}
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <label className="text-xs font-medium text-slate-300">
                      Message Body *
                    </label>
                    <span className="text-[11px] text-slate-500">
                      Click tags to insert into copy
                    </span>
                  </div>

                  <div className="flex flex-wrap gap-1.5 mb-2">
                    {['name', 'company', 'course', 'phone', 'discount', 'date', 'link'].map((tag) => (
                      <button
                        type="button"
                        key={tag}
                        onClick={() => handleInsertTag(tag)}
                        className="px-2 py-0.5 rounded-md bg-slate-800 hover:bg-slate-700 border border-slate-700 text-[11px] font-mono text-emerald-400 hover:text-emerald-300 transition-colors"
                      >
                        +&#123;&#123;{tag}&#125;&#125;
                      </button>
                    ))}
                  </div>

                  <textarea
                    rows={7}
                    required
                    placeholder="Type your WhatsApp message here with personalized tags like {{name}} or {{company}}..."
                    value={newContent}
                    onChange={(e) => setNewContent(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-lg text-xs text-white font-sans focus:outline-none focus:border-emerald-500"
                  />
                </div>

                {/* Interactive CTA Buttons */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label className="text-xs font-medium text-slate-300">
                      Interactive WhatsApp CTA Buttons ({newButtons.length}/3)
                    </label>
                    {newButtons.length < 3 && (
                      <button
                        type="button"
                        onClick={handleAddButton}
                        className="text-xs text-emerald-400 hover:text-emerald-300 flex items-center gap-1 font-medium"
                      >
                        <Plus className="w-3.5 h-3.5" /> Add Button
                      </button>
                    )}
                  </div>

                  <div className="space-y-2">
                    {newButtons.map((btn, index) => (
                      <div
                        key={index}
                        className="flex items-center gap-2 bg-slate-950 p-2 rounded-lg border border-slate-800"
                      >
                        <select
                          value={btn.type}
                          onChange={(e) =>
                            handleUpdateButton(index, 'type', e.target.value as 'url' | 'call' | 'quick_reply')
                          }
                          className="bg-slate-900 border border-slate-700 rounded text-xs px-2 py-1 text-slate-200"
                        >
                          <option value="url">Link / URL</option>
                          <option value="call">Call Phone</option>
                          <option value="quick_reply">Quick Reply</option>
                        </select>
                        <input
                          type="text"
                          placeholder="Button Label (e.g. Claim Seat)"
                          value={btn.label}
                          onChange={(e) => handleUpdateButton(index, 'label', e.target.value)}
                          className="flex-1 bg-slate-900 border border-slate-700 rounded text-xs px-2 py-1 text-white"
                        />
                        <input
                          type="text"
                          placeholder="Target URL or Phone"
                          value={btn.value}
                          onChange={(e) => handleUpdateButton(index, 'value', e.target.value)}
                          className="flex-1 bg-slate-900 border border-slate-700 rounded text-xs px-2 py-1 text-white"
                        />
                        <button
                          type="button"
                          onClick={() => handleRemoveButton(index)}
                          className="p-1 text-slate-500 hover:text-rose-400"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-2 flex items-center gap-2">
                  <button
                    type="submit"
                    className="px-4 py-2 bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-bold text-xs rounded-lg transition-colors flex items-center gap-1.5 shadow-sm"
                  >
                    <Check className="w-3.5 h-3.5" /> Save & Add to Catalog
                  </button>
                  <button
                    type="button"
                    onClick={() => setIsCreating(false)}
                    className="px-3 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs rounded-lg transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            ) : selectedTemplate ? (
              /* Selected Template Detail View */
              <div className="space-y-5 max-w-2xl">
                <div className="flex items-start justify-between gap-4 pb-4 border-b border-slate-800">
                  <div>
                    <div className="flex items-center gap-2 flex-wrap">
                      <h3 className="text-lg font-bold text-white tracking-tight">
                        {selectedTemplate.title}
                      </h3>
                      {selectedTemplate.isCustom && (
                        <span className="px-2 py-0.5 rounded text-[10px] bg-sky-500/10 text-sky-400 border border-sky-500/20 font-mono">
                          Custom
                        </span>
                      )}
                    </div>
                    <div className="flex items-center gap-3 text-xs text-slate-400 mt-1">
                      <span className="px-2 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700">
                        {selectedTemplate.category}
                      </span>
                      <span>Created: {selectedTemplate.createdDate}</span>
                      {selectedTemplate.conversionRate && (
                        <span className="text-emerald-400 font-medium">
                          Avg Conversion: {selectedTemplate.conversionRate}
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <button
                      onClick={() => handleCopyContent(selectedTemplate)}
                      className="px-2.5 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 text-xs rounded-lg flex items-center gap-1.5 transition-colors"
                    >
                      {copiedId === selectedTemplate.id ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-emerald-400" />
                          <span className="text-emerald-400">Copied</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5" />
                          <span>Copy</span>
                        </>
                      )}
                    </button>
                    {selectedTemplate.isCustom && (
                      <button
                        onClick={() => onDeleteTemplate(selectedTemplate.id)}
                        className="p-1.5 bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 border border-rose-500/30 text-xs rounded-lg transition-colors"
                        title="Delete template"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                </div>

                {/* Simulated WhatsApp Chat Bubble */}
                <div>
                  <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider block mb-2">
                    WhatsApp Message Preview
                  </span>
                  <div className="bg-[#0b141a] p-4 rounded-2xl border border-slate-800 max-w-md shadow-inner">
                    <div className="bg-[#005c4b] text-[#e9edef] rounded-2xl rounded-tl-none p-3.5 shadow text-xs whitespace-pre-wrap leading-relaxed relative font-sans">
                      {selectedTemplate.content}
                      <span className="text-[10px] text-emerald-200/60 float-right mt-2 ml-2">
                        10:45 AM &bull; ✓✓
                      </span>
                    </div>

                    {/* Interactive CTA buttons preview */}
                    {selectedTemplate.buttons && selectedTemplate.buttons.length > 0 && (
                      <div className="mt-2 space-y-1">
                        {selectedTemplate.buttons.map((btn, bIdx) => (
                          <div
                            key={bIdx}
                            className="bg-[#202c33] hover:bg-[#2a3942] text-[#00a884] font-medium text-xs py-2 px-3 rounded-lg flex items-center justify-center gap-2 border border-slate-700/40 shadow-sm cursor-default"
                          >
                            {btn.type === 'url' && <ExternalLink className="w-3.5 h-3.5" />}
                            {btn.type === 'call' && <Phone className="w-3.5 h-3.5" />}
                            {btn.type === 'quick_reply' && <MessageSquare className="w-3.5 h-3.5" />}
                            <span>{btn.label}</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                {/* Variables detected */}
                <div>
                  <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider block mb-2">
                    Dynamic Variables Required ({selectedTemplate.variables.length})
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {selectedTemplate.variables.map((v) => (
                      <span
                        key={v}
                        className="px-2.5 py-1 rounded-lg bg-slate-800 text-emerald-400 font-mono text-xs border border-slate-700 flex items-center gap-1"
                      >
                        <span>&#123;&#123;{v}&#125;&#125;</span>
                      </span>
                    ))}
                  </div>
                </div>

                {/* Primary Action Button */}
                <div className="pt-4 border-t border-slate-800 flex items-center gap-3">
                  <button
                    onClick={() => {
                      onSelectTemplateForBroadcast(selectedTemplate);
                      onClose();
                    }}
                    className="px-5 py-2.5 bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-bold text-xs rounded-xl flex items-center gap-2 transition-colors shadow-lg shadow-emerald-500/20"
                  >
                    <Send className="w-4 h-4" />
                    <span>Use in "Message All" Broadcaster [M]</span>
                  </button>
                  <span className="text-xs text-slate-400">
                    Instantly loads this copy into the personalized broadcasting engine.
                  </span>
                </div>
              </div>
            ) : (
              <div className="h-full flex items-center justify-center text-slate-500 text-sm">
                Select a template from the left catalog to inspect or edit.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
