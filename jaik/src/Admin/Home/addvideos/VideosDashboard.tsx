"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import VideoTable from "./VideoTable";
import VideoForm from "./VideoForm";
import type { Video } from "./video";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "";

const VideosDashboard = () => {
  const [videos, setVideos] = useState<Video[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingVideo, setEditingVideo] = useState<Video | null>(null);
  const [showForm, setShowForm] = useState(false);

  const fetchVideos = async () => {
    try {
      const response = await axios.get(`${API_URL}/videos`);
      if (response.data.success) {
        setVideos(response.data.data.map((v: any) => ({ ...v, id: v._id })));
      }
    } catch (error) {
      console.error("Fetch failed", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchVideos(); }, []);

  // ✅ Ekdam Fast Save Logic (Optimistic Update)
  const handleSave = async (data: any) => {
    // 1. Temporary ID banao taaki UI turant update ho sake
    const tempId = Date.now().toString();
    const isFormData = data instanceof FormData;
    
    // UI ke liye temporary object (agar URL mode hai)
    let optimisticVideo: any = {};
    if (!isFormData) {
      optimisticVideo = { ...data, id: tempId, isTemp: true };
      setVideos((prev) => [optimisticVideo, ...prev]); // 🚀 Turant list me add karo
    }

    setShowForm(false); // Modal turant band karo

    try {
      const config = {
        headers: { "Content-Type": isFormData ? "multipart/form-data" : "application/json" },
      };

      let response;
      if (editingVideo) {
        response = await axios.put(`${API_URL}/videos/${editingVideo.id}`, data, config);
      } else {
        response = await axios.post(`${API_URL}/videos`, data, config);
      }

      if (response.data.success) {
        // 2. Real data aane par temporary data ko replace karo
        fetchVideos(); 
      }
    } catch (error) {
      // 3. Agar fail hua toh UI se wapas hatao
      setVideos((prev) => prev.filter(v => v.id !== tempId));
      alert("Upload fail ho gaya, kripya check karein.");
    }
  };

  const handleDelete = async (id: string) => {
    // UI se turant delete (Optimistic)
    const originalVideos = [...videos];
    setVideos(videos.filter(v => v.id !== id));

    try {
      await axios.delete(`${API_URL}/videos/${id}`);
    } catch (error) {
      setVideos(originalVideos); // Fail hone par wapas lao
      alert("Delete nahi ho paya.");
    }
  };

  // Baki handlers same rahenge...
  const handleEdit = (video: Video) => { setEditingVideo(video); setShowForm(true); };
  const toggleForm = () => { setShowForm(!showForm); if (showForm) setEditingVideo(null); };

  return (
    <div className="bg-black text-white min-h-screen p-6 font-sans">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-6 text-red-500 tracking-tight">Videos Management Center</h1>

        <div className="flex justify-between items-center mb-8 bg-gray-900/50 p-4 rounded-xl border border-gray-800">
          <div className="text-lg">Total: <span className="text-red-500 font-bold">{videos.length}</span></div>
          <button onClick={toggleForm} className="bg-red-600 hover:bg-red-700 px-6 py-3 rounded-xl font-bold transition-all active:scale-95 shadow-lg">
             {showForm ? "Cancel" : "Add Content Fast"}
          </button>
        </div>

        {(showForm || editingVideo) && (
          <div className="bg-gray-900 rounded-2xl p-8 mb-8 border border-red-500/30">
            <VideoForm onSubmit={handleSave} initialData={editingVideo || undefined} onCancel={() => { setEditingVideo(null); setShowForm(false); }} />
          </div>
        )}

        <div className="bg-gray-900 rounded-2xl p-6 border border-gray-800">
          {loading ? <p className="text-center py-10">Loading...</p> : <VideoTable videos={videos} onEdit={handleEdit} onDelete={handleDelete} />}
        </div>
      </div>
    </div>
  );
};

export default VideosDashboard;