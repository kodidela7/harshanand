"use client";

import React, { useEffect, useState, use, Suspense } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useLanguage } from "@/context/LanguageContext";
import { 
  ArrowLeft, 
  Calendar, 
  Clock, 
  User, 
  Eye, 
  Share2, 
  Check, 
  ChevronRight, 
  Home, 
  BookOpen, 
  Tag, 
  Layers,
  Sparkles,
  Award
} from "lucide-react";

interface ArticleDetail {
  id: number;
  title_kn: string;
  title_en: string;
  summary_kn: string | null;
  summary_en: string | null;
  content_kn: string;
  content_en: string;
  category: string;
  author: string;
  banner_url: string | null;
  read_time: string;
  status: string;
  views_count: number;
  published_at: string;
  formatted_date: string;
}

interface RelatedArticle {
  id: number;
  title_kn: string;
  title_en: string;
  summary_kn: string | null;
  summary_en: string | null;
  category: string;
  author: string;
  banner_url: string | null;
  read_time: string;
  published_at: string;
}

const CATEGORY_NAMES: Record<string, { kn: string; en: string }> = {
  farmers: { kn: "ರೈತರು & ಕೃಷಿ", en: "Farmers & Agriculture" },
  development: { kn: "ಅಭಿವೃದ್ಧಿ ಕಾಮಗಾರಿ", en: "Development" },
  youth: { kn: "ಯುವಜನತೆ & ಉದ್ಯೋಗ", en: "Youth & Employment" },
  governance: { kn: "ಪಾರದರ್ಶಕ ಆಡಳಿತ", en: "Governance" },
  general: { kn: "ಸಾಮಾನ್ಯ ಲೇಖನ", en: "General" },
};

