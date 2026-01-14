"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export default function TouchGrassPage() {
  const [scrollY, setScrollY] = useState(0);
  const [hasScrolledPast, setHasScrolledPast] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [formStatus, setFormStatus] = useState<
    "idle" | "submitting" | "success" | "error"
  >("idle");

  useEffect(() => {
    setMounted(true);

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setScrollY(currentScrollY);

      // Mark as scrolled past when user scrolls beyond viewport height
      if (currentScrollY > window.innerHeight * 1.2) {
        setHasScrolledPast(true);
      }
    };

    // Set initial scroll position
    handleScroll();

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handTop =
    mounted && typeof window !== "undefined"
      ? Math.min(
          window.innerHeight * 0.15 + scrollY * 0.2,
          window.innerHeight * 1.1
        )
      : 0;
  const textOpacity = Math.max(1 - scrollY / 300, 0);
  const textTranslateY = -scrollY * 0.5; // Text moves up as user scrolls down
  const overlayOpacity = 1;

  const showOverlay =
    mounted && typeof window !== "undefined"
      ? scrollY < window.innerHeight * 1.5
      : true;

  const handleNewsletterSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
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

  return (
    <div className="relative">
      {/* Opening Animation Overlay */}
      <div
        className="fixed inset-0 z-30 pointer-events-none"
        style={{
          opacity: overlayOpacity,
          visibility: showOverlay ? "visible" : "hidden",
        }}
      >
        {/* Grass Background */}
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: "url(/images/grass.jpg)",
          }}
        />

        <div
          className="absolute left-1/2 w-30 md:w-35"
          style={{
            top: mounted ? `${handTop}px` : "15vh",
            transform: `translateX(-50%) rotate(180deg)`,
          }}
        >
          <img
            src="/images/handpointup.png"
            alt=""
            className="w-full h-auto drop-shadow-lg"
          />
        </div>

        {/* Title Text */}
        <div
          className="absolute top-8 left-1/2 text-center text-foreground"
          style={{
            opacity: textOpacity,
            transform: `translateX(-50%) translateY(${textTranslateY}px)`,
          }}
        >
          <h1 className="text-4xl md:text-6xl font-bold whitespace-nowrap">
            ((touch grass))
          </h1>
          <p className="whitespace-nowrap">mar 26-29, 2026</p>
        </div>
      </div>

      {/* Spacer to enable scrolling */}
      <div className="h-[150vh]" />

      {/* Actual Landing Page Content */}
      <main className="relative z-40 min-h-screen bg-gradient-to-b from-grass to-grass-dark">
        {/* Hero Section */}
        <section className="py-20 md:py-32 relative">
          {/* Moss texture overlay */}
          <div
            className="absolute inset-0 bg-cover bg-center opacity-20 pointer-events-none"
            style={{
              backgroundImage: "url(/images/moss.jpg)",
              mixBlendMode: "multiply",
            }}
          />
          <div className="container mx-auto px-4 text-center relative z-10">
            <div className="max-w-4xl mx-auto space-y-8">
              <h1 className="text-5xl md:text-7xl font-bold text-white text-balance">
                ghost the group chat.
              </h1>
              <p className="text-xl md:text-2xl text-white/90 text-pretty leading-relaxed">
                ((touch grass)) offers web3 builders a real-world setting to
                explore applied regenerative web3—together, on a community farm
                and forest in the pacific northwest.
              </p>
              <Button
                size="lg"
                className="bg-white text-grass hover:bg-white/90 text-lg px-8 py-6 h-auto font-semibold"
                asChild
              >
                <a href="/rsvp">Apply to attend</a>
              </Button>
            </div>
          </div>
        </section>

        {/* Event Details Section */}
        <section className="bg-sand py-20 md:py-32">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto space-y-12">
              <div className="text-center space-y-4">
                <h2 className="text-4xl md:text-5xl font-bold text-earth">
                  event details
                </h2>
                <div className="w-20 h-1 bg-grass mx-auto" />
              </div>

              {/* 2 Column Layout */}
              <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
                {/* Left Column - Logistics */}
                <div className="space-y-6">
                  <div className="bg-white p-8 rounded-lg shadow-sm">
                    <h3 className="text-2xl font-semibold text-earth mb-6">
                      Logistics
                    </h3>
                    <ul className="space-y-4 text-earth-dark">
                      <li className="flex items-start gap-3">
                        <span className="text-grass font-bold text-xl">📅</span>
                        <div>
                          <span className="font-semibold">Dates:</span>
                          <br />
                          March 26-29, 2026
                        </div>
                      </li>
                      <li className="flex items-start gap-3">
                        <span className="text-grass font-bold text-xl">📍</span>
                        <div>
                          <span className="font-semibold">Location:</span>
                          <br />
                          Elkenmist Farm & Retreat Center
                          <br />
                          <span className="text-sm text-muted-foreground">
                            Private address. Skamokawa, WA 98647
                          </span>
                        </div>
                      </li>
                      <li className="flex items-start gap-3">
                        <span className="text-grass font-bold text-xl">🍛</span>
                        <div>
                          <span className="font-semibold">Meals:</span>
                          <br />3 farm-fresh meals included daily
                        </div>
                      </li>
                      <li className="flex items-start gap-3">
                        <span className="text-grass font-bold text-xl">💰</span>
                        <div>
                          <span className="font-semibold">Cost:</span>
                          <br />
                          $300-400 per person
                          <br />
                          <span className="text-sm text-muted-foreground">
                            (includes meals & accommodations)
                          </span>
                        </div>
                      </li>
                      <li className="flex items-start gap-3">
                        <span className="text-grass font-bold text-xl">👥</span>
                        <div>
                          <span className="font-semibold">Capacity:</span>
                          <br />
                          Limited to 30 participants
                        </div>
                      </li>
                      <li className="flex items-start gap-3">
                        <span className="text-grass font-bold text-xl">🎒</span>
                        <div>
                          <span className="font-semibold">What to Bring:</span>
                          <br />
                          Sturdy shoes, rain jacket, water bottle, hat
                        </div>
                      </li>
                    </ul>
                  </div>
                </div>

                {/* Right Column - Photos */}
                <div className="space-y-4">
                  <div className="bg-gray-300 rounded-lg overflow-hidden aspect-[4/3]">
                    <img
                      src="/images/camp-elkenmist.jpg"
                      alt="Event photo 1"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-gray-300 rounded-lg overflow-hidden aspect-square">
                      <img
                        src="/images/house-elkenmist.jpg"
                        alt="Event photo 2"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="bg-gray-300 rounded-lg overflow-hidden aspect-square">
                      <img
                        src="/images/sheep-hello.jpg"
                        alt="Event photo 3"
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Web3 Builders Section */}
        <section className="bg-grass py-20 md:py-32 relative overflow-hidden">
          {/* Moss texture overlay */}
          <div
            className="absolute inset-0 bg-cover bg-center opacity-20 pointer-events-none"
            style={{
              backgroundImage: "url(/images/moss.jpg)",
              mixBlendMode: "multiply",
            }}
          />
          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-6xl mx-auto">
              <div className="grid md:grid-cols-2 gap-8 lg:gap-12 items-center">
                {/* Left Column - Copy */}
                <div className="space-y-6 text-white order-2 md:order-1">
                  <h3 className="text-3xl md:text-4xl font-bold">
                    build on the blockchain. build for the land.
                  </h3>
                  <p className="text-lg md:text-xl leading-relaxed">
                    <span className="font-bold">((touch grass))</span> is an
                    invitation to web3 builders determined to apply blockchain
                    solutions to real world problems. As the spirit of localism
                    and regeneration finds roots in web3, it's now more
                    important than ever that we convene, collaborate, and build
                    with each other.
                  </p>

                  <p className="text-base md:text-xl leading-relaxed">
                    With accommodations offered in a group house on over
                    120-acres in the forests of the Pacific Northwest, you will
                    join with others over shared meals, dev talks, forest walks,
                    and farm workshops.
                  </p>
                  <p className="text-base md:text-xl leading-relaxed">
                    <span className="font-bold">((touch grass))</span> is a
                    unique offering that roots blockchain innovation in a real,
                    land-based context.
                  </p>
                </div>

                {/* Right Column - Image */}
                <div className="order-1 md:order-2">
                  <div className="bg-gray-300 rounded-lg overflow-hidden aspect-[5/6]">
                    <img
                      src="/images/horse_human_mist.jpg"
                      alt="Pacific Northwest farm"
                      className="w-full h-full object-top object-cover"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Who Should Come Section */}
        <section className="py-20 md:py-32 bg-sand">
          <div className="container mx-auto px-4 md:px-8">
            <div className="max-w-3xl mx-auto text-center">
              <div className="text-center space-y-4 mb-8">
                <h2 className="text-4xl md:text-5xl font-bold text-earth">
                  who should come{" "}
                </h2>
                <div className="w-20 h-1 bg-grass mx-auto" />
              </div>
              <div className="space-y-6 text-lg leading-relaxed text-earth-dark">
                <p>
                  You're building in crypto/web3. Not just for the money —
                  though that's fine too — but because you think this technology
                  can actually help people organize, coordinate, and create
                  regenerative value together.
                </p>
                <p>
                  You're curious about what happens when you step away from the
                  screen. You want to meet other builders who care about
                  community, sustainability, and making things that last.
                </p>
                <p className="font-medium">
                  You're ready to trade Discord for dirt under your fingernails.
                  At least for a few days.
                </p>
              </div>
              <div className="mt-8">
                <Button
                  size="lg"
                  className="bg-grass text-white hover:bg-grass-dark text-lg px-8 py-6 h-auto font-semibold"
                  asChild
                >
                  <a href="/rsvp">Apply to attend</a>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="bg-grass py-20 md:py-32 relative overflow-hidden">
          {/* Moss texture overlay */}
          <div
            className="absolute inset-0 bg-cover bg-center opacity-20 pointer-events-none"
            style={{
              backgroundImage: "url(/images/moss.jpg)",
              mixBlendMode: "multiply",
            }}
          />
          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-3xl mx-auto space-y-8">
              <div className="text-center space-y-4">
                <h2 className="text-4xl md:text-5xl font-bold text-white">
                  things you might want to know
                </h2>
                <div className="w-20 h-1 bg-white/80 mx-auto" />
              </div>

              <div className="bg-white/95 rounded-lg shadow-sm p-6 md:p-8">
                <Accordion type="single" collapsible className="w-full">
                  <AccordionItem value="item-1">
                    <AccordionTrigger className="text-lg font-semibold">
                      What's included?
                    </AccordionTrigger>
                    <AccordionContent className="text-muted-foreground leading-relaxed">
                      Each ticket is all-inclusive, covering accommodations,
                      meals, and programming. You can also choose to stay
                      offsite in your own accommodations. The only additional
                      fee is optional for transport to/from the venue.
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="item-2">
                    <AccordionTrigger className="text-lg font-semibold">
                      How do I get there?
                    </AccordionTrigger>
                    <AccordionContent className="text-muted-foreground leading-relaxed">
                      The exact venue address will be provided upon
                      registration. The nearest airport is Portland
                      International (PDX, 1.5 hour drive). The nearest train
                      station is Amtrak's Kelso station (45 min drive). From
                      there you can arrange paid transport with our team, or
                      coordinate a rideshare with other attendees.
                      <br /> <br />
                      Note: Uber and Lyft are not available out here!
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="item-3">
                    <AccordionTrigger className="text-lg font-semibold">
                      Can I stay longer?
                    </AccordionTrigger>
                    <AccordionContent className="text-muted-foreground leading-relaxed">
                      Yes, you can stay longer! We'll provide a daily pricing
                      option for anyone who wants a longer visit into community
                      living at Elkenmist.
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="item-4">
                    <AccordionTrigger className="text-lg font-semibold">
                      Can I sponsor this event?
                    </AccordionTrigger>
                    <AccordionContent className="text-muted-foreground leading-relaxed">
                      ((touch grass)) is primarily a community-focused event, so
                      there won't be any dedicated spaces for sponsors.
                      Nonetheless, if you or your team want to support this
                      event, send us a note at hello@touchgrass.how and we'll be
                      happy to discuss options.
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="item-5">
                    <AccordionTrigger className="text-lg font-semibold">
                      Why is this happening?
                    </AccordionTrigger>
                    <AccordionContent className="text-muted-foreground leading-relaxed">
                      ((touch grass)) might have started as a joke between Sara
                      Bajor and Ron Turetzky, but it's now a real event. We
                      noticed how much enthusiasm exists in the web3 community
                      for building blockchain technology that can actually help
                      people organize, coordinate, and create value together. So
                      we created ((touch grass)) to be a space where such
                      builders can meet each other and collaborate.
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </div>
            </div>
          </div>
        </section>

        {/* Final CTA Section */}
        <section className="bg-sand py-20 md:py-32">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <div className="grid md:grid-cols-2 gap-8 lg:gap-12 items-center">
                {/* Left Column - Email Form */}
                <div className="space-y-4">
                  <div className="mb-6">
                    <h3 className="text-3xl md:text-4xl pb-2 font-bold text-earth">
                      Contact us
                    </h3>
                    <a
                      href="mailto:diy@touchgrass.how"
                      className="text-grass hover:text-grass-dark text-lg underline"
                    >
                      diy@touchgrass.how
                    </a>
                  </div>
                  <h3 className="text-3xl md:text-4xl font-bold text-earth">
                    Stay updated
                  </h3>
                  <p className="text-earth-dark text-lg">
                    Not convinced yet? We'll remind you in a week or two.
                  </p>
                  <form
                    name="newsletter"
                    method="POST"
                    data-netlify="true"
                    onSubmit={handleNewsletterSubmit}
                    className="space-y-4"
                  >
                    <input type="hidden" name="form-name" value="newsletter" />
                    <div className="flex flex-col sm:flex-row gap-3">
                      <input
                        type="email"
                        name="email"
                        placeholder="your@email.com"
                        required
                        disabled={
                          formStatus === "submitting" ||
                          formStatus === "success"
                        }
                        className="flex-1 px-4 py-3 rounded-lg border border-border bg-white text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-grass disabled:opacity-50"
                      />
                      <button
                        type="submit"
                        disabled={
                          formStatus === "submitting" ||
                          formStatus === "success"
                        }
                        className="px-6 py-3 bg-grass text-white rounded-lg font-semibold hover:bg-grass-dark transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {formStatus === "submitting"
                          ? "Subscribing..."
                          : formStatus === "success"
                          ? "Subscribed!"
                          : "Subscribe"}
                      </button>
                    </div>
                    {formStatus === "success" && (
                      <p className="text-grass font-medium">
                        Thanks for subscribing! Check your email for updates.
                      </p>
                    )}
                    {formStatus === "error" && (
                      <p className="text-destructive font-medium">
                        Oops! Something went wrong. Please try again.
                      </p>
                    )}
                  </form>
                </div>

                {/* Right Column - Apply CTA */}
                <div className="bg-grass rounded-lg p-8 md:p-10 text-white text-center space-y-6 relative overflow-hidden">
                  {/* Moss texture overlay */}
                  <div className="absolute inset-0 bg-cover bg-center opacity-20 pointer-events-none" />
                  <div className="relative z-10">
                    <h3 className="text-2xl md:text-3xl font-bold mb-4">
                      Ready to join us?
                    </h3>
                    <p className="text-white/90 mb-6 text-lg">
                      Applications are now open for ((touch grass)) 2026.
                      Limited spots available.
                    </p>
                    <Button
                      size="lg"
                      className="bg-white text-grass hover:bg-white/90 text-lg px-8 py-6 h-auto font-semibold"
                      asChild
                    >
                      <a href="/rsvp">Apply to attend</a>
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="bg-earth text-white py-12">
          <div className="container mx-auto px-4 text-center">
            <p className="text-sm opacity-80">
              © 2026 ((touch grass)) <br /> it's time to go outside.
            </p>
          </div>
        </footer>
      </main>
    </div>
  );
}
