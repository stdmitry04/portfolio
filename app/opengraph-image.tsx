import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Dmitry Starodubtsev — Backend & AI Engineer";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px",
          background: "linear-gradient(135deg, #0C1015 0%, #13191F 50%, #0C1015 100%)",
          fontFamily: "system-ui, sans-serif",
          position: "relative",
        }}
      >
        {/* Dot grid pattern */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            opacity: 0.04,
            backgroundImage:
              "radial-gradient(circle at 1px 1px, #EDE8E3 1px, transparent 0)",
            backgroundSize: "32px 32px",
          }}
        />

        {/* Accent line */}
        <div
          style={{
            position: "absolute",
            left: 80,
            top: 80,
            bottom: 80,
            width: 3,
            background:
              "linear-gradient(to bottom, transparent, #4F8DB8, transparent)",
          }}
        />

        {/* Content */}
        <div style={{ display: "flex", flexDirection: "column", paddingLeft: 32 }}>
          <div
            style={{
              fontSize: 16,
              letterSpacing: "0.3em",
              color: "#4F8DB8",
              textTransform: "uppercase" as const,
              marginBottom: 24,
              fontWeight: 500,
            }}
          >
            BACKEND &amp; AI ENGINEER
          </div>

          <div
            style={{
              fontSize: 72,
              fontWeight: 300,
              color: "#EDE8E3",
              lineHeight: 1,
              marginBottom: 8,
            }}
          >
            Dmitry
          </div>
          <div
            style={{
              fontSize: 72,
              fontWeight: 300,
              lineHeight: 1,
              marginBottom: 32,
              display: "flex",
            }}
          >
            <span style={{ color: "#4F8DB8" }}>Staro</span>
            <span style={{ color: "#EDE8E3" }}>dubtsev</span>
          </div>

          <div
            style={{
              fontSize: 20,
              color: "#8A8680",
              lineHeight: 1.5,
              maxWidth: 600,
              marginBottom: 40,
            }}
          >
            Production RAG pipelines, tool-calling agents with memory, and
            multi-tenant systems.
          </div>

          <div style={{ display: "flex", gap: 24 }}>
            <div
              style={{
                fontSize: 13,
                color: "#6E8B72",
                letterSpacing: "0.15em",
              }}
            >
              github.com/stdmitry04
            </div>
            <div
              style={{
                fontSize: 13,
                color: "#6E8B72",
                letterSpacing: "0.15em",
              }}
            >
              linkedin.com/in/stdmitry04
            </div>
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
