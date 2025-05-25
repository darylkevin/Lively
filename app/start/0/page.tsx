"use client";

import {
  useSpeechSynthesis,
  useSpeechRecognition,
  SpeechProvider,
} from "react-speech-kit";

import { useState } from "react";

export default function Page() {
  const { speak, cancel, voices, speaking } = useSpeechSynthesis();
  const { recognitionEnabled, recognitionError, startListening } =
    useSpeechRecognition();

  const [language, setLanguage] = useState("zh-HK");
  const [text, setText] = useState("");

  const handleLanguageChange = (e) => {
    setLanguage(e.target.value);
  };

  const handleTextChange = (e) => {
    setText(e.target.value);
  };

  const handleSpeak = () => {
    let selectedVoice;

    const localVoices = window.speechSynthesis
      .getVoices()
      .filter((v) => v.lang === language && v.localService);
    if (localVoices.length > 0) {
      selectedVoice = localVoices[0];
    } else {
      selectedVoice =
        window.speechSynthesis.getVoices().find((v) => v.lang === language) ||
        null;
    }

    console.log("Available voices:", window.speechSynthesis.getVoices());
    console.log("Selected voice:", selectedVoice);
    console.log("Local voices:", localVoices);
    if (selectedVoice) {
      speak({ text: text, voice: selectedVoice });
    }
  };

  const handleStop = () => {
    cancel();
  };

  return (
    <div>
      {/* <select value={language} onChange={handleLanguageChange}>
          {window.speechSynthesis.getVoices().map((v) => (
            <option key={v.lang} value={v.lang} selected={language === v.lang}>
              `{v.name} {v.localService} (${v.lang})`
            </option>
          ))}
        </select> */}
      <br />
      <textarea
        value={text}
        onChange={handleTextChange}
        placeholder="Type something"
      />
      <br />
      <button onClick={handleSpeak} disabled={speaking}>
        Speak
      </button>
      <button onClick={handleStop} disabled={!speaking}>
        Stop
      </button>
    </div>
  );
}
