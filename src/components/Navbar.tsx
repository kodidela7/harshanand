"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";
import { 
  Menu, 
  X, 
  ChevronDown, 
  ArrowRight, 
  Globe, 
  Sprout, 
  MessageSquare, 
  Shield, 
  Phone,
  Home as HomeIcon,
  User,
  Layers,
  Newspaper,
  MoreHorizontal,
  FileText,
  HelpCircle,
  Compass,
  Award,
  Heart,
  Target,
  Landmark,
  Calendar,
  Building2,
  HeartHandshake
} from "lucide-react";

export default function Navbar() {
  const { language, setLanguage, toggleLanguage, t } = useLanguage();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const navRef = useRef<HTMLElement>(null);
  const [mobileExpanded, setMobileExpanded] = useState<{ [key: string]: boolean }>({
    about: false,
    more: false,
  });

  // Click outside to close dropdown
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (navRef.current && !navRef.current.contains(event.target as Node)) {
        setOpenDropdown(null);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Prevent background scrolling when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [mobileMenuOpen]);

  const navLinks = [
    { 
      href: "/", 
      labelKn: "ಮುಖಪುಟ", 
      labelEn: "Home",
      icon: HomeIcon 
    },
    { 
      key: "about",
      href: "/about", 
      labelKn: "ಪರಿಚಯ", 
      labelEn: "About",
      icon: User,
      hasDropdown: true,
      dropdownItems: [
        { 
          href: "/about", 
          labelKn: "ನಮ್ಮ ಪರಿಚಯ", 
          labelEn: "About Harshanand",
          icon: User 
        },
        { 
          href: "/journey", 
          labelKn: "ಜೀವನ ಪಯಣ", 
          labelEn: "Life Journey",
          icon: Compass 
        },
        { 
          href: "/public-life", 
          labelKn: "ಸಾರ್ವಜನಿಕ ಜೀವನ", 
          labelEn: "Public Life",
          icon: Award 
        },
        { 
          href: "/family", 
          labelKn: "ಕುಟುಂಬ & ಪರಂಪರೆ", 
          labelEn: "Family & Heritage",
          icon: Heart 
        },
        { 
          href: "/vision", 
          labelKn: "ದೂರದೃಷ್ಟಿ 2030", 
          labelEn: "Vision 2030",
          icon: Target 
        },
      ]
    },
    { 
      href: "/farmers", 
      labelKn: "ರೈತರು", 
      labelEn: "Farmers",
      icon: Sprout 
    },
    { 
      href: "/aland", 
      labelKn: "ಆಳಂದ", 
      labelEn: "Aland",
      icon: Landmark 
    },
    {
      key: "more",
      href: "#more",
      labelKn: "ಇನ್ನಷ್ಟು",
      labelEn: "More",
      icon: MoreHorizontal,
      hasDropdown: true,
      dropdownItems: [
        { 
          href: "/public-work", 
          labelKn: "ಸಾರ್ವಜನಿಕ ಕಾಮಗಾರಿಗಳು", 
          labelEn: "Public Works",
          icon: Building2
        },
        { 
          href: "/initiatives", 
          labelKn: "ಅಭಿವೃದ್ಧಿ ಯೋಜನೆಗಳು", 
          labelEn: "Development Initiatives",
          icon: Shield
        },
        { 
          href: "/events", 
          labelKn: "ಕಾರ್ಯಕ್ರಮಗಳು & ಸಮಾವೇಶ", 
          labelEn: "Events & Rallies",
          icon: Calendar
        },
        { 
          href: "/articles", 
          labelKn: "ಲೇಖನಗಳು & ಬ್ಲಾಗ್", 
          labelEn: "Articles & Blog",
          icon: Newspaper
        },
        { 
          href: "/faq", 
          labelKn: "ಸಾಮಾನ್ಯ ಪ್ರಶ್ನೆಗಳು (FAQ)", 
          labelEn: "FAQ's",
          icon: HelpCircle
        },
        { 
          href: "/contact", 
          labelKn: "ಸಂಪರ್ಕ ಕಾರ್ಯಾಲಯ", 
          labelEn: "Contact Office",
          icon: Phone
        },
        { 
          href: "/membership", 
          labelKn: "ಸದಸ್ಯತ್ವ ನೋಂದಣಿ", 
          labelEn: "Membership Form",
          icon: HeartHandshake
        },
      ],
    },
  ];

  return (
    <>
      {/* Main Header Bar */}
      <header className="absolute top-0 left-0 right-0 z-50">
        <div className="w-full px-5 sm:px-8 md:px-10 lg:px-12 xl:px-16 2xl:px-20">
          <div className="flex items-center justify-between h-20 sm:h-24">

            {/* LEFT: Logo + Name */}
            <Link 
              href="/" 
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center gap-2.5 sm:gap-3 shrink-0 group z-50"
            >
              <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-gradient-to-br from-amber-400 via-red-500 to-amber-500 p-[2px] shadow-lg shadow-amber-500/25 group-hover:scale-105 transition-transform">
                <div className="w-full h-full rounded-full bg-black flex items-center justify-center">
                  <span className="font-extrabold text-amber-400 text-lg sm:text-xl">ಹ</span>
                </div>
              </div>
              <div className="flex flex-col">
                <span className="font-bold text-white text-base sm:text-lg leading-tight tracking-tight group-hover:text-amber-300 transition-colors">
                  {language === "kn" ? "ಹರ್ಷಾನಂದ ಗುತ್ತೇದಾರ" : "Harshanand Guttedar"}
                </span>
                <span className="text-[10px] sm:text-[11px] text-amber-200/70 font-medium tracking-wide">
                  {language === "kn" ? "ಜನನಾಯಕ • ಕಲಬುರಗಿ" : "Public Leader • Kalaburagi"}
                </span>
              </div>
            </Link>

            {/* CENTER: Desktop Nav Links inside Bordered Pill */}
            <nav ref={navRef} className="hidden lg:flex items-center">
              <div className="flex items-center gap-1 px-2 py-1.5 rounded-full border border-white/20 bg-white/5 backdrop-blur-md">
                {navLinks.map((item) => {
                  const itemKey = item.key || item.href;
                  const isItemOpen = openDropdown === itemKey;

                  return (
                    <div key={item.href} className="relative">
                      {item.hasDropdown ? (
                        <div
                          onMouseEnter={() => setOpenDropdown(itemKey)}
                          onMouseLeave={() => setOpenDropdown(null)}
                          className="relative"
                        >
                          <button
                            type="button"
                            onClick={() => setOpenDropdown(isItemOpen ? null : itemKey)}
                            className={`flex items-center gap-1.5 px-4 py-2 text-sm font-medium rounded-full transition-all cursor-pointer ${
                              isItemOpen 
                                ? "text-amber-300 bg-white/15" 
                                : "text-white/90 hover:text-white hover:bg-white/10"
                            }`}
                          >
                            <span>{language === "kn" ? item.labelKn : item.labelEn}</span>
                            <ChevronDown 
                              className={`w-3.5 h-3.5 text-white/70 transition-transform duration-200 ${
                                isItemOpen ? "rotate-180 text-amber-400" : ""
                              }`} 
                            />
                          </button>
                          {isItemOpen && (
                            <div className={`absolute top-full pt-2 z-50 animate-in fade-in slide-in-from-top-1 duration-200 ${
                              item.key === "about" ? "left-0 w-64" : "right-0 w-72"
                            }`}>
                              {/* Frosted Translucent Glass Dropdown matching Navbar & Hero */}
                              <div className="rounded-2xl bg-black/85 backdrop-blur-2xl border border-white/20 shadow-[0_20px_50px_rgba(0,0,0,0.75)] p-2 space-y-1">
                                {item.dropdownItems?.map((sub) => (
                                  <Link
                                    key={sub.href}
                                    href={sub.href}
                                    onClick={() => setOpenDropdown(null)}
                                    className="flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs sm:text-sm text-slate-200 hover:text-white hover:bg-white/15 transition-all group"
                                  >
                                    <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center shrink-0 group-hover:bg-amber-400 group-hover:text-black border border-white/10 transition-colors">
                                      <sub.icon className="w-4 h-4 text-amber-400 group-hover:text-black transition-transform group-hover:scale-110" />
                                    </div>
                                    <span className="font-medium group-hover:text-amber-300 transition-colors">
                                      {language === "kn" ? sub.labelKn : sub.labelEn}
                                    </span>
                                  </Link>
                                ))}
                              </div>
                            </div>
                          )}
                        </div>
                      ) : (
                        <Link
                          href={item.href}
                          className="px-4 py-2 text-sm font-medium text-white/90 hover:text-white rounded-full hover:bg-white/10 transition-all"
                        >
                          {language === "kn" ? item.labelKn : item.labelEn}
                        </Link>
                      )}
                    </div>
                  );
                })}
              </div>
            </nav>

            {/* RIGHT: Desktop Language Switcher + Login Button */}
            <div className="hidden lg:flex items-center gap-3">
              {/* Explicit Kannada & English Segmented Switcher */}
              <div className="flex items-center p-0.5 rounded-full border border-white/20 bg-white/5 backdrop-blur-md">
                <button
                  type="button"
                  onClick={() => setLanguage("kn")}
                  className={`px-3 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer ${
                    language === "kn"
                      ? "bg-amber-400 text-slate-950 shadow-sm font-extrabold"
                      : "text-white/80 hover:text-white"
                  }`}
                >
                  ಕನ್ನಡ
                </button>
                <button
                  type="button"
                  onClick={() => setLanguage("en")}
                  className={`px-3 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer ${
                    language === "en"
                      ? "bg-amber-400 text-slate-950 shadow-sm font-extrabold"
                      : "text-white/80 hover:text-white"
                  }`}
                >
                  English
                </button>
              </div>

              {/* Membership Registration Link */}
              <Link
                href="/membership"
                className="hidden xl:flex items-center gap-1.5 px-4 py-2 rounded-full font-semibold text-xs text-amber-300 border border-amber-400/40 bg-amber-400/10 hover:bg-amber-400/20 transition-all shadow-sm"
              >
                <HeartHandshake className="w-3.5 h-3.5 text-amber-400" />
                <span>{language === "kn" ? "ಸದಸ್ಯತ್ವ ನೋಂದಣಿ" : "Membership"}</span>
              </Link>

              {/* Login Button */}
              <Link
                href="/login"
                className="flex items-center gap-2 px-5 py-2.5 rounded-full font-semibold text-sm text-white transition-all cursor-pointer shadow-lg shadow-red-900/35"
                style={{
                  background: "linear-gradient(135deg, #dc2626 0%, #b91c1c 100%)",
                }}
              >
                <span>{t("ಲಾಗಿನ್", "Login")}</span>
                <span className="w-6 h-6 rounded-full bg-white flex items-center justify-center">
                  <ArrowRight className="w-3.5 h-3.5 text-red-700" />
                </span>
              </Link>
            </div>

            {/* MOBILE CONTROLS: Language Pill + Toggle Hamburger/X Button */}
            <div className="flex items-center gap-2 lg:hidden z-50">
              {/* Dual Language Switcher */}
              <div className="flex items-center p-0.5 rounded-full border border-white/20 bg-black/50 backdrop-blur-md">
                <button
                  type="button"
                  onClick={() => setLanguage("kn")}
                  className={`px-2.5 py-1 rounded-full text-[11px] font-bold transition-all cursor-pointer ${
                    language === "kn"
                      ? "bg-amber-400 text-slate-950 font-extrabold"
                      : "text-white/70"
                  }`}
                >
                  ಕನ್ನಡ
                </button>
                <button
                  type="button"
                  onClick={() => setLanguage("en")}
                  className={`px-2.5 py-1 rounded-full text-[11px] font-bold transition-all cursor-pointer ${
                    language === "en"
                      ? "bg-amber-400 text-slate-950 font-extrabold"
                      : "text-white/70"
                  }`}
                >
                  EN
                </button>
              </div>

              {/* Toggle Menu Button (Smoothly switches between Hamburger and X) */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="w-10 h-10 rounded-full border border-white/25 bg-black/50 backdrop-blur-md text-white flex items-center justify-center transition-all active:scale-95 cursor-pointer shadow-lg"
                aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
              >
                {mobileMenuOpen ? (
                  <X className="w-5 h-5 text-white" />
                ) : (
                  <Menu className="w-5 h-5 text-white" />
                )}
              </button>
            </div>

          </div>
        </div>
      </header>

      {/* =========================================================
          TRANSPARENT FROSTED BLUR MOBILE DRAWER (Fixed Full Height)
          ========================================================= */}
      {mobileMenuOpen && (
        <div className="fixed inset-x-0 top-20 sm:top-24 bottom-0 z-40 lg:hidden overflow-y-auto animate-in fade-in slide-in-from-top-2 duration-300">
          
          {/* Frosted Translucent Glass Layer: Hero image blurs softly through */}
          <div 
            className="fixed inset-0 top-20 sm:top-24 bg-black/60 backdrop-blur-2xl backdrop-saturate-150 pointer-events-none"
          />

          {/* Golden ambient gradient flare */}
          <div className="fixed top-24 right-0 w-72 h-72 bg-amber-500/15 rounded-full blur-3xl pointer-events-none" />

          {/* Drawer Scrollable Content */}
          <div className="relative z-10 px-5 pt-4 pb-10 flex flex-col justify-between min-h-[calc(100vh-5rem)]">
            
            <div className="space-y-4">
              {/* Language Switcher Card on Mobile */}
              <div className="p-3.5 rounded-2xl bg-black/40 backdrop-blur-md border border-white/15 flex items-center justify-between shadow-lg">
                <span className="text-xs font-semibold text-white/90 flex items-center gap-2">
                  <Globe className="w-4 h-4 text-amber-400" />
                  {language === "kn" ? "ಭಾಷೆ ಆಯ್ಕೆ / Language" : "Select Language"}
                </span>

                <div className="flex items-center bg-black/60 p-1 rounded-full border border-white/15">
                  <button
                    type="button"
                    onClick={() => setLanguage("kn")}
                    className={`px-3 py-1 rounded-full text-xs font-bold transition-all cursor-pointer ${
                      language === "kn"
                        ? "bg-amber-400 text-slate-950 shadow font-extrabold"
                        : "text-white/70 hover:text-white"
                    }`}
                  >
                    ಕನ್ನಡ
                  </button>
                  <button
                    type="button"
                    onClick={() => setLanguage("en")}
                    className={`px-3 py-1 rounded-full text-xs font-bold transition-all cursor-pointer ${
                      language === "en"
                        ? "bg-amber-400 text-slate-950 shadow font-extrabold"
                        : "text-white/70 hover:text-white"
                    }`}
                  >
                    English
                  </button>
                </div>
              </div>

              {/* Navigation Items (Translucent Frosted Cards) */}
              <nav className="space-y-2">
                {navLinks.map((item) => {
                  const itemKey = item.key || item.href;
                  const isExpanded = !!mobileExpanded[itemKey];

                  return (
                    <div key={item.href} className="overflow-hidden">
                      {item.hasDropdown ? (
                        <div className="rounded-2xl bg-black/40 backdrop-blur-md border border-white/15 overflow-hidden shadow-lg">
                          <button
                            onClick={() => setMobileExpanded((prev) => ({ ...prev, [itemKey]: !prev[itemKey] }))}
                            className="w-full flex items-center justify-between px-4 py-3.5 text-base font-semibold text-white hover:text-amber-300 transition-colors cursor-pointer"
                          >
                            <div className="flex items-center gap-3">
                              <item.icon className="w-5 h-5 text-amber-400" />
                              <span>{language === "kn" ? item.labelKn : item.labelEn}</span>
                            </div>
                            <ChevronDown 
                              className={`w-4 h-4 text-white/70 transition-transform duration-300 ${
                                isExpanded ? "rotate-180 text-amber-400" : ""
                              }`} 
                            />
                          </button>

                          {isExpanded && (
                            <div className="px-3 pb-3 pt-1 space-y-1.5 border-t border-white/10 bg-black/40">
                              {item.dropdownItems?.map((sub) => (
                                <Link
                                  key={sub.href}
                                  href={sub.href}
                                  onClick={() => setMobileMenuOpen(false)}
                                  className="flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-xs sm:text-sm text-slate-200 hover:text-white hover:bg-white/10 transition-colors"
                                >
                                  <sub.icon className="w-4 h-4 text-amber-400/90 shrink-0" />
                                  <span>{language === "kn" ? sub.labelKn : sub.labelEn}</span>
                                </Link>
                              ))}
                            </div>
                          )}
                        </div>
                      ) : (
                        <Link
                          href={item.href}
                          onClick={() => setMobileMenuOpen(false)}
                          className="flex items-center gap-3 px-4 py-3.5 rounded-2xl bg-black/40 backdrop-blur-md hover:bg-black/55 border border-white/15 text-base font-semibold text-white hover:text-amber-300 transition-colors shadow-lg"
                        >
                          <item.icon className="w-5 h-5 text-amber-400" />
                          <span>{language === "kn" ? item.labelKn : item.labelEn}</span>
                        </Link>
                      )}
                    </div>
                  );
                })}
              </nav>
            </div>

            {/* Bottom Actions: Helpline Card + Red Pill Login Button */}
            <div className="mt-8 pt-5 border-t border-white/15 space-y-3">
              {/* Office Helpline Bar */}
              <a
                href="tel:+918472250148"
                className="flex items-center justify-between p-3.5 rounded-2xl bg-black/45 backdrop-blur-md border border-white/15 text-white/85 hover:text-white transition-colors shadow-lg"
              >
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
                    <Phone className="w-4 h-4" />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[10px] text-white/60 uppercase tracking-wider">
                      {language === "kn" ? "ಕಲಬುರಗಿ ಕಚೇರಿ ಸಹಾಯವಾಣಿ" : "Office Helpline"}
                    </span>
                    <span className="text-xs font-bold text-white">+91 8472 250148</span>
                  </div>
                </div>
                <ArrowRight className="w-4 h-4 text-white/50" />
              </a>

              {/* Membership Registration Button */}
              <Link
                href="/membership"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-center gap-2.5 w-full py-3.5 px-6 rounded-full font-bold text-sm text-slate-950 bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 transition-all shadow-lg cursor-pointer"
              >
                <HeartHandshake className="w-4 h-4 text-slate-950" />
                <span>{language === "kn" ? "ಸದಸ್ಯತ್ವ ನೋಂದಣಿ ಫಾರ್ಮ್" : "Membership Registration"}</span>
              </Link>

              {/* Red Pill Login Button */}
              <Link
                href="/login"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-center gap-3 w-full py-4 px-6 rounded-full font-bold text-sm text-white transition-all shadow-2xl shadow-red-950/80 cursor-pointer"
                style={{
                  background: "linear-gradient(135deg, #dc2626 0%, #b91c1c 100%)",
                }}
              >
                <span>{t("ಲಾಗಿನ್ ಮಾಡಿ", "Login to Citizen Portal")}</span>
                <span className="w-6 h-6 rounded-full bg-white flex items-center justify-center shadow-sm">
                  <ArrowRight className="w-3.5 h-3.5 text-red-700" />
                </span>
              </Link>
            </div>

          </div>
        </div>
      )}
    </>
  );
}
