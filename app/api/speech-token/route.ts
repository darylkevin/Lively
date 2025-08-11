import axios from "axios";

export async function GET() {
  try {

    const key = process.env.AZURE_SPEECH_KEY;
    const region = process.env.AZURE_SPEECH_REGION;

    if (!key || !region) {
      return new Response(
        JSON.stringify({ error: "Missing Azure Speech key or region" }),
        { status: 400 },
      );
    }

    const headers = {
      "Ocp-Apim-Subscription-Key": key,
      "Content-Type": "application/x-www-form-urlencoded",
    };

    const response = await axios.post(
      `https://${region}.api.cognitive.microsoft.com/sts/v1.0/issueToken`,
      null,
      { headers },
    );

    const token = response.data;

    return new Response(
      JSON.stringify({
        token,
        region,
      }),
      { status: 200 },
    );
  } catch (err) {
    console.error(
      "Error fetching Azure speech token:",
      err.response?.data || err.message,
    );

    return new Response(
      JSON.stringify({ error: "Failed to fetch speech token" }),
      { status: 500 },
    );
  }
}
