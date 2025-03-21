"use client";

import Link from "next/link";
import { GradientText } from "@/components/effects/gradient-text";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <div className="relative py-12">
      {/* Removed redundant GrainyTexture as it's now provided by EnhancedSection in the parent */}
      
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 lg:gap-16 px-4">
          {/* Company column */}
          <div className="space-y-6">
            <div className="flex items-center">
              <div className="h-8 w-8 rounded bg-[#52aaad]/20 border border-[#52aaad]/30 flex items-center justify-center mr-2">
                <span className="text-[#52aaad] font-bold">B</span>
              </div>
              <h3 className="text-xl font-bold text-white">BuildStation</h3>
            </div>
            
            <p className="text-white/70 text-sm">
              Reimagining the future of work with AI-powered job matching and blockchain verification.
            </p>

            <div className="flex space-x-4">
              {['Twitter', 'LinkedIn', 'GitHub', 'YouTube'].map((platform, index) => (
                <Link 
                  key={index}
                  href="#"
                  className="w-9 h-9 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 flex items-center justify-center text-white/70 hover:text-white transition-colors"
                >
                  <span className="sr-only">{platform}</span>
                  {/* Could be replaced with actual social icons */}
                  <div className="w-4 h-4" />
                </Link>
              ))}
            </div>
          </div>

          {/* Quick links columns */}
          {[
            {
              title: "Product",
              links: ["Features", "Pricing", "Integrations", "Changelog", "Roadmap"]
            },
            {
              title: "Resources",
              links: ["Documentation", "Guides", "API Reference", "Blog", "Support"]
            },
            {
              title: "Company",
              links: ["About", "Careers", "Contact", "Partners", "Legal"]
            }
          ].map((column, columnIndex) => (
            <div key={columnIndex} className="space-y-4">
              <h3 className="text-lg font-semibold text-white">{column.title}</h3>
              <ul className="space-y-2">
                {column.links.map((link, linkIndex) => (
                  <li key={linkIndex}>
                    <Link 
                      href="#"
                      className="text-white/70 hover:text-white text-sm transition-colors"
                    >
                      {link}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 pt-6 border-t border-white/10 px-4 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-white/50 text-sm">
            © {currentYear} BuildStation. All rights reserved.
          </p>
          
          <div className="flex space-x-6">
            {["Privacy Policy", "Terms of Service", "Cookies"].map((item, index) => (
              <Link 
                key={index}
                href="#"
                className="text-white/50 hover:text-white text-sm transition-colors"
              >
                {item}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

