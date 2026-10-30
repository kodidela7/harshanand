export interface Article {
  slug: string;
  titleKn: string;
  titleEn: string;
  excerptKn: string;
  excerptEn: string;
  contentKn: string[];
  contentEn: string[];
  category: "farmer-export" | "economy" | "education" | "governance" | "health";
  categoryLabelKn: string;
  categoryLabelEn: string;
  author: string;
  date: string;
  readTime: string;
  featured?: boolean;
  imageLabelKn: string;
  imageLabelEn: string;
}

export interface EventItem {
  id: string;
  titleKn: string;
  titleEn: string;
  descKn: string;
  descEn: string;
  dateKn: string;
  dateEn: string;
  timeKn: string;
  timeEn: string;
  locationKn: string;
  locationEn: string;
  status: "upcoming" | "completed";
  category: "townhall" | "farmer" | "youth" | "rally";
  imageLabelKn: string;
  imageLabelEn: string;
}

export interface PublicWorkItem {
  id: string;
  titleKn: string;
  titleEn: string;
  categoryKn: string;
  categoryEn: string;
  locationKn: string;
  locationEn: string;
  beneficiariesKn: string;
  beneficiariesEn: string;
  descKn: string;
  descEn: string;
  statusKn: string;
  statusEn: string;
  statNumber: string;
  statLabelKn: string;
  statLabelEn: string;
}

