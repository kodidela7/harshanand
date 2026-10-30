"use client";

import React from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import InitiativesSection from "@/components/InitiativesSection";
import Footer from "@/components/Footer";
import { useLanguage } from "@/context/LanguageContext";
import { ChevronRight, Home, Sparkles } from "lucide-react";

export default function InitiativesPage() {
  const { language } = useLanguage();

  return (
    <main className="min-h-screen bg-white text-slate-900 relative overflow-x-hidden">
      {/* 1. Global Navigation Bar */}
      <Navbar />

      {/* 2. Top Header Hero Banner */}
      <section 
        className="relative pt-24 sm:pt-30 lg:pt-32 pb-8 sm:pb-10 text-white overflow-hidden"
        style={{
          background: `
            linear-gradient(135deg, 
              rgba(20, 5, 5, 0.98) 0%, 
              rgba(65, 15, 10, 0.96) 25%, 
              rgba(95, 25, 10, 0.94) 50%, 
              rgba(45, 10, 10, 0.97) 75%, 
              rgba(15, 4, 6, 0.99) 100%
            )
          `,
        }}
        aria-label="Initiatives Hero Banner"
      >
        <div 
          className="absolute top-0 left-1/4 w-[600px] h-[350px] pointer-events-none select-none"
          style={{
            background: "radial-gradient(ellipse at 50% 20%, rgba(245, 158, 11, 0.22) 0%, transparent 70%)",
          }}
        />

        <div className="w-full px-5 sm:px-8 md:px-10 lg:px-12 xl:px-16 2xl:px-20 max-w-7xl mx-auto relative z-10">
          {/* Breadcrumb Navigation */}
          <nav aria-label="Breadcrumb" className="mb-6">
            <ol className="flex items-center gap-2 text-xs sm:text-sm font-medium text-white/70">
              <li>
                <Link 
                  href="/" 
                  className="hover:text-amber-400 flex items-center gap-1.5 transition-colors"
                >
                  <Home className="w-3.5 h-3.5 text-amber-400" />
                  <span>{language === "kn" ? "ಮುಖಪುಟ" : "Home"}</span>
                </Link>
              </li>
              <li>
                <ChevronRight className="w-3.5 h-3.5 text-white/40" />
              </li>
              <li className="text-amber-400 font-semibold" aria-current="page">
                {language === "kn" ? "ಅಭಿವೃದ್ಧಿ ಯೋಜನೆಗಳು" : "Development Initiatives"}
              </li>
            </ol>
          </nav>

          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/15 text-xs font-semibold text-amber-300 mb-4 shadow-sm">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>{language === "kn" ? "ಕಲಬುರಗಿ ಪ್ರಗತಿ ಯೋಜನೆಗಳು" : "Kalaburagi Growth Action Plan"}</span>
            </div>

            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-[1.15] mb-4">
              {language === "kn" ? (
                <>
                  ಅಭಿವೃದ್ಧಿ ಯೋಜನೆಗಳು &{" "}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-amber-200 to-red-400">
                    ಪ್ರಗತಿಯ ಹೆಜ್ಜೆಗಳು
                  </span>
                </>
              ) : (
                <>
                  Development Initiatives &{" "}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-amber-200 to-red-400">
                    Community Impact
                  </span>
                </>
              )}
            </h1>

            <p className="text-white/80 text-sm sm:text-base lg:text-lg leading-relaxed max-w-2xl font-light">
              {language === "kn"
                ? "ಕಲಬುರಗಿಯ ಸಮಗ್ರ ಅಭಿವೃದ್ಧಿ, ರಸ್ತೆಗಳು, ಶಿಕ್ಷಣ, ಗ್ರಾಮೀಣ ಆರೋಗ್ಯ ಮತ್ತು ಕೃಷಿ ವಾಣಿಜ್ಯ ಸಬಲೀಕರಣಕ್ಕಾಗಿ ಕೈಗೊಂಡ ಕಾರ್ಯಕ್ರಮಗಳು."
                : "Dedicated programs advancing infrastructure, smart education, healthcare access, and agricultural prosperity across Kalaburagi."}
            </p>
          </div>
        </div>
      </section>

      {/* 3. Main Initiatives Section with Grid & CTA */}
      <InitiativesSection />

      {/* 4. Global Footer */}
      <Footer />
    </main>
  );
}

