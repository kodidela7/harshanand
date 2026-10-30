"use client";

import React from "react";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";
import { ChevronRight, Home, Sparkles } from "lucide-react";

export default function AboutHero() {
  const { language } = useLanguage();

  return (
    <section 
      className="relative pt-28 sm:pt-36 lg:pt-40 pb-16 sm:pb-20 text-white overflow-hidden"
      style={{
        background: `
          linear-gradient(135deg, 
            rgba(20, 5, 5, 0.98) 0%, 
            rgba(65, 15, 10, 0.96) 25%, 
            rgba(95, 25, 10, 0.94) 50%, 
            rgba(45, 10, 10, 0.97) 75%, 
            rgba(15, 4, 6, 0.99) 100%
          )
        `,
      }}
      aria-label="About Page Top Hero"
    >
      {/* Background warm amber & crimson ambient glow (hero palette) */}
      <div 
        className="absolute top-0 left-1/4 w-[600px] h-[350px] pointer-events-none select-none"
        style={{
          background: "radial-gradient(ellipse at 50% 20%, rgba(245, 158, 11, 0.22) 0%, transparent 70%)",
        }}
      />
      
      {/* Background subtle texture */}
      <div 
        className="absolute inset-0 opacity-10 pointer-events-none select-none bg-cover bg-center mix-blend-luminosity"
        style={{ backgroundImage: "url('/images/hero.jpg')" }}
      />

      <div className="w-full px-5 sm:px-8 md:px-10 lg:px-12 xl:px-16 2xl:px-20 max-w-7xl mx-auto relative z-10">
        
        {/* Breadcrumb Navigation */}
        <nav aria-label="Breadcrumb" className="mb-6">
          <ol className="flex items-center gap-2 text-xs sm:text-sm font-medium text-white/70">
            <li>
              <Link 
                href="/" 
                className="hover:text-amber-400 flex items-center gap-1.5 transition-colors"
              >
                <Home className="w-3.5 h-3.5 text-amber-400" />
                <span>{language === "kn" ? "ಮುಖಪುಟ" : "Home"}</span>
              </Link>
            </li>
            <li>
              <ChevronRight className="w-3.5 h-3.5 text-white/40" />
            </li>
            <li className="text-amber-400 font-semibold" aria-current="page">
              {language === "kn" ? "ನಮ್ಮ ಪರಿಚಯ" : "About Us"}
            </li>
          </ol>
        </nav>

        {/* Page Banner Title */}
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/15 text-xs font-semibold text-amber-300 mb-4 shadow-sm">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>{language === "kn" ? "ಕಲಬುರಗಿಯ ಜನನಾಯಕ" : "Public Leader of Kalaburagi"}</span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-[1.15] mb-4">
            {language === "kn" ? (
              <>
                ಹರ್ಷಾನಂದ ಗುತ್ತೇದಾರ &{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-amber-200 to-red-400">
                  ನಮ್ಮ ಆಂದೋಲನ
                </span>
              </>
            ) : (
              <>
                Harshanand Guttedar &{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-amber-200 to-red-400">
                  Our Movement
                </span>
              </>
            )}
          </h1>

          <p className="text-white/80 text-sm sm:text-base lg:text-lg leading-relaxed max-w-2xl font-light">
            {language === "kn"
              ? "ಕಲಬುರಗಿಯ ಸಮಗ್ರ ಅಭಿವೃದ್ಧಿ, ತೊಗರಿ ಬೆಳೆಗಾರರ ರಫ್ತು ಸಬಲೀಕರಣ ಹಾಗೂ ಪ್ರತಿಯೊಬ್ಬ ನಾಗರಿಕನ ನೈಜ ಹಿತರಕ್ಷಣೆಗೆ ಮುಡಿಪಾದ ಜನಪರ ಆಂದೋಲನ."
              : "Dedicated to the holistic growth of Kalaburagi, championing red gram agricultural exports, and delivering accountable, people-first governance."}
          </p>
        </div>

      </div>
    </section>
  );
}

