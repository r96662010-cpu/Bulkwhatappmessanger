import React, { useState } from 'react';
import { 
  FileSpreadsheet, 
  Users, 
  PhoneCall, 
  Briefcase, 
  CreditCard, 
  Plus, 
  Download, 
  Search, 
  Send, 
  CheckCircle2, 
  Clock, 
  AlertCircle, 
  FileText, 
  Trash2, 
  Edit3, 
  Check, 
  ExternalLink,
  MessageSquare,
  Sparkles,
  Phone
} from 'lucide-react';
import { Candidate, JobDescription } from '../../types';
import { INITIAL_JDS } from '../../data/sampleJDs';

interface RecruitmentTabProps {
  candidates: Candidate[];
  onUpdateCandidates: (candidates: Candidate[]) => void;
  onSendDirectWhatsApp: (phone: string, text: string) => void;
}

export const RecruitmentTab: React.FC<RecruitmentTabProps> = ({
  candidates,
  onUpdateCandidates,
  onSendDirectWhatsApp
}) => {
  const [activeProfileTab, setActiveProfileTab] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [showAddCandidate, setShowAddCandidate] = useState(false);
  const [showJDManager, setShowJDManager] = useState(false);
  const [showCallFollowUpModal, setShowCallFollowUpModal] = useState<Candidate | null>(null);
  const [showPaymentModal, setShowPaymentModal] = useState<Candidate | null>(null);

  // Job Descriptions state
  const [jds, setJds] = useState<JobDescription[]>(INITIAL_JDS);
  const [newJdTitle, setNewJdTitle] = useState('');
  const [newJdSalary, setNewJdSalary] = useState('');
  const [newJdExp, setNewJdExp] = useState('');
  const [newJdSkills, setNewJdSkills] = useState('');
  const [newJdCategory, setNewJdCategory] = useState('IT & AI');
  const [showNewJdForm, setShowNewJdForm] = useState(false);

  // New candidate form
  const [newCand, setNewCand] = useState<Omit<Candidate, 'id' | 'addedDate'>>({
    name: '',
    phone: '',
    email: '',
    profileCategory: 'IT & AI',
    currentRole: '',
    currentCTC: '₹8.0 LPA',
    expectedCTC: '₹12.0 LPA',
    experienceYears: '3.5 Years',
    noticePeriodDays: '15 Days',
    cvFileName: 'Resume_2026.pdf',
    status: 'Screening',
    lastCallStatus: 'Connected',
    callNotes: '',
    paymentStatus: 'Pending',
    paymentAmount: '₹15,000'
  });

  // Calling follow-up message state
  const [callNotesInput, setCallNotesInput] = useState('');
  const [callStatusSelect, setCallStatusSelect] = useState<'Connected' | 'Follow-up Needed' | 'Busy' | 'Offer Discussion'>('Connected');

  // Filter candidates
  const filteredCandidates = candidates.filter((c) => {
    const matchesCat = activeProfileTab === 'All' || c.profileCategory === activeProfileTab;
    const q = searchQuery.toLowerCase();
    const matchesSearch =
      c.name.toLowerCase().includes(q) ||
      c.currentRole.toLowerCase().includes(q) ||
      c.phone.includes(q) ||
      c.email.toLowerCase().includes(q) ||
      c.noticePeriodDays.toLowerCase().includes(q);
    return matchesCat && matchesSearch;
  });

  // Export to Excel / CSV
  const handleExportExcel = () => {
    const rows = [
      ['ID', 'Candidate Name', 'Phone', 'Email', 'Profile Category', 'Current Role', 'Current CTC', 'Expected CTC', 'Experience', 'Notice Period', 'CV File', 'Status', 'Last Call Status', 'Payment Status', 'Payment Amount', 'Notes'],
      ...candidates.map((c) => [
        c.id,
        `"${c.name}"`,
        `"${c.phone}"`,
        `"${c.email}"`,
        `"${c.profileCategory}"`,
        `"${c.currentRole}"`,
        `"${c.currentCTC}"`,
        `"${c.expectedCTC}"`,
        `"${c.experienceYears}"`,
        `"${c.noticePeriodDays}"`,
        `"${c.cvFileName}"`,
        c.status,
        c.lastCallStatus,
        c.paymentStatus,
        `"${c.paymentAmount}"`,
        `"${c.callNotes.replace(/"/g, '""')}"`
      ])
    ];

    const csvContent = 'data:text/csv;charset=utf-8,' + rows.map((e) => e.join(',')).join('\n');
    const encoded = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encoded);
    link.setAttribute('download', `shri_shyam_candidates_matrix_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    link.remove();
  };

  // Add Candidate
  const handleAddCandidateSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCand.name || !newCand.phone) return;

    const created: Candidate = {
      ...newCand,
      id: `cand-${Date.now()}`,
      addedDate: new Date().toISOString().slice(0, 10)
    };

    onUpdateCandidates([created, ...candidates]);
    setShowAddCandidate(false);
    setNewCand({
      name: '',
      phone: '',
      email: '',
      profileCategory: 'IT & AI',
      currentRole: '',
      currentCTC: '₹8.0 LPA',
      expectedCTC: '₹12.0 LPA',
      experienceYears: '3.5 Years',
      noticePeriodDays: '15 Days',
      cvFileName: 'Resume_2026.pdf',
      status: 'Screening',
      lastCallStatus: 'Connected',
      callNotes: '',
      paymentStatus: 'Pending',
      paymentAmount: '₹15,000'
    });
  };

  // Add new Job Description
  const handleAddNewJD = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newJdTitle) return;

    const createdJd: JobDescription = {
      id: `jd-${Date.now()}`,
      title: newJdTitle,
      category: newJdCategory,
      experience: newJdExp || '2 - 5 Years',
      salaryRange: newJdSalary || '₹6 - ₹12 LPA',
      location: 'Pan-India',
      openings: 5,
      skills: newJdSkills.split(',').map((s) => s.trim()).filter(Boolean),
      whatsappMessage: `💼 *Urgent Requirement: ${newJdTitle}*
🏢 Shri Shyam Consulting Partner Mandate
💰 CTC: ${newJdSalary || 'Best in Industry'}
⏱ Experience: ${newJdExp || '2-5 Years'}
🛠 Skills: ${newJdSkills}

👉 Reply with your updated CV to fast-track your profile for client interviews!`
    };

    setJds([createdJd, ...jds]);
    setNewJdTitle('');
    setNewJdSalary('');
    setNewJdExp('');
    setNewJdSkills('');
    setShowNewJdForm(false);
  };

  // Send Direct Calling Follow-up
  const handleSendCallFollowUp = (candidate: Candidate) => {
    const text = `Hello ${candidate.name},

Thank you for speaking with our Shri Shyam Consulting recruitment desk today regarding your profile as ${candidate.currentRole}. 📞

📌 Current Discussion Summary:
• Current CTC: ${candidate.currentCTC}
• Expected CTC: ${candidate.expectedCTC}
• Notice Period: ${candidate.noticePeriodDays}
• Next Step: ${callStatusSelect === 'Offer Discussion' ? 'Release Offer Letter' : 'Client Round Scheduling'}

Notes: ${callNotesInput || 'Profile submitted for final hiring manager evaluation.'}

Let us know if you need any assistance!`;

    onSendDirectWhatsApp(candidate.phone, text);
    // Update candidate notes
    onUpdateCandidates(
      candidates.map((c) =>
        c.id === candidate.id
          ? { ...c, lastCallStatus: callStatusSelect, callNotes: callNotesInput || c.callNotes }
          : c
      )
    );
    setShowCallFollowUpModal(null);
  };

  // Send Direct Payment Message
  const handleSendPaymentMessage = (candidate: Candidate) => {
    const text = `Dear ${candidate.name},

Greetings from Shri Shyam Consulting Accounts Desk. 🧾

Regarding the placement processing fee for your selected role (${candidate.currentRole}):
💰 Amount: ${candidate.paymentAmount}
📌 Status: ${candidate.paymentStatus}

Kindly settle via UPI: shrishyam@upi or online link: https://shrishyam.in/pay

Thank you!`;

    onSendDirectWhatsApp(candidate.phone, text);
    setShowPaymentModal(null);
  };

  // Send JD message to candidate directly
  const handleSendJDToCandidate = (jd: JobDescription, candidate: Candidate) => {
    const text = `Hi ${candidate.name},

We have an active mandate matching your profile in ${candidate.profileCategory}! 🌟

${jd.whatsappMessage}

Would you like us to submit your CV (${candidate.cvFileName}) with your expected CTC (${candidate.expectedCTC})?`;

    onSendDirectWhatsApp(candidate.phone, text);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Top Header Banner */}
      <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 bg-slate-900/90 border border-slate-800 p-5 rounded-2xl shadow-xl">
        <div>
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-xl bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
              <FileSpreadsheet className="w-5 h-5" />
            </div>
            <div>
              <h1 className="text-lg font-bold text-white tracking-tight flex items-center gap-2">
                Recruitment & AI Calling Excel Sheet CRM
                <span className="px-2 py-0.5 rounded-full text-[11px] font-semibold bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">
                  Shri Shyam Consulting
                </span>
              </h1>
              <p className="text-xs text-slate-400">
                Manage candidate CTCs, notice periods, CVs, AI calling follow-ups, job descriptions, and payment settlement messages.
              </p>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          <button
            onClick={() => setShowJDManager(!showJDManager)}
            className="px-3 py-2 bg-slate-800 hover:bg-slate-750 text-slate-200 border border-slate-700 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-colors"
          >
            <Briefcase className="w-3.5 h-3.5 text-amber-400" />
            <span>Job Descriptions ({jds.length})</span>
          </button>

          <button
            onClick={handleExportExcel}
            className="px-3 py-2 bg-slate-800 hover:bg-slate-750 text-slate-200 border border-slate-700 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-colors"
          >
            <Download className="w-3.5 h-3.5 text-purple-400" />
            <span>Export Excel (.csv)</span>
          </button>

          <button
            onClick={() => setShowAddCandidate(true)}
            className="px-4 py-2 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs rounded-xl flex items-center gap-1.5 transition-colors shadow-lg shadow-emerald-500/20"
          >
            <Plus className="w-4 h-4" />
            <span>+ Add Candidate Profile</span>
          </button>
        </div>
      </div>

      {/* JD Manager Drawer / Accordion */}
      {showJDManager && (
        <div className="bg-slate-900 border border-slate-700/80 rounded-2xl p-4 space-y-4 animate-in fade-in">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <div>
              <h2 className="text-sm font-bold text-white flex items-center gap-2">
                <Briefcase className="w-4 h-4 text-amber-400" />
                Active Job Descriptions & Direct WhatsApp Broadcast
              </h2>
              <p className="text-xs text-slate-400">
                Click any job description to instantly dispatch role details to candidates.
              </p>
            </div>
            <button
              onClick={() => setShowNewJdForm(!showNewJdForm)}
              className="px-3 py-1 bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 border border-amber-500/40 text-xs rounded-lg font-medium"
            >
              + Create New JD
            </button>
          </div>

          {/* New JD Form */}
          {showNewJdForm && (
            <form onSubmit={handleAddNewJD} className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-3">
              <span className="text-xs font-bold text-white">Create New Job Description</span>
              <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
                <input
                  type="text"
                  required
                  placeholder="Job Title *"
                  value={newJdTitle}
                  onChange={(e) => setNewJdTitle(e.target.value)}
                  className="px-3 py-1.5 bg-slate-900 border border-slate-700 rounded-lg text-xs text-white"
                />
                <input
                  type="text"
                  placeholder="Budget Salary (e.g. ₹10 - ₹18 LPA)"
                  value={newJdSalary}
                  onChange={(e) => setNewJdSalary(e.target.value)}
                  className="px-3 py-1.5 bg-slate-900 border border-slate-700 rounded-lg text-xs text-white"
                />
                <input
                  type="text"
                  placeholder="Experience (e.g. 3-5 Years)"
                  value={newJdExp}
                  onChange={(e) => setNewJdExp(e.target.value)}
                  className="px-3 py-1.5 bg-slate-900 border border-slate-700 rounded-lg text-xs text-white"
                />
                <select
                  value={newJdCategory}
                  onChange={(e) => setNewJdCategory(e.target.value)}
                  className="px-3 py-1.5 bg-slate-900 border border-slate-700 rounded-lg text-xs text-white"
                >
                  <option value="IT & AI">IT & AI</option>
                  <option value="Non-IT">Non-IT</option>
                  <option value="White Collar">White Collar</option>
                  <option value="Blue Collar">Blue Collar</option>
                </select>
              </div>
              <input
                type="text"
                placeholder="Key Skills (comma separated, e.g. Python, Docker, LangChain)"
                value={newJdSkills}
                onChange={(e) => setNewJdSkills(e.target.value)}
                className="w-full px-3 py-1.5 bg-slate-900 border border-slate-700 rounded-lg text-xs text-white"
              />
              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowNewJdForm(false)}
                  className="px-3 py-1 text-xs text-slate-400"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-xs rounded-lg"
                >
                  Save JD
                </button>
              </div>
            </form>
          )}

          {/* JDs List */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {jds.map((jd) => (
              <div key={jd.id} className="p-3 bg-slate-950 rounded-xl border border-slate-800 space-y-2">
                <div className="flex items-start justify-between">
                  <div>
                    <span className="text-[10px] font-mono uppercase px-1.5 py-0.5 rounded bg-slate-800 text-amber-400 border border-slate-700">
                      {jd.category}
                    </span>
                    <h4 className="text-xs font-bold text-white mt-1">{jd.title}</h4>
                  </div>
                  <span className="text-xs font-mono text-emerald-400 font-semibold">{jd.salaryRange}</span>
                </div>
                <div className="text-[11px] text-slate-400 flex items-center gap-2">
                  <span>Exp: {jd.experience}</span>
                  <span>&bull;</span>
                  <span>{jd.openings} Openings</span>
                </div>
                <div className="flex flex-wrap gap-1">
                  {jd.skills.map((s) => (
                    <span key={s} className="text-[10px] px-1.5 py-0.2 rounded bg-slate-900 text-slate-300 border border-slate-800">
                      {s}
                    </span>
                  ))}
                </div>
                <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between">
                  <span className="text-[10px] text-slate-500">Ready to broadcast via WhatsApp</span>
                  {candidates.length > 0 && (
                    <button
                      onClick={() => handleSendJDToCandidate(jd, candidates[0])}
                      className="px-2.5 py-1 bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 rounded-lg text-xs font-medium flex items-center gap-1"
                    >
                      <Send className="w-3 h-3" />
                      <span>Send to {candidates[0]?.name.split(' ')[0]}</span>
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Filter and Category Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 bg-slate-900/60 p-3 rounded-2xl border border-slate-800">
        <div className="relative flex-1 w-full">
          <Search className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search candidate by name, role, phone, notice period, or skills..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500"
          />
        </div>

        {/* Profile Categories */}
        <div className="flex items-center gap-1.5 w-full sm:w-auto overflow-x-auto pb-1 sm:pb-0">
          {['All', 'IT & AI', 'Non-IT', 'White Collar', 'Blue Collar'].map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveProfileTab(cat)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
                activeProfileTab === cat
                  ? 'bg-emerald-500 text-slate-950'
                  : 'bg-slate-800/80 hover:bg-slate-800 text-slate-400'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Add Candidate Modal */}
      {showAddCandidate && (
        <div className="p-5 bg-slate-900 border border-slate-700/80 rounded-2xl space-y-4 animate-in fade-in">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <Users className="w-4 h-4 text-emerald-400" />
              Add New Candidate Record (Excel Matrix)
            </h3>
            <button onClick={() => setShowAddCandidate(false)} className="text-xs text-slate-400 hover:text-white">
              ✕ Close
            </button>
          </div>

          <form onSubmit={handleAddCandidateSubmit} className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label className="text-[11px] text-slate-400 block mb-1">Full Name *</label>
              <input
                type="text"
                required
                placeholder="Candidate Full Name"
                value={newCand.name}
                onChange={(e) => setNewCand({ ...newCand, name: e.target.value })}
                className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-lg text-xs text-white"
              />
            </div>
            <div>
              <label className="text-[11px] text-slate-400 block mb-1">WhatsApp Phone *</label>
              <input
                type="text"
                required
                placeholder="+91 98XXX XXXXX"
                value={newCand.phone}
                onChange={(e) => setNewCand({ ...newCand, phone: e.target.value })}
                className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-lg text-xs text-white"
              />
            </div>
            <div>
              <label className="text-[11px] text-slate-400 block mb-1">Email</label>
              <input
                type="email"
                placeholder="candidate@email.com"
                value={newCand.email}
                onChange={(e) => setNewCand({ ...newCand, email: e.target.value })}
                className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-lg text-xs text-white"
              />
            </div>

            <div>
              <label className="text-[11px] text-slate-400 block mb-1">Profile Category</label>
              <select
                value={newCand.profileCategory}
                onChange={(e) => setNewCand({ ...newCand, profileCategory: e.target.value as Candidate['profileCategory'] })}
                className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-lg text-xs text-white"
              >
                <option value="IT & AI">IT & AI</option>
                <option value="Non-IT">Non-IT</option>
                <option value="White Collar">White Collar</option>
                <option value="Blue Collar">Blue Collar</option>
              </select>
            </div>
            <div>
              <label className="text-[11px] text-slate-400 block mb-1">Current Role / Designation</label>
              <input
                type="text"
                placeholder="e.g. AI Engineer, HR Lead, CNC Operator"
                value={newCand.currentRole}
                onChange={(e) => setNewCand({ ...newCand, currentRole: e.target.value })}
                className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-lg text-xs text-white"
              />
            </div>
            <div>
              <label className="text-[11px] text-slate-400 block mb-1">Experience</label>
              <input
                type="text"
                placeholder="e.g. 4.5 Years"
                value={newCand.experienceYears}
                onChange={(e) => setNewCand({ ...newCand, experienceYears: e.target.value })}
                className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-lg text-xs text-white"
              />
            </div>

            <div>
              <label className="text-[11px] text-slate-400 block mb-1">Current Salary / CTC</label>
              <input
                type="text"
                placeholder="e.g. ₹9.0 LPA"
                value={newCand.currentCTC}
                onChange={(e) => setNewCand({ ...newCand, currentCTC: e.target.value })}
                className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-lg text-xs text-white"
              />
            </div>
            <div>
              <label className="text-[11px] text-slate-400 block mb-1">Expected CTC (Exp ctc)</label>
              <input
                type="text"
                placeholder="e.g. ₹14.0 LPA"
                value={newCand.expectedCTC}
                onChange={(e) => setNewCand({ ...newCand, expectedCTC: e.target.value })}
                className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-lg text-xs text-white"
              />
            </div>
            <div>
              <label className="text-[11px] text-slate-400 block mb-1">Notice Period</label>
              <input
                type="text"
                placeholder="e.g. Immediate / 15 Days / 30 Days"
                value={newCand.noticePeriodDays}
                onChange={(e) => setNewCand({ ...newCand, noticePeriodDays: e.target.value })}
                className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-lg text-xs text-white"
              />
            </div>

            <div className="sm:col-span-3 flex justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={() => setShowAddCandidate(false)}
                className="px-3 py-1.5 text-xs text-slate-400"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-bold text-xs rounded-lg"
              >
                Save to Candidate Database
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Excel Sheet Table */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl overflow-hidden shadow-2xl">
        <div className="p-3.5 bg-slate-950 border-b border-slate-800 flex items-center justify-between text-xs text-slate-400">
          <div className="flex items-center gap-2">
            <span className="font-bold text-white">Candidates Database Spreadsheet</span>
            <span>&bull;</span>
            <span>{filteredCandidates.length} profiles displayed</span>
          </div>
          <span className="text-[11px] font-mono text-emerald-400">
            Encrypted AES-256 Storage
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-950/70 text-slate-400 font-semibold border-b border-slate-800 font-mono">
              <tr>
                <th className="py-3 px-4">Candidate & Contact</th>
                <th className="py-3 px-4">Category</th>
                <th className="py-3 px-4">Current Role</th>
                <th className="py-3 px-4">Current CTC</th>
                <th className="py-3 px-4 text-emerald-400">Exp CTC</th>
                <th className="py-3 px-4">Exp</th>
                <th className="py-3 px-4">Notice Period</th>
                <th className="py-3 px-4">CV</th>
                <th className="py-3 px-4">Calling Status</th>
                <th className="py-3 px-4">Payment</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 font-sans">
              {filteredCandidates.length === 0 ? (
                <tr>
                  <td colSpan={11} className="py-12 text-center text-slate-500">
                    No candidates found for selected category.
                  </td>
                </tr>
              ) : (
                filteredCandidates.map((cand) => (
                  <tr key={cand.id} className="hover:bg-slate-800/40 transition-colors">
                    {/* Candidate & Contact */}
                    <td className="py-3 px-4 whitespace-nowrap">
                      <div className="font-bold text-white">{cand.name}</div>
                      <div className="text-[11px] text-slate-400 font-mono flex items-center gap-1">
                        <Phone className="w-3 h-3 text-emerald-400" />
                        {cand.phone}
                      </div>
                    </td>

                    {/* Category */}
                    <td className="py-3 px-4 whitespace-nowrap">
                      <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-slate-800 text-slate-300 border border-slate-700">
                        {cand.profileCategory}
                      </span>
                    </td>

                    {/* Current Role */}
                    <td className="py-3 px-4 text-slate-200 font-medium">
                      {cand.currentRole}
                    </td>

                    {/* Current CTC */}
                    <td className="py-3 px-4 font-mono text-slate-300">
                      {cand.currentCTC}
                    </td>

                    {/* Expected CTC */}
                    <td className="py-3 px-4 font-mono font-bold text-emerald-400">
                      {cand.expectedCTC}
                    </td>

                    {/* Experience */}
                    <td className="py-3 px-4 text-slate-300 whitespace-nowrap">
                      {cand.experienceYears}
                    </td>

                    {/* Notice Period */}
                    <td className="py-3 px-4 whitespace-nowrap">
                      <span className={`px-2 py-0.5 rounded text-[10px] font-semibold ${
                        cand.noticePeriodDays.toLowerCase().includes('immediate')
                          ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                          : 'bg-slate-800 text-slate-300'
                      }`}>
                        {cand.noticePeriodDays}
                      </span>
                    </td>

                    {/* CV File */}
                    <td className="py-3 px-4 whitespace-nowrap">
                      <span className="text-[11px] text-sky-400 hover:underline flex items-center gap-1 cursor-pointer">
                        <FileText className="w-3 h-3" />
                        {cand.cvFileName}
                      </span>
                    </td>

                    {/* Calling Status */}
                    <td className="py-3 px-4 whitespace-nowrap">
                      <button
                        onClick={() => {
                          setShowCallFollowUpModal(cand);
                          setCallStatusSelect(cand.lastCallStatus as any);
                          setCallNotesInput(cand.callNotes);
                        }}
                        className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold bg-sky-500/10 text-sky-400 border border-sky-500/20 hover:bg-sky-500/20 transition-colors"
                      >
                        <PhoneCall className="w-3 h-3" />
                        <span>{cand.lastCallStatus}</span>
                      </button>
                    </td>

                    {/* Payment Status */}
                    <td className="py-3 px-4 whitespace-nowrap">
                      <button
                        onClick={() => setShowPaymentModal(cand)}
                        className={`inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-mono font-semibold ${
                          cand.paymentStatus === 'Settled'
                            ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                            : cand.paymentStatus === 'Advance Paid'
                            ? 'bg-sky-500/10 text-sky-400 border border-sky-500/20'
                            : 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                        }`}
                      >
                        <CreditCard className="w-3 h-3" />
                        <span>{cand.paymentAmount} ({cand.paymentStatus})</span>
                      </button>
                    </td>

                    {/* Actions */}
                    <td className="py-3 px-4 text-right whitespace-nowrap">
                      <div className="flex items-center justify-end gap-1.5">
                        <button
                          onClick={() => {
                            setShowCallFollowUpModal(cand);
                            setCallStatusSelect(cand.lastCallStatus as any);
                            setCallNotesInput(cand.callNotes);
                          }}
                          className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-sky-400"
                          title="Call Follow-up WhatsApp"
                        >
                          <PhoneCall className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => setShowPaymentModal(cand)}
                          className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-amber-400"
                          title="Send Payment Notice"
                        >
                          <CreditCard className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => onUpdateCandidates(candidates.filter((c) => c.id !== cand.id))}
                          className="p-1.5 rounded-lg bg-slate-800 hover:bg-rose-500/10 text-slate-400 hover:text-rose-400"
                          title="Delete Candidate"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Calling Follow-up Modal */}
      {showCallFollowUpModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in">
          <div className="w-full max-w-md bg-slate-900 border border-slate-700 rounded-2xl p-5 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div>
                <h3 className="text-sm font-bold text-white flex items-center gap-1.5">
                  <PhoneCall className="w-4 h-4 text-sky-400" />
                  AI Calling Follow-Up & WhatsApp Dispatch
                </h3>
                <p className="text-xs text-slate-400">
                  Target: {showCallFollowUpModal.name} ({showCallFollowUpModal.phone})
                </p>
              </div>
              <button onClick={() => setShowCallFollowUpModal(null)} className="text-xs text-slate-400">
                ✕
              </button>
            </div>

            <div>
              <label className="text-xs font-semibold text-slate-300 block mb-1">
                Call Outcome / Disposition
              </label>
              <select
                value={callStatusSelect}
                onChange={(e) => setCallStatusSelect(e.target.value as any)}
                className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2 text-xs text-white"
              >
                <option value="Connected">Connected & Discussed Requirements</option>
                <option value="Follow-up Needed">Follow-up Needed (Busy / Callback requested)</option>
                <option value="Offer Discussion">Offer Discussion / Salary Negotiation</option>
                <option value="Busy">Not Reachable / Busy</option>
              </select>
            </div>

            <div>
              <label className="text-xs font-semibold text-slate-300 block mb-1">
                Recruiter Notes & Discussion Summary
              </label>
              <textarea
                rows={3}
                placeholder="Candidate agreed to ₹16 LPA CTC, notice period 15 days..."
                value={callNotesInput}
                onChange={(e) => setCallNotesInput(e.target.value)}
                className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2 text-xs text-white"
              />
            </div>

            <div className="flex justify-end gap-2 pt-2 border-t border-slate-800">
              <button
                type="button"
                onClick={() => setShowCallFollowUpModal(null)}
                className="px-3 py-1.5 text-xs text-slate-400"
              >
                Cancel
              </button>
              <button
                onClick={() => handleSendCallFollowUp(showCallFollowUpModal)}
                className="px-4 py-2 bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-bold text-xs rounded-lg flex items-center gap-1.5"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Send WhatsApp Follow-Up</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Payment Settlement Modal */}
      {showPaymentModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in">
          <div className="w-full max-w-md bg-slate-900 border border-slate-700 rounded-2xl p-5 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div>
                <h3 className="text-sm font-bold text-white flex items-center gap-1.5">
                  <CreditCard className="w-4 h-4 text-amber-400" />
                  Candidate Payment & Fee Reminder
                </h3>
                <p className="text-xs text-slate-400">
                  Target: {showPaymentModal.name} ({showPaymentModal.phone})
                </p>
              </div>
              <button onClick={() => setShowPaymentModal(null)} className="text-xs text-slate-400">
                ✕
              </button>
            </div>

            <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 space-y-2 text-xs">
              <div className="flex justify-between">
                <span className="text-slate-400">Role:</span>
                <span className="text-white font-medium">{showPaymentModal.currentRole}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Fee Amount:</span>
                <span className="text-emerald-400 font-bold font-mono">{showPaymentModal.paymentAmount}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Status:</span>
                <span className="text-amber-400 font-semibold">{showPaymentModal.paymentStatus}</span>
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-2 border-t border-slate-800">
              <button
                type="button"
                onClick={() => setShowPaymentModal(null)}
                className="px-3 py-1.5 text-xs text-slate-400"
              >
                Cancel
              </button>
              <button
                onClick={() => handleSendPaymentMessage(showPaymentModal)}
                className="px-4 py-2 bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-bold text-xs rounded-lg flex items-center gap-1.5"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Send WhatsApp Payment Notice</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
