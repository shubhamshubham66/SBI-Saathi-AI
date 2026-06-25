import {
  MessagesSquare,
  Mic,
  Compass,
  Sparkles,
  ShieldCheck,
  GraduationCap,
  Cpu,
  Workflow,
  Send,
  Users,
  Landmark,
  Sprout,
  TrendingUp,
  Rocket,
  Languages,
  Smartphone,
  FileCheck,
  type LucideIcon,
} from "lucide-react";

export const siteConfig = {
  name: "SBI Saathi AI",
  tagline: "Banking Made Simple",
  description:
    "A friendly, multilingual banking assistant that helps you bank with confidence — in your own language, at your own pace.",
};

export interface NavLink {
  label: string;
  href: string;
  children?: NavLink[];
}

/** Primary navbar items (7) — mix of pages and on-page anchors. */
export const mainNavLinks: NavLink[] = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  {
    label: "Features",
    href: "/#features",
    children: [
      { label: "Multilingual Support", href: "/#multilingual-support" },
      { label: "Voice Assistant", href: "/#voice-assistant" },
      { label: "Personalized Recommendations", href: "/#personalized-recommendations" },
      { label: "Financial Literacy", href: "/#financial-literacy" },
      { label: "Digital Payment Guidance", href: "/#digital-payments" },
      { label: "Government Scheme Assistance", href: "/#scheme-assistance" },
    ],
  },
  {
    label: "Services",
    href: "/services",
    children: [
      { label: "Account Opening", href: "/services#account-opening" },
      { label: "Savings Account", href: "/services#savings-account" },
      { label: "Fixed Deposit", href: "/services#fixed-deposit" },
      { label: "Personal Loan", href: "/services#personal-loan" },
      { label: "Education Loan", href: "/services#education-loan" },
      { label: "Home Loan", href: "/services#home-loan" },
      { label: "UPI & Digital Payments", href: "/services#upi-digital-payments" },
    ],
  },
  {
    label: "How It Works",
    href: "/#how-it-works",
    children: [
      { label: "User Interaction", href: "/#user-interaction" },
      { label: "AI Processing", href: "/#ai-processing" },
      { label: "Agent Workflow", href: "/#agent-workflow" },
      { label: "Response Generation", href: "/#response-generation" },
    ],
  },
  {
    label: "Impact",
    href: "/#impact",
    children: [
      { label: "Benefits for Customers", href: "/#benefits-customers" },
      { label: "Benefits for SBI", href: "/#benefits-sbi" },
      { label: "Rural Banking Inclusion", href: "/#rural-inclusion" },
      { label: "Digital Adoption Statistics", href: "/#digital-adoption" },
      { label: "Future Roadmap", href: "/#future-roadmap" },
    ],
  },
  { label: "Contact", href: "/contact" },
];

/** Tool links used in the footer "Explore" column. */
export const navLinks: NavLink[] = [
  { label: "Assistant", href: "/assistant" },
  { label: "Recommendations", href: "/recommendations" },
  { label: "Learn", href: "/learn" },
  { label: "Schemes", href: "/schemes" },
];

export interface Feature {
  icon: LucideIcon;
  title: string;
  description: string;
}

export const features: Feature[] = [
  {
    icon: Mic,
    title: "Talk in your language",
    description:
      "Speak or type in 20+ Indian languages. Saathi listens, understands, and replies the way you're most comfortable.",
  },
  {
    icon: Compass,
    title: "Friendly money guidance",
    description:
      "From your first savings account to planning ahead — get clear, jargon-free help whenever a question pops up.",
  },
  {
    icon: Sparkles,
    title: "Suggestions that fit you",
    description:
      "Tell us a little about yourself and we'll point you to the products and steps that actually make sense for you.",
  },
  {
    icon: Compass,
    title: "Find schemes you may have missed",
    description:
      "Discover government schemes you could be eligible for, with simple steps on how to apply.",
  },
  {
    icon: ShieldCheck,
    title: "Stay safe from fraud",
    description:
      "Learn to spot scams and protect your money with easy, practical tips you can use right away.",
  },
  {
    icon: GraduationCap,
    title: "Learn at your own pace",
    description:
      "Bite-sized lessons on savings, UPI, credit and more — explained like a friend would, not a textbook.",
  },
];

