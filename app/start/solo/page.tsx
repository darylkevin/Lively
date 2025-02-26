"use client";

import { useEffect, useState } from "react";
import { languages } from "@/app/lib/mock";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

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
  const [targetLanguages, setTargetLanguages] = useState([languages[1]]);

  const handleAddMoreLanguage = () => {
    setTargetLanguages([...targetLanguages, ""]);
    return;
  };

  const handleTargetLanguageChange = (language, i) => {
    const currTargetLanguages = [...targetLanguages];
    currTargetLanguages[i] = language;
    setTargetLanguages(currTargetLanguages);
  };

  const handleTargetLanguageDeletion = (index) => {
    setTargetLanguages(targetLanguages.filter((_, i) => i !== index));
  };

  return (
    <section className="h-full">
      {/* Mobile View */}
      <div className="flex flex-col gap-2 md:hidden">
        <div className="flex gap-4">
          <div className="mb-12 flex flex-col gap-1 w-full">
              <Select
                value={sourceLanguage}
                onValueChange={(value) => {
                  setSourceLanguage(value);
                }}
              >
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

              <div className="h-[20vh] overflow-auto rounded-3xl bg-gradient-to-b from-zinc-200 to-zinc-50 p-4 text-blue-400">
                Source Language: {sourceLanguage}
              </div>
          </div>

          <div className="flex flex-col justify-center">
          <svg width="125" viewBox="0 0 196 210" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M0.157475 107.238C0.0705038 87.9087 15.6699 72.1683 34.9996 72.0814L160.385 71.5172C179.715 71.4302 195.455 87.0296 195.542 106.359L195.843 173.148C195.929 192.478 180.33 208.219 161 208.306L35.6151 208.87C16.2853 208.957 0.544951 193.357 0.45798 174.028L0.157475 107.238Z" fill="url(#paint0_linear_33_24)"/>
          <circle cx="98.6891" cy="75.9147" r="73.4147" fill="url(#paint1_linear_33_24)" stroke="white" stroke-width="5"/>
          <defs>
          <linearGradient id="paint0_linear_33_24" x1="97.6923" y1="71.7993" x2="98.3077" y2="208.588" gradientUnits="userSpaceOnUse">
          <stop stop-color="#2FBFEC"/>
          <stop offset="1" stop-color="#2E85EC"/>
          </linearGradient>
          <linearGradient id="paint1_linear_33_24" x1="98.6891" y1="0" x2="98.6891" y2="151.829" gradientUnits="userSpaceOnUse">
          <stop stop-color="#1678EA"/>
          <stop offset="1" stop-color="#3EE7FE"/>
          </linearGradient>
          </defs>
          </svg>
          </div>




{/* 
          <div className="flex flex-col justify-end items-center relative min-w-36 bottom-7">
              <img src="/icons/mic-unmute.png" width={75} className="z-20 absolute bottom-[70px]" onClick={() =>
                console.log(123)
              }/>
              <img src="/icons/mic-mute.png" width={40} className="z-20 absolute right-[95px] bottom-7" onClick={() =>
                console.log(456)
              }/>
              <img src="/icons/mic-reboot.png" width={40} className="z-20 absolute left-[95px] bottom-7" onClick={()=>
                console.log(789)
              }/>
              <img src="/shapes/solo-eclipse.png" width={110} className="z-10 absolute top-[110px]"/>
              <img src="/shapes/solo-rectangle.png" width={135} className="absolute bottom-5"/>
          </div> */}
        </div>


        <div className="flex flex-col gap-2">
          {targetLanguages.map((language, i) => (
            <div key={i} className="flex flex-col gap-1">
              <div className="flex items-center justify-between">
                <Select
                  value={language}
                  onValueChange={(value) => {
                    handleTargetLanguageChange(value, i);
                  }}
                >
                  <SelectTrigger className="w-[250px]">
                    <SelectValue placeholder="Choose a target language" />
                  </SelectTrigger>
                  <SelectContent>
                    {languages.map((language, i) => (
                      <SelectItem key={i} value={language}>
                        {language}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <div
                  className="mr-4 text-blue-400"
                  onClick={() => handleTargetLanguageDeletion(i)}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="size-5"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M6 18 18 6M6 6l12 12"
                    />
                  </svg>
                </div>
              </div>

              <div className="h-[20vh] overflow-auto rounded-3xl bg-gradient-to-b from-zinc-200 to-zinc-50 p-4 text-blue-400">
                Target Language: {language}
              </div>
            </div>
          ))}
        </div>

        <div
          className="text-blue-400"
          onClick={() => handleAddMoreLanguage()}
        >
          <div className="flex items-center gap-2">
            {
              targetLanguages.length === 0 ? (
                  <div className="w-full text-center p-2">
                    <span className="font-extralight">Click here to add a target language.</span>
                  </div>
              ) : (
                <div className="w-full p-2 flex gap-2 items-center">
                    <span className="text-xl">+</span>
                    <p>Add More</p>
                </div>
              )
            }
          </div>
        </div>
      </div>

      {/* Desktop View */}
      <div className="max-md:hidden md:block">Solo Page Desktop</div>
    </section>
  );
}
