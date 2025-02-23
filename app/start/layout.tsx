"use client";

import React, { useEffect, useState } from "react";
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

import { ThemeProvider } from "../ui/contexts/ThemeContext"
import { navs, links } from "../lib/definitions";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Layout({ children }: {
  children: React.ReactNode
}) {

  const pathname = usePathname();

  return (
      <ThemeProvider>

        {/* Mobile View */}
        <div className="pt-8 px-4 mx-auto grid h-[100vh] max-w-screen-md place-items-center md:hidden">
          <div className="grid place-items-center h-full">
            <div className="flex flex-col justify-between h-full gap-8">
              <header className="flex flex-col justify-between gap-8">
                <Link href={"/"} className="flex relative gap-2 hover:scale-105 transition-all">
                  <span className="text-3xl text-blue-400 font-extrabold">
                    Lively
                  </span>
                  <img alt="quote-logo" src="/logo/quote.png" width={25} className="scale-80 object-scale-down"/>
                </Link>

                <div className="flex">

                  {navs.map((nav, i) => (
                    <Link key={nav.href} href={nav.href} className="-mx-3 relative">
                      <img alt={nav.alt} src={nav.imageSrc} width={125} className={`${pathname === nav.href && 'scale-110 -translate-y-1 translate-x-1 transition-all'}`}/>
                      <span className="z-10 absolute bottom-1 right-7 text-md font-light text-white">
                        {nav.label}
                      </span>                  
                    </Link>
                  ))}

                </div>
              </header>

              <main className="h-[50vh]">
                {children}
              </main>

              <footer className="h-[10vh] flex justify-center gap-2 items-center">
                {links.map((link, i) => (
                  <Link key={link.href} href={link.href} className="hover:scale-110">
                    <img alt={link.alt} src={link.imageSrc} width={25}/>
                  </Link>
                ))}
              </footer>

            </div>
          </div>
        </div>

        {/* Desktop View */}
        <div className="pt-8 px-8 mx-auto h-[100vh] max-md:hidden md:block md:max-w-screen-md lg:max-w-screen-lg xl:max-w-screen-xl 2xl:max-w-screen-2xl">
          <div className="flex flex-col justify-between h-full gap-8">
            <header className="flex justify-between">
              <Link href={"/"} className="flex relative gap-2 hover:scale-105 transition-all">
                <span className="text-5xl text-blue-400 font-extrabold">
                  Lively
                </span>
                <img alt="quote-logo" src="/logo/quote.png" width={50} className="scale-80"/>
              </Link>

              <div className="flex">

                {navs.map((nav, i) => (
                  <Link key={nav.href} href={nav.href} className={`${pathname === nav.href && 'scale-110 -translate-y-2 translate-x-2'} -mx-2 hover:scale-110 hover:-translate-y-2 hover:translate-x-2 hover:cursor-pointer transition-all relative`}>
                    <img alt={nav.alt} src={nav.imageSrc} width={150}/>
                    <span className="z-10 absolute bottom-1 right-10 text-lg font-light text-white">
                      {nav.label}
                    </span>                  
                  </Link>
                ))}

              </div>
            </header>

            <main className="h-[80vh]">
              {children}
            </main>

            <footer className="h-[10vh] flex justify-center gap-2 items-center">
              {links.map((link, i) => (
                <Link key={link.href} href={link.href} className="hover:scale-110">
                  <img alt={link.alt} src={link.imageSrc} width={25}/>
                </Link>
              ))}
            </footer>
          </div>
        </div>
      </ThemeProvider>
  );
}
