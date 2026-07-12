import Link from "next/link";
import { Calendar, ArrowRight } from "lucide-react";
import MatchCard from "@/components/ui/MatchCard";
import { fetchTodaysMatches } from "@/lib/data-fetcher";

export default async function UpcomingFixtures() {
  const fixtures = (await fetchTodaysMatches().catch(() => [])).slice(0, 4);

  return (
    <section className="py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="section-header">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center">
              <Calendar className="w-4 h-4 text-primary" />
            </div>
            <div>
              <h2 className="section-title">Upcoming Fixtures</h2>
              <p className="text-xs text-muted mt-0.5">Next 24 hours</p>
            </div>
          </div>
          <Link href="/fixtures" className="btn-ghost text-sm">
            Full schedule
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {fixtures.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
            {fixtures.map((match) => (
              <MatchCard key={match.id} match={match} />
            ))}
          </div>
        ) : (
          <p className="text-muted text-sm">No upcoming fixtures scheduled.</p>
        )}
      </div>
    </section>
  );
}
