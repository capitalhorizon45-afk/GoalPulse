/**
 * Static catalog describing the sports sportivox covers and which
 * competitions back each one. This is app configuration, not fetched
 * data — league counts reflect the real integrations below, and
 * `hasLiveData` reflects an actual limitation of the free API tiers
 * (TheSportsDB's free key does not include the live-score endpoint,
 * so only football has real live scores today).
 */

import type { Sport } from "@/lib/types";
import { COMPETITIONS } from "@/lib/api/football-data";
import { LEAGUE_IDS } from "@/lib/api/sports-db";

export const SPORTS_CATALOG: Sport[] = [
  {
    id: "football",
    name: "Football",
    category: "football",
    icon: "⚽",
    color: "#00C8FF",
    description: "The world's most popular sport with top leagues from around the globe.",
    leagueCount: Object.keys(COMPETITIONS).length,
    hasLiveData: true,
  },
  {
    id: "cricket",
    name: "Cricket",
    category: "cricket",
    icon: "🏏",
    color: "#22C55E",
    description: "Test matches, ODIs, and T20s from international and domestic competitions.",
    leagueCount: 1, // IPL via TheSportsDB
    hasLiveData: false,
  },
  {
    id: "basketball",
    name: "Basketball",
    category: "basketball",
    icon: "🏀",
    color: "#F97316",
    description: "NBA and international basketball results and schedules.",
    leagueCount: 1, // NBA via TheSportsDB
    hasLiveData: false,
  },
  {
    id: "tennis",
    name: "Tennis",
    category: "tennis",
    icon: "🎾",
    color: "#A855F7",
    description: "ATP tour results and schedules from tournaments worldwide.",
    leagueCount: 1, // ATP via TheSportsDB
    hasLiveData: false,
  },
];

export const SPORTSDB_NEWS_LEAGUES: Record<"cricket" | "basketball" | "tennis", string> = {
  cricket: LEAGUE_IDS.IPL,
  basketball: LEAGUE_IDS.NBA,
  tennis: LEAGUE_IDS.ATP,
};
