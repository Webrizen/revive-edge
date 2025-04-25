import React from "react";
import GiveUpButton from "@/components/system/give-up-button";
import Spline from "@splinetool/react-spline/next";

export default async function page({ params }) {
  const { id } = await params;
  return (
    <>
      <section className="w-full py-12">
        <div
          className="flex justify-center items-center mx-auto mb-4"
          style={{ width: "300px", height: "auto" }}
        >
          <Spline
            scene="https://prod.spline.design/31LBANUfR51L6DbI/scene.splinecode"
          />
        </div>
        <GiveUpButton goalId={id} />
      </section>
    </>
  );
}
