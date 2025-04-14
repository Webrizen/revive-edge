import OnboardingForm from "@/components/system/onboarding-form";
import { auth } from "@clerk/nextjs/server";

export default async function page() {
  const { userId } = await auth();
  return (
    <div className="min-h-screen flex items-center justify-center p-6">
      <OnboardingForm userId={userId} />
    </div>
  );
}