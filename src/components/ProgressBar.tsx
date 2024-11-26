"use client";
import { useScroll, useSpring } from "framer-motion";
import React from "react";
import { motion } from "framer-motion";

const ProgressBar = () => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <motion.div
      className="fixed bottom-0 left-0 right-0 z-[10000] h-[5px] origin-left bg-primary"
      style={{ scaleX }}
    />
  );
};

// position: fixed;
// bottom: 0;
// left: 0;
// right: 0;
// height: 6px;
// background: #198ab6;
// transform-origin: 0%;
export default ProgressBar;
