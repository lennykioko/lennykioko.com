import { Metadata } from "next";
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import Jumbotron from "../../components/Jumbotron";
import HobbyProjects from "../../components/HobbyProjects";
import Skills from "../../components/Skills";
import Volunteer from "../../components/Volunteer";

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL_SEO || "https://lennykioko.com";

const title = "Personal";
const description =
  "Personal projects, volunteer work and hobbies of Lenny Kioko — Tech Consultant based in Nairobi, Kenya. Helping businesses save time and grow revenue with simple, practical technology.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: `${siteUrl}/hobbies` },
  openGraph: {
    type: "website",
    url: `${siteUrl}/hobbies`,
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

export default function Personal() {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-black">
      <Header />
      <main className="w-full flex flex-col">
        <Jumbotron />
        <Skills />
        <Volunteer />
        <HobbyProjects />
      </main>
      <Footer />
    </div>
  );
}
