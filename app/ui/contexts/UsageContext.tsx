"use client";

import axios from "axios";
import { createContext, useEffect, useState, useContext } from "react";
import { UsageContextType, UsageProviderProps } from "../interfaces/interfaces";
import RecordingContext, { useRecordingContext } from "./RecordingContext";

export const MAX_LOCAL_CHARS_PER_DAY =
  Number(process.env.NEXT_PUBLIC_MAX_LOCAL_CHARS_PER_DAY);
export const MAX_GLOBAL_CHARS_PER_DAY =
  Number(process.env.NEXT_PUBLIC_MAX_GLOBAL_CHARS_PER_DAY);

const UsageContext = createContext<UsageContextType | undefined>(undefined);

export const useUsageContext = () => {
  const context = useContext(UsageContext);
  if (!context) {
    throw new Error("useUsageContext must be used within a UsageProvider");
  }
  return context;
}

export const UsageProvider = ({ children }: UsageProviderProps) => {
  const [localUsageQuota, setLocalUsageQuota] = useState(MAX_LOCAL_CHARS_PER_DAY);
  const [globalUsageQuota, setGlobalUsageQuota] = useState(MAX_GLOBAL_CHARS_PER_DAY);
  const { activeTab } = useRecordingContext();

  useEffect(() => {
    const initialFetch = async () => {
      const remainingLocalUsage = await axios("/api/remaining-local-usage");
      const remainingGlobalUsage = await axios("/api/remaining-global-usage");

      setLocalUsageQuota(remainingLocalUsage.data);
      setGlobalUsageQuota(remainingGlobalUsage.data);
    };

    initialFetch();
  }, [activeTab, localUsageQuota, globalUsageQuota]);

  return (
    <UsageContext.Provider
      value={{
        localUsageQuota,
        globalUsageQuota,
        setLocalUsageQuota,
        setGlobalUsageQuota,
      }}
    >
      {children}
    </UsageContext.Provider>
  );
};

export default UsageContext;
