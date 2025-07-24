import { features } from "@/app/lib/landing/definitions";
import React from "react";

const Features = () => {
  return (
    <div className="mx-auto h-full">
      <section className="mx-auto py-12">
        {features.map((feature, index) => (
          <div key={index}>
            <div className="flex flex-col justify-center pt-8 lg:hidden">
              <img
                src={feature.imageSrc}
                alt={feature.title}
                className="mx-auto mb-4 object-cover shadow-lg lg:rounded-br-3xl lg:rounded-tr-3xl"
              />
              <div className="mx-auto flex flex-col justify-center text-left max-md:px-4 md:max-w-screen-md lg:max-w-screen-lg xl:max-w-screen-xl 2xl:max-w-screen-2xl">
                <span className="text-sm text-blue-400 md:text-lg lg:text-xl">
                  {feature.subtitle}
                </span>
                <h2 className="bg-gradient-to-r from-blue-600 to-blue-400 bg-clip-text text-3xl font-semibold text-transparent lg:text-5xl">
                  {feature.title}
                </h2>
                <p className="mt-4 text-justify text-sm text-blue-500 md:text-xl">
                  {feature.description1}
                </p>
                <p className="mt-4 text-justify text-sm text-blue-500 md:text-xl">
                  {feature.description2}
                </p>
              </div>
            </div>
            <div className="flex justify-center pt-8 max-lg:hidden max-lg:flex-col lg:grid lg:grid-cols-7 lg:gap-16">
              {index % 2 === 0 ? (
                <>
                  <img
                    src={feature.imageSrc}
                    alt={feature.title}
                    className="mx-auto mb-4 h-64 w-full object-cover shadow-lg lg:col-span-3 lg:h-full lg:rounded-br-3xl lg:rounded-tr-3xl"
                  />
                  <div className="mx-auto flex flex-col justify-center text-left max-md:px-4 md:max-w-screen-md lg:col-span-4 lg:mr-36 lg:max-w-screen-lg xl:mr-48 xl:max-w-screen-xl 2xl:max-w-screen-2xl">
                    <span className="text-sm text-blue-400 md:text-lg lg:text-xl">
                      {feature.subtitle}
                    </span>
                    <h2 className="bg-gradient-to-r from-blue-600 to-blue-400 bg-clip-text text-3xl font-semibold text-transparent lg:text-5xl">
                      {feature.title}
                    </h2>
                    <p className="mt-4 text-sm text-blue-500 md:text-xl lg:text-xl">
                      {feature.description1}
                    </p>
                    <p className="mt-4 text-sm text-blue-500 md:text-xl lg:text-xl">
                      {feature.description2}
                    </p>
                  </div>
                </>
              ) : (
                <>
                  <div className="mx-auto flex flex-col justify-center text-center max-md:px-4 md:max-w-screen-md lg:col-span-4 lg:ml-36 lg:max-w-screen-lg lg:text-left xl:ml-48 xl:max-w-screen-xl 2xl:max-w-screen-2xl">
                    <span className="text-sm text-blue-400 md:text-lg lg:text-xl">
                      {feature.subtitle}
                    </span>
                    <h2 className="bg-gradient-to-r from-blue-600 to-blue-400 bg-clip-text text-3xl font-semibold text-transparent lg:text-5xl">
                      {feature.title}
                    </h2>
                    <p className="mt-4 text-sm text-blue-500 md:text-xl lg:text-xl">
                      {feature.description1}
                    </p>
                    <p className="mt-4 text-sm text-blue-500 md:text-xl lg:text-xl">
                      {feature.description2}
                    </p>
                  </div>
                  <img
                    src={feature.imageSrc}
                    alt={feature.title}
                    className="mx-auto mb-4 h-64 w-full object-cover shadow-lg lg:col-span-3 lg:h-full lg:rounded-bl-3xl lg:rounded-tl-3xl"
                  />
                </>
              )}
            </div>
          </div>
        ))}
      </section>
    </div>
  );
};

export default Features;