export interface TrustMetric {
  value: string;
  label: string;
}

export const trustMetrics: TrustMetric[] = [
  { value: "500M+", label: "People we can reach" },
  { value: "20+", label: "Languages supported" },
  { value: "24/7", label: "Always here to help" },
];

export interface HowItWorksStep {
  icon: LucideIcon;
  title: string;
  description: string;
}

export const howItWorksSteps: HowItWorksStep[] = [
  {
    icon: MessagesSquare,
    title: "Say hello",
    description:
      "Ask anything in your own words — by voice or text, in your language.",
  },
  {
    icon: Compass,
    title: "We understand you",
    description:
      "Saathi figures out what you need and asks a couple of friendly questions if needed.",
  },
  {
    icon: Sparkles,
    title: "Get clear guidance",
    description:
      "Receive simple, personalised answers and next steps — no banking jargon.",
  },
  {
    icon: ShieldCheck,
    title: "Move forward with confidence",
    description:
      "Take action knowing exactly what to do, with Saathi by your side anytime.",
  },
];


/* -------------------------------------------------------------------------- */
/*  Portal / home page content                                                */
/* -------------------------------------------------------------------------- */

export interface QuickAction {
  icon: LucideIcon;
  title: string;
  description: string;
  href: string;
  cta: string;
  /** Tailwind gradient classes for the icon tile. */
  accent: string;
}

/** The portal "service hub" — quick access to every tool. */
export const quickActions: QuickAction[] = [
  {
    icon: MessagesSquare,
    title: "Chat with Saathi",
    description:
      "Ask anything about banking by voice or text, in your own language.",
    href: "/assistant",
    cta: "Start chatting",
    accent: "from-brand-500 to-brand-700",
  },
  {
    icon: Sparkles,
    title: "Get recommendations",
    description:
      "Answer a few questions and discover products that genuinely fit you.",
    href: "/recommendations",
    cta: "Find my fit",
    accent: "from-sky-500 to-brand-600",
  },
  {
    icon: Compass,
    title: "Discover schemes",
    description:
      "Check which government schemes you may be eligible for — and how to apply.",
    href: "/schemes",
    cta: "Check eligibility",
    accent: "from-indigo-500 to-brand-700",
  },
  {
    icon: GraduationCap,
    title: "Learn money basics",
    description:
      "Simple, friendly lessons on savings, UPI, fraud safety and more.",
    href: "/learn",
    cta: "Explore lessons",
    accent: "from-cyan-500 to-brand-600",
  },
];

/** Languages shown in the marquee (labels only, marketing-facing). */
export const languageShowcase: string[] = [
  "English",
  "हिन्दी",
  "বাংলা",
  "తెలుగు",
  "मराठी",
  "தமிழ்",
  "ગુજરાતી",
  "ಕನ್ನಡ",
  "മലയാളം",
  "ਪੰਜਾਬੀ",
  "ଓଡ଼ିଆ",
  "অসমীয়া",
  "اردو",
  "संस्कृत",
  "कोंकणी",
  "मैथिली",
];

export interface Testimonial {
  name: string;
  location: string;
  language: string;
  quote: string;
  initials: string;
}

export const testimonials: Testimonial[] = [
  {
    name: "Sunita Devi",
    location: "Patna, Bihar",
    language: "हिन्दी",
    quote:
      "I always felt scared asking at the bank. Saathi explained UPI in Hindi so patiently — now I pay for everything on my phone.",
    initials: "SD",
  },
  {
    name: "Rajesh Kumar",
    location: "Coimbatore, Tamil Nadu",
    language: "தமிழ்",
    quote:
      "It found two government schemes I never knew I qualified for. The steps to apply were so clear and simple.",
    initials: "RK",
  },
  {
    name: "Fatima Sheikh",
    location: "Hyderabad, Telangana",
    language: "اردو",
    quote:
      "Like talking to a helpful friend, not a machine. It never made me feel small for asking basic questions.",
    initials: "FS",
  },
];

