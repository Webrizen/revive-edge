import connectToDB from "@/lib/db";
import WorkLog from "@/lib/models/WorkLog";
import User from "@/lib/models/User";

export async function POST(req) {
  try {
    await connectToDB();
    const { userId, goalId, startTime, endTime } = await req.json();

    if (!userId || !goalId || !startTime || !endTime) {
      return new Response("Missing required fields", { status: 400 });
    }

    const start = new Date(startTime);
    const end = new Date(endTime);

    if (start >= end) {
      return new Response("Start time must be before end time", {
        status: 400,
      });
    }

    const durationInHours = (end - start) / (1000 * 60 * 60);

    const workLog = await WorkLog.create({
      userId,
      goalId,
      startTime: start,
      endTime: end,
      durationInHours,
    });

    await updateUserLevel(userId);

    return Response.json(workLog);
  } catch (error) {
    console.error("[POST WORKLOG ERROR]", error);
    return new Response("Failed to create worklog", { status: 500 });
  }
}

async function updateUserLevel(userId) {
  const workLogs = await WorkLog.find({ userId });
  const totalHours = workLogs.reduce(
    (sum, log) => sum + log.durationInHours,
    0
  );
  const levelsGained = Math.min(Math.floor(totalHours / 24), 100);

  await User.findOneAndUpdate({ clerkId: userId }, { level: levelsGained });
}

export async function GET(req) {
  try {
    await connectToDB();
    const { searchParams } = new URL(req.url);
    const goalId = searchParams.get("goalId");

    if (!goalId) {
      return new Response("Missing goalId", { status: 400 });
    }

    const workLogs = await WorkLog.find({ goalId }).sort({ startTime: -1 });

    return Response.json(workLogs);
  } catch (error) {
    console.error("[GET WORKLOG ERROR]", error);
    return new Response("Failed to fetch worklogs", { status: 500 });
  }
}

export async function PATCH(req, { params }) {
  try {
    await connectToDB();
    const { id } = params;
    const { startTime, endTime } = await req.json();

    const start = new Date(startTime);
    const end = new Date(endTime);

    if (start >= end) {
      return new Response("Start time must be before end time", {
        status: 400,
      });
    }

    const durationInHours = (end - start) / (1000 * 60 * 60);

    const updatedLog = await WorkLog.findByIdAndUpdate(
      id,
      { startTime: start, endTime: end, durationInHours },
      { new: true }
    );

    if (!updatedLog) {
      return new Response("WorkLog not found", { status: 404 });
    }

    await updateUserLevel(updatedLog.userId);

    return Response.json(updatedLog);
  } catch (error) {
    console.error("[PATCH WORKLOG ERROR]", error);
    return new Response("Failed to update worklog", { status: 500 });
  }
}

async function updateUserLevel(userId) {
  const workLogs = await WorkLog.find({ userId });
  const totalHours = workLogs.reduce(
    (sum, log) => sum + log.durationInHours,
    0
  );
  const levelsGained = Math.min(Math.floor(totalHours / 24), 100);

  await User.findOneAndUpdate({ clerkId: userId }, { level: levelsGained });
}

export async function DELETE(req, { params }) {
  try {
    await connectToDB();
    const { id } = params;

    const deletedLog = await WorkLog.findByIdAndDelete(id);

    if (!deletedLog) {
      return new Response("WorkLog not found", { status: 404 });
    }

    await updateUserLevel(deletedLog.userId);

    return Response.json({ message: "WorkLog deleted" });
  } catch (error) {
    console.error("[DELETE WORKLOG ERROR]", error);
    return new Response("Failed to delete worklog", { status: 500 });
  }
}

async function updateUserLevel(userId) {
  const workLogs = await WorkLog.find({ userId });
  const totalHours = workLogs.reduce(
    (sum, log) => sum + log.durationInHours,
    0
  );
  const levelsGained = Math.min(Math.floor(totalHours / 24), 100);

  await User.findOneAndUpdate({ clerkId: userId }, { level: levelsGained });
}
