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

  // More dramatic movement with slow-mo easing - increased range for more apparent movement
  const y = useTransform(scrollYProgress, [0, 1], ["-25%", "25%"], {
    ease: (t) => t * t * (3 - 2 * t), // Smooth step easing for slow-mo feel
  });
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0], {
    ease: (t) => t * t * (3 - 2 * t),
  });

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
