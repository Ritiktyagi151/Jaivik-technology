"use client";

import { useState, useRef } from "react";
import type { ChangeEvent } from "react";

import type { WebsiteFormData } from "./website";

interface WebsiteFormProps {
  onSubmit: (data: WebsiteFormData) => void;
  initialData?: WebsiteFormData;
  onCancel: () => void;
}

const WebsiteForm = ({ onSubmit, initialData, onCancel }: WebsiteFormProps) => {
  const [formData, setFormData] = useState<WebsiteFormData>(
    initialData || { url: "", imageSrc: "", alt: "" }
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
      setFormData({ ...formData, imageSrc: fileUrl });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
    if (!initialData) {
      setFormData({ url: "", imageSrc: "", alt: "" });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium mb-1">Website URL</label>
        <input
          type="url"
          name="url"
          value={formData.url}
          onChange={handleChange}
          className="w-full bg-gray-700 border border-gray-600 rounded-md p-2"
          required
          placeholder="https://example.com"
        />
      </div>

      <div className="flex gap-4 mb-4">
        <button
          type="button"
          onClick={() => setUploadMethod("url")}
          className={`px-4 py-2 rounded-md ${
            uploadMethod === "url" ? "bg-green-600" : "bg-gray-700"
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
            uploadMethod === "upload" ? "bg-green-600" : "bg-gray-700"
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
            name="imageSrc"
            value={formData.imageSrc}
            onChange={handleChange}
            className="w-full bg-gray-700 border border-gray-600 rounded-md p-2"
            required
            placeholder="https://example.com/image.jpg"
          />
        </div>
      ) : (
        <div>
          {formData.imageSrc && (
            <div className="mb-2">
              <img
                src={formData.imageSrc}
                alt="Preview"
                className="h-32 object-contain bg-gray-800 p-2 rounded"
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
          name="alt"
          value={formData.alt || ""}
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
          className="bg-green-600 hover:bg-green-700 px-4 py-2 rounded-md"
        >
          {initialData ? "Update" : "Create"}
        </button>
      </div>
    </form>
  );
};

export default WebsiteForm;
