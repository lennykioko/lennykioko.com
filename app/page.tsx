import { Metadata } from "next";
import Footer from "../components/Footer";
import Header from "../components/Header";
import Jumbotron from "../components/Jumbotron";
import Resources from "../components/Resources";
import Skills from "../components/Skills";

export const metadata: Metadata = {
  metadataBase: new URL("https://lennykioko.com"),
  title: "Lenny Kioko",
  description:
    "Tech Consultant helping businesses save time and grow revenue using simple, practical technology — custom software, automation, and AI where it pays off. Based in Nairobi, Kenya.",
  keywords:
    "Tech Consultant, Software Consultant, Custom Software, Business Automation, AI, FinTech, Internal Tools, React, Next.js, React Native, TypeScript, Python, Pine Script, MetaTrader, TradingView, Mentor, Coach, Consultant, Techie, Nairobi, Kenya",
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

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-black">
      <Header />
      <main className="w-full flex flex-col">
        <Jumbotron />
        <Skills />
        <Resources />
      </main>
      <Footer />
    </div>
  );
}
