"use client";

import React, { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PageHeroBanner from "@/components/common/PageHeroBanner";
import { useLanguage } from "@/context/LanguageContext";
import { 
  Newspaper, 
  Clock, 
  Calendar, 
  ArrowRight, 
  User, 
  BookOpen, 
  Search, 
  X, 
  ChevronLeft, 
  ChevronRight,
  Eye,
  Tag
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

export default function ArticlesPage() {
  const { language } = useLanguage();
  
  const [articles, setArticles] = useState<LiveArticleItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [appliedSearch, setAppliedSearch] = useState("");
  const [page, setPage] = useState(1);
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 9,
    total: 0,
    totalPages: 1,
  });

  const categories = [
    { id: "all", labelKn: "ಎಲ್ಲಾ ಲೇಖನಗಳು", labelEn: "All Posts" },
    { id: "farmers", labelKn: "ರೈತರ ರಫ್ತು & ಕೃಷಿ", labelEn: "Farmers & Agri" },
    { id: "development", labelKn: "ಕ್ಷೇತ್ರದ ಅಭಿವೃದ್ಧಿ", labelEn: "Development" },
    { id: "youth", labelKn: "ಶಿಕ್ಷಣ & ಯುವಜನತೆ", labelEn: "Youth & Jobs" },
    { id: "governance", labelKn: "ಪಾರದರ್ಶಕ ಆಡಳಿತ", labelEn: "Governance" },
    { id: "general", labelKn: "ಸಾಮಾನ್ಯ ಲೇಖನಗಳು", labelEn: "General" },
  ];

  const fetchArticles = useCallback(async () => {
    setLoading(true);
    try {
      const q = new URLSearchParams({
        page: String(page),
        limit: "9",
        status: "published",
      });
      if (selectedCategory !== "all") {
        q.set("category", selectedCategory);
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
      console.error("Failed to load articles:", err);
      setArticles([]);
    } finally {
      setLoading(false);
    }
  }, [page, selectedCategory, appliedSearch]);

  useEffect(() => {
    fetchArticles();
  }, [fetchArticles]);

  const handleCategorySelect = (catId: string) => {
    setSelectedCategory(catId);
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

  const getCategoryLabel = (cat: string) => {
    const found = categories.find((c) => c.id === cat);
    if (!found) return cat;
    return language === "kn" ? found.labelKn : found.labelEn;
  };

  return (
    <main 
      style={{
        fontFamily: language === "kn" ? "'Anek Kannada', sans-serif" : "'Inter', system-ui, sans-serif"
      }}
      className="min-h-screen bg-[#fafbfc] text-slate-800 relative overflow-x-hidden flex flex-col"
    >
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

      <section className="py-10 sm:py-14 bg-transparent flex-1" aria-label="Articles Feed">
        <div className="w-full px-4 sm:px-6 md:px-8 lg:px-12 max-w-7xl mx-auto space-y-8">
          
          {/* Search Bar & Category Navigation */}
          <div className="bg-white rounded-3xl p-4 sm:p-6 border border-slate-200/80 shadow-2xs space-y-4">
            
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <h2 className="text-base sm:text-lg font-black text-slate-900 tracking-tight">
                  {language === "kn" ? "ಲೇಖನಗಳ ಸಂಗ್ರಹ" : "Explore Articles & Commentary"}
                </h2>
                <p className="text-xs text-slate-500">
                  {language === "kn" ? "ಆಳಂದ ಹಾಗೂ ಕಲ್ಯಾಣ ಕರ್ನಾಟಕದ ಪ್ರಗತಿಯ ಕುರಿತಾದ ಸಮಗ್ರ ವಿಶ್ಲೇಷಣೆ" : "Official perspectives on agriculture, youth empowerment and constituency progress"}
                </p>
              </div>

              <div className="font-mono text-xs text-slate-600 font-semibold bg-slate-50 px-3 py-1.5 rounded-xl border border-slate-200/80 shrink-0 self-start sm:self-auto">
                {pagination.total} {language === "kn" ? "ಲೇಖನಗಳು" : "Articles Published"}
              </div>
            </div>

            {/* Search Input Form */}
            <form onSubmit={handleSearchSubmit} className="relative flex items-center">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5" />
              <input
                type="text"
                placeholder={language === "kn" ? "ಶೀರ್ಷಿಕೆ ಅಥವಾ ವಿಷಯದ ಮೂಲಕ ಲೇಖನ ಹುಡುಕಿ..." : "Search articles by title, topic, or keyword..."}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-24 py-2.5 rounded-2xl border border-slate-200 text-xs sm:text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500 transition-all shadow-2xs"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={handleClearSearch}
                  className="absolute right-20 text-slate-400 hover:text-slate-600 text-xs cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
              <button
                type="submit"
                className="absolute right-2 px-3 py-1.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-xs shadow-2xs transition-colors cursor-pointer"
              >
                {language === "kn" ? "ಹುಡುಕಿ" : "Search"}
              </button>
            </form>

            {/* Category Filter Pills */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 pt-1 no-scrollbar">
              {categories.map((cat) => {
                const isActive = selectedCategory === cat.id;
                return (
                  <button
                    key={cat.id}
                    type="button"
                    onClick={() => handleCategorySelect(cat.id)}
                    className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all shrink-0 cursor-pointer ${
                      isActive
                        ? "bg-amber-500 text-slate-950 shadow-2xs scale-[1.02]"
                        : "bg-slate-100/90 text-slate-600 hover:bg-slate-200 hover:text-slate-900 border border-slate-200/60"
                    }`}
                  >
                    {language === "kn" ? cat.labelKn : cat.labelEn}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Applied search indicator */}
          {appliedSearch && (
            <div className="flex items-center justify-between bg-amber-50/80 border border-amber-200/80 rounded-2xl px-4 py-2 text-xs text-amber-900">
              <span>
                {language === "kn" ? "ಹುಡುಕಾಟ ಫಲಿತಾಂಶಗಳು:" : "Showing search results for:"}{" "}
                <strong>&ldquo;{appliedSearch}&rdquo;</strong>
              </span>
              <button
                type="button"
                onClick={handleClearSearch}
                className="font-bold underline text-amber-900 hover:text-amber-950 cursor-pointer"
              >
                {language === "kn" ? "ರದ್ದುಮಾಡಿ" : "Clear filter"}
              </button>
            </div>
          )}

          {/* Loading Skeleton */}
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div key={i} className="bg-white rounded-3xl p-6 border border-slate-200 animate-pulse space-y-4">
                  <div className="flex justify-between items-center">
                    <div className="h-5 bg-slate-200 rounded-full w-24" />
                    <div className="h-4 bg-slate-200 rounded w-16" />
                  </div>
                  <div className="h-6 bg-slate-200 rounded-md w-3/4" />
                  <div className="h-14 bg-slate-200 rounded-md w-full" />
                  <div className="h-4 bg-slate-200 rounded w-1/3 pt-4 border-t border-slate-100" />
                </div>
              ))}
            </div>
          ) : articles.length === 0 ? (
            <div className="bg-white rounded-3xl p-12 text-center border border-slate-200/80 shadow-2xs space-y-3">
              <div className="w-12 h-12 rounded-full bg-slate-100 text-slate-400 mx-auto flex items-center justify-center">
                <BookOpen className="w-6 h-6" />
              </div>
              <h3 className="text-base font-bold text-slate-800">
                {language === "kn" ? "ಯಾವುದೇ ಲೇಖನಗಳು ಕಂಡುಬಂದಿಲ್ಲ" : "No Articles Found"}
              </h3>
              <p className="text-xs text-slate-500 max-w-sm mx-auto">
                {language === "kn" 
                  ? "ನೀವು ಹುಡುಕುತ್ತಿರುವ ವಿಷಯಕ್ಕೆ ಹೊಂದಿಕೆಯಾಗುವ ಲೇಖನಗಳು ಲಭ್ಯವಿಲ್ಲ. ದಯವಿಟ್ಟು ಬೇರೆ ಹುಡುಕು ಪದ ಬಳಸಿ." 
                  : "No published articles match the current filter or search criteria."}
              </p>
              {(selectedCategory !== "all" || appliedSearch) && (
                <button
                  type="button"
                  onClick={() => {
                    setSelectedCategory("all");
                    handleClearSearch();
                  }}
                  className="px-4 py-1.5 rounded-xl bg-slate-900 text-white text-xs font-bold hover:bg-slate-800 transition-colors cursor-pointer"
                >
                  {language === "kn" ? "ಫಿಲ್ಟರ್ ಮರುಹೊಂದಿಸಿ" : "Reset Filters"}
                </button>
              )}
            </div>
          ) : (
            /* Articles Grid */
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {articles.map((item) => {
                const title = language === "kn" ? (item.title_kn || item.title_en) : (item.title_en || item.title_kn);
                const summary = language === "kn" ? (item.summary_kn || item.summary_en) : (item.summary_en || item.summary_kn);

                return (
                  <Link
                    key={item.id}
                    href={`/articles/${item.id}`}
                    className="bg-white rounded-3xl p-5 sm:p-6 border border-slate-200/80 hover:border-amber-400/80 hover:shadow-md transition-all duration-300 flex flex-col justify-between group cursor-pointer relative overflow-hidden"
                  >
                    <div>
                      {/* Top Badges */}
                      <div className="flex items-center justify-between gap-2 mb-3.5">
                        <span className="inline-flex items-center gap-1 text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-amber-50 text-amber-800 border border-amber-200/80">
                          <Tag className="w-2.5 h-2.5 text-amber-600" />
                          <span>{getCategoryLabel(item.category)}</span>
                        </span>

                        <div className="flex items-center gap-2 text-[11px] text-slate-400">
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
                      <h3 className="text-base sm:text-lg font-black text-slate-900 group-hover:text-amber-600 transition-colors leading-snug tracking-tight mb-2.5 line-clamp-2">
                        {title}
                      </h3>

                      {/* Excerpt / Summary */}
                      {summary && (
                        <p className="text-xs sm:text-[13px] text-slate-600 leading-relaxed line-clamp-3 mb-4 font-normal">
                          {summary}
                        </p>
                      )}
                    </div>

                    {/* Bottom Metadata & Arrow */}
                    <div className="pt-4 border-t border-slate-100 flex items-center justify-between mt-auto">
                      <div className="flex items-center gap-2 text-xs text-slate-500">
                        <div className="w-6 h-6 rounded-full bg-slate-100 flex items-center justify-center font-bold text-[10px] text-slate-700">
                          {item.author ? item.author.charAt(0) : "H"}
                        </div>
                        <span className="truncate max-w-[140px] font-medium">{item.author}</span>
                      </div>

                      <div className="inline-flex items-center gap-1 text-xs font-bold text-amber-600 group-hover:text-amber-700 group-hover:translate-x-1 transition-all">
                        <span>{language === "kn" ? "ಓದಿ" : "Read"}</span>
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

        </div>
      </section>

      <Footer />
    </main>
  );
}
