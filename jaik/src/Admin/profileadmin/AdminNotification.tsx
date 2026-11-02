"use client";

import { useState, useEffect } from "react";
import {
  Bell,
  Check,
  X,
  Clock,
  AlertTriangle,
  Info,
  CheckCircle,
  ChevronLeft,
  Filter,
  Search,
} from "lucide-react";
import { useRouter } from "next/navigation";

type NotificationType =
  | "all"
  | "unread"
  | "success"
  | "warning"
  | "error"
  | "info";

interface Notification {
  id: string;
  title: string;
  message: string;
  timestamp: Date;
  type: "info" | "warning" | "success" | "error";
  unread: boolean;
  source?: string;
  action?: {
    label: string;
    onClick: () => void;
  };
}

const NotificationsPage = () => {
  const router = useRouter();
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [filter, setFilter] = useState<NotificationType>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [selectedNotifications, setSelectedNotifications] = useState<string[]>(
    []
  );

  // Mock data - replace with actual API calls
  useEffect(() => {
    const fetchNotifications = async () => {
      setIsLoading(true);
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 500));

      const mockNotifications: Notification[] = [
        {
          id: "1",
          title: "New User Registration",
          message: "John Doe (john@example.com) has registered as a new user",
          timestamp: new Date(Date.now() - 1000 * 60 * 2), // 2 minutes ago
          type: "success",
          unread: true,
          source: "Authentication",
          action: {
            label: "View User",
            onClick: () => router.push("/admin/dashboard/profile"),
          },
        },
        {
          id: "2",
          title: "Server Warning",
          message: "High CPU usage (92%) detected on server-02",
          timestamp: new Date(Date.now() - 1000 * 60 * 15), // 15 minutes ago
          type: "warning",
          unread: true,
          source: "Monitoring",
        },
        {
          id: "3",
          title: "Scheduled Maintenance",
          message: "System maintenance scheduled for tomorrow at 2:00 AM (UTC)",
          timestamp: new Date(Date.now() - 1000 * 60 * 60), // 1 hour ago
          type: "info",
          unread: false,
          source: "System",
        },
        {
          id: "4",
          title: "Failed Login Attempts",
          message: "5 failed login attempts detected from IP 192.168.1.1",
          timestamp: new Date(Date.now() - 1000 * 60 * 180), // 3 hours ago
          type: "error",
          unread: true,
          source: "Security",
        },
        {
          id: "5",
          title: "New Blog Post Published",
          message:
            'A new blog post "Getting Started with React" has been published',
          timestamp: new Date(Date.now() - 1000 * 60 * 300), // 5 hours ago
          type: "success",
          unread: false,
          source: "Content",
          action: {
            label: "View Post",
            onClick: () => router.push("/admin/dashboard/blogs"),
          },
        },
        {
          id: "6",
          title: "Database Backup Completed",
          message: "Nightly database backup completed successfully",
          timestamp: new Date(Date.now() - 1000 * 60 * 60 * 12), // 12 hours ago
          type: "success",
          unread: false,
          source: "Database",
        },
        {
          id: "7",
          title: "Storage Limit Warning",
          message:
            "Your storage is at 85% capacity. Consider upgrading your plan.",
          timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24), // 1 day ago
          type: "warning",
          unread: false,
          source: "Storage",
        },
      ];

      setNotifications(mockNotifications);
      setIsLoading(false);
    };

    fetchNotifications();
  }, [router]);

  const filteredNotifications = notifications.filter((notification) => {
    // Filter by type
    if (filter !== "all" && filter !== "unread") {
      if (notification.type !== filter) return false;
    }

    // Filter by unread
    if (filter === "unread" && !notification.unread) return false;

    // Filter by search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      return (
        notification.title.toLowerCase().includes(query) ||
        notification.message.toLowerCase().includes(query) ||
        (notification.source &&
          notification.source.toLowerCase().includes(query))
      );
    }

    return true;
  });

  const markAsRead = (id: string) => {
    setNotifications(
      notifications.map((n) => (n.id === id ? { ...n, unread: false } : n))
    );
  };

  const markAllAsRead = () => {
    setNotifications(notifications.map((n) => ({ ...n, unread: false })));
    setSelectedNotifications([]);
  };

  const deleteNotifications = (ids: string[]) => {
    setNotifications(notifications.filter((n) => !ids.includes(n.id)));
    setSelectedNotifications([]);
  };

  const toggleSelectNotification = (id: string) => {
    setSelectedNotifications((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  const getIcon = (type: string) => {
    switch (type) {
      case "success":
        return <CheckCircle size={18} className="text-green-400" />;
      case "warning":
        return <AlertTriangle size={18} className="text-yellow-400" />;
      case "error":
        return <X size={18} className="text-red-400" />;
      default:
        return <Info size={18} className="text-blue-400" />;
    }
  };

  const formatTime = (date: Date) => {
    const now = new Date();
    const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

    if (diffInSeconds < 60) return `${diffInSeconds} seconds ago`;
    if (diffInSeconds < 3600)
      return `${Math.floor(diffInSeconds / 60)} minutes ago`;
    if (diffInSeconds < 86400)
      return `${Math.floor(diffInSeconds / 3600)} hours ago`;
    return `${Math.floor(diffInSeconds / 86400)} days ago`;
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-4">
          <button
            onClick={() => router.back()}
            className="p-2 text-gray-300 hover:text-red-400 hover:bg-red-900/30 rounded-lg transition-colors"
          >
            <ChevronLeft size={20} />
          </button>
          <div className="flex items-center space-x-2">
            <Bell size={24} className="text-red-400" />
            <h1 className="text-2xl font-bold text-red-400">Notifications</h1>
          </div>
        </div>

        <div className="flex space-x-3">
          {selectedNotifications.length > 0 ? (
            <>
              <button
                onClick={() => markAsRead(selectedNotifications[0])}
                disabled={selectedNotifications.length !== 1}
                className="px-3 py-1.5 text-sm bg-red-900/50 hover:bg-red-900/70 text-red-400 rounded-md transition-colors disabled:opacity-50"
                title="Mark as read"
              >
                <Check size={16} />
              </button>
              <button
                onClick={() => deleteNotifications(selectedNotifications)}
                className="px-3 py-1.5 text-sm bg-red-900/50 hover:bg-red-900/70 text-red-400 rounded-md transition-colors"
                title="Delete selected"
              >
                <X size={16} />
              </button>
            </>
          ) : (
            <>
              <button
                onClick={markAllAsRead}
                className="px-4 py-2 bg-red-900/50 hover:bg-red-900/70 text-red-400 rounded-md transition-colors flex items-center"
              >
                <Check size={16} className="mr-2" />
                <span>Mark All as Read</span>
              </button>
              <div className="relative">
                <button
                  onClick={() =>
                    setFilter((prev) => (prev === "all" ? "unread" : "all"))
                  }
                  className="px-4 py-2 bg-red-900/50 hover:bg-red-900/70 text-red-400 rounded-md transition-colors flex items-center"
                >
                  <Filter size={16} className="mr-2" />
                  <span>{filter === "all" ? "All" : "Unread"}</span>
                </button>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Search and Filter */}
      <div className="mb-6 grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="relative">
          <Search
            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
            size={18}
          />
          <input
            type="text"
            placeholder="Search notifications..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-black/30 border border-red-900/50 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 text-white placeholder-gray-400"
          />
        </div>

        <div className="flex space-x-2 overflow-x-auto scrollbar-hide">
          {(
            [
              "all",
              "unread",
              "success",
              "warning",
              "error",
              "info",
            ] as NotificationType[]
          ).map((type) => (
            <button
              key={type}
              onClick={() => setFilter(type)}
              className={`px-3 py-1.5 text-sm rounded-md whitespace-nowrap transition-colors ${
                filter === type
                  ? "bg-red-600 text-white"
                  : "bg-red-900/30 text-red-400 hover:bg-red-900/50"
              }`}
            >
              {type.charAt(0).toUpperCase() + type.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* Notification List */}
      <div className="bg-black/30 border border-red-900/50 rounded-xl overflow-hidden">
        {isLoading ? (
          <div className="p-8 text-center text-gray-400">
            Loading notifications...
          </div>
        ) : filteredNotifications.length === 0 ? (
          <div className="p-8 text-center text-gray-400">
            {searchQuery
              ? "No notifications match your search"
              : filter === "unread"
              ? "No unread notifications"
              : "No notifications available"}
          </div>
        ) : (
          <ul className="divide-y divide-red-900/30">
            {filteredNotifications.map((notification) => (
              <li
                key={notification.id}
                className={`hover:bg-red-900/20 transition-colors ${
                  notification.unread ? "bg-red-900/10" : ""
                }`}
              >
                <div className="flex items-start p-4">
                  <div className="flex-shrink-0 mt-1 mr-3">
                    <input
                      type="checkbox"
                      checked={selectedNotifications.includes(notification.id)}
                      onChange={() => toggleSelectNotification(notification.id)}
                      className="h-4 w-4 text-red-600 focus:ring-red-500 border-gray-600 rounded"
                    />
                  </div>

                  <div className="flex-shrink-0 mt-1 mr-3">
                    {getIcon(notification.type)}
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3
                          className={`text-sm font-medium ${
                            notification.unread ? "text-white" : "text-gray-300"
                          }`}
                        >
                          {notification.title}
                        </h3>
                        {notification.source && (
                          <span className="text-xs text-gray-500 bg-black/50 px-2 py-0.5 rounded">
                            {notification.source}
                          </span>
                        )}
                      </div>
                      <div className="flex space-x-2">
                        <button
                          onClick={() => markAsRead(notification.id)}
                          className="text-gray-500 hover:text-gray-300"
                          title={
                            notification.unread
                              ? "Mark as read"
                              : "Mark as unread"
                          }
                        >
                          {notification.unread ? (
                            <Check size={16} />
                          ) : (
                            <Clock size={16} />
                          )}
                        </button>
                        <button
                          onClick={() => deleteNotifications([notification.id])}
                          className="text-gray-500 hover:text-red-400"
                          title="Delete"
                        >
                          <X size={16} />
                        </button>
                      </div>
                    </div>

                    <p className="text-sm text-gray-400 mt-1">
                      {notification.message}
                    </p>

                    <div className="flex justify-between items-center mt-3">
                      <div className="flex items-center text-xs text-gray-500">
                        <Clock size={12} className="mr-1" />
                        {formatTime(notification.timestamp)}
                      </div>

                      {notification.action && (
                        <button
                          onClick={notification.action.onClick}
                          className="text-xs text-red-400 hover:text-red-300 hover:underline"
                        >
                          {notification.action.label} →
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Pagination (would need actual pagination logic) */}
      {!isLoading && filteredNotifications.length > 0 && (
        <div className="mt-6 flex justify-between items-center">
          <button
            disabled
            className="px-4 py-2 bg-red-900/50 text-gray-500 rounded-md cursor-not-allowed"
          >
            Previous
          </button>
          <span className="text-sm text-gray-400">
            Showing 1-{filteredNotifications.length} of {notifications.length}
          </span>
          <button
            disabled
            className="px-4 py-2 bg-red-900/50 text-gray-500 rounded-md cursor-not-allowed"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default NotificationsPage;
