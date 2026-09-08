"use client";

import { motion } from "framer-motion";

export default function FuturisticBackground() {
  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden motion-reduce:[&_*]:!animate-none">
      <div className="absolute inset-0 bg-gradient-to-b from-[#0a0f0a] via-[#0d120d] to-[#080808]" />

      <div className="absolute top-0 left-1/3 h-[300px] w-[300px] rounded-full bg-[#4ade80]/8 blur-[100px] sm:h-[600px] sm:w-[600px] sm:blur-[140px]" />
      <div className="absolute top-40 right-1/4 h-[250px] w-[250px] rounded-full bg-[#22c55e]/6 blur-[80px] sm:h-[500px] sm:w-[500px] sm:blur-[120px]" />
      <div className="absolute bottom-1/3 left-1/4 h-[200px] w-[200px] rounded-full bg-[#16a34a]/8 blur-[60px] sm:h-[400px] sm:w-[400px] sm:blur-[100px]" />

      <div
        className="absolute inset-0 opacity-[0.015]"
        style={{
          backgroundImage:
            "radial-gradient(circle at 1px 1px, rgba(134,239,172,0.8) 1px, transparent 0)",
          backgroundSize: "48px 48px",
        }}
      />

      <div
        className="absolute bottom-0 left-0 right-0 h-[35vh] opacity-25"
        style={{
          background: "linear-gradient(transparent 0%, rgba(74,222,128,0.06) 100%)",
          maskImage: "linear-gradient(to bottom, transparent, black 40%, black 100%)",
        }}
      >
        <svg className="h-full w-full" viewBox="0 0 1200 400" preserveAspectRatio="none" aria-hidden>
          <defs>
            <pattern id="grid" width="60" height="60" patternUnits="userSpaceOnUse">
              <path
                d="M 60 0 L 0 0 0 60"
                fill="none"
                stroke="rgba(74,222,128,0.15)"
                strokeWidth="0.5"
              />
            </pattern>
          </defs>
          <rect width="1200" height="400" fill="url(#grid)" />
        </svg>
      </div>

      {[
        { className: "left-[8%] top-[18%]", delay: 0 },
        { className: "right-[12%] top-[22%]", delay: 1.2 },
        { className: "left-[15%] bottom-[28%]", delay: 0.6 },
      ].map((shape, i) => (
        <motion.div
          key={i}
          className={`absolute ${shape.className}`}
          animate={{ y: [0, -14, 0], opacity: [0.3, 0.6, 0.3] }}
          transition={{
            duration: 5 + i,
            repeat: Infinity,
            ease: "easeInOut",
            delay: shape.delay,
          }}
        >
          <div
            className="h-2 w-2 rounded-full bg-[#4ade80]/40 sm:h-3 sm:w-3"
            style={{ boxShadow: "0 0 12px rgba(74,222,128,0.5)" }}
          />
        </motion.div>
      ))}
    </div>
  );
}
