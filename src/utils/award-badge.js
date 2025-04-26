import User from "@/lib/models/User";

export const BADGES = {
  FIRST_GIVEUP: "The Fallen",
  COMEBACK_KID: "Rising Ashes",
  RELENTLESS: "Relentless Soul",
  LOYAL: "The Unshaken",
  BROKEN_ALIVE: "Shattered But Breathing",
  DARK_MIRROR: "Awakened One",
};

export async function awardBadge({ clerkId, badgeKey }) {
  const badgeList = Object.keys(BADGES);
  if (!badgeList.includes(badgeKey)) throw new Error("Invalid badge key");

  const user = await User.findOne({ clerkId });
  if (!user) throw new Error("User not found");

  if (!user.badges.includes(badgeKey)) {
    user.badges.push(badgeKey);
    await user.save();
  }

  return { awarded: true, badge: BADGES[badgeKey] };
}