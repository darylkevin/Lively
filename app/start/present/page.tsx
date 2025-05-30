"use client";

import { useEffect, useState, useContext, useRef } from "react";
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

import { pdfjs, Document, Page as PdfPage } from "react-pdf"; // Required imports for react-pdf
pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

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
    translatedText,
    setSourceLanguage,
    setTargetLanguages,
    setSpeakerTurns,
    handleRecordSpeech,
    handleResetAll,
  } = useContext(RecordingContext);

  const { handleSpeak } = useContext(SpeechSynthesisContext);

  const [pdfFile, setPdfFile] = useState("");
  const [pdfScale, setPdfScale] = useState(1);
  const [numPages, setNumPages] = useState();
  const [isDragging, setIsDragging] = useState(false);
  const dropRef = useRef(null);
  const inputRef = useRef(null);

  const [copied, setCopied] = useState(false);
  const [copyId, setCopyId] = useState(null);

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

  const handleCopyToClipboard = (text, id) => {
    navigator.clipboard.writeText(text);
    setCopyId(id);
    setCopied(true);

    setTimeout(() => setCopied(false), 1000);
  };

  const handleFile = (file) => {
    if (file && file.type === "application/pdf") {
      setPdfFile(file);
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
    if (!pdfFile) {
      inputRef.current.click();
    }
  };

  const handlePDFReset = () => {
    setPdfFile("");
    setPdfScale(1);
    setNumPages(undefined);
  };

  return (
    <section className="h-full">
      {/* Mobile View */}
      <div className="flex flex-col justify-between gap-8 md:hidden">
        <div className="flex flex-col gap-4">
          <div className="flex justify-between">
            <button
              onClick={() => handlePDFReset()}
              className={`${!pdfFile && "hidden"} w-fit text-blue-400 hover:text-blue-500`}
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
              className={`${!pdfFile && "hidden"} flex items-center gap-2 text-blue-400`}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="size-5"
                onClick={() => setPdfScale(1)}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9 15 3 9m0 0 6-6M3 9h12a6 6 0 0 1 0 12h-3"
                />
              </svg>

              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="size-5"
                onClick={() => setPdfScale(pdfScale + 0.1)}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607ZM10.5 7.5v6m3-3h-6"
                />
              </svg>

              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="size-5"
                onClick={() => setPdfScale(pdfScale - 0.1)}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607ZM13.5 10.5h-6"
                />
              </svg>
            </div>
          </div>
          <div
            onClick={handleClick}
            className={`${!pdfFile && "grid cursor-pointer place-items-center rounded-xl border-2 border-dashed border-blue-300 py-4 text-blue-400"}`}
          >
            <div className="flex justify-center">
              {pdfFile ? (
                <div className="h-[40vh] w-[80vw] overflow-auto rounded-md border border-gray-300 bg-gray-100">
                  <Document
                    file={pdfFile}
                    onLoadSuccess={(n) => setNumPages(n.numPages)}
                  >
                    {numPages &&
                      Array.from(new Array(numPages), (_, index) => (
                        <PdfPage
                          key={`page_${index + 1}`}
                          pageNumber={index + 1}
                          renderTextLayer={false}
                          renderAnnotationLayer={false}
                          scale={pdfScale}
                        />
                      ))}
                  </Document>
                </div>
              ) : (
                <p>Click to Upload PDF</p>
              )}
            </div>
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
            <div>
              <Select
                value={sourceLanguage}
                onValueChange={(value) => {
                  setSourceLanguage(value);
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
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-8">
          {targetLanguages.map((language, i) => (
            <div key={i} className="flex flex-col gap-1">
              <span className="pl-1 text-blue-400">
                Target Language {i + 1}
              </span>

              <div className="flex items-center justify-between gap-1">
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
                    {languages.map((lang, i) => (
                      <SelectItem key={i} value={lang.short}>
                        {lang.language}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <div
                  className={`${(recording || (copied && copyId === "mobile-present-target-" + i)) && "hidden"} text-blue-400`}
                  onClick={() => {
                    if (recording) return;
                    handleCopyToClipboard(
                      translatedText?.[i]?.text ?? "",
                      "mobile-present-target-" + i,
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
                  className={`${copied && copyId === "mobile-present-target-" + i ? "block" : "hidden"} text-blue-400`}
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
                      translatedText?.[i]?.text ?? "",
                      language,
                      "mobile-present-target-" + i,
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

              <div className="h-[20vh] overflow-auto rounded-3xl bg-gradient-to-b from-zinc-200 to-zinc-50 p-4 text-blue-400">
                {translatedText?.[i]?.text ?? ""}
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
            className={`${(targetLanguages.length === 0 || targetLanguages.includes("")) && "opacity-50"} ${recording && "animate-pulse"} ${!recording && error ? "bg-gradient-to-r from-red-500 to-red-700" : "bg-gradient-to-r from-blue-500 to-cyan-300"} w-full rounded-lg py-4 text-center font-extralight text-white`}
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
          <div className="flex h-[70vh] w-full flex-col gap-4">
            <div className={`${!pdfFile && "hidden"} flex justify-between`}>
              <button
                onClick={() => handlePDFReset()}
                className="w-fit text-blue-400 hover:text-blue-500"
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
                className={`${!pdfFile && "hidden"} flex items-center gap-2 text-blue-400`}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="size-5 hover:cursor-pointer hover:text-blue-500"
                  onClick={() => setPdfScale(1)}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9 15 3 9m0 0 6-6M3 9h12a6 6 0 0 1 0 12h-3"
                  />
                </svg>

                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="size-5 hover:cursor-pointer hover:text-blue-500"
                  onClick={() => setPdfScale(pdfScale + 0.1)}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607ZM10.5 7.5v6m3-3h-6"
                  />
                </svg>

                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="size-5 hover:cursor-pointer hover:text-blue-500"
                  onClick={() => setPdfScale(pdfScale - 0.1)}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607ZM13.5 10.5h-6"
                  />
                </svg>
              </div>
            </div>

            <div
              ref={dropRef}
              onClick={handleClick}
              onDragEnter={handleDragEnter}
              onDragLeave={handleDragLeave}
              onDragOver={handleDragOver}
              onDrop={handleDrop}
              className={`${!pdfFile ? `rounded-3xl border-4 border-dashed bg-gradient-to-b from-zinc-200 to-zinc-50 text-xl hover:cursor-pointer ${isDragging ? "border-green-300 text-green-400" : "border-blue-300 text-blue-400"}` : ""} grid h-full w-full place-items-center overflow-auto`}
            >
              {pdfFile ? (
                <div className="h-full w-full overflow-auto rounded-md border border-gray-300 bg-gray-100">
                  <Document
                    file={pdfFile}
                    onLoadSuccess={(n) => setNumPages(n.numPages)}
                  >
                    {numPages &&
                      Array.from(new Array(numPages), (_, index) => (
                        <PdfPage
                          key={`page_${index + 1}`}
                          pageNumber={index + 1}
                          renderTextLayer={false}
                          renderAnnotationLayer={false}
                          scale={pdfScale}
                        />
                      ))}
                  </Document>
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
            <div
              className={`flex flex-col justify-start gap-8 ${targetLanguages.length === 2 && "overflow-auto pr-4"}`}
            >
              <div className="flex w-full flex-col gap-1 text-xl">
                <span className="pl-1 text-blue-400">Speaker's Language</span>
                <div className="">
                  <Select
                    value={sourceLanguage}
                    onValueChange={(value) => {
                      setSourceLanguage(value);
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

                    <div className="flex items-center justify-between gap-1">
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
                          {languages.map((lang, i) => (
                            <SelectItem key={i} value={lang.short}>
                              {lang.language}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>

                      <div
                        className={`${(recording || (copied && copyId === "desktop-present-target-" + i)) && "hidden"} text-blue-400`}
                        onClick={() => {
                          if (recording) return;
                          handleCopyToClipboard(
                            translatedText?.[i]?.text ?? "",
                            "desktop-present-target-" + i,
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
                        className={`${copied && copyId === "desktop-present-target-" + i ? "block" : "hidden"} text-blue-400`}
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
                            translatedText?.[i]?.text ?? "",
                            language,
                            "desktop-present-target-" + i,
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
                      {translatedText?.[i]?.text ?? ""}
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
                        Click here to add a target language. <br /> You can add
                        up to 2 languages.
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
            </div>

            <div className="z-10 flex justify-center">
              <div
                onClick={() => {
                  if (
                    targetLanguages.length === 0 ||
                    targetLanguages.includes("")
                  )
                    return;
                  handleRecordSpeech();
                }}
                className={`${targetLanguages.length === 0 || targetLanguages.includes("") ? "opacity-50" : "transition-all hover:scale-110 hover:cursor-pointer"} ${recording && "animate-pulse"} ${!recording && error ? "bg-gradient-to-r from-red-500 to-red-700" : "bg-gradient-to-r from-blue-500 to-cyan-300"} rounded-lg px-8 py-4 text-center font-extralight text-white`}
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
