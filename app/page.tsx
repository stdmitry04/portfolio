"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useState, useEffect, useCallback } from "react";

/* ─────────────────────────── DATA ─────────────────────────── */

const projects = [
  {
    title: "APS Hiring Platform",
    hook: "Production ATS processing 1,000+ applications daily for K-12 school districts.",
    year: "2024 — Present",
    role: "Software Developer @ APS Data Technologies",
    stack: ["Django REST", "Next.js 15", "PostgreSQL", "React 19", "TypeScript", "Tailwind"],
    github: "https://github.com/stdmitry04/aps-main-demo",
    media: [] as { type: "image" | "video"; src: string }[],
    technical: {
      heading: "Architecture & Scale",
      points: [
        "Full hiring pipeline: job posting, applicant tracking, interview scheduling, offer generation, document collection, and onboarding — all in one system.",
        "Django 5.2 + DRF backend with PostgreSQL, serving a Next.js 15 + React 19 frontend. Type-safe API layer with TypeScript throughout.",
        "Multi-tenant architecture supporting concurrent school districts with isolated data. Role-based access across administrators, HR staff, and hiring managers.",
        "DocuSign integration for electronic signatures, SSO for district-wide authentication, and automated email workflows for candidate communication.",
        "Public demo represents ~40% of the production system — proprietary integrations and multi-tenant logic removed.",
      ],
    },
    business: {
      heading: "Impact & Outcomes",
      points: [
        "Replaces fragmented hiring workflows (spreadsheets, email chains, paper forms) with a unified platform for K-12 school districts.",
        "Processes 1,000+ applications daily in production — real scale with real school districts depending on uptime.",
        "Reduces time-to-hire by consolidating every step from job posting to employee onboarding into a single dashboard.",
        "Serves the EdTech B2B market: districts are the customers, applicants are the users. Both sides need intuitive UX despite complex backend logic.",
        "Directly contributes to staffing outcomes in education — a sector where unfilled positions have immediate impact on students.",
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
        "Built for the higher-ed admissions market where institutions manage thousands of applications per cycle with limited staff.",
        "Production system processes real applications for real institutions — not a proof of concept.",
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
        "AI course advisor: GPT-4 API route fetches relevant course reviews from Supabase and uses them as context to provide personalized academic advice.",
        "Supabase backend with PostgreSQL + Row-Level Security. 7-table schema: universities, courses, professors, junction tables, reviews, votes, profiles.",
        "Authentication via Supabase Auth (email + Google OAuth) with university email domain validation — only verified students can submit reviews.",
        "Review voting system (helpful/unhelpful) with per-user deduplication. CI/CD via GitHub Actions.",
      ],
    },
    business: {
      heading: "From Hackathon to Product",
      points: [
        "Built core at SpartaHack X (24-hour hackathon), then continued development for 9 months post-event — 153 total commits across the team.",
        "Solves a real problem: students choose courses with incomplete information. RateMyProfessor covers professors, but not the course content itself.",
        "University email gating ensures review quality and trustworthiness — only verified students from the relevant institution can contribute.",
        "AI advisor turns raw review data into actionable guidance: \"Based on 47 reviews, CSE 331 with Dr. X has heavy workload but excellent materials.\"",
        "Transactional email via Resend for verification flows. Deployed on Vercel for production-grade reliability.",
      ],
    },
  },
  {
    title: "Quikard",
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
    link: "https://quikard.net",
    technical: {
      heading: "Full-Stack Implementation",
      points: [
        "Next.js 15 + TypeScript frontend with Tailwind styling. FastAPI + SQLAlchemy backend with PostgreSQL/SQLite database.",
        "Apple Wallet Pass API integration: generates .pkpass files for NFC-enabled business card sharing directly from iPhone Wallet.",
        "QR code generation and encoding: each card gets a unique shareable URL and auto-generated QR code for physical-world distribution.",
        "Docker Compose for full-stack local development. Deployed at quikard.net with production traffic.",
        "Solo project — designed, built, and shipped end-to-end without a team.",
      ],
    },
    business: {
      heading: "Product & Market",
      points: [
        "Addresses a real friction point: paper business cards are wasteful and forgettable. Digital alternatives exist but most lack Apple Wallet integration.",
        "Apple Wallet pass means the card lives alongside boarding passes and tickets — high visibility, zero app install required for recipients.",
        "Live at quikard.net with real users creating and sharing cards. Not a demo — a shipped product.",
        "Solo project demonstrates full product ownership: ideation, design, engineering, deployment, and iteration.",
        "Potential B2B angle: companies can issue branded digital cards to employees with consistent formatting and contact info.",
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
    link: "https://volunteer-matchmaker.vercel.app",
    technical: {
      heading: "24-Hour Architecture",
      points: [
        "Swipe-based matching engine with composite scoring: proximity (geodistance), skills overlap, job urgency (time-decay weighting), and volunteer reliability rating.",
        "Real-time chat between matched volunteer and requester — no personal contact info exchanged. JWT-authenticated WebSocket-style messaging.",
        "Google Gemini API for AI-enhanced job descriptions and auto-generated listing images. Prompt engineering for community-appropriate tone.",
        "Ethereum smart contract (VolunteerLeaderboard.sol) for transparent donation tracking. Ethers.js frontend integration with on-chain monthly rounds.",
        "Leaflet maps with heatmap overlays for need-density visualization. Privacy-first: city-level display only, GPS coordinates never exposed.",
      ],
    },
    business: {
      heading: "Social Impact & Design",
      points: [
        "Addresses a coordination problem: elderly, disabled, and busy parents need help with everyday tasks, but finding reliable volunteers is friction-heavy.",
        "Swipe UX (familiar from dating apps) lowers the barrier to engagement — volunteers browse opportunities casually rather than committing upfront.",
        "Badge achievement system drives retention: Specialist, Firefighter, Anchor, Inclusionist tracks reward consistent, diverse volunteering.",
        "Blockchain donation leaderboard adds transparency for organizational donors — funds tracked on-chain, monthly rounds incentivize sustained giving.",
        "Built and deployed in 24 hours with a 4-person team. Live at volunteer-matchmaker.vercel.app. Demonstrates rapid execution under extreme constraints.",
      ],
    },
  },
  {
    title: "Practice Proj",
    hook: "AI-powered coding practice platform with sandboxed execution and GPT-4 generated challenges.",
    year: "2026",
    role: "Solo Developer",
    stack: ["Next.js 15", "FastAPI", "GPT-4", "PostgreSQL", "Monaco Editor", "Docker"],
    github: "https://github.com/stdmitry04/practice-proj",
    media: [] as { type: "image" | "video"; src: string }[],
    technical: {
      heading: "Execution Engine",
      points: [
        "GPT-4 generates unique coding exercises with test cases across React, JavaScript, Python, and C++. Structured output ensures consistent exercise format.",
        "Monaco Editor integration (same editor as VS Code) with language-specific syntax highlighting, autocompletion, and split-panel UI.",
        "Sandboxed code execution workers: user-submitted code runs in isolated environments with resource limits. Real-time test validation against generated test cases.",
        "FastAPI + PostgreSQL backend. Zustand for frontend state management. Docker Compose for reproducible multi-service development.",
        "Full exercise lifecycle: generate → code → execute → validate → feedback. All in-browser, no local toolchain required.",
      ],
    },
    business: {
      heading: "Learning Tool Design",
      points: [
        "Solves the \"stale problem set\" issue: AI-generated exercises are unique each time, preventing memorization and encouraging genuine problem-solving.",
        "Multi-language support (React, JS, Python, C++) makes it useful across different courses and skill levels — not locked to one ecosystem.",
        "Browser-based execution means zero setup: students don't need to install compilers, configure environments, or manage dependencies.",
        "Immediate feedback loop (write → run → see results) mirrors the way professional developers work, building good habits early.",
        "Solo project demonstrating AI integration for education — a growing market where personalized practice at scale is a key differentiator.",
      ],
    },
  },
];

const skills = {
  "AI / ML": ["OpenAI API", "RAG Systems", "Qdrant Vector DB", "Google Gemini", "GPT-4", "Embeddings"],
  Backend: ["Django REST", "FastAPI", "Node.js", "PostgreSQL", "Redis", "Supabase"],
  Frontend: ["React", "Next.js", "TypeScript", "Tailwind CSS", "Zustand", "Framer Motion"],
  Infrastructure: ["AWS (EC2, S3, RDS)", "Docker", "Terraform", "Vercel", "GitHub Actions", "CI/CD"],
};

/* ─────────────────────────── ANIMATIONS ─────────────────────────── */

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.6, ease: [0.22, 1, 0.36, 1] },
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
  project: (typeof projects)[0];
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
          <span className="font-mono text-xs text-text-muted whitespace-nowrap mt-2">
            {project.year}
          </span>
        </div>
        <p className="font-body text-base text-text-muted leading-relaxed max-w-2xl">
          {project.hook}
        </p>
        <p className="font-mono text-xs text-sage mt-3">{project.role}</p>
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
            className="px-3 py-1 text-xs font-mono rounded-full border border-border text-text-muted
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
          className={`px-4 py-2 text-sm font-body font-medium rounded-t-sm transition-all duration-200 ${
            tab === "technical"
              ? "bg-bg text-accent-blue border border-border border-b-transparent"
              : "text-text-muted hover:text-text"
          }`}
        >
          Technical
        </button>
        <button
          onClick={() => setTab("business")}
          className={`px-4 py-2 text-sm font-body font-medium rounded-t-sm transition-all duration-200 ${
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
          <h4
            className={`font-display text-xl font-medium mb-4 ${
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
                className="flex gap-3 text-sm leading-relaxed text-text-muted"
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
          className="font-mono text-xs text-accent-blue hover:text-text transition-colors duration-200 flex items-center gap-1.5"
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
            className="font-mono text-xs text-sage hover:text-text transition-colors duration-200 flex items-center gap-1.5"
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
                className={`absolute left-6 whitespace-nowrap font-mono text-[10px] uppercase tracking-[0.2em] transition-all duration-500 ease-out ${
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
            <motion.p
              variants={fadeUp}
              custom={0}
              className="font-mono text-xs text-accent-blue tracking-[0.3em] uppercase mb-6"
            >
              Full-Stack Engineer
            </motion.p>
            <motion.h1
              variants={fadeUp}
              custom={1}
              className="font-display text-6xl md:text-7xl lg:text-8xl font-light leading-[0.9] tracking-tight mb-6"
            >
              <span className="inline-block mb-2">Dmitry</span>
              <br />
              <span className="text-accent-blue">Staro</span>dubtsev
            </motion.h1>
            <motion.p
              variants={fadeUp}
              custom={2}
              className="text-base md:text-lg text-text-muted leading-relaxed max-w-md mb-8"
            >
              Building AI-powered platforms and high-load B2B systems.
              Michigan State &apos;26.
            </motion.p>
            <motion.div
              variants={fadeUp}
              custom={3}
              className="flex gap-6"
            >
              <a
                href="https://github.com/stdmitry04"
                target="_blank"
                rel="noopener noreferrer"
                className="font-mono text-xs text-[#9CA3AF] hover:text-[#c9d1d9] transition-colors duration-300"
              >
                GitHub
              </a>
              <a
                href="https://linkedin.com/in/stdmitry04"
                target="_blank"
                rel="noopener noreferrer"
                className="font-mono text-xs text-[#4A90C2] hover:text-[#5BA0D6] transition-colors duration-300"
              >
                LinkedIn
              </a>
              <a
                href="mailto:starodu5@gmail.com"
                className="font-mono text-xs text-[#C0796F] hover:text-[#EA4335] transition-colors duration-300"
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
            <p className="font-mono text-xs text-sage tracking-[0.3em] uppercase mb-6">
              About
            </p>
            <p className="font-display text-2xl md:text-3xl font-light leading-relaxed text-text">
              Software Developer at{" "}
              <span className="text-accent-blue">APS Data Technologies</span>,
              building production AI-powered platforms and high-load B2B
              systems. Studying Computer Science with a Business minor at
              Michigan State University — GPA 3.8, graduating May 2026.
            </p>
            <p className="mt-6 text-text-muted leading-relaxed">
              Focused on distributed systems, AI/ML, and high-performance
              computing. I build things that ship — from enterprise platforms
              processing thousands of applications daily to hackathon projects
              that turn into real products.
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
            <p className="font-mono text-xs text-sage tracking-[0.3em] uppercase mb-4">
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
              <p className="font-mono text-xs text-accent-blue mb-1">
                April 2024 — Present
              </p>
              <h3 className="font-display text-2xl font-light text-text mb-1">
                Software Developer
              </h3>
              <p className="font-mono text-sm text-sage mb-3">
                APS Data Technologies — EdTech B2B
              </p>
              <p className="text-sm text-text-muted leading-relaxed">
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
              <p className="font-mono text-xs text-accent-blue mb-1">
                September 2024 — December 2024
              </p>
              <h3 className="font-display text-2xl font-light text-text mb-1">
                Software Engineer
              </h3>
              <p className="font-mono text-sm text-sage mb-3">
                Safety Straw — Seed-stage Safety Tech Startup
              </p>
              <p className="text-sm text-text-muted leading-relaxed">
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
              <p className="font-mono text-xs text-rose mb-1">
                September 2024 — May 2025
              </p>
              <h3 className="font-display text-2xl font-light text-text mb-1">
                Operations &amp; Growth Lead
              </h3>
              <p className="font-mono text-sm text-sage mb-3">
                Imagine Software — Student Organization
              </p>
              <p className="text-sm text-text-muted leading-relaxed">
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
              <p className="font-mono text-xs text-sage mb-1">
                2022 — May 2026
              </p>
              <h3 className="font-display text-2xl font-light text-text mb-1">
                B.S. Computer Science
              </h3>
              <p className="font-mono text-sm text-sage mb-3">
                Michigan State University — Business Minor
              </p>
              <p className="text-sm text-text-muted leading-relaxed">
                GPA 3.8. SpartaHack XI Blockchain Track 3rd Place.
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
            <p className="font-mono text-xs text-sage tracking-[0.3em] uppercase mb-4">
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
            <p className="font-mono text-xs text-sage tracking-[0.3em] uppercase mb-4">
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
                <h3 className="font-mono text-xs text-accent-blue tracking-wider uppercase mb-4">
                  {category}
                </h3>
                <ul className="space-y-2">
                  {items.map((item) => (
                    <li
                      key={item}
                      className="text-sm text-text-muted hover:text-text transition-colors duration-200"
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
              className="font-mono text-xs text-[#9CA3AF] hover:text-[#c9d1d9] transition-colors duration-300"
            >
              GitHub
            </a>
            <a
              href="https://linkedin.com/in/stdmitry04"
              target="_blank"
              rel="noopener noreferrer"
              className="font-mono text-xs text-[#4A90C2] hover:text-[#5BA0D6] transition-colors duration-300"
            >
              LinkedIn
            </a>
            <a
              href="mailto:starodu5@gmail.com"
              className="font-mono text-xs text-[#C0796F] hover:text-[#EA4335] transition-colors duration-300"
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
