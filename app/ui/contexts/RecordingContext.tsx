"use client";

import { createContext, useEffect, useState } from "react";
import { languages } from "@/app/lib/mock";

import {
  RecordingContextType,
  RecordingProviderProps,
} from "../interfaces/interfaces";

const RecordingContext = createContext<RecordingContextType | undefined>(
  undefined,
);

export const RecordingProvider = ({ children }: RecordingProviderProps) => {
  const [activeTab, setActiveTab] = useState("");
  const [sourceLanguage, setSourceLanguage] = useState(languages[0]);
  const [targetLanguages, setTargetLanguages] = useState(
    languages.length > 1 ? [languages[1]] : [languages[0]],
  );
  const [recording, setRecording] = useState(false);
  const [speakerTurns, setSpeakerTurns] = useState(true);

  useEffect(() => {
    // Resetting Logic here
    setRecording(false);
    setSourceLanguage(languages[0]);
    setTargetLanguages(languages.length > 1 ? [languages[1]] : [languages[0]]);
    setSpeakerTurns(true);
  }, [activeTab]);

  return (
    <RecordingContext.Provider
      value={{
        activeTab,
        setActiveTab,
        sourceLanguage,
        setSourceLanguage,
        targetLanguages,
        setTargetLanguages,
        recording,
        setRecording,
        speakerTurns,
        setSpeakerTurns,
      }}
    >
      {children}
    </RecordingContext.Provider>
  );
};

export default RecordingContext;
