"use client";

import { useState, type FormEvent } from "react";
import { Send, CheckCircle2 } from "lucide-react";

const CONTACT_EMAIL = "hello@goalpulse.app";

const SUBJECTS = [
  "General question",
  "Report a data issue",
  "Feature request",
  "Partnership",
  "Other",
];

export default function ContactForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState(SUBJECTS[0]);
  const [message, setMessage] = useState("");
  const [sent, setSent] = useState(false);

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const body = `Name: ${name}\nEmail: ${email}\n\n${message}`;
    const mailtoUrl = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(
      `[GoalPulse] ${subject}`
    )}&body=${encodeURIComponent(body)}`;

    window.location.href = mailtoUrl;
    setSent(true);
  }

  if (sent) {
    return (
      <div className="text-center py-8">
        <CheckCircle2 className="w-10 h-10 text-secondary mx-auto mb-4" />
        <h3 className="text-white font-semibold mb-2">
          Your email client should be opening
        </h3>
        <p className="text-muted text-sm mb-5">
          If nothing happened, email us directly at{" "}
          <a
            href={`mailto:${CONTACT_EMAIL}`}
            className="text-primary hover:underline"
          >
            {CONTACT_EMAIL}
          </a>
          .
        </p>
        <button onClick={() => setSent(false)} className="btn-ghost text-sm">
          Send another message
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label
            htmlFor="name"
            className="block text-xs font-medium text-muted mb-1.5"
          >
            Your name
          </label>
          <input
            id="name"
            type="text"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Jamie Rivera"
            className="w-full px-3.5 py-2.5 bg-surface-alt border border-border rounded-xl text-sm text-white placeholder-muted focus:outline-none focus:border-primary transition-colors"
          />
        </div>
        <div>
          <label
            htmlFor="email"
            className="block text-xs font-medium text-muted mb-1.5"
          >
            Your email
          </label>
          <input
            id="email"
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="jamie@example.com"
            className="w-full px-3.5 py-2.5 bg-surface-alt border border-border rounded-xl text-sm text-white placeholder-muted focus:outline-none focus:border-primary transition-colors"
          />
        </div>
      </div>

      <div>
        <label
          htmlFor="subject"
          className="block text-xs font-medium text-muted mb-1.5"
        >
          Subject
        </label>
        <select
          id="subject"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          className="w-full px-3.5 py-2.5 bg-surface-alt border border-border rounded-xl text-sm text-white focus:outline-none focus:border-primary transition-colors"
        >
          {SUBJECTS.map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label
          htmlFor="message"
          className="block text-xs font-medium text-muted mb-1.5"
        >
          Message
        </label>
        <textarea
          id="message"
          required
          rows={5}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="How can we help?"
          className="w-full px-3.5 py-2.5 bg-surface-alt border border-border rounded-xl text-sm text-white placeholder-muted focus:outline-none focus:border-primary transition-colors resize-none"
        />
      </div>

      <button type="submit" className="btn-primary w-full sm:w-auto justify-center">
        <Send className="w-4 h-4" />
        Send Message
      </button>
    </form>
  );
}
