"use client";
import { MotionGenerator } from "@/components/MotionGenerator";
import { useLang } from "@/lib/useLang";

export default function DebateMotionGenerator() {
  return (
    <div className="flex flex-col min-h-screen">
      <h1 className="text-3xl mt-8 text-center font-serif">
        {useLang("debateMotionGenerator")}
      </h1>
      <p className="mb-2 text-center text-neutral-500">
        {useLang("debateMotionGeneratorFlavortext")}
      </p>
      <div className="flex flex-col md:flex-row justify-center flex-wrap items-center gap-2 mt-4">
        <MotionGenerator />
      </div>
    </div>
  );
}
