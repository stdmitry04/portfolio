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

type Media = { type: "image" | "video"; src: string };

// A named group of bullets inside an Engineering tab (renders a #### sub-header).
type Section = { header: string; points: string[] };

// Engineering tab: either flat bullets (compact projects) or named sub-sections.
type EngTab = { label: string; sections?: Section[]; points?: string[] };

// Impact tab: prose-leaning bullets, no sub-headers.
type ImpactTab = { label: string; points: string[] };

type Project = {
  title: string;
  hook: string;
  year: string;
  role: string;
  stack: string[];
  github?: string;
  media: Media[];
  link?: string;
  linkLabel?: string;
  demo?: string;
  tier: 1 | 2;
  engineering: EngTab;
  impact?: ImpactTab; // tier 1 only
  note?: string; // tier 2 — replaces an empty business tab
};

const projects: Project[] = [
  /* ───────────── TIER 1 — PRODUCTION WORK ───────────── */
  {
    title: "ERP Platform for K12 Schools",
    hook: "Multi-tenant ERP connecting HR, payroll, and staff provisioning for K-12 school districts. Replaces manual clock-in, paper-based hiring workflows, and IT-gated access changes. Serves 1,650+ daily active users at the 7th largest Illinois school district.",
    year: "2025 — Present",
    role: "Backend Engineer @ APS Data Technologies",
    stack: ["Django REST", "Celery", "Next.js 15", "PostgreSQL", "AWS", "Terraform"],
    demo: "https://github.com/stdmitry04/opscore",
    media: [],
    tier: 1,
    engineering: {
      label: "Engineering",
      sections: [
        {
          header: "Problem",
          points: [
            "Districts ran HR, payroll, and staff provisioning across disconnected vendor portals with no unified view of a candidate or employee's status, no self-service role management, and manual candidate screening that took 2+ hours per batch.",
          ],
        },
        {
          header: "What I Built",
          points: [
            "Async hiring pipeline (Django + Celery + Redis) with idempotent retry and a dead-letter queue that keeps screening off the API request path so a Redis blip doesn't silently drop a candidate.",
            "Capability-based RBAC (deny-by-default, module.submodule.action) with a central permission registry that materializes on deploy and purges stale grants automatically, so districts manage roles through the admin UI without filing a ticket or triggering a redeploy.",
            "Tool-calling AI agent connected to live background-check and payroll APIs with per-user session memory, surfaced through a Next.js 15 frontend with DocuSign offer signing and SSO.",
          ],
        },
        {
          header: "Impact",
          points: [
            "1,650+ DAU at the 7th largest Illinois K-12 district; screening cut from 2 hours to 12 minutes; AI agent reduced routine ERP task time 5× by consolidating three separate vendor portals into one interface.",
          ],
        },
      ],
    },
  },
  {
    title: "Admissions & Career Platform for University Partners",
    hook: "AI-powered student support platform embedded with 5 university partners across the US and India. Guides international students through US college applications, internship searches, hackathons, and financing. RAG pipeline with cross-encoder reranking and per-user memory handles 200+ daily queries at 95%+ retrieval accuracy.",
    year: "2024 — 2025",
    role: "Backend Engineer @ APS Data Technologies",
    stack: ["Django REST", "Qdrant", "OpenAI", "LangGraph", "AWS S3/ECS/RDS", "Docker"],
    demo: "https://github.com/stdmitry04/opscore",
    media: [],
    tier: 1,
    engineering: {
      label: "AI & Systems",
      sections: [
        {
          header: "Problem",
          points: [
            "International students applying to US colleges had no advisor coverage across time zones and no way to get answers grounded in their own documents (essays, transcripts, visa situation) rather than generic guidance.",
          ],
        },
        {
          header: "What I Built",
          points: [
            "Async OCR pipeline that parses each student's uploaded documents on intake and embeds them into Qdrant, so every retrieval query is scoped to that student's actual materials, not a shared knowledge base.",
            "Two-stage RAG pipeline (OpenAI embeddings → cross-encoder reranker) with semantic chunking aligned to document structure, where the reranker closes the gap when the right document isn't the most similar one to the raw query.",
            "Per-user memory layer (Postgres + LangGraph) tracking document metadata and session summaries so returning students pick up where they left off without re-explaining their situation each session.",
          ],
        },
        {
          header: "Impact",
          points: [
            "5 university partners onboarded; 200+ daily queries at 95%+ retrieval accuracy; OCR pipeline replaced manual per-applicant document review for every new upload.",
          ],
        },
      ],
    },
  },
  {
    title: "Safety Straw",
    hook: "Full-stack build for a seed-stage startup making straws that chemically glow when a drink has been spiked. Owned the website, Stripe-integrated checkout, async notification system, and an AI agent for B2B order management.",
    year: "2024 — 2025",
    role: "Software Engineer @ Safety Straw (Seed-stage Startup)",
    stack: ["Node.js", "Express", "MongoDB", "Stripe", "React", "CI/CD"],
    github: undefined,
    media: [],
    tier: 1,
    engineering: {
      label: "Engineering",
      sections: [
        {
          header: "Problem",
          points: [
            "A seed-stage startup needed a working e-commerce system for two distinct channels (individual B2C purchases and bulk B2B venue orders) before launch, with no dedicated support staff to handle the inquiry volume that comes with it.",
          ],
        },
        {
          header: "What I Built",
          points: [
            "REST API (Node.js + Express + MongoDB) with JWT auth, Stripe checkout sessions, and async post-purchase notification queues that decouple payment processing from notification delivery so a slow email provider doesn't stall the checkout response.",
            "Separate B2B bulk order flow with volume pricing and restock logic isolated from B2C checkout, since mixing the two channels would have made both worse and complicated the agent's order lookup surface.",
            "Tool-calling AI support agent with sub-agents that queries live order and shipment data through internal and third-party APIs, escalating cleanly when a query is outside tool coverage rather than guessing.",
          ],
        },
        {
          header: "Impact",
          points: [
            "AI agent resolved 80%+ of customer inquiries autonomously at a company with zero dedicated support staff; shipped 25% ahead of schedule as the sole engineer across backend, frontend, payments, and AI.",
          ],
        },
      ],
    },
  },

  /* ───────────── TIER 2 — OTHER PROJECTS ───────────── */
  {
    title: "Multi-Agent Simulation Engine",
    hook: "Real-time civilization simulation supporting up to 50,000 concurrent agents. The scheduler is world-agnostic: any simulation plugs in by implementing a single DoAction interface, and the scheduler stays completely blind to agent and action types. Scaled using a 4-tier priority system (critical/gameplay/environment/misc) with async job queues, separating deterministic combat from construction tasks to prevent frame stalls.",
    year: "2026",
    role: "Product Lead — Team of 30",
    stack: ["C++23", "WebAssembly", "Emscripten", "Stride Scheduling", "Unit Testing"],
    github: "https://github.com/stdmitry04/scheduler",
    media: [
      { type: "video", src: "/previews/scheduler-demo.mp4" },
      { type: "image", src: "/previews/scheduler-1.jpg" },
      { type: "image", src: "/previews/scheduler-2.jpg" },
      { type: "image", src: "/previews/scheduler-3.jpg" },
    ],
    tier: 2,
    engineering: {
      label: "Engineering",
      sections: [
        {
          header: "Scheduling Architecture",
          points: [
            "Implemented stride scheduling where processes track virtual time position, with stride inversely proportional to priority. The scheduler always advances the furthest-behind process, ensuring fair proportional CPU allocation across 50,000+ agents.",
            "Organized execution into 4 tiers (CRITICAL 40%, GAMEPLAY 30%, ENVIRONMENT 20%, MISC 10%) with independent Scheduler instances per tier via composition.",
            "Set per-tier budgets with soft enforcement for CRITICAL (250ms overage allowed) and hard cutoff for others, preventing lower-tier processes from starving critical gameplay loops.",
            "Built in C++23 compiled to WebAssembly via Emscripten, designing clean interfaces between world state, agent behaviors, and rendering systems for a distributed 30-person team.",
            "Verified correctness across unit tests (Scheduler add/remove/priority/peek), integration tests (budget enforcement, tier isolation, edge cases), and starvation scenarios.",
          ],
        },
      ],
    },
  },
  {
    title: "OpsCore",
    hook: "Demo showing three production patterns: capability-based RBAC (why deny-by-default scales better), two-stage RAG (embedding + cross-encoder tradeoff), and agentic systems with tool execution and memory.",
    year: "2026",
    role: "Demo Project — open source",
    stack: ["Django REST", "Next.js 14", "PostgreSQL", "Redis", "Celery", "Qdrant", "Claude API"],
    github: "https://github.com/stdmitry04/opscore",
    link: "https://github.com/stdmitry04/opscore/blob/main/README.md",
    linkLabel: "README",
    media: [],
    tier: 2,
    engineering: {
      label: "Why each decision",
      points: [
        "RBAC: Districts need self-service role management — capability-based, deny-by-default, so a missing grant means denied without maintaining deny rules.",
        "RAG: Support agent needs 95%+ accuracy at sustainable cost — two-stage pipeline uses embedding for recall, cross-encoder for precision.",
        "Agent: Resume screening must complete even if client disconnects — Celery task, not streaming HTTP.",
      ],
    },
  },
  {
    title: "QuiKard",
    hook: "Built a digital business card service: create in under a minute, export to Apple Wallet without signing up, share via NFC tap.",
    year: "2025",
    role: "Solo Developer",
    stack: ["Next.js 15", "FastAPI", "PostgreSQL", "Apple Wallet API", "TypeScript", "Docker"],
    github: "https://github.com/stdmitry04/quikard",
    media: [
      { type: "image", src: "/previews/quikard-1.png" },
      { type: "image", src: "/previews/quikard-2.png" },
      { type: "image", src: "/previews/quikard-3.png" },
    ],
    tier: 2,
    engineering: {
      label: "Engineering",
      points: [
        "Next.js 15 + TypeScript frontend with Tailwind styling, FastAPI + SQLAlchemy backend on PostgreSQL/SQLite.",
        "Integrated Apple Wallet Pass API to generate .pkpass files on-the-fly, enabling NFC tap sharing directly from iPhone Wallet.",
        "Each card gets a unique shareable URL and auto-generated QR code for distributing physical cards without typing or links.",
      ],
    },
  },
  {
    title: "CourseChecker",
    hook: "Course review aggregator where only verified university students (via school email) can submit reviews. Tracks 5 rating dimensions (overall, difficulty, materials, workload, fairness) per professor and semester.",
    year: "2025",
    role: "Lead Developer (85 of 153 commits)",
    stack: ["Next.js 14", "Supabase", "GPT-4", "TypeScript", "Tailwind"],
    github: "https://github.com/neontap/spartahack",
    media: [{ type: "video", src: "/previews/coursechecker.mp4" }],
    tier: 2,
    engineering: {
      label: "Engineering",
      points: [
        "Tracks 5 independent rating axes (overall, difficulty, materials, workload, fairness) with granularity per professor and semester.",
        "Implemented pagination and incremental data fetching so the UI stays responsive as review count grows, avoiding full dataset loads on mount.",
        "Used Supabase RLS to enforce per-student data isolation, handle school email domain validation, and provide OAuth without custom auth infrastructure.",
      ],
    },
  },
  {
    title: "Volunteer Matchmaker",
    hook: "Volunteer matching system using composite scoring across proximity, skills, urgency, and reliability. Integrated Ethereum smart contracts for on-chain donation tracking. Won SpartaHack XI Blockchain Track 3rd Place.",
    year: "2026",
    role: "Team of 4 — SpartaHack XI | Blockchain Track 3rd Place",
    stack: ["Next.js 15", "Django REST", "Gemini AI", "Solidity", "Zustand"],
    github: "https://github.com/stdmitry04/Volunteer_Matchmaker",
    media: [],
    tier: 2,
    engineering: {
      label: "Engineering",
      points: [
        "Scoring algorithm weights proximity (geodistance), skill overlap, job urgency (time-decay for stale requests), and volunteer reliability rating to produce ranked matches.",
        "Built real-time messaging between matched volunteer and requester without exposing personal contact info, using JWT-authenticated channels.",
        "Deployed VolunteerLeaderboard smart contract on Ethereum for transparent donation tracking, integrated to frontend via Ethers.js.",
      ],
    },
  },
];

