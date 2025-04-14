import connectToDB from "@/lib/db";
import Goal from "@/lib/models/Goal";

export async function GET(req, { params }) {
  const { userId } = await params;
  try {
    await connectToDB();
    const goals = await Goal.find({ userId: userId }).sort({ createdAt: -1 });

    return Response.json(goals);
  } catch (err) {
    console.error("GET /goals/user/[userId] error:", err);
    return new Response("Internal Server Error", { status: 500 });
  }
}
