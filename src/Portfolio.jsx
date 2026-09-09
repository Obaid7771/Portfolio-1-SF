import React, { useEffect, useRef, useState } from "react";

import {
  motion,
  AnimatePresence,
  useScroll,
  useTransform,
  useSpring,
  useMotionValue,
} from "framer-motion";

import {
  Mail,
  ArrowUpRight,
  Menu,
  X,
  BrainCircuit,
  Globe2,
  Smartphone,
  Send,
  MapPin,
  ExternalLink,
} from "lucide-react";

import {
  FaGithub as Github,
  FaLinkedin as Linkedin,
} from "react-icons/fa";

/**
 * ------------------------------------------------------------------
 *  DESIGN TOKENS
 *  Base:      #0B0F17  (void)
 *  Surface:   rgba(148,163,184, .05)  glass fill
 *  Border:    rgba(148,163,184, .12)  glass edge
 *  Cyan:      #38E4E0
 *  Violet:    #9B7BFF
 *  Text:      #F3F6FB (primary)  #8892A6 (muted)
 *  Display:   Space Grotesk  |  Body: Inter  |  Data/labels: JetBrains Mono
 * ------------------------------------------------------------------
 */

const COLORS = {
  void: "#0B0F17",
  voidSoft: "#0E1420",
  cyan: "#38E4E0",
  violet: "#9B7BFF",
  text: "#F3F6FB",
  muted: "#8892A6",
};

/* ---------------------------- Content ---------------------------- */

const NAV_LINKS = [
  { label: "Work", href: "#work" },
  { label: "Capabilities", href: "#capabilities" },
  { label: "Journey", href: "#journey" },
  { label: "Contact", href: "#contact" },
];

const SOCIALS = [
  { icon: Github, href: "https://github.com/", label: "GitHub" },
  { icon: Linkedin, href: "https://linkedin.com/", label: "LinkedIn" },
  { icon: Mail, href: "mailto:hello@jordanlee.dev", label: "Email" },
];

const PILLARS = [
  {
    title: "AI Architectures",
    icon: BrainCircuit,
    blurb:
      "Designing retrieval pipelines, agentic workflows, and inference infrastructure that hold up under real production load.",
    tags: ["LLM Orchestration", "RAG Systems", "Vector Search", "PyTorch"],
    span: "md:col-span-2 md:row-span-2",
    accent: COLORS.violet,
  },
  {
    title: "Web Development",
    icon: Globe2,
    blurb:
      "End-to-end product engineering — from design systems to typed APIs to edge deployment.",
    tags: ["React", "Next.js", "Node", "GraphQL"],
    span: "md:col-span-1 md:row-span-1",
    accent: COLORS.cyan,
  },
  {
    title: "Full-Stack Mobile",
    icon: Smartphone,
    blurb:
      "Native-feeling cross-platform apps, offline-first sync, and CI pipelines that ship to both stores weekly.",
    tags: ["React Native", "Swift", "Kotlin", "Fastlane"],
    span: "md:col-span-1 md:row-span-1",
    accent: COLORS.cyan,
  },
  {
    stat: "8+",
    label: "years shipping production software",
    span: "md:col-span-1 md:row-span-1",
    isStat: true,
  },
  {
    stat: "40+",
    label: "products launched across web & mobile",
    span: "md:col-span-1 md:row-span-1",
    isStat: true,
  },
];

const PROJECTS = [
  {
    name: "Meridian",
    role: "AI Ops Copilot",
    year: "2025",
    description:
      "An agentic assistant that reads infrastructure telemetry, proposes root causes, and opens scoped fixes as reviewable pull requests.",
    tags: ["Next.js", "LangGraph", "Postgres", "Kubernetes"],
    href: "#",
    repo: "#",
  },
  {
    name: "Northbound",
    role: "Cross-Platform Banking App",
    year: "2024",
    description:
      "A React Native banking app with biometric auth, offline ledgers, and a design system shared across iOS, Android and web.",
    tags: ["React Native", "TypeScript", "GraphQL", "Plaid"],
    href: "#",
    repo: "#",
  },
  {
    name: "Litmus",
    role: "Realtime Collaboration Engine",
    year: "2023",
    description:
      "CRDT-backed document sync powering a multiplayer editor for 20k concurrent users, built on a custom WebSocket fabric.",
    tags: ["Rust", "WebSockets", "CRDT", "Redis"],
    href: "#",
    repo: "#",
  },
];

