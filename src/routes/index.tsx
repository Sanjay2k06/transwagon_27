import { useState, useRef, useEffect, type FormEvent, type ReactNode } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { AnimatePresence, motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import {
  ArrowDown,
  ArrowRight,
  ArrowUpRight,
  Check,
  Instagram,
  MessageCircle,
  Phone,
} from "lucide-react";

import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { BrandMark } from "@/components/BrandMark";
import { Button } from "@/components/ui/button";
import { StippleType } from "@/components/ui/stipple-type";
import { IrisVehicleShowcase } from "@/components/IrisVehicleShowcase";
import { ScrollReveal } from "@/components/ui/scroll-reveal";

const services = [
  {
    number: "01",
    title: "Transport solutions",
    description:
      "Dependable transport built around the demands of your business, your routes, and the road ahead.",
    tags: ["Container Bodies", "Express Delivery Vans", "High-Cube Cargo"],
    specs: "Corrugated steel · Anti-sag understructure · Multi-lock security",
  },
  {
    number: "02",
    title: "Quality coach building",
    description:
      "Thoughtfully built coaches that bring practical design, lasting comfort, and dependable construction together.",
    tags: ["Aerodynamic Fairings", "Driver Cabins", "Wind Deflectors"],
    specs: "Fuel-saving aerodynamics · Molded FRP · High-gloss finish",
  },
  {
    number: "03",
    title: "General fabrication",
    description:
      "Carefully executed fabrication work, made with a close eye on fit, function, and finish.",
    tags: ["Chassis Reinforcement", "Sub-Frame Welding", "Rear Bumpers & Steps"],
    specs: "Heavy structural channels · Precision welds · Anti-rust primer",
  },
  {
    number: "04",
    title: "Custom vehicle bodies",
    description:
      "Purpose-built vehicle body solutions shaped to suit the work you need them to do.",
    tags: ["EV Cargo Conversions", "Side-Door Utilities", "Custom Dimensions"],
    specs: "Engineered payload balance · Custom chassis integration",
  },
];

const workItems = [
  {
    number: "01",
    label: "Commercial transport",
    title: "Dual-Tone Commercial Container Body",
    tag: "CONTAINER BODY · COMMERCIAL",
    image: "/images/work-1.jpg",
    description:
      "Heavy-duty corrugated cargo container body with dual-tone finish, reinforced understructure, and rear ladder/footsteps.",
  },
  {
    number: "02",
    label: "Vehicle fabrication",
    title: "Heavy-Duty Utility Cargo Body",
    tag: "CUSTOM FABRICATION · UTILITY",
    image: "/images/work-2.jpg",
    description:
      "Robust corrugated utility body with side access cargo door and integrated cab-over wind canopy.",
  },
  {
    number: "03",
    label: "Coach building",
    title: "Aerodynamic Closed Delivery Van",
    tag: "COACH BUILDING · AERODYNAMIC",
    image: "/images/work-3.jpg",
    description:
      "Purpose-built transport body featuring a precision-formed aerodynamic cabin fairing and reinforced side panels.",
  },
  {
    number: "04",
    label: "Custom bodies",
    title: "Tata Ace EV Commercial Body",
    tag: "ELECTRIC VEHICLE · CITY FREIGHT",
    image: "/images/work-4.jpg",
    description:
      "Custom electric vehicle cargo conversion built for Tata Ace Pro EV chassis with high-volume aero crown.",
  },
  {
    number: "05",
    label: "Made to specification",
    title: "Bespoke Workshop Engineering & Fabrication",
    tag: "BESPOKE ENGINEERING · WORKSHOP",
    image: "/images/work-1.jpg",
    description:
      "Tailor-made chassis dimensions, structural payload distribution, and purpose-welded framework engineered to order.",
  },
];

const reasons = [
  {
    title: "Reliable workmanship",
    text: "Consistent attention to the details that matter, from first fit to final finish.",
  },
  {
    title: "Skilled craftsmanship",
    text: "Experienced hands and a thoughtful approach to every commercial build.",
  },
  {
    title: "Timely service",
    text: "A practical, responsive process that respects your commercial uptime and delivery deadlines.",
  },
  {
    title: "Customer satisfaction",
    text: "Clear communication and solutions centered on the fleets and drivers who depend on them.",
  },
];

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "TRANSWAGON | Luxury Coach Building & Commercial Vehicle Fabrication" },
      {
        name: "description",
        content:
          "TRANSWAGON delivers dependable transport solutions, quality coach building, and custom commercial vehicle fabrication in Bangalore.",
      },
      {
        property: "og:title",
        content: "TRANSWAGON | Luxury Coach Building & Commercial Vehicle Fabrication",
      },
      {
        property: "og:description",
        content:
          "Transport solutions, coach building, and vehicle fabrication engineered for durability.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: TranswagonPage,
});

