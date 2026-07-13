import type { Metadata } from "next";
import { Newspaper } from "lucide-react";
import NewsCard from "@/components/ui/NewsCard";
import { fetchNews } from "@/lib/news";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "News",
  description: "Latest sports news, match reports, and analysis from Football, Cricket, Basketball, and Tennis.",
  path: "/news",
  keywords: ["sports news", "match reports", "sports analysis"],
});

// News is derived from live match results across two third-party APIs —
// render per-request rather than baking a snapshot into the build.
export const dynamic = "force-dynamic";

const CATEGORY_FILTERS = [
  { label: "All", value: "all" },
  { label: "⚽ Football", value: "football" },
  { label: "🏏 Cricket", value: "cricket" },
  { label: "🏀 Basketball", value: "basketball" },
  { label: "🎾 Tennis", value: "tennis" },
];

export default async function NewsPage() {
  const news = await fetchNews();

  if (news.length === 0) {
    return (
      <div className="pt-24 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center py-20">
          <Newspaper className="w-10 h-10 text-muted mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-white mb-2">No news right now</h1>
          <p className="text-muted text-sm">
            We couldn&apos;t find any recent match results to report on. Check back soon.
          </p>
        </div>
      </div>
    );
  }

  const featured = news.find((a) => a.featured) ?? news[0];
  const rest = news.filter((a) => a.id !== featured.id);

  return (
    <div className="pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center">
              <Newspaper className="w-5 h-5 text-primary" />
            </div>
            <div>
              <h1 className="text-3xl font-black text-white">Sports News</h1>
              <p className="text-muted text-sm">
                Match reports generated from the latest real results
              </p>
            </div>
          </div>
        </div>

        {/* Category Filters */}
        <div className="flex items-center gap-2 mb-8 overflow-x-auto pb-2">
          {CATEGORY_FILTERS.map(({ label, value }) => (
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

        {/* Featured Article */}
        <div className="mb-8">
          <NewsCard article={featured} variant="featured" />
        </div>

        {/* Article Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {rest.map((article) => (
            <NewsCard key={article.id} article={article} />
          ))}
        </div>
      </div>
    </div>
  );
}
