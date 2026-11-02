"use client";

import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import { Trash2, Plus, X, Edit2, Upload, Link as LinkIcon } from "lucide-react";

// ✅ API URL from environment (jaise blog me hai)
const API_URL = process.env.NEXT_PUBLIC_API_URL || "";

const SocialMediaDashboard = () => {
  const [posts, setPosts] = useState<any[]>([]); // API se objects aayenge {_id, imageUrl}
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [inputValue, setInputValue] = useState(""); 
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [editingId, setEditingId] = useState<string | null>(null); // Index ki jagah ID use karenge
  const [uploadType, setUploadType] = useState<"url" | "file">("url");

  const fileInputRef = useRef<HTMLInputElement>(null);

  // ✅ 1. Fetch Posts from API
  const fetchPosts = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${API_URL}/posts`);
      // Agar aapka backend { success: true, data: [...] } bhejta hai:
      if (response.data.success) {
        setPosts(response.data.data);
      } else {
        // Agar direct array bhejta hai:
        setPosts(Array.isArray(response.data) ? response.data : []);
      }
    } catch (error) {
      console.error("Fetch posts failed", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  // --- Handlers ---

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result as string);
        setInputValue(""); 
      };
      reader.readAsDataURL(file);
    }
  };

  // ✅ 2. Create or Update API Call
  const handleSavePost = async () => {
    const finalData = uploadType === "url" ? inputValue : previewImage;
    if (!finalData) return;

    try {
      if (editingId) {
        // Update API
        await axios.put(`${API_URL}/posts/${editingId}`, { image: finalData });
      } else {
        // Create API
        await axios.post(`${API_URL}/posts`, { image: finalData });
      }
      fetchPosts(); // Refresh list
      closeModal();
    } catch (error) {
      console.error("Save failed", error);
      alert("Failed to save post");
    }
  };

  // ✅ 3. Delete API Call
  const handleDelete = async (id: string) => {
    if (window.confirm("Kyan aap ise delete karna chahte hain?")) {
      try {
        await axios.delete(`${API_URL}/posts/${id}`);
        fetchPosts(); // Refresh list
      } catch (error) {
        console.error("Delete failed", error);
      }
    }
  };

  const openEditModal = (post: any) => {
    setEditingId(post._id);
    if (post.imageUrl.startsWith("data:image") || post.publicId) {
      setUploadType("file");
      setPreviewImage(post.imageUrl);
    } else {
      setUploadType("url");
      setInputValue(post.imageUrl);
    }
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setInputValue("");
    setPreviewImage(null);
    setEditingId(null);
  };

  return (
    <div className="p-6 bg-[#0f172a] min-h-screen text-white font-sans">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-extrabold tracking-tight">Social Post Manager</h1>
            <p className="text-slate-400">Total Posts: {posts.length}</p>
          </div>
          <button
            onClick={() => setIsModalOpen(true)}
            className="bg-indigo-600 hover:bg-indigo-500 px-5 py-2.5 rounded-xl flex items-center gap-2 font-medium transition-all shadow-lg shadow-indigo-500/20"
          >
            <Plus size={20} /> Add Content
          </button>
        </div>

        {/* Loading State */}
        {loading ? (
          <div className="text-center py-20 text-indigo-400 animate-pulse text-xl">Loading Gallery...</div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {posts.length > 0 ? posts.map((post) => (
              <div key={post._id} className="group relative bg-slate-800 rounded-2xl overflow-hidden border border-slate-700 hover:border-indigo-500/50 transition-all shadow-xl">
                <div className="aspect-square overflow-hidden">
                  <img src={post.imageUrl} alt="Social Post" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                </div>
                
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
                  <div className="flex gap-2 w-full">
                    <button onClick={() => openEditModal(post)} className="flex-1 bg-white/10 backdrop-blur-md hover:bg-white/20 py-2 rounded-lg flex justify-center items-center transition-colors">
                      <Edit2 size={18} />
                    </button>
                    <button onClick={() => handleDelete(post._id)} className="flex-1 bg-red-500/20 backdrop-blur-md hover:bg-red-500 text-red-200 py-2 rounded-lg flex justify-center items-center transition-colors">
                      <Trash2 size={18} />
                    </button>
                  </div>
                </div>
              </div>
            )) : (
                <div className="col-span-full text-center py-10 text-gray-500">No posts found in database.</div>
            )}
          </div>
        )}

        {/* Modal (Add/Edit) */}
        {isModalOpen && (
          <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-md z-[100] flex items-center justify-center p-4">
            <div className="bg-slate-900 border border-slate-700 w-full max-w-lg rounded-3xl shadow-2xl overflow-hidden">
              <div className="p-6 border-b border-slate-800 flex justify-between items-center">
                <h2 className="text-xl font-bold">{editingId ? "Update Post" : "Add New Post"}</h2>
                <button onClick={closeModal} className="text-slate-400 hover:text-white"><X /></button>
              </div>

              <div className="p-6 space-y-6">
                <div className="flex bg-slate-800 p-1 rounded-xl">
                  <button onClick={() => setUploadType("url")} className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-lg text-sm transition-all ${uploadType === 'url' ? 'bg-indigo-600 text-white' : 'text-slate-400'}`}>
                    <LinkIcon size={16} /> URL Link
                  </button>
                  <button onClick={() => setUploadType("file")} className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-lg text-sm transition-all ${uploadType === 'file' ? 'bg-indigo-600 text-white' : 'text-slate-400'}`}>
                    <Upload size={16} /> Image Upload
                  </button>
                </div>

                {uploadType === "url" ? (
                  <input
                    type="text"
                    placeholder="Paste image URL here..."
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-indigo-500"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                  />
                ) : (
                  <div onClick={() => fileInputRef.current?.click()} className="border-2 border-dashed border-slate-700 rounded-2xl p-8 flex flex-col items-center justify-center cursor-pointer hover:border-indigo-500 bg-slate-950/50">
                    <input type="file" hidden ref={fileInputRef} accept="image/*" onChange={handleFileChange} />
                    <Upload className="text-slate-500 mb-2" size={32} />
                    <p className="text-sm text-slate-400">Click to upload image</p>
                  </div>
                )}

                {(inputValue || previewImage) && (
                  <div className="space-y-2">
                    <p className="text-xs font-semibold text-slate-500 uppercase">Preview</p>
                    <img src={uploadType === 'url' ? inputValue : previewImage!} className="w-full h-48 object-cover rounded-xl border border-slate-700" alt="Preview" />
                  </div>
                )}

                <button onClick={handleSavePost} className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-bold py-4 rounded-xl transition-all shadow-lg">
                  {editingId ? "Save Changes" : "Post to Gallery"}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SocialMediaDashboard;