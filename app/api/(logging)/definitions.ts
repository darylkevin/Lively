// Logging Format
// [TIME] [last request day] [LEVEL] - [CLIENT IP] [total chars] - [RemainingGlobal] [RemainingLocal]  [Message]

import { pushLogs } from "../lib/definitions";

export const BackendLogger = class BackendLogger {
  level: string;
  message: string;
  clientIp: string;
  requestedChars: number;
  remainingGlobal: number;
  remainingLocal: number;
  
  constructor(
    level: string,
    message: string,
    clientIp: string,
    requestedChars: number,
    remainingGlobal: number,
    remainingLocal: number,
  ) {
    this.level = level;
    this.message = message;
    this.clientIp = clientIp;
    this.requestedChars = requestedChars;
    this.remainingGlobal = remainingGlobal;
    this.remainingLocal = remainingLocal;

    const lastRequestDay = new Date().toISOString().split("T")[0];
    const time = new Date().toISOString();

    pushLogs(
      time,
      lastRequestDay,
      level,
      message,
      clientIp,
      requestedChars,
      remainingGlobal,
      remainingLocal,
    );

    // // //
    // For debugging only
    // console.log(`[${time}] [${lastRequestDay}] [${level}] - [${clientIp}] [Requested: ${requestedChars}] - [Global Limit Prior Transaction: ${remainingGlobal}] [Local Limit Prior Transaction: ${remainingLocal}] ${message}`);
    // // //
  }
};
