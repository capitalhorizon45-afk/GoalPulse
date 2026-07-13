import type { Metadata } from "next";
import Link from "next/link";
import { Database, ArrowRight, CheckCircle2, XCircle } from "lucide-react";
import Breadcrumbs from "@/components/seo/Breadcrumbs";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Data Sources",
  description:
    "Where sportivox's football, cricket, basketball, and tennis data comes from — Football-Data.org and TheSportsDB — and what each one covers.",
  path: "/data-sources",
});

const PROVIDERS = [
  {
    name: "Football-Data.org",
    url: "https://www.football-data.org",
    color: "#00C8FF",
    role: "Primary source for football",
    covers: [
      "Live scores (updated on a 60-second cache)",
      "Fixtures & match schedules",
      "League standings & tables",
    ],
    leagues: [
      "Premier League (England)",
      "La Liga (Spain)",
      "Bundesliga (Germany)",
      "Serie A (Italy)",
      "Ligue 1 (France)",
    ],
    liveData: true,
    notes:
      "If Football-Data.org is temporarily unavailable, sportivox falls back to clearly-scoped representative data so pages stay usable rather than showing a broken screen — this never happens silently in place of real live data when the API is healthy.",
  },
  {
    name: "TheSportsDB",
    url: "https://www.thesportsdb.com",
    color: "#22C55E",
    role: "Source for cricket, basketball & tennis",
    covers: [
      "Recent completed match results (updated on a 120-second cache)",
      "Team and league metadata (badges, names)",
    ],
    leagues: [
      "IPL — Indian Premier League (Cricket)",
      "NBA — National Basketball Association (Basketball)",
      "ATP Tour (Tennis)",
    ],
    liveData: false,
    notes:
      "Our current TheSportsDB access tier does not include live in-play score updates, so cricket, basketball, and tennis show recent results and schedules rather than a live scoreboard. Football is the only sport with real live, in-play scores today.",
  },
];

export default function DataSourcesPage() {
  return (
    <div className="pt-24 pb-16">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <Breadcrumbs items={[{ label: "Data Sources" }]} />

        {/* Hero */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 badge-primary mb-6">
            <Database className="w-3.5 h-3.5" />
            Data Sources
          </div>
          <h1 className="text-4xl sm:text-5xl font-black text-white mb-5 leading-tight">
            Where our{" "}
            <span className="text-gradient-primary">data comes from</span>
          </h1>
          <p className="text-lg text-muted leading-relaxed">
            sportivox displays real data licensed from two providers — no
            invented scores, fixtures, or stats. Here&apos;s exactly what
            each one supplies.
          </p>
        </div>

        {/* Providers */}
        <div className="space-y-6 mb-12">
          {PROVIDERS.map((provider) => (
            <div
              key={provider.name}
              className="bg-surface rounded-2xl border border-border p-6 sm:p-8"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                <div>
                  <div className="flex items-center gap-2 mb-1.5">
                    <span
                      className="w-2 h-2 rounded-full"
                      style={{ background: provider.color }}
                      aria-hidden="true"
                    />
                    <h2 className="text-xl font-bold text-white">
                      {provider.name}
                    </h2>
                  </div>
                  <p className="text-muted text-sm">{provider.role}</p>
                </div>
                <a
                  href={provider.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-ghost text-xs flex-shrink-0 self-start sm:self-auto"
                >
                  Visit provider
                  <ArrowRight className="w-3 h-3" />
                </a>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-5">
                <div>
                  <h3 className="text-xs font-semibold text-white uppercase tracking-wide mb-3">
                    What it covers
                  </h3>
                  <ul className="space-y-2">
                    {provider.covers.map((item) => (
                      <li
                        key={item}
                        className="flex items-start gap-2 text-sm text-muted"
                      >
                        <CheckCircle2 className="w-4 h-4 text-secondary flex-shrink-0 mt-0.5" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h3 className="text-xs font-semibold text-white uppercase tracking-wide mb-3">
                    Competitions
                  </h3>
                  <ul className="space-y-2">
                    {provider.leagues.map((item) => (
                      <li
                        key={item}
                        className="text-sm text-muted flex items-start gap-2"
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-border mt-1.5 flex-shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="flex items-center gap-2 mb-4">
                {provider.liveData ? (
                  <span className="badge-live">
                    <span className="live-dot" />
                    Real live in-play scores
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1.5 text-xs font-medium text-muted bg-surface-alt border border-border px-2.5 py-1 rounded-full">
                    <XCircle className="w-3.5 h-3.5" />
                    No live in-play scores on our current tier
                  </span>
                )}
              </div>

              <p className="text-xs text-muted leading-relaxed border-t border-border pt-4">
                {provider.notes}
              </p>
            </div>
          ))}
        </div>

        {/* Related links */}
        <div className="bg-primary/5 border border-primary/20 rounded-2xl p-6 sm:p-8 text-center">
          <h2 className="text-lg font-bold text-white mb-2">
            Want the full picture?
          </h2>
          <p className="text-muted text-sm leading-relaxed mb-5 max-w-xl mx-auto">
            Read our <Link href="/editorial-policy">Editorial Policy</Link> to
            see how this data becomes our News section, or our{" "}
            <Link href="/disclaimer">Disclaimer</Link> for the limits on how
            this data should be used.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <Link href="/editorial-policy" className="btn-ghost text-sm">
              Editorial Policy
            </Link>
            <Link href="/disclaimer" className="btn-ghost text-sm">
              Disclaimer
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
