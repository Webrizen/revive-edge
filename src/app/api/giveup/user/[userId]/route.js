import connectToDB from "@/lib/db";
import GiveUpEvent from "@/lib/models/GiveUpEvent";

export async function GET(req, { params }) {
  try {
    await connectToDB();
    const giveups = await GiveUpEvent.find({ userId: params.userId }).sort({ triggeredAt: -1 });

    return Response.json(giveups);
  } catch (err) {
    console.error("GET /giveups/user/[userId] error:", err);
    return new Response("Internal Server Error", { status: 500 });
  }
}
