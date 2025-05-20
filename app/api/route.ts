import axios from "axios";
import { v4 as uuidv4 } from "uuid";
import { supabase } from "@/app/api/(crud-supabase)/supabase";
import { getClientIP } from "./(crud-services)/definitions";
import { getRemainingGlobalChars, getRemainingLocalChars, getFromSupabaseGlobal, getFromSupabaseLocal, addToSupabaseGlobal, addToSupabaseLocal, updateToSupabaseGlobal, updateToSupabaseLocal } from "./(crud-supabase)/definitions";
import { BackendLogger } from "./(logging)/definitions";
import { violations } from "./(violations)/definitions";

import * as deepl from 'deepl-node';


const BASE_URL = process.env.AZURE_ENDPOINT
const LOCATION = process.env.AZURE_LOCATION
const AZURE_API_KEY = process.env.AZURE_API_KEY
const DEEPL_API_KEY = process.env.DEEPL_API_KEY

const MAX_LOCAL_CHARS_PER_DAY = process.env.NEXT_PUBLIC_MAX_LOCAL_CHARS_PER_DAY
const MAX_GLOBAL_CHARS_PER_DAY = process.env.NEXT_PUBLIC_MAX_GLOBAL_CHARS_PER_DAY

// This is a GET route for debugging purposes
// We may call multiple functions on this file to check if they are working as expected
export async function GET(request: Request) {
    try {
        // Client IP
        const res = getClientIP(request);
        return new Response(JSON.stringify({ res }), { status: 200 });

        // Supabase GET
        // const res = await getFromSupabaseLocal(request);
        // return new Response(JSON.stringify(res), { status: 200 });

        // Supabase POST
        // const res = await addToSupabaseLocal(request, 100);
        // return new Response(JSON.stringify({ res }), { status: 200 });

        // Supabase UPDATE
        // const res = await updateToSupabaseLocal(request, 200);
        // return new Response(JSON.stringify({ res }), { status: 200 });

        return;

    } catch (err) {
        return new Response(JSON.stringify({ error: err.message }), { status: 500 });
    }
}

// This is the main POST route for the translation API
export async function POST(request: Request) {
    try {

        const { transcript, sourceLanguage, targetLanguages } = await request.json();
        const requestedChars = transcript.length;

        const clientIP = await getClientIP(request);
        const globalResponse = await getFromSupabaseGlobal();
        const localResponse = await getFromSupabaseLocal(request);

        let translation;

        if (requestedChars > MAX_GLOBAL_CHARS_PER_DAY) {
            new BackendLogger("ERROR", violations[1], clientIP, requestedChars, await getRemainingGlobalChars(), await getRemainingLocalChars(clientIP));
            return new Response(JSON.stringify({ error: violations[1] }), { status: 400 });
        } 
        else if (requestedChars > MAX_LOCAL_CHARS_PER_DAY) {
            new BackendLogger("ERROR", violations[2], clientIP, requestedChars, await getRemainingGlobalChars(), await getRemainingLocalChars(clientIP));
            return new Response(JSON.stringify({ error: violations[2] }), { status: 400 });
        }
        else {
            if (localResponse && globalResponse) {
                const total_global_chars = globalResponse.total_chars;
                const total_local_chars = localResponse.total_chars;

                if (total_global_chars + requestedChars > MAX_GLOBAL_CHARS_PER_DAY) {
                    new BackendLogger("ERROR", violations[3], clientIP, requestedChars, await getRemainingGlobalChars(), await getRemainingLocalChars(clientIP));
                    return new Response(JSON.stringify({ error: violations[3] }), { status: 400 });
                } else if (total_local_chars + requestedChars > MAX_LOCAL_CHARS_PER_DAY) {
                    new BackendLogger("ERROR", violations[4], clientIP, requestedChars, await getRemainingGlobalChars(), await getRemainingLocalChars(clientIP));
                    return new Response(JSON.stringify({ error: violations[4] }), { status: 400 });           
                } else {
                    new BackendLogger("INFO", "UPDATE token", clientIP, requestedChars, await getRemainingGlobalChars(), await getRemainingLocalChars(clientIP));
                    await updateToSupabaseLocal(clientIP, total_local_chars + requestedChars);
                    await updateToSupabaseGlobal(total_global_chars + requestedChars);
                    translation = await azureTranslationApi(transcript, sourceLanguage, targetLanguages);                    
                }
            } else {
                new BackendLogger("INFO", "CREATE token", clientIP, requestedChars, await getRemainingGlobalChars(), await getRemainingLocalChars(clientIP));
                await addToSupabaseLocal(clientIP, requestedChars);
                await addToSupabaseGlobal(requestedChars);
                translation = await azureTranslationApi(transcript, sourceLanguage, targetLanguages);
            }
        }
        return new Response(JSON.stringify(translation), { status: 200 });
    } catch (err) {
        return new Response(JSON.stringify({ error: err.message }), { status: 500 });
    }
}

export const deepLTranslationApi = async (transcript, sourceLanguage, targetLanguages) => {
    try {

        const responses = []

        const authKey = DEEPL_API_KEY
        const translator = new deepl.Translator(authKey);

        for (const targetLanguage of targetLanguages) {
            const result = await translator.translateText(
                transcript,
                'en',
                'de',
            )

            responses.push({
                text: result.text,
                billedCharacters: result.billedCharacters,
            })
        }

        // Result:
        // [
        //     {
        //         text: "Hey Mann, wie geht's dir? Ich teste gerade die Deep L, äh, Übersetzungen.",
        //         billedCharacters: 82
        //     }
        // ]

        return responses

    } catch (err) {
        console.log(err)
        throw err;
    }
}

export const azureTranslationApi = async (transcript, sourceLanguage, targetLanguages) => {
    try {
        const response = await axios.post(
            BASE_URL + '/translate',
            [{
                'text': transcript
            }],
            {
                headers: {
                'Ocp-Apim-Subscription-Key': AZURE_API_KEY,
                'Ocp-Apim-Subscription-Region': LOCATION,
                'Content-type': 'application/json',
                'X-ClientTraceId': uuidv4().toString()
                },
                params: {
                'api-version': '3.0',
                'from': sourceLanguage,
                'to': targetLanguages.join(','),
                },
                responseType: 'json'
            })
        
        console.log(response.data[0].translations)
        return response.data[0].translations;

    } catch (err) {
        console.error('Error during Azure Translation API call:', err.message, err.stack);
        throw new Error(`Translation API Error: ${err.message}`);
    }
} 