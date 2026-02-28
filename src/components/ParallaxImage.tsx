import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

interface ParallaxImageProps {
  src: string;
  alt: string;
  height?: string;
  overlayOpacity?: number;
}

const ParallaxImage = ({ src, alt, height = "60vh", overlayOpacity = 0.55 }: ParallaxImageProps) => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["-15%", "15%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0]);

  return (
    <div
      ref={ref}
      className="relative overflow-hidden"
      style={{ height }}
    >
      <motion.div
        style={{ y }}
        className="absolute inset-0 -top-[20%] -bottom-[20%]"
      >
        <img
          src={src}
          alt={alt}
          className="w-full h-full object-cover"
          loading="lazy"
        />
      </motion.div>
      {/* Dark overlay for blending */}
      <motion.div
        style={{ opacity }}
        className="absolute inset-0"
      >
        <div
          className="absolute inset-0 bg-background"
          style={{ opacity: overlayOpacity }}
        />
      </motion.div>
    </div>
  );
};

export default ParallaxImage;
