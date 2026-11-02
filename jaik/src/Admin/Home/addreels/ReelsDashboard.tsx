"use client";

import { useState, useEffect, useRef } from "react";
import axios from "axios";
import ReelTable from "./ReelTable";
import ReelForm from "./ReelForm";
import type { Reel, ReelFormData } from "./reel";

// ✅ API URL Configuration
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5002/api";
const API_URL = `${API_BASE_URL}/reels`;

type ReelApiResponse = Omit<Reel, "id"> & {
  _id?: string;
  id?: string;
};

const toReel = (reel: ReelApiResponse): Reel | null => {
  const id = reel._id || reel.id;

  if (!id) {
    return null;
  }

  return {
    ...reel,
    id,
  };
};

const ReelsDashboard = () => {
  const [reels, setReels] = useState<Reel[]>([]);
  const [editingReel, setEditingReel] = useState<Reel | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(true);
  const [scrollToFormKey, setScrollToFormKey] = useState(0);
  const formSectionRef = useRef<HTMLDivElement>(null);

  // 1. Fetch Reels on Load
  useEffect(() => {
    fetchReels();
  }, []);

  const scrollToEditForm = () => {
    const formSection = formSectionRef.current;
    if (!formSection) return;

    formSection.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });

    const formTop = formSection.getBoundingClientRect().top + window.scrollY - 16;
    window.scrollTo({
      top: Math.max(formTop, 0),
      behavior: "smooth",
    });

    let scrollContainer = formSection.parentElement;
    while (scrollContainer) {
      const style = window.getComputedStyle(scrollContainer);
      const canScroll =
        /(auto|scroll)/.test(style.overflowY) &&
        scrollContainer.scrollHeight > scrollContainer.clientHeight;

      if (canScroll) {
        const containerRect = scrollContainer.getBoundingClientRect();
        const formRect = formSection.getBoundingClientRect();
        const targetTop =
          scrollContainer.scrollTop + formRect.top - containerRect.top - 16;

        scrollContainer.scrollTo({
          top: Math.max(targetTop, 0),
          behavior: "smooth",
        });
      }

      scrollContainer = scrollContainer.parentElement;
    }
  };

  useEffect(() => {
    if (!editingReel || !showForm || scrollToFormKey === 0) return;

    const firstTimer = window.setTimeout(scrollToEditForm, 80);
    const secondTimer = window.setTimeout(scrollToEditForm, 300);

    return () => {
      window.clearTimeout(firstTimer);
      window.clearTimeout(secondTimer);
    };
  }, [editingReel, showForm, scrollToFormKey]);

  const fetchReels = async () => {
    try {
      setLoading(true);
      const response = await axios.get(API_URL);
      
      // ✅ Dono patterns handle kiye hain: {success: true, data: []} ya direct []
      const rawData = response.data.data || response.data;
      const isSuccess = response.data.success !== undefined ? response.data.success : true;

      if (isSuccess && Array.isArray(rawData)) {
        const formattedData = rawData
          .map((r: ReelApiResponse) => toReel(r))
          .filter((reel): reel is Reel => reel !== null);
        setReels(formattedData);
      }
    } catch (error) {
      console.error("Error fetching reels:", error);
      alert("Failed to load reels. Please check if Backend is running.");
    } finally {
      setLoading(false);
    }
  };

  // 2. Handle Create (POST)
  const handleCreate = async (formData: ReelFormData) => {
    try {
      const response = await axios.post(API_URL, formData);
      const result = response.data.data || response.data;

      if (result) {
        const newReel = toReel(result);
        if (newReel) {
          setReels((prev) => [newReel, ...prev]);
          setShowForm(false);
          alert("Reel added successfully!");
        }
      }
    } catch (error) {
      console.error("Error creating reel:", error);
      alert("Error saving reel. Make sure all fields are filled.");
    }
  };

  // 3. Handle Update (PUT)
  const handleUpdate = async (id: string, formData: ReelFormData) => {
    try {
      const response = await axios.put(`${API_URL}/${id}`, formData);
      const result = response.data.data || response.data;

      if (result) {
        const updatedReel = toReel(result);
        if (updatedReel) {
          setReels((prev) =>
            prev.map((reel) => (reel.id === id ? updatedReel : reel))
          );
          setEditingReel(null);
          setShowForm(false);
          alert("Reel updated successfully!");
        }
      }
    } catch (error) {
      console.error("Error updating reel:", error);
      alert("Error updating reel.");
    }
  };

  // 4. Handle Delete (DELETE)
  const handleDelete = async (id: string) => {
    if (window.confirm("Are you sure you want to delete this reel?")) {
      try {
        const response = await axios.delete(`${API_URL}/${id}`);
        // Check if delete was successful
        if (response.status === 200 || response.data.success) {
          setReels((prev) => prev.filter((reel) => reel.id !== id));
          alert("Reel deleted.");
        }
      } catch (error) {
        console.error("Error deleting reel:", error);
        alert("Error deleting reel.");
      }
    }
  };

  const handleEdit = (reel: Reel) => {
    setEditingReel(reel);
    setShowForm(true);
    setScrollToFormKey((prev) => prev + 1);
  };

  const toggleForm = () => {
    setShowForm(!showForm);
    if (showForm) setEditingReel(null);
  };

  return (
    <div className="bg-black text-white min-h-screen p-6 font-sans">
      <div className="max-w-6xl mx-auto">
        <header className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-4">
          <div>
            <h1 className="text-4xl font-extrabold text-red-600 tracking-tight">REELS ADMIN</h1>
            <p className="text-gray-400 mt-1">Manage your social media content</p>
          </div>
          
          <button
            onClick={toggleForm}
            className={`flex items-center gap-2 px-8 py-3 text-white font-bold rounded-full transition-all duration-300 transform hover:scale-105 shadow-xl ${
              showForm
                ? "bg-zinc-700 hover:bg-zinc-600"
                : "bg-red-600 hover:bg-red-700 shadow-red-900/40"
            }`}
          >
            {showForm ? "✕ Cancel" : "+ Add New Reel"}
          </button>
        </header>

        {/* Status Bar */}
        <div className="bg-zinc-900/50 border border-zinc-800 rounded-xl p-4 mb-8 flex items-center gap-6">
          <div className="flex flex-col">
            <span className="text-xs text-gray-500 uppercase font-bold">Total Content</span>
            <span className="text-2xl font-mono text-red-500">
              {loading ? "--" : reels.length}
            </span>
          </div>
        </div>

        {/* Form Section */}
        {(showForm || editingReel) && (
          <div
            ref={formSectionRef}
            className="bg-zinc-900 rounded-2xl shadow-2xl p-8 mb-12 border border-red-600/30 animate-in fade-in slide-in-from-top-4 duration-500"
          >
            <h2 className="text-2xl font-bold mb-6 text-white flex items-center gap-2">
              {editingReel ? "✍️ Edit Video Details" : "🎥 Upload New Reel"}
            </h2>
            <ReelForm
              onSubmit={
                editingReel
                  ? (data) => handleUpdate(editingReel.id, data)
                  : handleCreate
              }
              initialData={editingReel || undefined}
              onCancel={() => {
                setEditingReel(null);
                setShowForm(false);
              }}
            />
          </div>
        )}

        {/* Table Section */}
        <div className="bg-zinc-900 rounded-2xl shadow-xl overflow-hidden border border-zinc-800">
          <div className="p-6 border-b border-zinc-800 flex justify-between items-center">
            <h2 className="text-xl font-bold text-gray-200">Content Library</h2>
          </div>
          
          {loading ? (
            <div className="flex flex-col items-center justify-center py-20 gap-4">
              <div className="w-10 h-10 border-4 border-red-600 border-t-transparent rounded-full animate-spin"></div>
              <p className="text-gray-500 animate-pulse">Syncing with database...</p>
            </div>
          ) : (
            <div className="p-2">
               <ReelTable
                reels={reels}
                onEdit={handleEdit}
                onDelete={handleDelete}
              />
            </div>
          )}

          {!loading && reels.length === 0 && (
            <div className="text-center py-20 bg-zinc-900/50">
               <p className="text-gray-500 text-lg">No reels found in the database.</p>
               <button onClick={() => setShowForm(true)} className="text-red-500 mt-2 underline">Create your first reel</button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ReelsDashboard;