export const ARTICLES_DATA: Article[] = [
  {
    slug: "kalaburagi-gi-tur-dal-export-revolution",
    titleKn: "ಕಲಬುರಗಿ ಜಿಐ ತೊಗರಿ ಬೆಳೆಗೆ ಜಾಗತಿಕ ರಫ್ತು ಮನ್ನಣೆ: ನವಯುಗದ ಕ್ರಾಂತಿ",
    titleEn: "Kalaburagi GI Tur Dal Global Export: A New Era for Pulse Farmers",
    excerptKn: "ಅಂತಾರಾಷ್ಟ್ರೀಯ ಮಾರುಕಟ್ಟೆಗಳಲ್ಲಿ ಕಲಬುರಗಿ ತೊಗರಿಗೆ ಹೆಚ್ಚುತ್ತಿರುವ ಬೇಡಿಕೆ ಮತ್ತು ಮಧ್ಯವರ್ತಿಗಳಿಲ್ಲದೆ ರೈತರಿಗೆ ನೇರ ಲಾಭ ತರುವ ಮಹತ್ವಾಕಾಂಕ್ಷಿ ಯೋಜನೆ.",
    excerptEn: "How establishing direct APEDA export linkages and cold storage clusters is transforming the livelihoods of red gram growers.",
    contentKn: [
      "ಕಲಬುರಗಿ ಜಿಲ್ಲೆಯ ಮಣ್ಣು ಮತ್ತು ಹವಾಗುಣವು ವಿಶ್ವದ ಅತ್ಯುತ್ತಮ ಗುಣಮಟ್ಟದ ತೊಗರಿ ಬೆಳೆಯಲು ನೈಸರ್ಗಿಕ ವರದಾನವಾಗಿದೆ. ಭೌಗೋಳಿಕ ಮಾನ್ಯತೆ (GI Tag) ಪಡೆದಿರುವ ನಮ್ಮ ತೊಗರಿ ಬೆಳೆಗೆ ಜಾಗತಿಕ ಬೇಡಿಕೆ ಅಪಾರವಾಗಿದೆ.",
      "ಶ್ರೀ ಹರ್ಷಾನಂದ ಗುತ್ತೇದಾರ ಅವರ ನೇತೃತ್ವದಲ್ಲಿ, ರೈತ ಉತ್ಪಾದಕ ಸಂಘಗಳ (FPO) ಮೂಲಕ ನೇರ ರಫ್ತು ಪರವಾನಗಿ, ಸಂಸ್ಕರಣಾ ಘಟಕಗಳು ಮತ್ತು ಸೋಲಾರ್ ಶೀತಲ ಗೋದಾಮುಗಳನ್ನು ಸ್ಥಾಪಿಸಲಾಗುತ್ತಿದೆ.",
      "ದಲ್ಲಾಳಿಗಳ ಕಮಿಷನ್ ದಂಧೆಗೆ ಕಡಿವಾಣ ಹಾಕಿ, ಪ್ರತಿ ಕ್ವಿಂಟಾಲ್‌ಗೆ ನ್ಯಾಯಯುತ ಪ್ರೀಮಿಯಂ ಬೆಲೆ ಖಾತ್ರಿಪಡಿಸುವುದೇ ನಮ್ಮ ಪ್ರಮುಖ ಗುರಿಯಾಗಿದೆ."
    ],
    contentEn: [
      "Kalaburagi's fertile soil and arid climate are naturally tailored for producing the world's most nutritious red gram (Tur Dal). Awarded the prestigious Geographical Indication (GI) tag, this produce holds massive export potential.",
      "Under the leadership of Shri Harshanand Guttedar, direct export licensing, modern pulse processing clusters, and solar-powered cold storages are being established through Farmer Producer Organizations (FPOs).",
      "By eliminating exploitative middlemen commissions, our mission ensures farmers receive guaranteed premium prices directly in their bank accounts."
    ],
    category: "farmer-export",
    categoryLabelKn: "ರೈತರ ರಫ್ತು",
    categoryLabelEn: "Farmer Export",
    author: "Harshanand Guttedar Office",
    date: "Feb 12, 2026",
    readTime: "5 min read",
    featured: true,
    imageLabelKn: "ಕಲಬುರಗಿ ತೊಗರಿ ರಫ್ತು ಕೇಂದ್ರ ಮತ್ತು ಸಂಸ್ಕರಣಾ ಘಟಕ",
    imageLabelEn: "Kalaburagi GI Tur Dal Processing & Export Hub",
  },
  {
    slug: "building-stronger-communities-local-engagement",
    titleKn: "ಜನಸಂಪರ್ಕ ಸಭೆಗಳ ಮೂಲಕ ತಳಮಟ್ಟದ ಸಮುದಾಯ ಸಬಲೀಕರಣ",
    titleEn: "Building Stronger Communities through Direct Local Engagement",
    excerptKn: "ಹಳ್ಳಿ ಹಳ್ಳಿಗಳಲ್ಲಿ ನಡೆಯುವ ಜನ ಸಂವಾದಗಳು ಸಾರ್ವಜನಿಕ ಸಮಸ್ಯೆಗಳಿಗೆ ತಕ್ಷಣ ಪರಿಹಾರ ನೀಡಲು ಹೇಗೆ ಸಹಕಾರಿಯಾಗುತ್ತಿವೆ?",
    excerptEn: "How grassroots town halls and open listening forums are transforming civic responsiveness across rural taluks.",
    contentKn: [
      "ಪ್ರಜಾಪ್ರಭುತ್ವದ ನೈಜ ಶಕ್ತಿ ಇರುವುದು ಗ್ರಾಮಗಳ ಜನರ ಧ್ವನಿಯಲ್ಲಿ. ಶ್ರೀ ಹರ್ಷಾನಂದ ಗುತ್ತೇದಾರ ಅವರ 'ಪ್ರಜಾ ಸಂಪರ್ಕ ಅಭಿಯಾನ'ವು ಅಧಿಕಾರಶಾಹಿ ಮತ್ತು ಜನರ ನಡುವಿನ ಕಂದಕವನ್ನು ಮುಚ್ಚಿದೆ.",
      "ಪ್ರತಿ ಗ್ರಾಮ ಪಂಚಾಯಿತಿಯಲ್ಲಿ ನಿಯಮಿತ ಜನಸಂಪರ್ಕ ಸಭೆಗಳನ್ನು ನಡೆಸಿ ಕುಡಿಯುವ ನೀರು, ರಸ್ತೆ, ಪಿಂಚಣಿ ಮತ್ತು ವಿದ್ಯುತ್ ಸಮಸ್ಯೆಗಳನ್ನು ಸ್ಥಳದಲ್ಲೇ ಪರಿಹರಿಸಲಾಗುತ್ತಿದೆ."
    ],
    contentEn: [
      "True democratic power lies at the grassroots. Harshanand Guttedar's 'Praja Samparka' initiative bridges the gap between citizens and administration.",
      "By conducting regular open forums across Gram Panchayats, pressing civic issues regarding drinking water, pensions, and rural power are addressed transparently on the spot."
    ],
    category: "governance",
    categoryLabelKn: "ಪಾರದರ್ಶಕತೆ",
    categoryLabelEn: "Governance",
    author: "Civic Outreach Desk",
    date: "Jan 28, 2026",
    readTime: "4 min read",
    featured: false,
    imageLabelKn: "ಆಳಂದ ಗ್ರಾಮೀಣ ಜನಸಂಪರ್ಕ ಸಭೆ",
    imageLabelEn: "Aland Community Town Hall & Citizen Assembly",
  },
  {
    slug: "investing-in-education-smart-classrooms",
    titleKn: "ಗ್ರಾಮೀಣ ಸರ್ಕಾರಿ ಶಾಲೆಗಳ ಆಧುನೀಕರಣ ಮತ್ತು ಡಿಜಿಟಲ್ ಗ್ರಂಥಾಲಯಗಳು",
    titleEn: "Investing in Rural Education: Smart Classrooms and Free Libraries",
    excerptKn: "ಕಲಬುರಗಿಯ ಪ್ರತಿ ಹಳ್ಳಿಯ ವಿದ್ಯಾರ್ಥಿಗೂ ಸ್ಪರ್ಧಾತ್ಮಕ ಪರೀಕ್ಷೆ ತರಬೇತಿ ಮತ್ತು ಡಿಜಿಟಲ್ ಕಲಿಕೆಯ ಸಮಾನ ಅವಕಾಶ.",
    excerptEn: "Modernizing government schools with STEM labs and opening dedicated study centers for competitive exam aspirants.",
    contentKn: [
      "ಶಿಕ್ಷಣವೇ ಪ್ರಗತಿಯ ಮೂಲ ಬೀಜ. ಹಿಂದುಳಿದ ಪ್ರದೇಶದ ಯುವಕರಿಗೆ ಉತ್ತಮ ಗುಣಮಟ್ಟದ ಶಿಕ್ಷಣ ಮತ್ತು ಉದ್ಯೋಗಾವಕಾಶ ತಲುಪಿಸುವುದು ನಮ್ಮ ಬದ್ಧತೆ.",
      "ಆಳಂದ ಮತ್ತು ಕಲಬುರಗಿಯಾದ್ಯಂತ ಉಚಿತ ಡಿಜಿಟಲ್ ಲೈಬ್ರರಿಗಳು ಹಾಗೂ ಕೆಪಿಎಸ್‌ಸಿ, ಯುಪಿಎಸ್‌ಸಿ, ಬ್ಯಾಂಕಿಂಗ್ ಪರೀಕ್ಷೆಗಳ ಉಚಿತ ತರಬೇತಿ ಕೇಂದ್ರಗಳನ್ನು ಸ್ಥಾಪಿಸಲಾಗಿದೆ."
    ],
    contentEn: [
      "Education is the cornerstone of progress. Providing rural students with modern educational tools and career opportunities is our core pledge.",
      "Free digital libraries and coaching centers for competitive examinations have been instituted to empower youth across Kalyana Karnataka."
    ],
    category: "education",
    categoryLabelKn: "ಶಿಕ್ಷಣ",
    categoryLabelEn: "Education",
    author: "Youth Development Cell",
    date: "Jan 15, 2026",
    readTime: "6 min read",
    featured: false,
    imageLabelKn: "ಗ್ರಾಮೀಣ ಡಿಜಿಟಲ್ ಗ್ರಂಥಾಲಯ ಮತ್ತು ತರಬೇತಿ ಕೇಂದ್ರ",
    imageLabelEn: "Rural Smart Classroom & Digital Study Hub",
  },
  {
    slug: "advancing-healthcare-access-mobile-clinics",
    titleKn: "ಹಳ್ಳಿ ಹಳ್ಳಿಗಳಿಗೆ ಸಂಚಾರಿ ಆಸ್ಪತ್ರೆ: ಸಮಗ್ರ ಆರೋಗ್ಯ ರಕ್ಷಣೆ",
    titleEn: "Advancing Healthcare: Mobile Health Vans for Remote Villages",
    excerptKn: "ವೈದ್ಯಕೀಯ ಸೌಲಭ್ಯಗಳಿಂದ ವಂಚಿತ ಹಳ್ಳಿಗಳಿಗೆ ತಜ್ಞ ವೈದ್ಯರು ಮತ್ತು ಉಚಿತ ಔಷಧ ತಲುಪಿಸುವ ಸಂಚಾರಿ ಕ್ಲಿನಿಕ್ ಯೋಜನೆ.",
    excerptEn: "Deploying fully equipped mobile medical vans with diagnostic labs and free medications to doorstep communities.",
    contentKn: [
      "ಆರೋಗ್ಯವು ಪ್ರತಿಯೊಬ್ಬ ನಾಗರಿಕನ ಮೂಲಭೂತ ಹಕ್ಕು. ದೂರದ ಹಳ್ಳಿಗಳ ವೃದ್ಧರು, ಮಹಿಳೆಯರು ಮತ್ತು ಮಕ್ಕಳಿಗೆ ಆಸ್ಪತ್ರೆಗೆ ತೆರಳುವುದು ಸವಾಲಾಗಿತ್ತು.",
      "ಸಂಚಾರಿ ಆರೋಗ್ಯ ವಾಹನಗಳ ಮೂಲಕ ರಕ್ತ ಪರೀಕ್ಷೆ, ಇಸಿಜಿ ಮತ್ತು ಉಚಿತ ಔಷಧಿಗಳನ್ನು ಗ್ರಾಮಗಳ ಬಾಗಿಲಲ್ಲೇ ಒದಗಿಸಲಾಗುತ್ತಿದೆ."
    ],
    contentEn: [
      "Healthcare is a fundamental right. For elderly citizens and mothers in remote villages, accessing distant hospitals was a severe hurdle.",
      "Our mobile health units now deliver basic diagnostics, blood screenings, and free medicines right to village doorsteps."
    ],
    category: "health",
    categoryLabelKn: "ಆರೋಗ್ಯ",
    categoryLabelEn: "Healthcare",
    author: "Public Health Taskforce",
    date: "Dec 20, 2025",
    readTime: "4 min read",
    featured: false,
    imageLabelKn: "ಸಂಚಾರಿ ಆರೋಗ್ಯ ವಾಹನ ಮತ್ತು ಉಚಿತ ವೈದ್ಯಕೀಯ ಶಿಬಿರ",
    imageLabelEn: "Mobile Healthcare Van & Free Diagnostic Camp",
  },
  {
    slug: "sustainable-water-management-lake-rejuvenation",
    titleKn: "ಕಲ್ಯಾಣಿ ಮತ್ತು ಕೆರೆಗಳ ಪುನಶ್ಚೇತನ: ಜಲ ಸಂರಕ್ಷಣೆಯ ಮಹಾಸಂಕಲ್ಪ",
    titleEn: "Sustainable Water Management: Historical Lake Rejuvenation in Aland",
    excerptKn: "ಬರಪೀಡಿತ ಪ್ರದೇಶದಲ್ಲಿ ಅಂತರ್ಜಲ ಮಟ್ಟ ಹೆಚ್ಚಿಸಲು ಪುರಾತನ ಕೆರೆಗಳ ಹೂಳೆತ್ತುವಿಕೆ ಮತ್ತು ಜಲ ಸಂರಕ್ಷಣಾ ಕಾಮಗಾರಿಗಳು.",
    excerptEn: "Restoring historic water reservoirs and desilting irrigation tanks to recharge groundwater across Aland taluk.",
    contentKn: [
      "ನೀರಿಲ್ಲದೆ ಕೃಷಿಯೂ ಇಲ್ಲ, ಜೀವನವೂ ಇಲ್ಲ. ಕಲಬುರಗಿಯ ಹಳೆಯ ಬಾವಿಗಳು ಮತ್ತು ಕೆರೆಗಳು ಶತಮಾನಗಳಿಂದ ನಮ್ಮ ಜನರನ್ನು ಪೊರೆದಿವೆ.",
      "ಸಮುದಾಯದ ಸಹಭಾಗಿತ್ವದೊಂದಿಗೆ 40ಕ್ಕೂ ಹೆಚ್ಚು ಕೆರೆಗಳನ್ನು ಹೂಳೆತ್ತಿ, ಮಳೆ ನೀರು ಸಂಗ್ರಹಣಾ ಸಾಮರ್ಥ್ಯವನ್ನು ಗಣನೀಯವಾಗಿ ಹೆಚ್ಚಿಸಲಾಗಿದೆ."
    ],
    contentEn: [
      "Without water, neither agriculture nor rural life can flourish. Historic stepwells and irrigation lakes in Kalaburagi sustained communities for generations.",
      "Through community participation, over 40 ancient tanks have been desilted, dramatically elevating groundwater tables and farm resilience."
    ],
    category: "economy",
    categoryLabelKn: "ಜಲ ಕ್ರಾಂತಿ",
    categoryLabelEn: "Water Security",
    author: "Water Stewardship Wing",
    date: "Nov 30, 2025",
    readTime: "5 min read",
    featured: false,
    imageLabelKn: "ಕೆರೆ ಹೂಳೆತ್ತುವ ಕಾಮಗಾರಿ ಮತ್ತು ಜಲ ಸಂರಕ್ಷಣೆ",
    imageLabelEn: "Historical Lake Desilting & Watershed Project",
  },
  {
    slug: "youth-entrepreneurship-rural-skill-centers",
    titleKn: "ಗ್ರಾಮೀಣ ಕೌಶಲ್ಯ ಕೇಂದ್ರಗಳು: ಯುವಜನತೆಯ ಸ್ವಾವಲಂಬನೆ",
    titleEn: "Youth Entrepreneurship: Setting up Rural Vocational Skill Centers",
    excerptKn: "ಕಲಬುರಗಿಯ ಯುವಕರು ಉದ್ಯೋಗಕ್ಕಾಗಿ ವಲಸೆ ಹೋಗುವುದನ್ನು ತಡೆಗಟ್ಟಿ ಸ್ಥಳೀಯವಾಗಿಯೇ ಉದ್ಯೋಗ ಸೃಷ್ಟಿಸುವ ಯೋಜನೆ.",
    excerptEn: "Providing technical training, digital tools, and startup grants to halt youth distress migration from northern Karnataka.",
    contentKn: [
      "ನಮ್ಮ ಯುವಕರು ಪ್ರತಿಭಾವಂತರು. ಅವರಿಗೆ ಕೇವಲ ಅವಕಾಶ ಮತ್ತು ತರಬೇತಿಯ ಅಗತ್ಯವಿದೆ.",
      "ತಾಂತ್ರಿಕ ಕೌಶಲ್ಯ, ಡೇಟಾ ಎಂಟ್ರಿ, ಕೃಷಿ ಯಂತ್ರೋಪಕರಣ ರಿಪೇರಿ ಮತ್ತು ಆಹಾರ ಸಂಸ್ಕರಣಾ ತರಬೇತಿ ಕೇಂದ್ರಗಳನ್ನು ತೆರೆಯಲಾಗಿದೆ."
    ],
    contentEn: [
      "Our youth possess immense potential; what they need are modern skills and equitable market access.",
      "By launching vocational skill centers in drone agriculture, equipment mechanics, and IT basics, local youth are empowered to thrive locally."
    ],
    category: "education",
    categoryLabelKn: "ಯುವಶಕ್ತಿ",
    categoryLabelEn: "Youth & Jobs",
    author: "Employment Cell",
    date: "Nov 12, 2025",
    readTime: "4 min read",
    featured: false,
    imageLabelKn: "ಯುವ ಕೌಶಲ್ಯ ತರಬೇತಿ ಕೇಂದ್ರ",
    imageLabelEn: "Youth Vocational Training & Skill Hub",
  }
];

