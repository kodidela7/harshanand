"use client";

import React from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PageHeroBanner from "@/components/common/PageHeroBanner";
import ImagePlaceholder from "@/components/common/ImagePlaceholder";
import { useLanguage } from "@/context/LanguageContext";
import { Compass, Calendar, ArrowRight, Quote, Heart, CheckCircle2 } from "lucide-react";

export default function JourneyPage() {
  const { language } = useLanguage();

  const chapters = [
    {
      periodKn: "ಬಾಲ್ಯ & ಆರಂಭಿಕ ಜೀವನ",
      periodEn: "Early Life & Roots",
      titleKn: "ಆಳಂದದ ಮಣ್ಣಿನಲ್ಲಿ ಆರಂಭವಾದ ಜನಸೇವೆಯ ಸಂಸ್ಕಾರ",
      titleEn: "Rooted in the Soil and Heritage of Aland",
      descKn: "ಆಳಂದ ತಾಲೂಕಿನ ಕೃಷಿ ಹಿನ್ನೆಲೆಯ ಕುಟುಂಬದಲ್ಲಿ ಜನನ. ಕಷ್ಟದಲ್ಲಿರುವ ರೈತರ ನೋವು, ಗ್ರಾಮೀಣ ಜನರ ಸಮಸ್ಯೆಗಳನ್ನು ಹತ್ತಿರದಿಂದ ಕಂಡು ಬೆಳೆದ ಅನುಭವವೇ ಸಾರ್ವಜನಿಕ ಸೇವೆಗೆ ಪ್ರೇರಣೆ.",
      descEn: "Born into a respected family in Aland with deep agrarian roots. Witnessing firsthand the hardships of drought, pulse farmers, and rural youth laid the foundation for lifelong public service.",
      imageLabelKn: "ಬಾಲ್ಯ ಮತ್ತು ಆರಂಭಿಕ ವಿದ್ಯಾಭ್ಯಾಸದ ದಿನಗಳು",
      imageLabelEn: "Early Life, Heritage & Educational Roots",
    },
    {
      periodKn: "ವಿದ್ಯಾಭ್ಯಾಸ & ಯುವ ನಾಯಕತ್ವ",
      periodEn: "Education & Youth Mobilization",
      titleKn: "ಉನ್ನತ ಶಿಕ್ಷಣ ಮತ್ತು ಯುವ ಸಂಘಟನೆ",
      titleEn: "Higher Education & Guiding the Youth",
      descKn: "ಶಿಸ್ತುಬದ್ಧ ಶಿಕ್ಷಣ ಮತ್ತು ವಿದ್ಯಾರ್ಥಿ ದೆಸೆಯಲ್ಲೇ ಯುವಕರ ಹಕ್ಕುಗಳಿಗಾಗಿ ಧ್ವನಿ ಎತ್ತುವ ನಾಯಕತ್ವದ ಗುಣ. ಗ್ರಾಮೀಣ ಯುವಕರಲ್ಲಿ ಆತ್ಮವಿಶ್ವಾಸ ತುಂಬಲು ಶ್ರಮ.",
      descEn: "Pursuing higher education while actively mentoring rural youth. Advocating for employment coaching, digital literacy, and student sports facilities.",
      imageLabelKn: "ವಿದ್ಯಾರ್ಥಿ ಸಮ್ಮೇಳನ ಮತ್ತು ಯುವ ನಾಯಕತ್ವ",
      imageLabelEn: "Higher Education & Youth Leadership Forums",
    },
    {
      periodKn: "ರೈತರ ಹಕ್ಕುಗಳ ಹೋರಾಟ",
      periodEn: "Agrarian Mobilization",
      titleKn: "ಕಲಬುರಗಿ ತೊಗರಿ ಬೆಳೆಗಾರರ ಜಾಗೃತಿ ಅಭಿಯಾನ",
      titleEn: "Championing Red Gram Farmers' Rights & MSP",
      descKn: "ತೊಗರಿ ಬೆಳೆಗಾರರಿಗೆ ನ್ಯಾಯಯುತ ಬೆಂಬಲ ಬೆಲೆ ಮತ್ತು ರಫ್ತು ಸೌಲಭ್ಯಕ್ಕಾಗಿ ಹಳ್ಳಿಹಳ್ಳಿಗಳಿಗೆ ಪಾದಯಾತ್ರೆ. ದಲ್ಲಾಳಿಗಳ ಹಾವಳಿಯಿಂದ ರೈತರನ್ನು ರಕ್ಷಿಸಲು ನಿರಂತರ ಹೋರಾಟ.",
      descEn: "Leading statewide marches advocating for fair Minimum Support Price (MSP), APEDA licensing for pulse growers, and canal water rights for drought-hit taluks.",
      imageLabelKn: "ರೈತ ಪಾದಯಾತ್ರೆ ಮತ್ತು ಧರಣಿ ಸತ್ಯಾಗ್ರಹ",
      imageLabelEn: "Leading Farmer Rights Marches & Agrarian Rallies",
    },
    {
      periodKn: "ಜನನಾಯಕತ್ವ & ಭವಿಷ್ಯದ ಸಂಕಲ್ಪ",
      periodEn: "Leadership & Future Commitment",
      titleKn: "ಪಾರದರ್ಶಕ ಜನನಾಯಕನಾಗಿ ನಿರಂತರ ಸೇವೆ",
      titleEn: "Accountable Leadership & Vision 2030",
      descKn: "ಕಲಬುರಗಿಯ ಸಮಗ್ರ ಅಭಿವೃದ್ಧಿ, 24/7 ಜನಸಂಪರ್ಕ ಕಚೇರಿ ಮತ್ತು ಜಾಗತಿಕ ತೊಗರಿ ರಫ್ತು ಕೇಂದ್ರ ಸ್ಥಾಪನೆಯ ಮಹಾಸಂಕಲ್ಪದೊಂದಿಗೆ ಸಾಗುತ್ತಿರುವ ಸಾರ್ಥಕ ಹೆಜ್ಜೆಗಳು.",
      descEn: "Establishing open-door 24/7 secretariats, driving digital grievance redressal, and pioneering Kalaburagi as India's premier pulse export capital.",
      imageLabelKn: "ಸಾರ್ವಜನಿಕ ಸಮಾವೇಶದಲ್ಲಿ ಜನರಿಗೆ ವಂದನೆ",
      imageLabelEn: "Public Leader Addressing Kalyana Karnataka Assembly",
    },
  ];

  return (
    <main className="min-h-screen bg-white text-slate-900 relative overflow-x-hidden">
      <Navbar />

      <PageHeroBanner
        badgeKn="ಜೀವನ ಪಯಣ"
        badgeEn="LIFE & LEADERSHIP JOURNEY"
        titleKn={
          <>
            ಹರ್ಷಾನಂದ ಗುತ್ತೇದಾರ ಅವರ{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-amber-200 to-red-400">
              ಜೀವನ ಪಯಣ
            </span>
          </>
        }
        titleEn={
          <>
            The Inspiring Journey of{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-amber-200 to-red-400">
              Harshanand Guttedar
            </span>
          </>
        }
        subtitleKn="ಗ್ರಾಮೀಣ ಕೃಷಿ ಹಿನ್ನೆಲೆಯಿಂದ ಕಲಬುರಗಿಯ ವಿಶ್ವಾಸಾರ್ಹ ಜನನಾಯಕನಾಗಿ ಬೆಳೆದ ಸಾರ್ಥಕ ಸೇವಾ ಪಯಣದ ಮಹತ್ವದ ಘಟ್ಟಗಳು."
        subtitleEn="From humble roots in Aland to becoming a trusted voice for farmers and citizens across Kalyana Karnataka."
        breadcrumbLabelKn="ಜೀವನ ಪಯಣ"
        breadcrumbLabelEn="Journey"
        icon={Compass}
      />

      <section className="py-12 sm:py-16 lg:py-20 bg-white" aria-label="Journey Chapters">
        <div className="w-full px-5 sm:px-8 md:px-10 lg:px-12 xl:px-16 2xl:px-20 max-w-5xl mx-auto space-y-16">
          
          {/* Opening Personal Reflection Quote */}
          <div className="p-8 sm:p-10 rounded-3xl bg-amber-50/80 border border-amber-200/90 shadow-sm relative">
            <Quote className="w-10 h-10 text-amber-500/30 absolute top-6 right-6" />
            <p className="text-base sm:text-lg lg:text-xl font-medium text-slate-800 leading-relaxed italic">
              {language === "kn"
                ? "“ಜನಸೇವೆ ಎನ್ನುವುದು ಕೇವಲ ರಾಜಕೀಯವಲ್ಲ; ಅದು ನಮ್ಮ ಹಿರಿಯರು ಕಲಿಸಿಕೊಟ್ಟ ಧರ್ಮ, ನಮ್ಮ ಮಣ್ಣಿಗೆ ಸಲ್ಲಿಸಬೇಕಾದ ಕೃತಜ್ಞತೆ. ಪ್ರತಿಯೊಬ್ಬ ಕಷ್ಟದಲ್ಲಿರುವ ರೈತನ ಮುಖದಲ್ಲಿ ನೆಮ್ಮದಿ ಕಾಣುವುದೇ ನನ್ನ ಜೀವನದ ಅತಿ ದೊಡ್ಡ ಸಾರ್ಥಕತೆ.”"
                : "“Public service is not about politics; it is the sacred duty taught by our elders and a debt of gratitude to our soil. Bringing peace and dignity to every struggling farmer is the highest fulfillment of my life.”"}
            </p>
            <div className="mt-4 pt-4 border-t border-amber-200 flex items-center gap-3">
              <span className="font-extrabold text-slate-900 text-sm">
                {language === "kn" ? "— ಶ್ರೀ ಹರ್ಷಾನಂದ ಗುತ್ತೇದಾರ" : "— Shri Harshanand Guttedar"}
              </span>
            </div>
          </div>

          {/* Chapters List */}
          <div className="space-y-12 sm:space-y-16">
            {chapters.map((ch, idx) => (
              <div
                key={idx}
                className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center border-b border-slate-100 pb-12 sm:pb-16 last:border-b-0"
              >
                {/* Photo (md:col-span-5) */}
                <div className={`md:col-span-5 ${idx % 2 === 1 ? "md:order-2" : ""}`}>
                  <div className="rounded-3xl overflow-hidden shadow-xl border border-slate-200 bg-slate-100 group">
                    <ImagePlaceholder
                      label={language === "kn" ? ch.imageLabelKn : ch.imageLabelEn}
                      height="h-64 sm:h-72"
                      className="rounded-none border-none group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                </div>

                {/* Narrative (md:col-span-7) */}
                <div className={`md:col-span-7 space-y-3 ${idx % 2 === 1 ? "md:order-1" : ""}`}>
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 text-xs font-bold text-slate-700">
                    <Calendar className="w-3.5 h-3.5 text-[#b91c1c]" />
                    <span>{language === "kn" ? ch.periodKn : ch.periodEn}</span>
                  </div>

                  <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight leading-snug">
                    {language === "kn" ? ch.titleKn : ch.titleEn}
                  </h3>

                  <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                    {language === "kn" ? ch.descKn : ch.descEn}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Bottom Link to Vision Page */}
          <div className="p-8 rounded-3xl bg-slate-900 text-white flex flex-col sm:flex-row items-center justify-between gap-6">
            <div>
              <h4 className="text-xl font-bold tracking-tight">
                {language === "kn" ? "ಕಲಬುರಗಿಯ ಭವಿಷ್ಯದ ಕನಸುಗಳನ್ನು ತಿಳಿಯಿರಿ" : "Discover our Vision 2030 for Kalaburagi"}
              </h4>
              <p className="text-xs text-slate-300 mt-1">
                {language === "kn" ? "ನಮ್ಮ ಮುಂದಿನ ದಶಕದ ಪ್ರಮುಖ ಯೋಜನೆಗಳು ಮತ್ತು ದಿಕ್ಸೂಚಿ." : "Read the strategic roadmap for farmer exports and youth jobs."}
              </p>
            </div>
            <Link
              href="/vision"
              className="px-6 py-3 rounded-full bg-[#b91c1c] hover:bg-[#991b1b] text-white font-bold text-xs sm:text-sm inline-flex items-center gap-2 transition-all shrink-0"
            >
              <span>{language === "kn" ? "ದೂರದೃಷ್ಟಿ ಪುಟಕ್ಕೆ ಭೇಟಿ ನೀಡಿ" : "View Vision 2030"}</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

        </div>
      </section>

      <Footer />
    </main>
  );
}

