"use client";

import React, { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PageHeroBanner from "@/components/common/PageHeroBanner";
import ImagePlaceholder from "@/components/common/ImagePlaceholder";
import { useLanguage } from "@/context/LanguageContext";
import { 
  Phone, 
  Mail, 
  MapPin, 
  ArrowRight, 
  CheckCircle2, 
  MessageSquare, 
  Clock, 
  Send
} from "lucide-react";

export default function ContactPage() {
  const { language } = useLanguage();
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    location: "Aland, Kalaburagi",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.name && (formData.email || formData.phone)) {
      setSubmitted(true);
      setTimeout(() => setSubmitted(false), 5000);
      setFormData({
        name: "",
        email: "",
        phone: "",
        location: "Aland, Kalaburagi",
        message: "",
      });
    }
  };

  return (
    <main className="min-h-screen bg-white text-slate-900 relative overflow-x-hidden">
      <Navbar />

      <PageHeroBanner
        badgeKn="ನೇರ ಜನಸಂಪರ್ಕ"
        badgeEn="DIRECT CITIZEN OUTREACH"
        titleKn={
          <>
            ನಮ್ಮ ಕಚೇರಿಯನ್ನು{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-amber-200 to-red-400">
              ಸಂಪರ್ಕಿಸಿ
            </span>
          </>
        }
        titleEn={
          <>
            Get in Touch with{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-amber-200 to-red-400">
              Our Public Office
            </span>
          </>
        }
        subtitleKn="ಸಾರ್ವಜನಿಕ ಕುಂದುಕೊರತೆ, ಕೃಷಿ ರಫ್ತು ಮಾರ್ಗದರ್ಶನ ಅಥವಾ ಕಚೇರಿ ಭೇಟಿಗಾಗಿ ಶ್ರೀ ಹರ್ಷಾನಂದ ಗುತ್ತೇದಾರ ಅವರ ತಂಡದೊಂದಿಗೆ ನೇರ ಸಂಪರ್ಕದಲ್ಲಿರಿ."
        subtitleEn="Reach out to Shri Harshanand Guttedar's public secretariat for citizen grievances, farmer export advisory, or official meetings."
        breadcrumbLabelKn="ಸಂಪರ್ಕ"
        breadcrumbLabelEn="Contact"
        icon={Phone}
      />

      {/* =========================================================
          SECTION 1: INTERACTIVE MAP & 3 CONTACT CARDS (Screenshot 1 Match)
          ========================================================= */}
      <section className="py-12 sm:py-16 bg-[#f8f9fa] border-b border-slate-200" aria-label="Locations and Direct Channels">
        <div className="w-full px-5 sm:px-8 md:px-10 lg:px-12 xl:px-16 2xl:px-20 max-w-7xl mx-auto space-y-10 sm:space-y-12">
          
          {/* Top Embedded Regional Map Mockup / Frame */}
          <div className="relative w-full rounded-3xl overflow-hidden shadow-xl border border-slate-200 bg-slate-100">
            <div className="w-full h-72 sm:h-96 relative">
              <iframe
                title="Aland and Kalaburagi Regional Office Location"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d121768.65345710645!2d76.50570395!3d17.3297372!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bc88319f36f6631%3A0x8e8aa0631f4762cf!2sKalaburagi%2C%20Karnataka!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
                className="w-full h-full border-0 filter contrast-105"
                loading="lazy"
              />
              <div className="absolute top-4 left-4 z-10 px-4 py-2 rounded-xl bg-white/95 backdrop-blur-md border border-slate-200 shadow-md flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-[#b91c1c] animate-pulse" />
                <span className="text-xs font-bold text-slate-800">
                  {language === "kn" ? "ಕಲಬುರಗಿ & ಆಳಂದ ಜನಸಂಪರ್ಕ ಕಚೇರಿ" : "Kalaburagi & Aland Constituency Secretariat"}
                </span>
              </div>
            </div>
          </div>

          {/* 3 Contact Cards (Exact Red Rounded Square Icon & Layout from Screenshot 1) */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            {/* Card 1: Phone */}
            <div className="rounded-2xl p-6 sm:p-8 bg-white border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
              <div className="w-12 h-12 rounded-xl bg-[#b91c1c] text-white flex items-center justify-center mb-6 shadow-md shadow-red-900/20">
                <Phone className="w-5 h-5" />
              </div>
              <div className="text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-2">
                {language === "kn" ? "ದೂರವಾಣಿ ಸಂಖ್ಯೆ" : "PHONE NUMBER"}
              </div>
              <div className="space-y-1 text-sm sm:text-base font-bold text-slate-900">
                <div>+91 8472 250148 <span className="text-xs font-normal text-slate-500">(Office Helpline)</span></div>
                <div>+91 8472 250149 <span className="text-xs font-normal text-slate-500">(Farmer Grievance)</span></div>
              </div>
            </div>

            {/* Card 2: Email */}
            <div className="rounded-2xl p-6 sm:p-8 bg-white border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
              <div className="w-12 h-12 rounded-xl bg-[#b91c1c] text-white flex items-center justify-center mb-6 shadow-md shadow-red-900/20">
                <Mail className="w-5 h-5" />
              </div>
              <div className="text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-2">
                {language === "kn" ? "ಇಮೇಲ್ ವಿಳಾಸ" : "EMAIL ADDRESS"}
              </div>
              <div className="space-y-1 text-sm sm:text-base font-bold text-slate-900">
                <div>connect@harshanand.org</div>
                <div>grievance@harshanand.org</div>
              </div>
            </div>

            {/* Card 3: Address */}
            <div className="rounded-2xl p-6 sm:p-8 bg-white border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
              <div className="w-12 h-12 rounded-xl bg-[#b91c1c] text-white flex items-center justify-center mb-6 shadow-md shadow-red-900/20">
                <MapPin className="w-5 h-5" />
              </div>
              <div className="text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-2">
                {language === "kn" ? "ಕಚೇರಿ ವಿಳಾಸ" : "OFFICE ADDRESS"}
              </div>
              <div className="text-sm sm:text-base font-bold text-slate-900 leading-snug">
                {language === "kn" 
                  ? "ಶ್ರೀ ಹರ್ಷಾನಂದ ಗುತ್ತೇದಾರ ಜನಸಂಪರ್ಕ ಕಾರ್ಯಾಲಯ, ಮುಖ್ಯ ರಸ್ತೆ, ಆಳಂದ / ಕಲಬುರಗಿ, ಕರ್ನಾಟಕ 585302"
                  : "Shri Harshanand Guttedar Secretariat, Main Road, Aland / Kalaburagi, Karnataka 585302"}
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* =========================================================
          SECTION 2: HAVE QUESTIONS? CONTACT US TODAY (Screenshot 2 Match)
          Leader Speech Photo on Left | Contact Form on Right
          ========================================================= */}
      <section className="py-14 sm:py-20 lg:py-24 bg-white" aria-label="Send a Direct Message Form">
        <div className="w-full px-5 sm:px-8 md:px-10 lg:px-12 xl:px-16 2xl:px-20 max-w-7xl mx-auto">
          
          <div className="max-w-2xl mb-10 sm:mb-14">
            <span className="text-xs sm:text-sm font-bold tracking-widest text-slate-800 uppercase flex items-center gap-1.5 mb-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#b91c1c]" />
              {language === "kn" ? "ಸಂದೇಶ ಕಳುಹಿಸಿ" : "GET IN TOUCH"}
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">
              {language === "kn" ? "ಪ್ರಶ್ನೆಗಳಿವೆಯೇ? ಇಂದೇ ಸಂಪರ್ಕಿಸಿ" : "Have Questions? Contact Us Today"}
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
            
            {/* LEFT: Leader Addressing Public Photo (Exact Reference Screenshot 2) */}
            <div className="lg:col-span-5">
              <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-slate-200 bg-slate-100 group">
                <ImagePlaceholder
                  label={
                    language === "kn"
                      ? "ಶ್ರೀ ಹರ್ಷಾನಂದ ಗುತ್ತೇದಾರ ಸಾರ್ವಜನಿಕರೊಂದಿಗೆ ಸಂವಾದ"
                      : "Shri Harshanand Guttedar addressing citizens at town hall"
                  }
                  height="h-[380px] sm:h-[460px] lg:h-[520px]"
                  className="rounded-none border-none bg-slate-50 group-hover:scale-105 transition-transform duration-500"
                />

                <div className="absolute bottom-4 left-4 right-4 p-4 rounded-2xl bg-black/75 backdrop-blur-md text-white border border-white/20">
                  <div className="text-sm font-bold tracking-tight">
                    {language === "kn" ? "24/7 ನಾಗರಿಕ ಸಹಾಯವಾಣಿ ಕಾರ್ಯಾಚರಣೆ" : "Active Citizen Response Desk"}
                  </div>
                  <div className="text-xs text-amber-300 font-medium mt-0.5">
                    {language === "kn" ? "ಪ್ರತಿ ಅರ್ಜಿಗೆ ಅಧಿಕೃತ ಸ್ವೀಕೃತಿ ಮತ್ತು ಪರಿಹಾರ" : "Official tracking and grievance redressal"}
                  </div>
                </div>
              </div>
            </div>

            {/* RIGHT: Clean Contact Form (Exact Reference Screenshot 2) */}
            <div className="lg:col-span-7">
              <div className="rounded-3xl p-7 sm:p-10 border border-slate-200/90 bg-white shadow-xl">
                
                {submitted ? (
                  <div className="py-14 text-center space-y-4">
                    <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-sm">
                      <CheckCircle2 className="w-8 h-8" />
                    </div>
                    <h3 className="text-2xl font-extrabold text-slate-900">
                      {language === "kn" ? "ನಿಮ್ಮ ಸಂದೇಶವನ್ನು ಸ್ವೀಕರಿಸಲಾಗಿದೆ!" : "Message Received Successfully!"}
                    </h3>
                    <p className="text-slate-600 text-sm max-w-sm mx-auto">
                      {language === "kn"
                        ? "ನಮ್ಮ ಜನಸಂಪರ್ಕ ಕಚೇರಿಯು ನಿಮ್ಮ ಕೋರಿಕೆಯನ್ನು ಪರಿಶೀಲಿಸಿ ಶೀಘ್ರದಲ್ಲೇ ಪ್ರತಿಕ್ರಿಯಿಸಲಿದೆ."
                        : "Our secretariat has received your query and will get back to you shortly."}
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">
                    
                    {/* Row 1: Name & Email */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-[11px] font-bold text-slate-600 uppercase tracking-wider mb-1.5">
                          {language === "kn" ? "ಹೆಸರು **" : "NAME **"}
                        </label>
                        <input
                          type="text"
                          required
                          placeholder={language === "kn" ? "ನಿಮ್ಮ ಹೆಸರು" : "Mark Sullivan"}
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-red-600 transition-all"
                        />
                      </div>

                      <div>
                        <label className="block text-[11px] font-bold text-slate-600 uppercase tracking-wider mb-1.5">
                          {language === "kn" ? "ಇಮೇಲ್ **" : "BUSINESS EMAIL **"}
                        </label>
                        <input
                          type="email"
                          required
                          placeholder="your.email@example.com"
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-red-600 transition-all"
                        />
                      </div>
                    </div>

                    {/* Row 2: Phone & Location */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-[11px] font-bold text-slate-600 uppercase tracking-wider mb-1.5">
                          {language === "kn" ? "ದೂರವಾಣಿ ಸಂಖ್ಯೆ **" : "PHONE NUMBER **"}
                        </label>
                        <input
                          type="tel"
                          required
                          placeholder="+91 98765 43210"
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-red-600 transition-all"
                        />
                      </div>

                      <div>
                        <label className="block text-[11px] font-bold text-slate-600 uppercase tracking-wider mb-1.5">
                          {language === "kn" ? "ಸ್ಥಳ / ತಾಲೂಕು **" : "LOCATION **"}
                        </label>
                        <select
                          value={formData.location}
                          onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                          className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-red-600 transition-all"
                        >
                          <option value="Aland">Aland / ಆಳಂದ</option>
                          <option value="Kalaburagi City">Kalaburagi City / ಕಲಬುರಗಿ ನಗರ</option>
                          <option value="Kalaburagi Rural">Kalaburagi Rural / ಕಲಬುರಗಿ ಗ್ರಾಮೀಣ</option>
                          <option value="Afzalpur">Afzalpur / ಅಫ್ಜಲ್‌ಪುರ</option>
                          <option value="Sedam">Sedam / ಸೇಡಂ</option>
                          <option value="Chincholi">Chincholi / ಚಿಂಚೋಳಿ</option>
                          <option value="Other">Other / ಇತರೆ</option>
                        </select>
                      </div>
                    </div>

                    {/* Message Box */}
                    <div>
                      <label className="block text-[11px] font-bold text-slate-600 uppercase tracking-wider mb-1.5">
                        {language === "kn" ? "ನಿಮ್ಮ ಸಂದೇಶ ಅಥವಾ ಸಮಸ್ಯೆ **" : "MESSAGE **"}
                      </label>
                      <textarea
                        rows={4}
                        required
                        placeholder={
                          language === "kn"
                            ? "ನಿಮ್ಮ ಕುಂದುಕೊರತೆ ಅಥವಾ ವಿಚಾರಣೆಯನ್ನು ಇಲ್ಲಿ ದಾಖಲಿಸಿ..."
                            : "Enter your message or grievance details..."
                        }
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-red-600 transition-all resize-none"
                      />
                    </div>

                    {/* Submit Button (Exact Red Pill from Screenshot 2) */}
                    <div className="pt-2">
                      <button
                        type="submit"
                        className="inline-flex items-center justify-between w-full sm:w-auto gap-4 px-8 py-3.5 rounded-full bg-[#b91c1c] hover:bg-[#991b1b] text-white font-bold text-sm transition-all shadow-md active:scale-95 cursor-pointer"
                      >
                        <span>{language === "kn" ? "ಸಂದೇಶ ಕಳುಹಿಸಿ" : "Send Message"}</span>
                        <span className="w-6 h-6 rounded-full bg-white flex items-center justify-center text-[#b91c1c]">
                          <ArrowRight className="w-3.5 h-3.5" />
                        </span>
                      </button>
                    </div>

                  </form>
                )}

              </div>
            </div>

          </div>

        </div>
      </section>

      <Footer />
    </main>
  );
}

