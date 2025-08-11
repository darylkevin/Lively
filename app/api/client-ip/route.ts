import { getClientIp } from "../lib/definitions";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: Request) {
  try {
    const clientIp = getClientIp(request);

    return NextResponse.json({ res: clientIp }, { status: 200 });
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
