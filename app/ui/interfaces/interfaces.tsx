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
  setActiveTab: Dispatch<SetStateAction<string>>;
  setSourceLanguage: Dispatch<SetStateAction<string>>;
  setTargetLanguages: Dispatch<SetStateAction<string[]>>;
  setRecording: Dispatch<SetStateAction<boolean>>;
  setSpeakerTurns: Dispatch<SetStateAction<boolean>>;
}

export interface ThemeProviderProps {
  children: ReactNode;
}

export interface RecordingProviderProps {
  children: ReactNode;
}
