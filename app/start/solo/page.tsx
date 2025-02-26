"use client";

import { useEffect, useState } from "react";
import { languages } from "@/app/lib/mock";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

// xs: 320
// sm: 640
// md: 768
// lg: 1024
// xl: 1280
// 2xl: 1536

// mobile-phones: 320px-480px
// tablets: 768px-1024px
// laptops: 1024px-1440px
// monitors: 1440px-2560px

export default function Page() {

  const [sourceLanguage, setSourceLanguage] = useState(languages[0]);
  const [targetLanguages, setTargetLanguages] = useState([languages[1]])

  const handleAddMoreLanguage = () => {
    setTargetLanguages(
      [...targetLanguages, ""]
    )
    return;
  }

  const handleTargetLanguageChange = (language, i) => {
    const currTargetLanguages = [...targetLanguages]
    currTargetLanguages[i] = language
    setTargetLanguages(currTargetLanguages)
  }

  const handleTargetLanguageDeletion = (index) => {
    setTargetLanguages(targetLanguages.filter((_, i) => i !== index));
  };

  return (
    <section className="h-full">
      {/* Mobile View */}
      <div className="md:hidden flex flex-col gap-2">
        <div className="flex flex-col gap-1 mb-12">
            <Select 
              value={sourceLanguage}
              onValueChange={(value) => {
                setSourceLanguage(value);
              }}>
              <SelectTrigger className="w-[250px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
              {languages.map((lang, i) => (
                <SelectItem key={i} value={lang}>
                  {lang}
                </SelectItem>
              ))}
              </SelectContent>
            </Select>


          <div className="rounded-3xl h-[20vh] overflow-auto p-4 bg-gradient-to-b from-zinc-200 to-zinc-50 text-blue-400">
            Source Language: {sourceLanguage}
          </div>
        </div>

        <div className="flex flex-col gap-2">
        {targetLanguages.map((language, i) => (
          <div key={i} className="flex flex-col gap-1">
            <div className="flex justify-between items-center">
              <Select 
                value={language}
                onValueChange={(value) => {
                  handleTargetLanguageChange(value, i)
                }}>
                <SelectTrigger className="w-[250px]">
                  <SelectValue placeholder="Choose a target language" />
                </SelectTrigger>
                <SelectContent>
                  {
                    languages.map((language, i) => (
                      <SelectItem key={i} value={language}>{language}</SelectItem>
                    ))
                  }
                </SelectContent>
              </Select>
              <div className="mr-4 text-blue-400" onClick={
                () => handleTargetLanguageDeletion(i)
              }>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-5">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12" />
                </svg>

              </div>
            </div>



            <div className="rounded-3xl h-[20vh] overflow-auto p-4 bg-gradient-to-b from-zinc-200 to-zinc-50 text-blue-400">
              Target Language: {language}
            </div>
          </div>
        ))}
        </div>

        
        <div className=" text-blue-400 w-fit p-2" onClick={
          () => handleAddMoreLanguage()
        }>
          <div className="flex gap-2 items-center">
            <span className="text-xl">+</span>
            <p>Add More</p>
          </div>
        </div>


      </div>

      {/* Desktop View */}
      <div className="max-md:hidden md:block">
        Solo Page Desktop
      </div>
    </section>
  );
}
