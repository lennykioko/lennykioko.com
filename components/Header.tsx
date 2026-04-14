"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { GrLinkedin, GrGithub, GrInstagram, GrYoutube } from "react-icons/gr";
import { SiTelegram } from "react-icons/si";
import { FaXTwitter } from "react-icons/fa6";
import { AiOutlineHome } from "react-icons/ai";
import { MdWork, MdSportsEsports } from "react-icons/md";
import { TbChartCandle } from "react-icons/tb";
import { HiOutlinePencilAlt } from "react-icons/hi";
import { FiLogIn } from "react-icons/fi";
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

export default function Header() {
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

  return (
    <header className="flex w-full items-center justify-between border-b-2 border-amber-400 bg-slate-100">
      <div className="p-4 text-xl sm:text-2xl font-semibold">Lenny Kioko</div>
      <nav className="mr-2 sm:mr-4 flex items-center space-x-4 sm:space-x-8">
        {/* Navigation Links */}
        <div className="flex items-center space-x-3 sm:space-x-6">
          {navigationLinks.map(({ href, icon: Icon, label, color }) => (
            <Link
              key={label}
              href={href}
              aria-label={label}
              className={`transition-all hover:scale-110 ${color} flex items-center`}
            >
              <Icon className="h-5 w-5 sm:h-6 sm:w-6" />
              <span className="hidden lg:inline text-sm font-medium ml-1">
                {label}
              </span>
            </Link>
          ))}
        </div>

        {/* Divider */}
        <div className="w-px h-4 sm:h-6 bg-gray-300"></div>

        {/* Social Links */}
        <div className="flex items-center space-x-2 sm:space-x-4">
          {socialLinks.map(({ href, icon: Icon, label, color }) => (
            <a
              key={label}
              target="_blank"
              href={href}
              rel="noreferrer"
              aria-label={label}
              className={`transition-transform hover:scale-110 ${color}`}
            >
              <Icon className="h-5 w-5 sm:h-6 sm:w-6" />
            </a>
          ))}
          {showSignIn && (
            <Link
              href="/sign-in"
              aria-label="Sign in"
              title="Sign in"
              className="transition-transform hover:scale-110 text-gray-700 hover:text-amber-500"
            >
              <FiLogIn className="h-5 w-5 sm:h-6 sm:w-6" />
            </Link>
          )}
        </div>
      </nav>
    </header>
  );
}
