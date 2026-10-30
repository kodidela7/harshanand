"use client";

import React from "react";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";
import ImagePlaceholder from "@/components/common/ImagePlaceholder";
import { ArrowRight, Leaf } from "lucide-react";

export default function FarmersSolutions() {
  const { language } = useLanguage();

  const services = [
    {
      id: "weather-advisory",
      titleKn: "ಹವಾಮಾನ & ಕಾಲೋಚಿತ ಮುನ್ಸೂಚನೆ",
      titleEn: "Weather & Seasonal Advisory",
      descKn: "ನಿಖರ ಹವಾಮಾನ ಮುನ್ಸೂಚನೆ ಮತ್ತು ಹವಾಮಾನ ವೈಪರೀತ್ಯದ ಸಮಯದಲ್ಲಿ ಬೆಳೆ ರಕ್ಷಣೆಗೆ ತಜ್ಞರ ಮುಂಜಾಗ್ರತಾ ಸಲಹೆಗಳು.",
      descEn: "Get useful weather insights and seasonal farming guidance to prepare for changing conditions and protect your crops.",
      imageLabelKn: "ಕಲಬುರಗಿ ಕೃಷಿ ಹವಾಮಾನ ಕೇಂದ್ರ & ಉಪಗ್ರಹ ಮುನ್ಸೂಚನೆ",
      imageLabelEn: "Weather & Seasonal Crop Advisory Field",
    },
    {
      id: "soil-testing",
      titleKn: "ಮಣ್ಣು ಪರೀಕ್ಷೆ & ಪೋಷಕಾಂಶ ವಿಶ್ಲೇಷಣೆ",
      titleEn: "Soil Testing & Analysis",
      descKn: "ನಿಮ್ಮ ಜಮೀನಿನ ಮಣ್ಣಿನ ಗುಣಮಟ್ಟ, pH ಪ್ರಮಾಣ ಮತ್ತು ಪೋಷಕಾಂಶ ಮಟ್ಟವನ್ನು ತಿಳಿದುಕೊಂಡು ರಸಗೊಬ್ಬರ ವೆಚ್ಚ ಉಳಿಸಿ.",
      descEn: "Understand your soil's health, nutrient levels, and pH balance to make better decisions for stronger crop growth.",
      imageLabelKn: "ಉಚಿತ ಮಣ್ಣು ಪರೀಕ್ಷಾ ಪ್ರಯೋಗಾಲಯ & ವಿಶ್ಲೇಷಣೆ",
      imageLabelEn: "Soil Testing & Nutrient Analysis Lab",
    },
    {
      id: "seed-selection",
      titleKn: "ಉತ್ತಮ ತಳಿ ಬಿತ್ತನೆ ಬೀಜ ಪೂರೈಕೆ",
      titleEn: "Seed Selection & Supply",
      descKn: "ಕಲಬುರಗಿ ಹವಾಗುಣಕ್ಕೆ ಹೊಂದುವ ಜಿಐ-ಶ್ರೇಣಿಯ ಪ್ರಮಾಣೀಕೃತ ತೊಗರಿ ಮತ್ತು ದ್ವಿದಳ ಧಾನ್ಯದ ಅಧಿಕ ಇಳುವರಿ ಬೀಜಗಳು.",
      descEn: "Find quality seeds suited to your soil, climate, and farming goals for healthy growth and better harvests.",
      imageLabelKn: "ಪ್ರಮಾಣೀಕೃತ ತೊಗರಿ ಬಿತ್ತನೆ ಬೀಜ ಶೇಖರಣೆ",
      imageLabelEn: "Certified High-Yield Pulse Seed Supply",
    },
    {
      id: "crop-planning",
      titleKn: "ಬೆಳೆ ಯೋಜನೆ & ರಫ್ತು ಸಂಪರ್ಕ",
      titleEn: "Crop Planning",
      descKn: "ಋತುವಿಗನುಗುಣವಾಗಿ ಬಿತ್ತನೆ ದಿನಾಂಕ, ಅಂತರ್ ಬೆಳೆ ನಿರ್ವಹಣೆ ಮತ್ತು ಅಂತಾರಾಷ್ಟ್ರೀಯ ರಫ್ತು ಮಾರುಕಟ್ಟೆ ಬೇಡಿಕೆ ಯೋಜನೆ.",
      descEn: "Plan the right crops for each season with guidance on planting schedules, field conditions, and expected yields.",
      imageLabelKn: "ಕೃಷಿ ತಜ್ಞರ ಕ್ಷೇತ್ರ ಪರಿಶೀಲನೆ & ಬೆಳೆ ಯೋಜನೆ",
      imageLabelEn: "Agronomy Field Inspection & Crop Planning",
    },
    {
      id: "irrigation-management",
      titleKn: "ಹನಿ ನೀರಾವರಿ & ಜಲ ಸಂರಕ್ಷಣೆ",
      titleEn: "Irrigation Management",
      descKn: "ಕಡಿಮೆ ನೀರಿನಲ್ಲಿ ಸಮೃದ್ಧ ಬೆಳೆ ಪಡೆಯಲು ಆಧುನಿಕ ಹನಿ ನೀರಾವರಿ, ತುಂತುರು ಪದ್ಧತಿ ಮತ್ತು ಸೋಲಾರ್ ಪಂಪ್ ನೆರವು.",
      descEn: "Use water efficiently with modern irrigation planning for healthier crops and minimal water waste.",
      imageLabelKn: "ಆಧುನಿಕ ಹನಿ ಮತ್ತು ತುಂತುರು ನೀರಾವರಿ ಘಟಕ",
      imageLabelEn: "Modern Drip & Sprinkler Irrigation Unit",
    },
  ];

  return (
    <section 
      className="bg-white text-slate-900 py-8 sm:py-12 lg:py-14 border-b border-slate-100"
      aria-label="Our Farming Solutions Section"
    >
      <div className="w-full px-5 sm:px-8 md:px-10 lg:px-12 xl:px-16 2xl:px-20 max-w-7xl mx-auto">
        
        {/* =========================================================
            HEADER (Exact Reference Screenshot 5)
            ========================================================= */}
        <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-xs font-bold text-emerald-800 uppercase mb-3">
            <Leaf className="w-3.5 h-3.5 text-emerald-600" />
            <span>{language === "kn" ? "ರೈತರಿಗಾಗಿ ನಮ್ಮ ಸೇವೆಗಳು" : "Our Farming Solutions"}</span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight mb-4">
            {language === "kn"
              ? "ರೈತರ ಹೊಲಕ್ಕೇ ತಲುಪುವ ಸಮಗ್ರ ಕೃಷಿ ಸೇವೆಗಳು"
              : "Agricultural Services Built Around Your Farm"}
          </h2>

          <p className="text-slate-600 text-sm sm:text-base lg:text-lg leading-relaxed">
            {language === "kn"
              ? "ಮಣ್ಣಿನ ಫಲವತ್ತತೆ ಹೆಚ್ಚಿಸಲು, ಬೆಳೆ ರಕ್ಷಿಸಲು ಮತ್ತು ರೈತರ ಕೃಷಿ ನಿರ್ವಹಣೆಯನ್ನು ಸುಲಭ ಹಾಗೂ ಲಾಭದಾಯಕವಾಗಿಸಲು ಪ್ರಾಯೋಗಿಕ ಸೇವೆಗಳು."
              : "Discover practical agricultural services designed to improve soil quality, strengthen crops, and make farm management easier."}
          </p>
        </div>

        {/* =========================================================
            5-CARD SERVICES ROW (Horizontal scroll on mobile, responsive grid)
            ========================================================= */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5 sm:gap-6">
          {services.map((item, idx) => (
            <div
              key={idx}
              className="flex flex-col justify-between rounded-2xl overflow-hidden border border-slate-200 bg-white shadow-sm hover:shadow-xl transition-all duration-300 group"
            >
              <div>
                {/* Top Service Image Placeholder */}
                <div className="relative w-full overflow-hidden bg-slate-100">
                  <ImagePlaceholder
                    label={language === "kn" ? item.imageLabelKn : item.imageLabelEn}
                    height="h-44 sm:h-48"
                    className="rounded-none border-none bg-slate-100 group-hover:scale-105 transition-transform duration-500"
                  />
                </div>

                {/* Content */}
                <div className="p-4 sm:p-5">
                  <h3 className="text-base sm:text-lg font-bold text-slate-900 tracking-tight leading-snug mb-2 group-hover:text-emerald-700 transition-colors">
                    {language === "kn" ? item.titleKn : item.titleEn}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    {language === "kn" ? item.descKn : item.descEn}
                  </p>
                </div>
              </div>

              {/* Action Button: Book Services -> */}
              <div className="p-4 sm:p-5 pt-0">
                <Link
                  href="#talk-to-us"
                  className="inline-flex items-center justify-center gap-1.5 w-full py-2.5 px-4 rounded-xl bg-[#2e7d32] hover:bg-[#1b5e20] text-white text-xs sm:text-sm font-semibold transition-colors shadow-sm group-hover:shadow"
                >
                  <span>{language === "kn" ? "ಸೇವೆ ನೋಂದಾಯಿಸಿ" : "Book Services"}</span>
                  <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
                </Link>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}

