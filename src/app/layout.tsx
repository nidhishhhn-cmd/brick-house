import type { Metadata } from "next";
import { DM_Serif_Display, Inter } from "next/font/google";
import "./globals.css";

const dmSerif = DM_Serif_Display({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-serif",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Brick House — Good Food. Great Company. | Mangaluru",
    template: "%s | Brick House Mangaluru",
  },
  description:
    "Brick House is a warm, inviting restaurant in Mangaluru serving Continental, Chinese, North Indian, and fast food favorites. Located on New Balmatta Road, Bendoor.",
  keywords: [
    "Brick House",
    "restaurant",
    "Mangaluru",
    "Continental",
    "Chinese",
    "North Indian",
    "fast food",
    "Bendoor",
    "dining",
  ],
  openGraph: {
    title: "Brick House — Good Food. Great Company.",
    description:
      "A warm, inviting restaurant in the heart of Mangaluru, serving Continental, Chinese, North Indian, and fast food favorites crafted with care.",
    type: "website",
    locale: "en_IN",
    siteName: "Brick House Mangaluru",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${dmSerif.variable} ${inter.variable} h-full`}
    >
      <body className="min-h-full flex flex-col antialiased">{children}</body>
    </html>
  );
}
