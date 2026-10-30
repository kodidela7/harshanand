"use client";

import React from "react";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";
import ImagePlaceholder from "@/components/common/ImagePlaceholder";
import AnimatedCounter from "@/components/common/AnimatedCounter";
import { ArrowRight } from "lucide-react";

export default function AboutSection() {
  const { language, t } = useLanguage();

  return (
    <section
      id="about"
      className="relative z-10 bg-white text-slate-900 pt-14 sm:pt-20 lg:pt-24 pb-5 sm:pb-8 lg:pb-10 -mt-6 sm:-mt-10 rounded-t-[2rem] sm:rounded-t-[3.5rem] shadow-[0_-20px_50px_rgba(0,0,0,0.12)] transition-all"
      aria-label="About Harshanand Guttedar Section"
    >
      <div className="w-full px-5 sm:px-8 md:px-10 lg:px-12 xl:px-16 2xl:px-20">
        
        {/* Top Header Row */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-8 mb-10 sm:mb-16 items-start">
          {/* Label on Top-Left */}
          <div className="lg:col-span-3 pt-1 sm:pt-2">
            <span className="text-xs sm:text-sm font-bold tracking-widest text-slate-800 uppercase flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-slate-900" />
              {language === "kn" ? "ನಮ್ಮ ಪರಿಚಯ" : "ABOUT US"}
            </span>
          </div>

          {/* Big Headline */}
          <div className="lg:col-span-9 max-w-3xl">
            <h2 className="text-2xl sm:text-4xl md:text-5xl lg:text-[54px] font-extrabold text-slate-900 tracking-tight leading-[1.15]">
              {language === "kn" ? (
                <>
                  ಪ್ರಾಮಾಣಿಕತೆ ಮತ್ತು ನಿಷ್ಠೆಯೊಂದಿಗೆ{" "}
                  <span className="block mt-1">ಜನಸೇವೆ</span>
                </>
              ) : (
                <>
                  Serving people with{" "}
                  <span className="block mt-1">integrity and purpose</span>
                </>
              )}
            </h2>
          </div>
        </div>

        {/* Content Layout: 
            On Mobile (as per reference diagram):
            1. Image 1
            2. Paragraph text
            3. Stat Box (50K+ / 1,200+ stacked vertically)
            4. About Us button + Awards immediately next to it
            5. Image 2
            On Desktop:
            3-Column layout (Left Image | Center Content | Right Image)
        */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-8 xl:gap-10 items-center">
          
          {/* 1. Left Column: Image 1 */}
          <div className="lg:col-span-4 xl:col-span-4 flex justify-center">
            <div className="w-full max-w-md lg:max-w-none overflow-hidden rounded-2xl sm:rounded-3xl shadow-lg border border-slate-100 bg-slate-50">
              <ImagePlaceholder
                label={
                  language === "kn"
                    ? "ಶ್ರೀ ಹರ್ಷಾನಂದ ಗುತ್ತೇದಾರ ಅವರ ಸಾರ್ವಜನಿಕ ಭಾಷಣ"
                    : "Harshanand Guttedar Addressing Public"
                }
                height="h-[320px] sm:h-[420px] lg:h-[480px]"
                className="rounded-2xl sm:rounded-3xl border-slate-300"
              />
            </div>
          </div>

          {/* 2. Middle Column: Text + Stat Box + CTA & Awards Row */}
          <div className="lg:col-span-4 xl:col-span-4 flex flex-col justify-center space-y-5 sm:space-y-7">
            {/* Mission Statement Paragraph */}
            <p className="text-slate-800 text-sm sm:text-lg lg:text-[1.05rem] font-medium leading-relaxed">
              {language === "kn"
                ? "ಕಲಬುರಗಿಯ ನಾಗರಿಕರಿಗೆ ಹೊಸ ಅವಕಾಶಗಳನ್ನು ಸೃಷ್ಟಿಸಲು, ಸಮಾಜವನ್ನು ಒಗ್ಗೂಡಿಸಲು ಹಾಗೂ ಪ್ರತಿಯೊಬ್ಬ ರೈತ ಮತ್ತು ಯುವಕರಿಗೆ ಸಮೃದ್ಧ ಭವಿಷ್ಯ ನಿರ್ಮಿಸಲು ನಾವು ಸದಾ ಬದ್ಧರಾಗಿದ್ದೇವೆ."
                : "We are committed to creating opportunities, strengthening communities, and building a prosperous future."}
            </p>

            {/* Stat Box (Stacked vertically on small screen as per reference diagram, side-by-side on desktop) */}
            <div className="p-5 sm:p-7 rounded-2xl border border-slate-200/90 bg-white shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4 sm:gap-0">
              {/* Stat 1 */}
              <div className="flex-1 sm:pr-4">
                <div className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight leading-none mb-1 tabular-nums">
                  <AnimatedCounter
                    from={10}
                    to={50}
                    duration={1800}
                    suffix={<span className="font-extrabold">K+</span>}
                  />
                </div>
                <div className="text-xs sm:text-sm text-slate-500 font-medium">
                  {t("ಕೈಜೋಡಿಸಿದ ಜನರು", "Supporters across")}
                </div>
              </div>

              {/* Vertical divider on desktop, subtle horizontal divider on mobile */}
              <div className="hidden sm:block w-[1px] h-12 bg-slate-200 self-center" />
              <div className="sm:hidden w-full h-[1px] bg-slate-100" />

              {/* Stat 2 */}
              <div className="flex-1 sm:pl-6">
                <div className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight leading-none mb-1 tabular-nums">
                  <AnimatedCounter
                    from={200}
                    to={1200}
                    duration={2200}
                    separator={true}
                    suffix={<span className="font-extrabold">+</span>}
                  />
                </div>
                <div className="text-xs sm:text-sm text-slate-500 font-medium">
                  {t("ಪರಿಹರಿಸಲಾದ ಸಮಸ್ಯೆಗಳು", "Supporters across")}
                </div>
              </div>
            </div>

            {/* Action Row: Dark Pill Button + Awards IMMEDIATELY NEXT TO IT (Reference Diagram Match) */}
            <div className="flex items-center gap-2.5 sm:gap-4 pt-1 flex-nowrap overflow-x-auto no-scrollbar">
              {/* Dark Pill Button: About Us -> */}
              <Link
                href="/about"
                className="inline-flex items-center gap-2 sm:gap-3 px-4 sm:px-6 py-2.5 sm:py-3.5 rounded-full bg-[#18181b] hover:bg-[#27272a] text-white font-semibold text-xs sm:text-sm transition-all duration-200 shadow-md group shrink-0 whitespace-nowrap"
              >
                <span>{t("ನಮ್ಮ ಪರಿಚಯ", "About Us")}</span>
                <span className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-white flex items-center justify-center transition-transform group-hover:translate-x-0.5 shrink-0">
                  <ArrowRight className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-slate-900" />
                </span>
              </Link>

              {/* Laurel Wreath Badges placed right next to About Us button */}
              <div className="flex items-center gap-2 sm:gap-3.5 text-slate-800 shrink-0">
                {/* Wreath 1: Ultra Prestigious */}
                <div className="flex items-center gap-1 select-none shrink-0">
                  <svg className="w-4 sm:w-5 h-7 sm:h-8 text-slate-700" viewBox="0 0 24 36" fill="currentColor">
                    <path d="M12 2C8 6 6 12 7 18C7.5 21 9 24 11 26C10 23 9.5 20 10 17C10.5 13 12 9 14 6L12 2Z" />
                    <path d="M7 8C4 11 3 15 4 19C4.5 21 6 23 8 24C6.5 22 5.5 19 6 16C6.5 13 8 10 9 8L7 8Z" opacity="0.8"/>
                    <path d="M11 28C8 28 5 26 3 23C2 21 2 18 3 15C3 18 4 21 6 23C8 25 10 26 12 26L11 28Z" opacity="0.6"/>
                  </svg>
                  <div className="flex flex-col text-[7.5px] sm:text-[9px] font-black uppercase leading-tight tracking-wider text-slate-800 text-center">
                    <span className="font-extrabold tracking-tight">ULTRA</span>
                    <span className="text-[6.5px] sm:text-[7.5px] text-slate-500 font-semibold">PRESTIGIOUS</span>
                    <span className="text-[6.5px] sm:text-[7.5px] text-slate-600 font-bold mt-0.5">★★★★★</span>
                  </div>
                  <svg className="w-4 sm:w-5 h-7 sm:h-8 text-slate-700 -scale-x-100" viewBox="0 0 24 36" fill="currentColor">
                    <path d="M12 2C8 6 6 12 7 18C7.5 21 9 24 11 26C10 23 9.5 20 10 17C10.5 13 12 9 14 6L12 2Z" />
                    <path d="M7 8C4 11 3 15 4 19C4.5 21 6 23 8 24C6.5 22 5.5 19 6 16C6.5 13 8 10 9 8L7 8Z" opacity="0.8"/>
                    <path d="M11 28C8 28 5 26 3 23C2 21 2 18 3 15C3 18 4 21 6 23C8 25 10 26 12 26L11 28Z" opacity="0.6"/>
                  </svg>
                </div>

                {/* Wreath 2: Hyper Best */}
                <div className="flex items-center gap-1 select-none shrink-0">
                  <svg className="w-4 sm:w-5 h-7 sm:h-8 text-slate-700" viewBox="0 0 24 36" fill="currentColor">
                    <path d="M12 2C8 6 6 12 7 18C7.5 21 9 24 11 26C10 23 9.5 20 10 17C10.5 13 12 9 14 6L12 2Z" />
                    <path d="M7 8C4 11 3 15 4 19C4.5 21 6 23 8 24C6.5 22 5.5 19 6 16C6.5 13 8 10 9 8L7 8Z" opacity="0.8"/>
                    <path d="M11 28C8 28 5 26 3 23C2 21 2 18 3 15C3 18 4 21 6 23C8 25 10 26 12 26L11 28Z" opacity="0.6"/>
                  </svg>
                  <div className="flex flex-col text-[7.5px] sm:text-[9px] font-black uppercase leading-tight tracking-wider text-slate-800 text-center">
                    <span className="font-extrabold tracking-tight">HYPER</span>
                    <span className="text-[6.5px] sm:text-[7.5px] text-slate-500 font-semibold">BEST</span>
                    <span className="text-[6.5px] sm:text-[7.5px] text-slate-600 font-bold mt-0.5">★★★★★</span>
                  </div>
                  <svg className="w-4 sm:w-5 h-7 sm:h-8 text-slate-700 -scale-x-100" viewBox="0 0 24 36" fill="currentColor">
                    <path d="M12 2C8 6 6 12 7 18C7.5 21 9 24 11 26C10 23 9.5 20 10 17C10.5 13 12 9 14 6L12 2Z" />
                    <path d="M7 8C4 11 3 15 4 19C4.5 21 6 23 8 24C6.5 22 5.5 19 6 16C6.5 13 8 10 9 8L7 8Z" opacity="0.8"/>
                    <path d="M11 28C8 28 5 26 3 23C2 21 2 18 3 15C3 18 4 21 6 23C8 25 10 26 12 26L11 28Z" opacity="0.6"/>
                  </svg>
                </div>
              </div>
            </div>

          </div>

          {/* 3. Right Column: Image 2 */}
          <div className="lg:col-span-4 xl:col-span-4 flex justify-center">
            <div className="w-full max-w-md lg:max-w-none overflow-hidden rounded-2xl sm:rounded-3xl shadow-lg border border-slate-100 bg-slate-50">
              <ImagePlaceholder
                label={
                  language === "kn"
                    ? "ಕಲಬುರಗಿ ಜನರೊಂದಿಗೆ ಸಮಾವೇಶ & ರೈತ ಸಮ್ಮೇಳನ"
                    : "Community Gathering & Farmer Assembly"
                }
                height="h-[320px] sm:h-[420px] lg:h-[480px]"
                className="rounded-2xl sm:rounded-3xl border-slate-300"
              />
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
