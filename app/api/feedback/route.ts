import { pushFeedback } from "../lib/definitions";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const { feedback } = await request.json();
    await pushFeedback(feedback);

    return NextResponse.json({ status: 200 });
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
