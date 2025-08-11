"use client";

import axios from "axios";
import { createContext, useEffect, useState, useContext } from "react";
import { UsageContextType, UsageProviderProps } from "../interfaces/interfaces";
import RecordingContext from "./RecordingContext";

const UsageContext = createContext<UsageContextType | undefined>(undefined);

export const UsageProvider = ({ children }: UsageProviderProps) => {
  const [localUsageQuota, setLocalUsageQuota] = useState(null);
  const [globalUsageQuota, setGlobalUsageQuota] = useState(null);
  const { activeTab } = useContext(RecordingContext);

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
