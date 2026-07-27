import { ImageResponse } from "next/og";
import fs from "node:fs";
import path from "node:path";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  const logoData = fs.readFileSync(path.join(process.cwd(), "public", "logo.png")).toString("base64");
  const logoSrc = `data:image/png;base64,${logoData}`;

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
          background: "#FFFFFF",
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={logoSrc} width={420} height={84} alt="" />
        <div
          style={{
            marginTop: 56,
            fontSize: 58,
            fontWeight: 700,
            color: "#1E1E1E",
            textAlign: "center",
            letterSpacing: "-0.02em",
          }}
        >
          Every image, ready to print.
        </div>
        <div style={{ marginTop: 20, fontSize: 30, color: "#5C5C5C" }}>Free DPI &amp; print image tools</div>
        <div style={{ display: "flex", marginTop: 48, width: 160, height: 6, background: "#1473E6", borderRadius: 3 }} />
      </div>
    ),
    { ...size }
  );
}
