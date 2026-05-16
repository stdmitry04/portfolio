"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useState, useEffect, useCallback } from "react";

/*
 * ─── Typographic Scale Reference ───
 *
 * This file uses CSS custom properties defined in globals.css
 * via Tailwind utilities for consistent typography:
 *
 *   text-label      (14px) — L1: section labels, dates, roles, nav, tech pills, links
 *   text-body       (15px) — L2: descriptions, bullets, tab buttons, skill items
 *   text-body-lg    (17px) — L3: project hooks, about secondary, hero tagline
 *   text-sub-heading(24px) — L4: tab headings, timeline titles (via text-2xl)
 *   text-4xl/5xl           — L5: section headings ("Experience", "Selected Work")
 *   text-6xl → 8xl         — Hero name (singular, outside scale)
 */

/* ─────────────────────────── DATA ─────────────────────────── */

type Project = {
  title: string;
  hook: string;
  year: string;
  role: string;
  stack: string[];
  github: string;
  media: { type: "image" | "video"; src: string }[];
  link?: string;
  technical: { heading: string; points: string[] };
  business: { heading: string; points: string[] };
};

const projects: Project[] = [
  {
    title: "K-12 ERP Platform",
    hook: "Enterprise ERP platform for K-12 school districts — HR, hiring, and onboarding in one system. Secured a pilot with the 7th largest school district in Illinois.",
    year: "2024 — Present",
    role: "Software Developer @ APS Data Technologies",
    stack: ["Django REST", "Next.js 15", "PostgreSQL", "React 19", "TypeScript", "Tailwind"],
    github: "https://github.com/stdmitry04/aps-main-demo",
    media: [] as { type: "image" | "video"; src: string }[],
    technical: {
      heading: "Architecture & Scale",
      points: [
        "Full ERP pipeline: job posting, applicant tracking, interview scheduling, offer generation, document collection, and onboarding — all in one system.",
        "Django 5.2 + DRF backend with PostgreSQL, serving a Next.js 15 + React 19 frontend. Type-safe API layer with TypeScript throughout.",
        "Multi-tenant architecture supporting concurrent school districts with isolated data. Role-based access across administrators, HR staff, and hiring managers.",
        "DocuSign integration for electronic signatures, SSO for district-wide authentication, and automated email workflows for candidate communication.",
        "Fully integrated with each district's existing ERP system — new hire data syncs automatically into their current payroll and HR infrastructure so districts don't need to replace anything they already run.",
        "Managing three environments (dev, staging, prod) on AWS — CI/CD pipeline handles automated deployments, environment promotion, and rollback.",
      ],
    },
    business: {
      heading: "Impact & Outcomes",
      points: [
        "Replaces fragmented hiring workflows (spreadsheets, email chains, paper forms) with a unified platform for K-12 school districts.",
        "Processes 1,000+ applications daily in production — real scale with real school districts depending on uptime.",
        "Reduces time-to-hire by consolidating every step from job posting to employee onboarding into a single dashboard.",
        "Secured a pilot with the 7th largest school district in Illinois — the platform is now the operational backbone for their HR and hiring processes.",
      ],
    },
  },
  {
    title: "Campus USA",
    hook: "College application platform with RAG-powered AI assistant, OCR pipelines, and document processing.",
    year: "2024 — 2025",
    role: "Software Developer @ APS Data Technologies",
    stack: ["Django REST", "Next.js 15", "OpenAI", "Qdrant", "AWS S3/EC2/RDS", "Docker"],
    github: "https://github.com/stdmitry04/campus-usa-demo",
    media: [] as { type: "image" | "video"; src: string }[],
    technical: {
      heading: "AI & Infrastructure",
      points: [
        "RAG-based AI chat assistant: OpenAI embeddings stored in Qdrant vector database, with retrieval-augmented generation for contextual answers about universities and programs.",
        "OCR pipeline for automated transcript and resume parsing — extracts structured data from uploaded documents for application processing.",
        "AWS infrastructure: S3 with pre-signed URLs for secure file management, EC2 for compute, RDS for managed PostgreSQL.",
        "Django REST + Next.js 15 full-stack architecture. Docker Compose for local development and deployment orchestration.",
        "Demo represents ~30-40% of the production system. Full version includes additional AI features and institutional integrations under NDA.",
      ],
    },
    business: {
      heading: "Product Vision",
      points: [
        "Streamlines the college application process — a notoriously fragmented experience for students navigating multiple portals and requirements.",
        "AI assistant reduces counselor workload by answering common questions about programs, deadlines, and requirements with source-backed responses.",
        "Document automation (OCR) eliminates manual data entry for transcripts — a bottleneck that slows admissions processing by days.",
        "Deployed to 2 partnering universities in the US and 3 in India — processing real applications for real institutions.",
      ],
    },
  },
  {
    title: "CourseChecker",
    hook: "University course review platform with AI-powered academic advisor. Built at SpartaHack X in 24 hours, shipped for real use.",
    year: "2025",
    role: "Lead Developer (85 of 153 commits)",
    stack: ["Next.js 14", "Supabase", "GPT-4", "TypeScript", "Tailwind", "Resend"],
    github: "https://github.com/neontap/spartahack",
    media: [{ type: "video" as const, src: "/previews/coursechecker.mp4" }],
    technical: {
      heading: "System Design",
      points: [
        "Multi-dimensional review system: 5 rating axes (overall, difficulty, materials, workload, grading fairness) with professor and semester tracking.",
        "Pagination and incremental fetching across courses and reviews — prevents loading full datasets on mount and keeps the UI responsive as data grows.",
        "Supabase backend with PostgreSQL and Row-Level Security. Handles data isolation, university email domain validation, and Google OAuth without a custom auth layer.",
      ],
    },
    business: {
      heading: "From Hackathon to Product",
      points: [
        "Solves a real problem: students choose courses with incomplete information. RateMyProfessor covers professors, but not the course content itself.",
        "University email gating ensures review quality — only verified students from the relevant institution can contribute.",
        "After SpartaHack, brought in 2 additional developers to keep building for 3 months. Submitted to project judging at MSU's second-largest CS club and placed 3rd.",
        "2,000 unique visitors in the first week after launch.",
      ],
    },
  },
  {
    title: "QuiKard",
    hook: "Digital business card platform with QR code generation and Apple Wallet integration.",
    year: "2025",
    role: "Solo Developer",
    stack: ["Next.js 15", "FastAPI", "PostgreSQL", "Apple Wallet API", "TypeScript", "Docker"],
    github: "https://github.com/stdmitry04/quikard",
    media: [
      { type: "image" as const, src: "/previews/quikard-1.png" },
      { type: "image" as const, src: "/previews/quikard-2.png" },
      { type: "image" as const, src: "/previews/quikard-3.png" },
    ],
    technical: {
      heading: "Full-Stack Implementation",
      points: [
        "Next.js 15 + TypeScript frontend with Tailwind styling. FastAPI + SQLAlchemy backend with PostgreSQL/SQLite database.",
        "Apple Wallet Pass API integration: generates .pkpass files for NFC-enabled business card sharing directly from iPhone Wallet.",
        "QR code generation and encoding: each card gets a unique shareable URL and auto-generated QR code for physical-world distribution.",
      ],
    },
    business: {
      heading: "Product & Market",
      points: [
        "Addresses a real friction point: paper business cards are wasteful and forgettable. Digital alternatives exist but most lack Apple Wallet integration.",
        "Apple Wallet pass means the card lives alongside boarding passes and tickets — high visibility, zero app install required for recipients.",
        "B2B angle: companies can issue branded digital cards to employees with consistent formatting and contact info.",
      ],
    },
  },
  {
    title: "Volunteer Matchmaker",
    hook: "\"Tinder for volunteering\" — connecting helpers with people who need them. Built in 24 hours at SpartaHack XI. Blockchain Track 3rd Place.",
    year: "2026",
    role: "Team of 4 — SpartaHack XI | Blockchain Track 3rd Place",
    stack: ["Next.js 15", "Django REST", "Gemini AI", "Solidity", "Zustand", "Leaflet"],
    github: "https://github.com/stdmitry04/Volunteer_Matchmaker",
    media: [] as { type: "image" | "video"; src: string }[],
    technical: {
      heading: "24-Hour Architecture",
      points: [
        "Swipe-based matching engine with composite scoring: proximity (geodistance), skills overlap, job urgency (time-decay weighting), and volunteer reliability rating.",
        "Real-time chat between matched volunteer and requester — no personal contact info exchanged. JWT-authenticated WebSocket-style messaging.",
        "Google Gemini API for AI-enhanced job descriptions and auto-generated listing images.",
        "Ethereum smart contract (VolunteerLeaderboard.sol) for transparent donation tracking. Ethers.js frontend integration with on-chain monthly rounds.",
      ],
    },
    business: {
      heading: "Social Impact & Design",
      points: [
        "Addresses a coordination problem: elderly, disabled, and busy parents need help with everyday tasks, but finding reliable volunteers is friction-heavy.",
        "Swipe UX (familiar from dating apps) lowers the barrier to engagement — volunteers browse opportunities casually rather than committing upfront.",
        "Badge achievement system drives retention: Specialist, Firefighter, Anchor, Inclusionist tracks reward consistent, diverse volunteering.",
        "Blockchain donation leaderboard adds transparency for organizational donors — funds tracked on-chain, monthly rounds incentivize sustained giving.",
      ],
    },
  },
  {
    title: "Multi-Agent Simulation Engine",
    hook: "Stride scheduler and tiered execution system for a real-time civilization simulation.",
    year: "2026",
    role: "Product Lead — Team of 30 (18 commits)",
    stack: ["C++23", "WebAssembly", "Emscripten", "Stride Scheduling", "Unit Testing"],
    github: "https://github.com/CSE498/Spring2026-CompanyC",
    media: [] as { type: "image" | "video"; src: string }[],
    technical: {
      heading: "Scheduling Architecture",
      points: [
        "Stride scheduling algorithm: processes have a virtual time position (pass) and stride inversely proportional to priority. Scheduler always picks the process furthest behind in virtual time — guaranteeing fair, proportional CPU allocation.",
        "Tiered execution system with 4 importance levels: CRITICAL (40% frame budget), GAMEPLAY (30%), ECONOMY (20%), COSMETIC (10%). Each tier backed by its own Scheduler instance via composition.",
        "Soft budget enforcement for CRITICAL tier (up to 250ms overage allowed), hard budget cutoff for all other tiers. Prevents cosmetic processes from starving gameplay-critical ones.",
        "C++23 compiled to WebAssembly via Emscripten. Designed interfaces between world state, agent behaviors, and rendering systems across distributed development teams.",
        "Full test suite: unit tests for base Scheduler (add/remove/priority/peek) and TieredScheduler (budget enforcement, tier isolation, edge cases). Assert-to-throw conversion for robust error handling.",
      ],
    },
    business: {
      heading: "Product Development & Team Scale",
      points: [
        "Defined the game type, scope, look and feel, and the role of AI agents within the simulation — presented the vision to the full 30-person team and drove alignment before a line of code was written.",
        "Owned the scheduling subsystem end-to-end: designed the architecture, wrote the roadmap (7-phase plan), implemented and tested Phases 1-2, then handed off cleanly to downstream teams.",
        "The scheduling layer is what makes 50,000+ concurrent agents possible — without proportional frame budget allocation agents starve each other and the simulation breaks down entirely.",
      ],
    },
  },
];

