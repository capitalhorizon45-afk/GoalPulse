/**
 * Football fallback data.
 *
 * sportivox's football data comes from Football-Data.org (see
 * `lib/api/football-data.ts`). This module provides realistic
 * placeholder data for that sport only — used exclusively by
 * `lib/data-fetcher.ts` when the live API is unavailable, unconfigured,
 * or rate-limited, so the UI never has to show an error state for
 * something the user can't fix from the page.
 *
 * Cricket, basketball, and tennis (TheSportsDB) are out of scope here
 * and keep their existing live-only behavior.
 */

import type { Competition, Match, Standing, Team } from "@/lib/types";

interface LeagueDef {
  code: string;
  name: string;
  teams: string[];
}

const LEAGUES: LeagueDef[] = [
  {
    code: "PL",
    name: "Premier League",
    teams: [
      "Arsenal", "Manchester City", "Liverpool", "Chelsea", "Manchester United",
      "Tottenham Hotspur", "Newcastle United", "Aston Villa", "Brighton", "West Ham United",
      "Crystal Palace", "Fulham", "Wolverhampton", "Everton", "Brentford",
      "Nottingham Forest", "Bournemouth", "Leicester City", "Ipswich Town", "Southampton",
    ],
  },
  {
    code: "PD",
    name: "La Liga",
    teams: [
      "Real Madrid", "Barcelona", "Atletico Madrid", "Girona", "Athletic Bilbao",
      "Real Sociedad", "Real Betis", "Villarreal", "Valencia", "Sevilla",
      "Osasuna", "Getafe", "Celta Vigo", "Mallorca", "Rayo Vallecano",
      "Las Palmas", "Alaves", "Espanyol", "Leganes", "Valladolid",
    ],
  },
  {
    code: "BL1",
    name: "Bundesliga",
    teams: [
      "Bayern Munich", "Bayer Leverkusen", "RB Leipzig", "Borussia Dortmund", "Eintracht Frankfurt",
      "VfB Stuttgart", "Freiburg", "Union Berlin", "Werder Bremen", "Wolfsburg",
      "Mainz 05", "Borussia Monchengladbach", "Augsburg", "Hoffenheim", "Heidenheim",
      "St Pauli", "Bochum", "Holstein Kiel",
    ],
  },
  {
    code: "SA",
    name: "Serie A",
    teams: [
      "Inter Milan", "AC Milan", "Juventus", "Napoli", "Atalanta",
      "Roma", "Lazio", "Fiorentina", "Bologna", "Torino",
      "Monza", "Genoa", "Verona", "Lecce", "Udinese",
      "Cagliari", "Empoli", "Parma", "Como", "Venezia",
    ],
  },
  {
    code: "FL1",
    name: "Ligue 1",
    teams: [
      "Paris Saint-Germain", "Monaco", "Marseille", "Lille", "Lyon",
      "Nice", "Lens", "Rennes", "Strasbourg", "Toulouse",
      "Nantes", "Montpellier", "Brest", "Reims", "Le Havre",
      "Angers", "Auxerre", "Saint-Etienne",
    ],
  },
];

const DEFAULT_LEAGUE = LEAGUES[0];

function leagueByCode(code: string): LeagueDef {
  return LEAGUES.find((l) => l.code === code) ?? DEFAULT_LEAGUE;
}

function shortNameFor(name: string): string {
  const words = name.split(" ");
  if (words.length === 1) return name.slice(0, 3).toUpperCase();
  return words.map((w) => w[0]).join("").toUpperCase().slice(0, 3);
}

function teamFor(leagueCode: string, name: string, index: number): Team {
  return {
    id: hashId(leagueCode, index),
    name,
    shortName: shortNameFor(name),
  };
}

function hashId(leagueCode: string, index: number): number {
  const base = LEAGUES.findIndex((l) => l.code === leagueCode) + 1;
  return base * 1000 + index;
}

function competitionFor(leagueCode: string): Competition {
  const league = leagueByCode(leagueCode);
  return {
    id: LEAGUES.findIndex((l) => l.code === league.code) + 1,
    name: league.name,
    code: league.code,
  };
}

const FORM_PATTERNS: Array<Array<"W" | "D" | "L">> = [
  ["W", "W", "W", "D", "W"],
  ["W", "D", "W", "W", "L"],
  ["D", "W", "L", "W", "D"],
  ["L", "D", "D", "L", "W"],
  ["L", "L", "D", "L", "L"],
];

