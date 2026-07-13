import Link from "next/link";
import { Zap } from "lucide-react";

const FOOTER_LINKS = {
  Sports: [
    { label: "Football", href: "/sports?sport=football" },
    { label: "Cricket", href: "/sports?sport=cricket" },
    { label: "Basketball", href: "/sports?sport=basketball" },
    { label: "Tennis", href: "/sports?sport=tennis" },
  ],
  Features: [
    { label: "Live Scores", href: "/live" },
    { label: "Fixtures", href: "/fixtures" },
    { label: "Standings", href: "/standings" },
    { label: "News", href: "/news" },
  ],
  Company: [
    { label: "About Us", href: "/about" },
    { label: "Contact", href: "/contact" },
    { label: "FAQ", href: "/faq" },
    { label: "Data Sources", href: "/data-sources" },
  ],
  Legal: [
    { label: "Privacy Policy", href: "/privacy" },
    { label: "Terms & Conditions", href: "/terms" },
    { label: "Cookie Policy", href: "/cookies" },
    { label: "Disclaimer", href: "/disclaimer" },
    { label: "Editorial Policy", href: "/editorial-policy" },
  ],
};

const SOCIAL_LINKS = [
  { label: "X / Twitter", href: "#", text: "𝕏" },
  { label: "Instagram", href: "#", text: "IG" },
  { label: "YouTube", href: "#", text: "YT" },
  { label: "GitHub", href: "#", text: "GH" },
];

export default function Footer() {
  return (
    <footer className="bg-surface border-t border-border mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-5 gap-8 lg:gap-10">
          {/* Brand */}
          <div className="col-span-2 sm:col-span-4 lg:col-span-1">
            <Link href="/" className="flex items-center gap-2 mb-4 group">
              <div className="relative w-8 h-8 flex items-center justify-center">
                <div className="absolute inset-0 bg-primary rounded-lg opacity-20" />
                <Zap className="w-5 h-5 text-primary relative z-10" />
              </div>
              <span className="text-lg font-bold">
                <span className="text-gradient-primary">Goal</span>
                <span className="text-white">Pulse</span>
              </span>
            </Link>
            <p className="text-muted text-sm leading-relaxed mb-5">
              Your ultimate sports hub. Live scores, fixtures, standings, and
              breaking news — all in one place.
            </p>
            <div className="flex items-center gap-3">
              {SOCIAL_LINKS.map(({ text, href, label }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="w-8 h-8 flex items-center justify-center rounded-lg bg-surface-alt border border-border text-muted hover:text-primary hover:border-primary-dim transition-all duration-200 text-xs font-bold"
                >
                  {text}
                </a>
              ))}
            </div>
          </div>

          {/* Links */}
          {Object.entries(FOOTER_LINKS).map(([title, links]) => (
            <div key={title}>
              <h3 className="text-sm font-semibold text-white mb-4">{title}</h3>
              <ul className="space-y-2.5">
                {links.map(({ label, href }) => (
                  <li key={label}>
                    <Link
                      href={href}
                      className="text-sm text-muted hover:text-primary transition-colors duration-200"
                    >
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-10 pt-6 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-muted">
            © {new Date().getFullYear()} sportivox. All rights reserved.
          </p>
          <div className="flex items-center gap-1.5 text-xs text-muted">
            <span>Data from</span>
            <a
              href="https://www.football-data.org"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:underline"
            >
              Football-Data.org
            </a>
            <span>&amp;</span>
            <a
              href="https://www.thesportsdb.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:underline"
            >
              TheSportsDB
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
