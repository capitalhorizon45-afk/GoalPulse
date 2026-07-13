/**
 * "News" for sportivox is generated from real recent results returned by
 * Football-Data.org and TheSportsDB — there is no separate news/article
 * API in scope, so match reports are derived from real match data
 * instead of being invented.
 */

import { getRecentFinishedMatches } from "@/lib/api/football-data";
import { getLastEvents } from "@/lib/api/sports-db";
import { SPORTSDB_NEWS_LEAGUES } from "@/lib/sports-catalog";
import { currentFootballSeasonYear } from "@/lib/data-fetcher";
import type { NewsArticle, SportCategory } from "@/lib/types";

const FOOTBALL_LEAGUES: { code: string; name: string }[] = [
  { code: "PL", name: "Premier League" },
  { code: "PD", name: "La Liga" },
  { code: "BL1", name: "Bundesliga" },
  { code: "SA", name: "Serie A" },
  { code: "FL1", name: "Ligue 1" },
];

function slugify(input: string): string {
  return input
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

function readTimeFor(text: string): number {
  return Math.max(2, Math.round(text.split(/\s+/).length / 40));
}

function matchReportText(
  homeName: string,
  awayName: string,
  homeScore: number,
  awayScore: number,
  competitionName: string
): { title: string; excerpt: string } {
  if (homeScore === awayScore) {
    return {
      title: `${homeName} and ${awayName} share the points in ${homeScore}-${awayScore} draw`,
      excerpt: `${homeName} and ${awayName} played out a ${homeScore}-${awayScore} draw in ${competitionName}.`,
    };
  }
  const winner = homeScore > awayScore ? homeName : awayName;
  const loser = homeScore > awayScore ? awayName : homeName;
  const winnerScore = Math.max(homeScore, awayScore);
  const loserScore = Math.min(homeScore, awayScore);
  return {
    title: `${winner} beat ${loser} ${winnerScore}-${loserScore} in ${competitionName}`,
    excerpt: `${winner} came out on top against ${loser}, winning ${winnerScore}-${loserScore} in ${competitionName}.`,
  };
}

async function fetchFootballNews(): Promise<NewsArticle[]> {
  const articles: NewsArticle[] = [];

  const season = String(currentFootballSeasonYear());

  // Sequential (not Promise.all) to stay well under the free-tier rate limit.
  for (const league of FOOTBALL_LEAGUES) {
    try {
      const matches = await getRecentFinishedMatches(league.code, season, 2);
      for (const m of matches) {
        const homeScore = m.score.fullTime.home ?? 0;
        const awayScore = m.score.fullTime.away ?? 0;
        const { title, excerpt } = matchReportText(
          m.homeTeam.shortName ?? m.homeTeam.name,
          m.awayTeam.shortName ?? m.awayTeam.name,
          homeScore,
          awayScore,
          league.name
        );
        articles.push({
          id: `football-${m.id}`,
          title,
          excerpt,
          content: `${excerpt} The match was played on ${new Date(m.utcDate).toLocaleDateString(
            "en-GB",
            { day: "numeric", month: "long", year: "numeric" }
          )}.`,
          imageUrl: homeScore >= awayScore ? m.homeTeam.crest : m.awayTeam.crest,
          category: "football",
          publishedAt: m.utcDate,
          author: "sportivox Newsroom",
          source: "Football-Data.org",
          slug: `football-${m.id}-${slugify(`${m.homeTeam.shortName ?? m.homeTeam.name}-${m.awayTeam.shortName ?? m.awayTeam.name}`)}`,
          readTime: readTimeFor(excerpt),
        });
      }
    } catch {
      // Skip this league's news if the request fails; other leagues still render.
    }
  }

  return articles;
}

async function fetchSportsDbNews(
  category: Exclude<SportCategory, "football" | "general">
): Promise<NewsArticle[]> {
  const leagueId = SPORTSDB_NEWS_LEAGUES[category];
  try {
    const events = await getLastEvents(leagueId);
    return events.slice(0, 3).map((e) => {
      // Some sports (e.g. tennis) don't populate team fields — fall back to
      // parsing the two competitors out of the event name ("A vs B").
      const [fallbackHome, fallbackAway] = e.strEvent.split(/\s+vs\.?\s+/i);
      const homeName = e.strHomeTeam ?? fallbackHome ?? e.strEvent;
      const awayName = e.strAwayTeam ?? fallbackAway ?? "";
      const hasScore = e.intHomeScore !== null && e.intAwayScore !== null;
      const homeScore = Number(e.intHomeScore ?? 0);
      const awayScore = Number(e.intAwayScore ?? 0);

      const { title, excerpt } = hasScore
        ? matchReportText(homeName, awayName, homeScore, awayScore, e.strLeague)
        : {
            title: awayName ? `${homeName} face ${awayName} in ${e.strLeague}` : e.strEvent,
            excerpt: `${e.strEvent} — ${e.strLeague}.`,
          };
      const publishedAt = e.strTime
        ? `${e.dateEvent}T${e.strTime}Z`
        : `${e.dateEvent}T00:00:00Z`;
      return {
        id: `${category}-${e.idEvent}`,
        title,
        excerpt,
        content: `${excerpt} The match was played on ${new Date(publishedAt).toLocaleDateString(
          "en-GB",
          { day: "numeric", month: "long", year: "numeric" }
        )}.`,
        imageUrl: e.strThumb || e.strLeagueBadge || "",
        category,
        publishedAt,
        author: "sportivox Newsroom",
        source: "TheSportsDB",
        slug: `${category}-${e.idEvent}-${slugify(awayName ? `${homeName}-${awayName}` : homeName)}`,
        readTime: readTimeFor(excerpt),
      } satisfies NewsArticle;
    });
  } catch {
    return [];
  }
}

/** All sportivox "news" — real recent match results across all four sports. */
export async function fetchNews(): Promise<NewsArticle[]> {
  const football = await fetchFootballNews();
  const cricket = await fetchSportsDbNews("cricket");
  const basketball = await fetchSportsDbNews("basketball");
  const tennis = await fetchSportsDbNews("tennis");

  const all = [...football, ...cricket, ...basketball, ...tennis]
    .filter((a) => a.imageUrl) // drop items TheSportsDB gave us no image for
    .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime());

  return all.map((article, i) => ({ ...article, featured: i === 0 }));
}
