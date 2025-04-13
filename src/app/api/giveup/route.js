import { auth } from "@clerk/nextjs/server";
import connectToDB from "@/lib/db";
import { GoogleGenAI } from "@google/genai";
import { ElevenLabsClient } from "elevenlabs";
import * as fs from "node:fs";
import path from "path";
import { randomUUID } from "crypto";

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
const ELEVENLABS_API_KEY = process.env.ELEVENLABS_API_KEY;

const ai = new GoogleGenAI({ apiKey: GEMINI_API_KEY });
const elevenlabs = new ElevenLabsClient({ apiKey: ELEVENLABS_API_KEY });

async function getGeminiSummary(goal, reason) {
  try {
    const response = await ai.models.generateContentStream({
      model: "gemini-1.5-flash",
      contents: `Someone is giving up on their goal. 
Goal: ${goal}
Reason: ${reason}
Write a brutally honest, psychologically manipulative but motivating message.
End with a mic-drop style challenge. talk like kiyotaka ayanokoji from classroom of the elite he who possesses a sagacious ability to read the emotions of people around him with pinpoint accuracy and either helps or destroys them.`,
    });

    let summary = "";
    for await (const chunk of response) {
      summary += chunk.candidates[0]?.content?.parts[0]?.text || "";
    }

    return summary.trim() || "No summary available.";
  } catch (err) {
    console.error("Gemini summary generation failed:", err);
    return "Even AI failed to motivate you. Maybe that’s your real problem.";
  }
}

async function generateAudioFromText(text) {
  try {
    const audio = await elevenlabs.textToSpeech.convert({
      voiceId: "WGINef1wh4Hi6O62bfO8",
      text,
      model_id: "eleven_multilingual_v2",
      voice_settings: {
        stability: 0.3,
        similarity_boost: 0.8,
      },
    });

    const buffer = Buffer.from(await audio.arrayBuffer());
    const audioBase64 = buffer.toString("base64");
    const audioUrl = `data:audio/mpeg;base64,${audioBase64}`;

    return audioUrl;
  } catch (err) {
    console.error("Audio generation failed:", err);
    return null;
  }
}

async function generateImage(goal, reason) {
  try {
    const contents = `Generate image of a dramatic, highly detailed digital painting that symbolizes perseverance. 
The user is struggling with the goal: "${goal}", because "${reason}". 
Show a powerful metaphorical scene of rising from darkness, futuristic, cinematic lighting, ultra-quality.`;

    const response = await ai.models.generateContent({
      model: "gemini-2.0-flash-exp-image-generation",
      contents: contents,
      config: {
        responseModalities: ["Text", "Image"],
      },
    });

    for (const part of response.candidates[0].content.parts) {
      if (part.text) {
        console.log("Gemini returned text instead of image:", part.text);
        return null;
      } else if (part.inlineData) {
        const imageData = part.inlineData.data;
        const buffer = Buffer.from(imageData, "base64");

        // Ensure directory exists
        const geminiDir = path.join(process.cwd(), "public", "gemini");
        if (!fs.existsSync(geminiDir)) fs.mkdirSync(geminiDir);

        const fileName = `gemini-${randomUUID()}.png`;
        const filePath = path.join(geminiDir, fileName);
        fs.writeFileSync(filePath, buffer);

        return `/gemini/${fileName}`;
      }
    }

    return null;
  } catch (err) {
    console.error("Image generation failed:", err);
    return null;
  }
}

export async function POST(req) {
  try {
    const { userId } = await auth();
    if (!userId) return new Response("Unauthorized", { status: 401 });

    const body = await req.json();
    const { goal, reason } = body;

    if (!goal || !reason) {
      return new Response("Missing goal or reason", { status: 400 });
    }

    const summary = await getGeminiSummary(goal, reason);
    const imageUrl = await generateImage(goal, reason);
    const audioUrl = await generateAudioFromText(summary);

    const client = await connectToDB;
    const db = client.db("revive_edge");

    const giveUpEvent = {
      userId,
      goal,
      reason,
      aiResponse: summary,
      imageUrl,
      audioUrl,
      triggeredAt: new Date(),
    };

    const insertResult = await db
      .collection("giveupevents")
      .insertOne(giveUpEvent);

    return Response.json({
      insertedId: insertResult.insertedId,
      aiResponse: summary,
    });
  } catch (err) {
    console.error("POST /giveup fatal error:", err);
    return new Response("Internal Server Error", { status: 500 });
  }
}
