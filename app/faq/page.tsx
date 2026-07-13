import type { Metadata } from "next";
import Link from "next/link";
import { HelpCircle, ChevronDown } from "lucide-react";
import Breadcrumbs from "@/components/seo/Breadcrumbs";
import { buildMetadata, faqSchema } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "FAQ",
  description:
    "Answers to common questions about sportivox's live scores, data sources, coverage, and news.",
  path: "/faq",
});

const FAQ_GROUPS: { group: string; items: { question: string; answer: string }[] }[] = [
  {
    group: "About sportivox",
    items: [
      {
        question: "What is sportivox?",
        answer:
          "sportivox is a sports hub for live scores, fixtures, standings, and news across Football, Cricket, Basketball, and Tennis, built on real data from licensed sports data providers.",
      },
      {
        question: "Is sportivox free to use?",
        answer:
          "Yes. sportivox is free to browse — there's no account, subscription, or paywall.",
      },
      {
        question: "Is sportivox affiliated with any league or club?",
        answer:
          "No. sportivox is an independent platform and is not affiliated with, endorsed by, or officially connected to any league, club, or federation. See our Disclaimer for details.",
      },
    ],
  },
  {
    group: "Live Scores & Data",
    items: [
      {
        question: "Where does the score data come from?",
        answer:
          "Football data comes from Football-Data.org. Cricket, basketball, and tennis data comes from TheSportsDB. See our Data Sources page for a full breakdown.",
      },
      {
        question: "Why does football have live scores but cricket, basketball, and tennis don't?",
        answer:
          "Our current access tier with TheSportsDB doesn't include live in-play score updates, so those three sports show recent results and schedules rather than a live scoreboard. Football, via Football-Data.org, does have real live, in-play scores.",
      },
      {
        question: "How often do scores update?",
        answer:
          "Football data refreshes on a 60-second cache and other sports on a 120-second cache, matching what our providers make available — sportivox doesn't add artificial delay on top of that.",
      },
      {
        question: "What happens if a data provider goes down?",
        answer:
          "If Football-Data.org is temporarily unavailable, sportivox may show representative fallback data so the interface stays usable rather than breaking outright — this is never shown in place of real live data when the provider is healthy.",
      },
      {
        question: "Can I use sportivox data for betting?",
        answer:
          "No. sportivox is for informational and entertainment purposes only and should not be used as the basis for betting or wagering. See our Disclaimer for more.",
      },
    ],
  },
  {
    group: "News & Content",
    items: [
      {
        question: "Who writes the News section?",
        answer:
          "News articles are short match reports generated automatically from real completed results, not original reporting by staff journalists. See our Editorial Policy for full details.",
      },
      {
        question: "I found an error in an article or score — how do I report it?",
        answer:
          "Please contact us with the article or page in question and what looks wrong. We'll check it against the source data and correct or remove it if there's a genuine error.",
      },
    ],
  },
  {
    group: "Account & Privacy",
    items: [
      {
        question: "Do I need an account to use sportivox?",
        answer:
          "No account is required to browse scores, fixtures, standings, or news.",
      },
      {
        question: "What information does sportivox collect about me?",
        answer:
          "We keep data collection to a minimum — mainly whatever you send us directly through the Contact form, plus standard technical logs from our hosting provider. See our Privacy Policy for the full picture.",
      },
    ],
  },
];

export default function FaqPage() {
  const schema = faqSchema(
    FAQ_GROUPS.flatMap((group) => group.items)
  );

  return (
    <div className="pt-24 pb-16">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <Breadcrumbs items={[{ label: "FAQ" }]} />

        {/* Hero */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 badge-primary mb-6">
            <HelpCircle className="w-3.5 h-3.5" />
            FAQ
          </div>
          <h1 className="text-4xl sm:text-5xl font-black text-white mb-5 leading-tight">
            Frequently asked{" "}
            <span className="text-gradient-primary">questions</span>
          </h1>
          <p className="text-lg text-muted leading-relaxed">
            Can&apos;t find what you&apos;re looking for?{" "}
            <Link href="/contact">Get in touch</Link>{" "}and we&apos;ll help.
          </p>
        </div>

        {/* Groups */}
        <div className="space-y-10">
          {FAQ_GROUPS.map(({ group, items }) => (
            <section key={group}>
              <h2 className="text-lg font-bold text-white mb-4">{group}</h2>
              <div className="space-y-3">
                {items.map(({ question, answer }) => (
                  <details
                    key={question}
                    className="group bg-surface rounded-2xl border border-border overflow-hidden [&_summary::-webkit-details-marker]:hidden"
                  >
                    <summary className="flex items-center justify-between gap-3 p-5 cursor-pointer text-sm font-semibold text-white list-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-inset">
                      {question}
                      <ChevronDown
                        className="w-4 h-4 text-muted flex-shrink-0 transition-transform duration-200 group-open:rotate-180"
                        aria-hidden="true"
                      />
                    </summary>
                    <p className="px-5 pb-5 text-sm text-muted leading-relaxed">
                      {answer}
                    </p>
                  </details>
                ))}
              </div>
            </section>
          ))}
        </div>
      </div>
    </div>
  );
}
