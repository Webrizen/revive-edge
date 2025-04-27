import { auth } from "@clerk/nextjs/server";
import connectToDB from "@/lib/db";
import Goal from "@/lib/models/Goal";
import GiveUpEvent from "@/lib/models/GiveUpEvent";
import { GoogleGenAI } from "@google/genai";
import * as fs from "node:fs";
import path from "path";
import { randomUUID } from "crypto";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

async function generateDarkMirrorMessage(goals) {
  try {
    const goalsAndFailures = goals
      .map(
        (g, i) =>
          `${i + 1}. Goal: ${g.title} | Reason for Giving Up: ${
            g.reason || "Unknown"
          }`
      )
      .join("\n");

    const prompt = `
You are a dark psychologist. You must mirror the user's weakness brutally.
User's list of goals and their reasons for failure:

${goalsAndFailures}

Now, based on these, write a brutally honest realization for the user, exposing their flaws, emotional weaknesses, bad habits, and mental traps.
End it with a chilling warning about their future if they don't change immediately.
Write it like Ayanokoji from Classroom of the Elite, under 10 sentences. Cold, Manipulative, Precise.
`;

    const response = await ai.models.generateContent({
      model: "gemini-2.0-flash",
      contents: prompt,
      config: {
        systemInstruction: "Respond like Ayanokoji. Your name is DarkMirror.",
      },
    });

    return response?.text?.trim() || "No realization generated.";
  } catch (error) {
    console.error("Error generating dark mirror message:", error);
    throw new Error(`Dark Mirror generation failed: ${error.message}`);
  }
}

async function generateDarkMirrorImage(userGoalsAndReasons) {
  try {
    const goalsText = userGoalsAndReasons
      .map((item) => `Goal: "${item.goal}" - Reason: "${item.reason}"`)
      .join("\n");

    const response = await ai.models.generateContent({
      model: "gemini-2.0-flash-exp-image-generation",
      contents: [
        {
          role: "user",
          parts: [
            {
              text: `
  Create a cinematic, dark-themed ultra-realistic 4k image symbolizing a failed future. 
  The human gave up on these goals and reasons:
  ${goalsText}
  Visuals: Shattered dreams, broken ambitions, ruined hopes reflecting these specific goals. 
  Scene: Dark futuristic world, decayed city metaphor, lonely figure.
  Lighting: Moody, cinematic, heartbreaking. 
  No text overlay. Pure storytelling via visuals.
  `,
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
        const dir = path.join(process.cwd(), "public", "dark-mirror");
        if (!fs.existsSync(dir)) fs.mkdirSync(dir);

        const fileName = `darkmirror-${randomUUID()}.png`;
        const filePath = path.join(dir, fileName);
        fs.writeFileSync(filePath, buffer);

        return `/dark-mirror/${fileName}`;
      }
    }
    return null;
  } catch (err) {
    console.error("Image generation failed:", err);
    return null;
  }
}

export async function GET() {
  try {
    const { userId } = await auth();
    if (!userId) return new Response("Unauthorized", { status: 401 });

    await connectToDB();

    const goals = await Goal.find({ userId });
    const giveUps = await GiveUpEvent.find({ userId });

    if (goals.length === 0 || giveUps.length === 0) {
      return new Response("No data found for Dark Mirror.", { status: 404 });
    }

    // Map goals with their failure reasons
    const enrichedGoals = goals.map((goal) => {
      const relatedGiveUps = giveUps.filter(
        (g) => g.goalId?.toString() === goal._id.toString()
      );
      const lastReason =
        relatedGiveUps.length > 0
          ? relatedGiveUps[relatedGiveUps.length - 1].reason
          : "No recorded reason.";
      return {
        title: goal.title,
        reason: lastReason,
      };
    });

    const darkMessage = await generateDarkMirrorMessage(enrichedGoals);
    const darkImageUrl = await generateDarkMirrorImage(enrichedGoals);

    return Response.json({
      message: darkMessage,
      imageUrl: darkImageUrl,
      goals: enrichedGoals,
    });
  } catch (err) {
    console.error("GET /dark-mirror fatal error:", err);
    return new Response("Internal Server Error", { status: 500 });
  }
}
