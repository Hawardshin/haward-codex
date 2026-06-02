import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Workspace Monitor",
  description: "Platform-first workspace dashboard for history, projects, agents, documents, and guest CLI adapters."
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ko">
      <body>{children}</body>
    </html>
  );
}
