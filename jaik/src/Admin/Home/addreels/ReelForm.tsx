"use client";

import { useState, useEffect, useRef } from "react";
import type { ReelFormData } from "./reel";

interface ReelFormProps {
  onSubmit: (data: ReelFormData) => void;
  initialData?: ReelFormData;
  onCancel: () => void;
}

const ReelForm = ({ onSubmit, initialData, onCancel }: ReelFormProps) => {
  const [formData, setFormData] = useState<ReelFormData>({
    video: "",
    poster: "",
    company: "",
  });
  const videoInputRef = useRef<HTMLInputElement>(null);
  const posterInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (initialData) {
      setFormData({
        video: initialData.video || "",
        poster: initialData.poster || "",
        company: initialData.company || "",
      });
    }
  }, [initialData]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    type: "video" | "poster"
  ) => {
    const file = e.target.files?.[0];
    if (file) {
      // Here you would typically upload the file to your server
      // and get the URL, but for now we'll just use a local URL
      const fileUrl = URL.createObjectURL(file);
      setFormData((prev) => ({ ...prev, [type]: fileUrl }));
    }
  };

  const triggerFileInput = (type: "video" | "poster") => {
    if (type === "video" && videoInputRef.current) {
      videoInputRef.current.click();
    } else if (type === "poster" && posterInputRef.current) {
      posterInputRef.current.click();
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      ...formData,
      video: formData.video.trim(),
      poster: formData.poster?.trim() || undefined,
      company: formData.company?.trim() || undefined,
    });
    if (!initialData) {
      setFormData({ video: "", poster: "", company: "" }); // Reset form after create
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Video URL
        </label>
        <div className="flex space-x-2">
          <input
            type="text"
            name="video"
            value={formData.video}
            onChange={handleChange}
            className="flex-1 px-3 py-2 border border-gray-300 rounded-md shadow-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            required
          />
          <button
            type="button"
            onClick={() => triggerFileInput("video")}
            className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500"
          >
            Upload
          </button>
          <input
            type="file"
            ref={videoInputRef}
            onChange={(e) => handleFileChange(e, "video")}
            accept="video/*"
            className="hidden"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Company Name
        </label>
        <input
          type="text"
          name="company"
          value={formData.company || ""}
          onChange={handleChange}
          placeholder="Enter company name"
          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Poster URL
        </label>
        <div className="flex space-x-2">
          <input
            type="text"
            name="poster"
            value={formData.poster || ""}
            onChange={handleChange}
            className="flex-1 px-3 py-2 border border-gray-300 rounded-md shadow-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          />
          <button
            type="button"
            onClick={() => triggerFileInput("poster")}
            className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500"
          >
            Upload
          </button>
          <input
            type="file"
            ref={posterInputRef}
            onChange={(e) => handleFileChange(e, "poster")}
            accept="image/*"
            className="hidden"
          />
        </div>
      </div>

      <div className="flex space-x-3 items-center">
        <div className="flex space-x-2">
          <button
            type="button"
            onClick={() => triggerFileInput("video")}
            className="px-4 py-2 bg-blue-100 text-blue-800 rounded-md hover:bg-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Upload Video
          </button>
          <button
            type="button"
            onClick={() => triggerFileInput("poster")}
            className="px-4 py-2 bg-green-100 text-green-800 rounded-md hover:bg-green-200 focus:outline-none focus:ring-2 focus:ring-green-500"
          >
            Upload Image
          </button>
        </div>

        <button
          type="submit"
          className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        >
          {initialData ? "Update" : "Create"}
        </button>

        {initialData && (
          <button
            type="button"
            onClick={onCancel}
            className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500"
          >
            Cancel
          </button>
        )}
      </div>
    </form>
  );
};

export default ReelForm;
