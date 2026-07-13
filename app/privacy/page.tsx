import type { Metadata } from "next";
import Link from "next/link";
import { Shield } from "lucide-react";
import LegalSection from "@/components/ui/LegalSection";
import Breadcrumbs from "@/components/seo/Breadcrumbs";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Privacy Policy",
  description:
    "How sportivox collects, uses, and protects your information when you use our live sports platform.",
  path: "/privacy",
});

const LAST_UPDATED = "July 12, 2026";

export default function PrivacyPolicyPage() {
  return (
    <div className="pt-24 pb-16">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <Breadcrumbs items={[{ label: "Privacy Policy" }]} />

        {/* Hero */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 badge-primary mb-6">
            <Shield className="w-3.5 h-3.5" />
            Privacy Policy
          </div>
          <h1 className="text-4xl sm:text-5xl font-black text-white mb-4 leading-tight">
            Your privacy matters
          </h1>
          <p className="text-muted text-sm">Last updated: {LAST_UPDATED}</p>
        </div>

        {/* Content */}
        <div className="bg-surface rounded-2xl border border-border p-6 sm:p-8">
          <LegalSection title="1. Overview">
            <p>
              sportivox (&ldquo;we&rdquo;, &ldquo;our&rdquo;, &ldquo;us&rdquo;)
              provides live sports scores, fixtures, standings, and news for
              Football, Cricket, Basketball, and Tennis. This Privacy Policy
              explains what information we collect when you use our website,
              how we use it, and the choices you have.
            </p>
          </LegalSection>

          <LegalSection title="2. Information We Collect">
            <p>sportivox does not require an account to use, and we keep data collection to a minimum:</p>
            <ul>
              <li>
                <strong>Contact information you provide:</strong> if you reach
                out through our Contact page, we receive whatever name, email
                address, and message you choose to send.
              </li>
              <li>
                <strong>Technical information:</strong> like most websites,
                our hosting provider may automatically log standard technical
                data (such as IP address, browser type, and request
                timestamps) for security and reliability purposes.
              </li>
              <li>
                <strong>Local device storage:</strong> your browser may store
                non-essential preferences (such as UI state) locally on your
                device. We do not use this to identify you personally.
              </li>
            </ul>
            <p>
              We do not require registration, do not process payments, and do
              not knowingly collect sensitive personal information.
            </p>
          </LegalSection>

          <LegalSection title="3. How We Use Information">
            <ul>
              <li>To respond to messages sent through our Contact page.</li>
              <li>To operate, maintain, and improve the reliability of the site.</li>
              <li>To detect, investigate, and prevent abuse, fraud, or security issues.</li>
              <li>To understand aggregate, anonymized usage trends.</li>
            </ul>
            <p>We do not sell your personal information to third parties.</p>
          </LegalSection>

          <LegalSection title="4. Third-Party Sports Data Providers">
            <p>
              sportivox displays live sports data licensed from{" "}
              <a href="https://www.football-data.org" target="_blank" rel="noopener noreferrer">
                Football-Data.org
              </a>{" "}
              and{" "}
              <a href="https://www.thesportsdb.com" target="_blank" rel="noopener noreferrer">
                TheSportsDB
              </a>
              . These requests are made from our servers, not your browser, so
              your personal information is not shared with these providers
              simply by browsing our site.
            </p>
          </LegalSection>

          <LegalSection title="5. Cookies">
            <p>
              We use only essential, functional storage needed to run the
              site — we do not currently use third-party advertising or
              analytics cookies. See our{" "}
              <Link href="/cookies">Cookie Policy</Link> for full details.
            </p>
          </LegalSection>

          <LegalSection title="6. Data Retention">
            <p>
              Messages sent via our Contact page are retained only as long as
              necessary to respond to your inquiry and for a reasonable
              record-keeping period afterward. Technical logs are retained by
              our hosting infrastructure for a limited period for security
              purposes.
            </p>
          </LegalSection>

          <LegalSection title="7. Your Rights">
            <p>
              Depending on where you live, you may have rights to access,
              correct, or request deletion of personal information you have
              provided to us. To exercise any of these rights, contact us
              using the details below and we will respond within a reasonable
              timeframe.
            </p>
          </LegalSection>

          <LegalSection title="8. Children's Privacy">
            <p>
              sportivox is not directed at children under 13, and we do not
              knowingly collect personal information from children.
            </p>
          </LegalSection>

          <LegalSection title="9. Changes to This Policy">
            <p>
              We may update this Privacy Policy from time to time. Material
              changes will be reflected by updating the &ldquo;Last
              updated&rdquo; date above.
            </p>
          </LegalSection>

          <LegalSection title="10. Contact Us">
            <p>
              Questions about this Privacy Policy? Reach us via our{" "}
              <Link href="/contact">Contact page</Link> or email{" "}
              <a href="mailto:privacy@sportivox.app">privacy@sportivox.app</a>.
            </p>
          </LegalSection>
        </div>
      </div>
    </div>
  );
}