const TIMELINE = [
  {
    year: "2024 — Now",
    title: "Staff Engineer, AI Platform",
    org: "Helio Systems",
    text: "Leading the agent-infrastructure team; built the internal framework now powering six production copilots.",
  },
  {
    year: "2021 — 2024",
    title: "Senior Full-Stack Engineer",
    org: "Northbound Labs",
    text: "Took a mobile banking product from prototype to 300k users; owned the mobile + backend architecture end to end.",
  },
  {
    year: "2019 — 2021",
    title: "Full-Stack Engineer",
    org: "Litmus Collaborative",
    text: "Built the realtime sync engine and led the migration from a monolith to a services-based architecture.",
  },
  {
    year: "2017 — 2019",
    title: "Frontend Engineer",
    org: "Studio Forge",
    text: "Shipped design systems and marketing sites for a portfolio of startup clients.",
  },
];

/* ------------------------- Small utilities ------------------------ */

function useMagnetic(strength = 0.35) {
  const ref = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 200, damping: 15, mass: 0.4 });
  const springY = useSpring(y, { stiffness: 200, damping: 15, mass: 0.4 });

  const onMouseMove = (e) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const relX = e.clientX - (rect.left + rect.width / 2);
    const relY = e.clientY - (rect.top + rect.height / 2);
    x.set(relX * strength);
    y.set(relY * strength);
  };

  const onMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return { ref, springX, springY, onMouseMove, onMouseLeave };
}

function SectionHeading({ kicker, title, description, align = "left" }) {
  return (
    <div className={`max-w-2xl ${align === "center" ? "mx-auto text-center" : ""}`}>
      <span
        className="text-sm"
        style={{ color: COLORS.cyan, fontFamily: "'JetBrains Mono', monospace" }}
      >
        {kicker}
      </span>
      <h2
        className="mt-3 text-3xl md:text-4xl font-medium tracking-tight"
        style={{ color: COLORS.text, fontFamily: "'Space Grotesk', sans-serif" }}
      >
        {title}
      </h2>
      {description && (
        <p className="mt-4 text-base leading-relaxed" style={{ color: COLORS.muted }}>
          {description}
        </p>
      )}
    </div>
  );
}

/* ------------------------------ Nav -------------------------------- */

