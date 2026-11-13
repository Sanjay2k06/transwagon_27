import { Link } from "@tanstack/react-router";
import { ArrowUpRight, Instagram } from "lucide-react";

import { BrandMark } from "./BrandMark";

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="footer-top">
        <Link className="footer-brand" to="/">
          <BrandMark variant="white" />
          <span>TRANSWAGON</span>
        </Link>
        <p>
          Engineered for the road.
          <br />
          Quality coach builders &amp; general fabricators.
        </p>
        <div className="flex flex-wrap gap-4 text-xs font-semibold uppercase tracking-wider text-muted-foreground my-2 sm:my-0">
          <Link to="/" className="hover:text-white transition-colors">
            Home
          </Link>
          <Link to="/about" className="hover:text-white transition-colors">
            About
          </Link>
          <Link to="/services" className="hover:text-white transition-colors">
            Services
          </Link>
          <Link to="/gallery" className="hover:text-white transition-colors">
            Gallery
          </Link>
          <Link to="/contact" className="hover:text-white transition-colors">
            Contact
          </Link>
        </div>
        <a className="back-to-top" href="#home">
          Back to top <ArrowUpRight aria-hidden="true" />
        </a>
      </div>
      <div className="footer-bottom">
        <span>© {new Date().getFullYear()} TRANSWAGON</span>
        <span>Bangalore, India</span>
        <a href="tel:+918197810561">+91 8197810561</a>
        <a
          href="https://www.instagram.com/trans.wagon27?utm_source=qr&igsh=MWoxbnNsa3lrcjJkbQ%3D%3D"
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-1 hover:text-white"
        >
          <Instagram className="h-3 w-3" /> @trans.wagon27
        </a>
        <a href="mailto:trans.wagon27@gmail.com">trans.wagon27@gmail.com</a>
      </div>
    </footer>
  );
}
