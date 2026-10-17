import React, { useState, useRef, useEffect } from 'react';
import { 
  Palette, 
  Video, 
  Search, 
  Download, 
  Send, 
  Sparkles, 
  Play, 
  Pause, 
  RefreshCw, 
  Check, 
  Copy, 
  ExternalLink,
  Layers,
  FileSpreadsheet,
  Globe,
  Youtube,
  PartyPopper,
  Calendar,
  Share2,
  Tv,
  MessageCircle,
  Hash,
  Volume2,
  Flame,
  ArrowRight,
  TrendingUp,
  Sliders
} from 'lucide-react';
import { Lead } from '../../types';
import { FESTIVAL_CAMPAIGNS, FestivalCampaign } from '../../data/sampleFestivals';

interface CreatorStudioTabProps {
  onAddLeadsToAudience: (newLeads: Lead[]) => void;
  onOpenMessageAll: () => void;
  onSelectTemplateForBroadcast?: (text: string) => void;
}

export const CreatorStudioTab: React.FC<CreatorStudioTabProps> = ({
  onAddLeadsToAudience,
  onOpenMessageAll,
  onSelectTemplateForBroadcast
}) => {
  const [activeSubTab, setActiveSubTab] = useState<'festivals' | 'poster' | 'video' | 'extractor'>('festivals');

  // --- Festival Content Manager State ---
  const [selectedFestivalId, setSelectedFestivalId] = useState<string>('diwali-2026');
  const [activeFestivalTab, setActiveFestivalTab] = useState<'whatsapp' | 'theme' | 'video' | 'social'>('whatsapp');
  const [copiedSection, setCopiedSection] = useState<string | null>(null);
  const [customHolidayName, setCustomHolidayName] = useState<string>('');
  const [customCampaigns, setCustomCampaigns] = useState<FestivalCampaign[]>([]);
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);

  // All campaigns (pre-loaded + user generated custom)
  const allCampaigns = [...customCampaigns, ...FESTIVAL_CAMPAIGNS];
  const activeCampaign = allCampaigns.find((c) => c.id === selectedFestivalId) || FESTIVAL_CAMPAIGNS[0];

  // --- Festival Poster Generator Canvas State ---
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [festival, setFestival] = useState(activeCampaign.name);
  const [headline, setHeadline] = useState('Wishing You Prosperity, Growth & Success!');
  const [subtext, setSubtext] = useState('Special 40% Festive Grant on AI, ML & Corporate Hiring Solutions');
  const [brandName, setBrandName] = useState('Shri Shyam Consulting');
  const [contactInfo, setContactInfo] = useState('+91 98765 43210 • www.shrishyam.in');
  const [themeGradient, setThemeGradient] = useState<'gold' | 'emerald' | 'saffron' | 'royal'>('gold');

  // Apply Festival Theme to Canvas Poster
  const handleApplyThemeToCanvas = (campaign: FestivalCampaign) => {
    setFestival(campaign.name);
    setHeadline(`Celebratory ${campaign.name} Special`);
    setSubtext(campaign.tagline);
    setThemeGradient(campaign.theme.gradientType);
    setActiveSubTab('poster');
  };

  // Render poster on canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const width = 800;
    const height = 800;
    canvas.width = width;
    canvas.height = height;

    // Background Gradient
    let grad = ctx.createLinearGradient(0, 0, width, height);
    if (themeGradient === 'gold') {
      grad.addColorStop(0, '#1c1917');
      grad.addColorStop(0.5, '#292524');
      grad.addColorStop(1, '#78350f');
    } else if (themeGradient === 'emerald') {
      grad.addColorStop(0, '#064e3b');
      grad.addColorStop(0.5, '#022c22');
      grad.addColorStop(1, '#0f172a');
    } else if (themeGradient === 'saffron') {
      grad.addColorStop(0, '#7c2d12');
      grad.addColorStop(0.5, '#431407');
      grad.addColorStop(1, '#1e1b4b');
    } else {
      grad.addColorStop(0, '#1e1b4b');
      grad.addColorStop(0.5, '#0f172a');
      grad.addColorStop(1, '#312e81');
    }

    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, width, height);

    // Decorative geometric patterns & sparkles
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.1)';
    ctx.lineWidth = 1;
    for (let i = 0; i < 8; i++) {
      ctx.beginPath();
      ctx.arc(width / 2, height / 2, 80 + i * 45, 0, Math.PI * 2);
      ctx.stroke();
    }

    // Sparkle stars
    ctx.fillStyle = '#fde047';
    for (let i = 0; i < 25; i++) {
      const sx = (Math.sin(i * 99) * 0.5 + 0.5) * width;
      const sy = (Math.cos(i * 77) * 0.5 + 0.5) * height;
      ctx.beginPath();
      ctx.arc(sx, sy, 2 + (i % 3), 0, Math.PI * 2);
      ctx.fill();
    }

    // Brand Badge Pill
    ctx.fillStyle = 'rgba(16, 185, 129, 0.2)';
    ctx.strokeStyle = 'rgba(16, 185, 129, 0.5)';
    ctx.lineWidth = 2;
    ctx.roundRect(width / 2 - 190, 65, 380, 52, 26);
    ctx.fill();
    ctx.stroke();

    ctx.fillStyle = '#34d399';
    ctx.font = 'bold 20px Plus Jakarta Sans, sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText(brandName.toUpperCase(), width / 2, 98);

    // Festival Occasion
    ctx.fillStyle = '#fbbf24';
    ctx.font = 'bold 36px Plus Jakarta Sans, sans-serif';
    ctx.fillText(`✨ ${festival} ✨`, width / 2, 210);

    // Main Headline
    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 32px Plus Jakarta Sans, sans-serif';
    wrapText(ctx, headline, width / 2, 310, 680, 44);

    // Subtext Banner
    ctx.fillStyle = 'rgba(255, 255, 255, 0.08)';
    ctx.strokeStyle = 'rgba(251, 191, 36, 0.4)';
    ctx.lineWidth = 1.5;
    ctx.roundRect(70, 460, 660, 150, 20);
    ctx.fill();
    ctx.stroke();

    ctx.fillStyle = '#f3f4f6';
    ctx.font = '22px Plus Jakarta Sans, sans-serif';
    wrapText(ctx, subtext, width / 2, 510, 600, 34);

    // Footer Contact Info
    ctx.fillStyle = '#10b981';
    ctx.font = 'bold 20px Plus Jakarta Sans, monospace';
    ctx.fillText(`WhatsApp & Direct Contact: ${contactInfo}`, width / 2, 730);
  }, [festival, headline, subtext, brandName, contactInfo, themeGradient]);

  function wrapText(
    ctx: CanvasRenderingContext2D,
    text: string,
    x: number,
    y: number,
    maxWidth: number,
    lineHeight: number
  ) {
    const words = text.split(' ');
    let line = '';
    for (let n = 0; n < words.length; n++) {
      const testLine = line + words[n] + ' ';
      const metrics = ctx.measureText(testLine);
      const testWidth = metrics.width;
      if (testWidth > maxWidth && n > 0) {
        ctx.fillText(line.trim(), x, y);
        line = words[n] + ' ';
        y += lineHeight;
      } else {
        line = testLine;
      }
    }
    ctx.fillText(line.trim(), x, y);
  }

  const handleDownloadPoster = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const link = document.createElement('a');
    link.download = `festival_poster_${festival.replace(/[^a-zA-Z0-9]/g, '_')}.png`;
    link.href = canvas.toDataURL('image/png');
    link.click();
  };

  // Copy helper
  const handleCopyText = (text: string, sectionId: string) => {
    navigator.clipboard.writeText(text);
    setCopiedSection(sectionId);
    setTimeout(() => setCopiedSection(null), 2000);
  };

  // Play synthetic voiceover audio tone preview
  const handlePlayVoiceoverPreview = () => {
    try {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (!AudioCtx) return;
      const ctx = new AudioCtx();
      setIsPlayingAudio(true);

      const notes = [261.63, 329.63, 392.00, 523.25, 440.00]; // C, E, G, C, A
      notes.forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.connect(gain);
        gain.connect(ctx.destination);
        const startTime = ctx.currentTime + idx * 0.2;
        osc.frequency.setValueAtTime(freq, startTime);
        gain.gain.setValueAtTime(0.04, startTime);
        gain.gain.exponentialRampToValueAtTime(0.001, startTime + 0.3);
        osc.start(startTime);
        osc.stop(startTime + 0.3);
      });

      setTimeout(() => setIsPlayingAudio(false), 1400);
    } catch {
      setIsPlayingAudio(false);
    }
  };

  // Generate Custom Holiday Campaign
  const handleGenerateCustomHoliday = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customHolidayName.trim()) return;

    const holiday = customHolidayName.trim();
    const newCampaign: FestivalCampaign = {
      id: `custom-${Date.now()}`,
      name: `${holiday} Celebrations`,
      icon: '🎉',
      tagline: `Celebrate ${holiday} with Exclusive Growth Grants & Priority Hiring`,
      season: 'Special Holiday Edition',
      whatsappScript: `🎉✨ *Happy ${holiday} From Shri Shyam Consulting!* ✨🎉

Hi {{name}},

Wishing you and everyone at {{company}} joyful and blessed ${holiday} celebrations!

To honor this festive occasion, we have unlocked our limited-seat ${holiday} Celebration Voucher:
🎁 Flat {{discount}} Grant on Advanced AI, Python & Robotics Masterclass
🎁 Pre-screened Candidate Matrices for Lateral & Bulk Staffing
🎁 Direct 1-on-1 strategy call with our Senior Partner

Lock your ${holiday} priority seat today:
👉 {{link}}

Have a wonderful and prosperous ${holiday}!`,
      buttons: [
        { label: `🎉 Claim ${holiday} Grant (URL)`, action: 'https://shrishyam.in/holiday', type: 'url' },
        { label: '📞 Talk to Counselor', action: '+919876543210', type: 'call' },
        { label: '✨ Send Wishes', action: 'HOLIDAY_WISHES', type: 'quick_reply' }
      ],
      theme: {
        paletteName: `${holiday} Festive Splendor`,
        gradientType: 'emerald',
        primaryHex: '#10b981',
        secondaryHex: '#064e3b',
        accentHex: '#facc15',
        decorStyle: 'Festive Streamers, Golden Confetti Burst & Elegant Celebration Ribbons',
        fontStyle: 'Modern Festive Plus Jakarta Sans Bold'
      },
      videoAdContent: {
        title: `${holiday} Celebration: Upgrade Your Career & Talent`,
        duration: '30s Festive Reel',
        hook: `Make this ${holiday} the turning point for your team's success.`,
        storyboard: [
          {
            scene: '00:00 - 00:06 (Festive Greeting)',
            visual: `Warm festive animation celebrating ${holiday} with glowing motifs.`,
            voiceover: `Happy ${holiday}! This season, celebrate by investing in skills that pay lifetime dividends.`
          },
          {
            scene: '00:06 - 00:20 (The Breakthrough)',
            visual: 'Candidate placement offer letter and AI automation workflows dashboard.',
            voiceover: 'Shri Shyam Consulting is proud to have helped over 100+ businesses hire pre-screened talent.'
          },
          {
            scene: '00:20 - 00:30 (Action CTA)',
            visual: `WhatsApp chat screen with one-tap Claim ${holiday} Grant button.`,
            voiceover: 'Message us on WhatsApp right now to claim your exclusive festive scholarship.'
          }
        ],
        bgMusic: 'Uplifting Festive Fusion + Joyful Acoustic Guitar',
        cta: `Reply "${holiday.toUpperCase().slice(0, 6)}" on WhatsApp to unlock the scholarship voucher.`
      },
      socialMediaAdFree: {
        instagramCaption: `🎉 Wishing everyone a blessed and prosperous ${holiday}! ✨

This festive season, don’t just celebrate—elevate your skills and business with cutting-edge AI and workforce excellence:
✅ Hands-on Generative AI & Automation Training
✅ Lateral Tech & Non-IT Corporate Hiring
✅ Exclusive ${holiday} Grant of up to 45% OFF

Drop a 🎉 in the comments or tap the link in bio to receive details directly in your DM.

#${holiday.replace(/\s+/g, '')} #Celebrations #CareerGrowth #ShriShyamConsulting #UpskillNow`,
        linkedinPost: `Warmest greetings on the joyous occasion of ${holiday}! 🌟

At Shri Shyam Consulting, we take this festive opportunity to thank our clients, candidates, and partners across the globe for trusting us as their growth and talent partners.

Wishing you continued success, resilience, and prosperity!

#${holiday.replace(/\s+/g, '')} #Leadership #TalentAcquisition #WorkplaceCelebration #ShriShyamConsulting`,
        hashtags: [`#${holiday.replace(/\s+/g, '')}`, '#FestiveSeason', '#GrowthMindset', '#ShriShyamConsulting'],
        organicGrowthTip: `Post your ${holiday} greeting with a carousel detailing "3 Habits for Career Excellence" to drive organic saves.`,
        storyPollQuestion: `Are you spending ${holiday} relaxing with family or planning your next career leap?`
      }
    };

    setCustomCampaigns([newCampaign, ...customCampaigns]);
    setSelectedFestivalId(newCampaign.id);
    setCustomHolidayName('');
  };

  // --- YouTube Video Re-Creator State ---
  const [youtubeUrl, setYoutubeUrl] = useState('https://www.youtube.com/watch?v=rashmi-sondhi-masterclass');
  const [isProcessingVideo, setIsProcessingVideo] = useState(false);
  const [generatedVideoData, setGeneratedVideoData] = useState<{
    title: string;
    hook: string;
    shortScript: string;
    videoMessage: string;
    slides: Array<{ title: string; subtitle: string; duration: string }>;
  } | null>({
    title: 'How to Automate WhatsApp & Scale Leads by 3x (Rashmi Sondhi Blueprint)',
    hook: 'Are you still manually answering customer WhatsApp messages at 2 AM? Stop right now.',
    shortScript: `[00:00 - 00:05] HOOK: Are you still manually answering WhatsApp messages? Here's how top businesses automate everything.
[00:05 - 00:15] PROBLEM: Manual replies take 30 minutes, losing 60% of high-intent buyers.
[00:15 - 00:35] SOLUTION: Set up AI Agent routing across 3 SIM lines with human jitter.
[00:35 - 00:50] PROOF: Shri Shyam Consulting clients closed 3x more admissions and corporate hires.
[00:50 - 00:60] CTA: Comment "AUTOMATE" or click the link in bio to grab the free workbook!`,
    videoMessage: `🎬 *NEW VIDEO BREAKDOWN AVAILABLE*

We just re-created the complete step-by-step video blueprint from YouTube:
👉 "How to Scale Official WhatsApp Automation with AI Agents"

Key Takeaways:
✅ Zero-delay auto replies 24/7
✅ Multi-SIM carrier rotation to eliminate account flags
✅ Step-by-step Python & LangChain architecture

Reply "VIDEO" for the direct high-definition MP4 download!`,
    slides: [
      { title: 'Step 1: The WhatsApp Growth Dilemma', subtitle: 'Why 60% of leads drop off without instant replies', duration: '10s' },
      { title: 'Step 2: AI Agent & 3-SIM Rotation', subtitle: 'How Shri Shyam Consulting architecture maintains 99% deliverability', duration: '15s' },
      { title: 'Step 3: Drip Sequencing', subtitle: 'Day 1 Brochure, Day 2 Testimonials, Day 3 Final Offer', duration: '15s' },
      { title: 'Step 4: Launching Your Batch', subtitle: 'Early-bird enrollment closing this weekend', duration: '20s' }
    ]
  });

  const handleProcessYouTubeLink = (e: React.FormEvent) => {
    e.preventDefault();
    if (!youtubeUrl) return;

    setIsProcessingVideo(true);
    setTimeout(() => {
      setIsProcessingVideo(false);
      setGeneratedVideoData({
        title: 'Complete Video Recreation from ' + youtubeUrl.split('?')[0],
        hook: 'Watch how AI automation transformed corporate staffing and course enrollment in 2026.',
        shortScript: `[00:00 - 00:08] Hook: Discover the secret framework used by Shri Shyam Consulting.
[00:08 - 00:25] Core Breakdown: AI Agents handle candidate CTC, notice period and syllabus questions.
[00:25 - 00:45] Client Results: 98.4% delivery rate across 1,500 daily messages.
[00:45 - 00:60] Take Action: Enroll today before the early-bird seats fill up!`,
        videoMessage: `🎥 *Video Script Re-purposed from YouTube:*

Hey {{name}}, we created a custom video summary tailored for {{company}}!
Watch the video highlights or reply "CALL" to speak with our counselors.`,
        slides: [
          { title: 'Scene 1: Introduction & High-Level Problem', subtitle: 'Extracted directly from YouTube audio transcript', duration: '12s' },
          { title: 'Scene 2: Technical Walkthrough', subtitle: 'Generative AI & Low-Code Workflows', duration: '20s' },
          { title: 'Scene 3: Exclusive Early-Bird Offer', subtitle: 'First 50 seats only', duration: '18s' }
        ]
      });
    }, 1200);
  };

  // --- Google Leads Extractor State ---
  const [googleQuery, setGoogleQuery] = useState('IT & Software Companies in Bangalore');
  const [isExtracting, setIsExtracting] = useState(false);
  const [extractedLeads, setExtractedLeads] = useState<Lead[]>([
    {
      id: 'ext-01',
      name: 'Karan Mehra (Founder)',
      phone: '+91 98110 55401',
      company: 'NexGen Cloud Systems',
      course: 'AI & Data Engineering',
      status: 'pending',
      discount: '40%',
      selected: true,
      tags: ['Google Maps Verified', 'IT Sector']
    },
    {
      id: 'ext-02',
      name: 'Ritika Sen (HR Director)',
      phone: '+91 98220 55402',
      company: 'Zenith InfoTech Solutions',
      course: 'Corporate Staffing Mandate',
      status: 'pending',
      discount: '35%',
      selected: true,
      tags: ['Google Extracted', '50-200 Staff']
    },
    {
      id: 'ext-03',
      name: 'Sanjay Rawal (COO)',
      phone: '+91 98330 55403',
      company: 'Apex Precision Logistics',
      course: 'Supply Chain Tech',
      status: 'pending',
      discount: '30%',
      selected: true,
      tags: ['Google Extracted', 'Gurgaon']
    },
    {
      id: 'ext-04',
      name: 'Meenakshi Sundaram',
      phone: '+91 98440 55404',
      company: 'Solaria BioHealth',
      course: 'Bio-Informatics Track',
      status: 'pending',
      discount: '45%',
      selected: true,
      tags: ['Google Extracted', 'Bangalore']
    }
  ]);
  const [importSuccessMsg, setImportSuccessMsg] = useState(false);

  const handleExtractFromGoogle = (e: React.FormEvent) => {
    e.preventDefault();
    if (!googleQuery) return;

    setIsExtracting(true);
    setTimeout(() => {
      setIsExtracting(false);
      const generated: Lead[] = [
        {
          id: `ext-${Date.now()}-1`,
          name: 'Alok Gupta (Director)',
          phone: '+91 98550 55405',
          company: `${googleQuery.split(' ')[0]} Innovations`,
          course: 'Full-Stack AI Engineering',
          status: 'pending',
          discount: '40%',
          selected: true,
          tags: ['Google Free Extractor', 'Fresh Lead']
        },
        {
          id: `ext-${Date.now()}-2`,
          name: 'Shweta Joshi (HR Lead)',
          phone: '+91 98660 55406',
          company: `${googleQuery.split(' ')[0]} Tech Corp`,
          course: 'Corporate Staffing',
          status: 'pending',
          discount: '35%',
          selected: true,
          tags: ['Google Free Extractor', 'Verified Phone']
        },
        {
          id: `ext-${Date.now()}-3`,
          name: 'Gaurav Singhal (VP Tech)',
          phone: '+91 98770 55407',
          company: 'Matrix Automation Labs',
          course: 'Python & Robotics Cohort',
          status: 'pending',
          discount: '50%',
          selected: true,
          tags: ['Google Free Extractor', 'High Priority']
        }
      ];
      setExtractedLeads([...generated, ...extractedLeads]);
    }, 1000);
  };

  const handlePushToAudience = () => {
    onAddLeadsToAudience(extractedLeads);
    setImportSuccessMsg(true);
    setTimeout(() => setImportSuccessMsg(false), 2500);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Top Header Banner */}
      <div className="bg-slate-900/90 border border-slate-800 p-5 rounded-2xl shadow-xl flex flex-col xl:flex-row items-start xl:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-amber-500/20 to-emerald-500/20 border border-amber-500/30 flex items-center justify-center text-amber-400">
              <PartyPopper className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-lg font-bold text-white tracking-tight">
                  Creator Studio & Festival Content Manager
                </h1>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-500/15 text-amber-300 border border-amber-500/30">
                  Ad-Free Marketing
                </span>
              </div>
              <p className="text-xs text-slate-400">
                Generate pre-made promotional WhatsApp scripts, design themes, advertisement video reels, and ad-free organic social media packs.
              </p>
            </div>
          </div>
        </div>

        {/* Sub-tab Navigation */}
        <div className="flex items-center gap-1.5 bg-slate-950 p-1.5 rounded-xl border border-slate-800 overflow-x-auto w-full xl:w-auto">
          <button
            onClick={() => setActiveSubTab('festivals')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all whitespace-nowrap ${
              activeSubTab === 'festivals'
                ? 'bg-amber-500 text-slate-950 shadow-md'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <PartyPopper className="w-3.5 h-3.5" />
            <span>Festival Content Manager</span>
          </button>
          <button
            onClick={() => setActiveSubTab('poster')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all whitespace-nowrap ${
              activeSubTab === 'poster'
                ? 'bg-emerald-500 text-slate-950 shadow-md'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Palette className="w-3.5 h-3.5" />
            <span>Festival Posters (Canvas)</span>
          </button>
          <button
            onClick={() => setActiveSubTab('video')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all whitespace-nowrap ${
              activeSubTab === 'video'
                ? 'bg-rose-500 text-white shadow-md'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Youtube className="w-3.5 h-3.5" />
            <span>YouTube Video Maker</span>
          </button>
          <button
            onClick={() => setActiveSubTab('extractor')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all whitespace-nowrap ${
              activeSubTab === 'extractor'
                ? 'bg-sky-500 text-slate-950 shadow-md'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Globe className="w-3.5 h-3.5" />
            <span>Google Data Extractor</span>
          </button>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* --- SUB-TAB: FESTIVAL CONTENT MANAGER --- */}
      {/* ========================================================================= */}
      {activeSubTab === 'festivals' && (
        <div className="space-y-6 animate-in fade-in">
          {/* Festival Selection Carousel & Custom Holiday Generator Bar */}
          <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 space-y-4 shadow-xl">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-slate-800 pb-3">
              <div>
                <h2 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-amber-400" />
                  Select Festival or Holiday Campaign
                </h2>
                <p className="text-xs text-slate-400">
                  Choose an upcoming holiday to load conversion-tested WhatsApp message scripts, design palettes, video reels, and organic ad-free social posts.
                </p>
              </div>

              {/* Custom Holiday Generator Form */}
              <form onSubmit={handleGenerateCustomHoliday} className="flex items-center gap-2 w-full sm:w-auto">
                <input
                  type="text"
                  placeholder="Type any Holiday (e.g. Raksha Bandhan)..."
                  value={customHolidayName}
                  onChange={(e) => setCustomHolidayName(e.target.value)}
                  className="px-3 py-1.5 bg-slate-950 border border-slate-700 rounded-lg text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-500 w-full sm:w-60"
                />
                <button
                  type="submit"
                  className="px-3 py-1.5 bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-xs rounded-lg whitespace-nowrap transition-colors flex items-center gap-1 shadow-sm"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Generate</span>
                </button>
              </form>
            </div>

            {/* Holiday Selector Cards */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
              {allCampaigns.map((camp) => {
                const isSelected = camp.id === selectedFestivalId;
                return (
                  <button
                    key={camp.id}
                    onClick={() => setSelectedFestivalId(camp.id)}
                    className={`p-3 rounded-xl border text-left transition-all flex flex-col justify-between ${
                      isSelected
                        ? 'bg-amber-500/15 border-amber-500/50 shadow-md shadow-amber-500/10'
                        : 'bg-slate-950 border-slate-800/80 hover:bg-slate-850 hover:border-slate-700'
                    }`}
                  >
                    <div>
                      <span className="text-2xl block mb-1">{camp.icon}</span>
                      <h4 className={`text-xs font-bold line-clamp-1 ${isSelected ? 'text-amber-300' : 'text-white'}`}>
                        {camp.name.split('(')[0]}
                      </h4>
                      <p className="text-[10px] text-slate-500 mt-0.5 line-clamp-1">
                        {camp.season}
                      </p>
                    </div>

                    <div className="mt-2 pt-2 border-t border-slate-800/60 flex items-center justify-between text-[10px]">
                      <span className="font-mono text-emerald-400">Ready</span>
                      {isSelected && <span className="w-2 h-2 rounded-full bg-amber-400" />}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Active Festival Header Banner */}
          <div className="p-4 rounded-2xl bg-gradient-to-r from-slate-900 via-amber-950/20 to-slate-900 border border-amber-500/30 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <span className="text-3xl">{activeCampaign.icon}</span>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-base font-extrabold text-white">
                    {activeCampaign.name} Campaign Suite
                  </h3>
                  <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                    High Conversion
                  </span>
                </div>
                <p className="text-xs text-amber-200/80 mt-0.5 font-medium">
                  {activeCampaign.tagline}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => handleApplyThemeToCanvas(activeCampaign)}
                className="px-3.5 py-2 bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-bold text-xs rounded-xl flex items-center gap-1.5 transition-colors shadow-md shadow-emerald-500/20"
              >
                <Palette className="w-3.5 h-3.5" />
                <span>Apply to Canvas Poster</span>
              </button>
              <button
                onClick={onOpenMessageAll}
                className="px-3.5 py-2 bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-xs rounded-xl flex items-center gap-1.5 transition-colors shadow-md shadow-amber-500/20"
              >
                <Send className="w-3.5 h-3.5 fill-current" />
                <span>⚡ Broadcast on WhatsApp [M]</span>
              </button>
            </div>
          </div>

          {/* Section Selector: WhatsApp Script | Design Theme | Video Reel | Social Media Pack */}
          <div className="flex items-center gap-2 border-b border-slate-800 pb-2">
            {[
              { id: 'whatsapp', label: '1. WhatsApp Promotional Script', icon: <MessageCircle className="w-3.5 h-3.5" /> },
              { id: 'theme', label: '2. Design Theme & Palettes', icon: <Palette className="w-3.5 h-3.5" /> },
              { id: 'video', label: '3. Video Reel & Ad Script', icon: <Tv className="w-3.5 h-3.5" /> },
              { id: 'social', label: '4. Ad-Free Social Media Pack', icon: <Share2 className="w-3.5 h-3.5" /> }
            ].map((sec) => (
              <button
                key={sec.id}
                onClick={() => setActiveFestivalTab(sec.id as any)}
                className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold transition-all ${
                  activeFestivalTab === sec.id
                    ? 'bg-slate-800 text-amber-300 border border-amber-500/40 shadow-sm'
                    : 'text-slate-400 hover:text-white hover:bg-slate-900'
                }`}
              >
                {sec.icon}
                <span>{sec.label}</span>
              </button>
            ))}
          </div>

          {/* --- SECTION 1: WHATSAPP PROMOTIONAL MESSAGE SCRIPT --- */}
          {activeFestivalTab === 'whatsapp' && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              {/* WhatsApp Script Preview & Actions (7 cols) */}
              <div className="lg:col-span-7 bg-slate-900/90 border border-slate-800 rounded-2xl p-5 space-y-4">
                <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                  <div>
                    <h3 className="text-sm font-bold text-white flex items-center gap-2">
                      <MessageCircle className="w-4 h-4 text-emerald-400" />
                      Pre-Made WhatsApp Campaign Script
                    </h3>
                    <p className="text-xs text-slate-400">
                      Formatted with WhatsApp bolding, festive greetings, and dynamic interpolation tags.
                    </p>
                  </div>
                  <button
                    onClick={() => handleCopyText(activeCampaign.whatsappScript, 'whatsapp-script')}
                    className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors"
                  >
                    {copiedSection === 'whatsapp-script' ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-400" />
                        <span className="text-emerald-400">Copied!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>Copy Script</span>
                      </>
                    )}
                  </button>
                </div>

                {/* Simulated WhatsApp Bubble */}
                <div className="bg-[#0b141a] p-4 rounded-2xl border border-slate-800 shadow-inner">
                  <div className="bg-[#005c4b] text-[#e9edef] rounded-2xl rounded-tl-none p-3.5 text-xs whitespace-pre-wrap leading-relaxed font-sans shadow">
                    {activeCampaign.whatsappScript}
                    <div className="text-[10px] text-emerald-200/60 text-right mt-2 flex items-center justify-end gap-1">
                      <span>10:30 AM</span>
                      <span>✓✓</span>
                    </div>
                  </div>

                  {/* Interactive Buttons */}
                  <div className="mt-2 space-y-1.5">
                    {activeCampaign.buttons.map((btn, bIdx) => (
                      <div
                        key={bIdx}
                        className="bg-[#202c33] text-[#00a884] font-medium text-xs py-2 px-3 rounded-lg text-center border border-slate-700/50 flex items-center justify-center gap-2"
                      >
                        {btn.type === 'url' && <ExternalLink className="w-3 h-3" />}
                        <span>{btn.label}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-2 flex items-center justify-between text-xs text-slate-400">
                  <span>Dynamic tags: <strong className="text-emerald-400 font-mono">&#123;&#123;name&#125;&#125;, &#123;&#123;company&#125;&#125;, &#123;&#123;discount&#125;&#125;, &#123;&#123;link&#125;&#125;</strong></span>
                  <button
                    onClick={onOpenMessageAll}
                    className="text-emerald-400 hover:underline font-semibold flex items-center gap-1"
                  >
                    <span>Send in Message All Broadcaster [M]</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {/* Best Practices & Dispatch Advice (5 cols) */}
              <div className="lg:col-span-5 bg-slate-900/90 border border-slate-800 rounded-2xl p-5 space-y-4 flex flex-col justify-between">
                <div className="space-y-3">
                  <div className="flex items-center gap-2 border-b border-slate-800 pb-3">
                    <Flame className="w-4 h-4 text-amber-400" />
                    <h3 className="text-sm font-bold text-white uppercase tracking-wider">
                      Festive Dispatch Strategy
                    </h3>
                  </div>

                  <p className="text-xs text-slate-300 leading-relaxed">
                    Festivals have <strong>3.4x higher WhatsApp open rates</strong> compared to normal weekdays. Follow these recommendations:
                  </p>

                  <ul className="space-y-2.5 text-xs text-slate-300">
                    <li className="flex items-start gap-2">
                      <span className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0 font-bold text-[10px]">1</span>
                      <span><strong>Send 48 Hours Before Festival Eve:</strong> Warm leads respond best when planning ahead rather than on the holiday itself.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0 font-bold text-[10px]">2</span>
                      <span><strong>Include a Clear Expiration Token:</strong> Creates genuine urgency ("Valid through Diwali weekend only").</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0 font-bold text-[10px]">3</span>
                      <span><strong>Attach the Generated Poster:</strong> Messages with branded greeting images boast 42% higher response rates.</span>
                    </li>
                  </ul>
                </div>

                <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 space-y-2">
                  <span className="text-xs font-bold text-white flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                    One-Tap Actions:
                  </span>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      onClick={() => handleApplyThemeToCanvas(activeCampaign)}
                      className="p-2 bg-slate-900 hover:bg-slate-800 text-slate-200 border border-slate-700 rounded-lg text-xs font-medium text-center"
                    >
                      🎨 Open in Poster Canvas
                    </button>
                    <button
                      onClick={onOpenMessageAll}
                      className="p-2 bg-emerald-500 hover:bg-emerald-600 text-slate-950 rounded-lg text-xs font-bold text-center"
                    >
                      ⚡ Open Broadcaster [M]
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* --- SECTION 2: DESIGN THEME & COLOR PALETTES --- */}
          {activeFestivalTab === 'theme' && (
            <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 space-y-5">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <div>
                  <h3 className="text-sm font-bold text-white flex items-center gap-2">
                    <Palette className="w-4 h-4 text-amber-400" />
                    Festive Design Theme & Visual Styling
                  </h3>
                  <p className="text-xs text-slate-400">
                    Pre-configured color palettes, decor motifs, and typography guidelines tailored to {activeCampaign.name}.
                  </p>
                </div>
                <button
                  onClick={() => handleApplyThemeToCanvas(activeCampaign)}
                  className="px-4 py-2 bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-bold text-xs rounded-xl flex items-center gap-1.5 shadow-md"
                >
                  <Palette className="w-3.5 h-3.5" />
                  <span>Apply Theme to Canvas Poster</span>
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                {/* Palette Card */}
                <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 space-y-3">
                  <span className="text-xs font-bold text-white">Theme Name</span>
                  <p className="text-sm font-extrabold text-amber-400">
                    {activeCampaign.theme.paletteName}
                  </p>

                  <div className="space-y-2 pt-1">
                    <div className="flex items-center justify-between p-2 rounded-lg bg-slate-900 border border-slate-800 text-xs">
                      <div className="flex items-center gap-2">
                        <div className="w-4 h-4 rounded-md shadow" style={{ backgroundColor: activeCampaign.theme.primaryHex }} />
                        <span className="text-slate-300">Primary Color</span>
                      </div>
                      <span className="font-mono text-slate-400">{activeCampaign.theme.primaryHex}</span>
                    </div>

                    <div className="flex items-center justify-between p-2 rounded-lg bg-slate-900 border border-slate-800 text-xs">
                      <div className="flex items-center gap-2">
                        <div className="w-4 h-4 rounded-md shadow" style={{ backgroundColor: activeCampaign.theme.secondaryHex }} />
                        <span className="text-slate-300">Secondary Accent</span>
                      </div>
                      <span className="font-mono text-slate-400">{activeCampaign.theme.secondaryHex}</span>
                    </div>

                    <div className="flex items-center justify-between p-2 rounded-lg bg-slate-900 border border-slate-800 text-xs">
                      <div className="flex items-center gap-2">
                        <div className="w-4 h-4 rounded-md shadow" style={{ backgroundColor: activeCampaign.theme.accentHex }} />
                        <span className="text-slate-300">Highlight Tint</span>
                      </div>
                      <span className="font-mono text-slate-400">{activeCampaign.theme.accentHex}</span>
                    </div>
                  </div>
                </div>

                {/* Decorative Motifs */}
                <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 space-y-3">
                  <span className="text-xs font-bold text-white">Visual Motifs & Decor Style</span>
                  <div className="p-3 bg-slate-900 rounded-xl text-xs text-slate-300 leading-relaxed border border-slate-800">
                    {activeCampaign.theme.decorStyle}
                  </div>

                  <span className="text-xs font-bold text-white block pt-1">Typography Pairing</span>
                  <div className="p-3 bg-slate-900 rounded-xl text-xs text-slate-300 font-mono border border-slate-800">
                    {activeCampaign.theme.fontStyle}
                  </div>
                </div>

                {/* One-Click Generator Action */}
                <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 space-y-3 flex flex-col justify-between">
                  <div className="space-y-2">
                    <span className="text-xs font-bold text-white">Canvas Poster Sync</span>
                    <p className="text-xs text-slate-400 leading-relaxed">
                      Instant 1-click sync pushes these exact hex colors and festival headlines to the 800x800 high-res PNG canvas generator.
                    </p>
                  </div>

                  <button
                    onClick={() => handleApplyThemeToCanvas(activeCampaign)}
                    className="w-full py-3 bg-gradient-to-r from-amber-500 to-emerald-500 hover:from-amber-400 hover:to-emerald-400 text-slate-950 font-bold text-xs rounded-xl flex items-center justify-center gap-2 shadow-lg"
                  >
                    <Palette className="w-4 h-4" />
                    <span>Sync & Open Poster Canvas</span>
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* --- SECTION 3: VIDEO REEL & ADVERTISEMENT CONTENT --- */}
          {activeFestivalTab === 'video' && (
            <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 space-y-5">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-slate-800 pb-3">
                <div>
                  <h3 className="text-sm font-bold text-white flex items-center gap-2">
                    <Tv className="w-4 h-4 text-rose-400" />
                    Advertisement Video Content & Reel Storyboard
                  </h3>
                  <p className="text-xs text-slate-400">
                    30-second timestamped script with viral visual hooks, voiceover script, and recommended royalty-free background audio.
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={handlePlayVoiceoverPreview}
                    disabled={isPlayingAudio}
                    className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors"
                  >
                    <Volume2 className={`w-3.5 h-3.5 ${isPlayingAudio ? 'animate-bounce text-emerald-400' : ''}`} />
                    <span>{isPlayingAudio ? 'Playing Chimes...' : 'Audio Tone Preview'}</span>
                  </button>

                  <button
                    onClick={() => handleCopyText(
                      activeCampaign.videoAdContent.storyboard.map((s) => `${s.scene}\nVisual: ${s.visual}\nVoiceover: ${s.voiceover}`).join('\n\n'),
                      'video-script'
                    )}
                    className="px-3 py-1.5 bg-rose-500/20 hover:bg-rose-500/30 text-rose-300 border border-rose-500/40 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors"
                  >
                    {copiedSection === 'video-script' ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-400" />
                        <span className="text-emerald-400">Copied Reel Script!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>Copy Storyboard</span>
                      </>
                    )}
                  </button>
                </div>
              </div>

              {/* Video Hook & Meta Card */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="p-3 bg-slate-950 rounded-xl border border-slate-800">
                  <span className="text-[10px] font-mono uppercase text-slate-500">Video Title</span>
                  <p className="text-xs font-bold text-white mt-0.5">{activeCampaign.videoAdContent.title}</p>
                </div>
                <div className="p-3 bg-slate-950 rounded-xl border border-slate-800">
                  <span className="text-[10px] font-mono uppercase text-slate-500">3-Second Hook</span>
                  <p className="text-xs font-bold text-rose-400 mt-0.5">"{activeCampaign.videoAdContent.hook}"</p>
                </div>
                <div className="p-3 bg-slate-950 rounded-xl border border-slate-800">
                  <span className="text-[10px] font-mono uppercase text-slate-500">Music Recommendation</span>
                  <p className="text-xs font-semibold text-amber-300 mt-0.5">{activeCampaign.videoAdContent.bgMusic}</p>
                </div>
              </div>

              {/* Storyboard Timeline */}
              <div className="space-y-3">
                <span className="text-xs font-bold text-white uppercase tracking-wider block">
                  Scene-By-Scene Storyboard ({activeCampaign.videoAdContent.duration})
                </span>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {activeCampaign.videoAdContent.storyboard.map((scene, idx) => (
                    <div key={idx} className="p-3.5 bg-slate-950 rounded-xl border border-slate-800 space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-900 text-rose-400 font-bold border border-slate-800">
                          {scene.scene}
                        </span>
                        <span className="text-[10px] text-slate-500">Scene 0{idx + 1}</span>
                      </div>
                      <div>
                        <span className="text-[11px] font-semibold text-slate-400 block">Visual Direction:</span>
                        <p className="text-xs text-slate-300 font-sans mt-0.5">{scene.visual}</p>
                      </div>
                      <div className="pt-1 border-t border-slate-850">
                        <span className="text-[11px] font-semibold text-emerald-400 block">Voiceover Line:</span>
                        <p className="text-xs text-white font-sans mt-0.5 italic">"{scene.voiceover}"</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Video CTA */}
              <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 flex items-center justify-between text-xs">
                <span className="text-slate-400">Final Call To Action Overlay: <strong className="text-white">{activeCampaign.videoAdContent.cta}</strong></span>
                <button
                  onClick={onOpenMessageAll}
                  className="px-3 py-1.5 bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-bold rounded-lg"
                >
                  Broadcast Video Message [M]
                </button>
              </div>
            </div>
          )}

          {/* --- SECTION 4: AD-FREE SOCIAL MEDIA PACK --- */}
          {activeFestivalTab === 'social' && (
            <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 space-y-5">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <div>
                  <h3 className="text-sm font-bold text-white flex items-center gap-2">
                    <Share2 className="w-4 h-4 text-sky-400" />
                    Ad-Free Organic Social Media Content Pack
                  </h3>
                  <p className="text-xs text-slate-400">
                    Engineered to generate maximum organic reach on Instagram and LinkedIn without paying social media advertising fees.
                  </p>
                </div>
                <button
                  onClick={() => handleCopyText(
                    `Instagram:\n${activeCampaign.socialMediaAdFree.instagramCaption}\n\nLinkedIn:\n${activeCampaign.socialMediaAdFree.linkedinPost}\n\nHashtags:\n${activeCampaign.socialMediaAdFree.hashtags.join(' ')}`,
                    'social-pack'
                  )}
                  className="px-3 py-1.5 bg-sky-500/20 hover:bg-sky-500/30 text-sky-300 border border-sky-500/40 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors"
                >
                  {copiedSection === 'social-pack' ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                      <span className="text-emerald-400">Copied All Socials!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Copy Complete Social Pack</span>
                    </>
                  )}
                </button>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
                {/* Instagram Caption */}
                <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-white flex items-center gap-1.5">
                      <span className="w-2.5 h-2.5 rounded-full bg-gradient-to-tr from-amber-500 to-pink-500" />
                      Instagram Ad-Free Post & Reel Caption
                    </span>
                    <button
                      onClick={() => handleCopyText(activeCampaign.socialMediaAdFree.instagramCaption, 'ig-caption')}
                      className="text-[11px] text-sky-400 hover:underline"
                    >
                      {copiedSection === 'ig-caption' ? 'Copied' : 'Copy'}
                    </button>
                  </div>
                  <div className="p-3 bg-slate-900 rounded-xl text-xs text-slate-300 whitespace-pre-wrap leading-relaxed max-h-60 overflow-y-auto font-sans border border-slate-800">
                    {activeCampaign.socialMediaAdFree.instagramCaption}
                  </div>
                </div>

                {/* LinkedIn Professional Post */}
                <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-white flex items-center gap-1.5">
                      <span className="w-2.5 h-2.5 rounded-full bg-blue-500" />
                      LinkedIn B2B Thought-Leadership Post
                    </span>
                    <button
                      onClick={() => handleCopyText(activeCampaign.socialMediaAdFree.linkedinPost, 'li-post')}
                      className="text-[11px] text-sky-400 hover:underline"
                    >
                      {copiedSection === 'li-post' ? 'Copied' : 'Copy'}
                    </button>
                  </div>
                  <div className="p-3 bg-slate-900 rounded-xl text-xs text-slate-300 whitespace-pre-wrap leading-relaxed max-h-60 overflow-y-auto font-sans border border-slate-800">
                    {activeCampaign.socialMediaAdFree.linkedinPost}
                  </div>
                </div>
              </div>

              {/* Hashtags & Organic Growth Strategy */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-3.5 bg-slate-950 rounded-xl border border-slate-800 space-y-2">
                  <span className="text-xs font-bold text-emerald-400 flex items-center gap-1.5">
                    <TrendingUp className="w-3.5 h-3.5" />
                    Ad-Free Organic Reach Hack:
                  </span>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    {activeCampaign.socialMediaAdFree.organicGrowthTip}
                  </p>
                  <p className="text-[11px] text-slate-400 pt-1">
                    Story Poll Idea: <strong className="text-amber-300">"{activeCampaign.socialMediaAdFree.storyPollQuestion}"</strong>
                  </p>
                </div>

                <div className="p-3.5 bg-slate-950 rounded-xl border border-slate-800 space-y-2">
                  <span className="text-xs font-bold text-white flex items-center gap-1.5">
                    <Hash className="w-3.5 h-3.5 text-purple-400" />
                    High-Ranking Niche Hashtags:
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {activeCampaign.socialMediaAdFree.hashtags.map((h) => (
                      <span key={h} className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-900 text-sky-400 border border-slate-800">
                        {h}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* ========================================================================= */}
      {/* --- SUB-TAB: FESTIVAL POSTER GENERATOR (CANVAS) --- */}
      {/* ========================================================================= */}
      {activeSubTab === 'poster' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 animate-in fade-in">
          {/* Left Form Controls (5 cols) */}
          <div className="lg:col-span-5 bg-slate-900/90 border border-slate-800 rounded-2xl p-5 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h2 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
                <Palette className="w-4 h-4 text-amber-400" />
                Customize Festive Poster
              </h2>
              <span className="text-[10px] font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                100% Free
              </span>
            </div>

            <div>
              <label className="text-xs font-semibold text-slate-300 block mb-1">
                Occasion / Festival
              </label>
              <input
                type="text"
                value={festival}
                onChange={(e) => setFestival(e.target.value)}
                placeholder="e.g. Diwali & New Year 2026"
                className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2 text-xs text-white"
              />
            </div>

            <div>
              <label className="text-xs font-semibold text-slate-300 block mb-1">
                Company / Organization Brand
              </label>
              <input
                type="text"
                value={brandName}
                onChange={(e) => setBrandName(e.target.value)}
                className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2 text-xs text-white"
              />
            </div>

            <div>
              <label className="text-xs font-semibold text-slate-300 block mb-1">
                Poster Headline
              </label>
              <input
                type="text"
                value={headline}
                onChange={(e) => setHeadline(e.target.value)}
                className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2 text-xs text-white"
              />
            </div>

            <div>
              <label className="text-xs font-semibold text-slate-300 block mb-1">
                Offer / Highlight Subtext
              </label>
              <textarea
                rows={3}
                value={subtext}
                onChange={(e) => setSubtext(e.target.value)}
                className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2 text-xs text-white"
              />
            </div>

            <div>
              <label className="text-xs font-semibold text-slate-300 block mb-1">
                Contact & Website Footer
              </label>
              <input
                type="text"
                value={contactInfo}
                onChange={(e) => setContactInfo(e.target.value)}
                className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2 text-xs text-white"
              />
            </div>

            <div>
              <label className="text-xs font-semibold text-slate-300 block mb-1.5">
                Theme Color Palette
              </label>
              <div className="grid grid-cols-4 gap-2">
                {[
                  { id: 'gold', label: 'Festive Gold' },
                  { id: 'emerald', label: 'Emerald Deep' },
                  { id: 'saffron', label: 'Saffron Sun' },
                  { id: 'royal', label: 'Royal Indigo' }
                ].map((th) => (
                  <button
                    key={th.id}
                    type="button"
                    onClick={() => setThemeGradient(th.id as any)}
                    className={`py-1.5 px-2 rounded-lg text-[10px] font-semibold border transition-all ${
                      themeGradient === th.id
                        ? 'bg-amber-500/20 text-amber-300 border-amber-500'
                        : 'bg-slate-950 text-slate-400 border-slate-800'
                    }`}
                  >
                    {th.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="pt-2 flex items-center gap-2">
              <button
                onClick={handleDownloadPoster}
                className="flex-1 py-2.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs rounded-xl flex items-center justify-center gap-2 shadow-lg shadow-amber-500/20"
              >
                <Download className="w-4 h-4" />
                <span>Download High-Res PNG</span>
              </button>
              <button
                onClick={onOpenMessageAll}
                className="py-2.5 px-4 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs rounded-xl flex items-center gap-1.5 shadow-lg shadow-emerald-500/20"
              >
                <Send className="w-4 h-4" />
                <span>Blast on WhatsApp [M]</span>
              </button>
            </div>
          </div>

          {/* Right Live Canvas Preview (7 cols) */}
          <div className="lg:col-span-7 bg-slate-900/90 border border-slate-800 rounded-2xl p-5 flex flex-col items-center justify-center">
            <span className="text-xs font-semibold text-slate-400 mb-3 self-start">
              Live Canvas Render (800x800 High Resolution)
            </span>
            <div className="w-full max-w-md aspect-square rounded-2xl overflow-hidden shadow-2xl border-4 border-slate-800 bg-slate-950 flex items-center justify-center">
              <canvas
                ref={canvasRef}
                className="w-full h-full object-contain"
              />
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* --- SUB-TAB: YOUTUBE VIDEO RE-CREATOR --- */}
      {/* ========================================================================= */}
      {activeSubTab === 'video' && (
        <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 space-y-6 animate-in fade-in">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
            <div>
              <h2 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
                <Youtube className="w-4 h-4 text-rose-500" />
                YouTube Link Video Re-Creator ("Same Video Bana Kar Do")
              </h2>
              <p className="text-xs text-slate-400">
                Paste any YouTube video URL to extract viral hooks, generate reel slides, and produce WhatsApp video campaign scripts.
              </p>
            </div>
          </div>

          {/* URL Input Form */}
          <form onSubmit={handleProcessYouTubeLink} className="flex gap-2">
            <input
              type="text"
              required
              placeholder="Paste YouTube Video Link (e.g. https://youtube.com/watch?v=...)"
              value={youtubeUrl}
              onChange={(e) => setYoutubeUrl(e.target.value)}
              className="flex-1 bg-slate-950 border border-slate-700 rounded-xl px-4 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-rose-500"
            />
            <button
              type="submit"
              disabled={isProcessingVideo}
              className="px-5 py-2.5 bg-rose-500 hover:bg-rose-600 disabled:opacity-50 text-white font-bold text-xs rounded-xl flex items-center gap-1.5 transition-colors shadow-lg shadow-rose-500/20"
            >
              {isProcessingVideo ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Sparkles className="w-4 h-4" />}
              <span>{isProcessingVideo ? 'Extracting & Generating...' : 'Generate Same Video & Script'}</span>
            </button>
          </form>

          {generatedVideoData && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 pt-2">
              {/* Short Script & WhatsApp Message (7 cols) */}
              <div className="lg:col-span-7 space-y-4">
                <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-2">
                  <span className="text-xs font-bold text-rose-400 block">
                    Re-Created Video Hook & Voiceover Script
                  </span>
                  <div className="p-3 bg-slate-900 rounded-lg text-xs font-mono text-slate-300 whitespace-pre-wrap leading-relaxed border border-slate-800">
                    {generatedVideoData.shortScript}
                  </div>
                </div>

                <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-2">
                  <span className="text-xs font-bold text-emerald-400 block">
                    WhatsApp Companion Video Message (Ready to Send)
                  </span>
                  <div className="p-3 bg-[#005c4b] rounded-lg text-xs text-[#e9edef] whitespace-pre-wrap leading-relaxed shadow">
                    {generatedVideoData.videoMessage}
                  </div>
                  <button
                    onClick={onOpenMessageAll}
                    className="mt-2 px-3 py-1.5 bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-bold text-xs rounded-lg flex items-center gap-1"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>Send this Video Message to All Leads [M]</span>
                  </button>
                </div>
              </div>

              {/* Storyboard Reel Slides (5 cols) */}
              <div className="lg:col-span-5 bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-3">
                <span className="text-xs font-bold text-white flex items-center gap-2">
                  <Video className="w-4 h-4 text-purple-400" />
                  Video Reel Storyboard Slides ({generatedVideoData.slides.length})
                </span>

                <div className="space-y-2">
                  {generatedVideoData.slides.map((s, idx) => (
                    <div key={idx} className="p-3 rounded-lg bg-slate-900 border border-slate-800 flex items-start justify-between gap-2">
                      <div>
                        <span className="text-[10px] font-mono text-amber-400 font-bold">Slide {idx + 1}</span>
                        <h5 className="text-xs font-semibold text-white mt-0.5">{s.title}</h5>
                        <p className="text-[11px] text-slate-400 mt-0.5">{s.subtitle}</p>
                      </div>
                      <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-slate-950 text-slate-400 border border-slate-800 shrink-0">
                        {s.duration}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* ========================================================================= */}
      {/* --- SUB-TAB: GOOGLE LEADS EXTRACTOR --- */}
      {/* ========================================================================= */}
      {activeSubTab === 'extractor' && (
        <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 space-y-5 animate-in fade-in">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
            <div>
              <h2 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
                <Globe className="w-4 h-4 text-emerald-400" />
                Free Google Data Extractor (No API Charges)
              </h2>
              <p className="text-xs text-slate-400">
                Extract high-intent enterprise contacts, colleges, or companies directly and push them into your WhatsApp broadcast queue.
              </p>
            </div>
          </div>

          {/* Search Form */}
          <form onSubmit={handleExtractFromGoogle} className="flex gap-2">
            <input
              type="text"
              required
              placeholder="Enter search keyword (e.g. 'IT Companies in Gurgaon', 'Engineering Colleges Pune', 'HR Consultancies Delhi')"
              value={googleQuery}
              onChange={(e) => setGoogleQuery(e.target.value)}
              className="flex-1 bg-slate-950 border border-slate-700 rounded-xl px-4 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500"
            />
            <button
              type="submit"
              disabled={isExtracting}
              className="px-5 py-2.5 bg-emerald-500 hover:bg-emerald-400 disabled:opacity-50 text-slate-950 font-bold text-xs rounded-xl flex items-center gap-1.5 transition-colors shadow-lg shadow-emerald-500/20"
            >
              {isExtracting ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Search className="w-4 h-4" />}
              <span>{isExtracting ? 'Extracting Contacts...' : 'Extract Free Google Leads'}</span>
            </button>
          </form>

          {/* Extracted Leads Table */}
          <div className="bg-slate-950 rounded-xl border border-slate-800 overflow-hidden">
            <div className="p-3 bg-slate-900/80 border-b border-slate-800 flex items-center justify-between text-xs text-slate-400">
              <span>{extractedLeads.length} Verified Contacts Extracted from Google</span>
              <button
                onClick={handlePushToAudience}
                className="px-3 py-1.5 bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-bold text-xs rounded-lg flex items-center gap-1 shadow-sm transition-colors"
              >
                <Check className="w-3.5 h-3.5" />
                <span>Add All to WhatsApp Audience Queue ({extractedLeads.length})</span>
              </button>
            </div>

            {importSuccessMsg && (
              <div className="p-2.5 bg-emerald-500/15 border-b border-emerald-500/30 text-emerald-400 text-xs text-center font-semibold">
                ✓ Successfully loaded {extractedLeads.length} leads into your active WhatsApp Audience table!
              </div>
            )}

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="text-slate-400 font-mono border-b border-slate-800">
                  <tr>
                    <th className="py-2.5 px-4">Contact Person</th>
                    <th className="py-2.5 px-4">Business / Company</th>
                    <th className="py-2.5 px-4">Phone Number</th>
                    <th className="py-2.5 px-4">Course / Role</th>
                    <th className="py-2.5 px-4">Extraction Source</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60 font-sans">
                  {extractedLeads.map((lead) => (
                    <tr key={lead.id} className="hover:bg-slate-900/50">
                      <td className="py-2.5 px-4 font-semibold text-white">{lead.name}</td>
                      <td className="py-2.5 px-4 text-slate-300">{lead.company}</td>
                      <td className="py-2.5 px-4 font-mono text-emerald-400">{lead.phone}</td>
                      <td className="py-2.5 px-4 text-slate-400">{lead.course}</td>
                      <td className="py-2.5 px-4">
                        <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-slate-800 text-sky-400 border border-slate-700">
                          {lead.tags[0] || 'Google Maps API-Free'}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
