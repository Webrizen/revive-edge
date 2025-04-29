import connectToDB from "@/lib/db";
import GiveUpEvent from "@/lib/models/GiveUpEvent";
import Goal from "@/lib/models/Goal";

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

export async function PATCH(req, { params }) {
  try {
    await connectToDB();

    const body = await req.json();
    const { title, description, completed, incrementGiveUp } = body;

    const updateData = {};

    if (title !== undefined) updateData.title = title;
    if (description !== undefined) updateData.description = description;
    if (completed !== undefined) updateData.completed = completed;

    const updatedGoal = await Goal.findByIdAndUpdate(
      params.id,
      updateData,
      { new: true, runValidators: true }
    );

    if (!updatedGoal) {
      return new Response("Goal not found", { status: 404 });
    }

    return Response.json(updatedGoal);
  } catch (err) {
    console.error("PATCH /goals/[id] error:", err);
    return new Response("Internal Server Error", { status: 500 });
  }
}