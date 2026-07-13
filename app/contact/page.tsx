import type { Metadata } from "next";
import { Mail, MessageSquare, Clock, MapPin } from "lucide-react";
import ContactForm from "@/components/sections/ContactForm";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Contact",
  description:
    "Get in touch with the GoalPulse team — questions, feedback, partnerships, or support.",
  path: "/contact",
});

const CONTACT_CARDS = [
  {
    icon: Mail,
    color: "#00C8FF",
    title: "Email",
    lines: ["hello@goalpulse.app"],
  },
  {
    icon: Clock,
    color: "#22C55E",
    title: "Response Time",
    lines: ["Within 1–2 business days"],
  },
  {
    icon: MapPin,
    color: "#A855F7",
    title: "Coverage",
    lines: ["Serving sports fans worldwide"],
  },
];

export default function ContactPage() {
  return (
    <div className="pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 badge-primary mb-6">
            <MessageSquare className="w-3.5 h-3.5" />
            Contact Us
          </div>
          <h1 className="text-4xl sm:text-5xl font-black text-white mb-5 leading-tight">
            We&apos;d love to{" "}
            <span className="text-gradient-primary">hear from you</span>
          </h1>
          <p className="text-lg text-muted leading-relaxed">
            Questions about scores or data, feedback on the app, or a
            partnership idea — send us a message and we&apos;ll get back to
            you.
          </p>
        </div>

        {/* Contact Info Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mb-12 max-w-3xl mx-auto">
          {CONTACT_CARDS.map(({ icon: Icon, color, title, lines }) => (
            <div
              key={title}
              className="bg-surface rounded-2xl border border-border p-5 text-center"
            >
              <div
                className="w-11 h-11 rounded-xl flex items-center justify-center mb-4 mx-auto"
                style={{ background: `${color}15`, border: `1px solid ${color}25` }}
              >
                <Icon className="w-5 h-5" style={{ color }} />
              </div>
              <h3 className="text-white font-semibold text-sm mb-1.5">
                {title}
              </h3>
              {lines.map((line) => (
                <p key={line} className="text-muted text-xs leading-relaxed">
                  {line}
                </p>
              ))}
            </div>
          ))}
        </div>

        {/* Form */}
        <div className="max-w-2xl mx-auto">
          <div className="bg-surface rounded-2xl border border-border p-6 sm:p-8">
            <h2 className="text-xl font-bold text-white mb-1.5">
              Send a message
            </h2>
            <p className="text-muted text-sm mb-6">
              Fill out the form below — it opens your email client with
              everything prefilled so you can review and send.
            </p>
            <ContactForm />
          </div>
        </div>
      </div>
    </div>
  );
}
