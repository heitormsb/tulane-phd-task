import type { Metadata, Viewport } from "next";
import { Document } from "@/components/document";
import { SITE_URL } from "@/copy/site";
import "../globals.css";

export const metadata: Metadata = { metadataBase: new URL(SITE_URL) };
export const viewport: Viewport = { themeColor: "#f3f3f0", colorScheme: "light" };

export default function EnglishLayout({ children }: { children: React.ReactNode }) {
  return <Document lang="en">{children}</Document>;
}
