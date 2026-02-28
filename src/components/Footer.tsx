import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import footerLogo from "@/assets/footer-logo.png";

const Footer = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const location = useLocation();

  const handleStudioClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleInquireClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    if (location.pathname !== "/") {
      // If not on home page, navigate to home first
      window.location.href = "/#inquire";
    } else {
      // If on home page, scroll to inquire section
      const inquireSection = document.getElementById("inquire");
      if (inquireSection) {
        inquireSection.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  return (
    <footer ref={ref} className="border-t border-bronze px-6 md:px-12 lg:px-24 py-16 md:py-24">
      <motion.div
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        transition={{ duration: 1, ease: "easeOut" }}
        className="max-w-5xl mx-auto text-center"
      >
        {/* Signature with logo */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-3 mb-8 sm:mb-10 md:mb-12">
          <img src={footerLogo} alt="Averbuch Foundation" className="h-6 sm:h-7 md:h-8 w-auto opacity-80" />
          <p className="font-serif-display text-sm sm:text-base md:text-lg text-foreground italic opacity-80 text-center sm:text-left">
            Built to Last. Designed to Lead.
          </p>
        </div>

        {/* Links */}
        <nav className="flex flex-wrap justify-center gap-4 sm:gap-6 md:gap-8 lg:gap-12">
          <a
            href="#"
            onClick={handleStudioClick}
            className="font-sans-body text-xs tracking-monument uppercase text-muted-foreground hover:text-foreground transition-colors duration-500"
          >
            Studio
          </a>
          <a
            href="#inquire"
            onClick={handleInquireClick}
            className="font-sans-body text-xs tracking-monument uppercase text-muted-foreground hover:text-foreground transition-colors duration-500"
          >
            Inquire
          </a>
          <Link
            to="/applications"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="font-sans-body text-xs tracking-monument uppercase text-muted-foreground hover:text-foreground transition-colors duration-500"
          >
            Applications
          </Link>
          <Link
            to="/legal"
              className="font-sans-body text-xs tracking-monument uppercase text-muted-foreground hover:text-foreground transition-colors duration-500"
            >
            Legal
          </Link>
        </nav>

        {/* Contact Information */}
        <div className="mt-8 sm:mt-10 md:mt-12 lg:mt-16">
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 md:gap-6 lg:gap-8 text-xs sm:text-sm">
            <a
              href="tel:+16696390988"
              className="font-sans-body text-muted-foreground hover:text-foreground transition-colors duration-500 break-all sm:break-normal"
            >
              +1 (669) - 639 - 0988
            </a>
            <span className="hidden sm:inline text-muted-foreground opacity-50">•</span>
            <a
              href="mailto:eldarowfn@gmail.com"
              className="font-sans-body text-muted-foreground hover:text-foreground transition-colors duration-500 break-all sm:break-normal"
            >
              eldarowfn@gmail.com
            </a>
          </div>
        </div>

        <div className="mt-12 sm:mt-14 md:mt-16 lg:mt-24 pt-6 sm:pt-8 border-t border-border">
          <p className="font-sans-body text-xs text-muted-foreground tracking-wide-custom opacity-50 px-4">
            © {new Date().getFullYear()} Averbuch Foundation. All rights reserved.
          </p>
        </div>
      </motion.div>
    </footer>
  );
};

export default Footer;
