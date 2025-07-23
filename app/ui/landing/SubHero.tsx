import { cards } from "@/app/lib/landing/definitions";
import React from "react";

const SubHero = () => {
  return (
    <div className="h-full overflow-x-hidden bg-blue-500">
      <section className="mx-auto flex flex-col items-center justify-center gap-8 py-12">
        <div className="max-md:px-6 md:max-w-screen-md lg:max-w-screen-lg xl:max-w-screen-xl 2xl:max-w-screen-2xl">
          <h1 className="text-center text-2xl font-bold text-white md:text-4xl xl:text-5xl">
            Powered by Microsoft's Azure AI Speech and Translator
          </h1>
          <p className="text-md mt-4 text-center text-blue-200 md:text-lg xl:text-xl">
            Lively harnesses Azure's latest generative AI in machine
            transcription and translation, providing almost real-time feedback
            for over 50 languages with focuses on translation accuracy and
            context understanding.
          </p>
        </div>

        <div className="relative">
          <div className="flex animate-marquee items-center whitespace-nowrap">
            {cards.map((card, index) => (
              <div
                key={index}
                className="mx-4 mb-6 flex h-96 min-w-80 max-w-80 flex-shrink-0 flex-col text-wrap rounded-3xl bg-white shadow-lg lg:min-w-[25vw] lg:max-w-[25vw]"
              >
                <img
                  src={card.imageSrc}
                  alt={card.alt}
                  className="mb-4 h-full rounded-t-3xl object-cover lg:h-56 xl:h-64"
                />
                <div className="px-4 pb-2">
                  <h2 className="text-md font-semibold lg:text-lg xl:text-xl">
                    {card.title}
                  </h2>
                  <p className="lg:text-md text-gray-600 xl:text-lg">
                    {card.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
          <div className="absolute top-0 flex animate-marquee2 whitespace-nowrap">
            {cards.map((card, index) => (
              <div
                key={index}
                className="mx-4 mb-6 flex h-96 min-w-80 max-w-80 flex-shrink-0 flex-col text-wrap rounded-3xl bg-white shadow-lg lg:min-w-[25vw] lg:max-w-[25vw]"
              >
                <img
                  src={card.imageSrc}
                  alt={card.alt}
                  className="mb-4 h-full rounded-t-3xl object-cover lg:h-56 xl:h-64"
                />
                <div className="px-4 pb-2">
                  <h2 className="text-md font-semibold lg:text-lg xl:text-xl">
                    {card.title}
                  </h2>
                  <p className="lg:text-md text-gray-600 xl:text-lg">
                    {card.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      <div className="h-6 bg-blue-400"></div>
      <div className="h-6 bg-blue-300"></div>
      <div className="h-6 bg-blue-200"></div>
      <div className="h-6 bg-blue-100"></div>
    </div>
  );
};

export default SubHero;