const skills = {
  "AI / ML": ["RAG Systems", "Vector DBs", "Embeddings", "Agentic Systems", "Frontier LLM APIs"],
  Backend: ["Python", "Django REST", "FastAPI", "Node.js", "PostgreSQL", "Redis"],
  Frontend: ["TypeScript", "React", "Next.js", "Tailwind CSS", "Zustand"],
  Infrastructure: ["AWS (ECS, S3, RDS)", "Docker", "Terraform", "GitHub Actions", "CI/CD"],
};

/* ─────────────────────────── ANIMATIONS ─────────────────────────── */

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.6, ease: [0.22, 1, 0.36, 1] as const },
  }),
};

const stagger = {
  visible: { transition: { staggerChildren: 0.08 } },
};

/* ─────────────────────────── COMPONENTS ─────────────────────────── */

function MediaStrip({
  media,
  title,
}: {
  media: { type: "image" | "video"; src: string }[];
  title: string;
}) {
  const [open, setOpen] = useState(false);
  const [current, setCurrent] = useState(0);
  const hasVideo = media[0]?.type === "video";
  const isCarousel = media.length > 1;

  const prev = useCallback(
    () => setCurrent((c) => (c - 1 + media.length) % media.length),
    [media.length]
  );
  const next = useCallback(
    () => setCurrent((c) => (c + 1) % media.length),
    [media.length]
  );

  // Keyboard nav + scroll lock
  useEffect(() => {
    if (!open) return;
    document.body.style.overflow = "hidden";
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };
    window.addEventListener("keydown", handler);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handler);
    };
  }, [open, prev, next]);

  return (
    <>
      {/* Thumbnail — dark, invites click */}
      <button
        onClick={() => { setCurrent(0); setOpen(true); }}
        className="relative w-full aspect-[3/1] overflow-hidden bg-black border-b border-border cursor-pointer group/media"
      >
        {hasVideo ? (
          <video
            src={media[0].src}
            muted
            playsInline
            className="w-full h-full object-cover object-top opacity-40 group-hover/media:opacity-60 transition-opacity duration-500"
          />
        ) : (
          <Image
            src={media[0].src}
            alt={`${title} preview`}
            fill
            className="object-cover object-top opacity-35 group-hover/media:opacity-55 transition-opacity duration-500"
          />
        )}
        {/* Center icon */}
        <div className="absolute inset-0 flex items-center justify-center">
          {hasVideo ? (
            <div
              className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center
                          bg-white/5 backdrop-blur-sm
                          group-hover/media:border-white/40 group-hover/media:bg-white/10 group-hover/media:scale-110
                          transition-all duration-300"
              style={{ boxShadow: "0 0 20px rgba(255,255,255,0.06), 0 0 40px rgba(79,141,184,0.08)" }}
            >
              <svg className="w-5 h-5 text-white/70 group-hover/media:text-white/90 ml-0.5 transition-colors duration-300" fill="currentColor" viewBox="0 0 24 24">
                <path d="M8 5v14l11-7z" />
              </svg>
            </div>
          ) : (
            <div
              className="flex items-center gap-2.5 px-4 py-2 rounded-full border border-white/15 bg-white/5 backdrop-blur-sm
                          group-hover/media:border-white/30 group-hover/media:bg-white/10 transition-all duration-300"
              style={{ boxShadow: "0 0 20px rgba(255,255,255,0.04), 0 0 40px rgba(79,141,184,0.06)" }}
            >
              <svg className="w-4 h-4 text-white/60 group-hover/media:text-white/80 transition-colors duration-300" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909M3.75 21h16.5A2.25 2.25 0 0022.5 18.75V5.25A2.25 2.25 0 0020.25 3H3.75A2.25 2.25 0 001.5 5.25v13.5A2.25 2.25 0 003.75 21z" />
              </svg>
              <span className="font-mono text-[10px] tracking-wider uppercase text-white/50 group-hover/media:text-white/80 transition-colors duration-300">
                {media.length} {media.length === 1 ? "screenshot" : "screenshots"}
              </span>
            </div>
          )}
        </div>
        {/* Count badge for carousels */}
        {isCarousel && (
          <div className="absolute top-3 right-3 px-2 py-0.5 rounded-full bg-bg/60 border border-border/50">
            <span className="font-mono text-[10px] text-text-muted/60">
              1/{media.length}
            </span>
          </div>
        )}
      </button>

      {/* Fullscreen modal */}
      {open && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center"
          onClick={() => setOpen(false)}
        >
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/90 backdrop-blur-sm"
          />

          {/* Close button */}
          <button
            onClick={() => setOpen(false)}
            className="absolute top-6 right-6 z-10 w-10 h-10 rounded-full bg-white/5 border border-white/10
                       flex items-center justify-center text-white/60 hover:text-white hover:bg-white/10
                       transition-all duration-200"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="relative z-10 w-full max-w-5xl max-h-[85vh] mx-6 flex items-center justify-center"
            onClick={(e) => e.stopPropagation()}
          >
            {media[current].type === "video" ? (
              <video
                src={media[current].src}
                autoPlay
                muted
                loop
                playsInline
                controls
                className="max-w-full max-h-[85vh] rounded-sm"
              />
            ) : (
              <div className="relative max-w-full max-h-[85vh] flex items-center justify-center bg-black rounded-sm overflow-hidden"
                style={{ aspectRatio: "16/9", width: "100%" }}
              >
                <Image
                  src={media[current].src}
                  alt={`${title} screenshot ${current + 1}`}
                  fill
                  className="object-contain"
                />
              </div>
            )}
          </motion.div>

          {/* Carousel nav */}
          {isCarousel && (
            <>
              <button
                onClick={(e) => { e.stopPropagation(); prev(); }}
                className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full
                           bg-white/5 border border-white/10 flex items-center justify-center
                           text-white/60 hover:text-white hover:bg-white/10 transition-all duration-200"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <button
                onClick={(e) => { e.stopPropagation(); next(); }}
                className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full
                           bg-white/5 border border-white/10 flex items-center justify-center
                           text-white/60 hover:text-white hover:bg-white/10 transition-all duration-200"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                </svg>
              </button>

              {/* Dots */}
              <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 flex gap-2">
                {media.map((_, i) => (
                  <button
                    key={i}
                    onClick={(e) => { e.stopPropagation(); setCurrent(i); }}
                    className={`h-1.5 rounded-full transition-all duration-300 ${
                      i === current
                        ? "bg-white w-6"
                        : "bg-white/25 w-1.5 hover:bg-white/50"
                    }`}
                  />
                ))}
              </div>

              {/* Counter */}
              <div className="absolute top-6 left-1/2 -translate-x-1/2 z-10">
                <span className="font-mono text-xs text-white/50">
                  {current + 1} / {media.length}
                </span>
              </div>
            </>
          )}
        </div>
      )}
    </>
  );
}

