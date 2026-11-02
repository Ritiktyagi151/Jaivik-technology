"use client";
import React, { useState, useEffect, useCallback, useMemo } from "react";
import axios from "axios";
import {
  FaLock, FaUnlock, FaTrash, FaPlus, FaCloudUploadAlt,
  FaEdit, FaCalendarAlt, FaLink, FaEye, FaTimes, FaSync
} from "react-icons/fa";
import { useDebounce } from "use-debounce";

const API_BASE = process.env.NEXT_PUBLIC_API_URL || ""; 

interface VideoData {
  _id?: string;
  title: string;
  videoSrc: string; // Updated from 'url' to match backend
  posterSrc: string;
  label: string;
  privacy: "public" | "private" | "unlisted"; // Updated options
  status: "published" | "draft" | "archived";
  description: string;
  views?: number;
  createdAt?: string;
}

const AdminCorporateVideos: React.FC = () => {
  const [videos, setVideos] = useState<VideoData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearch] = useDebounce(searchTerm, 300);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [currentVideo, setCurrentVideo] = useState<VideoData | null>(null);
  const [activeTab, setActiveTab] = useState<string>("all");

  const fetchVideos = useCallback(async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${API_BASE}/corporate-videos?t=${new Date().getTime()}`);
      setVideos(response.data || []);
      setError(null);
    } catch (err: any) {
      setError("Failed to fetch videos.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { fetchVideos(); }, [fetchVideos]);

  const handleSave = async (payload: VideoData) => {
    try {
      setLoading(true);
      if (currentVideo?._id) {
        await axios.put(`${API_BASE}/corporate-videos/${currentVideo._id}`, payload);
      } else {
        await axios.post(`${API_BASE}/corporate-videos`, payload);
      }
      setIsFormOpen(false);
      fetchVideos();
    } catch (err: any) {
      alert("Error saving video: " + (err.response?.data?.message || "Check fields"));
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (window.confirm("Delete this video permanently?")) {
      try {
        await axios.delete(`${API_BASE}/corporate-videos/${id}`);
        fetchVideos();
      } catch (err) { alert("Delete failed."); }
    }
  };

  const filteredVideos = useMemo(() => {
    return videos.filter(v => {
      const matchesSearch = v.title.toLowerCase().includes(debouncedSearch.toLowerCase());
      const matchesTab = activeTab === "all" || v.status === activeTab;
      return matchesSearch && matchesTab;
    });
  }, [videos, debouncedSearch, activeTab]);

  return (
    <div className="min-h-screen bg-[#0f1115] text-gray-200 p-4 sm:p-8 font-sans">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row justify-between items-center mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-black text-red-600 tracking-tighter uppercase flex items-center gap-3">
               <FaCloudUploadAlt /> VIDEO MANAGER
            </h1>
            <p className="text-gray-500 text-xs mt-1 tracking-widest uppercase">Jaivik Technology Admin</p>
          </div>
          
          <div className="flex gap-3">
            <button onClick={fetchVideos} className="p-3 bg-gray-900 border border-gray-800 rounded-lg hover:text-red-500 transition-all">
              <FaSync className={loading ? "animate-spin" : ""} />
            </button>
            <button 
              onClick={() => { setCurrentVideo(null); setIsFormOpen(true); }}
              className="px-6 py-3 bg-red-600 text-white font-black rounded-lg hover:bg-red-700 flex items-center gap-2 transition-all shadow-xl shadow-red-900/20"
            >
              <FaPlus /> ADD VIDEO
            </button>
          </div>
        </div>

        {/* Search & Tabs */}
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <input 
              className="w-full bg-black border border-gray-800 rounded-xl p-3 pl-10 outline-none focus:border-red-600 transition-all" 
              placeholder="Search by title..." 
              value={searchTerm} 
              onChange={e => setSearchTerm(e.target.value)} 
            />
          </div>
          <div className="bg-gray-900 p-1 rounded-xl border border-gray-800 flex overflow-x-auto">
            {["all", "published", "draft", "archived"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-6 py-2 rounded-lg text-xs font-bold uppercase transition-all ${
                  activeTab === tab ? "bg-red-600 text-white" : "text-gray-500 hover:text-white"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        {/* Video List */}
        <div className="grid grid-cols-1 gap-4">
          {filteredVideos.length > 0 ? (
            filteredVideos.map((video) => (
              <div key={video._id} className="bg-gray-900 border border-gray-800 rounded-2xl overflow-hidden group hover:border-gray-600 transition-all">
                <div className="flex flex-col md:flex-row">
                  <div className="w-full md:w-72 aspect-video bg-black flex-shrink-0 relative">
                    <img src={video.posterSrc} className="w-full h-full object-cover opacity-60 group-hover:opacity-90 transition-all" alt="" />
                    <span className="absolute top-3 left-3 bg-red-600 text-[10px] font-black px-2 py-1 rounded uppercase tracking-tighter">
                      {video.label}
                    </span>
                  </div>
                  
                  <div className="p-6 flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex justify-between items-start">
                        <h3 className="text-xl font-bold text-white uppercase tracking-tight">{video.title}</h3>
                        <div className="flex gap-2">
                          <button onClick={() => { setCurrentVideo(video); setIsFormOpen(true); }} className="p-2 bg-gray-800 rounded-lg hover:bg-blue-600 transition-colors">
                            <FaEdit />
                          </button>
                          <button onClick={() => video._id && handleDelete(video._id)} className="p-2 bg-gray-800 rounded-lg hover:bg-red-600 transition-colors">
                            <FaTrash />
                          </button>
                        </div>
                      </div>
                      <p className="text-sm text-gray-500 mt-2 line-clamp-2">{video.description}</p>
                    </div>

                    <div className="mt-4 flex flex-wrap items-center gap-6 text-[10px] font-black text-gray-500 uppercase tracking-widest">
                      <span className="flex items-center gap-2"><FaEye className="text-red-600" /> {video.views || 0} VIEWS</span>
                      <span className="flex items-center gap-2"><FaCalendarAlt className="text-red-600" /> {new Date(video.createdAt!).toLocaleDateString()}</span>
                      <span className="flex items-center gap-2 border border-gray-800 px-2 py-1 rounded">
                        {video.privacy === 'public' ? <FaUnlock className="text-green-500"/> : <FaLock className="text-yellow-500"/>} {video.privacy}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="p-20 text-center border-2 border-dashed border-gray-800 rounded-3xl text-gray-600 uppercase font-black tracking-widest">
              {loading ? "Syncing..." : "No media found"}
            </div>
          )}
        </div>
      </div>

      {isFormOpen && (
        <VideoFormModal 
          initialData={currentVideo} 
          onClose={() => setIsFormOpen(false)} 
          onSave={handleSave} 
          isLoading={loading}
        />
      )}
    </div>
  );
};

const VideoFormModal = ({ initialData, onClose, onSave, isLoading }: any) => {
  const [data, setData] = useState<VideoData>(initialData || {
    title: "",
    videoSrc: "", // Fixed field name
    posterSrc: "",
    label: "Featured",
    privacy: "public",
    status: "published",
    description: ""
  });

  return (
    <div className="fixed inset-0 z-[999] flex items-center justify-center p-4 bg-black/90 backdrop-blur-sm overflow-y-auto">
      <div className="bg-[#0f1115] border border-gray-800 rounded-2xl w-full max-w-2xl p-8 shadow-2xl my-auto">
        <div className="flex justify-between items-center mb-8 border-b border-gray-800 pb-4">
          <h2 className="text-2xl font-black text-white uppercase italic tracking-tighter">
            {initialData ? "Edit Media" : "Add Corporate Media"}
          </h2>
          <button onClick={onClose}><FaTimes className="text-gray-500 hover:text-red-500 transition-all" size={24} /></button>
        </div>

        <div className="space-y-5">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="col-span-1 md:col-span-2">
              <label className="text-[10px] font-black text-red-600 uppercase mb-1 block">Video Title</label>
              <input className="w-full bg-black border border-gray-800 p-3 text-white rounded-xl outline-none focus:border-red-600" value={data.title} onChange={e => setData({...data, title: e.target.value})} />
            </div>
            
            <div>
              <label className="text-[10px] font-black text-red-600 uppercase mb-1 block">Label (Badge)</label>
              <input placeholder="Featured, etc." className="w-full bg-black border border-gray-800 p-3 text-white rounded-xl outline-none focus:border-red-600" value={data.label} onChange={e => setData({...data, label: e.target.value})} />
            </div>

            <div>
              <label className="text-[10px] font-black text-red-600 uppercase mb-1 block">Status</label>
              <select className="w-full bg-black border border-gray-800 p-3 text-white rounded-xl outline-none focus:border-red-600" value={data.status} onChange={e => setData({...data, status: e.target.value as any})}>
                <option value="published">Published</option>
                <option value="draft">Draft</option>
                <option value="archived">Archived</option>
              </select>
            </div>
          </div>

          <div>
            <label className="text-[10px] font-black text-red-600 uppercase mb-1 block">Video MP4 URL</label>
            <input className="w-full bg-black border border-gray-800 p-3 text-white rounded-xl outline-none focus:border-red-600" value={data.videoSrc} onChange={e => setData({...data, videoSrc: e.target.value})} />
          </div>

          <div>
            <label className="text-[10px] font-black text-red-600 uppercase mb-1 block">Poster URL</label>
            <input className="w-full bg-black border border-gray-800 p-3 text-white rounded-xl outline-none focus:border-red-600" value={data.posterSrc} onChange={e => setData({...data, posterSrc: e.target.value})} />
          </div>

          <div>
            <label className="text-[10px] font-black text-red-600 uppercase mb-1 block">Short Description</label>
            <textarea rows={3} className="w-full bg-black border border-gray-800 p-3 text-white rounded-xl outline-none focus:border-red-600" value={data.description} onChange={e => setData({...data, description: e.target.value})} />
          </div>

          <div className="flex justify-end gap-4 pt-6">
            <button onClick={onClose} className="text-gray-500 font-black uppercase tracking-widest text-xs hover:text-white transition-all">Cancel</button>
            <button 
              disabled={isLoading}
              onClick={() => onSave(data)}
              className="bg-red-600 px-10 py-3 rounded-xl text-white font-black hover:bg-red-700 transition-all flex items-center gap-2 tracking-widest text-xs"
            >
              {isLoading ? <FaSync className="animate-spin" /> : "PUBLISH MEDIA"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminCorporateVideos;