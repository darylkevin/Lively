import { footer } from "@/app/lib/landing/definitions";
import React from "react";

const Footer = () => {
  return (
    <>
      <div className="h-18 bg-blue-600"></div>
      <div className="h-18 bg-blue-700"></div>
      <div className="h-18 bg-blue-800"></div>
      <footer className="h-full bg-blue-900 text-white">
        <section className="mx-auto h-full w-full px-4 py-8 md:max-w-screen-md lg:max-w-screen-lg xl:max-w-screen-xl 2xl:max-w-screen-2xl">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
            {/* Row 1, Column 1 */}
            <div>
              <h3 className="text-md mb-2 font-bold lg:text-xl">
                {footer.appName}
              </h3>
              <p className="font-light italic">{footer.description}</p>
            </div>
            {/* Row 1, Column 2 */}
            <div>
              <h3 className="text-md mb-2 font-bold lg:text-xl">Contact</h3>
              <p>
                <a href={footer.emailHref}>Email: {footer.email}</a>
                <br />
                <a href={footer.githubHref}>Github: {footer.github}</a>
              </p>
            </div>
            <div className="mt-12 text-center md:col-span-2">
              <p className="opacity-50">{footer.copyright}</p>
            </div>
          </div>
        </section>
      </footer>
    </>
  );
};

export default Footer;
