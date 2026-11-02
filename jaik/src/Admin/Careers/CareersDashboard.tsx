"use client";

import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { FaTrash, FaPlus, FaFileDownload, FaUserTie, FaBriefcase, FaEnvelope, FaPhone } from "react-icons/fa";

// ✅ API URL from environment (e.g., http://localhost:5000/api)
const API_URL = process.env.NEXT_PUBLIC_API_URL || "";

const AdminCareerPanel: React.FC = () => {
  const [activeTab, setActiveTab] = useState<"apps" | "jobs">("apps");
  const [applications, setApplications] = useState<any[]>([]);
  const [jobs, setJobs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [newJob, setNewJob] = useState({ title: "", experience: "" });

  // ✅ Fetch Data according to /api/careers routes
  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      // Backend routes: /api/careers/admin/apps and /api/careers/jobs
      const [resApps, resJobs] = await Promise.all([
        axios.get(`${API_URL}/careers/admin/apps`),
        axios.get(`${API_URL}/careers/jobs`)
      ]);

      setApplications(resApps.data.data || []);
      setJobs(resJobs.data.data || []);
    } catch (err) {
      console.error("Fetch failed:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  // ✅ Add Job: Path matched to /api/careers/jobs
  const handleAddJob = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newJob.title || !newJob.experience) return alert("Please fill all fields");

    try {
      const response = await axios.post(`${API_URL}/careers/jobs`, newJob);
      if (response.data.success) {
        setNewJob({ title: "", experience: "" });
        fetchData();
        alert("Job opening added successfully!");
      }
    } catch (err) {
      alert("Error adding job opening. Check console for details.");
      console.error(err);
    }
  };

  // ✅ Delete Job: Path matched to /api/careers/jobs/:id
  const deleteJob = async (id: string) => {
    if (window.confirm("Are you sure you want to delete this job opening?")) {
      try {
        await axios.delete(`${API_URL}/careers/jobs/${id}`);
        fetchData();
      } catch (err) {
        alert("Failed to delete the job");
      }
    }
  };

  return (
    <div className="min-h-screen bg-black text-white p-4 md:p-8">
      {/* Header Tabs */}
      <div className="flex flex-wrap gap-4 mb-8 border-b border-zinc-800 pb-4">
        <button 
          onClick={() => setActiveTab("apps")} 
          className={`px-6 py-2 rounded-lg flex items-center gap-2 transition ${activeTab === 'apps' ? 'bg-red-600 shadow-lg shadow-red-900/20' : 'bg-zinc-900 hover:bg-zinc-800'}`}
        >
          <FaUserTie /> Applications ({applications.length})
        </button>
        <button 
          onClick={() => setActiveTab("jobs")} 
          className={`px-6 py-2 rounded-lg flex items-center gap-2 transition ${activeTab === 'jobs' ? 'bg-red-600 shadow-lg shadow-red-900/20' : 'bg-zinc-900 hover:bg-zinc-800'}`}
        >
          <FaBriefcase /> Manage Jobs
        </button>
      </div>

      {loading ? (
        <div className="flex justify-center items-center py-20 text-red-600 animate-pulse text-xl font-bold">
          FETCHING DATA...
        </div>
      ) : activeTab === "apps" ? (
        /* --- Applications List --- */
        <div className="grid grid-cols-1 gap-4">
          {applications.length > 0 ? applications.map((app) => (
            <div key={app._id} className="bg-zinc-900 p-5 rounded-xl flex flex-col md:flex-row justify-between items-start md:items-center border border-zinc-800 hover:border-red-600/50 transition-all">
              <div className="space-y-1">
                <h3 className="text-lg font-bold text-white">{app.name}</h3>
                <p className="text-red-500 font-bold text-sm uppercase">{app.position}</p>
                <div className="flex flex-wrap gap-4 text-xs text-gray-400 mt-2">
                  <span className="flex items-center gap-1"><FaEnvelope className="text-red-600"/> {app.email}</span>
                  <span className="flex items-center gap-1"><FaPhone className="text-red-600"/> {app.phone}</span>
                </div>
              </div>
              
              <div className="mt-4 md:mt-0">
                <a 
                  href={`${process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:5000"}${app.resumeUrl}`} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="bg-zinc-800 hover:bg-red-600 text-white px-5 py-2 rounded-lg flex items-center gap-2 transition-all text-sm font-bold shadow-md"
                >
                  <FaFileDownload /> VIEW RESUME
                </a>
              </div>
            </div>
          )) : (
            <div className="text-center py-20 text-zinc-500 border-2 border-dashed border-zinc-800 rounded-xl">
              No applications received yet.
            </div>
          )}
        </div>
      ) : (
        /* --- Manage Jobs Section --- */
        <div className="max-w-4xl mx-auto">
          <form onSubmit={handleAddJob} className="bg-zinc-900 p-6 rounded-xl border border-zinc-800 mb-8 flex flex-col md:flex-row gap-4 shadow-xl">
            <input 
              value={newJob.title} 
              onChange={e => setNewJob({...newJob, title: e.target.value})} 
              placeholder="Job Title (e.g. React Developer)" 
              className="bg-black border border-zinc-700 p-3 rounded-lg w-full focus:border-red-600 outline-none transition-all" 
            />
            <input 
              value={newJob.experience} 
              onChange={e => setNewJob({...newJob, experience: e.target.value})} 
              placeholder="Experience (e.g. 3+ Years)" 
              className="bg-black border border-zinc-700 p-3 rounded-lg w-full focus:border-red-600 outline-none transition-all" 
            />
            <button type="submit" className="bg-red-600 hover:bg-red-700 px-8 py-3 rounded-lg font-bold flex items-center justify-center gap-2 transition-all">
              <FaPlus /> PUBLISH
            </button>
          </form>

          <div className="space-y-3">
            <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
              <div className="w-2 h-6 bg-red-600"></div> Active Openings
            </h2>
            {jobs.map(job => (
              <div key={job._id} className="bg-zinc-900 p-4 rounded-xl flex justify-between items-center border border-zinc-800 hover:border-zinc-700 transition-all">
                <div>
                  <h4 className="font-bold text-white text-lg">{job.title}</h4>
                  <p className="text-sm text-gray-500 font-medium italic">Requirement: {job.experience}</p>
                </div>
                <button 
                  onClick={() => deleteJob(job._id)} 
                  className="p-3 text-zinc-500 hover:text-red-500 hover:bg-red-500/10 rounded-lg transition-all"
                  title="Remove Job"
                >
                  <FaTrash />
                </button>
              </div>
            ))}
            {jobs.length === 0 && <p className="text-zinc-500 text-center py-10">No active job openings available.</p>}
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminCareerPanel;