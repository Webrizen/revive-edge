import { auth } from "@clerk/nextjs/server";
import connectToDB from "@/lib/db";
import Goal from "@/lib/models/Goal";
import { isValidObjectId } from "mongoose";

export async function GET(req, { params }) {
  const { userId } = await auth();
  const { id } = await params;
  if (!userId) return new Response("Unauthorized", { status: 401 });
  if (!isValidObjectId(id)) return new Response("Invalid ID", { status: 400 });

  await connectToDB();
  const goal = await Goal.findOne({ _id: id, userId });

  if (!goal) return new Response("Not found", { status: 404 });

  return Response.json(goal);
}

export async function PATCH(req, { params }) {
  const { userId } = await auth();
  if (!userId) return new Response("Unauthorized", { status: 401 });
  const { id } = await params;
  const goalId = id;
  if (!isValidObjectId(goalId)) return new Response("Invalid ID", { status: 400 });

  const updates = await req.json();

  await connectToDB();
  const updatedGoal = await Goal.findOneAndUpdate(
    { _id: goalId, userId },
    { ...updates, updatedAt: new Date() },
    { new: true }
  );

  if (!updatedGoal) return new Response("Not found or unauthorized", { status: 404 });

  return Response.json({ updated: true });
}

export async function DELETE(req, { params }) {
  const { userId } = await auth();
  if (!userId) return new Response("Unauthorized", { status: 401 });
  const { id } = await params;
  const goalId = id;
  if (!isValidObjectId(goalId)) return new Response("Invalid ID", { status: 400 });

  await connectToDB();
  const result = await Goal.deleteOne({ _id: goalId, userId });

  if (result.deletedCount === 0)
    return new Response("Not found or unauthorized", { status: 404 });

  return Response.json({ deleted: true });
}
