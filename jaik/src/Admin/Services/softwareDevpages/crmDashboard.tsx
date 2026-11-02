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

interface Testimonial {
  quote: string;
  author: string;
  company: string;
}

const CRMDashboardAdmin = () => {
  const initialSections: Section[] = [
    {
      id: "what-is-crm",
      title: "What Is CRM?",
      content: `<p className="text-base md:text-lg font-normal leading-relaxed mb-5 text-gray-200">
        CRM, which stands for Customer Relationship Management, refers to a
        strategic method of interacting with a company and its present and
        potential customers. It combines technology, processes, and data to
        efficiently operate sales, marketing, and consumer care.
      </p>
      <p className="text-base md:text-lg font-normal leading-relaxed mb-5 text-gray-200">
        CRMs act as a central house for businesses to keep vital information
        on their customers: contact information, sales history,
        communication logs, etc. It is not merely a large database but a
        business operation backbone encouraging staff collaboration,
        automation of mundane tasks, and the construction of genuine
        camaraderie with its clientele.
      </p>
      <p className="text-base md:text-lg font-normal leading-relaxed mb-5 text-gray-200">
        Modern CRMs feature artificial intelligence insights as well as the
        possibility of integrating more advanced ways for achievement
        purposes, which help a business significantly forward its capacity
        to make clear, goal-aligning decisions. In the end, it is a
        principle of a customer strategy applicable to businesses in all
        territories, regardless of their size or industry.
      </p>`,
      image:
        "https://img.freepik.com/free-vector/flat-design-crm-illustration_23-2149364431.jpg",
      alt: "CRM Solutions",
      locked: false,
    },
    {
      id: "crm-functions",
      title: "What Does CRM Do?",
      content: `<p className="text-base md:text-lg font-normal leading-relaxed mb-5 text-gray-200">
        At its core, a CRM is designed to aid businesses in organizing,
        tracking, and enhancing their interactions with customers. Here is
        the rundown on its functionality:
      </p>
      <h4 className="text-lg md:text-xl font-semibold text-red-500 mb-3 uppercase">
        Centralizing Customer Data
      </h4>
      <p className="text-base md:text-lg font-normal leading-relaxed mb-5 text-gray-200">
        Every detail concerning a customer is to be managed by the CRM in a
        single database. This embraces insightful facts such as contact
        details, sales history, preferences, and communication threads. This
        in turn guarantees that information does not get lost or overlooked
        and is instantly available to responsible units.
      </p>
      <h4 className="text-lg md:text-xl font-semibold text-red-500 mb-3 uppercase">
        Administering Sales Pipelines
      </h4>
      <p className="text-base md:text-lg font-normal leading-relaxed mb-5 text-gray-200">
        A CRM system is able to monitor leads along several stages of the
        sales process. This empowers salespeople to see who is most likely
        to convert and where efforts should be concentrated.
      </p>`,
      image:
        "https://img.freepik.com/free-vector/hand-drawn-crm-infographic_23-2149388654.jpg",
      alt: "CRM Features",
      reverse: true,
      locked: false,
    },
    {
      id: "why-crm",
      title: "Why Should Enterprises Opt for CRMs?",
      content: `<p className="text-base md:text-lg font-normal leading-relaxed mb-5 text-gray-200">
        There are so many reasons why CRM systems are essential:
      </p>
      <ul className="list-disc list-inside text-base md:text-lg font-normal leading-relaxed mb-5 space-y-2 text-gray-200">
        <li>
          <span className="font-semibold text-lg md:text-xl text-red-500">
            Customer-Centric:
          </span>{" "}
          Vital in creating and sustaining strong customer satisfaction
          through personalized care.
        </li>
        <li>
          <span className="font-semibold text-lg md:text-xl text-red-500">
            Insight into Data:
          </span>{" "}
          Harnessing analytical functionalities, a CRM makes it possible to
          comport data into palatable, relevant understandings that can
          guide forecasting, measurement, and opportunity identification
          accurately.
        </li>
        <li>
          <span className="font-semibold text-lg md:text-xl text-red-500">
            Scalability:
          </span>{" "}
          CRMs are adaptable to businesses of any size, growing with the
          organization.
        </li>
      </ul>`,
      image:
        "https://img.freepik.com/free-vector/gradient-crm-illustration_23-2149379653.jpg",
      alt: "CRM Benefits",
      locked: false,
    },
    {
      id: "crm-industries",
      title: "CRM for Different Ventures",
      content: `<p className="text-base md:text-lg font-normal leading-relaxed mb-5 text-gray-200">
        The use of CRMs has advanced in many industries today. It allows the
        provision of tailor-made solutions for meeting specified operational
        needs. An overview is now presented for how various industries
        employ CRM for increased efficiency and to better customer
        relationships:
      </p>
      <h4 className="text-lg md:text-xl font-semibold text-red-500 mb-3 uppercase">
        1. Retail and E-commerce
      </h4>
      <ul className="list-disc list-inside text-base md:text-lg font-normal leading-relaxed mb-5 space-y-2 text-gray-200">
        <li>
          CRMs help retailers to track customer preferences, monitor
          customer habits of purchase, and produce custom marketing
          promotions.
        </li>
        <li>
          E-commerce platforms utilize CRM information to serve customer
          requirements better with custom offers or deal with loyalty
          programs and cases optimized for convenient shopping.
        </li>
      </ul>
      <h4 className="text-lg md:text-xl font-semibold text-red-500 mb-3 uppercase">
        2. Healthcare
      </h4>
      <ul className="list-disc list-inside text-base md:text-lg font-normal leading-relaxed mb-5 space-y-2 text-gray-200">
        <li>
          Where patient details, appointments for checkups, and medication
          refill notices are concerned, CRMs help keep an updated patient
          index.
        </li>
      </ul>`,
      image:
        "https://img.freepik.com/free-vector/gradient-crm-infographic_23-2149379654.jpg",
      alt: "CRM Use Cases",
      reverse: true,
      locked: false,
    },
  ];

  const initialTestimonials: Testimonial[] = [
    {
      quote:
        "Jaivik Technology's CRM transformed our sales process, boosting our lead conversion by 200%. The AI insights are a game-changer!",
      author: "Sarah Thompson",
      company: "TechTrend Innovations",
    },
    {
      quote:
        "With Jaivik Technology's CRM, we reduced our operational costs by 25% and improved customer satisfaction across our retail chain.",
      author: "Michael Patel",
      company: "UrbanMart Retail",
    },
    {
      quote:
        "The CRM's seamless integration and mobile access keep our team connected, making client management effortless.",
      author: "Emily Chen",
      company: "BrightFuture Consulting",
    },
  ];

  const [sections, setSections] = useState<Section[]>(initialSections);
  const [testimonials, setTestimonials] =
    useState<Testimonial[]>(initialTestimonials);
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
  const [editingTestimonial, setEditingTestimonial] = useState<number | null>(
    null
  );
  const [editTestimonialData, setEditTestimonialData] = useState<
    Partial<Testimonial>
  >({});
  const [isAddingTestimonial, setIsAddingTestimonial] = useState(false);
  const [newTestimonial, setNewTestimonial] = useState<Testimonial>({
    quote: "",
    author: "",
    company: "",
  });

  // Load data from localStorage
  useEffect(() => {
    const savedSections = localStorage.getItem("crmSections");
    const savedTestimonials = localStorage.getItem("crmTestimonials");

    if (savedSections) {
      try {
        const parsedSections: Section[] = JSON.parse(savedSections);
        setSections(parsedSections);
      } catch (error) {
        console.error("Error parsing sections data:", error);
      }
    }

    if (savedTestimonials) {
      try {
        const parsedTestimonials: Testimonial[] = JSON.parse(savedTestimonials);
        setTestimonials(parsedTestimonials);
      } catch (error) {
        console.error("Error parsing testimonials data:", error);
      }
    }
  }, []);

  // Save to localStorage
  useEffect(() => {
    localStorage.setItem("crmSections", JSON.stringify(sections));
    localStorage.setItem("crmTestimonials", JSON.stringify(testimonials));
  }, [sections, testimonials]);

  // Section CRUD operations
  const handleEdit = (id: string) => {
    const sectionToEdit = sections.find((section) => section.id === id);
    if (sectionToEdit) {
      setEditData({ ...sectionToEdit });
      setEditingId(id);
    }
  };

  const handleSave = (id: string) => {
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
        field === "locked" || field === "reverse"
          ? (e.target as HTMLInputElement).checked
          : e.target.value,
    });
  };

  const handleSaveNewSection = () => {
    if (!newSection.title || !newSection.content || !newSection.id) {
      alert("Please fill in all required fields (Title, Content, and ID).");
      return;
    }

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

  // Testimonial CRUD operations
  const handleEditTestimonial = (index: number) => {
    setEditTestimonialData({ ...testimonials[index] });
    setEditingTestimonial(index);
  };

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
    setEditingTestimonial(null);
    setEditTestimonialData({});
  };

  const handleAddTestimonial = () => {
    setIsAddingTestimonial(true);
  };

  const handleSaveNewTestimonial = () => {
    if (!newTestimonial.quote || !newTestimonial.author) {
      alert("Please fill in all required fields (Quote and Author).");
      return;
    }
    setTestimonials([...testimonials, newTestimonial]);
    setIsAddingTestimonial(false);
    setNewTestimonial({
      quote: "",
      author: "",
      company: "",
    });
  };

  const handleDeleteTestimonial = (index: number) => {
    if (window.confirm("Are you sure you want to delete this testimonial?")) {
      const updatedTestimonials = testimonials.filter((_, i) => i !== index);
      setTestimonials(updatedTestimonials);
    }
  };

  const handleTestimonialChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    field: keyof Testimonial
  ) => {
    if (editingTestimonial !== null) {
      setEditTestimonialData({
        ...editTestimonialData,
        [field]: e.target.value,
      });
    } else if (isAddingTestimonial) {
      setNewTestimonial({
        ...newTestimonial,
        [field]: e.target.value,
      });
    }
  };

  // Handle changes to editData for section editing
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    field: keyof Section
  ) => {
    setEditData({
      ...editData,
      [field]:
        field === "locked" || field === "reverse"
          ? (e.target as HTMLInputElement).checked
          : e.target.value,
    });
  };

  return (
    <div className="min-h-screen bg-gray-900 p-6">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-red-500 mb-6">
          CRM Content Admin
        </h1>

        {/* Sections Management */}
        <div className="mb-12">
          <div className="mb-6 flex justify-between items-center">
            <h2 className="text-xl font-semibold text-gray-300">
              Manage Sections
            </h2>
            <button
              onClick={handleAddSection}
              className="bg-red-600 text-white px-4 py-2 rounded flex items-center hover:bg-red-700 transition-colors"
            >
              <FaPlus className="mr-2" /> Add New Section
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
                  onClick={() => setIsAdding(false)}
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
                    <p className="text-sm text-gray-500 mt-1">
                      ID: {section.id}
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
                        <label className="block text-gray-300 mb-2">
                          Title
                        </label>
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
                        onClick={() => setEditingId(null)}
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

        {/* Testimonials Management */}
        <div>
          <div className="mb-6 flex justify-between items-center">
            <h2 className="text-xl font-semibold text-gray-300">
              Manage Testimonials
            </h2>
            <button
              onClick={handleAddTestimonial}
              className="bg-red-600 text-white px-4 py-2 rounded flex items-center hover:bg-red-700 transition-colors"
            >
              <FaPlus className="mr-2" /> Add New Testimonial
            </button>
          </div>

          {isAddingTestimonial && (
            <div className="bg-gray-800 p-6 rounded-lg shadow-md mb-6 border-2 border-red-500">
              <h3 className="text-lg font-semibold mb-4 text-red-400">
                New Testimonial
              </h3>
              <div className="grid grid-cols-1 gap-4 mb-4">
                <div>
                  <label className="block text-gray-300 mb-2">Quote</label>
                  <textarea
                    value={newTestimonial.quote}
                    onChange={(e) =>
                      setNewTestimonial({
                        ...newTestimonial,
                        quote: e.target.value,
                      })
                    }
                    className="w-full p-2 border border-gray-600 rounded bg-gray-700 text-white h-24"
                  />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-gray-300 mb-2">Author</label>
                    <input
                      type="text"
                      value={newTestimonial.author}
                      onChange={(e) =>
                        setNewTestimonial({
                          ...newTestimonial,
                          author: e.target.value,
                        })
                      }
                      className="w-full p-2 border border-gray-600 rounded bg-gray-700 text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-300 mb-2">Company</label>
                    <input
                      type="text"
                      value={newTestimonial.company}
                      onChange={(e) =>
                        setNewTestimonial({
                          ...newTestimonial,
                          company: e.target.value,
                        })
                      }
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
                  className="bg-red-600 text-white px-4 py-2 rounded flex items-center hover:bg-red-700 transition-colors"
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
                className="bg-gray-800 p-6 rounded-lg shadow-md border-l-4 border-gray-600 hover:shadow-red-500/10 transition-all"
              >
                {editingTestimonial === index ? (
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
                        onClick={() => setEditingTestimonial(null)}
                        className="bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700 transition-colors"
                      >
                        Cancel
                      </button>
                      <button
                        onClick={() => handleSaveTestimonial(index)}
                        className="bg-red-600 text-white px-4 py-2 rounded flex items-center hover:bg-red-700 transition-colors"
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
                          className="p-2 rounded bg-red-600 hover:bg-red-700 text-white transition-colors"
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
        </div>
      </div>
    </div>
  );
};

export default CRMDashboardAdmin;
