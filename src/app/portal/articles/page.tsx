"use client";

import React, { useEffect, useState, useCallback } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useLanguage } from "@/context/LanguageContext";
import { 
  ArrowLeft,
  Search,
  X,
  ChevronLeft,
  ChevronRight,
  Clock,
  Eye,
  Tag,
  ArrowRight,
  BookOpen,
  Layers,
  Sparkles
} from "lucide-react";

interface LiveArticleItem {
  id: number;
  title_kn: string;
  title_en: string;
  summary_kn: string | null;
  summary_en: string | null;
  category: string;
  author: string;
  banner_url: string | null;
  read_time: string;
  status: string;
  views_count: number;
  published_at: string;
}

export default function PortalArticlesPage() {
  const { language, setLanguage } = useLanguage();
  const router = useRouter();

  // Citizen Session
  const [user, setUser] = useState<{ id: number; mobile: string; role: string } | null>(null);
  const [initialLoading, setInitialLoading] = useState(true);

  // Articles State
  const [articles, setArticles] = useState<LiveArticleItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [appliedSearch, setAppliedSearch] = useState("");
  const [page, setPage] = useState(1);
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 9,
    total: 0,
    totalPages: 1,
  });

  // Verify Citizen Auth
  useEffect(() => {
    async function verifyAuth() {
      try {
        const res = await fetch("/api/auth/me");
        const data = await res.json();
        if (!res.ok || !data.authenticated) {
          router.push("/login");
          return;
        }
        setUser(data.user);
      } catch (err) {
        console.error("Auth check failed:", err);
        router.push("/login");
      } finally {
        setInitialLoading(false);
      }
    }
    verifyAuth();
  }, [router]);

  // Fetch Articles from API
  const fetchArticles = useCallback(async () => {
    setLoading(true);
    try {
      const q = new URLSearchParams({
        page: String(page),
        limit: "9",
        status: "published",
      });
      if (filter !== "all") {
        q.set("category", filter);
      }
      if (appliedSearch.trim()) {
        q.set("search", appliedSearch.trim());
      }

      const res = await fetch(`/api/articles?${q.toString()}`);
      const data = await res.json();
      if (data.success && Array.isArray(data.articles)) {
        setArticles(data.articles);
        if (data.pagination) setPagination(data.pagination);
      } else {
        setArticles([]);
      }
    } catch (err) {
      console.error("Failed to load portal articles:", err);
      setArticles([]);
    } finally {
      setLoading(false);
    }
  }, [page, filter, appliedSearch]);

  useEffect(() => {
    if (!initialLoading) {
      fetchArticles();
    }
  }, [initialLoading, fetchArticles]);

  const handleFilterChange = (cat: string) => {
    setFilter(cat);
    setPage(1);
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setAppliedSearch(searchQuery.trim());
    setPage(1);
  };

  const handleClearSearch = () => {
    setSearchQuery("");
    setAppliedSearch("");
    setPage(1);
  };

  const categoryTabs = [
    { id: "all", labelKn: "ಎಲ್ಲಾ ಲೇಖನಗಳು", labelEn: "All Articles" },
    { id: "farmers", labelKn: "ರೈತರು & ಕೃಷಿ", labelEn: "Farmers & Agri" },
    { id: "development", labelKn: "ಅಭಿವೃದ್ಧಿ ಕಾಮಗಾರಿ", labelEn: "Development" },
    { id: "youth", labelKn: "ಯುವ ಸಮಾವೇಶ & ಉದ್ಯೋಗ", labelEn: "Youth & Jobs" },
    { id: "governance", labelKn: "ಪಾರದರ್ಶಕ ಆಡಳಿತ", labelEn: "Governance" },
    { id: "general", labelKn: "ಸಾಮಾನ್ಯ ಲೇಖನಗಳು", labelEn: "General" },
  ];

  const getCategoryLabel = (cat: string) => {
    const tab = categoryTabs.find(t => t.id === cat);
    if (!tab) return cat;
    return language === "kn" ? tab.labelKn : tab.labelEn;
  };

  if (initialLoading) {
    return (
      <div className="min-h-screen bg-[#f8fafc] flex flex-col items-center justify-center text-slate-800">
        <div className="w-10 h-10 border-3 border-amber-500 border-t-transparent rounded-full animate-spin mb-3" />
        <p className="text-xs text-slate-600 font-semibold tracking-wide">
          {language === "kn" ? "ಲೇಖನಗಳನ್ನು ಲೋಡ್ ಮಾಡಲಾಗುತ್ತಿದೆ..." : "Loading Articles..."}
        </p>
      </div>
    );
  }

  return (
    <div 
      style={{
        fontFamily: language === "kn" ? "'Anek Kannada', sans-serif" : "'Inter', system-ui, sans-serif"
      }}
      className="min-h-screen bg-[#f8fafc] text-slate-800 flex flex-col pb-20 lg:pb-12"
    >
      {/* Top Header */}
      <header className="sticky top-0 z-30 bg-white/95 backdrop-blur-md border-b border-slate-200/80 shadow-2xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between">
          {/* Left: Back button & Title */}
          <div className="flex items-center gap-3">
            <Link
              href="/portal"
              className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200/80 text-slate-700 transition-colors flex items-center gap-1.5 cursor-pointer shadow-2xs"
            >
              <ArrowLeft className="w-4 h-4" />
              <span className="text-xs font-bold hidden sm:inline">
                {language === "kn" ? "ಮುಖಪುಟಕ್ಕೆ" : "Back to Portal"}
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
                  {language === "kn" ? "ಲೇಖನಗಳು & ಸಮಾಚಾರ" : "Articles & Insights"}
                </h1>
                <span className="text-[10px] text-slate-400 font-medium block">
                  Aland & Kalaburagi • Shri Harshanand Guttedar Platform
                </span>
              </div>
            </div>
          </div>

          {/* Right: Language toggle & user info */}
          <div className="flex items-center gap-2.5">
            <div className="flex items-center bg-slate-100 rounded-xl p-0.5 border border-slate-200/80">
              <button
                type="button"
                onClick={() => setLanguage("kn")}
                className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  language === "kn" ? "bg-amber-400 text-slate-950 shadow-2xs" : "text-slate-600 hover:text-slate-900"
                }`}
              >
                ಕನ್ನಡ
              </button>
              <button
                type="button"
                onClick={() => setLanguage("en")}
                className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  language === "en" ? "bg-amber-400 text-slate-950 shadow-2xs" : "text-slate-600 hover:text-slate-900"
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

      {/* Main Content Area */}
      <main className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-6 space-y-6 flex-1">
        
        {/* Clean Header Strip */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-2 border-b border-slate-200/80">
          <div>
            <h2 className="text-base sm:text-xl font-extrabold text-slate-900 tracking-tight">
              {language === "kn" 
                ? "ಸಾರ್ವಜನಿಕ ಲೇಖನಗಳು & ಪತ್ರಿಕಾ ಪ್ರಕಟಣೆಗಳು" 
                : "Constituency Articles & Press Publications"}
            </h2>
            <p className="text-xs text-slate-500">
              {language === "kn"
                ? "ಶ್ರೀ ಹರ್ಷಾನಂದ ಗುತ್ತೇದಾರ ಅವರ ನೀತಿ ಒಳನೋಟಗಳು, ರೈತರ ರಫ್ತು ಪರಿಹಾರ ಹಾಗೂ ಗ್ರಾಮೀಣ ಅಭಿವೃದ್ಧಿ ಬರಹಗಳು"
                : "Official policy insights, agrarian reforms, and public service releases from Shri Harshanand Guttedar"}
            </p>
          </div>

          <div className="font-mono text-xs text-slate-600 font-semibold bg-white px-3 py-1 rounded-xl border border-slate-200 shrink-0 self-start sm:self-auto shadow-2xs">
            {pagination.total} {language === "kn" ? "ಲೇಖನಗಳು" : "Articles Listed"}
          </div>
        </div>

        {/* Filter & Search Bar */}
        <div className="bg-white rounded-3xl p-4 sm:p-5 border border-slate-200/80 shadow-xs space-y-3.5">
          {/* Search Input */}
          <form onSubmit={handleSearchSubmit} className="relative flex items-center">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
            <input
              type="text"
              placeholder={language === "kn" ? "ಲೇಖನದ ಶೀರ್ಷಿಕೆ ಅಥವಾ ವಿಷಯ ಹುಡುಕಿ..." : "Search article title or topic..."}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-24 py-2 rounded-2xl border border-slate-200 text-xs sm:text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:border-amber-500 shadow-2xs"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={handleClearSearch}
                className="absolute right-20 text-slate-400 hover:text-slate-600"
              >
                <X className="w-4 h-4" />
              </button>
            )}
            <button
              type="submit"
              className="absolute right-2 px-3 py-1 rounded-xl bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-xs shadow-2xs transition-colors cursor-pointer"
            >
              {language === "kn" ? "ಹುಡುಕಿ" : "Search"}
            </button>
          </form>

          {/* Category Tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 pt-1 no-scrollbar">
            {categoryTabs.map((tab) => {
              const isActive = filter === tab.id;
              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => handleFilterChange(tab.id)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all shrink-0 cursor-pointer ${
                    isActive
                      ? "bg-amber-500 text-slate-950 shadow-2xs scale-[1.02]"
                      : "bg-slate-100 hover:bg-slate-200 text-slate-600 hover:text-slate-900 border border-slate-200/60"
                  }`}
                >
                  {language === "kn" ? tab.labelKn : tab.labelEn}
                </button>
              );
            })}
          </div>
        </div>

        {/* Applied Search Filter Notice */}
        {appliedSearch && (
          <div className="flex items-center justify-between bg-amber-50 border border-amber-200 rounded-2xl px-4 py-2 text-xs text-amber-900">
            <span>
              {language === "kn" ? "ಫಲಿತಾಂಶಗಳು:" : "Results for:"} <strong>&ldquo;{appliedSearch}&rdquo;</strong>
            </span>
            <button
              type="button"
              onClick={handleClearSearch}
              className="font-bold underline text-amber-900 hover:text-amber-950 cursor-pointer"
            >
              {language === "kn" ? "ತೆರವುಗೊಳಿಸಿ" : "Clear"}
            </button>
          </div>
        )}

        {/* Articles List / Grid */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="bg-white rounded-3xl p-5 border border-slate-200 animate-pulse space-y-3">
                <div className="h-4 bg-slate-200 rounded w-1/3" />
                <div className="h-6 bg-slate-200 rounded w-4/5" />
                <div className="h-12 bg-slate-200 rounded w-full" />
                <div className="h-4 bg-slate-200 rounded w-1/2 pt-2 border-t border-slate-100" />
              </div>
            ))}
          </div>
        ) : articles.length === 0 ? (
          <div className="bg-white rounded-3xl p-12 text-center border border-slate-200/80 shadow-xs space-y-3">
            <div className="w-12 h-12 rounded-full bg-slate-100 text-slate-400 mx-auto flex items-center justify-center">
              <BookOpen className="w-6 h-6" />
            </div>
            <h3 className="text-sm font-bold text-slate-800">
              {language === "kn" ? "ಯಾವುದೇ ಲೇಖನಗಳು ಲಭ್ಯವಿಲ್ಲ" : "No Articles Found"}
            </h3>
            <p className="text-xs text-slate-500 max-w-sm mx-auto">
              {language === "kn" 
                ? "ಆಯ್ಕೆಮಾಡಿದ ವಿಭಾಗದಲ್ಲಿ ಸದ್ಯಕ್ಕೆ ಯಾವುದೇ ಪ್ರಕಟಿತ ಲೇಖನಗಳು ಇಲ್ಲ." 
                : "No published articles match the selected filter."}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {articles.map((item) => {
              const title = language === "kn" ? (item.title_kn || item.title_en) : (item.title_en || item.title_kn);
              const summary = language === "kn" ? (item.summary_kn || item.summary_en) : (item.summary_en || item.summary_kn);

              return (
                <Link
                  key={item.id}
                  href={`/articles/${item.id}?from=portal`}
                  className="bg-white rounded-3xl p-5 border border-slate-200/80 hover:border-amber-400 hover:shadow-md transition-all duration-200 flex flex-col justify-between group cursor-pointer"
                >
                  <div>
                    {/* Top Badges */}
                    <div className="flex items-center justify-between gap-2 mb-3">
                      <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-amber-50 text-amber-800 border border-amber-200/70">
                        {getCategoryLabel(item.category)}
                      </span>

                      <div className="flex items-center gap-2 text-[10px] text-slate-400 font-medium">
                        <span className="flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          <span>{item.read_time}</span>
                        </span>
                        <span className="flex items-center gap-1">
                          <Eye className="w-3 h-3" />
                          <span>{item.views_count}</span>
                        </span>
                      </div>
                    </div>

                    {/* Title */}
                    <h3 className="text-sm sm:text-base font-black text-slate-900 group-hover:text-amber-600 transition-colors leading-snug tracking-tight mb-2 line-clamp-2">
                      {title}
                    </h3>

                    {/* Excerpt */}
                    {summary && (
                      <p className="text-xs text-slate-600 leading-relaxed line-clamp-3 mb-4 font-normal">
                        {summary}
                      </p>
                    )}
                  </div>

                  {/* Footer Meta & Arrow */}
                  <div className="pt-3 border-t border-slate-100 flex items-center justify-between mt-auto">
                    <span className="text-[11px] font-medium text-slate-500 truncate max-w-[140px]">
                      {item.author}
                    </span>

                    <div className="inline-flex items-center gap-1 text-xs font-bold text-amber-600 group-hover:text-amber-700 group-hover:translate-x-1 transition-all">
                      <span>{language === "kn" ? "ಓದಿ" : "Read Article"}</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        )}

        {/* Pagination Controls */}
        {pagination.totalPages > 1 && (
          <div className="flex items-center justify-between bg-white rounded-2xl p-3 border border-slate-200/80 shadow-2xs">
            <span className="text-xs text-slate-500 font-medium">
              {language === "kn" ? "ಪುಟ" : "Page"} <strong>{pagination.page}</strong> {language === "kn" ? "ರಲ್ಲಿ" : "of"} <strong>{pagination.totalPages}</strong>
            </span>

            <div className="flex items-center gap-2">
              <button
                type="button"
                disabled={pagination.page <= 1}
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                className="p-1.5 rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-100 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer transition-colors"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                type="button"
                disabled={pagination.page >= pagination.totalPages}
                onClick={() => setPage((p) => Math.min(pagination.totalPages, p + 1))}
                className="p-1.5 rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-100 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer transition-colors"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

      </main>
    </div>
  );
}
