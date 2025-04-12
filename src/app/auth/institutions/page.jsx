import Image from "next/image";
import React from "react";
import PrepBhakt from "@/assets/logo.png";
import { Card, CardHeader, CardBody, Button, Divider } from "@nextui-org/react";
import Link from "next/link";

export default function page() {
  return (
    <>
      <div className="z-30 w-full flex gap-3 flex-col max-w-[500px] mx-auto dark:bg-[rgba(225,225,225,0.2)] bg-black text-white backdrop-blur-3xl rounded-2xl p-8">
        <div className="flex flex-col space-y-2 text-center">
          <Image
            src={PrepBhakt}
            alt="PrepBhakt Logo"
            width={100}
            height={100}
            placeholder="blur"
            className="aspect-square h-[100px] w-[100px] mx-auto"
          />
          <h1 className="text-2xl font-semibold tracking-tight">
            Welcome, Institution Leaders! 🎓
          </h1>
          <p className="text-sm text-muted-foreground">
            Ready to shape the future of education? Get started below.
          </p>
        </div>
        <div className="flex flex-col gap-4 justify-between items-center mt-2">
          {/* Institution Signup */}
          <Card className="w-full bg-transparent backdrop-blur-3xl shadow-none relative">
            <CardHeader className="flex gap-3">
              <Image
                alt="Institution Logo"
                height={40}
                src={PrepBhakt}
                placeholder="blur"
                width={40}
              />
              <div className="flex flex-col">
                <p className="text-md font-semibold">Institution Signup</p>
                <p className="text-small text-blue-200">auth/institutions/sign-up</p>
              </div>
            </CardHeader>
            <Divider className="bg-slate-50" />
            <CardBody>
              <p>Create an account to manage students and streamline learning.</p>
            </CardBody>
            <Button
              radius="sm"
              size="sm"
              className="w-min whitespace-nowrap z-50"
            >
              <Link
                href="/auth/institutions/sign-up"
                className="size-full flex justify-center items-center text-center"
              >
                Get Started
              </Link>
            </Button>
          </Card>
          {/* Institution Login */}
          <Card className="w-full bg-transparent backdrop-blur-3xl shadow-none relative">
            <CardHeader className="flex gap-3">
              <Image
                alt="Institution Logo"
                height={40}
                src={PrepBhakt}
                placeholder="blur"
                width={40}
              />
              <div className="flex flex-col">
                <p className="text-md font-semibold">Institution Login</p>
                <p className="text-small text-blue-200">auth/institutions/sign-in</p>
              </div>
            </CardHeader>
            <Divider className="bg-slate-50" />
            <CardBody>
              <p>Access your dashboard to manage students and quizzes effortlessly.</p>
            </CardBody>
            <Button
              radius="sm"
              size="sm"
              className="w-min whitespace-nowrap z-50"
            >
              <Link
                href="/auth/institutions/sign-in"
                className="size-full flex justify-center items-center text-center"
              >
                Login
              </Link>
            </Button>
          </Card>
        </div>
      </div>
    </>
  );
}