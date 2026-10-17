import { SIMConfig } from '../types';

export const INITIAL_SIMS: SIMConfig[] = [
  {
    id: 'sim-1',
    name: 'SIM 1: Sales Alpha (Primary)',
    number: '+1 (415) 890-2101',
    carrier: 'AT&T Business Direct',
    status: 'active',
    sentToday: 142,
    dailyLimit: 500,
    healthScore: 99,
    ipLocation: 'San Francisco, US (Static Residential)',
    lastUsed: '2 min ago'
  },
  {
    id: 'sim-2',
    name: 'SIM 2: VIP Outreach (Warm)',
    number: '+1 (415) 890-2102',
    carrier: 'T-Mobile Ultra Fiber',
    status: 'active',
    sentToday: 98,
    dailyLimit: 400,
    healthScore: 97,
    ipLocation: 'New York, US (Clean ASN)',
    lastUsed: '4 min ago'
  },
  {
    id: 'sim-3',
    name: 'SIM 3: Event Desk (High Throughput)',
    number: '+1 (415) 890-2103',
    carrier: 'Verizon Enterprise 5G',
    status: 'active',
    sentToday: 185,
    dailyLimit: 600,
    healthScore: 98,
    ipLocation: 'Austin, US (Direct Gateway)',
    lastUsed: '1 min ago'
  }
];
