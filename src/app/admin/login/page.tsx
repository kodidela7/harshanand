"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useLanguage } from "@/context/LanguageContext";
import { 
  ArrowLeft, 
  ChevronDown, 
  RefreshCw, 
  CheckCircle2, 
  AlertCircle,
  Lock,
  Volume2,
  Users,
  ShieldCheck,
  Shield
} from "lucide-react";

export default function AdminLoginPage() {
  const { language, setLanguage, t } = useLanguage();
  const router = useRouter();

  // Form State
  const [mobile, setMobile] = useState("");
  const [otpCode, setOtpCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);
  const [devOtp, setDevOtp] = useState<string | null>(null);
  const [countdown, setCountdown] = useState(60);
  const [canResend, setCanResend] = useState(false);
  const [otpRequested, setOtpRequested] = useState(false);
  const [checkingSession, setCheckingSession] = useState(true);

  // Active session check on mount: redirect to dashboard if already logged in as admin, or portal if citizen
  useEffect(() => {
    let isMounted = true;
    async function checkSession() {
      try {
        const res = await fetch("/api/auth/me");
        if (res.ok) {
          const data = await res.json();
          if (data && data.authenticated && data.user) {
            if (data.user.role === "admin") {
              router.replace("/admin/dashboard");
              return;
            } else {
              router.replace("/portal");
              return;
            }
          }
        }
      } catch (err) {
        // Network/session check issue, proceed to show login form
      } finally {
        if (isMounted) {
          setCheckingSession(false);
        }
      }
    }

    checkSession();
    return () => {
      isMounted = false;
    };
  }, [router]);

  // Timer countdown
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (otpRequested && countdown > 0) {
      timer = setInterval(() => {
        setCountdown((prev) => prev - 1);
      }, 1000);
    } else if (countdown === 0) {
      setCanResend(true);
    }
    return () => clearInterval(timer);
  }, [otpRequested, countdown]);

  const formatTimer = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  // 1. Send OTP Request
  const handleSendOtp = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setError(null);
    setSuccessMsg(null);

    const cleanMobile = mobile.replace(/[\s-]/g, "");
    if (!cleanMobile) {
      setError(
        language === "kn"
          ? "ದಯವಿಟ್ಟು ನಿಮ್ಮ ಅಧಿಕೃತ ನಿರ್ವಾಹಕ ಮೊಬೈಲ್ ಸಂಖ್ಯೆಯನ್ನು ನಮೂದಿಸಿ."
          : "Please enter your administrator mobile number."
      );
      setSuccessMsg(null);
      return;
    }

    if (!/^[6-9]\d{9}$/.test(cleanMobile)) {
      setError(
        language === "kn"
          ? "ದಯವಿಟ್ಟು ಸರಿಯಾದ 10-ಅಂಕಿಯ ಮೊಬೈಲ್ ಸಂಖ್ಯೆ ನಮೂದಿಸಿ (ಉದಾ: 9845012345)."
          : "Please enter a valid 10-digit mobile number (e.g. 9845012345)."
      );
      setSuccessMsg(null);
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("/api/auth/send-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ mobile: cleanMobile }),
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(language === "kn" ? data.messageKn || data.message : data.message);
      }

      setDevOtp(data.devOtp || null);
      setOtpRequested(true);
      setCountdown(60);
      setCanResend(false);
      setError(null);
      setSuccessMsg(
        language === "kn"
          ? `+91 ${cleanMobile} ಗೆ ಅಧಿಕೃತ ಒಟಿಪಿ ರವಾನಿಸಲಾಗಿದೆ.`
          : `Admin verification code sent to +91 ${cleanMobile}.`
      );
    } catch (err: any) {
      setSuccessMsg(null);
      setError(err.message || (language === "kn" ? "ಒಟಿಪಿ ಕಳುಹಿಸಲು ವಿಫಲವಾಗಿದೆ." : "Failed to send code."));
    } finally {
      setLoading(false);
    }
  };

  // Auto-fill Dev OTP
  const handleAutoFillDevOtp = () => {
    if (devOtp) {
      setOtpCode(devOtp);
    }
  };

  // 2. Verify OTP & Admin Authorization
  const handleVerifyOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    const cleanMobile = mobile.replace(/[\s-]/g, "");
    if (!cleanMobile) {
      setError(
        language === "kn"
          ? "ದಯವಿಟ್ಟು ಮೊಬೈಲ್ ಸಂಖ್ಯೆಯನ್ನು ನಮೂದಿಸಿ."
          : "Please enter your mobile number."
      );
      setSuccessMsg(null);
      return;
    }

    if (!otpRequested) {
      await handleSendOtp();
      return;
    }

    const cleanOtp = otpCode.trim();
    if (cleanOtp.length < 6) {
      setError(
        language === "kn"
          ? "ದಯವಿಟ್ಟು 6-ಅಂಕಿಯ ದೃಢೀಕರಣ ಕೋಡ್ ನಮೂದಿಸಿ."
          : "Please enter the 6-digit verification code."
      );
      setSuccessMsg(null);
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("/api/auth/verify-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          mobile: cleanMobile,
          otp: cleanOtp,
          preferred_language: language,
          loginType: "admin", // Enforce administrator check
        }),
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(language === "kn" ? data.messageKn || data.message : data.message);
      }

      setError(null);
      setSuccessMsg(
        language === "kn"
          ? "ನಿರ್ವಾಹಕರ ದೃಢೀಕರಣ ಯಶಸ್ವಿಯಾಗಿದೆ! ಅಡ್ಮಿನ್ ಕನ್ಸೋಲ್‌ಗೆ ತೆರಳಲಾಗುತ್ತಿದೆ..."
          : "Admin authentication successful! Accessing console..."
      );

      setTimeout(() => {
        router.push(data.redirectUrl || "/admin/dashboard");
      }, 700);
    } catch (err: any) {
      setSuccessMsg(null);
      setError(err.message || (language === "kn" ? "ಅಡ್ಮಿನ್ ಪ್ರವೇಶ ನಿರಾಕರಿಸಲಾಗಿದೆ." : "Admin login failed."));
    } finally {
      setLoading(false);
    }
  };

  if (checkingSession) {
    return (
      <div className="min-h-screen w-full bg-slate-900 flex flex-col items-center justify-center p-4">
        <div className="flex flex-col items-center gap-3 bg-slate-800/90 border border-slate-700/80 rounded-2xl px-8 py-8 shadow-2xl">
          <RefreshCw className="w-8 h-8 text-amber-400 animate-spin" />
          <p className="text-slate-200 text-sm font-semibold tracking-wide">
            {language === "kn" ? "ಅಧಿವೇಶನ ಪರಿಶೀಲಿಸಲಾಗುತ್ತಿದೆ..." : "Checking active admin session..."}
          </p>
          <span className="text-xs text-slate-400">
            {language === "kn" ? "ದಯವಿಟ್ಟು ನಿರೀಕ್ಷಿಸಿ" : "Please wait a moment"}
          </span>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full bg-white text-slate-800 flex flex-col lg:flex-row font-sans">
      
      {/* =========================================================================
          LEFT SECTION: Visual Showcase (Hidden on Small Screens, Same as User Login)
          ========================================================================= */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-amber-50/90 via-red-50/40 to-blue-50/60 p-12 xl:p-16 flex-col justify-between relative overflow-hidden border-r border-slate-100">
        
        {/* Ambient Decorative Blurs */}
        <div className="absolute top-12 right-12 w-80 h-80 bg-amber-300/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-12 left-12 w-80 h-80 bg-red-300/20 rounded-full blur-3xl pointer-events-none" />

        {/* Brand Header */}
        <div className="relative z-10">
          <Link href="/" className="inline-flex items-center gap-3 group">
            <div className="w-11 h-11 rounded-full bg-gradient-to-br from-amber-400 via-red-500 to-amber-500 p-[2px] shadow-md shadow-amber-500/20">
              <div className="w-full h-full rounded-full bg-slate-950 flex items-center justify-center">
                <span className="font-extrabold text-amber-400 text-xl">ಹ</span>
              </div>
            </div>
            <div>
              <span className="font-bold text-slate-900 text-lg leading-tight block group-hover:text-amber-600 transition-colors">
                {language === "kn" ? "ಹರ್ಷಾನಂದ ಗುತ್ತೇದಾರ" : "Harshanand Guttedar"}
              </span>
              <span className="text-[11px] text-amber-700 font-bold uppercase tracking-wider">
                {language === "kn" ? "ಅಡ್ಮಿನ್ ನಿಯಂತ್ರಣ ಕೊಠಡಿ" : "Admin Control Console"}
              </span>
            </div>
          </Link>
        </div>

        {/* Center Leader Graphic & Floating Badges */}
        <div className="relative z-10 my-auto py-8 flex flex-col items-center">
          
          {/* Floating Widget 1: Direct Helpline */}
          <div className="self-start mb-6 px-4 py-2.5 rounded-2xl bg-white/95 backdrop-blur-md border border-slate-200/80 shadow-lg flex items-center gap-3">
            <div className="w-8 h-8 rounded-xl bg-red-100 text-red-700 flex items-center justify-center">
              <ShieldCheck className="w-4 h-4" />
            </div>
            <div>
              <span className="text-xs font-bold text-slate-900 block">
                {language === "kn" ? "ನಿರ್ವಾಹಕ ಭದ್ರತಾ ಪ್ರೋಟೋಕಾಲ್" : "Admin Security Protocol"}
              </span>
              <span className="text-[11px] text-slate-500 font-medium">
                256-Bit SSL • Anti-Hijack Guard
              </span>
            </div>
          </div>

          {/* Leader Photo */}
          <div className="relative w-72 h-72 rounded-full p-2.5 bg-gradient-to-tr from-amber-400 via-red-500 to-amber-400 shadow-2xl overflow-hidden group">
            <img
              src="/images/hero.jpg"
              alt="Harshanand Guttedar addressing citizens"
              className="w-full h-full object-cover rounded-full group-hover:scale-105 transition-transform duration-500"
            />
          </div>

          {/* Floating Widget 2: Citizen Reach Stat */}
          <div className="self-end -mt-6 px-4 py-2.5 rounded-2xl bg-white/95 backdrop-blur-md border border-slate-200/80 shadow-lg flex items-center gap-3">
            <div className="flex -space-x-2">
              <div className="w-7 h-7 rounded-full bg-amber-400 text-slate-900 font-bold text-[10px] flex items-center justify-center border-2 border-white">ಅ</div>
              <div className="w-7 h-7 rounded-full bg-red-500 text-white font-bold text-[10px] flex items-center justify-center border-2 border-white">ಕ</div>
              <div className="w-7 h-7 rounded-full bg-emerald-500 text-white font-bold text-[10px] flex items-center justify-center border-2 border-white">ರ</div>
            </div>
            <div className="pl-1">
              <span className="text-xs font-black text-slate-900 block leading-tight">50,000+</span>
              <span className="text-[10px] text-slate-500 font-medium">
                {language === "kn" ? "ಸಂಪರ್ಕಿತ ನಾಗರಿಕರು" : "Connected Citizens"}
              </span>
            </div>
          </div>

        </div>

        {/* Bottom Feature Checklist */}
        <div className="relative z-10 p-4 rounded-2xl bg-white/80 backdrop-blur-md border border-slate-200/70 shadow-sm space-y-2">
          <div className="flex items-center gap-2.5 text-xs text-slate-700 font-medium">
            <span className="w-4 h-4 rounded-full bg-red-100 text-red-600 flex items-center justify-center text-[10px] shrink-0 font-bold">✓</span>
            <span>{language === "kn" ? "ನಾಗರಿಕರ ಲೈವ್ ಚಟುವಟಿಕೆಗಳ ಆಡಿಟ್ ಟ್ರಯಲ್" : "Live User Activity & Audit Trail"}</span>
          </div>
          <div className="flex items-center gap-2.5 text-xs text-slate-700 font-medium">
            <span className="w-4 h-4 rounded-full bg-amber-100 text-amber-600 flex items-center justify-center text-[10px] shrink-0 font-bold">✓</span>
            <span>{language === "kn" ? "ಕುಂದುಕೊರತೆ ಅರ್ಜಿಗಳ ಕೇಂದ್ರೀಕೃತ ಪರಿಶೀಲನೆ" : "Centralized Grievance Management"}</span>
          </div>
          <div className="flex items-center gap-2.5 text-xs text-slate-700 font-medium">
            <span className="w-4 h-4 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center text-[10px] shrink-0 font-bold">✓</span>
            <span>{language === "kn" ? "ಅಧಿಕೃತ ಸಿಬ್ಬಂದಿ ಮೊಬೈಲ್ ಸಂಖ್ಯೆಗಳಿಗೆ ಮಾತ್ರ ಪ್ರವೇಶ" : "Restricted to Authorized Admin Mobiles"}</span>
          </div>
        </div>

      </div>


      {/* =========================================================================
          RIGHT SECTION: Form Area (Matching User Login UI Exactly)
          ========================================================================= */}
      <div className="w-full lg:w-1/2 flex flex-col justify-between px-6 sm:px-12 md:px-16 lg:px-16 xl:px-24 py-8 sm:py-12 min-h-screen bg-white">
        
        {/* Top Bar: Back to Home + Segmented Language Switcher */}
        <div className="flex items-center justify-between mb-8 sm:mb-12">
          <Link
            href="/"
            className="flex items-center gap-2 text-xs sm:text-sm font-semibold text-slate-500 hover:text-slate-900 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>{language === "kn" ? "ಮುಖಪುಟ" : "Home"}</span>
          </Link>

          {/* Segmented Dual Language Switcher */}
          <div className="flex items-center p-0.5 rounded-full border border-slate-200 bg-slate-100 shadow-sm">
            <button
              type="button"
              onClick={() => setLanguage("kn")}
              className={`px-3 py-1 rounded-full text-xs font-bold transition-all cursor-pointer ${
                language === "kn"
                  ? "bg-amber-400 text-slate-950 shadow-sm font-extrabold"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              ಕನ್ನಡ
            </button>
            <button
              type="button"
              onClick={() => setLanguage("en")}
              className={`px-3 py-1 rounded-full text-xs font-bold transition-all cursor-pointer ${
                language === "en"
                  ? "bg-amber-400 text-slate-950 shadow-sm font-extrabold"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              English
            </button>
          </div>
        </div>

        {/* Center Main Form */}
        <div className="my-auto max-w-md w-full mx-auto">
          
          {/* Mobile-only brand badge (visible when left showcase is hidden) */}
          <div className="lg:hidden flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-amber-400 via-red-500 to-amber-500 p-[2px] shadow-md">
              <div className="w-full h-full rounded-full bg-slate-950 flex items-center justify-center">
                <span className="font-extrabold text-amber-400 text-lg">ಹ</span>
              </div>
            </div>
            <div>
              <span className="font-bold text-slate-900 text-base leading-tight block">
                {language === "kn" ? "ಹರ್ಷಾನಂದ ಗುತ್ತೇದಾರ" : "Harshanand Guttedar"}
              </span>
              <span className="text-[10px] text-amber-700 font-bold uppercase tracking-wider">
                {language === "kn" ? "ಅಡ್ಮಿನ್ ಕನ್ಸೋಲ್" : "Admin Console"}
              </span>
            </div>
          </div>

          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-50 border border-red-200 text-red-700 text-xs font-bold tracking-wider uppercase mb-3">
            <Shield className="w-3.5 h-3.5 text-red-600" />
            <span>{language === "kn" ? "ಅಡ್ಮಿನ್ ಪ್ರವೇಶ" : "Staff Console"}</span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight mb-2">
            {language === "kn" ? "ನಿರ್ವಾಹಕರ ಲಾಗಿನ್" : "Sign in to Admin Console"}
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mb-8">
            {language === "kn"
              ? "ಕಲಬುರಗಿ ಮತ್ತು ಆಳಂದ ಕಚೇರಿಯ ಅಧಿಕೃತ ಸಿಬ್ಬಂದಿಗೆ ಮಾತ್ರ"
              : "Restricted gateway for authorized constituency staff only"}
          </p>

          {/* Dynamic Single Status Box (Updates In-Place) */}
          {(error || successMsg) && (
            <div
              className={`mb-6 p-3.5 rounded-2xl text-xs flex items-center justify-between gap-3 transition-all ${
                error
                  ? "bg-red-50 border border-red-200 text-red-700"
                  : "bg-emerald-50 border border-emerald-200 text-emerald-800"
              }`}
            >
              <div className="flex items-center gap-2.5 min-w-0">
                {error ? (
                  <AlertCircle className="w-4 h-4 text-red-500 shrink-0" />
                ) : (
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                )}
                <span className="font-semibold leading-relaxed">
                  {error || successMsg}
                </span>
              </div>

              {/* Seamless Dev Code Auto Fill inline on the same banner */}
              {devOtp && (
                <button
                  type="button"
                  onClick={handleAutoFillDevOtp}
                  className="px-2.5 py-1 rounded-xl bg-amber-400 hover:bg-amber-500 font-bold text-[11px] text-slate-950 transition-colors shrink-0 shadow-sm cursor-pointer whitespace-nowrap"
                >
                  Auto Fill ({devOtp})
                </button>
              )}
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleVerifyOtp} className="space-y-5">
            
            {/* Phone Number Input */}
            <div>
              <label className="block text-xs sm:text-sm font-semibold text-slate-700 mb-2">
                {language === "kn" ? "ಅಡ್ಮಿನ್ ಮೊಬೈಲ್ ಸಂಖ್ಯೆ" : "Admin Mobile Number"}
              </label>
              <div className="flex items-center rounded-2xl border border-slate-200 bg-white px-3.5 py-3.5 focus-within:border-amber-400 focus-within:ring-2 focus-within:ring-amber-100 transition-all shadow-sm">
                <div className="flex items-center gap-1.5 pr-3 border-r border-slate-200 text-slate-800 font-semibold text-sm shrink-0">
                  <span className="text-base">🇮🇳</span>
                  <span>(+91)</span>
                  <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
                </div>
                <input
                  type="tel"
                  maxLength={10}
                  value={mobile}
                  onChange={(e) => {
                    setMobile(e.target.value.replace(/\D/g, ""));
                    if (error) setError(null);
                  }}
                  placeholder="70757 81960"
                  disabled={loading}
                  className="w-full pl-3 text-base font-semibold text-slate-900 placeholder-slate-300 focus:outline-none tracking-wide"
                />
              </div>
            </div>

            {/* Verification Code Input with Inline "Get Code" Button */}
            <div>
              <label className="block text-xs sm:text-sm font-semibold text-slate-700 mb-2">
                {language === "kn" ? "ದೃಢೀಕರಣ ಕೋಡ್" : "Verification Code"}
              </label>
              <div className="flex items-center gap-2">
                <div className="flex-1 flex items-center rounded-2xl border border-slate-200 bg-white px-3.5 py-3.5 focus-within:border-amber-400 focus-within:ring-2 focus-within:ring-amber-100 transition-all shadow-sm">
                  <Lock className="w-4 h-4 text-slate-400 mr-2 shrink-0" />
                  <input
                    type="text"
                    inputMode="numeric"
                    maxLength={6}
                    value={otpCode}
                    onChange={(e) => setOtpCode(e.target.value.replace(/\D/g, ""))}
                    placeholder={language === "kn" ? "6-ಅಂಕಿಯ ಕೋಡ್" : "6-digit code"}
                    disabled={loading}
                    className="w-full text-base font-mono font-bold text-slate-900 placeholder-slate-300 focus:outline-none tracking-widest"
                  />
                </div>

                {/* Inline "Get Code" Button */}
                <button
                  type="button"
                  onClick={(e) => handleSendOtp(e)}
                  disabled={loading || (otpRequested && !canResend)}
                  className="px-4 py-3.5 rounded-2xl font-bold text-xs sm:text-sm bg-slate-100 hover:bg-slate-200 text-slate-800 border border-slate-200 transition-all shrink-0 cursor-pointer disabled:opacity-50 shadow-sm"
                >
                  {loading ? (
                    <RefreshCw className="w-4 h-4 animate-spin" />
                  ) : otpRequested && !canResend ? (
                    formatTimer(countdown)
                  ) : (
                    <span>{language === "kn" ? "ಒಟಿಪಿ ಪಡೆಯಿರಿ" : "Get Code"}</span>
                  )}
                </button>
              </div>
            </div>

            {/* Solid Dark Sign In Button (Matching User Login) */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-4 rounded-2xl font-bold text-base bg-slate-950 hover:bg-slate-800 text-white transition-all cursor-pointer shadow-md flex items-center justify-center gap-2 mt-4 active:scale-[0.99]"
            >
              {loading ? (
                <RefreshCw className="w-5 h-5 animate-spin text-white" />
              ) : (
                <span>{language === "kn" ? "ದೃಢೀಕರಿಸಿ & ಅಡ್ಮಿನ್ ಪ್ರವೇಶಿಸಿ" : "Sign In to Admin Console"}</span>
              )}
            </button>

          </form>

          {/* Citizen Login Link */}
          <div className="text-center mt-6">
            <Link
              href="/login"
              className="text-xs text-slate-500 hover:text-slate-900 font-semibold transition-colors"
            >
              {language === "kn"
                ? "ಸಾಮಾನ್ಯ ನಾಗರಿಕರೇ? ನಾಗರಿಕ ಲಾಗಿನ್‌ಗೆ ತೆರಳಿ →"
                : "Looking for Citizen Portal? Citizen Login →"}
            </Link>
          </div>

        </div>

        {/* Footer */}
        <div className="text-center text-xs text-slate-400 pt-8 mt-auto border-t border-slate-100">
          <span>© 2026 Harshanand Guttedar • Aland & Kalaburagi Constituency Admin Console</span>
        </div>

      </div>

    </div>
  );
}
