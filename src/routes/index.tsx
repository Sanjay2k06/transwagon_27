import { useEffect, useState, type FormEvent, type ReactNode } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { AnimatePresence, motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { ArrowDown, ArrowDownRight, ArrowRight, ArrowUpRight, Check, Menu, X } from "lucide-react";

import { Button } from "@/components/ui/button";

const navItems = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Services", href: "#services" },
  { label: "Our Work", href: "#work" },
  { label: "Contact", href: "#contact" },
];

const services = [
  {
    number: "01",
    title: "Transport solutions",
    description:
      "Dependable transport built around the demands of your business, your routes, and the road ahead.",
  },
  {
    number: "02",
    title: "Quality coach building",
    description:
      "Thoughtfully built coaches that bring practical design, lasting comfort, and dependable construction together.",
  },
  {
    number: "03",
    title: "General fabrication",
    description:
      "Carefully executed fabrication work, made with a close eye on fit, function, and finish.",
  },
  {
    number: "04",
    title: "Custom vehicle bodies",
    description:
      "Purpose-built vehicle body solutions shaped to suit the work you need them to do.",
  },
];

const workItems = ["Coach building", "Commercial transport", "Vehicle fabrication", "Custom bodies", "Made to specification"];

const reasons = [
  { title: "Reliable workmanship", text: "Consistent attention to the details that matter, from first fit to final finish." },
  { title: "Skilled craftsmanship", text: "Experienced hands and a thoughtful approach to every build." },
  { title: "Timely service", text: "A practical, responsive process that respects your time and your work." },
  { title: "Customer satisfaction", text: "Clear communication and solutions centered on the people who depend on them." },
];

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "TRANSWAGON | Engineered for the Road" },
      {
        name: "description",
        content:
          "TRANSWAGON delivers dependable transport solutions, quality coach building, and custom vehicle fabrication in Bangalore.",
      },
      { property: "og:title", content: "TRANSWAGON | Engineered for the Road" },
      {
        property: "og:description",
        content: "Transport solutions, coach building, and vehicle fabrication made for the road ahead.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: TranswagonPage,
});

