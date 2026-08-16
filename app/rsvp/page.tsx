"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";

const PAYMENT_URLS: Record<string, string> = {
  "bring-your-own-tent": "https://buy.stripe.com/eVq00lfr7df9d5R9Pvebu01",
  "shared-tent-camping": "https://buy.stripe.com/cNi6oJa6N1wrgi31iZebu00",
  "private-tent-single": "https://buy.stripe.com/cNi8wR5Qx5MH4zlf9Pebu02",
  "private-tent-double": "https://buy.stripe.com/bJe9AVdiZejdfdZd1Hebu03",
};

export default function RSVPPage() {
  const [formStatus, setFormStatus] = useState<
    "idle" | "submitting" | "success" | "error"
  >("idle");
  const [paymentUrl, setPaymentUrl] = useState<string | null>(null);
  const [selectedAccommodation, setSelectedAccommodation] = useState("");

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
        const accommodation = formData.get("accommodation");
        const url =
          typeof accommodation === "string"
            ? PAYMENT_URLS[accommodation]
            : undefined;

        setPaymentUrl(url ?? null);
        setFormStatus("success");
        form.reset();
        setSelectedAccommodation("");

        if (url) {
          window.location.href = url;
        }
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
            {paymentUrl
              ? "Your responses have been received. Taking you to payment now — your spot is confirmed once payment is complete."
              : "Your responses have been received. We'll be in touch soon with payment details."}
          </p>
          <Button
            size="lg"
            className="bg-grass text-white hover:bg-grass-dark text-lg px-8 py-6 h-auto font-semibold"
            asChild
          >
            {paymentUrl ? (
              <a href={paymentUrl}>Continue to payment</a>
            ) : (
              <a href="/">Return to Home</a>
            )}
          </Button>
          {paymentUrl && (
            <p className="text-sm text-muted-foreground mt-4">
              Not redirected automatically? Use the button above.
            </p>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-grass to-grass-dark py-20 px-4">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-4">
            register for{" "}
            <span className="md:hidden">
              <br />
            </span>{" "}
            <span className="font-bold">// touch grass</span>
          </h1>
          <p className="text-xl text-white/90">
            October 18-25, 2026 •{" "}
            <a
              href="https://www.traditionaldreamfactory.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="underline underline-offset-2 decoration-white/50 hover:text-white transition-colors"
            >
              Traditional Dream Factory
            </a>{" "}
            <br />{" "}
            <a
              href="https://www.google.com/maps/place/Traditional+Dream+Factory/@38.0025485,-8.5638367,15.13z/data=!4m6!3m5!1s0xd1bb5a9aebf4183:0x70f027ce7d295aae!8m2!3d38.0030065!4d-8.5590876!16s%2Fg%2F11r36h93f4"
              target="_blank"
              rel="noopener noreferrer"
              className="underline underline-offset-2 decoration-white/50 hover:text-white transition-colors"
            >
              Alentejo, Portugal
            </a>
          </p>
          <p className="text-lg text-white/75 mt-4 max-w-xl mx-auto">
            A week of hands-on practice with the tools—social and software—that
            land-based communities run on.
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
                  All meals and programming are included. Cost is determined by
                  chosen accommodation.
                </span>
              </label>
              <div className="space-y-3">
                <label className="flex items-start gap-3 cursor-pointer">
                  <input
                    type="radio"
                    name="accommodation"
                    value="bring-your-own-tent"
                    required
                    onChange={(e) => setSelectedAccommodation(e.target.value)}
                    disabled={formStatus === "submitting"}
                    className="mt-1 w-4 h-4 text-grass border-border focus:ring-grass focus:ring-2"
                  />
                  <span className="text-earth-dark">
                    Bring your own tent — €500
                  </span>
                </label>
                <label className="flex items-start gap-3 cursor-pointer">
                  <input
                    type="radio"
                    name="accommodation"
                    value="shared-tent-camping"
                    required
                    onChange={(e) => setSelectedAccommodation(e.target.value)}
                    disabled={formStatus === "submitting"}
                    className="mt-1 w-4 h-4 text-grass border-border focus:ring-grass focus:ring-2"
                  />
                  <span className="text-earth-dark">
                    Shared tent camping (3 people per tent) — €500
                  </span>
                </label>
                <label className="flex items-start gap-3 cursor-pointer">
                  <input
                    type="radio"
                    name="accommodation"
                    value="private-tent-single"
                    required
                    onChange={(e) => setSelectedAccommodation(e.target.value)}
                    disabled={formStatus === "submitting"}
                    className="mt-1 w-4 h-4 text-grass border-border focus:ring-grass focus:ring-2"
                  />
                  <span className="text-earth-dark">
                    Private tent camping, single — €750
                  </span>
                </label>
                <label className="flex items-start gap-3 cursor-pointer">
                  <input
                    type="radio"
                    name="accommodation"
                    value="private-tent-double"
                    required
                    onChange={(e) => setSelectedAccommodation(e.target.value)}
                    disabled={formStatus === "submitting"}
                    className="mt-1 w-4 h-4 text-grass border-border focus:ring-grass focus:ring-2"
                  />
                  <span className="text-earth-dark">
                    Private tent camping, double — €1200
                  </span>
                </label>
              </div>
            </div>

            {/* Tent Gender Preference — only relevant when sharing a tent */}
            {selectedAccommodation === "shared-tent-camping" && (
              <div>
                <label className="block text-sm font-semibold text-earth mb-3">
                  Tent gender preference{" "}
                  <span className="text-destructive">*</span>
                  <span className="block text-xs font-normal text-muted-foreground mt-1">
                    You'll be sharing with two others. We'll do our best to
                    accommodate, but can't guarantee it.
                  </span>
                </label>
                <div className="space-y-3">
                  <label className="flex items-start gap-3 cursor-pointer">
                    <input
                      type="radio"
                      name="tent-gender-preference"
                      value="male"
                      required
                      disabled={formStatus === "submitting"}
                      className="mt-1 w-4 h-4 text-grass border-border focus:ring-grass focus:ring-2"
                    />
                    <span className="text-earth-dark">Male</span>
                  </label>
                  <label className="flex items-start gap-3 cursor-pointer">
                    <input
                      type="radio"
                      name="tent-gender-preference"
                      value="female"
                      required
                      disabled={formStatus === "submitting"}
                      className="mt-1 w-4 h-4 text-grass border-border focus:ring-grass focus:ring-2"
                    />
                    <span className="text-earth-dark">Female</span>
                  </label>
                  <label className="flex items-start gap-3 cursor-pointer">
                    <input
                      type="radio"
                      name="tent-gender-preference"
                      value="no-preference"
                      required
                      disabled={formStatus === "submitting"}
                      className="mt-1 w-4 h-4 text-grass border-border focus:ring-grass focus:ring-2"
                    />
                    <span className="text-earth-dark">No preference</span>
                  </label>
                </div>
              </div>
            )}

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
                What are some projects/communities you're involved in?
              </label>
              <textarea
                id="web3-projects"
                name="web3-projects"
                rows={4}
                disabled={formStatus === "submitting"}
                className="w-full px-4 py-3 rounded-lg border border-border bg-white text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-grass disabled:opacity-50"
                placeholder="Tell us what you're up to"
              />
            </div>

            {/* What you'd build */}
            <div>
              <label
                htmlFor="build-focus"
                className="block text-sm font-semibold text-earth mb-2"
              >
                What are you most curious to try?
                <span className="block text-xs font-normal text-muted-foreground mt-1">
                  Governance, treasuries, rosters and coordination tools, land
                  and legal structures, facilitation, food systems, or something
                  we haven't thought of. Tell us what you'd bring, too.
                </span>
              </label>
              <textarea
                id="build-focus"
                name="build-focus"
                rows={4}
                disabled={formStatus === "submitting"}
                className="w-full px-4 py-3 rounded-lg border border-border bg-white text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-grass disabled:opacity-50"
                placeholder="What you'd like to get your hands on, and the skills you're bringing"
              />
            </div>

            {/* Hopes for Event */}
            <div>
              <label
                htmlFor="hopes"
                className="block text-sm font-semibold text-earth mb-2"
              >
                What do you hope for at{" "}
                <span className="font-bold">// touch grass</span>?
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

            {/* Anything else */}
            <div>
              <label
                htmlFor="anything-else"
                className="block text-sm font-semibold text-earth mb-2"
              >
                Any questions/comments?
              </label>
              <textarea
                id="anything-else"
                name="anything-else"
                rows={4}
                disabled={formStatus === "submitting"}
                className="w-full px-4 py-3 rounded-lg border border-border bg-white text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-grass disabled:opacity-50"
                placeholder="Share anything else..."
              />
            </div>

            <div>
              <p>
                Once you submit this form, your responses will be reviewed by
                the event team. We are doing our best to accommodate everyone
                who is interested, but space is limited so we can only confirm
                your attendance once payment has been made.
              </p>
              <br />
              <p className="font-bold">
                Total cost ranges from €500-€1200 depending on your selected
                accommodation. After you submit, you'll be taken straight to
                payment.
              </p>
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
