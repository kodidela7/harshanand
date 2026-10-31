"use client";

import React, { useEffect, useState, useCallback } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useLanguage } from "@/context/LanguageContext";
import { 
  ArrowLeft,
  Calendar,
  Clock,
  MapPin,
  Phone,
  PhoneCall,
  Search,
  X,
  ChevronLeft,
  ChevronRight,
  LogOut,
  RefreshCw,
  Home,
  IdCard,
  Grid,
  Bell
} from "lucide-react";

interface LiveEventItem {
  id: number;
  title_kn: string;
  title_en: string;
  description_kn: string | null;
  description_en: string | null;
  event_date: string;
  start_time: string;
  end_time: string | null;
  location_kn: string;
  location_en: string;
  category: string;
  status: string;
  banner_url: string | null;
  contact_person: string | null;
  contact_phone: string | null;
}

export default function PortalEventsPage() {
  const { language, setLanguage } = useLanguage();
  const router = useRouter();

  // Citizen Session
  const [user, setUser] = useState<{ id: number; mobile: string; role: string } | null>(null);
  const [initialLoading, setInitialLoading] = useState(true);

  // Events State
  const [events, setEvents] = useState<LiveEventItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [appliedSearch, setAppliedSearch] = useState("");
  const [page, setPage] = useState(1);
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 8,
    total: 0,
    totalPages: 1,
  });

  const [selectedEventModal, setSelectedEventModal] = useState<LiveEventItem | null>(null);

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

  // Fetch Events from API
  const fetchEvents = useCallback(async () => {
    setLoading(true);
    try {
      const q = new URLSearchParams({
        page: String(page),
        limit: "8",
      });
      if (filter !== "all") {
        q.set("category", filter);
      }
      if (appliedSearch.trim()) {
        q.set("search", appliedSearch.trim());
      }

      const res = await fetch(`/api/events?${q.toString()}`);
      const data = await res.json();
      if (data.success && Array.isArray(data.events)) {
        setEvents(data.events);
        if (data.pagination) setPagination(data.pagination);
      } else {
        setEvents([]);
      }
    } catch (err) {
      console.error("Failed to load events:", err);
      setEvents([]);
    } finally {
      setLoading(false);
    }
  }, [page, filter, appliedSearch]);

  useEffect(() => {
    if (!initialLoading) {
      fetchEvents();
    }
  }, [initialLoading, fetchEvents]);

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

  const parseEventDate = (dateStr: string) => {
    try {
      const d = new Date(dateStr);
      const monthNamesEn = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];
      const monthNamesKn = ["ಜನ", "ಫೆಬ್ರ", "ಮಾರ್ಚ್", "ಏಪ್ರಿ", "ಮೇ", "ಜೂನ್", "ಜುಲೈ", "ಆಗಸ್ಟ್", "ಸೆಪ್ಟೆಂ", "ಅಕ್ಟೋ", "ನವೆಂ", "ಡಿಸೆಂ"];
      const dayNamesEn = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
      const dayNamesKn = ["ಭಾನು", "ಸೋಮ", "ಮಂಗಳ", "ಬುಧ", "ಗುರು", "ಶುಕ್ರ", "ಶನಿ"];
      const mIdx = d.getMonth();
      const day = String(d.getDate()).padStart(2, "0");
      const dow = d.getDay();
      return {
        monthEn: monthNamesEn[mIdx] || "DATE",
        monthKn: monthNamesKn[mIdx] || "ದಿನ",
        day,
        dayNameEn: dayNamesEn[dow] || "",
        dayNameKn: dayNamesKn[dow] || "",
      };
    } catch {
      return { monthEn: "EVT", monthKn: "ದಿನ", day: "01", dayNameEn: "", dayNameKn: "" };
    }
  };

  const categoryTabs = [
    { id: "all", labelKn: "ಎಲ್ಲಾ ಕಾರ್ಯಕ್ರಮಗಳು", labelEn: "All Events" },
    { id: "farmers", labelKn: "ರೈತರು & ಕೃಷಿ", labelEn: "Farmers & Agri" },
    { id: "grievance", labelKn: "ಜನಸ್ಪಂದನ", labelEn: "Grievance" },
    { id: "youth", labelKn: "ಯುವ ಸಮಾವೇಶಗಳು", labelEn: "Youth & Jobs" },
    { id: "public_meeting", labelKn: "ಸಾರ್ವಜನಿಕ ಸಭೆಗಳು", labelEn: "Town Halls" },
    { id: "development", labelKn: "ಅಭಿವೃದ್ಧಿ ಕಾಮಗಾರಿ", labelEn: "Development" },
  ];

  if (initialLoading) {
    return (
      <div className="min-h-screen bg-[#f8fafc] flex flex-col items-center justify-center text-slate-800">
        <div className="w-10 h-10 border-3 border-amber-500 border-t-transparent rounded-full animate-spin mb-3" />
        <p className="text-xs text-slate-600 font-semibold tracking-wide">
          {language === "kn" ? "ಕಾರ್ಯಕ್ರಮಗಳನ್ನು ಲೋಡ್ ಮಾಡಲಾಗುತ್ತಿದೆ..." : "Loading Events..."}
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
                  {language === "kn" ? "ಸಾರ್ವಜನಿಕ ಕಾರ್ಯಕ್ರಮಗಳು" : "Events & Rallies"}
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
        
        {/* Clean Header Strip (Removed heavy dark banner) */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-2 border-b border-slate-200/80">
          <div>
            <h2 className="text-base sm:text-xl font-extrabold text-slate-900 tracking-tight">
              {language === "kn" 
                ? "ಆಳಂದ ಸಾರ್ವಜನಿಕ ಸಮಾವೇಶಗಳು & ಸಭೆಗಳು" 
                : "Aland Constituency Public Town Halls & Events"}
            </h2>
            <p className="text-xs text-slate-500">
              {language === "kn"
                ? "ಶ್ರೀ ಹರ್ಷಾನಂದ ಗುತ್ತೇದಾರ ಅವರ ಸಾರ್ವಜನಿಕ ಜನಸಂಪರ್ಕ ಮತ್ತು ಸಭೆಗಳ ಅಧಿಕೃತ ವೇಳಾಪಟ್ಟಿ"
                : "Official constituency schedules for farmer advisories, public hearing, and youth forums"}
            </p>
          </div>

          <div className="font-mono text-xs text-slate-600 font-semibold bg-white px-3 py-1 rounded-xl border border-slate-200 shrink-0 self-start sm:self-auto shadow-2xs">
            {pagination.total} {language === "kn" ? "ಕಾರ್ಯಕ್ರಮಗಳು" : "Events Found"}
          </div>
        </div>

        {/* Filter & Search Bar */}
        <div className="bg-white rounded-3xl p-4 sm:p-5 border border-slate-200/80 shadow-xs space-y-3.5">
          {/* Search Input */}
          <form onSubmit={handleSearchSubmit} className="relative flex items-center">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
            <input
              type="text"
              placeholder={language === "kn" ? "ಕಾರ್ಯಕ್ರಮದ ಶೀರ್ಷಿಕೆ, ಸ್ಥಳ ಅಥವಾ ವಿಷಯ ಹುಡುಕಿ..." : "Search event title, venue, or keyword..."}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-24 py-2 rounded-2xl border border-slate-200 text-xs sm:text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:border-blue-500 shadow-2xs"
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
              className="absolute right-1.5 px-4 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold transition-colors cursor-pointer"
            >
              {language === "kn" ? "ಹುಡುಕಿ" : "Search"}
            </button>
          </form>

          {/* Category Tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pb-1">
            {categoryTabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => handleFilterChange(tab.id)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
                  filter === tab.id
                    ? "bg-slate-900 text-white shadow-xs"
                    : "bg-slate-100 hover:bg-slate-200 text-slate-700"
                }`}
              >
                {language === "kn" ? tab.labelKn : tab.labelEn}
              </button>
            ))}
          </div>
        </div>

        {/* Events Grid / Cards */}
        {loading ? (
          <div className="py-24 flex flex-col items-center justify-center space-y-3">
            <RefreshCw className="w-8 h-8 text-blue-600 animate-spin" />
            <p className="text-xs text-slate-500 font-semibold">
              {language === "kn" ? "ಕಾರ್ಯಕ್ರಮಗಳನ್ನು ಪಡೆಯಲಾಗುತ್ತಿದೆ..." : "Loading live events..."}
            </p>
          </div>
        ) : events.length === 0 ? (
          <div className="bg-white rounded-3xl p-12 text-center border border-dashed border-slate-200 space-y-3">
            <Calendar className="w-12 h-12 text-slate-300 mx-auto" />
            <h3 className="text-sm sm:text-base font-bold text-slate-800">
              {language === "kn" ? "ಯಾವುದೇ ಕಾರ್ಯಕ್ರಮಗಳು ಕಂಡುಬಂದಿಲ್ಲ" : "No Events Found"}
            </h3>
            <p className="text-xs text-slate-500 max-w-sm mx-auto">
              {language === "kn" 
                ? "ಆಯ್ಕೆ ಮಾಡಿದ ವರ್ಗದಲ್ಲಿ ಯಾವುದೇ ಕಾರ್ಯಕ್ರಮಗಳು ಪ್ರಕಟವಾಗಿಲ್ಲ." 
                : "No events matched your search query or filter. Try clearing filters."}
            </p>
            <button
              type="button"
              onClick={() => {
                setFilter("all");
                handleClearSearch();
              }}
              className="px-4 py-1.5 rounded-xl bg-slate-900 text-white text-xs font-bold cursor-pointer"
            >
              {language === "kn" ? "ಎಲ್ಲಾ ಕಾರ್ಯಕ್ರಮಗಳನ್ನು ತೋರಿಸಿ" : "Show All Events"}
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {events.map((evt) => {
              const dateInfo = parseEventDate(evt.event_date);
              const isUpcoming = evt.status === "upcoming";

              return (
                <div
                  key={evt.id}
                  className="bg-white rounded-3xl border border-slate-200/80 hover:border-blue-300 p-4 sm:p-5 shadow-xs hover:shadow-md transition-all flex flex-col justify-between space-y-4 relative overflow-hidden group"
                >
                  <div className="space-y-3">
                    {/* Header Row: Date Pill & Status */}
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-2xl bg-indigo-50 border border-indigo-200 text-indigo-700 flex flex-col items-center justify-center shrink-0 shadow-2xs">
                          <span className="text-[8px] font-black uppercase tracking-wider leading-none">
                            {language === "kn" ? dateInfo.monthKn : dateInfo.monthEn}
                          </span>
                          <span className="text-base font-black leading-tight">
                            {dateInfo.day}
                          </span>
                          <span className="text-[8px] font-medium leading-none opacity-80">
                            {language === "kn" ? dateInfo.dayNameKn : dateInfo.dayNameEn}
                          </span>
                        </div>

                        <div>
                          <span className="text-[9px] font-black px-2 py-0.5 rounded-full bg-slate-100 text-slate-700 uppercase">
                            {evt.category}
                          </span>
                          <h3 className="text-sm font-bold text-slate-900 mt-1 line-clamp-2">
                            {language === "kn" ? evt.title_kn : evt.title_en}
                          </h3>
                        </div>
                      </div>

                      <span className={`text-[9px] font-black px-2 py-0.5 rounded-full uppercase shrink-0 ${
                        isUpcoming ? "bg-emerald-100 text-emerald-800" : "bg-slate-100 text-slate-600"
                      }`}>
                        {evt.status}
                      </span>
                    </div>

                    {/* Metadata: Time & Location */}
                    <div className="p-3 rounded-2xl bg-slate-50/70 border border-slate-100 space-y-1.5 text-xs text-slate-600">
                      <div className="flex items-center gap-2">
                        <Clock className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                        <span>{evt.start_time} {evt.end_time ? `- ${evt.end_time}` : ""}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPin className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                        <span className="truncate">{language === "kn" ? evt.location_kn : evt.location_en}</span>
                      </div>
                      {evt.contact_phone && (
                        <div className="flex items-center gap-2 text-[11px] text-slate-500">
                          <Phone className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                          <span>{evt.contact_person || "Coordinator"}: {evt.contact_phone}</span>
                        </div>
                      )}
                    </div>

                    {/* Description excerpt */}
                    {(evt.description_kn || evt.description_en) && (
                      <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">
                        {language === "kn" 
                          ? evt.description_kn || evt.description_en 
                          : evt.description_en || evt.description_kn}
                      </p>
                    )}
                  </div>

                  {/* Card Actions: Details & Call */}
                  <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
                    <button
                      type="button"
                      onClick={() => setSelectedEventModal(evt)}
                      className="px-4 py-1.5 rounded-xl border border-slate-200 hover:bg-slate-100 text-slate-700 text-xs font-bold transition-all cursor-pointer"
                    >
                      {language === "kn" ? "ಸಂಪೂರ್ಣ ವಿವರ" : "Event Briefing"}
                    </button>

                    {evt.contact_phone && (
                      <a
                        href={`tel:${evt.contact_phone}`}
                        className="px-3.5 py-1.5 rounded-xl bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 text-emerald-800 text-xs font-bold transition-all flex items-center gap-1.5"
                      >
                        <PhoneCall className="w-3.5 h-3.5 text-emerald-600" />
                        <span>{language === "kn" ? "ಸಂಪರ್ಕಿಸಿ" : "Call Coordinator"}</span>
                      </a>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Pagination Controls */}
        {pagination.totalPages > 1 && (
          <div className="bg-white rounded-2xl p-4 border border-slate-200/80 shadow-2xs flex flex-col sm:flex-row items-center justify-between gap-3">
            <span className="text-xs text-slate-500">
              {language === "kn" 
                ? `ಪುಟ ${pagination.page} / ${pagination.totalPages} (ಒಟ್ಟು ${pagination.total} ಕಾರ್ಯಕ್ರಮಗಳು)` 
                : `Page ${pagination.page} of ${pagination.totalPages} (${pagination.total} events)`}
            </span>

            <div className="flex items-center gap-1.5">
              <button
                type="button"
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                disabled={pagination.page <= 1 || loading}
                className="px-3 py-1 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-semibold disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer flex items-center gap-1"
              >
                <ChevronLeft className="w-3.5 h-3.5" />
                <span>Prev</span>
              </button>

              {Array.from({ length: pagination.totalPages }, (_, i) => i + 1).map((pNum) => (
                <button
                  key={pNum}
                  type="button"
                  onClick={() => setPage(pNum)}
                  className={`w-7 h-7 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    pagination.page === pNum
                      ? "bg-blue-600 text-white shadow-2xs"
                      : "border border-slate-200 hover:bg-slate-50 text-slate-700"
                  }`}
                >
                  {pNum}
                </button>
              ))}

              <button
                type="button"
                onClick={() => setPage((p) => Math.min(pagination.totalPages, p + 1))}
                disabled={pagination.page >= pagination.totalPages || loading}
                className="px-3 py-1 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-semibold disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer flex items-center gap-1"
              >
                <span>Next</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        )}

      </main>

      {/* Event Details Popup Modal (Normal Clean White Header, NO RSVP) */}
      {selectedEventModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl max-w-lg w-full overflow-hidden shadow-2xl border border-slate-200 animate-in zoom-in-95 duration-200">
            {/* Modal Header: Normal clean white style */}
            <div className="p-4 sm:p-5 bg-white border-b border-slate-200 text-slate-900 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-blue-50 border border-blue-200 flex items-center justify-center text-blue-600">
                  <Calendar className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-xs sm:text-sm font-bold uppercase tracking-wider text-slate-900">
                    {language === "kn" ? "ಅಧಿಕೃತ ಕಾರ್ಯಕ್ರಮ ವಿವರ" : "Official Event Briefing"}
                  </h3>
                  <span className="text-[10px] text-slate-500">
                    Aland Constituency • Shri Harshanand Guttedar Platform
                  </span>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setSelectedEventModal(null)}
                className="w-8 h-8 rounded-full hover:bg-slate-100 text-slate-400 hover:text-slate-700 flex items-center justify-center transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-5 sm:p-6 space-y-4 text-xs sm:text-sm">
              <div className="space-y-1">
                <span className="text-[10px] font-black px-2.5 py-0.5 rounded-full bg-blue-100 text-blue-800 uppercase tracking-wider">
                  {selectedEventModal.category}
                </span>
                <h2 className="text-base sm:text-lg font-black text-slate-900 mt-1">
                  {language === "kn" ? selectedEventModal.title_kn : selectedEventModal.title_en}
                </h2>
              </div>

              {/* Schedule Box */}
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-2 text-xs text-slate-700">
                <div className="flex items-center gap-2">
                  <Calendar className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                  <span><strong>Date:</strong> {selectedEventModal.event_date}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                  <span><strong>Time:</strong> {selectedEventModal.start_time} {selectedEventModal.end_time ? `- ${selectedEventModal.end_time}` : ""}</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                  <span><strong>Venue / ಸ್ಥಳ:</strong> {language === "kn" ? selectedEventModal.location_kn : selectedEventModal.location_en}</span>
                </div>
                {selectedEventModal.contact_phone && (
                  <div className="flex items-center gap-2">
                    <Phone className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    <span><strong>Coordinator:</strong> {selectedEventModal.contact_person || "Secretariat"} ({selectedEventModal.contact_phone})</span>
                  </div>
                )}
              </div>

              {/* Description */}
              {(selectedEventModal.description_kn || selectedEventModal.description_en) && (
                <div className="space-y-1">
                  <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                    {language === "kn" ? "ಕಾರ್ಯಕ್ರಮ ವಿವರಣೆ" : "Agenda & Briefing"}
                  </h4>
                  <p className="text-slate-600 text-xs leading-relaxed">
                    {language === "kn"
                      ? selectedEventModal.description_kn || selectedEventModal.description_en
                      : selectedEventModal.description_en || selectedEventModal.description_kn}
                  </p>
                </div>
              )}

              {/* Call Coordinator Button */}
              {selectedEventModal.contact_phone && (
                <a
                  href={`tel:${selectedEventModal.contact_phone}`}
                  className="w-full py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-xs transition-colors"
                >
                  <PhoneCall className="w-4 h-4" />
                  <span>
                    {language === "kn" ? "ಸಂಯೋಜಕರನ್ನು ಸಂಪರ್ಕಿಸಿ" : "Call Coordinator"}
                  </span>
                </a>
              )}
            </div>

            {/* Modal Footer */}
            <div className="p-4 bg-slate-50 border-t border-slate-100 flex items-center justify-end">
              <button
                type="button"
                onClick={() => setSelectedEventModal(null)}
                className="px-5 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold cursor-pointer transition-colors"
              >
                {language === "kn" ? "ಮುಚ್ಚಿ" : "Close"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Fixed Mobile Bottom Navigation */}
      <nav className="fixed bottom-0 inset-x-0 bg-white/95 backdrop-blur-md border-t border-slate-200/80 px-4 py-2 z-40 lg:hidden flex items-center justify-around shadow-lg">
        <Link
          href="/portal"
          className="flex flex-col items-center gap-0.5 text-slate-400 hover:text-blue-600"
        >
          <Home className="w-4 h-4" />
          <span className="text-[9px] font-bold">{language === "kn" ? "ಮುಖಪುಟ" : "Home"}</span>
        </Link>

        <Link
          href="/portal"
          className="flex flex-col items-center gap-0.5 text-slate-400 hover:text-blue-600"
        >
          <Grid className="w-4 h-4" />
          <span className="text-[9px] font-bold">{language === "kn" ? "ಸೇವೆಗಳು" : "Services"}</span>
        </Link>

        <Link
          href="/portal"
          className="flex flex-col items-center -mt-5 cursor-pointer group"
        >
          <div className="w-11 h-11 rounded-full bg-gradient-to-tr from-amber-500 via-amber-400 to-red-600 p-[2px] shadow-md group-hover:scale-105 transition-transform">
            <div className="w-full h-full rounded-full bg-slate-900 flex items-center justify-center text-amber-300">
              <IdCard className="w-5 h-5" />
            </div>
          </div>
          <span className="text-[9px] font-black text-amber-700 mt-0.5">
            {language === "kn" ? "ಕಾರ್ಡ್" : "ID Card"}
          </span>
        </Link>

        <div className="flex flex-col items-center gap-0.5 text-blue-600">
          <Calendar className="w-4 h-4" />
          <span className="text-[9px] font-bold">{language === "kn" ? "ಕಾರ್ಯಕ್ರಮ" : "Events"}</span>
        </div>

        <Link
          href="/portal"
          className="flex flex-col items-center gap-0.5 text-slate-400 hover:text-blue-600"
        >
          <Phone className="w-4 h-4" />
          <span className="text-[9px] font-bold">{language === "kn" ? "ಕಚೇರಿ" : "Support"}</span>
        </Link>
      </nav>
    </div>
  );
}

