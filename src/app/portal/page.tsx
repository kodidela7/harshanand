"use client";

import React, { useEffect, useState, useMemo } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useLanguage } from "@/context/LanguageContext";
import { 
  Menu,
  Bell,
  Search,
  X,
  Check,
  Copy,
  Printer,
  ChevronRight,
  Award,
  ShieldCheck,
  HeartHandshake,
  FileText,
  Sprout,
  Building2,
  GraduationCap,
  Users,
  Droplets,
  Calendar,
  MessageSquare,
  PhoneCall,
  Sparkles,
  Image as ImageIcon,
  CheckCircle2,
  LogOut,
  IdCard,
  MapPin,
  User,
  Clock,
  Home,
  Grid,
  Phone,
  AlertCircle,
  ExternalLink,
  Info,
  BookOpen,
  Plus,
  Send,
  RefreshCw
} from "lucide-react";

interface FarmerRequestItem {
  id: number;
  name: string;
  email: string | null;
  phone: string;
  location: string;
  message: string;
  source: string;
  status: "new" | "in_progress" | "contacted" | "resolved";
  admin_notes: string | null;
  created_at_formatted: string;
  created_at: string;
}

interface CitizenConcern {
  id: number;
  tracking_id: string;
  citizen_name: string;
  mobile: string;
  village_name: string;
  taluk: string;
  pincode: string;
  category: string;
  urgency: string;
  title: string;
  description: string;
  status: "submitted" | "under_review" | "in_progress" | "resolved" | "rejected";
  assigned_to: string | null;
  admin_remarks: string | null;
  created_at: string;
  updated_at: string;
}

interface MembershipData {
  id: number;
  membership_id: string;
  full_name: string;
  mobile: string;
  email: string | null;
  age: number | null;
  village: string;
  taluk: string;
  district: string;
  pincode: string;
  interest: string;
  suggestion: string | null;
  status: string;
  created_at: string;
}

interface LiveEvent {
  id: number;
  title_kn: string;
  title_en: string;
  description_kn: string | null;
  description_en: string | null;
  event_date: string;
  start_time: string;
  end_time: string | null;
  location_kn: string;
  location_en: string;
  category: string;
  status: string;
  banner_url: string | null;
  contact_person: string | null;
  contact_phone: string | null;
}

interface LiveArticle {
  id: number;
  title_kn: string;
  title_en: string;
  summary_kn: string | null;
  summary_en: string | null;
  category: string;
  author: string;
  read_time: string;
  views_count: number;
  published_at: string;
}

function parseEventDate(dateStr: string) {
  try {
    const d = new Date(dateStr);
    const monthNamesEn = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];
    const monthNamesKn = ["ಜನ", "ಫೆಬ್ರ", "ಮಾರ್ಚ್", "ಏಪ್ರಿ", "ಮೇ", "ಜೂನ್", "ಜುಲೈ", "ಆಗ", "ಸೆಪ್ಟೆಂ", "ಅಕ್ಟೋ", "ನವೆಂ", "ಡಿಸೆಂ"];
    const dayNamesEn = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    const dayNamesKn = ["ಭಾನು", "ಸೋಮ", "ಮಂಗಳ", "ಬುಧ", "ಗುರು", "ಶುಕ್ರ", "ಶನಿ"];
    const mIdx = d.getMonth();
    const day = String(d.getDate()).padStart(2, "0");
    const dow = d.getDay();
    return {
      monthEn: monthNamesEn[mIdx] || "EVT",
      monthKn: monthNamesKn[mIdx] || "ದಿನ",
      day,
      dayNameEn: dayNamesEn[dow] || "",
      dayNameKn: dayNamesKn[dow] || "",
    };
  } catch {
    return { monthEn: "EVT", monthKn: "ದಿನ", day: "01", dayNameEn: "", dayNameKn: "" };
  }
}

