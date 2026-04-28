import { Metadata } from "next";
import Disclaimer from "../../components/Disclaimer";
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import Jumbotron from "../../components/Jumbotron";
import TradingResources from "../../components/TradingResources";
import Skills from "../../components/Skills";

export const metadata: Metadata = {
  metadataBase: new URL("https://lennykioko.com"),
  title: "Lenny Kioko | Trading",
  description:
    "Trading notes, tools and resources from Lenny Kioko — Tech Consultant and trader. Algorithmic trading, MetaTrader, Pine Script and FinTech. Based in Nairobi, Kenya.",
  keywords:
    "Tech Consultant, FinTech, Algorithmic Trading, Pine Script, MetaTrader, TradingView, Stocks, Shares, Trading, Forex, Nairobi, Kenya",
  openGraph: {
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Lenny Kioko — Tech Consultant",
      },
    ],
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
