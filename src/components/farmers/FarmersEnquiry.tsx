"use client";

import React, { useState } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { ArrowUpRight, CheckCircle2 } from "lucide-react";

export default function FarmersEnquiry() {
  const { language } = useLanguage();
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    farmName: "",
    contact: "",
    taluk: "Aland",
    interest: "GI Tur Dal Export Hub",
    notes: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.name && formData.contact) {
      setSubmitted(true);
      setTimeout(() => setSubmitted(false), 5000);
      setFormData({
        name: "",
        farmName: "",
        contact: "",
        taluk: "Aland",
        interest: "GI Tur Dal Export Hub",
        notes: "",
      });
    }
  };

  return (
    <section 
      id="talk-to-us"
      className="relative py-10 sm:py-14 lg:py-16 text-white overflow-hidden"
      style={{
        background: `
          linear-gradient(135deg, 
            rgba(5, 20, 10, 0.96) 0%, 
            rgba(12, 38, 20, 0.94) 30%, 
            rgba(20, 55, 30, 0.92) 60%, 
            rgba(8, 28, 14, 0.98) 100%
          )
        `,
      }}
      aria-label="Farmer Consultation and Enquiry Form"
    >
      {/* Background field texture pattern */}
      <div 
        className="absolute inset-0 opacity-20 pointer-events-none select-none bg-cover bg-center mix-blend-overlay"
        style={{ backgroundImage: "url('/images/hero.jpg')" }}
      />
      <div 
        className="absolute top-0 right-1/4 w-[500px] h-[500px] pointer-events-none select-none"
        style={{
          background: "radial-gradient(circle, rgba(163, 230, 53, 0.15) 0%, transparent 70%)",
        }}
      />

      <div className="w-full px-5 sm:px-8 md:px-10 lg:px-12 xl:px-16 2xl:px-20 max-w-7xl mx-auto relative z-10">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          
          {/* =========================================================
              LEFT COLUMN: Title & Description (Screenshot 1 Match)
              ========================================================= */}
          <div className="lg:col-span-6 space-y-6">
            <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-lime-400">
              <span className="w-2.5 h-2.5 bg-lime-400 rotate-45 shrink-0" />
              <span>{language === "kn" ? "ರೈತ ಸಹಾಯ ಕೇಂದ್ರ / ಸಂಪರ್ಕಿಸಿ" : "TALK TO US"}</span>
            </div>

            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-[52px] font-extrabold text-white tracking-tight leading-[1.15]">
              {language === "kn" ? (
                <>
                  ನಿಮ್ಮ ಜಮೀನು ಮತ್ತು ಬೆಳೆಯ ಮಾಹಿತಿ ನೀಡಿ,{" "}
                  <span className="block mt-1 text-lime-300">ತಜ್ಞರ ರಫ್ತು ಸೌಲಭ್ಯ ಪಡೆಯಿರಿ</span>
                </>
              ) : (
                <>
                  Tell us your acreage{" "}
                  <span className="block mt-1 text-lime-300">and we will tell you the solution</span>
                </>
              )}
            </h2>

            <p className="text-slate-300 text-sm sm:text-base lg:text-lg leading-relaxed max-w-lg font-light">
              {language === "kn"
                ? "ನಿಮ್ಮ ಜಮೀನಿನ ವಿಸ್ತೀರ್ಣ, ಬೆಳೆಯ ವಿವರ ಮತ್ತು ಪ್ರಸ್ತುತ ಕೃಷಿ ಸವಾಲುಗಳನ್ನು ತಿಳಿಸಿ. ನಮ್ಮ ಸಮೀಪದ ಕೃಷಿ ತಜ್ಞರ ತಂಡವು ಮಣ್ಣು ಪರೀಕ್ಷೆ, ನೇರ ಮಂಡಿ ಮತ್ತು ರಫ್ತು ಮಾರ್ಗದರ್ಶನದೊಂದಿಗೆ ಸಂಪರ್ಕಿಸುತ್ತದೆ."
                : "Give us the ground, the crop, and your current farming setup. Our nearest field agronomy team replies with tailored soil, harvest, and direct APEDA export linkage plans."}
            </p>

            <div className="pt-4 flex items-center gap-3 text-xs sm:text-sm text-lime-300/90 font-medium">
              <CheckCircle2 className="w-4 h-4 text-lime-400 shrink-0" />
              <span>
                {language === "kn" 
                  ? "24 ಗಂಟೆಗಳಲ್ಲಿ ತಜ್ಞರ ನೇರ ಸಂಪರ್ಕ & ಉಚಿತ ಸಲಹೆ" 
                  : "Direct expert response within 24 hours"}
              </span>
            </div>
          </div>

          {/* =========================================================
              RIGHT COLUMN: White Rounded Enquiry Form (Screenshot 1 Match)
              ========================================================= */}
          <div className="lg:col-span-6">
            <div className="rounded-3xl p-6 sm:p-10 bg-white text-slate-900 shadow-2xl border border-slate-100">
              
              {submitted ? (
                <div className="py-12 text-center space-y-4">
                  <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-sm">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h3 className="text-2xl font-extrabold text-slate-900">
                    {language === "kn" ? "ವಿವರಗಳನ್ನು ಯಶಸ್ವಿಯಾಗಿ ಕಳುಹಿಸಲಾಗಿದೆ!" : "Enquiry Sent Successfully!"}
                  </h3>
                  <p className="text-slate-600 text-sm max-w-sm mx-auto">
                    {language === "kn"
                      ? "ನಮ್ಮ ಕಲಬುರಗಿ ಕೃಷಿ ತಜ್ಞರ ತಂಡವು ಶೀಘ್ರದಲ್ಲೇ ನಿಮ್ಮನ್ನು ಸಂಪರ್ಕಿಸಿ ಸೂಕ್ತ ಮಾರ್ಗದರ್ಶನ ನೀಡಲಿದೆ."
                      : "Our Kalaburagi agronomy and export team will contact you shortly with customized guidance."}
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">
                  
                  {/* Row 1: Name & Farm Name */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">
                        {language === "kn" ? "ನಿಮ್ಮ ಹೆಸರು / YOUR NAME" : "YOUR NAME"}
                      </label>
                      <input
                        type="text"
                        required
                        placeholder={language === "kn" ? "ಶ್ರೀ ರಮೇಶ್ ಪಾಟೀಲ್" : "Jane Doe"}
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-lime-500 transition-all"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">
                        {language === "kn" ? "ಜಮೀನು / FARM OR BUSINESS" : "FARM OR BUSINESS"}
                      </label>
                      <input
                        type="text"
                        placeholder={language === "kn" ? "ಪಾಟೀಲ್ ಫಾರ್ಮ್ಸ್, ಆಳಂದ" : "Name of your operation"}
                        value={formData.farmName}
                        onChange={(e) => setFormData({ ...formData, farmName: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-lime-500 transition-all"
                      />
                    </div>
                  </div>

                  {/* Row 2: Contact & Taluk */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">
                        {language === "kn" ? "ಮೊಬೈಲ್ ಸಂಖ್ಯೆ / PHONE OR EMAIL" : "PHONE OR EMAIL"}
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="+91 98765 43210"
                        value={formData.contact}
                        onChange={(e) => setFormData({ ...formData, contact: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-lime-500 transition-all"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">
                        {language === "kn" ? "ತಾಲೂಕು / TALUK" : "TALUK"}
                      </label>
                      <select
                        value={formData.taluk}
                        onChange={(e) => setFormData({ ...formData, taluk: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-lime-500 transition-all"
                      >
                        <option value="Aland">Aland / ಆಳಂದ</option>
                        <option value="Kalaburagi">Kalaburagi / ಕಲಬುರಗಿ</option>
                        <option value="Afzalpur">Afzalpur / ಅಫ್ಜಲ್‌ಪುರ</option>
                        <option value="Sedam">Sedam / ಸೇಡಂ</option>
                        <option value="Chincholi">Chincholi / ಚಿಂಚೋಳಿ</option>
                        <option value="Chittapur">Chittapur / ಚಿತ್ತಾಪುರ</option>
                        <option value="Jevargi">Jevargi / ಜೇವರ್ಗಿ</option>
                      </select>
                    </div>
                  </div>

                  {/* Row 3: Service of Interest */}
                  <div>
                    <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">
                      {language === "kn" ? "ಆಸಕ್ತಿಯ ಸೇವೆ / INTERESTED IN" : "INTERESTED IN"}
                    </label>
                    <select
                      value={formData.interest}
                      onChange={(e) => setFormData({ ...formData, interest: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-lime-500 transition-all"
                    >
                      <option value="GI Tur Dal Export Hub">
                        {language === "kn" ? "ತೊಗರಿ ರಫ್ತು ಮಾರ್ಗದರ್ಶನ (GI Tur Dal Export)" : "GI Tur Dal Export Hub"}
                      </option>
                      <option value="Soil Testing & Analysis">
                        {language === "kn" ? "ಉಚಿತ ಮಣ್ಣು ಪರೀಕ್ಷೆ (Soil Testing)" : "Soil Testing & Analysis"}
                      </option>
                      <option value="Seed Selection & Supply">
                        {language === "kn" ? "ಗುಣಮಟ್ಟದ ಬಿತ್ತನೆ ಬೀಜ ಪೂರೈಕೆ (Seed Supply)" : "Seed Selection & Supply"}
                      </option>
                      <option value="Irrigation Management">
                        {language === "kn" ? "ಹನಿ ನೀರಾವರಿ & ಸಬ್ಸಿಡಿ (Drip Irrigation)" : "Irrigation Management"}
                      </option>
                      <option value="FPO Partnership">
                        {language === "kn" ? "ಎಫ್‌ಪಿಒ ರೈತ ಗುಂಪು ಪಾಲುದಾರಿಕೆ (FPO Partnership)" : "FPO Partnership"}
                      </option>
                    </select>
                  </div>

                  {/* Row 4: Acreage & Additional Notes */}
                  <div>
                    <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">
                      {language === "kn" ? "ಜಮೀನಿನ ವಿವರ / ACREAGE & FARM DETAILS" : "ANYTHING ELSE WE SHOULD KNOW"}
                    </label>
                    <textarea
                      rows={3}
                      placeholder={
                        language === "kn"
                          ? "ಜಮೀನಿನ ವಿಸ್ತೀರ್ಣ (ಉದಾ: 5 ಎಕರೆ), ಬೆಳೆಯ ಹೆಸರು, ಪ್ರಸ್ತುತ ಸವಾಲುಗಳು..."
                          : "Acreage, crop, the tractor or irrigation setup you run..."
                      }
                      value={formData.notes}
                      onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-lime-500 transition-all resize-none"
                    />
                  </div>

                  {/* Submit Button (Exact Screenshot 1 Match) */}
                  <div className="pt-2">
                    <button
                      type="submit"
                      className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-[#d4f933] hover:bg-[#c2e822] text-slate-950 font-extrabold text-sm transition-all shadow-md active:scale-95 cursor-pointer"
                    >
                      <span>{language === "kn" ? "ವಿವರ ಕಳುಹಿಸಿ" : "Send enquiry"}</span>
                      <ArrowUpRight className="w-4 h-4" />
                    </button>
                  </div>

                </form>
              )}

            </div>
          </div>

        </div>

      </div>
    </section>
  );
}

