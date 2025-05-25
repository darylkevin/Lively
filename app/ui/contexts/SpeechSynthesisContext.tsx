"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { useSpeechSynthesis } from "react-speech-kit";

import {
  SpeechSynthesisContextType,
  SpeechSynthesisContextProvider,
} from "../interfaces/interfaces";
import { speechSynthesisLanguages } from "@/app/lib/languages";

const SpeechSynthesisContext = createContext<
  SpeechSynthesisContextType | undefined
>(undefined);

export const SpeechSynthesisProvider = ({
  children,
}: SpeechSynthesisContextProvider) => {
  const [activePanel, setActivePanel] = useState("");
  const { speak, speaking, cancel } = useSpeechSynthesis();

  const handleSpeak = (text, language, panelComparator) => {
    cancel();
    setActivePanel(panelComparator);

    if (speaking && activePanel === panelComparator) {
      return;
    }

    let selectedVoice;
    let languageCode = speechSynthesisLanguages[language];

    const localVoices = window.speechSynthesis
      .getVoices()
      .filter(
        (v) =>
          v.lang === languageCode &&
          v.localService &&
          v.name.startsWith("Microsoft"),
      );
    if (localVoices.length > 0) {
      selectedVoice = localVoices[0];
    } else {
      selectedVoice =
        window.speechSynthesis
          .getVoices()
          .find(
            (v) => v.lang === languageCode && v.name.startsWith("Microsoft"),
          ) || null;
    }

    if (selectedVoice) {
      speak({ text: text, voice: selectedVoice });
    }

    return;
  };

  return (
    <SpeechSynthesisContext.Provider
      value={{
        handleSpeak,
      }}
    >
      {children}
    </SpeechSynthesisContext.Provider>
  );
};

export default SpeechSynthesisContext;
