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
  title: "Dmitry Starodubtsev — Full-Stack Software Engineer | Michigan State University",
  description:
    "Dmitry Starodubtsev is a full-stack software engineer and developer at APS Data Technologies, building AI-powered platforms and high-load B2B systems. Computer Science student at Michigan State University (MSU), graduating May 2026. Portfolio with case studies in Django, Next.js, React, AWS, and AI/ML.",
  keywords: [
    "Dmitry Starodubtsev",
    "Dmitry Starodubtsev MSU",
    "Dmitry Starodubtsev Michigan State University",
    "Dmitry Starodubtsev software developer",
    "Dmitry Starodubtsev software engineer",
    "Dmitry Starodubtsev portfolio",
    "Dmitry Starodubtsev APS Data Technologies",
    "full-stack engineer Michigan State",
    "AI software developer MSU",
    "stdmitry04",
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
    title: "Dmitry Starodubtsev — Full-Stack Software Engineer",
    description:
      "Full-stack software engineer building AI-powered platforms and high-load B2B systems. Michigan State University CS '26. Portfolio featuring production-scale projects in Django, Next.js, and AI/ML.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Dmitry Starodubtsev — Full-Stack Software Engineer",
    description:
      "Full-stack software engineer building AI-powered platforms and high-load B2B systems. Michigan State University CS '26.",
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
              jobTitle: "Full-Stack Software Engineer",
              worksFor: {
                "@type": "Organization",
                name: "APS Data Technologies",
              },
              alumniOf: {
                "@type": "CollegeOrUniversity",
                name: "Michigan State University",
              },
              knowsAbout: [
                "Full-Stack Development",
                "AI/ML",
                "Django",
                "Next.js",
                "React",
                "TypeScript",
                "PostgreSQL",
                "AWS",
                "Python",
                "Distributed Systems",
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
