import { auth } from "@clerk/nextjs/server";
import User from "@/models/User";
import connectToDB from "@/lib/connectToDB";

export async function GET() {
  const { userId } = await auth();
  if (!userId) return new Response("Unauthorized", { status: 401 });

  await connectToDB();
  const user = await User.findOne({ clerkId: userId });

  if (!user) return new Response("User not found", { status: 404 });
  return Response.json(user);
}

export async function POST(req) {
  const { userId } = await auth();
  if (!userId) return new Response("Unauthorized", { status: 401 });

  const { email, name } = await req.json();

  await connectToDB();

  let user = await User.findOne({ clerkId: userId });
  if (user) return new Response("User already exists", { status: 400 });

  user = await User.create({ clerkId: userId, email, name });
  return Response.json(user);
}

export async function PATCH(req) {
  const { userId } = auth();
  if (!userId) return new Response("Unauthorized", { status: 401 });

  const updates = await req.json(); // e.g., { plan: "pro" }

  await connectToDB();

  const user = await User.findOneAndUpdate(
    { clerkId: userId },
    { $set: updates },
    { new: true }
  );

  if (!user) return new Response("User not found", { status: 404 });
  return Response.json(user);
}