function ProjectCard({
  project,
  index,
}: {
  project: Project;
  index: number;
}) {
  const [tab, setTab] = useState<"technical" | "business">("technical");

  return (
    <motion.article
      custom={index}
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-80px" }}
      className="group relative border border-border rounded-sm overflow-hidden bg-surface"
    >
      {/* Header */}
      <div className="px-8 pt-8 pb-6 border-b border-border">
        <div className="flex items-start justify-between gap-4 mb-3">
          <h3 className="font-display text-3xl md:text-4xl font-light tracking-tight text-text">
            {project.title}
          </h3>
          {/* L1 */}
          <span className="font-mono text-label text-text-muted whitespace-nowrap mt-2">
            {project.year}
          </span>
        </div>
        {/* L3 */}
        <p className="font-body text-body-lg text-text-muted leading-relaxed max-w-2xl">
          {project.hook}
        </p>
        {/* L1 */}
        <p className="font-mono text-label text-sage mt-3">{project.role}</p>
      </div>

      {/* Media strip */}
      {project.media.length > 0 && (
        <MediaStrip media={project.media} title={project.title} />
      )}

      {/* Stack pills */}
      <div className="px-8 py-4 border-b border-border flex flex-wrap gap-2">
        {project.stack.map((tech) => (
          <span
            key={tech}
            className="px-3 py-1 text-label font-mono rounded-full border border-border text-text-muted
                       group-hover:border-accent-blue/30 transition-colors duration-300"
          >
            {tech}
          </span>
        ))}
      </div>

      {/* Tabs */}
      <div className="px-8 pt-5 flex gap-1">
        <button
          onClick={() => setTab("technical")}
          className={`px-4 py-2 text-body font-body font-medium rounded-t-sm transition-all duration-200 ${
            tab === "technical"
              ? "bg-bg text-accent-blue border border-border border-b-transparent"
              : "text-text-muted hover:text-text"
          }`}
        >
          Technical
        </button>
        <button
          onClick={() => setTab("business")}
          className={`px-4 py-2 text-body font-body font-medium rounded-t-sm transition-all duration-200 ${
            tab === "business"
              ? "bg-bg text-rose border border-border border-b-transparent"
              : "text-text-muted hover:text-text"
          }`}
        >
          Product &amp; Business
        </button>
      </div>

      {/* Tab content */}
      <div className="px-8 pb-8 pt-0">
        <div className="bg-bg border border-border rounded-b-sm rounded-tr-sm p-6">
          {/* L4 */}
          <h4
            className={`font-display text-sub-heading font-medium mb-5 ${
              tab === "technical" ? "text-accent-blue" : "text-rose"
            }`}
          >
            {tab === "technical"
              ? project.technical.heading
              : project.business.heading}
          </h4>
          <ul className="space-y-3">
            {(tab === "technical"
              ? project.technical.points
              : project.business.points
            ).map((point, i) => (
              <motion.li
                key={`${tab}-${i}`}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.05, duration: 0.3 }}
                className="flex gap-3 text-body leading-relaxed text-text-muted"
              >
                <span
                  className={`mt-1.5 w-1.5 h-1.5 rounded-full shrink-0 ${
                    tab === "technical" ? "bg-accent-blue" : "bg-rose"
                  }`}
                />
                {point}
              </motion.li>
            ))}
          </ul>
        </div>
      </div>

      {/* Links */}
      <div className="px-8 pb-6 flex gap-4">
        <a
          href={project.github}
          target="_blank"
          rel="noopener noreferrer"
          className="font-mono text-label text-accent-blue hover:text-text transition-colors duration-200 flex items-center gap-1.5"
        >
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
          </svg>
          Source
        </a>
        {project.link && (
          <a
            href={project.link}
            target="_blank"
            rel="noopener noreferrer"
            className="font-mono text-label text-sage hover:text-text transition-colors duration-200 flex items-center gap-1.5"
          >
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"
              />
            </svg>
            Live
          </a>
        )}
      </div>
    </motion.article>
  );
}

