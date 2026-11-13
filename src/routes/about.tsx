import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowRight,
  ArrowUpRight,
  Award,
  CheckCircle2,
  ShieldCheck,
  Truck,
  Wrench,
} from "lucide-react";

import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { Button } from "@/components/ui/button";
import { ScrollReveal } from "@/components/ui/scroll-reveal";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About Us | TRANSWAGON - Coach Building & Vehicle Fabrication" },
      {
        name: "description",
        content:
          "Learn about TRANSWAGON: Bangalore's dependable commercial transport solutions, coach building, and custom vehicle fabrication specialists.",
      },
    ],
  }),
  component: AboutPage,
});

function AboutPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteHeader />

      <main className="section-pad">
        {/* Page Top Breadcrumb & Heading */}
        <div className="section-index mb-8">
          <span>About Us</span>
          <span>Crafted for the long haul</span>
        </div>

        <section className="mb-20">
          <p className="eyebrow">Who We Are</p>
          <h1 className="section-heading mb-6 max-w-4xl">
            Where engineering precision meets <span>honest craftsmanship.</span>
          </h1>
          <ScrollReveal
            baseOpacity={0.16}
            enableBlur={true}
            blurStrength={4}
            textClassName="lead-copy max-w-3xl text-lg sm:text-xl text-muted-foreground leading-relaxed"
          >
            TRANSWAGON is a specialized vehicle coach builder and commercial body fabrication
            company based in Bangalore, India. We design, fabricate, and deliver purpose-built
            transport solutions engineered to withstand demanding routes and heavy commercial
            operations.
          </ScrollReveal>
        </section>

        {/* Story Grid */}
        <section className="mb-24 grid grid-cols-1 md:grid-cols-2 gap-12 border-t border-border pt-12">
          <div>
            <h2 className="text-2xl font-bold font-display mb-4">Our Philosophy</h2>
            <ScrollReveal
              baseOpacity={0.2}
              enableBlur={true}
              blurStrength={3}
              textClassName="text-muted-foreground leading-relaxed mb-4"
            >
              We believe a commercial vehicle body is not merely an attachment—it is an investment
              that defines your fleet’s productivity, safety, and longevity.
            </ScrollReveal>
            <ScrollReveal
              baseOpacity={0.2}
              enableBlur={true}
              blurStrength={3}
              textClassName="text-muted-foreground leading-relaxed"
            >
              Every weld, bracket, and corrugated sheet in our facility is calculated for optimal
              load distribution, structural rigidity, and resistance to environmental wear.
            </ScrollReveal>
          </div>
          <div>
            <h2 className="text-2xl font-bold font-display mb-4">The Workshop Standard</h2>
            <ScrollReveal
              baseOpacity={0.2}
              enableBlur={true}
              blurStrength={3}
              textClassName="text-muted-foreground leading-relaxed mb-4"
            >
              Located conveniently off Magadi Main Road in Bangalore, our workshop handles complete
              fabrication lifecycles from chassis mounting and sub-frame fabrication to panel
              beating, anti-corrosive priming, and custom aerodynamic fairing installation.
            </ScrollReveal>
            <ScrollReveal
              baseOpacity={0.2}
              enableBlur={true}
              blurStrength={3}
              textClassName="text-muted-foreground leading-relaxed"
            >
              Whether you are an independent operator needing a single rugged utility body or a
              fleet manager outfitting electric delivery vehicles, TRANSWAGON delivers exact
              specifications on schedule.
            </ScrollReveal>
          </div>
        </section>

        {/* Pillars */}
        <section className="mb-24 bg-muted p-8 md:p-12 border border-border">
          <h2 className="text-2xl font-bold font-display mb-8">Four Core Pillars</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="space-y-3">
              <div className="w-10 h-10 rounded border border-border bg-background flex items-center justify-center">
                <Truck className="w-5 h-5" />
              </div>
              <h3 className="font-semibold text-lg">Heavy-Duty Integrity</h3>
              <p className="text-sm text-muted-foreground">
                High-gauge steel, reinforced cross-members, and vibration-damped sub-structures.
              </p>
            </div>
            <div className="space-y-3">
              <div className="w-10 h-10 rounded border border-border bg-background flex items-center justify-center">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h3 className="font-semibold text-lg">Corrosion Shield</h3>
              <p className="text-sm text-muted-foreground">
                Multi-stage primer and weather-resistant industrial topcoats made for Indian roads.
              </p>
            </div>
            <div className="space-y-3">
              <div className="w-10 h-10 rounded border border-border bg-background flex items-center justify-center">
                <Wrench className="w-5 h-5" />
              </div>
              <h3 className="font-semibold text-lg">Custom Adaptability</h3>
              <p className="text-sm text-muted-foreground">
                Tailored container dimensions, side doors, tie-down rails, and aerodynamic crowns.
              </p>
            </div>
            <div className="space-y-3">
              <div className="w-10 h-10 rounded border border-border bg-background flex items-center justify-center">
                <Award className="w-5 h-5" />
              </div>
              <h3 className="font-semibold text-lg">On-Time Delivery</h3>
              <p className="text-sm text-muted-foreground">
                Disciplined fabrication workflows that respect your commercial timeline.
              </p>
            </div>
          </div>
        </section>

        {/* Redirection Options */}
        <section className="border-t border-border pt-12 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="text-xl font-bold font-display">Ready to explore our craftsmanship?</h3>
            <p className="text-sm text-muted-foreground mt-1">
              Browse real photographs and video walkthroughs of our vehicle builds.
            </p>
          </div>
          <div className="flex flex-wrap gap-4">
            <Button asChild size="lg">
              <Link to="/gallery">
                View Gallery <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link to="/contact">
                Contact Workshop <ArrowUpRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
