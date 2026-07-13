import type { Metadata } from "next";
import { BarChart2, TrendingUp, TrendingDown, Minus } from "lucide-react";
import { fetchStandings } from "@/lib/data-fetcher";
import { cn } from "@/lib/utils";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Standings",
  description: "League tables and standings for Premier League, La Liga, Bundesliga, Serie A, and more.",
  path: "/standings",
  keywords: ["league table", "standings", "Premier League table"],
});

// Standings depend on a live third-party API — render per-request so a
// transient upstream failure surfaces as a normal request-time error
// (handled by error.tsx) instead of failing the production build.
export const dynamic = "force-dynamic";

const LEAGUE_TABS = [
  { label: "🏴󠁧󠁢󠁥󠁮󠁧󠁿 Premier League", value: "PL" },
  { label: "🇪🇸 La Liga", value: "PD" },
  { label: "🇩🇪 Bundesliga", value: "BL1" },
  { label: "🇮🇹 Serie A", value: "SA" },
  { label: "🇫🇷 Ligue 1", value: "FL1" },
];

const ZONE_COLORS = [
  { from: 1, to: 4, color: "bg-primary/20", label: "Champions League" },
  { from: 5, to: 6, color: "bg-secondary/10", label: "Europa League" },
  { from: 18, to: 20, color: "bg-red-500/10", label: "Relegation" },
];

function getZoneColor(position: number): string {
  for (const zone of ZONE_COLORS) {
    if (position >= zone.from && position <= zone.to) return zone.color;
  }
  return "";
}

function FormIndicator({ form }: { form: "W" | "D" | "L" }) {
  const styles = {
    W: "bg-secondary text-background",
    D: "bg-muted/30 text-muted",
    L: "bg-red-500/20 text-red-400",
  };
  return (
    <span
      className={cn(
        "w-5 h-5 rounded text-[10px] font-bold flex items-center justify-center flex-shrink-0",
        styles[form]
      )}
    >
      {form}
    </span>
  );
}

function parseForm(form: string | null | undefined): ("W" | "D" | "L")[] {
  if (!form) return [];
  return form
    .split(",")
    .map((f) => f.trim())
    .filter((f): f is "W" | "D" | "L" => f === "W" || f === "D" || f === "L");
}

export default async function StandingsPage() {
  const { table: standings, season } = await fetchStandings("PL");

  return (
    <div className="pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center">
              <BarChart2 className="w-5 h-5 text-primary" />
            </div>
            <div>
              <h1 className="text-3xl font-black text-white">Standings</h1>
              <p className="text-muted text-sm">League table — {season}/{String(Number(season) + 1).slice(-2)} season</p>
            </div>
          </div>
        </div>

        {/* League Tabs */}
        <div className="flex items-center gap-2 mt-6 mb-6 overflow-x-auto pb-2">
          {LEAGUE_TABS.map(({ label, value }) => (
            <button
              key={value}
              className={`flex-shrink-0 px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${
                value === "PL"
                  ? "bg-primary text-background"
                  : "bg-surface border border-border text-muted hover:text-white hover:border-primary/30"
              }`}
            >
              {label}
            </button>
          ))}
        </div>

        {/* Zone Legend */}
        <div className="flex flex-wrap gap-4 mb-4">
          {ZONE_COLORS.map(({ color, label }) => (
            <div key={label} className="flex items-center gap-1.5 text-xs text-muted">
              <div className={cn("w-3 h-3 rounded-sm", color.replace("/20", "/60").replace("/10", "/40"))} />
              {label}
            </div>
          ))}
        </div>

        {/* Table */}
        <div className="bg-surface rounded-2xl border border-border overflow-hidden">
          {/* Table Header */}
          <div className="grid grid-cols-[2rem_1fr_2rem_2rem_2rem_2rem_2rem_2rem_3rem] gap-2 px-4 py-3 border-b border-border text-xs font-semibold text-muted items-center">
            <span>#</span>
            <span>Team</span>
            <span className="text-center">P</span>
            <span className="text-center">W</span>
            <span className="text-center">D</span>
            <span className="text-center">L</span>
            <span className="text-center">GD</span>
            <span className="hidden sm:block text-center">Form</span>
            <span className="text-center font-bold text-white">Pts</span>
          </div>

          {/* Rows */}
          {standings.map((row) => {
            const zoneColor = getZoneColor(row.position);
            const form = parseForm(row.form);
            return (
              <div
                key={row.team.id}
                className={cn(
                  "grid grid-cols-[2rem_1fr_2rem_2rem_2rem_2rem_2rem_3rem] sm:grid-cols-[2rem_1fr_2rem_2rem_2rem_2rem_2rem_3rem_3rem] gap-2 px-4 py-3 items-center border-b border-border/50 last:border-0 hover:bg-surface-alt transition-colors",
                  zoneColor
                )}
              >
                {/* Position */}
                <span className="text-sm font-semibold text-muted text-center">
                  {row.position}
                </span>

                {/* Team */}
                <div className="flex items-center gap-2 min-w-0">
                  <div className="w-6 h-6 rounded-md bg-surface-alt border border-border flex items-center justify-center text-[9px] font-bold text-muted flex-shrink-0">
                    {row.team.shortName?.slice(0, 3) ??
                      row.team.name.slice(0, 3).toUpperCase()}
                  </div>
                  <span className="text-sm font-medium text-white truncate">
                    {row.team.name}
                  </span>
                </div>

                {/* Stats */}
                <span className="text-sm text-muted text-center">{row.playedGames}</span>
                <span className="text-sm text-secondary text-center font-medium">{row.won}</span>
                <span className="text-sm text-muted text-center">{row.draw}</span>
                <span className="text-sm text-red-400 text-center">{row.lost}</span>

                {/* Goal Diff */}
                <div className="flex items-center justify-center gap-0.5">
                  {row.goalDifference > 0 ? (
                    <TrendingUp className="w-3 h-3 text-secondary" />
                  ) : row.goalDifference < 0 ? (
                    <TrendingDown className="w-3 h-3 text-red-400" />
                  ) : (
                    <Minus className="w-3 h-3 text-muted" />
                  )}
                  <span
                    className={cn(
                      "text-xs font-medium",
                      row.goalDifference > 0
                        ? "text-secondary"
                        : row.goalDifference < 0
                        ? "text-red-400"
                        : "text-muted"
                    )}
                  >
                    {row.goalDifference > 0 ? "+" : ""}
                    {row.goalDifference}
                  </span>
                </div>

                {/* Form */}
                <div className="hidden sm:flex items-center gap-0.5">
                  {form.length > 0 ? (
                    form.map((f, i) => <FormIndicator key={i} form={f} />)
                  ) : (
                    <span className="text-xs text-muted">—</span>
                  )}
                </div>

                {/* Points */}
                <span className="text-base font-bold text-white text-center">
                  {row.points}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
