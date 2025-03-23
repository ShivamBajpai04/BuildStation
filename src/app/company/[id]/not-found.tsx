import React from 'react';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { GrainyTexture } from "@/components/effects/grainy-texture";

export default function NotFound() {
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

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 py-20 flex flex-col items-center justify-center text-center">
        <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-red-900/30 mb-6">
          <span className="text-3xl">🔍</span>
        </div>
        <h1 className="text-3xl font-bold text-white mb-4">Company Not Found</h1>
        <p className="text-gray-300 max-w-md mb-8">
          We couldn't find the company you're looking for. It may have been removed or the ID is incorrect.
        </p>
        <Link href="/mainpage" className="inline-flex items-center px-5 py-2.5 bg-[#3b82f6] hover:bg-[#3b82f6]/90 text-white rounded-md transition-colors">
          <ArrowLeft className="h-5 w-5 mr-2" />
          Back to Companies
        </Link>
      </div>
    </div>
  );
}
