// ─── Match & Score Types ──────────────────────────────────────────────────────

export type MatchStatus =
  | "SCHEDULED"
  | "TIMED"
  | "IN_PLAY"
  | "PAUSED"
  | "FINISHED"
  | "SUSPENDED"
  | "POSTPONED"
  | "CANCELLED"
  | "AWARDED";

export interface Team {
  id: number;
  name: string;
  shortName?: string;
  crest?: string;
}

export interface Score {
  home: number | null;
  away: number | null;
}

export interface Match {
  id: number;
  utcDate: string;
  status: MatchStatus;
  minute?: number;
  homeTeam: Team;
  awayTeam: Team;
  score: Score;
  competition: Competition;
  venue?: string;
}

// ─── Competition / League Types ───────────────────────────────────────────────

export interface Competition {
  id: number;
  name: string;
  code?: string;
  emblem?: string;
  country?: string;
}

export interface Standing {
  position: number;
  team: Team;
  playedGames: number;
  won: number;
  draw: number;
  lost: number;
  points: number;
  goalsFor: number;
  goalsAgainst: number;
  goalDifference: number;
  form?: string | null;
}

export interface StandingsTable {
  competition: Competition;
  season: string;
  table: Standing[];
}

// ─── News / Article Types ─────────────────────────────────────────────────────

export interface NewsArticle {
  id: string;
  title: string;
  excerpt: string;
  content?: string;
  imageUrl: string;
  category: SportCategory;
  publishedAt: string;
  author?: string;
  source?: string;
  slug: string;
  readTime?: number;
  featured?: boolean;
}

// ─── Sport Types ──────────────────────────────────────────────────────────────

export type SportCategory =
  | "football"
  | "cricket"
  | "basketball"
  | "tennis"
  | "general";

export interface Sport {
  id: string;
  name: string;
  category: SportCategory;
  icon: string;
  color: string;
  description: string;
  /** Number of leagues/competitions sportivox integrates for this sport. */
  leagueCount: number;
  /** Whether sportivox can show real live scores for this sport on the current API tier. */
  hasLiveData: boolean;
}

// ─── TheSportsDB Types ────────────────────────────────────────────────────────

export interface SportsDBEvent {
  idEvent: string;
  strEvent: string;
  strLeague: string;
  strSport: string;
  strHomeTeam: string;
  strAwayTeam: string;
  intHomeScore: string | null;
  intAwayScore: string | null;
  dateEvent: string;
  strTime: string;
  strStatus: string;
  strThumb?: string | null;
  strLeagueBadge?: string | null;
  strVenue?: string | null;
}

export interface SportsDBTeam {
  idTeam: string;
  strTeam: string;
  strLeague: string;
  strSport: string;
  strBadge?: string;
  strDescriptionEN?: string;
}

export interface SportsDBLeague {
  idLeague: string;
  strLeague: string;
  strSport: string;
  strBadge?: string;
  strBanner?: string;
  strCountry?: string;
}

// ─── Football-Data.org Types ──────────────────────────────────────────────────

export interface FootballDataMatch {
  id: number;
  utcDate: string;
  status: MatchStatus;
  matchday?: number;
  homeTeam: { id: number; name: string; shortName: string; crest: string };
  awayTeam: { id: number; name: string; shortName: string; crest: string };
  score: {
    winner: string | null;
    duration: string;
    fullTime: Score;
    halfTime: Score;
  };
  competition: { id: number; name: string; code: string; emblem: string };
  venue?: string;
}

// ─── UI / Component Types ─────────────────────────────────────────────────────

export interface NavLink {
  href: string;
  label: string;
  icon?: string;
  badge?: string;
}

export interface FilterOption {
  label: string;
  value: string;
}

export type LoadingState = "idle" | "loading" | "success" | "error";
