"use client";

import { useState, useRef } from "react";
import type { ChangeEvent } from "react";

import type { SocialMediaFormData } from "./socialMedia";

interface SocialMediaFormProps {
  onSubmit: (data: SocialMediaFormData) => void;
  initialData?: SocialMediaFormData;
  onCancel: () => void;
}

const SocialMediaForm = ({
  onSubmit,
  initialData,
  onCancel,
}: SocialMediaFormProps) => {
  const [formData, setFormData] = useState<SocialMediaFormData>(
    initialData || { imageUrl: "", altText: "" }
  );
  const [uploadMethod, setUploadMethod] = useState<"url" | "upload">("url");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const fileUrl = URL.createObjectURL(file);
      setFormData({ ...formData, imageUrl: fileUrl });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
    if (!initialData) {
      setFormData({ imageUrl: "", altText: "" });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="flex gap-4 mb-4">
        <button
          type="button"
          onClick={() => setUploadMethod("url")}
          className={`px-4 py-2 rounded-md ${
            uploadMethod === "url" ? "bg-purple-600" : "bg-gray-700"
          }`}
        >
          Image URL
        </button>
        <button
          type="button"
          onClick={() => {
            setUploadMethod("upload");
            fileInputRef.current?.click();
          }}
          className={`px-4 py-2 rounded-md ${
            uploadMethod === "upload" ? "bg-purple-600" : "bg-gray-700"
          }`}
        >
          Upload Image
        </button>
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          accept="image/*"
          className="hidden"
        />
      </div>

      {uploadMethod === "url" ? (
        <div>
          <label className="block text-sm font-medium mb-1">Image URL</label>
          <input
            type="text"
            name="imageUrl"
            value={formData.imageUrl}
            onChange={handleChange}
            className="w-full bg-gray-700 border border-gray-600 rounded-md p-2"
            required
            placeholder="https://example.com/image.jpg"
          />
        </div>
      ) : (
        <div>
          {formData.imageUrl && (
            <div className="mb-4">
              <img
                src={formData.imageUrl}
                alt="Preview"
                className="h-48 object-contain bg-gray-800 p-2 rounded mx-auto"
              />
            </div>
          )}
        </div>
      )}

      <div>
        <label className="block text-sm font-medium mb-1">
          Alt Text (optional)
        </label>
        <input
          type="text"
          name="altText"
          value={formData.altText || ""}
          onChange={handleChange}
          className="w-full bg-gray-700 border border-gray-600 rounded-md p-2"
          placeholder="Description for screen readers"
        />
      </div>

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
          className="bg-purple-600 hover:bg-purple-700 px-4 py-2 rounded-md"
        >
          {initialData ? "Update" : "Create"}
        </button>
      </div>
    </form>
  );
};

export default SocialMediaForm;
