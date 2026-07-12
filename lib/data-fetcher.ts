/**
 * Server-side data access for GoalPulse.
 *
 * Football data is read from the live Football-Data.org API
 * (`FOOTBALL_DATA_API_KEY`). If that API is unavailable — unconfigured,
 * rate-limited, or erroring — every function here automatically falls
 * back to realistic mock data (`lib/mock-data.ts`) instead of throwing,
 * so the UI never shows an error state for something the user can't fix.
 *
 * Cricket, basketball, and tennis (TheSportsDB, in `lib/api/sports-db.ts`)
 * are unaffected and keep their existing live-only behavior.
 */

import {
  getLiveMatches,
  getTodaysMatches,
  getUpcomingMatches,
  getStandings,
} from "@/lib/api/football-data";
import {
  getMockLiveMatches,
  getMockTodaysMatches,
  getMockUpcomingMatches,
  getMockStandings,
} from "@/lib/mock-data";
import type { FootballDataMatch, Match, Standing } from "@/lib/types";

/**
 * European club football seasons run roughly August through May. Before a
 * new season kicks off (June/July), "current season" standings/results are
 * empty — so we compute the season we actually want data for up front
 * instead of guessing-then-retrying, which would double our API usage.
 */
export function currentFootballSeasonYear(): number {
  const now = new Date();
  const month = now.getUTCMonth() + 1; // 1-12
  return month >= 8 ? now.getUTCFullYear() : now.getUTCFullYear() - 1;
}

function mapFootballMatch(m: FootballDataMatch): Match {
  return {
    id: m.id,
    utcDate: m.utcDate,
    status: m.status,
    homeTeam: {
      id: m.homeTeam.id,
      name: m.homeTeam.name,
      shortName: m.homeTeam.shortName,
      crest: m.homeTeam.crest,
    },
    awayTeam: {
      id: m.awayTeam.id,
      name: m.awayTeam.name,
      shortName: m.awayTeam.shortName,
      crest: m.awayTeam.crest,
    },
    score: {
      home: m.score.fullTime.home,
      away: m.score.fullTime.away,
    },
    competition: {
      id: m.competition.id,
      name: m.competition.name,
      code: m.competition.code,
      emblem: m.competition.emblem,
    },
  };
}

function logFallback(context: string, err: unknown) {
  const message = err instanceof Error ? err.message : String(err);
  console.warn(
    `[football-data] ${context} unavailable, falling back to mock data: ${message}`
  );
}

// ─── Matches ──────────────────────────────────────────────────────────────────

export async function fetchLiveMatches(): Promise<Match[]> {
  try {
    const raw = await getLiveMatches();
    return raw.map(mapFootballMatch);
  } catch (err) {
    logFallback("Live matches", err);
    return getMockLiveMatches();
  }
}

/** All of today's football matches (live, finished, and upcoming kickoffs). */
export async function fetchTodaysMatches(): Promise<Match[]> {
  try {
    const raw = await getTodaysMatches();
    return raw.map(mapFootballMatch);
  } catch (err) {
    logFallback("Today's matches", err);
    return getMockTodaysMatches();
  }
}

export async function fetchUpcomingMatches(
  competitionCode = "PL"
): Promise<Match[]> {
  try {
    const raw = await getUpcomingMatches(competitionCode);
    return raw.map(mapFootballMatch);
  } catch (err) {
    logFallback("Upcoming matches", err);
    return getMockUpcomingMatches(competitionCode);
  }
}

// ─── Standings ────────────────────────────────────────────────────────────────

/** Standings for a competition's most recently active season. */
export async function fetchStandings(
  competitionCode = "PL"
): Promise<{ table: Standing[]; season: string }> {
  const season = String(currentFootballSeasonYear());
  try {
    const data = await getStandings(competitionCode, season);
    if (!data) {
      throw new Error(`Standings are not available for ${competitionCode}.`);
    }
    return { table: data.table, season: data.season };
  } catch (err) {
    logFallback("Standings", err);
    const mock = getMockStandings(competitionCode);
    return { table: mock.table, season };
  }
}
