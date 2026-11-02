"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import TestimonialTable from "./TestimonialTable";
import TestimonialForm from "./TestimonialForm";
import type { Testimonial, TestimonialFormData } from "./testimonial";

// ✅ API URL from environment
const API_URL = `${process.env.NEXT_PUBLIC_API_URL || ""}/testimonial-videos`;

const TestimonialDashboard = () => {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [editingTestimonial, setEditingTestimonial] = useState<Testimonial | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(true);

  const fetchTestimonials = async () => {
    try {
      setLoading(true);
      const response = await axios.get(API_URL);
      
      // ✅ Handle both formats: { success: true, data: [] } OR just []
      const rawData = response.data.data || response.data;
      
      if (Array.isArray(rawData)) {
        const formattedData = rawData.map((t: any) => ({
          ...t,
          id: t._id || t.id,
        }));
        setTestimonials(formattedData);
      }
    } catch (error) {
      console.error("Fetch failed:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTestimonials();
  }, []);

  // 2. Create Testimonial
  const handleCreate = async (formData: TestimonialFormData) => {
    try {
      // ✅ Important: Check if your form is sending Files or simple Strings
      // If uploading files, we need to use FormData
      const response = await axios.post(API_URL, formData);
      
      const result = response.data.data || response.data;

      if (result) {
        const newEntry = { ...result, id: result._id || result.id };
        setTestimonials((prev) => [newEntry, ...prev]);
        setShowForm(false);
        alert("Added Successfully!");
      }
    } catch (error: any) {
      console.error("Creation failed:", error.response?.data || error.message);
      alert(`Error: ${error.response?.data?.message || "Something went wrong"}`);
    }
  };

  // 3. Update Testimonial
  const handleUpdate = async (id: string, formData: TestimonialFormData) => {
    try {
      const response = await axios.put(`${API_URL}/${id}`, formData);
      const result = response.data.data || response.data;

      if (result) {
        const updatedEntry = { ...result, id: result._id || result.id };
        setTestimonials((prev) =>
          prev.map((t) => (t.id === id ? updatedEntry : t))
        );
        setEditingTestimonial(null);
        setShowForm(false);
        alert("Updated Successfully!");
      }
    } catch (error: any) {
      console.error("Update failed:", error.response?.data || error.message);
      alert("Failed to update");
    }
  };

  // 4. Delete Testimonial
  const handleDelete = async (id: string) => {
    if (window.confirm("Are you sure you want to delete this testimonial?")) {
      try {
        await axios.delete(`${API_URL}/${id}`);
        setTestimonials((prev) => prev.filter((t) => t.id !== id));
      } catch (error) {
        console.error("Delete failed:", error);
      }
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-4">
          <h2 className="text-2xl font-bold">Testimonials</h2>
          <span className="bg-blue-600 text-white px-3 py-1 rounded-full text-sm">
            Total: {loading ? "..." : testimonials.length}
          </span>
        </div>
        <button
          onClick={() => {
            setShowForm(!showForm);
            setEditingTestimonial(null);
          }}
          className={`px-4 py-2 rounded-md ${
            showForm ? "bg-gray-600" : "bg-blue-600"
          } text-white`}
        >
          {showForm ? "Cancel" : "Add Testimonial"}
        </button>
      </div>

      {(showForm || editingTestimonial) && (
        <div className="bg-gray-900 p-6 rounded-lg border border-blue-500 mb-8">
          <TestimonialForm
            onSubmit={
              editingTestimonial
                ? (data) => handleUpdate(editingTestimonial.id, data)
                : handleCreate
            }
            initialData={editingTestimonial || undefined}
            onCancel={() => {
              setEditingTestimonial(null);
              setShowForm(false);
            }}
          />
        </div>
      )}

      <div className="bg-gray-900 p-6 rounded-lg border border-blue-500 shadow-xl">
        {loading ? (
          <div className="text-center py-20 text-white animate-pulse">Loading...</div>
        ) : (
          <TestimonialTable
            testimonials={testimonials}
            onEdit={(t) => {
              setEditingTestimonial(t);
              setShowForm(true);
            }}
            onDelete={handleDelete}
          />
        )}
      </div>
    </div>
  );
};

export default TestimonialDashboard;