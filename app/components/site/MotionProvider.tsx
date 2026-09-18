"use client";
import { createContext, useContext, useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";

const MotionContext = createContext({ paused: false, toggle: () => {} });
export const useMotion = () => useContext(MotionContext);

export default function MotionProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [paused, setPaused] = useState(false);
  const root = useRef<HTMLDivElement>(null);
  const path = usePathname();
  useEffect(() => {
    const nodes = root.current?.querySelectorAll<HTMLElement>("[data-reveal]");
    if (!nodes || window.matchMedia("(prefers-reduced-motion: reduce)").matches)
      return;
    const observer = new IntersectionObserver(
      (entries) =>
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("revealed");
            observer.unobserve(entry.target);
          }
        }),
      { threshold: 0.05 },
    );
    nodes.forEach((node) => {
      node.classList.add("reveal-ready");
      observer.observe(node);
    });
    return () => observer.disconnect();
  }, [path]);
  return (
    <MotionContext.Provider
      value={{ paused, toggle: () => setPaused((value) => !value) }}
    >
      <div ref={root} className={paused ? "site motion-paused" : "site"}>
        {children}
      </div>
    </MotionContext.Provider>
  );
}
