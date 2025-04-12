// Logging Format
// [TIME] [last request day] [LEVEL] - [CLIENT IP] [total chars] - [RemainingGlobal] [RemainingLocal]  [Message]

export const BackendLogger = class BackendLogger {
    constructor(level, message, clientIp, requestedChars, remainingGlobal, remainingLocal) {
        this.level = level;
        this.message = message;
        this.clientIp = clientIp;
        this.requestedChars = requestedChars;
        this.remainingGlobal = remainingGlobal;
        this.remainingLocal = remainingLocal;

        const lastRequestDay = new Date().toISOString().split("T")[0];
        const time = new Date().toISOString();

        console.log(`[${time}] [${lastRequestDay}] [${level}] - [${clientIp}] [Requested: ${requestedChars}] - [Global Limit Prior Transaction: ${remainingGlobal}] [Local Limit Prior Transaction: ${remainingLocal}] ${message}`);
    }
}