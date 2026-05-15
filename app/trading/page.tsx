import { Metadata } from "next";
import Disclaimer from "../../components/Disclaimer";
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import Jumbotron from "../../components/Jumbotron";
import TradingResources from "../../components/TradingResources";
import Skills from "../../components/Skills";

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL_SEO || "https://lennykioko.com";

const title = "Trading";
const description =
  "Trading notes, tools and resources from Lenny Kioko — Tech Consultant and trader. Algorithmic trading, MetaTrader, Pine Script and FinTech. Based in Nairobi, Kenya.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: `${siteUrl}/trading` },
  openGraph: {
    type: "website",
    url: `${siteUrl}/trading`,
    title: `${title} | Lenny Kioko`,
    description,
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Lenny Kioko — Tech Consultant",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${title} | Lenny Kioko`,
    description,
    images: ["/og-image.png"],
  },
};

export default function Trading() {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-black">
      <Header />
      <main className="w-full flex flex-col">
        <Jumbotron />
        <Skills />
        <TradingResources />
      </main>
      <Disclaimer />
      <Footer />
    </div>
  );
}
