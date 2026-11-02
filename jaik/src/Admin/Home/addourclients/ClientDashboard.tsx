"use client";
import React, { useState, useEffect, useMemo, useCallback } from "react";
import axios from "axios";
import {
  FiEdit2, FiTrash2, FiPlus, FiSearch,
  FiRefreshCw, FiUpload, FiX, FiLink, FiGlobe
} from "react-icons/fi";
import { useDebounce } from "use-debounce";

// ✅ API Configuration
const API_BASE = process.env.NEXT_PUBLIC_API_URL || ""; 
const MEDIA_BASE = API_BASE.replace('/api', '');

interface Client {
  _id?: string;
  name: string;
  logo: string;
  website: string;
  status: "active" | "inactive" | "draft";
  order: number;
  createdAt?: string;
}

const ClientDashboard: React.FC = () => {
  const [clients, setClients] = useState<Client[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearch] = useDebounce(searchTerm, 300);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [currentClient, setCurrentClient] = useState<Client | null>(null);

  // 1. FETCH CLIENTS FROM DATABASE
  const fetchClients = useCallback(async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${API_BASE}/clients?status=all&t=${new Date().getTime()}`);
      const incomingData = response.data.data || (Array.isArray(response.data) ? response.data : []);
      setClients(incomingData);
      setError(null);
    } catch (err: any) {
      setError(`Fetch failed: ${err.message}`);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchClients();
  }, [fetchClients]);

  // 2. SAVE CLIENT (CREATE OR UPDATE)
  const handleSave = async (formData: FormData) => {
    try {
      setLoading(true);
      const id = currentClient?._id;
      const config = { headers: { "Content-Type": "multipart/form-data" } };

      if (id) {
        await axios.put(`${API_BASE}/clients/${id}`, formData, config);
      } else {
        await axios.post(`${API_BASE}/clients`, formData, config);
      }
      
      setIsFormOpen(false);
      fetchClients();
    } catch (err: any) {
      alert(err.response?.data?.message || "Error saving client.");
    } finally {
      setLoading(false);
    }
  };

  // 3. DELETE CLIENT
  const handleDelete = async (id: string) => {
    if (window.confirm("Are you sure you want to remove this client?")) {
      try {
        await axios.delete(`${API_BASE}/clients/${id}`);
        fetchClients();
      } catch (err) {
        alert("Delete failed.");
      }
    }
  };

  const filteredClients = useMemo(() => {
    return clients.filter(c => 
      c.name?.toLowerCase().includes(debouncedSearch.toLowerCase()) ||
      c.website?.toLowerCase().includes(debouncedSearch.toLowerCase())
    );
  }, [clients, debouncedSearch]);

  return (
    <div className="min-h-screen bg-black text-gray-200 p-4 sm:p-8 font-sans">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="flex flex-col sm:flex-row justify-between items-center mb-8 gap-4">
          <h1 className="text-3xl font-bold text-red-600 tracking-tight uppercase underline decoration-gray-800 underline-offset-8">Client Management</h1>
          <div className="flex gap-4">
            <button onClick={fetchClients} className="p-2 border border-gray-700 rounded hover:bg-gray-800 transition-all text-white">
              <FiRefreshCw className={loading ? "animate-spin" : ""} />
            </button>
            <button 
              onClick={() => { setCurrentClient(null); setIsFormOpen(true); }}
              className="px-4 py-2 bg-red-600 text-white rounded font-bold hover:bg-red-700 flex items-center gap-2 transition-all shadow-lg"
            >
              <FiPlus /> ADD CLIENT
            </button>
          </div>
        </div>

        {error && <div className="p-4 mb-4 bg-red-900/20 border border-red-600 text-red-500 rounded">{error}</div>}

        {/* Search Bar */}
        <div className="relative mb-6">
          <FiSearch className="absolute left-3 top-3 text-gray-500" />
          <input 
            className="w-full bg-[#111] border border-gray-800 rounded-md p-2.5 pl-10 text-white outline-none focus:border-red-600 transition-all" 
            placeholder="Search by client name or website..." 
            value={searchTerm} 
            onChange={e => setSearchTerm(e.target.value)} 
          />
        </div>

        {/* Clients Table */}
        <div className="bg-[#0a0a0a] rounded-lg border border-gray-800 overflow-x-auto shadow-2xl">
          <table className="w-full text-left min-w-[800px]">
            <thead className="bg-[#1a1a1a] text-gray-400 text-sm uppercase font-bold border-b border-gray-800">
              <tr>
                <th className="p-4">Logo</th>
                <th className="p-4">Client Name</th>
                <th className="p-4">Website</th>
                <th className="p-4">Status</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-800">
              {filteredClients.length > 0 ? (
                filteredClients.map((client) => (
                  <tr key={client._id} className="hover:bg-gray-800/30 transition-colors">
                    <td className="p-4">
                      <div className="w-12 h-12 bg-white rounded p-1 flex items-center justify-center overflow-hidden">
                        <img 
                          src={client.logo?.startsWith('http') ? client.logo : `${MEDIA_BASE}${client.logo}`} 
                          alt={client.name} 
                          className="max-w-full max-h-full object-contain"
                        />
                      </div>
                    </td>
                    <td className="p-4 font-medium text-white">{client.name}</td>
                    <td className="p-4 text-blue-400 truncate max-w-[200px]">
                      <a href={client.website} target="_blank" rel="noreferrer" className="flex items-center gap-2 hover:underline text-sm">
                        <FiLink size={12}/> {client.website}
                      </a>
                    </td>
                    <td className="p-4 text-xs font-bold uppercase">
                      <span className={client.status === 'active' ? 'text-green-500' : 'text-yellow-500'}>
                        {client.status}
                      </span>
                    </td>
                    <td className="p-4 text-right">
                      <div className="flex justify-end gap-3">
                        <button onClick={() => { setCurrentClient(client); setIsFormOpen(true); }} className="text-blue-400 hover:text-blue-300 transition-colors">
                          <FiEdit2 size={18}/>
                        </button>
                        <button onClick={() => client._id && handleDelete(client._id)} className="text-red-600 hover:text-red-500 transition-colors">
                          <FiTrash2 size={18}/>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5} className="p-16 text-center text-gray-600 italic">
                    {loading ? "Syncing data..." : "No clients found."}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {isFormOpen && (
        <ClientFormModal
          initialData={currentClient}
          onClose={() => setIsFormOpen(false)}
          onSave={handleSave}
          isLoading={loading}
        />
      )}
    </div>
  );
};

// --- Modal Component ---
const ClientFormModal = ({ initialData, onClose, onSave, isLoading }: any) => {
  const [data, setData] = useState<any>(initialData || { 
    name: "", 
    website: "", 
    status: "active", 
    order: 0,
    logo: "" 
  });

  const [imageFile, setImageFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string>(
    initialData?.logo 
      ? (initialData.logo.startsWith('http') ? initialData.logo : `${MEDIA_BASE}${initialData.logo}`) 
      : ""
  );

  const handleUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const url = e.target.value;
    setData({ ...data, logo: url });
    setImageFile(null); 
    setPreview(url);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setImageFile(file);
      setPreview(URL.createObjectURL(file));
      setData({ ...data, logo: "" }); 
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData();
    Object.keys(data).forEach(key => formData.append(key, data[key]));
    if (imageFile) formData.append("logo", imageFile); 
    onSave(formData);
  };

  return (
    <div className="fixed inset-0 z-[999] flex items-center justify-center p-4 bg-black/95 backdrop-blur-sm overflow-y-auto">
      <div className="bg-[#0f0f0f] border border-red-700/30 rounded-lg w-full max-w-2xl p-6 shadow-2xl my-auto">
        <div className="flex justify-between items-center mb-6 border-b border-red-700/50 pb-3">
          <h2 className="text-xl font-bold text-white uppercase tracking-wider">{initialData ? "Update Client" : "Register Client"}</h2>
          <button onClick={onClose}><FiX className="text-gray-400 hover:text-red-500 w-6 h-6" /></button>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <label className="text-[10px] text-red-500 font-black mb-1 block uppercase">Client Name *</label>
              <input required className="w-full bg-[#1a1a1a] border border-gray-800 p-3 text-white rounded outline-none focus:border-red-600" 
                value={data.name} onChange={e => setData({...data, name: e.target.value})} placeholder="e.g. Bweld" />
            </div>
            <div>
              <label className="text-[10px] text-red-500 font-black mb-1 block uppercase">Website URL *</label>
              <input required className="w-full bg-[#1a1a1a] border border-gray-800 p-3 text-white rounded outline-none focus:border-red-600" 
                value={data.website} onChange={e => setData({...data, website: e.target.value})} placeholder="https://..." />
            </div>
          </div>

          <div className="bg-[#151515] p-4 rounded-lg border border-gray-800 space-y-4">
            <label className="block text-[10px] font-black text-red-500 uppercase">Logo Setup (URL or File)</label>
            <input 
              className="w-full bg-black border border-gray-800 p-2 text-sm text-white rounded outline-none focus:border-red-600" 
              value={data.logo} onChange={handleUrlChange} placeholder="Paste Image URL here..." 
            />
            <div className="flex items-center gap-6">
              <label className="flex-1 flex flex-col items-center justify-center bg-black border-2 border-dashed border-gray-800 hover:border-red-600 rounded-lg p-4 cursor-pointer">
                <FiUpload className="text-xl mb-1 text-red-600" />
                <span className="text-[10px] text-gray-500">Or Upload File</span>
                <input type="file" className="hidden" accept="image/*" onChange={handleFileChange} />
              </label>
              <div className="w-24 h-24 bg-white border border-red-600/30 rounded flex items-center justify-center p-2 shadow-inner">
                {preview ? <img src={preview} alt="Preview" className="max-w-full max-h-full object-contain" /> : <span className="text-[10px] text-gray-400">Empty</span>}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-5">
            <div>
              <label className="text-[10px] text-red-500 font-black mb-1 block uppercase">Display Order</label>
              <input type="number" className="w-full bg-[#1a1a1a] border border-gray-800 p-3 text-white rounded outline-none focus:border-red-600" value={data.order} onChange={e => setData({...data, order: e.target.value})} />
            </div>
            <div>
              <label className="text-[10px] text-red-500 font-black mb-1 block uppercase">Status</label>
              <select className="w-full bg-[#1a1a1a] border border-gray-800 p-3 text-white rounded outline-none focus:border-red-600" value={data.status} onChange={e => setData({...data, status: e.target.value})}>
                <option value="active">Active</option>
                <option value="draft">Draft</option>
              </select>
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-6 border-t border-gray-800/50">
            <button type="button" onClick={onClose} className="text-gray-400 font-bold px-6 py-2 hover:text-white transition-colors">CANCEL</button>
            <button disabled={isLoading} className="bg-red-600 px-10 py-3 rounded text-white font-black hover:bg-red-700 transition-all shadow-xl disabled:opacity-50 flex items-center gap-2">
              {isLoading ? <FiRefreshCw className="animate-spin"/> : (initialData ? "UPDATE" : "PUBLISH")}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ClientDashboard;