import type { Metadata } from "next";
import Link from "next/link";
import { AlertTriangle } from "lucide-react";
import LegalSection from "@/components/ui/LegalSection";
import Breadcrumbs from "@/components/seo/Breadcrumbs";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Disclaimer",
  description:
    "Important information about the accuracy, independence, and intended use of the sports data and content on sportivox.",
  path: "/disclaimer",
});

const LAST_UPDATED = "July 13, 2026";

export default function DisclaimerPage() {
  return (
    <div className="pt-24 pb-16">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <Breadcrumbs items={[{ label: "Disclaimer" }]} />

        {/* Hero */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 badge-primary mb-6">
            <AlertTriangle className="w-3.5 h-3.5" />
            Disclaimer
          </div>
          <h1 className="text-4xl sm:text-5xl font-black text-white mb-4 leading-tight">
            Please read before relying on our data
          </h1>
          <p className="text-muted text-sm">Last updated: {LAST_UPDATED}</p>
        </div>

        {/* Content */}
        <div className="bg-surface rounded-2xl border border-border p-6 sm:p-8">
          <LegalSection title="1. Informational Purposes Only">
            <p>
              sportivox provides live scores, fixtures, standings, and
              match-report news for entertainment and informational purposes
              only. Nothing on this site constitutes professional, betting,
              financial, or legal advice, and content should not be relied
              upon as the sole basis for any decision — especially one
              involving money.
            </p>
          </LegalSection>

          <LegalSection title="2. No Betting or Wagering Use">
            <p>
              sportivox is not a betting platform and does not encourage
              gambling. Scores, statistics, and odds-adjacent figures (such as
              form or goal difference) can be delayed, incomplete, or
              incorrect. Do not use sportivox data as the basis for placing
              bets or wagers of any kind.
            </p>
          </LegalSection>

          <LegalSection title="3. Data Accuracy & Third-Party Sources">
            <p>
              Match data is supplied by third-party providers —{" "}
              <a href="https://www.football-data.org" target="_blank" rel="noopener noreferrer">
                Football-Data.org
              </a>{" "}
              and{" "}
              <a href="https://www.thesportsdb.com" target="_blank" rel="noopener noreferrer">
                TheSportsDB
              </a>
              . We display what these providers report, but we do not control
              their systems and cannot guarantee real-time accuracy,
              completeness, or availability. See our{" "}
              <Link href="/data-sources">Data Sources</Link> page for details
              on what each provider covers, and our{" "}
              <Link href="/editorial-policy">Editorial Policy</Link> for how
              match-report content is produced from that data.
            </p>
          </LegalSection>

          <LegalSection title="4. No Affiliation">
            <p>
              sportivox is an independent platform and is not affiliated
              with, endorsed by, or officially connected to any football
              league, club, federation, or governing body (including the
              Premier League, La Liga, Bundesliga, Serie A, or Ligue 1),
              nor with the NBA, IPL, ATP Tour, or any other competition
              referenced on this site. Team names, crests, and league marks
              remain the property of their respective owners and are used
              solely to identify the teams and competitions involved.
            </p>
          </LegalSection>

          <LegalSection title="5. External Links">
            <p>
              sportivox links to third-party websites, including our data
              providers and social platforms. We do not control and are not
              responsible for the content, accuracy, or availability of any
              external site.
            </p>
          </LegalSection>

          <LegalSection title="6. No Warranty">
            <p>
              The Service is provided &ldquo;as is&rdquo; without warranties
              of any kind. To the fullest extent permitted by law, sportivox
              disclaims all warranties, express or implied, regarding the
              accuracy, reliability, or availability of the site or its
              content. See our{" "}
              <Link href="/terms">Terms &amp; Conditions</Link> for our full
              limitation of liability.
            </p>
          </LegalSection>

          <LegalSection title="7. Changes to This Disclaimer">
            <p>
              We may update this Disclaimer from time to time. Material
              changes will be reflected by updating the &ldquo;Last
              updated&rdquo; date above.
            </p>
          </LegalSection>

          <LegalSection title="8. Contact Us">
            <p>
              Questions about this Disclaimer? Reach us via our{" "}
              <Link href="/contact">Contact page</Link> or email{" "}
              <a href="mailto:hello@sportivox.app">hello@sportivox.app</a>.
            </p>
          </LegalSection>
        </div>
      </div>
    </div>
  );
}
