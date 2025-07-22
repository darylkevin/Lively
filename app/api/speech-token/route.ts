export async function GET (req, res) {
  const key = process.env.AZURE_SPEECH_KEY;
  const region = process.env.AZURE_SPEECH_REGION;

  if (!key || !region) {
    return new Response(
      JSON.stringify({ error: "Missing Azure Speech key or region" }),
      { status: 401 }
    );
  }

  const fetchRes = await fetch(
    `https://${region}.api.cognitive.microsoft.com/sts/v1.0/issueToken`,
    {
      method: "POST",
      headers: {
        "Ocp-Apim-Subscription-Key": key,
        "Content-Type": "application/x-www-form-urlencoded",
      },
    }
  );

  if (!fetchRes.ok) {
    return new Response(
      JSON.stringify({ error: "Failed to fetch speech token" }),
      { status: 400 }
    );
  }

  const token = await fetchRes.text();
  // The region and token are needed on the client to use Speech SDK
  return new Response(
    JSON.stringify({
      token,
      region,
    }),
  );
}
