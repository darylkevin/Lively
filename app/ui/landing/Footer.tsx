import React from "react";

const Footer = () => {
  return (
    <>
      <div className="h-18 bg-blue-600"></div>
      <div className="h-24 bg-blue-700"></div>
      <div className="h-36 bg-blue-800"></div>
      <footer className="h-full bg-blue-900 text-white">
        <section className="mx-auto h-full w-full px-4 py-8 md:max-w-screen-md lg:max-w-screen-lg xl:max-w-screen-xl 2xl:max-w-screen-2xl">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {/* Row 1, Column 1 */}
            <div>
              <h3 className="text-md mb-2 font-bold lg:text-xl">Lively 1.0</h3>
              <p> — Made with NextJS, Supabase and Azure.</p>
            </div>
            {/* Row 1, Column 2 */}
            <div>
              <h3 className="text-md mb-2 font-bold lg:text-xl">Contact</h3>
              <p>
                <a href="mailto:mikael_daryl77@yahoo.com">
                  Email: mikael_daryl77@yahoo.com
                </a>
                <br />
                <a href="https://github.com/darylkevin/Lively">
                  Github: github.com/darylkevin/Lively
                </a>
              </p>
            </div>
            <div className="mt-4 text-center md:col-span-2">
              <p>© {new Date().getFullYear()} Daryl Kevin.</p>
            </div>
          </div>
        </section>
      </footer>
    </>
  );
};

export default Footer;
