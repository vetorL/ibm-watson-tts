import { IamAuthenticator } from "ibm-watson/auth";
import TextToSpeechV1 from "ibm-watson/text-to-speech/v1";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    // Extract apikey and serviceUrl from the request body
    const { apikey, serviceUrl } = await request.json();

    // Validate if both are provided
    if (!apikey || !serviceUrl) {
      return NextResponse.json(
        { error: "apikey and serviceUrl are required" },
        { status: 400 }
      );
    }

    // Initialize IBM Watson Text to Speech service
    const textToSpeech = new TextToSpeechV1({
      authenticator: new IamAuthenticator({
        apikey: apikey,
      }),
      serviceUrl: serviceUrl,
    });

    // Fetch voices
    const voices = await textToSpeech.listVoices();
    return NextResponse.json(voices.result);
  } catch (err) {
    console.error("IBM Watson error:", err);
    return NextResponse.json(
      { error: "Failed to fetch voices" },
      { status: 500 }
    );
  }
}
