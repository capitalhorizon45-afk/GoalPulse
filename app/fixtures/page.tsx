import type { Metadata } from "next";
import { Calendar } from "lucide-react";
import MatchCard from "@/components/ui/MatchCard";
import { fetchUpcomingMatches } from "@/lib/data-fetcher";
import { formatMatchDate } from "@/lib/utils";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Fixtures",
  description: "Upcoming fixtures and match schedules for all major sports and leagues.",
  path: "/fixtures",
  keywords: ["fixtures", "match schedule", "upcoming matches"],
});

// Fixture schedules come from a live third-party API — render per-request
// rather than baking a snapshot into the build.
export const dynamic = "force-dynamic";

const LEAGUE_FILTERS = [
  { label: "All Leagues", value: "all" },
  { label: "Premier League", value: "PL" },
  { label: "La Liga", value: "PD" },
  { label: "Bundesliga", value: "BL1" },
  { label: "Serie A", value: "SA" },
  { label: "Ligue 1", value: "FL1" },
];

export default async function FixturesPage() {
  const fixtures = await fetchUpcomingMatches("PL");

  // Group by date
  const grouped = fixtures.reduce<Record<string, typeof fixtures>>(
    (acc, match) => {
      const dateKey = formatMatchDate(match.utcDate);
      if (!acc[dateKey]) acc[dateKey] = [];
      acc[dateKey].push(match);
      return acc;
    },
    {}
  );

  return (
    <div className="pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Page Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center">
              <Calendar className="w-5 h-5 text-primary" />
            </div>
            <div>
              <h1 className="text-3xl font-black text-white">Fixtures</h1>
              <p className="text-muted text-sm">
                Upcoming match schedule
              </p>
            </div>
          </div>
        </div>

        {/* League Filters */}
        <div className="flex items-center gap-2 mt-6 mb-8 overflow-x-auto pb-2">
          {LEAGUE_FILTERS.map(({ label, value }) => (
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

        {/* Fixtures grouped by date */}
        <div className="space-y-8">
          {Object.entries(grouped).map(([date, matches]) => (
            <div key={date}>
              <div className="flex items-center gap-3 mb-4">
                <h2 className="text-lg font-bold text-white">{date}</h2>
                <div className="flex-1 h-px bg-border" />
                <span className="badge-primary">
                  {matches.length} match{matches.length !== 1 ? "es" : ""}
                </span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {matches.map((match) => (
                  <MatchCard key={match.id} match={match} />
                ))}
              </div>
            </div>
          ))}
        </div>

        {fixtures.length === 0 && (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <Calendar className="w-12 h-12 text-muted mb-4" />
            <h3 className="text-white font-semibold mb-2">No fixtures scheduled</h3>
            <p className="text-muted text-sm">Check back for the latest schedule.</p>
          </div>
        )}
      </div>
    </div>
  );
}
