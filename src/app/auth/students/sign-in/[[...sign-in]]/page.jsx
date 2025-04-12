import { SignIn } from "@clerk/nextjs";
import { dark } from "@clerk/themes";

export default function page() {

  return (
    <div className="z-30 w-full flex justify-center items-center">
      <SignIn
        appearance={{
          baseTheme: dark
        }}
      />
    </div>
  );
}
