import connectToDB from "@/lib/db";
import GiveUpEvent from "@/lib/models/GiveUpEvent";

export async function GET(req, { params }) {
  try {
    await connectToDB();
    const giveup = await GiveUpEvent.findById(params.id);

    if (!giveup) return new Response("GiveUp event not found", { status: 404 });

    return Response.json(giveup);
  } catch (err) {
    console.error("GET /giveups/[id] error:", err);
    return new Response("Internal Server Error", { status: 500 });
  }
}