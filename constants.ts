import { VulnerabilityCategory, IneligibleType, FAQItem, ProductTierDefinition } from './types';

export const PRODUCT_TIERS: ProductTierDefinition[] = [
  {
    name: 'Flagship',
    description: 'AI features in Flagship Google AI products.',
    examples: ['Google Search (google.com)', 'Gemini Apps (Web, Android, iOS)', 'Google Workspace core (Gmail, Drive, Docs, etc.)']
  },
  {
    name: 'Standard',
    description: 'AI features in high-sensitivity Google AI products.',
    examples: ['AI Studio', 'Jules', 'Workspace non-core (NotebookLM, Appsheet)']
  },
  {
    name: 'Other',
    description: 'Other AI integrations in Google products.',
    examples: ['Non-proprietary apps', 'Tier 3/4 applications']
  }
];

export const VULNERABILITIES: VulnerabilityCategory[] = [
  {
    id: 'S1',
    name: 'Rogue Actions',
    description: 'Attacks that modify the state of the victim’s account or data with a clear security impact.',
    example: 'Indirect prompt injection allows an attacker to unexpectedly, and without confirmation, cause Google Home to take an action, such as unlocking a door.',
    baseRewards: { Flagship: 20000, Standard: 15000, Other: 10000 }
  },
  {
    id: 'S2',
    name: 'Sensitive Data Exfiltration',
    description: 'Attacks that leak victim’s SPII, PII, or other sensitive data without an effective opportunity for user approval.',
    example: 'Indirect prompt injection allows an attacker to summarize all of a victim\'s email, and send the summary to an attacker-controlled account.',
    baseRewards: { Flagship: 15000, Standard: 15000, Other: 10000 }
  },
  {
    id: 'A1',
    name: 'Phishing Enablement',
    description: 'Persistent, cross-user HTML injection on a Google-branded site which presents a convincing phishing attack vector.',
    example: 'An AI product allows an attacker to share an attacker-generated web page, hiding the user-generated content warning.',
    baseRewards: { Flagship: 5000, Standard: 500, Other: 'credit' }
  },
  {
    id: 'A2',
    name: 'Model Theft',
    description: 'Attacks that exfiltrate complete, detailed, and confidential model parameters.',
    example: 'A Google-exposed API allows unintentional exfiltration of exact, detailed loss values for arbitrary inputs from a Google-proprietary, confidential model.',
    baseRewards: { Flagship: 5000, Standard: 500, Other: 'credit' }
  },
  {
    id: 'A3',
    name: 'Context Manipulation',
    description: 'Attacks that allow for repeatable, persistent manipulation of the context of a victim’s AI environment.',
    example: 'An attacker is able to send a calendar invite to a victim, causing a memory to be stored in an AI product that triggers future actions.',
    baseRewards: { Flagship: 5000, Standard: 500, Other: 'credit' }
  },
  {
    id: 'A4',
    name: 'Access Control Bypass',
    description: 'Attacks that allow a user to exfiltrate data which is otherwise inaccessible (limited security impact).',
    example: 'An AI product is able to provide content from an otherwise inaccessible document not containing user data (e.g., lunch menus).',
    baseRewards: { Flagship: 2500, Standard: 250, Other: 'credit' }
  },
  {
    id: 'A5',
    name: 'Unauthorized Product Usage',
    description: 'Attacks that allow Google server-side features to be enabled on the user’s account without authorization or billing.',
    example: 'An attacker is able to modify parameters on a signup form to enable and use an AI feature that has not been publicly announced.',
    baseRewards: { Flagship: 1000, Standard: 100, Other: 'credit' }
  },
  {
    id: 'A6',
    name: 'Cross-user Denial of Service',
    description: 'Attacks that cause persistent denial of service for a feature or product in a victim account.',
    example: 'Joining a public event causes product crashes for other users, where the attacker account is not specifically invited.',
    baseRewards: { Flagship: 500, Standard: 100, Other: 'credit' }
  }
];

export const INELIGIBLE_ITEMS: IneligibleType[] = [
  { title: 'Violative Content Generation', description: 'Generating violative, misleading, or factually incorrect content within the attacker\'s own session (jailbreaks/hallucinations).' },
  { title: 'AI Safety Bypasses', description: 'AI-generated content-based issues, including reports of AI safety or alignment bypasses.' },
  { title: 'Legal/Compliance', description: 'Issues relating to country/region-specific laws such as privacy or intellectual property laws.' },
  { title: 'Preamble Extraction', description: 'Preamble extraction without sensitive information leakage.' },
  { title: 'Sandboxed Code Execution', description: 'Execution of arbitrary code within a sandboxed environment (Gemini provides access to code execution tools).' },
  { title: 'Harmless Incorrect Output', description: 'Contexts in which a model\'s incorrect output or classification does not pose a compelling attack scenario.' },
];

export const FAQS: FAQItem[] = [
  {
    question: "What if I found a vulnerability, but I don't know how to exploit it?",
    answer: "We expect reports to have a valid attack scenario. However, the panel is willing to reconsider a reward amount based on new information or a revised attack scenario."
  },
  {
    question: "How do I demonstrate the severity if I can't snoop?",
    answer: "Submit your report as soon as you find the potential issue. Do not access data you don't own. We routinely pay higher rewards for well-written submissions where the reporter stopped before doing harm."
  },
  {
    question: "What if I disclose the bug publicly before you fix it?",
    answer: "Reports that go against our coordinated disclosure policy will usually not qualify."
  },
  {
    question: "Can I report through a broker?",
    answer: "Reports disclosed to third parties for purposes other than fixing the bug typically do not qualify."
  }
];