export const EVENTS_DATA: EventItem[] = [
  {
    id: "town-hall-aland-2026",
    titleKn: "ಆಳಂದ ತಾಲೂಕು ಸಾರ್ವಜನಿಕ ಜನಸಂಪರ್ಕ ಸಭೆ & ಕುಂದುಕೊರತೆ ವೇದಿಕೆ",
    titleEn: "Community Town Hall & Public Listening Forum",
    descKn: "ಆಳಂದ ಪಟ್ಟಣ ಹಾಗೂ ಸುತ್ತಮುತ್ತಲಿನ ಹಳ್ಳಿಗಳ ನಾಗರಿಕರ ಅಹವಾಲುಗಳನ್ನು ಆಲಿಸಲು ಮತ್ತು ಸ್ಥಳದಲ್ಲೇ ಪರಿಹಾರ ಕಂಡುಕೊಳ್ಳಲು ಮುಕ್ತ ಸಂವಾದ.",
    descEn: "Join Shri Harshanand Guttedar and district administration officials for an open listening discussion regarding civic priorities.",
    dateKn: "ನವೆಂಬರ್ 15, 2026",
    dateEn: "November 15, 2026",
    timeKn: "ಬೆಳಿಗ್ಗೆ 10:00 - ಮಧ್ಯಾಹ್ನ 1:00",
    timeEn: "10:00 AM - 1:00 PM",
    locationKn: "ತಾಲೂಕು ಪಂಚಾಯಿತಿ ಸಭಾಂಗಣ, ಆಳಂದ",
    locationEn: "Taluk Panchayat Auditorium, Aland",
    status: "upcoming",
    category: "townhall",
    imageLabelKn: "ಆಳಂದ ಸಾರ್ವಜನಿಕ ಸಭೆ ಮತ್ತು ಜನ ಸಂವಾದ",
    imageLabelEn: "Public Listening Forum & Citizen Discussion",
  },
  {
    id: "farmer-export-conference-2026",
    titleKn: "ಕಲಬುರಗಿ ತೊಗರಿ ಬೆಳೆಗಾರರ ಮಹಾಸಮಾವೇಶ & ರಫ್ತು ಕಾರ್ಯಾಗಾರ",
    titleEn: "Kalaburagi Red Gram Farmer Export Assembly",
    descKn: "ಕಲಬುರಗಿಯ ತೊಗರಿ ಬೆಳೆಗಾರರಿಗೆ ಜಿಐ ಟ್ಯಾಗ್ ರಫ್ತು ಮಾರ್ಗದರ್ಶನ, ಅಪೆಡಾ (APEDA) ನೋಂದಣಿ ಮತ್ತು ಬೆಂಬಲ ಬೆಲೆ ಖಾತ್ರಿ ಕಾರ್ಯಾಗಾರ.",
    descEn: "Interactive workshop for pulse growers and FPO heads on global export compliance, quality packing, and direct mandi linkage.",
    dateKn: "ಡಿಸೆಂಬರ್ 02, 2026",
    dateEn: "December 02, 2026",
    timeKn: "ಬೆಳಿಗ್ಗೆ 11:00 - ಸಂಜೆ 4:00",
    timeEn: "11:00 AM - 4:00 PM",
    locationKn: "ಕೃಷಿ ಮಾರುಕಟ್ಟೆ ಪ್ರಾಂಗಣ (APMC), ಕಲಬುರಗಿ",
    locationEn: "APMC Agricultural Yard, Kalaburagi",
    status: "upcoming",
    category: "farmer",
    imageLabelKn: "ತೊಗರಿ ಬೆಳೆಗಾರರ ಮಹಾಸಮಾವೇಶ",
    imageLabelEn: "Farmer Assembly & Export Guidance Workshop",
  },
  {
    id: "youth-leadership-conclave-2026",
    titleKn: "ಯುವ ನಾಯಕತ್ವ ಸಮಾವೇಶ & ಉಚಿತ ಸ್ಪರ್ಧಾತ್ಮಕ ಪರೀಕ್ಷಾ ಮಾರ್ಗದರ್ಶನ",
    titleEn: "Youth Leadership Conclave & Career Guidance Seminar",
    descKn: "ಯುವಜನರಿಗೆ ಕೆಪಿಎಸ್‌ಸಿ, ಯುಪಿಎಸ್‌ಸಿ ತರಬೇತಿ, ಉದ್ಯೋಗಾವಕಾಶ ಮತ್ತು ತಾಂತ್ರಿಕ ಕೌಶಲ್ಯಗಳ ಕುರಿತು ರಾಜ್ಯ ಮಟ್ಟದ ತಜ್ಞರಿಂದ ವಿಶೇಷ ಉಪನ್ಯಾಸ.",
    descEn: "Engage with civil service officers, tech educators, and youth leaders discussing competitive exam prep and local startup incubation.",
    dateKn: "ಡಿಸೆಂಬರ್ 18, 2026",
    dateEn: "December 18, 2026",
    timeKn: "ಮಧ್ಯಾಹ್ನ 2:00 - ಸಂಜೆ 6:00",
    timeEn: "2:00 PM - 6:00 PM",
    locationKn: "ಗುಲಬರ್ಗಾ ವಿಶ್ವವಿದ್ಯಾಲಯ ಸಭಾಂಗಣ, ಕಲಬುರಗಿ",
    locationEn: "Gulbarga University Auditorium, Kalaburagi",
    status: "upcoming",
    category: "youth",
    imageLabelKn: "ಯುವ ನಾಯಕತ್ವ ಸಮಾವೇಶ",
    imageLabelEn: "Youth Leadership & Career Conclave",
  },
  {
    id: "kalyana-karnataka-rally-completed",
    titleKn: "ಕಲ್ಯಾಣ ಕರ್ನಾಟಕ ಪ್ರಜಾ ಸಂಕಲ್ಪ ಸಮಾವೇಶ & ಅಭಿವೃದ್ಧಿ ಘೋಷಣೆ",
    titleEn: "Kalyana Karnataka Public Declaration Rally",
    descKn: "ಕಲಬುರಗಿ ಮತ್ತು ಆಳಂದ ತಾಲೂಕಿನ ಸಮಗ್ರ ನೀರಾವರಿ ಮತ್ತು ಕೈಗಾರಿಕಾ ಅಭಿವೃದ್ಧಿಗಾಗಿ ಹರ್ಷಾನಂದ ಗುತ್ತೇದಾರ ನೇತೃತ್ವದಲ್ಲಿ ನಡೆದ ಬೃಹತ್ ಸಮಾವೇಶ.",
    descEn: "Comprehensive public address presenting our region's developmental roadmap, farmer security bills, and youth job initiatives.",
    dateKn: "ಅಕ್ಟೋಬರ್ 10, 2026",
    dateEn: "October 10, 2026",
    timeKn: "ಸಂಜೆ 4:30 - ರಾತ್ರಿ 8:00",
    timeEn: "4:30 PM - 8:00 PM",
    locationKn: "ಸರ್ದಾರ್ ವಲ್ಲಭಭಾಯಿ ಪಟೇಲ್ ವೃತ್ತ ಮೈದಾನ, ಕಲಬುರಗಿ",
    locationEn: "Sardar Vallabhbhai Patel Stadium, Kalaburagi",
    status: "completed",
    category: "rally",
    imageLabelKn: "ಪ್ರಜಾ ಸಂಕಲ್ಪ ಸಮಾವೇಶದಲ್ಲಿ ಸಾರ್ವಜನಿಕ ಭಾಷಣ",
    imageLabelEn: "Public Address at Citizen Rally",
  }
];

