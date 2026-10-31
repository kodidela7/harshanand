"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useLanguage } from "@/context/LanguageContext";
import { 
  ArrowLeft, 
  CheckCircle2, 
  User, 
  Phone, 
  Mail, 
  MapPin, 
  Send, 
  Sparkles, 
  ShieldCheck, 
  Calendar,
  Building,
  HeartHandshake,
  Check,
  Award
} from "lucide-react";

export default function MembershipPage() {
  const { language, setLanguage } = useLanguage();
  const router = useRouter();

  const [formData, setFormData] = useState({
    full_name: "",
    mobile: "",
    email: "",
    age: "",
    village: "",
    taluk: "Aland",
    district: "Kalaburagi",
    pincode: "585302",
    interest: "Public Service Activities",
    suggestion: "",
    consent_info_correct: true,
    consent_contact: true,
  });

  const [submitting, setSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [successData, setSuccessData] = useState<{ membershipId: string; name: string } | null>(null);

  const interestOptions = [
    {
      id: "Public Service Activities",
      kn: "ಜನಸೇವಾ ಚಟುವಟಿಕೆಗಳು",
      en: "Public Service Activities",
    },
    {
      id: "Local Issues and Suggestions",
      kn: "ಸ್ಥಳೀಯ ಸಮಸ್ಯೆಗಳು ಮತ್ತು ಸಲಹೆಗಳು",
      en: "Local Issues and Suggestions",
    },
    {
      id: "Youth Programs",
      kn: "ಯುವಜನರ ಕಾರ್ಯಕ್ರಮಗಳು",
      en: "Youth Programs",
    },
    {
      id: "Education and Employment-related Activities",
      kn: "ಶಿಕ್ಷಣ ಮತ್ತು ಉದ್ಯೋಗ ಸಂಬಂಧಿತ ಚಟುವಟಿಕೆಗಳು",
      en: "Education and Employment Activities",
    },
    {
      id: "Village / Ward-level Coordinator",
      kn: "ಗ್ರಾಮ ಅಥವಾ ವಾರ್ಡ್ ಮಟ್ಟದಲ್ಲಿನ ಕಾರ್ಯಕರ್ತ",
      en: "Village / Ward-level Coordinator",
    },
    {
      id: "Volunteer",
      kn: "ಪೂರ್ಣಪ್ರಮಾಣದ ಸ್ವಯಂಸೇವಕ",
      en: "Full-time Volunteer",
    },
    {
      id: "Other",
      kn: "ಇತರೆ",
      en: "Other Initiatives",
    },
  ];

  const talukOptions = [
    { id: "Aland", kn: "ಆಳಂದ (Aland)", en: "Aland" },
    { id: "Kalaburagi", kn: "ಕಲಬುರಗಿ (Kalaburagi)", en: "Kalaburagi" },
    { id: "Afzalpur", kn: "ಅಫಜಲಪುರ (Afzalpur)", en: "Afzalpur" },
    { id: "Chincholi", kn: "ಚಿಂಚೋಳಿ (Chincholi)", en: "Chincholi" },
    { id: "Chittapur", kn: "ಚಿತ್ತಾಪುರ (Chittapur)", en: "Chittapur" },
    { id: "Jevargi", kn: "ಜೇವರ್ಗಿ (Jevargi)", en: "Jevargi" },
    { id: "Sedam", kn: "ಸೇಡಂ (Sedam)", en: "Sedam" },
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");

    if (!formData.full_name.trim()) {
      setErrorMsg(language === "kn" ? "ದಯವಿಟ್ಟು ನಿಮ್ಮ ಪೂರ್ಣ ಹೆಸರನ್ನು ನಮೂದಿಸಿ." : "Please enter your full name.");
      return;
    }

    const cleanMobile = formData.mobile.replace(/\D/g, "");
    if (cleanMobile.length !== 10) {
      setErrorMsg(language === "kn" ? "ದಯವಿಟ್ಟು 10 ಅಂಕಿಗಳ ಮಾನ್ಯ ಮೊಬೈಲ್ ಸಂಖ್ಯೆಯನ್ನು ನಮೂದಿಸಿ." : "Please enter a valid 10-digit mobile number.");
      return;
    }

    if (!formData.village.trim() || !formData.pincode.trim()) {
      setErrorMsg(language === "kn" ? "ದಯವಿಟ್ಟು ಗ್ರಾಮ ಮತ್ತು ಪಿನ್‌ಕೋಡ್ ನಮೂದಿಸಿ." : "Please provide your village and pincode.");
      return;
    }

    if (!formData.consent_info_correct || !formData.consent_contact) {
      setErrorMsg(language === "kn" ? "ಮುಂದುವರಿಯಲು ದಯವಿಟ್ಟು ಎರಡೂ ಒಪ್ಪಿಗೆ ಬಾಕ್ಸ್‌ಗಳನ್ನು ಆಯ್ಕೆ ಮಾಡಿ." : "Please agree to both consent declarations.");
      return;
    }

    setSubmitting(true);
    try {
      const res = await fetch("/api/membership/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          mobile: cleanMobile,
        }),
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.message || "Failed to submit membership registration.");
      }

      setSuccessData({
        membershipId: data.membership_id,
        name: formData.full_name,
      });
    } catch (err: any) {
      setErrorMsg(err.message || "Failed to submit registration.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div 
      style={{
        fontFamily: language === "kn" ? "'Anek Kannada', sans-serif" : "'Inter', system-ui, sans-serif"
      }}
      className="min-h-screen w-full bg-[#f8fafc] text-slate-800 flex flex-col justify-between"
    >
      
      {/* Top Header Navigation */}
      <header className="bg-white border-b border-slate-200 px-4 sm:px-8 py-3.5 flex items-center justify-between sticky top-0 z-30 shadow-2xs">
        <div className="flex items-center gap-3">
          <Link
            href="/"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-xs font-semibold text-slate-700 transition-all cursor-pointer shadow-2xs"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>{language === "kn" ? "ಮುಖಪುಟ" : "Home"}</span>
          </Link>

          <div className="hidden sm:flex items-center gap-2 border-l border-slate-200 pl-3">
            <span className="font-extrabold text-slate-900 text-sm tracking-tight">
              {language === "kn" ? "ಹರ್ಷಾನಂದ ಗುತ್ತೇದಾರ" : "Harshanand Guttedar"}
            </span>
            <span className="text-[11px] text-slate-400 font-medium uppercase">
              • {language === "kn" ? "ಅಧಿಕೃತ ಸದಸ್ಯತ್ವ" : "Citizen Membership"}
            </span>
          </div>
        </div>

        {/* Right Actions: Kannada/English Switcher + Portal Login link */}
        <div className="flex items-center gap-3">
          <div className="flex items-center p-0.5 rounded-full border border-slate-200 bg-slate-50">
            <button
              type="button"
              onClick={() => setLanguage("kn")}
              className={`px-3 py-1 rounded-full text-xs font-bold transition-all cursor-pointer ${
                language === "kn" ? "bg-amber-400 text-slate-900 shadow-2xs" : "text-slate-500 hover:text-slate-900"
              }`}
            >
              ಕನ್ನಡ
            </button>
            <button
              type="button"
              onClick={() => setLanguage("en")}
              className={`px-3 py-1 rounded-full text-xs font-bold transition-all cursor-pointer ${
                language === "en" ? "bg-amber-400 text-slate-900 shadow-2xs" : "text-slate-500 hover:text-slate-900"
              }`}
            >
              English
            </button>
          </div>

          <Link
            href="/login"
            className="px-3 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold transition-all shadow-2xs"
          >
            {language === "kn" ? "ಪೋರ್ಟಲ್ ಲಾಗಿನ್" : "Portal Login"}
          </Link>
        </div>
      </header>


      {/* Main Content Area */}
      <main className="flex-1 py-8 sm:py-12 px-4 sm:px-6 max-w-4xl mx-auto w-full">
        
        {/* SUCCESS VIEW */}
        {successData ? (
          <div className="bg-white rounded-3xl border border-slate-200 shadow-xl p-6 sm:p-10 text-center space-y-6 animate-in fade-in zoom-in-95 duration-300">
            <div className="w-16 h-16 rounded-2xl bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-inner">
              <CheckCircle2 className="w-9 h-9" />
            </div>

            <div className="space-y-2">
              <span className="px-3 py-1 rounded-full text-xs font-bold bg-amber-100 text-amber-800 uppercase tracking-wider">
                {language === "kn" ? "ಸದಸ್ಯತ್ವ ನೋಂದಣಿ ಯಶಸ್ವಿಯಾಗಿದೆ" : "Membership Confirmed"}
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                {language === "kn" ? "ಧನ್ಯವಾದಗಳು, " : "Welcome to the Family, "}
                <span className="text-blue-600">{successData.name}</span>!
              </h2>
              <p className="text-sm text-slate-500 max-w-lg mx-auto">
                {language === "kn" 
                  ? "ನಿಮ್ಮ ಸದಸ್ಯತ್ವದ ಅರ್ಜಿಯನ್ನು ಯಶಸ್ವಿಯಾಗಿ ದಾಖಲಿಸಲಾಗಿದೆ. ನಿಮ್ಮ ಅಧಿಕೃತ ಡಿಜಿಟಲ್ ಸದಸ್ಯತ್ವ ಸಂಖ್ಯೆ ಕೆಳಗಿದೆ:"
                  : "Your official citizen membership has been successfully registered in our central database. Here is your Membership ID:"}
              </p>
            </div>

            {/* Official Membership Badge Card with Background Photo */}
            <div className="max-w-md mx-auto p-6 rounded-2xl text-white shadow-2xl border border-amber-400/40 text-left space-y-4 relative overflow-hidden">
              {/* Background Photo Layer */}
              <div className="absolute inset-0 z-0">
                <img
                  src="/images/hero.jpg"
                  alt="Membership Card Background"
                  className="w-full h-full object-cover object-center opacity-20 filter contrast-125"
                />
                <div className="absolute inset-0 bg-gradient-to-br from-slate-950/90 via-indigo-950/85 to-slate-950/95" />
              </div>

              {/* Watermark Logo */}
              <div className="absolute bottom-2 right-4 text-7xl font-black text-white/5 pointer-events-none select-none z-0">
                ಹ
              </div>

              <div className="relative z-10 space-y-4">
                <div className="flex items-center justify-between border-b border-white/10 pb-3">
                  <div>
                    <span className="text-[10px] text-amber-300 font-bold uppercase tracking-wider block">
                      {language === "kn" ? "ಅಧಿಕೃತ ಸದಸ್ಯತ್ವ ಗುರುತಿನ ಚೀಟಿ" : "Official Digital Membership"}
                    </span>
                    <span className="text-xs text-white/80">
                      Harshanand Guttedar Citizen Platform
                    </span>
                  </div>
                  <Award className="w-6 h-6 text-amber-400 shrink-0" />
                </div>

                <div className="space-y-1">
                  <span className="text-[11px] text-slate-300">
                    {language === "kn" ? "ಸದಸ್ಯತ್ವ ಸಂಖ್ಯೆ (Membership ID)" : "Membership ID"}
                  </span>
                  <p className="text-xl font-black font-mono tracking-wider text-amber-400">
                    {successData.membershipId}
                  </p>
                </div>

                <div className="pt-2 flex items-center justify-between text-[11px] text-slate-300 border-t border-white/10">
                  <span>Status: <strong className="text-emerald-400">Active Member</strong></span>
                  <span>Year: 2026</span>
                </div>
              </div>
            </div>

            <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
              <Link
                href="/login"
                className="w-full sm:w-auto px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold transition-all shadow-md text-center"
              >
                {language === "kn" ? "ನಾಗರಿಕ ಪೋರ್ಟಲ್‌ನಲ್ಲಿ ಸದಸ್ಯತ್ವ ಕಾರ್ಡ್ ವೀಕ್ಷಿಸಿ" : "View Membership Card in Portal"}
              </Link>
              <Link
                href="/"
                className="w-full sm:w-auto px-6 py-3 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 text-xs font-bold transition-all text-center"
              >
                {language === "kn" ? "ಮುಖಪುಟಕ್ಕೆ ಹಿಂತಿರುಗಿ" : "Back to Home"}
              </Link>
            </div>
          </div>
        ) : (
          /* REGISTRATION FORM VIEW */
          <div className="bg-white rounded-3xl border border-slate-200 shadow-xl overflow-hidden">
            
            {/* Top Form Banner: Kannada Flag Colors Background (Yellow & Red) + Circular Person Photo */}
            <div 
              style={{
                background: "linear-gradient(135deg, #f59e0b 0%, #fbbf24 35%, #e11d48 70%, #b91c1c 100%)",
              }}
              className="p-6 sm:p-8 text-white relative overflow-hidden shadow-md"
            >
              {/* Subtle top flag accent line */}
              <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-amber-200 via-amber-300 to-red-400" />
              
              <div className="flex flex-col sm:flex-row items-center sm:items-start gap-5 sm:gap-6 relative z-10">
                {/* Person Photo in Circular */}
                <div className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-full border-3 border-white shadow-2xl overflow-hidden shrink-0 bg-white ring-4 ring-amber-300/70">
                  <img
                    src="/images/hero.jpg"
                    alt="ಶ್ರೀ ಹರ್ಷಾನಂದ ಗುತ್ತೇದಾರ"
                    className="w-full h-full object-cover object-top"
                  />
                  <div className="absolute inset-0 rounded-full ring-1 ring-inset ring-black/10" />
                </div>

                {/* Banner Text Content */}
                <div className="space-y-2 text-center sm:text-left flex-1 min-w-0">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-black/25 backdrop-blur-md border border-white/30 text-amber-100 text-xs font-bold shadow-xs">
                    <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                    <span>
                      {language === "kn" ? "ಸದಸ್ಯತ್ವ ನೋಂದಣಿ ಫಾರ್ಮ್" : "Membership Registration Form"}
                    </span>
                  </div>

                  <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-white drop-shadow-sm">
                    {language === "kn" ? "ನಮ್ಮೊಂದಿಗೆ ಕೈಜೋಡಿಸಿ" : "Join Hands with Us"}
                  </h1>

                  {/* Slogan requested by user */}
                  <p className="text-xs sm:text-sm text-amber-50 font-semibold tracking-wide drop-shadow-xs">
                    {language === "kn"
                      ? "ನಿಮ್ಮ ಪಾಲ್ಗೊಳ್ಳುವಿಕೆ • ನಮ್ಮ ಸಂಕಲ್ಪ • ಆಳಂದದ ಪ್ರಗತಿ"
                      : "Your Participation • Our Resolve • Aland's Progress"}
                  </p>
                </div>
              </div>
            </div>

            {/* Error Banner */}
            {errorMsg && (
              <div className="m-6 p-4 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs font-semibold flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 shrink-0 text-red-500" />
                <span>{errorMsg}</span>
              </div>
            )}

            {/* Form Fields */}
            <form onSubmit={handleSubmit} className="p-6 sm:p-8 space-y-6">
              
              {/* SECTION 1: PERSONAL DETAILS */}
              <div className="space-y-4">
                <h2 className="text-xs font-extrabold uppercase tracking-wider text-slate-400 border-b border-slate-100 pb-2 flex items-center gap-2">
                  <User className="w-3.5 h-3.5 text-blue-600" />
                  <span>{language === "kn" ? "ವೈಯಕ್ತಿಕ ವಿವರಗಳು" : "Personal Information"}</span>
                </h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Full Name */}
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-700 block">
                      {language === "kn" ? "ಪೂರ್ಣ ಹೆಸರು" : "Full Name"} <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      placeholder={language === "kn" ? "ನಿಮ್ಮ ಪೂರ್ಣ ಹೆಸರು ನಮೂದಿಸಿ" : "Enter your full name"}
                      value={formData.full_name}
                      onChange={(e) => setFormData({ ...formData, full_name: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-white text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 shadow-2xs"
                    />
                  </div>

                  {/* Mobile Number */}
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-700 block">
                      {language === "kn" ? "ಮೊಬೈಲ್ ಸಂಖ್ಯೆ" : "Mobile Number"} <span className="text-red-500">*</span>
                    </label>
                    <div className="relative flex items-center">
                      <span className="absolute left-3 text-xs font-bold text-slate-500">+91</span>
                      <input
                        type="tel"
                        maxLength={10}
                        required
                        placeholder="9845012345"
                        value={formData.mobile}
                        onChange={(e) => setFormData({ ...formData, mobile: e.target.value })}
                        className="w-full pl-11 pr-3.5 py-2.5 rounded-xl border border-slate-200 bg-white text-xs text-slate-800 font-mono font-medium focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 shadow-2xs"
                      />
                    </div>
                  </div>

                  {/* Email Address */}
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-700 block">
                      {language === "kn" ? "ಇಮೇಲ್ ವಿಳಾಸ (ಐಚ್ಛಿಕ)" : "Email Address (Optional)"}
                    </label>
                    <input
                      type="email"
                      placeholder="example@mail.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-white text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 shadow-2xs"
                    />
                  </div>

                  {/* Age */}
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-700 block">
                      {language === "kn" ? "ವಯಸ್ಸು" : "Age"}
                    </label>
                    <input
                      type="number"
                      min={16}
                      max={110}
                      placeholder="28"
                      value={formData.age}
                      onChange={(e) => setFormData({ ...formData, age: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-white text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 shadow-2xs"
                    />
                  </div>
                </div>
              </div>


              {/* SECTION 2: REGIONAL RESIDENCE */}
              <div className="space-y-4">
                <h2 className="text-xs font-extrabold uppercase tracking-wider text-slate-400 border-b border-slate-100 pb-2 flex items-center gap-2">
                  <MapPin className="w-3.5 h-3.5 text-blue-600" />
                  <span>{language === "kn" ? "ಸ್ಥಳೀಯ ವಿಳಾಸ ಮತ್ತು ಪ್ರದೇಶ" : "Location & Address"}</span>
                </h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  {/* Village */}
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-700 block">
                      {language === "kn" ? "ಗ್ರಾಮ / ವಾರ್ಡ್" : "Village / Ward"} <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      placeholder={language === "kn" ? "ಗ್ರಾಮದ ಹೆಸರು" : "e.g. Nimbal / Aland"}
                      value={formData.village}
                      onChange={(e) => setFormData({ ...formData, village: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-white text-xs text-slate-800 focus:outline-none focus:border-blue-500 shadow-2xs"
                    />
                  </div>

                  {/* Taluk */}
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-700 block">
                      {language === "kn" ? "ತಾಲೂಕು" : "Taluk"} <span className="text-red-500">*</span>
                    </label>
                    <select
                      value={formData.taluk}
                      onChange={(e) => setFormData({ ...formData, taluk: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-white text-xs text-slate-800 focus:outline-none focus:border-blue-500 shadow-2xs cursor-pointer font-medium"
                    >
                      {talukOptions.map((t) => (
                        <option key={t.id} value={t.id}>
                          {language === "kn" ? t.kn : t.en}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* District */}
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-700 block">
                      {language === "kn" ? "ಜಿಲ್ಲೆ" : "District"} <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.district}
                      onChange={(e) => setFormData({ ...formData, district: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-white text-xs text-slate-800 focus:outline-none focus:border-blue-500 shadow-2xs"
                    />
                  </div>

                  {/* Pincode */}
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-700 block">
                      {language === "kn" ? "ಪಿನ್ ಕೋಡ್" : "Pincode"} <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      maxLength={6}
                      required
                      placeholder="585302"
                      value={formData.pincode}
                      onChange={(e) => setFormData({ ...formData, pincode: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-white text-xs text-slate-800 font-mono focus:outline-none focus:border-blue-500 shadow-2xs"
                    />
                  </div>
                </div>
              </div>


              {/* SECTION 3: HOW WOULD YOU LIKE TO JOIN HANDS? */}
              <div className="space-y-3">
                <label className="text-xs font-extrabold uppercase tracking-wider text-slate-700 block border-b border-slate-100 pb-2">
                  {language === "kn" 
                    ? "ನೀವು ಹೇಗೆ ಕೈಜೋಡಿಸಲು ಬಯಸುತ್ತೀರಿ?" 
                    : "How would you like to join hands?"} <span className="text-red-500">*</span>
                </label>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {interestOptions.map((opt, idx) => {
                    const isSelected = formData.interest === opt.id;
                    return (
                      <label
                        key={opt.id}
                        className={`flex items-start gap-3 p-3 rounded-2xl border transition-all cursor-pointer ${
                          isSelected
                            ? "bg-blue-50/80 border-blue-500 text-blue-900 shadow-xs"
                            : "bg-white border-slate-200/90 text-slate-700 hover:bg-slate-50"
                        }`}
                      >
                        <input
                          type="radio"
                          name="interest"
                          value={opt.id}
                          checked={isSelected}
                          onChange={() => setFormData({ ...formData, interest: opt.id })}
                          className="mt-0.5 w-4 h-4 text-blue-600 focus:ring-blue-500"
                        />
                        <div className="text-xs">
                          <span className="font-bold text-slate-400 mr-1.5">{idx + 1}.</span>
                          <span className="font-semibold">
                            {language === "kn" ? opt.kn : opt.en}
                          </span>
                        </div>
                      </label>
                    );
                  })}
                </div>
              </div>


              {/* SECTION 4: YOUR SUGGESTION */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700 block">
                  {language === "kn" ? "ನಿಮ್ಮ ಸಲಹೆ" : "Your Suggestion"}
                </label>
                <textarea
                  rows={3}
                  placeholder={
                    language === "kn"
                      ? "ಆಳಂದದ ಅಭಿವೃದ್ಧಿ ಅಥವಾ ಸಾರ್ವಜನಿಕ ಕಾಮಗಾರಿಗಳ ಕುರಿತು ನಿಮ್ಮ ಅನಿಸಿಕೆ ಅಥವಾ ಸಲಹೆಯನ್ನು ಇಲ್ಲಿ ಹಂಚಿಕೊಳ್ಳಿ..."
                      : "Share your thoughts or ideas on constituency development, farmer empowerment, or public issues..."
                  }
                  value={formData.suggestion}
                  onChange={(e) => setFormData({ ...formData, suggestion: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-white text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:border-blue-500 shadow-2xs resize-none"
                />
              </div>


              {/* SECTION 5: CONSENT DECLARATIONS */}
              <div className="space-y-2.5 pt-2 border-t border-slate-100">
                <span className="text-[11px] font-extrabold uppercase tracking-wider text-slate-400 block">
                  {language === "kn" ? "ಒಪ್ಪಿಗೆ (Consent)" : "Consent & Declarations"}
                </span>

                {/* Consent 1 */}
                <label className="flex items-start gap-2.5 text-xs text-slate-700 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.consent_info_correct}
                    onChange={(e) => setFormData({ ...formData, consent_info_correct: e.target.checked })}
                    className="mt-0.5 w-4 h-4 text-blue-600 rounded border-slate-300 focus:ring-blue-500"
                  />
                  <span>
                    1. {language === "kn" 
                        ? "ನಾನು ನೀಡಿರುವ ಮಾಹಿತಿಯು ಸರಿಯಾಗಿದೆ." 
                        : "The information provided by me is correct."}
                  </span>
                </label>

                {/* Consent 2 */}
                <label className="flex items-start gap-2.5 text-xs text-slate-700 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.consent_contact}
                    onChange={(e) => setFormData({ ...formData, consent_contact: e.target.checked })}
                    className="mt-0.5 w-4 h-4 text-blue-600 rounded border-slate-300 focus:ring-blue-500"
                  />
                  <span>
                    2. {language === "kn" 
                        ? "ನನ್ನ ನೋಂದಣಿಗೆ ಸಂಬಂಧಿಸಿದಂತೆ ನನ್ನನ್ನು ಸಂಪರ್ಕಿಸಲು ನಾನು ಒಪ್ಪಿಗೆ ನೀಡುತ್ತೇನೆ." 
                        : "I give my consent to be contacted regarding my registration."}
                  </span>
                </label>
              </div>


              {/* SUBMIT BUTTON */}
              <div className="pt-4">
                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full py-3.5 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white font-extrabold text-sm shadow-md transition-all cursor-pointer disabled:opacity-50 flex items-center justify-center gap-2"
                >
                  {submitting ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      <span>{language === "kn" ? "ನೋಂದಣಿ ಪ್ರಕ್ರಿಯೆ ನಡೆಯುತ್ತಿದೆ..." : "Submitting Registration..."}</span>
                    </>
                  ) : (
                    <>
                      <HeartHandshake className="w-4 h-4" />
                      <span>{language === "kn" ? "ಸದಸ್ಯತ್ವ ನೋಂದಣಿ ಪೂರ್ಣಗೊಳಿಸಿ" : "Submit Membership Registration"}</span>
                    </>
                  )}
                </button>
              </div>

            </form>

          </div>
        )}

      </main>

      {/* Clean Footer */}
      <footer className="bg-white border-t border-slate-200 py-4 px-6 text-center text-xs text-slate-400">
        © 2026 Harshanand Guttedar • Aland Constituency Citizen Initiative
      </footer>

    </div>
  );
}

