"use client";

import React from "react";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";
import ImagePlaceholder from "@/components/common/ImagePlaceholder";
import { 
  ArrowRight, 
  Phone, 
  Sprout, 
  ShieldCheck, 
  CheckCircle2, 
  Award 
} from "lucide-react";

export default function WhySupportSection() {
  const { language, t } = useLanguage();

  return (
    <section
      id="why-support"
      className="relative z-10 py-16 sm:py-24 lg:py-28"
      style={{ backgroundColor: "#f4f2ee" }}
      aria-label="Why Support Us Section"
    >
      <div className="w-full px-5 sm:px-8 md:px-10 lg:px-12 xl:px-16 2xl:px-20">
        
        {/* Top Header Row */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 sm:mb-16">
          <div className="max-w-2xl">
            {/* Small label with dot */}
            <span className="text-xs sm:text-sm font-bold tracking-widest text-slate-800 uppercase flex items-center gap-1.5 mb-3">
              <span className="w-1.5 h-1.5 rounded-full bg-slate-900" />
              {language === "kn" ? "ನಮಗೆ ಏಕೆ ಬೆಂಬಲ ನೀಡಬೇಕು?" : "WHY SUPPORT US"}
            </span>

            {/* Big Headline */}
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-[54px] font-extrabold text-slate-900 tracking-tight leading-[1.15]">
              {language === "kn" ? (
                <>
                  ಜನರು ನಮ್ಮ ಚಳವಳಿಯನ್ನು{" "}
                  <span className="block mt-1">ಏಕೆ ನಂಬುತ್ತಾರೆ?</span>
                </>
              ) : (
                <>
                  Why people trust{" "}
                  <span className="block mt-1">our movement</span>
                </>
              )}
            </h2>
          </div>

          {/* Top-Right "Get In Touch ->" Pill Button */}
          <Link
            href="#contact"
            className="inline-flex items-center gap-3 px-6 py-2.5 rounded-full border border-slate-300 hover:border-slate-900 bg-white hover:bg-slate-900 text-slate-900 hover:text-white font-semibold text-xs sm:text-sm transition-all duration-200 self-start md:self-auto group shrink-0 shadow-sm"
          >
            <span>{t("ಸಂಪರ್ಕಿಸಿ", "Get In Touch")}</span>
            <span className="w-6 h-6 rounded-full bg-slate-900 text-white group-hover:bg-white group-hover:text-slate-900 flex items-center justify-center transition-colors shrink-0">
              <ArrowRight className="w-3.5 h-3.5" />
            </span>
          </Link>
        </div>

        {/* 6 Bento Boxes in Differently Sized Asymmetrical Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-6 lg:gap-7 items-stretch">
          
          {/* =========================================================
              BOX 1 (Medium - Red): People-first leadership
              ========================================================= */}
          <div className="lg:col-span-5 bg-[#c51628] rounded-3xl p-7 sm:p-9 text-white flex flex-col justify-between relative overflow-hidden shadow-md min-h-[340px]">
            {/* Top: 4 Overlapping Avatars */}
            <div className="flex items-center z-10">
              <div className="flex -space-x-3 overflow-hidden p-1">
                <div className="inline-block h-12 w-12 rounded-full ring-2 ring-white bg-gradient-to-tr from-amber-600 to-amber-300 flex items-center justify-center text-white font-bold text-xs shadow-md">
                  <span>ರೈತ</span>
                </div>
                <div className="inline-block h-12 w-12 rounded-full ring-2 ring-white bg-gradient-to-tr from-rose-700 to-rose-400 flex items-center justify-center text-white font-bold text-xs shadow-md">
                  <span>ಯುವ</span>
                </div>
                <div className="inline-block h-12 w-12 rounded-full ring-2 ring-white bg-gradient-to-tr from-emerald-700 to-emerald-400 flex items-center justify-center text-white font-bold text-xs shadow-md">
                  <span>ಮಹಿಳೆ</span>
                </div>
                <div className="inline-block h-12 w-12 rounded-full ring-2 ring-white bg-gradient-to-tr from-blue-700 to-blue-400 flex items-center justify-center text-white font-bold text-xs shadow-md">
                  <span>ನಾಗ</span>
                </div>
              </div>
            </div>

            {/* Background Outline Graphic: Ballot Box / Vote Watermark */}
            <div className="absolute right-3 top-6 opacity-15 select-none pointer-events-none">
              <div className="w-40 h-40 border-4 border-white rounded-2xl flex flex-col items-center justify-center rotate-6">
                <div className="w-20 h-2 bg-white rounded-full mb-3" />
                <span className="text-3xl font-black tracking-widest text-white">VOTE</span>
              </div>
            </div>

            {/* Bottom Content */}
            <div className="mt-12 z-10">
              <h3 className="text-2xl sm:text-3xl font-bold tracking-tight text-white mb-2.5">
                {language === "kn" ? "ಜನಪರ ನಾಯಕತ್ವ" : "People-first leadership"}
              </h3>
              <p className="text-white/90 text-sm sm:text-base leading-relaxed">
                {language === "kn"
                  ? "ಪ್ರತಿಯೊಂದು ಉಪಕ್ರಮವು ಜನರ ನೈಜ ಅಗತ್ಯಗಳಿಗೆ ಸ್ಪಂದಿಸುವಂತೆ ಹಾಗೂ ಕಲಬುರಗಿಯ ಪ್ರತಿ ಹಳ್ಳಿಗೆ ತಲುಪುವಂತೆ ರೂಪಿಸಲಾಗಿದೆ."
                  : "Every initiative is designed around the needs of people, ensuring real impact at the local level."}
              </p>
            </div>
          </div>

          {/* =========================================================
              BOX 2 (Wide - Deep Wine): Community-first approach + Photo
              ========================================================= */}
          <div className="lg:col-span-7 bg-[#340b14] rounded-3xl p-7 sm:p-9 text-white flex flex-col md:flex-row justify-between relative overflow-hidden shadow-md min-h-[340px]">
            {/* Left Content column */}
            <div className="flex flex-col justify-between z-10 max-w-md pr-2">
              <div>
                <h3 className="text-2xl sm:text-3xl font-bold tracking-tight text-white mb-2.5">
                  {language === "kn" ? "ಸಮುದಾಯ ಕೇಂದ್ರಿತ ಸೇವೆ" : "Community-first approach"}
                </h3>
                <p className="text-white/80 text-sm sm:text-base leading-relaxed mb-6">
                  {language === "kn"
                    ? "ಪ್ರತಿಯೊಂದು ಹೆಜ್ಜೆಯೂ ಜನರ ಧ್ವನಿಯಿಂದಲೇ ಆರಂಭವಾಗಿ, ಸಮಾಜಕ್ಕೆ ಶಾಶ್ವತ ಹಾಗೂ ಅಳೆಯಬಹುದಾದ ಒಳಿತನ್ನು ತರುತ್ತದೆ."
                    : "Every initiative starts with local voices, turning community needs into lasting, measurable impact."}
                </p>
              </div>

              {/* Contact Box at bottom */}
              <div className="mt-auto pt-4 border-t border-white/10">
                <span className="text-[11px] font-bold tracking-widest text-amber-300 uppercase block mb-1">
                  {language === "kn" ? "ನಮ್ಮೊಂದಿಗೆ ಕೈಜೋಡಿಸಿ" : "JOIN OUR CAMPAIGN"}
                </span>
                <a
                  href="tel:+918472250148"
                  className="text-xl sm:text-2xl font-black text-white hover:text-amber-300 transition-colors tracking-tight flex items-center gap-2"
                >
                  <Phone className="w-5 h-5 text-amber-400 shrink-0" />
                  <span>+91 8472 250148</span>
                </a>
              </div>
            </div>

            {/* Right Photo Column: Leader community interaction */}
            <div className="mt-6 md:mt-0 md:w-[42%] lg:w-[40%] flex items-end justify-center z-10 shrink-0">
              <div className="w-full h-56 md:h-full rounded-2xl overflow-hidden bg-white/5 border border-white/10">
                <ImagePlaceholder
                  label={language === "kn" ? "ಶ್ರೀ ಹರ್ಷಾನಂದ ಗುತ್ತೇದಾರ ಅವರ ಜನಸಂಪರ್ಕ" : "Community Leader Address"}
                  height="h-full"
                  className="rounded-2xl border-none bg-white/5 text-white/70"
                />
              </div>
            </div>
          </div>

          {/* =========================================================
              BOX 3 (Tall/Compact - Emerald Green): Farmer Export Focus
              ========================================================= */}
          <div className="lg:col-span-4 bg-[#14532d] rounded-3xl p-7 text-white flex flex-col justify-between relative overflow-hidden shadow-md min-h-[300px]">
            {/* Top Icon + Badge */}
            <div className="flex items-center justify-between mb-6 z-10">
              <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center text-amber-300">
                <Sprout className="w-6 h-6" />
              </div>
              <span className="text-[11px] font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-white/15 text-emerald-100 border border-white/20">
                {language === "kn" ? "ರೈತ ರಫ್ತು" : "GI Tur Export"}
              </span>
            </div>

            {/* Bottom Content */}
            <div className="z-10">
              <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-white mb-2">
                {language === "kn" ? "ತೊಗರಿ ಬೆಳೆಗಾರರಿಗೆ ನೇರ ರಫ್ತು" : "Direct Export for Pulse Farmers"}
              </h3>
              <p className="text-emerald-100/80 text-xs sm:text-sm leading-relaxed">
                {language === "kn"
                  ? "ಕಲಬುರಗಿಯ ತೊಗರಿಗೆ APEDA ರಫ್ತು ಪ್ರಮಾಣೀಕರಣ, ಮಧ್ಯವರ್ತಿಗಳಿಲ್ಲದೆ ಅಂತಾರಾಷ್ಟ್ರೀಯ ಮಾರುಕಟ್ಟೆ ಹಾಗೂ ಗೋದಾಮು ನೆರವು."
                  : "Empowering 10,000+ local pulse growers with APEDA export certification, direct buyer access, and cold storage."}
              </p>
            </div>
          </div>

          {/* =========================================================
              BOX 4 (Compact - Charcoal Black): Vision for the future
              ========================================================= */}
          <div className="lg:col-span-4 bg-[#171317] rounded-3xl p-7 text-white flex flex-col justify-between relative overflow-hidden shadow-md min-h-[300px]">
            {/* Top Text */}
            <div className="z-10">
              <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-white mb-2">
                {language === "kn" ? "ದೂರದೃಷ್ಟಿಯ ಭವಿಷ್ಯ" : "Vision for the future"}
              </h3>
              <p className="text-white/70 text-xs sm:text-sm leading-relaxed">
                {language === "kn"
                  ? "ಬಲಿಷ್ಠ, ಸ್ವಾವಲಂಬಿ ಮತ್ತು ಸಮೃದ್ಧ ಕಲಬುರಗಿ ನಿರ್ಮಾಣಕ್ಕೆ ನಾವು ಸದಾ ಬದ್ಧ."
                  : "We are committed to building an empowered, progressive Kalaburagi."}
              </p>
            </div>

            {/* Background Subtle Map Grid */}
            <div className="absolute inset-0 opacity-10 flex items-center justify-center pointer-events-none select-none">
              <svg className="w-full h-full text-white" viewBox="0 0 200 120" fill="currentColor">
                <circle cx="30" cy="40" r="1.5" />
                <circle cx="60" cy="35" r="1.5" />
                <circle cx="100" cy="40" r="1.5" />
                <circle cx="140" cy="35" r="1.5" />
                <circle cx="170" cy="65" r="1.5" />
                <path d="M20 70 Q 60 50, 100 70 T 180 60" fill="none" stroke="currentColor" strokeWidth="0.8" strokeDasharray="3 3"/>
              </svg>
            </div>

            {/* Bottom Laurel Award Emblem */}
            <div className="mt-6 z-10 flex items-center gap-2 select-none">
              <div className="flex items-center gap-1.5 p-2 rounded-xl bg-white/5 border border-white/10 w-fit">
                <svg className="w-4 h-7 text-amber-400" viewBox="0 0 24 36" fill="currentColor">
                  <path d="M12 2C8 6 6 12 7 18C7.5 21 9 24 11 26C10 23 9.5 20 10 17C10.5 13 12 9 14 6L12 2Z" />
                  <path d="M7 8C4 11 3 15 4 19C4.5 21 6 23 8 24C6.5 22 5.5 19 6 16C6.5 13 8 10 9 8L7 8Z" opacity="0.8"/>
                </svg>
                <div className="flex flex-col text-[8px] font-black uppercase tracking-wider text-white">
                  <span className="text-[8.5px] text-amber-300">ULTIMATE</span>
                  <span>WINNER</span>
                  <span className="text-[6.5px] text-white/60">LEADERSHIP AWARD</span>
                </div>
                <svg className="w-4 h-7 text-amber-400 -scale-x-100" viewBox="0 0 24 36" fill="currentColor">
                  <path d="M12 2C8 6 6 12 7 18C7.5 21 9 24 11 26C10 23 9.5 20 10 17C10.5 13 12 9 14 6L12 2Z" />
                  <path d="M7 8C4 11 3 15 4 19C4.5 21 6 23 8 24C6.5 22 5.5 19 6 16C6.5 13 8 10 9 8L7 8Z" opacity="0.8"/>
                </svg>
              </div>
            </div>
          </div>

          {/* =========================================================
              BOX 5 (Compact - Navy Slate): Accountable Citizen Grievance
              ========================================================= */}
          <div className="lg:col-span-4 bg-[#0f172a] rounded-3xl p-7 text-white flex flex-col justify-between relative overflow-hidden shadow-md min-h-[300px]">
            {/* Top Icon + Tag */}
            <div className="flex items-center justify-between mb-6 z-10">
              <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center text-blue-300">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <span className="text-[11px] font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-blue-500/20 text-blue-200 border border-blue-400/30">
                {language === "kn" ? "ಪಾರದರ್ಶಕತೆ" : "100% Accountable"}
              </span>
            </div>

            {/* Bottom Content */}
            <div className="z-10">
              <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-white mb-2">
                {language === "kn" ? "ನೇರ ನಾಗರಿಕ ಸ್ಪಂದನೆ" : "Direct Citizen Redressal"}
              </h3>
              <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
                {language === "kn"
                  ? "ನಾಗರಿಕರಿಂದ ಸ್ವೀಕರಿಸಲಾಗುವ ಪ್ರತಿ ಕುಂದುಕೊರತೆಯನ್ನು ಡಿಜಿಟಲ್ ರೂಪದಲ್ಲಿ ದಾಖಲಿಸಿ, ಪರಿಹಾರಕ್ಕೆ ನೇರ ಆದ್ಯತೆ ನೀಡಲಾಗುತ್ತದೆ."
                  : "Every citizen issue raised in Kalaburagi is digitally tracked with prompt, transparent resolution."}
              </p>
            </div>
          </div>

          {/* =========================================================
              BOX 6 (Wide Banner - Meeting Photo): Focused on real results
              ========================================================= */}
          <div className="md:col-span-2 lg:col-span-12 rounded-3xl overflow-hidden relative shadow-md min-h-[320px] sm:min-h-[360px] flex items-end border border-slate-200/80 bg-slate-900">
            {/* Background Meeting Photo Placeholder */}
            <div className="absolute inset-0 w-full h-full">
              <ImagePlaceholder
                label={language === "kn" ? "ಉನ್ನತ ಮಟ್ಟದ ಸಮಾಲೋಚನೆ & ಯೋಜನೆ ಸಭೆ" : "Strategic Planning & Consultation Meeting"}
                height="h-full"
                className="rounded-none border-none bg-slate-800 text-white/60"
              />
            </div>

            {/* Dark gradient overlay for text readability */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/45 to-transparent pointer-events-none" />

            {/* Bottom Text Content */}
            <div className="relative z-10 p-7 sm:p-9 text-white max-w-3xl">
              <h3 className="text-2xl sm:text-3xl font-bold tracking-tight text-white mb-2">
                {language === "kn" ? "ಫಲಿತಾಂಶ ಆಧಾರಿತ ಕಾರ್ಯವೈಖರಿ" : "Focused on real results"}
              </h3>
              <p className="text-white/80 text-sm sm:text-base leading-relaxed">
                {language === "kn"
                  ? "ರೈತರ ರಫ್ತು ಅಭಿವೃದ್ಧಿಯಿಂದ ಹಿಡಿದು ಉತ್ತಮ ಶಿಕ್ಷಣ, ಉದ್ಯೋಗಾವಕಾಶ ಮತ್ತು ಪ್ರಾಥಮಿಕ ಆರೋಗ್ಯ ಸೇವೆಗಳವರೆಗೆ ನಿಖರ ಗುರಿ."
                  : "From farmer export growth to better healthcare, youth employment, and quality education across every village."}
              </p>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
