import Link from "next/link";
import { Button } from "@/components/ui/button";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col bg-slate-50 text-black">
      <Header />
      <main className="grow w-full flex items-center justify-center px-4 py-16 sm:py-24">
        <div className="max-w-md w-full text-center space-y-6">
          <p className="text-7xl sm:text-8xl font-bold text-amber-500">404</p>
          <h1 className="text-2xl sm:text-3xl font-semibold text-slate-900">
            Page not found
          </h1>
          <p className="text-slate-600">
            The page you&apos;re looking for doesn&apos;t exist or has been
            moved.
          </p>
          <Button
            asChild
            className="bg-amber-500 hover:bg-amber-600 text-white font-bold"
          >
            <Link href="/">Back to Home</Link>
          </Button>
        </div>
      </main>
      <Footer />
    </div>
  );
}
