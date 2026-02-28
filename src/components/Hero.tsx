import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import logo from "@/assets/logo.png";
import abstractHero from "@/assets/abstract-hero.jpg";

const Hero = () => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  // More dramatic movement with slow-mo easing - increased range for more apparent movement
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "50%"], {
    ease: (t) => t * t * (3 - 2 * t), // Smooth step easing for slow-mo feel
  });
  const contentOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0], {
    ease: (t) => t * t * (3 - 2 * t),
  });
  const contentY = useTransform(scrollYProgress, [0, 0.5], [0, -50], {
    ease: (t) => t * t * (3 - 2 * t),
  });

  return (
    <section ref={ref} className="relative min-h-screen flex flex-col items-center justify-center px-6 md:px-12 lg:px-24 overflow-hidden">
      {/* Background image with parallax */}
      <motion.div
        style={{ y: bgY }}
        className="absolute inset-0 -top-[10%] -bottom-[10%]"
      >
        <img
          src={abstractHero}
          alt=""
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-background/70" />
        {/* Bottom gradient fade */}
        <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-background to-transparent" />
        {/* Top gradient fade */}
        <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-background to-transparent" />
      </motion.div>

      {/* Content */}
      <motion.div
        style={{ opacity: contentOpacity, y: contentY }}
        className="relative z-10 flex flex-col items-center"
      >
        {/* Logo - BIGGER */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          className="mb-10 sm:mb-12 md:mb-14 lg:mb-18"
        >
          <img src={logo} alt="Averbuch Foundation" className="h-32 sm:h-40 md:h-56 lg:h-64 xl:h-80 w-auto opacity-90" />
        </motion.div>

        {/* Gold divider */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 1, delay: 0.4, ease: "easeOut" }}
          className="w-16 h-px divider-bronze mb-12 md:mb-16"
        />

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.6, ease: "easeOut" }}
          className="font-serif-display text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl 2xl:text-7xl font-medium text-center max-w-5xl leading-[1.1] tracking-tight px-4"
        >
          Engineering Digital Infrastructure
          <br className="hidden sm:block" />
          {" "}for Modern Brands.
        </motion.h1>

        {/* Subtext */}
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.9, ease: "easeOut" }}
          className="mt-6 sm:mt-8 md:mt-10 text-muted-foreground text-sm sm:text-base md:text-lg font-sans-body tracking-wide-custom text-center max-w-2xl leading-relaxed px-4"
        >
          We design and develop high performance websites built for scale.
        </motion.p>

        {/* Inquire link */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.3, ease: "easeOut" }}
          className="mt-12 sm:mt-14 md:mt-16 lg:mt-20"
        >
          <a
            href="#inquire"
            onClick={(e) => {
              e.preventDefault();
              const inquireSection = document.getElementById("inquire");
              if (inquireSection) {
                inquireSection.scrollIntoView({ behavior: "smooth" });
              }
            }}
            className="font-sans-body text-xs tracking-monument uppercase text-muted-foreground hover:text-foreground transition-colors duration-500"
          >
            Inquire
          </a>
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.3 }}
        transition={{ duration: 1, delay: 2, ease: "easeOut" }}
        className="absolute bottom-12 left-1/2 -translate-x-1/2 z-10"
      >
        <div className="w-px h-12 divider-bronze" />
      </motion.div>
    </section>
  );
};

export default Hero;
