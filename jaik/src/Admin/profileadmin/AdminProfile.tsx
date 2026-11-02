"use client";

import { useState, useEffect } from "react";

// --- Interfaces ---
interface AdminProfile {
  id: string;
  name: string;
  email: string;
  avatar: string;
  role: string;
  lastLogin: string;
  notificationsEnabled: boolean;
  darkMode: boolean;
  twoFactorAuth: boolean;
  bio?: string;
  socialLinks?: {
    twitter?: string;
    linkedin?: string;
    github?: string;
  };
}

interface SettingsTab {
  id: string;
  name: string;
  icon: string;
}

// --- Component: Profile Tab ---
const ProfileTab = ({
  profile,
  isEditing,
  onEditToggle,
  onInputChange,
  onSave,
}: {
  profile: AdminProfile | null;
  isEditing: boolean;
  onEditToggle: () => void;
  onInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  onSave: () => void;
}) => {
  return (
    <div className="bg-white dark:bg-gray-900 rounded-lg shadow-md overflow-hidden transition-all duration-300">
      <div className="p-6 border-b border-gray-200 dark:border-gray-800 flex justify-between items-center">
        <h2 className="text-xl font-semibold text-gray-800 dark:text-white">Profile Information</h2>
        {!isEditing ? (
          <button onClick={onEditToggle} className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors">
            Edit Profile
          </button>
        ) : (
          <div className="flex space-x-3">
            <button onClick={onEditToggle} className="px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white rounded-md">
              Cancel
            </button>
            <button onClick={onSave} className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700">
              Save Changes
            </button>
          </div>
        )}
      </div>

      <div className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-1">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Full Name</label>
            {isEditing ? (
              <input type="text" name="name" value={profile?.name || ""} onChange={onInputChange} className="w-full px-3 py-2 border rounded-md dark:bg-gray-800 dark:text-white" />
            ) : (
              <p className="text-gray-800 dark:text-gray-200">{profile?.name || "N/A"}</p>
            )}
          </div>

          <div className="space-y-1">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Email Address</label>
            {isEditing ? (
              <input type="email" name="email" value={profile?.email || ""} onChange={onInputChange} className="w-full px-3 py-2 border rounded-md dark:bg-gray-800 dark:text-white" />
            ) : (
              <p className="text-gray-800 dark:text-gray-200">{profile?.email || "N/A"}</p>
            )}
          </div>

          <div className="space-y-1 md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Bio</label>
            {isEditing ? (
              <textarea name="bio" value={profile?.bio || ""} onChange={onInputChange} rows={3} className="w-full px-3 py-2 border rounded-md dark:bg-gray-800 dark:text-white" />
            ) : (
              <p className="text-gray-800 dark:text-gray-200">{profile?.bio || "No bio provided"}</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

// --- Main Page Component ---
const AdminProfilePage = () => {
  const [activeTab, setActiveTab] = useState("profile");
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [profile, setProfile] = useState<AdminProfile | null>(null);

  // 1. Fetch Data from Backend
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        // Yahan apne backend ka sahi URL daalein
        const response = await fetch("http://YOUR_SERVER_IP:5002/api/v1/admin/profile", {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}` // Agar token use kar rahe hain
            }
        });
        const data = await response.json();
        
        if (data.success) {
            setProfile(data.user);
        } else {
            // Fallback default data agar API fail ho
            setProfile({
                id: "admin-001",
                name: "Admin User",
                email: "admin@example.com",
                avatar: "https://randomuser.me/api/portraits/men/1.jpg",
                role: "Super Administrator",
                lastLogin: new Date().toLocaleString(),
                notificationsEnabled: true,
                darkMode: false,
                twoFactorAuth: false,
                bio: "Default bio loaded due to API error.",
            });
        }
      } catch (error) {
        console.error("Error fetching profile:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const target = e.target as HTMLInputElement;
    const { name, value, type } = target;
    const checked = type === "checkbox" ? target.checked : undefined;

    setProfile((prev) => {
      if (!prev) return null;
      if (name.startsWith("socialLinks.")) {
        const field = name.split(".")[1];
        return {
          ...prev,
          socialLinks: { ...prev.socialLinks, [field]: value }
        };
      }
      return {
        ...prev,
        [name]: type === "checkbox" ? checked : value,
      };
    });
  };

  const handleSave = async () => {
    setIsEditing(false);
    // Yahan Backend update API call karein
    console.log("Saving to backend:", profile);
  };

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center dark:bg-black dark:text-white">Loading Profile...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-black p-4">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-8">Admin Settings</h1>
        
        <div className="flex flex-col md:flex-row gap-8">
          {/* Sidebar */}
          <div className="w-full md:w-64">
            <div className="bg-white dark:bg-gray-900 rounded-lg shadow-md p-6 flex flex-col items-center">
              <img
                src={profile?.avatar || "https://ui-avatars.com/api/?name=Admin"}
                alt="Avatar"
                className="w-24 h-24 rounded-full border-4 border-red-500 shadow-md"
              />
              <h2 className="mt-4 text-xl font-semibold dark:text-white">{profile?.name || "Admin"}</h2>
              <p className="text-sm text-gray-500">{profile?.role || "Administrator"}</p>
            </div>
          </div>

          {/* Main Content Area */}
          <div className="flex-1">
            {activeTab === "profile" && (
              <ProfileTab 
                profile={profile} 
                isEditing={isEditing} 
                onEditToggle={() => setIsEditing(!isEditing)} 
                onInputChange={handleInputChange} 
                onSave={handleSave} 
              />
            )}
            
            {/* Display message if data is missing */}
            {!profile && <div className="text-red-500">Error: Profile data could not be loaded.</div>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminProfilePage;