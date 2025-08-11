import { getRemainingGlobalChars } from "../lib/definitions";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  try {
    const remainingGlobalUsage = await getRemainingGlobalChars();

    return NextResponse.json(remainingGlobalUsage, { status: 200 });
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
