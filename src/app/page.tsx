"use client";

import React from "react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import AboutSection from "@/components/AboutSection";
import AgendaSection from "@/components/AgendaSection";
import WhySupportSection from "@/components/WhySupportSection";
import FAQSection from "@/components/FAQSection";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="min-h-screen bg-white text-slate-900 relative overflow-x-hidden">
      {/* 1. Header Navigation Bar */}
      <Navbar />

      {/* 2. Hero Section with bottom blur transition */}
      <Hero />

      {/* 3. Section 2: About Us (Pure white background) */}
      <AboutSection />

      {/* 4. Section 3: Political Agenda & Priorities (Expandable hover cards) */}
      <AgendaSection />

      {/* 5. Section 4: Why Support Us (Bg #f4f2ee, 6 Bento boxes of varied sizes) */}
      <WhySupportSection />

      {/* 6. Section 5: Common Questions / FAQ Accordion */}
      <FAQSection />

      {/* 7. Footer: Floating CTA Banner + 4-Column Footer + Newsletter */}
      <Footer />
    </main>
  );
}
