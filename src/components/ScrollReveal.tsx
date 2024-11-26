"use client";
import { motion } from "framer-motion";
import { ReactNode, useEffect } from "react";
import { useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";

interface ScrollRevealProps {
  children: ReactNode;
}

const ScrollReveal = ({ children }: ScrollRevealProps) => {
  const controls = useAnimation();
  const [ref, inView] = useInView({ threshold: 0.3 });

  useEffect(() => {
    if (inView) {
      controls.start("visible");
    }
  }, [controls, inView]);

  const isArray = Array.isArray(children);

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={{
        visible: { opacity: 1, y: 0, transition: { duration: 0.8 } },
        hidden: { opacity: 0, y: 50 },
      }}
    >
      {isArray
        ? (children as ReactNode[]).map((child, index) => (
            <motion.div
              key={index}
              initial="hidden"
              animate={controls}
              variants={{
                visible: {
                  opacity: 1,
                  y: 0,
                  transition: { duration: 0.8, delay: index * 0.2 },
                },
                hidden: { opacity: 0, y: 50 },
              }}
            >
              {child}
            </motion.div>
          ))
        : children}{" "}
    </motion.div>
  );
};

export default ScrollReveal;
