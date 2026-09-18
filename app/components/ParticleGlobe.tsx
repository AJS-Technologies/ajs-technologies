"use client";

import { useEffect, useRef } from "react";

export default function ParticleGlobe({ paused }: { paused: boolean }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const context = canvas.getContext("2d");
    if (!context) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    const points = Array.from({ length: 360 }, (_, i) => {
      const y = 1 - (i / 359) * 2;
      const radius = Math.sqrt(1 - y * y);
      const theta = Math.PI * (3 - Math.sqrt(5)) * i;
      return { x: Math.cos(theta) * radius, y, z: Math.sin(theta) * radius };
    });
    let frame = 0;
    let angle = 0;
    let width = 0;
    let height = 0;
    let visible = true;
    let lastTime = 0;
    const pointer = { x: 0, y: 0 };
    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      const ratio = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = width * ratio;
      canvas.height = height * ratio;
      context.setTransform(ratio, 0, 0, ratio, 0, 0);
    };
    const draw = (time: number) => {
      if (!visible || document.hidden) { frame = 0; return; }
      const delta = Math.min(time - lastTime, 40);
      lastTime = time;
      if (!paused && !reduced.matches) angle += delta * 0.000085;
      context.clearRect(0, 0, width, height);
      const radius = Math.min(width, height) * 0.36;
      const cx = width / 2;
      const cy = height / 2;
      const glow = context.createRadialGradient(cx, cy, 0, cx, cy, radius * 1.45);
      glow.addColorStop(0, "rgba(14, 93, 255, 0.13)");
      glow.addColorStop(0.65, "rgba(16, 79, 243, 0.06)");
      glow.addColorStop(1, "rgba(9, 15, 35, 0)");
      context.fillStyle = glow;
      context.fillRect(0, 0, width, height);
      const rotation = angle + pointer.x;
      const tilt = -0.22 + pointer.y;
      const projected = points.map(p => {
        const x = p.x * Math.cos(rotation) + p.z * Math.sin(rotation);
        const z = -p.x * Math.sin(rotation) + p.z * Math.cos(rotation);
        const y = p.y * Math.cos(tilt) - z * Math.sin(tilt);
        const depth = p.y * Math.sin(tilt) + z * Math.cos(tilt);
        return { x: cx + x * radius, y: cy + y * radius, depth };
      });
      const threshold = radius * 0.19;
      for (let i = 0; i < projected.length; i++) {
        const p = projected[i];
        if (p.depth < -0.1) continue;
        for (let j = i + 1; j < projected.length; j++) {
          const q = projected[j];
          if (q.depth < -0.1) continue;
          const distance = Math.hypot(p.x - q.x, p.y - q.y);
          if (distance < threshold) {
            context.strokeStyle = `rgba(66, 142, 255, ${(1 - distance / threshold) * 0.21 * (p.depth + 0.3)})`;
            context.lineWidth = 0.65;
            context.beginPath(); context.moveTo(p.x, p.y); context.lineTo(q.x, q.y); context.stroke();
          }
        }
      }
      projected.sort((a, b) => a.depth - b.depth).forEach((p, i) => {
        context.beginPath();
        context.arc(p.x, p.y, p.depth > 0.3 && i % 9 === 0 ? 2.4 : 1.25, 0, Math.PI * 2);
        context.fillStyle = `rgba(${p.depth > 0.7 ? "127, 208, 255" : "58, 126, 250"}, ${0.19 + (p.depth + 1) * 0.38})`;
        context.fill();
      });
      if (!paused && !reduced.matches) frame = requestAnimationFrame(draw);
      else frame = 0;
    };
    const start = () => { if (!frame && visible && !document.hidden) frame = requestAnimationFrame(draw); };
    const onResize = () => { resize(); start(); };
    const observer = new ResizeObserver(onResize);
    observer.observe(canvas);
    const intersection = new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; if (visible) start(); });
    intersection.observe(canvas);
    const move = (event: PointerEvent) => {
      if (paused || reduced.matches || event.pointerType === "touch") return;
      const rect = canvas.getBoundingClientRect();
      pointer.x = ((event.clientX - rect.left) / rect.width - 0.5) * 0.45;
      pointer.y = ((event.clientY - rect.top) / rect.height - 0.5) * 0.25;
    };
    resize(); start();
    canvas.addEventListener("pointermove", move);
    reduced.addEventListener("change", start);
    document.addEventListener("visibilitychange", start);
    return () => {
      cancelAnimationFrame(frame); observer.disconnect(); intersection.disconnect();
      canvas.removeEventListener("pointermove", move);
      reduced.removeEventListener("change", start);
      document.removeEventListener("visibilitychange", start);
    };
  }, [paused]);

  return <canvas ref={canvasRef} className="particle-canvas" aria-hidden="true" />;
}
