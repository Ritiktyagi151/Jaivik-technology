"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";
import { FiEdit, FiTrash2, FiPlus, FiX, FiUpload, FiLink, FiSave } from "react-icons/fi";

const API_URL = `${process.env.NEXT_PUBLIC_API_URL || ""}/services`;

interface GalleryImage {
  src: string;
  alt: string;
}

interface Service {
  _id?: string;
  title: string;
  description: string;
  badge?: string;
  link: string;
  mainImg: string;
  galleryImgs: GalleryImage[];
}

const ServicesAdminDashboard = () => {
  const [services, setServices] = useState<Service[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  // Form States
  const [formData, setFormData] = useState<Service>({
    title: "",
    description: "",
    badge: "",
    link: "",
    mainImg: "",
    galleryImgs: [],
  });

  const [mainImgFile, setMainImgFile] = useState<File | null>(null);
  const [uploadMode, setUploadMode] = useState<"url" | "file">("url");

  // 1. Fetch Data
  const fetchServices = async () => {
    try {
      setLoading(true);
      const res = await axios.get(API_URL);
      if (res.data.success) setServices(res.data.data);
    } catch (err) {
      console.error("Fetch error", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchServices(); }, []);

  // 2. Gallery Handlers
  const addGalleryField = () => {
    setFormData({
      ...formData,
      galleryImgs: [...formData.galleryImgs, { src: "", alt: "" }]
    });
  };

  const updateGalleryField = (index: number, field: keyof GalleryImage, value: string) => {
    const updatedGallery = [...formData.galleryImgs];
    updatedGallery[index][field] = value;
    setFormData({ ...formData, galleryImgs: updatedGallery });
  };

  const removeGalleryField = (index: number) => {
    setFormData({
      ...formData,
      galleryImgs: formData.galleryImgs.filter((_, i) => i !== index)
    });
  };

  // 3. Submit Data
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const postData = new FormData();
    postData.append("title", formData.title);
    postData.append("description", formData.description);
    postData.append("badge", formData.badge || "");
    postData.append("link", formData.link);
    
    // Gallery images ko stringify karke bhejna zaroori hai
    postData.append("galleryImgs", JSON.stringify(formData.galleryImgs));

    if (uploadMode === "file" && mainImgFile) {
      postData.append("mainImgFile", mainImgFile);
    } else {
      postData.append("mainImg", formData.mainImg);
    }

    try {
      if (editingId) {
        await axios.put(`${API_URL}/${editingId}`, postData);
      } else {
        await axios.post(API_URL, postData);
      }
      alert("Success!");
      resetForm();
      fetchServices();
    } catch (err) {
      alert("Error saving service");
    }
  };

  const resetForm = () => {
    setFormData({ title: "", description: "", badge: "", link: "", mainImg: "", galleryImgs: [] });
    setMainImgFile(null);
    setEditingId(null);
    setShowForm(false);
  };

  const handleEdit = (service: Service) => {
    setEditingId(service._id!);
    setFormData(service);
    setUploadMode("url");
    setShowForm(true);
  };

  return (
    <div className="min-h-screen bg-black text-white p-6 font-sans">
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="flex justify-between items-center mb-8 border-b border-red-900/30 pb-6">
          <h1 className="text-3xl font-black text-red-600 uppercase italic">Services Dashboard</h1>
          <button 
            onClick={() => showForm ? resetForm() : setShowForm(true)}
            className="bg-red-600 hover:bg-red-700 px-6 py-2 rounded-full font-bold transition-all shadow-lg"
          >
            {showForm ? "Close" : "Add Service"}
          </button>
        </div>

        {showForm && (
          <form onSubmit={handleSubmit} className="bg-[#111] p-8 rounded-3xl border border-red-600/10 mb-10 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <input type="text" placeholder="Title" className="bg-black border border-gray-800 p-3 rounded-xl outline-none focus:border-red-600" value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} required />
              <input type="text" placeholder="Badge (Popular/Featured)" className="bg-black border border-gray-800 p-3 rounded-xl outline-none" value={formData.badge} onChange={e => setFormData({...formData, badge: e.target.value})} />
              <input type="text" placeholder="Link" className="bg-black border border-gray-800 p-3 rounded-xl outline-none" value={formData.link} onChange={e => setFormData({...formData, link: e.target.value})} required />
              
              {/* Main Image Logic */}
              <div className="flex gap-2">
                <button type="button" onClick={() => setUploadMode("url")} className={`px-4 rounded-lg ${uploadMode==='url'?'bg-red-600':'bg-gray-800'}`}><FiLink/></button>
                <button type="button" onClick={() => setUploadMode("file")} className={`px-4 rounded-lg ${uploadMode==='file'?'bg-red-600':'bg-gray-800'}`}><FiUpload/></button>
                {uploadMode === 'url' ? (
                  <input type="text" placeholder="Main Image URL" className="flex-1 bg-black border border-gray-800 p-3 rounded-xl outline-none" value={formData.mainImg} onChange={e => setFormData({...formData, mainImg: e.target.value})} />
                ) : (
                  <input type="file" className="flex-1 bg-black border border-gray-800 p-2 rounded-xl text-xs" onChange={e => setMainImgFile(e.target.files?.[0] || null)} />
                )}
              </div>
            </div>

            <textarea placeholder="Description" rows={3} className="w-full bg-black border border-gray-800 p-3 rounded-xl outline-none focus:border-red-600" value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} required />

            {/* Gallery Management */}
            <div className="border-t border-gray-800 pt-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-red-500 font-bold uppercase text-sm">Gallery Images</h3>
                <button type="button" onClick={addGalleryField} className="text-white bg-red-600/20 p-2 rounded-lg hover:bg-red-600"><FiPlus/></button>
              </div>
              <div className="space-y-3">
                {formData.galleryImgs.map((img, index) => (
                  <div key={index} className="flex gap-3 bg-black/50 p-3 rounded-xl border border-gray-900">
                    <input type="text" placeholder="Image URL" className="flex-1 bg-transparent border-b border-gray-800 p-1 outline-none text-sm" value={img.src} onChange={e => updateGalleryField(index, 'src', e.target.value)} />
                    <input type="text" placeholder="Alt Text" className="w-1/3 bg-transparent border-b border-gray-800 p-1 outline-none text-sm" value={img.alt} onChange={e => updateGalleryField(index, 'alt', e.target.value)} />
                    <button type="button" onClick={() => removeGalleryField(index)} className="text-red-500"><FiX/></button>
                  </div>
                ))}
              </div>
            </div>

            <button type="submit" className="w-full bg-red-600 hover:bg-red-700 py-4 rounded-2xl font-black uppercase tracking-widest shadow-red-900/20 shadow-xl">
              {editingId ? "Update Service" : "Save Service"}
            </button>
          </form>
        )}

        {/* List Table */}
        <div className="bg-[#111] rounded-3xl overflow-hidden border border-gray-900 shadow-2xl">
          {loading ? (
             <div className="p-20 text-center text-red-600 font-bold animate-pulse">LOADING DATA...</div>
          ) : (
            <table className="w-full text-left">
              <thead className="bg-[#1a1a1a] text-red-500 uppercase text-[10px] font-black tracking-widest">
                <tr>
                  <th className="p-5">Icon</th>
                  <th className="p-5">Title</th>
                  <th className="p-5">Gallery</th>
                  <th className="p-5 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-800">
                {services.map((s) => (
                  <tr key={s._id} className="hover:bg-red-900/5 transition-colors">
                    <td className="p-5">
                      <img src={s.mainImg} className="w-12 h-12 rounded-lg object-cover border border-gray-800" />
                    </td>
                    <td className="p-5 font-bold">{s.title}</td>
                    <td className="p-5 text-gray-500 text-xs">{s.galleryImgs.length} Images</td>
                    <td className="p-5 text-right">
                      <button onClick={() => handleEdit(s)} className="text-blue-500 mx-2 hover:bg-blue-500/10 p-2 rounded-lg transition-all"><FiEdit/></button>
                      <button onClick={async () => { if(window.confirm("Delete?")) { await axios.delete(`${API_URL}/${s._id}`); fetchServices(); } }} className="text-red-600 mx-2 hover:bg-red-600/10 p-2 rounded-lg transition-all"><FiTrash2/></button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
};

export default ServicesAdminDashboard;