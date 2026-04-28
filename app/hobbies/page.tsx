import { Metadata } from "next";
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import Jumbotron from "../../components/Jumbotron";
import HobbyProjects from "../../components/HobbyProjects";
import Skills from "../../components/Skills";
import Volunteer from "../../components/Volunteer";

export const metadata: Metadata = {
  metadataBase: new URL("https://lennykioko.com"),
  title: "Personal - Lenny Kioko",
  description:
    "Personal projects, volunteer work and hobbies of Lenny Kioko — Tech Consultant based in Nairobi, Kenya. Helping businesses save time and grow revenue with simple, practical technology.",
  keywords:
    "Personal, Volunteer, Hobby, Projects, Community, Open Source, Tech Consultant, Software Consultant, Custom Software, Business Automation, AI, FinTech, Algorithmic Trading, Trader, Mentor, Coach, Consultant, Techie, Nairobi, Kenya",
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
