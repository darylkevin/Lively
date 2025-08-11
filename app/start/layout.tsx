"use client";

import React, { useContext } from "react";
import RecordingContext from "../ui/contexts/RecordingContext";
// xs: 320
// sm: 640
// md: 768
// lg: 1024
// xl: 1280
// 2xl: 1536

// mobile-phones: 320px-480px
// tablets: 768px-1024px
// laptops: 1024px-1440px
// monitors: 1440px-2560px

import { navs, links } from "../lib/definitions";
import Link from "next/link";
import { usePathname } from "next/navigation";
import UsageContext from "../ui/contexts/UsageContext";

export default function Layout({ children }: { children: React.ReactNode }) {
  const MAX_LOCAL_CHARS_PER_DAY = Number(
    process.env.NEXT_PUBLIC_MAX_LOCAL_CHARS_PER_DAY,
  );
  const MAX_GLOBAL_CHARS_PER_DAY = Number(
    process.env.NEXT_PUBLIC_MAX_GLOBAL_CHARS_PER_DAY,
  );

  const pathname = usePathname();
  const { setActiveTab, handleResetAll } = useContext(RecordingContext);
  const { localUsageQuota, globalUsageQuota } = useContext(UsageContext);

  return (
    <>
      {/* Mobile View */}
      <div className="mx-auto grid max-w-screen-md p-6 md:hidden">
        <div>
          <header className="mb-8 flex flex-col justify-between gap-8">
            <Link href={"/"} className="relative flex gap-2">
              <span className="text-3xl font-extrabold text-blue-400">
                Lively
              </span>
              <img
                alt="quote-logo"
                src="/logo/quote.png"
                width={25}
                className="scale-80 object-scale-down"
              />
            </Link>

            <div className="flex justify-center">
              {navs.map((nav, i) => (
                <Link
                  key={i}
                  href={nav.href}
                  className="relative -mx-3"
                  onClick={() => setActiveTab(nav.label)}
                >
                  <img
                    alt={nav.alt}
                    src={nav.imageSrc}
                    width={150}
                    className={`${pathname === nav.href && "-translate-y-1 translate-x-1 scale-110 transition-all duration-500"}`}
                  />
                  <span
                    className={`${pathname === nav.href ? "text-lg" : "text-md"} absolute bottom-1 right-8 z-10 font-extralight text-white`}
                  >
                    {nav.label}
                  </span>
                </Link>
              ))}
            </div>
          </header>
          <div className="flex h-full w-full flex-col justify-between">
            <main className="h-fit">
              <div className="mb-4 p-2">
                <div className="flex justify-between text-sm">
                  <span>Local Quota</span>
                  <p>
                    {localUsageQuota
                      ? `${localUsageQuota} out of ${MAX_LOCAL_CHARS_PER_DAY}`
                      : "Loading..."}
                  </p>
                </div>
                <div className="mb-2 h-0.5 w-full bg-gray-200">
                  <div
                    className="h-0.5 bg-gradient-to-r from-blue-200 to-blue-400"
                    style={{
                      width: `${(localUsageQuota / (MAX_LOCAL_CHARS_PER_DAY || 1)) * 100}%`,
                    }}
                  />
                </div>
                <div className="flex justify-between text-sm">
                  <span>Global Quota</span>
                  <p>
                    {globalUsageQuota
                      ? `${globalUsageQuota} out of ${MAX_GLOBAL_CHARS_PER_DAY}`
                      : "Loading..."}
                  </p>
                </div>
                <div className="mb-2 h-0.5 w-full bg-gray-200">
                  <div
                    className="h-0.5 bg-gradient-to-r from-cyan-100 to-cyan-300"
                    style={{
                      width: `${(globalUsageQuota / (MAX_GLOBAL_CHARS_PER_DAY || 1)) * 100}%`,
                    }}
                  />
                </div>
                <div className="text-xs">*Quota are replenished daily.</div>
              </div>

              {children}
            </main>

            <footer className="flex h-[10vh] items-center justify-center gap-2">
              {links.map((link, i) => (
                <Link key={i} href={link.href} className="hover:scale-110">
                  <img alt={link.alt} src={link.imageSrc} width={25} />
                </Link>
              ))}
            </footer>
          </div>
        </div>
      </div>

      {/* Desktop View */}
      <div className="mx-auto pb-8 pt-6 max-md:hidden md:block md:max-w-screen-md lg:max-w-screen-lg xl:max-w-screen-xl 2xl:max-w-screen-2xl">
        <header className="mb-20 flex justify-between">
          <Link href={"/"} className="relative flex gap-2">
            <span className="gap-2 text-5xl font-extrabold text-blue-400">
              Lively
            </span>
            <img
              alt="quote-logo"
              src="/logo/quote.png"
              width={25}
              className="scale-80 object-scale-down"
            />
          </Link>

          <div className="flex">
            {navs.map((nav, i) => (
              <Link
                key={i}
                href={nav.href}
                className={`${pathname === nav.href && "-translate-y-2 translate-x-2 scale-110"} relative -mx-3 transition-all duration-500 hover:-translate-y-2 hover:translate-x-2 hover:scale-110 hover:cursor-pointer`}
                onClick={() => setActiveTab(nav.label)}
              >
                <img alt={nav.alt} src={nav.imageSrc} width={150} />
                <span className="absolute bottom-1 right-10 z-10 text-lg font-light text-white">
                  {nav.label}
                </span>
              </Link>
            ))}
          </div>
        </header>
        <div className="flex h-full w-full flex-col justify-between gap-8">
          <main className="h-fit">
            <div className="mb-4 flex flex-col gap-1 p-2">
              <div className="flex justify-between">
                <span>Local Quota</span>
                <p>
                  {localUsageQuota
                    ? `${localUsageQuota} out of ${MAX_LOCAL_CHARS_PER_DAY}`
                    : "Loading..."}
                </p>
              </div>
              <div className="mb-2 h-1 w-full rounded-lg bg-gray-200">
                <div
                  className="h-1 rounded-lg bg-gradient-to-r from-blue-500 to-blue-300"
                  style={{
                    width: `${(localUsageQuota / (MAX_LOCAL_CHARS_PER_DAY || 1)) * 100}%`,
                  }}
                />
              </div>
              <div className="flex justify-between">
                <span>Global Quota</span>
                <p>
                  {globalUsageQuota
                    ? `${globalUsageQuota} out of ${MAX_GLOBAL_CHARS_PER_DAY}`
                    : "Loading..."}
                </p>
              </div>
              <div className="mb-2 h-1 w-full rounded-lg bg-gray-200">
                <div
                  className="h-1 rounded-lg bg-gradient-to-r from-cyan-400 to-cyan-200"
                  style={{
                    width: `${(globalUsageQuota / (MAX_GLOBAL_CHARS_PER_DAY || 1)) * 100}%`,
                  }}
                />
              </div>
              <div className="text-xs">*Quota are replenished daily.</div>
            </div>

            {children}
          </main>

          <footer className="flex h-[10vh] items-center justify-center gap-2 py-8">
            {links.map((link, i) => (
              <Link key={i} href={link.href} className="hover:scale-110">
                <img alt={link.alt} src={link.imageSrc} width={25} />
              </Link>
            ))}
          </footer>
        </div>
      </div>
    </>
  );
}
