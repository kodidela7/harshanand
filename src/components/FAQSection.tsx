"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";
import { ArrowRight, Plus, Minus } from "lucide-react";

interface FAQItem {
  id: string;
  num: string;
  qKn: string;
  qEn: string;
  aKn: string;
  aEn: string;
}

export default function FAQSection() {
  const { language, t } = useLanguage();

  // First FAQ open by default as in screenshot
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const faqs: FAQItem[] = [
    {
      id: "goal",
      num: "01",
      qKn: "ಶ್ರೀ ಹರ್ಷಾನಂದ ಗುತ್ತೇದಾರ ಅವರ ಸಾರ್ವಜನಿಕ ಚಳವಳಿಯ ಮುಖ್ಯ ಗುರಿ ಏನು?",
      qEn: "What is the main goal of this campaign?",
      aKn: "ನಮ್ಮ ಮುಖ್ಯ ಗುರಿ ಸಮರ್ಥ ನಾಯಕತ್ವ, ಸದೃಢ ಸಮುದಾಯ, ಆರ್ಥಿಕ ಸಮೃದ್ಧಿ, ಕಲಬುರಗಿ ತೊಗರಿಗೆ ಜಾಗತಿಕ ರಫ್ತು ಅವಕಾಶಗಳು, ಗುಣಮಟ್ಟದ ಶಿಕ್ಷಣ ಮತ್ತು ಎಲ್ಲರಿಗೂ ಪಾರದರ್ಶಕ ಸಾರ್ವಜನಿಕ ಸೇವೆಗಳನ್ನು ಒದಗಿಸುವುದಾಗಿದೆ.",
      aEn: "Our goal is to create positive change through effective leadership, stronger communities, economic growth, agricultural export access for Kalaburagi farmers, quality education, and improved public services for everyone.",
    },
    {
      id: "farmers",
      num: "02",
      qKn: "ಕಲಬುರಗಿಯ ತೊಗರಿ ಬೆಳೆಗಾರರಿಗೆ ಯಾವ ರೀತಿಯ ರಫ್ತು ಮಾರ್ಗದರ್ಶನ ನೀಡಲಾಗುತ್ತದೆ?",
      qEn: "What export support is provided to local pulse farmers?",
      aKn: "ಸ್ಥಳೀಯ ರೈತ ಉತ್ಪಾದಕ ಸಂಘಗಳಿಗೆ (FPOs) APEDA ರಫ್ತು ಪರವಾನಗಿ, ಜಿಐ ಟ್ಯಾಗ್ ಗುಣಮಟ್ಟ ಪ್ರಮಾಣೀಕರಣ, ಆಧುನಿಕ ಗೋದಾಮು ಶೇಖರಣೆ ಹಾಗೂ ಅಂತಾರಾಷ್ಟ್ರೀಯ ಮಾರುಕಟ್ಟೆ ಖರೀದಿದಾರರೊಂದಿಗೆ ನೇರ ಸಂಪರ್ಕ ಕಲ್ಪಿಸಲಾಗುತ್ತದೆ.",
      aEn: "We assist Farmer Producer Organizations (FPOs) with APEDA exporter licensing, GI-tag quality compliance, modern storage logistics, and direct linkage to international buyers without middleman cuts.",
    },
    {
      id: "grievance",
      num: "03",
      qKn: "ನಾಗರಿಕರು ತಮ್ಮ ಕುಂದುಕೊರತೆಗಳನ್ನು ಹೇಗೆ ಸಲ್ಲಿಸಬಹುದು ಅಥವಾ ಭೇಟಿಗೆ ವಿನಂತಿಸಬಹುದೇ?",
      qEn: "How can citizens submit a grievance or request a meeting?",
      aKn: "ಈ ಜಾಲತಾಣದ ಮೂಲಕ ಅಥವಾ ನಮ್ಮ ಕಲಬುರಗಿ ಕಚೇರಿಯನ್ನು ನೇರವಾಗಿ ಸಂಪರ್ಕಿಸಿ ಕುಡಿಯುವ ನೀರು, ರಸ್ತೆ, ಶಿಕ್ಷಣ ಅಥವಾ ಸಾರ್ವಜನಿಕ ಸಮಸ್ಯೆಗಳ ಅರ್ಜಿ ಸಲ್ಲಿಸಬಹುದು. ಪ್ರತಿ ಅರ್ಜಿಗೂ ಟ್ರ್ಯಾಕಿಂಗ್ ಸಂಖ್ಯೆ ನೀಡಿ ನೇರ ಪರಿಹಾರ ನೀಡಲಾಗುತ್ತದೆ.",
      aEn: "Citizens can submit civic concerns directly via our online portal or by calling our Kalaburagi helpline. Every petition is digitally tracked and scheduled for direct consultation.",
    },
    {
      id: "volunteer",
      num: "04",
      qKn: "ಯುವಜನರು ಸ್ವಯಂಸೇವಕರಾಗಿ ಚಳವಳಿಯಲ್ಲಿ ಹೇಗೆ ಭಾಗವಹಿಸಬಹುದು?",
      qEn: "How can youth and volunteers get involved?",
      aKn: "ಗ್ರಾಮೀಣ ಕೌಶಲ್ಯ ಕಾರ್ಯಾಗಾರಗಳು, ಉಚಿತ ಆರೋಗ್ಯ ಶಿಬಿರಗಳು, ರೈತ ಸಂಪರ್ಕ ಸಭೆಗಳು ಹಾಗೂ ಸಮಾಜಸೇವಾ ಕಾರ್ಯಕ್ರಮಗಳಲ್ಲಿ ಯುವಕರು ನಮ್ಮ ತಂಡದೊಂದಿಗೆ ಸ್ವಯಂಸೇವಕರಾಗಿ ಸೇರಬಹುದು.",
      aEn: "Youth can join our grassroots field teams participating in community medical camps, farmer advisory workshops, and digital education mentorship programs across Kalaburagi villages.",
    },
    {
      id: "updates",
      num: "05",
      qKn: "ಕ್ಷೇತ್ರದ ಅಭಿವೃದ್ಧಿ ಕಾಮಗಾರಿಗಳ ಬಗ್ಗೆ ನಿಯಮಿತ ಮಾಹಿತಿ ಹೇಗೆ ಪಡೆಯುವುದು?",
      qEn: "How can I stay updated on constituency news & schemes?",
      aKn: "ನಮ್ಮ ಜಾಲತಾಣದ 'ಸುದ್ದಿ & ನವೀಕರಣ' ಪುಟ, ಅಧಿಕೃತ ಸಾಮಾಜಿಕ ಜಾಲತಾಣಗಳು ಹಾಗೂ ವಾಟ್ಸಾಪ್ ಮಾಹಿತಿ ಕೇಂದ್ರದ ಮೂಲಕ ಕ್ಷೇತ್ರದ ಪ್ರತಿಯೊಂದು ಅಭಿವೃದ್ಧಿ ಕಾಮಗಾರಿಯ ನೇರ ಮಾಹಿತಿ ಪಡೆಯಬಹುದು.",
      aEn: "You can follow our regular updates on this website, connect via official WhatsApp broadcast, or follow our social channels for latest public reports and government schemes.",
    },
    {
      id: "resources",
      num: "06",
      qKn: "ಸಾರ್ವಜನಿಕ ಅನುದಾನ ಮತ್ತು ಅಭಿವೃದ್ಧಿ ನಿಧಿಯ ಬಳಕೆ ಹೇಗೆ ನಡೆಯುತ್ತದೆ?",
      qEn: "How are public development funds monitored?",
      aKn: "ಪ್ರತಿಯೊಂದು ಸಾರ್ವಜನಿಕ ಕಾರ್ಯಕ್ಕೂ ಪಾರದರ್ಶಕತೆ ಕಾಯ್ದುಕೊಳ್ಳಲಾಗಿದ್ದು, ಅನುದಾನದ ಸಮರ್ಪಕ ಬಳಕೆ ಮತ್ತು ಗುಣಮಟ್ಟವನ್ನು ಸಾಮಾಜಿಕ ಲೆಕ್ಕಪರಿಶೋಧನೆ ಮೂಲಕ ನಿರಂತರವಾಗಿ ಪರಿಶೀಲಿಸಲಾಗುತ್ತದೆ.",
      aEn: "Every community initiative strictly adheres to transparent accountability standards, ensuring public funds directly benefit grassroots welfare with measurable outcomes.",
    },
  ];

  return (
    <section
      id="faq"
      className="relative z-10 bg-white text-slate-900 py-16 sm:py-24 lg:py-28"
      aria-label="Frequently Asked Questions Section"
    >
      <div className="w-full px-5 sm:px-8 md:px-10 lg:px-12 xl:px-16 2xl:px-20">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
          
          {/* =========================================================
              LEFT COLUMN: Title + Info Card (Matching Screenshot)
              ========================================================= */}
          <div className="lg:col-span-5 flex flex-col justify-between">
            {/* Header info */}
            <div>
              <span className="text-xs sm:text-sm font-bold tracking-widest text-slate-800 uppercase flex items-center gap-1.5 mb-3">
                <span className="w-1.5 h-1.5 rounded-full bg-slate-900" />
                {language === "kn" ? "ಸಾಮಾನ್ಯ ಪ್ರಶ್ನೆಗಳು" : "FAQ'S"}
              </span>

              <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-[52px] font-extrabold text-slate-900 tracking-tight leading-[1.15] mb-8">
                {language === "kn" ? (
                  <>
                    ಬೆಂಬಲಿಗರಿಂದ{" "}
                    <span className="block mt-1">ಸಾಮಾನ್ಯ ಪ್ರಶ್ನೆಗಳು</span>
                  </>
                ) : (
                  <>
                    Common questions{" "}
                    <span className="block mt-1">from supporters</span>
                  </>
                )}
              </h2>
            </div>

            {/* Bottom Card: Still have any question? */}
            <div 
              className="rounded-3xl p-7 sm:p-9 mt-6 lg:mt-12 shadow-sm border border-slate-200/60"
              style={{ backgroundColor: "#f4f2ee" }}
            >
              <h3 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight mb-2">
                {language === "kn" ? "ಇನ್ನೂ ಪ್ರಶ್ನೆಗಳಿವೆಯೇ?" : "Still have any question?"}
              </h3>
              <p className="text-slate-600 text-sm sm:text-base leading-relaxed mb-6">
                {language === "kn"
                  ? "ಯಾವುದೇ ಮಾಹಿತಿ, ಸಲಹೆ ಅಥವಾ ಸಮಸ್ಯೆಯಿದ್ದಲ್ಲಿ ನಮ್ಮ ಕಚೇರಿಯನ್ನು ನೇರವಾಗಿ ಸಂಪರ್ಕಿಸಿ."
                  : "Directly reach our Kalaburagi office team for answers, grievances, or meeting requests."}
              </p>

              <Link
                href="#contact"
                className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-[#18181b] hover:bg-[#27272a] text-white font-semibold text-xs sm:text-sm transition-all duration-200 shadow-md group shrink-0"
              >
                <span>{t("ಸಂಪರ್ಕಿಸಿ", "Get In Touch")}</span>
                <span className="w-6 h-6 rounded-full bg-white text-slate-900 flex items-center justify-center transition-transform group-hover:translate-x-1 shrink-0">
                  <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </Link>
            </div>
          </div>

          {/* =========================================================
              RIGHT COLUMN: Interactive Accordion List (Matching Screenshot)
              ========================================================= */}
          <div className="lg:col-span-7 space-y-3.5 sm:space-y-4">
            {faqs.map((faq, index) => {
              const isOpen = openIndex === index;

              return (
                <div
                  key={faq.id}
                  className="rounded-2xl transition-all duration-300 overflow-hidden"
                  style={{ backgroundColor: "#f4f2ee" }}
                >
                  {/* Question Button */}
                  <button
                    onClick={() => toggleFAQ(index)}
                    className="w-full p-5 sm:p-6 text-left flex items-center justify-between gap-4 cursor-pointer focus:outline-none select-none group"
                    aria-expanded={isOpen}
                  >
                    <span className="text-base sm:text-lg font-bold text-slate-900 tracking-tight leading-snug group-hover:text-emerald-800 transition-colors">
                      {faq.num}. {language === "kn" ? faq.qKn : faq.qEn}
                    </span>

                    {/* +/- Toggle Capsule */}
                    <span className="w-8 h-8 rounded-full flex items-center justify-center text-slate-900 shrink-0 transition-transform">
                      {isOpen ? (
                        <Minus className="w-5 h-5 text-slate-900" />
                      ) : (
                        <Plus className="w-5 h-5 text-slate-900" />
                      )}
                    </span>
                  </button>

                  {/* Expanded Answer */}
                  {isOpen && (
                    <div className="px-5 sm:px-6 pb-6 pt-1 text-slate-600 text-sm sm:text-base leading-relaxed animate-in fade-in slide-in-from-top-1 duration-200">
                      <div className="pt-2 border-t border-slate-200/60">
                        {language === "kn" ? faq.aKn : faq.aEn}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

        </div>

      </div>
    </section>
  );
}

