"use client";

import React, { useState } from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PageHeroBanner from "@/components/common/PageHeroBanner";
import ImagePlaceholder from "@/components/common/ImagePlaceholder";
import { useLanguage } from "@/context/LanguageContext";
import { ARTICLES_DATA, Article } from "@/data/mockData";
import { Newspaper, Clock, Calendar, ArrowRight, User, BookOpen } from "lucide-react";

export default function ArticlesPage() {
  const { language } = useLanguage();
  const [selectedCategory, setSelectedCategory] = useState<string>("all");

  const categories = [
    { id: "all", labelKn: "ಎಲ್ಲಾ ಲೇಖನಗಳು", labelEn: "All Posts" },
    { id: "farmer-export", labelKn: "ರೈತರ ರಫ್ತು & ಕೃಷಿ", labelEn: "Farmer Export" },
    { id: "governance", labelKn: "ಪಾರದರ್ಶಕ ಆಡಳಿತ", labelEn: "Governance" },
    { id: "education", labelKn: "ಶಿಕ್ಷಣ & ಯುವಜನತೆ", labelEn: "Education" },
    { id: "health", labelKn: "ಆರೋಗ್ಯ & ಸಮಾಜ", labelEn: "Healthcare" },
    { id: "economy", labelKn: "ಗ್ರಾಮೀಣ ಆರ್ಥಿಕತೆ", labelEn: "Rural Economy" },
  ];

  const featuredArticle = ARTICLES_DATA.find((a) => a.featured) || ARTICLES_DATA[0];

  const filteredArticles = selectedCategory === "all"
    ? ARTICLES_DATA
    : ARTICLES_DATA.filter((a) => a.category === selectedCategory);

  return (
    <main className="min-h-screen bg-white text-slate-900 relative overflow-x-hidden">
      <Navbar />

      <PageHeroBanner
        badgeKn="ಬ್ಲಾಗ್ & ಲೇಖನಗಳು"
        badgeEn="BLOG & INSIGHTS"
        titleKn={
          <>
            ವಿಚಾರಗಳು, ಲೇಖನಗಳು &{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-amber-200 to-red-400">
              ಧೋರಣಾ ಒಳನೋಟಗಳು
            </span>
          </>
        }
        titleEn={
          <>
            Fresh Ideas &{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-amber-200 to-red-400">
              Policy Insights
            </span>
          </>
        }
        subtitleKn="ಕಲಬುರಗಿಯ ಅಭಿವೃದ್ಧಿ, ಕೃಷಿ ರಫ್ತು, ಸಾರ್ವಜನಿಕ ನೀತಿ ಮತ್ತು ಗ್ರಾಮೀಣ ಸಬಲೀಕರಣದ ಕುರಿತಾದ ಸಮಗ್ರ ಬರಹಗಳ ಸಂಗ್ರಹ."
        subtitleEn="Explore a curated collection of articles, policy insights, and developmental perspectives from Shri Harshanand Guttedar and experts."
        breadcrumbLabelKn="ಲೇಖನಗಳು"
        breadcrumbLabelEn="Articles"
        icon={Newspaper}
      />

      <section className="py-12 sm:py-16 lg:py-20 bg-white" aria-label="Articles Feed">
        <div className="w-full px-5 sm:px-8 md:px-10 lg:px-12 xl:px-16 2xl:px-20 max-w-7xl mx-auto space-y-14 sm:space-y-16">
          
          {/* =========================================================
              FEATURED HERO ARTICLE CARD (Exact Screenshot 5 Match)
              ========================================================= */}
          {featuredArticle && (
            <div className="rounded-3xl overflow-hidden border border-slate-200 bg-slate-900 text-white shadow-2xl group">
              <Link href={`/articles/${featuredArticle.slug}`} className="block">
                <div className="relative w-full h-[320px] sm:h-[440px] lg:h-[500px] overflow-hidden">
                  <ImagePlaceholder
                    label={language === "kn" ? featuredArticle.imageLabelKn : featuredArticle.imageLabelEn}
                    height="h-full"
                    className="w-full h-full rounded-none border-none bg-slate-950 group-hover:scale-105 transition-transform duration-700"
                  />
                  
                  {/* Bottom Vignette Gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent flex flex-col justify-end p-6 sm:p-10 lg:p-12">
                    <div className="max-w-3xl space-y-3">
                      
                      {/* Category Badge & Read Time */}
                      <div className="flex items-center gap-3 text-xs font-semibold">
                        <span className="px-3 py-1 rounded-full bg-[#b91c1c] text-white">
                          {language === "kn" ? featuredArticle.categoryLabelKn : featuredArticle.categoryLabelEn}
                        </span>
                        <span className="flex items-center gap-1 text-slate-300">
                          <Clock className="w-3.5 h-3.5" />
                          <span>{featuredArticle.readTime}</span>
                        </span>
                      </div>

                      {/* Title */}
                      <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight leading-snug group-hover:text-amber-300 transition-colors">
                        {language === "kn" ? featuredArticle.titleKn : featuredArticle.titleEn}
                      </h2>

                      {/* Excerpt */}
                      <p className="text-slate-300 text-xs sm:text-sm lg:text-base line-clamp-2">
                        {language === "kn" ? featuredArticle.excerptKn : featuredArticle.excerptEn}
                      </p>

                      {/* Author & Date */}
                      <div className="pt-2 flex items-center gap-4 text-xs text-amber-200 font-medium">
                        <span className="flex items-center gap-1.5">
                          <User className="w-3.5 h-3.5" />
                          <span>{featuredArticle.author}</span>
                        </span>
                        <span>•</span>
                        <span className="flex items-center gap-1.5">
                          <Calendar className="w-3.5 h-3.5" />
                          <span>{featuredArticle.date}</span>
                        </span>
                      </div>

                    </div>
                  </div>
                </div>
              </Link>
            </div>
          )}

          {/* =========================================================
              EXPLORE CATEGORIZED POSTS + 6-GRID CARDS (Screenshot 3 & 5)
              ========================================================= */}
          <div className="space-y-8">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-slate-200 pb-5">
              <div>
                <span className="text-[11px] font-bold text-slate-500 uppercase tracking-widest block mb-1">
                  {language === "kn" ? "ವರ್ಗೀಕರಣದ ಮೂಲಕ ಹುಡುಕಿ" : "BLOG CATEGORIES"}
                </span>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                  {language === "kn" ? "ವಿಷಯವಾರು ಲೇಖನಗಳು" : "Explore Categorized Posts"}
                </h3>
              </div>

              {/* Filter Pills */}
              <div className="flex items-center gap-2 overflow-x-auto no-scrollbar">
                {categories.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => setSelectedCategory(cat.id)}
                    className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all shrink-0 cursor-pointer ${
                      selectedCategory === cat.id
                        ? "bg-slate-900 text-white shadow-sm"
                        : "bg-slate-100 hover:bg-slate-200 text-slate-700"
                    }`}
                  >
                    {language === "kn" ? cat.labelKn : cat.labelEn}
                  </button>
                ))}
              </div>
            </div>

            {/* Articles Grid (3 Columns) */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              {filteredArticles.map((article) => (
                <article
                  key={article.slug}
                  className="rounded-3xl border border-slate-200/90 bg-white overflow-hidden shadow-sm hover:shadow-xl hover:border-slate-300 transition-all duration-300 flex flex-col justify-between group"
                >
                  <Link href={`/articles/${article.slug}`} className="block">
                    {/* Thumbnail Image */}
                    <div className="relative w-full h-52 sm:h-56 overflow-hidden bg-slate-100">
                      <ImagePlaceholder
                        label={language === "kn" ? article.imageLabelKn : article.imageLabelEn}
                        height="h-full"
                        className="rounded-none border-none group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute top-3 left-3">
                        <span className="px-3 py-1 rounded-full bg-black/75 backdrop-blur-sm text-white text-[11px] font-bold uppercase tracking-wide">
                          {language === "kn" ? article.categoryLabelKn : article.categoryLabelEn}
                        </span>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-6 space-y-3">
                      <div className="flex items-center justify-between text-xs text-slate-500 font-medium">
                        <span className="flex items-center gap-1">
                          <Calendar className="w-3 h-3 text-red-600" />
                          <span>{article.date}</span>
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          <span>{article.readTime}</span>
                        </span>
                      </div>

                      <h4 className="text-lg sm:text-xl font-extrabold text-slate-900 tracking-tight leading-snug group-hover:text-[#b91c1c] transition-colors line-clamp-2">
                        {language === "kn" ? article.titleKn : article.titleEn}
                      </h4>

                      <p className="text-slate-600 text-xs sm:text-sm leading-relaxed line-clamp-3">
                        {language === "kn" ? article.excerptKn : article.excerptEn}
                      </p>
                    </div>
                  </Link>

                  {/* Read More Link */}
                  <div className="p-6 pt-0 border-t border-slate-100 mt-2">
                    <Link
                      href={`/articles/${article.slug}`}
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-900 group-hover:text-[#b91c1c] transition-colors"
                    >
                      <span>{language === "kn" ? "ಪೂರ್ಣ ಲೇಖನ ಓದಿ" : "Read Full Article"}</span>
                      <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          </div>

        </div>
      </section>

      <Footer />
    </main>
  );
}

