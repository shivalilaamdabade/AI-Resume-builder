import "./globals.css";
import type { ReactNode } from "react";

export const metadata = {
  title: "AI Resume Builder — Build Track",
  description: "KodNest Premium Build System — Project 3"
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}

