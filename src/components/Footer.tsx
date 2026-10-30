"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";
import { 
  MapPin, 
  Mail, 
  Phone, 
  ArrowRight,
  CheckCircle2
} from "lucide-react";

export default function Footer() {
  const { language, t } = useLanguage();
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setTimeout(() => setSubscribed(false), 4000);
      setEmail("");
    }
  };

  return (
    <footer 
      className="relative z-10 text-white overflow-hidden pt-12 sm:pt-16 pb-8"
      style={{
        background: `
          linear-gradient(135deg, 
            rgba(120, 40, 0, 0.96) 0%, 
            rgba(140, 50, 5, 0.94) 20%, 
            rgba(100, 30, 5, 0.92) 45%, 
            rgba(70, 15, 15, 0.95) 70%, 
            rgba(35, 5, 10, 0.98) 100%
          )
        `,
      }}
      aria-label="Site Footer"
    >
      {/* Top golden ambient light flare matching Hero section */}
      <div 
        className="absolute top-0 left-0 w-2/3 h-96 pointer-events-none select-none"
        style={{
          background: "radial-gradient(ellipse at 15% 10%, rgba(255, 180, 30, 0.4) 0%, transparent 65%)",
        }}
      />

      {/* Background crowd texture at bottom (matching screenshot) */}
      <div 
        className="absolute inset-x-0 bottom-0 h-96 opacity-15 pointer-events-none select-none bg-cover bg-bottom mix-blend-luminosity"
        style={{ backgroundImage: "url('/images/hero.jpg')" }}
      />

      <div className="w-full px-5 sm:px-8 md:px-10 lg:px-12 xl:px-16 2xl:px-20 relative z-10">
        
        {/* =========================================================
            TOP FLOATING CTA BANNER - PURE WHITE BACKGROUND
            ========================================================= */}
        <div className="relative rounded-2xl sm:rounded-3xl p-6 sm:p-8 lg:p-10 mb-14 sm:mb-16 overflow-hidden border border-slate-200/90 shadow-2xl bg-white text-slate-900">
          <div className="relative z-10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
            
            {/* Left Headline */}
            <div className="space-y-1.5 max-w-2xl">
              <h3 className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-slate-900 tracking-tight leading-snug">
                {language === "kn"
                  ? "ಬನ್ನಿ, ಕಲಬುರಗಿಯ ಭವಿಷ್ಯವನ್ನು ಜೊತೆಯಾಗಿ ಕಟ್ಟೋಣ!"
                  : "Let's build Karnataka's future together!"}
              </h3>
              <p className="text-xl sm:text-2xl lg:text-3xl font-bold text-[#b91c1c] font-serif sm:font-sans">
                {language === "kn"
                  ? "ಪ್ರಗತಿಯ ಹಾದಿಯಲ್ಲಿ ಜೊತೆಯಾಗಿ."
                  : "ಪ್ರಗತಿಯ ಹಾದಿಯಲ್ಲಿ ಜೊತೆಯಾಗಿ."}
              </p>
            </div>

            {/* Right Buttons */}
            <div className="flex flex-wrap items-center gap-3.5 sm:gap-4 shrink-0">
              {/* Button 1: Support Now -> (Red Pill Button) */}
              <Link
                href="#support"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#b91c1c] hover:bg-[#dc2626] text-white font-semibold text-xs sm:text-sm transition-all duration-200 shadow-lg shadow-red-900/30 cursor-pointer"
              >
                <span>{t("ಬೆಂಬಲಿಸಿ", "Support Now")}</span>
                <ArrowRight className="w-4 h-4" />
              </Link>

              {/* Button 2: Become a Volunteer (Clean Border Button) */}
              <Link
                href="#volunteer"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-slate-300 hover:border-slate-800 text-slate-800 hover:bg-slate-50 font-semibold text-xs sm:text-sm transition-all duration-200 cursor-pointer"
              >
                <span>{t("ಸ್ವಯಂಸೇವಕರಾಗಿ", "Become a Volunteer")}</span>
              </Link>
            </div>

          </div>
        </div>

        {/* =========================================================
            MAIN 4-COLUMN FOOTER CONTENT (Hero Palette)
            ========================================================= */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8 pb-12 sm:pb-16 border-b border-white/15">
          
          {/* Column 1 (lg:col-span-4): Logo + Description + Social Icons */}
          <div className="lg:col-span-4 flex flex-col justify-between space-y-6">
            <div>
              {/* Logo (Karnataka yellow/red icon + Leader Name) */}
              <Link href="/" className="flex items-center gap-3 group mb-4">
                <div className="w-11 h-11 rounded-full bg-gradient-to-tr from-amber-400 via-red-500 to-amber-500 p-[2px] shadow-lg shadow-amber-500/20 group-hover:scale-105 transition-transform shrink-0">
                  <div className="w-full h-full rounded-full bg-black flex items-center justify-center">
                    <span className="font-extrabold text-amber-400 text-lg">ಹ</span>
                  </div>
                </div>
                <div className="flex flex-col">
                  <span className="font-bold text-white text-lg sm:text-xl tracking-tight leading-tight">
                    {language === "kn" ? "ಹರ್ಷಾನಂದ ಗುತ್ತೇದಾರ" : "Harshanand Guttedar"}
                  </span>
                  <span className="text-amber-400 text-sm font-semibold">
                    {language === "kn" ? "ಜನನಾಯಕ • ಕಲಬುರಗಿ" : "ಹರ್ಷಾನಂದ ಗುತ್ತೇದಾರ"}
                  </span>
                </div>
              </Link>

              {/* Description */}
              <p className="text-white/85 text-xs sm:text-sm leading-relaxed max-w-sm">
                {language === "kn"
                  ? "ಕಲಬುರಗಿಯ ಸಮಗ್ರ ಅಭಿವೃದ್ಧಿ, ನಮ್ಮ ಶ್ರೀಮಂತ ಪರಂಪರೆಯ ಸಂರಕ್ಷಣೆ, ರೈತರ ರಫ್ತು ಸಬಲೀಕರಣ ಹಾಗೂ ಪ್ರತಿಯೊಬ್ಬ ನಾಗರಿಕನ ಸಮೃದ್ಧಿಗೆ ನಿರಂತರ ಸಮರ್ಪಣೆ."
                  : "Dedicated to the holistic development of Kalaburagi, preserving our rich heritage, empowering farmers, and ensuring prosperity for all."}
              </p>
            </div>

            {/* Circular Gold/Yellow Social Icons (Matching Screenshot) */}
            <div className="flex items-center gap-3 pt-2">
              {/* Facebook */}
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="w-8 h-8 rounded-full bg-amber-400 hover:bg-amber-300 text-slate-950 flex items-center justify-center font-bold text-xs transition-transform hover:scale-110 shadow-sm"
              >
                f
              </a>

              {/* Instagram */}
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="w-8 h-8 rounded-full bg-amber-400 hover:bg-amber-300 text-slate-950 flex items-center justify-center transition-transform hover:scale-110 shadow-sm"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </a>

              {/* X / Twitter */}
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="X (Twitter)"
                className="w-8 h-8 rounded-full bg-amber-400 hover:bg-amber-300 text-slate-950 flex items-center justify-center font-bold text-xs transition-transform hover:scale-110 shadow-sm"
              >
                𝕏
              </a>

              {/* YouTube */}
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="YouTube"
                className="w-8 h-8 rounded-full bg-amber-400 hover:bg-amber-300 text-slate-950 flex items-center justify-center transition-transform hover:scale-110 shadow-sm"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"/>
                </svg>
              </a>

              {/* WhatsApp */}
              <a
                href="https://whatsapp.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="WhatsApp"
                className="w-8 h-8 rounded-full bg-amber-400 hover:bg-amber-300 text-slate-950 flex items-center justify-center transition-transform hover:scale-110 shadow-sm"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Column 2 (lg:col-span-2): Leadership & Roots */}
          <div className="lg:col-span-2">
            <h4 className="text-white font-bold text-base tracking-tight mb-4">
              {language === "kn" ? "ನಾಯಕತ್ವ & ಪರಿಚಯ" : "Leadership"}
            </h4>
            <ul className="space-y-2.5 text-xs sm:text-sm text-white/80">
              <li>
                <Link href="/" className="hover:text-amber-300 transition-colors">
                  {language === "kn" ? "ಮುಖಪುಟ" : "Home"}
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-amber-300 transition-colors">
                  {language === "kn" ? "ಪರಿಚಯ" : "About"}
                </Link>
              </li>
              <li>
                <Link href="/journey" className="hover:text-amber-300 transition-colors">
                  {language === "kn" ? "ಜೀವನ ಪಯಣ" : "Journey"}
                </Link>
              </li>
              <li>
                <Link href="/public-life" className="hover:text-amber-300 transition-colors">
                  {language === "kn" ? "ಸಾರ್ವಜನಿಕ ಜೀವನ" : "Public Life"}
                </Link>
              </li>
              <li>
                <Link href="/family" className="hover:text-amber-300 transition-colors">
                  {language === "kn" ? "ಕುಟುಂಬ & ಪರಂಪರೆ" : "Family Heritage"}
                </Link>
              </li>
              <li>
                <Link href="/vision" className="hover:text-amber-300 transition-colors">
                  {language === "kn" ? "ದೂರದೃಷ್ಟಿ 2030" : "Vision 2030"}
                </Link>
              </li>
              <li>
                <Link href="/aland" className="hover:text-amber-300 transition-colors">
                  {language === "kn" ? "ಆಳಂದ ತಾಲೂಕು" : "Aland Taluk"}
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3 (lg:col-span-3): Initiatives & Public Engagement */}
          <div className="lg:col-span-3">
            <h4 className="text-white font-bold text-base tracking-tight mb-4">
              {language === "kn" ? "ಯೋಜನೆಗಳು & ಜನಸಂಪರ್ಕ" : "Initiatives & Media"}
            </h4>
            <ul className="space-y-2.5 text-xs sm:text-sm text-white/80">
              <li>
                <Link href="/farmers" className="hover:text-amber-300 transition-colors">
                  {language === "kn" ? "ರೈತರ ರಫ್ತು ಕೇಂದ್ರ" : "Farmer Export Hub"}
                </Link>
              </li>
              <li>
                <Link href="/initiatives" className="hover:text-amber-300 transition-colors">
                  {language === "kn" ? "ಅಭಿವೃದ್ಧಿ ಯೋಜನೆಗಳು" : "Development Initiatives"}
                </Link>
              </li>
              <li>
                <Link href="/public-work" className="hover:text-amber-300 transition-colors">
                  {language === "kn" ? "ಸಾರ್ವಜನಿಕ ಕಾಮಗಾರಿಗಳು" : "Public Works"}
                </Link>
              </li>
              <li>
                <Link href="/events" className="hover:text-amber-300 transition-colors">
                  {language === "kn" ? "ಸಮಾವೇಶ & ಸಭೆಗಳು" : "Events & Rallies"}
                </Link>
              </li>
              <li>
                <Link href="/articles" className="hover:text-amber-300 transition-colors">
                  {language === "kn" ? "ಲೇಖನಗಳು & ಬ್ಲಾಗ್" : "Articles & Insights"}
                </Link>
              </li>
              <li>
                <Link href="/faq" className="hover:text-amber-300 transition-colors">
                  {language === "kn" ? "ಸಾಮಾನ್ಯ ಪ್ರಶ್ನೆಗಳು (FAQ)" : "FAQ's"}
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-amber-300 transition-colors">
                  {language === "kn" ? "ಕಚೇರಿ ಸಂಪರ್ಕಿಸಿ" : "Contact Office"}
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4 (lg:col-span-3): Contact Us & Mini Email Newsletter */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="text-white font-bold text-base tracking-tight mb-4">
              {language === "kn" ? "ಕಚೇರಿ ಸಂಪರ್ಕ" : "Contact Us"}
            </h4>

            {/* Address */}
            <div className="flex items-start gap-2.5 text-xs sm:text-sm text-white/85">
              <MapPin className="w-4 h-4 text-amber-300 shrink-0 mt-0.5" />
              <span>{language === "kn" ? "ಕಲಬುರಗಿ, ಕರ್ನಾಟಕ, ಭಾರತ" : "Kalaburagi, Karnataka, India"}</span>
            </div>

            {/* Email */}
            <div className="flex items-center gap-2.5 text-xs sm:text-sm text-white/85">
              <Mail className="w-4 h-4 text-amber-300 shrink-0" />
              <a href="mailto:contact@harshanand.org" className="hover:text-amber-300 transition-colors">
                contact@harshanand.org
              </a>
            </div>

            {/* Phone */}
            <div className="flex items-center gap-2.5 text-xs sm:text-sm text-white/85">
              <Phone className="w-4 h-4 text-amber-300 shrink-0" />
              <a href="tel:+918472250148" className="hover:text-amber-300 transition-colors font-semibold">
                +91 8472 250148
              </a>
            </div>

            {/* Mini Email Newsletter Input (Matching Screenshot) */}
            <div className="pt-2">
              <span className="text-[11px] text-white/75 block mb-1.5 font-medium">
                {language === "kn" ? "ಮಾಹಿತಿ ಪತ್ರಕ್ಕೆ ಚಂದಾದಾರರಾಗಿ" : "Mini Email Newsletter"}
              </span>

              {subscribed ? (
                <div className="flex items-center gap-1.5 text-xs text-emerald-300 bg-white/10 p-2 rounded-full border border-emerald-400/40">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>{t("ಧನ್ಯವಾದಗಳು! ನೋಂದಾಯಿಸಲಾಗಿದೆ.", "Subscribed successfully!")}</span>
                </div>
              ) : (
                <form 
                  onSubmit={handleNewsletterSubmit}
                  className="rounded-full border border-white/25 bg-black/40 p-1 flex items-center shadow-inner"
                >
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder={language === "kn" ? "ಇಮೇಲ್ ನಮೂದಿಸಿ" : "Enter Email"}
                    required
                    className="bg-transparent text-white placeholder-white/50 text-xs px-3 focus:outline-none flex-grow min-w-0"
                  />
                  <button
                    type="submit"
                    className="inline-flex items-center gap-1 bg-white hover:bg-amber-300 text-slate-950 rounded-full px-3.5 py-1.5 text-xs font-bold transition-colors shrink-0 shadow cursor-pointer"
                  >
                    <span>{t("ಸಲ್ಲಿಸಿ", "Submit")}</span>
                    <ArrowRight className="w-3 h-3" />
                  </button>
                </form>
              )}
            </div>

          </div>

        </div>

        {/* =========================================================
            BOTTOM COPYRIGHT BAR (Matching Screenshot Exactly)
            ========================================================= */}
        <div className="pt-6 flex flex-col md:flex-row items-center justify-between gap-3 text-xs text-white/60">
          <div>
            © 2026 Harshanand Guttedar. All Rights Reserved. | <span className="font-serif sm:font-sans">ಎಲ್ಲಾ ಹಕ್ಕುಗಳನ್ನು ಕಾಯ್ದಿರಿಸಲಾಗಿದೆ.</span>
          </div>

          <div className="flex items-center gap-4 text-[11px] sm:text-xs text-white/60">
            <Link href="#privacy" className="hover:text-white transition-colors">
              {language === "kn" ? "ಗೌಪ್ಯತಾ ನೀತಿ" : "Privacy Policy"}
            </Link>
            <span>|</span>
            <Link href="#terms" className="hover:text-white transition-colors">
              {language === "kn" ? "ನಿಯಮಗಳು & ಷರತ್ತುಗಳು" : "Terms & Conditions"}
            </Link>
            <span>|</span>
            <Link href="#disclaimer" className="hover:text-white transition-colors">
              {language === "kn" ? "ಹಕ್ಕುತ್ಯಾಗ" : "Disclaimers"}
            </Link>
          </div>
        </div>

      </div>
    </footer>
  );
}