/** Deterministic, plausibly-ordered league table for the given competition. */
export function getMockStandings(competitionCode: string): {
  competition: Competition;
  table: Standing[];
} {
  const league = leagueByCode(competitionCode);
  const played = 26;

  const table: Standing[] = league.teams.map((name, i) => {
    const won = Math.max(3, 19 - i);
    const lost = Math.max(0, i - 3);
    const draw = Math.max(0, played - won - lost);
    const goalsFor = Math.max(18, 60 - i * 2);
    const goalsAgainst = 15 + i * 2;

    return {
      position: i + 1,
      team: teamFor(league.code, name, i),
      playedGames: played,
      won,
      draw,
      lost,
      points: won * 3 + draw,
      goalsFor,
      goalsAgainst,
      goalDifference: goalsFor - goalsAgainst,
      form: FORM_PATTERNS[i % FORM_PATTERNS.length].join(","),
    };
  });

  return { competition: competitionFor(league.code), table };
}

function scoreFor(a: number | null, b: number | null) {
  return { home: a, away: b };
}

/** Matches currently in play, mirroring what the live API returns during peak hours. */
export function getMockLiveMatches(): Match[] {
  const now = new Date();
  const pl = leagueByCode("PL");
  const pd = leagueByCode("PD");

  return [
    {
      id: 900001,
      utcDate: now.toISOString(),
      status: "IN_PLAY",
      minute: 67,
      homeTeam: teamFor(pl.code, pl.teams[0], 0),
      awayTeam: teamFor(pl.code, pl.teams[3], 3),
      score: scoreFor(2, 1),
      competition: competitionFor(pl.code),
    },
    {
      id: 900002,
      utcDate: now.toISOString(),
      status: "IN_PLAY",
      minute: 34,
      homeTeam: teamFor(pd.code, pd.teams[0], 0),
      awayTeam: teamFor(pd.code, pd.teams[1], 1),
      score: scoreFor(1, 1),
      competition: competitionFor(pd.code),
    },
  ];
}

/** All of today's football matches — a mix of live, finished, and later kickoffs. */
export function getMockTodaysMatches(): Match[] {
  const now = new Date();
  const laterToday = new Date(now.getTime() + 4 * 60 * 60 * 1000);
  const earlierToday = new Date(now.getTime() - 5 * 60 * 60 * 1000);
  const bl1 = leagueByCode("BL1");
  const sa = leagueByCode("SA");

  return [
    ...getMockLiveMatches(),
    {
      id: 900003,
      utcDate: earlierToday.toISOString(),
      status: "FINISHED",
      homeTeam: teamFor(bl1.code, bl1.teams[2], 2),
      awayTeam: teamFor(bl1.code, bl1.teams[4], 4),
      score: scoreFor(3, 0),
      competition: competitionFor(bl1.code),
    },
    {
      id: 900004,
      utcDate: laterToday.toISOString(),
      status: "SCHEDULED",
      homeTeam: teamFor(sa.code, sa.teams[0], 0),
      awayTeam: teamFor(sa.code, sa.teams[2], 2),
      score: scoreFor(null, null),
      competition: competitionFor(sa.code),
    },
  ];
}

/** Upcoming scheduled fixtures for a competition, spread over the next several days. */
export function getMockUpcomingMatches(
  competitionCode: string,
  limit = 10
): Match[] {
  const league = leagueByCode(competitionCode);
  const now = new Date();
  const fixtures: Match[] = [];

  for (let i = 0; i < league.teams.length - 1 && fixtures.length < limit; i += 2) {
    const daysAhead = Math.floor(i / 2) + 1;
    const kickoff = new Date(now.getTime() + daysAhead * 24 * 60 * 60 * 1000);
    kickoff.setUTCHours(15, 0, 0, 0);

    fixtures.push({
      id: 910000 + i,
      utcDate: kickoff.toISOString(),
      status: "SCHEDULED",
      homeTeam: teamFor(league.code, league.teams[i], i),
      awayTeam: teamFor(league.code, league.teams[i + 1], i + 1),
      score: scoreFor(null, null),
      competition: competitionFor(league.code),
    });
  }

  return fixtures.slice(0, limit);
}