/* ─────────────────────────── SIDE NAV ─────────────────────────── */

const navItems = [
  { id: "about", label: "About" },
  { id: "experience", label: "Experience" },
  { id: "projects", label: "Projects" },
  { id: "technologies", label: "Technologies" },
];

function SideNav() {
  const [active, setActive] = useState("");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting);
        if (visible.length > 0) {
          // pick the one closest to the top
          const top = visible.reduce((a, b) =>
            a.boundingClientRect.top < b.boundingClientRect.top ? a : b
          );
          setActive(top.target.id);
        }
      },
      { rootMargin: "-30% 0px -60% 0px", threshold: 0 }
    );

    navItems.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <nav className="fixed left-6 lg:left-10 top-1/2 -translate-y-1/2 z-50 hidden md:flex flex-col items-center gap-0">
      {navItems.map((item, i) => {
        const isActive = active === item.id;
        return (
          <div key={item.id} className="flex flex-col items-center">
            {/* Connecting line above (not for first) */}
            {i > 0 && (
              <div
                className={`w-px h-10 transition-all duration-500 ease-out ${
                  isActive ? "bg-accent-blue/40" : "bg-border"
                }`}
                style={
                  isActive
                    ? { boxShadow: "0 0 4px rgba(79,141,184,0.2)" }
                    : undefined
                }
              />
            )}
            {/* Node */}
            <a
              href={`#${item.id}`}
              onClick={(e) => {
                e.preventDefault();
                document.getElementById(item.id)?.scrollIntoView({ behavior: "smooth" });
              }}
              className="group relative flex items-center"
            >
              {/* Dot */}
              <div
                className={`w-3 h-3 rounded-full border-2 transition-all duration-500 ease-out ${
                  isActive
                    ? "border-accent-blue bg-accent-blue scale-110"
                    : "border-border bg-bg hover:border-text-muted hover:scale-105"
                }`}
                style={
                  isActive
                    ? {
                        boxShadow:
                          "0 0 6px rgba(79,141,184,0.5), 0 0 16px rgba(79,141,184,0.25), 0 0 30px rgba(79,141,184,0.1)",
                      }
                    : undefined
                }
              />
              {/* Label */}
              <span
                className={`absolute left-6 whitespace-nowrap font-mono text-xs uppercase tracking-[0.2em] transition-all duration-500 ease-out ${
                  isActive
                    ? "text-accent-blue"
                    : "text-text-muted/40 group-hover:text-text-muted"
                }`}
              >
                {item.label}
              </span>
            </a>
            {/* Connecting line below (not for last) */}
            {i < navItems.length - 1 && (
              <div
                className={`w-px h-10 transition-all duration-500 ease-out ${
                  isActive || (navItems[i + 1] && active === navItems[i + 1].id)
                    ? "bg-accent-blue/40"
                    : "bg-border"
                }`}
                style={
                  isActive || (navItems[i + 1] && active === navItems[i + 1].id)
                    ? { boxShadow: "0 0 4px rgba(79,141,184,0.2)" }
                    : undefined
                }
              />
            )}
          </div>
        );
      })}
    </nav>
  );
}