export interface SchemeHighlight {
  name: string;
  tag: string;
  description: string;
}

export const schemeHighlights: SchemeHighlight[] = [
  {
    name: "PM Jan Dhan Yojana",
    tag: "Zero balance",
    description: "Open your first bank account with no minimum balance.",
  },
  {
    name: "Atal Pension Yojana",
    tag: "Pension",
    description: "A guaranteed monthly pension after 60, from small savings.",
  },
  {
    name: "PMJJBY & PMSBY",
    tag: "Insurance",
    description: "Life and accident cover for just a few rupees a year.",
  },
  {
    name: "Sukanya Samriddhi",
    tag: "Girl child",
    description: "High-interest savings for your daughter's future.",
  },
];

export interface Faq {
  question: string;
  answer: string;
}

export const faqs: Faq[] = [
  {
    question: "Is SBI Saathi AI free to use?",
    answer:
      "Yes. Chatting with Saathi, getting recommendations, and discovering schemes are all completely free.",
  },
  {
    question: "Which languages can I use?",
    answer:
      "You can speak or type in 20+ Indian languages including Hindi, Bengali, Tamil, Telugu, Marathi, Gujarati and many more. Saathi replies in the same language.",
  },
  {
    question: "Is my information safe?",
    answer:
      "Saathi will never ask for sensitive details like your full card number, OTP or UPI PIN. We only use what you share to give better guidance.",
  },
  {
    question: "Can Saathi open an account or move money for me?",
    answer:
      "Saathi guides you with clear, simple steps and points you in the right direction — but you always stay in control and complete actions through your own bank.",
  },
];


/* -------------------------------------------------------------------------- */
/*  How It Works — detailed pipeline (inside sections)                        */
/* -------------------------------------------------------------------------- */

export interface WorkflowStage {
  id: string;
  step: string;
  icon: LucideIcon;
  title: string;
  description: string;
  points: string[];
}

export const workflowStages: WorkflowStage[] = [
  {
    id: "user-interaction",
    step: "01",
    icon: Mic,
    title: "User Interaction",
    description:
      "You start a conversation the way that feels natural — speaking or typing in any of 20+ Indian languages.",
    points: [
      "Voice or text input, your choice",
      "Works in 20+ Indian languages",
      "No banking jargon required",
    ],
  },
  {
    id: "ai-processing",
    step: "02",
    icon: Cpu,
    title: "AI Processing",
    description:
      "Saathi transcribes speech, detects your language, and understands the real intent behind your question.",
    points: [
      "Speech-to-text & language detection",
      "Intent and entity recognition",
      "Context kept across the chat",
    ],
  },
  {
    id: "agent-workflow",
    step: "03",
    icon: Workflow,
    title: "Agent Workflow",
    description:
      "The right tools kick in — matching schemes, building recommendations, and pulling verified banking knowledge.",
    points: [
      "Scheme eligibility matching",
      "Personalised recommendations",
      "Grounded in trusted knowledge",
    ],
  },
  {
    id: "response-generation",
    step: "04",
    icon: Send,
    title: "Response Generation",
    description:
      "You get a clear, friendly answer with simple next steps — replied back in your own language, by voice or text.",
    points: [
      "Plain-language, jargon-free replies",
      "Actionable next steps",
      "Spoken back in your language",
    ],
  },
];

/* -------------------------------------------------------------------------- */
/*  Impact — detailed sections (inside sections)                              */
/* -------------------------------------------------------------------------- */

export interface ImpactBlock {
  id: string;
  icon: LucideIcon;
  title: string;
  description: string;
  points: string[];
}

