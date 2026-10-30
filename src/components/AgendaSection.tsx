"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";
import ImagePlaceholder from "@/components/common/ImagePlaceholder";
import { 
  TrendingUp, 
  HeartHandshake, 
  GraduationCap, 
  ArrowRight 
} from "lucide-react";

interface AgendaItem {
  id: string;
  icon: React.ReactNode;
  titleKn: string;
  titleEn: string;
  descKn: string;
  descEn: string;
  imageLabelKn: string;
  imageLabelEn: string;
}

export default function AgendaSection() {
  const { language, t } = useLanguage();

  // 1st card open by default as requested
  const [activeCard, setActiveCard] = useState<number>(0);

  const agendaItems: AgendaItem[] = [
    {
      id: "economic-prosperity",
      icon: (
        <div className="w-12 h-12 rounded-xl bg-amber-50 border border-amber-200/60 flex items-center justify-center text-amber-700">
          <TrendingUp className="w-6 h-6" />
        </div>
      ),
      titleKn: "ರೈತರ ಆರ್ಥಿಕ ಸಮೃದ್ಧಿ & ರಫ್ತು",
      titleEn: "Economic prosperity",
      descKn: "ಕಲಬುರಗಿಯ ತೊಗರಿ ಬೆಳೆಗಾರರಿಗೆ ಜಾಗತಿಕ ರಫ್ತು ಸಂಪರ್ಕ, ನ್ಯಾಯಯುತ ಬೆಂಬಲ ಬೆಲೆ ಹಾಗೂ ಸ್ಥಳೀಯ ಕೈಗಾರಿಕೆಗಳ ಅಭಿವೃದ್ಧಿ.",
      descEn: "We will support businesses, encourage agricultural export investment, and create quality jobs in Kalaburagi.",
      imageLabelKn: "ಕಲಬುರಗಿ ತೊಗರಿ ರಫ್ತು & ಕೃಷಿ ಮಾರುಕಟ್ಟೆ",
      imageLabelEn: "Farmer Export & Agricultural Hub",
    },
    {
      id: "affordable-healthcare",
      icon: (
        <div className="w-12 h-12 rounded-xl bg-rose-50 border border-rose-200/60 flex items-center justify-center text-rose-700">
          <HeartHandshake className="w-6 h-6" />
        </div>
      ),
      titleKn: "ಉಚಿತ & ಗುಣಮಟ್ಟದ ಆರೋಗ್ಯ ಸೇವೆ",
      titleEn: "Affordable healthcare",
      descKn: "ಗ್ರಾಮೀಣ ಭಾಗದ ಜನರಿಗೆ ಸುಲಭವಾಗಿ ಲಭ್ಯವಾಗುವ ಪ್ರಾಥಮಿಕ ಚಿಕಿತ್ಸಾ ಕೇಂದ್ರಗಳು, ಸಂಚಾರಿ ಆಸ್ಪತ್ರೆ ಮತ್ತು ಉಚಿತ ಔಷಧಿ ವಿತರಣೆ.",
      descEn: "We are committed to expanding access to quality healthcare, primary clinics, and ensuring families thrive.",
      imageLabelKn: "ಗ್ರಾಮೀಣ ಉಚಿತ ಆರೋಗ್ಯ ಶಿಬಿರ",
      imageLabelEn: "Community Health & Clinic Center",
    },
    {
      id: "education-excellence",
      icon: (
        <div className="w-12 h-12 rounded-xl bg-blue-50 border border-blue-200/60 flex items-center justify-center text-blue-700">
          <GraduationCap className="w-6 h-6" />
        </div>
      ),
      titleKn: "ಉತ್ತಮ ಶಿಕ್ಷಣ & ಯುವ ಕೌಶಲ್ಯ",
      titleEn: "Education excellence",
      descKn: "ಸರ್ಕಾರಿ ಶಾಲೆಗಳ ಆಧುನೀಕರಣ, ಡಿಜಿಟಲ್ ಗ್ರಂಥಾಲಯಗಳು ಹಾಗೂ ಯುವಜನತೆಗೆ ಉದ್ಯೋಗಾವಕಾಶ ತರಬೇತಿ ಕೇಂದ್ರಗಳು.",
      descEn: "Improving educational infrastructure, skill development for youth, and preparing modern learning environments.",
      imageLabelKn: "ಡಿಜಿಟಲ್ ಗ್ರಂಥಾಲಯ & ಯುವ ತರಬೇತಿ",
      imageLabelEn: "Youth Skill & Modern Learning Center",
    },
  ];

  return (
    <section
      id="agenda"
      className="relative z-10 bg-white text-slate-900 pt-4 sm:pt-6 lg:pt-8 pb-12 sm:pb-16 lg:pb-20"
      aria-label="Political Agenda Section"
    >
      {/* Anchor for Farmer Export Hub */}
      <div id="farmer-export" className="absolute -top-24" />
      <div className="w-full px-5 sm:px-8 md:px-10 lg:px-12 xl:px-16 2xl:px-20">
        
        {/* Top Header Row (Matching Reference Screenshot) */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8 sm:mb-10">
          <div className="max-w-2xl">
            {/* Small label with dot */}
            <span className="text-xs sm:text-sm font-bold tracking-widest text-slate-800 uppercase flex items-center gap-1.5 mb-3">
              <span className="w-1.5 h-1.5 rounded-full bg-slate-900" />
              {language === "kn" ? "ನಮ್ಮ ಆದ್ಯತೆಗಳು" : "POLITICAL AGENDA"}
            </span>

            {/* Big Headline */}
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-[54px] font-extrabold text-slate-900 tracking-tight leading-[1.15]">
              {language === "kn" ? (
                <>
                  ಬಲಿಷ್ಠ ಭವಿಷ್ಯಕ್ಕಾಗಿ{" "}
                  <span className="block mt-1">ನಮ್ಮ ಆದ್ಯತೆಗಳು</span>
                </>
              ) : (
                <>
                  Our priorities for a{" "}
                  <span className="block mt-1">stronger future</span>
                </>
              )}
            </h2>
          </div>

          {/* Top-Right "All Agenda ->" Pill Button (Matching Screenshot) */}
          <Link
            href="#all-agenda"
            className="inline-flex items-center gap-3 px-5 py-2.5 rounded-full border border-slate-300 hover:border-slate-900 text-slate-800 hover:text-slate-950 font-semibold text-xs sm:text-sm transition-all duration-200 self-start md:self-auto group shrink-0"
          >
            <span>{t("ಎಲ್ಲಾ ಆದ್ಯತೆಗಳು", "All Agenda")}</span>
            <span className="w-6 h-6 rounded-full bg-slate-900 text-white flex items-center justify-center transition-transform group-hover:translate-x-1 shrink-0">
              <ArrowRight className="w-3.5 h-3.5" />
            </span>
          </Link>
        </div>

        {/* Expandable Accordion Cards Container */}
        {/* On Desktop: flex-row where hovered card expands horizontally */}
        {/* On Mobile: vertical stack where tapped card expands smoothly */}
        <div className="flex flex-col lg:flex-row gap-5 sm:gap-6 min-h-[380px] lg:h-[400px] xl:h-[420px] transition-all">
          {agendaItems.map((item, index) => {
            const isExpanded = activeCard === index;

            return (
              <div
                key={item.id}
                onMouseEnter={() => setActiveCard(index)}
                onClick={() => setActiveCard(index)}
                className={`
                  relative rounded-2xl sm:rounded-3xl border border-slate-200/90 bg-white
                  p-6 sm:p-7 flex flex-col justify-between overflow-hidden
                  transition-all duration-500 ease-in-out cursor-pointer select-none
                  ${isExpanded 
                    ? "lg:flex-[2.4] xl:flex-[2.6] shadow-xl border-slate-300/80 ring-1 ring-slate-200" 
                    : "lg:flex-[1] hover:border-slate-300 hover:bg-slate-50/50 shadow-sm"
                  }
                `}
              >
                {/* Content Structure for Non-Expanded and Expanded states */}
                <div className={`flex flex-col h-full justify-between ${isExpanded ? "lg:flex-row lg:gap-6 lg:items-center" : ""}`}>
                  
                  {/* Left part of card: Icon + Title + Description */}
                  <div className={`flex flex-col justify-between h-full ${isExpanded ? "lg:max-w-[50%] lg:pr-2" : "w-full"}`}>
                    {/* Top Icon */}
                    <div className="mb-8 lg:mb-0">
                      {item.icon}
                    </div>

                    {/* Bottom Title & Description */}
                    <div className="mt-auto pt-6">
                      <h3 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight leading-snug mb-2">
                        {language === "kn" ? item.titleKn : item.titleEn}
                      </h3>
                      <p className="text-xs sm:text-sm text-slate-500 leading-relaxed line-clamp-3">
                        {language === "kn" ? item.descKn : item.descEn}
                      </p>
                    </div>
                  </div>

                  {/* Right part of card: Image (Revealed when Expanded) */}
                  {isExpanded && (
                    <div className="mt-6 lg:mt-0 w-full lg:w-[50%] h-[240px] sm:h-[280px] lg:h-full shrink-0 animate-in fade-in zoom-in-95 duration-500">
                      <div className="w-full h-full rounded-xl sm:rounded-2xl overflow-hidden border border-slate-200/80 bg-slate-100">
                        <ImagePlaceholder
                          label={language === "kn" ? item.imageLabelKn : item.imageLabelEn}
                          height="h-full"
                          className="rounded-xl sm:rounded-2xl border-none bg-slate-100"
                        />
                      </div>
                    </div>
                  )}

                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}

