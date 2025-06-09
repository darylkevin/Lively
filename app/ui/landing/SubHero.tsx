import { cards } from "@/app/lib/landing/definitions";
import React from "react";

const SubHero = () => {
  return (
    <div className="h-full bg-blue-500">
      <section className="mx-auto flex flex-col items-center justify-center gap-8 py-12 md:max-w-screen-md lg:max-w-screen-lg xl:max-w-screen-xl 2xl:max-w-screen-2xl">
        <div className="">
          <h1 className="text-center text-3xl font-bold text-white md:text-4xl xl:text-5xl">
            Powered by Microsoft's Azure AI Translator
          </h1>
          <p className="text-md mt-4 text-center text-blue-200 md:text-lg xl:text-xl">
            Lively harnesses Azure's latest innovations in machine translation,
            providing almost real-time translations over 100 languages with
            focuses on translation accuracy and context understanding.
          </p>
        </div>

        <div className="overflow-x-hidden md:max-w-screen-md lg:w-full lg:max-w-screen-lg xl:max-w-screen-xl 2xl:max-w-screen-2xl">
          <div className="animate-marquee flex w-[100%] gap-8">
            {[...cards, ...cards, ...cards, ...cards, ...cards].map(
              (card, index) => (
                <div
                  key={index}
                  className="mb-6 flex h-72 w-[30vw] flex-shrink-0 flex-col rounded-3xl bg-white shadow-lg lg:h-96"
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
                    <p className="text-gray-600 lg:text-lg">
                      {card.description}
                    </p>
                  </div>
                </div>
              ),
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

export default SubHero;
