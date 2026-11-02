"use client";

import React, { useState, useEffect, useRef } from "react";
import axios from "axios";

// Environment variables for API
const API_URL = `${process.env.NEXT_PUBLIC_API_URL || ""}/websites`;

interface WebsiteCard {
  _id?: string;
  id?: string;
  url: string;
  imageSrc: string; 
  alt?: string;
}

const WebsiteDashboard = () => {
  const [websites, setWebsites] = useState<WebsiteCard[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  
  // Image Selection States
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [uploadMode, setUploadMode] = useState<"url" | "file">("url");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [formData, setFormData] = useState<WebsiteCard>({
    url: "",
    imageSrc: "",
    alt: "",
  });

  // 1. Fetch Data
  const fetchWebsites = async () => {
    try {
      setLoading(true);
      const response = await axios.get(API_URL);
      const actualData = response.data.data || response.data;
      setWebsites(Array.isArray(actualData) ? actualData : []);
    } catch (error) {
      console.error("Fetch failed", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchWebsites(); }, []);

  // 2. Add / Update Logic
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Using FormData to support File Upload
    const data = new FormData();
    data.append("url", formData.url);
    data.append("alt", formData.alt || "");
    
    if (uploadMode === "file" && selectedFile) {
      data.append("image", selectedFile); // Backend expects 'image' field
    } else {
      data.append("imageSrc", formData.imageSrc); // Simple URL string
    }

    try {
      const config = { headers: { "Content-Type": "multipart/form-data" } };
      
      if (editingId) {
        await axios.put(`${API_URL}/${editingId}`, data, config);
        alert("Website Updated Successfully!");
      } else {
        await axios.post(API_URL, data, config);
        alert("New Website Added!");
      }
      
      resetForm();
      fetchWebsites();
    } catch (error: any) {
      console.error("Error:", error.response?.data || error.message);
      alert("Failed to save. Check Console.");
    }
  };

  // 3. Delete Logic
  const handleDelete = async (id: string) => {
    if (window.confirm("Are you sure you want to delete this website?")) {
      try {
        await axios.delete(`${API_URL}/${id}`);
        setWebsites(prev => prev.filter(w => (w._id || w.id) !== id));
      } catch (error) {
        console.error("Delete failed", error);
      }
    }
  };

  // 4. Helpers
  const resetForm = () => {
    setFormData({ url: "", imageSrc: "", alt: "" });
    setSelectedFile(null);
    setEditingId(null);
    setShowForm(false);
    setUploadMode("url");
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const startEdit = (site: WebsiteCard) => {
    setEditingId(site._id || site.id || null);
    setFormData({
      url: site.url,
      imageSrc: site.imageSrc,
      alt: site.alt,
    });
    setUploadMode("url");
    setShowForm(true);
  };

  return (
    <div className="p-4 md:p-8 bg-black min-h-screen text-white font-sans">
      <div className="max-w-6xl mx-auto">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 border-b border-red-900/30 pb-6 gap-4">
          <div>
            <h1 className="text-3xl font-extrabold text-red-600 uppercase tracking-tighter">Website Portfolio</h1>
            <p className="text-gray-400 text-sm mt-1">Manage your live website showcases</p>
          </div>
          <button 
            onClick={() => (showForm ? resetForm() : setShowForm(true))}
            className={`px-8 py-3 rounded-full font-bold transition-all shadow-lg ${
              showForm ? "bg-gray-800 text-white" : "bg-red-600 hover:bg-red-700 text-white shadow-red-900/40"
            }`}
          >
            {showForm ? "✕ Close Form" : "+ Add New Project"}
          </button>
        </div>

        {/* Dynamic Form Section */}
        {showForm && (
          <form onSubmit={handleSubmit} className="bg-[#111] p-6 rounded-2xl border border-red-600/20 mb-10 shadow-2xl space-y-6">
            <h2 className="text-xl font-bold text-red-500 border-l-4 border-red-600 pl-3">
              {editingId ? "Update Website Details" : "Register New Project"}
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-xs uppercase text-gray-500 font-bold">Project / Brand Name</label>
                <input type="text" placeholder="e.g. Jaivik Technology Tech" className="w-full bg-[#1a1a1a] border border-gray-800 p-3 rounded-lg focus:border-red-600 outline-none transition-all" value={formData.alt} onChange={(e) => setFormData({ ...formData, alt: e.target.value })} />
              </div>
              <div className="space-y-2">
                <label className="text-xs uppercase text-gray-500 font-bold">Live URL</label>
                <input type="url" placeholder="" className="w-full bg-[#1a1a1a] border border-gray-800 p-3 rounded-lg focus:border-red-600 outline-none transition-all" value={formData.url} onChange={(e) => setFormData({ ...formData, url: e.target.value })} required />
              </div>
            </div>

            {/* Image Handling Toggle */}
            <div className="bg-[#161616] p-5 rounded-xl border border-gray-800">
              <div className="flex items-center justify-between mb-4">
                <label className="text-xs uppercase text-gray-500 font-bold">Thumbnail Image</label>
                <div className="flex bg-black p-1 rounded-lg border border-gray-800">
                  <button type="button" onClick={() => setUploadMode("url")} className={`px-4 py-1.5 text-xs rounded-md transition-all ${uploadMode === 'url' ? 'bg-red-600 text-white shadow-md' : 'text-gray-400'}`}>External URL</button>
                  <button type="button" onClick={() => setUploadMode("file")} className={`px-4 py-1.5 text-xs rounded-md transition-all ${uploadMode === 'file' ? 'bg-red-600 text-white shadow-md' : 'text-gray-400'}`}>Local Upload</button>
                </div>
              </div>

              {uploadMode === "url" ? (
                <input type="text" placeholder="Paste image address (webp, png, jpg)..." className="w-full bg-[#1a1a1a] border border-gray-800 p-3 rounded-lg focus:border-red-600 outline-none" value={formData.imageSrc} onChange={(e) => setFormData({ ...formData, imageSrc: e.target.value })} />
              ) : (
                <div className="relative border-2 border-dashed border-gray-800 rounded-lg p-4 text-center hover:border-red-600/50 transition-all">
                  <input type="file" ref={fileInputRef} accept="image/*" className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" onChange={(e) => setSelectedFile(e.target.files?.[0] || null)} />
                  <p className="text-sm text-gray-400">
                    {selectedFile ? `Selected: ${selectedFile.name}` : "Click or Drag to upload website screenshot"}
                  </p>
                </div>
              )}
            </div>

            <button type="submit" className="w-full bg-red-600 hover:bg-red-700 py-4 rounded-xl font-black uppercase tracking-widest transition-all transform hover:scale-[1.01] active:scale-[0.99]">
              {editingId ? "Update Portfolio" : "Publish to Website"}
            </button>
          </form>
        )}

        {/* Data List (Table) */}
        <div className="bg-[#111] rounded-2xl border border-gray-800 overflow-hidden shadow-2xl">
          {loading ? (
            <div className="text-center py-20">
              <div className="inline-block w-8 h-8 border-4 border-red-600 border-t-transparent rounded-full animate-spin mb-4"></div>
              <p className="text-red-600 font-bold tracking-widest animate-pulse">SYNCHRONIZING PORTFOLIO...</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead className="bg-[#1a1a1a] text-red-500 uppercase text-[10px] font-black tracking-[0.2em]">
                  <tr>
                    <th className="p-5">Visual Preview</th>
                    <th className="p-5">Brand Details</th>
                    <th className="p-5">Link</th>
                    <th className="p-5 text-right">Management</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-800">
                  {websites.map((site) => (
                    <tr key={site._id || site.id} className="group hover:bg-red-900/5 transition-all">
                      <td className="p-5">
                        <div className="relative w-24 h-14 overflow-hidden rounded-lg border border-gray-800 group-hover:border-red-600 transition-all">
                          <img src={site.imageSrc} alt={site.alt} className="w-full h-full object-cover" />
                        </div>
                      </td>
                      <td className="p-5 font-bold text-gray-200">{site.alt}</td>
                      <td className="p-5 text-gray-500 text-xs truncate max-w-[150px] italic">
                        <a href={site.url} target="_blank" rel="noreferrer" className="hover:text-red-500 transition-all">{site.url}</a>
                      </td>
                      <td className="p-5">
                        <div className="flex justify-end gap-3">
                          <button onClick={() => startEdit(site)} className="bg-blue-600/10 hover:bg-blue-600 text-blue-500 hover:text-white px-3 py-1.5 rounded-md text-[10px] font-bold transition-all uppercase">Edit</button>
                          <button onClick={() => handleDelete(site._id || site.id || "")} className="bg-red-600/10 hover:bg-red-600 text-red-500 hover:text-white px-3 py-1.5 rounded-md text-[10px] font-bold transition-all uppercase">Delete</button>
                        </div>
                      </td>
                    </tr>
                  ))}
                  {websites.length === 0 && (
                    <tr>
                      <td colSpan={4} className="p-20 text-center text-gray-600 font-medium italic">Your portfolio is currently empty.</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default WebsiteDashboard;