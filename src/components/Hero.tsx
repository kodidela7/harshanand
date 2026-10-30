"use client";

import React from "react";
import { useLanguage } from "@/context/LanguageContext";

export default function Hero() {
  const { language } = useLanguage();

  return (
    <section
      id="home"
      className="relative w-full h-[calc(92vh+25px)] min-h-[525px] max-h-[885px] flex overflow-hidden"
      aria-label="Hero Section"
    >
      {/* Background Image — fixed aspect, not over-zoomed */}
      <img
        src="/images/hero.jpg"
        alt="Harshanand Guttedar addressing the public"
        className="absolute inset-0 w-full h-full object-cover
          object-[72%_20%]
          sm:object-[70%_25%]
          md:object-[60%_center]
          lg:object-[center_center]"
        style={{ zIndex: 0 }}
      />

      {/* Mobile overlay: bottom-heavy gradient */}
      <div
        className="absolute inset-0 lg:hidden"
        style={{
          zIndex: 1,
          background: `
            linear-gradient(to bottom,
              rgba(0,0,0,0.3) 0%,
              rgba(0,0,0,0.05) 30%,
              rgba(0,0,0,0.15) 55%,
              rgba(0,0,0,0.75) 80%,
              rgba(0,0,0,0.92) 100%
            )
          `,
        }}
      />

      {/* Desktop: warm amber gradient from left */}
      <div
        className="absolute inset-0 hidden lg:block"
        style={{
          zIndex: 1,
          background: `
            linear-gradient(to right,
              rgba(120,40,0,0.92) 0%,
              rgba(140,50,5,0.85) 18%,
              rgba(100,30,5,0.65) 35%,
              rgba(0,0,0,0.2) 55%,
              rgba(0,0,0,0.02) 100%
            )
          `,
        }}
      />

      {/* Golden light flare top-left (desktop) */}
      <div
        className="absolute top-0 left-0 w-[55%] h-[45%] hidden lg:block"
        style={{
          zIndex: 2,
          background: "radial-gradient(ellipse at 10% 10%, rgba(255,180,30,0.4) 0%, transparent 65%)",
        }}
      />

      {/* Content — consistent padding, text positioned comfortably */}
      <div
        className="
          relative w-full
          px-5 sm:px-8 md:px-10 lg:px-12 xl:px-16 2xl:px-20
          flex items-end
          pb-16 sm:pb-20 md:pb-22 lg:pb-28 xl:pb-32
          pt-20
        "
        style={{ zIndex: 3 }}
      >
        <div className="max-w-2xl flex flex-col items-start">
          {/* Main Headline */}
          <h1 className="text-[2.2rem] leading-[1.08] sm:text-5xl md:text-[3.5rem] lg:text-6xl xl:text-[66px] 2xl:text-7xl font-extrabold text-white tracking-tight drop-shadow-lg">
            Leadership that
            <br />
            delivers results.
          </h1>

          {/* Kannada tagline */}
          <p className="text-lg sm:text-2xl md:text-[1.7rem] lg:text-3xl xl:text-[40px] font-bold text-amber-100/95 leading-snug mt-2 sm:mt-3 drop-shadow-md">
            ಪ್ರಗತಿಯ ಪಥದಲ್ಲಿ ನಮ್ಮ ಹೆಜ್ಜೆ.
          </p>

          {/* Subtitle */}
          <p className="text-white/70 text-xs sm:text-sm md:text-base lg:text-lg leading-relaxed max-w-md lg:max-w-lg mt-4 sm:mt-5 drop-shadow">
            {language === "kn"
              ? "ಕಲಬುರಗಿಯ ಸಮಗ್ರ ಅಭಿವೃದ್ಧಿ, ನಮ್ಮ ಶ್ರೀಮಂತ ಪರಂಪರೆಯ ಸಂರಕ್ಷಣೆ, ಹಾಗೂ ಎಲ್ಲರಿಗೂ ಸಮೃದ್ಧಿಯ ಭರವಸೆ ನೀಡಲು ಸಮರ್ಪಿತ ನಾಯಕತ್ವ."
              : "Dedicated to the holistic development of Kalaburagi, preserving our rich heritage, and ensuring prosperity for all."}
          </p>
        </div>
      </div>

      {/* Bottom Blur Transition Effect */}
      <div
        className="absolute bottom-0 inset-x-0 h-28 sm:h-36 pointer-events-none backdrop-blur-[12px] bg-gradient-to-t from-black/50 via-black/20 to-transparent"
        style={{
          zIndex: 4,
          maskImage: "linear-gradient(to bottom, transparent 0%, rgba(0,0,0,0.6) 50%, black 100%)",
          WebkitMaskImage: "linear-gradient(to bottom, transparent 0%, rgba(0,0,0,0.6) 50%, black 100%)",
        }}
      />
    </section>
  );
}
