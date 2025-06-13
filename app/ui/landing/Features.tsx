import { features } from "@/app/lib/landing/definitions";
import React from "react";

const Features = () => {
  return (
    <div className="mx-auto h-full md:max-w-screen-md lg:max-w-screen-lg 2xl:max-w-screen-xl">
      <section className="py-12 max-md:px-6">
        {features.map((feature, index) => (
          <div key={index}>
            <div className="flex flex-col justify-center py-12 lg:hidden">
              <img
                src={feature.imageSrc}
                alt={feature.title}
                className="mx-auto mb-4 h-[480px] w-[480px] rounded-3xl object-cover shadow-lg"
              />
              <div className="flex flex-col justify-center gap-2 text-center">
                <span className="text-xl font-semibold text-blue-400">
                  {feature.subtitle}
                </span>
                <h2 className="bg-gradient-to-r from-blue-600 to-blue-400 bg-clip-text text-5xl font-bold text-transparent">
                  {feature.title}
                </h2>
                <p className="mt-4 text-justify text-lg text-blue-500 md:text-xl">
                  {feature.description1}
                </p>
                <p className="mt-4 text-justify text-lg text-blue-500 md:text-xl">
                  {feature.description2}
                </p>
              </div>
            </div>
            <div className="flex justify-center py-12 max-lg:hidden max-lg:flex-col lg:grid lg:grid-cols-7 lg:gap-16">
              {index % 2 === 0 ? (
                <>
                  <img
                    src={feature.imageSrc}
                    alt={feature.title}
                    className="mx-auto mb-4 h-64 w-full rounded-3xl object-cover shadow-lg lg:col-span-3 lg:h-full"
                  />
                  <div className="flex flex-col justify-center text-center lg:col-span-4 lg:text-left">
                    <span className="text-xl font-semibold text-blue-400">
                      {feature.subtitle}
                    </span>
                    <h2 className="bg-gradient-to-r from-blue-600 to-blue-400 bg-clip-text text-5xl font-bold text-transparent">
                      {feature.title}
                    </h2>
                    <p className="mt-4 text-lg text-blue-500 md:text-xl lg:text-2xl">
                      {feature.description1}
                    </p>
                    <p className="mt-4 text-lg text-blue-500 md:text-xl lg:text-2xl">
                      {feature.description2}
                    </p>
                  </div>
                </>
              ) : (
                <>
                  <div className="flex flex-col justify-center text-center lg:col-span-4 lg:text-left">
                    <span className="text-xl font-semibold text-blue-400">
                      {feature.subtitle}
                    </span>
                    <h2 className="bg-gradient-to-r from-blue-600 to-blue-400 bg-clip-text text-5xl font-bold text-transparent">
                      {feature.title}
                    </h2>
                    <p className="mt-4 text-lg text-blue-500 md:text-xl lg:text-2xl">
                      {feature.description1}
                    </p>
                    <p className="mt-4 text-lg text-blue-500 md:text-xl lg:text-2xl">
                      {feature.description2}
                    </p>
                  </div>
                  <img
                    src={feature.imageSrc}
                    alt={feature.title}
                    className="mx-auto mb-4 h-64 w-full rounded-3xl object-cover shadow-lg lg:col-span-3 lg:h-full"
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