function NavBar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { scrollYProgress } = useScroll();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <motion.header
        className="fixed top-0 left-0 right-0 z-50"
        initial={{ y: -80 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <div
          className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4 transition-all duration-300"
          style={{
            marginTop: scrolled ? 12 : 0,
            borderRadius: scrolled ? 20 : 0,
            background: scrolled ? "rgba(11,15,23,0.6)" : "transparent",
            backdropFilter: scrolled ? "blur(16px)" : "none",
            border: scrolled ? "1px solid rgba(148,163,184,0.12)" : "1px solid transparent",
          }}
        >
          <a
            href="#top"
            className="text-sm tracking-tight"
            style={{ color: COLORS.text, fontFamily: "'Space Grotesk', sans-serif" }}
          >
            Jordan&nbsp;Lee
          </a>

          <nav className="hidden md:flex items-center gap-8">
            {NAV_LINKS.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-sm transition-colors hover:text-white"
                style={{ color: COLORS.muted }}
              >
                {link.label}
              </a>
            ))}
            <a
              href="#contact"
              className="rounded-full px-4 py-2 text-sm transition-all duration-300 hover:shadow-lg"
              style={{
                border: `1px solid ${COLORS.cyan}55`,
                color: COLORS.cyan,
              }}
            >
              Let's talk
            </a>
          </nav>

          <button
            className="md:hidden"
            onClick={() => setOpen((v) => !v)}
            aria-label="Toggle menu"
            style={{ color: COLORS.text }}
          >
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>

        {/* scroll progress */}
        <motion.div
          className="h-[2px] origin-left"
          style={{
            scaleX: scrollYProgress,
            background: `linear-gradient(90deg, ${COLORS.cyan}, ${COLORS.violet})`,
          }}
        />
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed top-16 left-4 right-4 z-40 rounded-2xl p-6 md:hidden"
            style={{
              background: "rgba(14,20,32,0.95)",
              border: "1px solid rgba(148,163,184,0.12)",
              backdropFilter: "blur(20px)",
            }}
          >
            <div className="flex flex-col gap-5">
              {NAV_LINKS.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="text-base"
                  style={{ color: COLORS.text }}
                >
                  {link.label}
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

/* ------------------------------ Hero -------------------------------- */

function Hero() {
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const blobX = useSpring(mx, { stiffness: 40, damping: 20 });
  const blobY = useSpring(my, { stiffness: 40, damping: 20 });

  const handleMove = (e) => {
    const { innerWidth, innerHeight } = window;
    mx.set((e.clientX / innerWidth - 0.5) * 60);
    my.set((e.clientY / innerHeight - 0.5) * 60);
  };

  const magnetic = useMagnetic(0.3);

  return (
    <section
      id="top"
      onMouseMove={handleMove}
      className="relative flex min-h-screen items-center overflow-hidden px-6 pt-28"
    >
      {/* mesh gradient blobs */}
      <motion.div
        className="pointer-events-none absolute -top-24 right-[-10%] h-[520px] w-[520px] rounded-full"
        style={{
          background: `radial-gradient(circle, ${COLORS.violet}55, transparent 70%)`,
          filter: "blur(90px)",
          x: blobX,
          y: blobY,
        }}
      />
      <motion.div
        className="pointer-events-none absolute bottom-[-15%] left-[-10%] h-[420px] w-[420px] rounded-full"
        style={{
          background: `radial-gradient(circle, ${COLORS.cyan}44, transparent 70%)`,
          filter: "blur(90px)",
          x: useTransform(blobX, (v) => -v * 0.6),
          y: useTransform(blobY, (v) => -v * 0.6),
        }}
      />

      <div className="mx-auto max-w-6xl w-full relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="mb-6 inline-flex items-center gap-2 rounded-full px-4 py-1.5"
          style={{
            border: "1px solid rgba(148,163,184,0.18)",
            background: "rgba(148,163,184,0.05)",
          }}
        >
          <span
            className="h-2 w-2 rounded-full"
            style={{ background: COLORS.cyan, boxShadow: `0 0 8px ${COLORS.cyan}` }}
          />
          <span
            className="text-sm"
            style={{ color: COLORS.muted, fontFamily: "'JetBrains Mono', monospace" }}
          >
            Available for select engagements
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="max-w-4xl text-5xl md:text-7xl font-medium leading-[1.05] tracking-tight"
          style={{ color: COLORS.text, fontFamily: "'Space Grotesk', sans-serif" }}
        >
          Software engineer building at the edge of web, mobile and{" "}
          <span
            style={{
              background: `linear-gradient(90deg, ${COLORS.cyan}, ${COLORS.violet})`,
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            intelligent systems
          </span>
          .
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.25 }}
          className="mt-6 max-w-xl text-lg leading-relaxed"
          style={{ color: COLORS.muted }}
        >
          I'm Jordan — a full-stack engineer who designs AI-native products,
          ships cross-platform mobile apps, and cares as much about the
          architecture underneath as the interface on top.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-10 flex flex-wrap items-center gap-5"
        >
          <motion.a
            ref={magnetic.ref}
            onMouseMove={magnetic.onMouseMove}
            onMouseLeave={magnetic.onMouseLeave}
            style={{ x: magnetic.springX, y: magnetic.springY }}
            href="#work"
            className="group relative inline-flex items-center gap-2 overflow-hidden rounded-full px-7 py-3.5 text-sm font-medium"
          >
            <span
              className="absolute inset-0 -z-10"
              style={{ background: `linear-gradient(90deg, ${COLORS.cyan}, ${COLORS.violet})` }}
            />
            <span style={{ color: COLORS.void }}>View my work</span>
            <ArrowUpRight
              size={16}
              className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              style={{ color: COLORS.void }}
            />
          </motion.a>

          <div className="flex items-center gap-3">
            {SOCIALS.map(({ icon: Icon, href, label }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noreferrer"
                aria-label={label}
                className="flex h-11 w-11 items-center justify-center rounded-full transition-all duration-300 hover:-translate-y-0.5"
                style={{
                  border: "1px solid rgba(148,163,184,0.16)",
                  color: COLORS.muted,
                }}
                onMouseEnter={(e) => (e.currentTarget.style.color = COLORS.cyan)}
                onMouseLeave={(e) => (e.currentTarget.style.color = COLORS.muted)}
              >
                <Icon size={18} />
              </a>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

/* --------------------------- Bento grid ------------------------------ */

function BentoCard({ item }) {
  const [hover, setHover] = useState(false);

  if (item.isStat) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.6 }}
        className={`flex flex-col justify-center rounded-3xl p-8 ${item.span}`}
        style={{
          background: "rgba(148,163,184,0.04)",
          border: "1px solid rgba(148,163,184,0.1)",
        }}
      >
        <span
          className="text-4xl font-medium"
          style={{ color: COLORS.text, fontFamily: "'Space Grotesk', sans-serif" }}
        >
          {item.stat}
        </span>
        <span className="mt-2 text-sm" style={{ color: COLORS.muted }}>
          {item.label}
        </span>
      </motion.div>
    );
  }

  const Icon = item.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.6 }}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      className={`relative flex flex-col justify-between overflow-hidden rounded-3xl p-8 transition-all duration-500 ${item.span}`}
      style={{
        background: "rgba(148,163,184,0.04)",
        border: hover ? `1px solid ${item.accent}66` : "1px solid rgba(148,163,184,0.1)",
        boxShadow: hover ? `0 0 40px -12px ${item.accent}55` : "none",
      }}
    >
      <div
        className="pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full transition-opacity duration-500"
        style={{
          background: `radial-gradient(circle, ${item.accent}33, transparent 70%)`,
          opacity: hover ? 1 : 0,
          filter: "blur(20px)",
        }}
      />

      <div>
        <div
          className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl"
          style={{ background: `${item.accent}18`, color: item.accent }}
        >
          <Icon size={22} />
        </div>
        <h3
          className="text-xl font-medium"
          style={{ color: COLORS.text, fontFamily: "'Space Grotesk', sans-serif" }}
        >
          {item.title}
        </h3>
        <p className="mt-3 text-sm leading-relaxed" style={{ color: COLORS.muted }}>
          {item.blurb}
        </p>
      </div>

      <div className="mt-6 flex flex-wrap gap-2">
        {item.tags.map((tag) => (
          <span
            key={tag}
            className="rounded-full px-3 py-1 text-xs"
            style={{
              border: "1px solid rgba(148,163,184,0.16)",
              color: COLORS.muted,
              fontFamily: "'JetBrains Mono', monospace",
            }}
          >
            {tag}
          </span>
        ))}
      </div>
    </motion.div>
  );
}

