"use client";

import React, { useState } from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PageHeroBanner from "@/components/common/PageHeroBanner";
import ImagePlaceholder from "@/components/common/ImagePlaceholder";
import AnimatedCounter from "@/components/common/AnimatedCounter";
import { useLanguage } from "@/context/LanguageContext";
import { PUBLIC_WORKS_DATA, PublicWorkItem } from "@/data/mockData";
import { 
  Building2, 
  MapPin, 
  Users, 
  CheckCircle2, 
  Clock, 
  ArrowRight,
  Droplets,
  Sprout,
  Activity,
  PhoneCall
} from "lucide-react";

export default function PublicWorkPage() {
  const { language } = useLanguage();
  const [filter, setFilter] = useState<string>("all");

  const categories = [
    { id: "all", labelKn: "ಎಲ್ಲಾ ಕಾಮಗಾರಿಗಳು", labelEn: "All Public Works" },
    { id: "Infrastructure", labelKn: "ರಸ್ತೆ & ಮೂಲಸೌಕರ್ಯ", labelEn: "Infrastructure" },
    { id: "Clean Water", labelKn: "ಕುಡಿಯುವ ನೀರು", labelEn: "Clean Water" },
    { id: "Water Conservation", labelKn: "ಕೆರೆ & ಜಲ ಸಂರಕ್ಷಣೆ", labelEn: "Water Conservation" },
    { id: "Public Health", labelKn: "ಆರೋಗ್ಯ ಶಿಬಿರಗಳು", labelEn: "Public Health" },
    { id: "Agriculture", labelKn: "ಕೃಷಿ ರಫ್ತು & ಗೋದಾಮು", labelEn: "Agro Storage" },
    { id: "Education", labelKn: "ಡಿಜಿಟಲ್ ಗ್ರಂಥಾಲಯಗಳು", labelEn: "Education" },
  ];

  const filteredWorks = filter === "all"
    ? PUBLIC_WORKS_DATA
    : PUBLIC_WORKS_DATA.filter((item) => item.categoryEn === filter);

  return (
    <main className="min-h-screen bg-white text-slate-900 relative overflow-x-hidden">
      <Navbar />

      <PageHeroBanner
        badgeKn="ಅಭಿವೃದ್ಧಿ ಕಾರ್ಯಗಳು"
        badgeEn="DEVELOPMENT ACHIEVEMENTS"
        titleKn={
          <>
            ನೈಜ ಅಭಿವೃದ್ಧಿ &{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-amber-200 to-red-400">
              ಸಾರ್ವಜನಿಕ ಕಾಮಗಾರಿಗಳು
            </span>
          </>
        }
        titleEn={
          <>
            Visible Progress &{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-amber-200 to-red-400">
              Public Infrastructure
            </span>
          </>
        }
        subtitleKn="ಕಲಬುರಗಿ ಮತ್ತು ಆಳಂದ ತಾಲೂಕಿನಾದ್ಯಂತ ಕೈಗೊಳ್ಳಲಾದ ರಸ್ತೆಗಳು, ಕುಡಿಯುವ ನೀರು, ಕೆರೆ ಪುನಶ್ಚೇತನ, ಶೈಕ್ಷಣಿಕ ಗ್ರಂಥಾಲಯಗಳು ಮತ್ತು ಕೃಷಿ ಗೋದಾಮುಗಳ ಮುಕ್ತ ವರದಿ."
        subtitleEn="A transparent account of completed and ongoing civic infrastructure, drinking water installations, lake rejuvenation, and farmer storage facilities."
        breadcrumbLabelKn="ಸಾರ್ವಜನಿಕ ಕಾಮಗಾರಿಗಳು"
        breadcrumbLabelEn="Public Work"
        icon={Building2}
      />

      {/* Main Content */}
      <section className="py-12 sm:py-16 lg:py-20 bg-white" aria-label="Public Works Showcase">
        <div className="w-full px-5 sm:px-8 md:px-10 lg:px-12 xl:px-16 2xl:px-20 max-w-7xl mx-auto space-y-12 sm:space-y-16">
          
          {/* Key Stat Impact Counter Bar */}
          <div className="p-8 sm:p-10 rounded-3xl bg-[#f8f9fa] border border-slate-200 shadow-sm grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 text-center sm:text-left">
            <div>
              <div className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight leading-none mb-1">
                120<span className="text-[#b91c1c] font-black">km</span>
              </div>
              <div className="text-xs sm:text-sm text-slate-600 font-medium">
                {language === "kn" ? "ನಿರ್ಮಿಸಲಾದ ಸರ್ವಋತು ರಸ್ತೆಗಳು" : "Rural Roadways Built"}
              </div>
            </div>

            <div>
              <div className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight leading-none mb-1">
                52<span className="text-[#b91c1c] font-black">+</span>
              </div>
              <div className="text-xs sm:text-sm text-slate-600 font-medium">
                {language === "kn" ? "ಶುದ್ಧ ಕುಡಿಯುವ ನೀರಿನ ಘಟಕಗಳು" : "RO Clean Water Units"}
              </div>
            </div>

            <div>
              <div className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight leading-none mb-1">
                42<span className="text-[#b91c1c] font-black"> ಕೆರೆ</span>
              </div>
              <div className="text-xs sm:text-sm text-slate-600 font-medium">
                {language === "kn" ? "ಹೂಳೆತ್ತಿ ಪುನಶ್ಚೇತನಗೊಂಡ ಕೆರೆಗಳು" : "Irrigation Lakes Desilted"}
              </div>
            </div>

            <div>
              <div className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight leading-none mb-1">
                1.5<span className="text-[#b91c1c] font-black">Lakh+</span>
              </div>
              <div className="text-xs sm:text-sm text-slate-600 font-medium">
                {language === "kn" ? "ಪ್ರಯೋಜನ ಪಡೆದ ಗ್ರಾಮೀಣ ನಾಗರಿಕರು" : "Citizens Directly Impacted"}
              </div>
            </div>
          </div>

          {/* Category Filter Pills */}
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-1">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setFilter(cat.id)}
                className={`px-4 sm:px-5 py-2 rounded-full text-xs sm:text-sm font-semibold transition-all shrink-0 cursor-pointer ${
                  filter === cat.id
                    ? "bg-slate-900 text-white shadow-sm"
                    : "bg-slate-100 hover:bg-slate-200 text-slate-700"
                }`}
              >
                {language === "kn" ? cat.labelKn : cat.labelEn}
              </button>
            ))}
          </div>

          {/* Public Work Projects Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {filteredWorks.map((work) => (
              <div
                key={work.id}
                className="rounded-3xl border border-slate-200 bg-white p-7 sm:p-8 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between group"
              >
                <div className="space-y-4">
                  
                  {/* Top Row: Metric Highlight Badge + Status */}
                  <div className="flex items-center justify-between">
                    <span className="px-3.5 py-1.5 rounded-xl bg-amber-50 border border-amber-200 text-amber-900 font-extrabold text-xs">
                      {work.statNumber} • {language === "kn" ? work.statLabelKn : work.statLabelEn}
                    </span>

                    <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-700">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>{language === "kn" ? work.statusKn : work.statusEn}</span>
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="text-xl font-extrabold text-slate-900 tracking-tight leading-snug group-hover:text-[#b91c1c] transition-colors">
                    {language === "kn" ? work.titleKn : work.titleEn}
                  </h3>

                  {/* Description */}
                  <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
                    {language === "kn" ? work.descKn : work.descEn}
                  </p>

                  {/* Location & Beneficiaries Meta */}
                  <div className="pt-3 border-t border-slate-100 space-y-1.5 text-xs text-slate-600 font-medium">
                    <div className="flex items-center gap-2">
                      <MapPin className="w-3.5 h-3.5 text-[#b91c1c] shrink-0" />
                      <span>{language === "kn" ? work.locationKn : work.locationEn}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Users className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                      <span>{language === "kn" ? work.beneficiariesKn : work.beneficiariesEn}</span>
                    </div>
                  </div>

                </div>

                {/* Bottom Tag */}
                <div className="pt-6 mt-6 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500 font-semibold">
                  <span>{language === "kn" ? work.categoryKn : work.categoryEn}</span>
                  <Link
                    href="/contact"
                    className="text-slate-900 group-hover:text-[#b91c1c] inline-flex items-center gap-1 font-bold"
                  >
                    <span>{language === "kn" ? "ಅರ್ಜಿ ಸಲ್ಲಿಸಿ" : "Report / Request"}</span>
                    <ArrowRight className="w-3 h-3" />
                  </Link>
                </div>
              </div>
            ))}
          </div>

          {/* Suggest a Community Work / Report Need Box */}
          <div className="p-8 sm:p-12 rounded-3xl bg-gradient-to-r from-red-950 via-slate-900 to-black text-white shadow-xl flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="space-y-2 text-center md:text-left">
              <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
                {language === "kn" ? "ನಿಮ್ಮ ಊರಿನ ಸಮಸ್ಯೆಯನ್ನು ಗಮನಕ್ಕೆ ತರಬೇಕೆ?" : "Have a community project need in your village?"}
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 max-w-xl">
                {language === "kn"
                  ? "ಕುಡಿಯುವ ನೀರು, ರಸ್ತೆ ದುರಸ್ತಿ ಅಥವಾ ಶಾಲಾ ಮೂಲಸೌಕರ್ಯದ ಅಗತ್ಯವಿದ್ದರೆ ನಮ್ಮ ಜನಸಂಪರ್ಕ ಕಚೇರಿಗೆ ನೇರವಾಗಿ ಪ್ರಸ್ತಾವನೆ ಸಲ್ಲಿಸಿ."
                  : "Submit infrastructure proposals, drinking water requests, or road repair petitions directly to Harshanand Guttedar's team."}
              </p>
            </div>

            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-[#b91c1c] hover:bg-[#991b1b] text-white font-bold text-xs sm:text-sm shadow-md transition-all shrink-0"
            >
              <span>{language === "kn" ? "ಪ್ರಸ್ತಾವನೆ ಕಳುಹಿಸಿ" : "Submit Proposal"}</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

        </div>
      </section>

      <Footer />
    </main>
  );
}

