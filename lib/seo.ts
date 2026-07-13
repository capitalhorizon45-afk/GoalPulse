import type { Metadata } from "next";
import type { NewsArticle } from "@/lib/types";

/**
 * Single source of truth for the site's canonical URL. Override with
 * NEXT_PUBLIC_SITE_URL once a real production domain is attached; falls
 * back to the sportivox brand domain already used across the site
 * (contact emails, footer links, etc.) in the meantime.
 */
export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://sportivox.app"
).replace(/\/$/, "");

export const SITE_NAME = "sportivox";

export const SITE_DESCRIPTION =
  "Your ultimate sports hub. Live scores, fixtures, standings, and breaking news for Football, Cricket, Basketball, and Tennis.";

export const TWITTER_HANDLE = "@sportivox";

interface PageMetadataInput {
  /** Page-specific title. The root layout appends " | sportivox". */
  title: string;
  description: string;
  /** Route path starting with "/", e.g. "/live". Use "/" for the homepage. */
  path: string;
  keywords?: string[];
}

/**
 * Builds a complete, consistent Metadata object (canonical URL, Open Graph,
 * Twitter Card) for a single page. Every page on the site should construct
 * its `metadata` export through this helper instead of hand-rolling OG/
 * Twitter fields, so canonical/social tags never drift out of sync.
 */
export function buildMetadata({
  title,
  description,
  path,
  keywords,
}: PageMetadataInput): Metadata {
  const url = path === "/" ? SITE_URL : `${SITE_URL}${path}`;

  return {
    title,
    description,
    ...(keywords ? { keywords } : {}),
    alternates: {
      canonical: path,
    },
    openGraph: {
      title,
      description,
      url,
      siteName: SITE_NAME,
      type: "website",
      locale: "en_US",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      creator: TWITTER_HANDLE,
    },
  };
}

/** JSON-LD Organization schema — identifies sportivox as a publisher/brand. */
export function organizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: SITE_NAME,
    url: SITE_URL,
    logo: `${SITE_URL}/icon`,
    description: SITE_DESCRIPTION,
  };
}

/** JSON-LD WebSite schema — identifies the site itself for search engines. */
export function websiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: SITE_NAME,
    url: SITE_URL,
    description: SITE_DESCRIPTION,
  };
}

/** JSON-LD BreadcrumbList schema for a page's position in the site hierarchy. */
export function breadcrumbSchema(items: { name: string; url: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url.startsWith("http") ? item.url : `${SITE_URL}${item.url}`,
    })),
  };
}

/** JSON-LD FAQPage schema for a page of real, static question/answer content. */
export function faqSchema(items: { question: string; answer: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };
}

/** JSON-LD NewsArticle schema for an individual news/match-report page. */
export function articleSchema(article: NewsArticle, path: string) {
  const url = `${SITE_URL}${path}`;
  return {
    "@context": "https://schema.org",
    "@type": "NewsArticle",
    headline: article.title,
    description: article.excerpt,
    ...(article.imageUrl ? { image: [article.imageUrl] } : {}),
    datePublished: article.publishedAt,
    dateModified: article.publishedAt,
    ...(article.author
      ? { author: { "@type": "Organization", name: article.author } }
      : {}),
    publisher: {
      "@type": "Organization",
      name: SITE_NAME,
      logo: { "@type": "ImageObject", url: `${SITE_URL}/icon` },
    },
    mainEntityOfPage: { "@type": "WebPage", "@id": url },
  };
}
