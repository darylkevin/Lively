import { ReactNode, Dispatch, SetStateAction } from "react";

export interface ThemeContextType {
  theme: string;
  setTheme: Dispatch<SetStateAction<string>>;
  toggleTheme: () => void;
}

export interface RecordingContextType {
  activeTab: string;
  sourceLanguage: string;
  targetLanguages: string[];
  recording: boolean;
  speakerTurns: boolean;
  transcript: string;
  translatedText: { text: string }[];
  error: string | null;
  setError: Dispatch<SetStateAction<string | null>>;
  setTranscript: Dispatch<SetStateAction<string>>;
  setActiveTab: Dispatch<SetStateAction<string>>;
  setSourceLanguage: Dispatch<SetStateAction<string>>;
  setTargetLanguages: Dispatch<SetStateAction<string[]>>;
  setRecording: Dispatch<SetStateAction<boolean>>;
  setSpeakerTurns: Dispatch<SetStateAction<boolean>>;
  handleRecordSpeech: () => void;
  handleResetAll: () => void;
}

export interface UsageContextType {
  localUsageQuota: number;
  globalUsageQuota: number;
  setLocalUsageQuota: Dispatch<SetStateAction<number>>;
  setGlobalUsageQuota: Dispatch<SetStateAction<number>>;
}

export interface SpeechSynthesisContextType {
  handleSpeak: (text: string, language: string, panelComparator: string) => void;
  handleSpeakConverse: (
    text: string,
    panelComparator: string
  ) => void;
  voicesReady: boolean;
}

export interface ThemeProviderProps {
  children: ReactNode;
}

export interface RecordingProviderProps {
  children: ReactNode;
}

export interface UsageProviderProps {
  children: ReactNode;
}

export interface SpeechSynthesisContextProvider {
  children: ReactNode;
}
