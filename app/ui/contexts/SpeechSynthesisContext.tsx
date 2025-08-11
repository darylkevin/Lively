"use client";

import { createContext, useContext, useEffect, useRef, useState } from "react";
import { useSpeechSynthesis } from "react-speech-kit";

import {
  SpeechSynthesisContextType,
  SpeechSynthesisContextProvider,
} from "../interfaces/interfaces";
import { speechSynthesisLanguages } from "@/app/lib/languages";
import RecordingContext from "./RecordingContext";

const SpeechSynthesisContext = createContext<
  SpeechSynthesisContextType | undefined
>(undefined);

export const SpeechSynthesisProvider = ({
  children,
}: SpeechSynthesisContextProvider) => {
  const [activePanel, setActivePanel] = useState("");
  const [voicesReady, setVoicesReady] = useState(false);
  const { speakerTurns, sourceLanguage, targetLanguages } =
    useContext(RecordingContext);
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

    if (activePanel === panelComparator && speaking) {
      return;
    }

    let languageCode = speechSynthesisLanguages[language];
    let localVoices;

    localVoices = voicesRef.current.filter(
      (v) => v.lang === languageCode && v.name.includes("Microsoft"),
    );

    if (localVoices.length === 0) {
      localVoices = voicesRef.current.filter((v) => v.lang === languageCode);
    }

    speak({
      text: text,
      voice: localVoices[0],
    });

    return;
  };

  const handleSpeakConverse = (text, panelComparator) => {
    cancel();
    setActivePanel(panelComparator);

    if (activePanel === panelComparator && speaking) {
      return;
    }

    let language;

    if (panelComparator.endsWith("1") && speakerTurns) {
      language = sourceLanguage;
    } else if (panelComparator.endsWith("1") && !speakerTurns) {
      language = targetLanguages[0];
    } else if (!panelComparator.endsWith("1") && speakerTurns) {
      language = targetLanguages[0];
    } else {
      language = sourceLanguage;
    }

    let languageCode = speechSynthesisLanguages[language];
    let localVoices;

    localVoices = voicesRef.current.filter(
      (v) => v.lang === languageCode && v.name.includes("Microsoft"),
    );

    if (localVoices.length === 0) {
      localVoices = voicesRef.current.filter((v) => v.lang === languageCode);
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
        handleSpeakConverse,
        voicesReady, // Can be used for UI feedback
      }}
    >
      {children}
    </SpeechSynthesisContext.Provider>
  );
};

export default SpeechSynthesisContext;
