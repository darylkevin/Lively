import React from "react";
import { Accordion, AccordionItem } from "@heroui/accordion";
import { faq } from "@/app/lib/definitions";

const FAQ = () => {
  return (
    <>
      <div className="h-6 bg-blue-100"></div>
      <div className="h-6 bg-blue-200"></div>
      <div className="h-6 bg-blue-300"></div>
      <div className="h-6 bg-blue-400"></div>
      <div className="h-full bg-blue-500 text-white">
        <section className="mx-auto flex flex-col gap-8 py-8 md:max-w-screen-md lg:max-w-screen-lg xl:max-w-screen-xl 2xl:max-w-screen-2xl">
          <h1 className="text-center text-2xl font-bold md:text-4xl xl:text-5xl">
            Frequently Asked Questions
          </h1>
          <div className="md:text-md text-sm font-light text-blue-500 max-md:px-4 xl:text-lg">
            <Accordion
              variant="shadow"
              selectionMode="multiple"
              className="md:hidden"
            >
              {faq.map((item, index) => (
                <AccordionItem
                  key={index}
                  title={
                    <span className="text-sm text-blue-400">
                      {item.question}
                    </span>
                  }
                >
                  <p className="mt-2 text-justify">{item.answer}</p>
                </AccordionItem>
              ))}
            </Accordion>
            <div className="hidden grid-cols-2 gap-8 text-blue-500 md:grid">
              <Accordion
                selectionMode="multiple"
                variant="shadow"
                className="md:text-md text-sm xl:text-lg"
              >
                {faq.map((item, index) => {
                  if (index % 2 === 0) {
                    return (
                      <AccordionItem
                        key={index}
                        title={
                          <span className="md:text-md text-sm text-blue-400 xl:text-lg">
                            {item.question}
                          </span>
                        }
                      >
                        <p className="mt-2 text-justify">{item.answer}</p>
                      </AccordionItem>
                    );
                  }
                  return null;
                })}
              </Accordion>
              <Accordion
                selectionMode="multiple"
                variant="shadow"
                className="md:text-md text-sm xl:text-lg"
              >
                {faq.map((item, index) => {
                  if (index % 2 !== 0) {
                    return (
                      <AccordionItem
                        key={index}
                        title={
                          <span className="md:text-md text-sm text-blue-400 xl:text-lg">
                            {item.question}
                          </span>
                        }
                      >
                        <p className="mt-2 text-justify">{item.answer}</p>
                      </AccordionItem>
                    );
                  }
                  return null;
                })}
              </Accordion>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default FAQ;
