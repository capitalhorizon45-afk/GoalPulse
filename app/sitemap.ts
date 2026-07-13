import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/seo";
import { fetchNews } from "@/lib/news";

type ChangeFrequency = NonNullable<
  MetadataRoute.Sitemap[number]["changeFrequency"]
>;

const ROUTES: {
  path: string;
  changeFrequency: ChangeFrequency;
  priority: number;
}[] = [
  { path: "/", changeFrequency: "always", priority: 1.0 },
  { path: "/live", changeFrequency: "always", priority: 0.9 },
  { path: "/fixtures", changeFrequency: "hourly", priority: 0.8 },
  { path: "/standings", changeFrequency: "hourly", priority: 0.8 },
  { path: "/news", changeFrequency: "hourly", priority: 0.8 },
  { path: "/sports", changeFrequency: "daily", priority: 0.7 },
  { path: "/about", changeFrequency: "monthly", priority: 0.5 },
  { path: "/contact", changeFrequency: "yearly", priority: 0.4 },
  { path: "/privacy", changeFrequency: "yearly", priority: 0.3 },
  { path: "/terms", changeFrequency: "yearly", priority: 0.3 },
  { path: "/cookies", changeFrequency: "yearly", priority: 0.3 },
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const lastModified = new Date();

  const staticEntries: MetadataRoute.Sitemap = ROUTES.map(
    ({ path, changeFrequency, priority }) => ({
      url: path === "/" ? SITE_URL : `${SITE_URL}${path}`,
      lastModified,
      changeFrequency,
      priority,
    })
  );

  // Individual news/match-report pages are real, crawlable content — list
  // them too. Fall back to just the static routes if news fails to load,
  // rather than failing sitemap generation entirely.
  const articles = await fetchNews().catch(() => []);
  const articleEntries: MetadataRoute.Sitemap = articles.map((article) => ({
    url: `${SITE_URL}/news/${article.slug}`,
    lastModified: new Date(article.publishedAt),
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  return [...staticEntries, ...articleEntries];
}
