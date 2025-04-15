import { auth } from "@clerk/nextjs/server";
import connectToDB from "@/lib/db";
import GiveUpEvent from "@/lib/models/GiveUpEvent";
import { ElevenLabsClient } from "elevenlabs";
import * as fs from "node:fs";
import path from "path";
import { randomUUID } from "crypto";
import { GoogleGenAI } from "@google/genai";

const elevenlabs = new ElevenLabsClient({
  apiKey: process.env.ELEVENLABS_API_KEY,
});
const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

async function getGeminiSummary(goal, reason) {
  try {
    const prompt = `Someone is giving up on their goal. \nGoal: ${goal}\nReason: ${reason}\nWrite a brutally honest, psychologically manipulative but motivating message.\nEnd with a mic-drop style challenge. talk like kiyotaka ayanokoji from classroom of the elite.`;

    const response = await ai.models.generateContent({
      model: "gemini-2.0-flash",
      contents: prompt,
      config: {
        systemInstruction: "kiyotaka ayanokoji from classroom of the elite. your name is ReviveEdge",
      },
    });

    return response?.text?.trim() || response.trim() || "No message available.";
  } catch (error) {
    console.error("Error in getGeminiSummary:", error);
    throw new Error(`Gemini summary generation failed: ${error.message}`);
  }
}

async function generateAudioFromText(text) {
  try {
    const audioStream = await elevenlabs.generate({
      voiceId: "WGINef1wh4Hi6O62bfO8",
      text,
      model_id: "eleven_multilingual_v2",
      voice_settings: {
        stability: 0.3,
        similarity_boost: 0.8,
      },
    });

    // --- Consume the stream into a Buffer ---
    const chunks = [];
    for await (const chunk of audioStream) {
       // The chunks should already be Buffers, but ensure it
       chunks.push(Buffer.isBuffer(chunk) ? chunk : Buffer.from(chunk));
    }
    const buffer = Buffer.concat(chunks);

    // Now convert the complete buffer to base64
    const audioBase64 = buffer.toString("base64");
    // Ensure the MIME type matches the output format (e.g., audio/mp3 if you requested mp3)
    const audioUrl = `data:audio/mpeg;base64,${audioBase64}`;

    return audioUrl;

  } catch (err) {
    console.error("Audio generation failed:", err);
    return null;
  }
}

async function generateImage(goal, reason) {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.0-flash-exp-image-generation",
      contents: [
        {
          role: "user",
          parts: [
            {
              text: `Generate image of a dramatic, highly detailed digital painting that symbolizes perseverance.\nThe user is struggling with the goal: \"${goal}\", because \"${reason}\".\nShow a powerful metaphorical scene of rising from darkness, futuristic, cinematic lighting, ultra-quality.`,
            },
          ],
        },
      ],
      config: {
        responseModalities: ["Text", "Image"],
      },
    });

    for (const part of response.candidates?.[0]?.content?.parts || []) {
      if (part.text) {
        console.log("Gemini returned text instead of image:", part.text);
        return null;
      } else if (part.inlineData) {
        const buffer = Buffer.from(part.inlineData.data, "base64");
        const dir = path.join(process.cwd(), "public", "gemini");
        if (!fs.existsSync(dir)) fs.mkdirSync(dir);

        const fileName = `gemini-${randomUUID()}.png`;
        const filePath = path.join(dir, fileName);
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

    const { goal, reason } = await req.json();
    if (!goal || !reason) {
      return new Response("Missing goal or reason", { status: 400 });
    }

    await connectToDB();

    const aiResponse = await getGeminiSummary(goal, reason);
    const imageUrl = await generateImage(goal, reason);
    const audioUrl = await generateAudioFromText(aiResponse);

    const event = await GiveUpEvent.create({
      userId,
      goal,
      reason,
      aiResponse,
      imageUrl,
      audioUrl,
      triggeredAt: new Date(),
    });

    return Response.json({
      insertedId: event._id,
      aiResponse,
      imageUrl,
      audioUrl,
    });
  } catch (err) {
    console.error("POST /giveup fatal error:", err);
    return new Response("Internal Server Error", { status: 500 });
  }
}
