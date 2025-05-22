export const getClientIP = (request: Request) => {
    let clientIp;
    
    try {
        clientIp = request.headers.get("x-forwarded-for")?.split(",")[0]?.split(":")[0] || request.socket.remoteAddress?.split(":")[0] || null;
    } catch (error) {
        clientIp = "::1";
    }
    return clientIp;
}