export const PUBLIC_WORKS_DATA: PublicWorkItem[] = [
  {
    id: "pw-roads",
    titleKn: "ಆಳಂದ ಗ್ರಾಮೀಣ ಸರ್ವಋತು ರಸ್ತೆ ಸಂಪರ್ಕ ಕಾಮಗಾರಿ",
    titleEn: "Aland All-Weather Rural Road Connectivity Project",
    categoryKn: "ಮೂಲಸೌಕರ್ಯ",
    categoryEn: "Infrastructure",
    locationKn: "ಆಳಂದ ತಾಲೂಕಿನ 38 ಹಳ್ಳಿಗಳು",
    locationEn: "38 Villages across Aland Taluk",
    beneficiariesKn: "45,000+ ಗ್ರಾಮಸ್ಥರು",
    beneficiariesEn: "45,000+ Rural Residents",
    descKn: "ಮಳೆಗಾಲದಲ್ಲೂ ರೈತರು ಮತ್ತು ಶಾಲಾ ಮಕ್ಕಳು ಸುಲಭವಾಗಿ ಸಂಚರಿಸಲು 120 ಕಿ.ಮೀ ಡಾಂಬರು ರಸ್ತೆಗಳು ಮತ್ತು ಸಣ್ಣ ಸೇತುವೆಗಳ ನಿರ್ಮಾಣ.",
    descEn: "Constructing 120 km of all-weather asphalt roadways and cross-drainage bridges connecting remote farmlands to taluk centers.",
    statusKn: "ಪೂರ್ಣಗೊಂಡಿದೆ",
    statusEn: "Completed",
    statNumber: "120 km",
    statLabelKn: "ನಿರ್ಮಿಸಿದ ರಸ್ತೆ",
    statLabelEn: "Roadways Built",
  },
  {
    id: "pw-water",
    titleKn: "ಶುದ್ಧ ಕುಡಿಯುವ ನೀರಿನ ಆರ್‌ಒ ಘಟಕಗಳ ಜಾಲ",
    titleEn: "Clean RO Drinking Water Plants Installation",
    categoryKn: "ಕುಡಿಯುವ ನೀರು",
    categoryEn: "Clean Water",
    locationKn: "ಆಳಂದ ಮತ್ತು ಕಲಬುರಗಿ ಗ್ರಾಮಾಂತರ",
    locationEn: "Aland & Rural Kalaburagi",
    beneficiariesKn: "60,000+ ಕುಟುಂಬಗಳು",
    beneficiariesEn: "60,000+ Families",
    descKn: "ಫ್ಲೋರೈಡ್ ಮುಕ್ತ ಶುದ್ಧ ಕುಡಿಯುವ ನೀರು ಒದಗಿಸಲು 50ಕ್ಕೂ ಹೆಚ್ಚು ಹಳ್ಳಿಗಳಲ್ಲಿ 24/7 ಕಿಯೋಸ್ಕ್ ಆರ್‌ಒ ಘಟಕಗಳ ಸ್ಥಾಪನೆ.",
    descEn: "Installing automated RO water filtration units across 50+ fluoride-affected hamlets, eliminating waterborne diseases.",
    statusKn: "ಸಕ್ರಿಯ ಸೇವೆ",
    statusEn: "Operational",
    statNumber: "52 Plants",
    statLabelKn: "ಶುದ್ಧ ನೀರಿನ ಘಟಕಗಳು",
    statLabelEn: "RO Units Installed",
  },
  {
    id: "pw-lake",
    titleKn: "ಪುರಾತನ ಕೆರೆಗಳ ಹೂಳೆತ್ತುವಿಕೆ & ಅಂತರ್ಜಲ ಮರುಪೂರಣ",
    titleEn: "Historic Irrigation Lake Desilting & Recharging",
    categoryKn: "ಜಲ ಸಂರಕ್ಷಣೆ",
    categoryEn: "Water Conservation",
    locationKn: "ಖಜೂರಿ, ನಿಂಬರ್ಗಾ, ಮಾದನಹಿಪ್ಪರಗಾ",
    locationEn: "Khajuri, Nimbaraga, Madan Hipparga",
    beneficiariesKn: "12,000+ ರೈತರು",
    beneficiariesEn: "12,000+ Farmers",
    descKn: "42 ಕೆರೆಗಳ ಹೂಳೆತ್ತುವ ಮೂಲಕ ಮಳೆ ನೀರು ಸಂಗ್ರಹಣಾ ಸಾಮರ್ಥ್ಯವನ್ನು ದ್ವಿಗುಣಗೊಳಿಸಿ, ಬೋರ್‌ವೆಲ್‌ಗಳಲ್ಲಿ ಅಂತರ್ಜಲ ಹೆಚ್ಚಿಸಲಾಗಿದೆ.",
    descEn: "Desilting 42 historic percolation tanks, doubling seasonal water retention and replenishing thousands of agricultural borewells.",
    statusKn: "ಪೂರ್ಣಗೊಂಡಿದೆ",
    statusEn: "Completed",
    statNumber: "42 Lakes",
    statLabelKn: "ಪುನಶ್ಚೇತನಗೊಂಡ ಕೆರೆಗಳು",
    statLabelEn: "Lakes Rejuvenated",
  },
  {
    id: "pw-health",
    titleKn: "ಸಂಚಾರಿ ಆರೋಗ್ಯ ಚಿಕಿತ್ಸಾಲಯ & ಉಚಿತ ತಪಾಸಣೆ ಶಿಬಿರಗಳು",
    titleEn: "Mobile Medical Clinics & Village Health Screenings",
    categoryKn: "ಆರೋಗ್ಯ",
    categoryEn: "Public Health",
    locationKn: "ಗ್ರಾಮೀಣ ಆಳಂದ ಮತ್ತು ಕಲಬುರಗಿ",
    locationEn: "Rural Aland & Outlying Hamlets",
    beneficiariesKn: "28,000+ ರೋಗಿಗಳು",
    beneficiariesEn: "28,000+ Citizens Treated",
    descKn: "ಉಚಿತ ಇಸಿಜಿ, ರಕ್ತ ಪರೀಕ್ಷೆ, ನೇತ್ರ ಚಿಕಿತ್ಸೆ ಮತ್ತು ಉಚಿತ ಔಷಧಿ ವಿತರಣೆಯೊಂದಿಗೆ 120ಕ್ಕೂ ಹೆಚ್ಚು ಆರೋಗ್ಯ ಶಿಬಿರಗಳ ಆಯೋಜನೆ.",
    descEn: "Deploying doctor-staffed mobile diagnostic vans conducting 120+ village camps with free medicines, eye checks, and lab tests.",
    statusKn: "ನಿರಂತರ ಯೋಜನೆ",
    statusEn: "Active Program",
    statNumber: "120+ Camps",
    statLabelKn: "ಉಚಿತ ಶಿಬಿರಗಳು",
    statLabelEn: "Health Camps Held",
  },
  {
    id: "pw-tur-hub",
    titleKn: "ಕಲಬುರಗಿ ತೊಗರಿ ರೈತ ರಫ್ತು & ಶೇಖರಣಾ ಗೋದಾಮುಗಳು",
    titleEn: "GI Tur Dal Warehousing & Farmer Export Hub",
    categoryKn: "ಕೃಷಿ ರಫ್ತು",
    categoryEn: "Agriculture",
    locationKn: "ಆಳಂದ - ಕಲಬುರಗಿ ಕಾರಿಡಾರ್",
    locationEn: "Aland - Kalaburagi Hub",
    beneficiariesKn: "8,500+ ತೊಗರಿ ಬೆಳೆಗಾರರು",
    beneficiariesEn: "8,500+ Pulse Farmers",
    descKn: "ರೈತರು ತಮ್ಮ ಬೆಳೆಯನ್ನು ಸುರಕ್ಷಿತವಾಗಿ ಶೇಖರಿಸಿ ಉತ್ತಮ ಬೆಲೆ ಬಂದಾಗ ಮಾರಾಟ ಮಾಡಲು ಅನುಕೂಲವಾಗುವಂತೆ ಸೋಲಾರ್ ಶೀತಲ ಗೋದಾಮುಗಳ ನಿರ್ಮಾಣ.",
    descEn: "State-of-the-art solar powered pulse warehousing clusters allowing smallholders to store harvests and sell at peak global market rates.",
    statusKn: "ಪ್ರಗತಿಯಲ್ಲಿದೆ",
    statusEn: "In Progress",
    statNumber: "10,000 MT",
    statLabelKn: "ಶೇಖರಣಾ ಸಾಮರ್ಥ್ಯ",
    statLabelEn: "Storage Capacity",
  },
  {
    id: "pw-library",
    titleKn: "ಸ್ಪರ್ಧಾತ್ಮಕ ಪರೀಕ್ಷಾ ಡಿಜಿಟಲ್ ಗ್ರಂಥಾಲಯಗಳು",
    titleEn: "Smart Digital Study Libraries & Youth Coaching",
    categoryKn: "ಶಿಕ್ಷಣ",
    categoryEn: "Education",
    locationKn: "ಆಳಂದ ಪಟ್ಟಣ & ಪ್ರಮುಖ ಹೋಬಳಿಗಳು",
    locationEn: "Aland Town & Hobli Centers",
    beneficiariesKn: "4,200+ ಯುವಜನತೆ",
    beneficiariesEn: "4,200+ Aspirants",
    descKn: "ಉನ್ನತ ಪರೀಕ್ಷೆಗಳ ಪುಸ್ತಕಗಳು, ಕಂಪ್ಯೂಟರ್‌ಗಳು ಮತ್ತು ಉಚಿತ ಇಂಟರ್ನೆಟ್ ಹೊಂದಿರುವ ಹೈಟೆಕ್ ಗ್ರಂಥಾಲಯಗಳು.",
    descEn: "Equipping youth study centers with high-speed internet, competitive exam reference literature, and mentor classrooms.",
    statusKn: "ಸಕ್ರಿಯ ಸೇವೆ",
    statusEn: "Operational",
    statNumber: "8 Centers",
    statLabelKn: "ಡಿಜಿಟಲ್ ಗ್ರಂಥಾಲಯಗಳು",
    statLabelEn: "Libraries Running",
  }
];

