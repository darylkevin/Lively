import type { Metadata } from "next";
import { Merriweather_Sans, Inter } from "next/font/google";

import { ThemeProvider } from "./ui/contexts/ThemeContext";
import { RecordingProvider } from "./ui/contexts/RecordingContext";
import { metas } from "./lib/definitions";

import "./globals.css";
import { UsageProvider } from "./ui/contexts/UsageContext";
import { UploadProvider } from "./ui/contexts/UploadContext";

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
      <body className={`${inter.className} antialiased`}>
        <ThemeProvider>
          <RecordingProvider>
            <UsageProvider>
              <UploadProvider>{children}</UploadProvider>
            </UsageProvider>
          </RecordingProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
