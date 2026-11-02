"use client";

import { useState, useEffect } from "react";
import {
  FaLock,
  FaUnlock,
  FaSave,
  FaEdit,
  FaTrash,
  FaPlus,
} from "react-icons/fa";

// Define the Section interface
interface Section {
  id: number;
  title: string;
  subtitle: string;
  content: string;
  image: string;
  alt: string;
  sectionId: string;
  locked: boolean;
  reverse?: boolean;
}

const WebDevelopmentAdmin = () => {
  const initialSections: Section[] = [
    {
      id: 0,
      title: "Introduction to Website Development",
      subtitle: "The Foundation of Your Online Presence",
      content: `<p className="text-gray-300 leading-relaxed mb-4">
        The craft of generating, constructing, and maintaining online websites is known as website development. It encompasses web design, coding, content creation, and focuses on ensuring an optimal user experience. The creation of a website is vital for businesses, organizations, and individuals in this digital age, providing a significant online presence to showcase products and services to a targeted audience.
        <br /><br />
        <strong className="text-blue-300">Relevance in Today's Climate</strong><br />
        <strong className="text-blue-300">Digital Presence:</strong> A website acts as a virtual storefront, available 24/7, allowing businesses to secure brand presence and showcase offerings globally.<br />
        <strong className="text-blue-300">User Interaction:</strong> Engaging and interactive websites build trust and credibility by attracting users and fostering meaningful connections.<br />
        <strong className="text-blue-300">Business Growth:</strong> Increased website traffic drives sales, enhances visibility, and attracts more customers.
      </p>`,
      image:
        "https://img.freepik.com/free-photo/website-development-links-seo-webinar-cyberspace-concept_53876-120953.jpg?uid=R186472209&ga=GA1.1.455755995.1738954286&semt=ais_hybrid&w=740",
      alt: "Website Development",
      sectionId: "website-development",
      locked: false,
    },
    {
      id: 1,
      title: "Why Use the Right Type of Website?",
      subtitle: "Aligning Your Website with Business Goals",
      content: `<p className="text-gray-300 leading-relaxed mb-4">
        Using the right website type ensures your online presence supports your business objectives, whether it's increasing sales, creating brand awareness, or engaging communities. A custom-built website tailored to your needs effectively communicates with your audience and aligns with your goals.
        <br /><br />
        <strong className="text-blue-300">Importance of Matching Website Type to Business Goals</strong><br />
        <strong className="text-blue-300">Efficient Communication:</strong> A well-chosen website type meets audience demands, enhancing user experience.<br />
        <strong className="text-blue-300">Optimization:</strong> Aligning your site with desired outcomes increases traffic, conversions, or user satisfaction.<br />
        <strong className="text-blue-300">Cost and Resource Optimization:</strong> Focus resources on essential features, avoiding unnecessary expenses.
      </p>`,
      image:
        "https://img.freepik.com/premium-photo/website-design-software-provide-snugly-template-online-retail-business_31965-514820.jpg?uid=R186472209&ga=GA1.1.455755995.1738954286&semt=ais_hybrid",
      alt: "Website Types",
      sectionId: "website-types",
      locked: false,
      reverse: true,
    },
    {
      id: 2,
      title: "Why Choose Web Solutions?",
      subtitle: "The Competitive Edge for Modern Businesses",
      content: `<p className="text-gray-300 leading-relaxed mb-4">
        Web solutions are essential for businesses aiming to thrive in the digital age:
        <br /><br />
        <strong className="text-blue-300">Global Reach:</strong> E-commerce solutions and corporate websites allow businesses to connect with customers worldwide, breaking geographical barriers.<br />
        <strong className="text-blue-300">Scalability:</strong> From small WooCommerce stores to large online portals, our solutions scale with your business needs.<br />
        <strong className="text-blue-300">Enhanced User Experience:</strong> Responsive designs with intuitive interfaces ensure seamless user interactions.<br />
        <strong className="text-blue-300">Data-Driven Insights:</strong> Analytics tools offer valuable data on user behavior, helping optimize business strategies.
      </p>`,
      image:
        "https://img.freepik.com/free-photo/3d-rendering-website-hosting-concept_23-2149484783.jpg?uid=R186472209&ga=GA1.1.455755995.1738954286&semt=ais_hybrid&w=740",
      alt: "Web Solutions",
      sectionId: "web-solutions",
      locked: false,
    },
    {
      id: 3,
      title: "Web Solutions for Different Industries",
      subtitle: "Tailored Digital Solutions for Every Sector",
      content: `<p className="text-gray-300 leading-relaxed mb-4">
        Web solutions are versatile, serving various industries with tailored features:
        <br />
        <strong className="text-blue-300">1. Retail and E-commerce</strong>
        <br />
        ● E-commerce websites with WooCommerce stores enable retailers to manage product listings, process payments, and deliver personalized shopping experiences.
        <br />● Enhanced features like abandoned cart recovery and loyalty programs drive sales.
      </p>`,
      image:
        "https://img.freepik.com/premium-vector/website-development-programmers-landing-page_138260-18.jpg?uid=R186472209&ga=GA1.1.455755995.1738954286&semt=webp",
      alt: "Web Use Cases",
      sectionId: "web-industries",
      locked: false,
      reverse: true,
    },
    {
      id: 4,
      title: "E-commerce Websites",
      subtitle: "Empowering Online Sales",
      content: `<p className="text-gray-300 leading-relaxed mb-4">
        E-commerce websites are essential platforms for businesses to sell products or services online, reaching global audiences. They integrate key features to streamline transactions and enhance customer experiences.
        <br /><br />
        <strong className="text-blue-300">Purpose</strong>
        <br />
        <strong className="text-blue-300">Showcase Offerings:</strong> Display products or services attractively and systematically.<br />
        <strong className="text-blue-300">Simplify Transactions:</strong> Enable easy purchasing processes for customers.<br />
        <strong className="text-blue-300">Global Reach:</strong> Cater to local and international markets.<br />
        <strong className="text-blue-300">Customer Data:</strong> Analyze user behavior through analytics to improve marketing strategies.
      </p>`,
      image:
        "https://img.freepik.com/premium-vector/website-development-flat-landing-page-creative-team-designers-developers-work-together-illustration-full-stack-development-software-engineering-web-page-composition-with-people-characters_9209-3545.jpg?uid=R186472209&ga=GA1.1.455755995.1738954286&semt=ais_hybrid&w=740",
      alt: "E-commerce Websites",
      sectionId: "ecommerce-websites",
      locked: false,
    },
    {
      id: 5,
      title: "WooCommerce Websites",
      subtitle: "Flexible E-commerce on WordPress",
      content: `<p className="text-gray-300 leading-relaxed mb-4">
        WooCommerce, a powerful WordPress plugin, transforms websites into fully functional online stores, offering flexibility and control for businesses. It's an ideal solution for small to medium-sized enterprises seeking cost-effective e-commerce capabilities.
        <br /><br />
        <strong className="text-blue-300">Purpose</strong>
        <br />
        <strong className="text-blue-300">Seamless Integration:</strong> Adds e-commerce functionality to any WordPress site.<br />
        <strong className="text-blue-300">Customization:</strong> Allows developers to tailor user experiences through coding.<br />
        <strong className="text-blue-300">Cost-Effective:</strong> Provides access to premium features without expensive software.
      </p>`,
      image:
        "https://img.freepik.com/free-photo/close-up-man-shopping-with-laptop_23-2149241375.jpg?uid=R186472209&ga=GA1.1.455755995.1738954286&semt=ais_items_boosted&w=740",
      alt: "WooCommerce Websites",
      sectionId: "woocommerce-websites",
      locked: false,
      reverse: true,
    },
    {
      id: 6,
      title: "Corporate Websites",
      subtitle: "Building a Professional Digital Presence",
      content: `<p className="text-gray-300 leading-relaxed mb-4">
        The primary aim of a corporate website is to establish an online presence for companies. It serves as a central platform to showcase a business's brand, values, services, and achievements while building credibility and trust among potential clients and partners.
        <br /><br />
        <strong className="text-blue-300">Features</strong>
        <br />
        <strong className="text-blue-300">About Us:</strong> Highlights the company's background, mission, and vision.<br />
        <strong className="text-blue-300">Services:</strong> Details the products and services offered.<br />
        <strong className="text-blue-300">Contact Page:</strong> Provides user-friendly contact forms and information.<br />
        <strong className="text-blue-300">Testimonials:</strong> Showcases customer reviews and success stories.<br />
        <strong className="text-blue-300">Branding Elements:</strong> Incorporates logos, colors, and fonts reflecting the firm's identity.
      </p>`,
      image:
        "https://img.freepik.com/premium-photo/website-design-software-provide-modish-template-online-retail-business_31965-671963.jpg?uid=R186472209&ga=GA1.1.455755995.1738954286&semt=ais_items_boosted&w=740",
      alt: "Corporate Websites",
      sectionId: "corporate-websites",
      locked: false,
    },
    {
      id: 7,
      title: "Online Portals",
      subtitle: "Centralized Digital Platforms for Businesses",
      content: `<p className="text-gray-300 leading-relaxed mb-4">
        Online portals serve as centralized platforms that provide users with access to information, services, or collaboration tools. They are ideal for businesses, educational institutions, or organizations seeking efficiency.
        <br /><br />
        <strong className="text-blue-300">Key Features:</strong>
        <br />● <strong>User Management:</strong> Role-based access for admins, employees, or customers.
        <br />● <strong>Collaboration Tools:</strong> Features like forums, document sharing, and messaging to enhance communication.
        <br />● <strong>Integration Capabilities:</strong> Seamlessly connect with existing systems like ERP or CRM platforms.
        <br />● <strong>Security Measures:</strong> Robust authentication and data encryption for user data protection.
      </p>`,
      image:
        "https://img.freepik.com/free-vector/click-here-concept-illustration_114360-4384.jpg?uid=R186472209&ga=GA1.1.455755995.1738954286&semt=ais_items_boosted&w=740",
      alt: "Online Portals",
      sectionId: "online-portals",
      locked: false,
      reverse: true,
    },
  ];

  const [sections, setSections] = useState<Section[]>(initialSections);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editData, setEditData] = useState<Partial<Section>>({});
  const [isAdding, setIsAdding] = useState(false);
  const [newSection, setNewSection] = useState<Section>({
    id: 0,
    title: "",
    subtitle: "",
    content: "",
    image: "",
    alt: "",
    sectionId: "",
    locked: false,
  });

  // Load data from localStorage
  useEffect(() => {
    const savedSections = localStorage.getItem("webDevSections");
    if (savedSections) {
      try {
        const parsedSections: Section[] = JSON.parse(savedSections);
        setSections(parsedSections);
      } catch (error) {
        console.error("Error parsing localStorage data:", error);
      }
    }
  }, []);

  // Save to localStorage
  useEffect(() => {
    localStorage.setItem("webDevSections", JSON.stringify(sections));
  }, [sections]);

  const handleEdit = (id: number) => {
    const sectionToEdit = sections.find((section) => section.id === id);
    if (sectionToEdit) {
      setEditData({ ...sectionToEdit });
      setEditingId(id);
    }
  };

  const handleSave = (id: number) => {
    // Validate required fields before saving
    if (
      !editData.title ||
      !editData.subtitle ||
      !editData.content ||
      !editData.sectionId
    ) {
      alert(
        "Please fill in all required fields (Title, Subtitle, Content, Section ID)."
      );
      return;
    }
    const updatedSections = sections.map((section) =>
      section.id === id ? { ...section, ...editData } : section
    );
    setSections(updatedSections as Section[]);
    setEditingId(null);
    setEditData({});
  };

  const handleCancel = () => {
    setEditingId(null);
    setEditData({});
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    field: keyof Section
  ) => {
    setEditData({
      ...editData,
      [field]:
        field === "locked"
          ? (e.target as HTMLInputElement).checked
          : e.target.value,
    });
  };

  const toggleLock = (id: number) => {
    const updatedSections = sections.map((section) =>
      section.id === id ? { ...section, locked: !section.locked } : section
    );
    setSections(updatedSections);
  };

  const handleDelete = (id: number) => {
    if (window.confirm("Are you sure you want to delete this section?")) {
      const updatedSections = sections.filter((section) => section.id !== id);
      setSections(updatedSections);
    }
  };

  const handleAddSection = () => {
    setIsAdding(true);
  };

  const handleNewSectionChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    field: keyof Section
  ) => {
    setNewSection({
      ...newSection,
      [field]:
        field === "locked"
          ? (e.target as HTMLInputElement).checked
          : e.target.value,
    });
  };

  const handleSaveNewSection = () => {
    // Validate required fields
    if (
      !newSection.title ||
      !newSection.subtitle ||
      !newSection.content ||
      !newSection.sectionId
    ) {
      alert(
        "Please fill in all required fields (Title, Subtitle, Content, Section ID)."
      );
      return;
    }
    const newId =
      sections.length > 0 ? Math.max(...sections.map((s) => s.id)) + 1 : 0;
    const sectionToAdd: Section = {
      ...newSection,
      id: newId,
      sectionId:
        newSection.sectionId ||
        newSection.title.toLowerCase().replace(/\s+/g, "-"),
    };

    setSections([...sections, sectionToAdd]);
    setIsAdding(false);
    setNewSection({
      id: 0,
      title: "",
      subtitle: "",
      content: "",
      image: "",
      alt: "",
      sectionId: "",
      locked: false,
    });
  };

  const handleCancelAdd = () => {
    setIsAdding(false);
    setNewSection({
      id: 0,
      title: "",
      subtitle: "",
      content: "",
      image: "",
      alt: "",
      sectionId: "",
      locked: false,
    });
  };

  return (
    <div className="min-h-screen bg-gray-900 p-6">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-red-500 mb-6">
          Web Development Content Admin
        </h1>

        <div className="mb-6 flex justify-between items-center">
          <h2 className="text-xl font-semibold text-gray-300">
            Manage Sections
          </h2>
          <button
            onClick={handleAddSection}
            className="bg-red-600 text-white px-4 py-2 rounded flex items-center hover:bg-red-700 transition-colors"
          >
            <FaPlus className="mr-2" /> Add New
          </button>
        </div>

        {isAdding && (
          <div className="bg-gray-800 p-6 rounded-lg shadow-md mb-6 border-2 border-red-500">
            <h3 className="text-lg font-semibold mb-4 text-red-400">
              New Section
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-gray-300 mb-2">Title</label>
                <input
                  type="text"
                  value={newSection.title}
                  onChange={(e) => handleNewSectionChange(e, "title")}
                  className="w-full p-2 border border-gray-600 rounded bg-gray-700 text-white"
                />
              </div>
              <div>
                <label className="block text-gray-300 mb-2">Subtitle</label>
                <input
                  type="text"
                  value={newSection.subtitle}
                  onChange={(e) => handleNewSectionChange(e, "subtitle")}
                  className="w-full p-2 border border-gray-600 rounded bg-gray-700 text-white"
                />
              </div>
              <div>
                <label className="block text-gray-300 mb-2">Image URL</label>
                <input
                  type="text"
                  value={newSection.image}
                  onChange={(e) => handleNewSectionChange(e, "image")}
                  className="w-full p-2 border border-gray-600 rounded bg-gray-700 text-white"
                />
              </div>
              <div>
                <label className="block text-gray-300 mb-2">Alt Text</label>
                <input
                  type="text"
                  value={newSection.alt}
                  onChange={(e) => handleNewSectionChange(e, "alt")}
                  className="w-full p-2 border border-gray-600 rounded bg-gray-700 text-white"
                />
              </div>
              <div>
                <label className="block text-gray-300 mb-2">Section ID</label>
                <input
                  type="text"
                  value={newSection.sectionId}
                  onChange={(e) => handleNewSectionChange(e, "sectionId")}
                  className="w-full p-2 border border-gray-600 rounded bg-gray-700 text-white"
                />
              </div>
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="locked"
                  checked={newSection.locked}
                  onChange={(e) => handleNewSectionChange(e, "locked")}
                  className="mr-2 h-5 w-5 text-red-600 rounded focus:ring-red-500"
                />
                <label htmlFor="locked" className="text-gray-300">
                  Lock section
                </label>
              </div>
            </div>
            <div className="mb-4">
              <label className="block text-gray-300 mb-2">Content (HTML)</label>
              <textarea
                value={newSection.content}
                onChange={(e) => handleNewSectionChange(e, "content")}
                className="w-full p-2 border border-gray-600 rounded bg-gray-700 text-white h-40"
              />
            </div>
            <div className="flex justify-end space-x-4">
              <button
                onClick={handleCancelAdd}
                className="bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveNewSection}
                className="bg-red-600 text-white px-4 py-2 rounded flex items-center hover:bg-red-700 transition-colors"
              >
                <FaSave className="mr-2" /> Save
              </button>
            </div>
          </div>
        )}

        <div className="space-y-6">
          {sections.map((section) => (
            <div
              key={section.id}
              className={`bg-gray-800 p-6 rounded-lg shadow-md border-l-4 ${
                section.locked ? "border-red-500" : "border-gray-600"
              } hover:shadow-red-500/10 transition-all`}
            >
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-xl font-semibold text-gray-200">
                    {section.title}
                    {section.locked && (
                      <span className="ml-2 text-red-400 text-sm">
                        (Locked)
                      </span>
                    )}
                  </h3>
                  <p className="text-gray-400">{section.subtitle}</p>
                  <p className="text-sm text-gray-500 mt-1">
                    ID: {section.sectionId}
                  </p>
                </div>
                <div className="flex space-x-2">
                  <button
                    onClick={() => toggleLock(section.id)}
                    className={`p-2 rounded ${
                      section.locked
                        ? "bg-green-600 hover:bg-green-700"
                        : "bg-red-600 hover:bg-red-700"
                    } text-white transition-colors`}
                    title={section.locked ? "Unlock" : "Lock"}
                  >
                    {section.locked ? <FaUnlock /> : <FaLock />}
                  </button>
                  <button
                    onClick={() => handleEdit(section.id)}
                    disabled={section.locked}
                    className={`p-2 rounded ${
                      section.locked
                        ? "bg-gray-600 cursor-not-allowed"
                        : "bg-blue-600 hover:bg-blue-700"
                    } text-white transition-colors`}
                    title="Edit"
                  >
                    <FaEdit />
                  </button>
                  <button
                    onClick={() => handleDelete(section.id)}
                    disabled={section.locked}
                    className={`p-2 rounded ${
                      section.locked
                        ? "bg-gray-600 cursor-not-allowed"
                        : "bg-red-600 hover:bg-red-700"
                    } text-white transition-colors`}
                    title="Delete"
                  >
                    <FaTrash />
                  </button>
                </div>
              </div>

              {editingId === section.id ? (
                <div className="mt-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div>
                      <label className="block text-gray-300 mb-2">Title</label>
                      <input
                        type="text"
                        value={editData.title || ""}
                        onChange={(e) => handleChange(e, "title")}
                        className="w-full p-2 border border-gray-600 rounded bg-gray-700 text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-gray-300 mb-2">
                        Subtitle
                      </label>
                      <input
                        type="text"
                        value={editData.subtitle || ""}
                        onChange={(e) => handleChange(e, "subtitle")}
                        className="w-full p-2 border border-gray-600 rounded bg-gray-700 text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-gray-300 mb-2">
                        Image URL
                      </label>
                      <input
                        type="text"
                        value={editData.image || ""}
                        onChange={(e) => handleChange(e, "image")}
                        className="w-full p-2 border border-gray-600 rounded bg-gray-700 text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-gray-300 mb-2">
                        Alt Text
                      </label>
                      <input
                        type="text"
                        value={editData.alt || ""}
                        onChange={(e) => handleChange(e, "alt")}
                        className="w-full p-2 border border-gray-600 rounded bg-gray-700 text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-gray-300 mb-2">
                        Section ID
                      </label>
                      <input
                        type="text"
                        value={editData.sectionId || ""}
                        onChange={(e) => handleChange(e, "sectionId")}
                        className="w-full p-2 border border-gray-600 rounded bg-gray-700 text-white"
                      />
                    </div>
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        id={`locked-${section.id}`}
                        checked={editData.locked || false}
                        onChange={(e) => handleChange(e, "locked")}
                        className="mr-2 h-5 w-5 text-red-600 rounded focus:ring-red-500"
                      />
                      <label
                        htmlFor={`locked-${section.id}`}
                        className="text-gray-300"
                      >
                        Lock section
                      </label>
                    </div>
                  </div>
                  <div className="mb-4">
                    <label className="block text-gray-300 mb-2">
                      Content (HTML)
                    </label>
                    <textarea
                      value={editData.content || ""}
                      onChange={(e) => handleChange(e, "content")}
                      className="w-full p-2 border border-gray-600 rounded bg-gray-700 text-white h-40"
                    />
                  </div>
                  <div className="flex justify-end space-x-4">
                    <button
                      onClick={handleCancel}
                      className="bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700 transition-colors"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={() => handleSave(section.id)}
                      className="bg-red-600 text-white px-4 py-2 rounded flex items-center hover:bg-red-700 transition-colors"
                    >
                      <FaSave className="mr-2" /> Save
                    </button>
                  </div>
                </div>
              ) : (
                <div className="mt-4">
                  <div className="mb-4 max-w-xs">
                    <img
                      src={section.image}
                      alt={section.alt}
                      className="w-full h-32 object-cover rounded shadow-sm border border-gray-700"
                    />
                    <p className="text-xs text-gray-500 mt-1 truncate">
                      {section.image}
                    </p>
                  </div>
                  <div
                    className="prose max-w-none text-gray-300"
                    dangerouslySetInnerHTML={{ __html: section.content }}
                  />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default WebDevelopmentAdmin;
