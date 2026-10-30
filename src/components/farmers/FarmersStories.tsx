"use client";

import React from "react";
import { useLanguage } from "@/context/LanguageContext";
import ImagePlaceholder from "@/components/common/ImagePlaceholder";
import { Leaf } from "lucide-react";

export default function FarmersStories() {
  const { language } = useLanguage();

  const stories = [
    {
      nameKn: "ಮಲ್ಲಿಕಾರ್ಜುನ ಪಾಟೀಲ್",
      nameEn: "Mallikarjun Patil",
      roleKn: "ತೊಗರಿ ಬೆಳೆಗಾರ, ಆಳಂದ",
      roleEn: "Tur Dal Farmer, Aland",
      quoteKn:
        "ಹೊಸ ಹನಿ ನೀರಾವರಿ ಮತ್ತು ಕೃಷಿ ಮಾರ್ಗದರ್ಶನದಿಂದ ಬೇಸಿಗೆಯಲ್ಲೂ ನನ್ನ ಬೆಳೆ ರಕ್ಷಿಸಲು ಸಾಧ್ಯವಾಯಿತು. ನೀರಿನ ಉಳಿತಾಯದೊಂದಿಗೆ ಇಳುವರಿ ಶೇ.30 ರಷ್ಟು ಹೆಚ್ಚಿದೆ.",
      quoteEn:
        "The new irrigation plan helped me save water and keep my crops healthy throughout the dry season. My yield improved significantly.",
      imageLabelKn: "ಶ್ರೀ ಮಲ್ಲಿಕಾರ್ಜುನ ಪಾಟೀಲ್, ಆಳಂದ ರೈತರು",
      imageLabelEn: "Mallikarjun Patil, Farmer from Aland",
    },
    {
      nameKn: "ಬಸವರಾಜ್ ಗುತ್ತೇದಾರ",
      nameEn: "Basavaraj Guttedar",
      roleKn: "ಪ್ರಮಾಣೀಕೃತ ಬೆಳೆಗಾರ, ಕಲಬುರಗಿ",
      roleEn: "GI Tag Pulse Grower, Kalaburagi",
      quoteKn:
        "ಉಚಿತ ಮಣ್ಣು ಪರೀಕ್ಷೆ ಮತ್ತು ಜಿಐ ಟ್ಯಾಗ್ ರಫ್ತು ಪ್ರಮಾಣೀಕರಣವು ನನ್ನ ಬೆಳೆಗೆ ಅಧಿಕ ಬೆಲೆ ತಂದುಕೊಟ್ಟಿತು. ದಲ್ಲಾಳಿಗಳಿಲ್ಲದೆ ನೇರ ರಫ್ತು ಮಾರುಕಟ್ಟೆ ಸಿಕ್ಕಿದೆ.",
      quoteEn:
        "Better soil management and APEDA certification made a real difference in my harvest. My produce fetched premium export prices.",
      imageLabelKn: "ಶ್ರೀ ಬಸವರಾಜ್ ಗುತ್ತೇದಾರ, ಕಲಬುರಗಿ",
      imageLabelEn: "Basavaraj Guttedar, Pulse Producer",
    },
    {
      nameKn: "ಶರಣಪ್ಪ ಬಿರಾದಾರ್",
      nameEn: "Sharanappa Biradar",
      roleKn: "ಸಾವಯವ ಬೆಳೆಗಾರ, ಅಫ್ಜಲ್‌ಪುರ",
      roleEn: "Organic Farmer, Afzalpur",
      quoteKn:
        "ಕೃಷಿ ತಜ್ಞರ ಸಮಯೋಚಿತ ರೋಗ ನಿಯಂತ್ರಣ ಸಲಹೆಯಿಂದ ಬೆಳೆ ಒಣಗುವ ರೋಗವನ್ನು ಆರಂಭದಲ್ಲೇ ತಡೆಗಟ್ಟಿದೆ. ನನ್ನ ಶೇ.80 ರಷ್ಟು ಬೆಳೆ ಹಾನಿಯಾಗುವುದು ತಪ್ಪಿತು.",
      quoteEn:
        "With expert crop guidance and disease monitoring, I spotted wilt disease early and saved over 80% of my harvest.",
      imageLabelKn: "ಶ್ರೀ ಶರಣಪ್ಪ ಬಿರಾದಾರ್, ಅಫ್ಜಲ್‌ಪುರ",
      imageLabelEn: "Sharanappa Biradar, Field Specialist",
    },
    {
      nameKn: "ಆನಂದ್ ಕುಮಾರ್",
      nameEn: "Anand Kumar",
      roleKn: "ರೈತ ಉತ್ಪಾದಕ ಸಂಘದ ಅಧ್ಯಕ್ಷ, ಸೇಡಂ",
      roleEn: "FPO Cluster Head, Sedam",
      quoteKn:
        "ನೇರ ಮಂಡಿ ಮತ್ತು ರಫ್ತು ಸಂಪರ್ಕದಿಂದ ಮಧ್ಯವರ್ತಿಗಳ ಕಮಿಷನ್ ದಂಧೆ ಸಂಪೂರ್ಣ ನಿಂತಿದೆ. ನಮ್ಮ ರೈತರ ಬೆವರಿಗೆ ನೈಜ ಮೌಲ್ಯ ಸಿಕ್ಕಿದೆ.",
      quoteEn:
        "Direct mandi linkage eliminated middleman commissions. For the first time, our community's hard work translated into real profits.",
      imageLabelKn: "ಶ್ರೀ ಆನಂದ್ ಕುಮಾರ್, ಎಫ್‌ಪಿಒ ಮುಖ್ಯಸ್ಥ, ಸೇಡಂ",
      imageLabelEn: "Anand Kumar, FPO Cluster President",
    },
  ];

  return (
    <section 
      className="bg-white text-slate-900 py-8 sm:py-12 lg:py-14 border-b border-slate-100"
      aria-label="Real Results from Real Farmers Section"
    >
      <div className="w-full px-5 sm:px-8 md:px-10 lg:px-12 xl:px-16 2xl:px-20 max-w-7xl mx-auto">
        
        {/* =========================================================
            HEADER (Exact Reference Screenshot 4)
            ========================================================= */}
        <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-xs font-bold text-emerald-800 uppercase mb-3">
            <Leaf className="w-3.5 h-3.5 text-emerald-600" />
            <span>{language === "kn" ? "ರೈತರ ನೈಜ ಅನುಭವಗಳು" : "Farmer Stories"}</span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#1b5e20] tracking-tight leading-tight mb-4">
            {language === "kn" ? "ನಮ್ಮ ರೈತರ ನೈಜ ಯಶಸ್ಸಿನ ಕಥೆಗಳು" : "Real Results from Real Farmers"}
          </h2>

          <p className="text-slate-600 text-sm sm:text-base lg:text-lg leading-relaxed">
            {language === "kn"
              ? "ಕಲಬುರಗಿಯ ರೈತರು ನಮ್ಮ ಕೃಷಿ ಮತ್ತು ರಫ್ತು ಪರಿಹಾರಗಳ ಮೂಲಕ ಬೆಳೆ ರಕ್ಷಿಸಿ, ಆದಾಯ ಹೆಚ್ಚಿಸಿಕೊಂಡ ಬಗೆಯನ್ನು ತಿಳಿಯಿರಿ."
              : "Discover how our agricultural solutions help farmers protect their crops, improve harvests, and build more profitable farms."}
          </p>
        </div>

        {/* =========================================================
            4-CARD TESTIMONIAL GRID (Exact Reference Screenshot 4)
            ========================================================= */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {stories.map((item, idx) => (
            <div
              key={idx}
              className="flex flex-col justify-between rounded-3xl p-4 sm:p-5 bg-[#0a2e18] text-white shadow-xl hover:shadow-2xl transition-all duration-300 group"
            >
              <div>
                {/* Farmer Image Card */}
                <div className="relative w-full rounded-2xl overflow-hidden mb-5 bg-emerald-950/40">
                  <ImagePlaceholder
                    label={language === "kn" ? item.imageLabelKn : item.imageLabelEn}
                    height="h-48 sm:h-52"
                    className="rounded-2xl border-none bg-emerald-900/30"
                  />
                </div>

                {/* Farmer Quote */}
                <p className="text-xs sm:text-sm text-slate-200 font-normal leading-relaxed mb-6 italic">
                  &ldquo;{language === "kn" ? item.quoteKn : item.quoteEn}&rdquo;
                </p>
              </div>

              {/* Bottom Row: Quote Mark + Farmer Details */}
              <div className="pt-4 border-t border-emerald-800/60">
                <div className="text-2xl text-lime-400 font-serif leading-none mb-2">❝</div>
                <div className="text-sm sm:text-base font-bold text-white tracking-tight">
                  {language === "kn" ? item.nameKn : item.nameEn}
                </div>
                <div className="text-xs text-lime-300/80 font-medium mt-0.5">
                  {language === "kn" ? item.roleKn : item.roleEn}
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}

