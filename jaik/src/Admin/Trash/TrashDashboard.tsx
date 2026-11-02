"use client";

import { useCallback, useEffect, useState } from "react";
import { RotateCcw, Trash2 } from "lucide-react";

const API_URL = `${process.env.NEXT_PUBLIC_API_URL || ""}/trash`;

type TrashEntry = {
  _id: string;
  modelName: string;
  label: string;
  deletedAt: string;
};

const TrashDashboard = () => {
  const [items, setItems] = useState<TrashEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [busyId, setBusyId] = useState("");

  const loadItems = useCallback(async () => {
    const token = localStorage.getItem("admin-auth");
    if (!token) {
      setError("Admin login required.");
      setLoading(false);
      return;
    }

    try {
      const response = await fetch(API_URL, {
        cache: "no-store",
        headers: { Authorization: `Bearer ${token}` },
      });
      const result = await response.json();
      if (!response.ok) throw new Error(result.message || "Could not load trash.");
      setItems(result.data || []);
      setError("");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not load trash.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void loadItems();
  }, [loadItems]);

  const updateItem = async (id: string, action: "restore" | "permanent") => {
    if (action === "permanent" && !window.confirm("Permanently delete this item? This cannot be undone.")) return;
    const token = localStorage.getItem("admin-auth");
    if (!token) return;

    setBusyId(id);
    setError("");
    try {
      const response = await fetch(
        `${API_URL}/${id}${action === "restore" ? "/restore" : ""}`,
        {
          method: action === "restore" ? "POST" : "DELETE",
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      const result = await response.json();
      if (!response.ok) throw new Error(result.message || "Action failed.");
      setItems((current) => current.filter((item) => item._id !== id));
    } catch (err) {
      setError(err instanceof Error ? err.message : "Action failed.");
    } finally {
      setBusyId("");
    }
  };

  return (
    <section className="min-h-full bg-black p-4 text-gray-100 sm:p-8">
      <div className="mx-auto max-w-6xl">
        <div className="mb-6 flex items-center gap-3">
          <Trash2 className="text-red-400" />
          <div>
            <h1 className="text-2xl font-bold">Trash</h1>
            <p className="text-sm text-gray-400">Restore deleted content or permanently remove it.</p>
          </div>
        </div>

        {error && <p role="alert" className="mb-4 rounded-lg border border-red-900 bg-red-950/40 p-3 text-red-300">{error}</p>}
        {loading ? (
          <p className="text-gray-400">Loading trash…</p>
        ) : items.length === 0 ? (
          <div className="rounded-xl border border-gray-800 bg-zinc-950 p-8 text-center text-gray-400">Trash is empty.</div>
        ) : (
          <div className="space-y-3">
            {items.map((item) => (
              <article key={item._id} className="flex flex-col gap-4 rounded-xl border border-gray-800 bg-zinc-950 p-4 sm:flex-row sm:items-center sm:justify-between">
                <div className="min-w-0">
                  <h2 className="truncate font-semibold text-white">{item.label}</h2>
                  <p className="mt-1 text-sm text-gray-400">
                    {item.modelName} · Deleted {new Date(item.deletedAt).toLocaleString()}
                  </p>
                </div>
                <div className="flex shrink-0 gap-2">
                  <button
                    type="button"
                    disabled={busyId === item._id}
                    onClick={() => void updateItem(item._id, "restore")}
                    className="inline-flex items-center gap-2 rounded-lg bg-emerald-700 px-3 py-2 text-sm font-medium text-white hover:bg-emerald-600 disabled:opacity-50"
                  >
                    <RotateCcw size={16} /> Restore
                  </button>
                  <button
                    type="button"
                    disabled={busyId === item._id}
                    onClick={() => void updateItem(item._id, "permanent")}
                    className="inline-flex items-center gap-2 rounded-lg bg-red-800 px-3 py-2 text-sm font-medium text-white hover:bg-red-700 disabled:opacity-50"
                  >
                    <Trash2 size={16} /> Delete forever
                  </button>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default TrashDashboard;