function Capabilities() {
  return (
    <section id="capabilities" className="mx-auto max-w-6xl px-6 py-28">
      <SectionHeading
        kicker="Capabilities"
        title="Three disciplines, one engineer"
        description="I move fluidly between model architecture, product interfaces, and the mobile layer — most of my strongest work lives at the seams between them."
      />
      <div className="mt-14 grid grid-cols-1 gap-5 md:grid-cols-3 md:auto-rows-[210px]">
        {PILLARS.map((item, i) => (
          <BentoCard key={item.title || item.stat} item={item} />
        ))}
      </div>
    </section>
  );
}

/* ---------------------------- Projects -------------------------------- */

function ProjectRow({ project, index }) {
  const reversed = index % 2 === 1;
  return (
    <motion.div
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.7 }}
      className={`grid grid-cols-1 items-center gap-10 py-14 md:grid-cols-2 ${
        reversed ? "" : ""
      }`}
      style={{ borderTop: "1px solid rgba(148,163,184,0.1)" }}
    >
      <div className={reversed ? "md:order-2" : ""}>
        <motion.div
          whileHover={{ scale: 1.02 }}
          transition={{ duration: 0.4 }}
          className="relative flex aspect-[4/3] items-center justify-center overflow-hidden rounded-3xl"
          style={{
            background: `linear-gradient(135deg, ${COLORS.voidSoft}, rgba(148,163,184,0.06))`,
            border: "1px solid rgba(148,163,184,0.12)",
          }}
        >
          <span
            className="text-6xl font-medium opacity-20"
            style={{ color: COLORS.text, fontFamily: "'Space Grotesk', sans-serif" }}
          >
            {project.name[0]}
          </span>
          <div
            className="absolute inset-0"
            style={{
              background: `radial-gradient(circle at 30% 20%, ${COLORS.cyan}22, transparent 60%)`,
            }}
          />
        </motion.div>
      </div>

      <div className={reversed ? "md:order-1" : ""}>
        <span
          className="text-sm"
          style={{ color: COLORS.cyan, fontFamily: "'JetBrains Mono', monospace" }}
        >
          {project.role} · {project.year}
        </span>
        <h3
          className="mt-2 text-2xl md:text-3xl font-medium"
          style={{ color: COLORS.text, fontFamily: "'Space Grotesk', sans-serif" }}
        >
          {project.name}
        </h3>
        <p className="mt-4 text-base leading-relaxed" style={{ color: COLORS.muted }}>
          {project.description}
        </p>

        <div className="mt-5 flex flex-wrap gap-2">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full px-3 py-1 text-xs"
              style={{
                border: "1px solid rgba(148,163,184,0.16)",
                color: COLORS.muted,
                fontFamily: "'JetBrains Mono', monospace",
              }}
            >
              {tag}
            </span>
          ))}
        </div>

        <div className="mt-6 flex items-center gap-5">
          <a
            href={project.href}
            className="inline-flex items-center gap-1.5 text-sm font-medium transition-opacity hover:opacity-70"
            style={{ color: COLORS.text }}
          >
            Live preview <ExternalLink size={14} />
          </a>
          <a
            href={project.repo}
            className="inline-flex items-center gap-1.5 text-sm transition-opacity hover:opacity-70"
            style={{ color: COLORS.muted }}
          >
            <Github size={14} /> Source
          </a>
        </div>
      </div>
    </motion.div>
  );
}

