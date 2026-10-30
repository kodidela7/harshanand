"use client";

import React from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PageHeroBanner from "@/components/common/PageHeroBanner";
import ImagePlaceholder from "@/components/common/ImagePlaceholder";
import { useLanguage } from "@/context/LanguageContext";
import { 
  Award, 
  ShieldCheck, 
  HeartHandshake, 
  Users, 
  Scale, 
  ArrowRight,
  Flame,
  CheckCircle2
} from "lucide-react";

export default function PublicLifePage() {
  const { language } = useLanguage();

  const achievements = [
    {
      icon: Flame,
      titleKn: "ಅನ್ನದಾತರ ಹಕ್ಕುಗಳಿಗಾಗಿ ನಿರ್ಭೀತ ಹೋರಾಟ",
      titleEn: "Fearless Advocacy for Farmer MSP",
      descKn: "ಕಲಬುರಗಿಯ ತೊಗರಿ ಬೆಳೆಗಾರರಿಗೆ ರಾಜ್ಯ ಸರ್ಕಾರದ ಬೆಂಬಲ ಬೆಲೆ ವಿಳಂಬವಾದಾಗ, ಬೀದಿಗಿಳಿದು ರೈತರೊಂದಿಗೆ ಧರಣಿ ನಡೆಸಿ ತ್ವರಿತ ಪರಿಹಾರ ಕೊಡಿಸಿದ ಬದ್ಧತೆ.",
      descEn: "Standing shoulder-to-shoulder with pulse farmers in mass sit-ins to enforce immediate state procurement and prevent distress distress sales.",
    },
    {
      icon: HeartHandshake,
      titleKn: "ಸಂಕಷ್ಟದ ಸಮಯದಲ್ಲಿ ಮನೆ ಮನೆಗೆ ನೆರವು",
      titleEn: "Crisis Relief & Grassroots Healthcare",
      descKn: "ಕೋವಿಡ್ ಮತ್ತು ಭೀಕರ ಪ್ರವಾಹದ ಬಿಕ್ಕಟ್ಟಿನಲ್ಲಿ ಸ್ವತಃ ಹಳ್ಳಿಗಳಿಗೆ ತೆರಳಿ ಉಚಿತ ಆಕ್ಸಿಜನ್, ಆಹಾರ ಧಾನ್ಯ ಕಿಟ್‌ಗಳು ಮತ್ತು ವೈದ್ಯಕೀಯ ಶಿಬಿರಗಳ ಆಯೋಜನೆ.",
      descEn: "Mobilizing comprehensive emergency food kits, oxygen concentrators, and field medical camps to remote villages during natural and public health crises.",
    },
    {
      icon: Scale,
      titleKn: "ಭ್ರಷ್ಟಾಚಾರ ರಹಿತ, ಪಾರದರ್ಶಕ ಜನಸೇವೆ",
      titleEn: "Zero Tolerance to Inefficiency & Corruption",
      descKn: "ಸಾರ್ವಜನಿಕ ಅನುದಾನವು ಕಡತಗಳಲ್ಲಿ ಉಳಿಯದೆ ನೇರವಾಗಿ ಹಳ್ಳಿಯ ಫಲಾನುಭವಿಗಳಿಗೆ ತಲುಪುವಂತೆ ಕಟ್ಟುನಿಟ್ಟಿನ ನಿಗಾ ಮತ್ತು ತಾಲೂಕು ಅಧಿಕಾರಿಗಳೊಂದಿಗೆ ನೇರ ಸಭೆಗಳು.",
      descEn: "Ensuring every rupee allocated for rural borewells, roads, and pensions reaches beneficiaries without leakage or bureaucratic delays.",
    },
    {
      icon: Users,
      titleKn: "ಸರ್ವಧರ್ಮ ಸೌಹಾರ್ದತೆ & ಸಾಮರಸ್ಯ",
      titleEn: "Promoting Inter-Faith Harmony & Unity",
      descKn: "ಆಳಂದ ಮತ್ತು ಕಲಬುರಗಿಯ ಎಲ್ಲಾ ಧರ್ಮ, ಜಾತಿ ಮತ್ತು ಸಮುದಾಯಗಳ ಜನರನ್ನು ಒಗ್ಗೂಡಿಸಿ ಶಾಂತಿ ಮತ್ತು ಸಹಬಾಳ್ವೆಗೆ ಸದಾ ಮುಂಚೂಣಿ ನಾಯಕತ್ವ.",
      descEn: "Uniting all communities, celebrating cultural diversity, and standing firm as a bridge of trust and social harmony across the district.",
    },
  ];

  return (
    <main className="min-h-screen bg-white text-slate-900 relative overflow-x-hidden">
      <Navbar />

      <PageHeroBanner
        badgeKn="ಸಾರ್ವಜನಿಕ ಜೀವನ & ನಾಯಕತ್ವ"
        badgeEn="PUBLIC LIFE & STATESMANSHIP"
        titleKn={
          <>
            ಜನರ ಧ್ವನಿಯಾಗಿ{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-amber-200 to-red-400">
              ಸಾರ್ವಜನಿಕ ಸೇವೆ
            </span>
          </>
        }
        titleEn={
          <>
            A Dedicated Life in{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-amber-200 to-red-400">
              Public Service & Governance
            </span>
          </>
        }
        subtitleKn="ಪ್ರಾಮಾಣಿಕತೆ, ರಾಜಕೀಯ ಇಚ್ಛಾಶಕ್ತಿ ಮತ್ತು ನಾಗರಿಕರ ಕಲ್ಯಾಣಕ್ಕಾಗಿ ಸದಾ ಮುಡಿಪಾದ ಶ್ರೀ ಹರ್ಷಾನಂದ ಗುತ್ತೇದಾರ ಅವರ ಸಾರ್ವಜನಿಕ ಜೀವನದ ಚಿತ್ರಣ."
        subtitleEn="A record of fearless advocacy, integrity in leadership, and dedicated public commitment to the people of Kalaburagi."
        breadcrumbLabelKn="ಸಾರ್ವಜನಿಕ ಜೀವನ"
        breadcrumbLabelEn="Public Life"
        icon={Award}
      />

      <section className="py-12 sm:py-16 lg:py-20 bg-white" aria-label="Public Life Highlights">
        <div className="w-full px-5 sm:px-8 md:px-10 lg:px-12 xl:px-16 2xl:px-20 max-w-7xl mx-auto space-y-16">
          
          {/* Main Feature: Leadership in Action */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
            
            <div className="lg:col-span-6 space-y-5">
              <span className="text-xs font-bold tracking-widest text-slate-800 uppercase flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-[#b91c1c]" />
                {language === "kn" ? "ನಾಯಕತ್ವದ ಮೌಲ್ಯಗಳು" : "CORE LEADERSHIP CREED"}
              </span>

              <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight">
                {language === "kn" ? (
                  <>
                    ಅಧಿಕಾರಕ್ಕಿಂತ ಜನರ ವಿಶ್ವಾಸವೇ ದೊಡ್ಡದು:{" "}
                    <span className="text-[#b91c1c]">ನೇರ ಸಂವಾದ, ಶೀಘ್ರ ಪರಿಹಾರ</span>
                  </>
                ) : (
                  <>
                    Trust Over Power:{" "}
                    <span className="text-[#b91c1c]">Direct Dialogue, Immediate Action</span>
                  </>
                )}
              </h2>

              <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                {language === "kn"
                  ? "ಶ್ರೀ ಹರ್ಷಾನಂದ ಗುತ್ತೇದಾರ ಅವರ ಸಾರ್ವಜನಿಕ ಜೀವನವು ಕಚೇರಿಯ ನಾಲ್ಕು ಗೋಡೆಗಳಿಗೆ ಸೀಮಿತವಾಗಿಲ್ಲ. ಹಳ್ಳಿಗಳ ಗಲ್ಲಿ ಗಲ್ಲಿಗಳಲ್ಲಿ ನಡೆದು, ರೈತರ ಹೊಲಗಳಲ್ಲಿ ಕುಳಿತು ಅವರ ಕಷ್ಟ-ಸುಖ ಆಲಿಸುವುದೇ ಅವರ ಶೈಲಿ. ರಾಜಕೀಯ ಪ್ರಚಾರಕ್ಕಿಂತ ಜನರ ಕಣ್ಣೀರು ಒರೆಸುವ ಕೆಲಸಕ್ಕೆ ಅವರು ಮೊದಲ ಆದ್ಯತೆ ನೀಡುತ್ತಾರೆ."
                  : "Harshanand Guttedar's public service is not confined to air-conditioned offices. He spends his days walking village streets, sitting with farmers under banyan trees, and ensuring government benefits reach the most vulnerable citizens without friction."}
              </p>

              <div className="pt-2 space-y-3">
                {[
                  { kn: "ಪ್ರತಿದಿನ ಸಾರ್ವಜನಿಕ ಅಹವಾಲು ಆಲಿಕೆ", en: "Daily open-door citizen grievance sessions" },
                  { kn: "ರೈತರ ಸಮಸ್ಯೆಗಳಿಗೆ ತಕ್ಷಣದ ಅಧಿಕಾರಿಗಳ ಸ್ಪಂದನೆ", en: "Prompt escalation of farmer concerns with officials" },
                  { kn: "ಯುವಕರ ಶಿಕ್ಷಣ & ಉದ್ಯೋಗಕ್ಕೆ ಸತತ ಮಾರ್ಗದರ್ಶನ", en: "Dedicated mentorship for youth jobs and coaching" },
                ].map((item, idx) => (
                  <div key={idx} className="flex items-center gap-3 text-sm font-semibold text-slate-800">
                    <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                    <span>{language === "kn" ? item.kn : item.en}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="lg:col-span-6">
              <div className="rounded-3xl overflow-hidden shadow-2xl border border-slate-200 bg-slate-100">
                <ImagePlaceholder
                  label={
                    language === "kn"
                      ? "ಶ್ರೀ ಹರ್ಷಾನಂದ ಗುತ್ತೇದಾರ ಅವರು ಜನರನ್ನು ಉದ್ದೇಶಿಸಿ ಮಾತನಾಡುತ್ತಿರುವ ಕ್ಷಣ"
                      : "Harshanand Guttedar addressing citizens at a district convention"
                  }
                  height="h-[360px] sm:h-[440px]"
                  className="rounded-none border-none"
                />
              </div>
            </div>

          </div>

          {/* 4 Pillars of Public Service Grid */}
          <div className="space-y-8">
            <div className="border-b border-slate-200 pb-4">
              <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                {language === "kn" ? "ಸಾರ್ವಜನಿಕ ಜೀವನದ ಪ್ರಮುಖ ಮೈಲಿಗಲ್ಲುಗಳು" : "Pillars of Public Service"}
              </h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
              {achievements.map((item, idx) => (
                <div
                  key={idx}
                  className="rounded-3xl p-7 sm:p-8 border border-slate-200 bg-white hover:shadow-xl transition-all duration-300 flex items-start gap-5 group"
                >
                  <div className="w-14 h-14 rounded-2xl bg-slate-50 border border-slate-200 shadow-sm flex items-center justify-center text-slate-900 group-hover:bg-[#b91c1c] group-hover:text-white transition-colors shrink-0">
                    <item.icon className="w-6 h-6 text-[#b91c1c] group-hover:text-white" />
                  </div>
                  <div className="space-y-2">
                    <h4 className="text-xl font-extrabold text-slate-900 tracking-tight group-hover:text-[#b91c1c] transition-colors">
                      {language === "kn" ? item.titleKn : item.titleEn}
                    </h4>
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      {language === "kn" ? item.descKn : item.descEn}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Connect CTA */}
          <div className="p-8 sm:p-10 rounded-3xl bg-slate-900 text-white flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xl">
            <div className="space-y-1 text-center sm:text-left">
              <h4 className="text-xl font-extrabold tracking-tight">
                {language === "kn" ? "ಸಾರ್ವಜನಿಕ ಸೇವೆಯಲ್ಲಿ ಕೈಜೋಡಿಸಲು ಬಯಸುವಿರಾ?" : "Want to get involved in our public movement?"}
              </h4>
              <p className="text-xs text-slate-300">
                {language === "kn" ? "ನಮ್ಮ ಸಮುದಾಯ ತಂಡಗಳಲ್ಲಿ ಸ್ವಯಂಸೇವಕರಾಗಿ ನೋಂದಾಯಿಸಿಕೊಳ್ಳಿ." : "Join our volunteer teams working across Kalaburagi."}
              </p>
            </div>
            <Link
              href="/contact"
              className="px-6 py-3 rounded-full bg-[#b91c1c] hover:bg-[#991b1b] text-white font-bold text-xs sm:text-sm shadow-md transition-all shrink-0 inline-flex items-center gap-2"
            >
              <span>{language === "kn" ? "ಸ್ವಯಂಸೇವಕರಾಗಿ" : "Volunteer Now"}</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

        </div>
      </section>

      <Footer />
    </main>
  );
}

