import { Lead } from '../types';

export const INITIAL_LEADS: Lead[] = [
  {
    id: 'lead-01',
    name: 'Priya Sharma',
    phone: '+1 (415) 555-0142',
    company: 'TechNova Labs',
    course: 'Full-Stack AI Engineering',
    status: 'pending',
    discount: '35%',
    selected: true,
    tags: ['VIP Lead', 'Tech Stack', 'High Priority'],
    lastContacted: '2 days ago'
  },
  {
    id: 'lead-02',
    name: 'Rajesh Sondhi',
    phone: '+1 (415) 555-0189',
    company: 'Global Growth Ventures',
    course: 'Enterprise Product Leadership',
    status: 'delivered',
    discount: '40%',
    selected: true,
    tags: ['C-Suite', 'Corporate Sponsor'],
    lastContacted: 'Yesterday'
  },
  {
    id: 'lead-03',
    name: 'Sarah Jenkins',
    phone: '+1 (212) 555-0193',
    company: 'Fintech Solutions UK',
    course: 'Data Engineering & Modern Pipelines',
    status: 'read',
    discount: '30%',
    selected: true,
    tags: ['Webinar Attendee', 'Inbound'],
    lastContacted: '3 hours ago'
  },
  {
    id: 'lead-04',
    name: 'Amit Patel',
    phone: '+1 (312) 555-0177',
    company: 'Apex Cloud Innovations',
    course: 'Cloud DevOps & Kubernetes Mastery',
    status: 'pending',
    discount: '25%',
    selected: true,
    tags: ['Warm Lead', 'Engineering Manager'],
    lastContacted: '4 days ago'
  },
  {
    id: 'lead-05',
    name: 'Emily Chen',
    phone: '+1 (650) 555-0114',
    company: 'VentureScale Bio',
    course: 'Growth Strategy & Metrics',
    status: 'pending',
    discount: '50%',
    selected: true,
    tags: ['Flash Offer', 'Founder'],
    lastContacted: '1 day ago'
  },
  {
    id: 'lead-06',
    name: 'Vikram Malhotra',
    phone: '+1 (408) 555-0163',
    company: 'Zenith Talent & Staffing',
    course: 'Corporate Upskilling Cohort',
    status: 'delivered',
    discount: '35%',
    selected: true,
    tags: ['Enterprise Account', 'HR Director'],
    lastContacted: '5 days ago'
  },
  {
    id: 'lead-07',
    name: 'Dr. Aris Thorne',
    phone: '+1 (617) 555-0158',
    company: 'BioHealth Analytics',
    course: 'Bio-Informatics & Genomics AI',
    status: 'read',
    discount: '20%',
    selected: true,
    tags: ['Scientific Research', 'Key Speaker'],
    lastContacted: '6 hours ago'
  },
  {
    id: 'lead-08',
    name: 'Marcus Vance',
    phone: '+1 (206) 555-0131',
    company: 'Vance Autonomous Logistics',
    course: 'Executive Supply Chain Tech',
    status: 'pending',
    discount: '40%',
    selected: true,
    tags: ['COO', 'High Value'],
    lastContacted: '3 days ago'
  },
  {
    id: 'lead-09',
    name: 'Sneha Reddy',
    phone: '+1 (415) 555-0199',
    company: 'HyperGrowth Media',
    course: 'Advanced Prompt & Workflow Engineering',
    status: 'pending',
    discount: '45%',
    selected: true,
    tags: ['Creator', 'Rashmi YouTube Ref'],
    lastContacted: 'Just now'
  },
  {
    id: 'lead-10',
    name: 'David Miller',
    phone: '+1 (303) 555-0145',
    company: 'Nordic Peak Security',
    course: 'Cyber Defense & Threat Intel',
    status: 'pending',
    discount: '30%',
    selected: true,
    tags: ['Security Lead', 'Q4 Budget'],
    lastContacted: '1 week ago'
  },
  {
    id: 'lead-11',
    name: 'Ananya Iyer',
    phone: '+1 (415) 555-0122',
    company: 'Pulse Creative Studios',
    course: 'Design Systems & UI Architecture',
    status: 'delivered',
    discount: '25%',
    selected: false,
    tags: ['Product Designer', 'Alumni'],
    lastContacted: '2 weeks ago'
  },
  {
    id: 'lead-12',
    name: 'Carlos Mendoza',
    phone: '+1 (512) 555-0186',
    company: 'SolTech Renewable Energy',
    course: 'CleanTech Product Management',
    status: 'read',
    discount: '35%',
    selected: true,
    tags: ['Webinar Attendee', 'Verified'],
    lastContacted: 'Yesterday'
  },
  {
    id: 'lead-13',
    name: 'Neha Verma',
    phone: '+1 (917) 555-0174',
    company: 'Starlight Academy Group',
    course: 'AI For Leadership & Education',
    status: 'pending',
    discount: '40%',
    selected: true,
    tags: ['EdTech Leader', 'Batch Lead'],
    lastContacted: '3 days ago'
  },
  {
    id: 'lead-14',
    name: 'Jordan Bell',
    phone: '+1 (206) 555-0195',
    company: 'Aether Robotics',
    course: 'Autonomous Systems & Edge AI',
    status: 'pending',
    discount: '30%',
    selected: false,
    tags: ['Robotics', 'VIP Lead'],
    lastContacted: '4 days ago'
  }
];

