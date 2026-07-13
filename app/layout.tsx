import type { Metadata } from "next";
import { Cormorant, Syne, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const cormorant = Cormorant({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
});

const syne = Syne({
  variable: "--font-syne",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
});

const siteUrl = "https://dmitrystarodubtsev.com";

export const metadata: Metadata = {
  title: "Dmitry Starodubtsev — Backend & AI Engineer",
  description:
    "Backend and AI engineer specializing in production RAG pipelines, tool-calling agents with memory, and multi-tenant AWS infrastructure. Shipped a K-12 ERP platform serving 1,650+ daily users, an AI admissions platform with 5 university partners, and full-stack e-commerce with an autonomous AI support agent for a seed-stage startup.",
  keywords: [
    "Dmitry Starodubtsev",
    "Dmitry Starodubtsev MSU",
    "Dmitry Starodubtsev Michigan State University",
    "Dmitry Starodubtsev backend engineer",
    "Dmitry Starodubtsev AI engineer",
    "Dmitry Starodubtsev portfolio",
    "Dmitry Starodubtsev APS Data Technologies",
    "stdmitry04",
    "RAG systems",
    "AI agents",
    "tool calling",
    "agentic systems",
    "cross-encoder reranker",
    "semantic chunking",
    "vector search",
    "LangGraph",
    "Qdrant",
    "RBAC",
    "capability-based permissions",
    "Django",
    "Celery",
    "multi-tenant SaaS",
    "EdTech",
    "K12 ERP",
    "backend engineer",
    "production AI",
    "eval design",
    "async processing",
    "AWS infrastructure",
    "Stripe integration",
    "Node.js",
    "e-commerce backend",
    "AI support agent",
    "OCR pipeline",
    "per-user memory",
    "stride scheduling",
    "C++ WebAssembly",
  ],
  authors: [{ name: "Dmitry Starodubtsev" }],
  creator: "Dmitry Starodubtsev",
  metadataBase: new URL(siteUrl),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteUrl,
    siteName: "Dmitry Starodubtsev",
    title: "Dmitry Starodubtsev — Backend & AI Engineer",
    description:
      "Backend and AI engineer specializing in production RAG pipelines, tool-calling agents with memory, and multi-tenant AWS infrastructure. Shipped a K-12 ERP platform serving 1,650+ daily users, an AI admissions platform with 5 university partners, and full-stack e-commerce with an autonomous AI support agent for a seed-stage startup.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Dmitry Starodubtsev — Backend & AI Engineer",
    description:
      "Backend and AI engineer specializing in production RAG pipelines, tool-calling agents with memory, and multi-tenant AWS infrastructure. Shipped a K-12 ERP platform serving 1,650+ daily users, an AI admissions platform with 5 university partners, and full-stack e-commerce with an autonomous AI support agent for a seed-stage startup.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${cormorant.variable} ${syne.variable} ${jetbrainsMono.variable} h-full antialiased`}
    >
      <head>
        {/* JSON-LD structured data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              name: "Dmitry Starodubtsev",
              url: siteUrl,
              jobTitle: "Backend & AI Engineer",
              worksFor: {
                "@type": "Organization",
                name: "APS Data Technologies",
              },
              alumniOf: {
                "@type": "CollegeOrUniversity",
                name: "Michigan State University",
              },
              knowsAbout: [
                "RAG Systems",
                "AI Agents",
                "Tool Calling",
                "Agentic Systems",
                "Cross-Encoder Reranking",
                "Semantic Chunking",
                "Vector Search",
                "LangGraph",
                "Eval Design",
                "Multi-Tenant SaaS",
                "Capability-Based RBAC",
                "Django",
                "Celery",
                "Qdrant",
                "AWS",
                "PostgreSQL",
                "Async Processing",
                "OCR Pipelines",
                "Per-User Memory",
                "Stripe Integration",
                "Node.js",
                "EdTech",
                "Backend Engineering",
                "Stride Scheduling",
                "WebAssembly",
              ],
              sameAs: [
                "https://github.com/stdmitry04",
                "https://linkedin.com/in/stdmitry04",
              ],
            }),
          }}
        />
      </head>
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
