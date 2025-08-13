import { getRemainingLocalChars } from "../lib/definitions";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  try {
    const remainingLocalUsage = await getRemainingLocalChars(request);

    return NextResponse.json(remainingLocalUsage, { status: 200 });
  } catch (err: unknown) {
    if (err instanceof Error) {
      return NextResponse.json({ error: err.message }, { status: 500 });      
    }
    return NextResponse.json({ error: "An unknown error occured" }, { status: 500 });
  }
}
