"use client";

import { useContext, useEffect, useState } from "react";
import { languages } from "@/app/lib/languages";
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
    error,
    recording,
    transcript,
    translatedText,
    setSourceLanguage,
    setTargetLanguages,
    handleRecordSpeech,
    handleResetAll,
  } = useContext(RecordingContext);

  const handleAddMoreLanguage = () => {
    setTargetLanguages([...targetLanguages, ""]);
    return;
  };

  const handleTargetLanguageChange = (language, i) => {
    const currTargetLanguages = [...targetLanguages];
    currTargetLanguages[i] = language;
    setTargetLanguages(currTargetLanguages);
  };

  const handleTargetLanguageDeletion = (index) => {
    setTargetLanguages(targetLanguages.filter((_, i) => i !== index));
  };

  return (
    <section className="h-full">
      {/* Mobile View */}
      <div className="flex flex-col justify-start gap-2 md:hidden">
        <div className="flex gap-4">
          <div className="mb-12 flex w-full flex-col gap-1">
            <div className="flex items-center gap-1">
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
                    <SelectItem key={i} value={lang.short}>
                      {lang.language}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <div
                className={`${recording && "hidden"} text-blue-400`}
                onClick={() => {
                  if (recording) return;
                  handleResetAll();
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
                    d="M9 15 3 9m0 0 6-6M3 9h12a6 6 0 0 1 0 12h-3"
                  />
                </svg>
              </div>
            </div>

            <div className="flex justify-between gap-4">
              <div className="h-[20vh] w-[80%] overflow-auto rounded-3xl bg-gradient-to-b from-zinc-200 to-zinc-50 p-4 text-blue-400">
                {transcript}
              </div>
              <div className="flex flex-col items-center justify-center text-center align-middle text-sm text-blue-400">
                <span
                  className={`${(recording || targetLanguages.length == 0 || targetLanguages.includes("")) && "hidden"}`}
                >
                  {!error && "Press to begin."}
                </span>
                <div className="flex flex-col">
                  <span className={`${!recording && "hidden"} font-semibold`}>
                    Recording...
                  </span>
                  <span className={`${!recording && "hidden"}`}>
                    Press to stop.
                  </span>
                  <span
                    className={`${!(!recording && error) && "hidden"} text-red-400`}
                  >
                    {error}
                  </span>
                </div>

                <div className="flex justify-center p-2">
                  <img
                    src="/icons/mic-record.png"
                    className={`${recording ? "scale-110 animate-pulse" : ""} ${(targetLanguages.length === 0 || targetLanguages.includes("")) && "opacity-50"} transition-all`}
                    width={100}
                    onClick={() => {
                      if (
                        targetLanguages.length === 0 ||
                        targetLanguages.includes("")
                      )
                        return;
                      handleRecordSpeech();
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-2">
          {targetLanguages.map((language, i) => (
            <div key={i} className="flex flex-col gap-1">
              <div className="flex items-center justify-between gap-1">
                <Select
                  value={language}
                  onValueChange={(value) => {
                    handleTargetLanguageChange(value, i);
                  }}
                  disabled={recording}
                >
                  <SelectTrigger className="w-fit-content pr-4">
                    <SelectValue placeholder="Choose a target language" />
                  </SelectTrigger>
                  <SelectContent>
                    {languages.map((lang, i) => (
                      <SelectItem key={i} value={lang.short}>
                        {lang.language}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <div
                  className={`${recording && "hidden"} text-blue-400`}
                  onClick={() => {
                    if (recording) return;
                    handleResetAll();
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
                      d="M9 15 3 9m0 0 6-6M3 9h12a6 6 0 0 1 0 12h-3"
                    />
                  </svg>
                </div>

                <div
                  className={`text-blue-400 ${recording && "hidden"}`}
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

              <div className="h-[20vh] overflow-auto rounded-3xl bg-gradient-to-b from-zinc-200 to-zinc-50 p-4 text-blue-400">
                {translatedText?.[i]?.text ?? ""}
              </div>
            </div>
          ))}
        </div>

        <div className="text-blue-400">
          <div className="flex items-center gap-2">
            {targetLanguages.length === 0 ? (
              <div
                className="w-full text-center"
                onClick={() => handleAddMoreLanguage()}
              >
                <span className="font-extralight">
                  Click here to add a target language.
                </span>
              </div>
            ) : (
              <div
                className={`flex w-full items-center gap-2 p-2 ${recording && "hidden"}`}
                onClick={() => {
                  if (recording) return;
                  handleAddMoreLanguage();
                }}
              >
                <span className="text-xl">+</span>
                <p>Add More</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Desktop View */}
      <div className="max-md:hidden md:block">
        <div className="flex flex-col justify-between gap-4">
          <div className="flex gap-4">
            <div className="mb-12 flex w-full flex-col gap-4 text-xl">
              <div className="flex items-center gap-1">
                {" "}
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
                      <SelectItem key={i} value={lang.short}>
                        {lang.language}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <div
                  className={`${recording && "hidden"} text-blue-400`}
                  onClick={() => {
                    if (recording) return;
                    handleResetAll();
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
                      d="M9 15 3 9m0 0 6-6M3 9h12a6 6 0 0 1 0 12h-3"
                    />
                  </svg>
                </div>
              </div>

              <div className="flex justify-between gap-8">
                <div className="h-[20vh] w-full overflow-auto rounded-3xl bg-gradient-to-b from-zinc-200 to-zinc-50 p-4 text-xl text-blue-400">
                  {transcript}
                </div>
                <div className="text-md text-md flex flex-col items-center justify-center text-center align-middle text-blue-400">
                  <span
                    className={`${(recording || targetLanguages.length == 0 || targetLanguages.includes("")) && "hidden"}`}
                  >
                    {!error && "Press to begin."}
                  </span>
                  <div className="flex flex-col">
                    <span className={`${!recording && "hidden"} font-semibold`}>
                      Recording...
                    </span>
                    <span className={`${!recording && "hidden"}`}>
                      Press to stop.
                    </span>
                    <span
                      className={`${!(!recording && error) && "hidden"} text-red-400`}
                    >
                      {error}
                    </span>
                  </div>

                  <div className="flex w-[10vw] justify-center p-2">
                    <img
                      src="/icons/mic-record.png"
                      className={`${recording ? "scale-110 animate-pulse" : ""} ${targetLanguages.length === 0 || targetLanguages.includes("") ? "opacity-50" : "hover:scale-110 hover:cursor-pointer"} transition-all`}
                      width={125}
                      onClick={() => {
                        if (
                          targetLanguages.length === 0 ||
                          targetLanguages.includes("")
                        )
                          return;
                        handleRecordSpeech();
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div
            className={`flex flex-col gap-8 ${targetLanguages.length === 0 && "hidden"} text-xl`}
          >
            {targetLanguages.map((language, i) => (
              <div key={i} className="flex flex-col gap-4">
                <div className="flex items-center justify-between gap-1">
                  <Select
                    value={language}
                    onValueChange={(value) => {
                      handleTargetLanguageChange(value, i);
                    }}
                    disabled={recording}
                  >
                    <SelectTrigger className="w-fit-content pr-4">
                      <SelectValue placeholder="Choose a target language" />
                    </SelectTrigger>
                    <SelectContent>
                      {languages.map((lang, i) => (
                        <SelectItem key={i} value={lang.short}>
                          {lang.language}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>

                  <div
                    className={`${recording && "hidden"} text-blue-400`}
                    onClick={() => {
                      if (recording) return;
                      handleResetAll();
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
                        d="M9 15 3 9m0 0 6-6M3 9h12a6 6 0 0 1 0 12h-3"
                      />
                    </svg>
                  </div>

                  <div
                    className={`text-blue-400 ${recording && "hidden"}`}
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

                <div className="h-[20vh] overflow-auto rounded-3xl bg-gradient-to-b from-zinc-200 to-zinc-50 p-4 text-xl text-blue-400">
                  {translatedText?.[i]?.text ?? ""}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-2 text-blue-400">
            <div className="flex items-center gap-2">
              {targetLanguages.length === 0 ? (
                <div
                  className="w-full text-center transition-all hover:scale-110 hover:cursor-pointer"
                  onClick={() => handleAddMoreLanguage()}
                >
                  <span className="font-extralight">
                    Click here to add a target language.
                  </span>
                </div>
              ) : (
                <div
                  className={`flex w-fit items-center gap-2 rounded-xl p-2 transition-transform ${!recording ? "hover:scale-105 hover:cursor-pointer" : "hidden"}`}
                  onClick={() => {
                    if (recording) return;
                    handleAddMoreLanguage();
                  }}
                >
                  <span className="text-3xl">+</span>
                  <p className="text-xl">Add More</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