function Projects() {
  return (
    <section id="work" className="mx-auto max-w-6xl px-6 py-28">
      <SectionHeading
        kicker="Selected work"
        title="Featured projects"
        description="A handful of products I've taken from architecture sketch to production."
      />
      <div className="mt-4">
        {PROJECTS.map((project, i) => (
          <ProjectRow key={project.name} project={project} index={i} />
        ))}
      </div>
    </section>
  );
}

/* ---------------------------- Timeline --------------------------------- */

function Timeline() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.8", "end 0.4"],
  });

  return (
    <section id="journey" className="mx-auto max-w-4xl px-6 py-28">
      <SectionHeading kicker="Experience" title="How I got here" align="left" />

      <div ref={ref} className="relative mt-14 pl-10">
        <div
          className="absolute left-[7px] top-0 h-full w-px"
          style={{ background: "rgba(148,163,184,0.14)" }}
        />
        <motion.div
          className="absolute left-[7px] top-0 w-px origin-top"
          style={{
            height: "100%",
            scaleY: scrollYProgress,
            background: `linear-gradient(180deg, ${COLORS.cyan}, ${COLORS.violet})`,
          }}
        />

        <div className="flex flex-col gap-14">
          {TIMELINE.map((item) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, x: -16 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.6 }}
              transition={{ duration: 0.6 }}
              className="relative"
            >
              <span
                className="absolute -left-10 top-1 h-3.5 w-3.5 rounded-full"
                style={{
                  background: COLORS.void,
                  border: `2px solid ${COLORS.cyan}`,
                  boxShadow: `0 0 12px ${COLORS.cyan}88`,
                }}
              />
              <span
                className="text-sm"
                style={{ color: COLORS.cyan, fontFamily: "'JetBrains Mono', monospace" }}
              >
                {item.year}
              </span>
              <h3
                className="mt-1.5 text-xl font-medium"
                style={{ color: COLORS.text, fontFamily: "'Space Grotesk', sans-serif" }}
              >
                {item.title}
              </h3>
              <p className="mt-0.5 text-sm" style={{ color: COLORS.muted }}>
                {item.org}
              </p>
              <p className="mt-3 max-w-xl text-sm leading-relaxed" style={{ color: COLORS.muted }}>
                {item.text}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------------------- Contact ---------------------------------- */

function FormField({ label, type = "text", textarea = false, name }) {
  const [focused, setFocused] = useState(false);
  const Tag = textarea ? "textarea" : "input";
  return (
    <div>
      <label
        className="mb-2 block text-sm"
        style={{ color: COLORS.muted, fontFamily: "'JetBrains Mono', monospace" }}
      >
        {label}
      </label>
      <Tag
        name={name}
        type={type}
        rows={textarea ? 4 : undefined}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        className="w-full resize-none rounded-xl bg-transparent px-4 py-3 text-sm outline-none transition-all duration-300"
        style={{
          color: COLORS.text,
          border: `1px solid ${focused ? COLORS.cyan : "rgba(148,163,184,0.16)"}`,
          boxShadow: focused ? `0 0 0 4px ${COLORS.cyan}1a` : "none",
        }}
      />
    </div>
  );
}

function Contact() {
  const magnetic = useMagnetic(0.25);
  const [sent, setSent] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSent(true);
  };

  return (
    <section id="contact" className="mx-auto max-w-6xl px-6 py-28">
      <div
        className="grid grid-cols-1 gap-16 rounded-[32px] p-10 md:grid-cols-2 md:p-16"
        style={{
          background: "rgba(148,163,184,0.04)",
          border: "1px solid rgba(148,163,184,0.1)",
        }}
      >
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.7 }}
        >
          <span
            className="text-sm"
            style={{ color: COLORS.cyan, fontFamily: "'JetBrains Mono', monospace" }}
          >
            Contact
          </span>
          <h2
            className="mt-3 text-3xl md:text-4xl font-medium leading-tight tracking-tight"
            style={{ color: COLORS.text, fontFamily: "'Space Grotesk', sans-serif" }}
          >
            Have a product to build? Let's talk it through.
          </h2>
          <p className="mt-5 max-w-sm text-base leading-relaxed" style={{ color: COLORS.muted }}>
            I take on a small number of engagements at a time — architecture
            reviews, AI feature builds, and full product engineering.
          </p>

          <div className="mt-8 flex items-center gap-2 text-sm" style={{ color: COLORS.muted }}>
            <MapPin size={16} />
            Remote — open to travel
          </div>

          <div className="mt-6 flex items-center gap-3">
            {SOCIALS.map(({ icon: Icon, href, label }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noreferrer"
                aria-label={label}
                className="flex h-11 w-11 items-center justify-center rounded-full transition-all duration-300 hover:-translate-y-0.5"
                style={{ border: "1px solid rgba(148,163,184,0.16)", color: COLORS.muted }}
              >
                <Icon size={18} />
              </a>
            ))}
          </div>
        </motion.div>

        <motion.form
          onSubmit={handleSubmit}
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="flex flex-col gap-5"
        >
          <FormField label="Name" name="name" />
          <FormField label="Email" name="email" type="email" />
          <FormField label="Project details" name="message" textarea />

          <motion.button
            ref={magnetic.ref}
            onMouseMove={magnetic.onMouseMove}
            onMouseLeave={magnetic.onMouseLeave}
            style={{ x: magnetic.springX, y: magnetic.springY }}
            type="submit"
            className="mt-2 inline-flex items-center justify-center gap-2 rounded-full px-7 py-3.5 text-sm font-medium"
          >
            <span
              className="absolute -z-10"
              style={{ background: `linear-gradient(90deg, ${COLORS.cyan}, ${COLORS.violet})` }}
            />
            <span
              className="absolute inset-0 rounded-full -z-10"
              style={{ background: `linear-gradient(90deg, ${COLORS.cyan}, ${COLORS.violet})` }}
            />
            <span style={{ color: COLORS.void, position: "relative" }}>
              {sent ? "Message sent" : "Send message"}
            </span>
            <Send size={15} style={{ color: COLORS.void, position: "relative" }} />
          </motion.button>
        </motion.form>
      </div>
    </section>
  );
}

