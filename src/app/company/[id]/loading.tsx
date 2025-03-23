import React from "react";
import { GrainyTexture } from "@/components/effects/grainy-texture";

export default function Loading() {
  return (
    <div className="min-h-screen bg-[#121116]">
      {/* Background effects */}
      <div className="absolute inset-0 z-0 opacity-20"
        style={{
          backgroundImage: "linear-gradient(#3b82f618 1px, transparent 1px), linear-gradient(to right, #3b82f618 1px, transparent 1px)",
          backgroundSize: "40px 40px"
        }}
      />
      <div className="absolute inset-0 opacity-60 z-0 bg-gradient-to-tr from-[#121116]/0 via-purple-600/5 to-indigo-500/20" />
      <GrainyTexture opacity={0.2} blend="soft-light" />

      {/* Loading UI */}
      <div className="relative z-10 container mx-auto px-4 py-24 flex flex-col items-center justify-center">
        <div className="inline-block animate-spin h-10 w-10 border-4 border-[#3b82f6] border-t-transparent rounded-full mb-4"></div>
        <h2 className="text-xl font-medium text-white mb-2">Loading Company Details</h2>
        <p className="text-gray-400">Please wait while we retrieve company information...</p>
      </div>
    </div>
  );
}
