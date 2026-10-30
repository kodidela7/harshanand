"use client";

import React from "react";
import Navbar from "@/components/Navbar";
import AboutHero from "@/components/about/AboutHero";
import AboutOverview from "@/components/about/AboutOverview";
import AboutTimeline from "@/components/about/AboutTimeline";
import AboutPillars from "@/components/about/AboutPillars";
import Footer from "@/components/Footer";

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-white text-slate-900 relative overflow-x-hidden">
      {/* 1. Global Navigation Bar */}
      <Navbar />

      {/* 2. About Header Banner with Breadcrumbs & Theme Flare */}
      <AboutHero />

      {/* 3. Section 1: Overview, Featured Team Photo & Key Stats (Screenshot 1 Reference) */}
      <AboutOverview />

      {/* 4. Section 2: Journey & Leadership Timeline (Screenshot 2 Reference) */}
      <AboutTimeline />

      {/* 5. Section 3: Core Guiding Pillars & Leader's Personal Pledge (High-UI Section) */}
      <AboutPillars />

      {/* 6. Site Footer */}
      <Footer />
    </main>
  );
}

