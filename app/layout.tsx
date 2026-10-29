import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "Komi — อ่านมังงะออนไลน์",
    template: "%s | Komi",
  },
  description:
    "สำรวจเรื่องใหม่และอ่านมังงะเรื่องโปรดได้ทุกหน้าจอ ตั้งแต่มือถือไปจนถึงคอมพิวเตอร์",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="th" data-scroll-behavior="smooth">
      <body>{children}</body>
    </html>
  );
}
