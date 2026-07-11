"use client";

import { useEffect, useRef, useState } from "react";

// Envelope determinístico (sem random → estável no SSR), com cara de voz.
const BARS = 96;
const HEIGHTS = Array.from({ length: BARS }, (_, i) => {
  const t = i / BARS;
  const env = 0.55 + 0.45 * Math.sin(t * Math.PI); // mais "cheio" no meio
  const detail =
    0.5 +
    0.5 *
      Math.abs(
        Math.sin(i * 0.7) * 0.55 +
          Math.sin(i * 0.27 + 1.1) * 0.3 +
          Math.sin(i * 1.9 + 0.4) * 0.15
      );
  return Math.max(0.12, Math.min(1, env * detail));
});

function useReducedMotion() {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const m = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(m.matches);
  }, []);
  return reduced;
}

export default function Waveform({
  percent,
  pt,
  en,
  effects,
}: {
  percent: number;
  pt: number;
  en: number;
  effects: number;
}) {
  const reduced = useReducedMotion();
  const [shown, setShown] = useState(0);
  const [lit, setLit] = useState(false);
  const raf = useRef<number>(0);

  useEffect(() => {
    if (reduced) {
      setShown(percent);
      setLit(true);
      return;
    }
    setLit(true);
    const dur = 1100;
    let start: number | null = null;
    const tick = (ts: number) => {
      if (start === null) start = ts;
      const p = Math.min(1, (ts - start) / dur);
      const eased = 1 - Math.pow(1 - p, 3);
      setShown(Math.round(eased * percent));
      if (p < 1) raf.current = requestAnimationFrame(tick);
    };
    raf.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf.current);
  }, [percent, reduced]);

  const nf = (n: number) => n.toLocaleString("pt-BR");

  return (
    <div>
      {/* Número + rótulo */}
      <div className="flex items-end justify-between gap-4">
        <div className="flex items-baseline gap-3">
          <span className="font-display text-6xl font-black leading-none tracking-tight tnum sm:text-7xl">
            {shown}
            <span className="text-3xl text-muted sm:text-4xl">%</span>
          </span>
          <span className="max-w-[9rem] text-sm leading-tight text-muted">
            das falas já estão em português
          </span>
        </div>
      </div>

      {/* Forma de onda */}
      <div className="relative mt-6">
        <div className="flex h-28 items-center gap-[3px] sm:h-36">
          {HEIGHTS.map((h, i) => {
            const pos = (i / BARS) * 100;
            const dubbed = pos <= percent;
            return (
              <span
                key={i}
                className="flex-1 rounded-[2px] origin-center"
                style={{
                  height: `${h * 100}%`,
                  background: dubbed
                    ? `color-mix(in oklab, var(--brand-green) ${55 + h * 45}%, transparent)`
                    : "color-mix(in oklab, var(--muted) 22%, transparent)",
                  transform: lit ? "scaleY(1)" : "scaleY(0.04)",
                  transition: "transform 620ms cubic-bezier(.2,.7,.2,1)",
                  transitionDelay: `${i * 7}ms`,
                }}
              />
            );
          })}
        </div>
        {/* Marcador do limite dublado/faltando */}
        <div
          className="pointer-events-none absolute inset-y-0"
          style={{ left: `${percent}%` }}
        >
          <div className="h-full w-px bg-foreground/40" />
        </div>
      </div>

      {/* Legenda */}
      <div className="mt-5 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm">
        <Legend color="var(--brand-green)" label="dubladas" n={nf(pt)} />
        <Legend color="var(--brand-yellow)" label="faltam" n={nf(en)} />
        <Legend
          color="color-mix(in oklab, var(--muted) 40%, transparent)"
          label="efeitos / sem fala"
          n={nf(effects)}
        />
      </div>
    </div>
  );
}

function Legend({
  color,
  label,
  n,
}: {
  color: string;
  label: string;
  n: string;
}) {
  return (
    <span className="inline-flex items-center gap-2">
      <span
        className="inline-block h-2 w-2 rounded-full"
        style={{ background: color }}
      />
      <span className="tnum font-medium">{n}</span>
      <span className="text-muted">{label}</span>
    </span>
  );
}
