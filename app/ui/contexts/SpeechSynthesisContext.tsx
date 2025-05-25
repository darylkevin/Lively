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

  const utterance = new SpeechSynthesisUtterance();
  utterance.lang = "en-US";
  utterance.text = "";
  utterance.rate = 1;
  utterance.pitch = 1;
  utterance.volume = 1;
  utterance.onend = () => {
    setTimeout(() => {
      setActivePanel("");
    }, 5000);
  };

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
      utterance.voice = selectedVoice;
      utterance.text = text;
      window.speechSynthesis.speak(utterance);
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
