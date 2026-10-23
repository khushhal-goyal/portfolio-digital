import { AnimatePresence, motion, useScroll, useMotionValueEvent } from "framer-motion";
import { useEffect, useState, type FormEvent } from "react";
import { FaGithub, FaLinkedin, FaXTwitter, FaInstagram, FaYoutube, FaMedium, FaDev } from "react-icons/fa6";
import { FiArrowUpRight, FiDownload, FiMail, FiMapPin, FiPhone, FiAward, FiSend } from "react-icons/fi";
import { achievements, certifications, experience, planets, profile, projects, roles, socials, stats, timeline } from "@/lib/portfolio";
import { cn } from "@/lib/utils";
import { scrollToId } from "./Experience";
import { Magnetic, Reveal, SectionTitle, TiltCard } from "./Interactive";

const nav = ["home", "about", "skills", "projects", "experience", "certifications", "contact"];

export function Navbar() {
  const [active, setActive] = useState("home");
  const [small, setSmall] = useState(false);
  const { scrollY, scrollYProgress } = useScroll();
  const [dark, setDark] = useState(false);
  useMotionValueEvent(scrollY, "change", (v) => setSmall(v > 60));
  useMotionValueEvent(scrollYProgress, "change", (v) => setDark(v > 0.3));
  useEffect(() => {
    const io = new IntersectionObserver(
      (es) => es.forEach((e) => e.isIntersecting && setActive(e.target.id)),
      { rootMargin: "-45% 0px -50% 0px" },
    );
    nav.forEach((id) => { const el = document.getElementById(id); if (el) io.observe(el); });
    return () => io.disconnect();
  }, []);
  return (
    <motion.header
      className={cn("fixed left-1/2 top-4 z-50 -translate-x-1/2", dark ? "zone-dark" : "zone-light")}
      initial={{ y: -80, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ type: "spring", stiffness: 80, damping: 16 }}
    >
      <nav aria-label="Main" className={cn("glass flex items-center gap-1 rounded-full transition-all duration-500", small ? "px-2 py-1.5" : "px-3 py-2.5")}>
        <button onClick={() => scrollToId("home")} className="mr-2 px-2 font-display font-bold" aria-label="Back to top">KG<span className="text-cosmic">.</span></button>
        {nav.slice(1).map((id) => (
          <button key={id} onClick={() => scrollToId(id)} className={cn("relative hidden rounded-full px-3 py-1.5 text-sm capitalize transition-colors md:block", active === id ? "" : "text-soft")} aria-current={active === id ? "true" : undefined}>
            {active === id && <motion.span layoutId="nav-pill" className="absolute inset-0 rounded-full bg-cosmic/20" transition={{ type: "spring", stiffness: 300, damping: 26 }} />}
            <span className="relative">{id}</span>
          </button>
        ))}
        <button onClick={() => scrollToId("contact")} className="ml-1 rounded-full bg-cosmic px-4 py-1.5 text-sm font-semibold text-primary-foreground md:hidden">Contact</button>
      </nav>
    </motion.header>
  );
}

function Btn({ children, href, onClick, primary, download }: { children: React.ReactNode; href?: string; onClick?: () => void; primary?: boolean; download?: boolean }) {
  const cls = cn(
    "inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-semibold transition-shadow duration-300",
    primary ? "bg-cosmic text-primary-foreground hover:glow-cosmic" : "glass hover:glow-cosmic",
  );
  return (
    <Magnetic>
      {href ? <a href={href} target="_blank" rel="noreferrer" className={cls} {...(download ? {} : {})}>{children}</a> : <motion.button whileTap={{ scale: 0.94 }} onClick={onClick} className={cls}>{children}</motion.button>}
    </Magnetic>
  );
}

