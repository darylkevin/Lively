import axios from "axios";
import { v4 as uuidv4 } from "uuid";
import { NextRequest } from "next/server";
import { BackendLogger } from "../(logging)/definitions";
import { supabase } from "@/app/api/(crud-supabase)/supabase";

const BASE_URL = process.env.AZURE_ENDPOINT;
const LOCATION = process.env.AZURE_LOCATION;
const AZURE_API_KEY = process.env.AZURE_API_KEY;

export const MAX_LOCAL_CHARS_PER_DAY =
  Number(process.env.NEXT_PUBLIC_MAX_LOCAL_CHARS_PER_DAY);
export const MAX_GLOBAL_CHARS_PER_DAY =
  Number(process.env.NEXT_PUBLIC_MAX_GLOBAL_CHARS_PER_DAY);

export const azureTranslationApi = async (
  transcript: string,
  sourceLanguage: string,
  targetLanguages: string[],
) => {
  try {
    const response = await axios.post(
      BASE_URL + "/translate",
      [
        {
          text: transcript,
        },
      ],
      {
        headers: {
          "Ocp-Apim-Subscription-Key": AZURE_API_KEY,
          "Ocp-Apim-Subscription-Region": LOCATION,
          "Content-type": "application/json",
          "X-ClientTraceId": uuidv4().toString(),
        },
        params: {
          "api-version": "3.0",
          from: sourceLanguage,
          to: targetLanguages.join(","),
        },
        responseType: "json",
      },
    );

    return response.data[0].translations;
  } catch (err: unknown) {
    if (err instanceof Error) {
      console.error(
        "Error during Azure Translation API call:",
        err.message,
        err.stack,
      );
      throw new Error(`Translation API Error: ${err.message}`);      
    }
    throw new Error("Translation API Error: An unknown error occured");
  }
};

export const pushLogs = async (
  time: string,
  lastRequestDay: string,
  level: string,
  message: string,
  clientIp: string,
  requestedChars: number,
  remainingGlobal: number,
  remainingLocal: number,
) => {
  const { data, error } = await supabase
    .from("logs")
    .insert([
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
    ])
    .select();

  if (error) {
    console.log(error.message);
  }

  return;
};

export const pushFeedback = async (feedback: string) => {
  const { data, error } = await supabase.from("feedbacks").insert([
    {
      feedback: feedback,
    },
  ]);

  if (error) {
    console.log(error.message);
  }

  return;
};

export const getClientIp = async (request: Request | NextRequest) => {
  const realIp = request.headers.get("x-real-ip");
  const forwardedFor = request.headers.get("x-forwarded-for");

  if (realIp) return realIp.split(",")[0].trim();
  if (forwardedFor) return forwardedFor.split(",")[0].trim();

  return "unknown";
};

export const getRemainingLocalChars = async (request: Request) => {
  const ip = await getClientIp(request);
  const today = new Date().toISOString().split("T")[0];
  const { data, error } = await supabase
    .from("ip_api_usage")
    .select("*")
    .eq("ip", ip)
    .eq("last_request_day", today)
    .maybeSingle();

  if (error) {
    new BackendLogger(
      "ERROR",
      "Exception on getRemainingLocalChars" + error.message,
      ip ?? "unknown",
      0,
      0,
      0,
    );
    return 0;
  }

  if (data) {
    return MAX_LOCAL_CHARS_PER_DAY - data.total_chars;
  } else {
    // No data found for this IP, return the maximum allowed characters
    return MAX_LOCAL_CHARS_PER_DAY;
  }
};

export const getRemainingGlobalChars = async () => {
  const today = new Date().toISOString().split("T")[0];
  const { data, error } = await supabase
    .from("global_api_usage")
    .select("*")
    .eq("last_request_day", today)
    .maybeSingle();

  if (error) {
    new BackendLogger(
      "ERROR",
      "Exception on getRemainingGlobalChars" + error.message,
      "global",
      0,
      0,
      0,
    );
    return 0;
  }

  if (data) {
    return MAX_GLOBAL_CHARS_PER_DAY - data.total_chars;
  } else {
    // No data found, return the maximum allowed characters
    return MAX_GLOBAL_CHARS_PER_DAY;
  }
};

export const getLocalUsage = async (request: Request) => {
  const ip = await getClientIp(request);
  const today = new Date().toISOString().split("T")[0];
  const { data, error } = await supabase
    .from("ip_api_usage")
    .select("*")
    .eq("ip", ip)
    .eq("last_request_day", today)
    .maybeSingle();

  if (data) {
    return data;
  }

  if (error) {
    new BackendLogger(
      "ERROR",
      "Exception on getLocalUsage" + error.message,
      "ip",
      0,
      0,
      0,
    );
    return;
  }
};

export const getGlobalUsage = async () => {
  const today = new Date().toISOString().split("T")[0];
  const { data, error } = await supabase
    .from("global_api_usage")
    .select("*")
    .eq("last_request_day", today)
    .maybeSingle();

  if (data) {
    return data;
  }

  if (error) {
    new BackendLogger(
      "ERROR",
      "Exception on getGlobalUsage" + error.message,
      "global",
      0,
      0,
      0,
    );
    return;
  }
};

export const addToLocalUsage = async (ip: string, requestedChars: number) => {
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
    new BackendLogger(
      "ERROR",
      "Failed to create: " + error.message,
      "ip",
      0,
      0,
      0,
    );
    return;
  }
};

export const addToGlobalUsage = async (requestedChars: number) => {
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
    new BackendLogger(
      "ERROR",
      "Failed to create: " + error.message,
      "global",
      0,
      0,
      0,
    );
    return;
  }
};

export const updateToLocalUsage = async (
  ip: string,
  requestedChars: number,
) => {
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
    new BackendLogger(
      "ERROR",
      "Failed to update: " + error.message,
      ip,
      0,
      0,
      0,
    );
    return;
  }
};

export const updateToGlobalUsage = async (totalChars: number) => {
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

  if (error) {
    new BackendLogger(
      "ERROR",
      "Failed to update: " + error.message,
      "global",
      0,
      0,
      0,
    );
    return;
  }
};
