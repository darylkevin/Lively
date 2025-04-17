"use client";

import { createContext, useEffect, useState, useCallback } from "react";
import { useDebouncedCallback } from "use-debounce";
import { languages } from "@/app/lib/languages";

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
  const [sourceLanguage, setSourceLanguage] = useState(languages[0].short);
  const [targetLanguages, setTargetLanguages] = useState(
    languages.length > 1 ? [languages[1].short] : [languages[0].short],
  );
  const [recording, setRecording] = useState(false);
  const [speakerTurns, setSpeakerTurns] = useState(true);
  const [translatedText, setTranslatedText] = useState([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    console.log(targetLanguages);
    // fetchTranslation();
  }, [targetLanguages]);

  const fetchTranslation = useDebouncedCallback(async () => {
    try {
      const translated = await axios.post("/api", {
        transcript: transcript,
        sourceLanguage: sourceLanguage,
        targetLanguages: targetLanguages,
      });
      setTranslatedText(translated.data);
      setError(null);
    } catch (err) {
      if (err.response.data.error) {
        setError(err.response.data.error);
      } else {
        setError(err.message);
      }
      setRecording(false);
    }
  }, 300);

  const beginListening = () => {
    SpeechRecognition.startListening({
      continuous: true,
      language: sourceLanguage,
    });
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
    setTranslatedText([]);
  };

  useEffect(() => {
    // Resetting Logic here
    setRecording(false);
    setError(null);
    setSourceLanguage(languages[0].short);
    setTargetLanguages(
      languages.length > 1 ? [languages[1].short] : [languages[0].short],
    );
    setSpeakerTurns(true);

    handleResetAll();
  }, [activeTab]);

  useEffect(() => {
    if (transcript) {
      fetchTranslation();
      console.log(transcript);
    }
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
        transcript,
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
