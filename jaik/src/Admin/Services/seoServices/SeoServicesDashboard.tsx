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
  id: string;
  title: string;
  content: string;
  image: string;
  alt: string;
  reverse?: boolean;
  locked: boolean;
}

const SEODashboardAdmin = () => {
  const initialSections: Section[] = [
    {
      id: "google-seo",
      title: "What Are Google SEO Services?",
      content:
        '<p class="text-lg md:text-xl font-medium leading-relaxed mb-6 text-gray-200">Google SEO Services encompass strategies to improve your website\'s visibility on search engines, driving organic traffic and enhancing user experience. These services include <span class="font-bold text-red-400">Website Audit Reports</span>, <span class="font-bold text-red-400">On-Page SEO</span>, <span class="font-bold text-red-400">Off-Page SEO</span>, and <span class="font-bold text-red-400">Technical SEO</span> to ensure your site ranks higher.</p><p class="text-lg md:text-xl font-medium leading-relaxed mb-6 text-gray-200"><span class="font-bold text-red-400">Our Approach:</span> At Jaivik Technology, we provide comprehensive SEO solutions tailored to your business needs. Our audits identify performance gaps, while our SEO strategies optimize content, backlinks, and technical aspects to boost rankings.</p><p class="text-lg md:text-xl font-medium leading-relaxed mb-6 text-gray-200"><span class="font-bold text-red-400">Long-Term Success:</span> Our approach ensures long-term success by aligning with Google\'s algorithms and best practices.</p><div class="mt-6"><h3 class="text-xl font-bold text-red-400 mb-4">Advanced Strategies:</h3><p class="text-lg md:text-xl font-medium leading-relaxed mb-6 text-gray-200">We combine keyword research, content optimization, and technical fixes to enhance your site\'s authority. Our team uses tools like Google Analytics and Search Console to monitor performance and adapt strategies for maximum ROI.</p><h3 class="text-xl font-bold text-red-400 mb-4">Case Study:</h3><p class="text-lg md:text-xl font-medium leading-relaxed text-gray-200">For example, an e-commerce site could see a 50% increase in organic traffic within months through our targeted SEO campaigns, while a local business might improve local search rankings with optimized Google My Business profiles.</p></div>',
      image:
        "https://img.freepik.com/free-photo/magnifying-glass-with-seo-concepts_1134-81.jpg",
      alt: "SEO Services Overview",
      locked: false,
    },
    {
      id: "website-audit",
      title: "What Is a Website Audit Report?",
      content:
        '<p class="text-lg md:text-xl font-medium leading-relaxed mb-6 text-gray-200">A Website Audit Report is a detailed analysis of your website\'s performance, identifying issues affecting SEO, usability, and speed. It covers:</p><h3 class="text-xl font-bold text-red-400 mb-4">Technical Issues:</h3><p class="text-lg md:text-xl font-medium leading-relaxed mb-6 text-gray-200">Broken links, slow loading times, and mobile responsiveness.</p><h3 class="text-xl font-bold text-red-400 mb-4">Content Gaps:</h3><p class="text-lg md:text-xl font-medium leading-relaxed mb-6 text-gray-200">Missing keywords, duplicate content, and thin pages.</p><div class="mt-6"><h3 class="text-xl font-bold text-red-400 mb-4">Security Concerns:</h3><p class="text-lg md:text-xl font-medium leading-relaxed mb-6 text-gray-200">SSL issues, outdated plugins, and vulnerable code.</p><h3 class="text-xl font-bold text-red-400 mb-4">Our Expertise:</h3><p class="text-lg md:text-xl font-medium leading-relaxed mb-6 text-gray-200">Jaivik Technology\'s audits provide actionable recommendations to fix issues and improve rankings. Our reports include prioritized tasks, such as optimizing meta tags or fixing crawl errors, to enhance your site\'s performance.</p><h3 class="text-xl font-bold text-red-400 mb-4">Results:</h3><p class="text-lg md:text-xl font-medium leading-relaxed text-gray-200">For instance, a client reduced bounce rates by 30% after implementing our audit recommendations, leading to higher engagement and conversions.</p></div>',
      image:
        "https://img.freepik.com/free-photo/seo-website-development-data-network-concept_53876-127578.jpg",
      alt: "Website Audit Report",
      reverse: true,
      locked: false,
    },
    {
      id: "on-page-seo",
      title: "On-Page SEO: Optimizing Content",
      content:
        '<p class="text-lg md:text-xl font-medium leading-relaxed mb-6 text-gray-200">On-Page SEO focuses on optimizing individual web pages to rank higher. Key elements include:</p><h3 class="text-xl font-bold text-red-400 mb-4">Keyword Optimization:</h3><p class="text-lg md:text-xl font-medium leading-relaxed mb-6 text-gray-200">Using relevant keywords in titles, headers, and content.</p><h3 class="text-xl font-bold text-red-400 mb-4">Content Quality:</h3><p class="text-lg md:text-xl font-medium leading-relaxed mb-6 text-gray-200">Creating engaging, informative content that meets user intent.</p><h3 class="text-xl font-bold text-red-400 mb-4">Meta Tags:</h3><p class="text-lg md:text-xl font-medium leading-relaxed mb-6 text-gray-200">Crafting compelling meta titles and descriptions.</p><div class="mt-6"><h3 class="text-xl font-bold text-red-400 mb-4">Image Optimization:</h3><p class="text-lg md:text-xl font-medium leading-relaxed mb-6 text-gray-200">Using alt text and compressed images for faster load times.</p><h3 class="text-xl font-bold text-red-400 mb-4">Internal Linking:</h3><p class="text-lg md:text-xl font-medium leading-relaxed mb-6 text-gray-200">Connecting related pages to improve navigation and dwell time.</p><h3 class="text-xl font-bold text-red-400 mb-4">Our Impact:</h3><p class="text-lg md:text-xl font-medium leading-relaxed text-gray-200">Jaivik Technology\'s On-Page SEO services ensure your content is user-friendly and search-engine optimized. Our clients have seen up to a 40% increase in click-through rates after optimizing meta descriptions and headers.</p></div>',
      image:
        "https://img.freepik.com/premium-photo/seo-word-written-computer_192941-1129.jpg",
      alt: "On-Page SEO",
      locked: false,
    },
    {
      id: "off-page-seo",
      title: "Off-Page SEO: Building Authority",
      content:
        '<p class="text-lg md:text-xl font-medium leading-relaxed mb-6 text-gray-200">Off-Page SEO enhances your website\'s authority through external factors:</p><h3 class="text-xl font-bold text-red-400 mb-4">Backlink Building:</h3><p class="text-lg md:text-xl font-medium leading-relaxed mb-6 text-gray-200">Acquiring high-quality backlinks from reputable sites.</p><h3 class="text-xl font-bold text-red-400 mb-4">Social Signals:</h3><p class="text-lg md:text-xl font-medium leading-relaxed mb-6 text-gray-200">Leveraging social media to boost brand visibility.</p><div class="mt-6"><h3 class="text-xl font-bold text-red-400 mb-4">Guest Posting:</h3><p class="text-lg md:text-xl font-medium leading-relaxed mb-6 text-gray-200">Publishing content on authoritative blogs to drive traffic.</p><h3 class="text-xl font-bold text-red-400 mb-4">Local Citations:</h3><p class="text-lg md:text-xl font-medium leading-relaxed mb-6 text-gray-200">Listing your business on directories like Yelp and Google My Business.</p><h3 class="text-xl font-bold text-red-400 mb-4">Our Strategy:</h3><p class="text-lg md:text-xl font-medium leading-relaxed text-gray-200">Jaivik Technology\'s Off-Page SEO strategies focus on ethical link-building and brand mentions, resulting in a 25% increase in domain authority for clients within six months.</p></div>',
      image:
        "https://img.freepik.com/premium-photo/seo-search-engine-optimization-modish-ecommerce-online-retail-business_31965-63120.jpg",
      alt: "Off-Page SEO",
      reverse: true,
      locked: false,
    },
    {
      id: "technical-seo",
      title: "Technical SEO: Enhancing Performance",
      content:
        '<p class="text-lg md:text-xl font-medium leading-relaxed mb-6 text-gray-200">Technical SEO optimizes your website\'s infrastructure for better crawling and indexing:</p><h3 class="text-xl font-bold text-red-400 mb-4">Site Speed:</h3><p class="text-lg md:text-xl font-medium leading-relaxed mb-6 text-gray-200">Reducing load times with caching and compression.</p><h3 class="text-xl font-bold text-red-400 mb-4">Mobile Optimization:</h3><p class="text-lg md:text-xl font-medium leading-relaxed mb-6 text-gray-200">Ensuring responsive design for all devices.</p><h3 class="text-xl font-bold text-red-400 mb-4">XML Sitemaps:</h3><p class="text-lg md:text-xl font-medium leading-relaxed mb-6 text-gray-200">Helping search engines navigate your site.</p><div class="mt-6"><h3 class="text-xl font-bold text-red-400 mb-4">Schema Markup:</h3><p class="text-lg md:text-xl font-medium leading-relaxed mb-6 text-gray-200">Adding structured data to improve rich snippets.</p><h3 class="text-xl font-bold text-red-400 mb-4">Security:</h3><p class="text-lg md:text-xl font-medium leading-relaxed mb-6 text-gray-200">Implementing HTTPS and fixing vulnerabilities.</p><h3 class="text-xl font-bold text-red-400 mb-4">Our Results:</h3><p class="text-lg md:text-xl font-medium leading-relaxed text-gray-200">Jaivik Technology\'s Technical SEO services improve site performance, with clients reporting a 35% reduction in page load times and higher rankings after fixes.</p></div>',
      image:
        "https://img.freepik.com/premium-photo/seo-search-engine-optimization-modish-ecommerce-online-retail-business_31965-46392.jpg",
      alt: "Technical SEO",
      locked: false,
    },
  ];

  const [sections, setSections] = useState<Section[]>(initialSections);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editData, setEditData] = useState<Partial<Section>>({});
  const [isAdding, setIsAdding] = useState(false);
  const [newSection, setNewSection] = useState<
    Omit<Section, "id"> & { id: string }
  >({
    id: "",
    title: "",
    content: "",
    image: "",
    alt: "",
    locked: false,
  });

  // Load data from localStorage
  useEffect(() => {
    const savedSections = localStorage.getItem("seoSections");
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
    localStorage.setItem("seoSections", JSON.stringify(sections));
  }, [sections]);

  const handleEdit = (id: string) => {
    const sectionToEdit = sections.find((section) => section.id === id);
    if (sectionToEdit) {
      setEditData({ ...sectionToEdit });
      setEditingId(id);
    }
  };

  const handleSave = (id: string) => {
    // Validate required fields before saving
    if (!editData.title || !editData.content) {
      alert("Please fill in all required fields (Title and Content).");
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

  const toggleLock = (id: string) => {
    const updatedSections = sections.map((section) =>
      section.id === id ? { ...section, locked: !section.locked } : section
    );
    setSections(updatedSections);
  };

  const handleDelete = (id: string) => {
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
    if (!newSection.title || !newSection.content || !newSection.id) {
      alert("Please fill in all required fields (Title, Content, and ID).");
      return;
    }

    // Check if ID already exists
    if (sections.some((section) => section.id === newSection.id)) {
      alert("A section with this ID already exists. Please use a unique ID.");
      return;
    }

    const sectionToAdd: Section = {
      ...newSection,
      id: newSection.id,
    };

    setSections([...sections, sectionToAdd]);
    setIsAdding(false);
    setNewSection({
      id: "",
      title: "",
      content: "",
      image: "",
      alt: "",
      locked: false,
    });
  };

  const handleCancelAdd = () => {
    setIsAdding(false);
    setNewSection({
      id: "",
      title: "",
      content: "",
      image: "",
      alt: "",
      locked: false,
    });
  };

  return (
    <div className="min-h-screen bg-gray-900 p-6">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-red-500 mb-6">
          SEO Dashboard Content Admin
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
                <label className="block text-gray-300 mb-2">
                  ID (Unique Identifier)
                </label>
                <input
                  type="text"
                  value={newSection.id}
                  onChange={(e) => handleNewSectionChange(e, "id")}
                  className="w-full p-2 border border-gray-600 rounded bg-gray-700 text-white"
                />
              </div>
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
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="reverse"
                  checked={newSection.reverse || false}
                  onChange={(e) => handleNewSectionChange(e, "reverse")}
                  className="mr-2 h-5 w-5 text-red-600 rounded focus:ring-red-500"
                />
                <label htmlFor="reverse" className="text-gray-300">
                  Reverse layout
                </label>
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
                  <p className="text-sm text-gray-500 mt-1">ID: {section.id}</p>
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
                      <label className="block text-gray-300 mb-2">ID</label>
                      <input
                        type="text"
                        value={editData.id || ""}
                        onChange={(e) => handleChange(e, "id")}
                        className="w-full p-2 border border-gray-600 rounded bg-gray-700 text-white"
                        disabled
                      />
                    </div>
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
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        id={`reverse-${section.id}`}
                        checked={editData.reverse || false}
                        onChange={(e) => handleChange(e, "reverse")}
                        className="mr-2 h-5 w-5 text-red-600 rounded focus:ring-red-500"
                      />
                      <label
                        htmlFor={`reverse-${section.id}`}
                        className="text-gray-300"
                      >
                        Reverse layout
                      </label>
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

export default SEODashboardAdmin;
