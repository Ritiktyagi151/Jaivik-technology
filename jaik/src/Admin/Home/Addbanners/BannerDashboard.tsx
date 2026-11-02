"use client";
import React, { useState, useEffect, useCallback, useMemo } from "react";
import axios from "axios";
import {
  FiLock, FiUnlock, FiTrash2, FiPlus, FiUpload,
  FiEdit2, FiSave, FiRefreshCw, FiSearch, FiX
} from "react-icons/fi";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDebounce } from "use-debounce";

// ✅ API URLs from Environment (Jaise Blog Dashboard mein hai)
const API_BASE = process.env.NEXT_PUBLIC_API_URL || ""; 
const MEDIA_BASE = API_BASE.replace('/api', '');

interface Banner {
  _id: string;
  url: string;
  status: "active" | "locked" | "archived";
  title?: string;
  altText?: string;
  createdAt: string;
}

const AdminGalleryManager: React.FC = () => {
  const [banners, setBanners] = useState<Banner[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearch] = useDebounce(searchTerm, 300);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [currentBanner, setCurrentBanner] = useState<Banner | null>(null);

  // 1. FETCH BANNERS (Jaise fetchBlogs hai)
  const fetchBanners = useCallback(async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${API_BASE}/banners?t=${new Date().getTime()}`);
      // Backend response structure ke hisaab se data set karein
      const incomingData = response.data.data || (Array.isArray(response.data) ? response.data : []);
      setBanners(incomingData);
    } catch (err: any) {
      toast.error("Fetch failed: Backend check karein.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchBanners();
  }, [fetchBanners]);

  // 2. SAVE/UPDATE BANNER (FormData handle karein)
  const handleSave = async (formData: FormData) => {
    try {
      setLoading(true);
      const id = currentBanner?._id;
      // Agar image file upload handle karni ho toh headers set karein
      const config = { headers: { "Content-Type": "multipart/form-data" } };

      if (id) {
        await axios.put(`${API_BASE}/banners/${id}`, formData, config);
        toast.success("Banner updated!");
      } else {
        await axios.post(`${API_BASE}/banners`, formData, config);
        toast.success("Banner added!");
      }
      
      setIsFormOpen(false);
      fetchBanners();
    } catch (err: any) {
      toast.error(err.response?.data?.message || "Error saving banner.");
    } finally {
      setLoading(false);
    }
  };

  // 3. DELETE BANNER
  const handleDelete = async (id: string) => {
    if (window.confirm("Are you sure you want to delete this banner?")) {
      try {
        await axios.delete(`${API_BASE}/banners/${id}`);
        toast.info("Banner removed");
        fetchBanners();
      } catch (err) {
        toast.error("Delete failed.");
      }
    }
  };

  // 4. TOGGLE LOCK/STATUS
  const handleToggleStatus = async (id: string, currentStatus: string) => {
    try {
      const newStatus = currentStatus === "active" ? "locked" : "active";
      await axios.patch(`${API_BASE}/banners/${id}/status`, { status: newStatus });
      fetchBanners();
    } catch (err) {
      toast.error("Status update failed");
    }
  };

  // 5. SEARCH FILTER
  const filteredBanners = useMemo(() => {
    return banners.filter(b => 
      b.title?.toLowerCase().includes(debouncedSearch.toLowerCase())
    );
  }, [banners, debouncedSearch]);

  return (
    <div className="min-h-screen bg-black text-gray-200 p-4 sm:p-8 font-sans">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-center mb-8 gap-4">
          <h1 className="text-3xl font-bold text-red-600 tracking-tight uppercase">Banner Gallery Manager</h1>
          <div className="flex gap-4">
            <button onClick={fetchBanners} className="p-2 border border-gray-700 rounded hover:bg-gray-800 text-white">
              <FiRefreshCw className={loading ? "animate-spin" : ""} />
            </button>
            <button 
              onClick={() => { setCurrentBanner(null); setIsFormOpen(true); }}
              className="px-4 py-2 bg-red-600 text-white rounded font-bold hover:bg-red-700 flex items-center gap-2 transition-all shadow-lg"
            >
              <FiPlus /> ADD BANNER
            </button>
          </div>
        </div>

        {/* Search */}
        <div className="relative mb-6">
          <FiSearch className="absolute left-3 top-3 text-gray-500" />
          <input 
            className="w-full bg-[#111] border border-gray-800 rounded-md p-2.5 pl-10 text-white outline-none focus:border-red-600 transition-all" 
            placeholder="Search banners by title..." 
            value={searchTerm} 
            onChange={e => setSearchTerm(e.target.value)} 
          />
        </div>

        {/* Grid View (Gallery format) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredBanners.length > 0 ? (
            filteredBanners.map((banner) => (
              <div key={banner._id} className="bg-[#0a0a0a] rounded-lg border border-gray-800 overflow-hidden shadow-2xl relative group">
                <div className="h-48 overflow-hidden bg-gray-900">
                  <img 
                    src={banner.url.startsWith('http') ? banner.url : `${MEDIA_BASE}${banner.url}`} 
                    alt={banner.altText} 
                    className={`w-full h-full object-cover transition-transform group-hover:scale-105 ${banner.status === 'locked' ? 'grayscale opacity-40' : ''}`} 
                  />
                </div>
                <div className="p-4">
                  <h3 className="text-white font-bold truncate">{banner.title || "Untitled Banner"}</h3>
                  <p className="text-xs text-gray-500 mt-1">{new Date(banner.createdAt).toLocaleDateString()}</p>
                  
                  <div className="flex justify-between items-center mt-4 pt-3 border-t border-gray-800">
                    <span className={`text-[10px] px-2 py-0.5 rounded font-black uppercase ${banner.status === 'active' ? 'bg-green-900/30 text-green-500' : 'bg-red-900/30 text-red-500'}`}>
                      {banner.status}
                    </span>
                    <div className="flex gap-3">
                      <button onClick={() => handleToggleStatus(banner._id, banner.status)} className="text-yellow-500 hover:text-yellow-400">
                        {banner.status === 'locked' ? <FiUnlock size={18}/> : <FiLock size={18}/>}
                      </button>
                      <button onClick={() => { setCurrentBanner(banner); setIsFormOpen(true); }} className="text-blue-400 hover:text-blue-300">
                        <FiEdit2 size={18}/>
                      </button>
                      <button onClick={() => handleDelete(banner._id)} className="text-red-600 hover:text-red-500">
                        <FiTrash2 size={18}/>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-full py-20 text-center text-gray-600 italic">
              {loading ? "Syncing with database..." : "No banners found."}
            </div>
          )}
        </div>
      </div>

      {/* Modal Form */}
      {isFormOpen && (
        <BannerFormModal
          initialData={currentBanner}
          onClose={() => setIsFormOpen(false)}
          onSave={handleSave}
          isLoading={loading}
        />
      )}
    </div>
  );
};

// --- Modal Component (Sync with Blog Form style) ---
const BannerFormModal = ({ initialData, onClose, onSave, isLoading }: any) => {
  const [data, setData] = useState<any>(initialData || { 
    title: "", 
    altText: "", 
    url: "", 
    status: "active" 
  });
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string>(initialData?.url ? (initialData.url.startsWith('http') ? initialData.url : `${MEDIA_BASE}${initialData.url}`) : "");

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setImageFile(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData();
    Object.keys(data).forEach(key => formData.append(key, data[key]));
    if (imageFile) formData.append("image", imageFile); // image key for backend
    onSave(formData);
  };

  return (
    <div className="fixed inset-0 z-[999] flex items-center justify-center p-4 bg-black/95 overflow-y-auto">
      <div className="bg-[#0f0f0f] border border-red-700/30 rounded-lg w-full max-w-lg p-6 shadow-2xl my-auto">
        <div className="flex justify-between items-center mb-6 border-b border-red-700/50 pb-3">
          <h2 className="text-xl font-bold text-white uppercase tracking-wider">{initialData ? "Edit Banner" : "New Gallery Image"}</h2>
          <button onClick={onClose}><FiX className="text-gray-400 hover:text-red-500 w-6 h-6" /></button>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="text-[10px] text-red-500 font-black mb-1 block uppercase">Banner Title</label>
            <input required className="w-full bg-[#1a1a1a] border border-gray-800 p-3 text-white rounded outline-none focus:border-red-600" 
              value={data.title} onChange={e => setData({...data, title: e.target.value})} placeholder="e.g. Summer Sale 2026" />
          </div>

          <div>
            <label className="text-[10px] text-red-500 font-black mb-1 block uppercase">Alt Text (SEO)</label>
            <input className="w-full bg-[#1a1a1a] border border-gray-800 p-3 text-white rounded outline-none focus:border-red-600" 
              value={data.altText} onChange={e => setData({...data, altText: e.target.value})} placeholder="Image description" />
          </div>

          <div className="bg-[#151515] p-4 rounded-lg border border-gray-800">
            <label className="block text-[10px] font-black text-red-500 uppercase mb-3">Banner Media</label>
            <div className="space-y-4">
              <label className="flex flex-col items-center justify-center bg-black border-2 border-dashed border-gray-800 hover:border-red-600 rounded-lg p-6 cursor-pointer transition-all">
                <FiUpload className="text-2xl mb-2 text-red-600" />
                <span className="text-xs text-gray-500 text-center">Upload new image file</span>
                <input type="file" className="hidden" accept="image/*" onChange={handleFileChange} />
              </label>
              
              <div className="text-center text-gray-600 text-[10px]">-- OR --</div>
              
              <input className="w-full bg-[#1a1a1a] border border-gray-800 p-2 text-xs text-white rounded outline-none" 
                placeholder="Paste Image URL" value={data.url} onChange={e => { setData({...data, url: e.target.value}); setPreview(e.target.value); }} />

              {preview && (
                <div className="w-full h-32 border border-red-600/30 rounded-lg overflow-hidden mt-2">
                  <img src={preview} alt="Preview" className="w-full h-full object-cover" />
                </div>
              )}
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-6 border-t border-gray-800/50">
            <button type="button" onClick={onClose} className="text-gray-400 font-bold px-4 py-2 hover:text-white transition-colors">CANCEL</button>
            <button disabled={isLoading} className="bg-red-600 px-8 py-3 rounded text-white font-black hover:bg-red-700 transition-all flex items-center gap-2">
              {isLoading ? <FiRefreshCw className="animate-spin"/> : (initialData ? "UPDATE BANNER" : "ADD TO GALLERY")}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AdminGalleryManager;