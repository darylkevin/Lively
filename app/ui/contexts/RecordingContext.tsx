"use client";

import { createContext, useEffect, useState, useCallback } from "react";
import { useDebouncedCallback } from "use-debounce";
import { languages } from "@/app/lib/mock";

import "regenerator-runtime/runtime";
import SpeechRecognition, {
  useSpeechRecognition,
  isSpeechRecognitionSupported,
} from "react-speech-recognition";

import {
  RecordingContextType,
  RecordingProviderProps,
} from "../interfaces/interfaces";
import axios from "axios";

const RecordingContext = createContext<RecordingContextType | undefined>(
  undefined,
);

export const RecordingProvider = ({ children }: RecordingProviderProps) => {
  const {
    transcript,
    finalTranscript,
    listening,
    resetTranscript,
    isMicrophoneAvailable,
    browserSupportsSpeechRecognition,
  } = useSpeechRecognition();

  const [activeTab, setActiveTab] = useState("");
  const [sourceLanguage, setSourceLanguage] = useState(languages[0]);
  const [targetLanguages, setTargetLanguages] = useState(
    languages.length > 1 ? [languages[1]] : [languages[0]],
  );
  const [recording, setRecording] = useState(false);
  const [speakerTurns, setSpeakerTurns] = useState(true);
  const [translatedText, setTranslatedText] = useState("");
  const [error, setError] = useState<string | null>(null);

  const fetchTranslation = useDebouncedCallback(async () => {
    try {
      const translated = await axios.post("/api", {
        transcript: transcript,
        sourceLanguage: sourceLanguage,
        targetLanguage: targetLanguages[1],
      });
      setTranslatedText(translated);
      setError(null);
    } catch (err) {
      setError(err.message);
    }
  }, 300);

  const beginListening = () => {
    SpeechRecognition.startListening({ continuous: true });
  };

  const stopListening = () => {
    SpeechRecognition.stopListening();
  };

  const handleRecordSpeech = useCallback(async () => {
    if (recording) {
      stopListening();
      setRecording(false);
    } else {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          audio: true,
        }); // Explicitly request microphone permission
        stream.getTracks().forEach((track) => track.stop()); // Stop the stream immediately

        if (!browserSupportsSpeechRecognition) {
          setError(
            "Speech recognition is not supported by this browser. Please use either Chrome, Safari, Edge or Samsung Internet.",
          );
          return;
        }

        beginListening();
        setRecording(true);
      } catch (err) {
        console.error("Error accessing microphone:", err);
        setError("Mic access?");
      }
    }
  }, [
    recording,
    browserSupportsSpeechRecognition,
    beginListening,
    stopListening,
    setRecording,
    setError,
  ]);

  const handleResetAll = () => {
    resetTranscript();
    setTranslatedText("");
  };

  useEffect(() => {
    // Resetting Logic here
    setRecording(false);
    setSourceLanguage(languages[0]);
    setTargetLanguages(languages.length > 1 ? [languages[1]] : [languages[0]]);
    setSpeakerTurns(true);

    handleResetAll();
  }, [activeTab]);

  useEffect(() => {
    fetchTranslation();
    console.log(transcript);
    // console.log(translatedText);
  }, [transcript]);

  return (
    <RecordingContext.Provider
      value={{
        activeTab,
        setActiveTab,
        sourceLanguage,
        setSourceLanguage,
        targetLanguages,
        setTargetLanguages,
        error,
        setError,
        recording,
        setRecording,
        speakerTurns,
        setSpeakerTurns,
        translatedText,
        handleRecordSpeech,
        handleResetAll,
      }}
    >
      {children}
    </RecordingContext.Provider>
  );
};

export default RecordingContext;
