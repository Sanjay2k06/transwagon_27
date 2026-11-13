import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowRight,
  ArrowUpRight,
  Box,
  CheckCircle2,
  Cpu,
  Layers,
  MessageCircle,
  Phone,
  ShieldCheck,
  Truck,
  Wrench,
  Zap,
} from "lucide-react";

import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { Button } from "@/components/ui/button";
import { ScrollReveal } from "@/components/ui/scroll-reveal";

export const Route = createFileRoute("/services")({
  head: () => ({
    meta: [
      { title: "Services & Capabilities | TRANSWAGON - Commercial Coach Building & Fabrication" },
      {
        name: "description",
        content:
          "Explore TRANSWAGON manufacturing services: Transport Solutions, Quality Coach Building, General Fabrication, and Custom EV Body Conversions in Bangalore.",
      },
    ],
  }),
  component: ServicesPage,
});

const serviceList = [
  {
    id: "transport-solutions",
    number: "01",
    title: "Transport Solutions",
    subtitle: "Closed Cargo Vans & Dry Freight Container Bodies",
    description:
      "Engineered specifically for FMCG, courier, parcel distribution, and e-commerce logistics fleets. Built with structural ribbed steel panels that maximize volume while keeping unladen curb weight optimal for maximum payload carry.",
    image: "/images/work-1.jpg",
    specs: [
      "Heavy-duty corrugated cold-rolled steel side and front walls",
      "Full perimeter double-lip EPDM automotive weather seals",
      "Reinforced container-style rear cam-lock doors with stainless pins",
      "Chequered steel plate or marine-grade phenolic resin flooring",
      "Integrated aerodynamic cab roof crown to cut fuel drag by up to 12%",
    ],
    idealFor: "Tata Ace, Mahindra Bolero Maxi, Ashok Leyland Dost, Isuzu D-Max",
  },
  {
    id: "coach-building",
    number: "02",
    title: "Quality Coach Building",
    subtitle: "Aerodynamic Cabins, Cowls & Custom Vehicle Enclosures",
    description:
      "From chassis-cowl deliveries to complete driver compartment fabrications, we construct rigid structural safety cages, acoustic insulation, and aerodynamic fairings designed to reduce highway fatigue and optimize wind deflection.",
    image: "/images/work-3.jpg",
    specs: [
      "Structural steel RHS frame welded with certified MIG technology",
      "Aerodynamic curved roof canopies for smooth wind shearing",
      "Vibration-damped chassis mounting with high-tensile fasteners",
      "Thermal and acoustic barrier insulation inside driver compartment",
      "Automotive polyurethane dual-coat finish baked for scratch resistance",
    ],
    idealFor: "Light & Medium Duty Commercial Chassis, Utility Trucks, Fleet Vans",
  },
  {
    id: "general-fabrication",
    number: "03",
    title: "General Fabrication",
    subtitle: "Industrial Steel Frameworks, Utility Racks & Heavy Decking",
    description:
      "Heavy engineering solutions for construction, agricultural, and industrial transport. We build high-tensile drop-side bodies, reinforced flatbeds, crash guards, overhead material racks, and secure underbody equipment lockers.",
    image: "/images/work-2.jpg",
    specs: [
      "Precision cut high-yield structural tubing and channel sections",
      "Foldable drop-side panels with spring-assisted heavy hinges",
      "Zinc-phosphate multi-stage anti-corrosion primer dip and spray",
      "Custom under-chassis lockable toolboxes and spare wheel cradles",
      "ARAI / RTO compliant rear and side under-run protection devices (RUPD/SUPD)",
    ],
    idealFor: "Municipal Contractors, Construction Material Carriers, Heavy Duty Haulers",
  },
  {
    id: "custom-solutions",
    number: "04",
    title: "Custom Vehicle Body Solutions",
    subtitle: "EV Conversions, Refrigerated Boxes & Specialized Fleets",
    description:
      "Bespoke engineering for next-generation electric mobility and temperature-controlled logistics. We adapt lightweight composites, high-density polyurethane insulation, and tailored chassis mounts to modern commercial platforms.",
    image: "/images/work-4.jpg",
    specs: [
      "Ultra-lightweight structural configurations designed for EV range preservation",
      "Custom battery pack clearance and airflow ventilation integration",
      "Insulated sandwich panels for pharmaceutical & cold-chain transport",
      "Mobile workshop setups with interior tool racks, inverters, and lighting",
      "Turnkey CAD prototyping to meet bespoke operational requirements",
    ],
    idealFor: "Tata Ace EV, Mahindra Zor Grand, Euler HiLoad, Specialized Mobile Units",
  },
];

const pillars = [
  {
    icon: ShieldCheck,
    title: "Certified Structural Steel",
    desc: "Every chassis sub-frame is fabricated from high-grade structural steel and stress-tested for maximum payload safety.",
  },
  {
    icon: Zap,
    title: "EV Platform Ready",
    desc: "Weight-optimized designs tailored for commercial electric vehicles to preserve battery range and efficiency.",
  },
  {
    icon: Wrench,
    title: "Bangalore Facility",
    desc: "Our Magadi Main Road workshop is equipped with heavy-duty metal shears, hydraulic press brakes, and paint booths.",
  },
  {
    icon: CheckCircle2,
    title: "Direct Engineering Support",
    desc: "Work directly with our master fabricators for exact dimensioning, custom fixtures, and fleet consistency.",
  },
];

