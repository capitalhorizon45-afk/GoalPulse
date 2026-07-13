import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { ArrowLeft, Clock, User, Calendar } from "lucide-react";
import { fetchNews } from "@/lib/news";
import { formatRelativeTime } from "@/lib/utils";
import NewsCard from "@/components/ui/NewsCard";
import { SITE_NAME, SITE_URL, TWITTER_HANDLE, articleSchema } from "@/lib/seo";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const news = await fetchNews();
  const article = news.find((a) => a.slug === slug);
  if (!article) return { title: "Article not found" };

  const path = `/news/${slug}`;

  return {
    title: article.title,
    description: article.excerpt,
    alternates: { canonical: path },
    openGraph: {
      title: article.title,
      description: article.excerpt,
      url: `${SITE_URL}${path}`,
      siteName: SITE_NAME,
      type: "article",
      publishedTime: article.publishedAt,
      ...(article.author ? { authors: [article.author] } : {}),
      ...(article.imageUrl ? { images: [{ url: article.imageUrl }] } : {}),
    },
    twitter: {
      card: "summary_large_image",
      title: article.title,
      description: article.excerpt,
      creator: TWITTER_HANDLE,
      ...(article.imageUrl ? { images: [article.imageUrl] } : {}),
    },
  };
}

export async function generateStaticParams() {
  const news = await fetchNews().catch(() => []);
  return news.map((article) => ({ slug: article.slug }));
}

export default async function ArticlePage({ params }: Props) {
  const { slug } = await params;
  const news = await fetchNews();
  const article = news.find((a) => a.slug === slug);
  if (!article) notFound();

  const related = news
    .filter((a) => a.id !== article.id && a.category === article.category)
    .slice(0, 3);

  return (
    <div className="pt-24 pb-16">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(articleSchema(article, `/news/${slug}`)),
        }}
      />
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back */}
        <Link
          href="/news"
          className="inline-flex items-center gap-2 text-muted hover:text-white text-sm mb-6 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to News
        </Link>

        {/* Article Header */}
        <div className="mb-6">
          <span className="badge-primary capitalize mb-3 inline-block">
            {article.category}
          </span>
          <h1 className="text-3xl sm:text-4xl font-black text-white leading-tight mb-4">
            {article.title}
          </h1>
          <p className="text-lg text-muted leading-relaxed mb-5">
            {article.excerpt}
          </p>
          <div className="flex flex-wrap items-center gap-4 text-sm text-muted">
            {article.author && (
              <span className="flex items-center gap-1.5">
                <User className="w-4 h-4" />
                {article.author}
              </span>
            )}
            <span className="flex items-center gap-1.5">
              <Calendar className="w-4 h-4" />
              {new Date(article.publishedAt).toLocaleDateString("en-GB", {
                day: "numeric",
                month: "long",
                year: "numeric",
              })}
            </span>
            <span className="flex items-center gap-1.5">
              <Clock className="w-4 h-4" />
              {formatRelativeTime(article.publishedAt)}
            </span>
            {article.readTime && (
              <span>{article.readTime} min read</span>
            )}
          </div>
        </div>

        {/* Hero Image */}
        <div className="relative rounded-2xl overflow-hidden mb-8 bg-surface flex items-center justify-center" style={{ aspectRatio: "16/9" }}>
          <Image
            src={article.imageUrl}
            alt={article.title}
            fill
            unoptimized
            className="object-contain p-8"
            priority
          />
        </div>

        {/* Article Content */}
        <div className="prose prose-invert max-w-none space-y-4 text-muted leading-relaxed">
          <p>{article.content ?? article.excerpt}</p>
          <p className="text-xs text-muted/70">
            Source: {article.source ?? "GoalPulse"}
          </p>
        </div>

        {/* Related Articles */}
        {related.length > 0 && (
          <div className="mt-12">
            <h2 className="text-xl font-bold text-white mb-5">
              Related Articles
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {related.map((a) => (
                <NewsCard key={a.id} article={a} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
