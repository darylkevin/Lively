"use client";
import { useState, useRef } from "react";
import * as speechsdk from "microsoft-cognitiveservices-speech-sdk";

const getSpeechToken = async () => {
  const res = await fetch("/api/speech-token");
  if (!res.ok) throw new Error("Failed to fetch speech token");
  return res.json();
};

export default function Home() {
  const [finalText, setFinalText] = useState(""); // Final recognized text (formatted)
  const [interimText, setInterimText] = useState(""); // In-progress text (not yet finalized)
  const [isListening, setIsListening] = useState(false);
  const recognizerRef = useRef(null);

  const toggleRecognition = async () => {
    if (!isListening) {
      // Start recognizing

      const { token, region } = await getSpeechToken();
      const speechConfig = speechsdk.SpeechConfig.fromAuthorizationToken(
        token,
        region,
      );

      speechConfig.speechRecognitionLanguage = "en-US";
      const audioConfig = speechsdk.AudioConfig.fromDefaultMicrophoneInput();
      const recognizer = new speechsdk.SpeechRecognizer(
        speechConfig,
        audioConfig,
      );

      recognizer.recognizing = (s, e) => {
        setInterimText(e.result.text);
      };

      recognizer.recognized = (s, e) => {
        if (e.result.reason === speechsdk.ResultReason.RecognizedSpeech) {
          setFinalText((prev) =>
            prev
              ? prev.trim() + " " + e.result.text.trim()
              : e.result.text.trim(),
          );
          setInterimText(""); // Clear interim once finalized
        }
      };

      recognizer.canceled = (s, e) => {
        setIsListening(false);
        setInterimText("");
      };

      recognizer.sessionStopped = (s, e) => {
        setIsListening(false);
        setInterimText("");
        recognizer.close();
      };

      recognizer.startContinuousRecognitionAsync();
      recognizerRef.current = recognizer;
      setIsListening(true);
      setFinalText(""); // Optionally clear previous result on start
      setInterimText("Listening...");
    } else {
      // Stop recognizing
      recognizerRef.current.stopContinuousRecognitionAsync(() => {
        recognizerRef.current.close();
        recognizerRef.current = null;
        setIsListening(false);
        setInterimText("");
      });
    }
  };

  return (
    <div>
      <button onClick={toggleRecognition}>
        {isListening ? "Stop Listening" : "Start Listening"}
      </button>
      <p>
        {finalText}
        {isListening && (
          <span style={{ color: "#aaa" }}>
            {interimText && " " + interimText}
          </span>
        )}
      </p>
    </div>
  );
}
