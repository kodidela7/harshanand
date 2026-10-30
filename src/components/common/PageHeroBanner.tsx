"use client";

import React from "react";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";
import { ChevronRight, Home, Sparkles } from "lucide-react";

interface PageHeroBannerProps {
  badgeKn: string;
  badgeEn: string;
  titleKn: React.ReactNode;
  titleEn: React.ReactNode;
  subtitleKn: string;
  subtitleEn: string;
  breadcrumbLabelKn: string;
  breadcrumbLabelEn: string;
  parentBreadcrumb?: { href: string; labelKn: string; labelEn: string };
  icon?: React.ElementType;
}

export default function PageHeroBanner({
  badgeKn,
  badgeEn,
  titleKn,
  titleEn,
  subtitleKn,
  subtitleEn,
  breadcrumbLabelKn,
  breadcrumbLabelEn,
  parentBreadcrumb,
  icon: Icon = Sparkles,
}: PageHeroBannerProps) {
  const { language } = useLanguage();

  return (
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
      aria-label="Page Hero Banner"
    >
      {/* Background ambient amber flare */}
      <div 
        className="absolute top-0 left-1/4 w-[600px] h-[350px] pointer-events-none select-none"
        style={{
          background: "radial-gradient(ellipse at 50% 20%, rgba(245, 158, 11, 0.22) 0%, transparent 70%)",
        }}
      />

      <div className="w-full px-5 sm:px-8 md:px-10 lg:px-12 xl:px-16 2xl:px-20 max-w-7xl mx-auto relative z-10">
        
        {/* Breadcrumb Navigation */}
        <nav aria-label="Breadcrumb" className="mb-5 sm:mb-6">
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
            
            {parentBreadcrumb && (
              <>
                <li>
                  <ChevronRight className="w-3.5 h-3.5 text-white/40" />
                </li>
                <li>
                  <Link 
                    href={parentBreadcrumb.href} 
                    className="hover:text-amber-400 transition-colors"
                  >
                    {language === "kn" ? parentBreadcrumb.labelKn : parentBreadcrumb.labelEn}
                  </Link>
                </li>
              </>
            )}

            <li>
              <ChevronRight className="w-3.5 h-3.5 text-white/40" />
            </li>
            <li className="text-amber-400 font-semibold truncate" aria-current="page">
              {language === "kn" ? breadcrumbLabelKn : breadcrumbLabelEn}
            </li>
          </ol>
        </nav>

        {/* Hero Title & Subtitle */}
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/15 text-xs font-semibold text-amber-300 mb-3 sm:mb-4 shadow-sm">
            <Icon className="w-3.5 h-3.5 text-amber-400" />
            <span>{language === "kn" ? badgeKn : badgeEn}</span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-[1.15] mb-3 sm:mb-4">
            {language === "kn" ? titleKn : titleEn}
          </h1>

          <p className="text-white/80 text-sm sm:text-base lg:text-lg leading-relaxed max-w-2xl font-light">
            {language === "kn" ? subtitleKn : subtitleEn}
          </p>
        </div>

      </div>
    </section>
  );
}

