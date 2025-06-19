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

"use client";

import React, { useState } from "react";

import Hero from "./ui/landing/Hero";
import NavBar from "./ui/landing/NavBar";
import SubHero from "./ui/landing/SubHero";
import Features from "./ui/landing/Features";
import FAQ from "./ui/landing/FAQ";
import Footer from "./ui/landing/Footer";

export default function Home() {
  const [navOpen, setNavOpen] = useState(false);

  return (
    <>
      <NavBar navOpen={navOpen} setNavOpen={setNavOpen} />

      <main className={`${navOpen && "hidden"}`}>
        <Hero />
        <SubHero />
        <Features />
        <FAQ />
        <Footer />
      </main>
    </>
  );
}
