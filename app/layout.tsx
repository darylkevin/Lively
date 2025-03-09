import type { Metadata } from "next";
import { Merriweather_Sans, Inter } from "next/font/google";

import { ThemeProvider } from "./ui/contexts/ThemeContext";
import { RecordingProvider } from "./ui/contexts/RecordingContext";
import { metas } from "./lib/definitions";
import "./globals.css";

const merriweatherSans = Merriweather_Sans({ subsets: ["latin"] });
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: metas.title,
  description: metas.description,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${merriweatherSans.className} antialiased`}>
        <ThemeProvider>
          <RecordingProvider>{children}</RecordingProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
