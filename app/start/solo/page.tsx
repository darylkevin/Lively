"use client";

import { useContext, useEffect, useState } from "react";
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
    error,
    recording,
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

            <div className="flex justify-between gap-4">
              <div className="relative h-[20vh] w-[80%] overflow-auto rounded-3xl bg-gradient-to-b from-zinc-200 to-zinc-50 p-4 text-blue-400">
                {recording}
                <div
                  className="absolute bottom-2 right-4 z-10 hover:scale-105 hover:cursor-pointer"
                  onClick={() => handleResetAll()}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="size-5"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                    />
                  </svg>
                </div>
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
                  <span className={`${!(!recording && error) && "hidden"}`}>
                    {error}
                  </span>
                </div>

                <div className="flex justify-center p-2">
                  <img
                    src="/icons/mic-record.png"
                    className={`${recording ? "scale-110 animate-pulse" : ""} ${(targetLanguages.length === 0 || targetLanguages.includes("")) && "opacity-50"} transition-all duration-300`}
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
              <div className="flex items-center justify-between">
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
                    {languages.map((language, i) => (
                      <SelectItem key={i} value={language}>
                        {language}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
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

              <div className="relative h-[20vh] overflow-auto rounded-3xl bg-gradient-to-b from-zinc-200 to-zinc-50 p-4 text-blue-400">
                {translatedText}
                <div
                  className="absolute bottom-2 right-4 z-10 hover:scale-105 hover:cursor-pointer"
                  onClick={() => handleResetAll()}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="size-5"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                    />
                  </svg>
                </div>
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

              <div className="flex justify-between gap-8">
                <div className="relative h-[20vh] w-full overflow-auto rounded-3xl bg-gradient-to-b from-zinc-200 to-zinc-50 p-4 text-xl text-blue-400">
                  {recording}
                  <div
                    className="absolute bottom-2 right-4 z-10 hover:scale-105 hover:cursor-pointer"
                    onClick={() => handleResetAll()}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="size-5"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                      />
                    </svg>
                  </div>
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
                    <span className={`${!(!recording && error) && "hidden"}`}>
                      {error}
                    </span>
                  </div>

                  <div className="flex w-[10vw] justify-center p-2">
                    <img
                      src="/icons/mic-record.png"
                      className={`${recording ? "scale-110 animate-pulse" : ""} ${targetLanguages.length === 0 || targetLanguages.includes("") ? "opacity-50" : "hover:scale-110 hover:cursor-pointer"} transition-all duration-300`}
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
                <div className="flex items-center justify-between">
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
                      {languages.map((language, i) => (
                        <SelectItem key={i} value={language}>
                          {language}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
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

                <div className="relative h-[20vh] overflow-auto rounded-3xl bg-gradient-to-b from-zinc-200 to-zinc-50 p-4 text-xl text-blue-400">
                  {translatedText}
                  <div
                    className="absolute bottom-2 right-4 z-10 hover:scale-105 hover:cursor-pointer"
                    onClick={() => handleResetAll()}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="size-5"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                      />
                    </svg>
                  </div>
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
