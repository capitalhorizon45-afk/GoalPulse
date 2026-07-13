import type { Metadata } from "next";
import Link from "next/link";
import { Cookie } from "lucide-react";
import LegalSection from "@/components/ui/LegalSection";
import Breadcrumbs from "@/components/seo/Breadcrumbs";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Cookie Policy",
  description:
    "Learn what cookies and local storage sportivox uses, and how to control them.",
  path: "/cookies",
});

const LAST_UPDATED = "July 12, 2026";

const COOKIE_TABLE = [
  {
    type: "Essential",
    used: "Yes",
    purpose: "Required for basic site functionality, such as remembering menu state.",
  },
  {
    type: "Preferences",
    used: "Minimal",
    purpose: "May store non-identifying UI preferences locally in your browser.",
  },
  {
    type: "Analytics",
    used: "No",
    purpose: "sportivox does not currently use third-party analytics cookies.",
  },
  {
    type: "Advertising",
    used: "No",
    purpose: "sportivox does not use advertising or cross-site tracking cookies.",
  },
];

export default function CookiePolicyPage() {
  return (
    <div className="pt-24 pb-16">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <Breadcrumbs items={[{ label: "Cookie Policy" }]} />

        {/* Hero */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 badge-primary mb-6">
            <Cookie className="w-3.5 h-3.5" />
            Cookie Policy
          </div>
          <h1 className="text-4xl sm:text-5xl font-black text-white mb-4 leading-tight">
            How we use cookies
          </h1>
          <p className="text-muted text-sm">Last updated: {LAST_UPDATED}</p>
        </div>

        {/* Content */}
        <div className="bg-surface rounded-2xl border border-border p-6 sm:p-8">
          <LegalSection title="1. What Are Cookies">
            <p>
              Cookies are small text files stored on your device by your
              browser. Websites also commonly use similar technologies, like
              local storage, to remember information between visits.
            </p>
          </LegalSection>

          <LegalSection title="2. Cookies We Use">
            <p>
              sportivox keeps its use of cookies and local storage to a
              minimum:
            </p>
            <div className="overflow-x-auto -mx-1 mt-4">
              <table className="w-full text-left border-collapse min-w-[480px]">
                <thead>
                  <tr className="border-b border-border">
                    <th className="py-2 px-3 text-white text-xs font-semibold">Type</th>
                    <th className="py-2 px-3 text-white text-xs font-semibold">Used?</th>
                    <th className="py-2 px-3 text-white text-xs font-semibold">Purpose</th>
                  </tr>
                </thead>
                <tbody>
                  {COOKIE_TABLE.map(({ type, used, purpose }) => (
                    <tr key={type} className="border-b border-border last:border-0">
                      <td className="py-3 px-3 text-white text-sm font-medium whitespace-nowrap">
                        {type}
                      </td>
                      <td className="py-3 px-3 text-sm whitespace-nowrap">
                        <span
                          className={
                            used === "No"
                              ? "text-muted"
                              : "text-secondary font-medium"
                          }
                        >
                          {used}
                        </span>
                      </td>
                      <td className="py-3 px-3 text-muted text-sm">{purpose}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </LegalSection>

          <LegalSection title="3. Third-Party Data Requests">
            <p>
              Live sports data shown on sportivox is fetched by our servers
              from Football-Data.org and TheSportsDB — your browser does not
              make direct requests to these providers, so they do not set
              cookies on your device through our site.
            </p>
          </LegalSection>

          <LegalSection title="4. Managing Cookies">
            <p>
              Most browsers let you control or delete cookies through their
              settings. Since sportivox relies only on essential, functional
              storage, blocking non-essential cookies should not affect your
              ability to use the site. You can find instructions for managing
              cookies in your browser&apos;s help documentation.
            </p>
          </LegalSection>

          <LegalSection title="5. Changes to This Policy">
            <p>
              If sportivox introduces analytics or advertising in the future,
              this Cookie Policy will be updated accordingly and the
              &ldquo;Last updated&rdquo; date above will change.
            </p>
          </LegalSection>

          <LegalSection title="6. Related Policies">
            <p>
              See also our{" "}
              <Link href="/privacy">Privacy Policy</Link> and{" "}
              <Link href="/terms">Terms &amp; Conditions</Link>.
            </p>
          </LegalSection>

          <LegalSection title="7. Contact Us">
            <p>
              Questions about our use of cookies? Reach us via our{" "}
              <Link href="/contact">Contact page</Link> or email{" "}
              <a href="mailto:privacy@sportivox.app">privacy@sportivox.app</a>.
            </p>
          </LegalSection>
        </div>
      </div>
    </div>
  );
}
