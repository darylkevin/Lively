"use client";

import { createContext, useState } from "react";

import {
  UploadContextType,
  UploadProviderProps,
} from "../interfaces/interfaces";
import axios from "axios";

const UploadContext = createContext<UploadContextType | undefined>(undefined);

export const UploadProvider = ({ children }: UploadProviderProps) => {
  const [uploaded, setUploaded] = useState(false);

  const uploadFileToBackend = async (file: File) => {
    try {
      const formData = new FormData();
      formData.append("file", file);

      const response = await axios.post("/api/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (response.status === 200) {
        console.log("File uploaded successfully:", response.data);
        setUploaded(true);
      } else {
        console.error("File upload failed:", response.statusText);
      }
    } catch (error) {
      console.error("Error uploading file:", error);
    }
  };

  return (
    <UploadContext.Provider
      value={{
        uploadFileToBackend,
        uploaded,
        setUploaded,
      }}
    >
      {children}
    </UploadContext.Provider>
  );
};

export default UploadContext;