export default function UserPortalPage() {
  const { language, setLanguage } = useLanguage();
  const router = useRouter();

  // Authentication & Session State
  const [user, setUser] = useState<{
    id: number;
    mobile: string;
    role: string;
    preferred_language: string;
  } | null>(null);

  const [membership, setMembership] = useState<MembershipData | null>(null);
  const [hasMembership, setHasMembership] = useState(false);
  const [loading, setLoading] = useState(true);
  const [loggingOut, setLoggingOut] = useState(false);
  const [copiedId, setCopiedId] = useState(false);

  // Search & Active Modals
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedService, setSelectedService] = useState<any | null>(null);
  const [showCardModal, setShowCardModal] = useState(false);
  const [showRegModal, setShowRegModal] = useState(false);
  const [showNotificationModal, setShowNotificationModal] = useState(false);
  const [showHelplineModal, setShowHelplineModal] = useState(false);
  const [activeTab, setActiveTab] = useState<"home" | "services" | "card" | "events" | "contact">("home");

  // Live Database Events & Articles
  const [liveEvents, setLiveEvents] = useState<LiveEvent[]>([]);
  const [liveArticles, setLiveArticles] = useState<LiveArticle[]>([]);

  // Citizen Grievances & Concern Status State
  const [citizenConcerns, setCitizenConcerns] = useState<CitizenConcern[]>([]);
  const [showGrievanceModal, setShowGrievanceModal] = useState(false);
  const [grievanceFormData, setGrievanceFormData] = useState({
    citizen_name: "",
    mobile: "",
    village_name: "",
    taluk: "Aland",
    pincode: "585302",
    category: "Roads & Infrastructure",
    urgency: "medium",
    title: "",
    description: "",
  });
  const [submittingGrievance, setSubmittingGrievance] = useState(false);
  const [grievanceError, setGrievanceError] = useState("");
  const [grievanceSuccess, setGrievanceSuccess] = useState<{ tracking_id: string } | null>(null);
  const [copiedGrievanceId, setCopiedGrievanceId] = useState<string | null>(null);

  // Farmer Advisory & Inquiry Requests State
  const [farmerRequests, setFarmerRequests] = useState<FarmerRequestItem[]>([]);
  const [activeRequestTab, setActiveRequestTab] = useState<"concerns" | "farmers">("concerns");
  const [showFarmerModal, setShowFarmerModal] = useState(false);
  const [showComingSoonModal, setShowComingSoonModal] = useState(false);
  const [comingSoonFeature, setComingSoonFeature] = useState<{
    titleKn: string;
    titleEn: string;
    descKn: string;
    descEn: string;
  }>({
    titleKn: "ಭಾವಚಿತ್ರ ಮತ್ತು ವೀಡಿಯೊ ಸಂಪುಟ",
    titleEn: "Photo & Video Archives",
    descKn: "ಶ್ರೀ ಹರ್ಷಾನಂದ ಗುತ್ತೇದಾರರ ಜನಸಂಪರ್ಕ ಯಾತ್ರೆ, ಗ್ರಾಮ ವಾಸ್ತವ್ಯ ಮತ್ತು ಅಭಿವೃದ್ಧಿ ಕಾಮಗಾರಿಗಳ ಹೈ-ಡೆಫಿನಿಷನ್ ಚಿತ್ರ ಸಂಪುಟ ಶೀಘ್ರದಲ್ಲೇ ಲಭ್ಯವಾಗಲಿದೆ.",
    descEn: "High-definition photo archives of grassroots public tours, village visits, and constituency development works are currently being cataloged.",
  });
  const [farmerFormData, setFarmerFormData] = useState({
    name: "",
    phone: "",
    location: "Aland, Kalaburagi",
    message: "",
  });
  const [submittingFarmer, setSubmittingFarmer] = useState(false);
  const [farmerError, setFarmerError] = useState("");
  const [farmerSuccess, setFarmerSuccess] = useState(false);

  // Quick Tracking Search
  const [trackingQuery, setTrackingQuery] = useState("");
  const [trackingResult, setTrackingResult] = useState<CitizenConcern | null>(null);
  const [isSearchingTracking, setIsSearchingTracking] = useState(false);
  const [trackingError, setTrackingError] = useState("");

  // Registration Form State
  const [formData, setFormData] = useState({
    full_name: "",
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
  const [regError, setRegError] = useState("");

  const interestOptions = [
    { id: "Public Service Activities", kn: "ಜನಸೇವಾ ಚಟುವಟಿಕೆಗಳು", en: "Public Service Activities" },
    { id: "Local Issues and Suggestions", kn: "ಸ್ಥಳೀಯ ಸಮಸ್ಯೆಗಳು ಮತ್ತು ಸಲಹೆಗಳು", en: "Local Issues and Suggestions" },
    { id: "Youth Programs", kn: "ಯುವಜನರ ಕಾರ್ಯಕ್ರಮಗಳು", en: "Youth Programs" },
    { id: "Education and Employment-related Activities", kn: "ಶಿಕ್ಷಣ ಮತ್ತು ಉದ್ಯೋಗ ಸಂಬಂಧಿತ ಚಟುವಟಿಕೆಗಳು", en: "Education & Employment" },
    { id: "Village / Ward-level Coordinator", kn: "ಗ್ರಾಮ ಅಥವಾ ವಾರ್ಡ್ ಮಟ್ಟದಲ್ಲಿನ ಕಾರ್ಯಕರ್ತ", en: "Village / Ward Coordinator" },
    { id: "Volunteer", kn: "ಪೂರ್ಣಪ್ರಮಾಣದ ಸ್ವಯಂಸೇವಕ", en: "Full-time Volunteer" },
    { id: "Other", kn: "ಇತರೆ", en: "Other" },
  ];

  // Quick Access Services (Streamlined active services & coming soon badges)
  const quickAccessServices = [
    {
      id: "card",
      titleKn: "ಸದಸ್ಯತ್ವ ಕಾರ್ಡ್",
      titleEn: "Digital ID",
      subKn: "ಗುರುತಿನ ಚೀಟಿ",
      subEn: "View & save ID",
      icon: IdCard,
      color: "bg-purple-100 text-purple-600",
      badge: hasMembership ? "ACTIVE" : "NEW",
      badgeColor: "bg-purple-100 text-purple-700",
    },
    {
      id: "grievance",
      titleKn: "ಕುಂದುಕೊರತೆ",
      titleEn: "Grievance",
      subKn: "ಅರ್ಜಿ ಸಲ್ಲಿಕೆ",
      subEn: "File petition",
      icon: FileText,
      color: "bg-rose-100 text-rose-600",
      descKn: "ನಿಮ್ಮ ಗ್ರಾಮದ ರಸ್ತೆ, ಕುಡಿಯುವ ನೀರು ಅಥವಾ ವಿದ್ಯುತ್ ಸಮಸ್ಯೆಗಳನ್ನು ದಾಖಲಿಸಿ, ಪರಿಹಾರವನ್ನು ಆನ್‌ಲೈನ್‌ನಲ್ಲಿ ಟ್ರ್ಯಾಕ್ ಮಾಡಿ.",
      descEn: "Register civic concerns regarding roads, drinking water, or electricity and track resolution progress directly.",
      contact: "+91 8472 250148",
    },
    {
      id: "export",
      titleKn: "ತೊಗರಿ ರಫ್ತು & ಕೃಷಿ",
      titleEn: "Tur & Farmer Desk",
      subKn: "ರೈತ ಸಲಹಾ ಕೇಂದ್ರ",
      subEn: "Farmer advisory",
      icon: Sprout,
      color: "bg-amber-100 text-amber-600",
      badge: "ACTIVE",
      badgeColor: "bg-amber-100 text-amber-800",
      descKn: "ಕಲಬುರಗಿಯ ಜಿಐ-ಟ್ಯಾಗ್ ತೊಗರಿ ನೇರ ರಫ್ತು, ಮಧ್ಯವರ್ತಿ ಮುಕ್ತ ಬೆಲೆ ಮತ್ತು ಸೌರ ಶೀತಲೀಕರಣ ಘಟಕಗಳ ಮಾಹಿತಿ.",
      descEn: "Assistance on GI-tagged red gram export, direct fair pricing, mobile soil testing, and solar cold storage.",
      contact: "+91 8472 250149",
    },
    {
      id: "events",
      titleKn: "ಕಾರ್ಯಕ್ರಮ",
      titleEn: "Public Events",
      subKn: "ಸಮಾವೇಶಗಳು",
      subEn: "Schedules & rallies",
      icon: Calendar,
      color: "bg-orange-100 text-orange-600",
      descKn: "ಆಳಂದ ಮತ್ತು ಕಲಬುರಗಿಯಲ್ಲಿ ನಡೆಯುವ ಸಾರ್ವಜನಿಕ ಕಾರ್ಯಕ್ರಮಗಳು, ಉದ್ಘಾಟನೆಗಳು ಮತ್ತು ಕೃಷಿ ಮೇಳಗಳು.",
      descEn: "Public rallies, community inaugurations, health camps, and cultural events in Aland constituency.",
      contact: "+91 8472 250154",
    },
    {
      id: "articles",
      titleKn: "ಲೇಖನಗಳು",
      titleEn: "Articles & Media",
      subKn: "ಧೋರಣಾ ಒಳನೋಟ",
      subEn: "Insights & Press",
      icon: BookOpen,
      color: "bg-blue-100 text-blue-700",
      badge: "NEW",
      badgeColor: "bg-blue-100 text-blue-800",
      descKn: "ಶ್ರೀ ಹರ್ಷಾನಂದ ಗುತ್ತೇದಾರ ಅವರ ಲೇಖನಗಳು, ನೀತಿ ಒಳನೋಟಗಳು ಮತ್ತು ಕ್ಷೇತ್ರ ಅಭಿವೃದ್ಧಿ ಬರಹಗಳು.",
      descEn: "Official articles, developmental perspectives, and policy commentary for Aland constituency.",
      contact: "+91 8472 250150",
    },
    {
      id: "chatbox",
      titleKn: "ಸಹಾಯವಾಣಿ",
      titleEn: "Secretariat Desk",
      subKn: "ಕಚೇರಿ ಸಂಪರ್ಕ",
      subEn: "Direct helpline",
      icon: PhoneCall,
      color: "bg-emerald-100 text-emerald-600",
      descKn: "ಶ್ರೀ ಹರ್ಷಾನಂದ ಗುತ್ತೇದಾರ ಸಾರ್ವಜನಿಕ ಕಚೇರಿಯ ಅಧಿಕೃತ ವಾಟ್ಸಾಪ್ ಮತ್ತು ದೂರವಾಣಿ ಸಹಾಯವಾಣಿ ಸಂಪರ್ಕಿಸಿ.",
      descEn: "Official secretariat communication desk for fast-track queries, emergency assistance, and public support.",
      contact: "+91 8472 250148",
    },
    {
      id: "track",
      titleKn: "ಅರ್ಜಿಗಳ ಸ್ಥಿತಿ",
      titleEn: "Track Status",
      subKn: "ಪ್ರಗತಿ ಪರಿಶೀಲನೆ",
      subEn: "Live status check",
      icon: CheckCircle2,
      color: "bg-teal-100 text-teal-700",
      descKn: "ನಿಮ್ಮ ಕುಂದುಕೊರತೆ ಅರ್ಜಿಗಳು ಮತ್ತು ಕೃಷಿ ಸಮಾಲೋಚನೆ ವಿನಂತಿಗಳ ನೈಜ ಸಮಯದ ಸ್ಥಿತಿ ಪರಿಶೀಲಿಸಿ.",
      descEn: "Check real-time status of your submitted petitions and farmer advisory requests.",
      contact: "+91 8472 250148",
    },
    {
      id: "gallery",
      titleKn: "ಭಾವಚಿತ್ರಗಳು",
      titleEn: "Photo Gallery",
      subKn: "ಸೇವಾ ಕ್ಷಣಗಳು",
      subEn: "Public moments",
      icon: ImageIcon,
      color: "bg-indigo-100 text-indigo-700",
      badge: "SOON",
      badgeColor: "bg-indigo-100 text-indigo-800",
      descKn: "ಶ್ರೀ ಹರ್ಷಾನಂದ ಗುತ್ತೇದಾರರ ಜನಸಂಪರ್ಕ ಯಾತ್ರೆ, ಗ್ರಾಮ ವಾಸ್ತವ್ಯ ಮತ್ತು ಅಭಿವೃದ್ಧಿ ಕಾಮಗಾರಿಗಳ ಚಿತ್ರ ಸಂಪುಟ.",
      descEn: "Photo archives of grassroots tours, public darbar moments, constituency inaugurations, and community visits.",
      contact: "+91 8472 250148",
    },
  ];

  // Upcoming Events list
  const upcomingEvents = [
    {
      id: "ev-1",
      monthKn: "ಮೇ",
      monthEn: "MAY",
      day: "24",
      dayNameKn: "ಶುಕ್ರ",
      dayNameEn: "Fri",
      color: "bg-indigo-50 text-indigo-700 border-indigo-200",
      titleKn: "ಆಳಂದ ತೊಗರಿ ಬೆಳೆಗಾರರ ರಫ್ತು ಸಮಾಲೋಚನಾ ಸಭೆ",
      titleEn: "Aland Farmers & GI Tur Dal Advisory Meet",
      time: "10:00 AM - 01:00 PM",
      locationKn: "ಎಪಿಎಂಸಿ ಸಭಾಂಗಣ, ಆಳಂದ",
      locationEn: "APMC Yard Auditorium, Aland",
      statusKn: "ಮುಂಬರುವ",
      statusEn: "Upcoming",
      statusColor: "bg-indigo-50 text-indigo-700",
    },
    {
      id: "ev-2",
      monthKn: "ಮೇ",
      monthEn: "MAY",
      day: "28",
      dayNameKn: "ಮಂಗಳ",
      dayNameEn: "Tue",
      color: "bg-orange-50 text-orange-700 border-orange-200",
      titleKn: "ಸಾರ್ವಜನಿಕ ಕುಂದುಕೊರತೆ ಜನತಾ ದರ್ಶನ",
      titleEn: "Public Grievance Darshan & Hearing Day",
      time: "09:30 AM - 02:00 PM",
      locationKn: "ಸಾರ್ವಜನಿಕ ಕಚೇರಿ, ಮುಖ್ಯ ರಸ್ತೆ, ಆಳಂದ",
      locationEn: "Constituency Public Office, Aland",
      statusKn: "ನಿಗದಿತ",
      statusEn: "Scheduled",
      statusColor: "bg-orange-50 text-orange-700",
    },
    {
      id: "ev-3",
      monthKn: "ಜೂನ್",
      monthEn: "JUN",
      day: "05",
      dayNameKn: "ಗುರು",
      dayNameEn: "Thu",
      color: "bg-emerald-50 text-emerald-700 border-emerald-200",
      titleKn: "ಯುವಜನ ಉದ್ಯೋಗ & ಕೌಶಲ್ಯ ಮಾರ್ಗದರ್ಶನ ಶಿಬಿರ",
      titleEn: "Youth Employment & Career Skill Drive",
      time: "11:00 AM - 03:30 PM",
      locationKn: "ಡಾ. ಬಿ.ಆರ್. ಅಂಬೇಡ್ಕರ್ ಭವನ, ಆಳಂದ",
      locationEn: "Dr. B.R. Ambedkar Bhavan, Aland",
      statusKn: "ನೋಂದಣಿ ಆರಂಭ",
      statusEn: "Open",
      statusColor: "bg-emerald-50 text-emerald-700",
    },
  ];

  // Load Session and Membership securely via JWT
  useEffect(() => {
    async function loadPortalData() {
      try {
        const authRes = await fetch("/api/auth/me");
        const authData = await authRes.json();
        if (!authRes.ok || !authData.authenticated) {
          router.push("/login");
          return;
        }
        setUser(authData.user);

        const memRes = await fetch("/api/portal/membership");
        const memData = await memRes.json();
        if (memData.success && memData.hasMembership) {
          setHasMembership(true);
          setMembership(memData.membership);
        } else {
          setHasMembership(false);
        }

        // Fetch live database events for citizen portal
        try {
          const evtRes = await fetch("/api/events?limit=4&status=upcoming");
          const evtData = await evtRes.json();
          if (evtData.success && Array.isArray(evtData.events)) {
            setLiveEvents(evtData.events);
          }
        } catch (evtErr) {
          console.error("Live events load error:", evtErr);
        }

        // Fetch live database articles for citizen portal
        try {
          const artRes = await fetch("/api/articles?limit=3&status=published");
          const artData = await artRes.json();
          if (artData.success && Array.isArray(artData.articles)) {
            setLiveArticles(artData.articles);
          }
        } catch (artErr) {
          console.error("Live articles load error:", artErr);
        }

        // Fetch citizen's submitted concerns / grievances & farmer requests
        try {
          const cnRes = await fetch("/api/portal/concerns");
          const cnData = await cnRes.json();
          if (cnData.success) {
            if (Array.isArray(cnData.concerns)) {
              setCitizenConcerns(cnData.concerns);
            }
            if (Array.isArray(cnData.farmerRequests)) {
              setFarmerRequests(cnData.farmerRequests);
            }
          }
        } catch (cnErr) {
          console.error("Live concerns load error:", cnErr);
        }
      } catch (err) {
        console.error("Portal load error:", err);
        router.push("/login");
      } finally {
        setLoading(false);
      }
    }

    loadPortalData();
  }, [router]);

  const refreshConcerns = async () => {
    try {
      const cnRes = await fetch("/api/portal/concerns");
      const cnData = await cnRes.json();
      if (cnData.success) {
        if (Array.isArray(cnData.concerns)) {
          setCitizenConcerns(cnData.concerns);
        }
        if (Array.isArray(cnData.farmerRequests)) {
          setFarmerRequests(cnData.farmerRequests);
        }
      }
    } catch (e) {
      console.error("Error refreshing concerns:", e);
    }
  };

  const handleOpenFarmerModal = () => {
    setFarmerFormData({
      name: membership?.full_name || "",
      phone: user?.mobile || "",
      location: membership ? `${membership.village}, ${membership.taluk}` : "Aland, Kalaburagi",
      message: "",
    });
    setFarmerError("");
    setFarmerSuccess(false);
    setShowFarmerModal(true);
  };

  const handleFarmerSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFarmerError("");

    if (!farmerFormData.name.trim()) {
      setFarmerError(language === "kn" ? "ದಯವಿಟ್ಟು ನಿಮ್ಮ ಹೆಸರನ್ನು ನಮೂದಿಸಿ." : "Please enter your full name.");
      return;
    }
    if (!farmerFormData.message.trim()) {
      setFarmerError(
        language === "kn"
          ? "ದಯವಿಟ್ಟು ನಿಮ್ಮ ಕೃಷಿ ಅಥವಾ ತೊಗರಿ ಬೆಳೆ ಪ್ರಶ್ನೆ / ಬೇಡಿಕೆಯನ್ನು ನಮೂದಿಸಿ."
          : "Please describe your advisory question or request."
      );
      return;
    }

    setSubmittingFarmer(true);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: farmerFormData.name.trim(),
          phone: farmerFormData.phone.trim() || user?.mobile || "",
          location: farmerFormData.location.trim() || "Aland, Kalaburagi",
          message: farmerFormData.message.trim(),
          source: "farmers_page",
        }),
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.message || "Failed to submit farmer enquiry.");
      }

      setFarmerSuccess(true);
      refreshConcerns();
    } catch (err: any) {
      setFarmerError(err.message || "Failed to submit inquiry.");
    } finally {
      setSubmittingFarmer(false);
    }
  };

  const handleOpenGrievanceModal = () => {
    setGrievanceFormData({
      citizen_name: membership?.full_name || "",
      mobile: user?.mobile || "",
      village_name: membership?.village || "",
      taluk: membership?.taluk || "Aland",
      pincode: membership?.pincode || "585302",
      category: "Roads & Infrastructure",
      urgency: "medium",
      title: "",
      description: "",
    });
    setGrievanceError("");
    setGrievanceSuccess(null);
    setShowGrievanceModal(true);
  };

  const handleGrievanceSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setGrievanceError("");

    if (!grievanceFormData.citizen_name.trim()) {
      setGrievanceError(language === "kn" ? "ದಯವಿಟ್ಟು ನಿಮ್ಮ ಹೆಸರನ್ನು ನಮೂದಿಸಿ." : "Please enter your full name.");
      return;
    }
    if (!grievanceFormData.title.trim() || !grievanceFormData.description.trim()) {
      setGrievanceError(language === "kn" ? "ದಯವಿಟ್ಟು ಅರ್ಜಿಯ ವಿಷಯ ಮತ್ತು ವಿವರಗಳನ್ನು ನಮೂದಿಸಿ." : "Please enter the title and description of your concern.");
      return;
    }

    setSubmittingGrievance(true);
    try {
      const res = await fetch("/api/concerns", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...grievanceFormData,
          village: grievanceFormData.village_name || "Aland",
          village_name: grievanceFormData.village_name || "Aland",
          mobile: grievanceFormData.mobile || user?.mobile || "",
        }),
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.message || "Failed to submit grievance.");
      }

      setGrievanceSuccess({ tracking_id: data.tracking_id });
      refreshConcerns();
    } catch (err: any) {
      setGrievanceError(err.message || "Failed to submit grievance.");
    } finally {
      setSubmittingGrievance(false);
    }
  };

  const handleTrackSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!trackingQuery.trim()) return;
    setIsSearchingTracking(true);
    setTrackingError("");
    setTrackingResult(null);

    try {
      const res = await fetch(`/api/concerns?tracking_id=${encodeURIComponent(trackingQuery.trim())}`);
      const data = await res.json();
      if (!res.ok || !data.success || !data.concern) {
        setTrackingError(language === "kn" ? "ಈ ಅರ್ಜಿ ಸಂಖ್ಯೆ ಕಂಡುಬಂದಿಲ್ಲ. ದಯವಿಟ್ಟು ಸರಿಯಾದ ಅರ್ಜಿ ಸಂಖ್ಯೆ ನಮೂದಿಸಿ." : "Tracking ID not found. Please verify the ID.");
        return;
      }
      setTrackingResult(data.concern);
    } catch (err: any) {
      setTrackingError(err.message || "Failed to track concern.");
    } finally {
      setIsSearchingTracking(false);
    }
  };

  const handleCopyGrievanceId = (tId: string) => {
    navigator.clipboard.writeText(tId);
    setCopiedGrievanceId(tId);
    setTimeout(() => setCopiedGrievanceId(null), 1000);
  };

  const handleLogout = async () => {
    setLoggingOut(true);
    try {
      await fetch("/api/auth/logout", { method: "POST" });
      router.push("/login");
    } catch {
      router.push("/login");
    }
  };

  const handleCopyId = () => {
    if (membership?.membership_id) {
      navigator.clipboard.writeText(membership.membership_id);
      setCopiedId(true);
      setTimeout(() => setCopiedId(false), 1000);
    }
  };

  const handlePrintCard = () => {
    window.print();
  };

  // Submit registration form
  const handleRegisterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setRegError("");

    if (!formData.full_name.trim()) {
      setRegError(language === "kn" ? "ದಯವಿಟ್ಟು ನಿಮ್ಮ ಪೂರ್ಣ ಹೆಸರನ್ನು ನಮೂದಿಸಿ." : "Please enter your full name.");
      return;
    }

    if (!formData.village.trim() || !formData.pincode.trim()) {
      setRegError(language === "kn" ? "ದಯವಿಟ್ಟು ಗ್ರಾಮ ಮತ್ತು ಪಿನ್‌ಕೋಡ್ ನಮೂದಿಸಿ." : "Please provide your village and pincode.");
      return;
    }

    setSubmitting(true);
    try {
      const res = await fetch("/api/membership/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          mobile: user?.mobile || "",
        }),
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.message || "Failed to submit registration.");
      }

      setHasMembership(true);
      setMembership({
        id: 0,
        membership_id: data.membership_id,
        full_name: formData.full_name,
        mobile: user?.mobile || "",
        email: null,
        age: formData.age ? Number(formData.age) : null,
        village: formData.village,
        taluk: formData.taluk,
        district: formData.district,
        pincode: formData.pincode,
        interest: formData.interest,
        suggestion: formData.suggestion,
        status: "active",
        created_at: new Date().toISOString(),
      });
      setShowRegModal(false);
      setShowCardModal(true);
    } catch (err: any) {
      setRegError(err.message || "Failed to submit registration.");
    } finally {
      setSubmitting(false);
    }
  };

  // Filter services by search query
  const filteredServices = useMemo(() => {
    if (!searchQuery.trim()) return quickAccessServices;
    const q = searchQuery.toLowerCase();
    return quickAccessServices.filter(
      (s) =>
        s.titleKn.toLowerCase().includes(q) ||
        s.titleEn.toLowerCase().includes(q) ||
        s.subKn.toLowerCase().includes(q) ||
        s.subEn.toLowerCase().includes(q)
    );
  }, [searchQuery]);

  // Click on a Quick Access card
  const handleCardClick = (service: any) => {
    if (service.id === "card") {
      if (hasMembership) {
        setShowCardModal(true);
      } else {
        setShowRegModal(true);
      }
    } else if (service.id === "grievance") {
      handleOpenGrievanceModal();
    } else if (service.id === "export") {
      handleOpenFarmerModal();
    } else if (service.id === "events") {
      router.push("/portal/events");
    } else if (service.id === "articles" || service.id === "notices") {
      router.push("/portal/articles");
    } else if (service.id === "chatbox" || service.id === "suggestions") {
      setShowHelplineModal(true);
    } else if (service.id === "track") {
      const el = document.getElementById("redressal-status-section");
      if (el) el.scrollIntoView({ behavior: "smooth" });
    } else if (service.id === "gallery") {
      setComingSoonFeature({
        titleKn: "ಭಾವಚಿತ್ರ ಮತ್ತು ವೀಡಿಯೊ ಸಂಪುಟ",
        titleEn: "Photo & Video Gallery",
        descKn: "ಶ್ರೀ ಹರ್ಷಾನಂದ ಗುತ್ತೇದಾರರ ಜನಸಂಪರ್ಕ ಯಾತ್ರೆ, ಗ್ರಾಮ ವಾಸ್ತವ್ಯ ಮತ್ತು ಅಭಿವೃದ್ಧಿ ಕಾಮಗಾರಿಗಳ ಹೈ-ಡೆಫಿನಿಷನ್ ಚಿತ್ರ ಸಂಪುಟ ಶೀಘ್ರದಲ್ಲೇ ಪೋರ್ಟಲ್‌ನಲ್ಲಿ ಲಭ್ಯವಾಗಲಿದೆ.",
        descEn: "High-definition photo archives of grassroots constituency tours, village visits, and inauguration events are currently being cataloged.",
      });
      setShowComingSoonModal(true);
    } else {
      setSelectedService(service);
    }
  };

  if (loading) {
    return (
      <div 
        style={{
          fontFamily: language === "kn" ? "'Anek Kannada', sans-serif" : "'Inter', system-ui, sans-serif"
        }}
        className="min-h-screen bg-[#f8fafc] flex flex-col items-center justify-center text-slate-800"
      >
        <div className="w-10 h-10 border-3 border-amber-500 border-t-transparent rounded-full animate-spin mb-3" />
        <p className="text-xs text-slate-600 font-semibold tracking-wide">
          {language === "kn" ? "ನಾಗರಿಕ ಖಾತೆ ಪರಿಶೀಲಿಸಲಾಗುತ್ತಿದೆ..." : "Loading Citizen Portal..."}
        </p>
      </div>
    );
  }

  const citizenDisplayName = membership?.full_name 
    ? membership.full_name 
    : user?.mobile 
      ? `+91 ${user.mobile}` 
      : language === "kn" ? "ನಾಗರಿಕರೇ" : "Citizen";

  const renderConcernCard = (concern: CitizenConcern, isSearchResult = false) => {
    // 4 Steps: 1-Submitted, 2-Under Review, 3-In Progress, 4-Resolved
    const stepOrder = ["submitted", "under_review", "in_progress", "resolved"];
    const currentStepIdx = stepOrder.indexOf(concern.status);
    const isRejected = concern.status === "rejected";

    return (
      <div
        key={concern.id}
        className="p-4 sm:p-5 rounded-2xl border border-slate-200/80 bg-white hover:border-blue-200 transition-all shadow-xs space-y-3.5"
      >
        {/* Top Header: Tracking ID, Category, Urgency, Date */}
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 pb-2.5">
          <div className="flex items-center gap-2">
            <span className="font-mono font-bold text-xs text-blue-700 bg-blue-50 px-2 py-0.5 rounded-lg border border-blue-200/80">
              {concern.tracking_id}
            </span>
            <button
              type="button"
              onClick={() => handleCopyGrievanceId(concern.tracking_id)}
              className="p-1 rounded text-slate-400 hover:text-slate-700 bg-slate-100 cursor-pointer"
              title="Copy Tracking ID"
            >
              {copiedGrievanceId === concern.tracking_id ? (
                <Check className="w-3 h-3 text-emerald-600" />
              ) : (
                <Copy className="w-3 h-3" />
              )}
            </button>
            <span className="text-[10px] font-bold text-slate-600 bg-slate-100 px-2 py-0.5 rounded-full">
              {concern.category}
            </span>
          </div>

          <div className="flex items-center gap-2 text-xs">
            <span
              className={`text-[9px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider ${
                concern.urgency === "critical"
                  ? "bg-rose-100 text-rose-700"
                  : concern.urgency === "high"
                    ? "bg-orange-100 text-orange-700"
                    : "bg-slate-100 text-slate-600"
              }`}
            >
              {concern.urgency}
            </span>
            <span className="text-[10px] font-mono text-slate-400">
              {new Date(concern.created_at).toLocaleDateString("en-IN", {
                day: "2-digit",
                month: "short",
                year: "numeric",
              })}
            </span>
          </div>
        </div>

        {/* Title, Description & Location */}
        <div className="space-y-1">
          <h4 className="text-sm font-bold text-slate-900 leading-snug">{concern.title}</h4>
          <p className="text-xs text-slate-600 leading-relaxed whitespace-pre-line">{concern.description}</p>
          <div className="flex items-center gap-1.5 text-[11px] text-slate-400 pt-1">
            <MapPin className="w-3 h-3 text-slate-400" />
            <span>
              {concern.village_name || "Aland"}, {concern.taluk || "Aland"} {concern.pincode ? `• ${concern.pincode}` : ""}
            </span>
          </div>
        </div>

        {/* 4-Step Resolution Progress Bar */}
        <div className="pt-2">
          {isRejected ? (
            <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
              <div>
                <span className="font-bold">Status: Petition Rejected / Closed</span>
                <p className="text-[11px] text-rose-600 mt-0.5">
                  This grievance was reviewed and could not be processed. Please check official remarks below.
                </p>
              </div>
            </div>
          ) : (
            <div className="space-y-2">
              <div className="flex items-center justify-between text-[10px] font-bold text-slate-400 mb-1">
                <span>{language === "kn" ? "ಪರಿಹಾರ ಪ್ರಕ್ರಿಯೆ ಪ್ರಗತಿ" : "Resolution Progress"}</span>
                <span className="text-blue-600 uppercase font-black">
                  {concern.status === "resolved"
                    ? "Resolved / ಮುಕ್ತಾಯ"
                    : concern.status === "in_progress"
                      ? "Action In Progress / ಪ್ರಗತಿಯಲ್ಲಿದೆ"
                      : concern.status === "under_review"
                        ? "Under Review / ಪರಿಶೀಲನೆ"
                        : "Submitted / ಸ್ವೀಕರಿಸಲಾಗಿದೆ"}
                </span>
              </div>

              {/* Progress Steps Visual */}
              <div className="grid grid-cols-4 gap-1 sm:gap-2">
                {[
                  { key: "submitted", labelKn: "ಸ್ವೀಕರಿಸಲಾಗಿದೆ", labelEn: "Submitted" },
                  { key: "under_review", labelKn: "ಪರಿಶೀಲನೆ", labelEn: "Under Review" },
                  { key: "in_progress", labelKn: "ಕಾಮಗಾರಿ ಪ್ರಗತಿ", labelEn: "In Progress" },
                  { key: "resolved", labelKn: "ಪರಿಹರಿಸಲಾಗಿದೆ", labelEn: "Resolved" },
                ].map((step, idx) => {
                  const isDone = currentStepIdx >= idx;
                  const isCurrent = currentStepIdx === idx;
                  return (
                    <div key={step.key} className="flex flex-col items-center text-center gap-1">
                      <div
                        className={`w-full h-1.5 rounded-full transition-all ${
                          isDone ? "bg-emerald-500" : "bg-slate-200"
                        }`}
                      />
                      <span
                        className={`text-[9px] sm:text-[10px] font-bold ${
                          isCurrent
                            ? "text-blue-700"
                            : isDone
                              ? "text-emerald-700"
                              : "text-slate-400"
                        }`}
                      >
                        {language === "kn" ? step.labelKn : step.labelEn}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        {/* Official Remarks Callout Box (Updated by Admin!) */}
        {(concern.admin_remarks || concern.assigned_to) && (
          <div className="p-3.5 rounded-xl bg-gradient-to-r from-amber-50/90 via-amber-50/50 to-blue-50/60 border border-amber-200/90 text-xs space-y-1.5">
            <div className="flex items-center justify-between text-[10px]">
              <span className="font-black text-amber-900 uppercase tracking-wider flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                {language === "kn" ? "ಅಧಿಕೃತ ಸರ್ಕಾರದ ಕ್ರಮ & ಟಿಪ್ಪಣಿ" : "Official Action Taken & Remarks"}
              </span>
              {concern.assigned_to && (
                <span className="text-slate-600 font-medium">
                  Assigned: <strong className="text-slate-800">{concern.assigned_to}</strong>
                </span>
              )}
            </div>
            {concern.admin_remarks ? (
              <p className="text-slate-800 font-medium leading-relaxed bg-white/80 p-2.5 rounded-lg border border-amber-200/60 text-xs">
                {concern.admin_remarks}
              </p>
            ) : (
              <p className="text-slate-500 italic text-[11px]">
                Assigned to department officer for field inspection and redressal action.
              </p>
            )}
            <div className="text-[9px] text-slate-400 font-mono text-right">
              Last updated: {new Date(concern.updated_at).toLocaleString("en-IN", { timeZone: "Asia/Kolkata" })}
            </div>
          </div>
        )}
      </div>
    );
  };

  const renderFarmerRequestCard = (request: FarmerRequestItem) => {
    // 4 Steps: 1-Submitted (new), 2-Under Review (in_progress), 3-Team Contacted (contacted), 4-Completed (resolved)
    const stepOrder = ["new", "in_progress", "contacted", "resolved"];
    const currentStepIdx = stepOrder.indexOf(request.status);

    return (
      <div
        key={request.id}
        className="p-4 sm:p-5 rounded-2xl border border-slate-200/80 bg-white hover:border-amber-200 transition-all shadow-xs space-y-3.5"
      >
        {/* Top Header: ID, Source, Status, Date */}
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 pb-2.5">
          <div className="flex items-center gap-2">
            <span className="font-mono font-bold text-xs text-amber-800 bg-amber-50 px-2 py-0.5 rounded-lg border border-amber-200/80">
              #FARM-{request.id}
            </span>
            <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200/60 flex items-center gap-1">
              <Sprout className="w-3 h-3 text-emerald-600" />
              {request.source === "farmers_page"
                ? language === "kn"
                  ? "ರೈತ ಸಲಹಾ ಕೋಶ"
                  : "Farmer Advisory Desk"
                : language === "kn"
                  ? "ಸಾರ್ವಜನಿಕ ವಿಚಾರಣೆ"
                  : "Constituency Inquiry"}
            </span>
          </div>

          <div className="flex items-center gap-2 text-xs">
            <span
              className={`text-[9px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider ${
                request.status === "resolved"
                  ? "bg-emerald-100 text-emerald-700"
                  : request.status === "contacted"
                    ? "bg-blue-100 text-blue-700"
                    : request.status === "in_progress"
                      ? "bg-amber-100 text-amber-700"
                      : "bg-slate-100 text-slate-700"
              }`}
            >
              {request.status === "resolved"
                ? "Completed / ಪರಿಹರಿಸಲಾಗಿದೆ"
                : request.status === "contacted"
                  ? "Team Contacted / ಸಂಪರ್ಕಿಸಲಾಗಿದೆ"
                  : request.status === "in_progress"
                    ? "In Review / ಪರಿಶೀಲನೆ"
                    : "Received / ಸ್ವೀಕರಿಸಲಾಗಿದೆ"}
            </span>
            <span className="text-[10px] font-mono text-slate-400">
              {request.created_at_formatted ||
                new Date(request.created_at).toLocaleDateString("en-IN", {
                  day: "2-digit",
                  month: "short",
                  year: "numeric",
                })}
            </span>
          </div>
        </div>

        {/* Message and Location */}
        <div className="space-y-1">
          <h4 className="text-xs font-bold text-slate-900 leading-snug">
            {language === "kn" ? "ರೈತರ ವಿಚಾರಣೆ & ಕೃಷಿ ವಿನಂತಿ:" : "Farmer Inquiry & Advisory Request:"}
          </h4>
          <p className="text-xs text-slate-600 leading-relaxed whitespace-pre-line bg-slate-50/70 p-3 rounded-xl border border-slate-100">
            {request.message}
          </p>
          <div className="flex items-center gap-1.5 text-[11px] text-slate-400 pt-1">
            <MapPin className="w-3 h-3 text-slate-400" />
            <span>{request.location || "Aland, Kalaburagi"}</span>
          </div>
        </div>

        {/* 4-Step Resolution Progress Bar */}
        <div className="pt-2">
          <div className="space-y-2">
            <div className="flex items-center justify-between text-[10px] font-bold text-slate-400 mb-1">
              <span>{language === "kn" ? "ಸಮಾಲೋಚನಾ ಪ್ರಕ್ರಿಯೆ ಪ್ರಗತಿ" : "Advisory Progress"}</span>
              <span className="text-amber-700 uppercase font-black">
                {request.status === "resolved"
                  ? "Completed / ಮುಕ್ತಾಯ"
                  : request.status === "contacted"
                    ? "Team Contacted / ಸಂಪರ್ಕಿಸಲಾಗಿದೆ"
                    : request.status === "in_progress"
                      ? "In Review / ಪರಿಶೀಲನೆಯಲ್ಲಿದೆ"
                      : "Received / ಸ್ವೀಕರಿಸಲಾಗಿದೆ"}
              </span>
            </div>

            {/* Progress Steps Visual */}
            <div className="grid grid-cols-4 gap-1 sm:gap-2">
              {[
                { key: "new", labelKn: "ಸ್ವೀಕರಿಸಲಾಗಿದೆ", labelEn: "Received" },
                { key: "in_progress", labelKn: "ಪರಿಶೀಲನೆ", labelEn: "In Review" },
                { key: "contacted", labelKn: "ಸಂಪರ್ಕಿಸಲಾಗಿದೆ", labelEn: "Contacted" },
                { key: "resolved", labelKn: "ಪೂರ್ಣಗೊಂಡಿದೆ", labelEn: "Completed" },
              ].map((step, idx) => {
                const isDone = currentStepIdx >= idx;
                const isCurrent = currentStepIdx === idx;
                return (
                  <div key={step.key} className="flex flex-col items-center text-center gap-1">
                    <div
                      className={`w-full h-1.5 rounded-full transition-all ${
                        isDone ? "bg-amber-500" : "bg-slate-200"
                      }`}
                    />
                    <span
                      className={`text-[9px] sm:text-[10px] font-bold ${
                        isCurrent
                          ? "text-amber-800"
                          : isDone
                            ? "text-amber-700"
                            : "text-slate-400"
                      }`}
                    >
                      {language === "kn" ? step.labelKn : step.labelEn}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Official Admin Notes Box (Updated by Admin!) */}
        {request.admin_notes && (
          <div className="p-3.5 rounded-xl bg-gradient-to-r from-emerald-50/90 via-emerald-50/50 to-amber-50/60 border border-emerald-200/90 text-xs space-y-1.5">
            <div className="flex items-center justify-between text-[10px]">
              <span className="font-black text-emerald-900 uppercase tracking-wider flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                {language === "kn" ? "ಅಧಿಕೃತ ಕೃಷಿ ಕೋಶದ ಪ್ರತ್ಯುತ್ತರ & ಟಿಪ್ಪಣಿ" : "Official Agricultural Cell Notes"}
              </span>
              <span className="text-emerald-700 font-bold text-[9px] uppercase">
                Verified Response
              </span>
            </div>
            <p className="text-slate-800 font-medium leading-relaxed bg-white/90 p-2.5 rounded-lg border border-emerald-200/60 text-xs">
              {request.admin_notes}
            </p>
          </div>
        )}
      </div>
    );
  };

  return (
    <div 
      style={{
        fontFamily: language === "kn" ? "'Anek Kannada', sans-serif" : "'Inter', system-ui, sans-serif"
      }}
      className="min-h-screen bg-[#f8fafc] text-slate-800 flex flex-col justify-between antialiased selection:bg-amber-100 selection:text-amber-900 pb-20 lg:pb-12"
    >
      
      {/* =========================================================================
          TOP CURVED HEADER BANNER WITH ILLUSTRATIVE VECTOR LINES & AMBIENT MESH
          Scales elegantly from Mobile to 13"/14"/16" Laptops
          Features:
          - Deep navy-indigo backdrop with delicate SVG contour/wave illustrative lines
          - Karnataka Flag top ribbon accent
          - Dynamic 2-column layout on laptop (eliminates empty stretched space)
          - Glassmorphism Leader Showcase card on the right
          - Floating Search Bar with interactive Quick Search tags
          ========================================================================= */}
      <header className="relative">
        
        {/* Main Banner Container */}
        <div 
          style={{
            background: "linear-gradient(135deg, #090e17 0%, #0f172a 35%, #1e1b4b 70%, #170d24 100%)",
          }}
          className="rounded-b-[28px] sm:rounded-b-[38px] lg:rounded-b-[48px] px-4 sm:px-6 lg:px-10 pt-3.5 sm:pt-6 pb-9 sm:pb-14 lg:pb-18 text-white shadow-xl relative overflow-hidden"
        >
          {/* Karnataka Flag Accent Ribbon on top */}
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-amber-400 via-amber-300 to-red-600 shadow-xs z-20" />
          
          {/* =====================================================================
              1. ILLUSTRATIVE VECTOR WAVES & CONTOURS (EXCLUSIVELY FOR LARGE SCREENS)
              Rendered on laptop & wide screens (>= 1024px) where width allows smooth,
              gentle curves. On small mobile screens, this is hidden to prevent squishing!
              ===================================================================== */}
          <div className="hidden lg:block absolute inset-0 pointer-events-none overflow-hidden z-0">
            <svg 
              className="absolute inset-0 w-full h-full opacity-35" 
              xmlns="http://www.w3.org/2000/svg" 
              preserveAspectRatio="none" 
              viewBox="0 0 1440 340"
            >
              <defs>
                {/* Gradient 1: Sky Blue to Kannada Yellow to Ruby Red */}
                <linearGradient id="headerGrad1" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.85" />
                  <stop offset="45%" stopColor="#fbbf24" stopOpacity="0.95" />
                  <stop offset="80%" stopColor="#f43f5e" stopOpacity="0.9" />
                  <stop offset="100%" stopColor="#f59e0b" stopOpacity="0.8" />
                </linearGradient>

                {/* Gradient 2: Amber Gold to Indigo to Cyan */}
                <linearGradient id="headerGrad2" x1="100%" y1="100%" x2="0%" y2="0%">
                  <stop offset="0%" stopColor="#fbbf24" stopOpacity="0.8" />
                  <stop offset="55%" stopColor="#818cf8" stopOpacity="0.6" />
                  <stop offset="100%" stopColor="#06b6d4" stopOpacity="0.5" />
                </linearGradient>

                {/* Micro Dot Matrix Grid */}
                <pattern id="headerGrid" width="28" height="28" patternUnits="userSpaceOnUse">
                  <circle cx="2" cy="2" r="1" fill="rgba(255,255,255,0.07)" />
                </pattern>
              </defs>

              {/* Dot Matrix Layer */}
              <rect width="100%" height="100%" fill="url(#headerGrid)" />

              {/* Primary Illustrative Flow Wave 1 */}
              <path 
                d="M-50,220 C180,80 440,290 740,130 C1040,-20 1240,260 1500,100" 
                fill="none" 
                stroke="url(#headerGrad1)" 
                strokeWidth="2.5" 
              />

              {/* Flow Wave 1 Echo */}
              <path 
                d="M-50,240 C170,105 425,310 720,155 C1015,10 1220,280 1500,125" 
                fill="none" 
                stroke="url(#headerGrad1)" 
                strokeWidth="1.5" 
                strokeOpacity="0.65" 
              />

              {/* Dashed Contour Line */}
              <path 
                d="M-50,260 C160,130 405,330 700,180 C980,40 1195,300 1500,150" 
                fill="none" 
                stroke="url(#headerGrad1)" 
                strokeWidth="1" 
                strokeOpacity="0.4" 
                strokeDasharray="6 6" 
              />

              {/* Counter-balancing Harmonic Wave 2 */}
              <path 
                d="M-50,110 C260,280 540,55 860,230 C1120,70 1320,270 1500,170" 
                fill="none" 
                stroke="url(#headerGrad2)" 
                strokeWidth="2" 
              />

              {/* Wave 2 Echo */}
              <path 
                d="M-50,135 C245,300 520,78 840,250 C1095,95 1295,290 1500,195" 
                fill="none" 
                stroke="url(#headerGrad2)" 
                strokeWidth="1.2" 
                strokeOpacity="0.5" 
              />

              {/* Atmospheric Crest Line */}
              <path 
                d="M-50,70 C320,195 680,30 1000,185 C1240,100 1400,220 1500,135" 
                fill="none" 
                stroke="rgba(255,255,255,0.14)" 
                strokeWidth="1" 
                strokeDasharray="4 8" 
              />
            </svg>

            {/* Ambient Radial Lights on Laptop */}
            <div 
              className="absolute -top-24 -left-24 w-[420px] h-[420px] rounded-full blur-[110px] pointer-events-none opacity-40" 
              style={{ background: "radial-gradient(circle, #2563eb 0%, transparent 70%)" }}
            />
            <div 
              className="absolute top-0 right-1/3 w-[380px] h-[380px] rounded-full blur-[100px] pointer-events-none opacity-25" 
              style={{ background: "radial-gradient(circle, #f59e0b 0%, transparent 70%)" }}
            />
            <div 
              className="absolute -bottom-24 -right-24 w-[450px] h-[450px] rounded-full blur-[120px] pointer-events-none opacity-30" 
              style={{ background: "radial-gradient(circle, #dc2626 0%, transparent 70%)" }}
            />

            {/* Kannada Letter 'ಹ' Watermark on Laptop */}
            <div className="absolute right-10 top-1/2 -translate-y-1/2 text-9xl font-black text-white/[0.04] select-none pointer-events-none">
              ಹ
            </div>
          </div>

          {/* =====================================================================
              2. MOBILE-OPTIMIZED AMBIENT BACKDROP (CLEAN & SILKY SMOOTH ON PHONES)
              No steep zig-zag lines cutting through text on small screens!
              ===================================================================== */}
          <div className="lg:hidden absolute inset-0 pointer-events-none overflow-hidden z-0">
            <div className="absolute -top-16 -right-16 w-52 h-52 rounded-full bg-amber-400/15 blur-3xl" />
            <div className="absolute -bottom-16 -left-16 w-52 h-52 rounded-full bg-blue-600/20 blur-3xl" />
            <div className="absolute top-1/2 right-1/4 w-40 h-40 rounded-full bg-red-600/10 blur-3xl" />
          </div>

          {/* =====================================================================
              HEADER FOREGROUND CONTENT
              ===================================================================== */}
          <div className="max-w-7xl mx-auto space-y-3 sm:space-y-6 relative z-10">
            
            {/* Top Navigation Row (Optimized for Mobile & Desktop) */}
            <div className="flex items-center justify-between gap-2">
              
              {/* Left Brand: Emblem + Title */}
              <div className="flex items-center gap-2 sm:gap-3 min-w-0">
                <Link
                  href="/"
                  className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl sm:rounded-2xl bg-white/10 hover:bg-white/20 border border-white/20 flex items-center justify-center transition-all cursor-pointer backdrop-blur-md shadow-xs shrink-0 group"
                  title="Home"
                >
                  <Home className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-white group-hover:scale-110 transition-transform" />
                </Link>

                <div className="min-w-0">
                  <div className="flex items-center gap-1.5 sm:gap-2">
                    <h1 className="text-xs sm:text-base lg:text-lg font-black tracking-tight leading-tight truncate">
                      {language === "kn" ? "ನಾಗರಿಕ ಪೋರ್ಟಲ್" : "Citizen Portal"}
                    </h1>
                    <span className="hidden sm:inline-block text-[9px] sm:text-[10px] px-1.5 sm:px-2 py-0.2 sm:py-0.5 rounded-full bg-gradient-to-r from-amber-400 to-amber-500 text-slate-950 font-black shadow-2xs">
                      HG 2026
                    </span>
                  </div>
                  <span className="text-[9px] sm:text-[11px] text-amber-200/90 font-medium hidden sm:block truncate">
                    {language === "kn" ? "ಶ್ರೀ ಹರ್ಷಾನಂದ ಗುತ್ತೇದಾರ ಜನಸಂಪರ್ಕ ವೇದಿಕೆ" : "Shri Harshanand Guttedar Platform • Aland & Kalaburagi"}
                  </span>
                </div>
              </div>

              {/* Right Controls: Compact on Mobile, Full on Desktop */}
              <div className="flex items-center gap-1.5 sm:gap-2.5 shrink-0">
                
                {/* Language Switcher Pill */}
                <div className="flex items-center p-0.5 rounded-full bg-white/10 border border-white/20 backdrop-blur-md text-[10px] sm:text-[11px] font-bold">
                  <button
                    type="button"
                    onClick={() => setLanguage("kn")}
                    className={`px-2 sm:px-3 py-0.5 sm:py-1 rounded-full transition-all cursor-pointer ${
                      language === "kn" ? "bg-amber-400 text-slate-950 font-black shadow-xs" : "text-white/80 hover:text-white"
                    }`}
                  >
                    ಕನ್ನಡ
                  </button>
                  <button
                    type="button"
                    onClick={() => setLanguage("en")}
                    className={`px-2 sm:px-3 py-0.5 sm:py-1 rounded-full transition-all cursor-pointer ${
                      language === "en" ? "bg-amber-400 text-slate-950 font-black shadow-xs" : "text-white/80 hover:text-white"
                    }`}
                  >
                    EN
                  </button>
                </div>

                {/* Notification Bell with Badge 3 */}
                <button
                  type="button"
                  onClick={() => setShowNotificationModal(true)}
                  className="relative p-1.5 sm:p-2.5 rounded-xl sm:rounded-2xl bg-white/10 hover:bg-white/20 border border-white/20 transition-all cursor-pointer backdrop-blur-md"
                  title="Notifications"
                >
                  <Bell className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-white" />
                  <span className="absolute -top-1 -right-1 w-3.5 h-3.5 sm:w-4 sm:h-4 rounded-full bg-red-500 text-white text-[8px] sm:text-[9px] font-black flex items-center justify-center shadow-xs">
                    3
                  </span>
                </button>

                {/* Profile Avatar */}
                <button
                  type="button"
                  onClick={() => hasMembership ? setShowCardModal(true) : setShowRegModal(true)}
                  className="w-8 h-8 sm:w-10 sm:h-10 rounded-full border-2 border-amber-400/90 p-0.5 bg-white/20 shrink-0 cursor-pointer shadow-sm hover:scale-105 transition-transform overflow-hidden"
                  title={citizenDisplayName}
                >
                  <img
                    src="/images/hero.jpg"
                    alt="Profile Avatar"
                    className="w-full h-full rounded-full object-cover object-top"
                  />
                </button>

                {/* Logout Button */}
                <button
                  type="button"
                  onClick={handleLogout}
                  disabled={loggingOut}
                  className="p-1.5 sm:px-3 sm:py-2 rounded-xl sm:rounded-2xl bg-red-950/60 hover:bg-red-900 border border-red-500/40 text-red-100 transition-all cursor-pointer flex items-center gap-1.5 backdrop-blur-md"
                  title="Logout"
                >
                  <LogOut className="w-3.5 h-3.5" />
                  <span className="text-xs font-bold hidden sm:inline">
                    {language === "kn" ? "ನಿರ್ಗಮಿಸಿ" : "Logout"}
                  </span>
                </button>
              </div>

            </div>

            {/* ===================================================================
                HERO GREETING (Clean on Mobile, 2-Column Showcase on Laptop)
                =================================================================== */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-6 items-center pt-0.5 sm:pt-2">
              
              {/* Left Column (lg:col-span-7): Greeting, Slogan & Status Pills */}
              <div className="lg:col-span-7 space-y-1.5 sm:space-y-3">
                <div className="hidden sm:inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/15 text-amber-300 text-xs font-bold shadow-2xs">
                  <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                  <span>
                    {language === "kn" ? "ಅಧಿಕೃತ ನಾಗರಿಕ ಸೇವಾ ವೇದಿಕೆ" : "Official Citizen Service Platform"} • Aland 2026
                  </span>
                </div>

                <div className="space-y-0.5">
                  <h2 className="text-lg sm:text-3xl lg:text-4xl font-black text-white flex items-center gap-1.5 sm:gap-2 tracking-tight">
                    <span>
                      {language === "kn" ? "ನಮಸ್ಕಾರ," : "Hello,"} {citizenDisplayName}
                    </span>
                    <span className="animate-bounce inline-block text-base sm:text-2xl">👋</span>
                  </h2>
                  <p className="text-[11px] sm:text-sm lg:text-base text-amber-100/90 font-medium max-w-xl leading-relaxed">
                    {language === "kn" 
                      ? "ನಿಮ್ಮ ಸೇವೆಯಲ್ಲಿ ಸದಾ ಸನ್ನದ್ಧ • ಆಳಂದದ ಪ್ರಗತಿಗೆ ಸ್ವಾಗತ!" 
                      : "Have a great day ahead! • Aland Citizen Gateway."}
                  </p>
                </div>

                {/* Quick Status Chips (Hidden on small mobile to keep header clean and compact) */}
                <div className="hidden sm:flex flex-wrap items-center gap-2 pt-1 text-xs">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 border border-white/20 backdrop-blur-md text-amber-200 font-bold">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                    <span>{hasMembership ? "Verified Member" : "Active Citizen"}</span>
                  </span>
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 border border-white/20 backdrop-blur-md text-slate-200 font-medium">
                    <MapPin className="w-3.5 h-3.5 text-amber-400" />
                    <span>Aland & Kalaburagi</span>
                  </span>
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 border border-white/20 backdrop-blur-md text-emerald-300 font-medium">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                    <span>Public Darshan Active</span>
                  </span>
                </div>
              </div>

              {/* Right Column (lg:col-span-5): Leader Showcase & Quick Action Cards (Visible on Laptop) */}
              <div className="hidden lg:block lg:col-span-5">
                <div className="rounded-3xl p-4 bg-gradient-to-br from-white/12 via-white/8 to-white/5 border border-white/20 backdrop-blur-xl shadow-xl space-y-3.5">
                  
                  {/* Leader Header */}
                  <div className="flex items-center gap-3">
                    <div className="w-13 h-13 rounded-2xl border-2 border-amber-400/80 p-0.5 bg-white/20 shadow-md overflow-hidden shrink-0">
                      <img
                        src="/images/hero.jpg"
                        alt="Shri Harshanand Guttedar"
                        className="w-full h-full rounded-[14px] object-cover object-top"
                      />
                    </div>
                    <div className="min-w-0">
                      <span className="text-[10px] font-black uppercase px-2 py-0.2 rounded-full bg-amber-400 text-slate-950">
                        {language === "kn" ? "ಜನನಾಯಕರು" : "Constituency Leader"}
                      </span>
                      <h3 className="text-sm font-black text-white truncate mt-0.5">
                        {language === "kn" ? "ಶ್ರೀ ಹರ್ಷಾನಂದ ಗುತ್ತೇದಾರ" : "Shri Harshanand Guttedar"}
                      </h3>
                      <p className="text-[11px] text-amber-200/90 font-medium truncate">
                        {language === "kn" ? "ಸದಾ ನಿಮ್ಮ ಸೇವೆಯಲ್ಲಿ - ಆಳಂದ ಮತಕ್ಷೇತ್ರ" : "Always in your service • Aland Constituency"}
                      </p>
                    </div>
                  </div>

                  {/* 3 Quick Action Shortcut Buttons */}
                  <div className="grid grid-cols-3 gap-2 pt-1 border-t border-white/15 text-[11px]">
                    <button
                      type="button"
                      onClick={handleOpenGrievanceModal}
                      className="p-2 rounded-xl bg-white/10 hover:bg-white/20 border border-white/15 text-white font-bold transition-all text-center flex flex-col items-center gap-1 cursor-pointer"
                    >
                      <FileText className="w-3.5 h-3.5 text-rose-300" />
                      <span className="truncate">{language === "kn" ? "ಕುಂದುಕೊರತೆ" : "Grievance"}</span>
                    </button>

                    <button
                      type="button"
                      onClick={handleOpenFarmerModal}
                      className="p-2 rounded-xl bg-white/10 hover:bg-white/20 border border-white/15 text-white font-bold transition-all text-center flex flex-col items-center gap-1 cursor-pointer"
                    >
                      <Sprout className="w-3.5 h-3.5 text-amber-300" />
                      <span className="truncate">{language === "kn" ? "ತೊಗರಿ ರಫ್ತು" : "Tur Export"}</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setShowHelplineModal(true)}
                      className="p-2 rounded-xl bg-white/10 hover:bg-white/20 border border-white/15 text-white font-bold transition-all text-center flex flex-col items-center gap-1 cursor-pointer"
                    >
                      <PhoneCall className="w-3.5 h-3.5 text-emerald-300" />
                      <span className="truncate">{language === "kn" ? "ಸಹಾಯವಾಣಿ" : "Helpline"}</span>
                    </button>
                  </div>

                </div>
              </div>

            </div>

          </div>
        </div>

        {/* =========================================================================
            FLOATING SEARCH BAR
            Clean single-line pill on Mobile; Enhanced with Quick Chips on Laptop
            ========================================================================= */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 -mt-5 sm:-mt-8 relative z-20">
          <div className="bg-white rounded-2xl sm:rounded-3xl shadow-[0_8px_30px_rgba(0,0,0,0.08)] sm:shadow-[0_12px_36px_rgba(0,0,0,0.12)] border border-slate-200/90 p-1.5 sm:p-2.5 transition-all focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-100 max-w-4xl mx-auto">
            
            <div className="flex items-center gap-2 sm:gap-2.5 px-2">
              <Search className="w-4 h-4 sm:w-5 sm:h-5 text-amber-500 shrink-0" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={
                  language === "kn" 
                    ? "ಸೇವೆಗಳು, ಯೋಜನೆಗಳು ಹುಡುಕಿ (ರಸ್ತೆ, ನೀರು, ತೊಗರಿ)..." 
                    : "Search anything (Grievance, Tur Dal, Projects, Library)..."
                }
                className="w-full text-xs sm:text-sm text-slate-800 placeholder-slate-400 bg-transparent focus:outline-none py-1 sm:py-1.5"
              />
              
              {searchQuery ? (
                <button
                  type="button"
                  onClick={() => setSearchQuery("")}
                  className="p-1 text-slate-400 hover:text-slate-600 rounded-lg cursor-pointer"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              ) : (
                <span className="hidden sm:inline-block px-2 py-0.5 rounded text-[10px] font-mono text-slate-400 bg-slate-100 border border-slate-200">
                  Ctrl+K
                </span>
              )}
            </div>

            {/* Quick Interactive Category Filter Chips (Hidden on small mobile to avoid multi-row wrapping) */}
            <div className="hidden sm:flex pt-2 px-2 border-t border-slate-100 flex-wrap items-center gap-1.5 text-[11px] text-slate-500">
              <span className="font-bold text-slate-400">Quick:</span>
              {[
                { tagKn: "ರಸ್ತೆ & ಕುಂದುಕೊರತೆ", tagEn: "Grievance", query: "Grievance" },
                { tagKn: "ತೊಗರಿ ರಫ್ತು", tagEn: "Tur Export", query: "Tur Export" },
                { tagKn: "ಕುಡಿಯುವ ನೀರು", tagEn: "RO Water", query: "Water" },
                { tagKn: "ಯುವಜನ ಗ್ರಂಥಾಲಯ", tagEn: "Library", query: "Library" },
                { tagKn: "ಭೇಟಿ ಸಮಯ", tagEn: "Darshan", query: "Appointments" },
              ].map((chip, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setSearchQuery(chip.query)}
                  className={`px-2 py-0.5 rounded-lg border text-[10px] font-semibold transition-all cursor-pointer ${
                    searchQuery === chip.query
                      ? "bg-amber-100 text-amber-900 border-amber-300 font-bold"
                      : "bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100"
                  }`}
                >
                  {language === "kn" ? chip.tagKn : chip.tagEn}
                </button>
              ))}
            </div>

          </div>
        </div>

      </header>


      {/* =========================================================================
          RESPONSIVE MAIN WORKSPACE (Multi-Column on Laptop 13"/14"/16", Stacked on Mobile)
          - Left Column (lg:col-span-8):
            1. Membership Banner (Mobile) / Announcements
            2. Quick Access Grid (Exact 3-col on Mobile, 4-col on Laptop)
            3. Detailed Service Inquiries
          - Right Column (lg:col-span-4):
            1. The Live Digital Membership Card (Proudly displayed on laptop!)
            2. Upcoming Events & Public Schedule
            3. Direct Secretariat Office & Hotline
          ========================================================================= */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 py-6 sm:py-8 w-full flex-1">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
          
          {/* =====================================================================
              LEFT COLUMN (lg:col-span-8): Quick Access & Primary Services
              ===================================================================== */}
          <div className="lg:col-span-8 space-y-6">
            
            {/* CITIZEN MEMBERSHIP BANNER (Visible on mobile & tablet; on laptop card is displayed in right column) */}
            <div className="lg:hidden">
              {hasMembership && membership ? (
                /* Registered Citizen Card Strip */
                <div 
                  onClick={() => setShowCardModal(true)}
                  className="rounded-2xl p-4 border border-amber-300/80 bg-gradient-to-r from-amber-50 via-white to-orange-50 shadow-xs hover:shadow-md transition-all cursor-pointer flex flex-col sm:flex-row sm:items-center justify-between gap-3 relative overflow-hidden group"
                >
                  <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-amber-400 via-amber-300 to-red-500" />
                  
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-amber-500 to-red-600 p-[2px] shadow-xs shrink-0">
                      <div className="w-full h-full rounded-[10px] bg-slate-900 flex items-center justify-center text-amber-400 font-black text-sm">
                        ಹ
                      </div>
                    </div>
                    <div className="min-w-0">
                      <div className="flex items-center gap-1.5">
                        <span className="text-[10px] font-black px-2 py-0.2 rounded-full bg-amber-400 text-slate-950 uppercase tracking-wider">
                          {language === "kn" ? "ಅಧಿಕೃತ ಸದಸ್ಯತ್ವ" : "Official Member"}
                        </span>
                        <span className="text-[10px] font-mono font-bold text-blue-700 bg-blue-50 px-1.5 py-0.2 rounded border border-blue-200">
                          {membership.membership_id}
                        </span>
                      </div>
                      <h3 className="text-sm font-bold text-slate-900 truncate mt-0.5">
                        {membership.full_name} • {membership.taluk}
                      </h3>
                      <p className="text-[11px] text-slate-500">
                        {language === "kn" ? "ಡಿಜಿಟಲ್ ಗುರುತಿನ ಚೀಟಿ ವೀಕ್ಷಿಸಲು ಕ್ಲಿಕ್ ಮಾಡಿ" : "Click to view full digital ID card & print"}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-1 text-xs font-bold text-blue-600 group-hover:text-blue-700 self-end sm:self-center shrink-0">
                    <span>{language === "kn" ? "ಕಾರ್ಡ್ ವೀಕ್ಷಿಸಿ" : "View Card"}</span>
                    <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
                  </div>
                </div>
              ) : (
                /* Unregistered Action Banner */
                <div 
                  onClick={() => setShowRegModal(true)}
                  className="rounded-2xl p-4 border border-blue-200 bg-gradient-to-r from-blue-50 via-white to-amber-50 shadow-xs hover:shadow-md transition-all cursor-pointer flex flex-col sm:flex-row sm:items-center justify-between gap-3 relative overflow-hidden group"
                >
                  <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 via-amber-400 to-red-500" />
                  
                  <div className="flex items-center gap-3">
                    <div className="w-11 h-11 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center shrink-0 shadow-inner">
                      <IdCard className="w-6 h-6" />
                    </div>
                    <div>
                      <span className="text-[10px] font-extrabold px-2 py-0.5 rounded-full bg-blue-100 text-blue-800 uppercase">
                        {language === "kn" ? "ತ್ವರಿತ ನೋಂದಣಿ" : "1-Minute Action"}
                      </span>
                      <h3 className="text-sm font-bold text-slate-900 mt-0.5">
                        {language === "kn" ? "ಅಧಿಕೃತ ನಾಗರಿಕ ಸದಸ್ಯತ್ವ ಕಾರ್ಡ್ ಪಡೆಯಿರಿ" : "Get Your Official Citizen Membership Card"}
                      </h3>
                      <p className="text-[11px] text-slate-500">
                        {language === "kn" 
                          ? "ನಿಮ್ಮ ಪಾಲ್ಗೊಳ್ಳುವಿಕೆ • ನಮ್ಮ ಸಂಕಲ್ಪ • ಆಳಂದದ ಪ್ರಗತಿ"
                          : "Register to unlock official membership badge and priority grievance tracking."}
                      </p>
                    </div>
                  </div>

                  <button
                    type="button"
                    className="px-3.5 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold transition-all shadow-xs shrink-0 self-end sm:self-center flex items-center gap-1.5"
                  >
                    <span>{language === "kn" ? "ಈಗಲೇ ನೋಂದಾಯಿಸಿ" : "Register Now"}</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              )}
            </div>


            {/* ===================================================================
                QUICK ACCESS SERVICES (Exact Reference Match on Mobile, 4-col on Laptop)
                =================================================================== */}
            <section className="bg-white rounded-3xl p-4 sm:p-6 border border-slate-200/80 shadow-xs space-y-4">
              
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <div>
                  <h2 className="text-sm sm:text-base lg:text-lg font-extrabold text-slate-900 tracking-tight">
                    {language === "kn" ? "ತ್ವರಿತ ಸೇವೆಗಳು (Quick Access)" : "Quick Access Services"}
                  </h2>
                  <p className="text-[11px] text-slate-400 hidden sm:block">
                    {language === "kn" ? "ಸಾರ್ವಜನಿಕ ಸೇವೆಗಳು, ಯೋಜನೆಗಳು ಮತ್ತು ಕಚೇರಿ ಸಹಾಯವಾಣಿ" : "Constituency welfare services, farmer advisories & grievance desk"}
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => setSearchQuery("")}
                  className="text-xs font-bold text-blue-600 hover:text-blue-800 cursor-pointer"
                >
                  {language === "kn" ? "ಎಲ್ಲವನ್ನೂ ವೀಕ್ಷಿಸಿ" : "View All"}
                </button>
              </div>

              {/* Grid: 3 cols on mobile, 4 on sm/lg */}
              <div className="grid grid-cols-3 sm:grid-cols-4 gap-2.5 sm:gap-4">
                {filteredServices.map((service) => {
                  const IconComp = service.icon;
                  return (
                    <div
                      key={service.id}
                      onClick={() => handleCardClick(service)}
                      className="group bg-slate-50/60 hover:bg-white border border-slate-200/70 hover:border-blue-300 rounded-2xl p-2.5 sm:p-3.5 shadow-2xs hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 cursor-pointer flex flex-col justify-between text-left relative overflow-hidden"
                    >
                      {/* Top Icon Badge & Optional Chip */}
                      <div className="flex items-start justify-between mb-2 sm:mb-3">
                        <div className={`w-9 h-9 sm:w-11 sm:h-11 rounded-2xl flex items-center justify-center shrink-0 ${service.color} shadow-2xs group-hover:scale-105 transition-transform`}>
                          <IconComp className="w-4 h-4 sm:w-5 sm:h-5" />
                        </div>

                        {service.badge && (
                          <span className={`text-[8px] sm:text-[9px] font-black px-1.5 py-0.2 rounded-full uppercase tracking-wider ${service.badgeColor}`}>
                            {service.badge}
                          </span>
                        )}
                      </div>

                      {/* Title & Subtitle */}
                      <div>
                        <h3 className="text-xs sm:text-[13px] font-bold text-slate-900 leading-tight group-hover:text-blue-600 transition-colors truncate">
                          {language === "kn" ? service.titleKn : service.titleEn}
                        </h3>
                        <p className="text-[10px] sm:text-[11px] text-slate-400 font-medium truncate mt-0.5">
                          {language === "kn" ? service.subKn : service.subEn}
                        </p>
                      </div>

                      {/* Right Chevron Arrow */}
                      <div className="pt-2 sm:pt-3 flex justify-end">
                        <ChevronRight className="w-3.5 h-3.5 text-slate-300 group-hover:text-blue-600 group-hover:translate-x-0.5 transition-all" />
                      </div>
                    </div>
                  );
                })}
              </div>

            </section>


            {/* ===================================================================
                CITIZEN GRIEVANCE PETITIONS & FARMER ADVISORY STATUS (ಜನಸ್ಪಂದನ & ರೈತ ಕೋಶ)
                =================================================================== */}
            <section id="redressal-status-section" className="bg-white rounded-3xl p-4 sm:p-6 border border-slate-200/80 shadow-xs space-y-4">
              
              {/* Header with Title and Action Buttons */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-3">
                <div className="flex items-center gap-2.5">
                  <div className={`w-10 h-10 rounded-2xl flex items-center justify-center shrink-0 border shadow-2xs ${
                    activeRequestTab === "concerns" ? "bg-rose-50 text-rose-600 border-rose-100" : "bg-amber-50 text-amber-700 border-amber-100"
                  }`}>
                    {activeRequestTab === "concerns" ? (
                      <FileText className="w-5 h-5" />
                    ) : (
                      <Sprout className="w-5 h-5" />
                    )}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h2 className="text-sm sm:text-base lg:text-lg font-extrabold text-slate-900 tracking-tight">
                        {language === "kn"
                          ? activeRequestTab === "concerns"
                            ? "ಜನಸ್ಪಂದನ - ಸಾರ್ವಜನಿಕ ಅರ್ಜಿಗಳು & ಪರಿಹಾರ ಪ್ರಗತಿ"
                            : "ರೈತರ ಸಮಾಲೋಚನೆ & ತೊಗರಿ ರಫ್ತು ವಿನಂತಿಗಳು"
                          : activeRequestTab === "concerns"
                            ? "Citizen Grievances & Redressal Status"
                            : "Farmer Advisory & Consultation Desk"}
                      </h2>
                    </div>
                    <p className="text-[11px] text-slate-400">
                      {language === "kn"
                        ? "ನೈಜ ಸಮಯದ ಪರಿಶೀಲನೆ, ಅಧಿಕಾರಿಗಳ ಭೇಟಿ ಟಿಪ್ಪಣಿಗಳು ಮತ್ತು ಸರ್ಕಾರದ ಕ್ರಮ"
                        : "Real-time verification progress, official department inspection notes, and actions taken"}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  {activeRequestTab === "concerns" ? (
                    <button
                      type="button"
                      onClick={handleOpenGrievanceModal}
                      className="px-3.5 py-2 rounded-xl bg-gradient-to-r from-rose-600 to-rose-700 hover:from-rose-700 hover:to-rose-800 text-white font-bold text-xs shadow-xs hover:shadow transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                    >
                      <Plus className="w-4 h-4" />
                      <span>{language === "kn" ? "ಹೊಸ ಅರ್ಜಿ ಸಲ್ಲಿಸಿ" : "File New Petition"}</span>
                    </button>
                  ) : (
                    <button
                      type="button"
                      onClick={handleOpenFarmerModal}
                      className="px-3.5 py-2 rounded-xl bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-700 hover:to-amber-800 text-white font-bold text-xs shadow-xs hover:shadow transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                    >
                      <Plus className="w-4 h-4" />
                      <span>{language === "kn" ? "ಕೃಷಿ ವಿನಂತಿ ಸಲ್ಲಿಸಿ" : "Request Advisory"}</span>
                    </button>
                  )}
                </div>
              </div>

              {/* Tab Selector Pills: Grievance Petitions vs Farmer Advisory Inquiries */}
              <div className="flex items-center gap-2 p-1 bg-slate-100/90 rounded-2xl w-fit">
                <button
                  type="button"
                  onClick={() => setActiveRequestTab("concerns")}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                    activeRequestTab === "concerns"
                      ? "bg-white text-slate-900 shadow-xs"
                      : "text-slate-500 hover:text-slate-800"
                  }`}
                >
                  <FileText className="w-3.5 h-3.5 text-rose-500" />
                  <span>{language === "kn" ? "ಕುಂದುಕೊರತೆ ಅರ್ಜಿಗಳು" : "Grievance Petitions"}</span>
                  <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-bold ${
                    activeRequestTab === "concerns" ? "bg-rose-100 text-rose-800" : "bg-slate-200 text-slate-600"
                  }`}>
                    {citizenConcerns.length}
                  </span>
                </button>

                <button
                  type="button"
                  onClick={() => setActiveRequestTab("farmers")}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                    activeRequestTab === "farmers"
                      ? "bg-white text-slate-900 shadow-xs"
                      : "text-slate-500 hover:text-slate-800"
                  }`}
                >
                  <Sprout className="w-3.5 h-3.5 text-amber-600" />
                  <span>{language === "kn" ? "ರೈತರ ಕೃಷಿ ವಿನಂತಿಗಳು" : "Farmer Consultations"}</span>
                  <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-bold ${
                    activeRequestTab === "farmers" ? "bg-amber-100 text-amber-800" : "bg-slate-200 text-slate-600"
                  }`}>
                    {farmerRequests.length}
                  </span>
                </button>
              </div>

              {/* Content for Concerns Tab */}
              {activeRequestTab === "concerns" && (
                <div className="space-y-4">
                  {/* Inline Tracking Search Bar */}
                  <form onSubmit={handleTrackSubmit} className="flex items-center gap-2 bg-slate-50 border border-slate-200/80 rounded-2xl p-1.5">
                    <Search className="w-4 h-4 text-slate-400 ml-2 shrink-0" />
                    <input
                      type="text"
                      placeholder={
                        language === "kn"
                          ? "ಅರ್ಜಿ ಸಂಖ್ಯೆ ನಮೂದಿಸಿ ಹುಡುಕಿ (ಉದಾ: HG-GRV-2026-1042)..."
                          : "Search by Tracking ID (e.g. HG-GRV-2026-1042)..."
                      }
                      value={trackingQuery}
                      onChange={(e) => setTrackingQuery(e.target.value)}
                      className="flex-1 text-xs text-slate-800 placeholder-slate-400 bg-transparent focus:outline-none py-1"
                    />
                    {trackingQuery && (
                      <button
                        type="button"
                        onClick={() => {
                          setTrackingQuery("");
                          setTrackingResult(null);
                          setTrackingError("");
                        }}
                        className="p-1 text-slate-400 hover:text-slate-600 rounded-lg cursor-pointer"
                      >
                        <X className="w-3.5 h-3.5" />
                      </button>
                    )}
                    <button
                      type="submit"
                      disabled={isSearchingTracking}
                      className="px-3 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs transition-colors cursor-pointer shrink-0 flex items-center gap-1"
                    >
                      {isSearchingTracking ? (
                        <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                      ) : (
                        <span>{language === "kn" ? "ಸ್ಥಿತಿ ಪರಿಶೀಲಿಸಿ" : "Track"}</span>
                      )}
                    </button>
                  </form>

                  {/* Tracking error message if any */}
                  {trackingError && (
                    <div className="p-2.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs flex items-center gap-2">
                      <AlertCircle className="w-4 h-4 text-rose-500 shrink-0" />
                      <span>{trackingError}</span>
                    </div>
                  )}

                  {/* Tracked Result Highlight Card if search was performed */}
                  {trackingResult && (
                    <div className="p-4 rounded-2xl bg-amber-50/60 border border-amber-200 space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-black uppercase tracking-wider text-amber-800 bg-amber-100 px-2 py-0.5 rounded-full">
                          Tracked Petition Result
                        </span>
                        <button
                          type="button"
                          onClick={() => setTrackingResult(null)}
                          className="text-xs text-slate-400 hover:text-slate-600 cursor-pointer"
                        >
                          Dismiss
                        </button>
                      </div>
                      {renderConcernCard(trackingResult, true)}
                    </div>
                  )}

                  {/* List of citizen's concerns */}
                  {citizenConcerns.length === 0 && !trackingResult ? (
                    <div className="p-6 rounded-2xl bg-slate-50/80 border border-slate-200/80 text-center space-y-2">
                      <div className="w-12 h-12 rounded-2xl bg-rose-100/70 text-rose-600 flex items-center justify-center mx-auto">
                        <FileText className="w-6 h-6" />
                      </div>
                      <h4 className="text-xs sm:text-sm font-bold text-slate-800">
                        {language === "kn" ? "ಯಾವುದೇ ಸಕ್ರಿಯ ಅರ್ಜಿಗಳಿಲ್ಲ" : "No Petitions Submitted Yet"}
                      </h4>
                      <p className="text-[11px] text-slate-500 max-w-md mx-auto">
                        {language === "kn"
                          ? "ನಿಮ್ಮ ಗ್ರಾಮದ ರಸ್ತೆ, ಕುಡಿಯುವ ನೀರು, ವಿದ್ಯುತ್ ಅಥವಾ ಇತರ ಸಮಸ್ಯೆಗಳ ಪರಿಹಾರಕ್ಕಾಗಿ ಈಗಲೇ ಅರ್ಜಿ ಸಲ್ಲಿಸಿ."
                          : "Submit your concerns regarding village roads, drinking water, power, or civic needs directly to Shri Harshanand Guttedar's office."}
                      </p>
                      <button
                        type="button"
                        onClick={handleOpenGrievanceModal}
                        className="mt-2 px-4 py-2 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs transition-colors inline-flex items-center gap-1.5 cursor-pointer"
                      >
                        <Plus className="w-3.5 h-3.5" />
                        <span>{language === "kn" ? "ಅರ್ಜಿ ಸಲ್ಲಿಸಿ" : "Submit First Petition"}</span>
                      </button>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {citizenConcerns.map((concern) => renderConcernCard(concern))}
                    </div>
                  )}
                </div>
              )}

              {/* Content for Farmer Consultations Tab */}
              {activeRequestTab === "farmers" && (
                <div className="space-y-4">
                  {farmerRequests.length === 0 ? (
                    <div className="p-6 rounded-2xl bg-slate-50/80 border border-slate-200/80 text-center space-y-2">
                      <div className="w-12 h-12 rounded-2xl bg-amber-100/70 text-amber-700 flex items-center justify-center mx-auto">
                        <Sprout className="w-6 h-6" />
                      </div>
                      <h4 className="text-xs sm:text-sm font-bold text-slate-800">
                        {language === "kn" ? "ಯಾವುದೇ ಕೃಷಿ ಸಮಾಲೋಚನೆ ವಿನಂತಿಗಳಿಲ್ಲ" : "No Farmer Advisory Requests Yet"}
                      </h4>
                      <p className="text-[11px] text-slate-500 max-w-md mx-auto">
                        {language === "kn"
                          ? "ಜಿಐ-ಟ್ಯಾಗ್ ತೊಗರಿ ನೇರ ರಫ್ತು, ಮಣ್ಣು ಪರೀಕ್ಷೆ, ಸೌರ ಶೀತಲೀಕರಣ ಘಟಕ ಅಥವಾ ಕೃಷಿ ಸಹಾಯಧನದ ಕುರಿತು ನಮ್ಮ ಕೃಷಿ ಕೋಶದಿಂದ ಸಲಹೆ ಪಡೆಯಿರಿ."
                          : "Request expert consultation on Kalaburagi GI red gram export, solar cold storage, soil testing, or agricultural subsidies."}
                      </p>
                      <button
                        type="button"
                        onClick={handleOpenFarmerModal}
                        className="mt-2 px-4 py-2 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs transition-colors inline-flex items-center gap-1.5 cursor-pointer"
                      >
                        <Plus className="w-3.5 h-3.5" />
                        <span>{language === "kn" ? "ಕೃಷಿ ಸಲಹೆ ವಿನಂತಿಸಿ" : "Request Farmer Advisory"}</span>
                      </button>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {farmerRequests.map((req) => renderFarmerRequestCard(req))}
                    </div>
                  )}
                </div>
              )}

            </section>


            {/* ===================================================================
                FEATURED CONSTITUENCY INITIATIVES (Visible on Laptop & Tablet)
                =================================================================== */}
            <section className="bg-gradient-to-br from-blue-900 via-indigo-950 to-slate-900 rounded-3xl p-5 sm:p-6 text-white shadow-md relative overflow-hidden">
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-amber-400 via-amber-300 to-red-500" />
              
              <div className="relative z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="space-y-1">
                  <span className="text-[10px] font-black px-2.5 py-0.5 rounded-full bg-amber-400 text-slate-950 uppercase tracking-wider">
                    {language === "kn" ? "ವಿಶೇಷ ಉಪಕ್ರಮ" : "Flagship Initiative"}
                  </span>
                  <h3 className="text-base sm:text-lg font-black text-white">
                    {language === "kn" ? "ಕಲಬುರಗಿ ತೊಗರಿ ಜಿಐ-ಟ್ಯಾಗ್ ನೇರ ರಫ್ತು ಅಭಿಯಾನ" : "GI-Tagged Kalaburagi Red Gram Direct Export Drive"}
                  </h3>
                  <p className="text-xs text-amber-100/80 max-w-xl">
                    {language === "kn" 
                      ? "ರೈತರಿಗೆ ಮಧ್ಯವರ್ತಿಗಳಿಲ್ಲದೆ ಉತ್ತಮ ಬೆಂಬಲ ಬೆಲೆ, ಸೌರ ಶೀತಲೀಕರಣ ಘಟಕಗಳು ಹಾಗೂ ತಾಂತ್ರಿಕ ನೆರವು." 
                      : "Direct fair pricing for farmers without intermediaries, supported by solar-powered cold storages in Aland."}
                  </p>
                </div>

                <button
                  type="button"
                  onClick={handleOpenFarmerModal}
                  className="px-4 py-2 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-xs transition-all shadow-xs shrink-0 self-start sm:self-center cursor-pointer"
                >
                  {language === "kn" ? "ಸಲಹೆ ಪಡೆಯಿರಿ" : "Consult Farmer Desk"}
                </button>
              </div>
            </section>

          </div>


          {/* =====================================================================
              RIGHT COLUMN (lg:col-span-4): Digital Card + Upcoming Events + Helpline
              ===================================================================== */}
          <div className="lg:col-span-4 space-y-6">
            
            {/* 1. DIGITAL MEMBERSHIP CARD (Hero Displayed on Laptop!) */}
            <div className="bg-white rounded-3xl p-4 sm:p-5 border border-slate-200/80 shadow-xs space-y-3.5">
              
              <div className="flex items-center justify-between border-b border-slate-100 pb-2.5">
                <div className="flex items-center gap-1.5">
                  <IdCard className="w-4 h-4 text-amber-500" />
                  <span className="text-xs font-black text-slate-900 uppercase tracking-wider">
                    {language === "kn" ? "ಡಿಜಿಟಲ್ ಸದಸ್ಯತ್ವ ಕಾರ್ಡ್" : "Digital Citizen ID Card"}
                  </span>
                </div>

                {hasMembership && (
                  <button
                    type="button"
                    onClick={handlePrintCard}
                    className="p-1 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100"
                    title="Print Card"
                  >
                    <Printer className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>

              {hasMembership && membership ? (
                /* LIVE DIGITAL CARD (Watermark Background Photo + Kannada Flag Accent) */
                <div 
                  id="membership-card-side"
                  className="rounded-2xl border-2 border-amber-400/60 p-4 sm:p-5 text-white shadow-xl relative overflow-hidden space-y-4"
                  style={{
                    background: "linear-gradient(135deg, #0b1120 0%, #1e1b4b 60%, #0b1120 100%)",
                  }}
                >
                  {/* Photo Layer */}
                  <div className="absolute inset-0 z-0 overflow-hidden">
                    <img
                      src="/images/hero.jpg"
                      alt="Watermark Photo"
                      className="w-full h-full object-cover object-top opacity-20 filter contrast-125"
                    />
                    <div className="absolute inset-0 bg-gradient-to-br from-slate-950/85 via-indigo-950/80 to-slate-950/90" />
                    {/* Kannada Flag Accent */}
                    <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-amber-400 via-amber-300 to-red-500" />
                  </div>

                  {/* Watermark Character */}
                  <div className="absolute bottom-1 right-2 text-6xl font-black text-white/5 pointer-events-none select-none z-0">
                    ಹ
                  </div>

                  {/* Card Content */}
                  <div className="relative z-10 space-y-3">
                    <div className="flex items-center justify-between border-b border-white/15 pb-2">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-amber-400 to-red-500 p-[1.5px] shadow-xs">
                          <div className="w-full h-full rounded-[6.5px] bg-slate-950 flex items-center justify-center">
                            <span className="font-black text-amber-400 text-xs">ಹ</span>
                          </div>
                        </div>
                        <div>
                          <span className="font-extrabold text-white text-[11px] block leading-tight">
                            {language === "kn" ? "ಶ್ರೀ ಹರ್ಷಾನಂದ ಗುತ್ತೇದಾರ ವೇದಿಕೆ" : "Shri Harshanand Guttedar"}
                          </span>
                          <span className="text-[8px] text-amber-300 font-bold uppercase tracking-wider">
                            Aland & Kalaburagi
                          </span>
                        </div>
                      </div>

                      <span className="inline-flex items-center gap-0.5 px-2 py-0.2 rounded-full text-[8px] font-black bg-amber-400 text-slate-950 uppercase">
                        <Award className="w-2.5 h-2.5 text-slate-950" />
                        <span>Verified</span>
                      </span>
                    </div>

                    <div>
                      <span className="text-[8px] text-slate-400 uppercase tracking-wider block">Member Name</span>
                      <p className="text-sm font-black text-white truncate">{membership.full_name}</p>
                    </div>

                    <div className="grid grid-cols-2 gap-2 text-xs">
                      <div>
                        <span className="text-[8px] text-slate-400 uppercase tracking-wider block">Mobile</span>
                        <p className="font-mono text-[11px] font-bold text-slate-200">+91 {membership.mobile}</p>
                      </div>

                      <div>
                        <span className="text-[8px] text-slate-400 uppercase tracking-wider block">Member ID</span>
                        <div className="flex items-center gap-1">
                          <span className="font-mono font-black text-amber-400 text-[11px]">
                            {membership.membership_id}
                          </span>
                          <button
                            type="button"
                            onClick={handleCopyId}
                            className="p-0.5 rounded text-slate-400 hover:text-white bg-white/10 cursor-pointer"
                            title="Copy ID"
                          >
                            {copiedId ? <Check className="w-2.5 h-2.5 text-emerald-400" /> : <Copy className="w-2.5 h-2.5" />}
                          </button>
                        </div>
                      </div>
                    </div>

                    <div className="text-[10px] text-slate-300 flex items-center gap-1 font-medium truncate">
                      <MapPin className="w-2.5 h-2.5 text-amber-400 shrink-0" />
                      <span className="truncate">{membership.village}, {membership.taluk}</span>
                    </div>

                    <div className="border-t border-white/15 pt-2 flex items-center justify-between text-[8px] text-slate-400 font-mono">
                      <span>Official Citizen Record</span>
                      <span>2026</span>
                    </div>
                  </div>
                </div>
              ) : (
                /* Unregistered Prompt in Right Column */
                <div className="p-4 rounded-2xl bg-amber-50/70 border border-amber-200 text-center space-y-2.5">
                  <div className="w-10 h-10 rounded-full bg-amber-100 text-amber-700 flex items-center justify-center mx-auto shadow-inner">
                    <Award className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-slate-900">
                      {language === "kn" ? "ಅಧಿಕೃತ ಸದಸ್ಯತ್ವ ಪಡೆಯಿರಿ" : "Get Your Digital Member Card"}
                    </h4>
                    <p className="text-[10px] text-slate-500 mt-0.5">
                      {language === "kn" 
                        ? "ನಿಮ್ಮ ಪಾಲ್ಗೊಳ್ಳುವಿಕೆ • ನಮ್ಮ ಸಂಕಲ್ಪ • ಆಳಂದದ ಪ್ರಗತಿ"
                        : "Join Shri Harshanand Guttedar's official citizen network in 1 minute."}
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => setShowRegModal(true)}
                    className="w-full py-2 rounded-xl bg-amber-500 hover:bg-amber-600 text-white font-bold text-xs shadow-xs transition-all cursor-pointer"
                  >
                    {language === "kn" ? "ಈಗಲೇ ನೋಂದಾಯಿಸಿ (1 min)" : "Register Now (1 min)"}
                  </button>
                </div>
              )}

            </div>


            {/* 2. UPCOMING EVENTS & SCHEDULE (Exact Reference Format) */}
            <div className="bg-white rounded-3xl p-4 sm:p-5 border border-slate-200/80 shadow-xs space-y-3.5">
              
              <div className="flex items-center justify-between border-b border-slate-100 pb-2.5">
                <div className="flex items-center gap-1.5">
                  <Calendar className="w-4 h-4 text-blue-600" />
                  <h3 className="text-xs font-black text-slate-900 uppercase tracking-wider">
                    {language === "kn" ? "ಮುಂಬರುವ ಕಾರ್ಯಕ್ರಮಗಳು" : "Upcoming Events"}
                  </h3>
                </div>

                <Link
                  href="/portal/events"
                  className="text-[11px] font-bold text-blue-600 hover:text-blue-800 cursor-pointer"
                >
                  {language === "kn" ? "ಕ್ಯಾಲೆಂಡರ್" : "View All"}
                </Link>
              </div>

              <div className="space-y-2.5">
                {(liveEvents.length > 0 ? liveEvents : upcomingEvents).map((ev: any) => {
                  const isLive = Boolean(ev.event_date);
                  const dateInfo = isLive 
                    ? parseEventDate(ev.event_date)
                    : { monthKn: ev.monthKn, monthEn: ev.monthEn, day: ev.day, dayNameKn: ev.dayNameKn, dayNameEn: ev.dayNameEn };
                  const title = language === "kn" ? (isLive ? ev.title_kn : ev.titleKn) : (isLive ? ev.title_en : ev.titleEn);
                  const time = isLive ? `${ev.start_time}${ev.end_time ? ` - ${ev.end_time}` : ""}` : ev.time;
                  const status = isLive ? ev.status : (language === "kn" ? ev.statusKn : ev.statusEn);
                  const statusColor = isLive 
                    ? (ev.status === "upcoming" ? "bg-indigo-50 text-indigo-700" : "bg-emerald-50 text-emerald-700")
                    : ev.statusColor;

                  return (
                    <div
                      key={ev.id}
                      onClick={() => {
                        router.push("/portal/events");
                      }}
                      className="bg-slate-50/70 hover:bg-white border border-slate-200/70 hover:border-blue-200 rounded-2xl p-2.5 sm:p-3 shadow-2xs hover:shadow-xs transition-all cursor-pointer flex items-center justify-between gap-2.5"
                    >
                      {/* Left Date Pill */}
                      <div className="w-11 h-11 rounded-xl flex flex-col items-center justify-center shrink-0 border bg-indigo-50 text-indigo-700 border-indigo-200">
                        <span className="text-[8px] font-black uppercase tracking-wider leading-none">
                          {language === "kn" ? dateInfo.monthKn : dateInfo.monthEn}
                        </span>
                        <span className="text-sm font-black leading-tight">
                          {dateInfo.day}
                        </span>
                        <span className="text-[7.5px] font-medium leading-none opacity-80">
                          {language === "kn" ? dateInfo.dayNameKn : dateInfo.dayNameEn}
                        </span>
                      </div>

                      {/* Event Details */}
                      <div className="flex-1 min-w-0 space-y-0.5">
                        <h4 className="text-xs font-bold text-slate-900 truncate">
                          {title}
                        </h4>
                        <div className="flex items-center gap-1.5 text-[10px] text-slate-500">
                          <span className="flex items-center gap-0.5">
                            <Clock className="w-2.5 h-2.5 text-slate-400" />
                            <span>{time}</span>
                          </span>
                        </div>
                      </div>

                      {/* Right Status Badge */}
                      <div className="shrink-0">
                        <span className={`text-[9px] font-bold px-2 py-0.5 rounded-full capitalize ${statusColor}`}>
                          {status}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>

            </div>

            {/* 3. LATEST ARTICLES & INSIGHTS */}
            <div className="bg-white rounded-3xl p-4 sm:p-5 border border-slate-200/80 shadow-xs space-y-3.5">
              <div className="flex items-center justify-between border-b border-slate-100 pb-2.5">
                <div className="flex items-center gap-1.5">
                  <BookOpen className="w-4 h-4 text-amber-600" />
                  <h3 className="text-xs font-black text-slate-900 uppercase tracking-wider">
                    {language === "kn" ? "ಲೇಖನಗಳು & ಸಮಾಚಾರ" : "Articles & Insights"}
                  </h3>
                </div>

                <Link
                  href="/portal/articles"
                  className="text-[11px] font-bold text-amber-600 hover:text-amber-800 cursor-pointer"
                >
                  {language === "kn" ? "ಎಲ್ಲಾ ಲೇಖನಗಳು" : "View All"}
                </Link>
              </div>

              <div className="space-y-2.5">
                {liveArticles.length > 0 ? (
                  liveArticles.map((art) => {
                    const artTitle = language === "kn" ? (art.title_kn || art.title_en) : (art.title_en || art.title_kn);
                    const artSummary = language === "kn" ? (art.summary_kn || art.summary_en) : (art.summary_en || art.summary_kn);
                    return (
                      <div
                        key={art.id}
                        onClick={() => {
                          router.push(`/articles/${art.id}?from=portal`);
                        }}
                        className="bg-slate-50/70 hover:bg-white border border-slate-200/70 hover:border-amber-300 rounded-2xl p-2.5 sm:p-3 shadow-2xs hover:shadow-xs transition-all cursor-pointer flex flex-col gap-1.5 group"
                      >
                        <div className="flex items-center justify-between text-[10px] text-slate-400">
                          <span className="font-bold text-amber-800 bg-amber-50 px-2 py-0.5 rounded-full border border-amber-200/60 uppercase tracking-wider text-[9px]">
                            {art.category}
                          </span>
                          <span className="flex items-center gap-1">
                            <Clock className="w-3 h-3 text-slate-400" />
                            <span>{art.read_time}</span>
                          </span>
                        </div>
                        <h4 className="text-xs font-bold text-slate-900 group-hover:text-amber-600 transition-colors line-clamp-1 leading-tight">
                          {artTitle}
                        </h4>
                        {artSummary && (
                          <p className="text-[11px] text-slate-500 line-clamp-2 leading-relaxed">
                            {artSummary}
                          </p>
                        )}
                      </div>
                    );
                  })
                ) : (
                  <p className="text-xs text-slate-400 py-2 text-center">
                    {language === "kn" ? "ಲೇಖನಗಳನ್ನು ಲೋಡ್ ಮಾಡಲಾಗುತ್ತಿದೆ..." : "Loading latest articles..."}
                  </p>
                )}
              </div>
            </div>

            {/* 4. DIRECT SECRETARIAT HELPLINE DESK */}
            <div className="bg-white rounded-3xl p-4 sm:p-5 border border-slate-200/80 shadow-xs space-y-3">
              <div className="flex items-center gap-1.5 border-b border-slate-100 pb-2">
                <PhoneCall className="w-4 h-4 text-emerald-600" />
                <h3 className="text-xs font-black text-slate-900 uppercase tracking-wider">
                  {language === "kn" ? "ಕಚೇರಿ ಸಂಪರ್ಕ & ಸಹಾಯವಾಣಿ" : "Secretariat Hotline"}
                </h3>
              </div>

              <div className="p-3 rounded-2xl bg-emerald-50/60 border border-emerald-100/80 text-xs space-y-1">
                <span className="text-[9px] font-bold text-emerald-800 uppercase tracking-wide">Main Aland Office</span>
                <p className="font-bold text-slate-900 text-xs">
                  Shri Harshanand Guttedar Secretariat
                </p>
                <p className="text-[11px] text-slate-500">
                  Main Road, Near Court Complex, Aland - 585302
                </p>
                <p className="text-[10px] font-mono text-emerald-700 font-bold pt-1">
                  Hours: 09:30 AM – 06:00 PM (Mon – Sat)
                </p>
              </div>

              <div className="grid grid-cols-2 gap-2 text-xs">
                <a
                  href="tel:+918472250148"
                  className="p-2.5 rounded-xl border border-slate-200 bg-slate-50 hover:bg-blue-50 hover:border-blue-200 transition-all flex flex-col justify-center items-center text-center gap-0.5"
                >
                  <span className="text-[9px] text-slate-400 font-bold uppercase">Grievance Desk</span>
                  <span className="font-mono font-bold text-blue-700 text-xs">+91 8472 250148</span>
                </a>

                <a
                  href="tel:+918472250149"
                  className="p-2.5 rounded-xl border border-slate-200 bg-slate-50 hover:bg-amber-50 hover:border-amber-200 transition-all flex flex-col justify-center items-center text-center gap-0.5"
                >
                  <span className="text-[9px] text-slate-400 font-bold uppercase">Farmer Desk</span>
                  <span className="font-mono font-bold text-amber-700 text-xs">+91 8472 250149</span>
                </a>
              </div>
            </div>

          </div>

        </div>

      </main>


      {/* =========================================================================
          FIXED MOBILE BOTTOM NAVIGATION (Hidden on Tablet & Laptop lg:hidden)
          Matches reference: Home, Services, ID Card, Events, Support
          ========================================================================= */}
      <nav className="fixed bottom-0 inset-x-0 bg-white/95 backdrop-blur-md border-t border-slate-200/80 px-4 py-2 z-40 lg:hidden flex items-center justify-around shadow-lg">
        <button
          type="button"
          onClick={() => setActiveTab("home")}
          className={`flex flex-col items-center gap-0.5 cursor-pointer ${
            activeTab === "home" ? "text-blue-600" : "text-slate-400"
          }`}
        >
          <Home className="w-4 h-4" />
          <span className="text-[9px] font-bold">{language === "kn" ? "ಮುಖಪುಟ" : "Home"}</span>
        </button>

        <button
          type="button"
          onClick={() => {
            setActiveTab("services");
            window.scrollTo({ top: 160, behavior: "smooth" });
          }}
          className={`flex flex-col items-center gap-0.5 cursor-pointer ${
            activeTab === "services" ? "text-blue-600" : "text-slate-400"
          }`}
        >
          <Grid className="w-4 h-4" />
          <span className="text-[9px] font-bold">{language === "kn" ? "ಸೇವೆಗಳು" : "Services"}</span>
        </button>

        {/* Central Floating Button: Membership Card */}
        <button
          type="button"
          onClick={() => {
            setActiveTab("card");
            hasMembership ? setShowCardModal(true) : setShowRegModal(true);
          }}
          className="flex flex-col items-center -mt-5 cursor-pointer group"
        >
          <div className="w-11 h-11 rounded-full bg-gradient-to-tr from-amber-500 via-amber-400 to-red-600 p-[2px] shadow-md group-hover:scale-105 transition-transform">
            <div className="w-full h-full rounded-full bg-slate-900 flex items-center justify-center text-amber-300">
              <IdCard className="w-5 h-5" />
            </div>
          </div>
          <span className="text-[9px] font-black text-amber-700 mt-0.5">
            {language === "kn" ? "ಕಾರ್ಡ್" : "ID Card"}
          </span>
        </button>

        <button
          type="button"
          onClick={() => {
            setActiveTab("events");
            router.push("/portal/events");
          }}
          className={`flex flex-col items-center gap-0.5 cursor-pointer ${
            activeTab === "events" ? "text-blue-600" : "text-slate-400"
          }`}
        >
          <Calendar className="w-4 h-4" />
          <span className="text-[9px] font-bold">{language === "kn" ? "ಕಾರ್ಯಕ್ರಮ" : "Events"}</span>
        </button>

        <button
          type="button"
          onClick={() => {
            setActiveTab("contact");
            setShowHelplineModal(true);
          }}
          className={`flex flex-col items-center gap-0.5 cursor-pointer ${
            activeTab === "contact" ? "text-blue-600" : "text-slate-400"
          }`}
        >
          <Phone className="w-4 h-4" />
          <span className="text-[9px] font-bold">{language === "kn" ? "ಕಚೇರಿ" : "Support"}</span>
        </button>
      </nav>


      {/* =========================================================================
          MODAL 1: DIGITAL MEMBERSHIP CARD (Full Prestige Presentation)
          ========================================================================= */}
      {showCardModal && membership && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl max-w-lg w-full overflow-hidden shadow-2xl border border-slate-200">
            
            <div className="px-5 py-3.5 bg-slate-50 border-b border-slate-100 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-amber-500 animate-pulse" />
                <span className="text-xs font-black text-slate-800 uppercase tracking-wider">
                  {language === "kn" ? "ಅಧಿಕೃತ ಡಿಜಿಟಲ್ ಸದಸ್ಯತ್ವ ಕಾರ್ಡ್" : "Official Digital Membership Card"}
                </span>
              </div>
              <button
                type="button"
                onClick={() => setShowCardModal(false)}
                className="p-1 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-200 transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="p-5">
              <div 
                id="membership-card-print"
                className="rounded-3xl border-2 border-amber-400/60 p-6 text-white shadow-2xl relative overflow-hidden space-y-5"
                style={{
                  background: "linear-gradient(135deg, #0b1120 0%, #1e1b4b 60%, #0b1120 100%)",
                }}
              >
                <div className="absolute inset-0 z-0 overflow-hidden">
                  <img
                    src="/images/hero.jpg"
                    alt="Membership Watermark"
                    className="w-full h-full object-cover object-top opacity-20 filter contrast-125"
                  />
                  <div className="absolute inset-0 bg-gradient-to-br from-slate-950/85 via-indigo-950/80 to-slate-950/90" />
                  <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-amber-400 via-amber-300 to-red-500" />
                </div>

                <div className="absolute bottom-2 right-4 text-7xl font-black text-white/5 pointer-events-none select-none z-0">
                  ಹ
                </div>

                <div className="relative z-10 space-y-4">
                  <div className="flex items-start justify-between border-b border-white/15 pb-3">
                    <div className="flex items-center gap-2.5">
                      <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-400 to-red-500 p-[2px] shadow-sm">
                        <div className="w-full h-full rounded-[10px] bg-slate-950 flex items-center justify-center">
                          <span className="font-black text-amber-400 text-base">ಹ</span>
                        </div>
                      </div>
                      <div>
                        <span className="font-extrabold text-white text-xs sm:text-sm tracking-tight block">
                          {language === "kn" ? "ಶ್ರೀ ಹರ್ಷಾನಂದ ಗುತ್ತೇದಾರ ಜನಸಂಪರ್ಕ ವೇದಿಕೆ" : "Shri Harshanand Guttedar Platform"}
                        </span>
                        <span className="text-[9px] text-amber-300 font-bold uppercase tracking-wider">
                          Aland & Kalaburagi • Karnataka
                        </span>
                      </div>
                    </div>

                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[9px] font-black bg-amber-400 text-slate-950 shadow-xs uppercase">
                      <Award className="w-3 h-3 text-slate-950" />
                      <span>{language === "kn" ? "ಸಕ್ರಿಯ ಸದಸ್ಯ" : "Verified"}</span>
                    </span>
                  </div>

                  <div className="space-y-3">
                    <div>
                      <span className="text-[9px] text-slate-400 uppercase tracking-wider block">Member Name</span>
                      <p className="text-base font-black text-white">{membership.full_name}</p>
                    </div>

                    <div className="grid grid-cols-2 gap-3 text-xs">
                      <div>
                        <span className="text-[9px] text-slate-400 uppercase tracking-wider block">Registered Mobile</span>
                        <p className="font-mono font-bold text-slate-200">+91 {membership.mobile}</p>
                      </div>

                      <div>
                        <span className="text-[9px] text-slate-400 uppercase tracking-wider block">Membership ID</span>
                        <div className="flex items-center gap-1 mt-0.5">
                          <span className="font-mono font-black text-amber-400 text-xs sm:text-sm">
                            {membership.membership_id}
                          </span>
                          <button
                            type="button"
                            onClick={handleCopyId}
                            className="p-1 rounded text-slate-400 hover:text-white bg-white/10 cursor-pointer"
                            title="Copy ID"
                          >
                            {copiedId ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                          </button>
                        </div>
                      </div>
                    </div>

                    <div className="text-[11px] text-slate-300 flex items-center gap-1 font-medium">
                      <MapPin className="w-3 h-3 text-amber-400 shrink-0" />
                      <span>{membership.village}, {membership.taluk}, {membership.district} - {membership.pincode}</span>
                    </div>
                  </div>

                  <div className="border-t border-white/15 pt-2 flex items-center justify-between text-[9px] text-slate-400 font-mono">
                    <span className="flex items-center gap-1">
                      <ShieldCheck className="w-3 h-3 text-emerald-400" />
                      <span>Official Citizen Record</span>
                    </span>
                    <span>Year: 2026</span>
                  </div>

                </div>
              </div>
            </div>

            <div className="p-4 bg-slate-50 border-t border-slate-100 flex items-center justify-end gap-2.5">
              <button
                type="button"
                onClick={handlePrintCard}
                className="px-4 py-2 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 text-xs font-bold transition-all flex items-center gap-1.5 shadow-2xs cursor-pointer"
              >
                <Printer className="w-3.5 h-3.5 text-slate-600" />
                <span>{language === "kn" ? "ಪ್ರಿಂಟ್ / ಸೇವ್" : "Print / Save"}</span>
              </button>

              <button
                type="button"
                onClick={() => setShowCardModal(false)}
                className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold transition-all shadow-xs cursor-pointer"
              >
                {language === "kn" ? "ಮುಚ್ಚಿ" : "Done"}
              </button>
            </div>

          </div>
        </div>
      )}


      {/* =========================================================================
          MODAL 2: REGISTRATION FORM (Clean, Simple, with Kannada Colors)
          ========================================================================= */}
      {showRegModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4 overflow-y-auto animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl max-w-lg w-full overflow-hidden shadow-2xl border border-slate-200 my-8">
            
            <div 
              style={{
                background: "linear-gradient(135deg, #f59e0b 0%, #fbbf24 35%, #e11d48 70%, #b91c1c 100%)",
              }}
              className="p-5 text-white relative overflow-hidden"
            >
              <div className="flex items-center gap-3.5 relative z-10">
                <div className="w-14 h-14 rounded-full border-2 border-white shadow-xl overflow-hidden shrink-0 bg-white ring-2 ring-amber-300">
                  <img
                    src="/images/hero.jpg"
                    alt="Leader"
                    className="w-full h-full object-cover object-top"
                  />
                </div>

                <div className="space-y-0.5 flex-1 min-w-0">
                  <span className="text-[10px] font-black uppercase px-2 py-0.2 rounded-full bg-black/25 text-amber-100 border border-white/20">
                    {language === "kn" ? "ಸದಸ್ಯತ್ವ ನೋಂದಣಿ" : "Citizen Registration"}
                  </span>
                  <h3 className="text-base font-black text-white leading-tight">
                    {language === "kn" ? "ನಮ್ಮೊಂದಿಗೆ ಕೈಜೋಡಿಸಿ" : "Join Hands with Us"}
                  </h3>
                  <p className="text-[10px] text-amber-50 font-semibold truncate">
                    {language === "kn" 
                      ? "ನಿಮ್ಮ ಪಾಲ್ಗೊಳ್ಳುವಿಕೆ • ನಮ್ಮ ಸಂಕಲ್ಪ • ಆಳಂದದ ಪ್ರಗತಿ"
                      : "Your Participation • Our Resolve • Aland's Progress"}
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => setShowRegModal(false)}
                  className="p-1 rounded-full text-white/80 hover:text-white bg-black/20 hover:bg-black/30 transition-colors cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {regError && (
              <div className="m-4 p-2.5 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs font-semibold flex items-center gap-2">
                <AlertCircle className="w-4 h-4 text-red-600 shrink-0" />
                <span>{regError}</span>
              </div>
            )}

            <form onSubmit={handleRegisterSubmit} className="p-5 space-y-3.5 text-xs text-slate-700">
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="font-bold text-slate-800 block">
                    {language === "kn" ? "ಪೂರ್ಣ ಹೆಸರು" : "Full Name"} <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder={language === "kn" ? "ನಿಮ್ಮ ಹೆಸರು" : "Full Name"}
                    value={formData.full_name}
                    onChange={(e) => setFormData({ ...formData, full_name: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 text-slate-900 focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-bold text-slate-800 block">
                    {language === "kn" ? "ಮೊಬೈಲ್ ಸಂಖ್ಯೆ" : "Mobile Number"}
                  </label>
                  <input
                    type="text"
                    disabled
                    value={user?.mobile ? `+91 ${user.mobile}` : ""}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 bg-slate-100 font-mono text-slate-600 font-bold"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="font-bold text-slate-800 block">{language === "kn" ? "ವಯಸ್ಸು" : "Age"}</label>
                  <input
                    type="number"
                    placeholder="e.g. 28"
                    value={formData.age}
                    onChange={(e) => setFormData({ ...formData, age: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 text-slate-900 focus:outline-none focus:border-amber-500"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-bold text-slate-800 block">
                    {language === "kn" ? "ಗ್ರಾಮ" : "Village"} <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder={language === "kn" ? "ಗ್ರಾಮದ ಹೆಸರು" : "Village"}
                    value={formData.village}
                    onChange={(e) => setFormData({ ...formData, village: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 text-slate-900 focus:outline-none focus:border-amber-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-2">
                <div className="space-y-1">
                  <label className="font-bold text-slate-800 block">{language === "kn" ? "ತಾಲೂಕು" : "Taluk"}</label>
                  <input
                    type="text"
                    value={formData.taluk}
                    onChange={(e) => setFormData({ ...formData, taluk: e.target.value })}
                    className="w-full px-2 py-2 rounded-xl border border-slate-200 text-slate-800 text-xs"
                  />
                </div>
                <div className="space-y-1">
                  <label className="font-bold text-slate-800 block">{language === "kn" ? "ಜಿಲ್ಲೆ" : "District"}</label>
                  <input
                    type="text"
                    value={formData.district}
                    onChange={(e) => setFormData({ ...formData, district: e.target.value })}
                    className="w-full px-2 py-2 rounded-xl border border-slate-200 text-slate-800 text-xs"
                  />
                </div>
                <div className="space-y-1">
                  <label className="font-bold text-slate-800 block">{language === "kn" ? "ಪಿನ್‌ಕೋಡ್" : "Pincode"}</label>
                  <input
                    type="text"
                    value={formData.pincode}
                    onChange={(e) => setFormData({ ...formData, pincode: e.target.value })}
                    className="w-full px-2 py-2 rounded-xl border border-slate-200 text-slate-800 text-xs"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="font-bold text-slate-800 block">
                  {language === "kn" ? "ನೀವು ಹೇಗೆ ಕೈಜೋಡಿಸಲು ಬಯಸುತ್ತೀರಿ?" : "How would you like to join hands?"}
                </label>
                <select
                  value={formData.interest}
                  onChange={(e) => setFormData({ ...formData, interest: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 text-slate-900 bg-white focus:outline-none focus:border-amber-500"
                >
                  {interestOptions.map((opt) => (
                    <option key={opt.id} value={opt.id}>
                      {language === "kn" ? opt.kn : opt.en}
                    </option>
                  ))}
                </select>
              </div>

              <div className="space-y-1">
                <label className="font-bold text-slate-800 block">
                  {language === "kn" ? "ನಿಮ್ಮ ಸಲಹೆ" : "Your Suggestion"}
                </label>
                <textarea
                  rows={2}
                  placeholder={language === "kn" ? "ಆಳಂದದ ಅಭಿವೃದ್ಧಿಗೆ ನಿಮ್ಮ ಸಲಹೆ..." : "Suggestions for constituency progress..."}
                  value={formData.suggestion}
                  onChange={(e) => setFormData({ ...formData, suggestion: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 text-slate-900 focus:outline-none focus:border-amber-500 resize-none"
                />
              </div>

              <div className="space-y-1.5 pt-1 border-t border-slate-100 text-[11px] text-slate-600">
                <label className="flex items-start gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.consent_info_correct}
                    onChange={(e) => setFormData({ ...formData, consent_info_correct: e.target.checked })}
                    className="mt-0.5 rounded text-amber-600 focus:ring-amber-500"
                  />
                  <span>1. {language === "kn" ? "ನಾನು ನೀಡಿರುವ ಮಾಹಿತಿಯು ಸರಿಯಾಗಿದೆ." : "The information provided by me is correct."}</span>
                </label>
                <label className="flex items-start gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.consent_contact}
                    onChange={(e) => setFormData({ ...formData, consent_contact: e.target.checked })}
                    className="mt-0.5 rounded text-amber-600 focus:ring-amber-500"
                  />
                  <span>2. {language === "kn" ? "ನನ್ನ ನೋಂದಣಿಗೆ ಸಂಬಂಧಿಸಿದಂತೆ ನನ್ನನ್ನು ಸಂಪರ್ಕಿಸಲು ನಾನು ಒಪ್ಪಿಗೆ ನೀಡುತ್ತೇನೆ." : "I consent to be contacted regarding my registration."}</span>
                </label>
              </div>

              <button
                type="submit"
                disabled={submitting}
                className="w-full py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white font-black text-xs shadow-md transition-all cursor-pointer flex items-center justify-center gap-2"
              >
                {submitting ? (
                  <span>{language === "kn" ? "ನೋಂದಾಯಿಸಲಾಗುತ್ತಿದೆ..." : "Submitting..."}</span>
                ) : (
                  <>
                    <HeartHandshake className="w-4 h-4" />
                    <span>{language === "kn" ? "ಸದಸ್ಯತ್ವ ನೋಂದಣಿ ಪೂರ್ಣಗೊಳಿಸಿ & ಕಾರ್ಡ್ ಪಡೆಯಿರಿ" : "Submit Registration & Get Card"}</span>
                  </>
                )}
              </button>

            </form>
          </div>
        </div>
      )}


      {/* =========================================================================
          MODAL 3: SERVICE DETAILS & HELPLINE DIALOG
          ========================================================================= */}
      {selectedService && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl max-w-md w-full overflow-hidden shadow-2xl border border-slate-200">
            <div className="p-5 space-y-4">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className={`w-11 h-11 rounded-2xl flex items-center justify-center ${selectedService.color || "bg-blue-100 text-blue-600"} shadow-inner`}>
                    {React.createElement(selectedService.icon || Sparkles, { className: "w-5 h-5" })}
                  </div>
                  <div>
                    <h3 className="text-base font-extrabold text-slate-900 leading-tight">
                      {language === "kn" ? selectedService.titleKn : selectedService.titleEn}
                    </h3>
                    <span className="text-[11px] text-slate-400 font-semibold uppercase">
                      {language === "kn" ? "ಅಧಿಕೃತ ನಾಗರಿಕ ಸೇವೆ" : "Constituency Service"}
                    </span>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => setSelectedService(null)}
                  className="p-1 rounded-full text-slate-400 hover:text-slate-700 cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-100 text-xs text-slate-600 leading-relaxed">
                {language === "kn" ? selectedService.descKn : selectedService.descEn}
              </div>

              {selectedService.contact && (
                <div className="p-3 rounded-xl bg-amber-50/60 border border-amber-200/70 flex items-center justify-between text-xs">
                  <div>
                    <span className="text-[10px] text-slate-500 font-bold uppercase block">
                      {language === "kn" ? "ನೇರ ಸಂಪರ್ಕ ಸಹಾಯವಾಣಿ" : "Direct Helpline"}
                    </span>
                    <span className="font-mono font-black text-amber-900 text-sm">
                      {selectedService.contact}
                    </span>
                  </div>
                  <a
                    href={`tel:${selectedService.contact.replace(/\s+/g, "")}`}
                    className="px-3 py-1.5 rounded-lg bg-amber-500 hover:bg-amber-600 text-white font-bold text-xs flex items-center gap-1 shadow-xs"
                  >
                    <Phone className="w-3.5 h-3.5" />
                    <span>{language === "kn" ? "ಕರೆ ಮಾಡಿ" : "Call"}</span>
                  </a>
                </div>
              )}
            </div>

            <div className="p-4 bg-slate-50 border-t border-slate-100 flex items-center justify-end">
              <button
                type="button"
                onClick={() => setSelectedService(null)}
                className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold transition-all cursor-pointer"
              >
                {language === "kn" ? "ಮುಚ್ಚಿ" : "Close"}
              </button>
            </div>
          </div>
        </div>
      )}


      {/* =========================================================================
          MODAL 4: NOTIFICATIONS DIALOG
          ========================================================================= */}
      {showNotificationModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl max-w-md w-full overflow-hidden shadow-2xl border border-slate-200">
            <div className="p-4 bg-slate-50 border-b border-slate-100 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Bell className="w-4 h-4 text-blue-600" />
                <h3 className="text-xs font-black text-slate-900 uppercase tracking-wider">
                  {language === "kn" ? "ಅಧಿಕೃತ ಪ್ರಕಟಣೆಗಳು" : "Constituency Notices"}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setShowNotificationModal(false)}
                className="p-1 rounded-full text-slate-400 hover:text-slate-700 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="p-4 space-y-3 text-xs divide-y divide-slate-100 max-h-80 overflow-y-auto">
              <div className="pt-2 first:pt-0 space-y-1">
                <span className="text-[10px] font-black px-1.5 py-0.2 rounded bg-red-100 text-red-700 uppercase">
                  Important
                </span>
                <h4 className="font-bold text-slate-800">
                  {language === "kn" ? "ತೊಗರಿ ಬೆಳೆಗಾರರಿಗೆ ಬೆಂಬಲ ಬೆಲೆ ನವೀಕರಣ" : "Minimum Support Price Update for Red Gram"}
                </h4>
                <p className="text-[11px] text-slate-500">
                  {language === "kn" 
                    ? "ಕಲಬುರಗಿ ಮತ್ತು ಆಳಂದ ಎಪಿಎಂಸಿಯಲ್ಲಿ ಜಿಐ-ಟ್ಯಾಗ್ ತೊಗರಿ ನೋಂದಣಿ ಆರಂಭವಾಗಿದೆ." 
                    : "Direct procurement registrations open at Aland APMC yard with fair price assurance."}
                </p>
              </div>

              <div className="pt-3 space-y-1">
                <span className="text-[10px] font-black px-1.5 py-0.2 rounded bg-blue-100 text-blue-700 uppercase">
                  Service
                </span>
                <h4 className="font-bold text-slate-800">
                  {language === "kn" ? "ಶುದ್ಧ ಗಂಗಾ ಆರ್‌ಒ ಘಟಕಗಳ ಪರಿಶೀಲನಾ ಅಭಿಯಾನ" : "Shuddha Ganga RO Plant Inspection"}
                </h4>
                <p className="text-[11px] text-slate-500">
                  {language === "kn" 
                    ? "ಆಳಂದ ಕ್ಷೇತ್ರದ ಎಲ್ಲಾ ಗ್ರಾಮಗಳಲ್ಲಿ ನೀರಿನ ಗುಣಮಟ್ಟ ತಪಾಸಣೆ ಕೈಗೊಳ್ಳಲಾಗಿದೆ." 
                    : "Water quality inspection completed across 42 village centers in Aland taluk."}
                </p>
              </div>
            </div>

            <div className="p-3.5 bg-slate-50 border-t border-slate-100 flex justify-end">
              <button
                type="button"
                onClick={() => setShowNotificationModal(false)}
                className="px-4 py-1.5 rounded-xl bg-blue-600 text-white text-xs font-bold cursor-pointer"
              >
                {language === "kn" ? "ಮುಚ್ಚಿ" : "Close"}
              </button>
            </div>
          </div>
        </div>
      )}


      {/* =========================================================================
          MODAL 5: SECRETARIAT & HELPLINE MODAL
          ========================================================================= */}
      {showHelplineModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl max-w-md w-full overflow-hidden shadow-2xl border border-slate-200">
            <div className="p-4 bg-slate-50 border-b border-slate-100 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <PhoneCall className="w-4 h-4 text-emerald-600" />
                <h3 className="text-xs font-black text-slate-900 uppercase tracking-wider">
                  {language === "kn" ? "ಶಾಸಕರ ಸಾರ್ವಜನಿಕ ಸಂಪರ್ಕ ಕಚೇರಿ" : "Secretariat Public Helpline"}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setShowHelplineModal(false)}
                className="p-1 rounded-full text-slate-400 hover:text-slate-700 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="p-5 space-y-3.5 text-xs">
              <div className="p-3 rounded-2xl bg-emerald-50 border border-emerald-100 text-emerald-900 space-y-1">
                <span className="text-[10px] font-bold uppercase tracking-wide text-emerald-700">Official Secretariat Address</span>
                <p className="font-bold text-slate-800">
                  Shri Harshanand Guttedar Public Secretariat
                </p>
                <p className="text-[11px] text-slate-600">
                  Main Road, Near Court Complex, Aland, Kalaburagi - 585302
                </p>
                <p className="text-[11px] font-mono text-emerald-700 pt-1 font-bold">
                  Working Hours: 09:30 AM – 06:00 PM (Mon – Sat)
                </p>
              </div>

              <div className="space-y-2">
                <div className="p-3 rounded-xl border border-slate-200 flex items-center justify-between">
                  <div>
                    <span className="text-[10px] text-slate-400 uppercase font-bold block">Helpline 1 (Grievance)</span>
                    <span className="font-mono font-bold text-slate-800 text-xs">+91 8472 250148</span>
                  </div>
                  <a href="tel:+918472250148" className="px-3 py-1 bg-blue-600 text-white rounded-lg text-xs font-bold">Call</a>
                </div>

                <div className="p-3 rounded-xl border border-slate-200 flex items-center justify-between">
                  <div>
                    <span className="text-[10px] text-slate-400 uppercase font-bold block">Helpline 2 (Farmer Export)</span>
                    <span className="font-mono font-bold text-slate-800 text-xs">+91 8472 250149</span>
                  </div>
                  <a href="tel:+918472250149" className="px-3 py-1 bg-amber-600 text-white rounded-lg text-xs font-bold">Call</a>
                </div>
              </div>
            </div>

            <div className="p-3.5 bg-slate-50 border-t border-slate-100 flex justify-end">
              <button
                type="button"
                onClick={() => setShowHelplineModal(false)}
                className="px-4 py-1.5 rounded-xl bg-slate-900 text-white text-xs font-bold cursor-pointer"
              >
                {language === "kn" ? "ಮುಚ್ಚಿ" : "Close"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* =========================================================================
          MODAL: FILE CITIZEN GRIEVANCE PETITION (ಜನಸ್ಪಂದನ)
          ========================================================================= */}
      {showGrievanceModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4 animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl max-w-lg w-full overflow-hidden shadow-2xl border border-slate-200">
            {/* Clean White Modal Header */}
            <div className="px-5 py-3.5 bg-white border-b border-slate-200 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-rose-50 border border-rose-200 flex items-center justify-center text-rose-600">
                  <FileText className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-sm font-extrabold text-slate-900 leading-tight">
                    {language === "kn" ? "ಜನಸ್ಪಂದನ - ಕುಂದುಕೊರತೆ ಅರ್ಜಿ ಸಲ್ಲಿಕೆ" : "File Citizen Grievance Petition"}
                  </h3>
                  <p className="text-[10px] text-slate-500">
                    {language === "kn" ? "ಆಳಂದ ಮತಕ್ಷೇತ್ರ ಸಾರ್ವಜನಿಕ ಕುಂದುಕೊರತೆ ನಿವಾರಣೆ" : "Aland Constituency Citizen Redressal Cell"}
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => {
                  setShowGrievanceModal(false);
                  setGrievanceSuccess(null);
                }}
                className="p-1 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {grievanceSuccess ? (
              /* Success State */
              <div className="p-6 text-center space-y-4">
                <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-inner">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <div className="space-y-1">
                  <span className="text-[11px] font-bold text-emerald-800 bg-emerald-50 px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                    {language === "kn" ? "ಅರ್ಜಿ ಯಶಸ್ವಿಯಾಗಿ ದಾಖಲಾಗಿದೆ" : "Petition Submitted Successfully"}
                  </span>
                  <h4 className="text-base font-extrabold text-slate-900 pt-1">
                    {language === "kn" ? "ನಿಮ್ಮ ಅರ್ಜಿ ಪರಿಶೀಲನೆಗೆ ರವಾನೆಯಾಗಿದೆ" : "Grievance Logged for Official Review"}
                  </h4>
                  <p className="text-xs text-slate-500 max-w-sm mx-auto">
                    {language === "kn"
                      ? "ಶ್ರೀ ಹರ್ಷಾನಂದ ಗುತ್ತೇದಾರರ ಕಚೇರಿ ಹಾಗೂ ಸಂಬಂಧಪಟ್ಟ ಇಲಾಖಾ ಅಧಿಕಾರಿಗೆ ನಿಮ್ಮ ಅರ್ಜಿಯನ್ನು ರವಾನಿಸಲಾಗಿದೆ."
                      : "Your grievance has been logged and assigned for review. Track progress anytime in this portal using your tracking ID."}
                  </p>
                </div>

                {/* Tracking ID Copy Box */}
                <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-between max-w-xs mx-auto">
                  <div className="text-left">
                    <span className="text-[9px] text-slate-400 font-bold uppercase block">Tracking ID</span>
                    <span className="font-mono font-black text-blue-700 text-sm">
                      {grievanceSuccess.tracking_id}
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={() => handleCopyGrievanceId(grievanceSuccess.tracking_id)}
                    className="px-2.5 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold flex items-center gap-1 transition-colors cursor-pointer"
                  >
                    {copiedGrievanceId === grievanceSuccess.tracking_id ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-white" />
                        <span>Copied</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5 text-white" />
                        <span>Copy</span>
                      </>
                    )}
                  </button>
                </div>

                <div className="pt-2">
                  <button
                    type="button"
                    onClick={() => {
                      setShowGrievanceModal(false);
                      setGrievanceSuccess(null);
                    }}
                    className="w-full py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs transition-colors cursor-pointer"
                  >
                    {language === "kn" ? "ಮುಕ್ತಾಯ / ಅರ್ಜಿ ವೀಕ್ಷಿಸಿ" : "Done / View My Petitions"}
                  </button>
                </div>
              </div>
            ) : (
              /* Submission Form */
              <form onSubmit={handleGrievanceSubmit} className="p-5 space-y-3.5 max-h-[80vh] overflow-y-auto">
                {grievanceError && (
                  <div className="p-2.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 text-rose-500 shrink-0" />
                    <span>{grievanceError}</span>
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  <div>
                    <label className="font-bold text-slate-700 block mb-1">
                      {language === "kn" ? "ನಾಗರಿಕರ ಹೆಸರು *" : "Citizen Name *"}
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Basavaraj Patil"
                      value={grievanceFormData.citizen_name}
                      onChange={(e) => setGrievanceFormData({ ...grievanceFormData, citizen_name: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl border border-slate-200 text-slate-900 focus:outline-none focus:border-rose-500 text-xs"
                    />
                  </div>

                  <div>
                    <label className="font-bold text-slate-700 block mb-1">
                      {language === "kn" ? "ಮೊಬೈಲ್ ಸಂಖ್ಯೆ *" : "Mobile Number *"}
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="9845012345"
                      value={grievanceFormData.mobile}
                      onChange={(e) => setGrievanceFormData({ ...grievanceFormData, mobile: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl border border-slate-200 text-slate-900 focus:outline-none focus:border-rose-500 text-xs font-mono"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                  <div>
                    <label className="font-bold text-slate-700 block mb-1">
                      {language === "kn" ? "ಗ್ರಾಮ / ವಾರ್ಡ್ *" : "Village / Ward *"}
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Nimbal / Aland Town"
                      value={grievanceFormData.village_name}
                      onChange={(e) => setGrievanceFormData({ ...grievanceFormData, village_name: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl border border-slate-200 text-slate-900 focus:outline-none focus:border-rose-500 text-xs"
                    />
                  </div>

                  <div>
                    <label className="font-bold text-slate-700 block mb-1">
                      {language === "kn" ? "ತಾಲೂಕು" : "Taluk"}
                    </label>
                    <input
                      type="text"
                      value={grievanceFormData.taluk}
                      onChange={(e) => setGrievanceFormData({ ...grievanceFormData, taluk: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl border border-slate-200 text-slate-900 focus:outline-none focus:border-rose-500 text-xs"
                    />
                  </div>

                  <div>
                    <label className="font-bold text-slate-700 block mb-1">
                      {language === "kn" ? "ಪಿನ್‌ಕೋಡ್" : "Pincode"}
                    </label>
                    <input
                      type="text"
                      value={grievanceFormData.pincode}
                      onChange={(e) => setGrievanceFormData({ ...grievanceFormData, pincode: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl border border-slate-200 text-slate-900 focus:outline-none focus:border-rose-500 text-xs font-mono"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  <div>
                    <label className="font-bold text-slate-700 block mb-1">
                      {language === "kn" ? "ವಿಷಯ / ಇಲಾಖೆ ವರ್ಗ *" : "Concern Category *"}
                    </label>
                    <select
                      value={grievanceFormData.category}
                      onChange={(e) => setGrievanceFormData({ ...grievanceFormData, category: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl border border-slate-200 text-slate-900 focus:outline-none focus:border-rose-500 text-xs cursor-pointer"
                    >
                      <option value="Roads & Infrastructure">Roads & Infrastructure (ರಸ್ತೆ & ಮೂಲಸೌಕರ್ಯ)</option>
                      <option value="Drinking Water & RO Plants">Drinking Water (ಕುಡಿಯುವ ನೀರು & RO)</option>
                      <option value="Agriculture & Tur Dal Support">Agriculture & Tur Dal (ರೈತರು & ಕೃಷಿ)</option>
                      <option value="Electricity & Power Supply">Electricity & Power (ವಿದ್ಯುತ್ ಸರಬರಾಜು)</option>
                      <option value="Education & School Infrastructure">Education & Schools (ಶಿಕ್ಷಣ & ಶಾಲೆಗಳು)</option>
                      <option value="Healthcare & Hospital Facilities">Healthcare & Hospitals (ಆರೋಗ್ಯ ಸೇವೆ)</option>
                      <option value="Irrigation & Borewell Permits">Irrigation & Canal (ನೀರಾವರಿ & ಕಾಲುವೆ)</option>
                      <option value="Youth & Employment Assistance">Youth & Jobs (ಯುವಜನ & ಉದ್ಯೋಗ)</option>
                      <option value="Other Constituency Concerns">Other (ಇತರೆ ಕುಂದುಕೊರತೆಗಳು)</option>
                    </select>
                  </div>

                  <div>
                    <label className="font-bold text-slate-700 block mb-1">
                      {language === "kn" ? "ತುರ್ತು ಆದ್ಯತೆ *" : "Urgency Level *"}
                    </label>
                    <select
                      value={grievanceFormData.urgency}
                      onChange={(e) => setGrievanceFormData({ ...grievanceFormData, urgency: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl border border-slate-200 text-slate-900 focus:outline-none focus:border-rose-500 text-xs cursor-pointer"
                    >
                      <option value="low">Low - Normal Request (ಸಾಮಾನ್ಯ)</option>
                      <option value="medium">Medium - Action Needed (ಮಧ್ಯಮ ಆದ್ಯತೆ)</option>
                      <option value="high">High - Immediate Issue (ಹೆಚ್ಚಿನ ತುರ್ತು)</option>
                      <option value="critical">Critical - Emergency / Danger (ತುರ್ತು ಅಪಾಯ)</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-1 text-xs">
                  <label className="font-bold text-slate-700 block">
                    {language === "kn" ? "ಅರ್ಜಿಯ ಮುಖ್ಯ ಶೀರ್ಷಿಕೆ / ವಿಷಯ *" : "Grievance Subject / Title *"}
                  </label>
                  <input
                    type="text"
                    required
                    placeholder={
                      language === "kn"
                        ? "ಉದಾ: ನಿಂಬಾಳ ಗ್ರಾಮದ ಮುಖ್ಯ ರಸ್ತೆ ದುರಸ್ತಿ ಹಾಗೂ ಡಾಂಬರೀಕರಣ"
                        : "e.g. Nimbal village main road repair and pothole patching"
                    }
                    value={grievanceFormData.title}
                    onChange={(e) => setGrievanceFormData({ ...grievanceFormData, title: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 text-slate-900 focus:outline-none focus:border-rose-500 text-xs"
                  />
                </div>

                <div className="space-y-1 text-xs">
                  <label className="font-bold text-slate-700 block">
                    {language === "kn" ? "ಸಮಸ್ಯೆಯ ಸಂಪೂರ್ಣ ವಿವರಣೆ *" : "Detailed Description of Concern *"}
                  </label>
                  <textarea
                    rows={4}
                    required
                    placeholder={
                      language === "kn"
                        ? "ಸಮಸ್ಯೆಯ ನಿಖರ ಸ್ಥಳ, ಬಾಧಿತ ಜನರ ಸಂಖ್ಯೆ ಮತ್ತು ಪರಿಹಾರದ ಅಗತ್ಯತೆಗಳನ್ನು ಇಲ್ಲಿ ಬರೆಯಿರಿ..."
                        : "Describe the exact spot, how many citizens/farmers are affected, and requested action..."
                    }
                    value={grievanceFormData.description}
                    onChange={(e) => setGrievanceFormData({ ...grievanceFormData, description: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 text-slate-900 focus:outline-none focus:border-rose-500 text-xs resize-none"
                  />
                </div>

                <div className="pt-2 border-t border-slate-100 flex items-center justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => setShowGrievanceModal(false)}
                    className="px-4 py-2 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-semibold cursor-pointer"
                  >
                    {language === "kn" ? "ರದ್ದುಮಾಡಿ" : "Cancel"}
                  </button>
                  <button
                    type="submit"
                    disabled={submittingGrievance}
                    className="px-5 py-2 rounded-xl bg-gradient-to-r from-rose-600 to-rose-700 hover:from-rose-700 hover:to-rose-800 text-white font-bold text-xs shadow-md transition-all flex items-center gap-1.5 cursor-pointer disabled:opacity-50"
                  >
                    {submittingGrievance ? (
                      <>
                        <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                        <span>{language === "kn" ? "ದಾಖಲಿಸಲಾಗುತ್ತಿದೆ..." : "Submitting..."}</span>
                      </>
                    ) : (
                      <>
                        <Send className="w-3.5 h-3.5" />
                        <span>{language === "kn" ? "ಅರ್ಜಿ ಸಲ್ಲಿಸಿ" : "Submit Grievance"}</span>
                      </>
                    )}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}

      {/* 6. Farmer Advisory & Consultation Modal */}
      {showFarmerModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl max-w-lg w-full overflow-hidden shadow-2xl border border-slate-100 flex flex-col max-h-[90vh]">
            {/* Clean White Modal Header */}
            <div className="p-4 sm:p-5 border-b border-slate-200 flex items-center justify-between bg-white text-slate-900">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center">
                  <Sprout className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-extrabold text-sm sm:text-base text-slate-900">
                    {language === "kn" ? "ರೈತ ಸಮಾಲೋಚನೆ & ತೊಗರಿ ರಫ್ತು ವಿನಂತಿ" : "Farmer Advisory & Consultation Desk"}
                  </h3>
                  <p className="text-[11px] text-slate-500">
                    {language === "kn"
                      ? "ಶ್ರೀ ಹರ್ಷಾನಂದ ಗುತ್ತೇದಾರ ಕೃಷಿ ಸಹಾಯವಾಣಿಯಿಂದ ನೇರ ಮಾರ್ಗದರ್ಶನ"
                      : "Direct consultation from Shri Harshanand Guttedar's agricultural desk"}
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setShowFarmerModal(false)}
                className="p-1 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {farmerSuccess ? (
              <div className="p-6 text-center space-y-4">
                <div className="w-14 h-14 bg-emerald-100 text-emerald-600 rounded-2xl flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <div className="space-y-1">
                  <h4 className="text-base font-extrabold text-slate-900">
                    {language === "kn" ? "ವಿನಂತಿ ಯಶಸ್ವಿಯಾಗಿ ಸಲ್ಲಿಕೆಯಾಗಿದೆ!" : "Inquiry Submitted Successfully!"}
                  </h4>
                  <p className="text-xs text-slate-600 max-w-sm mx-auto">
                    {language === "kn"
                      ? "ನಿಮ್ಮ ಕೃಷಿ/ತೊಗರಿ ಬೆಳೆ ಪ್ರಶ್ನೆಯನ್ನು ಕೃಷಿ ಕೋಶಕ್ಕೆ ಕಳುಹಿಸಲಾಗಿದೆ. ನಮ್ಮ ಸಮನ್ವಯಕಾರರು ಶೀಘ್ರದಲ್ಲೇ ನಿಮ್ಮನ್ನು ಸಂಪರ್ಕಿಸಲಿದ್ದಾರೆ."
                      : "Your farmer advisory request has been sent to our agriculture coordination team. You can track status right here in your portal."}
                  </p>
                </div>
                <div className="pt-2">
                  <button
                    type="button"
                    onClick={() => {
                      setShowFarmerModal(false);
                      setFarmerSuccess(false);
                      setActiveRequestTab("farmers");
                    }}
                    className="px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs transition-colors cursor-pointer"
                  >
                    {language === "kn" ? "ಸ್ಥಿತಿ ವೀಕ್ಷಿಸಿ" : "View My Requests"}
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleFarmerSubmit} className="p-4 sm:p-6 overflow-y-auto space-y-3.5">
                {farmerError && (
                  <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 text-rose-500 shrink-0" />
                    <span>{farmerError}</span>
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="space-y-1 text-xs">
                    <label className="font-bold text-slate-700 block">
                      {language === "kn" ? "ರೈತರ ಹೆಸರು *" : "Farmer Name *"}
                    </label>
                    <input
                      type="text"
                      required
                      value={farmerFormData.name}
                      onChange={(e) => setFarmerFormData({ ...farmerFormData, name: e.target.value })}
                      placeholder={language === "kn" ? "ಉದಾ: ಬಸವರಾಜ ಪಾಟೀಲ" : "e.g. Basavaraj Patil"}
                      className="w-full px-3 py-2 rounded-xl border border-slate-200 text-slate-900 focus:outline-none focus:border-amber-500 text-xs"
                    />
                  </div>

                  <div className="space-y-1 text-xs">
                    <label className="font-bold text-slate-700 block">
                      {language === "kn" ? "ಮೊಬೈಲ್ ಸಂಖ್ಯೆ *" : "Mobile Number *"}
                    </label>
                    <input
                      type="tel"
                      required
                      value={farmerFormData.phone}
                      onChange={(e) => setFarmerFormData({ ...farmerFormData, phone: e.target.value })}
                      placeholder="10 digit mobile"
                      className="w-full px-3 py-2 rounded-xl border border-slate-200 text-slate-900 focus:outline-none focus:border-amber-500 text-xs"
                    />
                  </div>
                </div>

                <div className="space-y-1 text-xs">
                  <label className="font-bold text-slate-700 block">
                    {language === "kn" ? "ಗ್ರಾಮ / ಸ್ಥಳ *" : "Village / Location *"}
                  </label>
                  <input
                    type="text"
                    required
                    value={farmerFormData.location}
                    onChange={(e) => setFarmerFormData({ ...farmerFormData, location: e.target.value })}
                    placeholder={language === "kn" ? "ಉದಾ: ನಿಂಬಾಳ, ಆಳಂದ ತಾಲ್ಲೂಕು" : "e.g. Nimbal, Aland Taluk"}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 text-slate-900 focus:outline-none focus:border-amber-500 text-xs"
                  />
                </div>

                <div className="space-y-1 text-xs">
                  <label className="font-bold text-slate-700 block">
                    {language === "kn" ? "ಕೃಷಿ ಪ್ರಶ್ನೆ / ಸಮಾಲೋಚನೆ ಅಗತ್ಯತೆ *" : "Advisory Request / Question *"}
                  </label>
                  <textarea
                    rows={4}
                    required
                    value={farmerFormData.message}
                    onChange={(e) => setFarmerFormData({ ...farmerFormData, message: e.target.value })}
                    placeholder={
                      language === "kn"
                        ? "ತೊಗರಿ ಬೆಳೆ ನೇರ ರಫ್ತು, ಮಣ್ಣು ಪರೀಕ್ಷೆ, ಸೌರ ಶೀತಲೀಕರಣ ಘಟಕ ಅಥವಾ ಕೃಷಿ ಪರಿಕರಗಳ ಬಗ್ಗೆ ನಿಮ್ಮ ಪ್ರಶ್ನೆಯನ್ನು ಬರೆಯಿರಿ..."
                        : "Describe your query regarding GI Tur export registration, solar cold storage, soil testing, or crop advisory..."
                    }
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 text-slate-900 focus:outline-none focus:border-amber-500 text-xs resize-none"
                  />
                </div>

                <div className="pt-2 border-t border-slate-100 flex items-center justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => setShowFarmerModal(false)}
                    className="px-4 py-2 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-semibold cursor-pointer"
                  >
                    {language === "kn" ? "ರದ್ದುಮಾಡಿ" : "Cancel"}
                  </button>
                  <button
                    type="submit"
                    disabled={submittingFarmer}
                    className="px-5 py-2 rounded-xl bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-700 hover:to-amber-800 text-white font-bold text-xs shadow-md transition-all flex items-center gap-1.5 cursor-pointer disabled:opacity-50"
                  >
                    {submittingFarmer ? (
                      <>
                        <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                        <span>{language === "kn" ? "ಕಳುಹಿಸಲಾಗುತ್ತಿದೆ..." : "Submitting..."}</span>
                      </>
                    ) : (
                      <>
                        <Send className="w-3.5 h-3.5" />
                        <span>{language === "kn" ? "ವಿನಂತಿ ಸಲ್ಲಿಸಿ" : "Submit Request"}</span>
                      </>
                    )}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}

      {/* 7. Coming Soon Feature Modal */}
      {showComingSoonModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl max-w-md w-full overflow-hidden shadow-2xl border border-slate-100 p-6 text-center space-y-4">
            <div className="w-14 h-14 bg-amber-100 text-amber-700 rounded-2xl flex items-center justify-center mx-auto shadow-2xs">
              <Sparkles className="w-7 h-7" />
            </div>
            <div className="space-y-1.5">
              <span className="text-[10px] font-black uppercase tracking-wider text-amber-800 bg-amber-100 px-2.5 py-0.5 rounded-full">
                {language === "kn" ? "ಶೀಘ್ರದಲ್ಲೇ ಬರಲಿದೆ" : "Coming Soon"}
              </span>
              <h3 className="text-base sm:text-lg font-black text-slate-900 pt-1">
                {language === "kn" ? comingSoonFeature.titleKn : comingSoonFeature.titleEn}
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed max-w-sm mx-auto">
                {language === "kn" ? comingSoonFeature.descKn : comingSoonFeature.descEn}
              </p>
            </div>

            <div className="p-3 bg-slate-50 rounded-2xl border border-slate-200/70 text-[11px] text-slate-500">
              {language === "kn"
                ? "ಈ ವಿಭಾಗದ ನವೀಕರಣ ಪ್ರಕ್ರಿಯೆಯಲ್ಲಿದೆ. ಹೊಸ ಭಾವಚಿತ್ರಗಳು ಹಾಗೂ ವೀಡಿಯೊಗಳನ್ನು ಶೀಘ್ರದಲ್ಲೇ ನಿರೀಕ್ಷಿಸಿ."
                : "This archive is currently being curated with official footage and photos. Check back soon for interactive gallery updates."}
            </div>

            <button
              type="button"
              onClick={() => setShowComingSoonModal(false)}
              className="w-full py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs transition-colors cursor-pointer"
            >
              {language === "kn" ? "ಸರಿ, ಅರ್ಥವಾಯಿತು" : "Got it, Close"}
            </button>
          </div>
        </div>
      )}

      {/* End Portal Modals */}

    </div>
  );
}