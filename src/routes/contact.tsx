import { useState, type FormEvent } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowRight,
  ArrowUpRight,
  CheckCircle2,
  Instagram,
  Mail,
  MapPin,
  MessageCircle,
  Phone,
} from "lucide-react";

import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { Button } from "@/components/ui/button";
import { ScrollReveal } from "@/components/ui/scroll-reveal";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact Us | TRANSWAGON Bangalore - 8197810561" },
      {
        name: "description",
        content:
          "Contact TRANSWAGON for commercial vehicle body building, fabrication, and custom coach work in Bangalore. Call 8197810561.",
      },
    ],
  }),
  component: ContactPage,
});

function ContactPage() {
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const name = String(data.get("name") ?? "").trim();
    const phone = String(data.get("phone") ?? "").trim();
    const email = String(data.get("email") ?? "").trim();
    const vehicleType = String(data.get("vehicleType") ?? "").trim();
    const message = String(data.get("message") ?? "").trim();

    const formattedMessage = [
      "Hello TRANSWAGON,",
      "",
      "New Vehicle Body / Fabrication Enquiry:",
      `Name: ${name}`,
      `Phone: ${phone}`,
      `Email: ${email}`,
      `Vehicle Model / Type: ${vehicleType || "Commercial Body"}`,
      `Requirement: ${message}`,
      "",
      "Please share quotation and timeline.",
    ].join("\n");

    const whatsappUrl = `https://wa.me/918197810561?text=${encodeURIComponent(formattedMessage)}`;
    const opened = window.open(whatsappUrl, "_blank");
    if (!opened) {
      window.location.href = whatsappUrl;
    }
    setSubmitted(true);
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteHeader />

      <main className="section-pad">
        {/* Page Top Breadcrumb */}
        <div className="section-index mb-8">
          <span>Contact Us</span>
          <span>Let’s get moving</span>
        </div>

        <section className="mb-14">
          <p className="eyebrow">Get in Touch</p>
          <h1 className="section-heading mb-4">
            Let’s build <span>something lasting.</span>
          </h1>
          <ScrollReveal
            baseOpacity={0.16}
            enableBlur={true}
            blurStrength={4}
            textClassName="lead-copy max-w-3xl text-lg sm:text-xl text-muted-foreground leading-relaxed"
          >
            Have a project in mind, need a consultation on chassis specifications, or want to
            inspect our workshop in Bangalore? Reach out through any of our channels below.
          </ScrollReveal>
        </section>

        {/* Contact Grid */}
        <section className="mb-24 grid grid-cols-1 lg:grid-cols-2 gap-12 border-t border-border pt-12">
          {/* Contact Details List */}
          <div className="space-y-4">
            <h2 className="text-xl font-bold font-display mb-6">Direct Channels</h2>

            <a
              href="tel:+918197810561"
              className="group block p-6 border border-border bg-card hover:border-foreground transition-colors"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded border border-border flex items-center justify-center bg-muted text-primary">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-xs uppercase font-medium text-muted-foreground">
                      Phone Call
                    </span>
                    <strong className="block text-lg font-bold">+91 8197810561</strong>
                  </div>
                </div>
                <ArrowUpRight className="w-5 h-5 text-muted-foreground group-hover:text-foreground group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
              </div>
            </a>

            <a
              href="https://wa.me/918197810561?text=Hi%20TRANSWAGON%2C%20I%20would%20like%20to%20enquire%20about%20vehicle%20body%20fabrication."
              target="_blank"
              rel="noreferrer"
              className="group block p-6 border border-border bg-card hover:border-foreground transition-colors"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded border border-border flex items-center justify-center bg-muted text-green-600">
                    <MessageCircle className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-xs uppercase font-medium text-muted-foreground">
                      WhatsApp Chat
                    </span>
                    <strong className="block text-lg font-bold">+91 8197810561</strong>
                  </div>
                </div>
                <ArrowUpRight className="w-5 h-5 text-muted-foreground group-hover:text-foreground group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
              </div>
            </a>

            <a
              href="https://www.instagram.com/trans.wagon27?utm_source=qr&igsh=MWoxbnNsa3lrcjJkbQ%3D%3D"
              target="_blank"
              rel="noreferrer"
              className="group block p-6 border border-border bg-card hover:border-foreground transition-colors"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded border border-border flex items-center justify-center bg-muted text-pink-600">
                    <Instagram className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-xs uppercase font-medium text-muted-foreground">
                      Instagram Official
                    </span>
                    <strong className="block text-lg font-bold">@trans.wagon27</strong>
                  </div>
                </div>
                <ArrowUpRight className="w-5 h-5 text-muted-foreground group-hover:text-foreground group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
              </div>
            </a>

            <a
              href="mailto:trans.wagon27@gmail.com"
              className="group block p-6 border border-border bg-card hover:border-foreground transition-colors"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded border border-border flex items-center justify-center bg-muted text-blue-600">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-xs uppercase font-medium text-muted-foreground">
                      Email Enquiry
                    </span>
                    <strong className="block text-lg font-bold">trans.wagon27@gmail.com</strong>
                  </div>
                </div>
                <ArrowUpRight className="w-5 h-5 text-muted-foreground group-hover:text-foreground group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
              </div>
            </a>

            <a
              href="https://www.google.com/maps/dir/?api=1&destination=%2389%2F5%2C+Magadi+Main+Road%2C+Kodigehalli+Post%2C+Segehalli+Village%2C+Bangalore+91"
              target="_blank"
              rel="noreferrer"
              className="group block p-6 border border-border bg-card hover:border-foreground transition-colors"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded border border-border flex items-center justify-center bg-muted text-amber-600 shrink-0">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-xs uppercase font-medium text-muted-foreground">
                      Workshop Address
                    </span>
                    <strong className="block text-base font-semibold leading-relaxed mt-1">
                      #89/5, Magadi Main Road, Kodigehalli Post, Segehalli Village, Bangalore – 91
                    </strong>
                    <span className="text-xs text-muted-foreground block mt-1">
                      Mon – Sat: 9:00 AM – 7:30 PM
                    </span>
                  </div>
                </div>
                <ArrowUpRight className="w-5 h-5 text-muted-foreground group-hover:text-foreground group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform shrink-0" />
              </div>
            </a>
          </div>

          {/* Contact Form */}
          <div className="border border-border bg-card p-8">
            <h2 className="text-xl font-bold font-display mb-2">Send an Enquiry</h2>
            <p className="text-sm text-muted-foreground mb-6">
              Fill out this form and our engineers will get back to you with timelines and
              estimations.
            </p>

            {submitted ? (
              <div className="p-6 bg-muted border border-border rounded text-center space-y-3">
                <CheckCircle2 className="w-10 h-10 text-primary mx-auto" />
                <h3 className="font-bold text-lg">Thank You for Your Enquiry!</h3>
                <p className="text-sm text-muted-foreground">
                  WhatsApp has been prepared with your vehicle enquiry details for +91 8197810561.
                  You can also call us directly at{" "}
                  <a href="tel:+918197810561" className="underline font-semibold text-foreground">
                    +91 8197810561
                  </a>
                  .
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label
                    htmlFor="name"
                    className="block text-xs font-semibold uppercase text-muted-foreground mb-1"
                  >
                    Your Name *
                  </label>
                  <input
                    id="name"
                    name="name"
                    required
                    placeholder="Enter your name"
                    className="w-full border border-border bg-background p-3 text-sm focus:outline-none focus:border-foreground"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label
                      htmlFor="phone"
                      className="block text-xs font-semibold uppercase text-muted-foreground mb-1"
                    >
                      Phone Number *
                    </label>
                    <input
                      id="phone"
                      name="phone"
                      type="tel"
                      required
                      placeholder="+91 XXXXX XXXXX"
                      className="w-full border border-border bg-background p-3 text-sm focus:outline-none focus:border-foreground"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="email"
                      className="block text-xs font-semibold uppercase text-muted-foreground mb-1"
                    >
                      Email Address *
                    </label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      required
                      placeholder="you@company.com"
                      className="w-full border border-border bg-background p-3 text-sm focus:outline-none focus:border-foreground"
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="vehicleType"
                    className="block text-xs font-semibold uppercase text-muted-foreground mb-1"
                  >
                    Vehicle Model / Fabrication Type
                  </label>
                  <input
                    id="vehicleType"
                    name="vehicleType"
                    placeholder="e.g. Tata Ace EV, Container Body, Pickup Box"
                    className="w-full border border-border bg-background p-3 text-sm focus:outline-none focus:border-foreground"
                  />
                </div>

                <div>
                  <label
                    htmlFor="message"
                    className="block text-xs font-semibold uppercase text-muted-foreground mb-1"
                  >
                    Project Details *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={4}
                    required
                    placeholder="Describe dimensions, payload requirements, materials, or special fixtures..."
                    className="w-full border border-border bg-background p-3 text-sm focus:outline-none focus:border-foreground resize-vertical"
                  />
                </div>

                <Button
                  type="submit"
                  size="lg"
                  className="w-full font-bold uppercase tracking-wider"
                >
                  Send an Enquiry
                </Button>
              </form>
            )}
          </div>
        </section>

        {/* Bottom Redirection Bar */}
        <section className="border-t border-border pt-12 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="text-xl font-bold font-display">Need inspiration for your build?</h3>
            <p className="text-sm text-muted-foreground mt-1">
              Review our recent commercial vehicles and fabrication portfolio.
            </p>
          </div>
          <div className="flex flex-wrap gap-4">
            <Button asChild size="lg">
              <Link to="/gallery">
                View Vehicle Gallery <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link to="/about">
                About Our Workshop <ArrowUpRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