function TranswagonPage() {
  const [splashVisible, setSplashVisible] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);
  const prefersReducedMotion = useReducedMotion();
  const { scrollYProgress } = useScroll();
  const heroShift = useTransform(scrollYProgress, [0, 0.3], [0, prefersReducedMotion ? 0 : 76]);

  useEffect(() => {
    const timer = window.setTimeout(() => setSplashVisible(false), prefersReducedMotion ? 250 : 1550);
    return () => window.clearTimeout(timer);
  }, [prefersReducedMotion]);

  function submitContact(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const name = String(data.get("name") ?? "");
    const email = String(data.get("email") ?? "");
    const message = String(data.get("message") ?? "");
    const subject = encodeURIComponent(`Website enquiry from ${name}`);
    const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\n${message}`);
    window.location.href = `mailto:trans.wagon27@gmail.com?subject=${subject}&body=${body}`;
  }

  return (
    <>
      <AnimatePresence>
        {splashVisible && (
          <motion.div
            className="splash-screen"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, y: prefersReducedMotion ? 0 : -16 }}
            transition={{ duration: prefersReducedMotion ? 0.12 : 0.65, ease: [0.22, 1, 0.36, 1] }}
            aria-label="TRANSWAGON — Engineered for the road. Built for excellence."
          >
            <motion.div
              className="splash-brand"
              initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: prefersReducedMotion ? 0 : 0.65, delay: 0.08 }}
            >
              <BrandMark />
              <p>Engineered for the road. Built for excellence.</p>
            </motion.div>
            <span className="splash-rule" aria-hidden="true" />
          </motion.div>
        )}
      </AnimatePresence>

      <header className="site-header">
        <a className="brand-lockup" href="#home" aria-label="TRANSWAGON home">
          <BrandMark compact />
          <span className="brand-name">TRANSWAGON</span>
        </a>
        <nav className="desktop-nav" aria-label="Main navigation">
          {navItems.map((item) => (
            <a key={item.href} href={item.href} className="nav-link">
              {item.label}
            </a>
          ))}
        </nav>
        <Button asChild variant="outline" size="sm" className="header-cta">
          <a href="#contact">Start a conversation <ArrowUpRight aria-hidden="true" /></a>
        </Button>
        <Button
          variant="ghost"
          size="icon"
          className="mobile-menu-toggle"
          aria-label={menuOpen ? "Close navigation" : "Open navigation"}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((open) => !open)}
        >
          {menuOpen ? <X /> : <Menu />}
        </Button>
        <AnimatePresence>
          {menuOpen && (
            <motion.nav
              className="mobile-nav"
              aria-label="Mobile navigation"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
            >
              {navItems.map((item) => (
                <a key={item.href} href={item.href} onClick={() => setMenuOpen(false)}>
                  {item.label}<ArrowUpRight aria-hidden="true" />
                </a>
              ))}
            </motion.nav>
          )}
        </AnimatePresence>
      </header>

      <main>
        <section id="home" className="hero-section">
          <div className="hero-topline">
            <span>Bangalore, India</span><span>Transport · Coach building · Fabrication</span>
          </div>
          <motion.div className="hero-copy" style={{ y: heroShift }}>
            <motion.p className="eyebrow" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.2 }}>
              Built around the work you do
            </motion.p>
            <motion.h1 initial={{ opacity: 0, y: 26 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.28, duration: 0.8 }}>
              Purpose in every<br />
              <span>line of the road.</span>
            </motion.h1>
            <motion.div className="hero-bottom" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.56 }}>
              <p>Transport solutions and vehicle craftsmanship, made to move your business forward.</p>
              <div className="hero-actions">
                <Button asChild size="lg" className="action-button">
                  <a href="#work">Explore our work <ArrowDownRight aria-hidden="true" /></a>
                </Button>
                <Button asChild variant="outline" size="lg" className="action-button">
                  <a href="#contact">Contact us <ArrowUpRight aria-hidden="true" /></a>
                </Button>
              </div>
            </motion.div>
          </motion.div>
          <motion.a className="hero-visual" href="#about" aria-label="Discover TRANSWAGON" style={{ y: useTransform(heroShift, (value) => value * -0.22) }}>
            <div className="hero-visual-top"><span>TRANSWAGON / 01</span><span>Engineered for the road</span></div>
            <div className="visual-mark" aria-hidden="true"><BrandMark /></div>
            <div className="visual-word">THE NEXT MILE<br />STARTS HERE.</div>
            <div className="hero-visual-bottom"><span>Transport solutions, built with purpose.</span><span className="scroll-cue">Scroll to explore <ArrowDown aria-hidden="true" /></span></div>
          </motion.a>
        </section>

        <section id="about" className="about-section section-pad">
          <div className="section-index"><span>01 / About</span><span>Made to move you forward</span></div>
          <div className="about-grid">
            <h2 className="section-heading">The road asks<br />for <span>more.</span></h2>
            <div className="about-copy">
              <p className="lead-copy">We believe the best transport solutions are built with purpose, precision, and a genuine understanding of the work they do.</p>
              <p>TRANSWAGON brings together reliable workmanship, thoughtful engineering, and skilled craftsmanship across transport, coach building, and fabrication. From the first conversation to the finished work, we focus on creating solutions our customers can depend on.</p>
              <a href="#services" className="text-link">Meet what we do <ArrowRight aria-hidden="true" /></a>
            </div>
          </div>
          <div className="about-footnote"><span>Reliable by design.</span><span>Crafted for the long haul.</span></div>
        </section>

        <section id="services" className="services-section section-pad">
          <div className="section-index"><span>02 / Services</span><span>Four ways to get you there</span></div>
          <div className="services-heading-row"><h2 className="section-heading">Built for<br /><span>what’s next.</span></h2><p>Practical expertise and careful execution, bringing your transport needs to life.</p></div>
          <div className="service-list">
            {services.map((service, index) => (
              <Reveal key={service.number} delay={index * 0.07}>
                <article className="service-row">
                  <span className="service-number">{service.number}</span>
                  <h3>{service.title}</h3>
                  <p>{service.description}</p>
                  <ArrowUpRight className="service-arrow" aria-hidden="true" />
                </article>
              </Reveal>
            ))}
          </div>
        </section>

        <section id="work" className="work-section section-pad">
          <div className="section-index"><span>03 / Our work</span><span>Made with intention</span></div>
          <div className="work-heading-row">
            <h2 className="section-heading">A closer look<br />at <span>the craft.</span></h2>
            <p>Five frames reserved for work that speaks for itself.</p>
          </div>
          <div className="work-grid">
            {workItems.map((label, index) => (
              <Reveal key={label} delay={index * 0.05} className={`work-item work-item-${index + 1}`}>
                <figure className="work-figure" data-photo-placeholder={String(index + 1).padStart(2, "0")}>
                  <div className="photo-placeholder">
                    <span className="photo-corner photo-corner-top">TRANSWAGON / {String(index + 1).padStart(2, "0")}</span>
                    <span className="photo-placeholder-caption">Vehicle body<br />photograph</span>
                    <span className="photo-corner photo-corner-bottom">IMAGE TO BE ADDED</span>
                  </div>
                  <figcaption><span>{String(index + 1).padStart(2, "0")} — {label}</span><ArrowUpRight aria-hidden="true" /></figcaption>
                </figure>
              </Reveal>
            ))}
          </div>
        </section>

        <section className="reasons-section section-pad">
          <div className="section-index"><span>04 / The difference</span><span>Good work, done thoughtfully</span></div>
          <div className="reasons-grid">
            <h2 className="section-heading">Trust is built<br /><span>into the work.</span></h2>
            <div className="reason-list">
              {reasons.map((reason, index) => (
                <Reveal key={reason.title} delay={index * 0.06}>
                  <article className="reason-row"><span className="reason-check"><Check aria-hidden="true" /></span><div><h3>{reason.title}</h3><p>{reason.text}</p></div></article>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        <section id="contact" className="contact-section section-pad">
          <div className="section-index"><span>05 / Contact</span><span>Let’s get moving</span></div>
          <div className="contact-intro"><p className="eyebrow">Your next project starts here</p><h2 className="section-heading">Let’s build<br /><span>something lasting.</span></h2></div>
          <div className="contact-grid">
            <div className="contact-details">
              <a className="contact-item" href="tel:+918197810561"><span>Call us</span><strong>+91 8197810561</strong><ArrowUpRight aria-hidden="true" /></a>
              <a className="contact-item" href="mailto:trans.wagon27@gmail.com"><span>Email us</span><strong>trans.wagon27@gmail.com</strong><ArrowUpRight aria-hidden="true" /></a>
              <a className="contact-item address-item" href="https://www.google.com/maps/dir/?api=1&destination=%2389%2F5%2C+Magadi+Main+Road%2C+Kodigehalli+Post%2C+Segehalli+Village%2C+Bangalore+91" target="_blank" rel="noreferrer"><span>Find us</span><strong>#89/5, Magadi Main Road,<br />Kodigehalli Post, Segehalli Village,<br />Bangalore – 91</strong><ArrowUpRight aria-hidden="true" /></a>
            </div>
            <form className="contact-form" onSubmit={submitContact}>
              <div className="form-heading"><span>Tell us what you have in mind.</span><span>We’ll take it from there.</span></div>
              <label htmlFor="contact-name">Your name</label>
              <input id="contact-name" name="name" autoComplete="name" required placeholder="Name" />
              <label htmlFor="contact-email">Email address</label>
              <input id="contact-email" name="email" type="email" autoComplete="email" required placeholder="you@company.com" />
              <label htmlFor="contact-message">A little about your project</label>
              <textarea id="contact-message" name="message" required rows={3} placeholder="How can we help?" />
              <Button type="submit" size="lg" className="form-submit">Send an enquiry <ArrowUpRight aria-hidden="true" /></Button>
            </form>
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <div className="footer-top"><a className="footer-brand" href="#home"><BrandMark /><span>TRANSWAGON</span></a><p>Engineered for the road.<br />Built for excellence.</p><a className="back-to-top" href="#home">Back to top <ArrowUpRight aria-hidden="true" /></a></div>
        <div className="footer-bottom"><span>© {new Date().getFullYear()} TRANSWAGON</span><span>Bangalore, India</span><a href="mailto:trans.wagon27@gmail.com">trans.wagon27@gmail.com</a></div>
      </footer>
    </>
  );
}

function BrandMark({ compact = false }: { compact?: boolean }) {
  return (
    <span className={`brand-mark${compact ? " brand-mark-compact" : ""}`} aria-hidden="true">
      <span>T</span><span>W</span>
    </span>
  );
}

function Reveal({ children, delay = 0, className = "" }: { children: ReactNode; delay?: number; className?: string }) {
  const reducedMotion = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial={reducedMotion ? false : { opacity: 0, y: 22 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.16 }}
      transition={{ duration: reducedMotion ? 0 : 0.65, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}