export function Hero() {
  const [i, setI] = useState(0);
  useEffect(() => { const t = setInterval(() => setI((v) => (v + 1) % roles.length), 2200); return () => clearInterval(t); }, []);
  return (
    <section id="home" className="zone-light relative flex min-h-screen flex-col items-center justify-end px-6 pb-20 text-center">
      <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }} className="font-mono text-xs uppercase tracking-[0.35em] text-soft">
        {profile.tagline}
      </motion.p>
      <h1 className="mt-5 font-display text-[clamp(3rem,10vw,8.5rem)] font-extrabold leading-[0.9] tracking-tighter">
        {profile.name.split(" ").map((w, k) => (
          <motion.span key={w} className="inline-block px-2" initial={{ y: 80, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ type: "spring", stiffness: 60, damping: 14, delay: 0.2 + k * 0.12 }}>{w}</motion.span>
        ))}
      </h1>
      <div className="mt-4 h-10 overflow-hidden font-display text-2xl md:text-3xl" aria-live="polite">
        <AnimatePresence mode="wait">
          <motion.p key={i} className="text-gradient-cosmic font-bold" initial={{ y: 40, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: -40, opacity: 0 }} transition={{ type: "spring", stiffness: 120, damping: 16 }}>
            {roles[i]}
          </motion.p>
        </AnimatePresence>
      </div>
      <div className="mt-10 flex flex-wrap justify-center gap-3">
        <Btn primary onClick={() => scrollToId("projects")}>View Projects <FiArrowUpRight /></Btn>
        <Btn href={profile.resume}>Download Resume <FiDownload /></Btn>
        <Btn onClick={() => scrollToId("contact")}>Contact Me <FiMail /></Btn>
      </div>
    </section>
  );
}

const wrap = "relative mx-auto max-w-6xl px-6 py-32";

