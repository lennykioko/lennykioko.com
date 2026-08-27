import { Metadata } from "next";
import Footer from "../components/Footer";
import Header from "../components/Header";
import Jumbotron from "../components/Jumbotron";
import Resources from "../components/Resources";
import Services from "../components/Services";

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL_SEO || "https://lennykioko.com";

export const metadata: Metadata = {
  alternates: { canonical: siteUrl },
};

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-black">
      <Header />
      <main className="w-full flex flex-col">
        <Jumbotron />
        <Services />
        <Resources />
      </main>
      <Footer />
    </div>
  );
}
