import { dark } from "@clerk/themes";
import { SignUp } from "@clerk/nextjs";

export default function page() {

  return (
    <div className="z-30 w-full flex justify-center items-center">
      <SignUp
        appearance={{
          baseTheme: dark
        }}
      />
    </div>
  );
}
