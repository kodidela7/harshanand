"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

export type Language = "kn" | "en";

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  toggleLanguage: () => void;
  t: (knText: string, enText: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  // Kannada is first/default
  const [language, setLanguageState] = useState<Language>("kn");

  useEffect(() => {
    const saved = localStorage.getItem("preferred_lang") as Language;
    if (saved === "kn" || saved === "en") {
      setLanguageState(saved);
    }
  }, []);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    try {
      localStorage.setItem("preferred_lang", lang);
    } catch (e) {
      console.warn("Could not save language to localStorage:", e);
    }
  };

  const toggleLanguage = () => {
    setLanguageState((prev) => {
      const nextLang = prev === "kn" ? "en" : "kn";
      try {
        localStorage.setItem("preferred_lang", nextLang);
      } catch (e) {
        console.warn("Could not save language to localStorage:", e);
      }
      return nextLang;
    });
  };

  const t = (knText: string, enText: string) => {
    return language === "kn" ? knText : enText;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, toggleLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}
