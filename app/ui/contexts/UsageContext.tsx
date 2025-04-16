"use client";

import { createContext, useEffect, useState, useCallback } from "react";

import { UsageContextType, UsageProviderProps } from "../interfaces/interfaces";
import {
  getRemainingGlobalChars,
  getRemainingLocalChars,
} from "@/app/api/(crud-supabase)/definitions";
import axios from "axios";

const UsageContext = createContext<UsageContextType | undefined>(undefined);

export const UsageProvider = ({ children }: UsageProviderProps) => {
  const [localUsageQuota, setLocalUsageQuota] = useState(null);
  const [globalUsageQuota, setGlobalUsageQuota] = useState(null);

  useEffect(() => {
    const getClientIP = async () => {
      const res = await axios.get("/api");
      return res;
    };

    const initialFetch = async () => {
      const clientIP = await getClientIP();
      const localUsage = await getRemainingLocalChars(clientIP.data.res);
      const globalUsage = await getRemainingGlobalChars();

      setLocalUsageQuota(localUsage);
      setGlobalUsageQuota(globalUsage);
    };

    initialFetch();
    console.log(localUsageQuota, globalUsageQuota);
  }, [localUsageQuota, globalUsageQuota]);

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
