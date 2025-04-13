import { auth } from "@clerk/nextjs/server";
import connectToDB from "@/lib/db";
import { ObjectId } from "mongodb";

export async function GET(req, { params }) {
    const { userId } = await auth();
  if (!userId) return new Response("Unauthorized", { status: 401 });

  const client = await connectToDB;
  const db = client.db("revive_edge");

  const goal = await db.collection("goals").findOne({
    _id: new ObjectId(params.id),
    userId,
  });

  if (!goal) return new Response("Not found", { status: 404 });

  return Response.json(goal);
}

export async function PATCH(req, { params }) {
    const { userId } = await auth();
  if (!userId) return new Response("Unauthorized", { status: 401 });

  const updates = await req.json();

  const client = await connectToDB;
  const db = client.db("revive_edge");

  const result = await db.collection("goals").updateOne(
    { _id: new ObjectId(params.id), userId },
    { $set: { ...updates, updatedAt: new Date() } }
  );

  if (result.matchedCount === 0)
    return new Response("Not found or unauthorized", { status: 404 });

  return Response.json({ updated: true });
}

export async function DELETE(req, { params }) {
  const { userId } = auth();
  if (!userId) return new Response("Unauthorized", { status: 401 });

  const client = await connectToDB;
  const db = client.db("revive_edge");

  const result = await db.collection("goals").deleteOne({
    _id: new ObjectId(params.id),
    userId,
  });

  if (result.deletedCount === 0)
    return new Response("Not found or unauthorized", { status: 404 });

  return Response.json({ deleted: true });
}