/* ─────────────────────────── PAGE ─────────────────────────── */

export default function Home() {
  return (
    <main className="relative">
      <SideNav />

      {/* ── HERO ── */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background gradient */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-[#0C1015] via-[#101820] to-[#0C1015]" />
          <div className="absolute top-1/4 -left-1/4 w-[600px] h-[600px] bg-accent-blue/5 rounded-full blur-[120px]" />
          <div className="absolute bottom-1/4 -right-1/4 w-[500px] h-[500px] bg-rose/5 rounded-full blur-[120px]" />
        </div>

        <div className="relative z-10 max-w-6xl mx-auto px-6 py-20 grid md:grid-cols-2 gap-12 md:gap-16 items-center">
          {/* Photo */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="order-2 md:order-1 relative"
          >
            <div className="relative aspect-[3/4] max-w-[380px] mx-auto overflow-hidden rounded-sm">
              <Image
                src="/dmitry.jpeg"
                alt="Dmitry Starodubtsev"
                fill
                className="object-cover"
                priority
              />
              {/* Photo overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-bg/60 via-transparent to-transparent" />
            </div>
            {/* Decorative line */}
            <div className="absolute -bottom-4 -right-4 w-24 h-24 border-r border-b border-accent-blue/20 rounded-br-sm" />
          </motion.div>

          {/* Text */}
          <motion.div
            className="order-1 md:order-2"
            variants={stagger}
            initial="hidden"
            animate="visible"
          >
            {/* L1: Role label — small, spaced, colored. Entry point. */}
            <motion.p
              variants={fadeUp}
              custom={0}
              className="font-mono text-label text-accent-blue tracking-[0.25em] uppercase mb-5"
            >
              Software Engineer
            </motion.p>

            {/* L2: Name — dominant anchor. Largest element on page. */}
            <motion.h1
              variants={fadeUp}
              custom={1}
              className="font-display text-6xl md:text-7xl lg:text-8xl font-light leading-[0.9] tracking-tight mb-7"
            >
              <span className="inline-block mb-2">Dmitry</span>
              <br />
              <span className="text-accent-blue">Staro</span>dubtsev
            </motion.h1>

            {/* L3: Tagline — clear step down from name. 50-70 char line length. */}
            <motion.p
              variants={fadeUp}
              custom={2}
              className="text-lg md:text-xl text-text-muted leading-relaxed max-w-lg mb-10"
            >
              Building AI-powered platforms and high-load B2B systems.
              Michigan State &apos;26.
            </motion.p>

            {/* L4: Highlights — supporting proof. Step down from tagline. */}
            <motion.div
              variants={fadeUp}
              custom={3}
              className="grid grid-cols-2 gap-x-8 gap-y-5 mb-10 max-w-lg"
            >
              {[
                { stat: "2 platforms in production", detail: "school district ERP + AI platform for 5 universities" },
                { stat: "Shipped ahead of schedule", detail: "seed-stage startup, 4-person team" },
                { stat: "Scaled org 55%", detail: "450 to 700 members in 4 months" },
                { stat: "SpartaHack XI", detail: "Blockchain Track 3rd Place" },
              ].map((h, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 + i * 0.08, duration: 0.4 }}
                  className="border-l-2 border-accent-blue/30 pl-4 py-1"
                >
                  <p className="text-body font-body font-semibold text-text leading-snug">
                    {h.stat}
                  </p>
                  <p className="text-label font-mono text-text-muted leading-snug mt-1">
                    {h.detail}
                  </p>
                </motion.div>
              ))}
            </motion.div>

            {/* L5: Links — lowest hierarchy. Functional, not attention-grabbing. */}
            <motion.div
              variants={fadeUp}
              custom={4}
              className="flex gap-7"
            >
              <a
                href="https://github.com/stdmitry04"
                target="_blank"
                rel="noopener noreferrer"
                className="font-mono text-label text-[#9CA3AF] hover:text-[#c9d1d9] transition-colors duration-300"
              >
                GitHub
              </a>
              <a
                href="https://linkedin.com/in/stdmitry04"
                target="_blank"
                rel="noopener noreferrer"
                className="font-mono text-label text-[#4A90C2] hover:text-[#5BA0D6] transition-colors duration-300"
              >
                LinkedIn
              </a>
              <a
                href="mailto:starodu5@gmail.com"
                className="font-mono text-label text-[#C0796F] hover:text-[#EA4335] transition-colors duration-300"
                onClick={(e) => {
                  e.preventDefault();
                  navigator.clipboard.writeText("starodu5@gmail.com");
                  const el = e.currentTarget;
                  const original = el.textContent;
                  el.textContent = "Copied!";
                  el.classList.add("!text-sage");
                  setTimeout(() => {
                    el.textContent = original;
                    el.classList.remove("!text-sage");
                  }, 1500);
                }}
              >
                starodu5@gmail.com
              </a>
            </motion.div>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 1 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
            className="w-px h-12 bg-gradient-to-b from-transparent via-accent-blue/40 to-transparent"
          />
        </motion.div>
      </section>

      {/* ── ABOUT ── */}
      <section id="about" className="relative py-24 md:py-32">
        <div className="max-w-4xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            {/* L1 */}
            <p className="font-mono text-label text-sage tracking-[0.25em] uppercase mb-6">
              About
            </p>
            <p className="font-display text-2xl md:text-3xl font-light leading-relaxed text-text">
              Software Developer at{" "}
              <span className="text-accent-blue">APS Data Technologies</span>,
              building and deploying enterprise B2B software end-to-end —
              from system architecture to the client conversations that get
              it live. Graduated with a B.S. in Computer Science and Business
              minor, GPA 3.75, from Michigan State University in May 2026.
            </p>
            {/* L3 */}
            <p className="mt-6 text-body-lg text-text-muted leading-relaxed">
              I work across the full stack and stay embedded in client and
              stakeholder conversations — scoping requirements, aligning on
              technical direction, and owning the infrastructure that keeps
              things running in production. My goal is always shipping
              something that holds up and moves the right needle.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ── Divider ── */}
      <div className="max-w-6xl mx-auto px-6">
        <div className="h-px bg-gradient-to-r from-transparent via-border to-transparent" />
      </div>

      {/* ── EXPERIENCE ── */}
      <section id="experience" className="relative py-24 md:py-32">
        <div className="max-w-4xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-12"
          >
            {/* L1 */}
            <p className="font-mono text-label text-sage tracking-[0.25em] uppercase mb-5">
              Career
            </p>
            <h2 className="font-display text-4xl md:text-5xl font-light tracking-tight">
              Experience
            </h2>
          </motion.div>

          {/* Timeline */}
          <div className="relative pl-8 border-l border-border space-y-12">
            {/* APS */}
            <motion.div
              initial={{ opacity: 0, x: -15 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="relative"
            >
              <div className="absolute -left-[calc(2rem+5px)] top-1.5 w-2.5 h-2.5 rounded-full bg-accent-blue border-2 border-bg" />
              <p className="font-mono text-label text-accent-blue mb-1.5">
                April 2024 — Present
              </p>
              <h3 className="font-display text-sub-heading font-light text-text mb-1">
                Software Developer
              </h3>
              <p className="font-mono text-body text-sage mb-3">
                APS Data Technologies — EdTech B2B
              </p>
              <p className="text-body text-text-muted leading-relaxed">
                Building production AI-powered ATS systems processing 1,000+
                applications daily for K-12 school districts. Full-stack work
                across Django REST, Next.js, PostgreSQL, and AWS. Led
                development of a RAG-powered college application platform with
                OCR document pipelines and vector search.
              </p>
            </motion.div>

            {/* Safety Straw */}
            <motion.div
              initial={{ opacity: 0, x: -15 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="relative"
            >
              <div className="absolute -left-[calc(2rem+5px)] top-1.5 w-2.5 h-2.5 rounded-full bg-accent-blue border-2 border-bg" />
              <p className="font-mono text-label text-accent-blue mb-1.5">
                September 2024 — December 2024
              </p>
              <h3 className="font-display text-sub-heading font-light text-text mb-1">
                Software Engineer
              </h3>
              <p className="font-mono text-body text-sage mb-3">
                Safety Straw — Seed-stage Safety Tech Startup
              </p>
              <p className="text-body text-text-muted leading-relaxed">
                Delivered e-commerce platform with 4-person team 25% ahead of
                timeline. Built frontend and CI/CD pipeline reducing deployment
                from hours to minutes. Architected RESTful API connecting React
                to Express/MongoDB with JWT auth and role-based access control.
              </p>
            </motion.div>

            {/* Imagine Software */}
            <motion.div
              initial={{ opacity: 0, x: -15 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.15 }}
              className="relative"
            >
              <div className="absolute -left-[calc(2rem+5px)] top-1.5 w-2.5 h-2.5 rounded-full bg-rose border-2 border-bg" />
              <p className="font-mono text-label text-rose mb-1.5">
                September 2024 — May 2025
              </p>
              <h3 className="font-display text-sub-heading font-light text-text mb-1">
                Operations &amp; Growth Lead
              </h3>
              <p className="font-mono text-body text-sage mb-3">
                Imagine Software — Student Organization
              </p>
              <p className="text-body text-text-muted leading-relaxed">
                Scaled student tech org 55% from 450 to 700 members. Conducted
                20+ technical interviews for client project staffing.
              </p>
            </motion.div>

            {/* Education */}
            <motion.div
              initial={{ opacity: 0, x: -15 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="relative"
            >
              <div className="absolute -left-[calc(2rem+5px)] top-1.5 w-2.5 h-2.5 rounded-full bg-sage border-2 border-bg" />
              <p className="font-mono text-label text-sage mb-1.5">
                Aug 2022 — May 2026
              </p>
              <h3 className="font-display text-sub-heading font-light text-text mb-1">
                B.S. Computer Science, Business Minor
              </h3>
              <p className="font-mono text-body text-sage mb-3">
                Michigan State University
              </p>
              <p className="text-body text-text-muted leading-relaxed">
                GPA 3.75. SpartaHack XI Blockchain Track 3rd Place.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── Divider ── */}
      <div className="max-w-6xl mx-auto px-6">
        <div className="h-px bg-gradient-to-r from-transparent via-border to-transparent" />
      </div>

      {/* ── PROJECTS ── */}
      <section id="projects" className="relative py-24 md:py-32">
        <div className="max-w-6xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-16"
          >
            {/* L1 */}
            <p className="font-mono text-label text-sage tracking-[0.25em] uppercase mb-5">
              Case Studies
            </p>
            <h2 className="font-display text-4xl md:text-5xl font-light tracking-tight">
              Selected Work
            </h2>
          </motion.div>

          <div className="grid gap-8">
            {projects.map((project, i) => (
              <ProjectCard key={project.title} project={project} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* ── Divider ── */}
      <div className="max-w-6xl mx-auto px-6">
        <div className="h-px bg-gradient-to-r from-transparent via-border to-transparent" />
      </div>

      {/* ── SKILLS ── */}
      <section id="technologies" className="relative py-24 md:py-32">
        <div className="max-w-6xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-16"
          >
            {/* L1 */}
            <p className="font-mono text-label text-sage tracking-[0.25em] uppercase mb-5">
              Toolkit
            </p>
            <h2 className="font-display text-4xl md:text-5xl font-light tracking-tight">
              Technologies
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {Object.entries(skills).map(([category, items], catIdx) => (
              <motion.div
                key={category}
                custom={catIdx}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
              >
                {/* L1 */}
                <h3 className="font-mono text-label text-accent-blue tracking-wider uppercase mb-4">
                  {category}
                </h3>
                <ul className="space-y-2.5">
                  {items.map((item) => (
                    <li
                      key={item}
                      className="text-body text-text-muted hover:text-text transition-colors duration-200"
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="border-t border-border py-12">
        <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6">
          <p className="font-display text-lg font-light text-text-muted">
            Dmitry Starodubtsev
          </p>
          <div className="flex gap-6">
            <a
              href="https://github.com/stdmitry04"
              target="_blank"
              rel="noopener noreferrer"
              className="font-mono text-label text-[#9CA3AF] hover:text-[#c9d1d9] transition-colors duration-300"
            >
              GitHub
            </a>
            <a
              href="https://linkedin.com/in/stdmitry04"
              target="_blank"
              rel="noopener noreferrer"
              className="font-mono text-label text-[#4A90C2] hover:text-[#5BA0D6] transition-colors duration-300"
            >
              LinkedIn
            </a>
            <a
              href="mailto:starodu5@gmail.com"
              className="font-mono text-label text-[#C0796F] hover:text-[#EA4335] transition-colors duration-300"
              onClick={(e) => {
                e.preventDefault();
                navigator.clipboard.writeText("starodu5@gmail.com");
                const el = e.currentTarget;
                const original = el.textContent;
                el.textContent = "Copied!";
                el.classList.add("!text-sage");
                setTimeout(() => {
                  el.textContent = original;
                  el.classList.remove("!text-sage");
                }, 1500);
              }}
            >
              starodu5@gmail.com
            </a>
          </div>
        </div>
      </footer>
    </main>
  );
}
