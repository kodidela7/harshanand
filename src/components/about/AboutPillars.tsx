"use client";

import React from "react";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";
import { 
  Sprout, 
  ShieldCheck, 
  GraduationCap, 
  HeartHandshake, 
  ArrowRight, 
  PhoneCall,
  CheckCircle,
  Quote
} from "lucide-react";

export default function AboutPillars() {
  const { language } = useLanguage();

  const pillars = [
    {
      icon: Sprout,
      badgeKn: "ರೈತರ ಆರ್ಥಿಕ ಭದ್ರತೆ",
      badgeEn: "Farmer Security",
      badgeBg: "bg-amber-100 text-amber-800 border-amber-200",
      titleKn: "ರೈತರ ಏಳಿಗೆ & ತೊಗರಿ ರಫ್ತು ಕ್ರಾಂತಿ",
      titleEn: "Farmer Prosperity & GI Tur Dal Global Hub",
      descKn:
        "ಕಲಬುರಗಿಯ ಜಿಐ ಮಾನ್ಯತೆಯುಳ್ಳ ತೊಗರಿ ಬೆಳೆಗೆ ಜಾಗತಿಕ ಮಾರುಕಟ್ಟೆ ಸಂಪರ್ಕ, ದಲ್ಲಾಳಿಗಳ ಹಾವಳಿ ಮುಕ್ತ ನೇರ ಮಾರಾಟ, ಮತ್ತು ಪ್ರತಿ ತಾಲೂಕಿನಲ್ಲಿ ಆಧುನಿಕ ಸೋಲಾರ್ ಶೀತಲ ಗೋದಾಮುಗಳ ಸ್ಥಾಪನೆ.",
      descEn:
        "Securing global export channels for Kalaburagi's GI-tagged red gram, eliminating middlemen exploitation, guaranteeing fair MSP, and installing solar cold storage hubs across the region.",
      accentBorder: "hover:border-amber-400/80",
      glowColor: "from-amber-500/10 to-transparent",
    },
    {
      icon: ShieldCheck,
      badgeKn: "ಪಾರದರ್ಶಕತೆ",
      badgeEn: "Accountability",
      badgeBg: "bg-red-100 text-red-800 border-red-200",
      titleKn: "ಪಾರದರ್ಶಕ ಜನಸಂಪರ್ಕ & ಸಾರ್ವಜನಿಕ ಸೇವೆ",
      titleEn: "Accountable Governance & 24/7 Redressal",
      descKn:
        "ಶ್ರೀ ಹರ್ಷಾನಂದ ಗುತ್ತೇದಾರ ಅವರ ಕಚೇರಿಗೆ ನೇರ ಪ್ರವೇಶ, ನಾಗರಿಕರ ಕುಂದುಕೊರತೆಗಳ ಡಿಜಿಟಲ್ ಟ್ರ್ಯಾಕಿಂಗ್, ನಿರಂತರ ಗ್ರಾಮ ಸಭೆಗಳು ಹಾಗೂ ಭ್ರಷ್ಟಾಚಾರ ಮುಕ್ತ ಸಾರ್ವಜನಿಕ ಸೌಲಭ್ಯ ವಿತರಣೆ.",
      descEn:
        "Open door access to Harshanand Guttedar's public office, 24/7 digital grievance redressal, regular village Grama Sabhas, and accountable local development fund utilization.",
      accentBorder: "hover:border-red-400/80",
      glowColor: "from-red-500/10 to-transparent",
    },
    {
      icon: GraduationCap,
      badgeKn: "ಯುವ ಸಬಲೀಕರಣ",
      badgeEn: "Youth & Jobs",
      badgeBg: "bg-indigo-100 text-indigo-800 border-indigo-200",
      titleKn: "ಯುವಜನ ಕೌಶಲ್ಯಾಭಿವೃದ್ಧಿ & ಉದ್ಯೋಗಾವಕಾಶ",
      titleEn: "Youth Skill Centers & Local Employment",
      descKn:
        "ಸ್ಪರ್ಧಾತ್ಮಕ ಪರೀಕ್ಷೆಗಳ ಉಚಿತ ತರಬೇತಿ ಕೇಂದ್ರಗಳು, ಸುಸಜ್ಜಿತ ಡಿಜಿಟಲ್ ಲೈಬ್ರರಿಗಳು, ಮತ್ತು ಕಲಬುರಗಿಯಲ್ಲಿ ಸ್ಥಳೀಯ ಯುವಕರಿಗೆ ಉದ್ಯೋಗ ನೀಡುವ ಕೌಶಲ್ಯ ಪಾರ್ಕ್‌ಗಳ ನಿರ್ಮಾಣ.",
      descEn:
        "Free competitive exam coaching libraries, modern technical skill development centers, and partnering with industries to generate quality local employment for youth.",
      accentBorder: "hover:border-indigo-400/80",
      glowColor: "from-indigo-500/10 to-transparent",
    },
    {
      icon: HeartHandshake,
      badgeKn: "ಸಾಮಾಜಿಕ ಏಕತೆ",
      badgeEn: "Social Harmony",
      badgeBg: "bg-emerald-100 text-emerald-800 border-emerald-200",
      titleKn: "ಸಾಮಾಜಿಕ ಸೌಹಾರ್ದತೆ & ಗ್ರಾಮೀಣ ಆರೋಗ್ಯ",
      titleEn: "Social Harmony & Rural Healthcare",
      descKn:
        "ಎಲ್ಲ ಸಮುದಾಯಗಳ ಒಗ್ಗಟ್ಟು ಮತ್ತು ಗೌರವ, ಸ್ತ್ರೀಶಕ್ತಿ ಸ್ವಸಹಾಯ ಸಂಘಗಳ ಆರ್ಥಿಕ ಸಬಲೀಕರಣ, ಶುದ್ಧ ಕುಡಿಯುವ ನೀರು ಮತ್ತು ಹಳ್ಳಿಹಳ್ಳಿಗಳಿಗೆ ಮೊಬೈಲ್ ಆರೋಗ್ಯ ಕ್ಲಿನಿಕ್ ಸೇವೆ.",
      descEn:
        "Uniting all communities in harmony, strengthening women's Self Help Groups, ensuring clean drinking water, and deploying mobile healthcare clinics across rural Kalaburagi.",
      accentBorder: "hover:border-emerald-400/80",
      glowColor: "from-emerald-500/10 to-transparent",
    },
  ];

  return (
    <section 
      className="bg-[#f8f9fa] text-slate-900 py-16 sm:py-24 lg:py-28 relative overflow-hidden"
      aria-label="Core Pillars and Leadership Vision"
    >
      {/* Background subtle decoration */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-amber-400/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-red-600/5 rounded-full blur-3xl pointer-events-none" />

      <div className="w-full px-5 sm:px-8 md:px-10 lg:px-12 xl:px-16 2xl:px-20 max-w-7xl mx-auto relative z-10">
        
        {/* =========================================================
            HEADER
            ========================================================= */}
        <div className="text-center max-w-3xl mx-auto mb-14 sm:mb-18">
          <span className="text-xs sm:text-sm font-bold tracking-widest text-slate-800 uppercase flex items-center justify-center gap-1.5 mb-3">
            <span className="w-2 h-2 rounded-full bg-[#b91c1c]" />
            {language === "kn" ? "ನಮ್ಮ ಮೌಲ್ಯಗಳು & ದೂರದೃಷ್ಟಿ 2030" : "CORE PILLARS & VISION"}
          </span>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight mb-4">
            {language === "kn" 
              ? "ಜನಸೇವೆಯನ್ನು ಮುನ್ನಡೆಸುವ ಮೂಲಸ್ತಂಭಗಳು" 
              : "Guiding principles that power our service"}
          </h2>

          <p className="text-slate-600 text-sm sm:text-base lg:text-lg leading-relaxed">
            {language === "kn"
              ? "ಶ್ರೀ ಹರ್ಷಾನಂದ ಗುತ್ತೇದಾರ ಅವರ ಪ್ರತಿಯೊಂದು ನಿರ್ಧಾರವು ರೈತರ ಹಿತ, ಯುವಕರ ಉಜ್ವಲ ಭವಿಷ್ಯ ಮತ್ತು ಪಾರದರ್ಶಕ ಸಾರ್ವಜನಿಕ ಸೇವೆಗೆ ಸದಾ ಕಟಿಬದ್ಧವಾಗಿದೆ."
              : "Every initiative led by Harshanand Guttedar is firmly anchored in transparency, rural prosperity, and youth dignity."}
          </p>
        </div>

        {/* =========================================================
            4-CARD MODERN BENTO GRID
            ========================================================= */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 mb-16 sm:mb-20">
          {pillars.map((pillar, idx) => (
            <div
              key={idx}
              className={`group relative p-7 sm:p-9 rounded-2xl sm:rounded-3xl bg-white border border-slate-200/90 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between ${pillar.accentBorder}`}
            >
              {/* Subtle hover gradient glow */}
              <div className={`absolute inset-0 rounded-2xl sm:rounded-3xl bg-gradient-to-br ${pillar.glowColor} opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none`} />

              <div className="relative z-10">
                {/* Top Row: Icon + Badge */}
                <div className="flex items-center justify-between gap-4 mb-6">
                  <div className="w-13 h-13 sm:w-14 sm:h-14 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-center text-slate-900 group-hover:scale-105 group-hover:bg-slate-900 group-hover:text-amber-400 transition-all duration-300 shadow-sm">
                    <pillar.icon className="w-6 h-6 sm:w-7 sm:h-7" />
                  </div>

                  <span className={`text-[11px] sm:text-xs font-bold px-3 py-1 rounded-full border ${pillar.badgeBg}`}>
                    {language === "kn" ? pillar.badgeKn : pillar.badgeEn}
                  </span>
                </div>

                {/* Card Title */}
                <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight leading-snug mb-3">
                  {language === "kn" ? pillar.titleKn : pillar.titleEn}
                </h3>

                {/* Card Description */}
                <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                  {language === "kn" ? pillar.descKn : pillar.descEn}
                </p>
              </div>

              {/* Bottom Feature Pill Indicator */}
              <div className="relative z-10 pt-6 mt-6 border-t border-slate-100 flex items-center gap-2 text-xs font-semibold text-slate-700">
                <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>
                  {language === "kn" 
                    ? "ಕಲಬುರಗಿಯ ನಾಗರಿಕರಿಗೆ ಬದ್ಧತೆಯ ಸೇವೆ" 
                    : "Dedicated to Kalaburagi Citizens"}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* =========================================================
            LEADER'S PERSONAL PLEDGE CARD (Eye-Catching High-UI)
            ========================================================= */}
        <div className="relative rounded-3xl overflow-hidden p-8 sm:p-12 lg:p-14 bg-gradient-to-br from-[#18181b] via-[#240a0a] to-[#120404] text-white shadow-2xl border border-amber-500/25">
          {/* Subtle Ambient Flare */}
          <div className="absolute top-0 right-0 w-80 h-80 bg-amber-500/15 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            
            {/* Quote Icon & Content */}
            <div className="lg:col-span-8 space-y-6">
              <div className="w-12 h-12 rounded-2xl bg-amber-400/20 border border-amber-400/30 flex items-center justify-center text-amber-400">
                <Quote className="w-6 h-6" />
              </div>

              <blockquote className="text-xl sm:text-2xl lg:text-3xl font-bold leading-relaxed text-slate-100 font-serif sm:font-sans">
                {language === "kn" ? (
                  <>
                    &ldquo;ಜನಸೇವೆ ಎಂದರೆ ಕೇವಲ ಅಧಿಕಾರವಲ್ಲ; ಅದು ಜನರ ಕಣ್ಣೀರನ್ನು ಒರೆಸಿ, ಪ್ರತಿಯೊಬ್ಬ ರೈತ ಮತ್ತು ಯುವಕನ ಮುಖದಲ್ಲಿ ನಗು ತರುವ ಪವಿತ್ರ ಜವಾಬ್ದಾರಿ.&rdquo;
                  </>
                ) : (
                  <>
                    &ldquo;Public service is not about power; it is a sacred duty to wipe tears, stand with farmers, and ignite hope in every young heart.&rdquo;
                  </>
                )}
              </blockquote>

              <div className="flex items-center gap-4 pt-2">
                <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-amber-400 via-red-500 to-amber-500 p-[2px] shadow-lg shrink-0">
                  <div className="w-full h-full rounded-full bg-black flex items-center justify-center">
                    <span className="font-extrabold text-amber-400 text-xl">ಹ</span>
                  </div>
                </div>

                <div>
                  <div className="text-lg font-extrabold text-white tracking-tight">
                    {language === "kn" ? "ಹರ್ಷಾನಂದ ಗುತ್ತೇದಾರ" : "Harshanand Guttedar"}
                  </div>
                  <div className="text-xs sm:text-sm text-amber-300 font-medium">
                    {language === "kn" 
                      ? "ಜನನಾಯಕ • ಸಾರ್ವಜನಿಕ ಸೇವಾ ಮುಖಂಡ, ಕಲಬುರಗಿ" 
                      : "Public Leader • Kalaburagi"}
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Action Box */}
            <div className="lg:col-span-4 flex flex-col gap-4 p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md">
              <div className="text-sm font-bold text-amber-300 uppercase tracking-wider">
                {language === "kn" ? "ನೇರ ಸಂಪರ್ಕ" : "Direct Connect"}
              </div>

              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                {language === "kn"
                  ? "ಸಮಸ್ಯೆಗಳನ್ನು ಹಂಚಿಕೊಳ್ಳಲು ಅಥವಾ ಆಂದೋಲನದಲ್ಲಿ ಅಧಿಕೃತ ಸದಸ್ಯರಾಗಿ ಕೈಜೋಡಿಸಲು ನಮ್ಮೊಂದಿಗೆ ನೋಂದಾಯಿಸಿ."
                  : "Reach out directly to report grievances or register for official citizen membership."}
              </p>

              {/* Action Buttons */}
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-gradient-to-r from-red-600 to-red-700 hover:from-red-500 hover:to-red-600 text-white font-bold text-xs sm:text-sm shadow-lg shadow-red-950/40 transition-all"
              >
                <PhoneCall className="w-4 h-4" />
                <span>{language === "kn" ? "ಕಚೇರಿ ಸಂಪರ್ಕಿಸಿ" : "Contact Public Office"}</span>
              </Link>

              <Link
                href="/membership"
                className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-xs sm:text-sm shadow-md transition-all"
              >
                <span>{language === "kn" ? "ಸದಸ್ಯತ್ವ ನೋಂದಣಿ" : "Register Membership"}</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}

