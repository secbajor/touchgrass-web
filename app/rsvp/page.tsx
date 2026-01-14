"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";

export default function RSVPPage() {
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
      <div className="min-h-screen bg-gradient-to-b from-grass to-grass-dark flex items-center justify-center p-4">
        <div className="max-w-2xl w-full bg-white rounded-lg shadow-lg p-8 md:p-12 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-grass mb-4">
            Thank you!
          </h1>
          <p className="text-xl text-earth-dark mb-6">
            Your responses have been received. We'll be in touch soon with more
            details.
          </p>
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
            apply for{" "}
            <span className="md:hidden">
              <br />
            </span>{" "}
            ((touch grass))
          </h1>
          <p className="text-xl text-white/90">
            March 26-29, 2026 • Elkenmist Farm & Retreat Center <br />{" "}
            Skamokawa, WA 98647
          </p>
        </div>

        <div className="bg-white rounded-lg shadow-xl p-6 md:p-10">
          <form
            name="rsvp"
            method="POST"
            onSubmit={handleSubmit}
            className="space-y-6"
          >
            <input type="hidden" name="form-name" value="rsvp" />

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

            {/* Signal */}
            <div>
              <label
                htmlFor="signal"
                className="block text-sm font-semibold text-earth mb-2"
              >
                Signal
              </label>
              <input
                type="text"
                id="signal"
                name="signal"
                disabled={formStatus === "submitting"}
                className="w-full px-4 py-3 rounded-lg border border-border bg-white text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-grass disabled:opacity-50"
                placeholder="Signal username or phone number"
              />
            </div>

            {/* Telegram */}
            <div>
              <label
                htmlFor="telegram"
                className="block text-sm font-semibold text-earth mb-2"
              >
                Telegram
              </label>
              <input
                type="text"
                id="telegram"
                name="telegram"
                disabled={formStatus === "submitting"}
                className="w-full px-4 py-3 rounded-lg border border-border bg-white text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-grass disabled:opacity-50"
                placeholder="@username"
              />
            </div>

            {/* Preferred Accommodation */}
            <div>
              <label className="block text-sm font-semibold text-earth mb-3">
                Preferred Accommodation{" "}
                <span className="text-destructive">*</span>
                <span className="block text-xs font-normal text-muted-foreground mt-1">
                  Select all that work for you
                </span>
              </label>
              <div className="space-y-3">
                <label className="flex items-start gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    name="accommodation"
                    value="mens-shared-room"
                    disabled={formStatus === "submitting"}
                    className="mt-1 w-4 h-4 text-grass border-border rounded focus:ring-grass focus:ring-2"
                  />
                  <span className="text-earth-dark">Men's shared room</span>
                </label>
                <label className="flex items-start gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    name="accommodation"
                    value="womens-shared-room"
                    disabled={formStatus === "submitting"}
                    className="mt-1 w-4 h-4 text-grass border-border rounded focus:ring-grass focus:ring-2"
                  />
                  <span className="text-earth-dark">Women's shared room</span>
                </label>
                <label className="flex items-start gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    name="accommodation"
                    value="camping-private-tent"
                    disabled={formStatus === "submitting"}
                    className="mt-1 w-4 h-4 text-grass border-border rounded focus:ring-grass focus:ring-2"
                  />
                  <span className="text-earth-dark">
                    Camping - private tent
                  </span>
                </label>
                <label className="flex items-start gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    name="accommodation"
                    value="camping-shared-yurt"
                    disabled={formStatus === "submitting"}
                    className="mt-1 w-4 h-4 text-grass border-border rounded focus:ring-grass focus:ring-2"
                  />
                  <span className="text-earth-dark">Camping - shared yurt</span>
                </label>
                <label className="flex items-start gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    name="accommodation"
                    value="offsite"
                    disabled={formStatus === "submitting"}
                    className="mt-1 w-4 h-4 text-grass border-border rounded focus:ring-grass focus:ring-2"
                  />
                  <span className="text-earth-dark">
                    Offsite (I will find my own accommodations)
                  </span>
                </label>
              </div>
            </div>

            {/* Extra Nights */}
            <div>
              <label
                htmlFor="extra-nights"
                className="block text-sm font-semibold text-earth mb-2"
              >
                Do you want to stay any extra nights? Indicate the dates here:
              </label>
              <textarea
                id="extra-nights"
                name="extra-nights"
                rows={3}
                disabled={formStatus === "submitting"}
                className="w-full px-4 py-3 rounded-lg border border-border bg-white text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-grass disabled:opacity-50"
                placeholder="e.g., March 25 and March 30-31"
              />
            </div>

            {/* Food Allergies */}
            <div>
              <label
                htmlFor="food-allergies"
                className="block text-sm font-semibold text-earth mb-2"
              >
                Food allergies or sensitivities
              </label>
              <textarea
                id="food-allergies"
                name="food-allergies"
                rows={3}
                disabled={formStatus === "submitting"}
                className="w-full px-4 py-3 rounded-lg border border-border bg-white text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-grass disabled:opacity-50"
                placeholder="Please list any dietary restrictions or allergies"
              />
            </div>

            {/* Web3 Projects */}
            <div>
              <label
                htmlFor="web3-projects"
                className="block text-sm font-semibold text-earth mb-2"
              >
                What are some projects/communities you're involved in within
                web3?
              </label>
              <textarea
                id="web3-projects"
                name="web3-projects"
                rows={4}
                disabled={formStatus === "submitting"}
                className="w-full px-4 py-3 rounded-lg border border-border bg-white text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-grass disabled:opacity-50"
                placeholder="Tell us about your web3 work"
              />
            </div>

            {/* Hopes for Event */}
            <div>
              <label
                htmlFor="hopes"
                className="block text-sm font-semibold text-earth mb-2"
              >
                What do you hope for at ((touch grass))?
              </label>
              <textarea
                id="hopes"
                name="hopes"
                rows={4}
                disabled={formStatus === "submitting"}
                className="w-full px-4 py-3 rounded-lg border border-border bg-white text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-grass disabled:opacity-50"
                placeholder="Share your intentions and hopes for the experience"
              />
            </div>

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
                {formStatus === "submitting" ? "Submitting..." : "Submit"}
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
