"use client";

import React from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PageHeroBanner from "@/components/common/PageHeroBanner";
import ImagePlaceholder from "@/components/common/ImagePlaceholder";
import { useLanguage } from "@/context/LanguageContext";
import { 
  Landmark, 
  MapPin, 
  Users, 
  Sprout, 
  Droplets, 
  Hospital, 
  GraduationCap, 
  Building2, 
  PhoneCall, 
  ArrowRight,
  ShieldCheck
} from "lucide-react";

export default function AlandPage() {
  const { language } = useLanguage();

  const hoblis = [
    { nameKn: "ಆಳಂದ ನಗರ & ಕೇಂದ್ರ", nameEn: "Aland Town & Center", descKn: "ತಾಲೂಕು ಆಡಳಿತ, ಎಪಿಎಂಸಿ ಮಾರುಕಟ್ಟೆ ಮತ್ತು ಪ್ರಮುಖ ಶಿಕ್ಷಣ ಸಂಸ್ಥೆಗಳ ಕೇಂದ್ರ.", descEn: "Taluk administration, main APMC trade market, and educational center." },
    { nameKn: "ಖಜೂರಿ ಹೋಬಳಿ", nameEn: "Khajuri Hobli", descKn: "ತೊಗರಿ ಮತ್ತು ದ್ವಿದಳ ಧಾನ್ಯಗಳ ಪ್ರಮುಖ ಕೃಷಿ ವಲಯ ಹಾಗೂ ಜಲ ಸಂರಕ್ಷಣಾ ಕೆರೆಗಳು.", descEn: "Key pulse production belt, watershed tanks, and cooperative societies." },
    { nameKn: "ನಿಂಬರ್ಗಾ ಹೋಬಳಿ", nameEn: "Nimbaraga Hobli", descKn: "ಗ್ರಾಮೀಣ ಕರಕುಶಲ ಕಲೆ, ಸ್ತ್ರೀಶಕ್ತಿ ಸಂಘಗಳು ಮತ್ತು ಸಣ್ಣ ನೀರಾವರಿ ಜಾಲ.", descEn: "Rural micro-enterprises, women self-help networks, and lift irrigation." },
    { nameKn: "ಮಾದನಹಿಪ್ಪರಗಾ ಹೋಬಳಿ", nameEn: "Madan Hipparga Hobli", descKn: "ಮಹಾರಾಷ್ಟ್ರ ಗಡಿ ಸಂಪರ್ಕ ಹೆದ್ದಾರಿ, ಅಂತಾರಾಜ್ಯ ವಾಣಿಜ್ಯ ಮತ್ತು ಶಿಕ್ಷಣ ಕೇಂದ್ರಗಳು.", descEn: "Border connectivity, interstate transit trade, and healthcare access." },
    { nameKn: "ನರೋಣಾ ಹೋಬಳಿ", nameEn: "Narona Hobli", descKn: "ಐತಿಹಾಸಿಕ ಪರಂಪರೆ, ಶುದ್ಧ ಕುಡಿಯುವ ನೀರಿನ ಜಾಲ ಮತ್ತು ಕೃಷಿ ಸಂಸ್ಕರಣಾ ಜಮೀನುಗಳು.", descEn: "Cultural heritage, community RO plants, and organic pulse farming." },
  ];

  const roadmap = [
    {
      icon: Sprout,
      titleKn: "ಆಳಂದ ಜಿಐ ತೊಗರಿ ರಫ್ತು ಟರ್ಮಿನಲ್",
      titleEn: "Aland GI Tur Dal Export Terminal",
      descKn: "ಆಳಂದ ಎಪಿಎಂಸಿಯಲ್ಲಿ ಆಧುನಿಕ ಗ್ರೇಡಿಂಗ್, ಪ್ಯಾಕಿಂಗ್ ಮತ್ತು ಸೋಲಾರ್ ಶೀತಲ ಗೋದಾಮುಗಳ ಸ್ಥಾಪನೆ ಮೂಲಕ ನೇರ ಮುಂಬೈ-ಜವಾಹರಲಾಲ್ ನೆಹರು ಪೋರ್ಟ್ ಸಂಪರ್ಕ.",
      descEn: "Modern grading, moisture-controlled packaging, and direct port connectivity to JNPT Mumbai for Aland's red gram growers.",
    },
    {
      icon: Droplets,
      titleKn: "ಅಮರ್ಜಾ & ಬೆಣ್ಣೆತೊರಾ ಕಾಲುವೆ ನೀರಾವರಿ",
      titleEn: "Amarja & Bennethora Canal Water Security",
      descKn: "ಕಾಲುವೆಗಳ ಹೂಳೆತ್ತುವಿಕೆ, ಬಾಲಕಾಲುವೆಗಳ ಆಧುನೀಕರಣ ಮತ್ತು ಕೊನೆಯ ಭಾಗದ ಜಮೀನುಗಳಿಗೂ ನೀರಾವರಿ ನೀರು ತಲುಪಿಸುವ ಶಾಶ್ವತ ಯೋಜನೆ.",
      descEn: "Desilting feeder canals, modernizing tail-end distributaries, and ensuring assured canal water to every drought-prone village.",
    },
    {
      icon: Hospital,
      titleKn: "100 ಹಾಸಿಗೆಗಳ ಸುಸಜ್ಜಿತ ತಾಲೂಕು ಆಸ್ಪತ್ರೆ & ಟ್ರಾಮಾ ಸೆಂಟರ್",
      titleEn: "100-Bed Modern Taluk Hospital & Trauma Care",
      descKn: "ತುರ್ತು ಚಿಕಿತ್ಸೆಗಾಗಿ ಕಲಬುರಗಿ ಅಥವಾ ಸೋಲಾಪುರಕ್ಕೆ ಹೋಗುವುದನ್ನು ತಪ್ಪಿಸಲು ಆಳಂದದಲ್ಲೇ ತಜ್ಞ ವೈದ್ಯರು, ಡಯಾಲಿಸಿಸ್ ಮತ್ತು ಐಸಿಯು ಸೌಲಭ್ಯ.",
      descEn: "Upgrading Aland General Hospital with a 24/7 trauma emergency unit, dialysis wing, and pediatric ICU so patients avoid long travel.",
    },
    {
      icon: GraduationCap,
      titleKn: "ಆಳಂದ ಯುವ ಕೌಶಲ್ಯ ಪಾರ್ಕ್ & ಉಚಿತ ತರಬೇತಿ ಕೇಂದ್ರ",
      titleEn: "Youth Skill Park & Competitive Exam Library",
      descKn: "ಗ್ರಾಮೀಣ ಯುವಕ-ಯುವತಿಯರಿಗೆ ಉದ್ಯೋಗಾವಕಾಶ ನೀಡಲು ಹೈಟೆಕ್ ಡಿಜಿಟಲ್ ಲೈಬ್ರರಿ ಮತ್ತು ತಾಂತ್ರಿಕ ಕೌಶಲ್ಯ ತರಬೇತಿ ಅಕಾಡೆಮಿ.",
      descEn: "State-of-the-art computer labs, KPSC/UPSC study libraries, and vocational training centers to stop distress youth migration.",
    },
  ];

  return (
    <main className="min-h-screen bg-white text-slate-900 relative overflow-x-hidden">
      <Navbar />

      <PageHeroBanner
        badgeKn="ನಮ್ಮ ಹೆಮ್ಮೆಯ ಆಳಂದ"
        badgeEn="ALAND CONSTITUENCY & TALUK"
        titleKn={
          <>
            ಆಳಂದ ತಾಲೂಕಿನ ಸಮಗ್ರ ಪ್ರಗತಿ &{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-amber-200 to-red-400">
              ಜನರ ಸಬಲೀಕರಣ
            </span>
          </>
        }
        titleEn={
          <>
            Aland Constituency: Holistic Growth &{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-amber-200 to-red-400">
              Grassroots Prosperity
            </span>
          </>
        }
        subtitleKn="ಐತಿಹಾಸಿಕ ಪರಂಪರೆ, ಕಾಯಕನಿಷ್ಠ ಅನ್ನದಾತರು ಮತ್ತು ಶ್ರೀ ಹರ್ಷಾನಂದ ಗುತ್ತೇದಾರ ಅವರ ನೇತೃತ್ವದಲ್ಲಿ ಸಾಕಾರಗೊಳ್ಳುತ್ತಿರುವ ಆಳಂದ ಅಭಿವೃದ್ಧಿ ದಿಕ್ಸೂಚಿ."
        subtitleEn="A deep dive into Aland's cultural legacy, agrarian strength, and the 5-point developmental roadmap led by Shri Harshanand Guttedar."
        breadcrumbLabelKn="ಆಳಂದ"
        breadcrumbLabelEn="Aland"
        icon={Landmark}
      />

      {/* Overview Section */}
      <section className="py-12 sm:py-16 lg:py-20 bg-white" aria-label="Aland Overview">
        <div className="w-full px-5 sm:px-8 md:px-10 lg:px-12 xl:px-16 2xl:px-20 max-w-7xl mx-auto space-y-16">
          
          {/* 2-Column Story: Photo + Narrative */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
            
            <div className="lg:col-span-6">
              <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-slate-200 bg-slate-100">
                <ImagePlaceholder
                  label={
                    language === "kn"
                      ? "ಆಳಂದ ಪಟ್ಟಣ ಮತ್ತು ಗ್ರಾಮೀಣ ಪ್ರದೇಶದಲ್ಲಿ ಹರ್ಷಾನಂದ ಗುತ್ತೇದಾರ ಅವರ ಜನಸಂಪರ್ಕ"
                      : "Harshanand Guttedar with citizens and farmers across Aland"
                  }
                  height="h-[360px] sm:h-[440px]"
                  className="rounded-none border-none"
                />
                <div className="absolute bottom-4 left-4 right-4 p-4 rounded-2xl bg-black/80 backdrop-blur-md text-white border border-white/20">
                  <div className="text-xs font-semibold uppercase tracking-wider text-amber-300">
                    {language === "kn" ? "ಕ್ಷೇತ್ರ ಪರಿಚಯ" : "Constituency Profile"}
                  </div>
                  <div className="text-sm font-bold mt-0.5">
                    {language === "kn" ? "138 ಹಳ್ಳಿಗಳು • 5 ಹೋಬಳಿಗಳು • 3 ಲಕ್ಷ+ ಜನಸಂಖ್ಯೆ" : "138 Villages • 5 Hoblis • 300,000+ Citizens"}
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-6 space-y-5">
              <span className="text-xs font-bold tracking-widest text-slate-800 uppercase flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-[#b91c1c]" />
                {language === "kn" ? "ಆಳಂದದ ಆತ್ಮ" : "THE SPIRIT OF ALAND"}
              </span>

              <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight">
                {language === "kn" ? (
                  <>
                    ಧಾರ್ಮಿಕ ಸೌಹಾರ್ದತೆ, ಕೃಷಿ ಸಂಸ್ಕೃತಿ ಮತ್ತು{" "}
                    <span className="text-[#b91c1c]">ಪ್ರಗತಿಯ ಹೊಸ ಕನಸು</span>
                  </>
                ) : (
                  <>
                    A Land of Harmony, Soil Resilience, and{" "}
                    <span className="text-[#b91c1c]">Endless Potential</span>
                  </>
                )}
              </h2>

              <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                {language === "kn"
                  ? "ಆಳಂದ ತಾಲೂಕು ಶತಮಾನಗಳಿಂದ ಧಾರ್ಮಿಕ ಏಕತೆ ಮತ್ತು ಸಮನ್ವಯದ ನೆಲೆಯಾಗಿದೆ. ಕಲ್ಯಾಣ ಕರ್ನಾಟಕದ ತೊಗರಿ ಕಣಜ ಎಂದೇ ಪ್ರಸಿದ್ಧವಾಗಿರುವ ಈ ನೆಲದಲ್ಲಿ, ರೈತರಿಗೆ ನೀರಿನ ಭದ್ರತೆ, ಯುವಕರಿಗೆ ಸ್ಥಳೀಯ ಉದ್ಯೋಗ ಮತ್ತು ಉತ್ತಮ ಆಸ್ಪತ್ರೆ ಸೌಲಭ್ಯ ಒದಗಿಸುವುದು ನಮ್ಮ ಪ್ರಮುಖ ಸಂಕಲ್ಪವಾಗಿದೆ."
                  : "Aland stands as a historic beacon of communal harmony and the primary pulse production heartland of Kalyana Karnataka. Our mission under Harshanand Guttedar guarantees water security, healthcare dignity, and export prosperity for every village."}
              </p>

              <div className="grid grid-cols-2 gap-4 pt-2">
                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
                  <div className="text-2xl font-extrabold text-slate-900">138</div>
                  <div className="text-xs text-slate-600 font-medium">{language === "kn" ? "ಗ್ರಾಮಗಳು" : "Villages"}</div>
                </div>
                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
                  <div className="text-2xl font-extrabold text-slate-900">85,000+</div>
                  <div className="text-xs text-slate-600 font-medium">{language === "kn" ? "ಕೃಷಿ ಕುಟುಂಬಗಳು" : "Farming Families"}</div>
                </div>
              </div>
            </div>

          </div>

          {/* 5 Hoblis Showcase */}
          <div className="space-y-6">
            <div className="border-b border-slate-200 pb-4">
              <h3 className="text-2xl font-extrabold text-slate-900 tracking-tight">
                {language === "kn" ? "ಆಳಂದ ತಾಲೂಕಿನ 5 ಪ್ರಮುಖ ಹೋಬಳಿಗಳು" : "The 5 Key Hoblis of Aland"}
              </h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-5">
              {hoblis.map((hobli, idx) => (
                <div
                  key={idx}
                  className="rounded-2xl p-5 border border-slate-200 bg-white shadow-xs hover:shadow-md hover:border-red-400 transition-all flex flex-col justify-between"
                >
                  <div className="space-y-2">
                    <span className="w-8 h-8 rounded-lg bg-red-50 text-red-700 flex items-center justify-center font-bold text-xs">
                      0{idx + 1}
                    </span>
                    <h4 className="font-extrabold text-slate-900 text-base">
                      {language === "kn" ? hobli.nameKn : hobli.nameEn}
                    </h4>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      {language === "kn" ? hobli.descKn : hobli.descEn}
                    </p>
                  </div>
                  <div className="pt-4 text-[11px] font-bold text-[#b91c1c] flex items-center gap-1">
                    <span>{language === "kn" ? "ಸೇವಾ ಕೇಂದ್ರ ಸಕ್ರಿಯ" : "Center Active"}</span>
                    <span>✓</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Aland 4-Point Strategic Roadmap */}
          <div className="space-y-8">
            <div className="border-b border-slate-200 pb-4">
              <span className="text-xs font-bold uppercase text-red-700 tracking-wider">
                {language === "kn" ? "ಆಳಂದ ದೂರದೃಷ್ಟಿ 2030" : "ALAND VISION 2030"}
              </span>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mt-1">
                {language === "kn" ? "ಆಳಂದದ ಸಮಗ್ರ ಅಭಿವೃದ್ಧಿ ಕಾರ್ಯಸೂಚಿ" : "Strategic Development Pillars for Aland"}
              </h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
              {roadmap.map((item, idx) => (
                <div
                  key={idx}
                  className="rounded-3xl p-7 sm:p-8 border border-slate-200 bg-slate-50/50 hover:bg-white hover:shadow-xl transition-all duration-300 flex items-start gap-5"
                >
                  <div className="w-14 h-14 rounded-2xl bg-white border border-slate-200 shadow-sm flex items-center justify-center text-slate-900 shrink-0">
                    <item.icon className="w-6 h-6 text-[#b91c1c]" />
                  </div>
                  <div className="space-y-2">
                    <h4 className="text-lg sm:text-xl font-extrabold text-slate-900 tracking-tight">
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

          {/* Aland Constituency Office Contact Banner */}
          <div className="rounded-3xl p-8 sm:p-10 bg-slate-900 text-white shadow-xl flex flex-col sm:flex-row items-center justify-between gap-6">
            <div className="space-y-2 text-center sm:text-left">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-600/30 text-amber-300 text-xs font-bold">
                <MapPin className="w-3.5 h-3.5" />
                <span>{language === "kn" ? "ಆಳಂದ ಸಾರ್ವಜನಿಕ ಕಚೇರಿ" : "Aland Constituency Secretariat"}</span>
              </div>
              <h4 className="text-xl sm:text-2xl font-bold tracking-tight">
                {language === "kn" ? "ಆಳಂದದ ನಾಗರಿಕರ ಸೇವೆಗೆ ಸದಾ ಮುಕ್ತ" : "Dedicated to Serving Every Aland Citizen"}
              </h4>
              <p className="text-xs text-slate-300 max-w-md">
                {language === "kn" 
                  ? "ಮುಖ್ಯ ರಸ್ತೆ, ಆಳಂದ ಪಟ್ಟಣ • ಸಹಾಯವಾಣಿ: +91 8472 250148" 
                  : "Main Road, Aland Town • Helpline: +91 8472 250148"}
              </p>
            </div>

            <Link
              href="/contact"
              className="px-6 py-3 rounded-full bg-[#b91c1c] hover:bg-[#991b1b] text-white font-bold text-xs sm:text-sm shadow-md transition-all shrink-0 inline-flex items-center gap-2"
            >
              <span>{language === "kn" ? "ಸಂಪರ್ಕಿಸಿ & ಭೇಟಿ ನಿಗದಿಪಡಿಸಿ" : "Schedule Meeting"}</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

        </div>
      </section>

      <Footer />
    </main>
  );
}

