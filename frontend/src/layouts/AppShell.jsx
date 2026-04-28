import { Outlet } from "react-router-dom";
import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";

export function AppShell() {
  return (
    <div className="min-h-dvh">
      <div className="pointer-events-none fixed inset-0 opacity-[0.06] mix-blend-overlay">
        <div className="h-full w-full bg-[url('https://images.unsplash.com/photo-1541701494587-cb58502866ab?auto=format&fit=crop&w=800&q=60')] bg-cover blur-3xl" />
      </div>

      <Navbar />

      <div className="mx-auto w-full max-w-[1240px] px-4 pb-20 pt-10 sm:px-6 lg:px-8">
        <Outlet />
      </div>

      <Footer />
    </div>
  );
}

