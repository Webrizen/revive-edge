import React from "react";
import GiveUpButton from "@/components/system/give-up-button";

export default async function page({ params }) {
  const { id } = await params;
  return (
    <>
      <section className="w-full py-12">
        <GiveUpButton goalId={id} />
      </section>
    </>
  );
}
