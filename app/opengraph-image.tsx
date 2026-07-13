import { ImageResponse } from "next/og";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "#0B0B0F",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 24 }}>
          <div
            style={{
              width: 100,
              height: 100,
              borderRadius: 28,
              background: "#00C8FF1A",
              border: "3px solid #00C8FF40",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 60,
              color: "#00C8FF",
            }}
          >
            ⚡
          </div>
          <div style={{ display: "flex", fontSize: 84, fontWeight: 900 }}>
            <span style={{ color: "#00C8FF" }}>Goal</span>
            <span style={{ color: "#FFFFFF" }}>Pulse</span>
          </div>
        </div>
        <div style={{ marginTop: 32, fontSize: 32, color: "#9CA3AF" }}>
          Live Scores, Fixtures &amp; Standings
        </div>
      </div>
    ),
    { ...size }
  );
}