function ArticleReadingContent({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  const router = useRouter();
  const searchParams = useSearchParams();
  const fromPortal = searchParams.get("from") === "portal";

  const { language: globalLanguage, setLanguage: setGlobalLanguage } = useLanguage();
  const [articleLang, setArticleLang] = useState<"kn" | "en">(globalLanguage);

  const [article, setArticle] = useState<ArticleDetail | null>(null);
  const [related, setRelated] = useState<RelatedArticle[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  // Sync with global language changes initially
  useEffect(() => {
    setArticleLang(globalLanguage);
  }, [globalLanguage]);

  useEffect(() => {
    async function loadArticle() {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch(`/api/articles/${resolvedParams.id}`);
        const data = await res.json();
        if (data.success && data.article) {
          setArticle(data.article);
          if (Array.isArray(data.related)) {
            setRelated(data.related);
          }
        } else {
          setError(data.message || "Article not found.");
        }
      } catch (err) {
        console.error("Error loading article:", err);
        setError("Unable to connect to server. Please try again.");
      } finally {
        setLoading(false);
      }
    }
    loadArticle();
  }, [resolvedParams.id]);

  const handleShare = () => {
    if (typeof window !== "undefined") {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const getCategoryLabel = (cat: string) => {
    const entry = CATEGORY_NAMES[cat] || { kn: cat, en: cat };
    return articleLang === "kn" ? entry.kn : entry.en;
  };

  // Loading State
  if (loading) {
    return (
      <main className="min-h-screen bg-[#fafbfc] text-slate-800 flex flex-col">
        {!fromPortal && <Navbar />}
        {!fromPortal ? (
          <section 
            className="pt-32 sm:pt-40 pb-20 text-white text-center flex flex-col items-center justify-center flex-1"
            style={{
              background: `linear-gradient(135deg, rgba(20, 5, 5, 0.98) 0%, rgba(65, 15, 10, 0.96) 25%, rgba(95, 25, 10, 0.94) 50%, rgba(45, 10, 10, 0.97) 75%, rgba(15, 4, 6, 0.99) 100%)`
            }}
          >
            <div className="w-10 h-10 border-3 border-amber-400 border-t-transparent rounded-full animate-spin mb-4" />
            <p className="text-sm font-semibold text-slate-200">
              {articleLang === "kn" ? "ಲೇಖನವನ್ನು ಲೋಡ್ ಮಾಡಲಾಗುತ್ತಿದೆ..." : "Loading article..."}
            </p>
          </section>
        ) : (
          <div className="flex-1 flex flex-col items-center justify-center py-24">
            <div className="w-10 h-10 border-3 border-amber-500 border-t-transparent rounded-full animate-spin mb-4" />
            <p className="text-sm font-semibold text-slate-600">
              {articleLang === "kn" ? "ಲೇಖನವನ್ನು ಲೋಡ್ ಮಾಡಲಾಗುತ್ತಿದೆ..." : "Loading article..."}
            </p>
          </div>
        )}
        {!fromPortal && <Footer />}
      </main>
    );
  }

  // Error State
  if (error || !article) {
    return (
      <main className="min-h-screen bg-[#fafbfc] text-slate-800 flex flex-col">
        {!fromPortal && <Navbar />}
        {!fromPortal ? (
          <section 
            className="pt-36 sm:pt-44 pb-20 text-white text-center flex flex-col items-center justify-center flex-1 px-4"
            style={{
              background: `linear-gradient(135deg, rgba(20, 5, 5, 0.98) 0%, rgba(65, 15, 10, 0.96) 25%, rgba(95, 25, 10, 0.94) 50%, rgba(45, 10, 10, 0.97) 75%, rgba(15, 4, 6, 0.99) 100%)`
            }}
          >
            <div className="w-16 h-16 rounded-full bg-white/10 text-amber-400 flex items-center justify-center mb-4">
              <BookOpen className="w-8 h-8" />
            </div>
            <h1 className="text-xl sm:text-2xl font-bold text-white mb-2">
              {articleLang === "kn" ? "ಲೇಖನ ಕಂಡುಬಂದಿಲ್ಲ" : "Article Not Found"}
            </h1>
            <p className="text-sm text-slate-300 max-w-md mb-6">
              {error || (articleLang === "kn" ? "ನೀವು ವೀಕ್ಷಿಸಲು ಬಯಸಿದ ಲೇಖನ ಅಸ್ತಿತ್ವದಲ್ಲಿಲ್ಲ ಅಥವಾ ಪ್ರಕಟವಾಗಿಲ್ಲ." : "The requested article is not available.")}
            </p>
            <Link
              href="/articles"
              className="px-5 py-2.5 rounded-xl bg-amber-500 text-slate-950 text-xs font-bold hover:bg-amber-400 transition-colors inline-flex items-center gap-2"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>{articleLang === "kn" ? "ಎಲ್ಲಾ ಲೇಖನಗಳಿಗೆ ಹಿಂತಿರುಗಿ" : "Back to All Articles"}</span>
            </Link>
          </section>
        ) : (
          <div className="flex-1 flex flex-col items-center justify-center py-24 px-4 text-center">
            <div className="w-16 h-16 rounded-full bg-red-50 text-red-600 flex items-center justify-center mb-4">
              <BookOpen className="w-8 h-8" />
            </div>
            <h1 className="text-xl sm:text-2xl font-bold text-slate-900 mb-2">
              {articleLang === "kn" ? "ಲೇಖನ ಕಂಡುಬಂದಿಲ್ಲ" : "Article Not Found"}
            </h1>
            <p className="text-sm text-slate-500 max-w-md mb-6">
              {error || (articleLang === "kn" ? "ನೀವು ವೀಕ್ಷಿಸಲು ಬಯಸಿದ ಲೇಖನ ಅಸ್ತಿತ್ವದಲ್ಲಿಲ್ಲ ಅಥವಾ ಪ್ರಕಟವಾಗಿಲ್ಲ." : "The requested article is not available.")}
            </p>
            <Link
              href="/portal/articles"
              className="px-5 py-2.5 rounded-xl bg-slate-900 text-white text-xs font-bold hover:bg-slate-800 transition-colors inline-flex items-center gap-2"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>{articleLang === "kn" ? "ಪೋರ್ಟಲ್ ಲೇಖನಗಳಿಗೆ ಹಿಂತಿರುಗಿ" : "Back to Portal Articles"}</span>
            </Link>
          </div>
        )}
        {!fromPortal && <Footer />}
      </main>
    );
  }

  const title = articleLang === "kn" ? (article.title_kn || article.title_en) : (article.title_en || article.title_kn);
  const summary = articleLang === "kn" ? (article.summary_kn || article.summary_en) : (article.summary_en || article.summary_kn);
  const content = articleLang === "kn" ? (article.content_kn || article.content_en) : (article.content_en || article.content_kn);

  // Split content by paragraphs
  const paragraphs = content ? content.split(/\n\s*\n/).filter(p => p.trim().length > 0) : [];

  return (
    <main 
      style={{
        fontFamily: articleLang === "kn" ? "'Anek Kannada', sans-serif" : "'Inter', system-ui, sans-serif"
      }}
      className="min-h-screen bg-[#fafbfc] text-slate-800 flex flex-col"
    >
      {/* ------------------------------------------------------------------
          CASE 1: PUBLIC VIEW (Navbar has pt-28 sm:pt-36 clearance & dark banner)
          ------------------------------------------------------------------ */}
      {!fromPortal && (
        <>
          <Navbar />

          <section 
            className="relative pt-28 sm:pt-36 lg:pt-40 pb-10 sm:pb-14 text-white overflow-hidden"
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
            {/* Background ambient amber flare */}
            <div 
              className="absolute top-0 left-1/4 w-[600px] h-[350px] pointer-events-none select-none"
              style={{
                background: "radial-gradient(ellipse at 50% 20%, rgba(245, 158, 11, 0.22) 0%, transparent 70%)",
              }}
            />

            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-5">
              
              {/* Breadcrumb + Language Toggle Row */}
              <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
                <nav aria-label="Breadcrumb">
                  <ol className="flex items-center gap-2 text-xs font-medium text-white/70">
                    <li>
                      <Link href="/" className="hover:text-amber-400 flex items-center gap-1.5 transition-colors">
                        <Home className="w-3.5 h-3.5 text-amber-400" />
                        <span>{articleLang === "kn" ? "ಮುಖಪುಟ" : "Home"}</span>
                      </Link>
                    </li>
                    <li><ChevronRight className="w-3.5 h-3.5 text-white/40" /></li>
                    <li>
                      <Link href="/articles" className="hover:text-amber-400 transition-colors">
                        {articleLang === "kn" ? "ಲೇಖನಗಳು" : "Articles"}
                      </Link>
                    </li>
                    <li><ChevronRight className="w-3.5 h-3.5 text-white/40" /></li>
                    <li className="text-amber-300 font-semibold truncate max-w-[160px] sm:max-w-xs" aria-current="page">
                      {getCategoryLabel(article.category)}
                    </li>
                  </ol>
                </nav>

                {/* Instant Bilingual Switcher */}
                <div className="flex items-center gap-2">
                  <span className="text-[11px] font-semibold text-white/70 hidden sm:inline">
                    {articleLang === "kn" ? "ಭಾಷೆ:" : "Language:"}
                  </span>
                  <div className="flex items-center bg-black/40 backdrop-blur-md p-0.5 rounded-full border border-white/20">
                    <button
                      type="button"
                      onClick={() => {
                        setArticleLang("kn");
                        setGlobalLanguage("kn");
                      }}
                      className={`px-3 py-1 rounded-full text-xs font-bold transition-all cursor-pointer ${
                        articleLang === "kn" 
                          ? "bg-amber-400 text-slate-950 shadow-xs" 
                          : "text-white/80 hover:text-white"
                      }`}
                    >
                      ಕನ್ನಡ
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setArticleLang("en");
                        setGlobalLanguage("en");
                      }}
                      className={`px-3 py-1 rounded-full text-xs font-bold transition-all cursor-pointer ${
                        articleLang === "en" 
                          ? "bg-amber-400 text-slate-950 shadow-xs" 
                          : "text-white/80 hover:text-white"
                      }`}
                    >
                      English
                    </button>
                  </div>
                </div>
              </div>

              {/* Badges Row */}
              <div className="flex flex-wrap items-center gap-2.5 pt-1">
                <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold bg-amber-500/20 text-amber-300 border border-amber-400/30">
                  <Tag className="w-3 h-3 text-amber-400" />
                  <span>{getCategoryLabel(article.category)}</span>
                </span>

                <span className="inline-flex items-center gap-1 text-xs text-slate-300 font-medium">
                  <Clock className="w-3.5 h-3.5 text-white/60" />
                  <span>{article.read_time}</span>
                </span>

                <span className="inline-flex items-center gap-1 text-xs text-slate-300 font-medium">
                  <Eye className="w-3.5 h-3.5 text-white/60" />
                  <span>{article.views_count} {articleLang === "kn" ? "ಓದುಗರು" : "views"}</span>
                </span>
              </div>

              {/* Title */}
              <h1 className="text-2xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight leading-[1.25] sm:leading-[1.2]">
                {title}
              </h1>

              {/* Author & Share */}
              <div className="flex flex-wrap items-center justify-between gap-3 pt-4 border-t border-white/15 text-xs text-slate-300">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-full bg-amber-400 text-slate-950 font-bold flex items-center justify-center text-xs">
                    {article.author ? article.author.charAt(0) : "H"}
                  </div>
                  <div>
                    <p className="font-bold text-amber-200 leading-tight">
                      {article.author}
                    </p>
                    <p className="text-[11px] text-white/60">
                      {article.formatted_date || article.published_at}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <Link
                    href="/articles"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-white/20 bg-white/5 hover:bg-white/15 text-white text-xs font-semibold backdrop-blur-md transition-colors"
                  >
                    <ArrowLeft className="w-3.5 h-3.5 text-amber-400" />
                    <span>{articleLang === "kn" ? "ಎಲ್ಲಾ ಲೇಖನಗಳು" : "All Articles"}</span>
                  </Link>

                  <button
                    type="button"
                    onClick={handleShare}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-white/20 bg-white/5 hover:bg-white/15 text-white text-xs font-semibold backdrop-blur-md transition-colors cursor-pointer"
                  >
                    {copied ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-400" />
                        <span className="text-emerald-300">{articleLang === "kn" ? "ಕಾಪಿ ಮಾಡಲಾಗಿದೆ!" : "Copied!"}</span>
                      </>
                    ) : (
                      <>
                        <Share2 className="w-3.5 h-3.5 text-slate-300" />
                        <span>{articleLang === "kn" ? "ಹಂಚಿಕೊಳ್ಳಿ" : "Share"}</span>
                      </>
                    )}
                  </button>
                </div>
              </div>

            </div>
          </section>
        </>
      )}

      {/* ------------------------------------------------------------------
          CASE 2: CITIZEN PORTAL VIEW (Sticky portal header, no collision)
          ------------------------------------------------------------------ */}
      {fromPortal && (
        <header className="sticky top-0 z-30 bg-white/95 backdrop-blur-md border-b border-slate-200/80 shadow-2xs">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Link
                href="/portal/articles"
                className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200/80 text-slate-700 transition-colors flex items-center gap-1.5 cursor-pointer shadow-2xs"
              >
                <ArrowLeft className="w-4 h-4" />
                <span className="text-xs font-bold hidden sm:inline">
                  {articleLang === "kn" ? "ಲೇಖನಗಳಿಗೆ ಹಿಂತಿರುಗಿ" : "Back to Articles"}
                </span>
              </Link>

              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-amber-500 to-red-500 p-[1.5px] shadow-xs">
                  <div className="w-full h-full rounded-[10px] bg-white flex items-center justify-center">
                    <span className="font-black text-amber-600 text-xs">ಹ</span>
                  </div>
                </div>
                <div>
                  <h1 className="text-xs sm:text-sm font-black text-slate-900 leading-tight">
                    {articleLang === "kn" ? "ಸಾರ್ವಜನಿಕ ಲೇಖನ" : "Constituency Article"}
                  </h1>
                  <span className="text-[10px] text-slate-400 font-medium block">
                    Aland & Kalaburagi • Shri Harshanand Guttedar Platform
                  </span>
                </div>
              </div>
            </div>

            {/* Language toggle & profile */}
            <div className="flex items-center gap-2.5">
              <div className="flex items-center bg-slate-100 rounded-xl p-0.5 border border-slate-200/80">
                <button
                  type="button"
                  onClick={() => {
                    setArticleLang("kn");
                    setGlobalLanguage("kn");
                  }}
                  className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                    articleLang === "kn" ? "bg-amber-400 text-slate-950 shadow-2xs" : "text-slate-600 hover:text-slate-900"
                  }`}
                >
                  ಕನ್ನಡ
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setArticleLang("en");
                    setGlobalLanguage("en");
                  }}
                  className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                    articleLang === "en" ? "bg-amber-400 text-slate-950 shadow-2xs" : "text-slate-600 hover:text-slate-900"
                  }`}
                >
                  EN
                </button>
              </div>

              <div className="w-8 h-8 rounded-full border-2 border-amber-400 p-0.5 overflow-hidden">
                <img
                  src="/images/hero.jpg"
                  alt="Profile"
                  className="w-full h-full rounded-full object-cover object-top"
                />
              </div>
            </div>
          </div>
        </header>
      )}

      {/* Portal Header Title Strip (when from portal) */}
      {fromPortal && (
        <section className="bg-white border-b border-slate-200/80 py-6">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-3">
            <div className="flex items-center gap-2.5">
              <span className="inline-flex items-center gap-1 text-xs font-bold px-2.5 py-0.5 rounded-full bg-amber-50 text-amber-800 border border-amber-200/70">
                <Tag className="w-3 h-3 text-amber-600" />
                <span>{getCategoryLabel(article.category)}</span>
              </span>
              <span className="text-xs text-slate-400 font-medium flex items-center gap-1">
                <Clock className="w-3.5 h-3.5" />
                <span>{article.read_time}</span>
              </span>
              <span className="text-xs text-slate-400 font-medium flex items-center gap-1">
                <Eye className="w-3.5 h-3.5" />
                <span>{article.views_count} {articleLang === "kn" ? "ಓದುಗರು" : "views"}</span>
              </span>
            </div>

            <h1 className="text-xl sm:text-3xl font-black text-slate-900 tracking-tight leading-snug">
              {title}
            </h1>

            <div className="flex items-center justify-between text-xs text-slate-500 pt-2 border-t border-slate-100">
              <span>{article.author} • {article.formatted_date || article.published_at}</span>
              <button
                type="button"
                onClick={handleShare}
                className="inline-flex items-center gap-1 text-amber-600 font-bold hover:text-amber-700 cursor-pointer"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Share2 className="w-3.5 h-3.5" />}
                <span>{copied ? (articleLang === "kn" ? "ಕಾಪಿ ಮಾಡಲಾಗಿದೆ" : "Copied!") : (articleLang === "kn" ? "ಹಂಚಿಕೊಳ್ಳಿ" : "Share")}</span>
              </button>
            </div>
          </div>
        </section>
      )}

      {/* ------------------------------------------------------------------
          ARTICLE BODY CONTENT & RELATED POSTS
          ------------------------------------------------------------------ */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 flex-1 w-full space-y-8">
        
        {/* Summary Excerpt Callout */}
        {summary && (
          <div className="bg-gradient-to-r from-amber-50/70 via-orange-50/40 to-amber-50/70 border-l-4 border-amber-500 rounded-2xl p-4 sm:p-5 shadow-2xs">
            <p className="text-xs sm:text-sm font-semibold text-amber-950/90 leading-relaxed italic">
              &ldquo;{summary}&rdquo;
            </p>
          </div>
        )}

        {/* Full Article Content */}
        <article className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200/80 shadow-xs space-y-6">
          <div className="prose prose-slate max-w-none">
            {paragraphs.map((p, idx) => (
              <p 
                key={idx}
                className="text-sm sm:text-base text-slate-700 leading-relaxed sm:leading-loose mb-5 font-normal"
              >
                {p}
              </p>
            ))}
          </div>

          {/* Author Official Attribution Footer */}
          <div className="pt-8 mt-8 border-t border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-slate-50/60 rounded-2xl p-4 sm:p-5 border border-slate-100">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-amber-500/10 border border-amber-200 flex items-center justify-center shrink-0">
                <Award className="w-5 h-5 text-amber-600" />
              </div>
              <div>
                <h4 className="text-xs sm:text-sm font-black text-slate-900 leading-tight">
                  {article.author}
                </h4>
                <p className="text-[11px] text-slate-500 mt-0.5">
                  {articleLang === "kn" 
                    ? "ಆಳಂದ ಮತಕ್ಷೇತ್ರದ ಸಾರ್ವಜನಿಕ ಸೇವಾ ಸಚಿವಾಲಯ ಹಾಗೂ ಸಂಶೋಧನಾ ವಿಭಾಗ" 
                    : "Aland Constituency Public Secretariat & Policy Cell"}
                </p>
              </div>
            </div>

            <Link
              href={fromPortal ? "/portal/articles" : "/articles"}
              className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold transition-all inline-flex items-center justify-center gap-1.5 shadow-2xs self-start sm:self-auto cursor-pointer"
            >
              <span>{articleLang === "kn" ? "ಹೆಚ್ಚು ಲೇಖನಗಳನ್ನು ಓದಿ" : "Read More Articles"}</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </article>

        {/* Related Articles Row */}
        {related.length > 0 && (
          <section className="space-y-4 pt-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Layers className="w-4 h-4 text-amber-600" />
                <h3 className="text-sm sm:text-base font-black text-slate-900">
                  {articleLang === "kn" ? "ಸಂಬಂಧಿತ ಲೇಖನಗಳು" : "Related Articles"}
                </h3>
              </div>
              <Link
                href={fromPortal ? "/portal/articles" : "/articles"}
                className="text-xs font-bold text-amber-600 hover:text-amber-700 cursor-pointer"
              >
                {articleLang === "kn" ? "ಎಲ್ಲವನ್ನೂ ವೀಕ್ಷಿಸಿ" : "View All"}
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {related.map((item) => {
                const relTitle = articleLang === "kn" ? (item.title_kn || item.title_en) : (item.title_en || item.title_kn);
                const relSummary = articleLang === "kn" ? (item.summary_kn || item.summary_en) : (item.summary_en || item.summary_kn);
                return (
                  <Link
                    key={item.id}
                    href={fromPortal ? `/articles/${item.id}?from=portal` : `/articles/${item.id}`}
                    className="bg-white rounded-2xl p-4 border border-slate-200/80 hover:border-amber-400 hover:shadow-xs transition-all duration-200 flex flex-col justify-between group cursor-pointer"
                  >
                    <div>
                      <div className="flex items-center justify-between text-[10px] text-slate-400 mb-2">
                        <span className="font-bold text-amber-700 bg-amber-50 px-2 py-0.5 rounded-full border border-amber-200/60">
                          {getCategoryLabel(item.category)}
                        </span>
                        <span>{item.read_time}</span>
                      </div>
                      <h4 className="text-xs font-bold text-slate-900 group-hover:text-amber-600 transition-colors line-clamp-2 leading-snug mb-1.5">
                        {relTitle}
                      </h4>
                      {relSummary && (
                        <p className="text-[11px] text-slate-500 line-clamp-2 leading-relaxed">
                          {relSummary}
                        </p>
                      )}
                    </div>
                    <div className="pt-3 mt-3 border-t border-slate-100 flex items-center justify-between text-[11px] font-bold text-amber-600 group-hover:text-amber-700">
                      <span>{articleLang === "kn" ? "ಓದಿ" : "Read"}</span>
                      <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                    </div>
                  </Link>
                );
              })}
            </div>
          </section>
        )}

      </div>

      {!fromPortal && <Footer />}
    </main>
  );
}

export default function ArticleReadingPage({ params }: { params: Promise<{ id: string }> }) {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-white flex flex-col items-center justify-center">
          <div className="w-10 h-10 border-3 border-amber-500 border-t-transparent rounded-full animate-spin mb-4" />
          <p className="text-sm font-semibold text-slate-600">Loading article...</p>
        </div>
      }
    >
      <ArticleReadingContent params={params} />
    </Suspense>
  );
}
