"use client";

import React from "react";
import { useLanguage } from "@/context/LanguageContext";
import ImagePlaceholder from "@/components/common/ImagePlaceholder";
import AnimatedCounter from "@/components/common/AnimatedCounter";
import { Users, Award, Shield, HeartHandshake } from "lucide-react";

export default function AboutOverview() {
  const { language, t } = useLanguage();

  return (
    <section 
      className="bg-white text-slate-900 pt-16 sm:pt-20 lg:pt-24 pb-16 sm:pb-20 border-b border-slate-100"
      aria-label="About Our Movement Overview"
    >
      <div className="w-full px-5 sm:px-8 md:px-10 lg:px-12 xl:px-16 2xl:px-20 max-w-7xl mx-auto">
        
        {/* =========================================================
            1. TOP HEADLINE & SUBTITLE (Exact Reference Screenshot 1)
            ========================================================= */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-14">
          {/* Subtle Tag */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-100 border border-slate-200 text-xs font-bold text-slate-800 tracking-wide uppercase mb-4">
            <span className="w-2 h-2 rounded-full bg-[#b91c1c]" />
            {language === "kn" ? "ಜನನಾಯಕ ಹರ್ಷಾನಂದ ಗುತ್ತೇದಾರ" : "Harshanand Guttedar & Leadership"}
          </div>

          {/* Big Centered Headline */}
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 tracking-tight leading-[1.15] mb-4 sm:mb-6">
            {language === "kn" ? "ನಮ್ಮ ಆಂದೋಲನದ ಪರಿಚಯ" : "About our movement"}
          </h1>

          {/* Subtitle */}
          <p className="text-slate-600 text-sm sm:text-base lg:text-lg leading-relaxed font-normal">
            {language === "kn"
              ? "ಪ್ರಾಮಾಣಿಕತೆ, ಪಾರದರ್ಶಕ ಸಾರ್ವಜನಿಕ ಸೇವೆ ಮತ್ತು ಗ್ರಾಮೀಣ ಸಬಲೀಕರಣದ ಅಚಲ ತತ್ತ್ವಗಳ ಆಧಾರದ ಮೇಲೆ, ಕಲಬುರಗಿಯ ನಾಗರಿಕರಿಗೆ ಹೊಸ ಅವಕಾಶಗಳನ್ನು ಸೃಷ್ಟಿಸಲು ಹಾಗೂ ರೈತರ ಮತ್ತು ಯುವಕರ ಸಮೃದ್ಧ ಭವಿಷ್ಯ ನಿರ್ಮಿಸಲು ನಾವು ಸದಾ ಬದ್ಧರಾಗಿದ್ದೇವೆ."
              : "Founded on the principles of integrity, accountability, and public service, our movement is dedicated to creating opportunities, empowering farmers, and securing Kalaburagi's future."}
          </p>
        </div>

        {/* =========================================================
            2. LARGE FEATURED TEAM / RALLY IMAGE CONTAINER
            ========================================================= */}
        <div className="w-full mb-12 sm:mb-16">
          <div className="relative w-full rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl border border-slate-200 bg-slate-100 group">
            {/* Visual Header Image Container */}
            <div className="relative w-full h-[280px] sm:h-[420px] md:h-[500px] lg:h-[560px] overflow-hidden">
              <ImagePlaceholder
                label={
                  language === "kn"
                    ? "ಶ್ರೀ ಹರ್ಷಾನಂದ ಗುತ್ತೇದಾರ ಮತ್ತು ಸಮುದಾಯ ಮುಖಂಡರು, ರೈತ ಪ್ರತಿನಿಧಿಗಳ ಸಭೆ"
                    : "Shri Harshanand Guttedar with Community Leaders & Farmer Representatives"
                }
                height="h-full"
                className="w-full h-full rounded-none border-none bg-slate-100"
              />

              {/* Bottom Frosted Overlay Badge */}
              <div className="absolute bottom-4 left-4 sm:bottom-6 sm:left-6 z-10 flex items-center gap-2 sm:gap-3 px-4 sm:px-5 py-2 sm:py-2.5 rounded-xl sm:rounded-2xl bg-black/75 backdrop-blur-md text-white border border-white/20 shadow-lg">
                <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-xs sm:text-sm font-semibold tracking-wide">
                  {language === "kn" 
                    ? "ಕಲಬುರಗಿ ಪ್ರಜಾ ಸಂಪರ್ಕ & ರೈತ ಸಮಾವೇಶ" 
                    : "Kalaburagi People's Outreach & Farmer Council"}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* =========================================================
            3. IMPACT STATEMENT BANNER (Exact Reference Screenshot 1)
            ========================================================= */}
        <div className="max-w-4xl mb-12 sm:mb-16">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-[40px] font-extrabold text-slate-900 tracking-tight leading-[1.25]">
            {language === "kn" ? (
              <>
                ವರ್ಷಗಳಿಂದ ಸಾಗುತ್ತಿರುವ ಈ ಪಯಣದಲ್ಲಿ, ನಮ್ಮ ಆಂದೋಲನವು ತಳಮಟ್ಟದ ಜನಸೇವೆಯಿಂದ ಆರಂಭವಾಗಿ ಇಂದು{" "}
                <span className="text-[#b91c1c]">ಕಲಬುರಗಿ ಮತ್ತು ಕಲ್ಯಾಣ ಕರ್ನಾಟಕದ</span> ಪ್ರತಿಯೊಬ್ಬ ನಾಗರಿಕನ ವಿಶ್ವಾಸಾರ್ಹ ಹಾಗೂ ನಿರ್ಭೀತ ಧ್ವನಿಯಾಗಿ ಹೊರಹೊಮ್ಮಿದೆ.
              </>
            ) : (
              <>
                Over the years, our movement has grown from a grassroots effort into a{" "}
                <span className="text-[#b91c1c]">trusted, fearless voice</span> for citizens across Kalaburagi.
              </>
            )}
          </h2>
        </div>

        {/* =========================================================
            4. 4-COLUMN STATS BAR (Exact Red Suffix Style from Screenshot + Animated Counter)
            ========================================================= */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8 pt-4 border-t border-slate-200">
          
          {/* Stat 1: 50K+ (animates from 10 to 50 on scroll) */}
          <div className="flex flex-col">
            <div className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight leading-none mb-2 tabular-nums">
              <AnimatedCounter
                from={10}
                to={50}
                duration={1800}
                suffix={<span className="text-[#b91c1c] font-black">K+</span>}
              />
            </div>
            <div className="text-xs sm:text-sm text-slate-600 font-medium leading-relaxed">
              {language === "kn" ? "ಕಲಬುರಗಿಯಾದ್ಯಂತ ಬೆಂಬಲಿಗರು" : "Supporters across Kalaburagi"}
            </div>
          </div>

          {/* Stat 2: 100K+ (animates from 20 to 100 on scroll) */}
          <div className="flex flex-col">
            <div className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight leading-none mb-2 tabular-nums">
              <AnimatedCounter
                from={20}
                to={100}
                duration={2000}
                suffix={<span className="text-[#b91c1c] font-black">K+</span>}
              />
            </div>
            <div className="text-xs sm:text-sm text-slate-600 font-medium leading-relaxed">
              {language === "kn" ? "ನೇರ ಸಂಪರ್ಕಕ್ಕೆ ಬಂದ ನಾಗರಿಕರು" : "Citizens reached through outreach"}
            </div>
          </div>

          {/* Stat 3: 500+ (animates from 100 to 500 on scroll) */}
          <div className="flex flex-col">
            <div className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight leading-none mb-2 tabular-nums">
              <AnimatedCounter
                from={100}
                to={500}
                duration={2200}
                suffix={<span className="text-[#b91c1c] font-black">+</span>}
              />
            </div>
            <div className="text-xs sm:text-sm text-slate-600 font-medium leading-relaxed">
              {language === "kn" ? "ಸಕ್ರಿಯ ಸ್ವಯಂಸೇವಕ ಕಾರ್ಯಕರ್ತರು" : "Volunteer team members"}
            </div>
          </div>

          {/* Stat 4: 1,200+ (animates from 200 to 1,200 on scroll with comma format) */}
          <div className="flex flex-col">
            <div className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight leading-none mb-2 tabular-nums">
              <AnimatedCounter
                from={200}
                to={1200}
                duration={2400}
                separator={true}
                suffix={<span className="text-[#b91c1c] font-black">+</span>}
              />
            </div>
            <div className="text-xs sm:text-sm text-slate-600 font-medium leading-relaxed">
              {language === "kn" ? "ಪರಿಹಾರ ಕಂಡ ಸಮಸ್ಯೆಗಳು & ರೈತರು" : "Grievances solved & beneficiaries"}
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}

