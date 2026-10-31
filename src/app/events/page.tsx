"use client";

import React, { useState, useEffect, useCallback } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PageHeroBanner from "@/components/common/PageHeroBanner";
import ImagePlaceholder from "@/components/common/ImagePlaceholder";
import { useLanguage } from "@/context/LanguageContext";
import { 
  Calendar, 
  Clock, 
  MapPin, 
  ArrowRight, 
  CheckCircle2, 
  Users, 
  Search, 
  X, 
  ChevronLeft, 
  ChevronRight,
  PhoneCall,
  Phone,
  RefreshCw,
  AlertCircle
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
  created_at?: string;
}

export default function EventsPage() {
  const { language } = useLanguage();

  // State
  const [events, setEvents] = useState<LiveEventItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [appliedSearch, setAppliedSearch] = useState("");
  const [page, setPage] = useState(1);
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 6,
    total: 0,
    totalPages: 1,
  });

  const [selectedEventModal, setSelectedEventModal] = useState<LiveEventItem | null>(null);

  // Fetch live events from API with query parameters & pagination
  const fetchEvents = useCallback(async () => {
    setLoading(true);
    try {
      const q = new URLSearchParams({
        page: String(page),
        limit: "6",
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
        if (data.pagination) {
          setPagination(data.pagination);
        }
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
    fetchEvents();
  }, [fetchEvents]);

  const handleFilterChange = (newCategory: string) => {
    setFilter(newCategory);
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

  // Helper date formatter
  const formatEventDate = (dateStr: string) => {
    try {
      const d = new Date(dateStr);
      const options: Intl.DateTimeFormatOptions = { 
        day: "numeric", 
        month: "long", 
        year: "numeric", 
        weekday: "short" 
      };
      if (language === "kn") {
        return d.toLocaleDateString("kn-IN", options);
      }
      return d.toLocaleDateString("en-US", options);
    } catch {
      return dateStr;
    }
  };

  const categoryTabs = [
    { id: "all", labelKn: "ಎಲ್ಲಾ ಕಾರ್ಯಕ್ರಮಗಳು", labelEn: "All Events" },
    { id: "farmers", labelKn: "ರೈತರು & ಕೃಷಿ", labelEn: "Farmers & Agriculture" },
    { id: "grievance", labelKn: "ಜನಸ್ಪಂದನ", labelEn: "Public Hearing & Grievance" },
    { id: "youth", labelKn: "ಯುವ ಸಮಾವೇಶಗಳು", labelEn: "Youth & Employment" },
    { id: "public_meeting", labelKn: "ಸಾರ್ವಜನಿಕ ರ‍್ಯಾಲಿಗಳು", labelEn: "Town Halls & Rallies" },
    { id: "development", labelKn: "ಅಭಿವೃದ್ಧಿ ಕಾಮಗಾರಿ", labelEn: "Development Works" },
  ];

  return (
    <main className="min-h-screen bg-white text-slate-900 relative overflow-x-hidden">
      <Navbar />

      <PageHeroBanner
        badgeKn="ಸಾರ್ವಜನಿಕ ಕಾರ್ಯಕ್ರಮಗಳು"
        badgeEn="PUBLIC EVENTS & RALLIES"
        titleKn={
          <>
            ಸಾರ್ವಜನಿಕ ಸಮಾವೇಶಗಳು &{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-amber-200 to-red-400">
              ಜನಸಂಪರ್ಕ ಸಭೆಗಳು
            </span>
          </>
        }
        titleEn={
          <>
            Public Town Halls &{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-amber-200 to-red-400">
              Community Forums
            </span>
          </>
        }
        subtitleKn="ಶ್ರೀ ಹರ್ಷಾನಂದ ಗುತ್ತೇದಾರ ಅವರೊಂದಿಗೆ ನೇರ ಸಂವಾದ, ತಾಲೂಕು ಮಟ್ಟದ ಸಾರ್ವಜನಿಕ ಸಭೆಗಳು ಮತ್ತು ಕೃಷಿ ಸಮಾವೇಶಗಳ ಅಧಿಕೃತ ವಿವರಗಳು."
        subtitleEn="Join upcoming town halls, farmer assemblies, grievance darshan, and youth leadership forums led by Shri Harshanand Guttedar across Kalaburagi."
        breadcrumbLabelKn="ಕಾರ್ಯಕ್ರಮಗಳು"
        breadcrumbLabelEn="Events"
        icon={Calendar}
      />

      {/* Main Events Content Section */}
      <section className="py-10 sm:py-16 lg:py-20 bg-white" aria-label="Events List">
        <div className="w-full px-4 sm:px-8 md:px-10 lg:px-12 xl:px-16 2xl:px-20 max-w-7xl mx-auto space-y-8">
          
          {/* Controls: Search Bar & Filter Tabs */}
          <div className="space-y-4">
            {/* Search Input */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 bg-slate-50 p-3 sm:p-4 rounded-2xl border border-slate-200">
              <form onSubmit={handleSearchSubmit} className="relative flex-1">
                <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                <input
                  type="text"
                  placeholder={language === "kn" ? "ಕಾರ್ಯಕ್ರಮ, ಸ್ಥಳ ಅಥವಾ ವಿಷಯ ಹುಡುಕಿ..." : "Search event title, venue, or keyword..."}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-9 py-2 bg-white rounded-xl border border-slate-200 text-xs sm:text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-blue-500 shadow-2xs"
                />
                {searchQuery && (
                  <button
                    type="button"
                    onClick={handleClearSearch}
                    className="absolute right-3 top-2.5 text-slate-400 hover:text-slate-600"
                  >
                    <X className="w-4 h-4" />
                  </button>
                )}
              </form>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={handleSearchSubmit}
                  className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-[#b91c1c] text-white text-xs sm:text-sm font-bold shadow-xs transition-colors cursor-pointer"
                >
                  {language === "kn" ? "ಹುಡುಕಿ" : "Search"}
                </button>
                {appliedSearch && (
                  <button
                    type="button"
                    onClick={handleClearSearch}
                    className="px-3 py-2 rounded-xl border border-slate-200 hover:bg-white text-slate-600 text-xs font-semibold cursor-pointer"
                  >
                    {language === "kn" ? "ಮರುಹೊಂದಿಸಿ" : "Reset"}
                  </button>
                )}
              </div>
            </div>

            {/* Filter Tabs */}
            <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-2 border-b border-slate-100">
              {categoryTabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => handleFilterChange(tab.id)}
                  className={`px-4 sm:px-5 py-2 rounded-full text-xs sm:text-sm font-semibold transition-all shrink-0 cursor-pointer ${
                    filter === tab.id
                      ? "bg-slate-900 text-white shadow-md shadow-slate-900/20"
                      : "bg-slate-100 hover:bg-slate-200/80 text-slate-700"
                  }`}
                >
                  {language === "kn" ? tab.labelKn : tab.labelEn}
                </button>
              ))}
            </div>
          </div>

          {/* Active Search & Record Count Feedback */}
          <div className="flex items-center justify-between text-xs text-slate-500">
            <span>
              {appliedSearch ? (
                <>
                  Showing results for &ldquo;<strong className="text-slate-800">{appliedSearch}</strong>&rdquo;
                </>
              ) : (
                <span>{language === "kn" ? "ಅಧಿಕೃತ ಸಾರ್ವಜನಿಕ ಕಾರ್ಯಕ್ರಮಗಳು" : "Official Public Events Stream"}</span>
              )}
            </span>
            <span className="font-mono">{pagination.total} {language === "kn" ? "ಕಾರ್ಯಕ್ರಮಗಳು" : "Events Found"}</span>
          </div>

          {/* Loading State */}
          {loading ? (
            <div className="py-24 flex flex-col items-center justify-center space-y-3">
              <RefreshCw className="w-8 h-8 text-[#b91c1c] animate-spin" />
              <p className="text-xs sm:text-sm text-slate-500 font-semibold">
                {language === "kn" ? "ಕಾರ್ಯಕ್ರಮಗಳನ್ನು ಲೋಡ್ ಮಾಡಲಾಗುತ್ತಿದೆ..." : "Loading live events..."}
              </p>
            </div>
          ) : events.length === 0 ? (
            /* Empty State */
            <div className="py-20 text-center space-y-3 bg-slate-50 rounded-3xl border border-dashed border-slate-200 p-8">
              <Calendar className="w-12 h-12 text-slate-300 mx-auto" />
              <h3 className="text-base font-bold text-slate-800">
                {language === "kn" ? "ಯಾವುದೇ ಕಾರ್ಯಕ್ರಮಗಳು ಕಂಡುಬಂದಿಲ್ಲ" : "No Events Found"}
              </h3>
              <p className="text-xs text-slate-500 max-w-md mx-auto">
                {language === "kn" 
                  ? "ಆಯ್ಕೆ ಮಾಡಿದ ವರ್ಗದಲ್ಲಿ ಯಾವುದೇ ಕಾರ್ಯಕ್ರಮಗಳು ಪ್ರಕಟವಾಗಿಲ್ಲ. ದಯವಿಟ್ಟು ಬೇರೆ ವರ್ಗವನ್ನು ಆಯ್ಕೆ ಮಾಡಿ ಅಥವಾ ಶೋಧನೆಯನ್ನು ಮರುಹೊಂದಿಸಿ."
                  : "No events matched your search query or category filter. Check back soon or reset your filters."}
              </p>
              <button
                type="button"
                onClick={() => {
                  setFilter("all");
                  handleClearSearch();
                }}
                className="px-4 py-2 rounded-xl bg-slate-900 text-white text-xs font-bold hover:bg-[#b91c1c] transition-colors"
              >
                {language === "kn" ? "ಎಲ್ಲಾ ಕಾರ್ಯಕ್ರಮಗಳನ್ನು ತೋರಿಸಿ" : "Show All Events"}
              </button>
            </div>
          ) : (
            /* Event Cards Stack */
            <div className="space-y-6 sm:space-y-8">
              {events.map((evt) => (
                <div
                  key={evt.id}
                  className="rounded-3xl border border-slate-200/90 bg-white shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden grid grid-cols-1 md:grid-cols-12 group"
                >
                  {/* Event Image (Left Column: md:col-span-5) */}
                  <div className="md:col-span-5 relative overflow-hidden bg-slate-100 min-h-[220px]">
                    {evt.banner_url ? (
                      <img
                        src={evt.banner_url}
                        alt={language === "kn" ? evt.title_kn : evt.title_en}
                        className="w-full h-64 sm:h-72 md:h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    ) : (
                      <ImagePlaceholder
                        label={language === "kn" ? evt.title_kn : evt.title_en}
                        height="h-64 sm:h-72 md:h-full"
                        className="w-full h-full rounded-none border-none group-hover:scale-105 transition-transform duration-500"
                      />
                    )}

                    <div className="absolute top-4 left-4 flex items-center gap-1.5">
                      <span className={`px-3 py-1 rounded-full text-[11px] font-bold tracking-wide uppercase shadow-sm ${
                        evt.status === "upcoming" 
                          ? "bg-emerald-600 text-white" 
                          : evt.status === "completed"
                            ? "bg-slate-700 text-white"
                            : "bg-rose-600 text-white"
                      }`}>
                        {evt.status === "upcoming" 
                          ? (language === "kn" ? "ಮುಂಬರುವ ಸಭೆ" : "Upcoming") 
                          : evt.status === "completed"
                            ? (language === "kn" ? "ಮುಕ್ತಾಯಗೊಂಡಿದೆ" : "Completed")
                            : (language === "kn" ? "ರದ್ದುಗೊಂಡಿದೆ" : "Cancelled")}
                      </span>

                      <span className="px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-white/90 text-slate-800 shadow-2xs backdrop-blur-xs">
                        {evt.category}
                      </span>
                    </div>
                  </div>

                  {/* Event Details (Right Column: md:col-span-7) */}
                  <div className="md:col-span-7 p-6 sm:p-8 lg:p-10 flex flex-col justify-between space-y-5">
                    <div className="space-y-3">
                      <h2 className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-slate-900 tracking-tight leading-snug group-hover:text-[#b91c1c] transition-colors">
                        {language === "kn" ? evt.title_kn : evt.title_en}
                      </h2>
                      <p className="text-slate-600 text-xs sm:text-sm lg:text-base leading-relaxed line-clamp-3">
                        {language === "kn" 
                          ? evt.description_kn || evt.description_en || "ಆಳಂದ ಮತಕ್ಷೇತ್ರದ ಸಾರ್ವಜನಿಕ ಕಾರ್ಯಕ್ರಮ."
                          : evt.description_en || evt.description_kn || "Constituency public event."}
                      </p>
                    </div>

                    {/* Metadata Row (Date, Time, Location) */}
                    <div className="pt-4 border-t border-slate-100 space-y-2.5 text-xs sm:text-sm text-slate-700 font-medium">
                      <div className="flex items-center gap-2.5">
                        <Calendar className="w-4 h-4 text-[#b91c1c] shrink-0" />
                        <span>
                          <strong className="text-slate-900 font-bold uppercase tracking-wider text-[11px] mr-1.5">DATE:</strong>
                          {formatEventDate(evt.event_date)}
                        </span>
                      </div>

                      <div className="flex items-center gap-2.5">
                        <Clock className="w-4 h-4 text-[#b91c1c] shrink-0" />
                        <span>
                          <strong className="text-slate-900 font-bold uppercase tracking-wider text-[11px] mr-1.5">TIME:</strong>
                          {evt.start_time} {evt.end_time ? `- ${evt.end_time}` : ""}
                        </span>
                      </div>

                      <div className="flex items-center gap-2.5">
                        <MapPin className="w-4 h-4 text-[#b91c1c] shrink-0" />
                        <span>
                          <strong className="text-slate-900 font-bold uppercase tracking-wider text-[11px] mr-1.5">LOCATION:</strong>
                          {language === "kn" ? evt.location_kn : evt.location_en}
                        </span>
                      </div>

                      {evt.contact_phone && (
                        <div className="flex items-center gap-2.5 text-slate-600">
                          <Phone className="w-4 h-4 text-emerald-600 shrink-0" />
                          <span>
                            <strong className="text-slate-900 font-bold uppercase tracking-wider text-[11px] mr-1.5">CONTACT:</strong>
                            {evt.contact_person || "Secretariat"} ({evt.contact_phone})
                          </span>
                        </div>
                      )}
                    </div>

                    {/* Action Row */}
                    <div className="pt-2 flex items-center gap-3">
                      <button
                        type="button"
                        onClick={() => setSelectedEventModal(evt)}
                        className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-slate-900 hover:bg-[#b91c1c] text-white text-xs sm:text-sm font-semibold transition-all group-hover:shadow cursor-pointer"
                      >
                        <span>{language === "kn" ? "ಸಂಪೂರ್ಣ ವಿವರ" : "Event Briefing"}</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Pagination Controls */}
          {pagination.totalPages > 1 && (
            <div className="pt-6 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4">
              <span className="text-xs text-slate-500">
                {language === "kn" 
                  ? `ಪುಟ ${pagination.page} / ${pagination.totalPages} (ಒಟ್ಟು ${pagination.total} ಕಾರ್ಯಕ್ರಮಗಳು)`
                  : `Page ${pagination.page} of ${pagination.totalPages} (${pagination.total} total events)`}
              </span>

              <div className="flex items-center gap-1.5">
                <button
                  type="button"
                  onClick={() => setPage((p) => Math.max(1, p - 1))}
                  disabled={pagination.page <= 1 || loading}
                  className="px-3.5 py-1.5 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-semibold disabled:opacity-40 disabled:cursor-not-allowed transition-colors cursor-pointer flex items-center gap-1"
                >
                  <ChevronLeft className="w-3.5 h-3.5" />
                  <span>Prev</span>
                </button>

                {Array.from({ length: pagination.totalPages }, (_, i) => i + 1).map((pNum) => (
                  <button
                    key={pNum}
                    type="button"
                    onClick={() => setPage(pNum)}
                    className={`w-8 h-8 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                      pagination.page === pNum
                        ? "bg-slate-900 text-white shadow-xs"
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
                  className="px-3.5 py-1.5 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-semibold disabled:opacity-40 disabled:cursor-not-allowed transition-colors cursor-pointer flex items-center gap-1"
                >
                  <span>Next</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          )}

        </div>
      </section>

      {/* Event Details Full Briefing Modal */}
      {selectedEventModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl max-w-xl w-full overflow-hidden shadow-2xl border border-slate-200 animate-in zoom-in-95 duration-200">
            {/* Modal Header */}
            <div className="p-4 sm:p-5 bg-white border-b border-slate-200 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-blue-50 border border-blue-200 flex items-center justify-center text-blue-600">
                  <Calendar className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-xs sm:text-sm font-bold text-slate-900 uppercase tracking-wider">
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
                <h2 className="text-lg sm:text-xl font-black text-slate-900 mt-1">
                  {language === "kn" ? selectedEventModal.title_kn : selectedEventModal.title_en}
                </h2>
              </div>

              {/* Schedule Box */}
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-2.5 text-xs text-slate-700">
                <div className="flex items-center gap-2.5">
                  <Calendar className="w-4 h-4 text-[#b91c1c] shrink-0" />
                  <span><strong>Date:</strong> {formatEventDate(selectedEventModal.event_date)}</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <Clock className="w-4 h-4 text-[#b91c1c] shrink-0" />
                  <span><strong>Time:</strong> {selectedEventModal.start_time} {selectedEventModal.end_time ? `- ${selectedEventModal.end_time}` : ""}</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <MapPin className="w-4 h-4 text-[#b91c1c] shrink-0" />
                  <span><strong>Venue / ಸ್ಥಳ:</strong> {language === "kn" ? selectedEventModal.location_kn : selectedEventModal.location_en}</span>
                </div>
                {selectedEventModal.contact_phone && (
                  <div className="flex items-center gap-2.5">
                    <Phone className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span><strong>Coordinator:</strong> {selectedEventModal.contact_person || "Secretariat"} ({selectedEventModal.contact_phone})</span>
                  </div>
                )}
              </div>

              {/* Description */}
              {(selectedEventModal.description_kn || selectedEventModal.description_en) && (
                <div className="space-y-1.5 pt-2">
                  <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                    {language === "kn" ? "ಕಾರ್ಯಕ್ರಮದ ರೂಪುರೇಷೆ & ವಿವರಣೆ" : "Agenda & Briefing"}
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
                <div className="pt-2">
                  <a
                    href={`tel:${selectedEventModal.contact_phone}`}
                    className="w-full py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-xs transition-colors"
                  >
                    <PhoneCall className="w-4 h-4" />
                    <span>
                      {language === "kn" 
                        ? `ಸಂಯೋಜಕರನ್ನು ಸಂಪರ್ಕಿಸಿ: ${selectedEventModal.contact_phone}` 
                        : `Call Coordinator: ${selectedEventModal.contact_phone}`}
                    </span>
                  </a>
                </div>
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

      <Footer />
    </main>
  );
}
