"use client";

import React from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PageHeroBanner from "@/components/common/PageHeroBanner";
import ImagePlaceholder from "@/components/common/ImagePlaceholder";
import { useLanguage } from "@/context/LanguageContext";
import { Heart, Home, Users, Sparkles, Quote, ArrowRight, ShieldCheck } from "lucide-react";

export default function FamilyPage() {
  const { language } = useLanguage();

  const familyValues = [
    {
      titleKn: "ಅತಿಥಿ ಸತ್ಕಾರ & ಬಾಗಿಲು ಸದಾ ಮುಕ್ತ",
      titleEn: "Unconditional Hospitality & Open Doors",
      descKn: "ಮನೆಗೆ ಬಂದ ಯಾವುದೇ ಬಡವ ಅಥವಾ ಕಷ್ಟದಲ್ಲಿರುವ ವ್ಯಕ್ತಿ ಬರಿಗೈಯಲ್ಲಿ ಮರಳಬಾರದು ಎಂಬುದು ನಮ್ಮ ಕುಟುಂಬದ ಹಿರಿಯರು ಕಲಿಸಿಕೊಟ್ಟ ಮೊದಲ ಮೌಲ್ಯ.",
      descEn: "Generations have lived by the sacred principle that no citizen or traveler leaving our home should depart without shelter, warmth, and respectful assistance.",
    },
    {
      titleKn: "ರೈತರ ಮತ್ತು ಕಾರ್ಮಿಕರ ಬೆವರಿಗೆ ಗೌರವ",
      titleEn: "Reverence for the Soil and Labor",
      descKn: "ಕೃಷಿಯೇ ನಮ್ಮ ನಾಡಿನ ಬೆನ್ನೆಲುಬು. ಅನ್ನ ನೀಡುವ ರೈತನಿಗೆ ಗೌರವ ಮತ್ತು ಕಷ್ಟಕ್ಕೆ ಸ್ಪಂದಿಸುವುದು ನಮ್ಮ ರಕ್ತದಲ್ಲೇ ಹರಿದು ಬಂದಿರುವ ಸಂಸ್ಕಾರ.",
      descEn: "Growing up in a household centered around agriculture, treating farmers with the utmost reverence is an indelible family ethos.",
    },
    {
      titleKn: "ಶಿಕ್ಷಣಕ್ಕೆ ಪ್ರೋತ್ಸಾಹ & ಸಮಾಜಮುಖಿ ಸೇವೆ",
      titleEn: "Philanthropy & Rural Education Trusts",
      descKn: "ಬಡ ಕುಟುಂಬಗಳ ಪ್ರತಿಭಾವಂತ ಮಕ್ಕಳಿಗೆ ಉಚಿತ ಪುಸ್ತಕ, ಶುಲ್ಕ ನೆರವು ಮತ್ತು ಶಿಕ್ಷಣಕ್ಕೆ ನೆರವಾಗಲು ಕುಟುಂಬ ವತಿಯಿಂದ ನಿರಂತರ ಸಹಾಯ.",
      descEn: "Establishing private philanthropic trusts that sponsor higher education and vocational fees for bright children of marginal farmers.",
    },
    {
      titleKn: "ಧರ್ಮ, ಸತ್ಯ ಮತ್ತು ಕೊಟ್ಟ ಮಾತಿಗೆ ಬದ್ಧತೆ",
      titleEn: "Integrity, Truth & Kept Promises",
      descKn: "ಸಾರ್ವಜನಿಕ ಜೀವನದಲ್ಲಿ ಮಾತು ಕೊಡುವುದು ಸುಲಭ, ಆದರೆ ಅದನ್ನು ಉಳಿಸಿಕೊಳ್ಳುವುದೇ ನಿಜವಾದ ನಾಯಕತ್ವ. ನಮ್ಮ ಕುಟುಂಬ ಸದಾ ಪ್ರಾಮಾಣಿಕತೆಗೆ ಮೊದಲ ಆದ್ಯತೆ ನೀಡಿದೆ.",
      descEn: "Upholding word of honor above temporary political expediency—a steadfast family legacy trusted by communities across Kalyana Karnataka.",
    },
  ];

  return (
    <main className="min-h-screen bg-white text-slate-900 relative overflow-x-hidden">
      <Navbar />

      <PageHeroBanner
        badgeKn="ಕುಟುಂಬ & ಪರಂಪರೆ"
        badgeEn="FAMILY & HERITAGE"
        titleKn={
          <>
            ಸಂಸ್ಕಾರ, ಪರಂಪರೆ &{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-amber-200 to-red-400">
              ಕುಟುಂಬದ ಮೌಲ್ಯಗಳು
            </span>
          </>
        }
        titleEn={
          <>
            Family Roots, Heritage &{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-amber-200 to-red-400">
              Enduring Values
            </span>
          </>
        }
        subtitleKn="ಆಳಂದದ ಮಣ್ಣಿನ ನಂಟಿನೊಂದಿಗೆ ತಲೆಮಾರುಗಳಿಂದ ಜನಸೇವೆಯನ್ನು ಧರ್ಮವಾಗಿ ಪಾಲಿಸಿಕೊಂಡು ಬಂದಿರುವ ಗುತ್ತೇದಾರ ಕುಟುಂಬದ ಪರಂಪರೆ."
        subtitleEn="The ancestral legacy, values, and generational dedication to public welfare that guide Shri Harshanand Guttedar."
        breadcrumbLabelKn="ಕುಟುಂಬ"
        breadcrumbLabelEn="Family"
        icon={Heart}
      />

      <section className="py-12 sm:py-16 lg:py-20 bg-white" aria-label="Family Heritage Content">
        <div className="w-full px-5 sm:px-8 md:px-10 lg:px-12 xl:px-16 2xl:px-20 max-w-6xl mx-auto space-y-16">
          
          {/* Main Heritage Narrative with Large Family Photo */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
            
            <div className="lg:col-span-6">
              <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-slate-200 bg-slate-100">
                <ImagePlaceholder
                  label={
                    language === "kn"
                      ? "ಶ್ರೀ ಹರ್ಷಾನಂದ ಗುತ್ತೇದಾರ ಮತ್ತು ಕುಟುಂಬದ ಹಿರಿಯರೊಂದಿಗೆ ಭಾವಚಿತ್ರ"
                      : "Shri Harshanand Guttedar with family elders and community leaders"
                  }
                  height="h-[360px] sm:h-[460px]"
                  className="rounded-none border-none"
                />
                <div className="absolute bottom-4 left-4 right-4 p-4 rounded-2xl bg-black/80 backdrop-blur-md text-white border border-white/20">
                  <div className="text-xs font-semibold text-amber-300">
                    {language === "kn" ? "ಸಾಂಸ್ಕೃತಿಕ ಪರಂಪರೆ" : "Ancestral Legacy"}
                  </div>
                  <div className="text-sm font-bold mt-0.5">
                    {language === "kn" ? "ತಲೆಮಾರುಗಳಿಂದ ಜನಸೇವೆಯ ಸಂಕಲ್ಪ" : "Generations of community service in Aland"}
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-6 space-y-5">
              <span className="text-xs font-bold tracking-widest text-slate-800 uppercase flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-[#b91c1c]" />
                {language === "kn" ? "ಹಿರಿಯರ ಆಶೀರ್ವಾದ" : "ROOTS & ETHOS"}
              </span>

              <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight">
                {language === "kn" ? (
                  <>
                    ಜನಸೇವೆ ಎಂಬುದು ನಮ್ಮ ರಕ್ತಗತ ಸಂಸ್ಕಾರ:{" "}
                    <span className="text-[#b91c1c]">ಹಿರಿಯರ ಆದರ್ಶವೇ ದಾರಿದೀಪ</span>
                  </>
                ) : (
                  <>
                    Public Welfare Is Our Duty:{" "}
                    <span className="text-[#b91c1c]">Guided by Ancestral Ideals</span>
                  </>
                )}
              </h2>

              <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                {language === "kn"
                  ? "ಗುತ್ತೇದಾರ ಕುಟುಂಬವು ಆಳಂದ ಮತ್ತು ಕಲಬುರಗಿಯ ಜನಸಾಮಾನ್ಯರ ಜೊತೆ ಅವಿನಾಭಾವ ಸಂಬಂಧ ಹೊಂದಿದೆ. ಹಳ್ಳಿಗಳಲ್ಲಿ ಜಾತಿ-ಮತ ಭೇದವಿಲ್ಲದೆ ಎಲ್ಲರ ಸಂಕಷ್ಟಗಳಿಗೆ ಧಾವಿಸುವುದು, ಕೃಷಿಕರ ಏಳಿಗೆಗೆ ಶ್ರಮಿಸುವುದು ನಮ್ಮ ತಾತ-ಮುತ್ತಾತಂದಿರಿಂದ ಬಂದ ಜೀವನ ಪದ್ಧತಿ. ಈ ಮೌಲ್ಯಗಳೇ ಹರ್ಷಾನಂದ ಗುತ್ತೇದಾರ ಅವರ ಪ್ರತಿ ಹೆಜ್ಜೆಯಲ್ಲೂ ಪ್ರತಿಫಲಿಸುತ್ತವೆ."
                  : "The Guttedar household has shared an inseparable bond with the families of Aland and Kalaburagi for decades. Standing with marginalized households and defending farmer dignity are not political choices—they are family traditions inherited across generations."}
              </p>

              <div className="p-5 rounded-2xl bg-amber-50 border border-amber-200 text-slate-800 text-xs sm:text-sm font-medium italic">
                {language === "kn"
                  ? "“ಸಮಾಜ ನಮಗೆ ಕೊಟ್ಟಿದ್ದನ್ನು ಹತ್ತು ಪಟ್ಟು ಪ್ರೀತಿಯೊಂದಿಗೆ ಸಮಾಜಕ್ಕೇ ಮರಳಿಸಬೇಕು.”"
                  : "“What society has bestowed upon us must be returned tenfold with humility, love, and unwavering service.”"}
              </div>
            </div>

          </div>

          {/* 4 Core Family Values Grid */}
          <div className="space-y-8">
            <div className="border-b border-slate-200 pb-4">
              <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                {language === "kn" ? "ಕುಟುಂಬ ಮುನ್ನಡೆಸುತ್ತಿರುವ ಮೂಲ ಮೌಲ್ಯಗಳು" : "Core Values Instilled in Our Family"}
              </h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
              {familyValues.map((val, idx) => (
                <div
                  key={idx}
                  className="rounded-3xl p-7 sm:p-8 border border-slate-200 bg-white hover:shadow-xl transition-all duration-300 flex items-start gap-5 group"
                >
                  <div className="w-12 h-12 rounded-2xl bg-amber-50 border border-amber-200 flex items-center justify-center text-amber-800 font-bold shrink-0">
                    0{idx + 1}
                  </div>
                  <div className="space-y-2">
                    <h4 className="text-lg sm:text-xl font-extrabold text-slate-900 tracking-tight group-hover:text-[#b91c1c] transition-colors">
                      {language === "kn" ? val.titleKn : val.titleEn}
                    </h4>
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      {language === "kn" ? val.descKn : val.descEn}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </section>

      <Footer />
    </main>
  );
}

