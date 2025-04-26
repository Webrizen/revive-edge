import {
  LogOut,
  Flame,
  Shield,
  ArrowUpRight,
  Zap,
  Gem,
  Crown,
  Verified,
  Trash2,
  CreditCard,
  Download,
  FileText,
  Package,
  RefreshCw,
  Settings,
} from "lucide-react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Card, CardContent } from "@/components/ui/card";
import { currentUser } from "@clerk/nextjs/server";
import Link from "next/link";

export default async function ProfilePage() {
  const user = await currentUser();

  if (!user) {
    return <div className="p-4 text-center">Not signed in</div>;
  }

  const isVerified = user.emailAddresses.some(
    (email) => email.verification?.status === "verified"
  );

  const userStats = {
    credits: 1250,
    streak: 7,
    level: 45,
    xp: { current: 65, nextLevel: 67, total: 129 },
    achievements: { completed: 12, total: 30, rank: "Master III" },
    badges: ["7-Day Streak", "Early Adopter", "Premium Member"],
  };

  const menuItems = [
    {
      icon: <ArrowUpRight className="w-4 h-4 text-amber-500" />,
      label: "Current Level",
      value: userStats.level,
      desc: `${userStats.xp.current} / ${userStats.xp.nextLevel} XP`,
      progress: (userStats.xp.current / userStats.xp.total) * 100,
    },
    {
      icon: <Flame className="w-4 h-4 text-red-500" />,
      label: "Daily Streak",
      value: `${userStats.streak} days`,
      desc: userStats.streak >= 7 ? "🔥 Hot streak!" : "Keep it going!",
    },
    {
      icon: <Shield className="w-4 h-4 text-emerald-500" />,
      label: "Achievements",
      value: `${userStats.achievements.completed}/${userStats.achievements.total}`,
      desc: userStats.achievements.rank,
    },
    {
      icon: <Gem className="w-4 h-4 text-blue-500" />,
      label: "Credits",
      value: userStats.credits,
      desc: "Available for platform access",
    },
  ];

  const invoices = [
    {
      id: "INV-001",
      date: "Mar 1, 2024",
      amount: "$29.00",
      status: "Paid",
    },
    {
      id: "INV-002",
      date: "Feb 1, 2024",
      amount: "$29.00",
      status: "Paid",
    },
    {
      id: "INV-003",
      date: "Jan 1, 2024",
      amount: "$29.00",
      status: "Paid",
    },
  ];

  const getStreakBadge = (streak) => {
    if (streak >= 30)
      return {
        name: "Dragonfire",
        icon: <Crown className="w-4 h-4" />,
        color: "bg-purple-500/20 text-purple-600 dark:text-purple-400",
      };
    if (streak >= 14)
      return {
        name: "Inferno",
        icon: <Flame className="w-4 h-4" />,
        color: "bg-red-500/20 text-red-600 dark:text-red-400",
      };
    if (streak >= 7)
      return {
        name: "Blazing",
        icon: <Flame className="w-4 h-4" />,
        color: "bg-indigo-500/20 text-indigo-600 dark:text-indigo-400",
      };
    return {
      name: "Rising",
      icon: <Zap className="w-4 h-4" />,
      color: "bg-amber-500/20 text-amber-600 dark:text-amber-400",
    };
  };

  const streakBadge = getStreakBadge(userStats.streak);

  return (
    <div className="w-full mt-6">
      <div className="relative p-6 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-gradient-to-b from-white to-zinc-50/50 dark:from-zinc-900 dark:to-zinc-900/50">
        {/* Profile Header */}
        <div className="flex items-start justify-between mb-6">
          <div className="flex gap-4">
            <div className="flex flex-col items-center">
              <Image
                src={user.imageUrl}
                alt={user.fullName || "User Avatar"}
                width={80}
                height={80}
                className="rounded-xl ring-2 ring-zinc-100 dark:ring-zinc-800"
              />
              <div className="mt-2">
                <Badge variant="outline" className={streakBadge.color}>
                  {streakBadge.icon}
                  <span className="ml-1">{streakBadge.name}</span>
                </Badge>
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <h2 className="text-xl font-semibold text-zinc-900 dark:text-zinc-100">
                  {user.fullName || "Anonymous User"}
                </h2>
                {isVerified && (
                  <Verified className="fill-blue-500 text-white dark:fill-blue-400 dark:text-blue-900" />
                )}
              </div>
              <p className="text-sm text-zinc-400">
                {user.primaryEmailAddress?.emailAddress || "No email found"}
              </p>
              <div className="flex flex-wrap gap-1">
                {userStats.badges.map((badge, index) => (
                  <Badge
                    key={index}
                    variant="outline"
                    className="text-xs px-2 py-0.5 bg-zinc-100/50 dark:bg-zinc-800/50"
                  >
                    {badge}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="destructive" size="sm" asChild className="gap-1">
              <Link href="/dashboard/settings/final-give-up">
                <Trash2 className="w-4 h-4" />
                <span className="md:block hidden">Delete Account</span>
              </Link>
            </Button>
          </div>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {menuItems.map((item) => (
            <div
              key={item.label}
              className="p-4 rounded-xl bg-zinc-50 dark:bg-zinc-800/50 border border-zinc-200/50 dark:border-zinc-800/50"
            >
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  {item.icon}
                  <span className="text-sm font-medium">{item.label}</span>
                </div>
                <span className="text-lg font-semibold">
                  {item.label === "Credits" ? (
                    <span className="flex items-center">
                      {item.value}
                      <Gem className="w-4 h-4 ml-1 text-blue-500" />
                    </span>
                  ) : (
                    item.value
                  )}
                </span>
              </div>
              {item.progress ? (
                <div className="space-y-2">
                  <Progress value={item.progress} className="h-2" />
                  <p className="text-xs text-zinc-400">{item.desc}</p>
                </div>
              ) : (
                <p className="text-xs text-zinc-400">{item.desc}</p>
              )}
            </div>
          ))}
        </div>
      </div>
      <div className="w-full px-4 py-6 md:px-6">
      <div className="w-full">
        {/* Header */}
        <div className="mb-8 flex items-start justify-between gap-4 flex-row">
          <div>
            <h1 className="text-2xl font-semibold">Billing & Subscription</h1>
            <p className="text-muted-foreground text-sm">
              Manage your subscription and billing details
            </p>
          </div>
          <Button variant="outline">
            <Settings className="md:mr-2 size-4" />
            <span className="md:block hidden">Billing Settings</span>
          </Button>
        </div>

        {/* Current Plan */}
        <Card className="mb-8 p-0">
          <CardContent className="p-6">
            <div className="flex flex-col items-start justify-between gap-6 sm:flex-row">
              <div>
                <div className="flex items-center gap-2">
                  <Package className="text-primary size-5" />
                  <h2 className="text-lg font-semibold">Pro Plan</h2>
                  <Badge>Current Plan</Badge>
                </div>
                <p className="text-muted-foreground mt-1 text-sm">
                  $29/month • Renews on April 1, 2024
                </p>
              </div>
              <div className="flex flex-wrap gap-2">
                <Button variant="outline">Change Plan</Button>
                <Button variant="destructive">Cancel Plan</Button>
              </div>
            </div>

            <div className="mt-6 space-y-4">
              <div>
                <div className="mb-2 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Zap className="text-primary size-4" />
                    <span className="text-sm font-medium">API Requests</span>
                  </div>
                  <span className="text-sm">8,543 / 10,000</span>
                </div>
                <Progress value={85.43} className="h-2" />
              </div>

              <div>
                <div className="mb-2 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <RefreshCw className="text-primary size-4" />
                    <span className="text-sm font-medium">Monthly Syncs</span>
                  </div>
                  <span className="text-sm">143 / 200</span>
                </div>
                <Progress value={71.5} className="h-2" />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Payment Method */}
        <Card className="mb-8 p-0">
          <CardContent className="p-6">
            <div className="flex flex-col items-start justify-between gap-4 sm:flex-row">
              <div className="space-y-1">
                <h2 className="text-lg font-semibold">Payment Method</h2>
                <div className="flex items-center gap-2">
                  <CreditCard className="text-muted-foreground size-4" />
                  <span className="text-muted-foreground text-sm">
                    Visa ending in 4242
                  </span>
                </div>
              </div>
              <Button variant="outline">Update Payment Method</Button>
            </div>
          </CardContent>
        </Card>

        {/* Billing History */}
        <Card className="p-0 w-full">
          <CardContent className="p-6">
            <div className="mb-6 flex flex-col items-start justify-between gap-3 sm:flex-row">
              <h2 className="text-lg font-semibold">Billing History</h2>
              <Button variant="outline" size="sm">
                <Download className="mr-2 size-4" />
                Download All
              </Button>
            </div>

            <div className="space-y-4 w-full">
              {invoices.map((invoice) => (
                <div
                  key={invoice.id}
                  className="flex items-start justify-between gap-3 border-b py-3 last:border-0 flex-row sm:items-center"
                >
                  <div className="flex items-center gap-3">
                    <div className="bg-muted rounded-md p-2">
                      <FileText className="text-muted-foreground size-4" />
                    </div>
                    <div>
                      <p className="font-medium">{invoice.id}</p>
                      <p className="text-muted-foreground text-sm">
                        {invoice.date}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <Badge variant="outline">{invoice.status}</Badge>
                    <span className="font-medium">{invoice.amount}</span>
                    <Button variant="ghost" size="sm">
                      <Download className="size-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
    </div>
  );
}
