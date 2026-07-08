import type { Metadata } from "next";
import "@/app/globals.css";

export const metadata: Metadata = {
  title: "DRM",
  description: "DRM_TRIAL",
};


export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko">
      <body>
        {children}
      </body>
    </html>
  );
}