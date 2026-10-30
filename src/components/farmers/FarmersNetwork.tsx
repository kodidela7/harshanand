"use client";

import React from "react";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";
import AnimatedCounter from "@/components/common/AnimatedCounter";
import { ArrowUpRight } from "lucide-react";

export default function FarmersNetwork() {
  const { language } = useLanguage();

  const taluks = [
    "Aland",
    "Kalaburagi",
    "Afzalpur",
    "Sedam",
    "Chincholi",
    "Chittapur",
    "Jevargi",
    "APEDA Export Ports",
    "Aland",
    "Kalaburagi",
    "Afzalpur",
    "Sedam",
    "Chincholi",
    "Chittapur",
    "Jevargi",
    "APEDA Export Ports",
  ];

  return (
    <section 
      className="bg-white text-slate-900 py-8 sm:py-12 lg:py-14 border-b border-slate-100 overflow-hidden"
      aria-label="Farmers Service & Export Network Section"
    >
      <div className="w-full px-5 sm:px-8 md:px-10 lg:px-12 xl:px-16 2xl:px-20 max-w-7xl mx-auto">
        
        {/* =========================================================
            TOP HEADER ROW (Exact Reference Screenshot 2)
            ========================================================= */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end mb-8 sm:mb-10">
          
          {/* Left Title */}
          <div className="lg:col-span-7">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-800 mb-3">
              <span className="w-2.5 h-2.5 bg-lime-500 rotate-45 shrink-0" />
              <span>{language === "kn" ? "ಸೇವಾ ಕೇಂದ್ರಗಳು & ಮಾರುಕಟ್ಟೆ ಜಾಲ" : "WHERE TO ACCESS"}</span>
            </div>

            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight leading-[1.18]">
              {language === "kn" ? (
                <>
                  ರೈತರಿಂದ ರೈತರಿಗಾಗಿ –{" "}
                  <span className="block mt-1">ಸ್ಥಳೀಯ ಸೇವಾ ಕೇಂದ್ರಗಳು & ರಫ್ತು ಜಾಲ</span>
                </>
              ) : (
                <>
                  Supported and serviced by{" "}
                  <span className="block mt-1">experts who understand the soil</span>
                </>
              )}
            </h2>
          </div>

          {/* Right Subtitle & Buttons */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-6">
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
              {language === "kn"
                ? "ಕಲಬುರಗಿಯ ಪ್ರತಿ ತಾಲೂಕಿನಲ್ಲಿ ತಜ್ಞರ ಸೇವಾ ಕೇಂದ್ರಗಳನ್ನು ಸ್ಥಾಪಿಸಿ, ರೈತರಿಗೆ ಮಾರ್ಗದರ್ಶನ ನೀಡುವ ಮುಖಂಡರು ಸ್ಥಳೀಯ ಕೃಷಿ ವಾಸ್ತವಗಳನ್ನು ಅರಿತಿರುವಂತೆ ನೋಡಿಕೊಳ್ಳುತ್ತೇವೆ."
                : "We appoint dedicated farmer service centers across every taluk, training local agronomy coordinators so the guidance you receive is deeply rooted in local farming realities."}
            </p>

            {/* CTA Buttons (Exact Screenshot 2 styling) */}
            <div className="flex flex-wrap items-center gap-3">
              <Link
                href="#talk-to-us"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-[#d4f933] hover:bg-[#c2e822] text-slate-950 text-xs sm:text-sm font-bold transition-all shadow-sm"
              >
                <span>{language === "kn" ? "ಸೇವಾ ಕೇಂದ್ರ ಹುಡುಕಿ" : "Find a center"}</span>
                <ArrowUpRight className="w-4 h-4" />
              </Link>

              <Link
                href="#talk-to-us"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-white hover:bg-slate-50 text-slate-900 text-xs sm:text-sm font-semibold border border-slate-300 transition-all"
              >
                <span>{language === "kn" ? "ಎಫ್‌ಪಿಒ ನೋಂದಣಿ" : "Become an FPO partner"}</span>
                <ArrowUpRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

        </div>

      </div>

      {/* =========================================================
          HIGH-VISIBILITY NEON LIME RIBBON (Exact Reference Screenshot 2)
          ========================================================= */}
      <div className="w-full bg-[#d4f933] py-4 overflow-hidden border-y border-lime-400 select-none">
        <div className="flex whitespace-nowrap gap-8 text-base sm:text-lg font-extrabold text-slate-950 uppercase tracking-wide">
          <div className="flex shrink-0 items-center gap-8 animate-marquee">
            {taluks.map((item, idx) => (
              <span key={idx} className="flex items-center gap-8">
                <span>{item}</span>
                <span className="text-xs">◆</span>
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* =========================================================
          3 STATS + DIAMOND MOTIF (Exact Reference Screenshot 2)
          ========================================================= */}
      <div className="w-full px-5 sm:px-8 md:px-10 lg:px-12 xl:px-16 2xl:px-20 max-w-7xl mx-auto pt-8 sm:pt-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 items-center">
          
          {/* Stat 1: 45+ Procurement Centers */}
          <div className="flex flex-col">
            <div className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 tracking-tight leading-none mb-2 tabular-nums">
              <AnimatedCounter
                from={10}
                to={45}
                duration={1800}
                suffix={<span className="font-bold text-lime-600">+</span>}
              />
            </div>
            <div className="text-xs sm:text-sm text-slate-600 font-medium leading-relaxed">
              {language === "kn" ? "ತಾಲೂಕು ಖರೀದಿ & ಸೇವಾ ಕೇಂದ್ರಗಳು" : "Taluk procurement centers"}
            </div>
          </div>

          {/* Stat 2: 150+ FPO Groups */}
          <div className="flex flex-col">
            <div className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 tracking-tight leading-none mb-2 tabular-nums">
              <AnimatedCounter
                from={20}
                to={150}
                duration={2000}
                suffix={<span className="font-bold text-lime-600">+</span>}
              />
            </div>
            <div className="text-xs sm:text-sm text-slate-600 font-medium leading-relaxed">
              {language === "kn" ? "ಸಕ್ರಿಯ ರೈತ ಉತ್ಪಾದಕ ಸಂಘಗಳು (FPO)" : "FPO farmer producer groups"}
            </div>
          </div>

          {/* Stat 3: 24/7 Redressal & Advisory */}
          <div className="flex flex-col">
            <div className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 tracking-tight leading-none mb-2 tabular-nums">
              <span>24/7</span>
            </div>
            <div className="text-xs sm:text-sm text-slate-600 font-medium leading-relaxed">
              {language === "kn" ? "ರೈತ ಸಲಹಾ ಸಹಾಯವಾಣಿ ನೆರವು" : "Agronomy helpline support"}
            </div>
          </div>

          {/* Diamond Motif Badge (Screenshot 2 Match) */}
          <div className="flex justify-start md:justify-end">
            <div className="relative w-24 h-24 sm:w-28 sm:h-28 flex items-center justify-center">
              {/* Outer rotated square */}
              <div className="absolute inset-0 border-2 border-slate-200 rotate-45 rounded-2xl" />
              {/* Middle rotated square */}
              <div className="absolute inset-3 border border-slate-300 rotate-45 rounded-xl bg-slate-50/50" />
              {/* Center neon diamond */}
              <div className="w-5 h-5 bg-lime-400 rotate-45 shadow-lg shadow-lime-400/50 rounded-xs" />
            </div>
          </div>

        </div>
      </div>

    </section>
  );
}

