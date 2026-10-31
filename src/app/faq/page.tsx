"use client";

import React, { useState } from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PageHeroBanner from "@/components/common/PageHeroBanner";
import { useLanguage } from "@/context/LanguageContext";
import { 
  HelpCircle, 
  ChevronDown, 
  Search, 
  PhoneCall, 
  MessageSquare, 
  ArrowRight,
  Sparkles
} from "lucide-react";

interface FAQItem {
  id: string;
  category: "all" | "farmer" | "citizen" | "meeting" | "youth";
  qKn: string;
  qEn: string;
  aKn: string;
  aEn: string;
}

export default function FAQPage() {
  const { language } = useLanguage();
  const [openId, setOpenId] = useState<string>("q1");
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState<string>("all");

  const faqs: FAQItem[] = [
    {
      id: "q1",
      category: "farmer",
      qKn: "ಕಲಬುರಗಿ ತೊಗರಿ ಬೆಳೆಗಾರರಿಗೆ ರಫ್ತು ಕೇಂದ್ರದಿಂದ ಯಾವ ನೆರವು ಸಿಗುತ್ತದೆ?",
      qEn: "What support does the Farmer Export Hub provide to local pulse growers?",
      aKn: "ರೈತ ಉತ್ಪಾದಕ ಸಂಘಗಳ (FPO) ಮೂಲಕ ನೇರ ಅಪೆಡಾ (APEDA) ರಫ್ತು ಪರವಾನಗಿ, ಜಿಐ-ಟ್ಯಾಗ್ ಗುಣಮಟ್ಟ ಪ್ರಮಾಣೀಕರಣ, ಆಧುನಿಕ ಸೋಲಾರ್ ಶೀತಲ ಗೋದಾಮು ಸೌಲಭ್ಯ ಮತ್ತು ಮಧ್ಯವರ್ತಿಗಳಿಲ್ಲದೆ ಅಂತಾರಾಷ್ಟ್ರೀಯ ಮಾರುಕಟ್ಟೆಗೆ ನೇರ ಸಂಪರ್ಕ ಕಲ್ಪಿಸಲಾಗುತ್ತದೆ.",
      aEn: "We assist Farmer Producer Organizations (FPOs) with APEDA export licensing, GI-tag compliance, solar cold storage, and direct international buyer linkage to ensure farmers get top dollar without middlemen exploitation.",
    },
    {
      id: "q2",
      category: "meeting",
      qKn: "ಶ್ರೀ ಹರ್ಷಾನಂದ ಗುತ್ತೇದಾರ ಅವರನ್ನು ಸಾರ್ವಜನಿಕರು ಹೇಗೆ ಭೇಟಿ ಮಾಡಬಹುದು?",
      qEn: "How can citizens meet Shri Harshanand Guttedar for personal grievances?",
      aKn: "ಆಳಂದ ಮತ್ತು ಕಲಬುರಗಿಯ ಜನಸಂಪರ್ಕ ಕಾರ್ಯಾಲಯದಲ್ಲಿ ಶ್ರೀ ಹರ್ಷಾನಂದ ಗುತ್ತೇದಾರ ಅವರು ನಿಯಮಿತವಾಗಿ ಸಾರ್ವಜನಿಕರನ್ನು ಭೇಟಿ ಮಾಡುತ್ತಾರೆ. ನಮ್ಮ ಸಹಾಯವಾಣಿ ಸಂಖ್ಯೆ (+91 8472 250148) ಕರೆ ಮಾಡಿ ಅಥವಾ ಈ ವೆಬ್‌ಸೈಟ್‌ನ 'Contact' ಪುಟದ ಮೂಲಕ ಮುಂಚಿತವಾಗಿಯೇ ಅಪಾಯಿಂಟ್‌ಮೆಂಟ್ ನಿಗದಿಪಡಿಸಿಕೊಳ್ಳಬಹುದು.",
      aEn: "Citizens can meet Shri Harshanand Guttedar during open grievance hours at the Aland or Kalaburagi secretariat. Appointments can be scheduled via helpline (+91 8472 250148) or online via our Contact page.",
    },
    {
      id: "q3",
      category: "citizen",
      qKn: "ಗ್ರಾಮೀಣ ಕುಡಿಯುವ ನೀರು ಮತ್ತು ರಸ್ತೆ ಸಮಸ್ಯೆಗಳನ್ನು ಹೇಗೆ ವರದಿ ಮಾಡುವುದು?",
      qEn: "How can we report local road, water, or electricity issues in our village?",
      aKn: "ನಮ್ಮ 24/7 ಸಾರ್ವಜನಿಕ ಸಹಾಯವಾಣಿಗೆ ಕರೆ ಮಾಡಿ ಅಥವಾ ವೆಬ್‌ಸೈಟ್‌ನ ಕುಂದುಕೊರತೆ ನಮೂನೆಯಲ್ಲಿ ನಿಮ್ಮ ಗ್ರಾಮದ ಹೆಸರು ಮತ್ತು ಸಮಸ್ಯೆಯ ವಿವರ ಸಲ್ಲಿಸಿ. ನಮ್ಮ ಕಾರ್ಯಕರ್ತರು ಸ್ಥಳಕ್ಕೆ ಭೇಟಿ ನೀಡಿ ಸಂಬಂಧಪಟ್ಟ ಇಲಾಖೆಯೊಂದಿಗೆ ಪರಿಹಾರಕ್ಕೆ ಶ್ರಮಿಸುತ್ತಾರೆ.",
      aEn: "Call our 24/7 helpline or submit the grievance form online. Our field coordinators directly follow up with relevant authorities until the issue is resolved.",
    },
    {
      id: "q4",
      category: "youth",
      qKn: "ಯುವಜನರಿಗೆ ಉಚಿತ ಸ್ಪರ್ಧಾತ್ಮಕ ಪರೀಕ್ಷಾ ತರಬೇತಿ ಮತ್ತು ಗ್ರಂಥಾಲಯ ಪ್ರವೇಶ ಹೇಗೆ ಪಡೆಯುವುದು?",
      qEn: "How can students access free competitive exam coaching and digital libraries?",
      aKn: "ಆಳಂದ ಹಾಗೂ ಕಲಬುರಗಿಯಲ್ಲಿರುವ ನಮ್ಮ ಅಧ್ಯಯನ ಕೇಂದ್ರಗಳಲ್ಲಿ ಕೆಪಿಎಸ್‌ಸಿ, ಯುಪಿಎಸ್‌ಸಿ, ಬ್ಯಾಂಕಿಂಗ್ ಮತ್ತು ಎಸ್‌ಎಸ್‌ಸಿ ಪರೀಕ್ಷೆಗಳ ಪುಸ್ತಕಗಳು ಮತ್ತು ಉಚಿತ ಇಂಟರ್ನೆಟ್ ಸೌಲಭ್ಯವಿದೆ. ಯಾವುದೇ ಶುಲ್ಕವಿಲ್ಲದೆ ನಿಮ್ಮ ಆಧಾರ್ ಕಾರ್ಡ್ ತೋರಿಸಿ ಸದಸ್ಯತ್ವ ಪಡೆಯಬಹುದು.",
      aEn: "Our modern study libraries provide free digital access, reference books, and mentorship for competitive exams. Membership is 100% free with a simple identity verification.",
    },
    {
      id: "q5",
      category: "citizen",
      qKn: "ಶ್ರೀ ಹರ್ಷಾನಂದ ಗುತ್ತೇದಾರ ಅವರ ಜನಸೇವಾ ಆಂದೋಲನದಲ್ಲಿ ಅಧಿಕೃತ ಸದಸ್ಯತ್ವ ಹೇಗೆ ಪಡೆಯುವುದು?",
      qEn: "How can citizens get official membership in our grassroots movement?",
      aKn: "ಯುವಕರು, ರೈತರು ಮತ್ತು ನಾಗರಿಕರು ನಮ್ಮ 'ಸದಸ್ಯತ್ವ ನೋಂದಣಿ ಫಾರ್ಮ್' (Membership Registration Form) ಭರ್ತಿ ಮಾಡುವ ಮೂಲಕ ಅಧಿಕೃತ ಡಿಜಿಟಲ್ ಸದಸ್ಯತ್ವ ಪಡೆಯಬಹುದು. ಆರೋಗ್ಯ ಶಿಬಿರಗಳು, ರೈತ ಸಂಪರ್ಕ ಸಭೆಗಳು ಮತ್ತು ಗ್ರಾಮ ಮಟ್ಟದ ಅಭಿವೃದ್ಧಿ ಕಾಮಗಾರಿಗಳಲ್ಲಿ ನೇರವಾಗಿ ಕೈಜೋಡಿಸಬಹುದು.",
      aEn: "Youth, farmers, and citizens can register via our Membership Registration Form to receive an official digital membership card and actively participate in health camps, farmer outreach drives, and local development projects.",
    },
    {
      id: "q6",
      category: "farmer",
      qKn: "ಉಚಿತ ಮಣ್ಣು ಪರೀಕ್ಷೆ ಸೌಲಭ್ಯವನ್ನು ರೈತರು ಹೇಗೆ ಪಡೆದುಕೊಳ್ಳುವುದು?",
      qEn: "How can farmers avail free soil testing and fertilizer advisory?",
      aKn: "ನಮ್ಮ 'Farmers' ಪುಟದಲ್ಲಿ ನಿಮ್ಮ ಜಮೀನಿನ ವಿಸ್ತೀರ್ಣ ಮತ್ತು ತಾಲೂಕು ನಮೂದಿಸಿ ನೋಂದಾಯಿಸಿ. ನಮ್ಮ ಸಂಚಾರಿ ಕೃಷಿ ತಜ್ಞರ ತಂಡವು ನಿಮ್ಮ ಹೊಲಕ್ಕೆ ಭೇಟಿ ನೀಡಿ ಮಣ್ಣಿನ ಮಾದರಿ ಸಂಗ್ರಹಿಸಿ 48 ಗಂಟೆಗಳಲ್ಲಿ ಸಮಗ್ರ ಪೋಷಕಾಂಶ ವರದಿ ನೀಡುತ್ತದೆ.",
      aEn: "Register on our Farmers page. Our field agronomy team will visit your land, collect soil samples, and deliver a comprehensive nutrient audit within 48 hours.",
    },
  ];

  const categories = [
    { id: "all", labelKn: "ಎಲ್ಲಾ ಪ್ರಶ್ನೆಗಳು", labelEn: "All Questions" },
    { id: "farmer", labelKn: "ರೈತರು & ರಫ್ತು", labelEn: "Farmers & Export" },
    { id: "meeting", labelKn: "ಮುಖಂಡರ ಭೇಟಿ", labelEn: "Meeting the Leader" },
    { id: "citizen", labelKn: "ನಾಗರಿಕ ಸೇವೆಗಳು", labelEn: "Citizen Grievances" },
    { id: "youth", labelKn: "ಶಿಕ್ಷಣ & ಯುವಜನತೆ", labelEn: "Youth & Exams" },
  ];

  const filteredFaqs = faqs.filter((faq) => {
    const matchesCategory = activeCategory === "all" || faq.category === activeCategory;
    const textKn = (faq.qKn + " " + faq.aKn).toLowerCase();
    const textEn = (faq.qEn + " " + faq.aEn).toLowerCase();
    const matchesSearch = !searchQuery || textKn.includes(searchQuery.toLowerCase()) || textEn.includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <main className="min-h-screen bg-white text-slate-900 relative overflow-x-hidden">
      <Navbar />

      <PageHeroBanner
        badgeKn="ಸಾಮಾನ್ಯ ಪ್ರಶ್ನೆಗಳು & ಉತ್ತರಗಳು"
        badgeEn="FREQUENTLY ASKED QUESTIONS"
        titleKn={
          <>
            ನಿಮ್ಮ ಪ್ರಶ್ನೆಗಳಿಗೆ{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-amber-200 to-red-400">
              ಸ್ಪಷ್ಟ ಉತ್ತರಗಳು
            </span>
          </>
        }
        titleEn={
          <>
            Frequently Asked{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-amber-200 to-red-400">
              Questions & Guidance
            </span>
          </>
        }
        subtitleKn="ಕಲಬುರಗಿ ತೊಗರಿ ರಫ್ತು, ಕುಂದುಕೊರತೆ ಪರಿಹಾರ, ಶ್ರೀ ಹರ್ಷಾನಂದ ಗುತ್ತೇದಾರ ಅವರ ಭೇಟಿ ಮತ್ತು ಯುವ ಸೌಲಭ್ಯಗಳ ಕುರಿತಾದ ಸಂಪೂರ್ಣ ಮಾಹಿತಿ."
        subtitleEn="Find clear answers about farmer export support, citizen services, leader meeting schedules, and youth welfare initiatives."
        breadcrumbLabelKn="ಪ್ರಶ್ನೋತ್ತರ (FAQ)"
        breadcrumbLabelEn="FAQ"
        icon={HelpCircle}
      />

      {/* Main FAQ Content Section */}
      <section className="py-12 sm:py-16 lg:py-20 bg-white" aria-label="FAQ Content">
        <div className="w-full px-5 sm:px-8 md:px-10 lg:px-12 xl:px-16 2xl:px-20 max-w-4xl mx-auto space-y-10">
          
          {/* Search Bar & Category Filters */}
          <div className="space-y-4">
            {/* Search Input */}
            <div className="relative">
              <Search className="w-5 h-5 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder={language === "kn" ? "ಪ್ರಶ್ನೆಗಳನ್ನು ಹುಡುಕಿ..." : "Search questions or topics..."}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3.5 rounded-2xl bg-slate-50 border border-slate-200 text-slate-900 text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-red-600 transition-all shadow-xs"
              />
            </div>

            {/* Category Pills */}
            <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-1">
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all shrink-0 cursor-pointer ${
                    activeCategory === cat.id
                      ? "bg-slate-900 text-white shadow-sm"
                      : "bg-slate-100 hover:bg-slate-200 text-slate-700"
                  }`}
                >
                  {language === "kn" ? cat.labelKn : cat.labelEn}
                </button>
              ))}
            </div>
          </div>

          {/* FAQ Accordion List */}
          <div className="space-y-4">
            {filteredFaqs.length === 0 ? (
              <div className="text-center py-12 text-slate-500 text-sm">
                {language === "kn" ? "ಯಾವುದೇ ಪ್ರಶ್ನೆಗಳು ಕಂಡುಬಂದಿಲ್ಲ." : "No matching questions found."}
              </div>
            ) : (
              filteredFaqs.map((faq, index) => {
                const isOpen = openId === faq.id;
                const formattedNum = String(index + 1).padStart(2, "0");

                return (
                  <div
                    key={faq.id}
                    className="rounded-2xl border border-slate-200 bg-white overflow-hidden shadow-xs hover:border-slate-300 transition-all"
                  >
                    <button
                      onClick={() => setOpenId(isOpen ? "" : faq.id)}
                      className="w-full flex items-center justify-between p-5 sm:p-6 text-left cursor-pointer gap-4 transition-colors hover:bg-slate-50"
                      aria-expanded={isOpen}
                    >
                      <div className="flex items-center gap-4">
                        <span className="text-sm font-extrabold text-slate-400 font-mono">
                          {formattedNum}
                        </span>
                        <span className="text-base sm:text-lg font-bold text-slate-900 tracking-tight">
                          {language === "kn" ? faq.qKn : faq.qEn}
                        </span>
                      </div>
                      <ChevronDown
                        className={`w-5 h-5 text-slate-500 shrink-0 transition-transform duration-300 ${
                          isOpen ? "rotate-180 text-red-600" : ""
                        }`}
                      />
                    </button>

                    {isOpen && (
                      <div className="px-5 sm:px-6 pb-6 pt-1 text-slate-600 text-sm sm:text-base leading-relaxed border-t border-slate-100 animate-in fade-in duration-200">
                        {language === "kn" ? faq.aKn : faq.aEn}
                      </div>
                    )}
                  </div>
                );
              })
            )}
          </div>

          {/* "Still Have Questions?" Help Box */}
          <div className="p-8 sm:p-10 rounded-3xl bg-gradient-to-br from-[#18181b] to-[#250808] text-white shadow-xl flex flex-col sm:flex-row items-center justify-between gap-6">
            <div className="space-y-2 text-center sm:text-left">
              <h3 className="text-xl sm:text-2xl font-extrabold tracking-tight">
                {language === "kn" ? "ಇನ್ನೂ ಪ್ರಶ್ನೆಗಳಿವೆಯೇ?" : "Still have questions?"}
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 max-w-md">
                {language === "kn"
                  ? "ನಮ್ಮ ಜನಸಂಪರ್ಕ ಕಚೇರಿಯನ್ನು ಸಂಪರ್ಕಿಸಿ ಅಥವಾ ನಿಮ್ಮ ಕುಂದುಕೊರತೆಯನ್ನು ನೇರವಾಗಿ ದಾಖಲಿಸಿ."
                  : "Reach out to Shri Harshanand Guttedar's public secretariat directly for immediate assistance."}
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-3 shrink-0">
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#b91c1c] hover:bg-[#991b1b] text-white font-bold text-xs sm:text-sm shadow-md transition-all"
              >
                <span>{language === "kn" ? "ಕಚೇರಿ ಸಂಪರ್ಕಿಸಿ" : "Contact Office"}</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <a
                href="tel:+918472250148"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-white/10 hover:bg-white/20 text-white font-semibold text-xs sm:text-sm border border-white/20 transition-all"
              >
                <PhoneCall className="w-4 h-4 text-amber-300" />
                <span>+91 8472 250148</span>
              </a>
            </div>
          </div>

        </div>
      </section>

      <Footer />
    </main>
  );
}

