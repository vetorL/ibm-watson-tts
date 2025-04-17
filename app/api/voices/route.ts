import { IamAuthenticator } from "ibm-watson/auth";
import TextToSpeechV1 from "ibm-watson/text-to-speech/v1";
import { NextResponse } from "next/server";

const textToSpeech = new TextToSpeechV1({
  authenticator: new IamAuthenticator({
    apikey: process.env.IBM_WATSON_API_KEY!,
  }),
  serviceUrl: process.env.IBM_WATSON_URL!,
});

export async function GET() {
  try {
    const voices = await textToSpeech.listVoices();
    console.log(voices);
    return NextResponse.json(voices.result);
  } catch (err) {
    console.error("IBM Watson error:", err);
    return NextResponse.json(
      { error: "Failed to fetch voices" },
      { status: 500 }
    );
  }
}