export const impactBlocks: ImpactBlock[] = [
  {
    id: "benefits-customers",
    icon: Users,
    title: "Benefits for Customers",
    description:
      "Banking becomes approachable for everyone — regardless of language, literacy, or experience.",
    points: [
      "Guidance in your mother tongue",
      "No fear of asking 'basic' questions",
      "Help available any time, day or night",
      "Stay protected from fraud and scams",
    ],
  },
  {
    id: "benefits-sbi",
    icon: Landmark,
    title: "Benefits for SBI",
    description:
      "A scalable assistant that deepens customer relationships while easing the load on branches and call centres.",
    points: [
      "Lower support costs at scale",
      "Higher product awareness & adoption",
      "Consistent, compliant guidance",
      "Reach under-served customers",
    ],
  },
  {
    id: "rural-inclusion",
    icon: Sprout,
    title: "Rural Banking Inclusion",
    description:
      "Bringing trusted banking support to villages and small towns where branches are far and literacy varies.",
    points: [
      "Voice-first for low-literacy users",
      "Works on basic smartphones",
      "Awareness of welfare schemes",
      "Bridges the last-mile gap",
    ],
  },
  {
    id: "digital-adoption",
    icon: TrendingUp,
    title: "Digital Adoption Statistics",
    description:
      "India's digital banking momentum shows just how many people a multilingual assistant can empower.",
    points: [
      "500M+ potential users reachable",
      "20+ languages spoken across India",
      "UPI now part of everyday payments",
      "Mobile-first growth in rural areas",
    ],
  },
  {
    id: "future-roadmap",
    icon: Rocket,
    title: "Future Roadmap",
    description:
      "Where Saathi is headed next — deeper personalisation and even wider, more inclusive coverage.",
    points: [
      "More regional languages & dialects",
      "Offline & low-bandwidth modes",
      "Proactive money-health nudges",
      "Deeper accessibility support",
    ],
  },
];


/* -------------------------------------------------------------------------- */
/*  Features — detailed sections (inside sections)                            */
/* -------------------------------------------------------------------------- */

export interface FeatureDetail {
  id: string;
  icon: LucideIcon;
  title: string;
  description: string;
  points: string[];
}

export const featureDetails: FeatureDetail[] = [
  {
    id: "multilingual-support",
    icon: Languages,
    title: "Multilingual Support",
    description:
      "Bank in the language you think in. Saathi understands and replies in 20+ Indian languages.",
    points: [
      "20+ Indian languages",
      "Auto language detection",
      "Switch languages mid-chat",
    ],
  },
  {
    id: "voice-assistant",
    icon: Mic,
    title: "Voice Assistant",
    description:
      "Just speak — no typing needed. Perfect for users who find reading or typing difficult.",
    points: [
      "Speak instead of type",
      "Spoken answers back to you",
      "Great for low-literacy users",
    ],
  },
  {
    id: "personalized-recommendations",
    icon: Sparkles,
    title: "Personalized Recommendations",
    description:
      "Tell Saathi a little about yourself and get product suggestions that genuinely fit your needs.",
    points: [
      "Tailored to your profile",
      "Right products, right time",
      "Clear, jargon-free reasons",
    ],
  },
  {
    id: "financial-literacy",
    icon: GraduationCap,
    title: "Financial Literacy",
    description:
      "Learn money basics at your own pace — savings, credit, fraud safety and more, explained simply.",
    points: [
      "Bite-sized friendly lessons",
      "Savings, credit & budgeting",
      "Spot and avoid scams",
    ],
  },
  {
    id: "digital-payments",
    icon: Smartphone,
    title: "Digital Payment Guidance",
    description:
      "Step-by-step help with UPI, mobile banking and safe digital payments — without the fear.",
    points: [
      "Activate & use UPI",
      "Safe payment habits",
      "Troubleshoot common issues",
    ],
  },
  {
    id: "scheme-assistance",
    icon: FileCheck,
    title: "Government Scheme Assistance",
    description:
      "Discover government schemes you may be eligible for and get simple steps on how to apply.",
    points: [
      "Check your eligibility",
      "Simple application steps",
      "Never miss a benefit",
    ],
  },
];
