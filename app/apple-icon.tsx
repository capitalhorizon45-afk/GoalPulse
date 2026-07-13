import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: 180,
          height: 180,
          background: "#0B0B0F",
          borderRadius: 36,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div
          style={{
            fontSize: 108,
            color: "#00C8FF",
            fontWeight: 900,
            lineHeight: 1,
          }}
        >
          ⚡
        </div>
      </div>
    ),
    { ...size }
  );
}
