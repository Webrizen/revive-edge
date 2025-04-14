import { auth } from "@clerk/nextjs/server";
import connectToDB from "@/lib/db";
import Goal from "@/lib/models/Goal";

export async function GET(req) {
  const { userId } = await auth();
  if (!userId) return new Response("Unauthorized", { status: 401 });

  try {
    await connectToDB();
    const goals = await Goal.find({ userId });
    return Response.json(goals);
  } catch (err) {
    console.error("[GET GOALS ERROR]", err);
    return new Response("Internal Server Error", { status: 500 });
  }
}

export async function POST(req) {
  const { userId } = await auth();
  if (!userId) return new Response("Unauthorized", { status: 401 });

  try {
    await connectToDB();
    const body = await req.json();
    const { title, description, deadline } = body;

    const newGoal = await Goal.create({
      userId,
      title,
      description,
      deadline: deadline || null,
      completed: false,
    });

    return Response.json({ insertedId: newGoal._id });
  } catch (err) {
    console.error("[POST GOAL ERROR]", err);
    return new Response("Internal Server Error", { status: 500 });
  }
}