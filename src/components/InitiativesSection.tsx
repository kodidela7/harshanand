"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";
import { 
  TrendingUp, 
  HeartPulse, 
  GraduationCap, 
  Landmark, 
  Building2, 
  Droplets, 
  SunMedium, 
  Briefcase, 
  ShieldAlert, 
  Scale, 
  Sprout, 
  Users, 
  ArrowRight, 
  Phone, 
  CheckCircle2, 
  Calendar,
  Sparkles
} from "lucide-react";

interface InitiativeItem {
  id: string;
  category: "all" | "economy" | "infrastructure" | "education" | "health" | "governance";
  categoryLabelKn: string;
  categoryLabelEn: string;
  icon: React.ElementType;
  titleKn: string;
  titleEn: string;
  descKn: string;
  descEn: string;
  badgeKn: string;
  badgeEn: string;
}

export default function InitiativesSection() {
  const { language } = useLanguage();
  const [activeTab, setActiveTab] = useState<string>("all");

  const initiatives: InitiativeItem[] = [
    {
      id: "economic-prosperity",
      category: "economy",
      categoryLabelKn: "ಆರ್ಥಿಕತೆ",
      categoryLabelEn: "Economy",
      icon: TrendingUp,
      titleKn: "ಆರ್ಥಿಕ ಸಮೃದ್ಧಿ & ಕೃಷಿ ವಾಣಿಜ್ಯ",
      titleEn: "Economic prosperity",
      descKn: "ಕಲಬುರಗಿಯ ಸ್ಥಳೀಯ ವ್ಯಾಪಾರಿಗಳಿಗೆ ನೆರವು, ಕೃಷಿ ಸಂಸ್ಕರಣಾ ಕೈಗಾರಿಕೆಗಳಿಗೆ ಹೂಡಿಕೆ ಆಕರ್ಷಣೆ ಮತ್ತು ಉನ್ನತ ಗುಣಮಟ್ಟದ ಸ್ಥಳೀಯ ಉದ್ಯೋಗ ಸೃಷ್ಟಿ.",
      descEn: "We will support local businesses, encourage agro-industrial investment, and create quality employment across Kalaburagi.",
      badgeKn: "ಕೃಷಿ ಆರ್ಥಿಕತೆ",
      badgeEn: "Agro-Economy",
    },
    {
      id: "affordable-healthcare",
      category: "health",
      categoryLabelKn: "ಆರೋಗ್ಯ",
      categoryLabelEn: "Healthcare",
      icon: HeartPulse,
      titleKn: "ಉಚಿತ & ಗುಣಮಟ್ಟದ ಗ್ರಾಮೀಣ ಆರೋಗ್ಯ",
      titleEn: "Affordable healthcare",
      descKn: "ಗ್ರಾಮೀಣ ಭಾಗದ ಜನರಿಗೆ ಸಂಚಾರಿ ಆಸ್ಪತ್ರೆಗಳು, ಪ್ರಾಥಮಿಕ ಆರೋಗ್ಯ ಕೇಂದ್ರಗಳ ಉನ್ನತೀಕರಣ ಮತ್ತು ಉಚಿತ ಔಷಧ ವಿತರಣೆ.",
      descEn: "We are committed to expanding access to quality healthcare, modern mobile rural clinics, and ensuring families thrive.",
      badgeKn: "ಸಂಚಾರಿ ಆಸ್ಪತ್ರೆ",
      badgeEn: "Mobile Clinics",
    },
    {
      id: "education-excellence",
      category: "education",
      categoryLabelKn: "ಶಿಕ್ಷಣ",
      categoryLabelEn: "Education",
      icon: GraduationCap,
      titleKn: "ಗುಣಮಟ್ಟದ ಶಿಕ್ಷಣ & ಮಾದರಿ ಶಾಲೆಗಳು",
      titleEn: "Education excellence",
      descKn: "ಸರ್ಕಾರಿ ಶಾಲೆಗಳಲ್ಲಿ ಡಿಜಿಟಲ್ ಸ್ಮಾರ್ಟ್ ತರಗತಿಗಳು, ವಿಜ್ಞಾನ ಪ್ರಯೋಗಾಲಯಗಳು ಮತ್ತು ಗ್ರಾಮೀಣ ವಿದ್ಯಾರ್ಥಿಗಳಿಗೆ ಉಚಿತ ಶಾಲಾ ಬಸ್ ಸೌಲಭ್ಯ.",
      descEn: "Upgrading government schools with digital learning tools, modern science labs, and free transport support for rural students.",
      badgeKn: "ಸ್ಮಾರ್ಟ್ ಶಾಲೆ",
      badgeEn: "Smart Schools",
    },
    {
      id: "government-reform",
      category: "governance",
      categoryLabelKn: "ಆಡಳಿತ",
      categoryLabelEn: "Governance",
      icon: Landmark,
      titleKn: "ಆಡಳಿತ ಸುಧಾರಣೆ & ದಕ್ಷತೆ",
      titleEn: "Government reform",
      descKn: "ಸಾರ್ವಜನಿಕ ಸೇವೆಗಳಲ್ಲಿ ವಿಳಂಬ ತಪ್ಪಿಸುವುದು, ಅನಗತ್ಯ ಮಧ್ಯವರ್ತಿಗಳ ನಿರ್ಮೂಲನೆ ಮತ್ತು ತ್ವರಿತ ಕಡತ ವಿಲೇವಾರಿ ಖಾತರಿ.",
      descEn: "Reducing administrative inefficiency, increasing public service speed, and ensuring prompt, corruption-free file clearance.",
      badgeKn: "ದಕ್ಷ ಸೇವೆ",
      badgeEn: "Efficiency",
    },
    {
      id: "public-safety",
      category: "governance",
      categoryLabelKn: "ಭದ್ರತೆ",
      categoryLabelEn: "Safety",
      icon: ShieldAlert,
      titleKn: "ಸಾರ್ವಜನಿಕ ಸುರಕ್ಷತೆ & ಮಹಿಳಾ ರಕ್ಷಣೆ",
      titleEn: "Public safety & security",
      descKn: "ಪ್ರಮುಖ ಸಾರ್ವಜನಿಕ ಸ್ಥಳಗಳಲ್ಲಿ ಸಿಸಿಟಿವಿ ಕಣ್ಗಾವಲು, ಮಹಿಳಾ ಸುರಕ್ಷತಾ ಸಹಾಯವಾಣಿ ಮತ್ತು ಶಾಂತಿ ಸುವ್ಯವಸ್ಥೆ ಕಾಪಾಡುವ ಕ್ರಮಗಳು.",
      descEn: "We will work to create safer communities through modern surveillance, dedicated women's helplines, and prompt response teams.",
      badgeKn: "24/7 ಕಣ್ಗಾವಲು",
      badgeEn: "24/7 Safety",
    },
    {
      id: "government-transparency",
      category: "governance",
      categoryLabelKn: "ಆಡಳಿತ",
      categoryLabelEn: "Transparency",
      icon: Scale,
      titleKn: "ಪಾರದರ್ಶಕ ಜನಸಂಪರ್ಕ & ಹೊಣೆಗಾರಿಕೆ",
      titleEn: "Government transparency",
      descKn: "ಸಾರ್ವಜನಿಕ ಅನುದಾನ ಬಳಕೆಯ ಮುಕ್ತ ವರದಿ, ನಿಯಮಿತ ಗ್ರಾಮ ಸಭೆಗಳು ಮತ್ತು ಶ್ರೀ ಹರ್ಷಾನಂದ ಗುತ್ತೇದಾರ ಅವರ ನೇರ ಜನಸಂಪರ್ಕ ಕಚೇರಿ.",
      descEn: "Strengthening accountability, ethical leadership, open developmental audits, and direct citizen access to the leader's office.",
      badgeKn: "ಮುಕ್ತ ಲೆಕ್ಕಪರಿಶೋಧನೆ",
      badgeEn: "Open Audits",
    },
    {
      id: "infrastructure",
      category: "infrastructure",
      categoryLabelKn: "ಮೂಲಸೌಕರ್ಯ",
      categoryLabelEn: "Infrastructure",
      icon: Building2,
      titleKn: "ಗ್ರಾಮೀಣ ರಸ್ತೆಗಳು & ಸಂಪರ್ಕ ಕ್ರಾಂತಿ",
      titleEn: "Infrastructure",
      descKn: "ಪ್ರತಿ ಹಳ್ಳಿಯನ್ನು ಸಂಪರ್ಕಿಸುವ ಸುಸಜ್ಜಿತ ಡಾಂಬರು ರಸ್ತೆಗಳು, ಸೇತುವೆ ನಿರ್ಮಾಣ, ನಿರಂತರ ವಿದ್ಯುತ್ ಮತ್ತು ಹೈ-ಸ್ಪೀಡ್ ಇಂಟರ್ನೆಟ್ ಸಂಪರ್ಕ.",
      descEn: "Investing in all-weather village roads, durable bridges, round-the-clock utilities, and digital broadband connectivity.",
      badgeKn: "ಸರ್ವಋತು ರಸ್ತೆಗಳು",
      badgeEn: "All-Weather Roads",
    },
    {
      id: "community-empowerment",
      category: "health",
      categoryLabelKn: "ಸಮುದಾಯ",
      categoryLabelEn: "Community",
      icon: Users,
      titleKn: "ಸ್ತ್ರೀಶಕ್ತಿ & ಸಮುದಾಯ ಸಬಲೀಕರಣ",
      titleEn: "Community empowerment",
      descKn: "ಮಹಿಳಾ ಸ್ವಸಹಾಯ ಸಂಘಗಳಿಗೆ ಬಡ್ಡಿರಹಿತ ಆರ್ಥಿಕ ನೆರವು, ಗುಡಿ ಕೈಗಾರಿಕೆಗಳಿಗೆ ಪ್ರೋತ್ಸಾಹ ಮತ್ತು ಸಮುದಾಯ ಭವನಗಳ ನಿರ್ಮಾಣ.",
      descEn: "Supporting local women's self-help groups through micro-capital, village craft incubation, and community centers.",
      badgeKn: "ಸ್ತ್ರೀಶಕ್ತಿ ಸಂಘಗಳು",
      badgeEn: "Women SHGs",
    },
    {
      id: "energy-independence",
      category: "economy",
      categoryLabelKn: "ಇಂಧನ",
      categoryLabelEn: "Energy",
      icon: SunMedium,
      titleKn: "ಸೌರ ವಿದ್ಯುತ್ & ಹಸಿರು ಇಂಧನ",
      titleEn: "Energy independence",
      descKn: "ರೈತರ ಪಂಪ್‌ಸೆಟ್‌ಗಳಿಗೆ ಸೋಲಾರ್ ವಿದ್ಯುತ್ ಸಬ್ಸಿಡಿ, ಸಾರ್ವಜನಿಕ ಕಟ್ಟಡಗಳಿಗೆ ಸೌರಫಲಕ ಅಳವಡಿಕೆ ಮತ್ತು ನಿರಂತರ ಕೃಷಿ ವಿದ್ಯುತ್.",
      descEn: "Investing in reliable solar agricultural pump subsidies and clean energy microgrids that strengthen farm power security.",
      badgeKn: "ಸೋಲಾರ್ ಪಂಪ್‌ಸೆಟ್",
      badgeEn: "Solar Pumps",
    },
    {
      id: "youth-opportunity",
      category: "education",
      categoryLabelKn: "ಯುವಜನತೆ",
      categoryLabelEn: "Youth",
      icon: Briefcase,
      titleKn: "ಯುವ ಉದ್ಯೋಗಾವಕಾಶ & ಸ್ಪರ್ಧಾತ್ಮಕ ತರಬೇತಿ",
      titleEn: "Youth opportunity",
      descKn: "ಕೆಪಿಎಸ್‌ಸಿ, ಯುಪಿಎಸ್‌ಸಿ ಪರೀಕ್ಷೆಗಳಿಗೆ ಉಚಿತ ಮಾರ್ಗದರ್ಶನ ಕೇಂದ್ರಗಳು, ಸುಸಜ್ಜಿತ ಗ್ರಂಥಾಲಯಗಳು ಮತ್ತು ಬೃಹತ್ ಉದ್ಯೋಗ ಮೇಳಗಳು.",
      descEn: "Creating free career coaching hubs for competitive exams, modern study libraries, and large-scale regional job fairs.",
      badgeKn: "ಉಚಿತ ತರಬೇತಿ",
      badgeEn: "Free Coaching",
    },
    {
      id: "clean-water-irrigation",
      category: "infrastructure",
      categoryLabelKn: "ಜಲಸಂಪನ್ಮೂಲ",
      categoryLabelEn: "Water",
      icon: Droplets,
      titleKn: "ಶುದ್ಧ ಕುಡಿಯುವ ನೀರು & ಕೆರೆ ಅಭಿವೃದ್ಧಿ",
      titleEn: "Clean drinking water & lakes",
      descKn: "ಪ್ರತಿ ಮನೆಗೂ ಜಲಜೀವನ್ ನಲ್ಲಿ ನೀರು, ಶುದ್ಧ ಕುಡಿಯುವ ನೀರಿನ ಶುದ್ಧೀಕರಣ ಘಟಕಗಳು ಮತ್ತು ಐತಿಹಾಸಿಕ ಕೆರೆ-ಬಾವಿಗಳ ಹೂಳೆತ್ತುವ ಯೋಜನೆ.",
      descEn: "Ensuring pure piped drinking water in every village, installing community RO plants, and desilting historical water bodies.",
      badgeKn: "ಜಲ ಸಂರಕ್ಷಣೆ",
      badgeEn: "Water Mission",
    },
    {
      id: "tur-dal-export",
      category: "economy",
      categoryLabelKn: "ರೈತರು",
      categoryLabelEn: "Farmer Export",
      icon: Sprout,
      titleKn: "ಕಲಬುರಗಿ ತೊಗರಿ ರಫ್ತು ಕೇಂದ್ರ",
      titleEn: "GI Tur Dal export mission",
      descKn: "ಜಿಐ ಮಾನ್ಯತೆಯುಳ್ಳ ತೊಗರಿ ಬೆಳೆಗೆ ಜಾಗತಿಕ ಮಾರುಕಟ್ಟೆ, ದಲ್ಲಾಳಿಗಳ ಹಾವಳಿ ಮುಕ್ತ ನೇರ ಖರೀದಿ ಮತ್ತು ಆಧುನಿಕ ಶೀತಲ ಗೋದಾಮುಗಳು.",
      descEn: "Elevating Kalaburagi's GI-tagged red gram to global markets with direct port connectivity and modern cold-storage facilities.",
      badgeKn: "ರಫ್ತು ಮಂಡಿ",
      badgeEn: "Global Trade",
    },
  ];

  const filterTabs = [
    { id: "all", labelKn: "ಎಲ್ಲಾ ಯೋಜನೆಗಳು", labelEn: "All Initiatives" },
    { id: "economy", labelKn: "ಆರ್ಥಿಕತೆ & ರೈತರು", labelEn: "Economy & Farmers" },
    { id: "infrastructure", labelKn: "ಮೂಲಸೌಕರ್ಯ & ನೀರು", labelEn: "Infrastructure" },
    { id: "education", labelKn: "ಶಿಕ್ಷಣ & ಯುವಜನತೆ", labelEn: "Education & Youth" },
    { id: "health", labelKn: "ಆರೋಗ್ಯ & ಸಮಾಜ", labelEn: "Healthcare" },
    { id: "governance", labelKn: "ಪಾರದರ್ಶಕ ಆಡಳಿತ", labelEn: "Governance" },
  ];

  const filteredInitiatives = activeTab === "all" 
    ? initiatives 
    : initiatives.filter((item) => item.category === activeTab);

  return (
    <section
      id="initiatives"
      className="relative z-10 bg-white text-slate-900 py-16 sm:py-24 lg:py-28 border-t border-slate-100"
      aria-label="Development Initiatives Section"
    >
      <div className="w-full px-5 sm:px-8 md:px-10 lg:px-12 xl:px-16 2xl:px-20 max-w-7xl mx-auto">
        
        {/* =========================================================
            1. SECTION HEADER
            ========================================================= */}
        <div className="max-w-3xl mb-12 sm:mb-16">
          <span className="text-xs sm:text-sm font-bold tracking-widest text-slate-800 uppercase flex items-center gap-1.5 mb-3">
            <span className="w-1.5 h-1.5 rounded-full bg-[#b91c1c]" />
            {language === "kn" ? "ಅಭಿವೃದ್ಧಿ ಯೋಜನೆಗಳು" : "DEVELOPMENT INITIATIVES"}
          </span>

          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-[54px] font-extrabold text-slate-900 tracking-tight leading-[1.15] mb-4">
            {language === "kn" ? (
              <>
                ಕಲಬುರಗಿಯ ಸಮಗ್ರ ಪ್ರಗತಿಗಾಗಿ{" "}
                <span className="block mt-1">ನಮ್ಮ ಅಭಿವೃದ್ಧಿ ಯೋಜನೆಗಳು</span>
              </>
            ) : (
              <>
                Transformative Initiatives for{" "}
                <span className="block mt-1">Kalaburagi&apos;s Future</span>
              </>
            )}
          </h2>

          <p className="text-slate-600 text-sm sm:text-base lg:text-lg leading-relaxed">
            {language === "kn"
              ? "ಶ್ರೀ ಹರ್ಷಾನಂದ ಗುತ್ತೇದಾರ ಅವರ ನೇತೃತ್ವದಲ್ಲಿ ಪ್ರತಿಯೊಂದು ವರ್ಗದ ನಾಗರಿಕರ ಬದುಕು ಸುಧಾರಿಸಲು, ಹಳ್ಳಿಗಳ ಮೂಲಸೌಕರ್ಯ ಬಲಪಡಿಸಲು ಮತ್ತು ಪಾರದರ್ಶಕ ಆಡಳಿತ ನೀಡಲು ರೂಪಿಸಲಾದ ಕಾರ್ಯಕ್ರಮಗಳು."
              : "Strategic, accountable development programs designed by Harshanand Guttedar to uplift every community, strengthen infrastructure, and empower rural livelihoods."}
          </p>
        </div>

        {/* =========================================================
            2. INTERACTIVE CATEGORY FILTER TABS
            ========================================================= */}
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-2 mb-10 sm:mb-14">
          {filterTabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 sm:px-5 py-2 sm:py-2.5 rounded-full text-xs sm:text-sm font-semibold transition-all shrink-0 cursor-pointer ${
                activeTab === tab.id
                  ? "bg-slate-900 text-white shadow-md shadow-slate-900/20"
                  : "bg-slate-100 hover:bg-slate-200/80 text-slate-700 border border-slate-200/80"
              }`}
            >
              {language === "kn" ? tab.labelKn : tab.labelEn}
            </button>
          ))}
        </div>

        {/* =========================================================
            3. INITIATIVES GRID (Exact Reference Screenshot 2: 3-Column Multi-Row)
            ========================================================= */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7 mb-20 sm:mb-24">
          {filteredInitiatives.map((item) => (
            <div
              key={item.id}
              className="rounded-2xl sm:rounded-3xl border border-slate-200/90 bg-white p-7 sm:p-8 shadow-sm hover:shadow-xl hover:border-slate-400/80 transition-all duration-300 flex flex-col justify-between group"
            >
              <div>
                {/* Top Row: Clean Outline Icon + Category Tag */}
                <div className="flex items-center justify-between mb-6">
                  <div className="w-12 h-12 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-center text-slate-800 group-hover:scale-105 group-hover:bg-slate-900 group-hover:text-amber-400 group-hover:border-slate-900 transition-all duration-300 shadow-xs">
                    <item.icon className="w-5 h-5 sm:w-6 sm:h-6" />
                  </div>

                  <span className="text-[11px] font-bold px-3 py-1 rounded-full bg-slate-100 text-slate-700 border border-slate-200">
                    {language === "kn" ? item.badgeKn : item.badgeEn}
                  </span>
                </div>

                {/* Title */}
                <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight leading-snug mb-3 group-hover:text-[#b91c1c] transition-colors">
                  {language === "kn" ? item.titleKn : item.titleEn}
                </h3>

                {/* Description */}
                <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                  {language === "kn" ? item.descKn : item.descEn}
                </p>
              </div>

              {/* Bottom Subtle Status Indicator */}
              <div className="pt-6 mt-6 border-t border-slate-100 flex items-center justify-between text-xs font-semibold text-slate-500">
                <span className="flex items-center gap-1.5 text-emerald-700">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>{language === "kn" ? "ಸಕ್ರಿಯ ಯೋಜನೆ" : "Active Priority"}</span>
                </span>
                <span className="text-slate-400 group-hover:translate-x-1 group-hover:text-slate-900 transition-all">
                  &rarr;
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* =========================================================
            4. HIGH-IMPACT CITIZEN CTA BANNER (Exact Reference Screenshot 1)
            With balanced circular emblems on left and right, double-pill button, & phone helpline
            ========================================================= */}
        <div className="relative rounded-3xl p-8 sm:p-12 lg:p-16 border border-slate-200/90 shadow-2xl bg-white overflow-hidden text-center">
          
          {/* Subtle Ambient Background Flare */}
          <div className="absolute inset-0 bg-radial from-amber-50/60 via-transparent to-transparent pointer-events-none" />

          {/* LEFT CIRCULAR VISUAL EMBLEM (Screenshot 1 Balanced Element) */}
          <div className="hidden lg:flex absolute left-8 xl:left-14 top-1/2 -translate-y-1/2 items-center justify-center pointer-events-none select-none">
            <div className="relative w-40 h-40 xl:w-48 xl:h-48 rounded-full border-4 border-dashed border-amber-300/80 p-3 animate-spin-slow">
              <div className="w-full h-full rounded-full bg-gradient-to-tr from-amber-100 via-red-50 to-amber-50 border border-amber-200 flex flex-col items-center justify-center p-3 text-center shadow-inner">
                <span className="w-10 h-10 rounded-full bg-gradient-to-tr from-amber-400 via-red-500 to-amber-500 p-[2px] shadow-sm flex items-center justify-center mb-1">
                  <span className="w-full h-full rounded-full bg-black flex items-center justify-center text-amber-400 font-extrabold text-sm">ಹ</span>
                </span>
                <span className="text-[10px] font-black uppercase tracking-wider text-slate-800">
                  {language === "kn" ? "ಜನಸೇವೆಯ ಸಂಕಲ್ಪ" : "Citizen First"}
                </span>
                <span className="text-[9px] text-red-700 font-bold">★★★★★</span>
              </div>
            </div>
          </div>

          {/* RIGHT CIRCULAR VISUAL EMBLEM (Screenshot 1 Balanced Element) */}
          <div className="hidden lg:flex absolute right-8 xl:right-14 top-1/2 -translate-y-1/2 items-center justify-center pointer-events-none select-none">
            <div className="relative w-40 h-40 xl:w-48 xl:h-48 rounded-full border-4 border-dashed border-emerald-300/80 p-3">
              <div className="w-full h-full rounded-full bg-gradient-to-tr from-emerald-50 via-lime-50 to-white border border-emerald-200 flex flex-col items-center justify-center p-3 text-center shadow-inner">
                <div className="w-10 h-10 rounded-full bg-emerald-600 text-white flex items-center justify-center mb-1 shadow-sm">
                  <Sparkles className="w-5 h-5 text-amber-300" />
                </div>
                <span className="text-[10px] font-black uppercase tracking-wider text-emerald-900">
                  {language === "kn" ? "ಕಲಬುರಗಿ 2030" : "Vision 2030"}
                </span>
                <span className="text-[9px] text-emerald-700 font-bold">100% Focused</span>
              </div>
            </div>
          </div>

          {/* CENTER CONTENT */}
          <div className="relative z-10 max-w-2xl mx-auto space-y-5">
            
            {/* Big Headline (Screenshot 1 Match) */}
            <h3 className="text-2xl sm:text-4xl lg:text-[42px] font-black text-slate-900 tracking-tight leading-[1.2]">
              {language === "kn" ? (
                <>
                  ಕಲಬುರಗಿಯ ಸಮಗ್ರ ಪ್ರಗತಿಯಲ್ಲಿ{" "}
                  <span className="text-[#b91c1c]">ಜೊತೆಯಾಗಲು ಸಿದ್ಧರಿದ್ದೀರಾ?</span>
                </>
              ) : (
                <>
                  Ready to build a stronger{" "}
                  <span className="text-[#b91c1c]">Kalaburagi together?</span>
                </>
              )}
            </h3>

            {/* Subtitle */}
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed max-w-lg mx-auto">
              {language === "kn"
                ? "ನಿಮ್ಮ ವಾರ್ಡ್ ಅಥವಾ ಗ್ರಾಮದ ಸಮಸ್ಯೆ ಪರಿಹರಿಸಲು ಅಥವಾ ಕಚೇರಿ ಭೇಟಿಗೆ ಉಚಿತವಾಗಿ ನೋಂದಾಯಿಸಿ."
                : "Book a consultation with our public office, share local development ideas, or report a civic issue in your ward."}
            </p>

            {/* DOUBLE PILL BUTTON (Screenshot 1 Match: Outer Ring + Red Pill) */}
            <div className="pt-2 flex justify-center">
              <Link
                href="#talk-to-us"
                className="inline-flex items-center p-1 rounded-full border-2 border-red-600/60 shadow-lg hover:border-red-600 transition-all group"
              >
                <span className="px-6 sm:px-8 py-3 rounded-full bg-[#b91c1c] group-hover:bg-[#991b1b] text-white text-xs sm:text-sm font-extrabold tracking-wide transition-all shadow-md flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-amber-300" />
                  <span>{language === "kn" ? "ಕಚೇರಿ ಭೇಟಿ ನಿಗದಿಪಡಿಸಿ" : "Reserve Office Visit"}</span>
                  <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                </span>
              </Link>
            </div>

            {/* Direct Phone Helpline Below Button (Screenshot 1 Match) */}
            <div className="pt-3">
              <a
                href="tel:+918472250148"
                className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-slate-800 hover:text-[#b91c1c] transition-colors"
              >
                <Phone className="w-4 h-4 text-[#b91c1c]" />
                <span>Office Helpline: +91 8472 250148</span>
              </a>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}