function ServicesPage() {
  function getWhatsAppUrl(serviceTitle: string) {
    const text = `Hello TRANSWAGON, I would like to get a quote and timeline for your service: "${serviceTitle}". Please contact me with details.`;
    return `https://wa.me/918197810561?text=${encodeURIComponent(text)}`;
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteHeader />

      <main className="section-pad">
        {/* Page Top Breadcrumb */}
        <div className="section-index mb-8">
          <span>Services &amp; Capabilities</span>
          <span>Engineered for commercial duty</span>
        </div>

        {/* Page Heading */}
        <section className="mb-20">
          <p className="eyebrow">Manufacturing Pillars</p>
          <h1 className="section-heading mb-6 max-w-4xl">
            Bespoke engineering for every <span>fleet specification.</span>
          </h1>
          <ScrollReveal
            baseOpacity={0.16}
            enableBlur={true}
            blurStrength={4}
            textClassName="lead-copy max-w-3xl text-lg sm:text-xl text-muted-foreground leading-relaxed"
          >
            From single-vehicle owner-operators to enterprise distribution fleets, TRANSWAGON
            combines heavy industrial steel fabrication, precision coach building, and modern
            commercial transport solutions in Bangalore.
          </ScrollReveal>
        </section>

        {/* Technical Value Pillars */}
        <section className="mb-24 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {pillars.map((item) => (
            <div
              key={item.title}
              className="p-6 border border-border bg-card flex flex-col justify-between"
            >
              <div>
                <item.icon className="h-6 w-6 text-foreground mb-4" />
                <h2 className="text-base font-bold font-display uppercase tracking-tight mb-2">
                  {item.title}
                </h2>
                <p className="text-xs text-muted-foreground leading-relaxed">{item.desc}</p>
              </div>
            </div>
          ))}
        </section>

        {/* Comprehensive Services List */}
        <section className="mb-24 space-y-20 border-t border-border pt-16">
          {serviceList.map((service, idx) => (
            <div
              key={service.id}
              id={service.id}
              className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start border-b border-border pb-16 last:border-b-0"
            >
              {/* Number and Meta */}
              <div className="lg:col-span-1">
                <span className="font-mono text-2xl font-black text-muted-foreground">
                  {service.number}
                </span>
              </div>

              {/* Description & Technical Specs */}
              <div className="lg:col-span-6 space-y-6">
                <div>
                  <span className="text-xs uppercase font-mono tracking-widest text-muted-foreground block mb-1">
                    {service.subtitle}
                  </span>
                  <h2 className="text-2xl sm:text-3xl font-display font-black uppercase tracking-tight">
                    {service.title}
                  </h2>
                </div>

                <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                  {service.description}
                </p>

                <div className="p-5 bg-muted/60 border border-border space-y-3">
                  <span className="text-xs font-mono uppercase font-bold tracking-wider text-foreground block">
                    Engineering Specifications:
                  </span>
                  <ul className="space-y-2">
                    {service.specs.map((spec, i) => (
                      <li
                        key={i}
                        className="flex items-start gap-2.5 text-xs text-muted-foreground"
                      >
                        <span className="h-1.5 w-1.5 rounded-full bg-foreground shrink-0 mt-1.5" />
                        <span>{spec}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="pt-3 border-t border-border text-xs text-muted-foreground">
                    <strong className="text-foreground">Chassis Compatibility:</strong>{" "}
                    {service.idealFor}
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-4 pt-2">
                  <Button asChild size="lg" className="font-bold uppercase tracking-wider">
                    <a
                      href={getWhatsAppUrl(service.title)}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-2"
                    >
                      <MessageCircle className="h-4 w-4" />
                      <span>Enquire on WhatsApp</span>
                    </a>
                  </Button>
                  <Button
                    asChild
                    variant="outline"
                    size="lg"
                    className="font-semibold uppercase text-xs"
                  >
                    <Link to="/contact">Request Detailed Spec Sheet</Link>
                  </Button>
                </div>
              </div>

              {/* Service Imagery */}
              <div className="lg:col-span-5">
                <div className="relative aspect-[4/3] overflow-hidden border border-border bg-muted">
                  <img
                    src={service.image}
                    alt={service.title}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                  <div className="absolute top-3 left-3 bg-black/80 px-2.5 py-1 text-[10px] font-mono text-white uppercase tracking-wider">
                    TRANSWAGON // {service.number}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </section>

        {/* Bottom CTA Banner */}
        <section className="p-8 sm:p-12 border border-border bg-card flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="max-w-xl">
            <span className="text-xs font-mono uppercase tracking-widest text-muted-foreground">
              Direct Engineering Consultation
            </span>
            <h2 className="text-2xl sm:text-3xl font-display font-black uppercase mt-1">
              Have a unique chassis or fleet requirement?
            </h2>
            <ScrollReveal
              baseOpacity={0.2}
              enableBlur={true}
              blurStrength={3}
              textClassName="text-sm text-muted-foreground mt-2 leading-relaxed"
            >
              Bring your vehicle or drawings to our Bangalore facility for precise measurements,
              payload estimations, and transparent turn-around timelines.
            </ScrollReveal>
          </div>
          <div className="flex flex-wrap items-center gap-4 shrink-0">
            <Button asChild size="lg">
              <Link to="/contact">
                Visit Our Workshop <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link to="/gallery">
                View Gallery <ArrowUpRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
