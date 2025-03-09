"use client";

import { useEffect, useState, useContext } from "react";
import { languages } from "@/app/lib/mock";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import RecordingContext from "@/app/ui/contexts/RecordingContext";
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

export default function Page() {
  const {
    sourceLanguage,
    targetLanguages,
    speakerTurns,
    recording,
    setSourceLanguage,
    setTargetLanguages,
    setSpeakerTurns,
    setRecording,
  } = useContext(RecordingContext);

  const handleTargetLanguageChange = (language, i) => {
    const currTargetLanguages = [...targetLanguages];
    currTargetLanguages[i] = language;
    setTargetLanguages(currTargetLanguages);
  };

  const handleAddMoreLanguage = () => {
    setTargetLanguages([...targetLanguages, ""]);
    return;
  };

  const handleTargetLanguageDeletion = (index) => {
    setTargetLanguages(targetLanguages.filter((_, i) => i !== index));
  };

  return (
    <section className="h-full">
      {/* Mobile View */}
      <div className="flex flex-col justify-between gap-8 md:hidden">
        <div className="h-[20vh] overflow-auto rounded-3xl border-2 border-dashed border-blue-300 bg-gradient-to-b from-zinc-200 to-zinc-50 p-4 text-blue-400">
          Drop or Upload Files Here
        </div>

        <div className="flex gap-4">
          <div className="flex w-full flex-col gap-1">
            <span className="pl-1 text-blue-400">Speaker's Language</span>
            <div className="">
              <Select
                value={sourceLanguage}
                onValueChange={(value) => {
                  setSourceLanguage(value);
                }}
                disabled={recording}
              >
                <SelectTrigger className="w-fit-content">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {languages.map((lang, i) => (
                    <SelectItem key={i} value={lang}>
                      {lang}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-8">
          {targetLanguages.map((language, i) => (
            <div key={i} className="flex flex-col gap-1">
              <span className="pl-1 text-blue-400">
                Target Language {i + 1}
              </span>

              <div className="flex items-center justify-between">
                <Select
                  value={language}
                  onValueChange={(value) => {
                    handleTargetLanguageChange(value, i);
                  }}
                  disabled={recording}
                >
                  <SelectTrigger className="w-fit-content">
                    <SelectValue placeholder="Choose a target language" />
                  </SelectTrigger>
                  <SelectContent>
                    {languages.map((language, i) => (
                      <SelectItem key={i} value={language}>
                        {language}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <div
                  className={`${recording && "hidden"} text-blue-400`}
                  onClick={() => {
                    if (recording) return;
                    handleTargetLanguageDeletion(i);
                  }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="size-5"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M6 18 18 6M6 6l12 12"
                    />
                  </svg>
                </div>
              </div>

              <div className="h-[10vh] overflow-auto rounded-3xl bg-gradient-to-b from-zinc-200 to-zinc-50 p-4 text-blue-400">
                Target Language: {language}
              </div>
            </div>
          ))}
        </div>

        <div
          className={`${targetLanguages.length === 2 && "hidden"} text-blue-400`}
          onClick={() => {
            if (targetLanguages.length === 2 || recording) return;
            handleAddMoreLanguage();
          }}
        >
          <div className={`flex items-center ${recording && "hidden"}`}>
            {targetLanguages.length === 0 ? (
              <div className="w-full p-2 text-center">
                <span className="font-extralight">
                  Click here to add a target language. You can add up to 2
                  languages.
                </span>
              </div>
            ) : (
              <div
                className={`${targetLanguages.length === 2 && "hidden"} flex w-full items-center gap-2 p-1`}
              >
                <span className="text-xl">+</span>
                <p>Add More</p>
              </div>
            )}
          </div>
        </div>

        <div className="flex justify-center">
          <div
            onClick={() => {
              if (targetLanguages.length === 0 || targetLanguages.includes(""))
                return;
              setRecording(!recording);
            }}
            className={`${(targetLanguages.length === 0 || targetLanguages.includes("")) && "opacity-50"} ${recording && "animate-pulse"} w-full rounded-lg bg-gradient-to-r from-blue-500 to-cyan-300 py-4 text-center font-extralight text-white`}
          >
            <div>
              <span className={`${!recording && "hidden"} text-semibold`}>
                Presenting... Press to stop.
              </span>
              <span className={`${recording && "hidden"}`}>
                Begin Presenting
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Desktop View */}
      <div className="max-md:hidden md:block">
        <div className="flex justify-between gap-8">
          <div className="grid h-[70vh] w-[60vw] place-items-center overflow-auto rounded-3xl border-4 border-dashed border-blue-300 bg-gradient-to-b from-zinc-200 to-zinc-50 p-4 text-xl text-blue-400">
            Drop or Upload Files Here
          </div>
          <div className="flex h-[70vh] w-[30vw] flex-col justify-between gap-8">
            <div className="flex gap-4">
              <div className="flex w-full flex-col gap-1 text-xl">
                <span className="pl-1 text-blue-400">Speaker's Language</span>
                <div className="">
                  <Select
                    value={sourceLanguage}
                    onValueChange={(value) => {
                      setSourceLanguage(value);
                    }}
                    disabled={recording}
                  >
                    <SelectTrigger className="w-fit-content">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {languages.map((lang, i) => (
                        <SelectItem key={i} value={lang}>
                          {lang}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>

            <div
              className={`flex flex-col gap-8 ${targetLanguages.length === 0 && "hidden"}`}
            >
              {targetLanguages.map((language, i) => (
                <div key={i} className="flex flex-col gap-1 text-xl">
                  <span className="pl-1 text-blue-400">
                    Target Language {i + 1}
                  </span>

                  <div className="flex items-center justify-between">
                    <Select
                      value={language}
                      onValueChange={(value) => {
                        handleTargetLanguageChange(value, i);
                      }}
                      disabled={recording}
                    >
                      <SelectTrigger className="w-fit-content">
                        <SelectValue placeholder="Choose a target language" />
                      </SelectTrigger>
                      <SelectContent>
                        {languages.map((language, i) => (
                          <SelectItem key={i} value={language}>
                            {language}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>

                    <div
                      className={`${recording && "hidden"} text-blue-400`}
                      onClick={() => {
                        if (recording) return;
                        handleTargetLanguageDeletion(i);
                      }}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        className="size-4 transition-all hover:size-5 hover:cursor-pointer"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M6 18 18 6M6 6l12 12"
                        />
                      </svg>
                    </div>
                  </div>

                  <div className="h-[20vh] overflow-auto rounded-3xl bg-gradient-to-b from-zinc-200 to-zinc-50 p-4 text-blue-400">
                    Target Language: {language}
                  </div>
                </div>
              ))}
            </div>

            <div
              className={`${targetLanguages.length === 2 && "hidden"} text-blue-400`}
              onClick={() => {
                if (targetLanguages.length === 2 || recording) return;
                handleAddMoreLanguage();
              }}
            >
              <div
                className={`flex items-center ${recording && "hidden"} text-xl`}
              >
                {targetLanguages.length === 0 ? (
                  <div className="w-full p-2 text-center transition-all hover:scale-105 hover:cursor-pointer">
                    <span className="font-extralight">
                      Click here to add a target language. <br /> You can add up
                      to 2 languages.
                    </span>
                  </div>
                ) : (
                  <div
                    className={`${targetLanguages.length === 2 && "hidden"} flex w-full items-center gap-2 p-1 transition-transform hover:translate-x-2 hover:scale-105 hover:cursor-pointer`}
                  >
                    <span className="text-xl">+</span>
                    <p>Add More</p>
                  </div>
                )}
              </div>
            </div>

            <div className="flex justify-center">
              <div
                onClick={() => {
                  if (
                    targetLanguages.length === 0 ||
                    targetLanguages.includes("")
                  )
                    return;
                  setRecording(!recording);
                }}
                className={`${targetLanguages.length === 0 || targetLanguages.includes("") ? "opacity-50" : "transition-all hover:scale-105 hover:cursor-pointer"} ${recording && "animate-pulse"} w-fit rounded-lg bg-gradient-to-r from-blue-500 to-cyan-300 p-4 text-center text-xl font-extralight text-white`}
              >
                <div>
                  <div className={`${!recording && "hidden"}`}>
                    <span className="font-semibold">Presenting... </span>
                    <span>Press to stop.</span>
                  </div>
                  <span className={`${recording && "hidden"}`}>
                    Begin Presenting
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
