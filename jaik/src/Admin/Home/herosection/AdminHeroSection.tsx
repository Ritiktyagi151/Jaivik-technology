"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  FiLock,
  FiUnlock,
  FiTrash2,
  FiEye,
  FiEdit,
  FiUpload,
  FiLink,
  FiLoader,
} from "react-icons/fi";

interface HeroSectionSettings {
  videoUrl: string;
  circleImageUrl: string;
  centerImageUrl: string;
  isLocked: boolean;
}

interface Asset {
  _id: string;
  url: string;
  type: "video" | "circleImage" | "centerImage";
  size: string;
  originalName: string;
  createdAt: string;
}

const API_BASE_URL = "http://localhost:5000/api/hero";

const AdminHeroSection: React.FC = () => {
  const [settings, setSettings] = useState<HeroSectionSettings>({
    videoUrl: "",
    circleImageUrl: "",
    centerImageUrl: "",
    isLocked: false,
  });
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [circleImageFile, setCircleImageFile] = useState<File | null>(null);
  const [centerImageFile, setCenterImageFile] = useState<File | null>(null);
  const [editMode, setEditMode] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<"current" | "history">("current");
  const [assetHistory, setAssetHistory] = useState<Asset[]>([]);
  const [storageStats, setStorageStats] = useState({
    totalStorage: "0 MB",
    videoCount: 0,
    imageCount: 0,
  });
  const [loading, setLoading] = useState({
    initial: true,
    uploading: false,
    updating: false,
    togglingLock: false,
    deleting: false,
  });
  const [error, setError] = useState("");

  // Fetch initial data
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [settingsRes, assetsRes, statsRes] = await Promise.all([
          axios.get(`${API_BASE_URL}`),
          axios.get(`${API_BASE_URL}/assets`),
          axios.get(`${API_BASE_URL}/storage-stats`),
        ]);

        setSettings(settingsRes.data);
        setAssetHistory(assetsRes.data);
        setStorageStats(statsRes.data);
      } catch (err) {
        setError("Failed to load data. Please try again later.");
        console.error(err);
      } finally {
        setLoading((prev) => ({ ...prev, initial: false }));
      }
    };

    fetchData();
  }, []);

  const toggleLock = async () => {
    setLoading((prev) => ({ ...prev, togglingLock: true }));
    setError("");

    try {
      const res = await axios.post(`${API_BASE_URL}/toggle-lock`);
      setSettings(res.data);
    } catch (err) {
      setError("Failed to toggle lock. Please try again.");
      console.error(err);
    } finally {
      setLoading((prev) => ({ ...prev, togglingLock: false }));
    }
  };

  const handleUrlUpdate = async (
    url: string,
    type: "video" | "circleImage" | "centerImage"
  ) => {
    if (settings.isLocked) {
      setError("Cannot update - admin panel is locked");
      return;
    }

    setLoading((prev) => ({ ...prev, updating: true }));
    setError("");

    try {
      const updatedSettings = {
        ...settings,
        [`${type}Url`]: url,
      };

      const res = await axios.put(API_BASE_URL, updatedSettings);
      setSettings(res.data);
    } catch (err) {
      setError("Failed to update URL. Please try again.");
      console.error(err);
    } finally {
      setLoading((prev) => ({ ...prev, updating: false }));
    }
  };

  const handleFileUpload = async (
    file: File,
    type: "video" | "circleImage" | "centerImage"
  ) => {
    if (settings.isLocked) {
      setError("Cannot upload - admin panel is locked");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    setLoading((prev) => ({ ...prev, uploading: true }));
    setError("");

    try {
      const uploadRes = await axios.post(`${API_BASE_URL}/upload`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      // Update the specific URL in settings
      const updatedSettings = {
        ...settings,
        [`${type}Url`]: uploadRes.data.url,
      };
      await axios.put(API_BASE_URL, updatedSettings);

      // Refresh data
      const [newSettings, newAssets, newStats] = await Promise.all([
        axios.get(API_BASE_URL),
        axios.get(`${API_BASE_URL}/assets`),
        axios.get(`${API_BASE_URL}/storage-stats`),
      ]);

      setSettings(newSettings.data);
      setAssetHistory(newAssets.data);
      setStorageStats(newStats.data);
    } catch (err) {
      setError("Failed to upload file. Please try again.");
      console.error(err);
    } finally {
      setLoading((prev) => ({ ...prev, uploading: false }));
      // Clear file inputs
      if (type === "video") setVideoFile(null);
      if (type === "circleImage") setCircleImageFile(null);
      if (type === "centerImage") setCenterImageFile(null);
    }
  };

  const handleSubmit = (
    e: React.FormEvent,
    type: "video" | "circleImage" | "centerImage"
  ) => {
    e.preventDefault();
    const file =
      type === "video"
        ? videoFile
        : type === "circleImage"
        ? circleImageFile
        : centerImageFile;

    if (file) {
      handleFileUpload(file, type);
    }
  };

  const deleteAsset = async (id: string) => {
    if (settings.isLocked) {
      setError("Cannot delete - admin panel is locked");
      return;
    }

    if (!window.confirm("Are you sure you want to delete this asset?")) {
      return;
    }

    setLoading((prev) => ({ ...prev, deleting: true }));
    setError("");

    try {
      await axios.delete(`${API_BASE_URL}/assets/${id}`);

      // Refresh data
      const [newSettings, newAssets, newStats] = await Promise.all([
        axios.get(API_BASE_URL),
        axios.get(`${API_BASE_URL}/assets`),
        axios.get(`${API_BASE_URL}/storage-stats`),
      ]);

      setSettings(newSettings.data);
      setAssetHistory(newAssets.data);
      setStorageStats(newStats.data);
    } catch (err) {
      setError("Failed to delete asset. Please try again.");
      console.error(err);
    } finally {
      setLoading((prev) => ({ ...prev, deleting: false }));
    }
  };

  if (loading.initial) {
    return (
      <div className="min-h-screen bg-gray-900 text-gray-100 p-8 flex items-center justify-center">
        <div className="flex items-center gap-2 text-2xl">
          <FiLoader className="animate-spin" />
          Loading admin panel...
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-900 text-gray-100 p-8">
        <div className="bg-red-900/50 border border-red-700 p-4 rounded-lg mb-8 flex items-center gap-4">
          <FiLock className="text-2xl" />
          <p>{error}</p>
        </div>
        <button
          onClick={() => window.location.reload()}
          className="bg-red-600 hover:bg-red-500 text-white py-2 px-4 rounded"
        >
          Reload Page
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 p-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-red-500">
            Hero Section Admin
          </h1>
          <button
            onClick={toggleLock}
            disabled={loading.togglingLock}
            className={`flex items-center gap-2 px-4 py-2 rounded-md ${
              settings.isLocked
                ? "bg-red-900 hover:bg-red-800"
                : "bg-green-900 hover:bg-green-800"
            }`}
          >
            {loading.togglingLock ? (
              <FiLoader className="animate-spin" />
            ) : settings.isLocked ? (
              <>
                <FiLock /> Locked
              </>
            ) : (
              <>
                <FiUnlock /> Unlocked
              </>
            )}
          </button>
        </div>

        {settings.isLocked && (
          <div className="bg-red-900/50 border border-red-700 p-4 rounded-lg mb-8 flex items-center gap-4">
            <FiLock className="text-2xl" />
            <p>Admin panel is locked. Unlock to make changes.</p>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-gray-800 p-4 rounded-lg border border-gray-700">
            <h3 className="font-medium text-red-400 mb-2">Total Storage</h3>
            <p className="text-2xl">{storageStats.totalStorage}</p>
          </div>
          <div className="bg-gray-800 p-4 rounded-lg border border-gray-700">
            <h3 className="font-medium text-red-400 mb-2">Videos</h3>
            <p className="text-2xl">{storageStats.videoCount}</p>
          </div>
          <div className="bg-gray-800 p-4 rounded-lg border border-gray-700">
            <h3 className="font-medium text-red-400 mb-2">Images</h3>
            <p className="text-2xl">{storageStats.imageCount}</p>
          </div>
        </div>

        <div className="mb-6">
          <div className="flex border-b border-gray-700">
            <button
              className={`px-4 py-2 ${
                activeTab === "current"
                  ? "text-red-500 border-b-2 border-red-500"
                  : "text-gray-400"
              }`}
              onClick={() => setActiveTab("current")}
            >
              Current Assets
            </button>
            <button
              className={`px-4 py-2 ${
                activeTab === "history"
                  ? "text-red-500 border-b-2 border-red-500"
                  : "text-gray-400"
              }`}
              onClick={() => setActiveTab("history")}
            >
              Asset History
            </button>
          </div>
        </div>

        {activeTab === "current" ? (
          <>
            {/* Video Section */}
            <div className="bg-gray-800 p-6 rounded-lg shadow-lg mb-8 border border-gray-700">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold text-red-400">
                  Video Settings
                </h2>
                <button
                  onClick={() => setEditMode(!editMode)}
                  className="flex items-center gap-2 bg-gray-700 hover:bg-gray-600 px-3 py-1 rounded"
                >
                  <FiEdit /> {editMode ? "Cancel" : "Edit"}
                </button>
              </div>

              {editMode ? (
                <>
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-300 mb-1">
                      Video URL:
                    </label>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={settings.videoUrl}
                        onChange={(e) =>
                          setSettings({ ...settings, videoUrl: e.target.value })
                        }
                        className="flex-1 p-2 bg-gray-700 border border-gray-600 rounded text-white"
                        disabled={settings.isLocked || loading.updating}
                      />
                      <button
                        onClick={() =>
                          handleUrlUpdate(settings.videoUrl, "video")
                        }
                        disabled={settings.isLocked || loading.updating}
                        className="bg-red-600 hover:bg-red-500 text-white py-2 px-4 rounded flex items-center justify-center gap-2 disabled:bg-gray-700 disabled:text-gray-500"
                      >
                        {loading.updating ? (
                          <FiLoader className="animate-spin" />
                        ) : (
                          <>
                            <FiLink /> Update
                          </>
                        )}
                      </button>
                    </div>
                  </div>

                  <div className="border-t border-gray-700 pt-4">
                    <h3 className="font-medium mb-2 text-gray-300">
                      Upload New Video
                    </h3>
                    <form
                      onSubmit={(e) => handleSubmit(e, "video")}
                      className="flex flex-col gap-4"
                    >
                      <div className="flex items-center gap-4">
                        <label className="block">
                          <span className="sr-only">Choose video file</span>
                          <input
                            type="file"
                            accept="video/mp4,video/webm"
                            onChange={(e) =>
                              setVideoFile(e.target.files?.[0] || null)
                            }
                            className="block w-full text-sm text-gray-400
                              file:mr-4 file:py-2 file:px-4
                              file:rounded file:border-0
                              file:text-sm file:font-semibold
                              file:bg-red-600 file:text-white
                              hover:file:bg-red-500"
                            disabled={settings.isLocked || loading.uploading}
                          />
                        </label>
                      </div>
                      {videoFile && (
                        <div className="text-sm text-gray-400 flex justify-between items-center">
                          <span>
                            Selected: {videoFile.name} (
                            {(videoFile.size / (1024 * 1024)).toFixed(2)} MB)
                          </span>
                          <button
                            type="button"
                            onClick={() => setVideoFile(null)}
                            className="text-red-400 hover:text-red-300"
                          >
                            <FiTrash2 />
                          </button>
                        </div>
                      )}
                      <button
                        type="submit"
                        disabled={
                          !videoFile || settings.isLocked || loading.uploading
                        }
                        className="bg-red-600 hover:bg-red-500 text-white py-2 px-4 rounded flex items-center justify-center gap-2 disabled:bg-gray-700 disabled:text-gray-500"
                      >
                        {loading.uploading ? (
                          <FiLoader className="animate-spin" />
                        ) : (
                          <>
                            <FiUpload /> Upload Video
                          </>
                        )}
                      </button>
                    </form>
                  </div>
                </>
              ) : (
                <div className="space-y-4">
                  <div>
                    <h3 className="font-medium text-gray-300 mb-2">
                      Current Video
                    </h3>
                    <p className="text-sm text-gray-400 break-all">
                      {settings.videoUrl}
                    </p>
                  </div>
                  <div className="aspect-video bg-black rounded overflow-hidden">
                    {settings.videoUrl ? (
                      <video
                        src={settings.videoUrl}
                        controls
                        muted
                        className="w-full h-full object-contain"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-gray-500">
                        No video selected
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* Images Sections */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Circle Image */}
              <div className="bg-gray-800 p-6 rounded-lg shadow-lg border border-gray-700">
                <h2 className="text-xl font-semibold text-red-400 mb-4">
                  Circle Image
                </h2>

                {editMode ? (
                  <>
                    <div className="mb-4">
                      <label className="block text-sm font-medium text-gray-300 mb-1">
                        Image URL:
                      </label>
                      <div className="flex gap-2">
                        <input
                          type="text"
                          value={settings.circleImageUrl}
                          onChange={(e) =>
                            setSettings({
                              ...settings,
                              circleImageUrl: e.target.value,
                            })
                          }
                          className="flex-1 p-2 bg-gray-700 border border-gray-600 rounded text-white"
                          disabled={settings.isLocked || loading.updating}
                        />
                        <button
                          onClick={() =>
                            handleUrlUpdate(
                              settings.circleImageUrl,
                              "circleImage"
                            )
                          }
                          disabled={settings.isLocked || loading.updating}
                          className="bg-red-600 hover:bg-red-500 text-white py-2 px-4 rounded flex items-center justify-center gap-2 disabled:bg-gray-700 disabled:text-gray-500"
                        >
                          {loading.updating ? (
                            <FiLoader className="animate-spin" />
                          ) : (
                            <>
                              <FiLink /> Update
                            </>
                          )}
                        </button>
                      </div>
                    </div>

                    <div className="border-t border-gray-700 pt-4">
                      <h3 className="font-medium mb-2 text-gray-300">
                        Upload New Image
                      </h3>
                      <form
                        onSubmit={(e) => handleSubmit(e, "circleImage")}
                        className="flex flex-col gap-4"
                      >
                        <div className="flex items-center gap-4">
                          <label className="block">
                            <span className="sr-only">Choose image file</span>
                            <input
                              type="file"
                              accept="image/*"
                              onChange={(e) =>
                                setCircleImageFile(e.target.files?.[0] || null)
                              }
                              className="block w-full text-sm text-gray-400
                                file:mr-4 file:py-2 file:px-4
                                file:rounded file:border-0
                                file:text-sm file:font-semibold
                                file:bg-red-600 file:text-white
                                hover:file:bg-red-500"
                              disabled={settings.isLocked || loading.uploading}
                            />
                          </label>
                        </div>
                        {circleImageFile && (
                          <div className="text-sm text-gray-400 flex justify-between items-center">
                            <span>
                              Selected: {circleImageFile.name} (
                              {(circleImageFile.size / (1024 * 1024)).toFixed(
                                2
                              )}{" "}
                              MB)
                            </span>
                            <button
                              type="button"
                              onClick={() => setCircleImageFile(null)}
                              className="text-red-400 hover:text-red-300"
                            >
                              <FiTrash2 />
                            </button>
                          </div>
                        )}
                        <button
                          type="submit"
                          disabled={
                            !circleImageFile ||
                            settings.isLocked ||
                            loading.uploading
                          }
                          className="bg-red-600 hover:bg-red-500 text-white py-2 px-4 rounded flex items-center justify-center gap-2 disabled:bg-gray-700 disabled:text-gray-500"
                        >
                          {loading.uploading ? (
                            <FiLoader className="animate-spin" />
                          ) : (
                            <>
                              <FiUpload /> Upload Image
                            </>
                          )}
                        </button>
                      </form>
                    </div>
                  </>
                ) : (
                  <div className="space-y-4">
                    <div>
                      <h3 className="font-medium text-gray-300 mb-2">
                        Current Image
                      </h3>
                      <p className="text-sm text-gray-400 break-all">
                        {settings.circleImageUrl}
                      </p>
                    </div>
                    <div className="aspect-square bg-black rounded-full overflow-hidden flex items-center justify-center">
                      {settings.circleImageUrl ? (
                        <img
                          src={settings.circleImageUrl}
                          alt="Circle preview"
                          className="w-full h-full object-contain"
                        />
                      ) : (
                        <div className="text-gray-500">No image selected</div>
                      )}
                    </div>
                  </div>
                )}
              </div>

              {/* Center Image */}
              <div className="bg-gray-800 p-6 rounded-lg shadow-lg border border-gray-700">
                <h2 className="text-xl font-semibold text-red-400 mb-4">
                  Center Image
                </h2>

                {editMode ? (
                  <>
                    <div className="mb-4">
                      <label className="block text-sm font-medium text-gray-300 mb-1">
                        Image URL:
                      </label>
                      <div className="flex gap-2">
                        <input
                          type="text"
                          value={settings.centerImageUrl}
                          onChange={(e) =>
                            setSettings({
                              ...settings,
                              centerImageUrl: e.target.value,
                            })
                          }
                          className="flex-1 p-2 bg-gray-700 border border-gray-600 rounded text-white"
                          disabled={settings.isLocked || loading.updating}
                        />
                        <button
                          onClick={() =>
                            handleUrlUpdate(
                              settings.centerImageUrl,
                              "centerImage"
                            )
                          }
                          disabled={settings.isLocked || loading.updating}
                          className="bg-red-600 hover:bg-red-500 text-white py-2 px-4 rounded flex items-center justify-center gap-2 disabled:bg-gray-700 disabled:text-gray-500"
                        >
                          {loading.updating ? (
                            <FiLoader className="animate-spin" />
                          ) : (
                            <>
                              <FiLink /> Update
                            </>
                          )}
                        </button>
                      </div>
                    </div>

                    <div className="border-t border-gray-700 pt-4">
                      <h3 className="font-medium mb-2 text-gray-300">
                        Upload New Image
                      </h3>
                      <form
                        onSubmit={(e) => handleSubmit(e, "centerImage")}
                        className="flex flex-col gap-4"
                      >
                        <div className="flex items-center gap-4">
                          <label className="block">
                            <span className="sr-only">Choose image file</span>
                            <input
                              type="file"
                              accept="image/*"
                              onChange={(e) =>
                                setCenterImageFile(e.target.files?.[0] || null)
                              }
                              className="block w-full text-sm text-gray-400
                                file:mr-4 file:py-2 file:px-4
                                file:rounded file:border-0
                                file:text-sm file:font-semibold
                                file:bg-red-600 file:text-white
                                hover:file:bg-red-500"
                              disabled={settings.isLocked || loading.uploading}
                            />
                          </label>
                        </div>
                        {centerImageFile && (
                          <div className="text-sm text-gray-400 flex justify-between items-center">
                            <span>
                              Selected: {centerImageFile.name} (
                              {(centerImageFile.size / (1024 * 1024)).toFixed(
                                2
                              )}{" "}
                              MB)
                            </span>
                            <button
                              type="button"
                              onClick={() => setCenterImageFile(null)}
                              className="text-red-400 hover:text-red-300"
                            >
                              <FiTrash2 />
                            </button>
                          </div>
                        )}
                        <button
                          type="submit"
                          disabled={
                            !centerImageFile ||
                            settings.isLocked ||
                            loading.uploading
                          }
                          className="bg-red-600 hover:bg-red-500 text-white py-2 px-4 rounded flex items-center justify-center gap-2 disabled:bg-gray-700 disabled:text-gray-500"
                        >
                          {loading.uploading ? (
                            <FiLoader className="animate-spin" />
                          ) : (
                            <>
                              <FiUpload /> Upload Image
                            </>
                          )}
                        </button>
                      </form>
                    </div>
                  </>
                ) : (
                  <div className="space-y-4">
                    <div>
                      <h3 className="font-medium text-gray-300 mb-2">
                        Current Image
                      </h3>
                      <p className="text-sm text-gray-400 break-all">
                        {settings.centerImageUrl}
                      </p>
                    </div>
                    <div className="aspect-square bg-black rounded overflow-hidden flex items-center justify-center">
                      {settings.centerImageUrl ? (
                        <img
                          src={settings.centerImageUrl}
                          alt="Center preview"
                          className="w-full h-full object-contain"
                        />
                      ) : (
                        <div className="text-gray-500">No image selected</div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </>
        ) : (
          <div className="bg-gray-800 p-6 rounded-lg shadow-lg border border-gray-700">
            <h2 className="text-xl font-semibold text-red-400 mb-4">
              Asset History
            </h2>

            {assetHistory.length > 0 ? (
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-700">
                  <thead className="bg-gray-700">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                        Type
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                        URL
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                        Size
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                        Date
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-gray-800 divide-y divide-gray-700">
                    {assetHistory.map((asset) => (
                      <tr key={asset._id}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300 capitalize">
                          {asset.type}
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-400 break-all max-w-xs truncate">
                          <a
                            href={asset.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-red-400 hover:underline"
                          >
                            {asset.url}
                          </a>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-400">
                          {asset.size}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-400">
                          {new Date(asset.createdAt).toLocaleString()}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-400">
                          <div className="flex gap-2">
                            <button
                              onClick={() => window.open(asset.url, "_blank")}
                              className="text-blue-400 hover:text-blue-300"
                              title="View"
                            >
                              <FiEye />
                            </button>
                            <button
                              onClick={() => deleteAsset(asset._id)}
                              disabled={settings.isLocked || loading.deleting}
                              className="text-red-400 hover:text-red-300 disabled:text-gray-600"
                              title="Delete"
                            >
                              {loading.deleting ? (
                                <FiLoader className="animate-spin" />
                              ) : (
                                <FiTrash2 />
                              )}
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="text-center py-8 text-gray-500">
                No asset history yet. Upload files to see them here.
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminHeroSection;
