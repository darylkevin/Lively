import {
  azureTranslationApi,
  getClientIp,
  getLocalUsage,
  getGlobalUsage,
  getRemainingLocalChars,
  getRemainingGlobalChars,
  MAX_LOCAL_CHARS_PER_DAY,
  MAX_GLOBAL_CHARS_PER_DAY,
  updateToLocalUsage,
  updateToGlobalUsage,
  addToLocalUsage,
  addToGlobalUsage,
} from "../lib/definitions";

import { BackendLogger } from "../(logging)/definitions";
import { violations } from "../(violations)/definitions";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    
    const { transcript, sourceLanguage, targetLanguages } =
      await request.json();
    const requestedChars = transcript.length;

    const clientIp = await getClientIp(request);
    const localUsage = await getLocalUsage(request);
    const globalUsage = await getGlobalUsage();

    let translation;

    if (requestedChars > MAX_GLOBAL_CHARS_PER_DAY) {
      new BackendLogger(
        "ERROR",
        violations[1],
        clientIp,
        requestedChars,
        await getRemainingGlobalChars(),
        await getRemainingLocalChars(request),
      );
      return NextResponse.json({ error: violations[1] }, { status: 400 });
    } else if (requestedChars > MAX_LOCAL_CHARS_PER_DAY) {
      new BackendLogger(
        "ERROR",
        violations[2],
        clientIp,
        requestedChars,
        await getRemainingGlobalChars(),
        await getRemainingLocalChars(request),
      );
      return NextResponse.json({ error: violations[2] }, { status: 400 });
    } else {
      if (localUsage && globalUsage) {
        const total_global_chars = globalUsage.total_chars;
        const total_local_chars = localUsage.total_chars;

        if (total_global_chars + requestedChars > MAX_GLOBAL_CHARS_PER_DAY) {
          new BackendLogger(
            "ERROR",
            violations[3],
            clientIp,
            requestedChars,
            await getRemainingGlobalChars(),
            await getRemainingLocalChars(request),
          );
          return NextResponse.json({ error: violations[3] }, { status: 400 });
        } else if (
          total_local_chars + requestedChars >
          MAX_LOCAL_CHARS_PER_DAY
        ) {
          new BackendLogger(
            "ERROR",
            violations[4],
            clientIp,
            requestedChars,
            await getRemainingGlobalChars(),
            await getRemainingLocalChars(request),
          );
          return NextResponse.json({ error: violations[4] }, { status: 400 });
        } else {
          new BackendLogger(
            "INFO",
            "UPDATE token",
            clientIp,
            requestedChars,
            await getRemainingGlobalChars(),
            await getRemainingLocalChars(request),
          );

          await updateToLocalUsage(
            clientIp,
            total_local_chars + requestedChars,
          );
          await updateToGlobalUsage(total_global_chars + requestedChars);
          translation = await azureTranslationApi(
            transcript,
            sourceLanguage,
            targetLanguages,
          );
        }
      } else {
        new BackendLogger(
          "INFO",
          "CREATE token",
          clientIp,
          requestedChars,
          await getRemainingGlobalChars(),
          await getRemainingLocalChars(request),
        );

        await addToLocalUsage(clientIp, requestedChars);
        await addToGlobalUsage(requestedChars);
        translation = await azureTranslationApi(
          transcript,
          sourceLanguage,
          targetLanguages,
        );
      }
    }
    return NextResponse.json(translation, { status: 200 });
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
