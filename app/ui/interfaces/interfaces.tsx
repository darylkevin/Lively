import { ReactNode, Dispatch, SetStateAction } from "react";

export interface ThemeContextType {
  theme: string;
  setTheme: Dispatch<SetStateAction<string>>;
  toggleTheme: () => void;
}

export interface ThemeProviderProps {
  children: ReactNode;
}