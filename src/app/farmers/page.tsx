"use client";

import React from "react";
import Navbar from "@/components/Navbar";
import FarmersHero from "@/components/farmers/FarmersHero";
import FarmersSolutions from "@/components/farmers/FarmersSolutions";
import FarmersWhyChoose from "@/components/farmers/FarmersWhyChoose";
import FarmersNetwork from "@/components/farmers/FarmersNetwork";
import FarmersStories from "@/components/farmers/FarmersStories";
import FarmersEnquiry from "@/components/farmers/FarmersEnquiry";
import Footer from "@/components/Footer";

export default function FarmersPage() {
  return (
    <main className="min-h-screen bg-white text-slate-900 relative overflow-x-hidden">
      {/* 1. Global Navigation Bar */}
      <Navbar />

      {/* 2. Farmers Hero Banner */}
      <FarmersHero />

      {/* 3. Section 1: Agricultural Services Built Around Your Farm (Screenshot 5 Reference) */}
      <FarmersSolutions />

      {/* 4. Section 2: Growing Tomorrow - Soil Health & Precision Farming (Screenshot 3 Reference) */}
      <FarmersWhyChoose />

      {/* 5. Section 3: Service & Export Network with Ribbon & Stats (Screenshot 2 Reference) */}
      <FarmersNetwork />

      {/* 6. Section 4: Real Results from Real Farmers Testimonials (Screenshot 4 Reference) */}
      <FarmersStories />

      {/* 7. Section 5: Acreage & Crop Consultation Enquiry Form (Screenshot 1 Reference) */}
      <FarmersEnquiry />

      {/* 8. Global Site Footer */}
      <Footer />
    </main>
  );
}

