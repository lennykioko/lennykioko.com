import type { Metadata, Viewport } from "next";
import { Quicksand } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";

const quicksand = Quicksand({
  variable: "--font-quicksand",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL_SEO || "https://lennykioko.com";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Lenny Kioko - Software Engineer | Financial Technology",
    template: "%s | Lenny Kioko",
  },
  description:
    "Software Engineer & Financial Technology specialist based in Nairobi, Kenya",
  keywords:
    "Software Engineer, Financial Technology, FinTech, React, Next.js, React Native, TypeScript, Python, Pine Script, MetaTrader, TradingView, Stocks, Shares, Mentor, Coach, Consultant, Techie, Nairobi, Kenya",
  authors: [{ name: "Lenny Kioko" }],
  alternates: { canonical: siteUrl },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body
        className={quicksand.variable + " antialiased"}
        suppressHydrationWarning={true}
      >
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
