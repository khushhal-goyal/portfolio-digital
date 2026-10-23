import { AnimatePresence, motion, useMotionValue, useScroll, useSpring, useTransform } from "framer-motion";
import Lenis from "lenis";
import { useEffect, useState } from "react";
import { skyColors, skyStops } from "@/lib/portfolio";

export function SmoothScroll() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const lenis = new Lenis({ duration: 1.3, smoothWheel: true });
    (window as unknown as { __lenis?: Lenis }).__lenis = lenis;
    let id = 0;
    const raf = (t: number) => { lenis.raf(t); id = requestAnimationFrame(raf); };
    id = requestAnimationFrame(raf);
    return () => { cancelAnimationFrame(id); lenis.destroy(); };
  }, []);
  return null;
}

export function scrollToId(id: string) {
  const el = document.getElementById(id);
  if (!el) return;
  const lenis = (window as unknown as { __lenis?: Lenis }).__lenis;
  if (lenis) lenis.scrollTo(el, { offset: -40 });
  else el.scrollIntoView({ behavior: "smooth" });
}

export function Sky() {
  const { scrollYProgress } = useScroll();
  const bg = useTransform(scrollYProgress, skyStops, skyColors);
  return <motion.div aria-hidden className="fixed inset-0 -z-10" style={{ backgroundColor: bg }} />;
}

export function Cursor() {
  const x = useMotionValue(-100), y = useMotionValue(-100);
  const sx = useSpring(x, { stiffness: 380, damping: 28, mass: 0.6 });
  const sy = useSpring(y, { stiffness: 380, damping: 28, mass: 0.6 });
  const tx = useSpring(x, { stiffness: 90, damping: 18 });
  const ty = useSpring(y, { stiffness: 90, damping: 18 });
  const [hover, setHover] = useState(false);
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    if (!window.matchMedia("(pointer: fine)").matches) return;
    setEnabled(true);
    document.body.classList.add("custom-cursor");
    const move = (e: PointerEvent) => {
      x.set(e.clientX); y.set(e.clientY);
      const t = e.target as HTMLElement | null;
      setHover(!!t?.closest("a,button,[data-cursor]"));
    };
    window.addEventListener("pointermove", move);
    return () => { window.removeEventListener("pointermove", move); document.body.classList.remove("custom-cursor"); };
  }, [x, y]);

  if (!enabled) return null;
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-[100]">
      <motion.div className="absolute -ml-10 -mt-10 h-20 w-20 rounded-full bg-cosmic/20 blur-xl" style={{ x: tx, y: ty }} />
      <motion.div className="absolute" style={{ x: sx, y: sy }}>
        <motion.div
          className="-ml-3 -mt-3 h-6 w-6 rounded-full border border-cosmic bg-cosmic/30 glow-cosmic mix-blend-difference"
          animate={{ scale: hover ? 2.2 : 1 }}
          transition={{ type: "spring", stiffness: 300, damping: 18 }}
        />
        <motion.div className="absolute left-0 top-0" animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 3, ease: "linear" }}>
          <span className="absolute -top-5 left-0 h-1 w-1 rounded-full bg-cosmic" />
          <span className="absolute top-4 -left-4 h-1 w-1 rounded-full bg-cosmic/70" />
        </motion.div>
      </motion.div>
    </div>
  );
}

const diagnostics = ["Initialising neural core", "Calibrating star map", "Spooling ion engines", "Syncing mission data", "All systems nominal"];

export function Loader({ onDone }: { onDone: () => void }) {
  const [pct, setPct] = useState(0);
  const [show, setShow] = useState(true);
  useEffect(() => {
    const start = performance.now();
    let id = 0;
    const tick = (t: number) => {
      const p = Math.min(100, ((t - start) / 2200) * 100);
      setPct(p);
      if (p < 100) id = requestAnimationFrame(tick);
      else setTimeout(() => setShow(false), 350);
    };
    id = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(id);
  }, []);
  return (
    <AnimatePresence onExitComplete={onDone}>
      {show && (
        <motion.div
          className="zone-light fixed inset-0 z-[200] flex flex-col items-center justify-center bg-background"
          exit={{ opacity: 0, scale: 1.08, filter: "blur(12px)" }}
          transition={{ duration: 0.9, ease: [0.7, 0, 0.2, 1] }}
          role="status"
          aria-label={`Loading ${Math.round(pct)} percent`}
        >
          <motion.div
            className="relative grid h-24 w-24 place-items-center rounded-full border border-cosmic/40"
            animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 4, ease: "linear" }}
          >
            <span className="absolute -top-1 h-2 w-2 rounded-full bg-cosmic glow-cosmic" />
            <motion.span className="font-display text-2xl font-bold" animate={{ rotate: -360 }} transition={{ repeat: Infinity, duration: 4, ease: "linear" }}>KG</motion.span>
          </motion.div>
          <p className="mt-8 font-display text-6xl font-bold tabular-nums">{Math.round(pct)}<span className="text-cosmic">%</span></p>
          <div className="mt-6 h-px w-64 bg-ink/10"><motion.div className="h-px bg-cosmic" style={{ width: `${pct}%` }} /></div>
          <ul className="mt-6 h-28 space-y-1 font-mono text-xs text-soft">
            {diagnostics.slice(0, Math.ceil((pct / 100) * diagnostics.length)).map((d) => (
              <motion.li key={d} initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }}>
                <span className="text-cosmic">▸</span> {d} … <span className="text-cosmic">OK</span>
              </motion.li>
            ))}
          </ul>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
