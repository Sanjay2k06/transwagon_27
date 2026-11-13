import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, ArrowUpRight, Check, Play } from "lucide-react";

import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { Button } from "@/components/ui/button";
import { ScrollReveal } from "@/components/ui/scroll-reveal";

export const Route = createFileRoute("/gallery")({
  head: () => ({
    meta: [
      { title: "Gallery & Vehicle Builds | TRANSWAGON Bangalore" },
      {
        name: "description",
        content:
          "Browse real vehicle fabrication projects, container bodies, coach builds, and workshop videos by TRANSWAGON Bangalore.",
      },
    ],
  }),
  component: GalleryPage,
});

const galleryItems = [
  {
    id: "01",
    title: "Dual-Tone Commercial Container Body",
    category: "Container Body",
    image: "/images/work-1.jpg",
    specs:
      "Full corrugated walls, dual-color automotive polyurethane finish, rear heavy-duty bumper & fold-down step.",
    application: "Logistics, FMCG delivery & inter-city freight",
  },
  {
    id: "02",
    title: "Heavy-Duty Workshop Utility Body",
    category: "Utility Fabrication",
    image: "/images/work-2.jpg",
    specs:
      "Side access cargo door, reinforced cab-over canopy, lockable flush handles, heavy channel sub-frame.",
    application: "Commercial pickup cargo transport & hardware delivery",
  },
  {
    id: "03",
    title: "Aerodynamic Closed Delivery Van",
    category: "Coach Building",
    image: "/images/work-3.jpg",
    specs:
      "Precision aerodynamic FRP wind deflector, enclosed ribbed body, lower chassis protective under-guard.",
    application: "Express courier, high-efficiency highway transport",
  },
  {
    id: "04",
    title: "Tata Ace EV Custom Cargo Body",
    category: "EV Fabrication",
    image: "/images/work-4.jpg",
    specs:
      "Engineered for electric vehicle chassis, high-clearance overhead air scoop, lightweight high-tensile body.",
    application: "Zero-emission last-mile city distribution",
  },
];

function GalleryPage() {
  const [selectedFilter, setSelectedFilter] = useState("All");

  const filteredItems =
    selectedFilter === "All"
      ? galleryItems
      : galleryItems.filter((item) => item.category === selectedFilter);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteHeader />

      <main className="section-pad">
        {/* Page Top Breadcrumb */}
        <div className="section-index mb-8">
          <span>Vehicle Gallery</span>
          <span>Proof in every build</span>
        </div>

        <section className="mb-14">
          <p className="eyebrow">Portfolio & Workshop</p>
          <h1 className="section-heading mb-4">
            Built for the road. <span>Proven in service.</span>
          </h1>
          <ScrollReveal
            baseOpacity={0.16}
            enableBlur={true}
            blurStrength={4}
            textClassName="lead-copy max-w-3xl text-lg sm:text-xl text-muted-foreground leading-relaxed"
          >
            Explore authentic photographs and video of custom commercial bodies, coach builds, and
            specialized fabrications produced in our Bangalore facility.
          </ScrollReveal>
        </section>

        {/* Featured Video Section - Permanently Muted AutoPlay Walkaround */}
        <section className="mb-20">
          <div className="border border-border bg-muted p-6 md:p-8">
            <div className="mb-6">
              <span className="text-xs uppercase font-semibold tracking-wider text-muted-foreground">
                Featured Build Video
              </span>
              <h2 className="text-xl md:text-2xl font-bold font-display mt-1">
                Workshop Fabrication &amp; Walkaround
              </h2>
            </div>

            <div className="relative aspect-video w-full overflow-hidden rounded border border-border bg-black">
              <video
                src="/images/video.mp4"
                autoPlay
                loop
                muted
                playsInline
                preload="auto"
                poster="/images/work-3.jpg"
                className="w-full h-full object-contain"
              />
            </div>
            <p className="text-xs text-muted-foreground mt-3 flex items-center gap-2">
              <Check className="w-4 h-4 text-primary" /> Genuine footage filmed at the TRANSWAGON
              Magadi Main Road facility.
            </p>
          </div>
        </section>

        {/* Gallery Filters */}
        <section className="mb-12">
          <div className="flex flex-wrap gap-2 border-b border-border pb-4">
            {[
              "All",
              "Container Body",
              "Utility Fabrication",
              "Coach Building",
              "EV Fabrication",
            ].map((category) => (
              <button
                key={category}
                onClick={() => setSelectedFilter(category)}
                className={`px-4 py-2 text-xs font-semibold uppercase tracking-wider transition-colors ${
                  selectedFilter === category
                    ? "bg-foreground text-background"
                    : "bg-muted text-muted-foreground hover:text-foreground"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </section>

        {/* Gallery Cards Grid */}
        <section className="mb-24 grid grid-cols-1 md:grid-cols-2 gap-8">
          {filteredItems.map((item) => (
            <article key={item.id} className="border border-border bg-card overflow-hidden group">
              <div className="relative aspect-[16/10] overflow-hidden bg-muted">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  loading="lazy"
                />
                <span className="absolute top-4 left-4 z-10 bg-black/75 backdrop-blur-md text-white text-[0.62rem] font-bold px-2.5 py-1 rounded tracking-widest uppercase border border-white/10">
                  {item.id} · {item.category}
                </span>
              </div>
              <div className="p-6">
                <h3 className="font-display font-bold text-xl mb-2">{item.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed mb-4">{item.specs}</p>
                <div className="border-t border-border pt-4 flex justify-between items-center text-xs text-muted-foreground">
                  <span>
                    Application: <strong>{item.application}</strong>
                  </span>
                </div>
              </div>
            </article>
          ))}
        </section>

        {/* Redirection Options */}
        <section className="border-t border-border pt-12 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="text-xl font-bold font-display">Need a custom fabrication quote?</h3>
            <p className="text-sm text-muted-foreground mt-1">
              Contact our workshop directly or call +91 8197810561 to discuss your requirements.
            </p>
          </div>
          <div className="flex flex-wrap gap-4">
            <Button asChild size="lg">
              <Link to="/contact">
                Contact Workshop <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link to="/about">
                About TRANSWAGON <ArrowUpRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
