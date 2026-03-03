import React from "react";
import { cn } from "@/lib/utils";

type AmbientMotionBackgroundProps = {
  className?: string;
  /**
   * Overall opacity multiplier for the effect.
   * Keep this low for a subtle, premium look.
   */
  opacity?: number;
};

export default function AmbientMotionBackground({
  className,
  opacity = 0.9,
}: AmbientMotionBackgroundProps) {
  return (
    <div
      aria-hidden="true"
      className={cn("ambient-motion pointer-events-none absolute inset-0 z-0 overflow-hidden", className)}
      style={{ opacity }}
    >
      <div className="ambient-motion__blob ambient-motion__blob--a" />
      <div className="ambient-motion__blob ambient-motion__blob--b" />
      <div className="ambient-motion__grid" />
      <div className="ambient-motion__vignette" />
    </div>
  );
}

