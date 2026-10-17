export interface FestivalCampaign {
  id: string;
  name: string;
  icon: string;
  tagline: string;
  season: string;
  whatsappScript: string;
  buttons: Array<{ label: string; action: string; type: 'url' | 'call' | 'quick_reply' }>;
  theme: {
    paletteName: string;
    gradientType: 'gold' | 'emerald' | 'saffron' | 'royal';
    primaryHex: string;
    secondaryHex: string;
    accentHex: string;
    decorStyle: string;
    fontStyle: string;
  };
  videoAdContent: {
    title: string;
    duration: string;
    hook: string;
    storyboard: Array<{ scene: string; visual: string; voiceover: string }>;
    bgMusic: string;
    cta: string;
  };
  socialMediaAdFree: {
    instagramCaption: string;
    linkedinPost: string;
    hashtags: string[];
    organicGrowthTip: string;
    storyPollQuestion: string;
  };
}

export const FESTIVAL_CAMPAIGNS: FestivalCampaign[] = [
  {
    id: 'diwali-2026',
    name: 'Diwali (Festival of Lights)',
    icon: '🪔',
    tagline: 'Light Up Your Career & Corporate Hiring This Festive Season',
    season: 'Autumn / October - November',
    whatsappScript: `✨🪔 *Shubh Deepavali & Festive Career Prosperity!* 🪔✨

Dear {{name}},

May the divine festival of lights bring boundless joy, prosperity, and explosive career growth to you and the entire team at {{company}}!

To celebrate this auspicious season, Shri Shyam Consulting has rolled out our biggest festive celebration grant:

🎁 *Festive Highlights for {{company}}:*
🌟 Flat {{discount}} Grant on Advanced AI, Python & Robotics Masterclass
🌟 Pre-vetted Candidate Matrices for Lateral Hiring (IT/AI & Corporate Non-IT)
🌟 Free WhatsApp Automation Workflow consultation

⏰ *Festive Token valid until Laxmi Pujan weekend only.*

Claim your Diwali gift hamper & priority seat below:
👉 {{link}}

Wishing you a joyful and luminous Diwali!`,
    buttons: [
      { label: '🪔 Claim Diwali Grant (URL)', action: 'https://shrishyam.in/diwali', type: 'url' },
      { label: '📞 Talk to Advisor (Call)', action: '+919876543210', type: 'call' },
      { label: '🎁 Send Gift Hamper', action: 'DIWALI_GIFT', type: 'quick_reply' }
    ],
    theme: {
      paletteName: 'Diwali Golden Diya & Royal Amber',
      gradientType: 'gold',
      primaryHex: '#fbbf24',
      secondaryHex: '#78350f',
      accentHex: '#fef08a',
      decorStyle: 'Traditional Diyas, Sparkle Rangoli & Marigold Golden Glow',
      fontStyle: 'Plus Jakarta Sans Bold with Warm Amber Accents'
    },
    videoAdContent: {
      title: 'Diwali Prosperity: Upgrade Your Tech & Talent in 60s',
      duration: '30s Short / Reel',
      hook: 'This Diwali, don’t just illuminate your home—supercharge your company’s growth.',
      storyboard: [
        {
          scene: '00:00 - 00:05 (Hook)',
          visual: 'Cinematic visual of sparkling diyas transitioning into AI agent automation code waves.',
          voiceover: 'What if this Diwali brought a 50% salary hike or solved your company hiring crisis?'
        },
        {
          scene: '00:05 - 00:15 (Challenge)',
          visual: 'Frustrated recruiter looking at 1,000 resumes vs smooth AI automated shortlisting.',
          voiceover: 'Stop wasting weeks on manual screening. Shri Shyam Consulting delivers vetted candidates in 72 hours.'
        },
        {
          scene: '00:15 - 00:25 (Offer)',
          visual: 'Golden Diwali gift box opening with {{discount}} voucher badge.',
          voiceover: 'Unlock our exclusive Festive Grant on AI Masterclasses and corporate staffing matrices.'
        },
        {
          scene: '00:25 - 00:30 (CTA)',
          visual: 'WhatsApp logo with "Reply DIWALI" text overlay and phone mockup.',
          voiceover: 'Tap below to claim your Diwali voucher before the festival ends!'
        }
      ],
      bgMusic: 'Traditional Sitar + Contemporary Lo-Fi Festive Beats (Royalty Free)',
      cta: 'Reply "DIWALI" on WhatsApp to unlock the 40% festive scholarship voucher.'
    },
    socialMediaAdFree: {
      instagramCaption: `🪔 This Diwali, let your career and hiring shine brighter than the festival sky! ✨

Are you still relying on 2018 hiring and manual sales methods? It’s time to modernize:
✅ 24/7 WhatsApp AI Customer Support
✅ Python, LLM & Robotics Masterclasses
✅ Corporate Staffing (IT, AI, White & Blue collar)

🎁 Comment "DIWALI" below to receive our exclusive Festive Grant direct to your DMs (Ad-Free, No Sponsored Catch).

#Diwali2026 #CareerGrowth #AIAutomation #ShriShyamConsulting #DeepavaliHiring #TechUpskilling`,
      linkedinPost: `As we celebrate the Festival of Lights, organizations across India are reflecting on their digital transformation roadmap for Q4 and 2027.

At Shri Shyam Consulting, we have empowered over 120+ enterprises to reduce recruitment lead times by 55% while upskilling hundreds of professionals in AI, Python & Robotics.

In honour of Diwali, we are offering an exclusive 40% Corporate Partnership Grant for the first 25 businesses that partner with us this week.

Drop a comment or direct message to receive our confidential Candidate Matrix and Masterclass syllabus.

#DiwaliCelebration #CorporateStaffing #ExecutiveHiring #AIForLeaders #HRLeadership`,
      hashtags: ['#Diwali2026', '#FestiveHiring', '#AIAutomation', '#ShriShyamConsulting', '#UpskillNow', '#TechCareers'],
      organicGrowthTip: 'Post on Instagram Stories with an interactive "Goal for this Diwali?" question sticker to boost engagement by 3.2x without paying for ads.',
      storyPollQuestion: 'Are you planning to upskill in AI or hire new talent this Diwali?'
    }
  },
  {
    id: 'holi-2026',
    name: 'Holi (Festival of Colors & New Beginnings)',
    icon: '🎨',
    tagline: 'Splash Colors of Innovation & Fresh Talent Across Your Business',
    season: 'Spring / March',
    whatsappScript: `🎨🌈 *Holi Hai! Celebrate with Vibrant Growth & Innovation!* 🌈🎨

Hi {{name}},

Wishing you and your family a joyous, colorful, and vibrant Holi from the Shri Shyam Consulting team!

Let’s wash away sluggish hiring pipelines and outdated career bottlenecks with exciting new opportunities:

💥 *Holi Special Bonanza:*
🎨 {{discount}} Instant Fee Slash on our Full-Stack AI & Prompt Engineering Cohort
🎨 Fast-Track Staffing: Pre-screened Tech & Operations candidates ready for immediate joining
🎨 1-on-1 Strategic Consultation with our Senior Talent Partner

Grab your Holi celebratory voucher here:
👉 {{link}}

Have a safe, colorful, and joyful Holi!`,
    buttons: [
      { label: '🎨 Claim Holi Voucher (URL)', action: 'https://shrishyam.in/holi', type: 'url' },
      { label: '📞 Book Quick Call', action: '+919876543210', type: 'call' },
      { label: '🌈 Send Color Palette', action: 'HOLI_BONUS', type: 'quick_reply' }
    ],
    theme: {
      paletteName: 'Holi Color Splash & Vibrant Turquoise',
      gradientType: 'saffron',
      primaryHex: '#f97316',
      secondaryHex: '#db2777',
      accentHex: '#38bdf8',
      decorStyle: 'Festive Gulal Powder Explosions, Organic Splashes & Joyful Radiance',
      fontStyle: 'Energetic Bold Sans with Multicolor Accent Drops'
    },
    videoAdContent: {
      title: 'Holi Career Color Splash: 30s High-Energy Reel',
      duration: '30s Vertical Ad',
      hook: 'Is your current career feeling black and white? Let’s add some color.',
      storyboard: [
        {
          scene: '00:00 - 00:06 (Visual Hook)',
          visual: 'Slow motion burst of vivid gulal powders that clears to show high-tech dashboard.',
          voiceover: 'Tired of monochrome salaries and slow hiring? This Holi, upgrade to full color.'
        },
        {
          scene: '00:06 - 00:18 (Value Proposition)',
          visual: 'Fast-paced clips of AI robotics labs, Python code, and congratulatory offer letters.',
          voiceover: 'Shri Shyam Consulting brings you hands-on AI training and pre-vetted corporate recruitment.'
        },
        {
          scene: '00:18 - 00:30 (Celebration CTA)',
          visual: 'Festive Holi greeting badge with WhatsApp instant message link.',
          voiceover: 'Reply HOLI on WhatsApp now to splash {{discount}} off your next career milestone!'
        }
      ],
      bgMusic: 'Upbeat Dhol + Modern Electronic Fusion Beat',
      cta: 'Message "HOLI" on WhatsApp for free syllabus download.'
    },
    socialMediaAdFree: {
      instagramCaption: `🎨 Splash your career with the colors of AI, Robotics & Tech Mastery! 🌈

This Holi, celebrate with more than just sweets—invest in high-income skills that compound for years:
✅ Learn Prompt Engineering & Agentic Workflows
✅ Fast-track interviews with Top Tech Employers
✅ Enjoy our limited-time Holi Grant of up to 45% OFF

Tap the link in bio or drop a 🎨 in the comments for direct WhatsApp access.

#HappyHoli #Holi2026 #HoliHai #CareerColors #AIUpskilling #ShriShyamConsulting`,
      linkedinPost: `Spring brings renewal and new opportunities. This Holi, how is your organization infusing fresh energy into your talent acquisition strategy?

Shri Shyam Consulting is proud to have helped 80+ companies onboard pre-screened technical and operations talent in under 5 business days.

Wishing all our clients, candidates, and partners a joyous and prosperous Holi! 

#Holi2026 #TalentRenewal #TechHiring #HRStrategy #LeadershipInIndia`,
      hashtags: ['#HappyHoli', '#HoliFestiveOffer', '#CareerRevamp', '#ShriShyamConsulting', '#FutureOfWork'],
      organicGrowthTip: 'Run an unprompted "Before vs After Upskilling" reel using trending Holi audio for maximum algorithmic reach.',
      storyPollQuestion: 'What’s your #1 goal before mid-year: New Job or Team Expansion?'
    }
  },
  {
    id: 'new-year-2026',
    name: 'Happy New Year 2026 (Annual Career Kickoff)',
    icon: '🎆',
    tagline: 'New Year, New Milestones: Unlock 3x Salary Potential & 24/7 Automation',
    season: 'Winter / December - January',
    whatsappScript: `🎆🍾 *Happy New Year 2026! Time to Level Up!* 🍾🎆

Hi {{name}},

As the new year begins, the team at Shri Shyam Consulting wishes you and {{company}} groundbreaking achievements, prosperity, and continuous growth!

Are you ready to turn your 2026 professional resolutions into reality?

🚀 *2026 Kickoff Benefits:*
🔹 Flat {{discount}} New Year Grant on AI & Robotics Cohort
🔹 Pan-India Talent Solutions: Zero recruitment fees on your first hiring mandate
🔹 Official WhatsApp Automation Starter Blueprint

Seats for our January cohort are strictly limited to the first 50 participants.

Reserve your slot today:
👉 {{link}}

Here’s to making 2026 your most profitable year yet!`,
    buttons: [
      { label: '🚀 Claim 2026 Grant (URL)', action: 'https://shrishyam.in/newyear', type: 'url' },
      { label: '📞 Schedule 2026 Strategy Call', action: '+919876543210', type: 'call' },
      { label: '🎆 2026 Syllabus Pack', action: 'NEW_YEAR_2026', type: 'quick_reply' }
    ],
    theme: {
      paletteName: 'New Year Midnight Indigo & Platinum Glow',
      gradientType: 'royal',
      primaryHex: '#6366f1',
      secondaryHex: '#1e1b4b',
      accentHex: '#a5b4fc',
      decorStyle: 'Futuristic Neon Fireworks, Golden Clock Countdown & Geometric Grid',
      fontStyle: 'Modern Sleek JetBrains Sans'
    },
    videoAdContent: {
      title: 'Make 2026 The Year You Dominate AI & Tech Hiring',
      duration: '35s Reel',
      hook: 'Don’t let 2026 look exactly like 2025. Here is your roadmap.',
      storyboard: [
        {
          scene: '00:00 - 00:08 (New Year Clock)',
          visual: 'Countdown clock ticking down with dramatic sound effects.',
          voiceover: 'A new year means new budgets, new salary bands, and new technology standards.'
        },
        {
          scene: '00:08 - 00:22 (The Solution)',
          visual: 'Visual graph showing 3x salary growth for AI engineers vs stagnant non-tech roles.',
          voiceover: 'Shri Shyam Consulting’s practical cohorts fast-track you into modern high-income disciplines.'
        },
        {
          scene: '00:22 - 00:35 (Action CTA)',
          visual: 'New Year champagne burst with 50-seat early bird lock banner.',
          voiceover: 'First 50 seats get our 2026 Kickoff Scholarship. Tap the WhatsApp button right now.'
        }
      ],
      bgMusic: 'Cinematic Epic Orchestral Synthwave (Ad-Free Licensed)',
      cta: 'Click below to register before January enrollment shuts down.'
    },
    socialMediaAdFree: {
      instagramCaption: `🥂 2026 is officially here. Are you still hesitating on AI and modern workflows?

Top performers don’t wait until June to learn what matters today:
✅ Master Generative AI & Automation in 8 weeks
✅ Get referred directly to hiring companies
✅ Lock in our New Year Scholarship Voucher (up to 50% OFF)

DM "2026" or visit the link in bio to start on day one!

#NewYear2026 #GoalSetting #AIRevolution #CareerKickoff #ShriShyamConsulting #TechSkills`,
      linkedinPost: `Happy New Year to our global professional network! 🎆

As organizations finalize their 2026 headcount and automation targets, talent quality will be the primary differentiator between market leaders and followers.

Shri Shyam Consulting stands ready to support your organization’s lateral staffing and upskilling needs throughout 2026.

Let us build something exceptional together this year.

#NewYear2026 #Leadership #TalentAcquisition #ExecutiveStaffing #FutureOfWork`,
      hashtags: ['#HappyNewYear2026', '#ResolutionsIntoReality', '#AILeadership', '#TechHiring', '#ShriShyamConsulting'],
      organicGrowthTip: 'Create a 5-slide carousel breaking down "Top 5 High-Demand Tech Skills for 2026" for high organic saves and shares.',
      storyPollQuestion: 'What is your #1 focus in 2026: Upskilling or Scaling Your Team?'
    }
  },
  {
    id: 'independence-day-2026',
    name: 'Independence Day & Republic Day 🇮🇳',
    icon: '🇮🇳',
    tagline: 'Empowering India’s Workforce with World-Class Automation & AI Leadership',
    season: 'August (15th Aug) / January (26th Jan)',
    whatsappScript: `🇮🇳 *Happy Independence Day! Empowering Atmanirbhar Bharat!* 🇮🇳

Greetings {{name}},

On this historic occasion, Shri Shyam Consulting salutes the visionary builders, innovators, and leaders driving India’s growth story!

We are committed to democratizing cutting-edge AI and workforce excellence across Pan-India:

🌟 *Independence Freedom Offer:*
🇮🇳 45% "Atmanirbhar" Scholarship on AI & Robotics programs
🇮🇳 Zero Placement Retainer on First 2 Blue/White-collar Mandates
🇮🇳 Free National Talent Benchmark Dossier for {{company}}

Valid exclusively for registrations confirmed this patriotic week.

Claim your Freedom Grant:
👉 {{link}}

Jai Hind! Vande Mataram!`,
    buttons: [
      { label: '🇮🇳 Claim Freedom Grant (URL)', action: 'https://shrishyam.in/india', type: 'url' },
      { label: '📞 Speak to Counselor', action: '+919876543210', type: 'call' },
      { label: '📄 Download India Talent Dossier', action: 'INDIA_FREEDOM', type: 'quick_reply' }
    ],
    theme: {
      paletteName: 'Tricolor Saffron, White & Navy Chakra',
      gradientType: 'emerald',
      primaryHex: '#10b981',
      secondaryHex: '#f97316',
      accentHex: '#38bdf8',
      decorStyle: 'Subtle Patriotic Ribbon Glow, Ashoka Chakra Motif & Indian Tech Pride',
      fontStyle: 'Dignified Plus Jakarta Sans Bold'
    },
    videoAdContent: {
      title: 'Building India’s Tech Tomorrow: 30s Patriotic Campaign',
      duration: '30s Patriotic Reel',
      hook: 'India is rising as the global AI capital. Are you ready to lead it?',
      storyboard: [
        {
          scene: '00:00 - 00:08 (Patriotic Pride)',
          visual: 'Inspiring aerial shots of Indian tech parks transitioning to youth in robotics labs.',
          voiceover: 'From silicon hubs to local manufacturing, India is building the world’s future.'
        },
        {
          scene: '00:08 - 00:20 (The Mission)',
          visual: 'Engineers working on machine learning models and high-speed recruitment desks.',
          voiceover: 'Shri Shyam Consulting is dedicated to empowering over 50,000 professionals with high-tier tech skills.'
        },
        {
          scene: '00:20 - 00:30 (Freedom Grant CTA)',
          visual: 'Tricolor banner with 45% Freedom Scholarship token.',
          voiceover: 'Claim your Freedom Scholarship this Independence Day. Tap below to begin!'
        }
      ],
      bgMusic: 'Inspirational Cinematic Acoustic Indian Flute + Contemporary Beats',
      cta: 'Reply "INDIA" on WhatsApp for your special Independence Day voucher.'
    },
    socialMediaAdFree: {
      instagramCaption: `🇮🇳 Happy Independence Day! Freedom is having the skills to dictate your own destiny. ✨

India is already leading the global software boom—now it’s time to lead in Generative AI, Robotics, and Smart Manufacturing.

Proud to offer our 45% Freedom Scholarship this week:
✅ Hands-on Python & Generative AI Labs
✅ Pan-India Corporate Staffing Placements
✅ Dedicated Placement Advisor Support

Comment "JAI HIND" to receive the syllabus & voucher details in your DM!

#IndependenceDay #ProudIndian #AtmanirbharBharat #TechIndia #ShriShyamConsulting #JaiHind`,
      linkedinPost: `On the 79th Independence Day of our nation, Shri Shyam Consulting honors the millions of entrepreneurs, engineers, and workers building a prosperous, self-reliant India.

Our mission is clear: to bridge the talent gap by equipping every ambitious Indian with global-standard AI, engineering, and operational skills.

Warmest patriotic wishes to our clients and partners across the globe.

#IndependenceDay2026 #AtmanirbharBharat #MakeInIndia #WorkforceDevelopment #ShriShyamConsulting`,
      hashtags: ['#IndependenceDay', '#IndiaRising', '#TechLeadership', '#ShriShyamConsulting', '#FutureOfIndia'],
      organicGrowthTip: 'Share a story highlighting an inspiring candidate who transformed their career through upskilling.',
      storyPollQuestion: 'Is India set to become the global AI capital by 2030?'
    }
  },
  {
    id: 'eid-2026',
    name: 'Eid al-Fitr & Eid al-Adha',
    icon: '🌙',
    tagline: 'Warm Wishes of Peace, Blessings & Abundant Professional Success',
    season: 'Spring / Summer',
    whatsappScript: `🌙✨ *Eid Mubarak! May Your Journey Be Blessed With Success!* ✨🌙

Dear {{name}},

Shri Shyam Consulting wishes you, your family, and your team at {{company}} a joyous and blessed Eid Mubarak!

In the spirit of gratitude and generosity, we are pleased to offer our special Festive Eid Grant:

🌟 *Eid Celebration Highlights:*
🌙 Flat {{discount}} Grant on all professional AI & Machine Learning cohorts
🌙 Complimentary Executive Hiring consultation for corporate clients
🌙 Access to private career masterclass workbook

Valid for registrations secured during the festive Eid weekend.

Receive your Eid gift voucher:
👉 {{link}}

Eid Mubarak to you and your loved ones!`,
    buttons: [
      { label: '🌙 Claim Eid Voucher (URL)', action: 'https://shrishyam.in/eid', type: 'url' },
      { label: '📞 Speak to Advisor', action: '+919876543210', type: 'call' },
      { label: '✨ Send Eid Greetings', action: 'EID_MUBARAK', type: 'quick_reply' }
    ],
    theme: {
      paletteName: 'Crescent Emerald & Radiant Gold',
      gradientType: 'emerald',
      primaryHex: '#059669',
      secondaryHex: '#064e3b',
      accentHex: '#facc15',
      decorStyle: 'Crescent Moon, Geometric Islamic Stars & Golden Lantern Glow',
      fontStyle: 'Sophisticated Elegant Sans with Golden Typography'
    },
    videoAdContent: {
      title: 'Eid Mubarak: Celebrate With Abundance & Tech Excellence',
      duration: '30s Festive Reel',
      hook: 'Wishing you peace, happiness, and an extraordinary career leap this Eid.',
      storyboard: [
        {
          scene: '00:00 - 00:08 (Greetings)',
          visual: 'Elegant crescent moon animation transitioning into golden celebratory typography.',
          voiceover: 'Eid Mubarak! May this blessed season bring prosperity and peace to your life.'
        },
        {
          scene: '00:08 - 00:20 (The Blessings of Growth)',
          visual: 'Professional student receiving completion certificate and salary hike notification.',
          voiceover: 'Invest in skills that uplift your entire family with our AI and automation programs.'
        },
        {
          scene: '00:20 - 00:30 (Gift CTA)',
          visual: 'WhatsApp screen with one-tap Claim Gift button.',
          voiceover: 'Reply "EID" to unlock our celebratory grant today.'
        }
      ],
      bgMusic: 'Traditional Peaceful Oud & Warm Festive Ambient Melodies',
      cta: 'Message "EID" on WhatsApp to unlock the gift voucher.'
    },
    socialMediaAdFree: {
      instagramCaption: `🌙 Eid Mubarak to all our students, partners, and corporate friends! ✨

May this blessed day bring countless joy, peace, and new career heights to you and your family.

🎁 Our Eid Celebration Grant is live this weekend:
✅ 40% OFF all AI & Automation Masterclasses
✅ Free Resume & CTC Review with our Senior Consultant

Comment "EID MUBARAK" to receive the direct link in your DMs.

#EidMubarak #Eid2026 #BlessedSeason #CareerAbundance #ShriShyamConsulting`,
      linkedinPost: `Warmest greetings on the auspicious occasion of Eid al-Fitr! 🌙

At Shri Shyam Consulting, we extend our heartfelt wishes of peace, happiness, and prosperity to all our clients, associates, and team members celebrating worldwide.

#EidMubarak #Eid2026 #Celebration #WorkplaceInclusion #ShriShyamConsulting`,
      hashtags: ['#EidMubarak', '#FestiveBlessings', '#CareerSuccess', '#ShriShyamConsulting'],
      organicGrowthTip: 'Post your Eid greeting early in the morning (around 8-9 AM) to capture family celebration traffic.',
      storyPollQuestion: 'Are you spending Eid with family or taking time for strategic learning?'
    }
  },
  {
    id: 'flash-offer-2026',
    name: '48-Hour Festive Flash Offer',
    icon: '⚡',
    tagline: 'Urgent 48-Hour Early-Bird Scholarship & Free Corporate Hiring Audit',
    season: 'Year-Round / Flash Weekends',
    whatsappScript: `⚡🚨 *URGENT 48-HOUR FLASH OFFER: 50% TUITION GRANT* 🚨⚡

Hey {{name}},

Quick heads-up! We just released an unannounced 48-Hour Flash Offer for {{company}}:

🔥 *What You Get (Next 48 Hours Only):*
⚡ Flat 50% OFF the upcoming AI, Python & Robotics Batch
⚡ Free Corporate Hiring Audit & Vetted Candidate Dossier
⚡ Lifetime Access to our Private AI Prompts & Workflow Vault

⏳ *Strict Timer:* Code expires exactly in 48 hours at midnight.
Code: FLASH50

Claim your flash voucher before the timer hits zero:
👉 {{link}}

Reply "EXTEND" if you need 24 hours extra!`,
    buttons: [
      { label: '⚡ Claim 50% Flash Voucher (URL)', action: 'https://shrishyam.in/flash', type: 'url' },
      { label: '📞 Speak to Counselor Now', action: '+919876543210', type: 'call' },
      { label: '⏳ Extend By 24h', action: 'EXTEND_24H', type: 'quick_reply' }
    ],
    theme: {
      paletteName: 'High-Impact Crimson & Electric Yellow',
      gradientType: 'saffron',
      primaryHex: '#ef4444',
      secondaryHex: '#7f1d1d',
      accentHex: '#facc15',
      decorStyle: 'High-Energy Lightning Bolts, Countdown Clock & Pulsing Alerts',
      fontStyle: 'Heavy Impact Sans with High-Contrast Badges'
    },
    videoAdContent: {
      title: '48-Hour Flash Sale: Urgent Action Video',
      duration: '25s Fast Reel',
      hook: 'Stop scrolling! This 50% flash discount expires in 48 hours.',
      storyboard: [
        {
          scene: '00:00 - 00:05 (Urgent Stop)',
          visual: 'Fast flashing countdown timer with siren sound wave.',
          voiceover: 'Stop scrolling! A 48-hour flash sale just dropped for {{company}}.'
        },
        {
          scene: '00:05 - 00:18 (The Offer)',
          visual: 'Fast screen recording of masterclass curriculum and student placement letters.',
          voiceover: 'Get 50% off our premier AI & Python cohort before public pricing goes live.'
        },
        {
          scene: '00:18 - 00:25 (Countdown Urgency)',
          visual: 'Timer hitting 00:00 with red Enroll Now button.',
          voiceover: 'Seats are capped at 50. Tap the WhatsApp link right now!'
        }
      ],
      bgMusic: 'Fast Ticking Clock + High Energy Bassline',
      cta: 'Reply "FLASH" to claim the 50% voucher code immediately.'
    },
    socialMediaAdFree: {
      instagramCaption: `🚨 48 HOURS ONLY: 50% OFF OUR FLAGSHIP AI ACCELERATOR ⚡

We rarely do this, but for the next 48 hours, you can claim a half-price scholarship for our industry-accredited program:
✅ Hands-on Generative AI & Automation
✅ Placement Assistance with 100+ Hiring Partners
✅ Lifetime Community Support

⏳ Offer strictly limited to the first 30 applicants.

Link in bio to claim your code before it expires!

#FlashSale #LimitedTimeOffer #AIForBeginners #CareerSprint #ShriShyamConsulting`,
      linkedinPost: `Notice to hiring managers and tech professionals:

For the next 48 hours, Shri Shyam Consulting is opening corporate priority access for our upcoming Generative AI & Staffing Accelerator at a 50% early-adopter grant.

Send a direct message to secure priority placement for your team.

#FlashAnnouncement #CorporateTraining #Upskilling #Leadership`,
      hashtags: ['#FlashSale', '#48HoursOnly', '#CareerOpportunity', '#ShriShyamConsulting'],
      organicGrowthTip: 'Add an Instagram countdown sticker to your story—followers can opt in to be notified when the offer ends.',
      storyPollQuestion: 'Are you ready to claim your 50% flash discount before the timer runs out?'
    }
  }
];
