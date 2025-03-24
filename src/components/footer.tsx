"use client";

import Link from "next/link";
import { Twitter, Linkedin, Github, Youtube } from "lucide-react";

export default function Footer() {
  return (
    <div className="relative py-8 border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center">
            <div className="h-8 w-8 rounded bg-[#3b82f6]/20 border border-[#3b82f6]/30 flex items-center justify-center mr-2">
              <span className="text-[#3b82f6] font-bold">B</span>
            </div>
            <div>
              <h3 className="text-xl font-bold text-white">BlockBlockJob</h3>
              <p className="text-sm text-white/60 mt-1">
                          
            
              Reimagining the future of work with AI-powered job matching and blockchain verification.
            </p>

            </div>
          </div>

          <div className="flex space-x-4">
            {['Twitter', 'LinkedIn', 'GitHub', 'YouTube'].map((platform, index) => (
              <Link 
                key={index}
                href="#"
                className="w-9 h-9 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 flex items-center justify-center text-white/70 hover:text-white transition-colors"
              >
                <span className="sr-only">{platform}</span>
                {platform === 'Twitter' && <Twitter className="w-4 h-4" />}
                {platform === 'LinkedIn' && <Linkedin className="w-4 h-4" />}
                {platform === 'GitHub' && <Github className="w-4 h-4" />}
                {platform === 'YouTube' && <Youtube className="w-4 h-4" />}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}