function TranswagonPage() {
  const prefersReducedMotion = useReducedMotion();
  const videoRef = useRef<HTMLVideoElement>(null);
  const splashVideoRef = useRef<HTMLVideoElement>(null);
  const aboutImageRef = useRef<HTMLDivElement>(null);

  // Splash screen: displays immediately whenever the website is opened, reloaded, or accessed via direct URL
  const [splashVisible, setSplashVisible] = useState(true);
  const [formSent, setFormSent] = useState(false);
  const [videoFailed, setVideoFailed] = useState(false);

  useEffect(() => {
    if (!splashVisible) return;
    // Attempt programmatic play for instant video playback on all mobile & desktop browsers
    if (splashVideoRef.current) {
      splashVideoRef.current.play().catch(() => {});
    }
    const timer = window.setTimeout(
      () => setSplashVisible(false),
      prefersReducedMotion ? 400 : 3200,
    );
    return () => window.clearTimeout(timer);
  }, [splashVisible, prefersReducedMotion]);

  // Global scroll-driven parallax for hero
  const { scrollY } = useScroll();
  const heroCopyY = useTransform(scrollY, [0, 500], [0, prefersReducedMotion ? 0 : 45]);
  const heroMediaY = useTransform(scrollY, [0, 500], [0, prefersReducedMotion ? 0 : -30]);

  // Parallax for About section vehicle frame
  const { scrollYProgress: aboutScroll } = useScroll({
    target: aboutImageRef,
    offset: ["start end", "end start"],
  });
  const aboutImgShift = useTransform(
    aboutScroll,
    [0, 1],
    prefersReducedMotion ? ["0%", "0%"] : ["-7%", "7%"],
  );

  function submitContact(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const name = String(data.get("name") ?? "").trim();
    const contactInfo = String(data.get("email") ?? "").trim();
    const message = String(data.get("message") ?? "").trim();

    const formattedMessage = [
      "Hello TRANSWAGON,",
      "",
      "New Vehicle Body / Fabrication Enquiry:",
      `Name: ${name}`,
      `Contact / Phone / Email: ${contactInfo}`,
      `Requirement: ${message}`,
      "",
      "Please share quotation and timeline.",
    ].join("\n");

    const whatsappUrl = `https://wa.me/918197810561?text=${encodeURIComponent(formattedMessage)}`;
    const opened = window.open(whatsappUrl, "_blank");
    if (!opened) {
      window.location.href = whatsappUrl;
    }
    setFormSent(true);
  }

  return (
    <>
      {/* ULTRA-CLEAN CINEMATIC SPLASH PAGE */}
      <AnimatePresence>
        {splashVisible && (
          <motion.div
            className="splash-screen"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
            onClick={() => setSplashVisible(false)}
            role="banner"
            aria-label="TRANSWAGON"
          >
            {/* 1. Fullscreen Continuous Background Video */}
            <div className="splash-video-media">
              <video
                ref={splashVideoRef}
                autoPlay
                muted
                loop
                playsInline
                preload="auto"
                poster="/images/work-3.jpg"
                className="splash-video"
              >
                <source src="/images/video.mp4" type="video/mp4" />
                <source src="/images/IMG_2314.MOV" type="video/quicktime" />
              </video>
              <div className="splash-video-tint" />
            </div>

            {/* 2. Exactly Centered TRANSWAGON Branding */}
            <motion.div
              className="splash-brand"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            >
              <img
                src="/images/transwagon-truck-white.png"
                alt="TRANSWAGON"
                className="splash-brand-logo"
              />
              <h1>TRANSWAGON</h1>
              <p>QUALITY COACH BUILDERS &amp; GENERAL FABRICATORS</p>
              <div className="splash-brand-divider" />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <SiteHeader />

      <main>
        {/* HERO SECTION */}
        <section id="home" className="hero-section">
          <motion.div className="hero-copy" style={{ y: heroCopyY }}>
            <motion.div
              className="eyebrow"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              Built around the work you do
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              Purpose in every
              <br />
              <span>line of the road.</span>
            </motion.h1>

            {/* Interactive Stipple Type particle accent */}
            <motion.div
              className="mt-4 max-w-xl hidden md:block"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.25, duration: 0.6 }}
            >
              <StippleType
                text="TRANSWAGON // BANGALORE COACH BUILDERS"
                fontSize={24}
                density={4}
                stippleColor="#27272a"
              />
            </motion.div>

            <motion.div
              className="hero-bottom"
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <p>
                Transport solutions and vehicle craftsmanship, made to move your business forward.
                Precision-engineered commercial bodies, aerodynamic fairings, and custom EV
                conversions built for maximum payload efficiency.
              </p>
              <div className="hero-actions">
                <Button asChild size="lg" className="action-button">
                  <Link to="/gallery">
                    Explore vehicle builds <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                <Button asChild variant="outline" size="lg" className="action-button">
                  <Link to="/contact">
                    Consult engineering <ArrowUpRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </motion.div>
          </motion.div>

          {/* HERO BACKGROUND VIDEO - HIGH PRIORITY (NATURAL SPEED, INSTANT PLAYBACK, BRIGHT & SHARP) */}
          <motion.div
            className="hero-visual"
            style={{ y: heroMediaY }}
            initial={{ opacity: 0, scale: 0.99 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.15 }}
          >
            <div className="hero-visual-media">
              {!videoFailed ? (
                <video
                  ref={videoRef}
                  src="/images/video.mp4"
                  autoPlay
                  loop
                  muted
                  playsInline
                  preload="auto"
                  poster="/images/work-3.jpg"
                  className="hero-video"
                  onError={() => setVideoFailed(true)}
                />
              ) : (
                <img
                  src="/images/work-3.jpg"
                  alt="TRANSWAGON Coach Building"
                  className="hero-video"
                />
              )}
              {/* Subtle contrast gradient only at extreme bottom, preserving full vehicle brightness */}
              <div className="hero-video-tint" />
            </div>

            {/* Video Overlay Top Badge */}
            <div className="hero-visual-top">
              <div className="hero-visual-badge">
                <span className="pulse-dot" />
                <span>Heavy Transport Fabrication Unit</span>
              </div>
            </div>

            {/* Video Overlay Center Minimalist Headline */}
            <div className="hero-overlay-center">
              <span className="text-xs uppercase font-mono tracking-widest text-zinc-300 mb-1">
                AERO CROWN · CONTAINER BODIES · HEAVY FABRICATION
              </span>
              <div className="hero-overlay-title">THE NEXT MILE STARTS HERE.</div>
            </div>

            {/* Video Overlay Bottom Bar */}
            <div className="hero-visual-bottom">
              <span>High-Tensile Steel & FRP Engineering · Bangalore Facility</span>
              <a href="#about" className="scroll-cue">
                Scroll to explore <ArrowDown className="h-3.5 w-3.5" aria-hidden="true" />
              </a>
            </div>
          </motion.div>
        </section>

        {/* ABOUT SECTION - EDITORIAL LAYOUT WITH PARALLAX */}
        <section id="about" className="about-section section-pad">
          <div className="section-index">
            <span>About</span>
            <span>Made to move you forward</span>
          </div>

          <div className="about-grid">
            <div>
              <Reveal>
                <h2 className="section-heading mb-6">
                  The road asks
                  <br />
                  for <span>more.</span>
                </h2>
                <ScrollReveal
                  baseOpacity={0.18}
                  enableBlur={true}
                  blurStrength={4}
                  textClassName="lead-copy mb-6 text-foreground font-semibold"
                >
                  We believe the best transport solutions are built with purpose, precision, and a
                  genuine understanding of commercial duty cycles.
                </ScrollReveal>
                <ScrollReveal
                  baseOpacity={0.2}
                  enableBlur={true}
                  blurStrength={3}
                  textClassName="text-muted-foreground leading-relaxed mb-6"
                >
                  TRANSWAGON combines heavy-duty structural steel fabrication, precision aerodynamic
                  coach building, and specialized container conversions in Bangalore. From
                  individual commercial operators to enterprise logistics fleets, we craft bodies
                  engineered to endure tough operating conditions while maximizing usable payload.
                </ScrollReveal>
              </Reveal>

              {/* Technical Capability Stats with Scroll Reveal */}
              <Reveal delay={0.1}>
                <div className="about-stats">
                  <div className="about-stat-item">
                    <span className="about-stat-value">100%</span>
                    <span className="about-stat-label">Bespoke Engineering to Fleet Spec</span>
                  </div>
                  <div className="about-stat-item">
                    <span className="about-stat-value">Heavy-Duty</span>
                    <span className="about-stat-label">
                      Corrugated Steel & Anti-Corrosion Primer
                    </span>
                  </div>
                  <div className="about-stat-item">
                    <span className="about-stat-value">Multi-Chassis</span>
                    <span className="about-stat-label">Tata Ace, Mahindra, EV & Light Trucks</span>
                  </div>
                </div>
              </Reveal>

              <Reveal delay={0.15}>
                <div className="mt-8 flex flex-wrap items-center gap-4">
                  <Button asChild size="lg" className="action-button">
                    <Link to="/about">
                      Read our story & manufacturing pillars <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                  <a
                    href="#showcase"
                    className="text-xs font-bold tracking-wider uppercase inline-flex items-center gap-1.5 text-foreground hover:opacity-75 transition-opacity"
                  >
                    View scroll reveal <ArrowDown className="h-3.5 w-3.5" />
                  </a>
                </div>
              </Reveal>
            </div>

            {/* Supporting Vehicle Fabrication Image Frame with Parallax */}
            <div ref={aboutImageRef} className="flex flex-col gap-4">
              <Reveal delay={0.08}>
                <div className="about-image-frame aspect-[4/3] rounded-none overflow-hidden relative">
                  <motion.img
                    src="/images/work-2.jpg"
                    alt="TRANSWAGON Heavy Duty Utility Fabrication"
                    loading="lazy"
                    className="w-full h-full object-cover scale-110"
                    style={{ y: aboutImgShift }}
                  />
                </div>
                <div className="flex items-center justify-between text-xs text-muted-foreground px-1 mt-3">
                  <span>Bangalore Manufacturing Facility</span>
                  <span className="font-mono uppercase font-semibold">
                    Magadi Main Road, Bangalore
                  </span>
                </div>
              </Reveal>
            </div>
          </div>

          <div className="about-footnote">
            <span>Reliable by design.</span>
            <span>Crafted for the long haul.</span>
          </div>
        </section>

        {/* IRIS ANIMATION VEHICLE SHOWCASE - SCROLL-LOCKED REVEAL */}
        <IrisVehicleShowcase src="/images/work-1.jpg" alt="TRANSWAGON Commercial Vehicle Build" />

        {/* SERVICES SECTION - CLEAN VISUAL PRESENTATION (NO REPETITIVE CARDS) */}
        <section id="services" className="services-section section-pad">
          <div className="section-index">
            <span>Services</span>
            <span>Four ways to get you there</span>
          </div>

          <div className="services-heading-row">
            <Reveal>
              <h2 className="section-heading">
                Built for
                <br />
                <span>what’s next.</span>
              </h2>
            </Reveal>
            <ScrollReveal
              baseOpacity={0.2}
              enableBlur={true}
              blurStrength={4}
              textClassName="text-muted-foreground text-sm sm:text-base leading-relaxed max-w-sm"
            >
              Practical expertise and careful execution, bringing your transport needs to life.
            </ScrollReveal>
          </div>

          <div className="service-list">
            {services.map((service, index) => (
              <Reveal key={service.number} delay={index * 0.05}>
                <article className="service-row group">
                  <span className="service-number font-mono">{service.number}</span>
                  <div>
                    <h3 className="group-hover:text-primary transition-colors">{service.title}</h3>
                    <p className="mt-1 font-mono text-xs text-muted-foreground">{service.specs}</p>
                  </div>
                  <div className="service-row-desc">
                    <p>{service.description}</p>
                    <div className="service-tags mt-2">
                      {service.tags.map((tag) => (
                        <span key={tag} className="service-tag">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                  <ArrowUpRight className="service-arrow shrink-0" aria-hidden="true" />
                </article>
              </Reveal>
            ))}
          </div>
        </section>

        {/* VEHICLE GALLERY - 5 AUTHENTIC BUILD ITEMS WITH PARALLAX */}
        <section id="work" className="work-section section-pad">
          <div className="section-index">
            <span>Vehicle Gallery</span>
            <span>01 — 05 Proven in Service</span>
          </div>

          <div className="work-heading-row">
            <Reveal>
              <h2 className="section-heading">
                A closer look
                <br />
                at <span>the craft.</span>
              </h2>
            </Reveal>
            <Reveal delay={0.1}>
              <p>Real vehicle fabrications and coach builds engineered for the road.</p>
            </Reveal>
          </div>

          <div className="work-grid">
            {workItems.map((item, index) => (
              <ParallaxWorkCard key={item.number} item={item} index={index} />
            ))}
          </div>

          {/* Redirection banner to Gallery page with Scroll Reveal */}
          <Reveal delay={0.15}>
            <div className="mt-16 border border-border bg-card p-8 md:p-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 shadow-sm">
              <div>
                <span className="text-[11px] font-bold tracking-widest uppercase text-muted-foreground">
                  Dedicated Vehicle Portfolio
                </span>
                <h3 className="text-xl md:text-2xl font-bold font-display mt-1 text-foreground">
                  Explore more builds, specs & workshop video
                </h3>
                <p className="text-sm text-muted-foreground mt-1 max-w-2xl leading-relaxed">
                  Filter by container bodies, coach building, aerodynamic fairings, and electric
                  vehicle adaptations. Inspect technical dimensions and workshop recordings.
                </p>
              </div>
              <Button asChild size="lg" className="action-button shrink-0">
                <Link to="/gallery">
                  View Full Gallery <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </Reveal>
        </section>

        {/* THE DIFFERENCE SECTION */}
        <section className="reasons-section section-pad">
          <div className="section-index">
            <span>The Difference</span>
            <span>Good work, done thoughtfully</span>
          </div>

          <div className="reasons-grid">
            <Reveal>
              <h2 className="section-heading">
                Trust is built
                <br />
                <span>into the work.</span>
              </h2>
              <ScrollReveal
                baseOpacity={0.2}
                enableBlur={true}
                blurStrength={3}
                textClassName="text-muted-foreground text-sm leading-relaxed mt-4 max-w-sm"
              >
                Every weld, bracket, and cross-member undergoes rigorous inspection to ensure
                long-term durability on Indian highways.
              </ScrollReveal>
              <ScrollReveal
                baseOpacity={0.2}
                enableBlur={true}
                blurStrength={3}
                textClassName="text-muted-foreground text-sm leading-relaxed mt-4 max-w-sm"
              >
                Every weld, bracket, and cross-member undergoes rigorous inspection to ensure
                long-term durability on Indian highways.
              </ScrollReveal>
            </Reveal>
            <div className="reason-list">
              {reasons.map((reason, index) => (
                <Reveal key={reason.title} delay={index * 0.05}>
                  <article className="reason-row">
                    <span className="reason-check bg-background">
                      <Check className="text-foreground" aria-hidden="true" />
                    </span>
                    <div>
                      <h3>{reason.title}</h3>
                      <p>{reason.text}</p>
                    </div>
                  </article>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* CONTACT SECTION */}
        <section id="contact" className="contact-section section-pad">
          <div className="section-index">
            <span>Contact</span>
            <span>Let’s get moving</span>
          </div>

          <Reveal>
            <div className="contact-intro">
              <p className="eyebrow">Your next build starts here</p>
              <h2 className="section-heading">
                Let’s build
                <br />
                <span>something lasting.</span>
              </h2>
            </div>
          </Reveal>

          <div className="contact-grid">
            <div className="contact-details">
              <Reveal delay={0.05}>
                <a className="contact-item group" href="tel:+918197810561">
                  <span>Call workshop directly</span>
                  <strong>+91 8197810561</strong>
                  <ArrowUpRight aria-hidden="true" />
                </a>
              </Reveal>

              <Reveal delay={0.1}>
                <a
                  className="contact-item group"
                  href="https://wa.me/918197810561?text=Hi%20TRANSWAGON%2C%20I%20would%20like%20to%20enquire%20about%20vehicle%20body%20fabrication."
                  target="_blank"
                  rel="noreferrer"
                >
                  <span>WhatsApp consultation</span>
                  <strong>+91 8197810561</strong>
                  <ArrowUpRight aria-hidden="true" />
                </a>
              </Reveal>

              <Reveal delay={0.15}>
                <a
                  className="contact-item group"
                  href="https://www.instagram.com/trans.wagon27?utm_source=qr&igsh=MWoxbnNsa3lrcjJkbQ%3D%3D"
                  target="_blank"
                  rel="noreferrer"
                >
                  <span>Follow on Instagram</span>
                  <strong>@trans.wagon27</strong>
                  <ArrowUpRight aria-hidden="true" />
                </a>
              </Reveal>

              <Reveal delay={0.2}>
                <a className="contact-item group" href="mailto:trans.wagon27@gmail.com">
                  <span>Email enquiry</span>
                  <strong>trans.wagon27@gmail.com</strong>
                  <ArrowUpRight aria-hidden="true" />
                </a>
              </Reveal>

              <Reveal delay={0.25}>
                <a
                  className="contact-item address-item group"
                  href="https://www.google.com/maps/dir/?api=1&destination=%2389%2F5%2C+Magadi+Main+Road%2C+Kodigehalli+Post%2C+Segehalli+Village%2C+Bangalore+91"
                  target="_blank"
                  rel="noreferrer"
                >
                  <span>Visit manufacturing facility</span>
                  <strong>
                    #89/5, Magadi Main Road,
                    <br />
                    Kodigehalli Post, Segehalli Village,
                    <br />
                    Bangalore – 91
                  </strong>
                  <ArrowUpRight aria-hidden="true" />
                </a>
              </Reveal>

              <div className="pt-6">
                <Button asChild variant="outline" size="sm" className="action-button">
                  <Link to="/contact">
                    Open Dedicated Contact & Workshop Page <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </div>

            <Reveal delay={0.1}>
              <form className="contact-form" onSubmit={submitContact}>
                <div className="form-heading">
                  <span>Tell us about your chassis & vehicle specs.</span>
                  <span>We’ll provide a quotation promptly.</span>
                </div>
                <label htmlFor="contact-name">Your name / Company</label>
                <input
                  id="contact-name"
                  name="name"
                  autoComplete="name"
                  required
                  placeholder="Name or Fleet Operator"
                />
                <label htmlFor="contact-email">Email or Phone number</label>
                <input
                  id="contact-email"
                  name="email"
                  type="text"
                  autoComplete="email"
                  required
                  placeholder="you@company.com or 10-digit number"
                />
                <label htmlFor="contact-message">Chassis model, body requirements & timeline</label>
                <textarea
                  id="contact-message"
                  name="message"
                  required
                  rows={3}
                  placeholder="E.g., Tata Ace EV container body, 8-ft closed box with aerodynamic crown..."
                />
                <Button type="submit" size="lg" className="form-submit action-button">
                  Send an enquiry
                </Button>
                {formSent && (
                  <p className="mt-3 text-xs font-semibold text-emerald-600">
                    Opening WhatsApp to message +91 8197810561 with your enquiry.
                  </p>
                )}
              </form>
            </Reveal>
          </div>
        </section>
      </main>

      <SiteFooter />
    </>
  );
}

function ParallaxWorkCard({ item, index }: { item: (typeof workItems)[0]; index: number }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const prefersReduced = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ["start end", "end start"],
  });

  const imgY = useTransform(scrollYProgress, [0, 1], prefersReduced ? ["0%", "0%"] : ["-5%", "5%"]);

  return (
    <Reveal delay={index * 0.04} className={`work-item work-item-${index + 1}`}>
      <div ref={cardRef}>
        <figure className="work-figure group">
          <div className="photo-placeholder photo-has-image overflow-hidden">
            <motion.img
              src={item.image}
              alt={item.title}
              className="photo-img group-hover:scale-105 transition-transform duration-700"
              style={{ y: imgY, scale: prefersReduced ? 1 : 1.08 }}
              loading="lazy"
            />
            <span className="photo-corner photo-corner-top font-mono">
              TRANSWAGON / {item.number}
            </span>
            <span className="photo-corner photo-corner-bottom font-mono">{item.tag}</span>
          </div>
          <figcaption>
            <div>
              <strong className="block text-foreground text-sm font-semibold tracking-tight">
                {item.number} — {item.title}
              </strong>
              <p className="mt-1 text-xs text-muted-foreground leading-relaxed">
                {item.description}
              </p>
            </div>
            <ArrowUpRight
              aria-hidden="true"
              className="shrink-0 text-muted-foreground group-hover:text-foreground group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all"
            />
          </figcaption>
        </figure>
      </div>
    </Reveal>
  );
}

function Reveal({
  children,
  delay = 0,
  className = "",
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  const reducedMotion = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial={reducedMotion ? false : { opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.12 }}
      transition={{ duration: reducedMotion ? 0 : 0.55, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}
