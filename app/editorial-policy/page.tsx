import type { Metadata } from "next";
import Link from "next/link";
import { FileCheck2 } from "lucide-react";
import LegalSection from "@/components/ui/LegalSection";
import Breadcrumbs from "@/components/seo/Breadcrumbs";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Editorial Policy",
  description:
    "How sportivox produces its match-report news, where the underlying data comes from, and how we handle corrections.",
  path: "/editorial-policy",
});

const LAST_UPDATED = "July 13, 2026";

export default function EditorialPolicyPage() {
  return (
    <div className="pt-24 pb-16">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <Breadcrumbs items={[{ label: "Editorial Policy" }]} />

        {/* Hero */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 badge-primary mb-6">
            <FileCheck2 className="w-3.5 h-3.5" />
            Editorial Policy
          </div>
          <h1 className="text-4xl sm:text-5xl font-black text-white mb-4 leading-tight">
            How our news is produced
          </h1>
          <p className="text-muted text-sm">Last updated: {LAST_UPDATED}</p>
        </div>

        {/* Content */}
        <div className="bg-surface rounded-2xl border border-border p-6 sm:p-8">
          <LegalSection title="1. What sportivox News Is">
            <p>
              The &ldquo;News&rdquo; section of sportivox consists of short
              match reports generated automatically from real, recently
              completed results supplied by our data providers — not
              original reporting from journalists on the ground, press
              releases, or interviews. Each report states the final score,
              competition, and date, and is written from that factual match
              data.
            </p>
          </LegalSection>

          <LegalSection title="2. Why We Do It This Way">
            <p>
              sportivox does not operate a newsroom of staff reporters. Being
              upfront about that matters to us: we would rather tell you
              exactly how a report was produced than imply human journalism
              that didn&apos;t happen. Every report is grounded in a real
              completed match — we do not invent fixtures, scores, or quotes.
            </p>
          </LegalSection>

          <LegalSection title="3. Sourcing">
            <p>
              Match results powering our reports come from{" "}
              <a href="https://www.football-data.org" target="_blank" rel="noopener noreferrer">
                Football-Data.org
              </a>{" "}
              (football) and{" "}
              <a href="https://www.thesportsdb.com" target="_blank" rel="noopener noreferrer">
                TheSportsDB
              </a>{" "}
              (cricket, basketball, and tennis). See our{" "}
              <Link href="/data-sources">Data Sources</Link> page for a full
              breakdown of coverage by sport.
            </p>
          </LegalSection>

          <LegalSection title="4. Bylines">
            <p>
              Reports are attributed to &ldquo;sportivox Newsroom&rdquo; to
              reflect that they are produced by the sportivox platform from
              provider data, rather than by a named individual reporter.
            </p>
          </LegalSection>

          <LegalSection title="5. Accuracy & Corrections">
            <p>
              Because reports are derived directly from provider data, their
              accuracy depends on the accuracy of that source. If you spot a
              score, date, or team name that looks wrong, please tell us —
              we will investigate against the source data and correct or
              remove the report if a genuine error is confirmed.
            </p>
          </LegalSection>

          <LegalSection title="6. No Editorial Bias">
            <p>
              Reports are limited to factual outcomes (who played, the score,
              and the competition) and do not include opinion, punditry, or
              commentary. We do not accept payment for coverage of any team,
              league, or event.
            </p>
          </LegalSection>

          <LegalSection title="7. Related Policies">
            <p>
              See also our{" "}
              <Link href="/disclaimer">Disclaimer</Link> and{" "}
              <Link href="/terms">Terms &amp; Conditions</Link> for how this
              content should — and shouldn&apos;t — be relied upon.
            </p>
          </LegalSection>

          <LegalSection title="8. Contact Us">
            <p>
              To report an error or ask about how a specific article was
              produced, reach us via our{" "}
              <Link href="/contact">Contact page</Link> or email{" "}
              <a href="mailto:hello@sportivox.app">hello@sportivox.app</a>.
            </p>
          </LegalSection>
        </div>
      </div>
    </div>
  );
}
