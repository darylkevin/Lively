"use client";

import { useEffect, useState, useContext, useRef } from "react";
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
    error,
    recording,
    setSourceLanguage,
    setTargetLanguages,
    setSpeakerTurns,
    handleRecordSpeech,
    handleResetAll,
  } = useContext(RecordingContext);

  const [fileUrl, setFileUrl] = useState("");
  const [isDragging, setIsDragging] = useState(false);
  const dropRef = useRef(null);
  const inputRef = useRef(null);

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

  const handleFile = (file) => {
    if (file && file.type === "application/pdf") {
      const url = URL.createObjectURL(file);
      setFileUrl(url);
    } else {
      alert("Please upload a PDF file.");
    }
  };

  const handleDragEnter = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    const file = e.dataTransfer.files[0];
    handleFile(file);
  };

  const handleChange = (e) => {
    const file = e.target.files[0];
    handleFile(file);
  };

  const handleClick = () => {
    inputRef.current.click();
  };

  return (
    <section className="h-full">
      {/* Mobile View */}
      <div className="flex flex-col justify-between gap-8 md:hidden">
        <div className="flex flex-col gap-4">
          <button
            onClick={() => setFileUrl("")}
            className={`${!fileUrl && "hidden"} w-fit text-blue-400 hover:text-blue-500`}
          >
            <p className="flex items-center gap-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="size-4"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18"
                />
              </svg>
              Go Back
            </p>
          </button>
          <div
            onClick={handleClick}
            className={`${!fileUrl && "grid cursor-pointer place-items-center rounded-xl border-2 border-dashed border-blue-300 py-4 text-blue-400"}`}
          >
            {fileUrl ? (
              <div className="h-[20vh] rounded-md border border-gray-300 bg-gray-100 p-4">
                <iframe
                  src={fileUrl}
                  title="Uploaded Document"
                  className="h-full w-full border-none"
                />
              </div>
            ) : (
              <p>Click to Upload PDF</p>
            )}
          </div>
          <input
            ref={inputRef}
            type="file"
            onChange={handleChange}
            accept="application/pdf"
            className="hidden"
          />
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

              <div className="relative h-[10vh] overflow-auto rounded-3xl bg-gradient-to-b from-zinc-200 to-zinc-50 p-4 text-blue-400">
                Target Language: {language}
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
              handleRecordSpeech();
            }}
            className={`${(targetLanguages.length === 0 || targetLanguages.includes("")) && "opacity-50"} ${recording && "animate-pulse"} w-full rounded-lg bg-gradient-to-r from-blue-500 to-cyan-300 py-4 text-center font-extralight text-white`}
          >
            <div>
              <span className={`${!recording && "hidden"} text-semibold`}>
                Presenting... Press to stop.
              </span>
              <span className={`${recording && "hidden"}`}>
                {!error && "Begin Presenting"}
              </span>
              <span className={`${!(!recording && error) && "hidden"}`}>
                {error}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Desktop View */}
      <div className="max-md:hidden md:block">
        <div className="flex justify-between gap-8">
          <div className="flex w-full flex-col gap-4">
            <button
              onClick={() => setFileUrl("")}
              className={`${!fileUrl && "hidden"} w-fit text-blue-400 hover:text-blue-500`}
            >
              <p className="flex items-center gap-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="size-4"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18"
                  />
                </svg>
                Go Back
              </p>
            </button>
            <div
              ref={dropRef}
              onClick={handleClick}
              onDragEnter={handleDragEnter}
              onDragLeave={handleDragLeave}
              onDragOver={handleDragOver}
              onDrop={handleDrop}
              className={`${!fileUrl ? `rounded-3xl border-4 border-dashed bg-gradient-to-b from-zinc-200 to-zinc-50 text-xl hover:cursor-pointer ${isDragging ? "border-green-300 text-green-400" : "border-blue-300 text-blue-400"}` : ""} grid h-[70vh] w-[60vw] place-items-center overflow-auto`}
            >
              {fileUrl ? (
              <div className="h-[70vh] w-full rounded-md border border-gray-300 bg-gray-100 p-4">
                  <iframe
                    src={fileUrl}
                    title="Uploaded Document"
                    className="h-full w-full border-none"
                  />
                </div>
              ) : (
                <p className={`${isDragging && "text-3xl font-bold"}`}>
                  {isDragging
                    ? "Drop it like it's hot"
                    : "Click or Drag to Upload PDF"}
                </p>
              )}
            </div>
            <input
              type="file"
              ref={inputRef}
              onChange={handleChange}
              accept="application/pdf"
              className="hidden"
            />
          </div>
          <div className="flex h-[70vh] w-full flex-col justify-between gap-8">
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

                  <div className="relative h-[20vh] overflow-auto rounded-3xl bg-gradient-to-b from-zinc-200 to-zinc-50 p-4 text-blue-400">
                    Target Language: {language}
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
                  handleRecordSpeech();
                }}
                className={`${targetLanguages.length === 0 || (targetLanguages.includes("") && "opacity-50")} ${recording ? "animate-pulse" : "transition-all hover:scale-105"} w-fit rounded-lg bg-gradient-to-r from-blue-500 to-cyan-300 p-4 text-center text-xl font-extralight text-white hover:cursor-pointer`}
              >
                <div>
                  <div className={`${!recording && "hidden"}`}>
                    <span className="font-semibold">Presenting... </span>
                    <span>Press to stop.</span>
                  </div>
                  <span className={`${recording && "hidden"}`}>
                    {!error && "Begin Presenting"}
                  </span>
                  <span className={`${!(!recording && error) && "hidden"}`}>
                    {error}
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