export function About() {
  return (
    <section id="about" className={cn("zone-light", wrap)}>
      <SectionTitle kicker="01 — Identity" title="Engineer of systems & stories." />
      <div className="grid gap-6 lg:grid-cols-5">
        <Reveal className="lg:col-span-3"><TiltCard className="p-8"><p className="text-lg leading-relaxed">{profile.about}</p>
          <div className="mt-6 flex flex-wrap gap-4 text-sm text-soft"><span className="inline-flex items-center gap-2"><FiMapPin className="text-cosmic" />{profile.location}</span><span>Permanent: {profile.permanent}</span></div>
        </TiltCard></Reveal>
        <div className="grid grid-cols-2 gap-4 lg:col-span-2">
          {stats.map((s, k) => (
            <Reveal key={s.label} delay={k * 0.08}><TiltCard className="p-6"><p className="font-display text-4xl font-bold text-glow">{s.value}</p><p className="mt-1 text-sm text-soft">{s.label}</p></TiltCard></Reveal>
          ))}
        </div>
      </div>
      <div className="mt-16 grid gap-10 lg:grid-cols-2">
        <ol className="relative border-l line-zone pl-8">
          {timeline.map((t, k) => (
            <Reveal key={t.title} delay={k * 0.08} className="mb-10 last:mb-0">
              <li className="relative">
                <span className="absolute -left-[37px] top-1 h-2.5 w-2.5 rounded-full bg-cosmic glow-cosmic" />
                <p className="font-mono text-xs text-cosmic">{t.year}</p>
                <h3 className="mt-1 font-display text-xl font-bold">{t.title}</h3>
                <p className="text-sm text-soft">{t.place} · {t.note}</p>
              </li>
            </Reveal>
          ))}
        </ol>
        <div className="space-y-4">
          {achievements.map((a, k) => (
            <Reveal key={a} delay={k * 0.1}><TiltCard className="flex gap-4 p-5"><FiAward className="mt-1 shrink-0 text-xl text-cosmic" /><p>{a}</p></TiltCard></Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

export function Skills() {
  const [sel, setSel] = useState(0);
  const p = planets[sel] ?? planets[0]!;
  return (
    <section id="skills" className={cn("zone-dark", wrap)}>
      <SectionTitle kicker="02 — Skill System" title="A solar system of craft." />
      <div className="grid items-center gap-10 lg:grid-cols-2">
        <div className="flex flex-wrap items-center justify-center gap-8">
          {planets.map((pl, k) => (
            <motion.button
              key={pl.name}
              onPointerEnter={() => setSel(k)} onFocus={() => setSel(k)} onClick={() => setSel(k)}
              aria-pressed={sel === k}
              className="relative grid place-items-center rounded-full font-display text-sm font-bold"
              style={{ width: pl.size, height: pl.size, background: `radial-gradient(circle at 30% 30%, oklch(0.85 0.1 ${pl.hue}), oklch(0.35 0.12 ${pl.hue}) 70%)` }}
              animate={{ y: [0, -10, 0] }} transition={{ repeat: Infinity, duration: 4 + k, ease: "easeInOut" }}
              whileHover={{ scale: 1.12 }}
            >
              <motion.span aria-hidden className="absolute -inset-4 rounded-full border border-dashed line-zone" animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 10 + k * 3, ease: "linear" }}>
                <span className="absolute -top-1 left-1/2 h-2 w-2 rounded-full bg-cosmic glow-cosmic" />
              </motion.span>
              <span className={cn("relative px-2 text-void", sel === k && "underline")}>{pl.name}</span>
            </motion.button>
          ))}
        </div>
        <AnimatePresence mode="wait">
          <motion.div key={p.name} initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -30 }} transition={{ type: "spring", stiffness: 120, damping: 18 }}>
            <TiltCard className="p-8">
              <h3 className="font-display text-3xl font-bold text-glow">{p.name}</h3>
              <p className="mt-3 text-soft">{p.description}</p>
              <dl className="mt-6 grid grid-cols-2 gap-4 text-sm">
                <div><dt className="font-mono text-xs uppercase text-cosmic">Experience</dt><dd>{p.experience}</dd></div>
                <div><dt className="font-mono text-xs uppercase text-cosmic">Projects</dt><dd>{p.projects}</dd></div>
              </dl>
              <div className="mt-6 flex flex-wrap gap-2">{p.stack.map((s) => <span key={s} className="glass rounded-full px-3 py-1 text-xs">{s}</span>)}</div>
            </TiltCard>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}

export function Projects() {
  return (
    <section id="projects" className={cn("zone-dark", wrap)}>
      <SectionTitle kicker="03 — Missions" title="Selected projects." />
      <div className="grid gap-6 md:grid-cols-2">
        {projects.map((p, k) => (
          <Reveal key={p.name} delay={k * 0.1} className={k === 0 ? "md:col-span-2" : ""}>
            <TiltCard className={cn("h-full p-8", k === 0 && "md:p-12")}>
              {k === 0 && <span className="mb-4 inline-block rounded-full bg-cosmic px-3 py-1 font-mono text-xs font-semibold text-primary-foreground">Featured mission</span>}
              <p className="font-mono text-xs text-cosmic">0{k + 1}</p>
              <h3 className={cn("mt-2 font-display font-bold", k === 0 ? "text-3xl md:text-5xl" : "text-2xl")}>{p.name}</h3>
              <p className="mt-4 max-w-2xl text-soft">{p.description}</p>
              <div className="mt-6 flex flex-wrap gap-2">{p.stack.map((s) => <span key={s} className="rounded-full border line-zone px-3 py-1 text-xs">{s}</span>)}</div>
              <div className="mt-8 flex gap-3">
                <Btn href={p.github}><FaGithub /> GitHub</Btn>
                <Btn primary href={p.live}>Live Demo <FiArrowUpRight /></Btn>
              </div>
            </TiltCard>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

export function ExperienceSection() {
  return (
    <section id="experience" className={cn("zone-dark", wrap)}>
      <SectionTitle kicker="04 — Flight Log" title="Experience." />
      <div className="relative border-l line-zone pl-8">
        {experience.map((e) => (
          <Reveal key={e.company}>
            <span className="absolute -left-[5px] mt-8 h-2.5 w-2.5 rounded-full bg-cosmic glow-cosmic" />
            <TiltCard className="p-8">
              <p className="font-mono text-xs text-cosmic">{e.duration}</p>
              <h3 className="mt-2 font-display text-2xl font-bold">{e.role}</h3>
              <p className="text-soft">{e.company}</p>
              <p className="mt-4 max-w-3xl">{e.description}</p>
            </TiltCard>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

export function Certifications() {
  return (
    <section id="certifications" className={cn("zone-dark", wrap)}>
      <SectionTitle kicker="05 — Credentials" title="Certifications." />
      <div className="grid gap-6 md:grid-cols-3">
        {certifications.map((c, k) => (
          <Reveal key={c} delay={k * 0.1}>
            <TiltCard className="h-full p-7">
              <motion.div whileHover={{ rotate: 180 }} transition={{ type: "spring" }} className="grid h-12 w-12 place-items-center rounded-full bg-cosmic/15 text-xl text-cosmic"><FiAward /></motion.div>
              <p className="mt-5 font-display text-lg font-semibold leading-snug">{c}</p>
            </TiltCard>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

export function Contact() {
  const [launched, setLaunched] = useState(false);
  const submit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    const name = String(f.get("name") ?? "").slice(0, 100);
    const msg = String(f.get("message") ?? "").slice(0, 2000);
    setLaunched(true);
    setTimeout(() => {
      window.location.href = `mailto:${profile.email}?subject=${encodeURIComponent(`Hello from ${name}`)}&body=${encodeURIComponent(msg)}`;
      setLaunched(false);
    }, 1100);
  };
  const field = "glass w-full rounded-xl px-4 py-3 outline-none transition focus:ring-2 focus:ring-cosmic placeholder:text-soft";
  return (
    <section id="contact" className={cn("zone-dark", wrap)}>
      <SectionTitle kicker="06 — Mission Control" title="Open a channel." />
      <div className="grid gap-8 lg:grid-cols-5">
        <div className="space-y-4 lg:col-span-2">
          <a href={`mailto:${profile.email}`} className="glass flex items-center gap-3 rounded-2xl p-5 hover:glow-cosmic"><FiMail className="text-cosmic" />{profile.email}</a>
          <a href={`tel:${profile.phone.replace(/\s/g, "")}`} className="glass flex items-center gap-3 rounded-2xl p-5 hover:glow-cosmic"><FiPhone className="text-cosmic" />{profile.phone}</a>
          <p className="glass flex items-center gap-3 rounded-2xl p-5"><FiMapPin className="text-cosmic" />{profile.location}</p>
        </div>
        <form onSubmit={submit} className="glass space-y-4 rounded-2xl p-6 lg:col-span-3 md:p-8">
          <label className="block"><span className="sr-only">Name</span><input required maxLength={100} name="name" placeholder="Your name" className={field} /></label>
          <label className="block"><span className="sr-only">Email</span><input required type="email" maxLength={255} name="email" placeholder="Your email" className={field} /></label>
          <label className="block"><span className="sr-only">Message</span><textarea required maxLength={2000} name="message" rows={5} placeholder="Transmit your message…" className={field} /></label>
          <Magnetic>
            <button type="submit" className="relative inline-flex items-center gap-2 overflow-hidden rounded-full bg-cosmic px-7 py-3 font-semibold text-primary-foreground hover:glow-cosmic">
              Launch message
              <motion.span animate={launched ? { x: 80, y: -120, rotate: -45, opacity: 0 } : { x: 0, y: 0, rotate: 0, opacity: 1 }} transition={{ duration: 0.9, ease: [0.6, 0, 0.3, 1] }}><FiSend /></motion.span>
            </button>
          </Magnetic>
        </form>
      </div>
    </section>
  );
}

const socialList = [
  { href: socials.github, icon: FaGithub, label: "GitHub" },
  { href: socials.linkedin, icon: FaLinkedin, label: "LinkedIn" },
  { href: socials.twitter, icon: FaXTwitter, label: "Twitter" },
  { href: socials.instagram, icon: FaInstagram, label: "Instagram" },
  { href: socials.youtube, icon: FaYoutube, label: "YouTube" },
  { href: socials.medium, icon: FaMedium, label: "Medium" },
  { href: socials.devto, icon: FaDev, label: "Dev.to" },
];

export function Footer() {
  return (
    <footer className="zone-dark relative mx-auto max-w-6xl px-6 pb-12 pt-32 text-center">
      <svg aria-hidden className="mx-auto mb-10 h-24 w-64 text-cosmic" viewBox="0 0 260 100" fill="none" stroke="currentColor" strokeOpacity="0.5">
        <polyline points="10,70 60,30 110,55 160,15 210,45 250,25" />
        {[[10,70],[60,30],[110,55],[160,15],[210,45],[250,25]].map(([x, y]) => <circle key={x} cx={x} cy={y} r="3" fill="currentColor" />)}
      </svg>
      <blockquote className="mx-auto max-w-2xl font-display text-2xl leading-snug md:text-3xl">“{profile.quote}”</blockquote>
      <p className="mt-3 text-sm text-soft">— {profile.quoteBy}</p>
      <ul className="mt-12 flex flex-wrap justify-center gap-3">
        {socialList.map(({ href, icon: Icon, label }) => (
          <li key={label}><Magnetic><motion.a whileHover={{ rotate: 12, scale: 1.1 }} href={href} target="_blank" rel="noreferrer" aria-label={label} className="glass grid h-12 w-12 place-items-center rounded-full text-lg hover:text-cosmic"><Icon /></motion.a></Magnetic></li>
        ))}
      </ul>
      <p className="mt-12 font-mono text-xs text-soft">© {new Date().getFullYear()} {profile.name} · Drifting through deep space</p>
    </footer>
  );
}
