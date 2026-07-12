"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Menu,
  X,
  Search,
  Zap,
  Radio,
  Calendar,
  BarChart2,
  Newspaper,
  Grid3X3,
  Info,
  Mail,
} from "lucide-react";
import { cn } from "@/lib/utils";

const NAV_LINKS = [
  { href: "/", label: "Home", icon: Zap },
  { href: "/live", label: "Live", icon: Radio, badge: "LIVE" },
  { href: "/fixtures", label: "Fixtures", icon: Calendar },
  { href: "/standings", label: "Standings", icon: BarChart2 },
  { href: "/sports", label: "Sports", icon: Grid3X3 },
  { href: "/news", label: "News", icon: Newspaper },
  { href: "/about", label: "About", icon: Info },
  { href: "/contact", label: "Contact", icon: Mail },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu on route change — wrapped in setTimeout to avoid
  // calling setState synchronously in the effect body.
  useEffect(() => {
    const id = setTimeout(() => setIsOpen(false), 0);
    return () => clearTimeout(id);
  }, [pathname]);

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        scrolled
          ? "glass border-b border-border"
          : "bg-transparent border-b border-transparent"
      )}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="relative w-8 h-8 flex items-center justify-center">
              <div className="absolute inset-0 bg-primary rounded-lg opacity-20 group-hover:opacity-40 transition-opacity" />
              <Zap className="w-5 h-5 text-primary relative z-10" />
            </div>
            <span className="text-lg font-bold tracking-tight">
              <span className="text-gradient-primary">Goal</span>
              <span className="text-white">Pulse</span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-1">
            {NAV_LINKS.map(({ href, label, icon: Icon, badge }) => {
              const isActive =
                href === "/" ? pathname === "/" : pathname.startsWith(href);
              return (
                <Link
                  key={href}
                  href={href}
                  className={cn(
                    "flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-sm font-medium transition-all duration-200",
                    isActive
                      ? "text-primary bg-primary-dim"
                      : "text-muted hover:text-white hover:bg-surface-alt"
                  )}
                >
                  <Icon className="w-3.5 h-3.5" />
                  {label}
                  {badge && (
                    <span className="badge-live text-[10px] px-1.5 py-0 gap-1">
                      <span className="live-dot w-1.5 h-1.5" />
                      {badge}
                    </span>
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Right Actions */}
          <div className="flex items-center gap-2">
            {/* Search */}
            <button
              onClick={() => setSearchOpen(!searchOpen)}
              className="p-2 rounded-xl text-muted hover:text-white hover:bg-surface-alt transition-all duration-200"
              aria-label="Search"
            >
              <Search className="w-4.5 h-4.5 w-[18px] h-[18px]" />
            </button>

            {/* Mobile menu toggle */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="lg:hidden p-2 rounded-xl text-muted hover:text-white hover:bg-surface-alt transition-all duration-200"
              aria-label="Toggle menu"
              aria-expanded={isOpen}
            >
              {isOpen ? (
                <X className="w-5 h-5" />
              ) : (
                <Menu className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>

        {/* Search Bar */}
        <div
          className={cn(
            "overflow-hidden transition-all duration-300",
            searchOpen ? "max-h-16 pb-3" : "max-h-0"
          )}
        >
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted" />
            <input
              type="text"
              placeholder="Search teams, leagues, players…"
              className="w-full pl-9 pr-4 py-2.5 bg-surface border border-border rounded-xl text-sm text-white placeholder-muted focus:outline-none focus:border-primary transition-colors"
              autoFocus={searchOpen}
            />
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={cn(
          "lg:hidden overflow-hidden transition-all duration-300 glass border-t border-border",
          isOpen ? "max-h-[500px]" : "max-h-0 border-t-0"
        )}
      >
        <nav className="px-4 py-3 space-y-1">
          {NAV_LINKS.map(({ href, label, icon: Icon, badge }) => {
            const isActive =
              href === "/" ? pathname === "/" : pathname.startsWith(href);
            return (
              <Link
                key={href}
                href={href}
                className={cn(
                  "flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200",
                  isActive
                    ? "text-primary bg-primary-dim"
                    : "text-muted hover:text-white hover:bg-surface-alt"
                )}
              >
                <Icon className="w-4 h-4" />
                {label}
                {badge && (
                  <span className="badge-live ml-auto">
                    <span className="live-dot" />
                    {badge}
                  </span>
                )}
              </Link>
            );
          })}
        </nav>
      </div>
    </header>
  );
}
