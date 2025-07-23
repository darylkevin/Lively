"use client";

import { createContext, useEffect, useState, useCallback, useRef } from "react";
import { useDebouncedCallback } from "use-debounce";
import { languages } from "@/app/lib/languages";

import * as speechsdk from "microsoft-cognitiveservices-speech-sdk";
import {
  RecordingContextType,
  RecordingProviderProps,
} from "../interfaces/interfaces";
import axios from "axios";

const RecordingContext = createContext<RecordingContextType | undefined>(
  undefined,
);

export const RecordingProvider = ({ children }: RecordingProviderProps) => {
  const [activeTab, setActiveTab] = useState("");
  const [sourceLanguage, setSourceLanguage] = useState(languages[0].short);
  const [targetLanguages, setTargetLanguages] = useState(
    languages.length > 1 ? [languages[1].short] : [languages[0].short],
  );
  const [recording, setRecording] = useState(false);
  const [speakerTurns, setSpeakerTurns] = useState(true);
  const [translatedText, setTranslatedText] = useState([]);
  const [error, setError] = useState<string | null>(null);

  const [transcript, setTranscript] = useState("");
  const recognizerRef = useRef<speechsdk.SpeechRecognizer | null>(null);

  const fetchTranslation = useDebouncedCallback(async () => {
    try {
      const translated = await axios.post("/api", {
        transcript: transcript,
        sourceLanguage: sourceLanguage,
        targetLanguages: targetLanguages.filter((lang) => lang !== ""),
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

  const getSpeechToken = async () => {
    const res = await axios.get("/api/speech-token");
    if (res.status !== 200) throw new Error("Failed to fetch speech token");
    return res.data;
  };

  const beginListening = async () => {
    const { token, region } = await getSpeechToken();
    const speechConfig = speechsdk.SpeechConfig.fromAuthorizationToken(
      token,
      region,
    );
    speechConfig.speechRecognitionLanguage = sourceLanguage;
    const audioConfig = speechsdk.AudioConfig.fromDefaultMicrophoneInput();
    const recognizer = new speechsdk.SpeechRecognizer(
      speechConfig,
      audioConfig,
    );

    recognizerRef.current = recognizer;
    setRecording(true);

    recognizer.recognizing = (s, e) => {
      setTranscript(e.result.text);
    };

    recognizer.recognized = (s, e) => {
      if (e.result.reason === speechsdk.ResultReason.RecognizedSpeech) {
        setTranscript(e.result.text);
      }
    };

    recognizer.canceled = async (s, e) => {
      console.error(`CANCELED: Reason=${e.reason}`);
      if (e.reason === speechsdk.CancellationReason.Error) {
        setError(`Error: ${e.errorDetails}`);
      }
      await stopListening();
    };

    recognizer.sessionStopped = async (s, e) => {
      await stopListening();
    };

    recognizer.startContinuousRecognitionAsync();
  };

  const stopListening = async () => {
    if (recognizerRef.current) {
      recognizerRef.current.stopContinuousRecognitionAsync(
        () => {
          recognizerRef.current?.close();
          recognizerRef.current = null;
          setRecording(false);
        },
        (err) => {
          console.error("Error stopping recognizer:", err);
          setRecording(false);
        },
      );
    }
  };

  const handleRecordSpeech = useCallback(async () => {
    if (recording) {
      await stopListening();
    } else {
      try {
        // Request microphone permission and immediately stop the track.
        const stream = await navigator.mediaDevices.getUserMedia({
          audio: true,
        });
        stream.getTracks().forEach((track) => track.stop());

        setError(null);
        await beginListening();
      } catch (err) {
        console.error("Error accessing microphone:", err);
        setError("Mic Access?");
      }
    }
  }, [recording, beginListening, stopListening]);

  const handleResetAll = () => {
    setTranscript("");
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
    }
  }, [transcript, targetLanguages]);

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
        setTranscript,
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
