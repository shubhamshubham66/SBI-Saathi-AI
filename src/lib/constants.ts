import {
  MessagesSquare,
  Mic,
  Compass,
  Sparkles,
  ShieldCheck,
  GraduationCap,
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
}

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
