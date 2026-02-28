import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import PixelSnow from "./PixelSnow";

const statements = [
  "We believe digital infrastructure should be invisible yet powerful, built for decades not trends.",
  "Our vision is to become the go-to foundation for brands that refuse to compromise on quality.",
  "We architect digital experiences that compound in value over time through precision engineering.",
];

const Philosophy = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="px-6 md:px-12 lg:px-24 py-24 md:py-36 lg:py-48 bg-surface relative">
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
      <div className="max-w-4xl mx-auto relative z-10">
        {/* Section label */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="mb-20 md:mb-28"
        >
          <span className="font-sans-body text-xs tracking-monument uppercase text-muted-foreground block text-center">
            Foundation
          </span>
        </motion.div>

        {/* Statements */}
        <div className="space-y-12 sm:space-y-14 md:space-y-16 lg:space-y-24">
          {statements.map((statement, i) => (
            <StatementBlock key={i} text={statement} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
};

const StatementBlock = ({ text, index }: { text: string; index: number }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <div ref={ref}>
      {index > 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
          className="flex justify-center mb-16 md:mb-24"
        >
          <div className="w-1 h-1 rounded-full divider-bronze" />
        </motion.div>
      )}
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
        className="font-serif-display text-base sm:text-lg md:text-xl lg:text-2xl xl:text-[1.65rem] font-normal leading-relaxed text-secondary-foreground text-center px-4"
      >
        {text}
      </motion.p>
    </div>
  );
};

export default Philosophy;
