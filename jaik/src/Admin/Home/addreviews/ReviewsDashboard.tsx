"use client";

import React, { useCallback, useEffect, useMemo, useState } from "react";
import { Check, Plus, RefreshCw, Star, Trash2, X } from "lucide-react";

const API_BASE = process.env.NEXT_PUBLIC_API_URL || "";

type ReviewStatus = "pending" | "approved";
type ReviewSource = "website" | "admin";
type TabKey = "all" | ReviewStatus;

interface Review {
  _id: string;
  author: string;
  text: string;
  stars: number;
  status: ReviewStatus;
  source: ReviewSource;
  createdAt?: string;
}

const tabs: { key: TabKey; label: string }[] = [
  { key: "all", label: "All" },
  { key: "pending", label: "Pending" },
  { key: "approved", label: "Approved" },
];

const getToken = () =>
  typeof window !== "undefined" ? localStorage.getItem("admin-auth") : null;

const ReviewsDashboard = () => {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [activeTab, setActiveTab] = useState<TabKey>("all");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const fetchReviews = useCallback(async () => {
    const token = getToken();
    if (!API_BASE || !token) {
      setError("Admin session or API URL is missing.");
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      const response = await fetch(
        `${API_BASE}/reviews/admin?status=all&t=${Date.now()}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      const result = await response.json().catch(() => null);

      if (!response.ok || !result?.success) {
        throw new Error(result?.message || "Failed to load reviews.");
      }

      setReviews(result.data || []);
      setError("");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load reviews.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchReviews();
  }, [fetchReviews]);

  const counts = useMemo(
    () => ({
      all: reviews.length,
      pending: reviews.filter((review) => review.status === "pending").length,
      approved: reviews.filter((review) => review.status === "approved").length,
    }),
    [reviews]
  );

  const visibleReviews = useMemo(
    () =>
      activeTab === "all"
        ? reviews
        : reviews.filter((review) => review.status === activeTab),
    [activeTab, reviews]
  );

  const handleApprove = async (id: string) => {
    const token = getToken();
    if (!token) return;

    try {
      const response = await fetch(`${API_BASE}/reviews/${id}/approve`, {
        method: "PATCH",
        headers: { Authorization: `Bearer ${token}` },
      });
      const result = await response.json().catch(() => null);
      if (!response.ok || !result?.success) {
        throw new Error(result?.message || "Failed to approve review.");
      }
      fetchReviews();
    } catch (err) {
      alert(err instanceof Error ? err.message : "Failed to approve review.");
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm("Delete this review?")) return;

    const token = getToken();
    if (!token) return;

    try {
      const response = await fetch(`${API_BASE}/reviews/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      const result = await response.json().catch(() => null);
      if (!response.ok || !result?.success) {
        throw new Error(result?.message || "Failed to delete review.");
      }
      fetchReviews();
    } catch (err) {
      alert(err instanceof Error ? err.message : "Failed to delete review.");
    }
  };

  return (
    <div className="min-h-screen bg-black text-gray-200 p-4 sm:p-8 font-sans">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row justify-between items-center mb-8 gap-4">
          <h1 className="text-3xl font-bold text-red-600 tracking-tight uppercase underline decoration-gray-800 underline-offset-8">
            Review Management
          </h1>
          <div className="flex gap-3">
            <button
              onClick={fetchReviews}
              className="p-2 border border-gray-700 rounded hover:bg-gray-800 transition-all text-white"
              aria-label="Refresh reviews"
            >
              <RefreshCw className={loading ? "animate-spin" : ""} size={18} />
            </button>
            <button
              onClick={() => setIsModalOpen(true)}
              className="px-4 py-2 bg-red-600 text-white rounded font-bold hover:bg-red-700 flex items-center gap-2 transition-all shadow-lg"
            >
              <Plus size={18} /> ADD REVIEW
            </button>
          </div>
        </div>

        {error && (
          <div className="p-4 mb-4 bg-red-900/20 border border-red-600 text-red-500 rounded">
            {error}
          </div>
        )}

        <div className="flex flex-wrap gap-3 mb-6">
          {tabs.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`px-5 py-2 rounded border text-sm font-bold uppercase transition-all ${
                activeTab === tab.key
                  ? "bg-red-600 border-red-600 text-white"
                  : "bg-[#111] border-gray-800 text-gray-400 hover:text-white hover:border-red-600"
              }`}
            >
              {tab.label}
              <span className="ml-2 text-xs opacity-70">
                {tab.key === "all" ? counts.all : counts[tab.key]}
              </span>
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
          {visibleReviews.map((review) => (
            <article
              key={review._id}
              className={`rounded-lg border p-5 shadow-2xl ${
                review.status === "pending"
                  ? "bg-yellow-950/20 border-yellow-600/60"
                  : "bg-[#0a0a0a] border-gray-800"
              }`}
            >
              <div className="flex justify-between gap-4 mb-4">
                <div>
                  <h2 className="text-xl font-bold text-white">{review.author}</h2>
                  <div className="flex items-center gap-2 mt-2">
                    <span
                      className={`text-[10px] font-black uppercase px-2 py-1 rounded ${
                        review.status === "pending"
                          ? "bg-yellow-500/20 text-yellow-300"
                          : "bg-green-500/20 text-green-300"
                      }`}
                    >
                      {review.status}
                    </span>
                    <span className="text-[10px] font-black uppercase px-2 py-1 rounded bg-gray-800 text-gray-300">
                      {review.source}
                    </span>
                  </div>
                </div>
                <div className="flex gap-1 pt-1">
                  {Array.from({ length: review.stars }).map((_, index) => (
                    <Star
                      key={index}
                      size={15}
                      className="fill-yellow-400 text-yellow-400"
                    />
                  ))}
                </div>
              </div>

              <p className="text-gray-300 text-sm leading-6 mb-5">{review.text}</p>

              <div className="flex justify-end gap-3">
                {review.status === "pending" && (
                  <button
                    onClick={() => handleApprove(review._id)}
                    className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded font-bold flex items-center gap-2 text-sm transition-all"
                  >
                    <Check size={16} /> Approve
                  </button>
                )}
                <button
                  onClick={() => handleDelete(review._id)}
                  className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded font-bold flex items-center gap-2 text-sm transition-all"
                >
                  <Trash2 size={16} /> Delete
                </button>
              </div>
            </article>
          ))}

          {!visibleReviews.length && (
            <div className="lg:col-span-2 p-16 text-center text-gray-600 italic bg-[#0a0a0a] border border-gray-800 rounded-lg">
              {loading ? "Loading reviews..." : "No reviews found."}
            </div>
          )}
        </div>
      </div>

      {isModalOpen && (
        <AddReviewModal
          onClose={() => setIsModalOpen(false)}
          onSaved={() => {
            setIsModalOpen(false);
            setActiveTab("all");
            fetchReviews();
          }}
        />
      )}
    </div>
  );
};

const AddReviewModal = ({
  onClose,
  onSaved,
}: {
  onClose: () => void;
  onSaved: () => void;
}) => {
  const [author, setAuthor] = useState("");
  const [text, setText] = useState("");
  const [stars, setStars] = useState(5);
  const [saving, setSaving] = useState(false);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    const token = getToken();
    if (!token) return;

    try {
      setSaving(true);
      const response = await fetch(`${API_BASE}/reviews/admin`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ author, text, stars }),
      });
      const result = await response.json().catch(() => null);
      if (!response.ok || !result?.success) {
        throw new Error(result?.message || "Failed to add review.");
      }
      onSaved();
    } catch (err) {
      alert(err instanceof Error ? err.message : "Failed to add review.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[999] flex items-center justify-center p-4 bg-black/95 backdrop-blur-sm">
      <div className="bg-[#0f0f0f] border border-red-700/30 rounded-lg w-full max-w-xl p-6 shadow-2xl">
        <div className="flex justify-between items-center mb-6 border-b border-red-700/50 pb-3">
          <h2 className="text-xl font-bold text-white uppercase tracking-wider">
            Add Approved Review
          </h2>
          <button onClick={onClose} aria-label="Close modal">
            <X className="text-gray-400 hover:text-red-500 w-6 h-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="text-[10px] text-red-500 font-black mb-1 block uppercase">
              Author Name *
            </label>
            <input
              required
              value={author}
              onChange={(event) => setAuthor(event.target.value)}
              className="w-full bg-[#1a1a1a] border border-gray-800 p-3 text-white rounded outline-none focus:border-red-600"
            />
          </div>

          <div>
            <label className="text-[10px] text-red-500 font-black mb-1 block uppercase">
              Star Rating *
            </label>
            <select
              value={stars}
              onChange={(event) => setStars(Number(event.target.value))}
              className="w-full bg-[#1a1a1a] border border-gray-800 p-3 text-white rounded outline-none focus:border-red-600"
            >
              {[5, 4, 3, 2, 1].map((value) => (
                <option key={value} value={value}>
                  {value}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="text-[10px] text-red-500 font-black mb-1 block uppercase">
              Review Text *
            </label>
            <textarea
              required
              rows={5}
              value={text}
              onChange={(event) => setText(event.target.value)}
              className="w-full bg-[#1a1a1a] border border-gray-800 p-3 text-white rounded outline-none focus:border-red-600"
            />
          </div>

          <div className="flex justify-end gap-3 pt-6 border-t border-gray-800/50">
            <button
              type="button"
              onClick={onClose}
              className="text-gray-400 font-bold px-6 py-2 hover:text-white transition-colors"
            >
              CANCEL
            </button>
            <button
              disabled={saving}
              className="bg-red-600 px-8 py-3 rounded text-white font-black hover:bg-red-700 transition-all shadow-xl disabled:opacity-50"
            >
              {saving ? "SAVING..." : "ADD REVIEW"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ReviewsDashboard;
