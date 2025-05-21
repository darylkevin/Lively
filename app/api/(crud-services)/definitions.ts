export const getClientIP = (request: Request) => {
    const clientIp = request.headers.get("x-forwarded-for")?.split(",")[0]?.split(":")[0] || request.socket.remoteAddress?.split(":")[0] || null;
    return clientIp;
}

