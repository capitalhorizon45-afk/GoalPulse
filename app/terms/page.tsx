import type { Metadata } from "next";
import Link from "next/link";
import { Scale } from "lucide-react";
import LegalSection from "@/components/ui/LegalSection";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Terms & Conditions",
  description:
    "The terms and conditions governing your use of the GoalPulse live sports platform.",
  path: "/terms",
});

const LAST_UPDATED = "July 12, 2026";

export default function TermsPage() {
  return (
    <div className="pt-24 pb-16">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 badge-primary mb-6">
            <Scale className="w-3.5 h-3.5" />
            Terms &amp; Conditions
          </div>
          <h1 className="text-4xl sm:text-5xl font-black text-white mb-4 leading-tight">
            Terms of use
          </h1>
          <p className="text-muted text-sm">Last updated: {LAST_UPDATED}</p>
        </div>

        {/* Content */}
        <div className="bg-surface rounded-2xl border border-border p-6 sm:p-8">
          <LegalSection title="1. Acceptance of Terms">
            <p>
              By accessing or using GoalPulse (&ldquo;the Service&rdquo;), you
              agree to be bound by these Terms &amp; Conditions. If you do not
              agree, please do not use the Service.
            </p>
          </LegalSection>

          <LegalSection title="2. Description of Service">
            <p>
              GoalPulse provides live sports scores, fixtures, standings, and
              news for Football, Cricket, Basketball, and Tennis, sourced from
              third-party data providers. The Service is provided for
              informational and entertainment purposes only.
            </p>
          </LegalSection>

          <LegalSection title="3. Data Accuracy Disclaimer">
            <p>
              Live scores, fixtures, standings, and statistics are supplied by
              third-party providers (including Football-Data.org and
              TheSportsDB) and may be delayed, incomplete, or occasionally
              incorrect. If a provider is temporarily unavailable, GoalPulse
              may display cached or representative data so the interface
              remains usable, clearly reflecting the underlying provider
              outage rather than presenting it as live. GoalPulse does not
              guarantee the accuracy, completeness, or timeliness of any data
              displayed, and this data should not be relied upon for betting,
              wagering, or any purpose requiring guaranteed accuracy.
            </p>
          </LegalSection>

          <LegalSection title="4. Acceptable Use">
            <p>You agree not to:</p>
            <ul>
              <li>Use the Service for any unlawful purpose or in violation of these Terms.</li>
              <li>Attempt to scrape, reverse-engineer, or overload the Service through automated means.</li>
              <li>Interfere with or disrupt the integrity or performance of the Service.</li>
              <li>Misrepresent data from the Service as your own or as officially licensed for redistribution.</li>
            </ul>
          </LegalSection>

          <LegalSection title="5. Intellectual Property">
            <p>
              The GoalPulse name, logo, design, and original content are the
              property of GoalPulse. Sports data, team names, and crests
              remain the property of their respective leagues, clubs, and
              data providers.
            </p>
          </LegalSection>

          <LegalSection title="6. Third-Party Links">
            <p>
              The Service may link to third-party websites (such as data
              providers or social platforms). We are not responsible for the
              content, accuracy, or practices of any third-party site.
            </p>
          </LegalSection>

          <LegalSection title="7. Limitation of Liability">
            <p>
              The Service is provided &ldquo;as is&rdquo; without warranties
              of any kind, express or implied. To the fullest extent
              permitted by law, GoalPulse shall not be liable for any
              indirect, incidental, or consequential damages arising from your
              use of, or inability to use, the Service.
            </p>
          </LegalSection>

          <LegalSection title="8. Changes to the Service or Terms">
            <p>
              We may modify or discontinue the Service, in whole or in part,
              at any time. We may also update these Terms periodically;
              continued use of the Service after changes take effect
              constitutes acceptance of the revised Terms.
            </p>
          </LegalSection>

          <LegalSection title="9. Governing Law">
            <p>
              These Terms are governed by applicable local law, without
              regard to conflict-of-law principles, unless otherwise required
              by mandatory consumer protection law in your jurisdiction.
            </p>
          </LegalSection>

          <LegalSection title="10. Contact Us">
            <p>
              Questions about these Terms? Reach us via our{" "}
              <Link href="/contact">Contact page</Link> or email{" "}
              <a href="mailto:legal@goalpulse.app">legal@goalpulse.app</a>.
            </p>
          </LegalSection>
        </div>
      </div>
    </div>
  );
}
