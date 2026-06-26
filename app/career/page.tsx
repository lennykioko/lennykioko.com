import { Metadata } from "next";
import Experience from "../../components/Experience";
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import Jumbotron from "../../components/Jumbotron";

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL_SEO || "https://lennykioko.com";

const title = "Career";
const description =
  "Professional experience and career journey of Lenny Kioko — Tech Consultant helping businesses save time and grow revenue with simple, practical technology. Based in Nairobi, Kenya.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: `${siteUrl}/career` },
  openGraph: {
    type: "profile",
    url: `${siteUrl}/career`,
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

export default function Career() {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-black">
      <Header />
      <main className="w-full flex flex-col">
        <Jumbotron />
        <Experience />
      </main>
      <Footer />
    </div>
  );
}
