import type { Metadata } from "next";
import { Grid3X3 } from "lucide-react";
import SportCard from "@/components/ui/SportCard";
import MatchCard from "@/components/ui/MatchCard";
import { SPORTS_CATALOG } from "@/lib/sports-catalog";
import { fetchLiveMatches, fetchUpcomingMatches } from "@/lib/data-fetcher";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Sports",
  description: "Explore all sports covered on GoalPulse — Football, Cricket, Basketball, and Tennis.",
  path: "/sports",
  keywords: ["sports", "football", "cricket", "basketball", "tennis"],
});

// Pulls live match data from a third-party API — render per-request.
export const dynamic = "force-dynamic";

export default async function SportsPage() {
  const [liveMatches, upcomingMatches] = await Promise.all([
    fetchLiveMatches().catch(() => []),
    fetchUpcomingMatches("PL").catch(() => []),
  ]);

  return (
    <div className="pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-10">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center">
              <Grid3X3 className="w-5 h-5 text-primary" />
            </div>
            <div>
              <h1 className="text-3xl font-black text-white">Sports</h1>
              <p className="text-muted text-sm">
                4 sports, worldwide coverage
              </p>
            </div>
          </div>
        </div>

        {/* Sport Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-12">
          {SPORTS_CATALOG.map((sport) => (
            <SportCard
              key={sport.id}
              sport={sport}
              liveCount={sport.category === "football" ? liveMatches.length : undefined}
            />
          ))}
        </div>

        {/* Football Section */}
        <section className="mb-12">
          <div className="flex items-center gap-3 mb-5">
            <span className="text-3xl">⚽</span>
            <h2 className="text-xl font-bold text-white">Football — Live Now</h2>
            <div className="flex-1 h-px bg-border" />
          </div>
          {liveMatches.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {liveMatches.map((match) => (
                <MatchCard key={match.id} match={match} />
              ))}
            </div>
          ) : (
            <p className="text-muted text-sm">No football matches in play right now.</p>
          )}
        </section>

        {/* Upcoming Section */}
        <section>
          <div className="flex items-center gap-3 mb-5">
            <span className="text-3xl">📅</span>
            <h2 className="text-xl font-bold text-white">Coming Up</h2>
            <div className="flex-1 h-px bg-border" />
          </div>
          {upcomingMatches.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {upcomingMatches.map((match) => (
                <MatchCard key={match.id} match={match} />
              ))}
            </div>
          ) : (
            <p className="text-muted text-sm">No upcoming fixtures scheduled.</p>
          )}
        </section>
      </div>
    </div>
  );
}
