export const getClientIP = (request: Request) => {
    const clientIp = request.headers.get("x-forwarded-for")?.split(",")[0] || request.socket.remoteAddress || null;
    return clientIp;
}