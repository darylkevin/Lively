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

"use client";

import React, { useState } from "react";
import NavBar from "../ui/landing/NavBar";
import { feedback } from "../lib/definitions";
import { pushFeedback } from "../api/(crud-supabase)/definitions";
import { footer } from "../lib/landing/definitions";

export default function Home() {
  const [navOpen, setNavOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [feedbackSent, setFeedbackSent] = useState(false);

  const handleSendFeedback = async () => {
    if (message.trim()) {
      await pushFeedback(message);
      setFeedbackSent(true);
      setMessage("");
    }
  };

  return (
    <>
      <NavBar navOpen={navOpen} setNavOpen={setNavOpen} />

      <main className={`${navOpen && "hidden"}`}>
        <div className="mx-auto h-[70vh]">
          <section>
            <div className="mx-auto w-full max-md:p-6 md:max-w-screen-md lg:max-w-screen-lg xl:max-w-screen-xl 2xl:max-w-screen-2xl">
              <h1 className="bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text py-8 text-center text-2xl text-transparent md:text-3xl xl:text-4xl">
                Yes, I know it is <i>far</i> from perfect, but I will highly
                appreciate your feedback :)
              </h1>
              <div className="md:text-md text-sm xl:text-lg">
                <p className="text-md py-2 text-justify text-blue-500">
                  {feedback.paragraph1}
                </p>
                <p className="text-md py-2 text-justify text-blue-500">
                  {feedback.paragraph2}
                </p>
                <p className="text-md py-2 text-right text-blue-500">
                  {" "}
                  — {feedback.author}
                </p>
              </div>
            </div>
            <div className="h-full lg:grid lg:grid-cols-2">
              <div className="bg-blue-500 p-6 md:p-8 lg:p-12">
                <div className={`${feedbackSent && "hidden"}`}>
                  <p className="text-md md:text-md pb-4 text-white lg:text-lg xl:text-xl">
                    Tell me what's on your mind
                  </p>
                  <textarea
                    value={message}
                    className="w-full rounded-xl bg-white p-6 text-blue-500 shadow-2xl outline-none"
                    name="message"
                    placeholder="Type your message here..."
                    rows={10}
                    required
                    onChange={(e) => setMessage(e.target.value)}
                  ></textarea>
                  <div className="flex w-full justify-end">
                    <button
                      className={`mt-6 w-36 rounded-xl bg-blue-700 py-2 text-white ${!message.trim() ? "opacity-50" : "hover:bg-white hover:text-blue-500"}`}
                      disabled={!message.trim()}
                      onClick={() => handleSendFeedback()}
                    >
                      Submit
                    </button>
                  </div>
                </div>
                <div
                  className={`grid h-96 place-items-center ${!feedbackSent && "hidden"} text-center text-white`}
                >
                  <div className="flex flex-col items-center gap-4">
                    <p className="text-md md:text-lg lg:text-xl xl:text-2xl">
                      Thank you for your feedback!
                    </p>
                    <button
                      className="w-36 rounded-xl bg-blue-700 py-2 text-white hover:bg-white hover:text-blue-500"
                      onClick={() => {
                        setFeedbackSent(false);
                      }}
                    >
                      Go back
                    </button>
                  </div>
                </div>
              </div>
              <div className="bg-blue-400 p-6 md:p-8 lg:p-12">
                <div className="relative">
                  <p className="text-md md:text-md pb-4 text-white lg:text-lg xl:text-xl">
                    ... or email me directly
                  </p>
                  <img
                    src="/feedbacks/placeholder.webp"
                    alt="placeholder"
                    className="h-[360px] w-full rounded-xl object-cover shadow-2xl"
                  />
                  <button
                    className="absolute inset-x-0 bottom-6 z-10 mx-auto w-36 rounded-xl bg-blue-700 py-2 text-white hover:bg-white hover:text-blue-500"
                    onClick={() =>
                      (window.location.href = `mailto:${feedback.email}`)
                    }
                  >
                    Send me @
                  </button>
                </div>
              </div>
            </div>

            <footer className="h-full bg-blue-900 text-white">
              <section className="mx-auto h-full w-full px-4 py-8 pt-12 md:max-w-screen-md lg:max-w-screen-lg xl:max-w-screen-xl 2xl:max-w-screen-2xl">
                <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
                  <div>
                    <h3 className="text-md mb-2 font-bold lg:text-xl">
                      {footer.appName}
                    </h3>
                    <p className="font-light italic">{footer.description}</p>
                  </div>
                  <div>
                    <h3 className="text-md mb-2 font-bold lg:text-xl">
                      Contact
                    </h3>
                    <p>
                      <a href={footer.emailHref}>Email: {footer.email}</a>
                      <br />
                      <a href={footer.githubHref}>Github: {footer.github}</a>
                    </p>
                  </div>
                  <div className="mt-12 text-center text-sm md:col-span-2">
                    <p className="opacity-50">{footer.copyright}</p>
                  </div>
                </div>
              </section>
            </footer>
          </section>
        </div>
      </main>
    </>
  );
}
