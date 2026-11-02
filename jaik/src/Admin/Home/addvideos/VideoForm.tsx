"use client";

import React, { useState } from "react";
import type { Video, VideoFormData } from "./video";

interface VideoFormProps {
  onSubmit: (formData: VideoFormData) => void;
  initialData?: Video;
  onCancel: () => void;
}

const VideoForm: React.FC<VideoFormProps> = ({
  onSubmit,
  initialData,
  onCancel,
}) => {
  const [formData, setFormData] = useState<VideoFormData>({
    src: initialData?.src || "",
    poster: initialData?.poster || "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileUpload = (
    e: React.ChangeEvent<HTMLInputElement>,
    field: "src" | "poster"
  ) => {
    const file = e.target.files?.[0];
    if (file) {
      const fileURL = URL.createObjectURL(file);
      setFormData((prev) => ({ ...prev, [field]: fileURL }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block mb-1 text-white">Video Source URL:</label>
        <input
          name="src"
          value={formData.src}
          onChange={handleChange}
          required
          className="w-full p-2 rounded bg-gray-800 border border-gray-700 text-white mb-2"
        />

        <div className="flex items-center gap-4">
          <input
            type="file"
            accept="video/*"
            onChange={(e) => handleFileUpload(e, "src")}
            className="text-white"
          />
          {formData.src && (
            <video
              src={formData.src}
              controls
              className="w-32 h-20 object-cover"
            />
          )}
        </div>
      </div>

      <div>
        <label className="block mb-1 text-white">Poster Image URL:</label>
        <input
          name="poster"
          value={formData.poster}
          onChange={handleChange}
          required
          className="w-full p-2 rounded bg-gray-800 border border-gray-700 text-white mb-2"
        />

        <div className="flex items-center gap-4">
          <input
            type="file"
            accept="image/*"
            onChange={(e) => handleFileUpload(e, "poster")}
            className="text-white"
          />
          {formData.poster && (
            <img
              src={formData.poster}
              alt="Poster"
              className="w-20 h-20 object-cover"
            />
          )}
        </div>
      </div>

      <div className="flex justify-end gap-4">
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 bg-gray-600 hover:bg-gray-700 rounded text-white"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-4 py-2 bg-red-600 hover:bg-red-700 rounded text-white"
        >
          {initialData ? "Update" : "Add"} Video
        </button>
      </div>
    </form>
  );
};

export default VideoForm;
