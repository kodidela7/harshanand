"use client";

import React from "react";
import { useLanguage } from "@/context/LanguageContext";
import ImagePlaceholder from "@/components/common/ImagePlaceholder";

interface Milestone {
  year: string;
  titleKn: string;
  titleEn: string;
  descriptionKn: string;
  descriptionEn: string;
  imageLabelKn: string;
  imageLabelEn: string;
  dotColor: string;
}

export default function AboutTimeline() {
  const { language } = useLanguage();

  const milestones: Milestone[] = [
    {
      year: "2012",
      titleKn: "ಜನಸೇವೆಯ ತಳಹದಿ ಮತ್ತು ಧ್ಯೇಯ",
      titleEn: "Foundation and vision",
      descriptionKn:
        "ಗ್ರಾಮೀಣ ಯುವಕರು ಮತ್ತು ಸಾರ್ವಜನಿಕರ ಸಮಸ್ಯೆಗಳನ್ನು ಆಲಿಸಲು ತಳಮಟ್ಟದ ಜನಸಂಪರ್ಕ ಯಾತ್ರೆ ಆರಂಭ. ಪ್ರಾಮಾಣಿಕತೆ, ನೈತಿಕತೆ ಮತ್ತು ನೇರ ಸಂವಾದವೇ ನಮ್ಮ ಆಂದೋಲನದ ಪ್ರಮುಖ ಅಡಿಪಾಯವಾಯಿತು.",
      descriptionEn:
        "Our movement began with a vision to serve citizens through integrity, active grassroots leadership, and direct community engagement across Kalaburagi villages.",
      imageLabelKn: "2012: ಶ್ರೀ ಹರ್ಷಾನಂದ ಗುತ್ತೇದಾರ ಅವರ ಮೊದಲ ಗ್ರಾಮ ಸಭೆ ಭಾಷಣ",
      imageLabelEn: "2012: Harshanand Guttedar addressing early village assemblies",
      dotColor: "bg-[#b91c1c] ring-red-100",
    },
    {
      year: "2016",
      titleKn: "ತೊಗರಿ ಬೆಳೆಗಾರರ ಜಾಗೃತಿ & ಸಂಘಟನೆ",
      titleEn: "Growing grassroots presence",
      descriptionKn:
        "ಕಲಬುರಗಿಯ ತೊಗರಿ ಬೆಳೆಗಾರರ ನ್ಯಾಯಯುತ ಬೆಂಬಲ ಬೆಲೆ (MSP) ಮತ್ತು ನೀರಾವರಿ ಹಕ್ಕುಗಳಿಗಾಗಿ ರಾಜ್ಯವ್ಯಾಪಿ ಧ್ವನಿ ಎತ್ತಲಾಯಿತು. ಸಾವಿರಾರು ರೈತರನ್ನು ಒಗ್ಗೂಡಿಸಿ ಬೃಹತ್ ರೈತ ಜಾಗೃತಿ ಅಭಿಯಾನ ಯಶಸ್ವಿಯಾಯಿತು.",
      descriptionEn:
        "We expanded our presence across the region, connecting directly with farming communities, advocating for fair red gram MSP, and strengthening grassroots support.",
      imageLabelKn: "2016: ಕಲಬುರಗಿ ರೈತರ ಹಕ್ಕುಗಳ ಹೋರಾಟ ಮತ್ತು ಸಮಾವೇಶ",
      imageLabelEn: "2016: Leading the Kalaburagi farmer rights movement",
      dotColor: "bg-[#b91c1c] ring-red-100",
    },
    {
      year: "2020",
      titleKn: "ಬಿಕ್ಕಟ್ಟಿನ ಸಂದರ್ಭದಲ್ಲಿ ಜನಪರ ಸೇವೆ & ಪರಿಹಾರ",
      titleEn: "Achieving key milestones & Crisis leadership",
      descriptionKn:
        "ಕೋವಿಡ್ ಸಂಕಷ್ಟದ ಸಮಯದಲ್ಲಿ ಮನೆಮನೆಗೆ ಆಹಾರ ಧಾನ್ಯ, ಉಚಿತ ಆಕ್ಸಿಜನ್ ಕಾನ್ಸೆಂಟ್ರೇಟರ್ ಮತ್ತು ತುರ್ತು ಆಸ್ಪತ್ರೆ ನೆರವು ಒದಗಿಸಿದ ಮಾದರಿ ಸೇವೆ. ನೂರಾರು ರೈತರಿಗೆ ಸ್ಥಳದಲ್ಲೇ ಮಾರುಕಟ್ಟೆ ಕಲ್ಪಿಸಲಾಯಿತು.",
      descriptionEn:
        "The movement gained widespread trust through swift humanitarian action during critical times, delivering essential rations, healthcare support, and direct market access for farmers.",
      imageLabelKn: "2020: ಕೋವಿಡ್ ಸಂಕಷ್ಟದಲ್ಲಿ ಸಾರ್ವಜನಿಕ ಪರಿಹಾರ & ಉಚಿತ ವೈದ್ಯಕೀಯ ಶಿಬಿರಗಳು",
      imageLabelEn: "2020: Humanitarian relief initiatives and public welfare",
      dotColor: "bg-[#b91c1c] ring-red-100",
    },
    {
      year: "2024 - ಇಂದಿಗೆ",
      titleEn: "Agricultural export revolution & Digital governance",
      titleKn: "ಕಲಬುರಗಿ ತೊಗರಿ ರಫ್ತು ಕ್ರಾಂತಿ & ಡಿಜಿಟಲ್ ಜನಸಂಪರ್ಕ",
      descriptionKn:
        "ಭೌಗೋಳಿಕ ಮಾನ್ಯತೆ (GI Tag) ಹೊಂದಿರುವ ಕಲಬುರಗಿ ತೊಗರಿ ಬೆಳೆಯನ್ನು ಜಾಗತಿಕ ಮಾರುಕಟ್ಟೆಗೆ ಕೊಂಡೊಯ್ಯುವ ಮಹತ್ವಾಕಾಂಕ್ಷಿ ಯೋಜನೆ. ನಾಗರಿಕರ ಕುಂದುಕೊರತೆಗಳ ಶೀಘ್ರ ಪರಿಹಾರಕ್ಕೆ 24/7 ಡಿಜಿಟಲ್ ಕಚೇರಿ ಸ್ಥಾಪನೆ.",
      descriptionEn:
        "Pioneering export-grade branding for Kalaburagi's GI-tagged red gram and establishing modern, 24/7 digital grievance cells for prompt and accountable citizen service.",
      imageLabelKn: "2024: ತೊಗರಿ ರಫ್ತು ಕೇಂದ್ರ ಮತ್ತು ಆಧುನಿಕ ಜನಸಂಪರ್ಕ ಕಚೇರಿ ಉದ್ಘಾಟನೆ",
      imageLabelEn: "2024: Launching agricultural export clusters and digital helpline",
      dotColor: "bg-emerald-600 ring-emerald-100",
    },
  ];

  return (
    <section 
      className="bg-white text-slate-900 py-16 sm:py-24 lg:py-28 border-b border-slate-100"
      aria-label="Our History and Journey Timeline"
    >
      <div className="w-full px-5 sm:px-8 md:px-10 lg:px-12 xl:px-16 2xl:px-20 max-w-7xl mx-auto">
        
        {/* =========================================================
            HEADER (Exact Reference Screenshot 2)
            ========================================================= */}
        <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-20">
          <span className="text-xs sm:text-sm font-bold tracking-widest text-slate-800 uppercase flex items-center justify-center gap-1.5 mb-3">
            <span className="w-2 h-2 rounded-full bg-[#b91c1c]" />
            {language === "kn" ? "ನಮ್ಮ ಇತಿಹಾಸ" : "OUR HISTORY"}
          </span>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">
            {language === "kn" 
              ? "ನಾಯಕತ್ವ ಮತ್ತು ಪ್ರಗತಿಯ ಸಾರ್ಥಕ ಹೆಜ್ಜೆಗಳು" 
              : "A journey of leadership and progress"}
          </h2>
        </div>

        {/* =========================================================
            TIMELINE CONTENT: 
            Desktop: 3-column [Image | Line & Dots | Year + Text]
            Mobile: Responsive vertical timeline with connected line
            ========================================================= */}
        <div className="relative">
          
          {/* Desktop Central Continuous Vertical Line */}
          <div className="hidden lg:block absolute left-[45%] top-8 bottom-16 w-[2px] bg-slate-200 -translate-x-1/2 z-0" />

          {/* Timeline Milestones List */}
          <div className="space-y-16 sm:space-y-20 lg:space-y-24">
            {milestones.map((milestone, idx) => (
              <div 
                key={idx}
                className="relative lg:grid lg:grid-cols-12 lg:gap-8 xl:gap-12 items-center"
              >
                
                {/* 1. LEFT: Milestone Image (lg:col-span-5) */}
                <div className="lg:col-span-5 mb-6 lg:mb-0">
                  <div className="relative w-full rounded-2xl sm:rounded-3xl overflow-hidden shadow-lg border border-slate-200/90 bg-slate-50 group hover:shadow-xl transition-all duration-300">
                    <ImagePlaceholder
                      label={language === "kn" ? milestone.imageLabelKn : milestone.imageLabelEn}
                      height="h-[220px] sm:h-[280px] lg:h-[300px]"
                      className="rounded-2xl sm:rounded-3xl border-none"
                    />
                    
                    {/* Corner Tag */}
                    <div className="absolute top-3 right-3 px-3 py-1 rounded-full bg-white/90 backdrop-blur-sm border border-slate-200 text-xs font-bold text-slate-700 shadow-sm">
                      {milestone.year === "2024 - ಇಂದಿಗೆ" && language === "en" ? "2024 - Present" : milestone.year}
                    </div>
                  </div>
                </div>

                {/* 2. CENTER: Timeline Dot & Connecting Node (lg:col-span-1) */}
                <div className="hidden lg:flex lg:col-span-1 justify-center relative z-10">
                  <div className={`w-5 h-5 rounded-full ${milestone.dotColor} ring-8 shadow-md flex items-center justify-center transition-transform hover:scale-125`}>
                    <div className="w-1.5 h-1.5 rounded-full bg-white" />
                  </div>
                </div>

                {/* 3. RIGHT: Year + Title + Description (lg:col-span-6) */}
                <div className="lg:col-span-6 flex flex-col justify-center space-y-2 sm:space-y-3 lg:pl-4">
                  {/* Big Year Heading (Exact style from screenshot: 2012, 2016, 2020) */}
                  <div className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-400/80 tracking-tight leading-none">
                    {milestone.year === "2024 - ಇಂದಿಗೆ" && language === "en" ? "2024" : milestone.year}
                  </div>

                  {/* Milestone Title */}
                  <h3 className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-slate-900 tracking-tight pt-1">
                    {language === "kn" ? milestone.titleKn : milestone.titleEn}
                  </h3>

                  {/* Milestone Description */}
                  <p className="text-slate-600 text-sm sm:text-base lg:text-[1.05rem] leading-relaxed max-w-xl">
                    {language === "kn" ? milestone.descriptionKn : milestone.descriptionEn}
                  </p>
                </div>

              </div>
            ))}
          </div>

        </div>

      </div>
    </section>
  );
}

