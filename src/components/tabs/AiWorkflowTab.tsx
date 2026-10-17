import React, { useState } from 'react';
import { 
  Bot, 
  Copy, 
  Check, 
  Send, 
  Sparkles, 
  Workflow, 
  Calendar, 
  Clock, 
  ArrowRight, 
  User, 
  ShieldCheck, 
  ExternalLink,
  MessageSquare
} from 'lucide-react';

export const AiWorkflowTab: React.FC = () => {
  const [copiedPrompt, setCopiedPrompt] = useState(false);
  const [userTestMessage, setUserTestMessage] = useState('');
  const [chatHistory, setChatHistory] = useState<Array<{ sender: 'user' | 'bot'; text: string; time: string }>>([
    {
      sender: 'bot',
      text: 'Namaste! Welcome to Shri Shyam Consulting. How may I assist you today with our HR Staffing, Corporate Training, or AI & Robotics programs?',
      time: '10:00 AM'
    }
  ]);
  const [activeDripDay, setActiveDripDay] = useState<number>(1);

  const SYSTEM_PROMPT = `You are an intelligent, polite, and professional AI Assistant for Shri Shyam Consulting.
Your primary goal is to answer inquiries, assist with admission and recruitment queries, and guide users to take the next step.

COMPANY HIGHLIGHTS:
- Services: HR Staffing & Recruitment, Corporate Training, AI/ML & Robotics Educational Programs, and Business Automation Solutions.
- Contact: Professional team support available for recruitment mandates and course admissions.

TONE & BEHAVIOR RULES:
1. Always maintain a warm, welcoming, and professional tone.
2. Keep answers concise (under 3-4 sentences whenever possible) for WhatsApp readability.
3. If a user asks about course admissions, direct them to register or request a callback from an academic counselor.
4. If a user asks about hiring or recruitment services, offer to collect their company name and active position details to arrange a client call.`;

  const handleCopyPrompt = () => {
    navigator.clipboard.writeText(SYSTEM_PROMPT);
    setCopiedPrompt(true);
    setTimeout(() => setCopiedPrompt(false), 2000);
  };

  const handleSendTestMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!userTestMessage.trim()) return;

    const userText = userTestMessage.trim();
    const currentTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    // Append user message
    const updated = [...chatHistory, { sender: 'user' as const, text: userText, time: currentTime }];
    setChatHistory(updated);
    setUserTestMessage('');

    // Simulate smart AI response matching the system rules
    setTimeout(() => {
      let botResponse = '';
      const lower = userText.toLowerCase();

      if (lower.includes('course') || lower.includes('admission') || lower.includes('ai') || lower.includes('python') || lower.includes('robotics')) {
        botResponse = `We would be thrilled to have you join our upcoming batch! Our interactive masterclass covers Generative AI, Python for ML, and Robotics. Would you like me to share the enrollment link, or have our Academic Counselor call you today?`;
      } else if (lower.includes('hiring') || lower.includes('staffing') || lower.includes('recruitment') || lower.includes('talent') || lower.includes('candidate')) {
        botResponse = `At Shri Shyam Consulting, we provide specialized end-to-end recruitment for Tech (IT/AI) as well as Corporate Pan-India Non-IT, White-collar and Blue-collar talent. Could you share your company name and the active designations you need to fill?`;
      } else if (lower.includes('fee') || lower.includes('cost') || lower.includes('price')) {
        botResponse = `We are currently offering early-bird grant vouchers for our training cohorts, and highly flexible success-based terms for corporate staffing. May I have your WhatsApp number or email to send the detailed schedule?`;
      } else {
        botResponse = `Thank you for reaching out to Shri Shyam Consulting! We specialize in Corporate Staffing & Recruitment, AI/Robotics Training, and Enterprise Business Automation. How can we best support your goals today?`;
      }

      setChatHistory([
        ...updated,
        {
          sender: 'bot' as const,
          text: botResponse,
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
      ]);
    }, 600);
  };

  const dripSteps = [
    {
      day: 1,
      title: 'Day 1: Send Brochure / Syllabus PDF',
      summary: 'Automated 12-hour follow-up delivering comprehensive course curriculum and candidate placement deck.',
      copy: `Hi {{name}}, here is your comprehensive curriculum and hiring deck as promised: 📂 https://shrishyam.in/assets/2026-deck.pdf. Take a look and let us know which track interests you!`
    },
    {
      day: 2,
      title: 'Day 2: Share Testimonials & Client Placement Case Study',
      summary: 'Social proof message demonstrating how peers achieved 3x salary growth or 72-hour recruitment turnaround.',
      copy: `Hey {{name}}! Wondering what real graduates and corporate clients achieve? 🌟 Read how 45+ candidates recently transitioned into AI roles with 50% average CTC hikes: https://shrishyam.in/case-studies`
    },
    {
      day: 3,
      title: 'Day 3: Send Final Call-to-Action Link & Early-Bird Grant',
      summary: 'Urgency driver offering limited-seat voucher expiring in 24 hours.',
      copy: `⚡ Final reminder, {{name}}: Your priority seat and early-bird scholarship expire tonight at 11:59 PM. Lock your slot before public registration opens: https://shrishyam.in/enroll`
    }
  ];

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Top Header */}
      <div className="bg-slate-900/90 border border-slate-800 p-5 rounded-2xl shadow-xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-xl bg-purple-500/15 border border-purple-500/30 flex items-center justify-center text-purple-400">
              <Bot className="w-5 h-5" />
            </div>
            <div>
              <h1 className="text-lg font-bold text-white tracking-tight flex items-center gap-2">
                AI Chatbot Agent & Multi-Step Drip Workflow Studio
              </h1>
              <p className="text-xs text-slate-400">
                Official Shri Shyam Consulting system prompt, 24/7 simulator, and automated multi-day drip funnel.
              </p>
            </div>
          </div>
        </div>

        <button
          onClick={handleCopyPrompt}
          className="px-4 py-2 bg-purple-500/20 hover:bg-purple-500/30 text-purple-300 border border-purple-500/40 font-bold text-xs rounded-xl flex items-center gap-1.5 transition-colors"
        >
          {copiedPrompt ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
          <span>{copiedPrompt ? 'Copied Prompt!' : 'Copy System Prompt for API'}</span>
        </button>
      </div>

      {/* Two Column Grid: Prompt Configuration & Live Simulator */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Official System Prompt (6 cols) */}
        <div className="lg:col-span-6 bg-slate-900/90 border border-slate-800 rounded-2xl p-5 space-y-4 flex flex-col justify-between">
          <div className="space-y-3">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-purple-400" />
                <h2 className="text-sm font-bold text-white uppercase tracking-wider">
                  AI Chatbot Agent System Prompt
                </h2>
              </div>
              <span className="text-[10px] font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                Ready for Lebin / Wati / Funlecs
              </span>
            </div>

            <p className="text-xs text-slate-400 leading-relaxed">
              Copy and paste this system prompt into your WhatsApp Cloud API / AI Agent platform knowledge base so it automatically responds 24/7 to prospective students and corporate hiring clients.
            </p>

            <div className="bg-slate-950 p-4 rounded-xl border border-slate-800/80 font-mono text-xs text-slate-300 whitespace-pre-wrap leading-relaxed max-h-96 overflow-y-auto selection:bg-purple-500 selection:text-white">
              {SYSTEM_PROMPT}
            </div>
          </div>

          <div className="pt-3 border-t border-slate-800 flex items-center justify-between">
            <span className="text-[11px] text-slate-500">
              Optimized for WhatsApp character limits (under 3-4 sentences).
            </span>
            <button
              onClick={handleCopyPrompt}
              className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 rounded-lg text-xs font-semibold flex items-center gap-1.5"
            >
              {copiedPrompt ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span>Copy</span>
            </button>
          </div>
        </div>

        {/* Right Column: Live 24/7 Simulator (6 cols) */}
        <div className="lg:col-span-6 bg-slate-900/90 border border-slate-800 rounded-2xl p-5 flex flex-col justify-between space-y-4">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <div className="flex items-center gap-2">
              <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
              <h2 className="text-sm font-bold text-white uppercase tracking-wider">
                Live 24/7 WhatsApp AI Simulator
              </h2>
            </div>
            <span className="text-xs text-slate-400 font-mono">
              Shri Shyam Auto-Responder
            </span>
          </div>

          {/* Chat Window */}
          <div className="bg-[#0b141a] p-4 rounded-2xl border border-slate-800 flex-1 min-h-[300px] max-h-[360px] overflow-y-auto space-y-3 shadow-inner">
            {chatHistory.map((msg, i) => (
              <div
                key={i}
                className={`flex flex-col ${
                  msg.sender === 'user' ? 'items-end' : 'items-start'
                }`}
              >
                <div
                  className={`max-w-[85%] rounded-2xl p-3 text-xs leading-relaxed shadow font-sans ${
                    msg.sender === 'user'
                      ? 'bg-[#005c4b] text-[#e9edef] rounded-tr-none'
                      : 'bg-[#202c33] text-[#e9edef] rounded-tl-none'
                  }`}
                >
                  <p>{msg.text}</p>
                  <span className="text-[9px] text-slate-400 float-right mt-1 ml-2">
                    {msg.time} &bull; ✓✓
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Chat Input */}
          <form onSubmit={handleSendTestMessage} className="flex gap-2">
            <input
              type="text"
              placeholder="Ask about admissions, recruitment, or course fee..."
              value={userTestMessage}
              onChange={(e) => setUserTestMessage(e.target.value)}
              className="flex-1 bg-slate-950 border border-slate-700/80 rounded-xl px-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-purple-500"
            />
            <button
              type="submit"
              className="px-4 py-2 bg-purple-500 hover:bg-purple-600 text-white font-bold text-xs rounded-xl flex items-center gap-1.5 transition-colors"
            >
              <Send className="w-3.5 h-3.5" />
              <span>Send</span>
            </button>
          </form>
        </div>
      </div>

      {/* Recommended Campaign Workflow & Drip Flow Visualizer */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 space-y-5 shadow-xl">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <div className="flex items-center gap-2">
            <Workflow className="w-5 h-5 text-emerald-400" />
            <div>
              <h2 className="text-sm font-bold text-white uppercase tracking-wider">
                Recommended WhatsApp Automation Funnel
              </h2>
              <p className="text-xs text-slate-400">
                End-to-end user journey from initial lead trigger to high-ticket conversion.
              </p>
            </div>
          </div>
        </div>

        {/* ASCII Workflow Diagram Card */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
            <span className="text-[10px] uppercase font-mono text-emerald-400 font-bold">Step 1</span>
            <h4 className="text-xs font-bold text-white">Lead Enters / Inbounds</h4>
            <p className="text-[11px] text-slate-400">
              User clicks WhatsApp ad or sends incoming greeting like "Hi", "Admissions", or "Staffing".
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
            <span className="text-[10px] uppercase font-mono text-sky-400 font-bold">Step 2</span>
            <h4 className="text-xs font-bold text-white">Instant Auto-Response</h4>
            <p className="text-[11px] text-slate-400">
              Zero-delay welcome message dispatched via WhatsApp Cloud API webhook.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
            <span className="text-[10px] uppercase font-mono text-purple-400 font-bold">Step 3</span>
            <h4 className="text-xs font-bold text-white">AI Agent Interaction (24/7)</h4>
            <p className="text-[11px] text-slate-400">
              Handles candidate questions, collects company CTC budget, and books callback.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
            <span className="text-[10px] uppercase font-mono text-amber-400 font-bold">Step 4</span>
            <h4 className="text-xs font-bold text-white">3-Day Follow-Up Drip</h4>
            <p className="text-[11px] text-slate-400">
              Automated sequence sending brochure, placement proof, and final registration offer.
            </p>
          </div>
        </div>

        {/* 3-Day Drip Sequence Preview */}
        <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-3">
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4 text-emerald-400" />
            <span className="text-xs font-bold text-white">Follow-Up Drip Flow Configuration</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {dripSteps.map((step) => (
              <div
                key={step.day}
                onClick={() => setActiveDripDay(step.day)}
                className={`p-3 rounded-xl border cursor-pointer transition-all ${
                  activeDripDay === step.day
                    ? 'bg-emerald-500/10 border-emerald-500/40 text-white shadow-sm'
                    : 'bg-slate-900 border-slate-800/80 text-slate-400 hover:text-white'
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs font-bold text-emerald-400">Day 0{step.day}</span>
                  <Clock className="w-3.5 h-3.5 text-slate-500" />
                </div>
                <h5 className="text-xs font-semibold text-white mb-1">{step.title}</h5>
                <p className="text-[11px] text-slate-400 leading-snug">{step.summary}</p>
                <div className="mt-2 p-2 bg-slate-950 rounded-lg text-[10px] font-sans text-slate-300 border border-slate-800/80">
                  {step.copy}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
