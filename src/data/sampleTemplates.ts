import { Template } from '../types';

export const INITIAL_TEMPLATES: Template[] = [
  // 1. User Requested: Special Announcement / Limited Time Offer
  {
    id: 'tmpl-special-announcement',
    title: '🚀 Special Announcement: WhatsApp Automation & AI Growth',
    category: 'Special Announcements',
    content: `🚀 *[Special Announcement / Limited Time Offer]*

Hi {{name}},

Are you ready to scale your business with official WhatsApp automation and AI-driven growth strategies?

We’ve just launched our exclusive program designed to help you:
✅ Automate customer replies 24/7 with zero delay
✅ Reach thousands of qualified leads instantly
✅ Boost sales conversions by up to 3x

🔥 *Exclusive Offer:* Get access to our step-by-step masterclass today at an exclusive early-bird price!

📍 *Offer valid for the first 50 seats only.*

-----------------------------------
👇 *Take Action Below:*`,
    variables: ['name', 'company', 'discount', 'link'],
    buttons: [
      { type: 'url', label: '🔗 Enroll Now (URL)', value: 'https://whatsblast.io/enroll' },
      { type: 'call', label: '📞 Speak to Expert (Call)', value: '+919876543210' }
    ],
    createdDate: '2026-10-17',
    conversionRate: '56.4%'
  },

  // 2. User Requested: Template A: Course & Training Masterclass Outreach
  {
    id: 'tmpl-ai-masterclass-outreach',
    title: '🚀 [Template A] Master AI & Automation Technologies Outreach',
    category: 'Masterclass & Training',
    content: `🚀 *[Special Invitation] Master AI & Automation Technologies!*

Hi {{name}},

Are you looking to gain practical skills in AI, Machine Learning, and Robotics to fast-track your career?

We are hosting an exclusive interactive masterclass designed to give you hands-on experience with:
✅ Generative AI & Prompt Engineering
✅ Python for Machine Learning
✅ Low-Code Automation Workflows

🔥 *Limited Seats:* Early-bird registration is currently open for the upcoming batch!

-----------------------------------
👇 *Select an option below:*`,
    variables: ['name', 'course', 'date', 'link'],
    buttons: [
      { type: 'url', label: '🔗 Register Now (URL)', value: 'https://whatsblast.io/register-ai' },
      { type: 'call', label: '📞 Talk to Academic Counselor (Call)', value: '+919876543211' }
    ],
    createdDate: '2026-10-17',
    conversionRate: '49.2%'
  },

  // 3. User Requested: Template B: Corporate Staffing & Recruitment Proposal (Shri Shyam Consulting)
  {
    id: 'tmpl-shyam-corporate-staffing',
    title: '📋 [Template B] Corporate Staffing & Recruitment (Shri Shyam Consulting)',
    category: 'Corporate Staffing',
    content: `📋 *Streamline Your Recruitment & Executive Hiring*

Greetings {{name}},

Finding the right technical and operational talent shouldn't slow down your company's growth.

At Shri Shyam Consulting, we provide end-to-end recruitment solutions tailored to your business needs:
🔹 Tech & Engineering Hiring (IT, AI, Cloud & Fullstack)
🔹 Corporate Pan India Non-IT, Blue-collar & White-collar Staffing
🔹 Pre-screened & Vetted Candidate Matrices with verified CTC & Notice Period

Would you be open to a brief 5-minute call this week to discuss {{company}}'s active hiring mandates?

-----------------------------------
👇 *Quick Actions:*`,
    variables: ['name', 'company', 'phone'],
    buttons: [
      { type: 'quick_reply', label: '📩 Request Talent Profile', value: 'REQUEST_PROFILES' },
      { type: 'quick_reply', label: '📞 Schedule Brief Call', value: 'SCHEDULE_CALL' },
      { type: 'quick_reply', label: '❌ Not Hiring Right Now', value: 'NOT_HIRING' }
    ],
    createdDate: '2026-10-17',
    conversionRate: '41.8%'
  },

  // 4. User Requested: AI Calling Follow-up message
  {
    id: 'tmpl-calling-followup',
    title: '📞 Post-Call Discussion & Candidate Matrix Follow-Up',
    category: 'AI Calling Follow-up',
    content: `Hello {{name}},

Thank you for speaking with our team at Shri Shyam Consulting today regarding the {{course}} requirement. 🤝

As discussed during our call, we have shortlisted high-match profiles tailored to your CTC budget and notice period criteria.

Attached below is the complete candidate matrix and interview availability slots.

Please let us know your preferred interview slots or reply here for instant coordination!`,
    variables: ['name', 'company', 'course', 'link'],
    buttons: [
      { type: 'url', label: '📂 View Candidate Dossier', value: 'https://shrishyam.in/candidates' },
      { type: 'quick_reply', label: 'Confirm Interview Slots 🗓️', value: 'CONFIRM_SLOTS' }
    ],
    createdDate: '2026-10-17',
    conversionRate: '64.0%'
  },

  // 5. User Requested: Payment & Advance Notice Message
  {
    id: 'tmpl-payment-notice',
    title: '💳 Placement Fee & Admission Settlement Reminder',
    category: 'Payment Notice',
    content: `Dear {{name}},

Greetings from Shri Shyam Consulting Accounts Desk. 🧾

This is a friendly reminder regarding the settlement for invoice #SSC-{{phone}} for {{company}}'s placement mandate:

💼 Profile: {{course}}
💰 Amount Due: {{discount}}
🗓 Due Date: {{date}}

You can process payment securely via UPI, NEFT or Payment Gateway:
👉 {{link}}

Kindly reply with the transaction screenshot once settled for immediate receipt generation. Thank you!`,
    variables: ['name', 'company', 'course', 'phone', 'discount', 'date', 'link'],
    buttons: [
      { type: 'url', label: '💳 Pay Online via UPI / Gateway', value: 'https://shrishyam.in/pay' },
      { type: 'quick_reply', label: 'Already Paid / Sent UTR ✅', value: 'PAID' }
    ],
    createdDate: '2026-10-17',
    conversionRate: '72.5%'
  },

  // 6. User Requested: Job Description (JD) Direct Message
  {
    id: 'tmpl-jd-direct-broadcast',
    title: '💼 New Job Opening & Role Specification Dispatch',
    category: 'Corporate Staffing',
    content: `🌟 *Urgent Hiring Mandate at {{company}}*

Dear {{name}},

We have an exciting opportunity matching your profile in {{course}}!

📌 Role: {{course}}
🏢 Location: Pan-India (Hybrid / Onsite)
💵 Budget CTC: Up to {{discount}}
⏱ Notice Period Preference: Immediate to 30 Days

Key Responsibilities:
• Lead technical and operational execution
• Coordinate with leadership & client stakeholders
• Fast-track career growth with quarterly performance bonuses

Would you like to be put forward for the first interview round this week?`,
    variables: ['name', 'company', 'course', 'discount'],
    buttons: [
      { type: 'quick_reply', label: 'Yes, Interested & Share CV 📄', value: 'INTERESTED_SHARE_CV' },
      { type: 'call', label: 'Speak to Recruiter 📞', value: '+919876543210' }
    ],
    createdDate: '2026-10-17',
    conversionRate: '48.9%'
  },

  // 7. Free YouTube Video Promo (by Rashmi Sondhi)
  {
    id: 'tmpl-youtube-rashmi',
    title: 'Free YouTube Video Promo (by Rashmi Sondhi)',
    category: 'Free YouTube Video Promo',
    content: `Hey {{name}}! 🎬

Rashmi Sondhi just dropped an exclusive 25-minute tactical masterclass breakdown on our official YouTube channel! 

In this video, Rashmi unpacks:
✨ How {{company}} teams can scale high-ticket leads in 2026
⚡ The exact 3-step automation blueprint for {{course}}
🎁 A surprise bonus sheet attached in the description

Watch it free before we take it unlisted this weekend:
👉 {{link}}

Reply "RASHMI" if you want the companion workbook sent directly here!`,
    variables: ['name', 'company', 'course', 'link'],
    buttons: [
      { type: 'url', label: 'Watch Video on YouTube 🎥', value: 'https://youtube.com/@rashmisondhi' },
      { type: 'quick_reply', label: 'Send Workbook 📚', value: 'RASHMI' }
    ],
    createdDate: '2026-10-10',
    conversionRate: '42.8%'
  },

  // 8. Masterclass & Training
  {
    id: 'tmpl-masterclass-training',
    title: 'Masterclass & Live Cohort Registration',
    category: 'Masterclass & Training',
    content: `Hi {{name}}, quick heads up regarding your interest in {{course}}! 🎓

We are opening 15 private seats for next week's hands-on masterclass series. Because you are from {{company}}, your application has been pre-approved.

🗓 Date: {{date}}
🎟 Tier: VIP Priority Seat
🔥 Applied Discount: {{discount}} OFF tuition

Click below to claim your seat before public enrollments open:
{{link}}`,
    variables: ['name', 'course', 'company', 'date', 'discount', 'link'],
    buttons: [
      { type: 'url', label: 'Confirm Masterclass Seat 🎟️', value: 'https://masterclass.whatsblast.io' },
      { type: 'call', label: 'Talk to Academic Advisor 📞', value: '+14158902100' }
    ],
    createdDate: '2026-10-08',
    conversionRate: '38.4%'
  },

  // 9. 48-Hour Flash Offers
  {
    id: 'tmpl-flash-offer',
    title: '48-Hour Flash VIP Discount Offer',
    category: '48-Hour Flash Offers',
    content: `⚡ FLASH SALE ALERT (Next 48 Hours Only) ⚡

Hey {{name}},

Your team at {{company}} qualified for an instant {{discount}} voucher toward the upcoming {{course}} bootcamp.

⏳ This promotional coupon expires strictly in 48 hours.
Code: FLASH{{discount}}

Secure your voucher now:
{{link}}

Questions? Just reply to this WhatsApp message!`,
    variables: ['name', 'company', 'discount', 'course', 'link'],
    buttons: [
      { type: 'url', label: 'Claim {{discount}} Discount ⚡', value: 'https://whatsblast.io/flash' },
      { type: 'quick_reply', label: 'Extend by 24h ⏳', value: 'EXTEND' }
    ],
    createdDate: '2026-10-12',
    conversionRate: '46.1%'
  },

  // 10. Live Webinars
  {
    id: 'tmpl-webinar-reminder',
    title: 'Live Webinar Starting Soon (Backstage Pass)',
    category: 'Live Webinars',
    content: `🚨 Reminder: We go live in 45 minutes!

Hey {{name}},

The interactive workshop on "Automating Enterprise Growth" begins at {{date}}.

Your personalized backstage room is ready:
👉 {{link}}

Have a pen and notebook handy. We will also do a live Q&A session at the end. See you inside!`,
    variables: ['name', 'date', 'link'],
    buttons: [
      { type: 'url', label: 'Enter Live Room 🔴', value: 'https://webinar.whatsblast.io/live' }
    ],
    createdDate: '2026-10-14',
    conversionRate: '54.2%'
  },

  // 11. Invoice Reminders
  {
    id: 'tmpl-invoice-reminder',
    title: 'Polite Corporate Invoice & Payment Notice',
    category: 'Invoice Reminders',
    content: `Dear {{name}},

Hope you are doing well! 🧾

This is a courtesy reminder that invoice #WB-2026 for {{company}}'s training and software seats is scheduled for settlement on {{date}}.

You can securely view the PDF invoice and complete payment through the authorized link:
{{link}}

If payment has already been processed by your accounts department, please disregard this note. Thank you!`,
    variables: ['name', 'company', 'date', 'link'],
    buttons: [
      { type: 'url', label: 'View & Pay Invoice 💳', value: 'https://billing.whatsblast.io' },
      { type: 'quick_reply', label: 'Already Paid ✅', value: 'ALREADY_PAID' }
    ],
    createdDate: '2026-10-02',
    conversionRate: '68.9%'
  },

  // 12. VIP Onboarding
  {
    id: 'tmpl-vip-onboarding',
    title: 'VIP Onboarding & Community Key',
    category: 'VIP Onboarding',
    content: `🎉 Welcome to the inner circle, {{name}}!

Your enrollment in the {{course}} accelerator is officially activated for {{company}}.

Here is your private onboarding checklist:
1️⃣ Join the Founders & Engineers Slack: {{link}}
2️⃣ Bookmark your 1-on-1 advisor calendar
3️⃣ Access your orientation modules

We are thrilled to have you with us! Drop a "READY" below when you have joined.`,
    variables: ['name', 'course', 'company', 'link'],
    buttons: [
      { type: 'url', label: 'Join Private Community 🚀', value: 'https://slack.whatsblast.io/vip' },
      { type: 'quick_reply', label: 'I am Ready! 🎉', value: 'READY' }
    ],
    createdDate: '2026-10-09',
    conversionRate: '79.3%'
  },

  // 13. Win-Back Campaigns
  {
    id: 'tmpl-winback',
    title: 'Win-Back Campaign: We Miss You Gift',
    category: 'Win-Back Campaigns',
    content: `Hey {{name}}, it's been a while since we connected! 🌿

We noticed you paused your {{course}} exploration at {{company}}. We just revamped the entire curriculum with real-world AI agents and live projects.

To welcome you back, we've loaded a special {{discount}} re-enrollment grant onto your profile:
{{link}}

Let us know if you'd like a quick recap of what's new!`,
    variables: ['name', 'course', 'company', 'discount', 'link'],
    buttons: [
      { type: 'url', label: 'Reactivate With {{discount}} 🎁', value: 'https://whatsblast.io/winback' },
      { type: 'quick_reply', label: 'Schedule Call 📞', value: 'CALL_ME' }
    ],
    createdDate: '2026-10-07',
    conversionRate: '29.7%'
  },

  // 14. Course Syllabus Downloads
  {
    id: 'tmpl-syllabus-download',
    title: 'Complete 2026 Syllabus & Capstone Specs',
    category: 'Course Syllabus Downloads',
    content: `Hi {{name}},

As requested, here is the full comprehensive 2026 syllabus for {{course}}:

📂 Module Breakdown: 12 Weeks of Production Labs
🛠 Capstone Projects: Enterprise Deployment, CI/CD & LLM Integration
💼 Career Support & Corporate Placement Partner list

Download the complete PDF package here:
👉 {{link}}

Would you like me to reserve your tuition lock before prices increase on {{date}}?`,
    variables: ['name', 'course', 'link', 'date'],
    buttons: [
      { type: 'url', label: 'Download Full Syllabus PDF 📄', value: 'https://assets.whatsblast.io/syllabus.pdf' },
      { type: 'quick_reply', label: 'Lock Current Price 🔒', value: 'LOCK_PRICE' }
    ],
    createdDate: '2026-10-11',
    conversionRate: '51.0%'
  }
];
