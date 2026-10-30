"use client";

import React, { useState } from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ImagePlaceholder from "@/components/common/ImagePlaceholder";
import { useLanguage } from "@/context/LanguageContext";
import { Article, ARTICLES_DATA } from "@/data/mockData";
import { 
  Calendar, 
  Clock, 
  User, 
  ArrowLeft, 
  Share2, 
  Bookmark, 
  Check, 
  ChevronRight, 
  Home, 
  ArrowRight 
} from "lucide-react";

interface ArticleDetailClientProps {
  article: Article;
}

export default function ArticleDetailClient({ article }: ArticleDetailClientProps) {
  const { language } = useLanguage();
  const [copied, setCopied] = useState(false);

  const relatedArticles = ARTICLES_DATA.filter((a) => a.slug !== article.slug).slice(0, 3);

  const handleShare = () => {
    if (typeof window !== "undefined") {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 3000);
    }
  };

  const paragraphs = language === "kn" ? article.contentKn : article.contentEn;

  return (
    <main className="min-h-screen bg-white text-slate-900 relative overflow-x-hidden">
      <Navbar />

      {/* Top Banner & Breadcrumb Header */}
      <section 
        className="relative pt-24 sm:pt-30 lg:pt-32 pb-10 sm:pb-14 text-white overflow-hidden"
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
      >
        <div className="w-full px-5 sm:px-8 md:px-10 lg:px-12 xl:px-16 2xl:px-20 max-w-4xl mx-auto relative z-10">
          
          {/* Breadcrumbs */}
          <nav aria-label="Breadcrumb" className="mb-6">
            <ol className="flex items-center gap-2 text-xs sm:text-sm font-medium text-white/70">
              <li>
                <Link href="/" className="hover:text-amber-400 flex items-center gap-1.5 transition-colors">
                  <Home className="w-3.5 h-3.5 text-amber-400" />
                  <span>{language === "kn" ? "ಮುಖಪುಟ" : "Home"}</span>
                </Link>
              </li>
              <li><ChevronRight className="w-3.5 h-3.5 text-white/40" /></li>
              <li>
                <Link href="/articles" className="hover:text-amber-400 transition-colors">
                  {language === "kn" ? "ಲೇಖನಗಳು" : "Articles"}
                </Link>
              </li>
              <li><ChevronRight className="w-3.5 h-3.5 text-white/40" /></li>
              <li className="text-amber-400 font-semibold truncate max-w-xs" aria-current="page">
                {language === "kn" ? article.categoryLabelKn : article.categoryLabelEn}
              </li>
            </ol>
          </nav>

          {/* Article Category Pill */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-600/30 border border-red-500/40 text-xs font-bold text-amber-300 mb-4">
            <span>{language === "kn" ? article.categoryLabelKn : article.categoryLabelEn}</span>
          </div>

          {/* Article Title */}
          <h1 className="text-2xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight leading-[1.2] mb-6">
            {language === "kn" ? article.titleKn : article.titleEn}
          </h1>

          {/* Metadata Row */}
          <div className="flex flex-wrap items-center gap-4 text-xs sm:text-sm text-slate-300 pt-2 border-t border-white/15">
            <span className="flex items-center gap-1.5 font-medium text-amber-300">
              <User className="w-4 h-4" />
              <span>{article.author}</span>
            </span>
            <span>•</span>
            <span className="flex items-center gap-1.5">
              <Calendar className="w-4 h-4 text-red-400" />
              <span>{article.date}</span>
            </span>
            <span>•</span>
            <span className="flex items-center gap-1.5">
              <Clock className="w-4 h-4 text-slate-400" />
              <span>{article.readTime}</span>
            </span>
          </div>

        </div>
      </section>

      {/* Main Article Body */}
      <article className="py-12 sm:py-16 bg-white" aria-label="Article Full Text">
        <div className="w-full px-5 sm:px-8 md:px-10 lg:px-12 max-w-4xl mx-auto space-y-10">
          
          {/* Back Button & Share Row */}
          <div className="flex items-center justify-between pb-6 border-b border-slate-200">
            <Link
              href="/articles"
              className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-slate-600 hover:text-slate-900 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>{language === "kn" ? "ಎಲ್ಲಾ ಲೇಖನಗಳಿಗೆ ಹಿಂತಿರುಗಿ" : "Back to All Articles"}</span>
            </Link>

            <button
              onClick={handleShare}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-slate-200 bg-slate-50 hover:bg-slate-100 text-xs font-semibold text-slate-700 cursor-pointer transition-colors"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-600" />
                  <span className="text-emerald-700">{language === "kn" ? "ಲಿಂಕ್ ನಕಲಿಸಲಾಗಿದೆ" : "Link Copied!"}</span>
                </>
              ) : (
                <>
                  <Share2 className="w-3.5 h-3.5" />
                  <span>{language === "kn" ? "ಹಂಚಿಕೊಳ್ಳಿ" : "Share"}</span>
                </>
              )}
            </button>
          </div>

          {/* Featured Image */}
          <div className="rounded-3xl overflow-hidden shadow-xl border border-slate-200 bg-slate-100">
            <ImagePlaceholder
              label={language === "kn" ? article.imageLabelKn : article.imageLabelEn}
              height="h-[300px] sm:h-[420px]"
              className="rounded-none border-none"
            />
          </div>

          {/* Lead Excerpt Paragraph */}
          <div className="p-6 sm:p-8 rounded-2xl bg-amber-50/70 border-l-4 border-amber-500 text-slate-800 text-base sm:text-lg font-medium leading-relaxed italic">
            &ldquo;{language === "kn" ? article.excerptKn : article.excerptEn}&rdquo;
          </div>

          {/* Content Paragraphs */}
          <div className="prose prose-slate prose-lg max-w-none space-y-6 text-slate-700 leading-relaxed text-sm sm:text-base">
            {paragraphs.map((p, idx) => (
              <p key={idx} className="leading-relaxed">
                {p}
              </p>
            ))}
          </div>

          {/* Author Box */}
          <div className="pt-8 border-t border-slate-200">
            <div className="p-6 sm:p-8 rounded-2xl bg-slate-50 border border-slate-200 flex flex-col sm:flex-row items-center gap-5 text-center sm:text-left">
              <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-amber-400 via-red-500 to-amber-500 p-[2px] shadow-md shrink-0">
                <div className="w-full h-full rounded-full bg-black flex items-center justify-center text-amber-400 font-extrabold text-xl">
                  ಹ
                </div>
              </div>
              <div className="space-y-1">
                <div className="font-extrabold text-slate-900 text-base sm:text-lg">
                  {language === "kn" ? "ಹರ್ಷಾನಂದ ಗುತ್ತೇದಾರ ಜನಸಂಪರ್ಕ ಕಚೇರಿ" : "Office of Shri Harshanand Guttedar"}
                </div>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  {language === "kn"
                    ? "ಕಲಬುರಗಿ ಮತ್ತು ಕಲ್ಯಾಣ ಕರ್ನಾಟಕದ ಸಮಗ್ರ ಅಭಿವೃದ್ಧಿ, ತೊಗರಿ ಬೆಳೆಗಾರರ ರಫ್ತು ಸಬಲೀಕರಣ ಹಾಗೂ ಸಾರ್ವಜನಿಕ ನೀತಿ ಕುರಿತ ಅಧಿಕೃತ ಪ್ರಕಟಣೆಗಳು."
                    : "Official communications, public policy analyses, and developmental perspectives dedicated to the welfare of Kalaburagi."}
                </p>
              </div>
            </div>
          </div>

          {/* Related Articles Row */}
          <div className="pt-8">
            <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight mb-6">
              {language === "kn" ? "ಇನ್ನಷ್ಟು ಲೇಖನಗಳು" : "Related Articles"}
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedArticles.map((rel) => (
                <Link
                  key={rel.slug}
                  href={`/articles/${rel.slug}`}
                  className="rounded-2xl border border-slate-200 p-5 bg-white shadow-xs hover:shadow-lg transition-all flex flex-col justify-between group"
                >
                  <div className="space-y-2">
                    <span className="text-[10px] font-bold uppercase text-red-700 tracking-wider">
                      {language === "kn" ? rel.categoryLabelKn : rel.categoryLabelEn}
                    </span>
                    <h4 className="text-sm font-bold text-slate-900 group-hover:text-[#b91c1c] transition-colors line-clamp-2">
                      {language === "kn" ? rel.titleKn : rel.titleEn}
                    </h4>
                  </div>
                  <div className="pt-4 flex items-center gap-1 text-xs font-semibold text-slate-600 group-hover:text-slate-900">
                    <span>{language === "kn" ? "ಓದಿ" : "Read"}</span>
                    <ArrowRight className="w-3 h-3 transition-transform group-hover:translate-x-1" />
                  </div>
                </Link>
              ))}
            </div>
          </div>

        </div>
      </article>

      <Footer />
    </main>
  );
}

