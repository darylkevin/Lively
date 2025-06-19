import React from "react";
import {Accordion, AccordionItem} from "@heroui/accordion";

const FAQ = () => {
  return (
    <div className="mx-auto h-[70vh] border border-lime-400 md:max-w-screen-md lg:max-w-screen-lg xl:max-w-screen-xl 2xl:max-w-screen-2xl">
      <div>
        <h1 className="text-4xl font-bold">FAQ</h1>
      </div>
      <Accordion>
        <AccordionItem>
          <h2 className="text-lg font-semibold">What is Lively?</h2>
          <p className="mt-2 text-justify text-blue-500">
            Lively is a cutting-edge platform that leverages AI technology to provide real-time translation services.
          </p>
        </AccordionItem>
        <AccordionItem>
          <h2 className="text-lg font-semibold">How does it work?</h2>
          <p className="mt-2 text-justify text-blue-500">
            Lively uses advanced machine learning algorithms to understand and translate text across multiple languages.
          </p>
        </AccordionItem>
      </Accordion>
    </div>
  );
};

export default FAQ;
