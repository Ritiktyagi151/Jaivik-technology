"use client";
import React, { useState, useEffect, useCallback } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { 
    FaSave, FaUnlock, FaLock, FaPlus, FaTrashAlt, 
    FaUserTie, FaChartLine, FaBullseye, FaInfoCircle, FaUpload, FaImage 
} from "react-icons/fa";
import { FiRefreshCw } from "react-icons/fi";
import axios from "axios";

// ✅ API URLs from Environment Variables
const API_BASE = process.env.NEXT_PUBLIC_API_URL || "";

const AdminAboutPanel: React.FC = () => {
    const [isLocked, setIsLocked] = useState(true);
    const [loading, setLoading] = useState(false);
    const [fetchError, setFetchError] = useState<string | null>(null);
    
    const { register, handleSubmit, control, reset, setValue, watch } = useForm();

    const { fields: statFields, append: appendStat, remove: removeStat } = useFieldArray({ 
        control, name: "aboutPage.stats.stats" 
    });
    const { fields: promoterFields, append: appendPromoter, remove: removePromoter } = useFieldArray({ 
        control, name: "aboutPage.promoters" 
    });

    // ✅ FETCH DATA LOGIC (using useCallback like Blog)
    const loadData = useCallback(async () => {
        try {
            setLoading(true);
            setFetchError(null);
            // Dynamic API Call
            const res = await axios.get(`${API_BASE}/about?t=${new Date().getTime()}`);
            reset(res.data);
        } catch (err: any) {
            console.error("Fetch Error:", err);
            setFetchError("Failed to load About data. Please check backend.");
        } finally {
            setLoading(false);
        }
    }, [reset]);

    useEffect(() => {
        loadData();
    }, [loadData]);

    // Image Upload Logic (Base64)
    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
        const file = e.target.files?.[0];
        if (file) {
            if (file.size > 2000000) { 
                alert("File too large! Keep it under 2MB.");
                return;
            }
            const reader = new FileReader();
            reader.onloadend = () => {
                setValue(`aboutPage.promoters.${index}.image`, reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    // ✅ SAVE DATA LOGIC
    const onSave = async (data: any) => {
        setLoading(true);
        try {
            // Dynamic API Call (Post/Update)
            await axios.post(`${API_BASE}/about`, data);
            alert("Changes Published Successfully!");
            setIsLocked(true);
            loadData(); // Refresh data
        } catch (err: any) {
            alert(err.response?.data?.message || "Error saving data");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-[#0a0a0a] text-gray-300 p-2 md:p-8">
            <div className="max-w-6xl mx-auto">
                
                {/* Error Message */}
                {fetchError && (
                    <div className="mb-6 p-4 bg-red-900/20 border border-red-600 text-red-500 rounded-xl">
                        {fetchError}
                    </div>
                )}

                {/* Fixed Action Header */}
                <div className="sticky top-4 z-50 flex flex-col md:flex-row justify-between items-center bg-[#151515]/90 backdrop-blur-md p-4 rounded-2xl border border-gray-800 shadow-2xl mb-8 gap-4">
                    <div>
                        <h1 className="text-2xl font-black text-white flex items-center gap-2 uppercase tracking-tighter">
                            <span className="bg-red-600 w-3 h-8 inline-block"></span> Control Center
                        </h1>
                        <p className="text-xs text-gray-500 font-medium">Jaivik Technology | About Page Editor</p>
                    </div>
                    
                    <div className="flex gap-3">
                        {/* Refresh Button */}
                        <button 
                            onClick={loadData} 
                            className="p-2.5 border border-gray-700 rounded-xl hover:bg-gray-800 transition-all text-white"
                        >
                            <FiRefreshCw className={loading ? "animate-spin" : ""} />
                        </button>

                        <button 
                            type="button"
                            onClick={() => setIsLocked(!isLocked)} 
                            className={`flex items-center gap-2 px-6 py-2.5 rounded-xl font-bold transition-all shadow-lg ${
                                isLocked ? 'bg-red-600 text-white hover:bg-red-700' : 'bg-gray-700 text-gray-200'
                            }`}
                        >
                            {isLocked ? <><FaUnlock /> Unlock Editor</> : <><FaLock /> Lock UI</>}
                        </button>
                        
                        {!isLocked && (
                            <button 
                                onClick={handleSubmit(onSave)} 
                                disabled={loading}
                                className="bg-green-600 px-8 py-2.5 rounded-xl text-white font-bold flex items-center gap-2 hover:bg-green-500 hover:scale-105 active:scale-95 transition-all shadow-xl disabled:opacity-50"
                            >
                                <FaSave /> {loading ? "Saving..." : "Publish Changes"}
                            </button>
                        )}
                    </div>
                </div>

                <form className={`space-y-12 ${loading ? 'opacity-50 pointer-events-none' : ''}`}>
                    
                    {/* SECTION: WHO WE ARE */}
                    <section className="bg-[#111111] p-6 rounded-3xl border border-gray-800/50 shadow-inner">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="p-3 bg-blue-600/10 rounded-lg text-blue-500"><FaInfoCircle size={20}/></div>
                            <h2 className="text-xl font-bold text-white uppercase tracking-widest">Who We Are</h2>
                        </div>
                        <div className="space-y-4">
                            <div className="group">
                                <label className="text-[10px] uppercase font-bold text-gray-500 ml-1">Main Headline</label>
                                <input {...register("aboutPage.aboutSection.title")} disabled={isLocked} className="w-full bg-black border border-gray-800 p-4 rounded-xl text-white font-bold text-lg focus:border-red-600 outline-none transition-colors" />
                            </div>
                            <div className="grid md:grid-cols-2 gap-4">
                                <textarea {...register("aboutPage.aboutSection.content.0")} disabled={isLocked} className="w-full bg-black border border-gray-800 p-4 rounded-xl h-32 focus:border-red-600 outline-none" placeholder="First paragraph..." />
                                <textarea {...register("aboutPage.aboutSection.content.1")} disabled={isLocked} className="w-full bg-black border border-gray-800 p-4 rounded-xl h-32 focus:border-red-600 outline-none" placeholder="Second paragraph..." />
                            </div>
                        </div>
                    </section>

                    {/* SECTION: MISSION & VISION */}
                    <div className="grid md:grid-cols-2 gap-8">
                        {['mission', 'vision'].map((type) => (
                            <section key={type} className="bg-[#111] p-6 rounded-3xl border border-gray-800">
                                <h3 className="text-red-600 font-black uppercase mb-4 flex items-center gap-2 tracking-tighter italic">
                                    <FaBullseye /> Our {type}
                                </h3>
                                <div className="space-y-4">
                                    <input {...register(`aboutPage.missionVision.${type}.title`)} disabled={isLocked} className="w-full bg-black border border-gray-800 p-3 rounded-lg text-white font-bold" />
                                    <textarea {...register(`aboutPage.missionVision.${type}.content`)} disabled={isLocked} className="w-full bg-black border border-gray-800 p-3 rounded-lg h-40 text-sm leading-relaxed" />
                                </div>
                            </section>
                        ))}
                    </div>

                    {/* SECTION: IMPACT NUMBERS */}
                    <section className="bg-[#111] p-6 rounded-3xl border border-gray-800">
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="font-bold text-white flex items-center gap-2 uppercase tracking-widest text-sm"><FaChartLine className="text-green-500" /> Key Impact Numbers</h2>
                            {!isLocked && (
                                <button type="button" onClick={() => appendStat({ value: 0, label: "", dataId: "" })} className="px-4 py-1.5 bg-green-600/10 text-green-500 rounded-full text-xs font-bold hover:bg-green-600 hover:text-white transition-all">+ New Metric</button>
                            )}
                        </div>
                        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                            {statFields.map((field, index) => (
                                <div key={field.id} className="bg-black p-5 rounded-2xl border border-gray-800 relative group">
                                    <input type="number" {...register(`aboutPage.stats.stats.${index}.value`)} disabled={isLocked} className="w-full bg-transparent text-3xl font-black text-red-600 outline-none" />
                                    <input {...register(`aboutPage.stats.stats.${index}.label`)} disabled={isLocked} className="w-full bg-transparent text-gray-500 text-[10px] font-bold uppercase tracking-wider outline-none" placeholder="Label (e.g. Clients)" />
                                    {!isLocked && <button type="button" onClick={() => removeStat(index)} className="absolute top-2 right-2 text-gray-800 hover:text-red-500 transition-colors"><FaTrashAlt size={14}/></button>}
                                </div>
                            ))}
                        </div>
                    </section>

                    {/* SECTION: OUR LEADERS */}
                    <section className="bg-[#111] p-6 rounded-3xl border border-gray-800">
                        <div className="flex justify-between items-center mb-8 border-b border-gray-800 pb-4">
                            <h2 className="font-bold text-white flex items-center gap-2 uppercase tracking-widest text-sm"><FaUserTie className="text-red-600" /> Leadership Board</h2>
                            {!isLocked && (
                                <button type="button" onClick={() => appendPromoter({ name: "", role: "", image: "", bio: [""], companies: [] })} className="bg-red-600 text-white px-6 py-2 rounded-xl text-xs font-bold shadow-lg hover:scale-105 transition-all">Add New Leader</button>
                            )}
                        </div>
                        
                        <div className="grid lg:grid-cols-2 gap-8">
                            {promoterFields.map((field, index) => (
                                <div key={field.id} className="bg-black/40 p-8 rounded-[2rem] border border-gray-800 relative shadow-2xl">
                                    <div className="flex flex-col sm:flex-row gap-6 mb-6">
                                        <div className="relative group/img mx-auto">
                                            <div className="w-32 h-32 bg-gray-900 rounded-2xl overflow-hidden border-2 border-red-600/30 flex items-center justify-center">
                                                {watch(`aboutPage.promoters.${index}.image`) ? (
                                                    <img src={watch(`aboutPage.promoters.${index}.image`)} className="w-full h-full object-cover" />
                                                ) : <FaImage size={30} className="text-gray-800" />}
                                            </div>
                                            {!isLocked && (
                                                <label className="absolute -bottom-2 -right-2 bg-red-600 p-2.5 rounded-xl cursor-pointer shadow-xl hover:bg-red-500 transition-all">
                                                    <FaUpload size={12} className="text-white"/>
                                                    <input type="file" className="hidden" accept="image/*" onChange={(e) => handleImageUpload(e, index)} />
                                                </label>
                                            )}
                                        </div>
                                        <div className="flex-1 space-y-3">
                                            <input {...register(`aboutPage.promoters.${index}.name`)} disabled={isLocked} className="w-full bg-transparent text-2xl font-black text-white outline-none placeholder:text-gray-800" placeholder="Leader Full Name" />
                                            <input {...register(`aboutPage.promoters.${index}.role`)} disabled={isLocked} className="w-full bg-transparent text-sm text-red-600 font-bold uppercase tracking-widest outline-none" placeholder="Designation" />
                                            <input {...register(`aboutPage.promoters.${index}.image`)} disabled={isLocked} className="w-full bg-black/50 border border-gray-800 p-2 rounded text-[9px] text-gray-500 outline-none" placeholder="Direct Image URL (Optional)" />
                                        </div>
                                    </div>

                                    <div className="space-y-4">
                                        <textarea {...register(`aboutPage.promoters.${index}.bio.0`)} disabled={isLocked} className="w-full bg-black border border-gray-800 p-4 rounded-2xl h-32 text-sm leading-relaxed outline-none focus:border-red-900" placeholder="Professional Biography..." />
                                        <div className="p-4 bg-black/50 rounded-2xl border border-gray-800">
                                            <label className="text-[10px] font-bold text-gray-600 uppercase mb-2 block tracking-widest font-mono">Experience History</label>
                                            <input 
                                                placeholder="e.g. Dell, Airtel, Tata (Comma separated)" 
                                                className="w-full bg-transparent text-xs text-red-500 outline-none" 
                                                defaultValue={watch(`aboutPage.promoters.${index}.companies`)?.join(", ")}
                                                onChange={(e) => setValue(`aboutPage.promoters.${index}.companies`, e.target.value.split(",").map(s => s.trim()))}
                                                disabled={isLocked}
                                            />
                                        </div>
                                    </div>

                                    {!isLocked && (
                                        <button type="button" onClick={() => removePromoter(index)} className="absolute top-4 right-4 text-gray-800 hover:text-red-500 transition-all p-2 bg-black rounded-lg border border-gray-800"><FaTrashAlt size={14}/></button>
                                    )}
                                </div>
                            ))}
                        </div>
                    </section>

                </form>
            </div>
        </div>
    );
};

export default AdminAboutPanel;