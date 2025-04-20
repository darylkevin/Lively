"use client";

import { useContext, useEffect, useState, useCallback } from "react";
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
    speakerTurns,
    error,
    recording,
    transcript,
    translatedText,
    setSourceLanguage,
    setTargetLanguages,
    setSpeakerTurns,
    handleRecordSpeech,
    handleResetAll,
  } = useContext(RecordingContext);

  const [speaker1, setSpeaker1] = useState(languages[0].short);
  const [speaker2, setSpeaker2] = useState(
    languages.length > 1 ? languages[1].short : languages[0].short,
  );

  const handleSpeakerSwitch = useCallback(() => {
    setSpeakerTurns((prevTurns) => {
      const newTurns = !prevTurns;
      // Ensure state updates are synchronous
      if (newTurns) {
        setSourceLanguage(speaker1);
        setTargetLanguages([speaker2]);
      } else {
        setSourceLanguage(speaker2);
        setTargetLanguages([speaker1]);
      }

      return newTurns;
    });

    handleResetAll();
  }, [speaker1, speaker2]);

  useEffect(() => {
    if (speakerTurns) {
      setSourceLanguage(speaker1);
      setTargetLanguages([speaker2]);
    } else {
      setSourceLanguage(speaker2);
      setTargetLanguages([speaker1]);
    }
  }, [speaker1, speaker2]);

  // For debugging only
  // useEffect(() => {
  //   console.log(
  //     "sourceLanguage:",
  //     sourceLanguage,
  //     "targetLanguages:",
  //     targetLanguages,
  //   );
  // }, [sourceLanguage, targetLanguages]);

  return (
    <section className="h-full">
      {/* Mobile View */}
      <div className="flex flex-col gap-8 md:hidden">
        <div className="flex gap-4">
          <div className="flex w-full flex-col gap-1">
            <div className="flex items-center gap-1">
              <Select
                value={speaker1}
                onValueChange={(value) => {
                  setSpeaker1(value);
                  handleResetAll();
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

            <div
              className={`h-[20vh] overflow-auto rounded-3xl bg-gradient-to-b from-zinc-200 to-zinc-50 p-4 text-blue-400 ${speakerTurns && "border-2 border-blue-300"} transition-colors`}
            >
              {speakerTurns ? transcript : (translatedText?.[0]?.text ?? "")}
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-2">
          {targetLanguages.map((language, i) => (
            <div key={i} className="flex flex-col gap-1">
              <div className="flex items-center justify-between">
                <Select
                  value={speaker2}
                  onValueChange={(value) => {
                    setSpeaker2(value);
                    handleResetAll();
                  }}
                  disabled={recording}
                >
                  <SelectTrigger className="w-fit-content">
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
              </div>

              <div
                className={`h-[20vh] overflow-auto rounded-3xl bg-gradient-to-b from-zinc-200 to-zinc-50 p-4 text-blue-400 ${!speakerTurns && "border-2 border-blue-300"} transition-colors`}
              >
                {!speakerTurns ? transcript : (translatedText?.[0]?.text ?? "")}
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
              {!error && "Press the mic to begin."}
            </span>
          </div>

          <div className="flex flex-col">
            <span className={`${!recording && "hidden"} font-semibold`}>
              Recording {speakerTurns ? "Speaker 1" : "Speaker 2"}...
            </span>
            <span className={`${!recording && "hidden"}`}>
              Press the mic to stop.
            </span>
            <span
              className={`${!(!recording && error) && "hidden"} text-red-400`}
            >
              {error}
            </span>
          </div>

          <div className="flex justify-center gap-2 p-2">
            <img
              src="/icons/mic-record.png"
              className={`${recording ? "scale-110 animate-pulse" : ""} transition-all`}
              width={100}
              onClick={() => {
                handleRecordSpeech();
              }}
            />
            <img
              src="/icons/mic-switch.png"
              className={`${recording && "scale-110 opacity-50"} transition-all`}
              width={100}
              onClick={() => {
                if (recording) return;
                handleSpeakerSwitch();
              }}
            />
          </div>
        </div>
      </div>

      {/* Desktop View */}
      <div className="max-md:hidden md:block">
        <div className="flex flex-col justify-between gap-12">
          <div className="flex gap-4">
            <div className="flex w-full flex-col gap-4 text-xl">
              <div className="flex items-center gap-1">
                <Select
                  value={speaker1}
                  onValueChange={(value) => {
                    setSpeaker1(value);
                    handleResetAll();
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

              <div
                className={`h-[20vh] overflow-auto rounded-3xl bg-gradient-to-b from-zinc-200 to-zinc-50 p-4 text-xl text-blue-400 ${speakerTurns && "border-4 border-blue-300"} transition-colors`}
              >
                {speakerTurns ? transcript : (translatedText?.[0]?.text ?? "")}
              </div>
            </div>
          </div>

          <div
            className={`flex flex-col gap-2 ${targetLanguages.length === 0 && "hidden"} text-xl`}
          >
            {targetLanguages.map((language, i) => (
              <div key={i} className="flex flex-col gap-1">
                <div className="flex items-center justify-between">
                  <Select
                    value={speaker2}
                    onValueChange={(value) => {
                      setSpeaker2(value);
                      handleResetAll();
                    }}
                    disabled={recording}
                  >
                    <SelectTrigger className="w-fit-content">
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
                </div>

                <div
                  className={`h-[20vh] overflow-auto rounded-3xl bg-gradient-to-b from-zinc-200 to-zinc-50 p-4 text-xl text-blue-400 ${!speakerTurns && "border-4 border-blue-300"} transition-colors`}
                >
                  {!speakerTurns
                    ? transcript
                    : (translatedText?.[0]?.text ?? "")}
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
                {!error && "Press the mic to begin."}
              </span>
            </div>

            <div className="flex flex-col">
              <span className={`${!recording && "hidden"} text-semibold`}>
                Recording {speakerTurns ? "Speaker 1" : "Speaker 2"}...
              </span>
              <span className={`${!recording && "hidden"}`}>
                Press the mic to stop.
              </span>
              <span
                className={`${!(!recording && error) && "hidden"} text-red-400`}
              >
                {error}
              </span>
            </div>

            <div className="flex justify-center gap-2 p-2">
              <img
                src="/icons/mic-record.png"
                className={`${recording ? "scale-110 animate-pulse" : "hover:scale-110"} transition-all hover:cursor-pointer`}
                width={100}
                onClick={() => {
                  handleRecordSpeech();
                }}
              />
              <img
                src="/icons/mic-switch.png"
                className={`${recording ? "scale-110 opacity-50" : "hover:scale-110"} transition-all hover:cursor-pointer`}
                width={100}
                onClick={() => {
                  if (recording) return;
                  handleSpeakerSwitch();
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