export function generate1000Leads(): Lead[] {
  const firstNames = ['Aarav', 'Vivaan', 'Aditya', 'Vihaan', 'Arjun', 'Sai', 'Reyansh', 'Ayaan', 'Krishna', 'Ishaan', 'Shaurya', 'Atharv', 'Advik', 'Pranav', 'Advaith', 'Aaryan', 'Dhruv', 'Kabir', 'Ananya', 'Diya', 'Riya', 'Saanvi', 'Ira', 'Myra', 'Aadhya', 'Anushka', 'Fatima', 'Pooja', 'Sneha', 'Meera', 'Rohan', 'Vikram', 'Priya', 'Kavita', 'Neha', 'Tanvi', 'Deepak', 'Manish', 'Suresh', 'Rahul', 'Alex', 'Jordan', 'Sarah', 'Emily', 'David', 'Marcus', 'Elena', 'Carlos', 'James', 'Maya'];
  const lastNames = ['Sharma', 'Verma', 'Patel', 'Singh', 'Gupta', 'Kumar', 'Joshi', 'Chauhan', 'Iyer', 'Reddy', 'Deshmukh', 'Chopra', 'Malhotra', 'Sondhi', 'Bhatia', 'Nair', 'Rawat', 'Mishra', 'Yadav', 'Mehta', 'Chen', 'Jenkins', 'Vance', 'Miller', 'Rostova', 'Mendoza', 'Thorne', 'Bell', 'Shah', 'Agarwal'];
  const companies = ['TechNova Labs', 'Global Growth Co', 'Fintech Orbit', 'Apex Cloud', 'VentureScale', 'Zenith Staffing', 'BioHealth AI', 'Vance Logistics', 'HyperGrowth Media', 'Nordic Peak', 'Pulse Creative', 'SolTech CleanEnergy', 'Starlight Tech', 'Aether Robotics', 'Shri Shyam Partner Network', 'Indus Software Labs', 'Nexus AI Systems', 'QuantLeap Analytics', 'Tata Consultancy Partners', 'Infosys Tech Hub', 'Wipro Engineering Group', 'Reliance Enterprise Tech', 'HCL Talent Solutions', 'CyberShield Direct', 'CloudMatrix Infra'];
  const courses = ['Full-Stack AI Engineering', 'Python for Machine Learning', 'Enterprise Staffing & Recruitment', 'Generative AI & Agentic Workflows', 'Cloud DevOps & Kubernetes', 'Robotics Systems & Automation', 'Executive Product Management', 'B2B Tech Sales Accelerator'];
  const discounts = ['30%', '35%', '40%', '45%', '50%'];
  const cities = ['Delhi-NCR', 'Bangalore', 'Mumbai', 'Hyderabad', 'Pune', 'Chennai', 'Gurgaon', 'Noida', 'Kolkata', 'Ahmedabad'];

  const leads: Lead[] = [];
  for (let i = 1; i <= 1000; i++) {
    const fn = firstNames[i % firstNames.length];
    const ln = lastNames[(i * 3) % lastNames.length];
    const comp = companies[(i * 7) % companies.length];
    const crs = courses[(i * 5) % courses.length];
    const disc = discounts[(i * 2) % discounts.length];
    const city = cities[(i * 4) % cities.length];
    const phoneSuffix = (10000 + (i * 37) % 89999).toString();

    leads.push({
      id: `lead-1k-${i.toString().padStart(4, '0')}`,
      name: `${fn} ${ln}`,
      phone: `+91 98${phoneSuffix.slice(0, 3)} ${phoneSuffix.slice(3)}`,
      company: `${comp} (${city})`,
      course: crs,
      status: 'pending',
      discount: disc,
      selected: true,
      tags: ['1000 Batch Queue', city, crs.split(' ')[0]],
      lastContacted: 'Queued for 1k Broadcast'
    });
  }
  return leads;
}

