"use client";

import React, { useState, useEffect } from "react";
import {
  Bell,
  Search,
  Menu,
  X,
  Home,
  Users,
  BarChart3,
  Settings,
  FileText,
  MessageSquare,
  ChevronDown,
  ChevronRight,
  User,
  LogOut,
  LayoutDashboard,
  Footprints,
  Image,
  Film,
  List,
  Plus,
  HelpCircle,
  Star,
  Trash2,
} from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

interface MenuItem {
  id: string;
  label: string;
  icon?: React.ReactNode;
  href: string;
  badge?: number;
  children?: MenuItem[];
}

interface Notification {
  id: string;
  title: string;
  message: string;
  time: string;
  type: "info" | "warning" | "success" | "error";
  unread: boolean;
}

const AdminLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [openSubmenus, setOpenSubmenus] = useState<Record<string, boolean>>({});
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const [isAllowed, setIsAllowed] = useState(false);
  const pathname = usePathname() || "";
  const router = useRouter();

  // Yahan Maine Paths Update Kiye Hain (Dashboard Add Kiya Hai)
  const menuItems: MenuItem[] = [
    {
      id: "dashboard",
      label: "Dashboard",
      icon: <LayoutDashboard size={20} />,
      href: "/admin/dashboard",
    },
    {
      id: "trash",
      label: "Trash",
      icon: <Trash2 size={20} />,
      href: "/admin/dashboard/trash",
    },
    {
      id: "website-sections",
      label: "Website Sections",
      icon: <List size={20} />,
      href: "/admin/dashboard/website-sections",
      children: [
        {
          id: "footer",
          label: "Footer",
          icon: <Footprints size={18} />,
          href: "/admin/dashboard/website-sections/footer",
        },
      ],
    },
    {
      id: "home",
      label: "Home Page",
      icon: <Home size={20} />,
      href: "/admin/dashboard/home",
      children: [
        {
          id: "banners",
          label: "Banners",
          href: "/admin/dashboard/home/banners",
          icon: <Image size={18} />,
        },
        {
          id: "corporate-video",
          label: "Corporate Video",
          href: "/admin/dashboard/home/corporate-video",
          icon: <Film size={18} />,
        },
        {
          id: "services-section",
          label: "Services Section",
          href: "/admin/dashboard/home/services-section",
          icon: <Settings size={18} />,
        },
        {
          id: "reels",
          label: "Reels",
          href: "/admin/dashboard/home/reels",
          icon: <Film size={18} />,
        },
        {
          id: "video",
          label: "Video",
          href: "/admin/dashboard/home/video",
          icon: <Film size={18} />,
        },
        {
          id: "testimonial-video",
          label: "Testimonial Video",
          href: "/admin/dashboard/home/testimonial-video",
          icon: <Film size={18} />,
        },
        {
          id: "website",
          label: "Website",
          href: "/admin/dashboard/home/website",
          icon: <Image size={18} />,
        },
        {
          id: "social-media-post",
          label: "Social Media Post",
          href: "/admin/dashboard/home/social-media-post",
          icon: <Image size={18} />,
        },
        {
          id: "our-team",
          label: "Our Team",
          href: "/admin/dashboard/home/our-team",
          icon: <Users size={18} />,
        },
        {
          id: "tech",
          label: "Tecnology",
          href: "/admin/dashboard/home/tech",
          icon: <Users size={18} />,
        },
        {
          id: "our-clients",
          label: "Our Clients",
          href: "/admin/dashboard/home/our-clients",
          icon: <Users size={18} />,
        },
        {
          id: "reviews",
          label: "Reviews",
          href: "/admin/dashboard/home/reviews",
          icon: <Star size={18} />,
        },
      ],
    },
    {
      id: "about-us",
      label: "About Us",
      icon: <Users size={20} />,
      href: "/admin/dashboard/about-us",
    },
    {
      id: "blogs",
      label: "Blogs",
      icon: <FileText size={20} />,
      href: "/admin/dashboard/blogs",
    },
    {
      id: "careers",
      label: "Careers",
      icon: <BarChart3 size={20} />,
      href: "/admin/dashboard/careers",
    },
    {
      id: "contact-us",
      label: "Contact Us",
      icon: <MessageSquare size={20} />,
      href: "/admin/dashboard/contact-us",
    },
  ];

  const notifications: Notification[] = [
    {
      id: "1",
      title: "New Order",
      message: "Order #1234 has been placed",
      time: "2 min ago",
      type: "success",
      unread: true,
    },
    {
      id: "2",
      title: "Server Alert",
      message: "High CPU usage detected",
      time: "5 min ago",
      type: "warning",
      unread: true,
    },
    {
      id: "3",
      title: "User Registration",
      message: "New user registered",
      time: "10 min ago",
      type: "info",
      unread: false,
    },
    {
      id: "4",
      title: "Maintenance Scheduled",
      message: "System maintenance planned for tomorrow",
      time: "1 hour ago",
      type: "info",
      unread: false,
    },
    {
      id: "5",
      title: "New Feature Added",
      message: "Check out the new analytics dashboard",
      time: "3 hours ago",
      type: "success",
      unread: true,
    },
  ];

  const unreadCount = notifications.filter((n) => n.unread).length;

  const getNotificationColor = (type: string) => {
    switch (type) {
      case "success":
        return "bg-green-600/20 text-green-400";
      case "warning":
        return "bg-yellow-600/20 text-yellow-400";
      case "error":
        return "bg-red-600/20 text-red-400";
      default:
        return "bg-blue-600/20 text-blue-400";
    }
  };

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const toggleSubmenu = (id: string, e?: React.MouseEvent) => {
    if (e) {
      e.preventDefault();
    }
    setOpenSubmenus((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const isSubmenuActive = (item: MenuItem): boolean => {
    if (pathname === item.href) return true;
    if (item.children) {
      return item.children.some(
        (child) =>
          child.href === pathname ||
          (child.children &&
            child.children.some(
              (subChild) => subChild.href === pathname
            ))
      );
    }
    return false;
  };

  const isSubmenuOpen = (id: string) => {
    const item = menuItems
      .flatMap((item) => [item, ...(item.children || [])])
      .find((item) => item.id === id);
    return openSubmenus[id] || (item && isSubmenuActive(item)) || false;
  };

  const handleLogout = async () => {
    setIsLoggingOut(true);
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || ""}/auth/logout`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      });

      localStorage.removeItem("admin-auth");
      localStorage.removeItem("userData");

      if (response.ok) {
        router.push("/admin");
      } else {
        console.error("Logout failed");
        router.push("/admin");
      }
    } catch (error) {
      console.error("Logout error:", error);
      localStorage.removeItem("admin-auth");
      localStorage.removeItem("userData");
      router.push("/admin");
    } finally {
      setIsLoggingOut(false);
      setProfileOpen(false);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("admin-auth");
    if (!token) {
      router.replace("/admin");
      return;
    }
    setIsAllowed(true);
  }, [router]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setSidebarOpen(false);
        setNotificationsOpen(false);
        setProfileOpen(false);
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, []);

  useEffect(() => {
    const handleClickOutside = () => {
      setNotificationsOpen(false);
      setProfileOpen(false);
    };

    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  if (!isAllowed) return null;

  return (
    <div className="flex h-screen bg-black text-gray-100 font-sans">
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/80 z-40 lg:hidden"
          onClick={toggleSidebar}
        />
      )}

      <aside
        className={`fixed inset-y-0 left-0 z-50 bg-black shadow-2xl border-r border-red-900/50 transition-all duration-300 ease-in-out ${sidebarOpen ? "w-64" : "w-16"
          } ${sidebarOpen ? "translate-x-0" : "-translate-x-full"
          } lg:relative lg:translate-x-0`}
      >
        <div
          className={`flex items-center h-16 px-4 bg-red-900 ${sidebarOpen ? "justify-between" : "justify-center"
            }`}
        >
          {sidebarOpen ? (
            <div className="flex items-center space-x-2">
              <img
                src="https://jaikvik.in/lab/cloud/jaikvik/assets/images/banner/rotate-3.webp"
                alt="Company Logo"
                className="h-8 w-8 rounded-full border border-red-600"
              />
              <h1 className="text-lg font-semibold text-red-400">
                Jaivik Technology
              </h1>
            </div>
          ) : (
            <img
              src="https://jaikvik.in/lab/new-post-video/img/rotate-3.png"
              alt="Company Logo"
              className="h-8 w-8 rounded-full border border-red-600"
            />
          )}
          <button
            onClick={toggleSidebar}
            className="text-red-400 hover:bg-red-800/50 p-1 rounded-lg transition-colors"
          >
            {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        <nav className="mt-6 px-2 h-[calc(100%-8rem)] overflow-y-auto scrollbar-thin scrollbar-thumb-red-900 scrollbar-track-black">
          <ul className="space-y-1">
            {menuItems.map((item) => (
              <li key={item.id}>
                <div className="relative">
                  <Link
                    href={item.href}
                    className={`flex items-center ${sidebarOpen
                      ? "justify-between px-3 py-2"
                      : "justify-center p-3"
                    } rounded-lg transition-all duration-200 ${pathname === item.href || isSubmenuActive(item)
                      ? "bg-red-900/50 text-red-400"
                      : "text-gray-200 hover:bg-red-900/30 hover:text-red-400"
                    }`}
                    onClick={(e) => {
                      if (item.children && sidebarOpen) {
                        toggleSubmenu(item.id, e);
                      }
                    }}
                  >
                    <div className="flex items-center space-x-3">
                      {item.icon && <span>{item.icon}</span>}
                      {sidebarOpen && (
                        <span className="text-sm font-medium">
                          {item.label}
                        </span>
                      )}
                    </div>
                    {sidebarOpen && item.children && (
                      <ChevronDown
                        size={16}
                        className={`transition-transform duration-200 ${isSubmenuOpen(item.id) ? "rotate-180" : ""
                          }`}
                      />
                    )}
                    {sidebarOpen && item.badge && (
                      <span className="bg-red-600 text-white text-xs rounded-full px-2 py-1 min-w-[20px] text-center">
                        {item.badge}
                      </span>
                    )}
                  </Link>

                  {sidebarOpen && item.children && isSubmenuOpen(item.id) && (
                    <ul className="ml-4 mt-1 pl-4 border-l border-red-900 space-y-1">
                      {item.children.map((child) => (
                        <li key={child.id}>
                          <div className="relative">
                            <Link
                              href={child.href}
                              className={`flex items-center justify-between px-3 py-2 rounded-lg transition-all duration-200 text-sm ${pathname === child.href || isSubmenuActive(child)
                                ? "bg-red-900/40 text-red-400"
                                : "text-gray-300 hover:bg-red-900/20 hover:text-red-400"
                              }`}
                              onClick={(e) => {
                                if (child.children && sidebarOpen) {
                                  toggleSubmenu(child.id, e);
                                }
                              }}
                            >
                              <div className="flex items-center space-x-2">
                                {child.icon && <span>{child.icon}</span>}
                                <span>{child.label}</span>
                              </div>
                              {child.children && (
                                <ChevronRight
                                  size={14}
                                  className={`transition-transform duration-200 ${isSubmenuOpen(child.id) ? "rotate-90" : ""
                                    }`}
                                />
                              )}
                            </Link>

                            {child.children && isSubmenuOpen(child.id) && (
                              <ul className="ml-4 pl-4 border-l border-red-900 space-y-1">
                                {child.children.map((subChild) => (
                                  <li key={subChild.id}>
                                    <Link
                                      href={subChild.href}
                                      className={`block px-3 py-2 rounded-lg transition-all duration-200 text-sm ${pathname === subChild.href
                                        ? "bg-red-900/30 text-red-400"
                                        : "text-gray-300 hover:bg-red-900/20 hover:text-red-400"
                                      }`}
                                    >
                                      {subChild.label}
                                    </Link>
                                  </li>
                                ))}
                              </ul>
                            )}
                          </div>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </li>
            ))}
          </ul>
        </nav>
      </aside>

      <div className="flex-1 flex flex-col shadow-2xl overflow-hidden">
        <header className="bg-white">
          <div className="flex items-center justify-between px-6 py-4">
            <div className="flex items-center space-x-4">
              <button
                onClick={toggleSidebar}
                className="text-gray-300 hover:text-red-400 lg:hidden"
              >
                <Menu size={24} />
              </button>

              <div className="relative">
                <Search
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500"
                  size={20}
                />
                <input
                  type="text"
                  placeholder="Search..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-red-600 focus:ring-2 focus:ring-red-600/60 w-64 bg-white text-black placeholder-gray-400 transition-all duration-200"
                />
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <button className="hidden md:flex items-center space-x-1 px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors duration-200">
                <Plus size={16} />
                <span>New Content</span>
              </button>

              <button className="p-2 text-gray-600 hover:text-red-400  transition-colors duration-200">
                <HelpCircle size={22} />
              </button>

              <div className="relative">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setNotificationsOpen(!notificationsOpen);
                  }}
                  className="relative p-2 text-gray-600 hover:text-red-400 transition-colors duration-200"
                >
                  <Bell size={22} />
                  {unreadCount > 0 && (
                    <span className="absolute -top-1 -right-1 bg-red-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center animate-pulse">
                      {unreadCount}
                    </span>
                  )}
                </button>

                {notificationsOpen && (
                  <div className="absolute right-0 mt-2 w-80 bg-black rounded-lg shadow-xl border border-red-900 z-50">
                    <div className="p-4 border-b border-red-900 flex justify-between items-center">
                      <h3 className="text-lg font-semibold text-red-400">
                        Notifications
                      </h3>
                      <button className="text-xs text-red-400 hover:text-red-300">
                        Mark all as read
                      </button>
                    </div>
                    <div className="max-h-96 overflow-y-auto scrollbar-thin scrollbar-thumb-red-900 scrollbar-track-black">
                      {notifications.map((notification) => (
                        <div
                          key={notification.id}
                          className={`p-4 border-b border-red-900 hover:bg-red-900/20 ${notification.unread ? "bg-red-900/10" : ""
                            }`}
                        >
                          <div className="flex items-start space-x-3">
                            <div
                              className={`w-2 h-2 rounded-full mt-2 flex-shrink-0 ${getNotificationColor(
                                notification.type
                              )}`}
                            />
                            <div className="flex-1 min-w-0">
                              <p className="text-sm font-medium text-red-400">
                                {notification.title}
                              </p>
                              <p className="text-sm text-gray-300 mt-1">
                                {notification.message}
                              </p>
                              <p className="text-xs text-gray-500 mt-2">
                                {notification.time}
                              </p>
                            </div>
                            {notification.unread && (
                              <div className="w-2 h-2 rounded-full bg-red-600 mt-1 flex-shrink-0" />
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                    <div className="p-4 border-t border-red-900">
                      <button
                        onClick={() => {
                          router.push("/admin/dashboard/notifications");
                          setNotificationsOpen(false);
                        }}
                        className="w-full py-2 text-red-400 hover:text-red-300 text-sm font-medium flex items-center justify-center transition-colors duration-200"
                      >
                        <span>View All Notifications</span>
                        <ChevronRight size={16} className="ml-1" />
                      </button>
                    </div>
                  </div>
                )}
              </div>

              <div className="relative">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setProfileOpen(!profileOpen);
                  }}
                  className="flex items-center space-x-2 p-2 text-gray-600 hover:text-red-400  transition-all duration-200"
                >
                  <div className="w-8 h-8 bg-red-600 rounded-full flex items-center justify-center border border-red-500">
                    <User size={16} className="text-white" />
                  </div>
                  <ChevronDown
                    size={16}
                    className={`transition-transform duration-200 ${profileOpen ? "rotate-180" : ""
                      }`}
                  />
                </button>

                {profileOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-black rounded-lg shadow-xl border border-red-900 z-50">
                    <div className="p-2">
                      <div className="px-4 py-2 text-sm text-gray-300">
                        <p className="font-medium">Admin User</p>
                        <p className="text-xs text-gray-400 truncate">
                          
                        </p>
                      </div>
                      <hr className="my-1 border-red-900" />
                      <Link
                        href="/admin/dashboard/profile"
                        className="block px-4 py-2 text-sm text-gray-300 hover:bg-red-900/20 hover:text-red-400 rounded"
                        onClick={() => setProfileOpen(false)}
                      >
                        Your Profile
                      </Link>
                      <Link
                        href="/admin/dashboard/settings"
                        className="block px-4 py-2 text-sm text-gray-300 hover:bg-red-900/20 hover:text-red-400 rounded"
                        onClick={() => setProfileOpen(false)}
                      >
                        Settings
                      </Link>
                      <hr className="my-1 border-red-900" />
                      <button
                        onClick={handleLogout}
                        disabled={isLoggingOut}
                        className="flex items-center w-full px-4 py-2 text-sm text-gray-300 hover:bg-red-900/20 hover:text-red-400 rounded disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        <LogOut size={16} className="mr-2" />
                        {isLoggingOut ? "Signing Out..." : "Sign Out"}
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto p-6 bg-gray-50">
          <div className="max-w-7xl mx-auto">
            <div className="mb-6 flex justify-between items-center">
              <div>
                <h1 className="text-2xl font-bold text-gray-800">
                  {pathname === "/admin/dashboard"
                    ? "Dashboard"
                    : menuItems
                      .flatMap((item) => [item, ...(item.children || [])])
                      .flatMap((item) => [item, ...(item.children || [])])
                      .find((item) => item.href === pathname)
                      ?.label || "Dashboard"}
                </h1>
                <p className="text-gray-500 mt-1 capitalize">
                  {pathname === "/admin/dashboard"
                    ? "Overview of your admin dashboard"
                    : `Manage your ${pathname
                      .split("/")
                      .pop()
                      ?.replace(/-/g, " ")}`}
                </p>
              </div>
              <div className="flex space-x-2">
                <button className="px-4 py-2 border border-gray-400 text-gray-600 rounded-lg transition-colors duration-200 flex items-center">
                  <HelpCircle size={16} className="mr-2" />
                  <span>Help</span>
                </button>
                <button className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors duration-200 flex items-center">
                  <Plus size={16} className="mr-2" />
                  <span>Add New</span>
                </button>
              </div>
            </div>

            <div className="bg-white border border-gray-400/30 rounded-xl p-6">
              {children}
            </div>
          </div>
        </main>
      </div>

      {notificationsOpen && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => setNotificationsOpen(false)}
        />
      )}
      {profileOpen && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => setProfileOpen(false)}
        />
      )}
    </div>
  );
};

export default AdminLayout;
