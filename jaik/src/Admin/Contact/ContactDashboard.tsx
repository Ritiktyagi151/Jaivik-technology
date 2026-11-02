"use client";

import { useEffect, useMemo, useState } from "react";

type ContactStatus = "new" | "read" | "replied" | "closed";

interface ContactItem {
  _id: string;
  name: string;
  email: string;
  phone?: string;
  subject?: string;
  message: string;
  preferredDate?: string;
  preferredTime?: string;
  location?: string;
  sourcePage?: string;
  createdAt: string;
  status?: ContactStatus;
}

const API_BASE = process.env.NEXT_PUBLIC_API_URL || "";

const ContactDashboard = () => {
  const [items, setItems] = useState<ContactItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const load = async () => {
      try {
        if (!API_BASE) {
          throw new Error("API URL missing. Set NEXT_PUBLIC_API_URL.");
        }

        const token = typeof window !== "undefined" ? localStorage.getItem("admin-auth") : null;
        if (!token) {
          throw new Error("Admin auth token missing. Please login again.");
        }

        const res = await fetch(`${API_BASE}/contact`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        const data = await res.json();
        if (!res.ok || !data?.success) {
          throw new Error(data?.message || "Failed to fetch contact enquiries.");
        }

        setItems(Array.isArray(data.data) ? data.data : []);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to load contacts.");
      } finally {
        setLoading(false);
      }
    };

    load();
  }, []);

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return items;
    return items.filter((item) =>
      [item.name, item.email, item.phone, item.subject, item.message, item.sourcePage]
        .filter(Boolean)
        .some((value) => String(value).toLowerCase().includes(q))
    );
  }, [items, search]);

  return (
    <div className="min-h-screen bg-black text-white p-4 md:p-6">
      <div className="bg-gray-900 border border-gray-800 rounded-lg p-4 md:p-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 mb-4">
          <h1 className="text-2xl font-bold">
            <span className="text-red-600">Contact</span> Enquiries
          </h1>
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search name, email, phone, message"
            className="px-3 py-2 bg-gray-800 border border-gray-700 rounded-md text-sm w-full md:w-96"
          />
        </div>

        {loading && <p className="text-gray-400">Loading enquiries...</p>}
        {error && <p className="text-red-500">{error}</p>}

        {!loading && !error && (
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm">
              <thead>
                <tr className="border-b border-gray-700 text-left text-gray-300">
                  <th className="py-2 pr-3">Name</th>
                  <th className="py-2 pr-3">Email</th>
                  <th className="py-2 pr-3">Phone</th>
                  <th className="py-2 pr-3">Subject</th>
                  <th className="py-2 pr-3">Message</th>
                  <th className="py-2 pr-3">Date & Time</th>
                  <th className="py-2 pr-3">Meeting Slot</th>
                  <th className="py-2 pr-3">Source</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((item) => (
                  <tr key={item._id} className="border-b border-gray-800 align-top">
                    <td className="py-2 pr-3">{item.name}</td>
                    <td className="py-2 pr-3">{item.email}</td>
                    <td className="py-2 pr-3">{item.phone || "-"}</td>
                    <td className="py-2 pr-3">{item.subject || "-"}</td>
                    <td className="py-2 pr-3 max-w-sm break-words">{item.message}</td>
                    <td className="py-2 pr-3">{new Date(item.createdAt).toLocaleString()}</td>
                    <td className="py-2 pr-3">{item.preferredDate || "-"} {item.preferredTime || ""} {item.location ? `(${item.location})` : ""}</td>
                    <td className="py-2 pr-3">{item.sourcePage || "contact-us"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            {filtered.length === 0 && <p className="text-gray-400 py-4">No enquiries found.</p>}
          </div>
        )}
      </div>
    </div>
  );
};

export default ContactDashboard;
