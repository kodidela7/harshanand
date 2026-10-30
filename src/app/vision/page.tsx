"use client";

import React from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PageHeroBanner from "@/components/common/PageHeroBanner";
import ImagePlaceholder from "@/components/common/ImagePlaceholder";
import { useLanguage } from "@/context/LanguageContext";
import { 
  Sparkles, 
  Sprout, 
  Droplets, 
  Briefcase, 
  GraduationCap, 
  ShieldCheck, 
  ArrowRight,
  Target,
  CheckCircle2
} from "lucide-react";

export default function VisionPage() {
  const { language } = useLanguage();

  const visionPillars = [
    {
      number: "01",
      icon: Sprout,
      badgeKn: "ಕೃಷಿ ರಫ್ತು ಕ್ರಾಂತಿ",
      badgeEn: "Agro-Export Capital",
      titleKn: "ಭಾರತದ ಪ್ರಮುಖ ತೊಗರಿ ರಫ್ತು ರಾಜಧಾನಿಯಾಗಿ ಕಲಬುರಗಿ",
      titleEn: "India's Premier GI Pulse Export Capital",
      descKn: "ಕಲಬುರಗಿಯ ಜಿಐ ಮಾನ್ಯತೆಯುಳ್ಳ ತೊಗರಿ ಬೆಳೆಗೆ ಅಂತಾರಾಷ್ಟ್ರೀಯ ಮಾರುಕಟ್ಟೆ ಸಂಪರ್ಕ, ಆಳಂದ ಮತ್ತು ಕಲಬುರಗಿಯಲ್ಲಿ ಹೈಟೆಕ್ ಸಂಸ್ಕರಣಾ ಟರ್ಮಿನಲ್ ಮತ್ತು ದಲ್ಲಾಳಿ ಮುಕ್ತ ನೇರ ಬೆಂಬಲ ಬೆಲೆ ಖಾತ್ರಿ.",
      descEn: "Elevating Kalaburagi's GI-tagged red gram to global markets with direct port logistics, cold-chain hubs in Aland, and guaranteed premium pricing for smallholders.",
      targetsKn: ["50+ ರಫ್ತು ಶ್ರೇಣಿಯ ಎಫ್‌ಪಿಒಗಳು", "10,000 MT ಸೋಲಾರ್ ಶೀತಲ ಗೋದಾಮು", "ಶೇ.40 ಅಧಿಕ ಬೆಳೆ ಆದಾಯ"],
      targetsEn: ["50+ Export-grade FPOs", "10,000 MT Solar Cold Storage", "40% Higher Net Farm Income"],
    },
    {
      number: "02",
      icon: Droplets,
      badgeKn: "ಶಾಶ್ವತ ಜಲ ಭದ್ರತೆ",
      badgeEn: "Water & Irrigation",
      titleKn: "ಪ್ರತಿ ಹೊಲಕ್ಕೂ ನೀರು & 100 ಕೆರೆಗಳ ಪುನಶ್ಚೇತನ",
      titleEn: "Guaranteed Water Security & 100 Lake Rejuvenation",
      descKn: "ಬೆಣ್ಣೆತೊರಾ ಮತ್ತು ಅಮರ್ಜಾ ಕಾಲುವೆಗಳ ಹೂಳೆತ್ತುವಿಕೆ, ಆಳಂದದ 100 ಪುರಾತನ ಕೆರೆಗಳ ಪುನರುಜ್ಜೀವನ ಮತ್ತು ಕಡಿಮೆ ನೀರಿನಲ್ಲಿ ಹೆಚ್ಚು ಇಳುವರಿ ನೀಡುವ ಸೋಲಾರ್ ಹನಿ ನೀರಾವರಿ ಕ್ರಾಂತಿ.",
      descEn: "Desilting tail-end canal distributaries, rejuvenating 100 historic stepwells and irrigation tanks, and deploying solar micro-drip networks across drought-prone villages.",
      targetsKn: ["100 ಪುನಶ್ಚೇತನಗೊಂಡ ಕೆರೆಗಳು", "25,000 ಹೆಕ್ಟೇರ್ ಹನಿ ನೀರಾವರಿ", "ಅಂತರ್ಜಲ ಮಟ್ಟದಲ್ಲಿ 3 ಮೀಟರ್ ಏರಿಕೆ"],
      targetsEn: ["100 Rejuvenated Lakes", "25,000 Hectares Drip Irrigated", "3-Meter Groundwater Table Rise"],
    },
    {
      number: "03",
      icon: Briefcase,
      badgeKn: "ಯುವ ಉದ್ಯೋಗ",
      badgeEn: "Local Jobs & Industry",
      titleKn: "25,000 ಸ್ಥಳೀಯ ಉದ್ಯೋಗ ಸೃಷ್ಟಿ & ಕೌಶಲ್ಯ ಪಾರ್ಕ್",
      titleEn: "25,000 Local Jobs & Agro-Industrial Parks",
      descKn: "ಕಲಬುರಗಿಯ ಯುವಕರು ಬೆಂಗಳೂರು ಅಥವಾ ಮುಂಬೈಗೆ ವಲಸೆ ಹೋಗುವುದನ್ನು ತಡೆಗಟ್ಟಿ, ಸ್ಥಳೀಯವಾಗಿಯೇ ಉದ್ಯೋಗ ಸೃಷ್ಟಿಸುವ ಆಹಾರ ಸಂಸ್ಕರಣಾ ಪಾರ್ಕ್‌ಗಳು ಮತ್ತು ಐಟಿ ಕೌಶಲ್ಯ ಕೇಂದ್ರಗಳ ಸ್ಥಾಪನೆ.",
      descEn: "Halting youth distress migration by anchoring agro-processing clusters, technical vocational academies, and modern business incubators in Kalaburagi.",
      targetsKn: ["25,000 ಹೊಸ ಉದ್ಯೋಗಗಳು", "5 ಬೃಹತ್ ಕೌಶಲ್ಯ ಕೇಂದ್ರಗಳು", "ಯುವ ನವೋದ್ಯಮಗಳಿಗೆ ಆರ್ಥಿಕ ನೆರವು"],
      targetsEn: ["25,000 Local Jobs", "5 Mega Skill Academies", "Micro-grants for Rural Startups"],
    },
    {
      number: "04",
      icon: GraduationCap,
      badgeKn: "ಶಿಕ್ಷಣ & ಆರೋಗ್ಯ",
      badgeEn: "Smart Education & Health",
      titleKn: "ಮಾದರಿ ಡಿಜಿಟಲ್ ಶಾಲೆಗಳು & ಸಂಚಾರಿ ಆಸ್ಪತ್ರೆ ಜಾಲ",
      titleEn: "Smart School Modernization & Village Health Vans",
      descKn: "ಪ್ರತಿ ಗ್ರಾಮ ಪಂಚಾಯಿತಿಯಲ್ಲಿ ಸುಸಜ್ಜಿತ ಡಿಜಿಟಲ್ ಗ್ರಂಥಾಲಯ, ಸರ್ಕಾರಿ ಶಾಲೆಗಳ ಉನ್ನತೀಕರಣ ಮತ್ತು ದೂರದ ಹಳ್ಳಿಗಳ ಬಾಗಿಲಲ್ಲೇ ಉಚಿತ ತಪಾಸಣೆ ಒದಗಿಸುವ 24/7 ಮೊಬೈಲ್ ಹೆಲ್ತ್ ಕ್ಲಿನಿಕ್ ಜಾಲ.",
      descEn: "Equipping rural schools with modern science and computer labs while deploying doctor-staffed diagnostic vans ensuring no mother or elder lacks timely medical care.",
      targetsKn: ["ಪ್ರತಿ ಪಂಚಾಯಿತಿಗೆ ಡಿಜಿಟಲ್ ಲೈಬ್ರರಿ", "ಉಚಿತ ಸ್ಪರ್ಧಾತ್ಮಕ ಪರೀಕ್ಷಾ ತರಬೇತಿ", "100% ಗ್ರಾಮಗಳಿಗೆ ಸಂಚಾರಿ ಆಸ್ಪತ್ರೆ"],
      targetsEn: ["Digital Library in Every Panchayat", "Free Civil Service Coaching", "100% Village Mobile Health Reach"],
    },
  ];

  return (
    <main className="min-h-screen bg-white text-slate-900 relative overflow-x-hidden">
      <Navbar />

      <PageHeroBanner
        badgeKn="ದೂರದೃಷ್ಟಿ 2030"
        badgeEn="VISION 2030 FOR KALABURAGI"
        titleKn={
          <>
            ಕಲಬುರಗಿಯ ಸಮಗ್ರ ಪ್ರಗತಿಗಾಗಿ{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-amber-200 to-red-400">
              ದೂರದೃಷ್ಟಿ 2030
            </span>
          </>
        }
        titleEn={
          <>
            Strategic Blueprint for{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-amber-200 to-red-400">
              Kalaburagi Vision 2030
            </span>
          </>
        }
        subtitleKn="ರೈತರ ಆರ್ಥಿಕ ಸ್ವಾವಲಂಬನೆ, ಶಾಶ್ವತ ನೀರಾವರಿ, ಯುವಕರ ಉದ್ಯೋಗ ಮತ್ತು ಪಾರದರ್ಶಕ ಆಡಳಿತದೊಂದಿಗೆ ಕಲಬುರಗಿಯನ್ನು ಕರ್ನಾಟಕದ ಮಾದರಿ ಜಿಲ್ಲೆಯಾಗಿಸುವ ಮಹಾಸಂಕಲ್ಪ."
        subtitleEn="A transformative 5-pillar developmental blueprint led by Shri Harshanand Guttedar to empower farmers, secure water, and generate youth prosperity."
        breadcrumbLabelKn="ದೂರದೃಷ್ಟಿ"
        breadcrumbLabelEn="Vision"
        icon={Target}
      />

      <section className="py-12 sm:py-16 lg:py-20 bg-white" aria-label="Vision 2030 Pillars">
        <div className="w-full px-5 sm:px-8 md:px-10 lg:px-12 xl:px-16 2xl:px-20 max-w-7xl mx-auto space-y-16">
          
          {/* Header Statement */}
          <div className="max-w-3xl">
            <span className="text-xs font-bold tracking-widest text-slate-800 uppercase flex items-center gap-1.5 mb-2">
              <span className="w-2 h-2 rounded-full bg-[#b91c1c]" />
              {language === "kn" ? "ಮುಂದಿನ ದಶಕದ ಕಾರ್ಯಯೋಜನೆ" : "THE DECADE OF TRANSFORMATION"}
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">
              {language === "kn" ? (
                <>
                  ಕೇವಲ ಭರವಸೆಗಳಲ್ಲ;{" "}
                  <span className="text-[#b91c1c]">ಅಳತೆ ಮಾಡಬಹುದಾದ ನೈಜ ಅಭಿವೃದ್ಧಿ</span>
                </>
              ) : (
                <>
                  Beyond Words:{" "}
                  <span className="text-[#b91c1c]">Measurable, Accountable Progress</span>
                </>
              )}
            </h2>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed mt-4">
              {language === "kn"
                ? "ಕಲಬುರಗಿ ಮತ್ತು ಆಳಂದದ ಪ್ರತಿಯೊಬ್ಬ ನಾಗರಿಕನ ಅಗತ್ಯತೆಗಳನ್ನು ಪರಿಗಣಿಸಿ ರೂಪಿಸಲಾದ ವೈಜ್ಞಾನಿಕ ಅಭಿವೃದ್ಧಿ ನೀಲನಕ್ಷೆ. ಕೃಷಿ, ನೀರು, ಉದ್ಯೋಗ ಮತ್ತು ಆರೋಗ್ಯವೇ ನಮ್ಮ ಪ್ರಮುಖ ಧ್ಯೇಯ."
                : "A scientifically structured roadmap addressing the fundamental challenges of our region, transforming potential into real prosperity for every family."}
            </p>
          </div>

          {/* 4 Large Vision Pillar Cards */}
          <div className="space-y-8 sm:space-y-10">
            {visionPillars.map((pillar) => (
              <div
                key={pillar.number}
                className="rounded-3xl border border-slate-200 bg-white p-7 sm:p-10 lg:p-12 shadow-sm hover:shadow-xl transition-all duration-300 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center group"
              >
                {/* Left (Number + Meta: lg:col-span-8) */}
                <div className="lg:col-span-8 space-y-4">
                  <div className="flex items-center gap-4">
                    <span className="text-4xl sm:text-5xl font-black text-slate-300 font-mono group-hover:text-red-600 transition-colors">
                      {pillar.number}
                    </span>
                    <span className="px-3.5 py-1.5 rounded-full bg-amber-50 border border-amber-200 text-amber-900 font-extrabold text-xs">
                      {language === "kn" ? pillar.badgeKn : pillar.badgeEn}
                    </span>
                  </div>

                  <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight leading-snug group-hover:text-[#b91c1c] transition-colors">
                    {language === "kn" ? pillar.titleKn : pillar.titleEn}
                  </h3>

                  <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                    {language === "kn" ? pillar.descKn : pillar.descEn}
                  </p>

                  {/* Target Metrics */}
                  <div className="pt-4 flex flex-wrap items-center gap-2.5">
                    {(language === "kn" ? pillar.targetsKn : pillar.targetsEn).map((t, idx) => (
                      <span
                        key={idx}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-50 border border-slate-200 text-xs font-semibold text-slate-800"
                      >
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                        <span>{t}</span>
                      </span>
                    ))}
                  </div>
                </div>

                {/* Right Visual Box (lg:col-span-4) */}
                <div className="lg:col-span-4 flex justify-center">
                  <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-3xl bg-slate-50 border border-slate-200 shadow-md flex items-center justify-center text-slate-900 group-hover:bg-[#b91c1c] group-hover:text-white transition-all duration-500">
                    <pillar.icon className="w-12 h-12 text-[#b91c1c] group-hover:text-white transition-colors" />
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Join the Movement CTA */}
          <div className="p-8 sm:p-12 rounded-3xl bg-slate-950 text-white shadow-2xl flex flex-col sm:flex-row items-center justify-between gap-6">
            <div className="space-y-2 text-center sm:text-left">
              <h4 className="text-2xl font-extrabold tracking-tight">
                {language === "kn" ? "ಕಲಬುರಗಿ 2030 ನಿರ್ಮಾಣದಲ್ಲಿ ಜೊತೆಯಾಗಿ" : "Be a Partner in Kalaburagi Vision 2030"}
              </h4>
              <p className="text-xs sm:text-sm text-slate-300 max-w-lg">
                {language === "kn"
                  ? "ನಿಮ್ಮ ಸಲಹೆಗಳು, ಕಲ್ಪನೆಗಳು ಮತ್ತು ಸಮುದಾಯ ಸಹಭಾಗಿತ್ವದೊಂದಿಗೆ ನವ ಕರ್ನಾಟಕವನ್ನು ಜೊತೆಯಾಗಿ ಕಟ್ಟೋಣ."
                  : "Share your civic proposals, volunteer in village initiatives, or collaborate with our think tank."}
              </p>
            </div>
            <Link
              href="/contact"
              className="px-7 py-3.5 rounded-full bg-[#b91c1c] hover:bg-[#991b1b] text-white font-extrabold text-xs sm:text-sm shadow-md transition-all shrink-0 inline-flex items-center gap-2"
            >
              <span>{language === "kn" ? "ಸಲಹೆ ಹಂಚಿಕೊಳ್ಳಿ" : "Share Your Ideas"}</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

        </div>
      </section>

      <Footer />
    </main>
  );
}

