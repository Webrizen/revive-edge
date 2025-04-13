import { auth } from "@clerk/nextjs/server";
import connectToDB from "@/lib/db";

export async function GET(req) {
  const { userId } = await auth();
  if (!userId) return new Response("Unauthorized", { status: 401 });

  const client = await connectToDB;
  const db = client.db("revive_edge");

  const goals = await db.collection("goals").find({ userId }).toArray();
  return Response.json(goals);
}

export async function POST(req) {
    const { userId } = await auth();
  if (!userId) return new Response("Unauthorized", { status: 401 });

  const body = await req.json();
  const { title, description, deadline } = body;

  const client = await connectToDB;
  const db = client.db("revive_edge");

  const newGoal = {
    userId,
    title,
    description,
    deadline: deadline || null,
    completed: false,
    createdAt: new Date(),
    updatedAt: new Date()
  };

  const result = await db.collection("goals").insertOne(newGoal);
  return Response.json({ insertedId: result.insertedId });
}