/* ------------------------------ Footer ---------------------------------- */

function Footer() {
  return (
    <footer className="mx-auto max-w-6xl px-6 pb-10 pt-4">
      <div
        className="flex flex-col items-center justify-between gap-4 py-8 text-sm md:flex-row"
        style={{ borderTop: "1px solid rgba(148,163,184,0.1)", color: COLORS.muted }}
      >
        <span>© {new Date().getFullYear()} Jordan Lee. Built with React &amp; Framer Motion.</span>
        <span style={{ fontFamily: "'JetBrains Mono', monospace" }}>
          Designed &amp; engineered in the dark.
        </span>
      </div>
    </footer>
  );
}

/* ------------------------------- Root ------------------------------------ */

export default function Portfolio() {
  return (
    <div style={{ background: COLORS.void, minHeight: "100vh" }} className="relative">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&family=Inter:wght@400;500;600&family=JetBrains+Mono:wght@400;500&display=swap');
        * { font-family: 'Inter', sans-serif; }
        html { scroll-behavior: smooth; }
        ::selection { background: ${COLORS.cyan}44; color: ${COLORS.text}; }
        body { background: ${COLORS.void}; }
        ::-webkit-scrollbar { width: 10px; }
        ::-webkit-scrollbar-track { background: ${COLORS.void}; }
        ::-webkit-scrollbar-thumb { background: rgba(148,163,184,0.25); border-radius: 999px; }
        @media (prefers-reduced-motion: reduce) {
          * { animation-duration: 0.01ms !important; transition-duration: 0.01ms !important; }
        }
      `}</style>

      <NavBar />
      <Hero />
      <Capabilities />
      <Projects />
      <Timeline />
      <Contact />
      <Footer />
    </div>
  );
}
