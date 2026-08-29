import type { Metadata, Viewport } from "next";
import { Baloo_2 } from "next/font/google";
import "./globals.css";

const baloo = Baloo_2({
  subsets: ["latin"],
  variable: "--font-baloo",
  weight: ["400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "VedaAI · AI Assessment Mapper",
  description:
    "Upload a question paper and a student answer sheet — extract, map, highlight and grade answers with AI.",
};

export const viewport: Viewport = {
  themeColor: "#f4571f",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${baloo.variable} font-sans antialiased`}>{children}</body>
    </html>
  );
}
