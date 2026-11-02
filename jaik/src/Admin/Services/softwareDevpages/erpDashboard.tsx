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

/**
 * Interface for a section in the ERP dashboard.
 */
interface Section {
  id: string;
  title: string;
  content: string;
  image: string;
  alt: string;
  reverse?: boolean;
  locked: boolean;
}

/**
 * Interface for a testimonial in the ERP dashboard.
 */
interface Testimonial {
  quote: string;
  author: string;
  company: string;
}

/**
 * Admin dashboard for managing ERP content sections and testimonials.
 * Allows CRUD operations with localStorage persistence.
 * @returns JSX.Element
 */
const ERPDashboardAdmin = () => {
  // Initial data for sections
  const initialSections: Section[] = [
    {
      id: "what-is-erp",
      title: "What Is ERP?",
      content: `
        <p className="text-lg leading-relaxed mb-6 text-gray-300">
          ERP, or Enterprise Resource Planning, is a strategic approach to
          managing core business processes. It combines technology, processes, and
          data to streamline operations in finance, supply chain,
          manufacturing, human resources, and more.
        </p>
        <p className="text-lg leading-relaxed mb-6 text-gray-300">
          ERP systems serve as a central hub, managing critical data like
          inventory, production schedules, financial records, and employee
          information. They facilitate collaboration, automate tasks, and
          provide real-time insights, enhanced by AI, analytics, and
          integrations for data-driven decisions.
        </p>`,
      image:
        "https://img.freepik.com/free-vector/hand-drawn-flat-design-erp-illustration_23-2149379505.jpg",
      alt: "ERP Solutions",
      locked: false,
    },
    {
      id: "what-does-erp-do",
      title: "What Does ERP Do?",
      content: `
        <p className="text-lg leading-relaxed mb-6 text-gray-300">
          ERP systems integrate and automate core business processes,
          enhancing efficiency across departments. Key functionalities
          include:
        </p>
        <ul className="list-disc list-inside text-lg leading-relaxed mb-6 space-y-2 text-gray-300">
          <li>
            <span className="font-semibold text-purple-400">Centralizing Data:</span>
            Consolidates financials, inventory, and HR into one database for
            consistency and visibility.
          </li>
          <li>
            <span className="font-semibold text-purple-400">Streamlining Operations:</span>
            Connects functions, reduces silos, and improves workflows.
          </li>
        </ul>`,
      image:
        "https://img.freepik.com/free-photo/enterprise-resource-planning-holographic-interface_23-2149092251.jpg",
      alt: "ERP Features",
      reverse: true,
      locked: false,
    },
    {
      id: "why-choose-erp",
      title: "Why Should Enterprises opt for ERP?",
      content: `
        <p className="text-lg leading-relaxed mb-6 text-gray-300">
          ERP systems are essential for modern businesses, offering:
        </p>
        <ul className="list-disc list-inside text-lg leading-relaxed mb-6 space-y-2 text-gray-300">
          <li>
            <span className="font-semibold text-purple-400">Operational Efficiency:</span>
            Automates tasks and eliminates redundant processes.
          </li>
          <li>
            <span className="font-semibold text-purple-400">Data Visibility:</span>
            Provides real-time analytics for informed decisions.
          </li>
          <li>
            <span className="font-semibold text-purple-400">Scalability:</span>
            Adapts to business growth and expansion.
          </li>
          <li>
            <span className="font-semibold text-purple-400">Cost Reduction:</span>
            Lowers operational costs through efficiency.
          </li>
        </ul>`,
      image:
        "https://img.freepik.com/premium-vector/enterprise-resource-planning-erp-modules-finance-supplychain-manufacturing-inventory_51841-2415.jpg",
      alt: "ERP Benefits",
      locked: false,
    },
    {
      id: "erp-industries",
      title: "ERP for Different Industries",
      content: `
        <p className="text-lg leading-relaxed mb-6 text-gray-300">
          ERP solutions are tailored to meet industry-specific needs, driving
          efficiency and growth across sectors:
        </p>
        <ul className="list-disc list-inside text-lg leading-relaxed mb-6 space-y-2 text-gray-300">
          <li>
            <span className="font-semibold text-purple-400">Manufacturing:</span>
            Optimizes production, inventory, and quality control.
          </li>
          <li>
            <span className="font-semibold text-purple-400">Retail:</span>
            Manages multi-location inventory and sales trends.
          </li>
        </ul>`,
      image:
        "https://img.freepik.com/free-vector/erp-infographic_23-2149371099.jpg",
      alt: "ERP Use Cases",
      reverse: true,
      locked: false,
    },
  ];

  // Initial data for testimonials
  const initialTestimonials: Testimonial[] = [
    {
      quote:
        "Jaivik Technology's ERP implementation reduced our operational costs by 30% and improved inventory accuracy to 99%.",
      author: "Rajesh Kumar",
      company: "Manufacturing Solutions Ltd.",
    },
    {
      quote:
        "The ERP system streamlined our financial reporting, saving 20 hours per week in manual processes.",
      author: "Priya Sharma",
      company: "Retail Chain Inc.",
    },
  ];

  // State management
  const [sections, setSections] = useState<Section[]>(initialSections);
  const [testimonials, setTestimonials] =
    useState<Testimonial[]>(initialTestimonials);
  const [editingSectionId, setEditingSectionId] = useState<string | null>(null);
  const [editSectionData, setEditSectionData] = useState<Partial<Section>>({});
  const [isAddingSection, setIsAddingSection] = useState(false);
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
  const [editingTestimonialIndex, setEditingTestimonialIndex] = useState<
    number | null
  >(null);
  const [editTestimonialData, setEditTestimonialData] = useState<
    Partial<Testimonial>
  >({});
  const [isAddingTestimonial, setIsAddingTestimonial] = useState(false);
  const [newTestimonial, setNewTestimonial] = useState<Testimonial>({
    quote: "",
    author: "",
    company: "",
  });

  /**
   * Load sections and testimonials from localStorage on component mount.
   */
  useEffect(() => {
    const loadData = () => {
      try {
        const savedSections = localStorage.getItem("erpSections");
        if (savedSections) {
          setSections(JSON.parse(savedSections));
        }

        const savedTestimonials = localStorage.getItem("erpTestimonials");
        if (savedTestimonials) {
          setTestimonials(JSON.parse(savedTestimonials));
        }
      } catch (error) {
        console.error("Failed to load data from localStorage:", error);
        alert("Error loading saved data. Using default values.");
      }
    };

    loadData();
  }, []);

  /**
   * Save sections and testimonials to localStorage whenever they change.
   */
  useEffect(() => {
    try {
      localStorage.setItem("erpSections", JSON.stringify(sections));
      localStorage.setItem("erpTestimonials", JSON.stringify(testimonials));
    } catch (error) {
      console.error("Failed to save data to localStorage:", error);
      alert("Error saving data.");
    }
  }, [sections, testimonials]);

  /**
   * Handle input changes for editing an existing section.
   * @param e - The input event
   * @param field - The section field to update
   */
  const handleSectionChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    field: keyof Section
  ) => {
    setEditSectionData({
      ...editSectionData,
      [field]:
        field === "locked" || field === "reverse"
          ? (e.target as HTMLInputElement).checked
          : e.target.value,
    });
  };

  /**
   * Handle input changes for a new section.
   * @param e - The input event
   * @param field - The section field to update
   */
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

  /**
   * Start editing a section by populating the edit form.
   * @param id - The ID of the section to edit
   */
  const handleEditSection = (id: string) => {
    const sectionToEdit = sections.find((section) => section.id === id);
    if (sectionToEdit) {
      setEditSectionData({ ...sectionToEdit });
      setEditingSectionId(id);
    }
  };

  /**
   * Save changes to an existing section.
   * @param id - The ID of the section to save
   */
  const handleSaveSection = (id: string) => {
    if (!editSectionData.title || !editSectionData.content) {
      alert("Please fill in all required fields (Title and Content).");
      return;
    }
    setSections(
      sections.map((section) =>
        section.id === id ? { ...section, ...editSectionData } : section
      )
    );
    setEditingSectionId(null);
    setEditSectionData({});
  };

  /**
   * Toggle the locked state of a section.
   * @param id - The ID of the section to toggle
   */
  const toggleSectionLock = (id: string) => {
    setSections(
      sections.map((section) =>
        section.id === id ? { ...section, locked: !section.locked } : section
      )
    );
  };

  /**
   * Delete a section after user confirmation.
   * @param id - The ID of the section to delete
   */
  const handleDeleteSection = (id: string) => {
    if (window.confirm("Are you sure you want to delete this section?")) {
      setSections(sections.filter((section) => section.id !== id));
    }
  };

  /**
   * Save a new section after validation.
   */
  const handleSaveNewSection = () => {
    if (!newSection.title || !newSection.content || !newSection.id) {
      alert("Please fill in all required fields (Title, Content, and ID).");
      return;
    }
    if (sections.some((section) => section.id === newSection.id)) {
      alert("A section with this ID already exists. Please use a unique ID.");
      return;
    }
    setSections([...sections, { ...newSection }]);
    setIsAddingSection(false);
    setNewSection({
      id: "",
      title: "",
      content: "",
      image: "",
      alt: "",
      locked: false,
    });
  };

  /**
   * Handle input changes for testimonials (editing or new).
   * @param e - The input event
   * @param field - The testimonial field to update
   */
  const handleTestimonialChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    field: keyof Testimonial
  ) => {
    const value = e.target.value;
    if (editingTestimonialIndex !== null) {
      setEditTestimonialData({ ...editTestimonialData, [field]: value });
    } else if (isAddingTestimonial) {
      setNewTestimonial({ ...newTestimonial, [field]: value });
    }
  };

  /**
   * Start editing a testimonial.
   * @param index - The index of the testimonial to edit
   */
  const handleEditTestimonial = (index: number) => {
    setEditTestimonialData({ ...testimonials[index] });
    setEditingTestimonialIndex(index);
  };

  /**
   * Save changes to an existing testimonial.
   * @param index - The index of the testimonial to save
   */
  const handleSaveTestimonial = (index: number) => {
    if (!editTestimonialData.quote || !editTestimonialData.author) {
      alert("Please fill in all required fields (Quote and Author).");
      return;
    }
    const updatedTestimonials = [...testimonials];
    updatedTestimonials[index] = {
      ...updatedTestimonials[index],
      ...editTestimonialData,
    };
    setTestimonials(updatedTestimonials);
    setEditingTestimonialIndex(null);
    setEditTestimonialData({});
  };

  /**
   * Save a new testimonial after validation.
   */
  const handleSaveNewTestimonial = () => {
    if (!newTestimonial.quote || !newTestimonial.author) {
      alert("Please fill in all required fields (Quote and Author).");
      return;
    }
    setTestimonials([...testimonials, newTestimonial]);
    setIsAddingTestimonial(false);
    setNewTestimonial({ quote: "", author: "", company: "" });
  };

  /**
   * Delete a testimonial after user confirmation.
   * @param index - The index of the testimonial to delete
   */
  const handleDeleteTestimonial = (index: number) => {
    if (window.confirm("Are you sure you want to delete this testimonial?")) {
      setTestimonials(testimonials.filter((_, i) => i !== index));
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 p-6">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-purple-500 mb-6">
          ERP Content Admin
        </h1>

        {/* Sections Management */}
        <section className="mb-12">
          <div className="mb-6 flex justify-between items-center">
            <h2 className="text-xl font-semibold text-gray-300">
              Manage Sections
            </h2>
            <button
              onClick={() => setIsAddingSection(true)}
              className="bg-purple-600 text-white px-4 py-2 rounded flex items-center hover:bg-purple-700 transition-colors"
            >
              <FaPlus className="mr-2" /> Add New Section
            </button>
          </div>

          {isAddingSection && (
            <div className="bg-gray-800 p-6 rounded-lg shadow-md mb-6 border-2 border-purple-500">
              <h3 className="text-lg font-semibold mb-4 text-purple-400">
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
                    className="mr-2 h-5 w-5 text-purple-600 rounded focus:ring-purple-500"
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
                    className="mr-2 h-5 w-5 text-purple-600 rounded focus:ring-purple-500"
                  />
                  <label htmlFor="locked" className="text-gray-300">
                    Lock section
                  </label>
                </div>
              </div>
              <div className="mb-4">
                <label className="block text-gray-300 mb-2">
                  Content (HTML)
                </label>
                <textarea
                  value={newSection.content}
                  onChange={(e) => handleNewSectionChange(e, "content")}
                  className="w-full p-2 border border-gray-600 rounded bg-gray-700 text-white h-40"
                />
              </div>
              <div className="flex justify-end space-x-4">
                <button
                  onClick={() => setIsAddingSection(false)}
                  className="bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSaveNewSection}
                  className="bg-purple-600 text-white px-4 py-2 rounded flex items-center hover:bg-purple-700 transition-colors"
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
                  section.locked ? "border-purple-500" : "border-gray-600"
                } hover:shadow-purple-500/10 transition-all`}
              >
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-xl font-semibold text-gray-200">
                      {section.title}
                      {section.locked && (
                        <span className="ml-2 text-purple-400 text-sm">
                          (Locked)
                        </span>
                      )}
                    </h3>
                    <p className="text-sm text-gray-500 mt-1">
                      ID: {section.id}
                    </p>
                  </div>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => toggleSectionLock(section.id)}
                      className={`p-2 rounded ${
                        section.locked
                          ? "bg-green-600 hover:bg-green-700"
                          : "bg-purple-600 hover:bg-purple-700"
                      } text-white transition-colors`}
                      title={section.locked ? "Unlock" : "Lock"}
                    >
                      {section.locked ? <FaUnlock /> : <FaLock />}
                    </button>
                    <button
                      onClick={() => handleEditSection(section.id)}
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
                      onClick={() => handleDeleteSection(section.id)}
                      disabled={section.locked}
                      className={`p-2 rounded ${
                        section.locked
                          ? "bg-gray-600 cursor-not-allowed"
                          : "bg-purple-600 hover:bg-purple-700"
                      } text-white transition-colors`}
                      title="Delete"
                    >
                      <FaTrash />
                    </button>
                  </div>
                </div>

                {editingSectionId === section.id ? (
                  <div className="mt-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                      <div>
                        <label className="block text-gray-300 mb-2">ID</label>
                        <input
                          type="text"
                          value={editSectionData.id || ""}
                          onChange={(e) => handleSectionChange(e, "id")}
                          className="w-full p-2 border border-gray-600 rounded bg-gray-700 text-white"
                          disabled
                        />
                      </div>
                      <div>
                        <label className="block text-gray-300 mb-2">
                          Title
                        </label>
                        <input
                          type="text"
                          value={editSectionData.title || ""}
                          onChange={(e) => handleSectionChange(e, "title")}
                          className="w-full p-2 border border-gray-600 rounded bg-gray-700 text-white"
                        />
                      </div>
                      <div>
                        <label className="block text-gray-300 mb-2">
                          Image URL
                        </label>
                        <input
                          type="text"
                          value={editSectionData.image || ""}
                          onChange={(e) => handleSectionChange(e, "image")}
                          className="w-full p-2 border border-gray-600 rounded bg-gray-700 text-white"
                        />
                      </div>
                      <div>
                        <label className="block text-gray-300 mb-2">
                          Alt Text
                        </label>
                        <input
                          type="text"
                          value={editSectionData.alt || ""}
                          onChange={(e) => handleSectionChange(e, "alt")}
                          className="w-full p-2 border border-gray-600 rounded bg-gray-700 text-white"
                        />
                      </div>
                      <div className="flex items-center">
                        <input
                          type="checkbox"
                          id={`reverse-${section.id}`}
                          checked={editSectionData.reverse || false}
                          onChange={(e) => handleSectionChange(e, "reverse")}
                          className="mr-2 h-5 w-5 text-purple-600 rounded focus:ring-purple-500"
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
                          checked={editSectionData.locked || false}
                          onChange={(e) => handleSectionChange(e, "locked")}
                          className="mr-2 h-5 w-5 text-purple-600 rounded focus:ring-purple-500"
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
                        value={editSectionData.content || ""}
                        onChange={(e) => handleSectionChange(e, "content")}
                        className="w-full p-2 border border-gray-600 rounded bg-gray-700 text-white h-40"
                      />
                    </div>
                    <div className="flex justify-end space-x-4">
                      <button
                        onClick={() => setEditingSectionId(null)}
                        className="bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700 transition-colors"
                      >
                        Cancel
                      </button>
                      <button
                        onClick={() => handleSaveSection(section.id)}
                        className="bg-purple-600 text-white px-4 py-2 rounded flex items-center hover:bg-purple-700 transition-colors"
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
                    {/* Render HTML content safely */}
                    <div
                      className="prose max-w-none text-gray-300"
                      dangerouslySetInnerHTML={{ __html: section.content }}
                    />
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* Testimonials Management */}
        <section>
          <div className="mb-6 flex justify-between items-center">
            <h2 className="text-xl font-semibold text-gray-300">
              Manage Testimonials
            </h2>
            <button
              onClick={() => setIsAddingTestimonial(true)}
              className="bg-purple-600 text-white px-4 py-2 rounded flex items-center hover:bg-purple-700 transition-colors"
            >
              <FaPlus className="mr-2" /> Add New Testimonial
            </button>
          </div>

          {isAddingTestimonial && (
            <div className="bg-gray-800 p-6 rounded-lg shadow-md mb-6 border-2 border-purple-500">
              <h3 className="text-lg font-semibold mb-4 text-purple-400">
                New Testimonial
              </h3>
              <div className="grid grid-cols-1 gap-4 mb-4">
                <div>
                  <label className="block text-gray-300 mb-2">Quote</label>
                  <textarea
                    value={newTestimonial.quote}
                    onChange={(e) => handleTestimonialChange(e, "quote")}
                    className="w-full p-2 border border-gray-600 rounded bg-gray-700 text-white h-24"
                  />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-gray-300 mb-2">Author</label>
                    <input
                      type="text"
                      value={newTestimonial.author}
                      onChange={(e) => handleTestimonialChange(e, "author")}
                      className="w-full p-2 border border-gray-600 rounded bg-gray-700 text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-300 mb-2">Company</label>
                    <input
                      type="text"
                      value={newTestimonial.company}
                      onChange={(e) => handleTestimonialChange(e, "company")}
                      className="w-full p-2 border border-gray-600 rounded bg-gray-700 text-white"
                    />
                  </div>
                </div>
              </div>
              <div className="flex justify-end space-x-4">
                <button
                  onClick={() => setIsAddingTestimonial(false)}
                  className="bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSaveNewTestimonial}
                  className="bg-purple-600 text-white px-4 py-2 rounded flex items-center hover:bg-purple-700 transition-colors"
                >
                  <FaSave className="mr-2" /> Save
                </button>
              </div>
            </div>
          )}

          <div className="space-y-4">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className="bg-gray-800 p-6 rounded-lg shadow-md border-l-4 border-gray-600 hover:shadow-purple-500/10 transition-all"
              >
                {editingTestimonialIndex === index ? (
                  <div>
                    <div className="mb-4">
                      <label className="block text-gray-300 mb-2">Quote</label>
                      <textarea
                        value={editTestimonialData.quote || ""}
                        onChange={(e) => handleTestimonialChange(e, "quote")}
                        className="w-full p-2 border border-gray-600 rounded bg-gray-700 text-white h-24"
                      />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                      <div>
                        <label className="block text-gray-300 mb-2">
                          Author
                        </label>
                        <input
                          type="text"
                          value={editTestimonialData.author || ""}
                          onChange={(e) => handleTestimonialChange(e, "author")}
                          className="w-full p-2 border border-gray-600 rounded bg-gray-700 text-white"
                        />
                      </div>
                      <div>
                        <label className="block text-gray-300 mb-2">
                          Company
                        </label>
                        <input
                          type="text"
                          value={editTestimonialData.company || ""}
                          onChange={(e) =>
                            handleTestimonialChange(e, "company")
                          }
                          className="w-full p-2 border border-gray-600 rounded bg-gray-700 text-white"
                        />
                      </div>
                    </div>
                    <div className="flex justify-end space-x-4">
                      <button
                        onClick={() => setEditingTestimonialIndex(null)}
                        className="bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700 transition-colors"
                      >
                        Cancel
                      </button>
                      <button
                        onClick={() => handleSaveTestimonial(index)}
                        className="bg-purple-600 text-white px-4 py-2 rounded flex items-center hover:bg-purple-700 transition-colors"
                      >
                        <FaSave className="mr-2" /> Save
                      </button>
                    </div>
                  </div>
                ) : (
                  <div>
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <p className="text-lg italic text-gray-300">
                          "{testimonial.quote}"
                        </p>
                        <p className="text-gray-400 mt-2">
                          - {testimonial.author}, {testimonial.company}
                        </p>
                      </div>
                      <div className="flex space-x-2">
                        <button
                          onClick={() => handleEditTestimonial(index)}
                          className="p-2 rounded bg-blue-600 hover:bg-blue-700 text-white transition-colors"
                          title="Edit"
                        >
                          <FaEdit />
                        </button>
                        <button
                          onClick={() => handleDeleteTestimonial(index)}
                          className="p-2 rounded bg-purple-600 hover:bg-purple-700 text-white transition-colors"
                          title="Delete"
                        >
                          <FaTrash />
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default ERPDashboardAdmin;
