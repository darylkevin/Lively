import { getClientIP } from "../(crud-services)/definitions";
import { BackendLogger } from "../(logging)/definitions";
import { supabase } from "@/app/api/(crud-supabase)/supabase";

const MAX_LOCAL_CHARS_PER_DAY = process.env.NEXT_PUBLIC_MAX_LOCAL_CHARS_PER_DAY
const MAX_GLOBAL_CHARS_PER_DAY = process.env.NEXT_PUBLIC_MAX_GLOBAL_CHARS_PER_DAY

export const pushLogs = async (
  time: string,
  lastRequestDay: string,
  level: string,
  message: string,
  clientIp: string,
  requestedChars: number,
  remainingGlobal: number,
  remainingLocal: number
) => {

  const { data, error } = await supabase.from("logs").insert([
    {
      time: time,
      last_request_day: lastRequestDay,
      level: level,
      message: message,
      ip: clientIp,
      requested_chars: requestedChars,
      remaining_global: remainingGlobal,
      remaining_local: remainingLocal,
    },
  ]).select();

  if (error) {
    console.log(error.message)
  }

  return;
}

export const getRemainingGlobalChars = async () => {
    const today = new Date().toISOString().split("T")[0];
    const { data, error } = await supabase.from("global_api_usage").select("*").eq("last_request_day", today).maybeSingle();
    
    if (error) {
      new BackendLogger("ERROR", "Exception on getRemainingGlobalChars" + error.message, "global", "N/A", "N/A", "N/A");
      return;
    }

    if (data) {
      return MAX_GLOBAL_CHARS_PER_DAY - data.total_chars;
    } else {
      // No data found, return the maximum allowed characters
      return MAX_GLOBAL_CHARS_PER_DAY;
    }
}

export const getRemainingLocalChars = async (ip: string) => {
    const today = new Date().toISOString().split("T")[0];
    const { data, error } = await supabase.from("ip_api_usage").select("*").eq("ip", ip).eq("last_request_day", today).maybeSingle();
    
    if (error) {
      new BackendLogger("ERROR", "Exception on getRemainingLocalChars" + error.message, ip, "N/A", "N/A", "N/A");
      return;
    }

    if (data) {
      return MAX_LOCAL_CHARS_PER_DAY - data.total_chars;
    } else {
      // No data found for this IP, return the maximum allowed characters
      return MAX_LOCAL_CHARS_PER_DAY;
    }
};


export const getFromSupabaseGlobal = async () => {
    const today = new Date().toISOString().split("T")[0];
    const { data, error } = await supabase.from("global_api_usage").select("*").eq("last_request_day", today).maybeSingle();

    if (data) {
      return data;
    }

    if (error) {
      new BackendLogger("ERROR", "Exception on getFromSupabaseGlobal" + error.message, "global", "N/A", "N/A", "N/A");
      return;
    }
};

export const getFromSupabaseLocal = async (request: Request) => {
    const ip = getClientIP(request);
    const today = new Date().toISOString().split("T")[0];
    const { data, error } = await supabase.from("ip_api_usage").select("*").eq("ip", ip).eq("last_request_day", today).maybeSingle();

    if (data) {
      return data;
    }

    if (error) {
      new BackendLogger("ERROR", "Exception on getFromSupabaseLocal" + error.message, "ip", "N/A", "N/A", "N/A");
      return;
    }
  };

  export const addToSupabaseGlobal = async (requestedChars: number) => {

    const lastRequestDay = new Date().toISOString().split("T")[0];
    const lastUpdated = new Date();

    const { data, error } = await supabase
      .from("global_api_usage")
      .insert([
        {
          total_chars: requestedChars,
          last_request_day: lastRequestDay,
          updated: lastUpdated,
        },
      ])
      .select();

    if (error) {
      new BackendLogger("ERROR", "Failed to create: " + error.message, "global", "N/A", "N/A", "N/A")
      return;
    }
  };

export const addToSupabaseLocal = async (ip: string, requestedChars: number) => {

    const lastRequestDay = new Date().toISOString().split("T")[0];
    const lastUpdated = new Date();

    const { data, error } = await supabase
      .from("ip_api_usage")
      .insert([
        {
          ip: ip,
          total_chars: requestedChars,
          last_request_day: lastRequestDay,
          updated: lastUpdated,
        },
      ])
      .select();

    if (error) {
      new BackendLogger("ERROR", "Failed to create: " + error.message, "ip", "N/A", "N/A", "N/A")
      return;
    }
  };

  export const updateToSupabaseGlobal = async (totalChars: number) => {

    const last_request_day = new Date().toISOString().split("T")[0];
    const lastUpdated = new Date();

    const { data, error } = await supabase
      .from("global_api_usage")
      .update([
        {
          total_chars: totalChars,
          updated: lastUpdated,
        },
      ])
      .eq("last_request_day", last_request_day)
      .select();

    if (data.length === 0) {
        return;
    }

    if (error) {
      new BackendLogger("ERROR", "Failed to update: " + error.message, "global", "N/A", "N/A", "N/A")
      return;
    }
  };
 
export const updateToSupabaseLocal = async (ip: string, requestedChars: number) => {

    const last_request_day = new Date().toISOString().split("T")[0];
    const lastUpdated = new Date();

    const { data, error } = await supabase
      .from("ip_api_usage")
      .update([
        {
          total_chars: requestedChars,
          updated: lastUpdated,
        },
      ])
      .eq("ip", ip)
      .eq("last_request_day", last_request_day)
      .select();

    if (error) {
      new BackendLogger("ERROR", "Failed to update: " + error.message, ip, "N/A", "N/A", "N/A")
      return;
    }

    if (data.length === 0) {
      return;
    }
  };


