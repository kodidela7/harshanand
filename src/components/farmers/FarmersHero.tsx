"use client";

import React from "react";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";
import { ChevronRight, Home, Sprout, CheckCircle2 } from "lucide-react";

export default function FarmersHero() {
  const { language } = useLanguage();

  return (
    <section 
      className="relative pt-24 sm:pt-30 lg:pt-32 pb-8 sm:pb-10 text-white overflow-hidden"
      style={{
        background: `
          linear-gradient(135deg, 
            rgba(10, 30, 15, 0.98) 0%, 
            rgba(20, 50, 25, 0.95) 25%, 
            rgba(35, 75, 40, 0.92) 50%, 
            rgba(25, 55, 30, 0.96) 75%, 
            rgba(10, 25, 15, 0.99) 100%
          )
        `,
      }}
      aria-label="Farmers Hub Hero Section"
    >
      {/* Background ambient emerald & golden flare */}
      <div 
        className="absolute top-0 left-1/4 w-[600px] h-[350px] pointer-events-none select-none"
        style={{
          background: "radial-gradient(ellipse at 50% 20%, rgba(132, 204, 22, 0.25) 0%, transparent 70%)",
        }}
      />
      
      {/* Background subtle field texture */}
      <div 
        className="absolute inset-0 opacity-15 pointer-events-none select-none bg-cover bg-center mix-blend-overlay"
        style={{ backgroundImage: "url('/images/hero.jpg')" }}
      />

      <div className="w-full px-5 sm:px-8 md:px-10 lg:px-12 xl:px-16 2xl:px-20 max-w-7xl mx-auto relative z-10">
        
        {/* Breadcrumb Navigation */}
        <nav aria-label="Breadcrumb" className="mb-6">
          <ol className="flex items-center gap-2 text-xs sm:text-sm font-medium text-white/70">
            <li>
              <Link 
                href="/" 
                className="hover:text-lime-300 flex items-center gap-1.5 transition-colors"
              >
                <Home className="w-3.5 h-3.5 text-lime-400" />
                <span>{language === "kn" ? "ಮುಖಪುಟ" : "Home"}</span>
              </Link>
            </li>
            <li>
              <ChevronRight className="w-3.5 h-3.5 text-white/40" />
            </li>
            <li className="text-lime-400 font-semibold" aria-current="page">
              {language === "kn" ? "ರೈತರ ವೇದಿಕೆ & ರಫ್ತು ಕೇಂದ್ರ" : "Farmers Export Hub"}
            </li>
          </ol>
        </nav>

        {/* Hero Title & Subtitle */}
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-lime-400/15 backdrop-blur-md border border-lime-400/30 text-xs font-bold text-lime-300 mb-4 shadow-sm">
            <Sprout className="w-4 h-4 text-lime-400" />
            <span>{language === "kn" ? "ಕಲಬುರಗಿ ತೊಗರಿ ರಫ್ತು ಕ್ರಾಂತಿ" : "Kalaburagi GI Tur Dal Export Mission"}</span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-[1.15] mb-4">
            {language === "kn" ? (
              <>
                ಕಲಬುರಗಿ ಅನ್ನದಾತರ ಸಬಲೀಕರಣ &{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-lime-300 via-amber-200 to-emerald-400">
                  ತೊಗರಿ ರಫ್ತು ಕೇಂದ್ರ
                </span>
              </>
            ) : (
              <>
                Empowering Kalaburagi Farmers &{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-lime-300 via-amber-200 to-emerald-400">
                  Global Agricultural Export
                </span>
              </>
            )}
          </h1>

          <p className="text-white/85 text-sm sm:text-base lg:text-lg leading-relaxed max-w-2xl font-light mb-8">
            {language === "kn"
              ? "ಶ್ರೀ ಹರ್ಷಾನಂದ ಗುತ್ತೇದಾರ ಅವರ ನೇತೃತ್ವದಲ್ಲಿ ಕಲಬುರಗಿಯ ಭೌಗೋಳಿಕ ಮಾನ್ಯತೆಯುಳ್ಳ (GI Tag) ತೊಗರಿ ಬೆಳೆಗೆ ಜಾಗತಿಕ ಮಾರುಕಟ್ಟೆ, ದಲ್ಲಾಳಿಗಳ ಹಾವಳಿ ಮುಕ್ತ ನೇರ ಬೆಂಬಲ ಬೆಲೆ ಮತ್ತು ಹೊಲಕ್ಕೇ ತಲುಪುವ ಆಧುನಿಕ ಕೃಷಿ ತಂತ್ರಜ್ಞಾನ ಸೇವೆ."
              : "Led by Harshanand Guttedar, connecting Kalaburagi's GI-tagged red gram growers to international markets, eliminating middleman exploitation, and providing modern farm-gate agronomy services."}
          </p>

          {/* Key Feature Chips */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
            {[
              { kn: "ಜಿಐ ಟ್ಯಾಗ್ ಮಾನ್ಯತೆ", en: "GI Tag Certified" },
              { kn: "ಉಚಿತ ಮಣ್ಣು ಪರೀಕ್ಷೆ", en: "Free Soil Testing" },
              { kn: "ನೇರ ಮಾರುಕಟ್ಟೆ ರಫ್ತು", en: "Direct APEDA Export" },
              { kn: "ದಲ್ಲಾಳಿ ಮುಕ್ತ ಬೆಲೆ", en: "Zero Middleman Cut" }
            ].map((chip, idx) => (
              <div 
                key={idx}
                className="flex items-center gap-2 px-3 py-2 rounded-xl bg-white/10 backdrop-blur-md border border-white/15 text-xs font-semibold text-white/95"
              >
                <CheckCircle2 className="w-3.5 h-3.5 text-lime-400 shrink-0" />
                <span>{language === "kn" ? chip.kn : chip.en}</span>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}

