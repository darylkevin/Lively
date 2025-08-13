import { pushFeedback } from "../lib/definitions";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const { feedback } = await request.json();
    await pushFeedback(feedback);

    return NextResponse.json({ status: 200 });
  } catch (err: unknown) {
    if (err instanceof Error) {
      return NextResponse.json({ error: err.message }, { status: 500 });      
    }
    return NextResponse.json({ error: "An unknown error occured" }, { status: 500 });
  }
}
