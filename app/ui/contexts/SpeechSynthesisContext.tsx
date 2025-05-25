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

  // Ensure voices are loaded before allowing speak
  useEffect(() => {
    if (typeof window === "undefined") return;

    let handleVoicesChanged: (() => void) | null = null;

    const loadVoices = () => {
      voicesRef.current = window.speechSynthesis.getVoices();
      if (voicesRef.current.length > 0) {
        setVoicesReady(true);
      }
    };

    // Try to load voices synchronously first
    loadVoices();

    // If not loaded, listen for the voiceschanged event
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
    if (!voicesReady) {
      // Optionally: Notify user that voices aren't ready yet
      return;
    }

    cancel();
    setActivePanel(panelComparator);

    if (speaking && activePanel === panelComparator) {
      return;
    }

    let selectedVoice;
    let languageCode = speechSynthesisLanguages[language];

    const localVoices = voicesRef.current.filter(
      (v) => v.lang === languageCode && v.localService,
    );
    if (localVoices.length > 0) {
      selectedVoice = localVoices[0];
    } else {
      selectedVoice =
        voicesRef.current.find((v) => v.lang === languageCode) || null;
    }

    if (selectedVoice) {
      speak({ text: text, voice: selectedVoice });
    } else {
      // Fallback: Use default voice
      speak({ text: text });
    }

    return;
  };

  return (
    <SpeechSynthesisContext.Provider
      value={{
        handleSpeak,
        voicesReady, // You can use this to disable speak buttons until voices are ready
      }}
    >
      {children}
    </SpeechSynthesisContext.Provider>
  );
};

export default SpeechSynthesisContext;
