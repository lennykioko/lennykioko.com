import type { Metadata, Viewport } from "next";
import { Quicksand } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";
import { jsonLd } from "@/lib/sanitize";

const quicksand = Quicksand({
  variable: "--font-quicksand",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL_SEO || "https://lennykioko.com";

const siteTitle =
  "Lenny Kioko - Tech Consultant - I help businesses save time & boost revenue using technology";
const siteDescription =
  "Tech Consultant helping businesses save time and grow revenue with simple, practical technology — custom software, automation, and AI where it pays off. Based in Nairobi, Kenya.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: siteTitle,
    template: "%s | Lenny Kioko",
  },
  description: siteDescription,
  keywords:
    "Tech Consultant, Software Consultant, Custom Software, Business Automation, AI, FinTech, Internal Tools, React, Next.js, React Native, TypeScript, Python, Pine Script, MetaTrader, TradingView, Mentor, Coach, Consultant, Techie, Nairobi, Kenya",
  authors: [{ name: "Lenny Kioko" }],
  creator: "Lenny Kioko",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteUrl,
    siteName: "Lenny Kioko",
    title: siteTitle,
    description: siteDescription,
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: siteTitle,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: siteTitle,
    description: siteDescription,
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

const personSchema = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Lenny Kioko",
  url: siteUrl,
  image: `${siteUrl}/cityzen.jpg`,
  jobTitle: "Tech Consultant",
  description: siteDescription,
  address: {
    "@type": "PostalAddress",
    addressLocality: "Nairobi",
    addressCountry: "KE",
  },
  sameAs: [
    "https://www.linkedin.com/in/lennykioko/",
    "https://github.com/lennykioko",
    "https://x.com/lenny_kioko",
    "https://www.youtube.com/@TradesbyLennyKioko/",
    "https://www.instagram.com/lenny_kioko/",
    "https://t.me/TradesbyLennyKioko/",
    "https://www.tiktok.com/@lenny_kioko",
  ],
};

const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "Lenny Kioko",
  url: siteUrl,
  inLanguage: "en",
  publisher: {
    "@type": "Person",
    name: "Lenny Kioko",
    url: siteUrl,
  },
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
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: jsonLd(personSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: jsonLd(websiteSchema) }}
        />
        <script
          defer
          src="https://cloud.umami.is/script.js"
          data-website-id="89031aed-3d8f-4a4e-bbc4-2b093e29df21"
        />
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
