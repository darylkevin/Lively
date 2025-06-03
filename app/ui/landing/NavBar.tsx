"use client";

import React, { useState } from "react";
import Link from "next/link";
import { navs } from "@/app/lib/landing/definitions";

const NavBar = ({
  navOpen,
  setNavOpen,
}: {
  navOpen: boolean;
  setNavOpen: any;
}) => {
  return (
    <>
      <div
        className={`${navOpen && "hidden"} sticky left-0 top-0 z-10 h-16 w-full bg-white px-4 py-2`}
      >
        <header className="mx-auto mb-8 flex max-w-screen-xl items-center justify-between gap-8">
          <Link href={"/"} className="relative flex gap-2">
            <span className="text-3xl font-extrabold text-blue-400 md:text-4xl xl:text-5xl">
              Lively
            </span>
            <img
              alt="quote-logo"
              src="/logo/quote.png"
              width={25}
              className="scale-80 object-scale-down"
            />
          </Link>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="size-7 p-1 text-blue-400 hover:cursor-pointer hover:rounded-full hover:bg-blue-400 hover:text-white md:hidden"
            onClick={() => setNavOpen(!navOpen)}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
            />
          </svg>
          <div className="hidden gap-2 md:flex">
            {navs.map((nav) => (
              <Link key={nav.href} href={nav.href}>
                <span className="p-2 font-medium text-blue-400 hover:cursor-pointer hover:rounded-full hover:bg-blue-400 hover:text-white">
                  {nav.label}
                </span>
              </Link>
            ))}
            <img
              src="/links/github.png"
              width={25}
              className="hover:scale-110 hover:cursor-pointer"
            />
          </div>
        </header>
      </div>

      <div
        className={`${!navOpen && "hidden"} sticky left-0 top-0 z-10 h-12 w-full border border-green-400 bg-white px-4 py-2`}
      >
        <header className="flex h-[100vh] w-full items-center justify-end gap-8">
          <div className="flex flex-col items-end gap-8 text-right">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="size-5 rounded-full bg-blue-400 p-1 text-white md:hidden"
              onClick={() => setNavOpen(!navOpen)}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18 18 6M6 6l12 12"
              />
            </svg>
            {navs.map((nav) => (
              <Link key={nav.href} href={nav.href}>
                <span className="p-2 font-medium text-blue-400 hover:cursor-pointer hover:rounded-full hover:bg-blue-400 hover:text-white">
                  {nav.label}
                </span>
              </Link>
            ))}

            <img
              src="/links/github.png"
              width={25}
              className="hover:scale-110 hover:cursor-pointer"
            />
          </div>
        </header>
      </div>
    </>
  );
};

export default NavBar;
