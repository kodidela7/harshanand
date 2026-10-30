"use client";

import React from "react";
import { useLanguage } from "@/context/LanguageContext";
import ImagePlaceholder from "@/components/common/ImagePlaceholder";
import { Leaf, Droplets, Target } from "lucide-react";

export default function FarmersWhyChoose() {
  const { language } = useLanguage();

  return (
    <section 
      className="bg-white text-slate-900 py-8 sm:py-12 lg:py-14 border-b border-slate-100"
      aria-label="Why Choose Our Farming Platform"
    >
      <div className="w-full px-5 sm:px-8 md:px-10 lg:px-12 xl:px-16 2xl:px-20 max-w-7xl mx-auto">
        
        {/* =========================================================
            HEADER (Exact Reference Screenshot 3)
            ========================================================= */}
        <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-xs font-bold text-emerald-800 uppercase mb-3">
            <Leaf className="w-3.5 h-3.5 text-emerald-600" />
            <span>{language === "kn" ? "ಏಕೆ ನಮ್ಮ ಕೃಷಿ ವೇದಿಕೆ?" : "Why Choose Us?"}</span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#1b5e20] tracking-tight leading-tight mb-4">
            {language === "kn" ? "ಸುಸ್ಥಿರ ಕೃಷಿ ಮತ್ತು ಸಮೃದ್ಧ ನಾಳೆ" : "Growing Tomorrow"}
          </h2>

          <p className="text-slate-600 text-sm sm:text-base lg:text-lg leading-relaxed">
            {language === "kn"
              ? "ಕಲಬುರಗಿಯ ರೈತರಿಗೆ ಉತ್ತಮ ಬೆಳೆ ಬೆಳೆಯಲು ಮತ್ತು ಆರ್ಥಿಕವಾಗಿ ಬಲಿಷ್ಠ ಕೃಷಿ ಜೀವನ ಕಟ್ಟಿಕೊಳ್ಳಲು ನಾವು ಕೃಷಿ ಪರಿಣತಿ, ಪ್ರಾಯೋಗಿಕ ಪರಿಹಾರಗಳು ಮತ್ತು ಸುಸ್ಥಿರ ತಂತ್ರಜ್ಞಾನವನ್ನು ಒಗ್ಗೂಡಿಸುತ್ತೇವೆ."
              : "We combine agricultural expertise, practical solutions, and sustainable methods to help farmers grow better crops and build stronger farms."}
          </p>
        </div>

        {/* =========================================================
            3-CARD LAYOUT: Dark Green Card | Center Photo | Dark Green Card
            (Exact Reference Screenshot 3)
            ========================================================= */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-stretch">
          
          {/* 1. LEFT CARD: Soil Health Management */}
          <div className="lg:col-span-4 rounded-3xl p-8 sm:p-10 flex flex-col justify-between bg-[#082816] text-white shadow-xl">
            <div>
              {/* Icon */}
              <div className="w-12 h-12 rounded-2xl bg-emerald-600/30 border border-emerald-400/30 flex items-center justify-center text-lime-400 mb-8">
                <Droplets className="w-6 h-6" />
              </div>

              {/* Title */}
              <h3 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight leading-snug mb-4">
                {language === "kn" ? "ಮಣ್ಣಿನ ಆರೋಗ್ಯ ನಿರ್ವಹಣೆ" : "Soil Health Management"}
              </h3>

              {/* Description */}
              <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                {language === "kn"
                  ? "ಪೋಷಕಾಂಶ ಪರೀಕ್ಷೆ, ಸಾವಯವ ಗೊಬ್ಬರ ಸಮೃದ್ಧಿ ಮತ್ತು ಪ್ರತಿ ಜಮೀನಿಗೆ ಸೂಕ್ತವಾದ ಮಣ್ಣು ಚಿಕಿತ್ಸಾ ಯೋಜನೆಗಳ ಮೂಲಕ ಮಣ್ಣಿನ ಗುಣಮಟ್ಟ ಮತ್ತು ಇಳುವರಿ ಸುಧಾರಿಸಿ."
                  : "Improve soil quality with nutrient testing, organic matter enrichment, and customized soil treatment plans."}
              </p>
            </div>

            <div className="pt-8 border-t border-white/10 text-xs font-semibold text-lime-300 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-lime-400" />
              <span>{language === "kn" ? "ಉಚಿತ ಪೋಷಕಾಂಶ ವರದಿ" : "Free Nutrient Audit"}</span>
            </div>
          </div>

          {/* 2. CENTER CARD: Farmer in Sunlight Photo */}
          <div className="lg:col-span-4 rounded-3xl overflow-hidden shadow-2xl border border-slate-200 bg-slate-100 flex items-center">
            <div className="relative w-full h-[320px] sm:h-[400px] lg:h-full">
              <ImagePlaceholder
                label={
                  language === "kn"
                    ? "ಕಲಬುರಗಿ ಹೊಲದಲ್ಲಿ ಸಮೃದ್ಧ ಬೆಳೆ ಪರಿಶೀಲಿಸುತ್ತಿರುವ ರೈತ"
                    : "Kalaburagi Farmer inspecting healthy pulse crops in sunlit field"
                }
                height="h-full"
                className="w-full h-full rounded-none border-none bg-emerald-950/20"
              />
            </div>
          </div>

          {/* 3. RIGHT CARD: Precision Crop Farming */}
          <div className="lg:col-span-4 rounded-3xl p-8 sm:p-10 flex flex-col justify-between bg-[#082816] text-white shadow-xl">
            <div>
              {/* Icon */}
              <div className="w-12 h-12 rounded-2xl bg-emerald-600/30 border border-emerald-400/30 flex items-center justify-center text-lime-400 mb-8">
                <Target className="w-6 h-6" />
              </div>

              {/* Title */}
              <h3 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight leading-snug mb-4">
                {language === "kn" ? "ಖಚಿತ ಕೃಷಿ ಪದ್ಧತಿ & ತಂತ್ರಜ್ಞಾನ" : "Precision Crop Farming"}
              </h3>

              {/* Description */}
              <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                {language === "kn"
                  ? "ಸರಿಯಾದ ಬೆಳೆ ಆಯ್ಕೆ, ಆಧುನಿಕ ಬಿತ್ತನೆ ವಿಧಾನಗಳು ಮತ್ತು ಗರಿಷ್ಠ ಲಾಭ ನೀಡುವ ಕಾಲೋಚಿತ ಬೆಳೆ ಕಾರ್ಯತಂತ್ರಗಳೊಂದಿಗೆ ಅಧಿಕ ಇಳುವರಿ ಪಡೆಯಿರಿ."
                  : "Choose the right crops, improve planting methods, and follow seasonal strategies for better yields."}
              </p>
            </div>

            <div className="pt-8 border-t border-white/10 text-xs font-semibold text-lime-300 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-lime-400" />
              <span>{language === "kn" ? "ಹೆಕ್ಟೇರ್‌ಗೆ ಗರಿಷ್ಠ ಇಳುವರಿ" : "Max Yield Per Acre"}</span>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}

