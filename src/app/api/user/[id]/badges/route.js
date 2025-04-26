
import User from "@/lib/models/User";
import { NextResponse } from "next/server";

export async function GET(req, { params }) {
  const user = await User.findOne({ clerkId: params.id });
  if (!user) return NextResponse.json({ error: "User not found" }, { status: 404 });

  return NextResponse.json({ badges: user.badges });
}