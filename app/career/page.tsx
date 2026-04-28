import { Metadata } from "next";
import Experience from "../../components/Experience";
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import Jumbotron from "../../components/Jumbotron";
import Skills from "../../components/Skills";

export const metadata: Metadata = {
  metadataBase: new URL("https://lennykioko.com"),
  title: "Career - Lenny Kioko",
  description:
    "Professional experience and career journey of Lenny Kioko — Tech Consultant helping businesses save time and grow revenue with simple, practical technology. Based in Nairobi, Kenya.",
  keywords:
    "Career, Experience, Professional, Tech Consultant, Software Consultant, Custom Software, Business Automation, AI, FinTech, Algorithmic Trading, Trader, ICT trader, Inner Circle Trader, Forex, Mentor, Coach, Consultant, Techie, Nairobi, Kenya",
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

export default function Career() {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-black">
      <Header />
      <main className="w-full flex flex-col">
        <Jumbotron />
        <Skills />
        <Experience />
      </main>
      <Footer />
    </div>
  );
}
