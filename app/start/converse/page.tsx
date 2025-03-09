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

  return (
    <section className="h-full">
      {/* Mobile View */}
      <div className="flex flex-col gap-8 md:hidden">
        <div className="flex gap-4">
          <div className="flex w-full flex-col gap-1">
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

            <div
              className={`h-[20vh] overflow-auto rounded-3xl bg-gradient-to-b from-zinc-200 to-zinc-50 p-4 text-blue-400 ${speakerTurns && "border-2 border-blue-300"} transition-colors`}
            >
              Speaker 1: {sourceLanguage}
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
              </div>

              <div
                className={`h-[20vh] overflow-auto rounded-3xl bg-gradient-to-b from-zinc-200 to-zinc-50 p-4 text-blue-400 ${!speakerTurns && "border-2 border-blue-300"} transition-colors`}
              >
                Speaker 2: {language}
              </div>
            </div>
          ))}
        </div>

        <div className="flex flex-col items-center justify-center text-center align-middle text-sm text-blue-400">
          <div className="flex flex-col">
            <span className={`${recording && "hidden"}`}>
              {speakerTurns ? "Speaker 1" : "Speaker 2"}'s turn.
            </span>
            <span className={`${recording && "hidden"}`}>
              Press the mic to begin.
            </span>
          </div>

          <div className="flex flex-col">
            <span className={`${!recording && "hidden"} font-semibold`}>
              Recording {speakerTurns ? "Speaker 1" : "Speaker 2"}...
            </span>
            <span className={`${!recording && "hidden"}`}>
              Press the mic to stop.
            </span>
          </div>

          <div className="flex justify-center gap-2 p-2">
            <img
              src="/icons/mic-record.png"
              className={`${recording ? "scale-110 animate-pulse" : ""} transition-all duration-300`}
              width={100}
              onClick={() => {
                setRecording(!recording);
              }}
            />
            <img
              src="/icons/mic-switch.png"
              className={`${recording && "scale-110 opacity-50"} transition-all duration-300`}
              width={100}
              onClick={() => {
                if (recording) return;
                setSpeakerTurns(!speakerTurns);
              }}
            />
          </div>
        </div>
      </div>

      {/* Desktop View */}
      <div className="max-md:hidden md:block">
        <div className="flex flex-col justify-between gap-12">
          <div className="flex gap-4">
            <div className="flex w-full flex-col gap-4">
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

              <div
                className={`h-[20vh] overflow-auto rounded-3xl bg-gradient-to-b from-zinc-200 to-zinc-50 p-4 text-xl text-blue-400 ${speakerTurns && "border-4 border-blue-300"} transition-colors`}
              >
                Speaker 1: {sourceLanguage}
              </div>
            </div>
          </div>

          <div
            className={`flex flex-col gap-2 ${targetLanguages.length === 0 && "hidden"}`}
          >
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
                </div>

                <div
                  className={`h-[20vh] overflow-auto rounded-3xl bg-gradient-to-b from-zinc-200 to-zinc-50 p-4 text-xl text-blue-400 ${!speakerTurns && "border-4 border-blue-300"} transition-colors`}
                >
                  Speaker 2: {language}
                </div>
              </div>
            ))}
          </div>

          <div className="flex flex-col items-center justify-center text-center align-middle text-sm text-blue-400">
            <div className="flex flex-col">
              <span className={`${recording && "hidden"}`}>
                {speakerTurns ? "Speaker 1" : "Speaker 2"}'s turn.
              </span>
              <span className={`${recording && "hidden"}`}>
                Press the mic to begin.
              </span>
            </div>

            <div className="flex flex-col">
              <span className={`${!recording && "hidden"} text-semibold`}>
                Recording {speakerTurns ? "Speaker 1" : "Speaker 2"}...
              </span>
              <span className={`${!recording && "hidden"}`}>
                Press the mic to stop.
              </span>
            </div>

            <div className="flex justify-center gap-2 p-2">
              <img
                src="/icons/mic-record.png"
                className={`${recording ? "scale-110 animate-pulse" : "hover:scale-110 hover:cursor-pointer"} transition-all duration-300`}
                width={100}
                onClick={() => {
                  setRecording(!recording);
                }}
              />
              <img
                src="/icons/mic-switch.png"
                className={`${recording ? "scale-110 opacity-50" : "hover:scale-110 hover:cursor-pointer"} transition-all duration-300`}
                width={100}
                onClick={() => {
                  if (recording) return;
                  setSpeakerTurns(!speakerTurns);
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
