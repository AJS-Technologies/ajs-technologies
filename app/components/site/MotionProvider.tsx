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
    const element = root.current;
    if (!element) return;
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const registered = new Set<HTMLElement>();
    const reveal = (node: Element) => node.classList.add("revealed");
    const observer = new IntersectionObserver(
      (entries) =>
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            reveal(entry.target);
            observer.unobserve(entry.target);
          }
        }),
      { threshold: 0.08, rootMargin: "0px 0px -32px 0px" },
    );
    const register = () => {
      element.querySelectorAll<HTMLElement>("[data-reveal]").forEach((node) => {
        if (registered.has(node)) return;
        registered.add(node);
        const siblings = Array.from(node.parentElement?.children ?? []).filter(
          (child) => child.hasAttribute("data-reveal"),
        );
        node.style.setProperty(
          "--reveal-delay",
          `${(siblings.indexOf(node) % 4) * 100}ms`,
        );
        node.classList.add("reveal-ready");
        if (paused || media.matches || node.getBoundingClientRect().bottom <= 0)
          reveal(node);
        else observer.observe(node);
      });
    };
    const showAll = () => {
      if (media.matches) {
        registered.forEach(reveal);
        observer.disconnect();
      }
    };
    const showFocused = (event: FocusEvent) => {
      if (!(event.target instanceof Element)) return;
      // Keyboard navigation must never land in an invisible card or form.
      let node = event.target.closest("[data-reveal]");
      while (node) {
        reveal(node);
        observer.unobserve(node);
        node = node.parentElement?.closest("[data-reveal]") ?? null;
      }
    };
    register();
    // Streaming and client-side navigation can insert sections after this effect.
    const mutations = new MutationObserver(register);
    mutations.observe(element, { childList: true, subtree: true });
    media.addEventListener("change", showAll);
    element.addEventListener("focusin", showFocused);
    return () => {
      observer.disconnect();
      mutations.disconnect();
      media.removeEventListener("change", showAll);
      element.removeEventListener("focusin", showFocused);
    };
  }, [path, paused]);
  useEffect(() => {
    const element = root.current;
    if (!element) return;
    let frame = 0;
    const update = () => {
      frame = 0;
      const height = document.documentElement.scrollHeight - window.innerHeight;
      element.style.setProperty(
        "--scroll-progress",
        String(height > 0 ? window.scrollY / height : 0),
      );
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    update();
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [path]);
  useEffect(() => {
    const element = root.current;
    if (!element) return;
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const fine = window.matchMedia("(pointer: fine)");
    if (paused || media.matches || !fine.matches) return;
    let frame = 0;
    let card: HTMLElement | null = null;
    const move = (event: PointerEvent) => {
      if (media.matches || event.pointerType === "touch") return;
      const target =
        event.target instanceof Element
          ? event.target.closest<HTMLElement>(
              ".service-card, .value-card, .feature-stage, .cta-card",
            )
          : null;
      if (card && target !== card) {
        card.style.removeProperty("--card-x");
        card.style.removeProperty("--card-y");
      }
      card = target;
      cancelAnimationFrame(frame);
      if (!target) return;
      frame = requestAnimationFrame(() => {
        const box = target.getBoundingClientRect();
        target.style.setProperty("--card-x", `${event.clientX - box.left}px`);
        target.style.setProperty("--card-y", `${event.clientY - box.top}px`);
      });
    };
    const leave = () => {
      cancelAnimationFrame(frame);
      if (card) {
        card.style.removeProperty("--card-x");
        card.style.removeProperty("--card-y");
      }
      card = null;
    };
    element.addEventListener("pointermove", move, { passive: true });
    element.addEventListener("pointerleave", leave);
    return () => {
      leave();
      element.removeEventListener("pointermove", move);
      element.removeEventListener("pointerleave", leave);
    };
  }, [paused, path]);
  return (
    <MotionContext.Provider
      value={{ paused, toggle: () => setPaused((value) => !value) }}
    >
      <div ref={root} className={paused ? "site motion-paused" : "site"}>
        <div className="scroll-progress" aria-hidden="true" />
        {children}
      </div>
    </MotionContext.Provider>
  );
}
