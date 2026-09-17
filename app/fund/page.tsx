"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";

export default function FundPage() {
  const [formStatus, setFormStatus] = useState<
    "idle" | "submitting" | "success" | "error"
  >("idle");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormStatus("submitting");

    const form = e.currentTarget;
    const formData = new FormData(form);

    try {
      const response = await fetch("/__forms.html", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams(formData as any).toString(),
      });

      if (response.ok) {
        setFormStatus("success");
        form.reset();
      } else {
        setFormStatus("error");
      }
    } catch (error) {
      setFormStatus("error");
    }
  };

  if (formStatus === "success") {
    return (
      <div className="min-h-screen bg-gradient-to-b from-grass to-grass-dark flex items-center justify-center p-4 py-20">
        <div className="max-w-2xl w-full bg-white rounded-lg shadow-lg p-8 md:p-12 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-grass mb-4">
            Thank you!
          </h1>
          <p className="text-xl text-earth-dark mb-6">
            Your scholarship request for{" "}
            <span className="font-bold">// touch grass</span> is in. Thank you
            for telling us your story — we want this week to be open to
            everyone who belongs in it.
          </p>

          <div className="bg-grass/5 border border-grass/20 rounded-lg p-6 text-left mb-8">
            <p className="text-sm font-semibold text-earth uppercase tracking-wide mb-3">
              What happens next
            </p>
            <ul className="space-y-3 text-earth-dark">
              <li>
                We read every request ourselves and weigh it alongside the
                funding we have available.
              </li>
              <li>
                We'll email you once we've reviewed it. If we can support you,
                we'll send a payment link for your contribution — your spot is
                confirmed once that's complete.
              </li>
              <li>
                Questions in the meantime? Write to us at{" "}
                <a
                  href="mailto:brb@touchgrass.how"
                  className="underline underline-offset-2 hover:text-grass transition-colors"
                >
                  brb@touchgrass.how
                </a>
                .
              </li>
            </ul>
          </div>

          <Button
            size="lg"
            className="bg-grass text-white hover:bg-grass-dark text-lg px-8 py-6 h-auto font-semibold"
            asChild
          >
            <a href="/">Return to Home</a>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-grass to-grass-dark py-20 px-4">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-4">
            scholarships for{" "}
            <span className="md:hidden">
              <br />
            </span>{" "}
            <span className="font-bold">// touch grass</span>
          </h1>
          <p className="text-xl text-white/90">
            October 18-25, 2026 • Traditional Dream Factory
            <br />
            Alentejo, Portugal
          </p>
          <p className="text-lg text-white/75 mt-4 max-w-xl mx-auto">
            Cost shouldn't be the reason you stay home. If the full price is out
            of reach, tell us what you can put in and why you want to be there.
          </p>
        </div>

        <div className="bg-white rounded-lg shadow-xl p-6 md:p-10">
          <form
            name="scholarship"
            method="POST"
            onSubmit={handleSubmit}
            className="space-y-6"
          >
            <input type="hidden" name="form-name" value="scholarship" />

            {/* Name */}
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-semibold text-earth mb-2"
              >
                Name <span className="text-destructive">*</span>
              </label>
              <input
                type="text"
                id="name"
                name="name"
                required
                disabled={formStatus === "submitting"}
                className="w-full px-4 py-3 rounded-lg border border-border bg-white text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-grass disabled:opacity-50"
                placeholder="Your full name"
              />
            </div>

            {/* Email */}
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-semibold text-earth mb-2"
              >
                Email <span className="text-destructive">*</span>
                <span className="block text-xs font-normal text-muted-foreground mt-1">
                  So we can get back to you.
                </span>
              </label>
              <input
                type="email"
                id="email"
                name="email"
                required
                disabled={formStatus === "submitting"}
                className="w-full px-4 py-3 rounded-lg border border-border bg-white text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-grass disabled:opacity-50"
                placeholder="your@email.com"
              />
            </div>

            {/* Financial contribution */}
            <div>
              <label
                htmlFor="contribution"
                className="block text-sm font-semibold text-earth mb-2"
              >
                How much can you contribute?{" "}
                <span className="text-destructive">*</span>
                <span className="block text-xs font-normal text-muted-foreground mt-1">
                  The full cost is €550–€1200 depending on accommodation. Any
                  amount is okay, including €0 — please be honest so the fund
                  reaches as many people as possible.
                </span>
              </label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground">
                  €
                </span>
                <input
                  type="number"
                  id="contribution"
                  name="contribution"
                  required
                  min={0}
                  step={1}
                  inputMode="numeric"
                  disabled={formStatus === "submitting"}
                  className="w-full pl-9 pr-4 py-3 rounded-lg border border-border bg-white text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-grass disabled:opacity-50"
                  placeholder="0"
                />
              </div>
            </div>

            {/* Why attend */}
            <div>
              <label
                htmlFor="why-attend"
                className="block text-sm font-semibold text-earth mb-2"
              >
                Why do you want to attend?{" "}
                <span className="text-destructive">*</span>
              </label>
              <textarea
                id="why-attend"
                name="why-attend"
                rows={6}
                required
                disabled={formStatus === "submitting"}
                className="w-full px-4 py-3 rounded-lg border border-border bg-white text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-grass disabled:opacity-50"
                placeholder="What you're working on, what you hope to take home, and what you'd bring to the group"
              />
            </div>

            <p className="text-sm text-muted-foreground">
              Scholarship requests are reviewed alongside the main application.
              If you haven't yet,{" "}
              <a
                href="/rsvp"
                className="underline underline-offset-2 hover:text-grass transition-colors"
              >
                apply to attend
              </a>{" "}
              as well.
            </p>

            {/* Error Message */}
            {formStatus === "error" && (
              <div className="bg-destructive/10 border border-destructive text-destructive px-4 py-3 rounded-lg">
                Oops! Something went wrong. Please try again or contact us
                directly.
              </div>
            )}

            {/* Submit Button */}
            <div className="pt-4">
              <Button
                type="submit"
                size="lg"
                disabled={formStatus === "submitting"}
                className="w-full bg-grass text-white hover:bg-grass-dark text-lg px-8 py-6 h-auto font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {formStatus === "submitting"
                  ? "Submitting..."
                  : "Submit scholarship request"}
              </Button>
            </div>
          </form>
        </div>

        <div className="text-center mt-8">
          <a href="/" className="text-white hover:text-white/80 underline">
            ← Back to home
          </a>
        </div>
      </div>
    </div>
  );
}
