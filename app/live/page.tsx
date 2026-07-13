import type { Metadata } from "next";
import { Radio } from "lucide-react";
import MatchCard from "@/components/ui/MatchCard";
import { fetchLiveMatches } from "@/lib/data-fetcher";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Live Scores",
  description: "Real-time live scores for Football, Cricket, Basketball and Tennis.",
  path: "/live",
  keywords: ["live scores", "live football scores", "live cricket scores"],
});

// Live data changes constantly and comes from a third-party API — render
// per-request rather than baking a snapshot into the build.
export const dynamic = "force-dynamic";

const SPORT_FILTERS = [
  { label: "All Sports", value: "all" },
  { label: "⚽ Football", value: "football" },
  { label: "🏏 Cricket", value: "cricket" },
  { label: "🏀 Basketball", value: "basketball" },
  { label: "🎾 Tennis", value: "tennis" },
];

export default async function LivePage() {
  const matches = await fetchLiveMatches();

  return (
    <div className="pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Page Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-2xl bg-secondary/10 border border-secondary/20 flex items-center justify-center">
              <Radio className="w-5 h-5 text-secondary" />
            </div>
            <div>
              <h1 className="text-3xl font-black text-white">Live Scores</h1>
              <p className="text-muted text-sm">
                {matches.length} match{matches.length !== 1 ? "es" : ""} in play
              </p>
            </div>
            {matches.length > 0 && (
              <span className="badge-live ml-3">
                <span className="live-dot" />
                LIVE
              </span>
            )}
          </div>
        </div>

        {/* Filters */}
        <div className="flex items-center gap-2 mt-6 mb-8 overflow-x-auto pb-2 scrollbar-hide">
          {SPORT_FILTERS.map(({ label, value }) => (
            <button
              key={value}
              className={`flex-shrink-0 px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${
                value === "all"
                  ? "bg-primary text-background"
                  : "bg-surface border border-border text-muted hover:text-white hover:border-primary/30"
              }`}
            >
              {label}
            </button>
          ))}
        </div>

        {/* Match Grid */}
        {matches.length > 0 ? (
          <div className="space-y-8">
            {/* Group by competition */}
            {Array.from(new Set(matches.map((m) => m.competition.name))).map(
              (compName) => {
                const compMatches = matches.filter(
                  (m) => m.competition.name === compName
                );
                return (
                  <div key={compName}>
                    <div className="flex items-center gap-2 mb-3">
                      <span className="text-sm font-semibold text-white">
                        {compName}
                      </span>
                      <div className="flex-1 h-px bg-border" />
                      <span className="badge-live text-[10px]">
                        <span className="live-dot w-1.5 h-1.5" />
                        {compMatches.length} live
                      </span>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                      {compMatches.map((match) => (
                        <MatchCard key={match.id} match={match} />
                      ))}
                    </div>
                  </div>
                );
              }
            )}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <div className="w-16 h-16 rounded-2xl bg-surface border border-border flex items-center justify-center mb-4">
              <Radio className="w-7 h-7 text-muted" />
            </div>
            <h3 className="text-white font-semibold text-lg mb-2">
              No live matches right now
            </h3>
            <p className="text-muted text-sm max-w-xs">
              All matches have finished or haven&apos;t started yet. Check back
              soon or view upcoming fixtures.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
