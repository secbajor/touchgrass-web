"use client";

import { useEffect, useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

type Host = {
  id: string;
  name: string;
  role: string;
  bio: string;
  /** Path under /public, e.g. "/images/host-jane.jpg". Empty shows a placeholder. */
  image: string;
};

const guestHosts: Host[] = [
  {
    id: "host-1",
    name: "Josh Glass",
    role: "Wilderness Immersion Guide",
    bio: "A facilitator and guide for Deep Nature Connection, Josh will lead our group in an immersive and practical experience of connecting to the natural landscape of Alentejo.",
    image: "/images/josh-host.avif",
  },
  {
    id: "host-2",
    name: "Tonya",
    role: "Traditional Dream Factory Host",
    bio: "Our host on the ground, Tonya knows where things are, how the site actually works, and the rhythms of TDF so we can arrive comfortably to our community-for-a-week.",
    image: "",
  },
  {
    id: "host-3",
    name: "^ These cuties",
    role: "",
    bio: 'To borrow a phrase from David Abram, we will bring into our temporary community a recognition of the "more than human" animals and plants (and spirits!?) that live at TDF.',
    image: "/images/sheep.jpg",
  },
];

export default function TouchGrassPage() {
  const [scrollY, setScrollY] = useState(0);
  const [hasScrolledPast, setHasScrolledPast] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [formStatus, setFormStatus] = useState<
    "idle" | "submitting" | "success" | "error"
  >("idle");
  const lowerButtonRef = useRef<HTMLDivElement>(null);

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
          window.innerHeight * 1.1,
        )
      : 0;
  const textOpacity = Math.max(1 - scrollY / 300, 0);
  const textTranslateY = -scrollY * 0.5; // Text moves up as user scrolls down
  const overlayOpacity = 1;

  const showOverlay =
    mounted && typeof window !== "undefined"
      ? scrollY < window.innerHeight * 1.5
      : true;

  // Calculate the gap for the lower hand pointing at the Apply button
  const lowerHandGap = (() => {
    if (!mounted || typeof window === "undefined" || !lowerButtonRef.current) {
      return 1000; // Start off-screen
    }

    const viewportHeight = window.innerHeight;
    const pageHeight = document.documentElement.scrollHeight;
    const maxScroll = pageHeight - viewportHeight;

    // Get button's current position in viewport
    const buttonRect = lowerButtonRef.current.getBoundingClientRect();
    const buttonTopAbsolute = scrollY + buttonRect.top;

    // Scroll position when button top enters viewport
    const buttonEntersScroll = buttonTopAbsolute - viewportHeight;

    // Start showing hand at the halfway point between button entering and page bottom
    const startScroll =
      buttonEntersScroll + (maxScroll - buttonEntersScroll) / 2;

    // Gap that places hand exactly at the viewport bottom
    const viewportBottomGap = viewportHeight - buttonRect.bottom;

    // Before start point: hide hand just below viewport
    if (scrollY < startScroll) {
      return viewportBottomGap + 250; // Just below viewport bottom
    }

    // Interpolate from viewport bottom to final position (10px below button)
    const progress = (scrollY - startScroll) / (maxScroll - startScroll);
    const minGap = 10;

    // At progress=0: hand at viewport bottom. At progress=1: hand at minGap.
    return viewportBottomGap * (1 - progress) + minGap * progress;
  })();

  const handleNewsletterSubmit = async (
    e: React.FormEvent<HTMLFormElement>,
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
            // touch grass
          </h1>
          <p className="whitespace-nowrap">
            Oct 18-25, 2026 • Alentejo, Portugal <br /> at Traditional Dream
            Factory
          </p>
        </div>
      </div>

      {/* Spacer to enable scrolling */}
      <div className="h-[150vh]" />

      {/* Actual Landing Page Content */}
      <main className="relative z-40 min-h-screen bg-gradient-to-b from-grass to-grass-dark overflow-hidden">
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
                the commons needs a tech stack.
              </h1>
              <p className="text-xl md:text-2xl text-white/90 text-pretty leading-relaxed">
                But half the stack isn't software.
                <br />
                <span className="font-bold"> // touch grass</span> is a week of
                exploring social technology and open software tools that can
                turn a homestead into a buzzing regenerative community. We're
                bringing tools land-based communities can actually use and
                experimenting with them for a week at Traditional Dream Factory,
                a real and growing community in Portugal.
              </p>
              <Button
                size="lg"
                className="bg-white text-grass hover:bg-white/90 text-lg px-8 py-6 h-auto font-semibold"
                asChild
              >
                <a href="/rsvp">Register now</a>
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
                          October 18-25, 2026 (1 week)
                        </div>
                      </li>
                      <li className="flex items-start gap-3">
                        <span className="text-grass font-bold text-xl">📍</span>
                        <div>
                          <span className="font-semibold">Location:</span>
                          <br />
                          Traditional Dream Factory
                          <br />
                          <span className="text-sm text-muted-foreground">
                            Alentejo, Portugal
                          </span>
                        </div>
                      </li>
                      <li className="flex items-start gap-3">
                        <span className="text-grass font-bold text-xl">🍛</span>
                        <div>
                          <span className="font-semibold">Meals:</span>
                          <br />3 meals included daily
                        </div>
                      </li>
                      <li className="flex items-start gap-3">
                        <span className="text-grass font-bold text-xl">💰</span>
                        <div>
                          <span className="font-semibold">Cost:</span>
                          <br />
                          €500-€1200 per person
                          <br />
                          <span className="text-sm text-muted-foreground">
                            (includes meals & accommodations, varies by tent
                            option)
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
                          Sturdy shoes, rain jacket, water bottle, hat—and your
                          laptop
                        </div>
                      </li>
                    </ul>
                  </div>
                </div>

                {/* Right Column - Photos */}
                <div className="space-y-4">
                  <div className="bg-gray-300 rounded-lg overflow-hidden aspect-[4/3]">
                    <img
                      src="/images/tdf-overview.jpg"
                      alt="Event photo 1"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-gray-300 rounded-lg overflow-hidden aspect-square">
                      <img
                        src="/images/tdf-tentbed.jpg"
                        alt="Event photo 2"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="bg-gray-300 rounded-lg overflow-hidden aspect-square">
                      <img
                        src="/images/tdf-hall.webp"
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

        {/* Land-Based Immersion Section */}
        <section className="bg-grass py-20 md:py-32 relative overflow-hidden">
          {/* Land plan background */}
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage: "url(/images/land-plan.png)",
            }}
          />
          {/* Darkening overlay for text contrast */}
          <div className="absolute inset-0 bg-earth/60" />
          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-3xl mx-auto bg-grass-dark/40 backdrop-blur-sm rounded-lg p-8 md:p-12 space-y-6 text-white shadow-xl">
              <h3 className="text-3xl md:text-4xl font-bold">
                the dream is learning how to build together.
              </h3>
              <p className="text-lg md:text-xl leading-relaxed">
                Most communities don't actually fail from lack of money or
                infrastructure. They fail on forming a resilient social layer
                that can navigate conflict, alchemize resentment, and maintain
                joy.{" "}
                <span className="font-bold">
                  A successful community needs protocols that preserve
                  individual agency while enabling group coordination for
                  getting the big projects done.
                </span>
              </p>

              <p className="text-base md:text-xl leading-relaxed">
                And what works for one community won't necessarily work for the
                next. Change the land, the weather, the landscape, and you
                change which solutions actually fit. Building something durable
                takes deep knowledge of where you are.{" "}
                <span className="font-bold">
                  A community built to last knows its own landscape—what thrives
                  in it, and what dies.
                </span>
              </p>
              <p className="text-base md:text-xl leading-relaxed">
                <span className="font-bold">// touch grass</span> is a week of
                practicing both. We'll get hands-on with software that carries
                the daily work of a community space: who's cooking, what's
                broken, what got decided, where the money went. And we'll get
                feet-on-the-ground with the landscape, learning to build a
                relationship with the land as much as we do with each other.{" "}
                <span className="font-bold">
                  A deep practice, for one week, at a community already doing
                  it.
                </span>
              </p>
            </div>
          </div>
        </section>

        {/* What We'll Explore Section */}
        <section className="py-20 md:py-32 bg-sand">
          <div className="container mx-auto px-4 md:px-8">
            <div className="max-w-6xl mx-auto">
              <div className="text-center space-y-4 mb-12">
                <h2 className="text-4xl md:text-5xl font-bold text-earth">
                  what we'll practice
                </h2>
                <div className="w-20 h-1 bg-grass mx-auto" />
                <p className="text-earth-dark text-lg max-w-2xl mx-auto pt-2">
                  The protocols a community runs on, and how to let the
                  landscape become part of it.{" "}
                  <span className="font-bold">// touch grass</span> brings
                  together experienced practitioners for you to learn from.
                </p>
              </div>

              {/* Alternating Layout */}
              <div className="space-y-16 lg:space-y-24">
                {/* Section 1: Copy + Photo */}
                <div className="grid md:grid-cols-2 gap-8 lg:gap-12 items-center">
                  <div className="space-y-4">
                    <h3 className="text-2xl md:text-3xl font-bold text-earth">
                      Social Technology
                    </h3>
                    <p className="text-lg leading-relaxed text-earth-dark">
                      The oldest tech in the stack, and the least written down.
                      How a group makes decisions. How it navigates conflict and
                      moves resentment through instead of letting it settle. How
                      people say hard things to each other, and how what one
                      person knows gets passed to whoever shows up next.
                    </p>
                    <p className="text-lg leading-relaxed text-earth-dark">
                      Membership and exit, care work, and the unglamorous
                      maintenance that keeps a group in one piece. None of it
                      ships with documentation, so we'll practice it directly.
                    </p>
                    <h4 className="text-xl font-semibold text-earth mt-6">
                      Learning From What Came Before
                    </h4>
                    <p className="text-lg leading-relaxed text-earth-dark">
                      Centuries of communes, co-ops, kibbutzim, and land trusts
                      have already run these experiments. We'll mine them for
                      what worked, what broke, and which failures are worth
                      designing around.
                    </p>
                  </div>
                  <div className="bg-gray-300 rounded-lg overflow-hidden aspect-[4/3]">
                    <img
                      src="/images/food.jpg"
                      alt="Traditional Dream Factory community space"
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>

                {/* Section 2: Photo + Copy */}
                <div className="grid md:grid-cols-2 gap-8 lg:gap-12 items-center">
                  <div className="bg-gray-300 rounded-lg overflow-hidden aspect-[4/3] order-2 md:order-1">
                    <img
                      src="/images/sheep.jpg"
                      alt="Livestock and land at Traditional Dream Factory"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="space-y-4 order-1 md:order-2">
                    <h3 className="text-2xl md:text-3xl font-bold text-earth">
                      People-Centered Protocols
                    </h3>
                    <p className="text-lg leading-relaxed text-earth-dark">
                      Where the social layer becomes daily practice—the
                      agreements, and the software meant to carry them. We'll
                      run these live for a week, looking for the ones that
                      preserve individual agency without stalling the group:
                    </p>
                    <div className="space-y-3 text-lg leading-relaxed text-earth-dark">
                      <p>
                        Task rosters, role rotation, and the coordination
                        apps—AI-assisted admin and knowledge capture included
                      </p>
                      <p>
                        Collective land ownership, stewardship structures, and
                        the legal wrappers that make them hold
                      </p>
                      <p>
                        Shared treasuries, multisig, and spending decisions a
                        group can actually live with
                      </p>
                      <p>
                        Contribution accounting, mutual credit, and local
                        currencies for work that doesn't fit a payroll
                      </p>
                      <p>
                        Funding land, housing, and long-horizon projects without
                        an extractive exit
                      </p>
                    </div>
                    <p className="text-lg leading-relaxed text-earth-dark">
                      The liberatory tooling coming out of web3 belongs here,
                      and it's most interesting when it has to meet a real
                      balance sheet.
                    </p>
                  </div>
                </div>

                {/* Section 3: Copy + Photo */}
                <div className="grid md:grid-cols-2 gap-8 lg:gap-12 items-center">
                  <div className="space-y-4">
                    <h3 className="text-2xl md:text-3xl font-bold text-earth">
                      Knowing the Landscape
                    </h3>
                    <p className="text-lg leading-relaxed text-earth-dark">
                      The other half of the week, and the part that makes the
                      rest of it honest—because you can't tell which protocols
                      fit a place until you know the place. So we'll read this
                      one: site walks tracing water, materials, and land
                      features. Food sovereignty workshops—gardening, mushroom
                      inoculation, animal processing. Real farm work, real time
                      in wilderness, and a week of learning what thrives here
                      and what doesn't.
                    </p>
                    <h4 className="text-xl font-semibold text-earth mt-6">
                      Intentional Connection
                    </h4>
                    <p className="text-lg leading-relaxed text-earth-dark">
                      Shared meals, fire, sauna, circles, and enough unscheduled
                      hours for people to actually meet each other. Co-creation
                      takes trust, and trust takes time you can't compress into
                      a workshop block.
                    </p>
                  </div>
                  <div className="bg-gray-300 rounded-lg overflow-hidden aspect-[4/3]">
                    <img
                      src="/images/sauna.jpg"
                      alt="Camp and gathering space at Traditional Dream Factory"
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
              </div>

              <div className="max-w-4xl mx-auto text-center">
                <div className="mt-16">
                  <Button
                    size="lg"
                    className="bg-grass text-white hover:bg-grass-dark text-lg px-8 py-6 h-auto font-semibold"
                    asChild
                  >
                    <a href="/rsvp">Register now</a>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Rhythm of the Week Section */}
        <section className="bg-earth py-20 md:py-32 relative overflow-hidden">
          {/* Moss texture overlay */}
          <div
            className="absolute inset-0 bg-cover bg-center opacity-15 pointer-events-none"
            style={{
              backgroundImage: "url(/images/moss.jpg)",
              mixBlendMode: "overlay",
            }}
          />
          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-5xl mx-auto space-y-12">
              <div className="text-center space-y-4">
                <h2 className="text-4xl md:text-5xl font-bold text-white">
                  the rhythm of the week
                </h2>
                <div className="w-20 h-1 bg-grass mx-auto" />
                <p className="text-white/80 text-lg max-w-2xl mx-auto pt-2">
                  Seven days, structured loosely enough to let something
                  unplanned happen.
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-6 lg:gap-8">
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 md:p-8 space-y-3">
                  <span className="text-3xl">🌅</span>
                  <h3 className="text-2xl font-semibold text-white">
                    Mornings on the land
                  </h3>
                  <p className="text-white/85 text-lg leading-relaxed">
                    Farm work, site walks, food prep, and breakfast together.
                    Bodies before screens—it changes what you build later in the
                    day.
                  </p>
                </div>

                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 md:p-8 space-y-3">
                  <span className="text-3xl">🛠️</span>
                  <h3 className="text-2xl font-semibold text-white">
                    Midday sessions
                  </h3>
                  <p className="text-white/85 text-lg leading-relaxed">
                    Hands-on time with the tools we've brought: walkthroughs,
                    live runs, teardowns, skill-shares, and hard questions put
                    to people who've actually run a community.
                  </p>
                </div>

                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 md:p-8 space-y-3">
                  <span className="text-3xl">🔥</span>
                  <h3 className="text-2xl font-semibold text-white">
                    Evenings together
                  </h3>
                  <p className="text-white/85 text-lg leading-relaxed">
                    Shared meals, fire, sauna, music, and circles. The
                    unstructured part, where most of the real collaboration
                    quietly gets decided.
                  </p>
                </div>

                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 md:p-8 space-y-3">
                  <span className="text-3xl">🌲</span>
                  <h3 className="text-2xl font-semibold text-white">
                    A day in the wild
                  </h3>
                  <p className="text-white/85 text-lg leading-relaxed">
                    One day out of it entirely: wilderness, distance, and solo
                    time. You come back with a different set of priorities.
                  </p>
                </div>
              </div>

              <p className="text-center text-white/70 text-base max-w-2xl mx-auto">
                Nothing here is finished, and that's the point. What we learn
                using these tools together goes back into them—and out to the
                communities they're for.
              </p>
            </div>
          </div>
        </section>

        {/* Your Hosts Section */}
        <section className="bg-sand py-20 md:py-32">
          <div className="container mx-auto px-4 md:px-8">
            <div className="max-w-6xl mx-auto">
              <div className="text-center space-y-4 mb-12 md:mb-16">
                <h2 className="text-4xl md:text-5xl font-bold text-earth">
                  your hosts
                </h2>
                <div className="w-20 h-1 bg-grass mx-auto" />
                <p className="text-earth-dark text-lg max-w-2xl mx-auto pt-2">
                  The people bringing the tools, holding the week, and doing the
                  dishes alongside you.
                </p>
              </div>

              {/* Two featured hosts, alternating 50/50 */}
              <div className="space-y-10 lg:space-y-14">
                {/* Host 1: Photo + Bio */}
                <div className="grid md:grid-cols-2 gap-8 lg:gap-12 items-center">
                  <img
                    src="/images/sara-host-3.jpeg"
                    alt="Sara Bee"
                    className="w-full aspect-[3/2] object-cover"
                  />
                  <div className="space-y-4">
                    <div>
                      <h3 className="text-2xl md:text-3xl font-bold text-earth">
                        Sara Bee
                      </h3>
                      <p className="text-grass font-semibold text-lg">
                        Co-creator, // touch grass
                      </p>
                    </div>
                    <p className="text-lg leading-relaxed text-earth-dark">
                      Sara holds the programming on social technology, bringing
                      practices from Microsolidarity and eight years of living
                      in and growing community. Her home community is{" "}
                      <a
                        href="https://elkenmist.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-grass hover:text-grass-dark font-semibold underline underline-offset-2 transition-colors"
                      >
                        Elkenmist
                      </a>
                      , a regenerative farm and gathering space in the US
                      Pacific Northwest. She arrives with a wide toolbox of
                      practical community skills: group process, grant writing,
                      accounting, catering, dish washing, and lettuce planting.
                    </p>
                  </div>
                </div>

                {/* Host 2: Bio + Photo */}
                <div className="grid md:grid-cols-2 gap-8 lg:gap-12 items-center">
                  <div className="space-y-4 order-2 md:order-1">
                    <div>
                      <h3 className="text-2xl md:text-3xl font-bold text-earth">
                        Ron Turetzky
                      </h3>
                      <p className="text-grass font-semibold text-lg">
                        Co-creator, // touch grass
                      </p>
                    </div>
                    <p className="text-lg leading-relaxed text-earth-dark">
                      Ron is the author of{" "}
                      <a
                        href="https://colive.fun"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-grass hover:text-grass-dark font-semibold underline underline-offset-2 transition-colors"
                      >
                        colive.fun
                      </a>
                      , a Decentral Park solidarity app for running a co-living
                      household, and teaches others how to practically form and
                      sustain industrial agrarian communities through his
                      course, Commons & Coordination. A technologist and
                      founding engineer in web3, he builds coordination tools
                      from inside the practice—as someone who steps into the
                      actual problems they're meant to solve. Most recently he
                      coordinated Convent, a coliving lab in NYC.
                    </p>
                  </div>
                  {/* TODO: replace with <img src="/images/host-ron.jpg" alt="Ron Turetzky" className="w-full aspect-[3/2] object-cover" /> */}
                  <div className="bg-earth/10 aspect-[3/2] flex items-center justify-center order-1 md:order-2">
                    <span className="text-earth/40 text-sm">photo</span>
                  </div>
                </div>
              </div>

              {/* Additional hosts, 3 columns */}
              <div className="mt-16 md:mt-24">
                <h3 className="text-2xl md:text-3xl font-bold text-earth text-center mb-10">
                  Joining us on the land
                </h3>
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12">
                  {guestHosts.map((host) => (
                    <div key={host.id} className="space-y-4">
                      {host.image ? (
                        <img
                          src={host.image}
                          alt={host.name}
                          className="w-full aspect-square object-cover rounded-lg"
                        />
                      ) : (
                        <div className="bg-earth/10 rounded-lg aspect-square flex items-center justify-center">
                          <span className="text-earth/40 text-sm">photo</span>
                        </div>
                      )}
                      <div>
                        <h4 className="text-xl font-bold text-earth">
                          {host.name}
                        </h4>
                        <p className="text-grass font-semibold">{host.role}</p>
                      </div>
                      <p className="text-base leading-relaxed text-earth-dark">
                        {host.bio}
                      </p>
                    </div>
                  ))}
                </div>
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
                    <AccordionTrigger className="text-xl font-semibold">
                      What's included?
                    </AccordionTrigger>
                    <AccordionContent className="text-lg leading-relaxed">
                      Each ticket is all-inclusive, covering accommodations,
                      meals, and programming. The only additional cost is
                      getting yourself to the venue!
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="item-whocomes">
                    <AccordionTrigger className="text-xl font-semibold">
                      Who should come?
                    </AccordionTrigger>
                    <AccordionContent className="text-lg leading-relaxed">
                      All kinds of people: engineers, protocol and product
                      designers, facilitators, governance nerds, community
                      organizers, and people already stewarding land. What we
                      need is a mix—someone has to know how a treasury works,
                      and someone has to know what happens when two families
                      stop speaking. You might be burnt out and craving
                      something real, or you might have been circling this
                      problem for years and want a week with people who take it
                      seriously.
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="item-crypto">
                    <AccordionTrigger className="text-xl font-semibold">
                      Do I need to be a web3 person?
                    </AccordionTrigger>
                    <AccordionContent className="text-lg leading-relaxed">
                      No. Financial tooling is one thread of the week, not the
                      whole rope, and plenty of the most useful work here is
                      social and organizational. We're interested in the
                      liberatory parts of this tech—collective ownership, shared
                      treasuries, non-extractive funding—and equally interested
                      in where they fall apart on contact with real people. Come
                      skeptical.
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="item-output">
                    <AccordionTrigger className="text-xl font-semibold">
                      What will we actually be doing?
                    </AccordionTrigger>
                    <AccordionContent className="text-lg leading-relaxed">
                      We're bringing a working set of tools—governance and
                      roster systems, treasury setups, contribution
                      accounting—and we'll use them for real, on a real site,
                      for a week. Expect to try things, break a few, and argue
                      about what should change. This isn't a hackathon and
                      there's nothing you have to ship. You leave knowing how
                      these tools feel in practice, and they leave better than
                      they arrived.
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="item-2">
                    <AccordionTrigger className="text-xl font-semibold">
                      How do I get there?
                    </AccordionTrigger>
                    <AccordionContent className="text-lg leading-relaxed">
                      Traditional Dream Factory is located in Alentejo,
                      Portugal. The nearest airport is Lisbon. To arrive by
                      train, take the Lisbon Sete-Rios to Ermidas-Sado. From
                      there it is a 10-min drive to TDF and we'll coordinate to
                      pick you up.
                      <br /> <br />
                      More detailed travel guidance will be shared closer to the
                      event.
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="item-3">
                    <AccordionTrigger className="text-xl font-semibold">
                      Can I stay longer?
                    </AccordionTrigger>
                    <AccordionContent className="text-lg leading-relaxed">
                      Traditional Dream Factory has an incredible season of
                      events lined up! You might even want to stay for their
                      Permaculture deep dive which starts right after
                      <b>// touchgrass</b>. Check their website for more
                      details:{" "}
                      <a
                        href="https://www.traditionaldreamfactory.com/"
                        target="_blank"
                      >
                        https://www.traditionaldreamfactory.com/
                      </a>
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="item-4">
                    <AccordionTrigger className="text-xl font-semibold">
                      Can I sponsor this event?
                    </AccordionTrigger>
                    <AccordionContent className="text-lg leading-relaxed">
                      <span className="font-bold">// touch grass</span> is
                      primarily a community-focused event, so there won't be any
                      dedicated spaces for sponsors. Nonetheless, if you or your
                      team want to support this event, send us a note at
                      brb@touchgrass.how and we'll be happy to discuss options.
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="item-5">
                    <AccordionTrigger className="text-xl font-semibold">
                      Why is this happening?
                    </AccordionTrigger>
                    <AccordionContent className="text-lg leading-relaxed">
                      <span className="font-bold">// touch grass</span> might
                      have started as a joke between Sara Bajor and Ron
                      Turetzky, but it's now a real event. We want to see
                      regenerative, land-based communities proliferate—and the
                      tooling for that barely exists. What does exist is
                      scattered across a hundred forks, group chats, and
                      spreadsheets that only one person understands. So we
                      created <span className="font-bold">// touch grass</span>{" "}
                      to get the people who care about it into the same field,
                      with the tools in hand, for long enough to find out what
                      actually works.
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </div>
            </div>
          </div>
        </section>

        {/* Final CTA Section */}
        <section className="bg-sand pb-60 pt-20">
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
                      href="mailto:brb@touchgrass.how"
                      className="text-grass hover:text-grass-dark text-lg"
                    >
                      brb@touchgrass.how
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
                <div
                  id="lower-apply-cta"
                  className="bg-grass rounded-lg p-8 md:p-10 text-white text-center space-y-6 relative overflow-visible"
                >
                  {/* Moss texture overlay */}
                  <div className="absolute inset-0 bg-cover bg-center opacity-20 pointer-events-none" />
                  <div className="relative z-10">
                    <h3 className="text-2xl md:text-3xl font-bold mb-4">
                      Ready to join us?
                    </h3>
                    <p className="text-white/90 mb-6 text-lg">
                      Applications are now open for{" "}
                      <span className="font-bold">// touch grass</span> 2026. 30
                      spots, one week, one field.
                    </p>
                    <div ref={lowerButtonRef} className="relative inline-block">
                      <Button
                        size="lg"
                        className="bg-white text-grass hover:bg-white/90 text-lg px-8 py-6 h-auto font-semibold"
                        asChild
                      >
                        <a href="/rsvp">Register now</a>
                      </Button>
                      {/* Hand pointing up at the button */}
                      <div
                        className="absolute left-1/2 -translate-x-1/2 w-24 md:w-28 pointer-events-none"
                        style={{ top: `calc(100% + ${lowerHandGap}px)` }}
                      >
                        <img
                          src="/images/handpointup.png"
                          alt=""
                          className="w-full h-auto drop-shadow-lg"
                        />
                      </div>
                    </div>
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
              © 2026 <span className="font-bold">// touch grass</span> <br />{" "}
              it's time to go outside.
            </p>
          </div>
        </footer>
      </main>
    </div>
  );
}
