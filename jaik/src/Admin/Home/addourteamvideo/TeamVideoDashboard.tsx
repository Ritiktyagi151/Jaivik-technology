"use client";

import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { Plus, Trash2, Edit3, X, Video, Image as ImageIcon } from "lucide-react";

// ✅ API configuration using your environment standard
const API_URL = `${process.env.NEXT_PUBLIC_API_URL || ""}/team-videos`;

interface TeamVideo {
  _id?: string;
  video: string;
  poster: string;
}

const TeamVideoDashboard = () => {
  const [videos, setVideos] = useState<TeamVideo[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  // Form States
  const [videoUrl, setVideoUrl] = useState("");
  const [posterUrl, setPosterUrl] = useState("");
  
  // File & Mode States
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [posterFile, setPosterFile] = useState<File | null>(null);
  const [videoMode, setVideoMode] = useState<"url" | "file">("url");
  const [posterMode, setPosterMode] = useState<"url" | "file">("url");

  // 1. Fetch Data
  const fetchVideos = async () => {
    try {
      setLoading(true);
      const res = await axios.get(API_URL);
      if (res.data.success) {
        setVideos(res.data.data);
      }
    } catch (err) {
      console.error("Fetch failed", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchVideos(); }, []);

  // 2. Submit Logic (Create/Update)
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const data = new FormData();

    // Video Handling
    if (videoMode === "file" && videoFile) data.append("videoFile", videoFile);
    else data.append("video", videoUrl);

    // Poster Handling
    if (posterMode === "file" && posterFile) data.append("posterFile", posterFile);
    else data.append("poster", posterUrl);

    try {
      if (editingId) {
        await axios.put(`${API_URL}/${editingId}`, data);
        alert("Team Video Updated!");
      } else {
        await axios.post(API_URL, data);
        alert("New Team Video Added!");
      }
      resetForm();
      fetchVideos();
    } catch (err) {
      console.error(err);
      alert("Failed to save. Check Console.");
    }
  };

  // 3. Delete Logic
  const handleDelete = async (id: string) => {
    if (window.confirm("Delete this team video?")) {
      await axios.delete(`${API_URL}/${id}`);
      setVideos(prev => prev.filter(v => v._id !== id));
    }
  };

  // 4. Edit Logic
  const startEdit = (item: TeamVideo) => {
    setEditingId(item._id || null);
    setVideoUrl(item.video);
    setPosterUrl(item.poster);
    setVideoMode("url");
    setPosterMode("url");
    setShowForm(true);
  };

  const resetForm = () => {
    setVideoUrl(""); setPosterUrl("");
    setVideoFile(null); setPosterFile(null);
    setEditingId(null); setShowForm(false);
  };

  return (
    <div className="min-h-screen bg-black text-white p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        
        {/* Header */}
        <div className="flex justify-between items-center mb-10 border-b border-red-900/40 pb-6">
          <h1 className="text-3xl font-black text-red-600 uppercase tracking-tighter italic">
            Team <span className="text-white">Video</span> Admin
          </h1>
          <button
            onClick={() => showForm ? resetForm() : setShowForm(true)}
            className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-full flex items-center gap-2 font-bold transition-all shadow-lg"
          >
            {showForm ? <X size={20} /> : <Plus size={20} />}
            {showForm ? "Cancel" : "Add Team Video"}
          </button>
        </div>

        {/* CRUD Form */}
        {showForm && (
          <form onSubmit={handleSubmit} className="bg-[#111] p-8 rounded-3xl border border-red-600/20 mb-12 shadow-2xl space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              
              {/* Video Source Handler */}
              <div className="space-y-4 p-5 bg-black rounded-2xl border border-gray-900">
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2 text-red-500 font-bold uppercase text-xs">
                    <Video size={16} /> Video Source
                  </div>
                  <div className="flex bg-[#111] p-1 rounded-lg border border-gray-800">
                    <button type="button" onClick={() => setVideoMode("url")} className={`px-4 py-1 rounded-md text-[10px] ${videoMode === 'url' ? 'bg-red-600 text-white' : 'text-gray-400'}`}>URL</button>
                    <button type="button" onClick={() => setVideoMode("file")} className={`px-4 py-1 rounded-md text-[10px] ${videoMode === 'file' ? 'bg-red-600 text-white' : 'text-gray-400'}`}>UPLOAD</button>
                  </div>
                </div>
                {videoMode === "url" ? (
                  <input type="text" placeholder="Paste Video URL..." className="w-full bg-transparent border-b border-gray-800 p-2 outline-none focus:border-red-600 transition-all" value={videoUrl} onChange={e => setVideoUrl(e.target.value)} required />
                ) : (
                  <input type="file" accept="video/*" onChange={e => setVideoFile(e.target.files?.[0] || null)} className="w-full text-xs text-gray-500 file:bg-red-600 file:text-white file:border-0 file:px-3 file:py-1 file:rounded file:mr-3 cursor-pointer" />
                )}
              </div>

              {/* Poster Source Handler */}
              <div className="space-y-4 p-5 bg-black rounded-2xl border border-gray-900">
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2 text-red-500 font-bold uppercase text-xs">
                    <ImageIcon size={16} /> Poster Image
                  </div>
                  <div className="flex bg-[#111] p-1 rounded-lg border border-gray-800">
                    <button type="button" onClick={() => setPosterMode("url")} className={`px-4 py-1 rounded-md text-[10px] ${posterMode === 'url' ? 'bg-red-600 text-white' : 'text-gray-400'}`}>URL</button>
                    <button type="button" onClick={() => setPosterMode("file")} className={`px-4 py-1 rounded-md text-[10px] ${posterMode === 'file' ? 'bg-red-600 text-white' : 'text-gray-400'}`}>UPLOAD</button>
                  </div>
                </div>
                {posterMode === "url" ? (
                  <input type="text" placeholder="Paste Poster URL..." className="w-full bg-transparent border-b border-gray-800 p-2 outline-none focus:border-red-600 transition-all" value={posterUrl} onChange={e => setPosterUrl(e.target.value)} required />
                ) : (
                  <input type="file" accept="image/*" onChange={e => setPosterFile(e.target.files?.[0] || null)} className="w-full text-xs text-gray-500 file:bg-red-600 file:text-white file:border-0 file:px-3 file:py-1 file:rounded file:mr-3 cursor-pointer" />
                )}
              </div>
            </div>

            <button type="submit" className="w-full bg-red-600 hover:bg-red-700 py-4 rounded-2xl font-black uppercase tracking-widest transition-all transform hover:scale-[1.01] shadow-lg shadow-red-900/20">
              {editingId ? "Update Team Video" : "Publish Team Video"}
            </button>
          </form>
        )}

        {/* Data Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {loading ? (
            <div className="col-span-full text-center py-20 animate-pulse text-red-600 font-bold tracking-widest">LOADING TEAM DATA...</div>
          ) : (
            videos.map((item) => (
              <div key={item._id} className="group relative bg-[#111] rounded-3xl overflow-hidden border border-gray-900 hover:border-red-600/50 transition-all shadow-xl">
                <div className="aspect-video relative">
                  <img src={item.poster} alt="Poster" className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-black/40 group-hover:bg-transparent transition-all" />
                  <div className="absolute top-3 right-3 flex gap-2 opacity-0 group-hover:opacity-100 transition-all">
                    <button onClick={() => startEdit(item)} className="bg-white/10 hover:bg-red-600 p-2 rounded-full backdrop-blur-sm transition-colors"><Edit3 size={14} /></button>
                    <button onClick={() => handleDelete(item._id!)} className="bg-white/10 hover:bg-red-600 p-2 rounded-full backdrop-blur-sm transition-colors"><Trash2 size={14} /></button>
                  </div>
                </div>
                <div className="p-4">
                  <p className="text-[10px] text-gray-500 truncate italic">{item.video}</p>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default TeamVideoDashboard;