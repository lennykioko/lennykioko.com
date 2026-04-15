"use client";

import { useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="flex min-h-screen flex-col bg-slate-50 text-black">
      <Header />
      <main className="grow w-full flex items-center justify-center px-4 py-16 sm:py-24">
        <div className="max-w-md w-full text-center space-y-6">
          <p className="text-5xl sm:text-6xl font-bold text-amber-500">
            Something went wrong
          </p>
          <p className="text-slate-600">
            An unexpected error occurred. Please try again, and if the problem
            persists reach out so it can be looked into.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button
              onClick={reset}
              className="bg-amber-500 hover:bg-amber-600 text-white font-bold"
            >
              Try again
            </Button>
            <Button
              asChild
              variant="outline"
              className="border-amber-400 text-slate-700 hover:bg-amber-50"
            >
              <Link href="/">Back to Home</Link>
            </Button>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
