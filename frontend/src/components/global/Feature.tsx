import { cn } from "@/lib/utils";
import {
  Terminal,
  Sparkles,
  DollarSign,
  Cloud,
  Users,
  Headphones,
  ShieldCheck,
  Infinity,
  MessagesSquare,
} from "lucide-react";
 
export function FeaturesSection() {
  const features = [
    {
      title: "Built for developers",
      description:
        "Crafted for engineers, developers, and AI enthusiasts who demand precision in prompt generation.",
      icon: <Terminal className="text-primary-purple-300" />,
    },
    {
      title: "AI-Powered Refinement",
      description:
        "Our AI asks smart questions to refine your prompt, helping you create the perfect input at any level.",
      icon: <MessagesSquare className="text-primary-purple-300" />,
    },
    {
      title: "Effortless Prompt Generation",
      description:
        "Simply drop an idea—our AI fine-tunes it into a high-quality, optimized prompt in seconds.",
      icon: <Sparkles className="text-primary-purple-300" />,
    },
    {
      title: "Transparent & Affordable Pricing",
      description:
        "No hidden fees, no credit card required—straightforward pricing designed for creators.",
      icon: <DollarSign className="text-primary-purple-300" />,
    },
    {
      title: "Reliable 100% Uptime",
      description:
        "Built on a robust serverless infrastructure, ensuring instant access with zero downtime.",
      icon: <Cloud className="text-primary-purple-300" />,
    },
    {
      title: "Multi-User Collaboration",
      description:
        "Seamlessly share prompts with your team—no extra charges, no restrictions.",
      icon: <Users className="text-primary-purple-300" />,
    },
    {
      title: "24/7 AI-Powered Support",
      description:
        "Got a question? Our AI assistant is available round the clock to guide you through prompt crafting.",
      icon: <Headphones className="text-primary-purple-300" />,
    },
    {
      title: "Secure & Private",
      description:
        "Your data stays yours. We prioritize top-tier encryption and privacy-first AI interactions.",
      icon: <ShieldCheck className="text-primary-purple-300" />,
    },
    {
      title: "Endless Possibilities",
      description:
        "For content, code, marketing, research—whatever your need, GetHint AI enhances it.",
      icon: <Infinity className="text-primary-purple-300" />,
    },
  ];
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4  relative z-10 py-10 max-w-7xl mx-auto">
      {features.map((feature, index) => (
        <Feature key={feature.title} {...feature} index={index} />
      ))}
    </div>
  );
}
 
const Feature = ({
  title,
  description,
  icon,
  index,
}: {
  title: string;
  description: string;
  icon: React.ReactNode;
  index: number;
}) => {
  return (
    <div
      className={cn(
        "flex flex-col lg:border-r  py-10 relative group/feature dark:border-neutral-800",
        (index === 0 || index === 4) && "lg:border-l dark:border-neutral-800",
        index < 4 && "lg:border-b dark:border-neutral-800"
      )}
    >
      {index < 4 && (
        <div className="opacity-0 group-hover/feature:opacity-100 transition duration-200 absolute inset-0 h-full w-full bg-gradient-to-t from-primary-blue-400  to-transparent pointer-events-none" />
      )}
      {index >= 4 && (
        <div className="opacity-0 group-hover/feature:opacity-100 transition duration-200 absolute inset-0 h-full w-full bg-gradient-to-b from-primary-blue-400 to-transparent pointer-events-none" />
      )}
      <div className="mb-4 relative z-10 px-10 text-neutral-600 ">
        {icon}
      </div>
      <div className="text-lg font-bold mb-2 relative z-10 px-10">
        <div className="absolute left-0 inset-y-0 h-6 group-hover/feature:h-8 w-1 rounded-tr-full rounded-br-full bg-neutral-300 dark:bg-neutral-700 group-hover/feature:bg-blue-500 transition-all duration-200 origin-center" />
        <span className="group-hover/feature:translate-x-2 transition duration-200 inline-block text-text-shady dark:text-neutral-100">
          {title}
        </span>
      </div>
      <p className="text-sm text-washed-purple-400 dark:text-neutral-300 max-w-xs relative z-10 px-10">
        {description}
      </p>
    </div>
  );
};