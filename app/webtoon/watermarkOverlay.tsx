"use client";

import { useEffect, useState } from "react";


type WatermarkOverlayProps = {
  userId?: string;
};

export default function WatermarkOverlay({ userId }: WatermarkOverlayProps) {

    const [id] = useState(() => {
  if (userId) return userId;
  if (typeof window === "undefined") return "guest";
  return new URLSearchParams(window.location.search).get("uid") ?? "guest";
});

  const text = id;
  
  const tile = encodeURIComponent(
    `<svg xmlns="http://www.w3.org/2000/svg" width="320" height="180">` +
      `<text x="50%" y="50%" fill="#000000" fill-opacity="0.10" ` +
      `font-family="sans-serif" font-size="16" text-anchor="middle" ` +
      `transform="rotate(-30 160 90)">${text}</text>` +
      `</svg>`,
  );

  return (
    <div
      aria-hidden
      style={{
        position: "fixed",
        inset: 0,
        pointerEvents: "none",
        backgroundImage: `url("data:image/svg+xml;utf8,${tile}")`,
        backgroundRepeat: "repeat",
      }}
    />
  );
}