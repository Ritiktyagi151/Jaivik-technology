"use client";

import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { Plus, Trash2, Edit3, X, Globe, Upload } from "lucide-react";

// ✅ API configuration
const API_URL = `${process.env.NEXT_PUBLIC_API_URL || ""}/technologies`;

interface Technology {
  _id?: string;
  name: string;
  mainImage: string;
  hoverImage: string;
  link: string;
}

const TechnologyDashboard = () => {
  const [techList, setTechList] = useState<Technology[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  // Form States
  const [name, setName] = useState("");
  const [link, setLink] = useState("");
  const [mainImage, setMainImage] = useState("");
  const [hoverImage, setHoverImage] = useState("");
  
  // File States
  const [mainFile, setMainFile] = useState<File | null>(null);
  const [hoverFile, setHoverFile] = useState<File | null>(null);
  const [mainMode, setMainMode] = useState<"url" | "file">("url");
  const [hoverMode, setHoverMode] = useState<"url" | "file">("url");

  // Fetch Data
  const fetchTechnologies = async () => {
    try {
      setLoading(true);
      const res = await axios.get(API_URL);
      if (res.data.success) {
        setTechList(res.data.data);
      }
    } catch (err) {
      console.error("Fetch failed", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTechnologies();
  }, []);

  // CRUD Operations
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const data = new FormData();
    data.append("name", name);
    data.append("link", link);

    // Main Image Logic
    if (mainMode === "file" && mainFile) data.append("mainImageFile", mainFile);
    else data.append("mainImage", mainImage);

    // Hover Image Logic
    if (hoverMode === "file" && hoverFile) data.append("hoverImageFile", hoverFile);
    else data.append("hoverImage", hoverImage);

    try {
      if (editingId) {
        await axios.put(`${API_URL}/${editingId}`, data);
        alert("Technology Updated!");
      } else {
        await axios.post(API_URL, data);
        alert("Technology Added!");
      }
      resetForm();
      fetchTechnologies();
    } catch (err) {
      alert("Error saving data");
    }
  };

  const handleDelete = async (id: string) => {
    if (window.confirm("Are you sure?")) {
      await axios.delete(`${API_URL}/${id}`);
      setTechList(prev => prev.filter(t => t._id !== id));
    }
  };

  const startEdit = (tech: Technology) => {
    setEditingId(tech._id || null);
    setName(tech.name);
    setLink(tech.link);
    setMainImage(tech.mainImage);
    setHoverImage(tech.hoverImage);
    setMainMode("url");
    setHoverMode("url");
    setShowForm(true);
  };

  const resetForm = () => {
    setName(""); setLink(""); setMainImage(""); setHoverImage("");
    setMainFile(null); setHoverFile(null);
    setEditingId(null); setShowForm(false);
  };

  return (
    <div className="min-h-screen bg-black text-white p-4 md:p-8 font-sans">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-10 border-b border-red-900/40 pb-6">
          <h1 className="text-3xl font-black text-red-600 uppercase tracking-tighter italic">
            Tech <span className="text-white">Forge</span> Dashboard
          </h1>
          <button
            onClick={() => showForm ? resetForm() : setShowForm(true)}
            className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-full flex items-center gap-2 font-bold transition-all shadow-lg shadow-red-900/30"
          >
            {showForm ? <X size={20} /> : <Plus size={20} />}
            {showForm ? "Cancel" : "Add Tech"}
          </button>
        </div>

        {/* Form Modal/Section */}
        {showForm && (
          <form onSubmit={handleSubmit} className="bg-[#111] p-8 rounded-3xl border border-red-600/20 mb-12 shadow-2xl space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <input type="text" placeholder="Tech Name (e.g. React.js)" className="bg-black border border-gray-800 p-4 rounded-xl focus:border-red-600 outline-none" value={name} onChange={e => setName(e.target.value)} required />
              <input type="text" placeholder="Link (e.g. /react-js)" className="bg-black border border-gray-800 p-4 rounded-xl focus:border-red-600 outline-none" value={link} onChange={e => setLink(e.target.value)} required />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Main Image Handler */}
              <div className="space-y-4 p-4 bg-black rounded-2xl border border-gray-900">
                <div className="flex justify-between items-center">
                  <label className="text-xs font-bold uppercase text-red-500">Main Image</label>
                  <div className="flex bg-[#111] p-1 rounded-lg">
                    <button type="button" onClick={() => setMainMode("url")} className={`px-3 py-1 rounded-md text-[10px] ${mainMode === 'url' ? 'bg-red-600' : ''}`}>URL</button>
                    <button type="button" onClick={() => setMainMode("file")} className={`px-3 py-1 rounded-md text-[10px] ${mainMode === 'file' ? 'bg-red-600' : ''}`}>File</button>
                  </div>
                </div>
                {mainMode === "url" ? (
                  <input type="text" placeholder="https://..." className="w-full bg-transparent border-b border-gray-800 p-2 outline-none focus:border-red-600" value={mainImage} onChange={e => setMainImage(e.target.value)} />
                ) : (
                  <input type="file" onChange={e => setMainFile(e.target.files?.[0] || null)} className="text-xs text-gray-500" />
                )}
              </div>

              {/* Hover Image Handler */}
              <div className="space-y-4 p-4 bg-black rounded-2xl border border-gray-900">
                <div className="flex justify-between items-center">
                  <label className="text-xs font-bold uppercase text-red-500">Hover Image</label>
                  <div className="flex bg-[#111] p-1 rounded-lg">
                    <button type="button" onClick={() => setHoverMode("url")} className={`px-3 py-1 rounded-md text-[10px] ${hoverMode === 'url' ? 'bg-red-600' : ''}`}>URL</button>
                    <button type="button" onClick={() => setHoverMode("file")} className={`px-3 py-1 rounded-md text-[10px] ${hoverMode === 'file' ? 'bg-red-600' : ''}`}>File</button>
                  </div>
                </div>
                {hoverMode === "url" ? (
                  <input type="text" placeholder="https://..." className="w-full bg-transparent border-b border-gray-800 p-2 outline-none focus:border-red-600" value={hoverImage} onChange={e => setHoverImage(e.target.value)} />
                ) : (
                  <input type="file" onChange={e => setHoverFile(e.target.files?.[0] || null)} className="text-xs text-gray-500" />
                )}
              </div>
            </div>

            <button type="submit" className="w-full bg-red-600 hover:bg-red-700 py-4 rounded-2xl font-black uppercase tracking-widest transition-all transform hover:scale-[1.01]">
              {editingId ? "Update Technology" : "Unleash Technology"}
            </button>
          </form>
        )}

        {/* Data List */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {loading ? (
            <div className="col-span-full text-center py-20 animate-pulse text-red-600 font-bold">Scanning Mainframe...</div>
          ) : (
            techList.map((tech) => (
              <div key={tech._id} className="group relative bg-[#111] rounded-3xl p-6 border border-gray-900 hover:border-red-600 transition-all duration-500 overflow-hidden">
                <div className="absolute top-2 right-2 flex gap-2 z-10 opacity-0 group-hover:opacity-100 transition-all">
                  <button onClick={() => startEdit(tech)} className="bg-white/10 hover:bg-red-600 p-2 rounded-full"><Edit3 size={14} /></button>
                  <button onClick={() => handleDelete(tech._id!)} className="bg-white/10 hover:bg-red-600 p-2 rounded-full"><Trash2 size={14} /></button>
                </div>
                
                <div className="relative h-32 mb-4 overflow-hidden rounded-2xl bg-black">
                  <img src={tech.mainImage} alt={tech.name} className="w-full h-full object-contain p-4 group-hover:opacity-0 transition-all" />
                  <img src={tech.hoverImage} className="absolute inset-0 w-full h-full object-contain p-4 opacity-0 group-hover:opacity-100 transition-all" />
                </div>
                
                <h3 className="text-lg font-bold text-center group-hover:text-red-600 transition-colors">{tech.name}</h3>
                <p className="text-[10px] text-gray-600 text-center uppercase tracking-widest">{tech.link}</p>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default TechnologyDashboard;