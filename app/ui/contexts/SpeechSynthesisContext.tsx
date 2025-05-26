"use client";

import { createContext, useContext, useEffect, useRef, useState } from "react";
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
  const [voicesReady, setVoicesReady] = useState(false);
  const voicesRef = useRef<SpeechSynthesisVoice[]>([]);
  const { speak, speaking, cancel } = useSpeechSynthesis();

  useEffect(() => {
    if (typeof window === "undefined") return;

    let handleVoicesChanged: (() => void) | null = null;

    const loadVoices = () => {
      voicesRef.current = window.speechSynthesis.getVoices();
      if (voicesRef.current.length > 0) {
        setVoicesReady(true);
      }
    };

    loadVoices();

    if (!voicesReady) {
      handleVoicesChanged = () => {
        loadVoices();
      };
      window.speechSynthesis.addEventListener(
        "voiceschanged",
        handleVoicesChanged,
      );
    }

    // "Prime" voices as soon as possible (helps on Safari/iOS)
    window.speechSynthesis.getVoices();

    return () => {
      if (handleVoicesChanged) {
        window.speechSynthesis.removeEventListener(
          "voiceschanged",
          handleVoicesChanged,
        );
      }
    };
  }, []);

  const handleSpeak = (text, language, panelComparator) => {
    cancel();
    setActivePanel(panelComparator);

    if (!voicesReady || (speaking && activePanel === panelComparator)) {
      return;
    }

    const isMobile = /Mobi|Android|iPhone|iPad|iPod/i.test(navigator.userAgent);

    let languageCode = speechSynthesisLanguages[language];
    let localVoices;

    if (isMobile) {
      localVoices = voicesRef.current.filter(
        (v) => v.lang === languageCode && v.localService,
      );
    } else {
      localVoices = voicesRef.current.filter(
        (v) => v.lang === languageCode && v.name.includes("Microsoft"),
      );
    }

    speak({
      text: text,
      voice: localVoices[0],
    });

    return;
  };

  return (
    <SpeechSynthesisContext.Provider
      value={{
        handleSpeak,
        voicesReady, // Can be used for UI feedback
      }}
    >
      {children}
    </SpeechSynthesisContext.Provider>
  );
};

export default SpeechSynthesisContext;
