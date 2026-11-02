"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  FaSave,
  FaLock,
  FaUnlock,
  FaTrash,
  FaEdit,
  FaPlus,
} from "react-icons/fa";

interface MenuItem {
  id: string;
  title: string;
  href: string;
}

interface DropdownItem {
  id: string;
  text: string;
  href: string;
  img: string;
}

interface ServiceCategory {
  id: string;
  title: string;
  items: DropdownItem[];
}

interface NavConfig {
  mainMenu: MenuItem[];
  services: ServiceCategory[];
  socialLinks: {
    facebook: string;
    twitter: string;
    instagram: string;
    linkedin: string;
    whatsapp: string;
  };
  logo: string;
  languageOptions: string[];
}

const AdminPanel: React.FC = () => {
  const [config, setConfig] = useState<NavConfig>({
    mainMenu: [],
    services: [],
    socialLinks: {
      facebook: "",
      twitter: "",
      instagram: "",
      linkedin: "",
      whatsapp: "",
    },
    logo: "",
    languageOptions: [],
  });

  const [editingItem, setEditingItem] = useState<
    MenuItem | ServiceCategory | DropdownItem | null
  >(null);
  const [currentSection, setCurrentSection] = useState("mainMenu");
  const [isLocked, setIsLocked] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Load initial data
  useEffect(() => {
    const fetchConfig = async () => {
      try {
        // In a real app, this would be an API call
        const mockData: NavConfig = {
          mainMenu: [
            { id: "1", title: "Home", href: "/" },
            { id: "2", title: "About Us", href: "/about" },
            { id: "3", title: "Blogs", href: "/blogs" },
            { id: "4", title: "Contact", href: "/contact-us" },
            { id: "5", title: "Career", href: "/career" },
          ],
          services: [
            {
              id: "s1",
              title: "Software Development",
              items: [
                {
                  id: "s1-1",
                  text: "Custom Software",
                  href: "/custom-software",
                  img: "",
                },
                {
                  id: "s1-2",
                  text: "Mobile Apps",
                  href: "/mobile-apps",
                  img: "",
                },
              ],
            },
            {
              id: "s2",
              title: "Website Development",
              items: [
                {
                  id: "s2-1",
                  text: "E-commerce",
                  href: "/ecommerce",
                  img: "",
                },
                {
                  id: "s2-2",
                  text: "Corporate Websites",
                  href: "/corporate",
                  img: "",
                },
              ],
            },
          ],
          socialLinks: {
            facebook: "",
            twitter: "",
            instagram: "",
            linkedin: "",
            whatsapp: "",
          },
          logo: "",
          languageOptions: ["English", "Spanish", "French"],
        };

        setConfig(mockData);
        setIsLoading(false);
      } catch (error) {
        console.error("Error loading config:", error);
        setIsLoading(false);
      }
    };

    fetchConfig();
  }, []);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;

    if (editingItem) {
      setEditingItem({
        ...editingItem,
        [name]: value,
      });
    } else {
      setConfig((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleSocialLinkChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setConfig((prev) => ({
      ...prev,
      socialLinks: {
        ...prev.socialLinks,
        [name]: value,
      },
    }));
  };

  const saveChanges = () => {
    if (editingItem) {
      if ("items" in editingItem) {
        // Service category
        setConfig((prev) => ({
          ...prev,
          services: prev.services.map((service) =>
            service.id === editingItem.id
              ? (editingItem as ServiceCategory)
              : service
          ),
        }));
      } else if ("img" in editingItem) {
        // Dropdown item
        setConfig((prev) => ({
          ...prev,
          services: prev.services.map((service) => ({
            ...service,
            items: service.items.map((item) =>
              item.id === editingItem.id ? (editingItem as DropdownItem) : item
            ),
          })),
        }));
      } else {
        // Main menu item
        setConfig((prev) => ({
          ...prev,
          mainMenu: prev.mainMenu.map((item) =>
            item.id === editingItem.id ? (editingItem as MenuItem) : item
          ),
        }));
      }
      setEditingItem(null);
    }
    // In a real app, save to API here
    alert("Changes saved successfully!");
  };

  const addNewItem = () => {
    const newItem =
      currentSection === "mainMenu"
        ? { id: Date.now().toString(), title: "", href: "" }
        : currentSection === "services"
        ? { id: Date.now().toString(), title: "", items: [] }
        : { id: Date.now().toString(), text: "", href: "", img: "" };

    setEditingItem(newItem);
  };

  const deleteItem = (id: string) => {
    if (currentSection === "mainMenu") {
      setConfig((prev) => ({
        ...prev,
        mainMenu: prev.mainMenu.filter((item) => item.id !== id),
      }));
    } else if (currentSection === "services") {
      setConfig((prev) => ({
        ...prev,
        services: prev.services.filter((service) => service.id !== id),
      }));
    } else {
      // Delete dropdown item from its parent service
      const serviceId = prompt(
        "Enter the service category ID this item belongs to:"
      );
      if (serviceId) {
        setConfig((prev) => ({
          ...prev,
          services: prev.services.map((service) =>
            service.id === serviceId
              ? {
                  ...service,
                  items: service.items.filter((item) => item.id !== id),
                }
              : service
          ),
        }));
      }
    }
  };

  const renderForm = () => {
    if (editingItem) {
      if ("items" in editingItem) {
        // Service category form
        return (
          <div className="bg-white p-6 rounded-lg shadow-md mb-6">
            <h3 className="text-xl font-bold text-gray-800 mb-4">
              Edit Service Category
            </h3>
            <div className="mb-4">
              <label className="block text-gray-700 mb-2">Title</label>
              <input
                type="text"
                name="title"
                value={editingItem.title}
                onChange={handleInputChange}
                className="w-full p-2 border border-gray-300 rounded"
              />
            </div>
            <div className="flex justify-end space-x-4">
              <button
                onClick={() => setEditingItem(null)}
                className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
              >
                Cancel
              </button>
              <button
                onClick={saveChanges}
                className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 flex items-center"
              >
                <FaSave className="mr-2" /> Save
              </button>
            </div>
          </div>
        );
      } else if ("img" in editingItem) {
        // Dropdown item form
        return (
          <div className="bg-white p-6 rounded-lg shadow-md mb-6">
            <h3 className="text-xl font-bold text-gray-800 mb-4">
              Edit Dropdown Item
            </h3>
            <div className="mb-4">
              <label className="block text-gray-700 mb-2">Text</label>
              <input
                type="text"
                name="text"
                value={editingItem.text}
                onChange={handleInputChange}
                className="w-full p-2 border border-gray-300 rounded"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 mb-2">Link</label>
              <input
                type="text"
                name="href"
                value={editingItem.href}
                onChange={handleInputChange}
                className="w-full p-2 border border-gray-300 rounded"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 mb-2">Image URL</label>
              <input
                type="text"
                name="img"
                value={editingItem.img}
                onChange={handleInputChange}
                className="w-full p-2 border border-gray-300 rounded"
              />
            </div>
            <div className="flex justify-end space-x-4">
              <button
                onClick={() => setEditingItem(null)}
                className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
              >
                Cancel
              </button>
              <button
                onClick={saveChanges}
                className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 flex items-center"
              >
                <FaSave className="mr-2" /> Save
              </button>
            </div>
          </div>
        );
      } else {
        // Main menu item form
        return (
          <div className="bg-white p-6 rounded-lg shadow-md mb-6">
            <h3 className="text-xl font-bold text-gray-800 mb-4">
              Edit Menu Item
            </h3>
            <div className="mb-4">
              <label className="block text-gray-700 mb-2">Title</label>
              <input
                type="text"
                name="title"
                value={editingItem.title}
                onChange={handleInputChange}
                className="w-full p-2 border border-gray-300 rounded"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 mb-2">Link</label>
              <input
                type="text"
                name="href"
                value={editingItem.href}
                onChange={handleInputChange}
                className="w-full p-2 border border-gray-300 rounded"
              />
            </div>
            <div className="flex justify-end space-x-4">
              <button
                onClick={() => setEditingItem(null)}
                className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
              >
                Cancel
              </button>
              <button
                onClick={saveChanges}
                className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 flex items-center"
              >
                <FaSave className="mr-2" /> Save
              </button>
            </div>
          </div>
        );
      }
    }

    switch (currentSection) {
      case "mainMenu":
        return (
          <div className="bg-white p-6 rounded-lg shadow-md mb-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold text-gray-800">
                Main Menu Items
              </h3>
              <button
                onClick={addNewItem}
                className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 flex items-center"
                disabled={isLocked}
              >
                <FaPlus className="mr-2" /> Add Item
              </button>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full bg-white">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="py-2 px-4 border-b border-gray-200 text-left text-gray-700">
                      Title
                    </th>
                    <th className="py-2 px-4 border-b border-gray-200 text-left text-gray-700">
                      Link
                    </th>
                    <th className="py-2 px-4 border-b border-gray-200 text-left text-gray-700">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {config.mainMenu.map((item) => (
                    <tr key={item.id} className="hover:bg-gray-50">
                      <td className="py-2 px-4 border-b border-gray-200">
                        {item.title}
                      </td>
                      <td className="py-2 px-4 border-b border-gray-200">
                        {item.href}
                      </td>
                      <td className="py-2 px-4 border-b border-gray-200">
                        <button
                          onClick={() => setEditingItem(item)}
                          className="mr-2 text-blue-600 hover:text-blue-800"
                          disabled={isLocked}
                        >
                          <FaEdit />
                        </button>
                        <button
                          onClick={() => deleteItem(item.id)}
                          className="text-red-600 hover:text-red-800"
                          disabled={isLocked}
                        >
                          <FaTrash />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        );

      case "services":
        return (
          <div className="bg-white p-6 rounded-lg shadow-md mb-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold text-gray-800">
                Service Categories
              </h3>
              <button
                onClick={addNewItem}
                className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 flex items-center"
                disabled={isLocked}
              >
                <FaPlus className="mr-2" /> Add Category
              </button>
            </div>
            {config.services.map((service) => (
              <div
                key={service.id}
                className="mb-6 border border-gray-200 rounded-lg p-4"
              >
                <div className="flex justify-between items-center mb-3">
                  <h4 className="text-lg font-semibold text-gray-700">
                    {service.title}
                  </h4>
                  <div>
                    <button
                      onClick={() => setEditingItem(service)}
                      className="mr-2 text-blue-600 hover:text-blue-800"
                      disabled={isLocked}
                    >
                      <FaEdit />
                    </button>
                    <button
                      onClick={() => deleteItem(service.id)}
                      className="text-red-600 hover:text-red-800"
                      disabled={isLocked}
                    >
                      <FaTrash />
                    </button>
                  </div>
                </div>
                <div className="ml-4">
                  <h5 className="text-md font-medium text-gray-600 mb-2">
                    Dropdown Items
                  </h5>
                  <button
                    onClick={() =>
                      setEditingItem({
                        id: Date.now().toString(),
                        text: "",
                        href: "",
                        img: "",
                      })
                    }
                    className="mb-3 px-3 py-1 bg-gray-600 text-white rounded hover:bg-gray-700 text-sm flex items-center"
                    disabled={isLocked}
                  >
                    <FaPlus className="mr-1" /> Add Dropdown Item
                  </button>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {service.items.map((item) => (
                      <div
                        key={item.id}
                        className="border border-gray-200 rounded p-3"
                      >
                        <img
                          src={item.img}
                          alt={item.text}
                          className="w-full h-24 object-cover mb-2 rounded"
                        />
                        <p className="font-medium">{item.text}</p>
                        <p className="text-sm text-gray-600">{item.href}</p>
                        <div className="mt-2">
                          <button
                            onClick={() => setEditingItem(item)}
                            className="mr-2 text-blue-600 hover:text-blue-800 text-sm"
                            disabled={isLocked}
                          >
                            <FaEdit />
                          </button>
                          <button
                            onClick={() => deleteItem(item.id)}
                            className="text-red-600 hover:text-red-800 text-sm"
                            disabled={isLocked}
                          >
                            <FaTrash />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        );

      case "social":
        return (
          <div className="bg-white p-6 rounded-lg shadow-md mb-6">
            <h3 className="text-xl font-bold text-gray-800 mb-4">
              Social Media Links
            </h3>
            <div className="space-y-4">
              <div>
                <label className="block text-gray-700 mb-2">Facebook</label>
                <input
                  type="text"
                  name="facebook"
                  value={config.socialLinks.facebook}
                  onChange={handleSocialLinkChange}
                  className="w-full p-2 border border-gray-300 rounded"
                  disabled={isLocked}
                />
              </div>
              <div>
                <label className="block text-gray-700 mb-2">Twitter</label>
                <input
                  type="text"
                  name="twitter"
                  value={config.socialLinks.twitter}
                  onChange={handleSocialLinkChange}
                  className="w-full p-2 border border-gray-300 rounded"
                  disabled={isLocked}
                />
              </div>
              <div>
                <label className="block text-gray-700 mb-2">Instagram</label>
                <input
                  type="text"
                  name="instagram"
                  value={config.socialLinks.instagram}
                  onChange={handleSocialLinkChange}
                  className="w-full p-2 border border-gray-300 rounded"
                  disabled={isLocked}
                />
              </div>
              <div>
                <label className="block text-gray-700 mb-2">LinkedIn</label>
                <input
                  type="text"
                  name="linkedin"
                  value={config.socialLinks.linkedin}
                  onChange={handleSocialLinkChange}
                  className="w-full p-2 border border-gray-300 rounded"
                  disabled={isLocked}
                />
              </div>
              <div>
                <label className="block text-gray-700 mb-2">WhatsApp</label>
                <input
                  type="text"
                  name="whatsapp"
                  value={config.socialLinks.whatsapp}
                  onChange={handleSocialLinkChange}
                  className="w-full p-2 border border-gray-300 rounded"
                  disabled={isLocked}
                />
              </div>
            </div>
          </div>
        );

      case "logo":
        return (
          <div className="bg-white p-6 rounded-lg shadow-md mb-6">
            <h3 className="text-xl font-bold text-gray-800 mb-4">
              Logo Settings
            </h3>
            <div className="mb-4">
              <label className="block text-gray-700 mb-2">Logo URL</label>
              <input
                type="text"
                name="logo"
                value={config.logo}
                onChange={handleInputChange}
                className="w-full p-2 border border-gray-300 rounded"
                disabled={isLocked}
              />
            </div>
            <div className="flex justify-center">
              <img
                src={config.logo}
                alt="Current Logo"
                className="h-24 object-contain"
              />
            </div>
          </div>
        );

      case "languages":
        return (
          <div className="bg-white p-6 rounded-lg shadow-md mb-6">
            <h3 className="text-xl font-bold text-gray-800 mb-4">
              Language Options
            </h3>
            <div className="mb-4">
              <label className="block text-gray-700 mb-2">
                Available Languages (comma separated)
              </label>
              <input
                type="text"
                name="languageOptions"
                value={config.languageOptions.join(", ")}
                onChange={(e) => {
                  const languages = e.target.value
                    .split(",")
                    .map((lang) => lang.trim());
                  setConfig((prev) => ({
                    ...prev,
                    languageOptions: languages,
                  }));
                }}
                className="w-full p-2 border border-gray-300 rounded"
                disabled={isLocked}
              />
            </div>
            <div className="bg-gray-100 p-3 rounded">
              <h4 className="font-medium text-gray-700 mb-2">
                Current Languages:
              </h4>
              <ul className="list-disc pl-5">
                {config.languageOptions.map((lang, index) => (
                  <li key={index} className="text-gray-600">
                    {lang}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-xl text-gray-700">Loading admin panel...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-red-600 text-white shadow-md">
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold">Navbar Content Admin</h1>
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setIsLocked(!isLocked)}
                className="px-4 py-2 bg-white text-red-600 rounded hover:bg-gray-100 flex items-center"
              >
                {isLocked ? (
                  <>
                    <FaLock className="mr-2" /> Unlock Editing
                  </>
                ) : (
                  <>
                    <FaUnlock className="mr-2" /> Lock Editing
                  </>
                )}
              </button>
              <Link
                href="/"
                className="px-4 py-2 bg-gray-800 text-white rounded hover:bg-gray-700"
              >
                Back to Site
              </Link>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row gap-6">
          {/* Sidebar */}
          <div className="w-full md:w-64 bg-white rounded-lg shadow-md p-4 h-fit">
            <h2 className="text-lg font-bold text-gray-800 mb-4">Sections</h2>
            <nav className="space-y-2">
              <button
                onClick={() => setCurrentSection("mainMenu")}
                className={`w-full text-left px-4 py-2 rounded ${
                  currentSection === "mainMenu"
                    ? "bg-red-600 text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                Main Menu
              </button>
              <button
                onClick={() => setCurrentSection("services")}
                className={`w-full text-left px-4 py-2 rounded ${
                  currentSection === "services"
                    ? "bg-red-600 text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                Service Categories
              </button>
              <button
                onClick={() => setCurrentSection("social")}
                className={`w-full text-left px-4 py-2 rounded ${
                  currentSection === "social"
                    ? "bg-red-600 text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                Social Links
              </button>
              <button
                onClick={() => setCurrentSection("logo")}
                className={`w-full text-left px-4 py-2 rounded ${
                  currentSection === "logo"
                    ? "bg-red-600 text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                Logo Settings
              </button>
              <button
                onClick={() => setCurrentSection("languages")}
                className={`w-full text-left px-4 py-2 rounded ${
                  currentSection === "languages"
                    ? "bg-red-600 text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                Language Options
              </button>
            </nav>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            {renderForm()}

            {/* Save All Button */}
            {!editingItem && (
              <div className="bg-white p-6 rounded-lg shadow-md">
                <div className="flex justify-end">
                  <button
                    onClick={saveChanges}
                    className="px-6 py-3 bg-red-600 text-white rounded hover:bg-red-700 flex items-center text-lg"
                    disabled={isLocked}
                  >
                    <FaSave className="mr-2" /> Save All Changes
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;
