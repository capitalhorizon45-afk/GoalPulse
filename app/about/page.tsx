import type { Metadata } from "next";
import Link from "next/link";
import { Zap, Radio, BarChart2, Newspaper, Globe, Code2, ArrowRight } from "lucide-react";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "About",
  description: "Learn about GoalPulse — your real-time sports hub for scores, fixtures, standings, and news.",
  path: "/about",
});

const FEATURES = [
  {
    icon: Radio,
    color: "#22C55E",
    title: "Live Scores",
    description:
      "Real-time match updates powered by Football-Data.org and TheSportsDB APIs, refreshed every 60 seconds.",
  },
  {
    icon: BarChart2,
    color: "#00C8FF",
    title: "Standings & Fixtures",
    description:
      "Full league tables and upcoming fixture schedules for all major competitions worldwide.",
  },
  {
    icon: Newspaper,
    color: "#A855F7",
    title: "Sports News",
    description:
      "Breaking news, match reports, and analysis covering Football, Cricket, Basketball, and Tennis.",
  },
  {
    icon: Globe,
    color: "#F97316",
    title: "Global Coverage",
    description:
      "Top leagues from England, Spain, Germany, Italy, France, plus international tournaments.",
  },
];

const TECH_STACK = [
  { name: "Next.js 15", description: "App Router + Server Components" },
  { name: "TypeScript", description: "Full type safety throughout" },
  { name: "Tailwind CSS", description: "Utility-first responsive design" },
  { name: "Football-Data.org", description: "Live football scores & fixtures" },
  { name: "TheSportsDB", description: "Multi-sport data & statistics" },
  { name: "Vercel", description: "Edge deployment ready" },
];

export default function AboutPage() {
  return (
    <div className="pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 badge-primary mb-6">
            <Zap className="w-3.5 h-3.5" />
            About GoalPulse
          </div>
          <h1 className="text-4xl sm:text-5xl font-black text-white mb-5 leading-tight">
            Your pulse on{" "}
            <span className="text-gradient-primary">live sports</span>
          </h1>
          <p className="text-lg text-muted leading-relaxed">
            GoalPulse is a production-ready sports platform delivering real-time
            scores, fixtures, standings, and news for Football, Cricket, Basketball,
            and Tennis — all in a premium, fast, and responsive interface.
          </p>
        </div>

        {/* Features */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-16">
          {FEATURES.map(({ icon: Icon, color, title, description }) => (
            <div
              key={title}
              className="bg-surface rounded-2xl border border-border p-5"
            >
              <div
                className="w-11 h-11 rounded-xl flex items-center justify-center mb-4"
                style={{ background: `${color}15`, border: `1px solid ${color}25` }}
              >
                <Icon className="w-5 h-5" style={{ color }} />
              </div>
              <h3 className="text-white font-semibold text-base mb-2">{title}</h3>
              <p className="text-muted text-sm leading-relaxed">{description}</p>
            </div>
          ))}
        </div>

        {/* Tech Stack */}
        <div className="bg-surface rounded-2xl border border-border p-6 sm:p-8 mb-12">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-9 h-9 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center">
              <Code2 className="w-4 h-4 text-primary" />
            </div>
            <h2 className="text-xl font-bold text-white">Tech Stack</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {TECH_STACK.map(({ name, description }) => (
              <div
                key={name}
                className="flex items-start gap-3 p-4 bg-surface-alt rounded-xl border border-border"
              >
                <div className="w-2 h-2 rounded-full bg-primary mt-1.5 flex-shrink-0" />
                <div>
                  <p className="text-white font-semibold text-sm">{name}</p>
                  <p className="text-muted text-xs mt-0.5">{description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* API Setup Note */}
        <div className="bg-primary/5 border border-primary/20 rounded-2xl p-6 sm:p-8 mb-12">
          <h2 className="text-xl font-bold text-white mb-3">
            🔑 Live Data Sources
          </h2>
          <p className="text-muted text-sm leading-relaxed mb-4">
            GoalPulse is connected to two live APIs — no mock or placeholder
            data. Keys are stored securely as Replit Secrets, not in the codebase.
          </p>
          <div className="space-y-3">
            {[
              {
                name: "Football-Data.org",
                key: "FOOTBALL_DATA_API_KEY",
                url: "https://www.football-data.org/client/register",
                description: "Live scores, fixtures & standings for 5 major European leagues",
              },
              {
                name: "TheSportsDB",
                key: "THESPORTSDB_API_KEY",
                url: "https://www.thesportsdb.com/api.php",
                description: "Recent results for Cricket (IPL), Basketball (NBA) & Tennis (ATP)",
              },
            ].map(({ name, key, url, description }) => (
              <div
                key={name}
                className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 bg-surface rounded-xl border border-border"
              >
                <div>
                  <p className="text-white font-semibold text-sm">{name}</p>
                  <code className="text-xs text-primary">{key}</code>
                  <p className="text-xs text-muted mt-0.5">{description}</p>
                </div>
                <a
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-ghost text-xs flex-shrink-0"
                >
                  Get free key
                  <ArrowRight className="w-3 h-3" />
                </a>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="text-center">
          <Link href="/live" className="btn-primary text-base px-8 py-3 inline-flex">
            <Radio className="w-4 h-4" />
            Explore Live Scores
          </Link>
        </div>
      </div>
    </div>
  );
}
