import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import PixelSnow from "./PixelSnow";

const capabilities = [
  {
    title: "Website Architecture",
    description: "Structural digital frameworks engineered for longevity, performance, and seamless scalability.",
  },
  {
    title: "Brand Systems",
    description: "Cohesive identity systems that unify every touchpoint with precision and strategic clarity.",
  },
  {
    title: "eCommerce Development",
    description: "Transaction platforms built for conversion integrity, operational efficiency, and sustained growth.",
  },
  {
    title: "Performance Optimization",
    description: "Systematic refinement of speed, accessibility, and technical infrastructure at every layer.",
  },
];

const CapabilityItem = ({ title, description, index }: { title: string; description: string; index: number }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, delay: index * 0.15, ease: "easeOut" }}
      className="py-10 md:py-14"
    >
      <div className="flex flex-col items-center text-center gap-3 sm:gap-4 px-4">
        <h3 className="font-serif-display text-lg sm:text-xl md:text-2xl lg:text-3xl font-medium tracking-tight">
          {title}
        </h3>
        <p className="font-sans-body text-muted-foreground text-sm sm:text-base max-w-md leading-relaxed tracking-wide-custom">
          {description}
        </p>
      </div>
    </motion.div>
  );
};

const Capabilities = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <section className="px-6 md:px-12 lg:px-24 py-24 md:py-36 lg:py-48 relative">
      <div className="absolute inset-0 z-0">
        <PixelSnow 
          color="#ffffff"
          flakeSize={0.003}
          minFlakeSize={1.0}
          pixelResolution={4000}
          speed={0.08}
          density={0.8}
          direction={175}
          brightness={2.1}
          depthFade={15}
          farPlane={12}
          gamma={0.4545}
          variant="round"
        />
      </div>
      <div className="max-w-5xl mx-auto relative z-10">
        {/* Section label */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="mb-16 md:mb-24"
        >
          <span className="font-sans-body text-xs tracking-monument uppercase text-muted-foreground block text-center">
            Core Capabilities
          </span>
        </motion.div>

        {/* Capabilities list */}
        <div className="divide-y divide-border">
          {capabilities.map((cap, i) => (
            <CapabilityItem key={cap.title} {...cap} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Capabilities;
