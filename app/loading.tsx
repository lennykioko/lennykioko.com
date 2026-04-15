import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function Loading() {
  return (
    <div className="flex min-h-screen flex-col bg-slate-50 text-black">
      <Header />
      <main className="grow w-full flex items-center justify-center px-4 py-16">
        <div
          role="status"
          aria-label="Loading"
          className="h-10 w-10 animate-spin rounded-full border-4 border-amber-200 border-t-amber-500"
        />
      </main>
      <Footer />
    </div>
  );
}
