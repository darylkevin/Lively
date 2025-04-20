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

import Link from "next/link";

export default function Home() {
  return (
    <>
      <div className="mx-auto grid h-[100vh] max-w-screen-md place-items-center md:hidden">
        <div className="grid h-full place-items-center">
          <Link href="/start/solo">Hero Mobile View</Link>
        </div>
      </div>

      <div className="mx-auto grid h-[100vh] place-items-center max-md:hidden md:block md:max-w-screen-sm lg:max-w-screen-md">
        <div className="grid h-full place-items-center">
          <Link href="/start/solo">Hero Desktop View</Link>
        </div>
      </div>
    </>
  );
}
