"use client";

import { useState, useRef } from "react";
import type { ChangeEvent } from "react";

import type { TestimonialFormData } from "./testimonial";

interface TestimonialFormProps {
  onSubmit: (data: TestimonialFormData) => void;
  initialData?: TestimonialFormData;
  onCancel: () => void;
}

const TestimonialForm = ({
  onSubmit,
  initialData,
  onCancel,
}: TestimonialFormProps) => {
  const [formData, setFormData] = useState<TestimonialFormData>(
    initialData || { video: "", poster: "" }
  );
  const [uploadMethod, setUploadMethod] = useState<"url" | "upload">("url");
  const videoRef = useRef<HTMLInputElement>(null);
  const posterRef = useRef<HTMLInputElement>(null);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (
    e: ChangeEvent<HTMLInputElement>,
    type: "video" | "poster"
  ) => {
    const file = e.target.files?.[0];
    if (file) {
      const fileUrl = URL.createObjectURL(file);
      setFormData({ ...formData, [type]: fileUrl });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
    if (!initialData) {
      setFormData({ video: "", poster: "" });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="flex gap-4 mb-4">
        <button
          type="button"
          onClick={() => setUploadMethod("url")}
          className={`px-4 py-2 rounded-md ${
            uploadMethod === "url" ? "bg-blue-600" : "bg-gray-700"
          }`}
        >
          Enter URL
        </button>
        <button
          type="button"
          onClick={() => setUploadMethod("upload")}
          className={`px-4 py-2 rounded-md ${
            uploadMethod === "upload" ? "bg-blue-600" : "bg-gray-700"
          }`}
        >
          Upload File
        </button>
      </div>

      {uploadMethod === "url" ? (
        <>
          <div>
            <label className="block text-sm font-medium mb-1">Video URL</label>
            <input
              type="text"
              name="video"
              value={formData.video}
              onChange={handleChange}
              className="w-full bg-gray-700 border border-gray-600 rounded-md p-2"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Poster URL</label>
            <input
              type="text"
              name="poster"
              value={formData.poster}
              onChange={handleChange}
              className="w-full bg-gray-700 border border-gray-600 rounded-md p-2"
              required
            />
          </div>
        </>
      ) : (
        <>
          <div>
            <label className="block text-sm font-medium mb-1">Video File</label>
            <input
              type="file"
              ref={videoRef}
              onChange={(e) => handleFileChange(e, "video")}
              accept="video/*"
              className="w-full bg-gray-700 border border-gray-600 rounded-md p-2"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">
              Poster Image
            </label>
            <input
              type="file"
              ref={posterRef}
              onChange={(e) => handleFileChange(e, "poster")}
              accept="image/*"
              className="w-full bg-gray-700 border border-gray-600 rounded-md p-2"
              required
            />
          </div>
        </>
      )}

      <div className="flex justify-end gap-2 pt-4">
        <button
          type="button"
          onClick={onCancel}
          className="bg-gray-600 hover:bg-gray-700 px-4 py-2 rounded-md"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-md"
        >
          {initialData ? "Update" : "Create"}
        </button>
      </div>
    </form>
  );
};

export default TestimonialForm;
