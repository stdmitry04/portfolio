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
    "Backend and AI engineer specializing in production RAG pipelines, tool-calling agents, and multi-tenant B2B infrastructure. Built systems serving the 7th largest Illinois K-12 district and 5 university partners.",
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
    "RBAC",
    "Django",
    "Celery",
    "Qdrant",
    "multi-tenant SaaS",
    "backend engineer",
    "production AI",
    "agentic systems",
    "cross-encoder reranker",
    "eval design",
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
      "Backend and AI engineer specializing in production RAG pipelines, tool-calling agents, and multi-tenant B2B infrastructure. Built systems serving the 7th largest Illinois K-12 district and 5 university partners.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Dmitry Starodubtsev — Backend & AI Engineer",
    description:
      "Backend and AI engineer specializing in production RAG pipelines, tool-calling agents, and multi-tenant B2B infrastructure. Built systems serving the 7th largest Illinois K-12 district and 5 university partners.",
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
                "Multi-Tenant SaaS",
                "RBAC",
                "Django",
                "Celery",
                "Qdrant",
                "AWS",
                "PostgreSQL",
                "Backend Engineering",
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
