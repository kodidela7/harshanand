import type { Metadata } from "next";
import "./globals.css";
import { LanguageProvider } from "@/context/LanguageContext";

export const metadata: Metadata = {
  metadataBase: new URL("https://harshanand.org"),
  title: {
    default: "Harshanand Guttedar | ಹರ್ಷಾನಂದ ಗುತ್ತೇದಾರ - Official Website",
    template: "%s | Harshanand Guttedar",
  },
  description:
    "Official website of Harshanand Guttedar (ಹರ್ಷಾನಂದ ಗುತ್ತೇದಾರ). Dedicated to public service in Kalaburagi, citizen grievance resolution, and empowering local farmers with agricultural export guidance.",
  keywords: [
    "Harshanand Guttedar",
    "ಹರ್ಷಾನಂದ ಗುತ್ತೇದಾರ",
    "Kalaburagi",
    "Gulbarga",
    "Kalaburagi Red Gram",
    "Tur Dal Export",
    "Farmer Guidance",
    "Karnataka Leadership",
    "Citizen Grievance Kalaburagi",
    "harshanand.org",
  ],
  authors: [{ name: "Harshanand Guttedar", url: "https://harshanand.org" }],
  creator: "Harshanand Guttedar Office",
  publisher: "Harshanand Guttedar",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "kn_IN",
    alternateLocale: ["en_US"],
    url: "https://harshanand.org",
    siteName: "Harshanand Guttedar | ಹರ್ಷಾನಂದ ಗುತ್ತೇದಾರ",
    title: "Harshanand Guttedar | ಹರ್ಷಾನಂದ ಗುತ್ತೇದಾರ - Leadership that Delivers Results",
    description:
      "Official bilingual platform for Harshanand Guttedar. Addressing citizen concerns and empowering Kalaburagi farmers with international export market access.",
    images: [
      {
        url: "/images/hero.jpg",
        width: 1200,
        height: 630,
        alt: "Harshanand Guttedar addressing the public in Kalaburagi",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Harshanand Guttedar | ಹರ್ಷಾನಂದ ಗುತ್ತೇದಾರ",
    description:
      "Leadership that delivers results. Dedicated to citizens of Kalaburagi and agricultural export growth for farmers.",
    images: ["/images/hero.jpg"],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Harshanand Guttedar",
    alternateName: "ಹರ್ಷಾನಂದ ಗುತ್ತೇದಾರ",
    url: "https://harshanand.org",
    jobTitle: "Public Leader & Agricultural Reformer",
    worksFor: {
      "@type": "Organization",
      name: "Kalaburagi Public Service & Farmer Empowerment",
    },
    address: {
      "@type": "PostalAddress",
      addressLocality: "Kalaburagi",
      addressRegion: "Karnataka",
      addressCountry: "IN",
    },
    sameAs: [
      "https://facebook.com/HarshanandGuttedar",
      "https://twitter.com/HarshanandG",
      "https://instagram.com/HarshanandGuttedar",
    ],
  };

  return (
    <html lang="kn" className="scroll-smooth">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-screen bg-slate-950 text-slate-100 antialiased selection:bg-amber-500 selection:text-slate-950 font-sans">
        <LanguageProvider>{children}</LanguageProvider>
      </body>
    </html>
  );
}
