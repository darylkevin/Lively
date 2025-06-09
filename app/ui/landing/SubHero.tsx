import { cards } from "@/app/lib/landing/definitions";
import React from "react";

const SubHero = () => {
  return (
    <div className="h-full overflow-x-hidden bg-blue-500">
      <section className="mx-auto flex flex-col items-center justify-center gap-8 py-12">
        <div className="md:max-w-screen-md lg:max-w-screen-lg xl:max-w-screen-xl 2xl:max-w-screen-2xl">
          <h1 className="text-center text-3xl font-bold text-white md:text-4xl xl:text-5xl">
            Powered by Microsoft's Azure AI Translator
          </h1>
          <p className="text-md mt-4 text-center text-blue-200 md:text-lg xl:text-xl">
            Lively harnesses Azure's latest innovations in machine translation,
            providing almost real-time translations over 100 languages with
            focuses on translation accuracy and context understanding.
          </p>
        </div>

        <div className="relative">
          <div className="animate-marquee flex items-center whitespace-nowrap">
            {cards.map((card, index) => (
              <div
                key={index}
                className="mx-4 mb-6 flex h-72 min-w-64 flex-shrink-0 flex-col rounded-3xl bg-white shadow-lg lg:h-96 lg:min-w-[30vw]"
              >
                <img
                  src={card.imageSrc}
                  alt={card.alt}
                  className="mb-4 h-48 rounded-t-3xl object-cover lg:h-60"
                />
                <div className="px-2">
                  <h2 className="text-md font-semibold lg:text-xl">
                    {card.title}
                  </h2>
                  <p className="text-gray-600 lg:text-lg">{card.description}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="animate-marquee2 absolute top-0 flex whitespace-nowrap">
            {cards.map((card, index) => (
              <div
                key={index}
                className="mx-4 mb-6 flex h-72 min-w-64 flex-shrink-0 flex-col rounded-3xl bg-white shadow-lg lg:h-96 lg:min-w-[30vw]"
              >
                <img
                  src={card.imageSrc}
                  alt={card.alt}
                  className="mb-4 h-48 rounded-t-3xl object-cover lg:h-60"
                />
                <div className="px-2">
                  <h2 className="text-md font-semibold lg:text-xl">
                    {card.title}
                  </h2>
                  <p className="text-gray-600 lg:text-lg">{card.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default SubHero;
