"use client";
import React, { useState, useEffect, useCallback } from "react";
import { 
  FaEdit, FaSave, FaTimes, FaPlus, FaTrash, FaEnvelope, FaPhone 
} from "react-icons/fa";
import { FiRefreshCw } from "react-icons/fi";
import axios from "axios";

// Environment Variable for API
const API_BASE = process.env.NEXT_PUBLIC_API_URL || "";
const API_URL = `${API_BASE}/footer`;
const FOOTER_EMAIL = "";

type Office = {
  label: string;
  address: string;
};

type FooterData = {
  description: string;
  socials: Record<string, string>;
  contacts: {
    offices: Office[];
    email: string;
    phones: string[];
  };
  copyright: string;
};

const AdminFooterPanel = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<FooterData | null>(null);
  const [tempData, setTempData] = useState<FooterData | null>(null);
  
  // Sections toggle state
  const [isEditing, setIsEditing] = useState({
    desc: false,
    social: false,
    contact: false
  });

  // ✅ FETCH DATA FROM BACKEND
  const loadFooter = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const res = await axios.get(`${API_URL}?t=${new Date().getTime()}`);
      
      // Checking for common response wrappers
      const backendData = res.data?.data || res.data;
      
      // ✅ Mapping Backend Schema to UI
      const normalized: FooterData = {
        description: backendData?.description || "",
        socials: backendData?.socials || {},
        contacts: {
          offices: backendData?.contacts?.offices || [],
          email: backendData?.contacts?.email || FOOTER_EMAIL,
          phones: backendData?.contacts?.phones || []
        },
        copyright: backendData?.copyright || "© 2016 All Rights Reserved"
      };
      
      setData(normalized);
      setTempData(normalized);
    } catch (err) {
      console.error("API Fetch Error:", err);
      setError("Database connection failed.");
    } finally { setLoading(false); }
  }, []);

  useEffect(() => { loadFooter(); }, [loadFooter]);

  // ✅ SAVE DATA TO BACKEND
  const handleSave = async (sectionKey: string) => {
    if (!tempData) return;

    try {
      setLoading(true);
      // Sending the complete tempData object to the PUT endpoint
      await axios.put(API_URL, tempData);
      
      setData(JSON.parse(JSON.stringify(tempData))); 
      setIsEditing({ ...isEditing, [sectionKey as keyof typeof isEditing]: false });
      alert("Footer updated successfully!");
    } catch {
        alert("Update failed! Please check backend console."); 
    } finally { setLoading(false); }
  };

  // ✅ Dynamic Field Logic
  const addOffice = () => {
    if (!tempData) return;
    const copy = { ...tempData };
    copy.contacts.offices.push({ label: "Office Title", address: "" });
    setTempData(copy);
  };

  const removeOffice = (index: number) => {
    if (!tempData) return;
    const copy = { ...tempData };
    copy.contacts.offices.splice(index, 1);
    setTempData(copy);
  };

  const addPhone = () => {
    if (!tempData) return;
    const copy = { ...tempData };
    copy.contacts.phones.push("");
    setTempData(copy);
  };

  const removePhone = (index: number) => {
    if (!tempData) return;
    const copy = { ...tempData };
    copy.contacts.phones.splice(index, 1);
    setTempData(copy);
  };

  // Loading Guard
  if (!tempData || !data) return (
    <div className="min-h-screen bg-black flex items-center justify-center">
      <div className="text-red-600 font-bold animate-pulse flex items-center gap-2 uppercase">
        <FiRefreshCw className="animate-spin" /> Fetching Database...
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#050505] text-gray-300 p-4 md:p-10 font-sans">
      <div className="max-w-4xl mx-auto space-y-8">
        
        <header className="flex justify-between items-center border-l-4 border-red-600 pl-4 mb-10">
          <div>
            <h1 className="text-3xl font-black text-white uppercase italic tracking-tighter">Footer Dashboard</h1>
            <p className="text-gray-500 text-xs mt-1 uppercase tracking-widest">Live API Control</p>
          </div>
          <button onClick={loadFooter} className="p-2 border border-gray-800 rounded hover:bg-gray-900 transition-all shadow-lg">
             <FiRefreshCw className={loading ? "animate-spin text-red-600" : "text-white"} />
          </button>
        </header>

        {error && <div className="p-4 bg-red-900/20 border border-red-600 text-red-500 rounded-xl mb-6">{error}</div>}

        {/* --- 1. BRAND DESCRIPTION --- */}
        <Section title="Intro & Description" active={isEditing.desc} onEdit={() => setIsEditing({...isEditing, desc: true})} onSave={() => handleSave('desc')} onCancel={() => {setTempData(data); setIsEditing({...isEditing, desc: false})}}>
          {isEditing.desc ? (
            <textarea className="w-full bg-black border border-gray-800 p-4 rounded-xl h-32 outline-none focus:border-red-600 transition-all text-sm" value={tempData.description} onChange={e => setTempData({...tempData, description: e.target.value})} />
          ) : <p className="text-gray-400 italic text-sm leading-relaxed">"{data.description}"</p>}
        </Section>

        {/* --- 2. SOCIAL MEDIA LINKS --- */}
        <Section title="Social Media Presence" active={isEditing.social} onEdit={() => setIsEditing({...isEditing, social: true})} onSave={() => handleSave('social')} onCancel={() => {setTempData(data); setIsEditing({...isEditing, social: false})}}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {['facebook', 'instagram', 'twitter', 'youtube', 'linkedin'].map((plat) => (
              <div key={plat} className="flex items-center gap-3 bg-black/40 p-3 rounded-lg border border-gray-800 hover:border-red-600/30 transition-all">
                <span className="text-red-600 uppercase text-[10px] font-bold w-20 tracking-tighter">{plat}</span>
                {isEditing.social ? (
                  <input className="flex-1 bg-transparent border-b border-gray-800 outline-none text-xs py-1 text-white" value={tempData.socials[plat] || ""} onChange={e => setTempData({...tempData, socials: {...tempData.socials, [plat]: e.target.value}})} />
                ) : <span className="text-xs text-gray-500 truncate">{data.socials[plat] || "Empty"}</span>}
              </div>
            ))}
          </div>
        </Section>

        {/* --- 3. CONTACTS & GET IN TOUCH --- */}
        <Section title="Get In Touch (Offices, Email, Phones)" active={isEditing.contact} onEdit={() => setIsEditing({...isEditing, contact: true})} onSave={() => handleSave('contact')} onCancel={() => {setTempData(data); setIsEditing({...isEditing, contact: false})}}>
          <div className="space-y-8">
            <div className="space-y-4">
              <div className="flex justify-between items-center mb-2">
                <label className="text-[10px] font-bold text-red-600 uppercase tracking-widest">Office Locations</label>
                {isEditing.contact && <button onClick={addOffice} className="bg-green-600/10 text-green-500 px-3 py-1 rounded text-[10px] flex items-center gap-1 hover:bg-green-600 hover:text-white transition-all"><FaPlus/> NEW OFFICE</button>}
              </div>
              {tempData.contacts.offices.map((off, i) => (
                <div key={i} className="bg-black/60 p-4 rounded-xl border border-gray-800 relative group">
                  {isEditing.contact ? (
                    <div className="space-y-3">
                      <input className="w-full bg-transparent border-b border-gray-800 text-[10px] font-bold text-red-500 outline-none uppercase" placeholder="LABEL (e.g. Noida HQ)" value={off.label} onChange={e => {
                        const copy = { ...tempData };
                        copy.contacts.offices[i].label = e.target.value;
                        setTempData(copy);
                      }} />
                      <textarea className="w-full bg-transparent text-sm outline-none text-white" placeholder="ADDRESS" value={off.address} onChange={e => {
                        const copy = { ...tempData };
                        copy.contacts.offices[i].address = e.target.value;
                        setTempData(copy);
                      }} />
                      <button onClick={() => removeOffice(i)} className="absolute top-4 right-4 text-gray-700 hover:text-red-500"><FaTrash size={12}/></button>
                    </div>
                  ) : <div className="text-sm"><strong className="text-red-600 block text-[10px] uppercase tracking-widest mb-1">{off.label}</strong><span className="text-gray-300">{off.address}</span></div>}
                </div>
              ))}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-6 border-t border-gray-800">
                <div>
                   <label className="text-[10px] font-bold text-red-600 uppercase tracking-widest block mb-2">Primary Email</label>
                   {isEditing.contact ? (
                     <input className="w-full bg-black border border-gray-800 p-2 rounded text-xs outline-none focus:border-red-600" value={tempData.contacts.email} onChange={e => setTempData({...tempData, contacts: {...tempData.contacts, email: e.target.value}})} />
                   ) : <p className="text-xs text-gray-400 flex items-center gap-2"><FaEnvelope className="text-red-600"/> {data.contacts.email}</p>}
                </div>
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <label className="text-[10px] font-bold text-red-600 uppercase tracking-widest">Phones</label>
                    {isEditing.contact && <button onClick={addPhone} className="text-[10px] text-green-500 font-bold hover:underline">+ NEW</button>}
                  </div>
                  {tempData.contacts.phones.map((phone: string, i: number) => (
                    <div key={i} className="flex gap-2 items-center mb-2">
                      {isEditing.contact ? (
                        <>
                          <input className="flex-1 bg-black border border-gray-800 p-2 rounded text-xs outline-none focus:border-red-600 text-white" value={phone} onChange={e => {
                            const copy = { ...tempData };
                            copy.contacts.phones[i] = e.target.value;
                            setTempData(copy);
                          }} />
                          <button onClick={() => removePhone(i)} className="text-red-600"><FaTrash size={12}/></button>
                        </>
                      ) : <span className="text-xs text-gray-400 flex items-center gap-2"><FaPhone size={10} className="text-red-600"/> {phone}</span>}
                    </div>
                  ))}
                </div>
            </div>
          </div>
        </Section>
      </div>
    </div>
  );
};

