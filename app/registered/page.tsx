import type { Metadata } from "next";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "You're registered — // touch grass",
  description:
    "Your registration for // touch grass is confirmed. October 18-25, 2026 at Traditional Dream Factory, Alentejo, Portugal.",
  robots: { index: false, follow: false },
};

export default function RegisteredPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-grass to-grass-dark flex items-center justify-center p-4 py-20">
      <div className="max-w-2xl w-full bg-white rounded-lg shadow-lg p-8 md:p-12 text-center">
        <h1 className="text-4xl md:text-5xl font-bold text-grass mb-4">
          You're in!
        </h1>
        <p className="text-xl text-earth-dark mb-8">
          Your payment went through and your spot at{" "}
          <span className="font-bold">// touch grass</span> is confirmed. A
          receipt is on its way to your inbox from Stripe.
        </p>

        <div className="bg-grass/5 border border-grass/20 rounded-lg p-6 text-left mb-8">
          <p className="text-sm font-semibold text-earth uppercase tracking-wide mb-3">
            What's next
          </p>
          <ul className="space-y-3 text-earth-dark">
            <li>
              We'll email you ahead of the event with travel details, what to
              pack, and how to get to the farm.
            </li>
            <li>
              <span className="font-semibold">October 18-25, 2026</span> at{" "}
              <a
                href="https://www.traditionaldreamfactory.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="underline underline-offset-2 hover:text-grass transition-colors"
              >
                Traditional Dream Factory
              </a>
              , Alentejo, Portugal.
            </li>
            <li>
              Questions, or something changed? Email us at{" "}
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
