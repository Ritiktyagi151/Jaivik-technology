"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import {
  Settings,
  User,
  Lock,
  Bell,
  Moon,
  Sun,
  Database,
  Globe,
  X,
} from "lucide-react";

interface SettingsForm {
  firstName: string;
  lastName: string;
  email: string;
  timezone: string;
  notifications: {
    email: boolean;
    push: boolean;
    sms: boolean;
  };
  security: {
    twoFactorAuth: boolean;
    passwordChangeRequired: boolean;
  };
  appearance: {
    theme: "light" | "dark" | "system";
    density: "compact" | "normal" | "comfortable";
  };
}

const AdminSettings = () => {
  const [activeTab, setActiveTab] = useState("profile");
  const [isLoading, setIsLoading] = useState(false);
  const [showPasswordModal, setShowPasswordModal] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    // reset,
    watch,
  } = useForm<SettingsForm>({
    defaultValues: {
      firstName: "Admin",
      lastName: "User",
      email: "admin@example.com",
      timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
      notifications: {
        email: true,
        push: true,
        sms: false,
      },
      security: {
        twoFactorAuth: true,
        passwordChangeRequired: false,
      },
      appearance: {
        theme: "dark",
        density: "normal",
      },
    },
  });

  const onSubmit = async (data: SettingsForm) => {
    setIsLoading(true);
    console.log("Saving settings:", data);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setIsLoading(false);
  };

  const tabs = [
    { id: "profile", label: "Profile", icon: <User size={18} /> },
    { id: "notifications", label: "Notifications", icon: <Bell size={18} /> },
    { id: "security", label: "Security", icon: <Lock size={18} /> },
    { id: "appearance", label: "Appearance", icon: <Moon size={18} /> },
    { id: "advanced", label: "Advanced", icon: <Settings size={18} /> },
  ];

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold text-red-400">Admin Settings</h1>
        <button
          onClick={handleSubmit(onSubmit)}
          disabled={isLoading}
          className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-md transition-colors flex items-center"
        >
          {isLoading ? "Saving..." : "Save Changes"}
        </button>
      </div>

      <div className="flex flex-col md:flex-row gap-6">
        {/* Settings Sidebar */}
        <div className="w-full md:w-56 flex-shrink-0 bg-black/50 border border-red-900/30 rounded-xl p-2">
          <nav>
            <ul className="space-y-1">
              {tabs.map((tab) => (
                <li key={tab.id}>
                  <button
                    onClick={() => setActiveTab(tab.id)}
                    className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-all ${
                      activeTab === tab.id
                        ? "bg-red-900/50 text-red-400"
                        : "text-gray-300 hover:bg-red-900/30 hover:text-red-400"
                    }`}
                  >
                    <span>{tab.icon}</span>
                    <span>{tab.label}</span>
                  </button>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        {/* Settings Content */}
        <div className="flex-1 bg-black/50 border border-red-900/30 rounded-xl p-6">
          {/* Profile Settings */}
          {activeTab === "profile" && (
            <div className="space-y-6">
              <div className="flex items-center space-x-4 mb-6">
                <div className="w-20 h-20 rounded-full bg-red-900/50 flex items-center justify-center border-2 border-red-600">
                  <User size={32} className="text-red-400" />
                </div>
                <div>
                  <button className="px-3 py-1.5 text-sm bg-red-900/50 hover:bg-red-900/70 text-red-400 rounded-md transition-colors">
                    Change Avatar
                  </button>
                  <p className="text-xs text-gray-400 mt-1">
                    JPG, GIF or PNG. Max size 2MB
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">
                    First Name
                  </label>
                  <input
                    type="text"
                    {...register("firstName", {
                      required: "First name is required",
                    })}
                    className="w-full px-3 py-2 bg-black/30 border border-red-900/50 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 text-white"
                  />
                  {errors.firstName && (
                    <p className="mt-1 text-sm text-red-400">
                      {errors.firstName.message}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">
                    Last Name
                  </label>
                  <input
                    type="text"
                    {...register("lastName", {
                      required: "Last name is required",
                    })}
                    className="w-full px-3 py-2 bg-black/30 border border-red-900/50 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 text-white"
                  />
                  {errors.lastName && (
                    <p className="mt-1 text-sm text-red-400">
                      {errors.lastName.message}
                    </p>
                  )}
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-300 mb-1">
                    Email
                  </label>
                  <input
                    type="email"
                    {...register("email", {
                      required: "Email is required",
                      pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                        message: "Invalid email address",
                      },
                    })}
                    className="w-full px-3 py-2 bg-black/30 border border-red-900/50 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 text-white"
                  />
                  {errors.email && (
                    <p className="mt-1 text-sm text-red-400">
                      {errors.email.message}
                    </p>
                  )}
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-300 mb-1">
                    Timezone
                  </label>
                  <select
                    {...register("timezone")}
                    className="w-full px-3 py-2 bg-black/30 border border-red-900/50 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 text-white"
                  >
                    <option value="America/New_York">Eastern Time (ET)</option>
                    <option value="America/Chicago">Central Time (CT)</option>
                    <option value="America/Denver">Mountain Time (MT)</option>
                    <option value="America/Los_Angeles">
                      Pacific Time (PT)
                    </option>
                    <option value="UTC">UTC</option>
                  </select>
                </div>
              </div>
            </div>
          )}

          {/* Notification Settings */}
          {activeTab === "notifications" && (
            <div className="space-y-6">
              <h2 className="text-xl font-semibold text-red-400 mb-4">
                Notification Preferences
              </h2>

              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-black/30 border border-red-900/50 rounded-lg">
                  <div>
                    <h3 className="font-medium text-gray-200">
                      Email Notifications
                    </h3>
                    <p className="text-sm text-gray-400">
                      Receive important updates via email
                    </p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      {...register("notifications.email")}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-red-600"></div>
                  </label>
                </div>

                <div className="flex items-center justify-between p-4 bg-black/30 border border-red-900/50 rounded-lg">
                  <div>
                    <h3 className="font-medium text-gray-200">
                      Push Notifications
                    </h3>
                    <p className="text-sm text-gray-400">
                      Receive instant alerts on your device
                    </p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      {...register("notifications.push")}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-red-600"></div>
                  </label>
                </div>

                <div className="flex items-center justify-between p-4 bg-black/30 border border-red-900/50 rounded-lg">
                  <div>
                    <h3 className="font-medium text-gray-200">
                      SMS Notifications
                    </h3>
                    <p className="text-sm text-gray-400">
                      Receive text messages for critical alerts
                    </p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      {...register("notifications.sms")}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-red-600"></div>
                  </label>
                </div>
              </div>
            </div>
          )}

          {/* Security Settings */}
          {activeTab === "security" && (
            <div className="space-y-6">
              <h2 className="text-xl font-semibold text-red-400 mb-4">
                Security Settings
              </h2>

              <div className="space-y-4">
                <div className="p-4 bg-black/30 border border-red-900/50 rounded-lg">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h3 className="font-medium text-gray-200">
                        Two-Factor Authentication
                      </h3>
                      <p className="text-sm text-gray-400">
                        Add an extra layer of security to your account
                      </p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        {...register("security.twoFactorAuth")}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-red-600"></div>
                    </label>
                  </div>
                  {watch("security.twoFactorAuth") && (
                    <div className="mt-4 p-4 bg-black/50 rounded-lg border border-red-900/30">
                      <h4 className="font-medium text-gray-200 mb-2">
                        Recovery Codes
                      </h4>
                      <p className="text-sm text-gray-400 mb-3">
                        Save these recovery codes in a safe place. You can use
                        them to regain access to your account if you lose your
                        authentication device.
                      </p>
                      <div className="grid grid-cols-2 gap-2 mb-4">
                        {[
                          "A1B2-C3D4",
                          "E5F6-G7H8",
                          "I9J0-K1L2",
                          "M3N4-O5P6",
                        ].map((code) => (
                          <div
                            key={code}
                            className="p-2 bg-black/70 text-center font-mono text-sm"
                          >
                            {code}
                          </div>
                        ))}
                      </div>
                      <button className="px-3 py-1.5 text-sm bg-red-900/50 hover:bg-red-900/70 text-red-400 rounded-md transition-colors">
                        Generate New Codes
                      </button>
                    </div>
                  )}
                </div>

                <div className="flex items-center justify-between p-4 bg-black/30 border border-red-900/50 rounded-lg">
                  <div>
                    <h3 className="font-medium text-gray-200">
                      Require Password Change
                    </h3>
                    <p className="text-sm text-gray-400">
                      Force password change every 90 days
                    </p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      {...register("security.passwordChangeRequired")}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-red-600"></div>
                  </label>
                </div>

                <div className="p-4 bg-black/30 border border-red-900/50 rounded-lg">
                  <h3 className="font-medium text-gray-200 mb-2">
                    Change Password
                  </h3>
                  <p className="text-sm text-gray-400 mb-4">
                    Update your account password
                  </p>
                  <button
                    onClick={() => setShowPasswordModal(true)}
                    className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-md transition-colors"
                  >
                    Change Password
                  </button>
                </div>

                <div className="p-4 bg-black/30 border border-red-900/50 rounded-lg">
                  <h3 className="font-medium text-gray-200 mb-2">
                    Active Sessions
                  </h3>
                  <p className="text-sm text-gray-400 mb-3">
                    These are devices that are currently logged in to your
                    account.
                  </p>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 bg-black/50 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <div className="p-2 bg-red-900/30 rounded-lg">
                          <Globe size={18} className="text-red-400" />
                        </div>
                        <div>
                          <p className="font-medium">Chrome on Windows</p>
                          <p className="text-xs text-gray-400">
                            New York, USA • Last active 2 hours ago
                          </p>
                        </div>
                      </div>
                      <button className="text-red-400 hover:text-red-300 text-sm">
                        Logout
                      </button>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-black/50 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <div className="p-2 bg-red-900/30 rounded-lg">
                          <Globe size={18} className="text-red-400" />
                        </div>
                        <div>
                          <p className="font-medium">Safari on iPhone</p>
                          <p className="text-xs text-gray-400">
                            London, UK • Last active 1 day ago
                          </p>
                        </div>
                      </div>
                      <button className="text-red-400 hover:text-red-300 text-sm">
                        Logout
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Appearance Settings */}
          {activeTab === "appearance" && (
            <div className="space-y-6">
              <h2 className="text-xl font-semibold text-red-400 mb-4">
                Appearance
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="p-4 bg-black/30 border border-red-900/50 rounded-lg">
                  <h3 className="font-medium text-gray-200 mb-3">Theme</h3>
                  <div className="space-y-3">
                    {[
                      {
                        value: "light",
                        label: "Light",
                        icon: <Sun size={18} />,
                      },
                      {
                        value: "dark",
                        label: "Dark",
                        icon: <Moon size={18} />,
                      },
                      {
                        value: "system",
                        label: "System",
                        icon: <Settings size={18} />,
                      },
                    ].map((theme) => (
                      <label
                        key={theme.value}
                        className="flex items-center space-x-3 cursor-pointer"
                      >
                        <input
                          type="radio"
                          value={theme.value}
                          {...register("appearance.theme")}
                          className="h-4 w-4 text-red-600 focus:ring-red-500 border-gray-600"
                        />
                        <span className="flex items-center space-x-2">
                          <span>{theme.icon}</span>
                          <span>{theme.label}</span>
                        </span>
                      </label>
                    ))}
                  </div>
                </div>

                <div className="p-4 bg-black/30 border border-red-900/50 rounded-lg">
                  <h3 className="font-medium text-gray-200 mb-3">Density</h3>
                  <div className="space-y-3">
                    {[
                      { value: "compact", label: "Compact" },
                      { value: "normal", label: "Normal" },
                      { value: "comfortable", label: "Comfortable" },
                    ].map((density) => (
                      <label
                        key={density.value}
                        className="flex items-center space-x-3 cursor-pointer"
                      >
                        <input
                          type="radio"
                          value={density.value}
                          {...register("appearance.density")}
                          className="h-4 w-4 text-red-600 focus:ring-red-500 border-gray-600"
                        />
                        <span>{density.label}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div className="md:col-span-2 p-4 bg-black/30 border border-red-900/50 rounded-lg">
                  <h3 className="font-medium text-gray-200 mb-3">
                    Accent Color
                  </h3>
                  <div className="flex flex-wrap gap-3">
                    {["red", "blue", "green", "purple", "orange", "pink"].map(
                      (color) => (
                        <button
                          key={color}
                          className={`w-10 h-10 rounded-full bg-${color}-600 hover:bg-${color}-700 border-2 ${
                            color === "red"
                              ? "border-red-400"
                              : "border-transparent"
                          }`}
                          title={color.charAt(0).toUpperCase() + color.slice(1)}
                        />
                      )
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Advanced Settings */}
          {activeTab === "advanced" && (
            <div className="space-y-6">
              <h2 className="text-xl font-semibold text-red-400 mb-4">
                Advanced Settings
              </h2>

              <div className="space-y-4">
                <div className="p-4 bg-black/30 border border-red-900/50 rounded-lg">
                  <h3 className="font-medium text-gray-200 mb-2">
                    Data Export
                  </h3>
                  <p className="text-sm text-gray-400 mb-4">
                    Export all your account data in a portable format.
                  </p>
                  <button className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-md transition-colors flex items-center">
                    <Database size={16} className="mr-2" />
                    Request Data Export
                  </button>
                </div>

                <div className="p-4 bg-black/30 border border-red-900/50 rounded-lg">
                  <h3 className="font-medium text-gray-200 mb-2">
                    Account Deletion
                  </h3>
                  <p className="text-sm text-gray-400 mb-4">
                    Permanently delete your account and all associated data.
                    This action cannot be undone.
                  </p>
                  <button className="px-4 py-2 bg-black hover:bg-gray-900 text-red-400 border border-red-900 rounded-md transition-colors">
                    Delete Account
                  </button>
                </div>

                <div className="p-4 bg-black/30 border border-red-900/50 rounded-lg">
                  <h3 className="font-medium text-gray-200 mb-2">API Access</h3>
                  <p className="text-sm text-gray-400 mb-4">
                    Manage your API keys and access tokens.
                  </p>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 bg-black/50 rounded-lg">
                      <div>
                        <p className="font-medium">Production Key</p>
                        <p className="text-xs text-gray-400">
                          Created 3 months ago
                        </p>
                      </div>
                      <button className="text-red-400 hover:text-red-300 text-sm">
                        Revoke
                      </button>
                    </div>
                    <button className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-md transition-colors">
                      Generate New API Key
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Change Password Modal */}
      {showPasswordModal && (
        <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4">
          <div className="bg-black border border-red-900/50 rounded-xl p-6 w-full max-w-md">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-semibold text-red-400">
                Change Password
              </h3>
              <button
                onClick={() => setShowPasswordModal(false)}
                className="text-gray-400 hover:text-white"
              >
                <X size={24} />
              </button>
            </div>

            <form className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">
                  Current Password
                </label>
                <input
                  type="password"
                  className="w-full px-3 py-2 bg-black/30 border border-red-900/50 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 text-white"
                  placeholder="Enter current password"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">
                  New Password
                </label>
                <input
                  type="password"
                  className="w-full px-3 py-2 bg-black/30 border border-red-900/50 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 text-white"
                  placeholder="Enter new password"
                />
                <p className="mt-1 text-xs text-gray-400">
                  Password must be at least 8 characters long
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">
                  Confirm New Password
                </label>
                <input
                  type="password"
                  className="w-full px-3 py-2 bg-black/30 border border-red-900/50 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 text-white"
                  placeholder="Confirm new password"
                />
              </div>

              <div className="flex justify-end space-x-3 pt-4">
                <button
                  type="button"
                  onClick={() => setShowPasswordModal(false)}
                  className="px-4 py-2 bg-black hover:bg-gray-900 text-white border border-gray-700 rounded-md transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-md transition-colors"
                >
                  Update Password
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminSettings;