const skills = {
  "AI / ML": [
    "RAG Systems",
    "Vector Search (Qdrant)",
    "LLM Integration (GPT-4, OpenAI API)",
    "Embeddings",
    "Cross-encoder Reranking",
    "Agentic Systems (Tool Calling, Memory)",
    "Eval Design",
  ],
  Backend: [
    "Python",
    "Django REST",
    "FastAPI",
    "Celery",
    "Node.js",
    "REST APIs",
    "Async Processing",
    "RBAC",
    "Stripe",
  ],
  Frontend: ["TypeScript", "React", "Next.js", "HTML/CSS", "Tailwind CSS", "Zustand"],
  Infrastructure: [
    "AWS (ECS, RDS, S3)",
    "Terraform",
    "Docker",
    "CI/CD (GitHub Actions)",
    "CloudWatch",
    "Autoscaling",
  ],
  Databases: ["PostgreSQL", "Redis", "MongoDB", "Qdrant", "SQLite"],
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

/* GitHub + optional "Demo" / configurable link — shared by both card tiers */
function ProjectLinks({ github, link, linkLabel = "Live", demo }: { github?: string; link?: string; linkLabel?: string; demo?: string }) {
  return (
    <div className="flex gap-4">
      {github && (
        <a
          href={github}
          target="_blank"
          rel="noopener noreferrer"
          className="font-mono text-label text-accent-blue hover:text-text transition-colors duration-200 flex items-center gap-1.5"
        >
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
          </svg>
          GitHub
        </a>
      )}
      {demo && (
        <a
          href={demo}
          target="_blank"
          rel="noopener noreferrer"
          className="font-mono text-label text-accent-blue hover:text-text transition-colors duration-200 flex items-center gap-1.5"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M14 10l-2 1m0 0l-2-1m2 1v2.5M20 7l-2 1m2-1l-2-1m2 1v2.5M14 4l-2-1-2 1M4 7l2-1M4 7l2 1M4 7v2.5M12 21l-2-1m2 1l2-1m-2 1v-2.5M6 18l-2-1v-2.5M18 18l2-1v-2.5" />
          </svg>
          Demo
        </a>
      )}
      {link && (
        <a
          href={link}
          target="_blank"
          rel="noopener noreferrer"
          className="font-mono text-label text-sage hover:text-text transition-colors duration-200 flex items-center gap-1.5"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"
            />
          </svg>
          {linkLabel}
        </a>
      )}
    </div>
  );
}

function StackPills({ stack }: { stack: string[] }) {
  return (
    <div className="flex flex-wrap gap-2">
      {stack.map((tech) => (
        <span
          key={tech}
          className="px-3 py-1 text-label font-mono rounded-full border border-border text-text-muted
                     group-hover:border-accent-blue/30 transition-colors duration-300"
        >
          {tech}
        </span>
      ))}
    </div>
  );
}

/* ─── Tier 1: full production case study with Engineering / Impact tabs ─── */
function ProjectCard({ project, index }: { project: Project; index: number }) {
  const [tab, setTab] = useState<"engineering" | "impact">("engineering");
  const hasImpact = !!project.impact;

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
          <span className="font-mono text-label text-text-muted whitespace-nowrap mt-2">
            {project.year}
          </span>
        </div>
        <p className="font-body text-body-lg text-text-muted leading-relaxed max-w-2xl">
          {project.hook}
        </p>
        <p className="font-mono text-label text-sage mt-3">{project.role}</p>
      </div>

      {/* Media strip */}
      {project.media.length > 0 && (
        <MediaStrip media={project.media} title={project.title} />
      )}

      {/* Stack pills */}
      <div className="px-8 py-4 border-b border-border">
        <StackPills stack={project.stack} />
      </div>

      {/* Tabs */}
      <div className="px-8 pt-5 flex gap-1">
        <button
          onClick={() => setTab("engineering")}
          className={`px-4 py-2 text-body font-body font-medium rounded-t-sm transition-all duration-200 ${
            tab === "engineering"
              ? "bg-bg text-accent-blue border border-border border-b-transparent"
              : "text-text-muted hover:text-text"
          }`}
        >
          {project.engineering.label}
        </button>
        {hasImpact && (
          <button
            onClick={() => setTab("impact")}
            className={`px-4 py-2 text-body font-body font-medium rounded-t-sm transition-all duration-200 ${
              tab === "impact"
                ? "bg-bg text-rose border border-border border-b-transparent"
                : "text-text-muted hover:text-text"
            }`}
          >
            {project.impact!.label}
          </button>
        )}
      </div>

      {/* Tab content */}
      <div className="px-8 pb-8 pt-0">
        <div className="bg-bg border border-border rounded-b-sm rounded-tr-sm p-6">
          {tab === "engineering" ? (
            <div className="space-y-7">
              {(project.engineering.sections ?? [
                { header: "", points: project.engineering.points ?? [] },
              ]).map((section, si) => (
                <div key={section.header || si}>
                  {section.header && (
                    <h4 className="font-mono text-label uppercase tracking-[0.15em] text-accent-blue mb-4">
                      {section.header}
                    </h4>
                  )}
                  <ul className="space-y-3">
                    {section.points.map((point, i) => (
                      <motion.li
                        key={`eng-${si}-${i}`}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.04, duration: 0.3 }}
                        className="flex gap-3 text-body leading-relaxed text-text-muted"
                      >
                        <span className="mt-1.5 w-1.5 h-1.5 rounded-full shrink-0 bg-accent-blue" />
                        {point}
                      </motion.li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          ) : (
            <ul className="space-y-3">
              {project.impact!.points.map((point, i) => (
                <motion.li
                  key={`impact-${i}`}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05, duration: 0.3 }}
                  className="flex gap-3 text-body leading-relaxed text-text-muted"
                >
                  <span className="mt-1.5 w-1.5 h-1.5 rounded-full shrink-0 bg-rose" />
                  {point}
                </motion.li>
              ))}
            </ul>
          )}
        </div>
      </div>

      {/* Links */}
      <div className="px-8 pb-6">
        <ProjectLinks github={project.github} link={project.link} linkLabel={project.linkLabel} demo={project.demo} />
      </div>
    </motion.article>
  );
}

/* ─── Tier 2: compact card — single Engineering view, no tab toggle ─── */
function CompactProjectCard({ project, index }: { project: Project; index: number }) {
  const sections = project.engineering.sections ?? [
    { header: "", points: project.engineering.points ?? [] },
  ];

  return (
    <motion.article
      custom={index}
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-60px" }}
      className="group relative border border-border rounded-sm overflow-hidden bg-surface p-6 flex flex-col"
    >
      {/* Header */}
      <div className="flex items-start justify-between gap-3 mb-2">
        <h3 className="font-display text-2xl font-light tracking-tight text-text">
          {project.title}
        </h3>
        <span className="font-mono text-label text-text-muted whitespace-nowrap mt-1">
          {project.year}
        </span>
      </div>
      <p className="font-body text-body text-text-muted leading-relaxed mb-3">
        {project.hook}
      </p>
      <p className="font-mono text-label text-sage mb-4">{project.role}</p>

      {/* Media strip (if any) */}
      {project.media.length > 0 && (
        <div className="-mx-6 mb-4 border-y border-border">
          <MediaStrip media={project.media} title={project.title} />
        </div>
      )}

      {/* Engineering bullets */}
      <div className="space-y-5 mb-5">
        {sections.map((section, si) => (
          <div key={section.header || si}>
            {section.header && (
              <h4 className="font-mono text-label uppercase tracking-[0.15em] text-accent-blue mb-3">
                {section.header}
              </h4>
            )}
            <ul className="space-y-2.5">
              {section.points.map((point, i) => (
                <li
                  key={`c-${si}-${i}`}
                  className="flex gap-3 text-body leading-relaxed text-text-muted"
                >
                  <span className="mt-1.5 w-1.5 h-1.5 rounded-full shrink-0 bg-accent-blue" />
                  {point}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {project.note && (
        <p className="font-body text-label text-text-muted/70 italic mb-5">
          {project.note}
        </p>
      )}

      {/* Footer: stack + links */}
      <div className="mt-auto space-y-4">
        <StackPills stack={project.stack} />
        <ProjectLinks github={project.github} link={project.link} linkLabel={project.linkLabel} demo={project.demo} />
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
              Backend &amp; AI Engineer
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
              Building production RAG pipelines, tool-calling agents with
              memory, and multi-tenant backends with scalable AWS
              infrastructure. Michigan State CS &apos;26.
            </motion.p>

            {/* L4: Highlights — supporting proof. Step down from tagline. */}
            <motion.div
              variants={fadeUp}
              custom={3}
              className="grid grid-cols-2 gap-x-8 gap-y-5 mb-10 max-w-lg"
            >
              {[
                { stat: "ERP in production", detail: "7th largest K-12 district in Illinois" },
                { stat: "AI platform in production", detail: "5 university partners, US & Global" },
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
              Backend and AI engineer specializing in production RAG pipelines,
              tool-calling agents with memory, and multi-tenant backends with
              scalable AWS infrastructure. At{" "}
              <span className="text-accent-blue">APS Data Technologies</span>{" "}
              I&apos;ve shipped systems serving the 7th largest Illinois K-12
              district and 5 university partners — owning backend architecture,
              deployment, and the AI features end-to-end.
            </p>
            <p className="font-body text-body-lg text-text-muted leading-relaxed mt-6">
              I build things that hold up in production, not just in demos.
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
                April 2025 — Present
              </p>
              <h3 className="font-display text-sub-heading font-light text-text mb-1">
                Software Engineer
              </h3>
              <p className="font-mono text-body text-sage mb-3">
                APS Data Technologies — EdTech B2B
              </p>
              <p className="text-body text-text-muted leading-relaxed">
                Building production RAG pipelines, tool-calling AI agents with
                per-user memory, and multi-tenant backends with scalable AWS
                infrastructure serving the 7th largest Illinois K-12 district and
                5 university partners. Owned backend architecture end-to-end for
                async processing, vector search, and a capability-based RBAC
                system districts use to manage their own roles and permissions at
                runtime.
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
                September 2024 — April 2025
              </p>
              <h3 className="font-display text-sub-heading font-light text-text mb-1">
                Software Engineer
              </h3>
              <p className="font-mono text-body text-sage mb-3">
                Safety Straw — Seed-stage Safety Tech Startup
              </p>
              <p className="text-body text-text-muted leading-relaxed">
                Built an AI support agent with custom tools and sub-agents that
                resolved 80%+ of customer inquiries autonomously. Shipped the
                REST API backend with Stripe integration and async order
                workflows, plus the React storefront end-to-end as the sole
                engineer.
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
                GPA 3.75. SpartaHack XI Blockchain Track 3rd Place (among 100+ teams).
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

          {/* Tier 1 — Production Work */}
          <div className="mb-8">
            <p className="font-mono text-label text-accent-blue tracking-[0.2em] uppercase">
              Production Work
            </p>
          </div>
          <div className="grid gap-8">
            {projects
              .filter((p) => p.tier === 1)
              .map((project, i) => (
                <ProjectCard key={project.title} project={project} index={i} />
              ))}
          </div>

          {/* Tier 2 — Other Projects */}
          <div className="mt-20 mb-8">
            <p className="font-mono text-label text-text-muted tracking-[0.2em] uppercase">
              Other Projects
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            {projects
              .filter((p) => p.tier === 2)
              .map((project, i) => (
                <CompactProjectCard
                  key={project.title}
                  project={project}
                  index={i}
                />
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

          <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-8">
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
