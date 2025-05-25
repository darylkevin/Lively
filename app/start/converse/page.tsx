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
import SpeechSynthesisContext from "@/app/ui/contexts/SpeechSynthesisContext";

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

  const { handleSpeak } = useContext(SpeechSynthesisContext);

  const [copied, setCopied] = useState(false);
  const [copyId, setCopyId] = useState(null);

  const [speaker1, setSpeaker1] = useState(languages[0].short);
  const [speaker2, setSpeaker2] = useState(
    languages.length > 1 ? languages[1].short : languages[0].short,
  );

  const handleCopyToClipboard = (text, id) => {
    navigator.clipboard.writeText(text);
    setCopyId(id);
    setCopied(true);

    setTimeout(() => setCopied(false), 1000);
  };

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
                className={`${(recording || (copied && copyId === "mobile-converse-1")) && "hidden"} text-blue-400`}
                onClick={() => {
                  if (recording) return;
                  handleCopyToClipboard(
                    speakerTurns
                      ? transcript
                      : (translatedText?.[0]?.text ?? ""),
                    "mobile-converse-1",
                  );
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
                    d="M15.75 17.25v3.375c0 .621-.504 1.125-1.125 1.125h-9.75a1.125 1.125 0 0 1-1.125-1.125V7.875c0-.621.504-1.125 1.125-1.125H6.75a9.06 9.06 0 0 1 1.5.124m7.5 10.376h3.375c.621 0 1.125-.504 1.125-1.125V11.25c0-4.46-3.243-8.161-7.5-8.876a9.06 9.06 0 0 0-1.5-.124H9.375c-.621 0-1.125.504-1.125 1.125v3.5m7.5 10.375H9.375a1.125 1.125 0 0 1-1.125-1.125v-9.25m12 6.625v-1.875a3.375 3.375 0 0 0-3.375-3.375h-1.5a1.125 1.125 0 0 1-1.125-1.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H9.75"
                  />
                </svg>
              </div>
              <div
                className={`${copied && copyId === "mobile-converse-1" ? "block" : "hidden"} text-blue-400`}
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
                    d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                  />
                </svg>
              </div>

              <div
                className={`${recording && "hidden"} text-blue-400`}
                onClick={() => {
                  handleSpeak(
                    speakerTurns
                      ? transcript
                      : (translatedText?.[0]?.text ?? ""),
                    sourceLanguage,
                    "mobile-converse-1",
                  );
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
                    d="M19.114 5.636a9 9 0 0 1 0 12.728M16.463 8.288a5.25 5.25 0 0 1 0 7.424M6.75 8.25l4.72-4.72a.75.75 0 0 1 1.28.53v15.88a.75.75 0 0 1-1.28.53l-4.72-4.72H4.51c-.88 0-1.704-.507-1.938-1.354A9.009 9.009 0 0 1 2.25 12c0-.83.112-1.633.322-2.396C2.806 8.756 3.63 8.25 4.51 8.25H6.75Z"
                  />
                </svg>
              </div>

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
              <div className="flex items-center justify-between gap-1">
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
                  className={`${(recording || (copied && copyId === "mobile-converse-2")) && "hidden"} text-blue-400`}
                  onClick={() => {
                    if (recording) return;
                    handleCopyToClipboard(
                      !speakerTurns
                        ? transcript
                        : (translatedText?.[0]?.text ?? ""),
                      "mobile-converse-2",
                    );
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
                      d="M15.75 17.25v3.375c0 .621-.504 1.125-1.125 1.125h-9.75a1.125 1.125 0 0 1-1.125-1.125V7.875c0-.621.504-1.125 1.125-1.125H6.75a9.06 9.06 0 0 1 1.5.124m7.5 10.376h3.375c.621 0 1.125-.504 1.125-1.125V11.25c0-4.46-3.243-8.161-7.5-8.876a9.06 9.06 0 0 0-1.5-.124H9.375c-.621 0-1.125.504-1.125 1.125v3.5m7.5 10.375H9.375a1.125 1.125 0 0 1-1.125-1.125v-9.25m12 6.625v-1.875a3.375 3.375 0 0 0-3.375-3.375h-1.5a1.125 1.125 0 0 1-1.125-1.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H9.75"
                    />
                  </svg>
                </div>
                <div
                  className={`${copied && copyId === "mobile-converse-2" ? "block" : "hidden"} text-blue-400`}
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
                      d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                    />
                  </svg>
                </div>

                <div
                  className={`${recording && "hidden"} text-blue-400`}
                  onClick={() => {
                    handleSpeak(
                      !speakerTurns
                        ? transcript
                        : (translatedText?.[0]?.text ?? ""),
                      targetLanguages[0],
                      "mobile-converse-2",
                    );
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
                      d="M19.114 5.636a9 9 0 0 1 0 12.728M16.463 8.288a5.25 5.25 0 0 1 0 7.424M6.75 8.25l4.72-4.72a.75.75 0 0 1 1.28.53v15.88a.75.75 0 0 1-1.28.53l-4.72-4.72H4.51c-.88 0-1.704-.507-1.938-1.354A9.009 9.009 0 0 1 2.25 12c0-.83.112-1.633.322-2.396C2.806 8.756 3.63 8.25 4.51 8.25H6.75Z"
                    />
                  </svg>
                </div>

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
                  className={`${(recording || (copied && copyId === "desktop-converse-1")) && "hidden"} text-blue-400`}
                  onClick={() => {
                    if (recording) return;
                    handleCopyToClipboard(
                      speakerTurns
                        ? transcript
                        : (translatedText?.[0]?.text ?? ""),
                      "desktop-converse-1",
                    );
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
                      d="M15.75 17.25v3.375c0 .621-.504 1.125-1.125 1.125h-9.75a1.125 1.125 0 0 1-1.125-1.125V7.875c0-.621.504-1.125 1.125-1.125H6.75a9.06 9.06 0 0 1 1.5.124m7.5 10.376h3.375c.621 0 1.125-.504 1.125-1.125V11.25c0-4.46-3.243-8.161-7.5-8.876a9.06 9.06 0 0 0-1.5-.124H9.375c-.621 0-1.125.504-1.125 1.125v3.5m7.5 10.375H9.375a1.125 1.125 0 0 1-1.125-1.125v-9.25m12 6.625v-1.875a3.375 3.375 0 0 0-3.375-3.375h-1.5a1.125 1.125 0 0 1-1.125-1.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H9.75"
                    />
                  </svg>
                </div>
                <div
                  className={`${copied && copyId === "desktop-converse-1" ? "block" : "hidden"} text-blue-400`}
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
                      d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                    />
                  </svg>
                </div>

                <div
                  className={`${recording && "hidden"} text-blue-400`}
                  onClick={() => {
                    handleSpeak(
                      speakerTurns
                        ? transcript
                        : (translatedText?.[0]?.text ?? ""),
                      sourceLanguage,
                      "desktop-converse-1",
                    );
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
                      d="M19.114 5.636a9 9 0 0 1 0 12.728M16.463 8.288a5.25 5.25 0 0 1 0 7.424M6.75 8.25l4.72-4.72a.75.75 0 0 1 1.28.53v15.88a.75.75 0 0 1-1.28.53l-4.72-4.72H4.51c-.88 0-1.704-.507-1.938-1.354A9.009 9.009 0 0 1 2.25 12c0-.83.112-1.633.322-2.396C2.806 8.756 3.63 8.25 4.51 8.25H6.75Z"
                    />
                  </svg>
                </div>

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
                <div className="flex items-center justify-between gap-1">
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
                    id={"desktop-converse-target" + i}
                    className={`${(recording || (copied && copyId === "desktop-converse-2")) && "hidden"} text-blue-400`}
                    onClick={() => {
                      if (recording) return;
                      handleCopyToClipboard(
                        !speakerTurns
                          ? transcript
                          : (translatedText?.[0]?.text ?? ""),
                        "desktop-converse-2",
                      );
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
                        d="M15.75 17.25v3.375c0 .621-.504 1.125-1.125 1.125h-9.75a1.125 1.125 0 0 1-1.125-1.125V7.875c0-.621.504-1.125 1.125-1.125H6.75a9.06 9.06 0 0 1 1.5.124m7.5 10.376h3.375c.621 0 1.125-.504 1.125-1.125V11.25c0-4.46-3.243-8.161-7.5-8.876a9.06 9.06 0 0 0-1.5-.124H9.375c-.621 0-1.125.504-1.125 1.125v3.5m7.5 10.375H9.375a1.125 1.125 0 0 1-1.125-1.125v-9.25m12 6.625v-1.875a3.375 3.375 0 0 0-3.375-3.375h-1.5a1.125 1.125 0 0 1-1.125-1.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H9.75"
                      />
                    </svg>
                  </div>

                  <div
                    className={`${copied && copyId === "desktop-converse-2" ? "block" : "hidden"} text-blue-400`}
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
                        d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                      />
                    </svg>
                  </div>

                  <div
                    className={`${recording && "hidden"} text-blue-400`}
                    onClick={() => {
                      handleSpeak(
                        !speakerTurns
                          ? transcript
                          : (translatedText?.[0]?.text ?? ""),
                        targetLanguages[0],
                        "desktop-converse-2",
                      );
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
                        d="M19.114 5.636a9 9 0 0 1 0 12.728M16.463 8.288a5.25 5.25 0 0 1 0 7.424M6.75 8.25l4.72-4.72a.75.75 0 0 1 1.28.53v15.88a.75.75 0 0 1-1.28.53l-4.72-4.72H4.51c-.88 0-1.704-.507-1.938-1.354A9.009 9.009 0 0 1 2.25 12c0-.83.112-1.633.322-2.396C2.806 8.756 3.63 8.25 4.51 8.25H6.75Z"
                      />
                    </svg>
                  </div>
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
