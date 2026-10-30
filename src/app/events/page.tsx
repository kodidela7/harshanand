"use client";

import React, { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PageHeroBanner from "@/components/common/PageHeroBanner";
import ImagePlaceholder from "@/components/common/ImagePlaceholder";
import { useLanguage } from "@/context/LanguageContext";
import { EVENTS_DATA, EventItem } from "@/data/mockData";
import { Calendar, Clock, MapPin, ArrowRight, CheckCircle2, Users } from "lucide-react";

export default function EventsPage() {
  const { language } = useLanguage();
  const [filter, setFilter] = useState<string>("all");
  const [registeredEvent, setRegisteredEvent] = useState<string | null>(null);

  const filteredEvents = filter === "all" 
    ? EVENTS_DATA 
    : EVENTS_DATA.filter((e) => e.category === filter);

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
        subtitleKn="ಶ್ರೀ ಹರ್ಷಾನಂದ ಗುತ್ತೇದಾರ ಅವರೊಂದಿಗೆ ನೇರ ಸಂವಾದ, ತಾಲೂಕು ಮಟ್ಟದ ಸಾರ್ವಜನಿಕ ಸಭೆಗಳು ಮತ್ತು ಕೃಷಿ ಸಮಾವೇಶಗಳ ವಿವರಗಳು."
        subtitleEn="Join upcoming town halls, farmer assemblies, and youth leadership forums led by Shri Harshanand Guttedar across Kalaburagi."
        breadcrumbLabelKn="ಕಾರ್ಯಕ್ರಮಗಳು"
        breadcrumbLabelEn="Events"
        icon={Calendar}
      />

      {/* Main Events Content Section */}
      <section className="py-12 sm:py-16 lg:py-20 bg-white" aria-label="Events List">
        <div className="w-full px-5 sm:px-8 md:px-10 lg:px-12 xl:px-16 2xl:px-20 max-w-7xl mx-auto">
          
          {/* Filter Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-3 mb-10 border-b border-slate-100">
            {[
              { id: "all", labelKn: "ಎಲ್ಲಾ ಕಾರ್ಯಕ್ರಮಗಳು", labelEn: "All Events" },
              { id: "townhall", labelKn: "ಜನಸಂಪರ್ಕ ಸಭೆಗಳು", labelEn: "Town Halls" },
              { id: "farmer", labelKn: "ರೈತ ಸಮಾವೇಶಗಳು", labelEn: "Farmer Assemblies" },
              { id: "youth", labelKn: "ಯುವ ಸಮಾವೇಶಗಳು", labelEn: "Youth Conclaves" },
              { id: "rally", labelKn: "ಸಾರ್ವಜನಿಕ ರ‍್ಯಾಲಿಗಳು", labelEn: "Public Rallies" },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setFilter(tab.id)}
                className={`px-4 sm:px-5 py-2 sm:py-2.5 rounded-full text-xs sm:text-sm font-semibold transition-all shrink-0 cursor-pointer ${
                  filter === tab.id
                    ? "bg-slate-900 text-white shadow-md shadow-slate-900/20"
                    : "bg-slate-100 hover:bg-slate-200/80 text-slate-700"
                }`}
              >
                {language === "kn" ? tab.labelKn : tab.labelEn}
              </button>
            ))}
          </div>

          {/* Event Cards Stack (Exact Match to Screenshot 4) */}
          <div className="space-y-6 sm:space-y-8">
            {filteredEvents.map((evt) => (
              <div
                key={evt.id}
                className="rounded-3xl border border-slate-200/90 bg-white shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden grid grid-cols-1 md:grid-cols-12 group"
              >
                {/* Event Image (Left Column: md:col-span-5) */}
                <div className="md:col-span-5 relative overflow-hidden bg-slate-100">
                  <ImagePlaceholder
                    label={language === "kn" ? evt.imageLabelKn : evt.imageLabelEn}
                    height="h-64 sm:h-72 md:h-full"
                    className="w-full h-full rounded-none border-none group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-4 left-4">
                    <span className={`px-3 py-1 rounded-full text-[11px] font-bold tracking-wide uppercase shadow-sm ${
                      evt.status === "upcoming" 
                        ? "bg-emerald-600 text-white" 
                        : "bg-slate-700 text-white"
                    }`}>
                      {evt.status === "upcoming" 
                        ? (language === "kn" ? "ಮುಂಬರುವ ಸಭೆ" : "Upcoming") 
                        : (language === "kn" ? "ಯಶಸ್ವಿ ಕಾರ್ಯಕ್ರಮ" : "Completed")}
                    </span>
                  </div>
                </div>

                {/* Event Details (Right Column: md:col-span-7) */}
                <div className="md:col-span-7 p-6 sm:p-8 lg:p-10 flex flex-col justify-between space-y-5">
                  <div className="space-y-3">
                    <h2 className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-slate-900 tracking-tight leading-snug group-hover:text-[#b91c1c] transition-colors">
                      {language === "kn" ? evt.titleKn : evt.titleEn}
                    </h2>
                    <p className="text-slate-600 text-xs sm:text-sm lg:text-base leading-relaxed">
                      {language === "kn" ? evt.descKn : evt.descEn}
                    </p>
                  </div>

                  {/* Metadata Row (Date, Time, Location) */}
                  <div className="pt-4 border-t border-slate-100 space-y-2.5 text-xs sm:text-sm text-slate-700 font-medium">
                    <div className="flex items-center gap-2.5">
                      <Calendar className="w-4 h-4 text-[#b91c1c] shrink-0" />
                      <span>
                        <strong className="text-slate-900 font-bold uppercase tracking-wider text-[11px] mr-1.5">DATE:</strong>
                        {language === "kn" ? evt.dateKn : evt.dateEn}
                      </span>
                    </div>

                    <div className="flex items-center gap-2.5">
                      <Clock className="w-4 h-4 text-[#b91c1c] shrink-0" />
                      <span>
                        <strong className="text-slate-900 font-bold uppercase tracking-wider text-[11px] mr-1.5">TIME:</strong>
                        {language === "kn" ? evt.timeKn : evt.timeEn}
                      </span>
                    </div>

                    <div className="flex items-center gap-2.5">
                      <MapPin className="w-4 h-4 text-[#b91c1c] shrink-0" />
                      <span>
                        <strong className="text-slate-900 font-bold uppercase tracking-wider text-[11px] mr-1.5">LOCATION:</strong>
                        {language === "kn" ? evt.locationKn : evt.locationEn}
                      </span>
                    </div>
                  </div>

                  {/* Action Row */}
                  <div className="pt-2 flex items-center gap-3">
                    <button
                      onClick={() => setRegisteredEvent(evt.id)}
                      className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-slate-900 hover:bg-[#b91c1c] text-white text-xs sm:text-sm font-semibold transition-all group-hover:shadow cursor-pointer"
                    >
                      <span>{language === "kn" ? "ವಿವರ & ನೋಂದಣಿ" : "Event Details"}</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>

                    {registeredEvent === evt.id && (
                      <span className="text-xs font-bold text-emerald-600 flex items-center gap-1.5 animate-in fade-in">
                        <CheckCircle2 className="w-4 h-4" />
                        <span>{language === "kn" ? "ನೋಂದಣಿ ದೃಢೀಕರಿಸಲಾಗಿದೆ" : "RSVP Confirmed"}</span>
                      </span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      <Footer />
    </main>
  );
}

