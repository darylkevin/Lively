import React from "react";
import Link from "next/link";

const Hero = () => {
  return (
    <div className="mx-auto h-[70vh] md:max-w-screen-md lg:max-w-screen-lg xl:max-w-screen-xl 2xl:max-w-screen-2xl">
      <section className="grid h-full grid-cols-4 md:grid-cols-3">
        <div className="col-span-3 mx-auto flex flex-col justify-center max-md:px-8 md:col-span-2 md:max-w-screen-md lg:max-w-screen-lg xl:max-w-screen-xl 2xl:max-w-screen-2xl">
          <h1 className="-ml-1 bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text py-2 text-5xl text-transparent md:text-6xl xl:text-7xl">
            Break Language Barriers
          </h1>
          <p className="text-md mt-4 text-blue-500 md:text-xl xl:text-2xl">
            No more awkward <span className="italic">uhhs</span>, Lively
            transforms your conversation with live translations to make it,
            well, Lively!
          </p>
          <Link
            href="/start/solo"
            className="mt-4 flex w-36 items-center justify-center gap-2 rounded-full bg-gradient-to-r from-blue-300 to-blue-500 px-4 py-2 text-white hover:cursor-pointer hover:from-blue-400 hover:to-blue-600 md:w-48 md:text-lg xl:w-60 xl:text-xl"
          >
            Try It Now
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="size-4"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3"
              />
            </svg>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Hero;
