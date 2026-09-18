"use client";
import { useEffect, useState } from "react";
import { useMotion } from "../site/MotionProvider";

export default function RotatingSpecialty({ items }: { items: string[] }) {
  const [index, setIndex] = useState(0);
  const { paused } = useMotion();
  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (paused || reduced.matches || items.length < 2) return;
    const timer = window.setInterval(() => {
      if (!document.hidden && !reduced.matches)
        setIndex((current) => (current + 1) % items.length);
    }, 3600);
    return () => window.clearInterval(timer);
  }, [paused, items.length]);
  return (
    <div className="rotating-specialty">
      <span className="specialty-bracket" aria-hidden="true">
        [
      </span>
      <div>
        <span className="sr-only">{items.join(" · ")}</span>
        <span className="specialty-word" key={index} aria-hidden="true">
          {items[index]}
        </span>
      </div>
      <span className="specialty-bracket" aria-hidden="true">
        ]
      </span>
      <span className="specialty-cursor" aria-hidden="true" />
    </div>
  );
}
