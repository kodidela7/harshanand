"use client";

import React, { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { useLanguage } from "@/context/LanguageContext";
import {
  Search,
  Download,
  RefreshCw,
  Copy,
  Check,
  LogOut,
  Users,
  Smartphone,
  Laptop,
  Activity,
  ShieldCheck,
  CheckCircle2,
  ShieldAlert,
  ChevronLeft,
  ChevronRight,
  Menu,
  X,
  ArrowLeftRight,
  HeartHandshake,
  IdCard,
  MapPin,
  Calendar,
  Plus,
  Pencil,
  Trash2,
  Clock,
  AlertCircle,
  Newspaper,
  BookOpen,
  Eye,
  FileText,
  Sprout,
  MessageSquare
} from "lucide-react";

interface ActivityLog {
  id: number;
  user_id: number | null;
  mobile: string;
  action: string;
  ip_address: string;
  device_type: string;
  user_agent: string;
  metadata: any;
  created_at: string;
  user_name?: string;
  user_role?: string;
}

interface MembershipItem {
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

interface EventItem {
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
  status: "upcoming" | "completed" | "cancelled";
  banner_url: string | null;
  contact_person: string | null;
  contact_phone: string | null;
  created_at: string;
  updated_at: string;
}

interface UserItem {
  id: number;
  mobile: string;
  name: string | null;
  role: string;
  preferred_language: string;
  status: string;
  last_login_at: string | null;
  created_at: string;
  updated_at: string;
}

interface SessionItem {
  id: number;
  user_id: number;
  session_id: string;
  ip_address: string;
  is_revoked: number;
  expires_at: string;
  created_at: string;
  mobile: string;
  role: string;
  is_expired: number;
}

interface ArticleItem {
  id: number;
  title_kn: string;
  title_en: string;
  summary_kn?: string;
  summary_en?: string;
  content_kn: string;
  content_en: string;
  category: string;
  author: string;
  banner_url?: string;
  read_time: string;
  status: string;
  views_count: number;
  published_at: string;
  created_at: string;
}

interface ConcernItem {
  id: number;
  tracking_id: string;
  user_id: number | null;
  citizen_name: string;
  mobile: string;
  email: string | null;
  category: string;
  urgency: string;
  village: string;
  village_name?: string;
  taluk: string;
  district: string;
  pincode: string;
  title: string;
  description: string;
  status: "submitted" | "under_review" | "in_progress" | "resolved" | "rejected";
  assigned_to: string | null;
  admin_remarks: string | null;
  resolved_at_formatted: string | null;
  created_at_formatted: string;
  updated_at_formatted: string;
  created_at: string;
  updated_at: string;
}

interface ContactItem {
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

export default function AdminDashboardPage() {
  const { language, setLanguage } = useLanguage();
  const router = useRouter();

  // Authentication
  const [adminUser, setAdminUser] = useState<any>(null);
  const [initialLoading, setInitialLoading] = useState(true);

  // Active Tab: 'logs' | 'memberships' | 'events' | 'articles' | 'concerns' | 'farmer_requests' | 'general_enquiries' | 'users' | 'sessions'
  const [activeTab, setActiveTab] = useState<"logs" | "memberships" | "events" | "articles" | "concerns" | "farmer_requests" | "general_enquiries" | "users" | "sessions">("logs");

  // Mobile sidebar open state
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Filter for logs (OTP and Security are managed via these top filter pills)
  const [selectedFilter, setSelectedFilter] = useState("all");

  // Filter for events
  const [selectedEventFilter, setSelectedEventFilter] = useState("all");

  // Filter for articles
  const [selectedArticleFilter, setSelectedArticleFilter] = useState("all");

  // Filter for concerns
  const [selectedConcernFilter, setSelectedConcernFilter] = useState("all");
  const [selectedConcernCategory, setSelectedConcernCategory] = useState("all");

  // Filter for farmer & contact requests
  const [selectedContactFilter, setSelectedContactFilter] = useState("all");
  const [selectedContactSource, setSelectedContactSource] = useState("all");

  // Query Parameters
  const [searchQuery, setSearchQuery] = useState("");
  const [appliedSearch, setAppliedSearch] = useState("");
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(15);

  // Data states
  const [logs, setLogs] = useState<ActivityLog[]>([]);
  const [memberships, setMemberships] = useState<MembershipItem[]>([]);
  const [events, setEvents] = useState<EventItem[]>([]);
  const [articles, setArticles] = useState<ArticleItem[]>([]);
  const [concerns, setConcerns] = useState<ConcernItem[]>([]);
  const [contactMessages, setContactMessages] = useState<ContactItem[]>([]);
  const [users, setUsers] = useState<UserItem[]>([]);
  const [sessions, setSessions] = useState<SessionItem[]>([]);
  const [pagination, setPagination] = useState({ page: 1, limit: 15, total: 0, totalPages: 1 });
  const [stats, setStats] = useState({ totalLogs: 0, loginSuccess: 0, otpCount: 0, securityAlerts: 0, totalMembers: 0 });
  const [eventStats, setEventStats] = useState({ total: 0, upcoming: 0, completed: 0, cancelled: 0 });
  const [articleStats, setArticleStats] = useState({ totalArticles: 0, publishedArticles: 0, draftArticles: 0, totalViews: 0 });
  const [concernStats, setConcernStats] = useState({ total_all: 0, count_submitted: 0, count_under_review: 0, count_in_progress: 0, count_resolved: 0, count_rejected: 0 });
  const [contactStats, setContactStats] = useState({ total: 0, farmers: 0, contact: 0, newsletter: 0, newCount: 0, inProgressCount: 0, contactedCount: 0, resolvedCount: 0 });

  const [loadingData, setLoadingData] = useState(false);
  const [copiedId, setCopiedId] = useState<number | string | null>(null);

  // Concern modal & action states
  const [showConcernModal, setShowConcernModal] = useState(false);
  const [selectedConcern, setSelectedConcern] = useState<ConcernItem | null>(null);
  const [concernUpdateForm, setConcernUpdateForm] = useState({
    status: "submitted",
    urgency: "normal",
    assigned_to: "",
    admin_remarks: "",
  });
  const [savingConcern, setSavingConcern] = useState(false);
  const [concernToast, setConcernToast] = useState<string | null>(null);

  // Farmer & Contact request modal states
  const [showContactModal, setShowContactModal] = useState(false);
  const [selectedContact, setSelectedContact] = useState<ContactItem | null>(null);
  const [contactUpdateForm, setContactUpdateForm] = useState({
    status: "new",
    admin_notes: "",
  });
  const [savingContact, setSavingContact] = useState(false);
  const [contactToast, setContactToast] = useState<string | null>(null);

  // Event modal & action states
  const [showEventModal, setShowEventModal] = useState(false);
  const [editingEventId, setEditingEventId] = useState<number | null>(null);
  const [eventForm, setEventForm] = useState({
    title_kn: "",
    title_en: "",
    description_kn: "",
    description_en: "",
    event_date: "",
    start_time: "10:00 AM",
    end_time: "01:00 PM",
    location_kn: "ಆಳಂದ",
    location_en: "Aland",
    category: "farmers",
    status: "upcoming",
    contact_person: "",
    contact_phone: "",
  });
  const [eventSubmitting, setEventSubmitting] = useState(false);
  const [eventFormError, setEventFormError] = useState("");
  const [eventToast, setEventToast] = useState("");

  // Article modal & action states
  const [showArticleModal, setShowArticleModal] = useState(false);
  const [editingArticleId, setEditingArticleId] = useState<number | null>(null);
  const [articleForm, setArticleForm] = useState({
    title_kn: "",
    title_en: "",
    summary_kn: "",
    summary_en: "",
    content_kn: "",
    content_en: "",
    category: "general",
    author: "Shri Harshanand Guttedar Office",
    read_time: "4 min read",
    status: "published",
  });
  const [articleSubmitting, setArticleSubmitting] = useState(false);
  const [articleFormError, setArticleFormError] = useState("");
  const [articleToast, setArticleToast] = useState("");

  // Authenticate Admin on mount
  useEffect(() => {
    async function verifyAdmin() {
      try {
        const res = await fetch("/api/auth/me");
        const data = await res.json();

        if (!res.ok || !data.authenticated) {
          router.push("/admin/login");
          return;
        }

        if (data.user.role !== "admin") {
          router.push("/portal");
          return;
        }

        setAdminUser(data.user);

        // Preload stats for sidebar badges
        fetch("/api/admin/contact?limit=1").then((r) => r.json()).then((d) => {
          if (d.success && d.stats) setContactStats(d.stats);
        }).catch(() => { });
        fetch("/api/admin/concerns?limit=1").then((r) => r.json()).then((d) => {
          if (d.success && d.stats) setConcernStats(d.stats);
        }).catch(() => { });
      } catch (err) {
        console.error("Admin verification error:", err);
        router.push("/admin/login");
      } finally {
        setInitialLoading(false);
      }
    }

    verifyAdmin();
  }, [router]);

  // Load Data based on active tab and query parameters
  const fetchData = useCallback(async () => {
    if (!adminUser) return;
    setLoadingData(true);

    try {
      const queryParams = new URLSearchParams({
        page: String(page),
        limit: String(limit),
        search: appliedSearch,
      });

      if (activeTab === "logs") {
        queryParams.set("filter", selectedFilter);
        const res = await fetch(`/api/admin/activity-logs?${queryParams.toString()}`);
        const data = await res.json();
        if (data.success) {
          setLogs(data.logs || []);
          setPagination(data.pagination || { page: 1, limit, total: 0, totalPages: 1 });
          if (data.stats) setStats((prev) => ({ ...prev, ...data.stats }));
        }
      } else if (activeTab === "memberships") {
        const res = await fetch(`/api/admin/memberships?${queryParams.toString()}`);
        const data = await res.json();
        if (data.success) {
          setMemberships(data.memberships || []);
          setPagination(data.pagination || { page: 1, limit, total: 0, totalPages: 1 });
          if (data.stats?.totalMembers !== undefined) {
            setStats((prev) => ({ ...prev, totalMembers: data.stats.totalMembers }));
          }
        }
      } else if (activeTab === "events") {
        if (selectedEventFilter && selectedEventFilter !== "all") {
          queryParams.set("status", selectedEventFilter);
        }
        const res = await fetch(`/api/admin/events?${queryParams.toString()}`);
        const data = await res.json();
        if (data.success) {
          setEvents(data.events || []);
          setPagination(data.pagination || { page: 1, limit, total: 0, totalPages: 1 });
          if (data.stats) {
            setEventStats(data.stats);
          }
        }
      } else if (activeTab === "articles") {
        if (selectedArticleFilter && selectedArticleFilter !== "all") {
          queryParams.set("status", selectedArticleFilter);
        }
        const res = await fetch(`/api/admin/articles?${queryParams.toString()}`);
        const data = await res.json();
        if (data.success) {
          setArticles(data.articles || []);
          setPagination(data.pagination || { page: 1, limit, total: 0, totalPages: 1 });
          if (data.stats) {
            setArticleStats(data.stats);
          }
        }
      } else if (activeTab === "concerns") {
        if (selectedConcernFilter && selectedConcernFilter !== "all") {
          queryParams.set("status", selectedConcernFilter);
        }
        if (selectedConcernCategory && selectedConcernCategory !== "all") {
          queryParams.set("category", selectedConcernCategory);
        }
        const res = await fetch(`/api/admin/concerns?${queryParams.toString()}`);
        const data = await res.json();
        if (data.success) {
          setConcerns(data.concerns || []);
          setPagination(data.pagination || { page: 1, limit, total: 0, totalPages: 1 });
          if (data.stats) {
            setConcernStats(data.stats);
          }
        }
      } else if (activeTab === "farmer_requests") {
        queryParams.set("source", "farmers_page");
        if (selectedContactFilter && selectedContactFilter !== "all") {
          queryParams.set("status", selectedContactFilter);
        }
        const res = await fetch(`/api/admin/contact?${queryParams.toString()}`);
        const data = await res.json();
        if (data.success) {
          setContactMessages(data.messages || []);
          setPagination(data.pagination || { page: 1, limit, total: 0, totalPages: 1 });
          if (data.stats) {
            setContactStats(data.stats);
          }
        }
      } else if (activeTab === "general_enquiries") {
        if (selectedContactSource && selectedContactSource !== "all") {
          queryParams.set("source", selectedContactSource);
        } else {
          queryParams.set("source", "general");
        }
        if (selectedContactFilter && selectedContactFilter !== "all") {
          queryParams.set("status", selectedContactFilter);
        }
        const res = await fetch(`/api/admin/contact?${queryParams.toString()}`);
        const data = await res.json();
        if (data.success) {
          setContactMessages(data.messages || []);
          setPagination(data.pagination || { page: 1, limit, total: 0, totalPages: 1 });
          if (data.stats) {
            setContactStats(data.stats);
          }
        }
      } else if (activeTab === "users") {
        const res = await fetch(`/api/admin/users?${queryParams.toString()}`);
        const data = await res.json();
        if (data.success) {
          setUsers(data.users || []);
          setPagination(data.pagination || { page: 1, limit, total: 0, totalPages: 1 });
        }
      } else if (activeTab === "sessions") {
        const res = await fetch(`/api/admin/sessions?${queryParams.toString()}`);
        const data = await res.json();
        if (data.success) {
          setSessions(data.sessions || []);
          setPagination(data.pagination || { page: 1, limit, total: 0, totalPages: 1 });
        }
      }
    } catch (err) {
      console.error("Failed to load admin data:", err);
    } finally {
      setLoadingData(false);
    }
  }, [adminUser, activeTab, page, limit, appliedSearch, selectedFilter, selectedEventFilter, selectedArticleFilter, selectedConcernFilter, selectedConcernCategory, selectedContactFilter, selectedContactSource]);

  // Refetch when dependencies change
  useEffect(() => {
    if (adminUser) {
      fetchData();
    }
  }, [fetchData, adminUser]);

  // Reset to page 1 when switching tabs or filter
  const handleTabChange = (newTab: "logs" | "memberships" | "events" | "articles" | "concerns" | "farmer_requests" | "general_enquiries" | "users" | "sessions") => {
    setActiveTab(newTab);
    setPage(1);
    setSearchQuery("");
    setAppliedSearch("");
    setMobileMenuOpen(false);
  };

  const handleFilterChange = (newFilter: string) => {
    setSelectedFilter(newFilter);
    setPage(1);
  };

  const handleEventFilterChange = (newFilter: string) => {
    setSelectedEventFilter(newFilter);
    setPage(1);
  };

  const handleArticleFilterChange = (newFilter: string) => {
    setSelectedArticleFilter(newFilter);
    setPage(1);
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setAppliedSearch(searchQuery.trim());
    setPage(1);
  };

  const handleClearSearch = () => {
    setSearchQuery("");
    setAppliedSearch("");
    setPage(1);
  };

  // Article modal actions
  const handleOpenCreateArticle = () => {
    setEditingArticleId(null);
    setArticleForm({
      title_kn: "",
      title_en: "",
      summary_kn: "",
      summary_en: "",
      content_kn: "",
      content_en: "",
      category: "general",
      author: "Shri Harshanand Guttedar Office",
      read_time: "4 min read",
      status: "published",
    });
    setArticleFormError("");
    setShowArticleModal(true);
  };

  const handleOpenEditArticle = (art: ArticleItem) => {
    setEditingArticleId(art.id);
    setArticleForm({
      title_kn: art.title_kn,
      title_en: art.title_en,
      summary_kn: art.summary_kn || "",
      summary_en: art.summary_en || "",
      content_kn: art.content_kn || "",
      content_en: art.content_en || "",
      category: art.category,
      author: art.author || "Shri Harshanand Guttedar Office",
      read_time: art.read_time || "4 min read",
      status: art.status,
    });
    setArticleFormError("");
    setShowArticleModal(true);
  };

  const handleSaveArticle = async (e: React.FormEvent) => {
    e.preventDefault();
    setArticleFormError("");
    setArticleSubmitting(true);

    try {
      if (!articleForm.title_kn.trim() || !articleForm.title_en.trim() || !articleForm.content_kn.trim() || !articleForm.content_en.trim()) {
        throw new Error(language === "kn" ? "ದಯವಿಟ್ಟು ಎಲ್ಲಾ ಕಡ್ಡಾಯ ಕ್ಷೇತ್ರಗಳನ್ನು ಭರ್ತಿ ಮಾಡಿ." : "Please fill in all required fields.");
      }

      const method = editingArticleId ? "PUT" : "POST";
      const payload = editingArticleId ? { ...articleForm, id: editingArticleId } : articleForm;

      const res = await fetch("/api/admin/articles", {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.message || "Failed to save article.");
      }

      setArticleToast(editingArticleId ? "Article updated successfully" : "Article published successfully");
      setTimeout(() => setArticleToast(""), 3000);
      setShowArticleModal(false);
      fetchData();
    } catch (err: any) {
      setArticleFormError(err.message || "Failed to save article");
    } finally {
      setArticleSubmitting(false);
    }
  };

  const handleDeleteArticle = async (id: number) => {
    if (!confirm(language === "kn" ? "ಈ ಲೇಖನವನ್ನು ಖಚಿತವಾಗಿ ಅಳಿಸಬೇಕೇ?" : "Are you sure you want to delete this article?")) {
      return;
    }

    try {
      const res = await fetch(`/api/admin/articles?id=${id}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.message || "Failed to delete article");
      }
      setArticleToast("Article deleted successfully");
      setTimeout(() => setArticleToast(""), 3000);
      fetchData();
    } catch (err: any) {
      alert(err.message || "Failed to delete article");
    }
  };

  // Event modal actions
  const handleOpenCreateEvent = () => {
    setEditingEventId(null);
    setEventForm({
      title_kn: "",
      title_en: "",
      description_kn: "",
      description_en: "",
      event_date: new Date().toISOString().slice(0, 10),
      start_time: "10:00 AM",
      end_time: "01:00 PM",
      location_kn: "ಆಳಂದ",
      location_en: "Aland",
      category: "farmers",
      status: "upcoming",
      contact_person: "",
      contact_phone: "",
    });
    setEventFormError("");
    setShowEventModal(true);
  };

  const handleOpenEditEvent = (evt: EventItem) => {
    setEditingEventId(evt.id);
    setEventForm({
      title_kn: evt.title_kn,
      title_en: evt.title_en,
      description_kn: evt.description_kn || "",
      description_en: evt.description_en || "",
      event_date: evt.event_date,
      start_time: evt.start_time,
      end_time: evt.end_time || "",
      location_kn: evt.location_kn,
      location_en: evt.location_en,
      category: evt.category,
      status: evt.status,
      contact_person: evt.contact_person || "",
      contact_phone: evt.contact_phone || "",
    });
    setEventFormError("");
    setShowEventModal(true);
  };

  const handleSaveEvent = async (e: React.FormEvent) => {
    e.preventDefault();
    setEventFormError("");
    setEventSubmitting(true);

    try {
      if (!eventForm.title_kn.trim() || !eventForm.title_en.trim() || !eventForm.event_date || !eventForm.start_time.trim() || !eventForm.location_kn.trim() || !eventForm.location_en.trim()) {
        throw new Error(language === "kn" ? "ದಯವಿಟ್ಟು ಎಲ್ಲಾ ಕಡ್ಡಾಯ ಕ್ಷೇತ್ರಗಳನ್ನು ಭರ್ತಿ ಮಾಡಿ." : "Please fill in all required fields.");
      }

      const method = editingEventId ? "PUT" : "POST";
      const payload = editingEventId ? { ...eventForm, id: editingEventId } : eventForm;

      const res = await fetch("/api/admin/events", {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.message || "Failed to save event.");
      }

      setEventToast(editingEventId ? "Event updated successfully" : "Event published successfully");
      setTimeout(() => setEventToast(""), 3000);
      setShowEventModal(false);
      fetchData();
    } catch (err: any) {
      setEventFormError(err.message || "Failed to save event");
    } finally {
      setEventSubmitting(false);
    }
  };

  const handleDeleteEvent = async (id: number) => {
    if (!confirm(language === "kn" ? "ಈ ಕಾರ್ಯಕ್ರಮವನ್ನು ಅಳಿಸಲು ನೀವು ಖಚಿತವಾಗಿದ್ದೀರಾ?" : "Are you sure you want to delete this event?")) {
      return;
    }

    try {
      const res = await fetch(`/api/admin/events?id=${id}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (!res.ok || !data.success) {
        alert(data.message || "Failed to delete event.");
        return;
      }
      setEventToast("Event deleted successfully");
      setTimeout(() => setEventToast(""), 3000);
      fetchData();
    } catch (err: any) {
      alert("Error deleting event: " + err.message);
    }
  };

  const handleConcernFilterChange = (statusVal: string) => {
    setSelectedConcernFilter(statusVal);
    setPage(1);
  };

  const handleConcernCategoryChange = (catVal: string) => {
    setSelectedConcernCategory(catVal);
    setPage(1);
  };

  const handleOpenReviewConcern = (item: ConcernItem) => {
    setSelectedConcern(item);
    setConcernUpdateForm({
      status: item.status,
      urgency: item.urgency,
      assigned_to: item.assigned_to || "",
      admin_remarks: item.admin_remarks || "",
    });
    setShowConcernModal(true);
  };

  const handleSaveConcernStatus = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedConcern) return;
    setSavingConcern(true);

    try {
      const res = await fetch("/api/admin/concerns", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: selectedConcern.id,
          status: concernUpdateForm.status,
          urgency: concernUpdateForm.urgency,
          assigned_to: concernUpdateForm.assigned_to,
          admin_remarks: concernUpdateForm.admin_remarks,
        }),
      });
      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.message || "Failed to update concern status.");
      }

      setConcernToast(`Status updated to ${concernUpdateForm.status}`);
      setTimeout(() => setConcernToast(null), 3000);
      setShowConcernModal(false);
      fetchData();
    } catch (err: any) {
      alert("Error updating concern: " + err.message);
    } finally {
      setSavingConcern(false);
    }
  };

  const handleContactFilterChange = (statusVal: string) => {
    setSelectedContactFilter(statusVal);
    setPage(1);
  };

  const handleContactSourceChange = (srcVal: string) => {
    setSelectedContactSource(srcVal);
    setPage(1);
  };

  const handleOpenReviewContact = (item: ContactItem) => {
    setSelectedContact(item);
    setContactUpdateForm({
      status: item.status,
      admin_notes: item.admin_notes || "",
    });
    setShowContactModal(true);
  };

  const handleSaveContactStatus = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedContact) return;
    setSavingContact(true);

    try {
      const res = await fetch("/api/admin/contact", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: selectedContact.id,
          status: contactUpdateForm.status,
          admin_notes: contactUpdateForm.admin_notes,
        }),
      });
      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.message || "Failed to update contact request.");
      }

      setContactToast(`Request status updated to ${contactUpdateForm.status}`);
      setTimeout(() => setContactToast(null), 3000);
      setShowContactModal(false);
      fetchData();
    } catch (err: any) {
      alert("Error updating request: " + err.message);
    } finally {
      setSavingContact(false);
    }
  };

  const handleLogout = async () => {
    try {
      await fetch("/api/auth/logout", { method: "POST" });
      router.push("/admin/login");
    } catch {
      router.push("/admin/login");
    }
  };

  const handleCopy = (text: string, id: number | string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 1000);
  };

  // Export CSV of currently loaded data
  const handleExportCSV = () => {
    let headers: string[] = [];
    let rows: any[][] = [];
    const dateStr = new Date().toISOString().slice(0, 10);

    if (activeTab === "logs") {
      headers = ["Log ID", "Date Time (IST)", "Mobile", "Action", "Device", "Client IP", "User Role"];
      rows = logs.map((l) => [
        l.id,
        new Date(l.created_at).toLocaleString("en-IN", { timeZone: "Asia/Kolkata" }),
        `+91 ${l.mobile}`,
        l.action,
        l.device_type || "Desktop",
        l.ip_address || "127.0.0.1",
        l.user_role || "User",
      ]);
    } else if (activeTab === "memberships") {
      headers = ["Membership ID", "Full Name", "Mobile", "Village", "Taluk", "District", "Pincode", "Interest", "Suggestion", "Registered At (IST)"];
      rows = memberships.map((m) => [
        m.membership_id,
        m.full_name,
        `+91 ${m.mobile}`,
        m.village,
        m.taluk,
        m.district,
        m.pincode,
        m.interest,
        m.suggestion || "N/A",
        new Date(m.created_at).toLocaleString("en-IN", { timeZone: "Asia/Kolkata" }),
      ]);
    } else if (activeTab === "events") {
      headers = ["Event ID", "Date", "Start Time", "End Time", "Title (EN)", "Title (KN)", "Location", "Category", "Status", "Contact Phone"];
      rows = events.map((e) => [
        e.id,
        e.event_date,
        e.start_time,
        e.end_time || "",
        e.title_en,
        e.title_kn,
        e.location_en,
        e.category,
        e.status,
        e.contact_phone || "N/A",
      ]);
    } else if (activeTab === "articles") {
      headers = ["Article ID", "Published Date", "Title (EN)", "Title (KN)", "Category", "Author", "Status", "Views"];
      rows = articles.map((a) => [
        a.id,
        a.published_at,
        a.title_en,
        a.title_kn,
        a.category,
        a.author,
        a.status,
        a.views_count,
      ]);
    } else if (activeTab === "concerns") {
      headers = ["Tracking ID", "Citizen Name", "Mobile", "Category", "Urgency", "Village", "Taluk", "Title", "Status", "Assigned Dept", "Admin Remarks", "Submitted At (IST)"];
      rows = concerns.map((c) => [
        c.tracking_id,
        c.citizen_name,
        `+91 ${c.mobile}`,
        c.category,
        c.urgency,
        c.village,
        c.taluk,
        c.title,
        c.status,
        c.assigned_to || "Unassigned",
        c.admin_remarks || "No remarks",
        c.created_at_formatted || c.created_at,
      ]);
    } else if (activeTab === "farmer_requests") {
      headers = ["Farmer Req ID", "Farmer Name", "Mobile", "Location", "Source", "Advisory Query", "Status", "Official Remarks", "Submitted At (IST)"];
      rows = contactMessages.map((m) => [
        `#FARM-${m.id}`,
        m.name,
        `+91 ${m.phone}`,
        m.location,
        m.source,
        `"${(m.message || '').replace(/"/g, '""')}"`,
        m.status,
        `"${(m.admin_notes || 'N/A').replace(/"/g, '""')}"`,
        m.created_at_formatted || m.created_at,
      ]);
    } else if (activeTab === "general_enquiries") {
      headers = ["Enquiry ID", "Name", "Mobile", "Email", "Location", "Source", "Message", "Status", "Admin Notes", "Submitted At (IST)"];
      rows = contactMessages.map((m) => [
        `#ENQ-${m.id}`,
        m.name,
        `+91 ${m.phone}`,
        m.email || "N/A",
        m.location,
        m.source,
        `"${(m.message || '').replace(/"/g, '""')}"`,
        m.status,
        `"${(m.admin_notes || 'N/A').replace(/"/g, '""')}"`,
        m.created_at_formatted || m.created_at,
      ]);
    } else if (activeTab === "users") {
      headers = ["User ID", "Mobile", "Name", "Role", "Language", "Status", "Last Login (IST)", "Created At (IST)"];
      rows = users.map((u) => [
        u.id,
        `+91 ${u.mobile}`,
        u.name || "N/A",
        u.role,
        u.preferred_language,
        u.status,
        u.last_login_at ? new Date(u.last_login_at).toLocaleString("en-IN", { timeZone: "Asia/Kolkata" }) : "Never",
        new Date(u.created_at).toLocaleString("en-IN", { timeZone: "Asia/Kolkata" }),
      ]);
    } else if (activeTab === "sessions") {
      headers = ["Session ID", "Mobile", "Role", "Session UUID", "Client IP", "Revoked", "Created At (IST)"];
      rows = sessions.map((s) => [
        s.id,
        `+91 ${s.mobile}`,
        s.role,
        s.session_id,
        s.ip_address,
        s.is_revoked ? "Revoked" : "Active",
        new Date(s.created_at).toLocaleString("en-IN", { timeZone: "Asia/Kolkata" }),
      ]);
    }

    if (rows.length === 0) return;

    const csvContent = "data:text/csv;charset=utf-8," + [headers.join(","), ...rows.map((e) => e.join(","))].join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `Harshanand_${activeTab}_export_${dateStr}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Row Styling for Activity Logs
  const getRowBg = (action: string) => {
    if (action.includes("ALERT") || action.includes("HIJACK") || action.includes("UNAUTHORIZED") || action.includes("BLOCKED")) {
      return "bg-red-50/70 hover:bg-red-50";
    }
    if (action.includes("SUCCESS")) {
      return "bg-emerald-50/30 hover:bg-emerald-50/60";
    }
    return "bg-white hover:bg-slate-50/80";
  };

  const getActionBadgeStyle = (action: string) => {
    if (action.includes("LOGIN_SUCCESS") || action.includes("ADMIN_LOGIN_SUCCESS")) {
      return "bg-blue-50 text-blue-700 border-blue-200";
    }
    if (action.includes("OTP")) {
      return "bg-purple-50 text-purple-700 border-purple-200";
    }
    if (action.includes("MEMBERSHIP")) {
      return "bg-amber-50 text-amber-800 border-amber-200";
    }
    if (action.includes("ALERT") || action.includes("HIJACK") || action.includes("UNAUTHORIZED")) {
      return "bg-red-50 text-red-700 border-red-200";
    }
    return "bg-slate-100 text-slate-700 border-slate-200";
  };

  // Typography rules: strictly 'Anek Kannada' for Kannada, 'Inter' for English; strictly 10px & 12px
  const fontFamilyStyle = {
    fontFamily: language === "kn" ? "'Anek Kannada', sans-serif" : "'Inter', system-ui, sans-serif"
  };

  if (initialLoading) {
    return (
      <div
        style={fontFamilyStyle}
        className="h-screen w-full bg-[#f8fafc] flex flex-col items-center justify-center text-slate-800"
      >
        <div className="w-8 h-8 border-2 border-blue-600 border-t-transparent rounded-full animate-spin mb-2" />
        <p className="text-[10px] text-slate-500 font-medium">
          {language === "kn" ? "ಅಡ್ಮಿನ್ ಕನ್ಸೋಲ್ ಲೋಡ್ ಆಗುತ್ತಿದೆ..." : "Loading Admin Console..."}
        </p>
      </div>
    );
  }

  return (
    <div
      style={fontFamilyStyle}
      className="h-screen w-full bg-[#f8fafc] text-slate-800 flex overflow-hidden antialiased text-[12px] relative"
    >

      {/* Mobile Backdrop Overlay */}
      {mobileMenuOpen && (
        <div
          onClick={() => setMobileMenuOpen(false)}
          className="fixed inset-0 bg-slate-900/50 backdrop-blur-xs z-40 md:hidden"
        />
      )}

      {/* =========================================================================
          SIDEBAR: Desktop static + Mobile slide-over drawer
          Includes: Activity Stream, Memberships, Registered Users, Active Sessions
          Strictly 10px and 12px sizes
          ========================================================================= */}
      <aside
        className={`fixed md:relative inset-y-0 left-0 z-50 w-60 bg-white border-r border-slate-200/90 flex flex-col justify-between shrink-0 h-full overflow-y-auto transition-transform duration-300 ease-in-out ${mobileMenuOpen ? "translate-x-0 shadow-2xl" : "-translate-x-full md:translate-x-0"
          }`}
      >
        <div>
          {/* Logo Header */}
          <div className="p-4 pb-3 border-b border-slate-100 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-600 via-indigo-600 to-amber-500 p-[2px] shadow-xs">
                <div className="w-full h-full rounded-[6px] bg-white flex items-center justify-center">
                  <span className="font-extrabold text-blue-600 text-[12px]">ಹ</span>
                </div>
              </div>
              <div>
                <span className="font-extrabold text-slate-900 text-[12px] tracking-tight block leading-tight">
                  HG ADMIN
                </span>
                <span className="text-[10px] text-slate-400 font-medium uppercase tracking-wider flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  Live MySQL • 2026
                </span>
              </div>
            </div>

            {/* Mobile Close Button */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(false)}
              className="p-1 rounded-md text-slate-400 hover:text-slate-600 md:hidden"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Operational Navigation */}
          <div className="px-3 py-3 space-y-4">

            {/* 1. USER MANAGEMENT */}
            <div>
              <span className="px-2 text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
                {language === "kn" ? "ಬಳಕೆದಾರರ ನಿರ್ವಹಣೆ" : "User Management"}
              </span>
              <div className="space-y-0.5">
                <button
                  type="button"
                  onClick={() => handleTabChange("users")}
                  className={`w-full flex items-center justify-between px-2.5 py-2 rounded-xl text-[12px] font-semibold transition-all cursor-pointer ${
                    activeTab === "users" ? "bg-blue-50 text-blue-600" : "text-slate-600 hover:bg-slate-50"
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <Users className={`w-3.5 h-3.5 ${activeTab === "users" ? "text-blue-600" : "text-slate-400"}`} />
                    <span>{language === "kn" ? "ನೋಂದಾಯಿತ ನಾಗರಿಕರು" : "Registered Users"}</span>
                  </div>
                </button>

                <button
                  type="button"
                  onClick={() => handleTabChange("sessions")}
                  className={`w-full flex items-center justify-between px-2.5 py-2 rounded-xl text-[12px] font-semibold transition-all cursor-pointer ${
                    activeTab === "sessions" ? "bg-blue-50 text-blue-600" : "text-slate-600 hover:bg-slate-50"
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <ShieldCheck className={`w-3.5 h-3.5 ${activeTab === "sessions" ? "text-blue-600" : "text-slate-400"}`} />
                    <span>{language === "kn" ? "ಸಕ್ರಿಯ ಸೆಷನ್‌ಗಳು" : "Active Sessions"}</span>
                  </div>
                </button>
              </div>
            </div>

            {/* 2. MEMBERSHIPS */}
            <div>
              <span className="px-2 text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
                {language === "kn" ? "ಸದಸ್ಯತ್ವ ನೋಂದಣಿ" : "Memberships"}
              </span>
              <div className="space-y-0.5">
                <button
                  type="button"
                  onClick={() => handleTabChange("memberships")}
                  className={`w-full flex items-center justify-between px-2.5 py-2 rounded-xl text-[12px] font-semibold transition-all cursor-pointer ${
                    activeTab === "memberships" ? "bg-blue-50 text-blue-600" : "text-slate-600 hover:bg-slate-50"
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <HeartHandshake className={`w-3.5 h-3.5 ${activeTab === "memberships" ? "text-blue-600" : "text-slate-400"}`} />
                    <span>{language === "kn" ? "ಸದಸ್ಯತ್ವ ದಾಖಲೆಗಳು" : "Citizen Memberships"}</span>
                  </div>
                  {stats.totalMembers > 0 && (
                    <span className="text-[10px] px-1.5 py-0.2 rounded-full font-mono bg-amber-100 text-amber-800 font-bold">
                      {stats.totalMembers}
                    </span>
                  )}
                </button>
              </div>
            </div>

            {/* 3. GRIEVANCES & CONCERNS */}
            <div>
              <span className="px-2 text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
                {language === "kn" ? "ಜನಸ್ಪಂದನ & ಕುಂದುಕೊರತೆ" : "Grievances & Concerns"}
              </span>
              <div className="space-y-0.5">
                <button
                  type="button"
                  onClick={() => handleTabChange("concerns")}
                  className={`w-full flex items-center justify-between px-2.5 py-2 rounded-xl text-[12px] font-semibold transition-all cursor-pointer ${
                    activeTab === "concerns" ? "bg-blue-50 text-blue-600" : "text-slate-600 hover:bg-slate-50"
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <FileText className={`w-3.5 h-3.5 ${activeTab === "concerns" ? "text-blue-600" : "text-slate-400"}`} />
                    <span>{language === "kn" ? "ಕುಂದುಕೊರತೆ ಅರ್ಜಿಗಳು" : "Citizen Concerns"}</span>
                  </div>
                  {concernStats.total_all > 0 && (
                    <span className="text-[10px] px-1.5 py-0.2 rounded-full font-mono bg-rose-100 text-rose-700 font-bold">
                      {concernStats.total_all}
                    </span>
                  )}
                </button>
              </div>
            </div>

            {/* 4. FARMER & CONTACT DESK */}
            <div>
              <span className="px-2 text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
                {language === "kn" ? "ರೈತರ ವಿನಂತಿ & ಸಂಪರ್ಕ ಕೋಶ" : "Farmer & Contact Desk"}
              </span>
              <div className="space-y-0.5">
                <button
                  type="button"
                  onClick={() => handleTabChange("farmer_requests")}
                  className={`w-full flex items-center justify-between px-2.5 py-2 rounded-xl text-[12px] font-semibold transition-all cursor-pointer ${
                    activeTab === "farmer_requests" ? "bg-blue-50 text-blue-600" : "text-slate-600 hover:bg-slate-50"
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <Sprout className={`w-3.5 h-3.5 ${activeTab === "farmer_requests" ? "text-emerald-600" : "text-slate-400"}`} />
                    <span>{language === "kn" ? "ರೈತರ ವಿನಂತಿ & ಸಲಹೆಗಳು" : "Farmer Advisory Desk"}</span>
                  </div>
                  {contactStats.farmers > 0 && (
                    <span className="text-[10px] px-1.5 py-0.2 rounded-full font-mono bg-emerald-100 text-emerald-800 font-bold">
                      {contactStats.farmers}
                    </span>
                  )}
                </button>

                <button
                  type="button"
                  onClick={() => handleTabChange("general_enquiries")}
                  className={`w-full flex items-center justify-between px-2.5 py-2 rounded-xl text-[12px] font-semibold transition-all cursor-pointer ${
                    activeTab === "general_enquiries" ? "bg-blue-50 text-blue-600" : "text-slate-600 hover:bg-slate-50"
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <MessageSquare className={`w-3.5 h-3.5 ${activeTab === "general_enquiries" ? "text-blue-600" : "text-slate-400"}`} />
                    <span>{language === "kn" ? "ಸಂಪರ್ಕ & ವಿಚಾರಣೆಗಳು" : "General Enquiries"}</span>
                  </div>
                  {(contactStats.contact + contactStats.newsletter) > 0 && (
                    <span className="text-[10px] px-1.5 py-0.2 rounded-full font-mono bg-blue-100 text-blue-800 font-bold">
                      {contactStats.contact + contactStats.newsletter}
                    </span>
                  )}
                </button>
              </div>
            </div>

            {/* 5. AUDIT STREAM */}
            <div>
              <span className="px-2 text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
                {language === "kn" ? "ಆಡಿಟ್ ಮತ್ತು ಲಾಗ್‌ಗಳು" : "Audit Stream"}
              </span>
              <div className="space-y-0.5">
                <button
                  type="button"
                  onClick={() => handleTabChange("logs")}
                  className={`w-full flex items-center justify-between px-2.5 py-2 rounded-xl text-[12px] font-semibold transition-all cursor-pointer ${
                    activeTab === "logs" ? "bg-blue-50 text-blue-600" : "text-slate-600 hover:bg-slate-50"
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <Activity className={`w-3.5 h-3.5 ${activeTab === "logs" ? "text-blue-600" : "text-slate-400"}`} />
                    <span>{language === "kn" ? "ಚಟುವಟಿಕೆ ಲಾಗ್‌ಗಳು" : "Activity Stream"}</span>
                  </div>
                  {stats.totalLogs > 0 && (
                    <span className="text-[10px] px-1.5 py-0.2 rounded-full font-mono bg-blue-100 text-blue-700">
                      {stats.totalLogs}
                    </span>
                  )}
                </button>
              </div>
            </div>

            {/* 6. CONSTITUENCY EVENTS & ARTICLES */}
            <div>
              <span className="px-2 text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
                {language === "kn" ? "ಕಾರ್ಯಕ್ರಮ & ಲೇಖನಗಳು" : "Events & Articles"}
              </span>
              <div className="space-y-0.5">
                <button
                  type="button"
                  onClick={() => handleTabChange("events")}
                  className={`w-full flex items-center justify-between px-2.5 py-2 rounded-xl text-[12px] font-semibold transition-all cursor-pointer ${
                    activeTab === "events" ? "bg-blue-50 text-blue-600" : "text-slate-600 hover:bg-slate-50"
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <Calendar className={`w-3.5 h-3.5 ${activeTab === "events" ? "text-blue-600" : "text-slate-400"}`} />
                    <span>{language === "kn" ? "ಸಾರ್ವಜನಿಕ ಕಾರ್ಯಕ್ರಮಗಳು" : "Events & Rallies"}</span>
                  </div>
                  {eventStats.total > 0 && (
                    <span className="text-[10px] px-1.5 py-0.2 rounded-full font-mono bg-purple-100 text-purple-800">
                      {eventStats.total}
                    </span>
                  )}
                </button>

                <button
                  type="button"
                  onClick={() => handleTabChange("articles")}
                  className={`w-full flex items-center justify-between px-2.5 py-2 rounded-xl text-[12px] font-semibold transition-all cursor-pointer ${
                    activeTab === "articles" ? "bg-blue-50 text-blue-600" : "text-slate-600 hover:bg-slate-50"
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <Newspaper className={`w-3.5 h-3.5 ${activeTab === "articles" ? "text-blue-600" : "text-slate-400"}`} />
                    <span>{language === "kn" ? "ಲೇಖನಗಳು & ಸುದ್ದಿ" : "Articles & Media"}</span>
                  </div>
                  {articleStats.totalArticles > 0 && (
                    <span className="text-[10px] px-1.5 py-0.2 rounded-full font-mono bg-blue-100 text-blue-800">
                      {articleStats.totalArticles}
                    </span>
                  )}
                </button>
              </div>
            </div>

          </div>
        </div>

        {/* Sidebar Bottom: Admin Profile & Logout */}
        <div className="p-3 border-t border-slate-100 space-y-1.5">
          <div className="px-2.5 py-1.5 rounded-lg bg-slate-50 border border-slate-100 flex items-center justify-between">
            <div>
              <span className="text-[10px] text-slate-400 block">Logged in as:</span>
              <span className="font-bold text-slate-800 font-mono text-[12px]">+91 {adminUser?.mobile}</span>
            </div>
            <span className="text-[10px] font-bold px-1.5 py-0.2 rounded bg-blue-100 text-blue-700 uppercase">
              Admin
            </span>
          </div>

          <button
            type="button"
            onClick={handleLogout}
            className="w-full flex items-center gap-2 px-2.5 py-1.5 rounded-lg text-[12px] font-semibold text-red-600 hover:bg-red-50 transition-all cursor-pointer"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>{language === "kn" ? "ನಿರ್ಗಮಿಸಿ (Logout)" : "Logout"}</span>
          </button>
        </div>
      </aside>


      {/* =========================================================================
          MAIN WORKSPACE AREA: Responsive on Mobile & Desktop
          ========================================================================= */}
      <div className="flex-1 flex flex-col h-full min-w-0 overflow-hidden bg-[#f8fafc]">

        {/* Top Header */}
        <header className="shrink-0 bg-white border-b border-slate-200/80 px-3 sm:px-6 py-2.5 sm:py-3 flex items-center justify-between z-10">

          <div className="flex items-center gap-2 min-w-0">
            {/* Hamburger menu trigger on mobile */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(true)}
              className="p-1.5 rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-50 md:hidden cursor-pointer"
              aria-label="Open Navigation Menu"
            >
              <Menu className="w-4 h-4" />
            </button>

            <div className="min-w-0">
              <h1 className="text-[12px] font-extrabold text-slate-900 tracking-tight truncate">
                {activeTab === "logs" && (language === "kn" ? "ಬಳಕೆದಾರರ ಆಡಿಟ್ ಟ್ರಯಲ್" : "User Activity & Audit Stream")}
                {activeTab === "memberships" && (language === "kn" ? "ಸದಸ್ಯತ್ವ ನೋಂದಣಿ ಪಟ್ಟಿ" : "Membership Registrations List")}
                {activeTab === "events" && (language === "kn" ? "ಸಾರ್ವಜನಿಕ ಕಾರ್ಯಕ್ರಮಗಳು & ಸಮಾವೇಶಗಳು" : "Constituency Events & Public Rallies")}
                {activeTab === "articles" && (language === "kn" ? "ಲೇಖನಗಳು & ಸಮಾಚಾರ ಪ್ರಕಟಣೆಗಳು" : "Published Articles & Official News")}
                {activeTab === "concerns" && (language === "kn" ? "ಸಾರ್ವಜನಿಕ ಕುಂದುಕೊರತೆ & ಜನಸ್ಪಂದನ ಅರ್ಜಿಗಳು" : "Public Grievances & Citizen Concerns")}
                {activeTab === "users" && (language === "kn" ? "ನೋಂದಾಯಿತ ನಾಗರಿಕರ ಪಟ್ಟಿ" : "Registered Citizens & Accounts")}
                {activeTab === "sessions" && (language === "kn" ? "ಸಕ್ರಿಯ ಲಾಗಿನ್ ಸೆಷನ್‌ಗಳು" : "Active Authentication Sessions")}
              </h1>
              <span className="text-[10px] text-slate-400 block truncate">
                {loadingData
                  ? (language === "kn" ? "ಲೋಡ್ ಆಗುತ್ತಿದೆ..." : "Refreshing live records...")
                  : `${pagination.total} ${language === "kn" ? "ದಾಖಲೆಗಳು" : "records"} • P.${pagination.page}/${pagination.totalPages}`}
              </span>
            </div>
          </div>

          {/* Right Header Actions */}
          <div className="flex items-center gap-1.5 sm:gap-2.5 shrink-0">
            {/* Refresh */}
            <button
              type="button"
              onClick={() => fetchData()}
              disabled={loadingData}
              title="Refresh Data"
              className="p-1.5 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 text-slate-600 transition-all cursor-pointer disabled:opacity-50"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${loadingData ? "animate-spin text-blue-600" : ""}`} />
            </button>

            {/* Language Switcher */}
            <div className="flex items-center p-0.5 rounded-full border border-slate-200 bg-slate-50">
              <button
                type="button"
                onClick={() => setLanguage("kn")}
                className={`px-2 py-0.5 text-[10px] font-bold rounded-full transition-all cursor-pointer ${language === "kn" ? "bg-amber-400 text-slate-900 shadow-2xs" : "text-slate-500 hover:text-slate-900"
                  }`}
              >
                ಕನ್ನಡ
              </button>
              <button
                type="button"
                onClick={() => setLanguage("en")}
                className={`px-2 py-0.5 text-[10px] font-bold rounded-full transition-all cursor-pointer ${language === "en" ? "bg-amber-400 text-slate-900 shadow-2xs" : "text-slate-500 hover:text-slate-900"
                  }`}
              >
                EN
              </button>
            </div>

            {/* EXPORT CSV Button */}
            <button
              type="button"
              onClick={handleExportCSV}
              className="flex items-center gap-1 px-2.5 py-1 rounded-lg border border-slate-300 bg-white hover:bg-slate-50 font-bold text-[10px] text-slate-700 shadow-2xs transition-all cursor-pointer"
            >
              <Download className="w-3 h-3 text-slate-500" />
              <span className="hidden sm:inline">EXPORT CSV</span>
              <span className="sm:hidden">CSV</span>
            </button>
          </div>
        </header>


        {/* Controls Row: Filters + Live Search Input */}
        <div className="shrink-0 px-3 sm:px-6 pt-3 pb-2 flex flex-col md:flex-row md:items-center justify-between gap-2.5">

          {/* Top Filter Pills */}
          {activeTab === "logs" ? (
            <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-0.5 max-w-full">
              <span className="text-[10px] text-slate-400 font-medium shrink-0">Filter:</span>
              {[
                { id: "all", label: "All Events" },
                { id: "login", label: "Completed" },
                { id: "otp", label: "OTP Sent" },
                { id: "logout", label: "Logged Out" },
                { id: "security", label: "Security / Alerts" },
              ].map((f) => (
                <button
                  key={f.id}
                  type="button"
                  onClick={() => handleFilterChange(f.id)}
                  className={`px-2.5 py-1 rounded-full text-[10px] font-semibold transition-all shrink-0 cursor-pointer ${selectedFilter === f.id
                    ? "bg-slate-900 text-white shadow-2xs"
                    : "bg-white border border-slate-200/90 text-slate-600 hover:bg-slate-100"
                    }`}
                >
                  {f.label}
                </button>
              ))}
            </div>
          ) : activeTab === "events" ? (
            <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-0.5 max-w-full">
              <span className="text-[10px] text-slate-400 font-medium shrink-0">Status:</span>
              {[
                { id: "all", label: "All Events" },
                { id: "upcoming", label: "Upcoming" },
                { id: "completed", label: "Completed" },
                { id: "cancelled", label: "Cancelled" },
              ].map((ef) => (
                <button
                  key={ef.id}
                  type="button"
                  onClick={() => handleEventFilterChange(ef.id)}
                  className={`px-2.5 py-1 rounded-full text-[10px] font-semibold transition-all shrink-0 cursor-pointer ${selectedEventFilter === ef.id
                    ? "bg-slate-900 text-white shadow-2xs"
                    : "bg-white border border-slate-200/90 text-slate-600 hover:bg-slate-100"
                    }`}
                >
                  {ef.label}
                </button>
              ))}

              <button
                type="button"
                onClick={handleOpenCreateEvent}
                className="ml-auto md:ml-2 flex items-center gap-1 px-3 py-1 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-bold text-[10px] shadow-2xs transition-all cursor-pointer shrink-0"
              >
                <Plus className="w-3 h-3" />
                <span>{language === "kn" ? "ಹೊಸ ಕಾರ್ಯಕ್ರಮ ಪ್ರಕಟಿಸಿ" : "Publish Event"}</span>
              </button>
            </div>
          ) : activeTab === "articles" ? (
            <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-0.5 max-w-full">
              <span className="text-[10px] text-slate-400 font-medium shrink-0">Status:</span>
              {[
                { id: "all", label: "All Articles" },
                { id: "published", label: "Published" },
                { id: "draft", label: "Draft" },
                { id: "archived", label: "Archived" },
              ].map((af) => (
                <button
                  key={af.id}
                  type="button"
                  onClick={() => handleArticleFilterChange(af.id)}
                  className={`px-2.5 py-1 rounded-full text-[10px] font-semibold transition-all shrink-0 cursor-pointer ${selectedArticleFilter === af.id
                    ? "bg-slate-900 text-white shadow-2xs"
                    : "bg-white border border-slate-200/90 text-slate-600 hover:bg-slate-100"
                    }`}
                >
                  {af.label}
                </button>
              ))}

              <button
                type="button"
                onClick={handleOpenCreateArticle}
                className="ml-auto md:ml-2 flex items-center gap-1 px-3 py-1 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-bold text-[10px] shadow-2xs transition-all cursor-pointer shrink-0"
              >
                <Plus className="w-3 h-3" />
                <span>{language === "kn" ? "ಹೊಸ ಲೇಖನ ಪ್ರಕಟಿಸಿ" : "Publish Article"}</span>
              </button>
            </div>
          ) : activeTab === "concerns" ? (
            <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-0.5 max-w-full">
              <span className="text-[10px] text-slate-400 font-medium shrink-0">Status:</span>
              {[
                { id: "all", label: "All Concerns" },
                { id: "submitted", label: "Submitted" },
                { id: "under_review", label: "Under Review" },
                { id: "in_progress", label: "In Progress" },
                { id: "resolved", label: "Resolved" },
                { id: "rejected", label: "Rejected" },
              ].map((cf) => (
                <button
                  key={cf.id}
                  type="button"
                  onClick={() => handleConcernFilterChange(cf.id)}
                  className={`px-2.5 py-1 rounded-full text-[10px] font-semibold transition-all shrink-0 cursor-pointer ${selectedConcernFilter === cf.id
                      ? "bg-slate-900 text-white shadow-2xs"
                      : "bg-white border border-slate-200/90 text-slate-600 hover:bg-slate-100"
                    }`}
                >
                  {cf.label}
                </button>
              ))}

              <div className="h-4 w-px bg-slate-200 mx-1 shrink-0 hidden sm:block" />

              <span className="text-[10px] text-slate-400 font-medium shrink-0 hidden sm:inline">Category:</span>
              <select
                value={selectedConcernCategory}
                onChange={(e) => handleConcernCategoryChange(e.target.value)}
                className="px-2 py-0.5 rounded-lg border border-slate-200 bg-white text-[10px] text-slate-700 font-medium focus:outline-none cursor-pointer"
              >
                <option value="all">All Categories</option>
                <option value="Roads & Infrastructure">Roads & Infrastructure (ರಸ್ತೆ)</option>
                <option value="Drinking Water & RO Plants">Drinking Water (ಕುಡಿಯುವ ನೀರು)</option>
                <option value="Agriculture & Tur Dal Support">Agriculture & Tur Dal (ರೈತರು & ಕೃಷಿ)</option>
                <option value="Electricity & Power Supply">Electricity & Power (ವಿದ್ಯುತ್)</option>
                <option value="Education & School Infrastructure">Education & Schools (ಶಿಕ್ಷಣ)</option>
                <option value="Healthcare & Hospital Facilities">Healthcare (ಆರೋಗ್ಯ)</option>
                <option value="Irrigation & Borewell Permits">Irrigation & Canal (ನೀರಾವರಿ)</option>
                <option value="Youth & Employment Assistance">Youth & Jobs (ಯುವಜನ)</option>
                <option value="Other Constituency Concerns">Other (ಇತರೆ)</option>
              </select>
            </div>
          ) : activeTab === "farmer_requests" ? (
            <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-0.5 max-w-full">
              <span className="text-[10px] text-slate-400 font-medium shrink-0">Status:</span>
              {[
                { id: "all", label: "All Farmer Requests" },
                { id: "new", label: "New" },
                { id: "in_progress", label: "In Review" },
                { id: "contacted", label: "Contacted" },
                { id: "resolved", label: "Resolved" },
              ].map((cf) => (
                <button
                  key={cf.id}
                  type="button"
                  onClick={() => handleContactFilterChange(cf.id)}
                  className={`px-2.5 py-1 rounded-full text-[10px] font-semibold transition-all shrink-0 cursor-pointer ${selectedContactFilter === cf.id
                      ? "bg-slate-900 text-white shadow-2xs"
                      : "bg-white border border-slate-200/90 text-slate-600 hover:bg-slate-100"
                    }`}
                >
                  {cf.label}
                </button>
              ))}
            </div>
          ) : activeTab === "general_enquiries" ? (
            <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-0.5 max-w-full">
              <span className="text-[10px] text-slate-400 font-medium shrink-0">Status:</span>
              {[
                { id: "all", label: "All Enquiries" },
                { id: "new", label: "New" },
                { id: "in_progress", label: "In Progress" },
                { id: "contacted", label: "Contacted" },
                { id: "resolved", label: "Resolved" },
              ].map((cf) => (
                <button
                  key={cf.id}
                  type="button"
                  onClick={() => handleContactFilterChange(cf.id)}
                  className={`px-2.5 py-1 rounded-full text-[10px] font-semibold transition-all shrink-0 cursor-pointer ${selectedContactFilter === cf.id
                      ? "bg-slate-900 text-white shadow-2xs"
                      : "bg-white border border-slate-200/90 text-slate-600 hover:bg-slate-100"
                    }`}
                >
                  {cf.label}
                </button>
              ))}

              <div className="h-4 w-px bg-slate-200 mx-1 shrink-0 hidden sm:block" />

              <span className="text-[10px] text-slate-400 font-medium shrink-0 hidden sm:inline">Source:</span>
              <select
                value={selectedContactSource}
                onChange={(e) => handleContactSourceChange(e.target.value)}
                className="px-2 py-0.5 rounded-lg border border-slate-200 bg-white text-[10px] text-slate-700 font-medium focus:outline-none cursor-pointer"
              >
                <option value="all">All Channels</option>
                <option value="contact_page">Contact Form (ಸಂಪರ್ಕ ನಮೂನೆ)</option>
                <option value="newsletter">Newsletter (ಸುದ್ದಿಪತ್ರ)</option>
              </select>
            </div>
          ) : (
            <div className="flex items-center gap-1.5">
              <span className="text-[10px] font-semibold text-slate-600 px-2.5 py-1 rounded-lg bg-slate-100">
                {activeTab === "memberships" && "Official Aland & Kalaburagi Citizen Memberships"}
                {activeTab === "users" && "Live Registered Citizens & Administrators"}
                {activeTab === "sessions" && "Live Active Authentication Sessions"}
              </span>
            </div>
          )}

          {/* Search Input Box */}
          <form onSubmit={handleSearchSubmit} className="flex items-center gap-1.5 w-full md:w-auto">
            <div className="relative flex items-center flex-1 md:w-64">
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 pointer-events-none" />
              <input
                type="text"
                placeholder={
                  activeTab === "logs"
                    ? "Search mobile, action, IP..."
                    : activeTab === "memberships"
                      ? "Search name, mobile, village..."
                      : activeTab === "events"
                        ? "Search event title, venue..."
                        : activeTab === "articles"
                          ? "Search article title, author..."
                          : activeTab === "concerns"
                            ? "Search tracking ID, citizen, mobile, village..."
                            : activeTab === "farmer_requests"
                              ? "Search farmer name, mobile, crop query, village..."
                              : activeTab === "general_enquiries"
                                ? "Search citizen name, phone, email, message..."
                                : activeTab === "users"
                                  ? "Search mobile, name..."
                                  : "Search active sessions..."
                }
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-7 pr-6 py-1 w-full rounded-lg bg-white border border-slate-200 text-[12px] text-slate-800 placeholder-slate-400 focus:outline-none focus:border-blue-500 shadow-2xs"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={handleClearSearch}
                  className="absolute right-2 text-slate-400 hover:text-slate-600"
                >
                  <X className="w-3 h-3" />
                </button>
              )}
            </div>

            <button
              type="submit"
              className="px-2.5 py-1 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-semibold text-[10px] shadow-2xs transition-all cursor-pointer shrink-0"
            >
              Search
            </button>
          </form>

        </div>


        {/* Mobile Swipe Hint */}
        <div className="px-3 sm:hidden pb-1 flex items-center justify-between text-[10px] text-slate-400">
          <span className="flex items-center gap-1">
            <ArrowLeftRight className="w-3 h-3 text-blue-500" />
            Swipe table horizontally to view all columns
          </span>
          <span className="font-mono">{pagination.total} records</span>
        </div>


        {/* =========================================================================
            FIXED TABLE BOX: Box Card with Internal Horizontal & Vertical Scrolling
            ========================================================================= */}
        <div className="flex-1 min-h-0 px-2 sm:px-6 pb-2 sm:pb-6 flex flex-col">

          <div className="flex-1 min-h-0 flex flex-col bg-white rounded-xl sm:rounded-2xl border border-slate-200 shadow-sm overflow-hidden">

            {/* Scrollable Container for Table Content with touch support */}
            <div className="flex-1 min-h-0 overflow-x-auto overflow-y-auto w-full custom-scrollbar relative touch-pan-x touch-pan-y">

              {/* TAB 1: ACTIVITY LOGS TABLE */}
              {activeTab === "logs" && (
                <table className="w-full min-w-[1050px] border-collapse text-left text-[12px]">
                  <thead className="sticky top-0 z-10 bg-slate-50 border-b border-slate-200 text-slate-500 font-bold uppercase tracking-wider text-[10px]">
                    <tr>
                      <th className="py-2.5 px-3 w-[150px]">Date (IST)</th>
                      <th className="py-2.5 px-3 w-[90px]">Trx / ID</th>
                      <th className="py-2.5 px-3 w-[200px]">Action Type</th>
                      <th className="py-2.5 px-3 w-[140px]">Citizen Mobile</th>
                      <th className="py-2.5 px-3 w-[130px]">Device</th>
                      <th className="py-2.5 px-3 w-[110px]">Client IP</th>
                      <th className="py-2.5 px-3 w-[110px]">Security</th>
                      <th className="py-2.5 px-3 w-[110px]">User Role</th>
                      <th className="py-2.5 px-3 w-[50px] text-center">Copy</th>
                    </tr>
                  </thead>

                  <tbody className="divide-y divide-slate-100">
                    {loadingData ? (
                      <tr>
                        <td colSpan={9} className="py-16 text-center text-slate-400">
                          <div className="flex flex-col items-center justify-center gap-1.5">
                            <div className="w-5 h-5 border-2 border-blue-600 border-t-transparent rounded-full animate-spin" />
                            <span className="text-[10px]">Loading audit trail...</span>
                          </div>
                        </td>
                      </tr>
                    ) : logs.length === 0 ? (
                      <tr>
                        <td colSpan={9} className="py-16 text-center text-slate-400 text-[12px]">
                          No matching activity logs found.
                        </td>
                      </tr>
                    ) : (
                      logs.map((log) => {
                        const isAlert = log.action.includes("UNAUTHORIZED") || log.action.includes("ALERT") || log.action.includes("HIJACK");
                        const dateFormatted = new Date(log.created_at).toLocaleString("en-IN", {
                          timeZone: "Asia/Kolkata",
                          day: "2-digit",
                          month: "2-digit",
                          year: "numeric",
                          hour: "2-digit",
                          minute: "2-digit",
                          hour12: true,
                        });

                        return (
                          <tr key={log.id} className={`transition-colors font-medium ${getRowBg(log.action)}`}>
                            <td className="py-2.5 px-3 text-slate-600 font-mono text-[10px] whitespace-nowrap">
                              {dateFormatted}
                            </td>
                            <td className="py-2.5 px-3 whitespace-nowrap">
                              <div className="flex items-center gap-1 font-mono">
                                <span className="font-bold text-slate-800 text-[12px]">
                                  #{log.id}
                                </span>
                                <button
                                  type="button"
                                  onClick={() => handleCopy(String(log.id), `log-id-${log.id}`)}
                                  title="Copy ID"
                                  className="p-0.5 text-slate-400 hover:text-slate-700 transition-colors cursor-pointer"
                                >
                                  {copiedId === `log-id-${log.id}` ? (
                                    <Check className="w-3 h-3 text-emerald-600" />
                                  ) : (
                                    <Copy className="w-3 h-3" />
                                  )}
                                </button>
                              </div>
                            </td>
                            <td className="py-2.5 px-3 whitespace-nowrap">
                              <span className={`inline-block px-2 py-0.5 rounded text-[10px] font-bold border tracking-wide uppercase ${getActionBadgeStyle(log.action)}`}>
                                {log.action}
                              </span>
                            </td>
                            <td className="py-2.5 px-3 whitespace-nowrap">
                              <div className="flex items-center gap-1 font-mono font-bold text-slate-900 text-[12px]">
                                <span>+91 {log.mobile}</span>
                                <button
                                  type="button"
                                  onClick={() => handleCopy(log.mobile, `log-mob-${log.id}`)}
                                  title="Copy Mobile"
                                  className="p-0.5 text-slate-400 hover:text-slate-700 transition-colors cursor-pointer"
                                >
                                  {copiedId === `log-mob-${log.id}` ? (
                                    <Check className="w-3 h-3 text-emerald-600" />
                                  ) : (
                                    <Copy className="w-3 h-3" />
                                  )}
                                </button>
                              </div>
                            </td>
                            <td className="py-2.5 px-3 whitespace-nowrap text-slate-600 text-[12px]">
                              <div className="flex items-center gap-1">
                                {log.device_type?.toLowerCase().includes("mobile") ? (
                                  <Smartphone className="w-3 h-3 text-slate-400" />
                                ) : (
                                  <Laptop className="w-3 h-3 text-blue-500" />
                                )}
                                <span>{log.device_type || "Desktop"}</span>
                              </div>
                            </td>
                            <td className="py-2.5 px-3 whitespace-nowrap font-mono text-slate-500 text-[10px]">
                              {log.ip_address || "127.0.0.1"}
                            </td>
                            <td className="py-2.5 px-3 whitespace-nowrap">
                              {isAlert ? (
                                <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-[10px] font-bold bg-red-100 text-red-700">
                                  <ShieldAlert className="w-3 h-3" />
                                  Flagged
                                </span>
                              ) : (
                                <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-[10px] font-bold bg-emerald-100 text-emerald-700">
                                  <CheckCircle2 className="w-3 h-3" />
                                  Verified
                                </span>
                              )}
                            </td>
                            <td className="py-2.5 px-3 whitespace-nowrap text-slate-600">
                              <span className={`px-1.5 py-0.2 rounded text-[10px] font-bold uppercase ${log.user_role === "admin" ? "bg-amber-100 text-amber-800" : "bg-slate-100 text-slate-600"
                                }`}>
                                {log.user_role || "User"}
                              </span>
                            </td>
                            <td className="py-2.5 px-3 text-center whitespace-nowrap">
                              <button
                                type="button"
                                onClick={() => handleCopy(String(log.id), log.id)}
                                title="Copy ID"
                                className="p-1 rounded text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
                              >
                                {copiedId === log.id ? (
                                  <Check className="w-3 h-3 text-emerald-600" />
                                ) : (
                                  <Copy className="w-3 h-3" />
                                )}
                              </button>
                            </td>
                          </tr>
                        );
                      })
                    )}
                  </tbody>
                </table>
              )}

              {/* TAB 2: MEMBERSHIPS TABLE (Requested by User) */}
              {activeTab === "memberships" && (
                <table className="w-full min-w-[1300px] border-collapse text-left text-[12px]">
                  <thead className="sticky top-0 z-10 bg-slate-50 border-b border-slate-200 text-slate-500 font-bold uppercase tracking-wider text-[10px]">
                    <tr>
                      <th className="py-2.5 px-3 w-[150px]">Membership ID</th>
                      <th className="py-2.5 px-3 w-[160px]">Full Name</th>
                      <th className="py-2.5 px-3 w-[140px]">Mobile</th>
                      <th className="py-2.5 px-3 w-[80px]">Age</th>
                      <th className="py-2.5 px-3 w-[140px]">Village</th>
                      <th className="py-2.5 px-3 w-[120px]">Taluk</th>
                      <th className="py-2.5 px-3 w-[100px]">Pincode</th>
                      <th className="py-2.5 px-3 w-[220px]">Activity Interest</th>
                      <th className="py-2.5 px-3 w-[100px]">Status</th>
                      <th className="py-2.5 px-3 w-[160px]">Registered Date</th>
                      <th className="py-2.5 px-3 w-[50px] text-center">Copy</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {loadingData ? (
                      <tr>
                        <td colSpan={11} className="py-16 text-center text-slate-400">
                          <div className="flex flex-col items-center justify-center gap-1.5">
                            <div className="w-5 h-5 border-2 border-blue-600 border-t-transparent rounded-full animate-spin" />
                            <span className="text-[10px]">Loading memberships...</span>
                          </div>
                        </td>
                      </tr>
                    ) : memberships.length === 0 ? (
                      <tr>
                        <td colSpan={11} className="py-16 text-center text-slate-400 text-[12px]">
                          No citizen memberships registered yet.
                        </td>
                      </tr>
                    ) : (
                      memberships.map((m) => (
                        <tr key={m.id} className="hover:bg-slate-50 font-medium">
                          <td className="py-2.5 px-3 whitespace-nowrap">
                            <div className="flex items-center gap-1">
                              <span className="font-mono font-bold text-blue-700 bg-blue-50 px-2 py-0.5 rounded text-[10px]">
                                {m.membership_id}
                              </span>
                              <button
                                type="button"
                                onClick={() => handleCopy(m.membership_id, `mem-id-${m.id}`)}
                                title="Copy Membership ID"
                                className="p-0.5 text-slate-400 hover:text-slate-700 transition-colors cursor-pointer"
                              >
                                {copiedId === `mem-id-${m.id}` ? (
                                  <Check className="w-3 h-3 text-emerald-600" />
                                ) : (
                                  <Copy className="w-3 h-3" />
                                )}
                              </button>
                            </div>
                          </td>
                          <td className="py-2.5 px-3 whitespace-nowrap">
                            <span className="font-bold text-slate-900 text-[12px] block">{m.full_name}</span>
                            {m.email && (
                              <div className="flex items-center gap-1 text-[10px] text-slate-400 font-normal">
                                <span className="truncate max-w-[130px]">{m.email}</span>
                                <button
                                  type="button"
                                  onClick={() => handleCopy(m.email!, `mem-email-${m.id}`)}
                                  title="Copy Email"
                                  className="p-0.5 text-slate-400 hover:text-slate-700 transition-colors cursor-pointer"
                                >
                                  {copiedId === `mem-email-${m.id}` ? (
                                    <Check className="w-2.5 h-2.5 text-emerald-600" />
                                  ) : (
                                    <Copy className="w-2.5 h-2.5" />
                                  )}
                                </button>
                              </div>
                            )}
                          </td>
                          <td className="py-2.5 px-3 whitespace-nowrap">
                            <div className="flex items-center gap-1 font-mono font-bold text-slate-800 text-[12px]">
                              <span>+91 {m.mobile}</span>
                              <button
                                type="button"
                                onClick={() => handleCopy(m.mobile, `mem-mob-${m.id}`)}
                                title="Copy Mobile"
                                className="p-0.5 text-slate-400 hover:text-slate-700 transition-colors cursor-pointer"
                              >
                                {copiedId === `mem-mob-${m.id}` ? (
                                  <Check className="w-3 h-3 text-emerald-600" />
                                ) : (
                                  <Copy className="w-3 h-3" />
                                )}
                              </button>
                            </div>
                          </td>
                          <td className="py-2.5 px-3 text-slate-600 font-mono text-[12px]">
                            {m.age || "N/A"}
                          </td>
                          <td className="py-2.5 px-3 text-slate-800 text-[12px] whitespace-nowrap">
                            {m.village}
                          </td>
                          <td className="py-2.5 px-3 text-slate-600 text-[12px] whitespace-nowrap">
                            {m.taluk}
                          </td>
                          <td className="py-2.5 px-3 font-mono text-slate-500 text-[10px]">
                            {m.pincode}
                          </td>
                          <td className="py-2.5 px-3 text-slate-700 text-[10px]">
                            <span className="inline-block px-2 py-0.5 rounded bg-slate-100 font-semibold">
                              {m.interest}
                            </span>
                          </td>
                          <td className="py-2.5 px-3 whitespace-nowrap">
                            <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-[10px] font-bold bg-emerald-100 text-emerald-800">
                              <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                              {m.status || "Active"}
                            </span>
                          </td>
                          <td className="py-2.5 px-3 text-slate-500 font-mono text-[10px] whitespace-nowrap">
                            {new Date(m.created_at).toLocaleString("en-IN", { timeZone: "Asia/Kolkata" })}
                          </td>
                          <td className="py-2.5 px-3 text-center whitespace-nowrap">
                            <button
                              type="button"
                              onClick={() => handleCopy(m.membership_id, m.id)}
                              title="Copy ID"
                              className="p-1 rounded text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
                            >
                              {copiedId === m.id ? (
                                <Check className="w-3 h-3 text-emerald-600" />
                              ) : (
                                <Copy className="w-3 h-3" />
                              )}
                            </button>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              )}

              {/* TAB 3: CONSTITUENCY EVENTS TABLE */}
              {activeTab === "events" && (
                <table className="w-full min-w-[1050px] border-collapse text-left text-[12px]">
                  <thead className="sticky top-0 z-10 bg-slate-50 border-b border-slate-200 text-slate-500 font-bold uppercase tracking-wider text-[10px]">
                    <tr>
                      <th className="py-2.5 px-3 w-[70px]">ID</th>
                      <th className="py-2.5 px-3 w-[150px]">Date & Time</th>
                      <th className="py-2.5 px-3 w-[260px]">Event Title (EN / KN)</th>
                      <th className="py-2.5 px-3 w-[200px]">Venue / Location</th>
                      <th className="py-2.5 px-3 w-[110px]">Category</th>
                      <th className="py-2.5 px-3 w-[100px]">Status</th>
                      <th className="py-2.5 px-3 w-[160px]">Contact Info</th>
                      <th className="py-2.5 px-3 w-[90px] text-center">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {loadingData ? (
                      <tr>
                        <td colSpan={8} className="py-16 text-center text-slate-400">
                          <div className="flex flex-col items-center justify-center gap-1.5">
                            <div className="w-5 h-5 border-2 border-blue-600 border-t-transparent rounded-full animate-spin" />
                            <span className="text-[10px]">Loading constituency events...</span>
                          </div>
                        </td>
                      </tr>
                    ) : events.length === 0 ? (
                      <tr>
                        <td colSpan={8} className="py-16 text-center text-slate-400 text-[12px]">
                          No events found. Click &quot;Publish Event&quot; to schedule a rally or town hall.
                        </td>
                      </tr>
                    ) : (
                      events.map((evt) => (
                        <tr key={evt.id} className="hover:bg-slate-50 font-medium">
                          <td className="py-2.5 px-3 whitespace-nowrap">
                            <div className="flex items-center gap-1">
                              <span className="font-mono font-bold text-slate-800 text-[10px] bg-slate-100 px-1.5 py-0.5 rounded">
                                #{evt.id}
                              </span>
                              <button
                                type="button"
                                onClick={() => handleCopy(String(evt.id), `evt-id-${evt.id}`)}
                                title="Copy ID"
                                className="p-0.5 text-slate-400 hover:text-slate-700 transition-colors cursor-pointer"
                              >
                                {copiedId === `evt-id-${evt.id}` ? (
                                  <Check className="w-3 h-3 text-emerald-600" />
                                ) : (
                                  <Copy className="w-3 h-3" />
                                )}
                              </button>
                            </div>
                          </td>
                          <td className="py-2.5 px-3 whitespace-nowrap">
                            <div className="space-y-0.5 font-mono">
                              <div className="flex items-center gap-1 text-slate-900 font-bold text-[10px]">
                                <Calendar className="w-3 h-3 text-blue-600" />
                                <span>{evt.event_date}</span>
                                <button
                                  type="button"
                                  onClick={() => handleCopy(evt.event_date, `evt-date-${evt.id}`)}
                                  title="Copy Date"
                                  className="p-0.5 text-slate-400 hover:text-slate-700 transition-colors cursor-pointer"
                                >
                                  {copiedId === `evt-date-${evt.id}` ? (
                                    <Check className="w-2.5 h-2.5 text-emerald-600" />
                                  ) : (
                                    <Copy className="w-2.5 h-2.5" />
                                  )}
                                </button>
                              </div>
                              <div className="text-[10px] text-slate-500 flex items-center gap-1">
                                <Clock className="w-2.5 h-2.5" />
                                <span>{evt.start_time}{evt.end_time ? ` - ${evt.end_time}` : ""}</span>
                              </div>
                            </div>
                          </td>
                          <td className="py-2.5 px-3">
                            <span className="font-bold text-slate-900 text-[12px] block leading-tight">{evt.title_en}</span>
                            <span className="text-[10px] text-slate-500 font-normal block leading-tight mt-0.5">{evt.title_kn}</span>
                          </td>
                          <td className="py-2.5 px-3">
                            <span className="text-slate-800 text-[12px] block truncate max-w-[190px]">{evt.location_en}</span>
                            <span className="text-slate-400 text-[10px] block truncate max-w-[190px]">{evt.location_kn}</span>
                          </td>
                          <td className="py-2.5 px-3 whitespace-nowrap">
                            <span className="inline-block px-2 py-0.5 rounded text-[10px] font-semibold bg-slate-100 text-slate-700 uppercase">
                              {evt.category}
                            </span>
                          </td>
                          <td className="py-2.5 px-3 whitespace-nowrap">
                            <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold ${evt.status === "upcoming"
                              ? "bg-emerald-100 text-emerald-800"
                              : evt.status === "completed"
                                ? "bg-blue-100 text-blue-800"
                                : "bg-red-100 text-red-800"
                              }`}>
                              <span className={`w-1.5 h-1.5 rounded-full ${evt.status === "upcoming" ? "bg-emerald-500 animate-pulse" : evt.status === "completed" ? "bg-blue-500" : "bg-red-500"
                                }`} />
                              <span className="capitalize">{evt.status}</span>
                            </span>
                          </td>
                          <td className="py-2.5 px-3 whitespace-nowrap">
                            {evt.contact_phone ? (
                              <div className="flex items-center gap-1 font-mono text-[10px] text-slate-700">
                                <span>{evt.contact_phone}</span>
                                <button
                                  type="button"
                                  onClick={() => handleCopy(evt.contact_phone!, `evt-phn-${evt.id}`)}
                                  title="Copy Phone"
                                  className="p-0.5 text-slate-400 hover:text-slate-700 transition-colors cursor-pointer"
                                >
                                  {copiedId === `evt-phn-${evt.id}` ? (
                                    <Check className="w-2.5 h-2.5 text-emerald-600" />
                                  ) : (
                                    <Copy className="w-2.5 h-2.5" />
                                  )}
                                </button>
                              </div>
                            ) : (
                              <span className="text-slate-400 text-[10px]">N/A</span>
                            )}
                          </td>
                          <td className="py-2.5 px-3 text-center whitespace-nowrap">
                            <div className="flex items-center justify-center gap-1">
                              <button
                                type="button"
                                onClick={() => handleOpenEditEvent(evt)}
                                title="Edit Event"
                                className="p-1 rounded text-blue-600 hover:bg-blue-50 transition-colors cursor-pointer"
                              >
                                <Pencil className="w-3.5 h-3.5" />
                              </button>
                              <button
                                type="button"
                                onClick={() => handleDeleteEvent(evt.id)}
                                title="Delete Event"
                                className="p-1 rounded text-red-600 hover:bg-red-50 transition-colors cursor-pointer"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              )}

              {/* TAB 4: CONSTITUENCY ARTICLES TABLE */}
              {activeTab === "articles" && (
                <table className="w-full min-w-[1050px] border-collapse text-left text-[12px]">
                  <thead className="sticky top-0 z-10 bg-slate-50 border-b border-slate-200 text-slate-500 font-bold uppercase tracking-wider text-[10px]">
                    <tr>
                      <th className="py-2.5 px-3 w-[70px]">ID</th>
                      <th className="py-2.5 px-3 w-[120px]">Published Date</th>
                      <th className="py-2.5 px-3 w-[300px]">Article Title (EN / KN)</th>
                      <th className="py-2.5 px-3 w-[120px]">Category</th>
                      <th className="py-2.5 px-3 w-[100px]">Status</th>
                      <th className="py-2.5 px-3 w-[90px]">Views</th>
                      <th className="py-2.5 px-3 w-[160px]">Author</th>
                      <th className="py-2.5 px-3 w-[90px] text-center">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {loadingData ? (
                      <tr>
                        <td colSpan={8} className="py-16 text-center text-slate-400">
                          <div className="flex flex-col items-center justify-center gap-1.5">
                            <div className="w-5 h-5 border-2 border-blue-600 border-t-transparent rounded-full animate-spin" />
                            <span className="text-[10px]">Loading articles...</span>
                          </div>
                        </td>
                      </tr>
                    ) : articles.length === 0 ? (
                      <tr>
                        <td colSpan={8} className="py-16 text-center text-slate-400 text-[12px]">
                          No articles found. Click &quot;Publish Article&quot; to publish your first article.
                        </td>
                      </tr>
                    ) : (
                      articles.map((art) => (
                        <tr key={art.id} className="hover:bg-slate-50 font-medium">
                          <td className="py-2.5 px-3 whitespace-nowrap">
                            <div className="flex items-center gap-1">
                              <span className="font-mono font-bold text-slate-800 text-[10px] bg-slate-100 px-1.5 py-0.5 rounded">
                                #{art.id}
                              </span>
                              <button
                                type="button"
                                onClick={() => handleCopy(String(art.id), `art-id-${art.id}`)}
                                title="Copy ID"
                                className="p-0.5 text-slate-400 hover:text-slate-700 transition-colors cursor-pointer"
                              >
                                {copiedId === `art-id-${art.id}` ? (
                                  <Check className="w-3 h-3 text-emerald-600" />
                                ) : (
                                  <Copy className="w-3 h-3" />
                                )}
                              </button>
                            </div>
                          </td>
                          <td className="py-2.5 px-3 whitespace-nowrap font-mono text-[10px] text-slate-600">
                            {art.published_at}
                          </td>
                          <td className="py-2.5 px-3">
                            <div className="space-y-0.5 max-w-[320px]">
                              <p className="font-bold text-slate-900 truncate text-[12px]">
                                {art.title_en}
                              </p>
                              <p className="font-anek text-slate-500 truncate text-[10px]">
                                {art.title_kn}
                              </p>
                            </div>
                          </td>
                          <td className="py-2.5 px-3 whitespace-nowrap">
                            <span className="px-2 py-0.5 rounded-full text-[10px] font-bold uppercase bg-blue-50 text-blue-700 border border-blue-200">
                              {art.category}
                            </span>
                          </td>
                          <td className="py-2.5 px-3 whitespace-nowrap">
                            <span
                              className={`px-2 py-0.5 rounded-full text-[10px] font-bold capitalize ${art.status === "published"
                                  ? "bg-emerald-100 text-emerald-800"
                                  : art.status === "draft"
                                    ? "bg-amber-100 text-amber-800"
                                    : "bg-slate-100 text-slate-700"
                                }`}
                            >
                              {art.status}
                            </span>
                          </td>
                          <td className="py-2.5 px-3 whitespace-nowrap font-mono text-[10px] text-slate-700">
                            <div className="flex items-center gap-1">
                              <Eye className="w-3 h-3 text-slate-400" />
                              <span>{art.views_count}</span>
                            </div>
                          </td>
                          <td className="py-2.5 px-3 text-slate-600 truncate max-w-[160px] text-[10px]">
                            {art.author}
                          </td>
                          <td className="py-2.5 px-3 whitespace-nowrap text-center">
                            <div className="flex items-center justify-center gap-1">
                              <button
                                type="button"
                                onClick={() => handleOpenEditArticle(art)}
                                title="Edit Article"
                                className="p-1 rounded text-blue-600 hover:bg-blue-50 transition-colors cursor-pointer"
                              >
                                <Pencil className="w-3 h-3" />
                              </button>
                              <button
                                type="button"
                                onClick={() => handleDeleteArticle(art.id)}
                                title="Delete Article"
                                className="p-1 rounded text-rose-600 hover:bg-rose-50 transition-colors cursor-pointer"
                              >
                                <Trash2 className="w-3 h-3" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              )}

              {/* TAB 4: GRIEVANCES & CONCERNS TABLE */}
              {activeTab === "concerns" && (
                <table className="w-full min-w-[1150px] border-collapse text-left text-[12px]">
                  <thead className="sticky top-0 z-10 bg-slate-50 border-b border-slate-200 text-slate-500 font-bold uppercase tracking-wider text-[10px]">
                    <tr>
                      <th className="py-2.5 px-3 w-[150px]">Tracking ID</th>
                      <th className="py-2.5 px-3 w-[170px]">Citizen</th>
                      <th className="py-2.5 px-3 w-[140px]">Location</th>
                      <th className="py-2.5 px-3 w-[220px]">Subject & Category</th>
                      <th className="py-2.5 px-3 w-[90px]">Urgency</th>
                      <th className="py-2.5 px-3 w-[110px]">Status</th>
                      <th className="py-2.5 px-3 w-[140px]">Assigned Dept</th>
                      <th className="py-2.5 px-3 w-[130px]">Submitted Date</th>
                      <th className="py-2.5 px-3 w-[110px] text-center">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {loadingData ? (
                      <tr>
                        <td colSpan={9} className="py-16 text-center text-slate-400">
                          <div className="flex flex-col items-center justify-center gap-1.5">
                            <div className="w-5 h-5 border-2 border-blue-600 border-t-transparent rounded-full animate-spin" />
                            <span className="text-[10px]">Loading citizen grievances...</span>
                          </div>
                        </td>
                      </tr>
                    ) : concerns.length === 0 ? (
                      <tr>
                        <td colSpan={9} className="py-16 text-center text-slate-400 text-[12px]">
                          No grievances or concerns found matching criteria.
                        </td>
                      </tr>
                    ) : (
                      concerns.map((c) => (
                        <tr key={c.id} className="hover:bg-slate-50 font-medium">
                          <td className="py-2.5 px-3 whitespace-nowrap">
                            <div className="flex items-center gap-1">
                              <span className="font-mono font-bold text-blue-700 bg-blue-50 px-2 py-0.5 rounded text-[10px]">
                                {c.tracking_id}
                              </span>
                              <button
                                type="button"
                                onClick={() => handleCopy(c.tracking_id, `cn-tr-${c.id}`)}
                                title="Copy Tracking ID"
                                className="p-0.5 text-slate-400 hover:text-slate-700 transition-colors cursor-pointer"
                              >
                                {copiedId === `cn-tr-${c.id}` ? (
                                  <Check className="w-3 h-3 text-emerald-600" />
                                ) : (
                                  <Copy className="w-3 h-3" />
                                )}
                              </button>
                            </div>
                          </td>
                          <td className="py-2.5 px-3 whitespace-nowrap">
                            <span className="font-bold text-slate-900 text-[12px] block">
                              {c.citizen_name}
                            </span>
                            <div className="flex items-center gap-1 font-mono text-[10px] text-slate-500">
                              <span>+91 {c.mobile}</span>
                              <button
                                type="button"
                                onClick={() => handleCopy(c.mobile, `cn-mob-${c.id}`)}
                                title="Copy Mobile"
                                className="p-0.5 text-slate-400 hover:text-slate-700 transition-colors cursor-pointer"
                              >
                                {copiedId === `cn-mob-${c.id}` ? (
                                  <Check className="w-2.5 h-2.5 text-emerald-600" />
                                ) : (
                                  <Copy className="w-2.5 h-2.5" />
                                )}
                              </button>
                            </div>
                          </td>
                          <td className="py-2.5 px-3 whitespace-nowrap">
                            <span className="text-slate-800 text-[12px] block font-medium">
                              {c.village || c.village_name || "Aland"}
                            </span>
                            <span className="text-[10px] text-slate-400 block">
                              {c.taluk || "Aland"} {c.pincode ? `• ${c.pincode}` : ""}
                            </span>
                          </td>
                          <td className="py-2.5 px-3">
                            <span className="font-bold text-slate-900 text-[12px] block truncate max-w-[210px]" title={c.title}>
                              {c.title}
                            </span>
                            <span className="text-[10px] text-slate-500 block truncate max-w-[210px]">
                              {c.category}
                            </span>
                          </td>
                          <td className="py-2.5 px-3 whitespace-nowrap">
                            <span
                              className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${c.urgency === "critical"
                                  ? "bg-rose-100 text-rose-700 border border-rose-200"
                                  : c.urgency === "high"
                                    ? "bg-orange-100 text-orange-700 border border-orange-200"
                                    : c.urgency === "medium"
                                      ? "bg-amber-100 text-amber-700 border border-amber-200"
                                      : "bg-slate-100 text-slate-600 border border-slate-200"
                                }`}
                            >
                              {c.urgency}
                            </span>
                          </td>
                          <td className="py-2.5 px-3 whitespace-nowrap">
                            <span
                              className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${c.status === "resolved"
                                  ? "bg-emerald-100 text-emerald-800 border border-emerald-200"
                                  : c.status === "in_progress"
                                    ? "bg-purple-100 text-purple-800 border border-purple-200"
                                    : c.status === "under_review"
                                      ? "bg-amber-100 text-amber-800 border border-amber-200"
                                      : c.status === "rejected"
                                        ? "bg-rose-100 text-rose-800 border border-rose-200"
                                        : "bg-blue-100 text-blue-800 border border-blue-200"
                                }`}
                            >
                              {c.status === "submitted"
                                ? "Submitted"
                                : c.status === "under_review"
                                  ? "Under Review"
                                  : c.status === "in_progress"
                                    ? "In Progress"
                                    : c.status === "resolved"
                                      ? "Resolved"
                                      : "Rejected"}
                            </span>
                          </td>
                          <td className="py-2.5 px-3 whitespace-nowrap text-slate-600 text-[10px]">
                            {c.assigned_to ? (
                              <span className="font-medium text-slate-700 truncate max-w-[130px] block">
                                {c.assigned_to}
                              </span>
                            ) : (
                              <span className="text-slate-400 italic">Not Assigned</span>
                            )}
                          </td>
                          <td className="py-2.5 px-3 whitespace-nowrap font-mono text-[10px] text-slate-600">
                            {new Date(c.created_at).toLocaleString("en-IN", {
                              timeZone: "Asia/Kolkata",
                              day: "2-digit",
                              month: "2-digit",
                              year: "numeric",
                              hour: "2-digit",
                              minute: "2-digit",
                            })}
                          </td>
                          <td className="py-2.5 px-3 whitespace-nowrap text-center">
                            <button
                              type="button"
                              onClick={() => handleOpenReviewConcern(c)}
                              className="px-2.5 py-1 rounded-md bg-blue-50 hover:bg-blue-100 text-blue-700 font-bold text-[10px] border border-blue-200 transition-colors cursor-pointer"
                            >
                              Review / Update
                            </button>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              )}

              {/* TAB 5: FARMER ENQUIRIES & ADVISORY REQUESTS TABLE */}
              {activeTab === "farmer_requests" && (
                <table className="w-full min-w-[1100px] border-collapse text-left text-[12px]">
                  <thead className="sticky top-0 z-10 bg-slate-50 border-b border-slate-200 text-slate-500 font-bold uppercase tracking-wider text-[10px]">
                    <tr>
                      <th className="py-2.5 px-3 w-[80px]">Req ID</th>
                      <th className="py-2.5 px-3 w-[180px]">Farmer Details</th>
                      <th className="py-2.5 px-3 w-[150px]">Village / Location</th>
                      <th className="py-2.5 px-3 w-[300px]">Advisory Query / Tur Dal Needs</th>
                      <th className="py-2.5 px-3 w-[110px]">Status</th>
                      <th className="py-2.5 px-3 w-[170px]">Agri Cell Notes</th>
                      <th className="py-2.5 px-3 w-[130px]">Submitted Date</th>
                      <th className="py-2.5 px-3 w-[110px] text-center">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {loadingData ? (
                      <tr>
                        <td colSpan={8} className="py-16 text-center text-slate-400">
                          <div className="flex flex-col items-center justify-center gap-1.5">
                            <div className="w-5 h-5 border-2 border-emerald-600 border-t-transparent rounded-full animate-spin" />
                            <span className="text-[10px]">Loading farmer advisory requests...</span>
                          </div>
                        </td>
                      </tr>
                    ) : contactMessages.length === 0 ? (
                      <tr>
                        <td colSpan={8} className="py-16 text-center text-slate-400 text-[12px]">
                          No farmer advisory requests found matching criteria.
                        </td>
                      </tr>
                    ) : (
                      contactMessages.map((msg) => (
                        <tr key={msg.id} className="hover:bg-slate-50 font-medium">
                          <td className="py-2.5 px-3 whitespace-nowrap">
                            <span className="font-mono font-bold text-emerald-800 text-[12px] bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-200">
                              #FARM-{msg.id}
                            </span>
                          </td>
                          <td className="py-2.5 px-3 whitespace-nowrap">
                            <span className="font-bold text-slate-900 text-[12px] block">
                              {msg.name}
                            </span>
                            <div className="flex items-center gap-1 font-mono text-[10px] text-slate-500">
                              <span>+91 {msg.phone}</span>
                              <button
                                type="button"
                                onClick={() => handleCopy(msg.phone, `frm-ph-${msg.id}`)}
                                title="Copy Mobile"
                                className="p-0.5 text-slate-400 hover:text-slate-700 transition-colors cursor-pointer"
                              >
                                {copiedId === `frm-ph-${msg.id}` ? (
                                  <Check className="w-2.5 h-2.5 text-emerald-600" />
                                ) : (
                                  <Copy className="w-2.5 h-2.5" />
                                )}
                              </button>
                            </div>
                          </td>
                          <td className="py-2.5 px-3 whitespace-nowrap">
                            <span className="text-slate-800 text-[12px] block font-medium">
                              {msg.location || "Aland"}
                            </span>
                          </td>
                          <td className="py-2.5 px-3">
                            <p className="text-[10px] text-slate-700 line-clamp-2 max-w-[290px] leading-relaxed font-mono" title={msg.message}>
                              {msg.message}
                            </p>
                          </td>
                          <td className="py-2.5 px-3 whitespace-nowrap">
                            <span
                              className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                                msg.status === "resolved"
                                  ? "bg-emerald-100 text-emerald-800 border border-emerald-200"
                                  : msg.status === "contacted"
                                    ? "bg-amber-100 text-amber-800 border border-amber-200"
                                    : msg.status === "in_progress"
                                      ? "bg-purple-100 text-purple-800 border border-purple-200"
                                      : "bg-blue-100 text-blue-800 border border-blue-200"
                              }`}
                            >
                              {msg.status === "resolved"
                                ? "Resolved"
                                : msg.status === "contacted"
                                  ? "Contacted"
                                  : msg.status === "in_progress"
                                    ? "In Review"
                                    : "New"}
                            </span>
                          </td>
                          <td className="py-2.5 px-3 text-slate-600 text-[10px]">
                            {msg.admin_notes ? (
                              <span className="truncate max-w-[160px] block font-medium text-emerald-950" title={msg.admin_notes}>
                                {msg.admin_notes}
                              </span>
                            ) : (
                              <span className="text-slate-400 italic">No notes</span>
                            )}
                          </td>
                          <td className="py-2.5 px-3 whitespace-nowrap font-mono text-[10px] text-slate-600">
                            {msg.created_at_formatted || new Date(msg.created_at).toLocaleDateString("en-IN")}
                          </td>
                          <td className="py-2.5 px-3 whitespace-nowrap text-center">
                            <button
                              type="button"
                              onClick={() => handleOpenReviewContact(msg)}
                              className="px-2.5 py-1 rounded-md bg-emerald-50 hover:bg-emerald-100 text-emerald-700 font-bold text-[10px] border border-emerald-200 transition-colors cursor-pointer"
                            >
                              Review / Update
                            </button>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              )}

              {/* TAB 6: GENERAL PUBLIC ENQUIRIES TABLE */}
              {activeTab === "general_enquiries" && (
                <table className="w-full min-w-[1100px] border-collapse text-left text-[12px]">
                  <thead className="sticky top-0 z-10 bg-slate-50 border-b border-slate-200 text-slate-500 font-bold uppercase tracking-wider text-[10px]">
                    <tr>
                      <th className="py-2.5 px-3 w-[80px]">Enq ID</th>
                      <th className="py-2.5 px-3 w-[180px]">Citizen / Contact</th>
                      <th className="py-2.5 px-3 w-[120px]">Channel</th>
                      <th className="py-2.5 px-3 w-[140px]">Location</th>
                      <th className="py-2.5 px-3 w-[290px]">Message / Enquiry</th>
                      <th className="py-2.5 px-3 w-[110px]">Status</th>
                      <th className="py-2.5 px-3 w-[160px]">Admin Notes</th>
                      <th className="py-2.5 px-3 w-[130px]">Received Date</th>
                      <th className="py-2.5 px-3 w-[110px] text-center">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {loadingData ? (
                      <tr>
                        <td colSpan={9} className="py-16 text-center text-slate-400">
                          <div className="flex flex-col items-center justify-center gap-1.5">
                            <div className="w-5 h-5 border-2 border-blue-600 border-t-transparent rounded-full animate-spin" />
                            <span className="text-[10px]">Loading general enquiries...</span>
                          </div>
                        </td>
                      </tr>
                    ) : contactMessages.length === 0 ? (
                      <tr>
                        <td colSpan={9} className="py-16 text-center text-slate-400 text-[12px]">
                          No public enquiries found matching criteria.
                        </td>
                      </tr>
                    ) : (
                      contactMessages.map((msg) => (
                        <tr key={msg.id} className="hover:bg-slate-50 font-medium">
                          <td className="py-2.5 px-3 whitespace-nowrap">
                            <span className="font-mono font-bold text-blue-800 text-[12px] bg-blue-50 px-1.5 py-0.5 rounded border border-blue-200">
                              #ENQ-{msg.id}
                            </span>
                          </td>
                          <td className="py-2.5 px-3 whitespace-nowrap">
                            <span className="font-bold text-slate-900 text-[12px] block">
                              {msg.name}
                            </span>
                            <div className="flex items-center gap-1 font-mono text-[10px] text-slate-500">
                              <span>+91 {msg.phone}</span>
                              <button
                                type="button"
                                onClick={() => handleCopy(msg.phone, `enq-ph-${msg.id}`)}
                                title="Copy Mobile"
                                className="p-0.5 text-slate-400 hover:text-slate-700 transition-colors cursor-pointer"
                              >
                                {copiedId === `enq-ph-${msg.id}` ? (
                                  <Check className="w-2.5 h-2.5 text-emerald-600" />
                                ) : (
                                  <Copy className="w-2.5 h-2.5" />
                                )}
                              </button>
                            </div>
                            {msg.email && (
                              <span className="text-[10px] text-slate-400 truncate max-w-[150px] block">
                                {msg.email}
                              </span>
                            )}
                          </td>
                          <td className="py-2.5 px-3 whitespace-nowrap">
                            <span
                              className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                                msg.source === "newsletter"
                                  ? "bg-amber-100 text-amber-800 border border-amber-200"
                                  : "bg-blue-100 text-blue-800 border border-blue-200"
                              }`}
                            >
                              {msg.source === "newsletter" ? "Newsletter" : "Contact Form"}
                            </span>
                          </td>
                          <td className="py-2.5 px-3 whitespace-nowrap">
                            <span className="text-slate-800 text-[12px] block font-medium">
                              {msg.location || "Aland"}
                            </span>
                          </td>
                          <td className="py-2.5 px-3">
                            <p className="text-[10px] text-slate-700 line-clamp-2 max-w-[280px] leading-relaxed" title={msg.message}>
                              {msg.message}
                            </p>
                          </td>
                          <td className="py-2.5 px-3 whitespace-nowrap">
                            <span
                              className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                                msg.status === "resolved"
                                  ? "bg-emerald-100 text-emerald-800 border border-emerald-200"
                                  : msg.status === "contacted"
                                    ? "bg-amber-100 text-amber-800 border border-amber-200"
                                    : msg.status === "in_progress"
                                      ? "bg-purple-100 text-purple-800 border border-purple-200"
                                      : "bg-blue-100 text-blue-800 border border-blue-200"
                              }`}
                            >
                              {msg.status === "resolved"
                                ? "Resolved"
                                : msg.status === "contacted"
                                  ? "Contacted"
                                  : msg.status === "in_progress"
                                    ? "In Progress"
                                    : "New"}
                            </span>
                          </td>
                          <td className="py-2.5 px-3 text-slate-600 text-[10px]">
                            {msg.admin_notes ? (
                              <span className="truncate max-w-[150px] block" title={msg.admin_notes}>
                                {msg.admin_notes}
                              </span>
                            ) : (
                              <span className="text-slate-400 italic">No notes</span>
                            )}
                          </td>
                          <td className="py-2.5 px-3 whitespace-nowrap font-mono text-[10px] text-slate-600">
                            {msg.created_at_formatted || new Date(msg.created_at).toLocaleDateString("en-IN")}
                          </td>
                          <td className="py-2.5 px-3 whitespace-nowrap text-center">
                            <button
                              type="button"
                              onClick={() => handleOpenReviewContact(msg)}
                              className="px-2.5 py-1 rounded-md bg-blue-50 hover:bg-blue-100 text-blue-700 font-bold text-[10px] border border-blue-200 transition-colors cursor-pointer"
                            >
                              Review / Respond
                            </button>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              )}

              {/* TAB 6: REGISTERED USERS TABLE */}
              {activeTab === "users" && (
                <table className="w-full min-w-[980px] border-collapse text-left text-[12px]">
                  <thead className="sticky top-0 z-10 bg-slate-50 border-b border-slate-200 text-slate-500 font-bold uppercase tracking-wider text-[10px]">
                    <tr>
                      <th className="py-2.5 px-3 w-[90px]">User ID</th>
                      <th className="py-2.5 px-3 w-[150px]">Mobile</th>
                      <th className="py-2.5 px-3 w-[150px]">Citizen Name</th>
                      <th className="py-2.5 px-3 w-[110px]">Role</th>
                      <th className="py-2.5 px-3 w-[110px]">Language</th>
                      <th className="py-2.5 px-3 w-[110px]">Status</th>
                      <th className="py-2.5 px-3 w-[170px]">Last Login</th>
                      <th className="py-2.5 px-3 w-[170px]">Registered On</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {loadingData ? (
                      <tr>
                        <td colSpan={8} className="py-16 text-center text-slate-400">
                          <div className="flex flex-col items-center justify-center gap-1.5">
                            <div className="w-5 h-5 border-2 border-blue-600 border-t-transparent rounded-full animate-spin" />
                            <span className="text-[10px]">Loading citizens...</span>
                          </div>
                        </td>
                      </tr>
                    ) : users.length === 0 ? (
                      <tr>
                        <td colSpan={8} className="py-16 text-center text-slate-400 text-[12px]">
                          No registered users found.
                        </td>
                      </tr>
                    ) : (
                      users.map((u) => (
                        <tr key={u.id} className="hover:bg-slate-50 font-medium">
                          <td className="py-2.5 px-3 font-mono font-bold text-slate-800 text-[12px]">
                            <div className="flex items-center gap-1">
                              <span>#{u.id}</span>
                              <button
                                type="button"
                                onClick={() => handleCopy(String(u.id), `user-id-${u.id}`)}
                                title="Copy User ID"
                                className="p-0.5 text-slate-400 hover:text-slate-700 transition-colors cursor-pointer"
                              >
                                {copiedId === `user-id-${u.id}` ? (
                                  <Check className="w-3 h-3 text-emerald-600" />
                                ) : (
                                  <Copy className="w-3 h-3" />
                                )}
                              </button>
                            </div>
                          </td>
                          <td className="py-2.5 px-3 font-bold text-slate-900 font-mono text-[12px]">
                            <div className="flex items-center gap-1">
                              <span>+91 {u.mobile}</span>
                              <button
                                type="button"
                                onClick={() => handleCopy(u.mobile, `user-mob-${u.id}`)}
                                title="Copy Mobile"
                                className="p-0.5 text-slate-400 hover:text-slate-700 transition-colors cursor-pointer"
                              >
                                {copiedId === `user-mob-${u.id}` ? (
                                  <Check className="w-3 h-3 text-emerald-600" />
                                ) : (
                                  <Copy className="w-3 h-3" />
                                )}
                              </button>
                            </div>
                          </td>
                          <td className="py-2.5 px-3 text-slate-700 text-[12px]">{u.name || "Aland Citizen"}</td>
                          <td className="py-2.5 px-3">
                            <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${u.role === "admin" ? "bg-amber-100 text-amber-800 border border-amber-200" : "bg-blue-100 text-blue-700 border border-blue-200"
                              }`}>
                              {u.role}
                            </span>
                          </td>
                          <td className="py-2.5 px-3 text-slate-600 font-medium uppercase text-[10px]">
                            {u.preferred_language === "kn" ? "ಕನ್ನಡ (KN)" : "English (EN)"}
                          </td>
                          <td className="py-2.5 px-3">
                            <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-[10px] font-bold bg-emerald-100 text-emerald-700">
                              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                              {u.status}
                            </span>
                          </td>
                          <td className="py-2.5 px-3 text-slate-600 font-mono text-[10px]">
                            {u.last_login_at
                              ? new Date(u.last_login_at).toLocaleString("en-IN", { timeZone: "Asia/Kolkata" })
                              : "Never"}
                          </td>
                          <td className="py-2.5 px-3 text-slate-500 font-mono text-[10px]">
                            {new Date(u.created_at).toLocaleString("en-IN", { timeZone: "Asia/Kolkata" })}
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              )}

              {/* TAB 4: ACTIVE SESSIONS TABLE */}
              {activeTab === "sessions" && (
                <table className="w-full min-w-[1050px] border-collapse text-left text-[12px]">
                  <thead className="sticky top-0 z-10 bg-slate-50 border-b border-slate-200 text-slate-500 font-bold uppercase tracking-wider text-[10px]">
                    <tr>
                      <th className="py-2.5 px-3 w-[90px]">Session ID</th>
                      <th className="py-2.5 px-3 w-[150px]">Citizen Mobile</th>
                      <th className="py-2.5 px-3 w-[100px]">Role</th>
                      <th className="py-2.5 px-3 w-[260px]">Session UUID</th>
                      <th className="py-2.5 px-3 w-[120px]">Client IP</th>
                      <th className="py-2.5 px-3 w-[110px]">Status</th>
                      <th className="py-2.5 px-3 w-[160px]">Expires At</th>
                      <th className="py-2.5 px-3 w-[160px]">Issued At</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {loadingData ? (
                      <tr>
                        <td colSpan={8} className="py-16 text-center text-slate-400">
                          <div className="flex flex-col items-center justify-center gap-1.5">
                            <div className="w-5 h-5 border-2 border-blue-600 border-t-transparent rounded-full animate-spin" />
                            <span className="text-[10px]">Loading sessions...</span>
                          </div>
                        </td>
                      </tr>
                    ) : sessions.length === 0 ? (
                      <tr>
                        <td colSpan={8} className="py-16 text-center text-slate-400 text-[12px]">
                          No active sessions found.
                        </td>
                      </tr>
                    ) : (
                      sessions.map((s) => (
                        <tr key={s.id} className="hover:bg-slate-50 font-medium">
                          <td className="py-2.5 px-3 font-mono font-bold text-slate-800 text-[12px]">#{s.id}</td>
                          <td className="py-2.5 px-3 font-bold text-slate-900 font-mono text-[12px]">
                            <div className="flex items-center gap-1">
                              <span>+91 {s.mobile}</span>
                              <button
                                type="button"
                                onClick={() => handleCopy(s.mobile, `sess-mob-${s.id}`)}
                                title="Copy Mobile"
                                className="p-0.5 text-slate-400 hover:text-slate-700 transition-colors cursor-pointer"
                              >
                                {copiedId === `sess-mob-${s.id}` ? (
                                  <Check className="w-3 h-3 text-emerald-600" />
                                ) : (
                                  <Copy className="w-3 h-3" />
                                )}
                              </button>
                            </div>
                          </td>
                          <td className="py-2.5 px-3">
                            <span className={`px-1.5 py-0.2 rounded text-[10px] font-bold uppercase ${s.role === "admin" ? "bg-amber-100 text-amber-800" : "bg-blue-100 text-blue-700"
                              }`}>
                              {s.role}
                            </span>
                          </td>
                          <td className="py-2.5 px-3 font-mono text-slate-600 text-[10px]">
                            <div className="flex items-center gap-1">
                              <span className="truncate max-w-[210px]">{s.session_id}</span>
                              <button
                                type="button"
                                onClick={() => handleCopy(s.session_id, `sess-token-${s.id}`)}
                                title="Copy Session Token"
                                className="p-0.5 text-slate-400 hover:text-slate-700 transition-colors cursor-pointer"
                              >
                                {copiedId === `sess-token-${s.id}` ? (
                                  <Check className="w-3 h-3 text-emerald-600" />
                                ) : (
                                  <Copy className="w-3 h-3" />
                                )}
                              </button>
                            </div>
                          </td>
                          <td className="py-2.5 px-3 font-mono text-slate-500 text-[10px]">{s.ip_address}</td>
                          <td className="py-2.5 px-3">
                            {s.is_revoked ? (
                              <span className="px-1.5 py-0.5 rounded text-[10px] font-bold bg-red-100 text-red-700">
                                Revoked
                              </span>
                            ) : s.is_expired ? (
                              <span className="px-1.5 py-0.5 rounded text-[10px] font-bold bg-slate-100 text-slate-600">
                                Expired
                              </span>
                            ) : (
                              <span className="px-1.5 py-0.5 rounded text-[10px] font-bold bg-emerald-100 text-emerald-700">
                                Active Token
                              </span>
                            )}
                          </td>
                          <td className="py-2.5 px-3 text-slate-500 font-mono text-[10px]">
                            {new Date(s.expires_at).toLocaleString("en-IN", { timeZone: "Asia/Kolkata" })}
                          </td>
                          <td className="py-2.5 px-3 text-slate-600 font-mono text-[10px]">
                            {new Date(s.created_at).toLocaleString("en-IN", { timeZone: "Asia/Kolkata" })}
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              )}

            </div>


            {/* =========================================================================
                FIXED PAGINATION BAR (Pinned at bottom of Table Box)
                ========================================================================= */}
            <div className="shrink-0 bg-white border-t border-slate-200/90 px-3 sm:px-5 py-2 sm:py-2.5 flex flex-col sm:flex-row items-center justify-between gap-2 text-slate-600">

              {/* Left: Showing Range & Rows per page selector */}
              <div className="flex items-center gap-3 text-[10px] sm:text-[12px] w-full sm:w-auto justify-between sm:justify-start">
                <span>
                  Showing{" "}
                  <strong className="text-slate-900 font-bold">
                    {pagination.total === 0 ? 0 : (pagination.page - 1) * pagination.limit + 1}
                  </strong>{" "}
                  to{" "}
                  <strong className="text-slate-900 font-bold">
                    {Math.min(pagination.page * pagination.limit, pagination.total)}
                  </strong>{" "}
                  of <strong className="text-slate-900 font-bold">{pagination.total}</strong>
                </span>

                <div className="flex items-center gap-1 border-l border-slate-200 pl-2 sm:pl-3 text-[10px]">
                  <span className="text-slate-400">Rows:</span>
                  <select
                    value={limit}
                    onChange={(e) => {
                      setLimit(Number(e.target.value));
                      setPage(1);
                    }}
                    className="border border-slate-200 rounded px-1.5 py-0.5 bg-white font-semibold text-slate-700 text-[10px] focus:outline-none cursor-pointer"
                  >
                    <option value={10}>10</option>
                    <option value={15}>15</option>
                    <option value={25}>25</option>
                    <option value={50}>50</option>
                  </select>
                </div>
              </div>

              {/* Right: Prev, Page Indicators, Next */}
              <div className="flex items-center gap-1 text-[10px] self-end sm:self-auto">
                <button
                  type="button"
                  onClick={() => setPage((p) => Math.max(1, p - 1))}
                  disabled={pagination.page <= 1 || loadingData}
                  className="flex items-center gap-0.5 px-2 py-1 rounded border border-slate-200 hover:bg-slate-50 text-slate-700 font-semibold disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer transition-all"
                >
                  <ChevronLeft className="w-3 h-3" />
                  <span>Prev</span>
                </button>

                {/* Page Number Chips */}
                {Array.from({ length: Math.min(5, pagination.totalPages) }, (_, i) => {
                  let pNum = i + 1;
                  if (pagination.totalPages > 5 && pagination.page > 3) {
                    pNum = pagination.page - 2 + i;
                    if (pNum > pagination.totalPages) pNum = pagination.totalPages - (4 - i);
                  }
                  return (
                    <button
                      key={pNum}
                      type="button"
                      onClick={() => setPage(pNum)}
                      disabled={loadingData}
                      className={`w-5 h-5 rounded text-[10px] font-bold transition-all cursor-pointer ${pagination.page === pNum
                        ? "bg-blue-600 text-white shadow-2xs"
                        : "border border-slate-200 hover:bg-slate-50 text-slate-700"
                        }`}
                    >
                      {pNum}
                    </button>
                  );
                })}

                <button
                  type="button"
                  onClick={() => setPage((p) => Math.min(pagination.totalPages, p + 1))}
                  disabled={pagination.page >= pagination.totalPages || loadingData}
                  className="flex items-center gap-0.5 px-2 py-1 rounded border border-slate-200 hover:bg-slate-50 text-slate-700 font-semibold disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer transition-all"
                >
                  <span>Next</span>
                  <ChevronRight className="w-3 h-3" />
                </button>
              </div>

            </div>

          </div>

        </div>

        {/* =========================================================================
            EVENT CREATE / EDIT MODAL (Strict 10px / 12px Admin Design)
            ========================================================================= */}
        {showEventModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/60 backdrop-blur-xs overflow-y-auto">
            <div className="relative w-full max-w-xl bg-white rounded-xl shadow-2xl border border-slate-200 overflow-hidden my-auto animate-in fade-in zoom-in-95 duration-150">
              {/* Modal Header */}
              <div className="px-4 py-3 bg-white border-b border-slate-200 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-md bg-blue-50 border border-blue-200 flex items-center justify-center text-blue-600">
                    <Calendar className="w-3.5 h-3.5" />
                  </div>
                  <div>
                    <h3 className="font-bold text-[12px] text-slate-900">
                      {editingEventId ? (language === "kn" ? "ಕಾರ್ಯಕ್ರಮ ಸಂಪಾದನೆ" : "Edit Event Details") : (language === "kn" ? "ಹೊಸ ಸಾರ್ವಜನಿಕ ಕಾರ್ಯಕ್ರಮ ಪ್ರಕಟಿಸಿ" : "Publish New Event")}
                    </h3>
                    <p className="text-[10px] text-slate-500">
                      {language === "kn" ? "ನಾಗರಿಕರ ಪೋರ್ಟಲ್ ಮತ್ತು ಈವೆಂಟ್‌ಗಳ ಪುಟದಲ್ಲಿ ನೇರ ಪ್ರಕಟಣೆ" : "Live synchronization across Citizen Portal & Public Events Page"}
                    </p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setShowEventModal(false)}
                  className="w-6 h-6 rounded-md hover:bg-slate-100 text-slate-400 hover:text-slate-700 flex items-center justify-center transition-colors cursor-pointer"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Modal Body Form */}
              <form onSubmit={handleSaveEvent} className="p-4 space-y-3 max-h-[80vh] overflow-y-auto">
                {eventFormError && (
                  <div className="p-2.5 rounded-lg bg-rose-50 border border-rose-200 text-rose-700 text-[10px] flex items-center gap-2">
                    <AlertCircle className="w-3.5 h-3.5 shrink-0 text-rose-500" />
                    <span>{eventFormError}</span>
                  </div>
                )}

                {/* Title (Kannada & English) */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[10px] font-bold text-slate-700 uppercase tracking-wider mb-1">
                      Event Title (Kannada) *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="ಉದಾ: ರೈತರ ಮತ್ತು ತೊಗರಿ ಬೆಳೆಗಾರರ ಸಭೆ"
                      value={eventForm.title_kn}
                      onChange={(e) => setEventForm({ ...eventForm, title_kn: e.target.value })}
                      className="w-full px-2.5 py-1.5 rounded-lg border border-slate-200 bg-slate-50/50 text-[12px] text-slate-900 font-anek focus:bg-white focus:border-blue-500 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold text-slate-700 uppercase tracking-wider mb-1">
                      Event Title (English) *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Aland Farmers & Tur Dal Advisory"
                      value={eventForm.title_en}
                      onChange={(e) => setEventForm({ ...eventForm, title_en: e.target.value })}
                      className="w-full px-2.5 py-1.5 rounded-lg border border-slate-200 bg-slate-50/50 text-[12px] text-slate-900 focus:bg-white focus:border-blue-500 focus:outline-none"
                    />
                  </div>
                </div>

                {/* Date & Times */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div>
                    <label className="block text-[10px] font-bold text-slate-700 uppercase tracking-wider mb-1">
                      Event Date *
                    </label>
                    <input
                      type="date"
                      required
                      value={eventForm.event_date}
                      onChange={(e) => setEventForm({ ...eventForm, event_date: e.target.value })}
                      className="w-full px-2.5 py-1.5 rounded-lg border border-slate-200 bg-slate-50/50 text-[12px] text-slate-900 focus:bg-white focus:border-blue-500 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold text-slate-700 uppercase tracking-wider mb-1">
                      Start Time *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="10:00 AM"
                      value={eventForm.start_time}
                      onChange={(e) => setEventForm({ ...eventForm, start_time: e.target.value })}
                      className="w-full px-2.5 py-1.5 rounded-lg border border-slate-200 bg-slate-50/50 text-[12px] text-slate-900 focus:bg-white focus:border-blue-500 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold text-slate-700 uppercase tracking-wider mb-1">
                      End Time
                    </label>
                    <input
                      type="text"
                      placeholder="01:30 PM"
                      value={eventForm.end_time}
                      onChange={(e) => setEventForm({ ...eventForm, end_time: e.target.value })}
                      className="w-full px-2.5 py-1.5 rounded-lg border border-slate-200 bg-slate-50/50 text-[12px] text-slate-900 focus:bg-white focus:border-blue-500 focus:outline-none"
                    />
                  </div>
                </div>

                {/* Location (Kannada & English) */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[10px] font-bold text-slate-700 uppercase tracking-wider mb-1">
                      Location / ಸ್ಥಳ (Kannada) *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="ಉದಾ: ಎಪಿಎಂಸಿ ಆವರಣ, ಆಳಂದ"
                      value={eventForm.location_kn}
                      onChange={(e) => setEventForm({ ...eventForm, location_kn: e.target.value })}
                      className="w-full px-2.5 py-1.5 rounded-lg border border-slate-200 bg-slate-50/50 text-[12px] text-slate-900 font-anek focus:bg-white focus:border-blue-500 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold text-slate-700 uppercase tracking-wider mb-1">
                      Location (English) *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. APMC Yard, Aland"
                      value={eventForm.location_en}
                      onChange={(e) => setEventForm({ ...eventForm, location_en: e.target.value })}
                      className="w-full px-2.5 py-1.5 rounded-lg border border-slate-200 bg-slate-50/50 text-[12px] text-slate-900 focus:bg-white focus:border-blue-500 focus:outline-none"
                    />
                  </div>
                </div>

                {/* Category & Status */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[10px] font-bold text-slate-700 uppercase tracking-wider mb-1">
                      Category *
                    </label>
                    <select
                      value={eventForm.category}
                      onChange={(e) => setEventForm({ ...eventForm, category: e.target.value })}
                      className="w-full px-2.5 py-1.5 rounded-lg border border-slate-200 bg-slate-50/50 text-[12px] text-slate-900 focus:bg-white focus:border-blue-500 focus:outline-none"
                    >
                      <option value="farmers">Farmers & Agriculture (ರೈತರು & ಕೃಷಿ)</option>
                      <option value="grievance">Grievance & Public Hearing (ಜನಸ್ಪಂದನ)</option>
                      <option value="youth">Youth & Employment (ಯುವಜನ & ಉದ್ಯೋಗ)</option>
                      <option value="public_meeting">Public Meeting & Rally (ಸಾರ್ವಜನಿಕ ಸಭೆ)</option>
                      <option value="development">Development Works (ಅಭಿವೃದ್ಧಿ ಕಾಮಗಾರಿ)</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold text-slate-700 uppercase tracking-wider mb-1">
                      Publication Status *
                    </label>
                    <select
                      value={eventForm.status}
                      onChange={(e) => setEventForm({ ...eventForm, status: e.target.value as any })}
                      className="w-full px-2.5 py-1.5 rounded-lg border border-slate-200 bg-slate-50/50 text-[12px] text-slate-900 focus:bg-white focus:border-blue-500 focus:outline-none"
                    >
                      <option value="upcoming">Upcoming (ಮುಂಬರುವ ಕಾರ್ಯಕ್ರಮ)</option>
                      <option value="completed">Completed (ಮುಕ್ತಾಯಗೊಂಡಿದೆ)</option>
                      <option value="cancelled">Cancelled (ರದ್ದುಗೊಂಡಿದೆ)</option>
                    </select>
                  </div>
                </div>

                {/* Contact Person & Phone */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[10px] font-bold text-slate-700 uppercase tracking-wider mb-1">
                      Contact Person (ಸಂಪರ್ಕ ವ್ಯಕ್ತಿ)
                    </label>
                    <input
                      type="text"
                      placeholder="Shri Harshanand Office / Coordinator"
                      value={eventForm.contact_person}
                      onChange={(e) => setEventForm({ ...eventForm, contact_person: e.target.value })}
                      className="w-full px-2.5 py-1.5 rounded-lg border border-slate-200 bg-slate-50/50 text-[12px] text-slate-900 focus:bg-white focus:border-blue-500 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold text-slate-700 uppercase tracking-wider mb-1">
                      Contact Phone (ದೂರವಾಣಿ ಸಂಖ್ಯೆ)
                    </label>
                    <input
                      type="text"
                      placeholder="+91 98450 12345"
                      value={eventForm.contact_phone}
                      onChange={(e) => setEventForm({ ...eventForm, contact_phone: e.target.value })}
                      className="w-full px-2.5 py-1.5 rounded-lg border border-slate-200 bg-slate-50/50 text-[12px] text-slate-900 font-mono focus:bg-white focus:border-blue-500 focus:outline-none"
                    />
                  </div>
                </div>

                {/* Description (Kannada & English) */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[10px] font-bold text-slate-700 uppercase tracking-wider mb-1">
                      Description (Kannada)
                    </label>
                    <textarea
                      rows={2}
                      placeholder="ಕಾರ್ಯಕ್ರಮದ ವಿವರಗಳು..."
                      value={eventForm.description_kn}
                      onChange={(e) => setEventForm({ ...eventForm, description_kn: e.target.value })}
                      className="w-full px-2.5 py-1.5 rounded-lg border border-slate-200 bg-slate-50/50 text-[12px] text-slate-900 font-anek focus:bg-white focus:border-blue-500 focus:outline-none resize-none"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold text-slate-700 uppercase tracking-wider mb-1">
                      Description (English)
                    </label>
                    <textarea
                      rows={2}
                      placeholder="Event agenda and briefing..."
                      value={eventForm.description_en}
                      onChange={(e) => setEventForm({ ...eventForm, description_en: e.target.value })}
                      className="w-full px-2.5 py-1.5 rounded-lg border border-slate-200 bg-slate-50/50 text-[12px] text-slate-900 focus:bg-white focus:border-blue-500 focus:outline-none resize-none"
                    />
                  </div>
                </div>

                {/* Footer Buttons */}
                <div className="pt-2 border-t border-slate-100 flex items-center justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => setShowEventModal(false)}
                    className="px-3 py-1.5 rounded-lg border border-slate-200 hover:bg-slate-50 text-slate-700 text-[12px] font-medium transition-colors cursor-pointer"
                  >
                    {language === "kn" ? "ರದ್ದುಮಾಡಿ" : "Cancel"}
                  </button>
                  <button
                    type="submit"
                    disabled={eventSubmitting}
                    className="px-4 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-bold text-[12px] shadow-sm transition-all disabled:opacity-50 cursor-pointer flex items-center gap-1.5"
                  >
                    {eventSubmitting ? (
                      <>
                        <RefreshCw className="w-3 h-3 animate-spin" />
                        <span>{language === "kn" ? "ಉಳಿಸಲಾಗುತ್ತಿದೆ..." : "Saving..."}</span>
                      </>
                    ) : (
                      <span>{editingEventId ? (language === "kn" ? "ಬದಲಾವಣೆ ಉಳಿಸಿ" : "Save Changes") : (language === "kn" ? "ಪ್ರಕಟಿಸಿ" : "Publish Event")}</span>
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Global Toast Notification */}
        {eventToast && (
          <div className="fixed bottom-6 right-6 z-50 bg-emerald-600 text-white px-3.5 py-2 rounded-xl shadow-lg flex items-center gap-2 text-[12px] font-bold animate-in fade-in slide-in-from-bottom-2 duration-200">
            <CheckCircle2 className="w-4 h-4 text-white" />
            <span>{eventToast}</span>
          </div>
        )}

        {/* =========================================================================
            ARTICLE CREATE / EDIT MODAL (Strict 10px / 12px Admin Design, Normal White Header)
            ========================================================================= */}
        {showArticleModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/60 backdrop-blur-xs overflow-y-auto">
            <div className="relative w-full max-w-2xl bg-white rounded-xl shadow-2xl border border-slate-200 overflow-hidden my-auto animate-in fade-in zoom-in-95 duration-150">
              {/* Modal Header: Normal clean white */}
              <div className="px-4 py-3 bg-white border-b border-slate-200 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-md bg-blue-50 border border-blue-200 flex items-center justify-center text-blue-600">
                    <Newspaper className="w-3.5 h-3.5" />
                  </div>
                  <div>
                    <h3 className="font-bold text-[12px] text-slate-900">
                      {editingArticleId ? (language === "kn" ? "ಲೇಖನ ಸಂಪಾದನೆ" : "Edit Article Details") : (language === "kn" ? "ಹೊಸ ಲೇಖನ ಪ್ರಕಟಿಸಿ" : "Publish New Article")}
                    </h3>
                    <p className="text-[10px] text-slate-500">
                      {language === "kn" ? "ಸಾರ್ವಜನಿಕ ವೆಬ್‌ಸೈಟ್ ಮತ್ತು ನಾಗರಿಕ ಪೋರ್ಟಲ್‌ನಲ್ಲಿ ನೇರ ಲೇಖನ ಪ್ರಕಟಣೆ" : "Live synchronization across public articles stream and citizen portal"}
                    </p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setShowArticleModal(false)}
                  className="w-6 h-6 rounded-md hover:bg-slate-100 text-slate-400 hover:text-slate-700 flex items-center justify-center transition-colors cursor-pointer"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Modal Body Form */}
              <form onSubmit={handleSaveArticle} className="p-4 space-y-3 max-h-[80vh] overflow-y-auto">
                {articleFormError && (
                  <div className="p-2.5 rounded-lg bg-rose-50 border border-rose-200 text-rose-700 text-[10px] flex items-center gap-2">
                    <AlertCircle className="w-3.5 h-3.5 shrink-0 text-rose-500" />
                    <span>{articleFormError}</span>
                  </div>
                )}

                {/* Title (Kannada & English) */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[10px] font-bold text-slate-700 uppercase tracking-wider mb-1">
                      Article Title (Kannada) *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="ಉದಾ: ಕಲಬುರಗಿ ತೊಗರಿ ಬೇಳೆಗೆ ಜಿಐ ಮಾನ್ಯತೆ"
                      value={articleForm.title_kn}
                      onChange={(e) => setArticleForm({ ...articleForm, title_kn: e.target.value })}
                      className="w-full px-2.5 py-1.5 rounded-lg border border-slate-200 bg-slate-50/50 text-[12px] text-slate-900 font-anek focus:bg-white focus:border-blue-500 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold text-slate-700 uppercase tracking-wider mb-1">
                      Article Title (English) *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. GI Recognition for Kalaburagi Red Gram"
                      value={articleForm.title_en}
                      onChange={(e) => setArticleForm({ ...articleForm, title_en: e.target.value })}
                      className="w-full px-2.5 py-1.5 rounded-lg border border-slate-200 bg-slate-50/50 text-[12px] text-slate-900 focus:bg-white focus:border-blue-500 focus:outline-none"
                    />
                  </div>
                </div>

                {/* Category, Status, Read Time, Author */}
                <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
                  <div>
                    <label className="block text-[10px] font-bold text-slate-700 uppercase tracking-wider mb-1">
                      Category *
                    </label>
                    <select
                      value={articleForm.category}
                      onChange={(e) => setArticleForm({ ...articleForm, category: e.target.value })}
                      className="w-full px-2.5 py-1.5 rounded-lg border border-slate-200 bg-slate-50/50 text-[12px] text-slate-900 focus:bg-white focus:border-blue-500 focus:outline-none"
                    >
                      <option value="farmers">Farmers & Agri (ಕೃಷಿ & ರೈತರು)</option>
                      <option value="development">Development (ಅಭಿವೃದ್ಧಿ)</option>
                      <option value="youth">Youth (ಯುವಜನ)</option>
                      <option value="governance">Governance (ಆಡಳಿತ)</option>
                      <option value="general">General (ಸಾಮಾನ್ಯ)</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-[10px] font-bold text-slate-700 uppercase tracking-wider mb-1">
                      Publication Status *
                    </label>
                    <select
                      value={articleForm.status}
                      onChange={(e) => setArticleForm({ ...articleForm, status: e.target.value as any })}
                      className="w-full px-2.5 py-1.5 rounded-lg border border-slate-200 bg-slate-50/50 text-[12px] text-slate-900 focus:bg-white focus:border-blue-500 focus:outline-none"
                    >
                      <option value="published">Published (ಪ್ರಕಟಿತ)</option>
                      <option value="draft">Draft (ಕರಡು)</option>
                      <option value="archived">Archived (ಸಂಗ್ರಹ)</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-[10px] font-bold text-slate-700 uppercase tracking-wider mb-1">
                      Read Time
                    </label>
                    <input
                      type="text"
                      placeholder="4 min read"
                      value={articleForm.read_time}
                      onChange={(e) => setArticleForm({ ...articleForm, read_time: e.target.value })}
                      className="w-full px-2.5 py-1.5 rounded-lg border border-slate-200 bg-slate-50/50 text-[12px] text-slate-900 focus:bg-white focus:border-blue-500 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] font-bold text-slate-700 uppercase tracking-wider mb-1">
                      Author Name
                    </label>
                    <input
                      type="text"
                      placeholder="Shri Harshanand Guttedar"
                      value={articleForm.author}
                      onChange={(e) => setArticleForm({ ...articleForm, author: e.target.value })}
                      className="w-full px-2.5 py-1.5 rounded-lg border border-slate-200 bg-slate-50/50 text-[12px] text-slate-900 focus:bg-white focus:border-blue-500 focus:outline-none"
                    />
                  </div>
                </div>

                {/* Summary / Excerpt (Kannada & English) */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[10px] font-bold text-slate-700 uppercase tracking-wider mb-1">
                      Summary Excerpt (Kannada)
                    </label>
                    <textarea
                      rows={2}
                      placeholder="ಲೇಖನದ ಕಿರು ಸಾರಾಂಶ..."
                      value={articleForm.summary_kn}
                      onChange={(e) => setArticleForm({ ...articleForm, summary_kn: e.target.value })}
                      className="w-full px-2.5 py-1.5 rounded-lg border border-slate-200 bg-slate-50/50 text-[12px] text-slate-900 font-anek focus:bg-white focus:border-blue-500 focus:outline-none resize-none"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold text-slate-700 uppercase tracking-wider mb-1">
                      Summary Excerpt (English)
                    </label>
                    <textarea
                      rows={2}
                      placeholder="Brief article summary for preview cards..."
                      value={articleForm.summary_en}
                      onChange={(e) => setArticleForm({ ...articleForm, summary_en: e.target.value })}
                      className="w-full px-2.5 py-1.5 rounded-lg border border-slate-200 bg-slate-50/50 text-[12px] text-slate-900 focus:bg-white focus:border-blue-500 focus:outline-none resize-none"
                    />
                  </div>
                </div>

                {/* Full Content (Kannada & English) */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[10px] font-bold text-slate-700 uppercase tracking-wider mb-1">
                      Full Article Body (Kannada) *
                    </label>
                    <textarea
                      rows={6}
                      required
                      placeholder="ಸಂಪೂರ್ಣ ಲೇಖನದ ವಿವರಗಳನ್ನು ಇಲ್ಲಿ ಬರೆಯಿರಿ..."
                      value={articleForm.content_kn}
                      onChange={(e) => setArticleForm({ ...articleForm, content_kn: e.target.value })}
                      className="w-full px-2.5 py-1.5 rounded-lg border border-slate-200 bg-slate-50/50 text-[12px] text-slate-900 font-anek focus:bg-white focus:border-blue-500 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold text-slate-700 uppercase tracking-wider mb-1">
                      Full Article Body (English) *
                    </label>
                    <textarea
                      rows={6}
                      required
                      placeholder="Write full article body paragraphs here..."
                      value={articleForm.content_en}
                      onChange={(e) => setArticleForm({ ...articleForm, content_en: e.target.value })}
                      className="w-full px-2.5 py-1.5 rounded-lg border border-slate-200 bg-slate-50/50 text-[12px] text-slate-900 focus:bg-white focus:border-blue-500 focus:outline-none"
                    />
                  </div>
                </div>

                {/* Footer Buttons */}
                <div className="pt-2 border-t border-slate-100 flex items-center justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => setShowArticleModal(false)}
                    className="px-3 py-1.5 rounded-lg border border-slate-200 hover:bg-slate-50 text-slate-700 text-[12px] font-medium transition-colors cursor-pointer"
                  >
                    {language === "kn" ? "ರದ್ದುಮಾಡಿ" : "Cancel"}
                  </button>
                  <button
                    type="submit"
                    disabled={articleSubmitting}
                    className="px-4 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-bold text-[12px] shadow-sm transition-all disabled:opacity-50 cursor-pointer flex items-center gap-1.5"
                  >
                    {articleSubmitting ? (
                      <>
                        <RefreshCw className="w-3 h-3 animate-spin" />
                        <span>{language === "kn" ? "ಉಳಿಸಲಾಗುತ್ತಿದೆ..." : "Saving..."}</span>
                      </>
                    ) : (
                      <span>{editingArticleId ? (language === "kn" ? "ಬದಲಾವಣೆ ಉಳಿಸಿ" : "Save Changes") : (language === "kn" ? "ಪ್ರಕಟಿಸಿ" : "Publish Article")}</span>
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Global Article Toast Notification */}
        {articleToast && (
          <div className="fixed bottom-6 right-6 z-50 bg-emerald-600 text-white px-3.5 py-2 rounded-xl shadow-lg flex items-center gap-2 text-[12px] font-bold animate-in fade-in slide-in-from-bottom-2 duration-200">
            <CheckCircle2 className="w-4 h-4 text-white" />
            <span>{articleToast}</span>
          </div>
        )}

        {/* =========================================================================
            MODAL 3: REVIEW CITIZEN CONCERN & UPDATE STATUS
            ========================================================================= */}
        {showConcernModal && selectedConcern && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/60 backdrop-blur-xs">
            <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 w-full max-w-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-150">
              {/* Clean White Modal Header */}
              <div className="px-4 py-3 border-b border-slate-200 bg-white flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-lg bg-blue-50 border border-blue-200 flex items-center justify-center text-blue-700">
                    <AlertCircle className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="text-[12px] font-bold text-slate-900">
                      {language === "kn" ? "ಕುಂದುಕೊರತೆ ಅರ್ಜಿ ಪರಿಶೀಲನೆ & ಸ್ಥಿತಿ ನವೀಕರಣ" : "Review Concern & Update Redressal Status"}
                    </h3>
                    <p className="text-[10px] text-slate-500">
                      Tracking ID: <span className="font-mono font-bold text-blue-600">{selectedConcern.tracking_id}</span>
                    </p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setShowConcernModal(false)}
                  className="w-6 h-6 rounded-md hover:bg-slate-100 text-slate-400 hover:text-slate-700 flex items-center justify-center transition-colors cursor-pointer"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Modal Body */}
              <form onSubmit={handleSaveConcernStatus} className="p-4 space-y-3 max-h-[80vh] overflow-y-auto">
                {/* Citizen Details Card */}
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
                  <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-200/80 pb-2">
                    <div>
                      <span className="text-[10px] text-slate-400 block uppercase font-bold tracking-wider">Citizen</span>
                      <span className="text-[12px] font-bold text-slate-900">{selectedConcern.citizen_name}</span>
                      <span className="text-[10px] font-mono text-slate-500 ml-1.5">+91 {selectedConcern.mobile}</span>
                    </div>
                    <div className="text-right">
                      <span className="text-[10px] text-slate-400 block uppercase font-bold tracking-wider">Location</span>
                      <span className="text-[12px] font-semibold text-slate-800">
                        {selectedConcern.village || selectedConcern.village_name || "Aland"}, {selectedConcern.taluk || "Aland"}
                      </span>
                    </div>
                  </div>

                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-blue-100 text-blue-800">
                        {selectedConcern.category}
                      </span>
                      <span className="text-[10px] text-slate-400 font-mono">
                        Submitted: {new Date(selectedConcern.created_at).toLocaleDateString("en-IN")}
                      </span>
                    </div>
                    <h4 className="text-[12px] font-bold text-slate-900">{selectedConcern.title}</h4>
                    <p className="text-[10px] text-slate-600 leading-relaxed whitespace-pre-wrap bg-white p-2.5 rounded-lg border border-slate-200/70">
                      {selectedConcern.description}
                    </p>
                  </div>
                </div>

                {/* Form Controls */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                  <div>
                    <label className="block text-[10px] font-bold text-slate-700 uppercase tracking-wider mb-1">
                      Update Redressal Status *
                    </label>
                    <select
                      value={concernUpdateForm.status}
                      onChange={(e) => setConcernUpdateForm({ ...concernUpdateForm, status: e.target.value as any })}
                      className="w-full px-2.5 py-1.5 rounded-lg border border-slate-200 bg-slate-50/50 text-[12px] text-slate-900 font-bold focus:bg-white focus:border-blue-500 focus:outline-none cursor-pointer"
                    >
                      <option value="submitted">Submitted (ಹೊಸ ಅರ್ಜಿ - ಸ್ವೀಕರಿಸಲಾಗಿದೆ)</option>
                      <option value="under_review">Under Review (ಪರಿಶೀಲನೆಯಲ್ಲಿದೆ)</option>
                      <option value="in_progress">In Progress (ಕಾಮಗಾರಿ / ಕ್ರಮ ಪ್ರಗತಿಯಲ್ಲಿದೆ)</option>
                      <option value="resolved">Resolved (ಪರಿಹರಿಸಲಾಗಿದೆ)</option>
                      <option value="rejected">Rejected (ತಿರಸ್ಕರಿಸಲಾಗಿದೆ)</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-[10px] font-bold text-slate-700 uppercase tracking-wider mb-1">
                      Priority / Urgency *
                    </label>
                    <select
                      value={concernUpdateForm.urgency}
                      onChange={(e) => setConcernUpdateForm({ ...concernUpdateForm, urgency: e.target.value as any })}
                      className="w-full px-2.5 py-1.5 rounded-lg border border-slate-200 bg-slate-50/50 text-[12px] text-slate-900 focus:bg-white focus:border-blue-500 focus:outline-none cursor-pointer"
                    >
                      <option value="low">Low (ಸಾಮಾನ್ಯ)</option>
                      <option value="medium">Medium (ಮಧ್ಯಮ)</option>
                      <option value="high">High (ಹೆಚ್ಚಿನ ಆದ್ಯತೆ)</option>
                      <option value="critical">Critical / Urgent (ತುರ್ತು ಗಮನಾರ್ಹ)</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Assigned Officer / Department
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. PWD Sub-Division Aland / Panchayat Development Officer"
                    value={concernUpdateForm.assigned_to}
                    onChange={(e) => setConcernUpdateForm({ ...concernUpdateForm, assigned_to: e.target.value })}
                    className="w-full px-2.5 py-1.5 rounded-lg border border-slate-200 bg-slate-50/50 text-[12px] text-slate-900 focus:bg-white focus:border-blue-500 focus:outline-none"
                  />
                </div>

                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label className="block text-[10px] font-bold text-slate-700 uppercase tracking-wider">
                      Official Action Remarks / ಕ್ರಮ ಕೈಗೊಂಡ ವಿವರಗಳು
                    </label>
                    <span className="text-[10px] text-blue-600 font-medium">Visible to Citizen in Portal</span>
                  </div>
                  <textarea
                    rows={3}
                    placeholder="Enter official action taken or status notes for the citizen (e.g. Spot inspection completed on Oct 30; pipeline repair tender sanctioned)..."
                    value={concernUpdateForm.admin_remarks}
                    onChange={(e) => setConcernUpdateForm({ ...concernUpdateForm, admin_remarks: e.target.value })}
                    className="w-full px-2.5 py-1.5 rounded-lg border border-slate-200 bg-slate-50/50 text-[12px] text-slate-900 focus:bg-white focus:border-blue-500 focus:outline-none resize-none"
                  />
                </div>

                {/* Footer Buttons */}
                <div className="pt-2 border-t border-slate-100 flex items-center justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => setShowConcernModal(false)}
                    className="px-3 py-1.5 rounded-lg border border-slate-200 hover:bg-slate-50 text-slate-700 text-[12px] font-medium transition-colors cursor-pointer"
                  >
                    {language === "kn" ? "ರದ್ದುಮಾಡಿ" : "Cancel"}
                  </button>
                  <button
                    type="submit"
                    disabled={savingConcern}
                    className="px-4 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-bold text-[12px] shadow-sm transition-all disabled:opacity-50 cursor-pointer flex items-center gap-1.5"
                  >
                    {savingConcern ? (
                      <>
                        <RefreshCw className="w-3 h-3 animate-spin" />
                        <span>{language === "kn" ? "ಉಳಿಸಲಾಗುತ್ತಿದೆ..." : "Saving..."}</span>
                      </>
                    ) : (
                      <span>{language === "kn" ? "ಸ್ಥಿತಿ ನವೀಕರಿಸಿ" : "Update Status"}</span>
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Global Concern Toast Notification */}
        {concernToast && (
          <div className="fixed bottom-6 right-6 z-50 bg-emerald-600 text-white px-3.5 py-2 rounded-xl shadow-lg flex items-center gap-2 text-[12px] font-bold animate-in fade-in slide-in-from-bottom-2 duration-200">
            <CheckCircle2 className="w-4 h-4 text-white" />
            <span>{concernToast}</span>
          </div>
        )}

        {/* =========================================================================
            MODAL 4: REVIEW FARMER ENQUIRY & CONTACT REQUEST
            ========================================================================= */}
        {showContactModal && selectedContact && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/60 backdrop-blur-xs">
            <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 w-full max-w-xl overflow-hidden animate-in fade-in zoom-in-95 duration-150">
              {/* Clean White Modal Header */}
              <div className="px-4 py-3 border-b border-slate-200 bg-white flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className={`w-7 h-7 rounded-lg border flex items-center justify-center ${
                    selectedContact.source === "farmers_page"
                      ? "bg-emerald-50 border-emerald-200 text-emerald-700"
                      : "bg-blue-50 border-blue-200 text-blue-700"
                  }`}>
                    {selectedContact.source === "farmers_page" ? (
                      <Sprout className="w-4 h-4" />
                    ) : (
                      <MessageSquare className="w-4 h-4" />
                    )}
                  </div>
                  <div>
                    <h3 className="text-[12px] font-bold text-slate-900">
                      {selectedContact.source === "farmers_page"
                        ? language === "kn"
                          ? "ರೈತರ ವಿನಂತಿ ಪರಿಶೀಲನೆ & ಸ್ಥಿತಿ ನವೀಕರಣ"
                          : "Review Farmer Advisory & Update Status"
                        : language === "kn"
                          ? "ಸಾರ್ವಜನಿಕ ವಿಚಾರಣೆ ಪರಿಶೀಲನೆ & ಪ್ರತ್ಯುತ್ತರ"
                          : "Review Public Enquiry & Response"}
                    </h3>
                    <p className="text-[10px] text-slate-500">
                      ID: <span className="font-mono font-bold text-slate-800">
                        {selectedContact.source === "farmers_page" ? `#FARM-${selectedContact.id}` : `#ENQ-${selectedContact.id}`}
                      </span> • Channel: <span className="font-semibold text-slate-700 capitalize">
                        {selectedContact.source === "farmers_page" ? "Farmer Advisory" : selectedContact.source === "newsletter" ? "Newsletter" : "Contact Desk"}
                      </span>
                    </p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setShowContactModal(false)}
                  className="w-6 h-6 rounded-md hover:bg-slate-100 text-slate-400 hover:text-slate-700 flex items-center justify-center transition-colors cursor-pointer"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Modal Body */}
              <form onSubmit={handleSaveContactStatus} className="p-4 space-y-3 max-h-[80vh] overflow-y-auto">
                {/* Farmer / Citizen Details Card */}
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
                  <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-200/80 pb-2">
                    <div>
                      <span className="text-[10px] text-slate-400 block uppercase font-bold tracking-wider">
                        {selectedContact.source === "farmers_page" ? "Farmer Details" : "Citizen / Contact"}
                      </span>
                      <span className="text-[12px] font-bold text-slate-900">{selectedContact.name}</span>
                      <span className="text-[10px] font-mono text-slate-500 ml-1.5">+91 {selectedContact.phone}</span>
                    </div>
                    <div className="text-right">
                      <span className="text-[10px] text-slate-400 block uppercase font-bold tracking-wider">Location</span>
                      <span className="text-[12px] font-semibold text-slate-800">
                        {selectedContact.location || "Aland"}
                      </span>
                    </div>
                  </div>

                  <div className="space-y-1">
                    <span className="text-[10px] text-slate-400 uppercase font-bold tracking-wider block">
                      {selectedContact.source === "farmers_page" ? "Advisory Request & Crop Query:" : "Submitted Message:"}
                    </span>
                    <p className="text-[10px] text-slate-700 leading-relaxed whitespace-pre-wrap bg-white p-2.5 rounded-lg border border-slate-200/70 font-mono">
                      {selectedContact.message}
                    </p>
                  </div>
                </div>

                {/* Status Dropdown */}
                <div>
                  <label className="block text-[10px] font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Update Action Status *
                  </label>
                  <select
                    value={contactUpdateForm.status}
                    onChange={(e) => setContactUpdateForm({ ...contactUpdateForm, status: e.target.value as any })}
                    className="w-full px-2.5 py-1.5 rounded-lg border border-slate-200 bg-slate-50/50 text-[12px] text-slate-900 font-bold focus:bg-white focus:border-blue-500 focus:outline-none cursor-pointer"
                  >
                    <option value="new">New (ಹೊಸ ವಿನಂತಿ - ಪರಿಶೀಲಿಸಬೇಕಾಗಿದೆ)</option>
                    <option value="in_progress">In Progress / In Review (ಕ್ರಮ ಪ್ರಗತಿಯಲ್ಲಿದೆ)</option>
                    <option value="contacted">Contacted (ಸಂಪರ್ಕಿಸಲಾಗಿದೆ / ಮಾಹಿತಿ ನೀಡಲಾಗಿದೆ)</option>
                    <option value="resolved">Resolved / Completed (ಪರಿಹರಿಸಲಾಗಿದೆ / ಪೂರ್ಣಗೊಂಡಿದೆ)</option>
                  </select>
                </div>

                {/* Admin Notes */}
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label className="block text-[10px] font-bold text-slate-700 uppercase tracking-wider">
                      {selectedContact.source === "farmers_page" ? "Official Agri Cell Notes / ಕೃಷಿ ಕೋಶದ ಟಿಪ್ಪಣಿ" : "Official Notes / ಕಚೇರಿ ಟಿಪ್ಪಣಿ"}
                    </label>
                    <span className={`text-[10px] font-medium ${selectedContact.source === "farmers_page" ? "text-emerald-600" : "text-blue-600"}`}>
                      {selectedContact.source === "farmers_page" ? "Visible to Farmer in Portal" : "Official Record"}
                    </span>
                  </div>
                  <textarea
                    rows={3}
                    placeholder={
                      selectedContact.source === "farmers_page"
                        ? "Enter advisory notes for farmer (e.g. Agronomist field visit scheduled for soil testing on Monday)..."
                        : "Enter office notes or response regarding this enquiry..."
                    }
                    value={contactUpdateForm.admin_notes}
                    onChange={(e) => setContactUpdateForm({ ...contactUpdateForm, admin_notes: e.target.value })}
                    className="w-full px-2.5 py-1.5 rounded-lg border border-slate-200 bg-slate-50/50 text-[12px] text-slate-900 focus:bg-white focus:border-blue-500 focus:outline-none resize-none"
                  />
                </div>

                {/* Footer Buttons */}
                <div className="pt-2 border-t border-slate-100 flex items-center justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => setShowContactModal(false)}
                    className="px-3 py-1.5 rounded-lg border border-slate-200 hover:bg-slate-50 text-slate-700 text-[12px] font-medium transition-colors cursor-pointer"
                  >
                    {language === "kn" ? "ರದ್ದುಮಾಡಿ" : "Cancel"}
                  </button>
                  <button
                    type="submit"
                    disabled={savingContact}
                    className="px-4 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-[12px] shadow-sm transition-all disabled:opacity-50 cursor-pointer flex items-center gap-1.5"
                  >
                    {savingContact ? (
                      <>
                        <RefreshCw className="w-3 h-3 animate-spin" />
                        <span>{language === "kn" ? "ಉಳಿಸಲಾಗುತ್ತಿದೆ..." : "Saving..."}</span>
                      </>
                    ) : (
                      <span>{language === "kn" ? "ಸ್ಥಿತಿ ನವೀಕರಿಸಿ" : "Update Status"}</span>
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Global Contact Toast Notification */}
        {contactToast && (
          <div className="fixed bottom-6 right-6 z-50 bg-emerald-600 text-white px-3.5 py-2 rounded-xl shadow-lg flex items-center gap-2 text-[12px] font-bold animate-in fade-in slide-in-from-bottom-2 duration-200">
            <CheckCircle2 className="w-4 h-4 text-white" />
            <span>{contactToast}</span>
          </div>
        )}

      </div>

    </div>
  );
}
