"use client";

import { Suspense, useEffect, useState } from "react";
import { useSearchParams, usePathname } from "next/navigation";
import { GrLinkedin, GrGithub, GrInstagram, GrYoutube } from "react-icons/gr";
import { SiTelegram } from "react-icons/si";
import { FaXTwitter } from "react-icons/fa6";
import { AiOutlineHome } from "react-icons/ai";
import { MdWork, MdSportsEsports } from "react-icons/md";
import { TbChartCandle } from "react-icons/tb";
import { HiOutlinePencilAlt } from "react-icons/hi";
import { FiLogIn, FiMenu, FiX } from "react-icons/fi";
import Link from "next/link";

const navigationLinks = [
  {
    href: "/",
    icon: AiOutlineHome,
    label: "Home",
    color: "text-gray-700 hover:text-amber-500",
  },
  {
    href: "/career",
    icon: MdWork,
    label: "Career",
    color: "text-gray-700 hover:text-amber-500",
  },
  {
    href: "/trading",
    icon: TbChartCandle,
    label: "Trading",
    color: "text-gray-700 hover:text-amber-500",
  },
  {
    href: "/hobbies",
    icon: MdSportsEsports,
    label: "Hobbies",
    color: "text-gray-700 hover:text-amber-500",
  },
  {
    href: "/blog",
    icon: HiOutlinePencilAlt,
    label: "Blog",
    color: "text-gray-700 hover:text-amber-500",
  },
];

const socialLinks = [
  {
    href: "https://www.youtube.com/@TradesbyLennyKioko/",
    icon: GrYoutube,
    label: "YouTube",
    color: "text-red-600",
  },
  {
    href: "https://t.me/TradesbyLennyKioko/",
    icon: SiTelegram,
    label: "Telegram",
    color: "text-blue-500",
  },
  {
    href: "https://x.com/lenny_kioko",
    icon: FaXTwitter,
    label: "Twitter/X",
    color: "text-black",
  },
  {
    href: "https://www.linkedin.com/in/lennykioko/",
    icon: GrLinkedin,
    label: "LinkedIn",
    color: "text-blue-700",
  },
  {
    href: "https://github.com/lennykioko",
    icon: GrGithub,
    label: "GitHub",
    color: "text-gray-800",
  },
  {
    href: "https://www.instagram.com/lenny_kioko/",
    icon: GrInstagram,
    label: "Instagram",
    color: "text-pink-500",
  },
];

const ADMIN_FLAG_KEY = "lk_admin_ui";

function AdminSignIn({ iconOnly = true }: { iconOnly?: boolean }) {
  const searchParams = useSearchParams();
  const [showSignIn, setShowSignIn] = useState(false);

  useEffect(() => {
    if (searchParams.get("admin") === "1") {
      sessionStorage.setItem(ADMIN_FLAG_KEY, "1");
      setShowSignIn(true);
      return;
    }
    if (sessionStorage.getItem(ADMIN_FLAG_KEY) === "1") {
      setShowSignIn(true);
    }
  }, [searchParams]);

  if (!showSignIn) return null;
  return (
    <Link
      href="/sign-in"
      aria-label="Sign in"
      title="Sign in"
      className="flex h-10 items-center gap-1 px-1 text-gray-700 transition-transform hover:scale-110 hover:text-amber-500"
    >
      <FiLogIn className="h-5 w-5 sm:h-6 sm:w-6" />
      {!iconOnly && <span className="text-sm font-medium">Sign in</span>}
    </Link>
  );
}

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  return (
    <header className="relative w-full border-b-2 border-amber-400 bg-slate-100">
      <div className="flex items-center justify-between">
        <div className="p-4 text-xl font-semibold sm:text-2xl">Lenny Kioko</div>

        {/* Desktop nav (md and up) */}
        <nav className="mr-4 hidden items-center space-x-8 md:flex">
          <div className="flex items-center space-x-6">
            {navigationLinks.map(({ href, icon: Icon, label, color }) => (
              <Link
                key={label}
                href={href}
                aria-label={label}
                className={`flex min-h-11 items-center transition-all hover:scale-110 ${color}`}
              >
                <Icon className="h-6 w-6" />
                <span className="ml-1 hidden text-sm font-medium lg:inline">
                  {label}
                </span>
              </Link>
            ))}
          </div>

          <div className="h-6 w-px bg-gray-300" />

          <div className="flex items-center space-x-4">
            {socialLinks.map(({ href, icon: Icon, label, color }) => (
              <a
                key={label}
                target="_blank"
                href={href}
                rel="noreferrer"
                aria-label={label}
                className={`flex min-h-11 min-w-11 items-center justify-center transition-transform hover:scale-110 ${color}`}
              >
                <Icon className="h-6 w-6" />
              </a>
            ))}
            <Suspense fallback={null}>
              <AdminSignIn />
            </Suspense>
          </div>
        </nav>

        {/* Mobile toggle (below md) */}
        <button
          type="button"
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((v) => !v)}
          className="mr-2 flex h-11 w-11 items-center justify-center rounded-md text-gray-700 hover:text-amber-500 md:hidden"
        >
          {menuOpen ? (
            <FiX className="h-6 w-6" />
          ) : (
            <FiMenu className="h-6 w-6" />
          )}
        </button>
      </div>

      {/* Mobile menu panel */}
      {menuOpen && (
        <div className="absolute inset-x-0 top-full z-50 border-b-2 border-amber-400 bg-slate-100 shadow-md md:hidden">
          <nav className="flex flex-col px-4 py-2">
            {navigationLinks.map(({ href, icon: Icon, label, color }) => (
              <Link
                key={label}
                href={href}
                aria-label={label}
                className={`flex min-h-11 items-center gap-3 px-2 py-2 text-base font-medium ${color}`}
              >
                <Icon className="h-5 w-5" />
                <span>{label}</span>
              </Link>
            ))}
            <div className="my-2 h-px bg-gray-300" />
            <div className="flex flex-wrap items-center gap-x-1 gap-y-2 py-3">
              {socialLinks.map(({ href, icon: Icon, label, color }) => (
                <a
                  key={label}
                  target="_blank"
                  href={href}
                  rel="noreferrer"
                  aria-label={label}
                  className={`flex h-10 w-10 items-center justify-center ${color}`}
                >
                  <Icon className="h-6 w-6" />
                </a>
              ))}
              <Suspense fallback={null}>
                <AdminSignIn iconOnly={false} />
              </Suspense>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