type SectionProps = {
  title: string;
  children: React.ReactNode;
  active: boolean;
  onEdit: () => void;
  onSave: () => void;
  onCancel: () => void;
};

const Section = ({ title, children, active, onEdit, onSave, onCancel }: SectionProps) => (
  <div className={`bg-[#0d0d0d] border ${active ? 'border-red-600/50 shadow-[0_0_30px_rgba(220,38,38,0.05)]' : 'border-gray-900'} rounded-2xl overflow-hidden transition-all duration-300`}>
    <div className="px-6 py-4 bg-[#121212] flex justify-between items-center border-b border-gray-900 shadow-inner">
      <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-white/70">{title}</h3>
      <div className="flex gap-2">
        {active ? (
          <>
            <button onClick={onSave} className="p-2 bg-green-600 text-white rounded-lg hover:bg-green-700 shadow-lg transition-transform active:scale-90"><FaSave size={14}/></button>
            <button onClick={onCancel} className="p-2 bg-gray-800 text-white rounded-lg hover:bg-gray-700 shadow-lg transition-transform active:scale-90"><FaTimes size={14}/></button>
          </>
        ) : (
          <button onClick={onEdit} className="flex items-center gap-2 px-5 py-2 bg-red-600 text-white rounded-full text-[10px] font-black uppercase shadow-lg hover:bg-red-700 transition-all hover:scale-105 active:scale-95">
            <FaEdit /> Modify
          </button>
        )}
      </div>
    </div>
    <div className="p-6">{children}</div>
  </div>
);

export default AdminFooterPanel;
