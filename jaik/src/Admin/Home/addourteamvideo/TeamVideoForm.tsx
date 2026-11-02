"use client";

import { useState, useRef } from "react";
import type { ChangeEvent } from "react";

import type { TeamVideoFormData } from "./teamVideo";

interface TeamVideoFormProps {
  onSubmit: (data: TeamVideoFormData) => void;
  initialData?: TeamVideoFormData;
  onCancel: () => void;
}

const TeamVideoForm = ({
  onSubmit,
  initialData,
  onCancel,
}: TeamVideoFormProps) => {
  const [formData, setFormData] = useState<TeamVideoFormData>(
    initialData || { video: "", poster: "", name: "", position: "" }
  );
  const [uploadMethod, setUploadMethod] = useState<
    "videoUrl" | "videoUpload" | "posterUrl" | "posterUpload"
  >("videoUrl");
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
      setFormData({
        ...formData,
        [type === "video" ? "video" : "poster"]: fileUrl,
      });
    }
  };

  const triggerFileInput = (type: "video" | "poster") => {
    const ref = type === "video" ? videoRef : posterRef;
    ref.current?.click();
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
    if (!initialData) {
      setFormData({ video: "", poster: "", name: "", position: "" });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium mb-1">Name</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          className="w-full bg-gray-700 border border-gray-600 rounded-md p-2"
          placeholder="Team member name"
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Position</label>
        <input
          type="text"
          name="position"
          value={formData.position}
          onChange={handleChange}
          className="w-full bg-gray-700 border border-gray-600 rounded-md p-2"
          placeholder="Team member position"
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Video</label>
        <div className="flex gap-2 mb-2">
          <button
            type="button"
            onClick={() => setUploadMethod("videoUrl")}
            className={`px-3 py-1 rounded-md text-sm ${
              uploadMethod === "videoUrl" ? "bg-blue-600" : "bg-gray-700"
            }`}
          >
            URL
          </button>
          <button
            type="button"
            onClick={() => triggerFileInput("video")}
            className={`px-3 py-1 rounded-md text-sm ${
              uploadMethod === "videoUpload" ? "bg-blue-600" : "bg-gray-700"
            }`}
          >
            Upload
          </button>
          <input
            type="file"
            ref={videoRef}
            onChange={(e) => {
              handleFileChange(e, "video");
              setUploadMethod("videoUpload");
            }}
            accept="video/*"
            className="hidden"
          />
        </div>
        {uploadMethod === "videoUrl" && (
          <input
            type="text"
            name="video"
            value={formData.video}
            onChange={handleChange}
            className="w-full bg-gray-700 border border-gray-600 rounded-md p-2"
            required
            placeholder="Video URL"
          />
        )}
        {uploadMethod === "videoUpload" && formData.video && (
          <video
            src={formData.video}
            controls
            className="w-full max-h-40 rounded mt-2"
          />
        )}
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Poster Image</label>
        <div className="flex gap-2 mb-2">
          <button
            type="button"
            onClick={() => setUploadMethod("posterUrl")}
            className={`px-3 py-1 rounded-md text-sm ${
              uploadMethod === "posterUrl" ? "bg-blue-600" : "bg-gray-700"
            }`}
          >
            URL
          </button>
          <button
            type="button"
            onClick={() => triggerFileInput("poster")}
            className={`px-3 py-1 rounded-md text-sm ${
              uploadMethod === "posterUpload" ? "bg-blue-600" : "bg-gray-700"
            }`}
          >
            Upload
          </button>
          <input
            type="file"
            ref={posterRef}
            onChange={(e) => {
              handleFileChange(e, "poster");
              setUploadMethod("posterUpload");
            }}
            accept="image/*"
            className="hidden"
          />
        </div>
        {uploadMethod === "posterUrl" && (
          <input
            type="text"
            name="poster"
            value={formData.poster}
            onChange={handleChange}
            className="w-full bg-gray-700 border border-gray-600 rounded-md p-2"
            required
            placeholder="Poster URL"
          />
        )}
        {uploadMethod === "posterUpload" && formData.poster && (
          <img
            src={formData.poster}
            alt="Preview"
            className="w-full max-h-40 object-contain rounded mt-2"
          />
        )}
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
          className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-md"
        >
          {initialData ? "Update" : "Create"}
        </button>
      </div>
    </form>
  );
};

export default TeamVideoForm;
