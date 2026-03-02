import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import PixelSnow from "./PixelSnow";

const Gallery = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

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
      <div className="max-w-5xl mx-auto relative z-10 text-center">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <span className="font-sans-body text-xs tracking-monument uppercase text-muted-foreground block mb-6">
            Gallery
          </span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.1, ease: "easeOut" }}
            className="font-serif-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-medium mb-6 tracking-tight"
          >
            Selected Projects
          </motion.h2>
          <motion.div
            initial={{ scaleX: 0 }}
            animate={isInView ? { scaleX: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            className="w-16 h-px divider-bronze mx-auto mb-8"
          />
          <motion.p
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
            className="font-sans-body text-base md:text-lg text-muted-foreground tracking-wide-custom max-w-xl mx-auto mb-12"
          >
            A collection of brand experiences crafted across industries.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
          >
            <Button asChild className="font-sans-body text-xs tracking-monument uppercase px-8">
              <Link to="/gallery">
                View Gallery
              </Link>
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Gallery;
