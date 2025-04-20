import { IamAuthenticator } from "ibm-watson/auth";
import TextToSpeechV1 from "ibm-watson/text-to-speech/v1";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const { apikey, serviceUrl, text, voice } = await request.json();

    if (!apikey || !serviceUrl) {
      return NextResponse.json(
        { error: "apikey and serviceUrl are required" },
        { status: 400 }
      );
    }

    const textToSpeech = new TextToSpeechV1({
      authenticator: new IamAuthenticator({ apikey }),
      serviceUrl,
    });

    const synthesizeParams = {
      text: text,
      accept: "audio/wav",
      voice: voice,
    };

    const { result: audioStream } = await textToSpeech.synthesize(synthesizeParams);

    const chunks: Buffer[] = [];

    for await (const chunk of audioStream as any) {
      chunks.push(typeof chunk === "string" ? Buffer.from(chunk) : chunk);
    }

    const buffer = Buffer.concat(chunks);

    return new Response(buffer, {
      status: 200,
      headers: {
        "Content-Type": "audio/wav",
        "Content-Disposition": 'attachment; filename="audio-output.wav"',
      },
    });
  } catch (err) {
    console.error("IBM Watson error:", err);
    return NextResponse.json(
      { error: "Failed to synthesize audio" },
      { status: 500 }
    );
  }
}
