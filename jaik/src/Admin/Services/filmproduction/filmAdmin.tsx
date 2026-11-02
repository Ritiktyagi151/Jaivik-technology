"use client";

import React, { useState } from "react";
import {
  FaLock,
  FaUnlock,
  FaSave,
  FaTrash,
  FaPlus,
  FaArrowUp,
  FaArrowDown,
} from "react-icons/fa";
import { motion } from "framer-motion";

interface ContentItem {
  type: string;
  text?: string;
  question?: string;
  answer?: string;
  items?: Array<{ title: string; text: string }>;
}

interface Section {
  title: string;
  content: ContentItem[];
  image: string;
  alt: string;
  reverse?: boolean;
  id?: string;
  order?: number;
  active?: boolean;
  locked?: boolean;
}

interface FilmProductionData {
  meta: {
    title: string;
    description: string;
    adminTheme: string;
    lastUpdated: string;
  };
  sections: {
    [key: string]: Section;
  };
  hero: {
    title: string;
    description: string;
    image: string;
    cta: string;
  };
  cta: {
    title: string;
    description: string;
    button: string;
  };
}

const FilmProductionAdmin: React.FC = () => {
  const [data, setData] = useState<FilmProductionData>({
    meta: {
      title: "Film Production Services",
      description:
        "Professional film production services by Jaivik Technology",
      adminTheme: "dark-red",
      lastUpdated: new Date().toISOString(),
    },
    hero: {
      title: "Create Impactful Stories with Film Production",
      description:
        "Bring your vision to life with Jaivik Technology's Film and Media Production Services, crafted to captivate and engage your audience.",
      image:
        "https://img.freepik.com/premium-photo/close-up-camera_1048944-3803309.jpg",
      cta: "Explore Now",
    },
    cta: {
      title: "Ready to Tell Your Story with Film Production?",
      description:
        "Discover how Jaivik Technology's film production services can create captivating content to elevate your brand and engage your audience.",
      button: "Get Started Today",
    },
    sections: {
      "film-production": {
        title: "Introduction To Our Film Production Services",
        content: [
          {
            type: "paragraph",
            text: "Jaivik Technology places before you and above all else the matter of professional film production. Our offerings include corporate video presentations, product explanatory videos, TV commercials, YouTube ads, and photoshoots for models and interviews.",
          },
          {
            type: "paragraph",
            text: "Corporate video presentation, to catch dreams of clients, workers, and potential financiers, is very important. It embodies the spirit of the company through almost powerful, dynamic storytelling.",
          },
        ],
        image:
          "https://img.freepik.com/premium-photo/close-up-camera_1048944-3803309.jpg",
        alt: "Film Production Services",
        order: 1,
        active: true,
        locked: false,
      },
      "corporate-video": {
        title: "Corporate Video Presentation",
        content: [
          {
            type: "paragraph",
            text: "A corporate video represents one of the most effective tools in the hands of a company to demonstrate its vision, values, and capabilities before clients, employees, and potential financiers.",
          },
          {
            type: "heading",
            text: "The Importance of Corporate Video Presentations",
          },
          {
            type: "list",
            items: [
              {
                title: "Fostering Branding:",
                text: "A corporate video tells the world how your brand sounds, feels, and breathes in tune with your target market.",
              },
              {
                title: "Creating Engagement:",
                text: "Naturally, video content accounts for the highest contact versus text.",
              },
            ],
          },
        ],
        image:
          "https://img.freepik.com/free-photo/arrangement-cinema-elements-blue-background-with-copy-space_23-2148506001.jpg",
        alt: "Corporate Video Presentation",
        order: 2,
        active: true,
        reverse: true,
      },
      "product-explainer": {
        title: "Product Explainer Video",
        content: [
          {
            type: "paragraph",
            text: "A product explanation video is your ticket to customers' minds if you want to show them how well your product is useful.",
          },
          {
            type: "heading",
            text: "Why Are Product Explainer Videos Important?",
          },
          {
            type: "paragraph",
            text: "An excellently crafted product explainer video can really refine your marketing strategy.",
          },
        ],
        image:
          "https://img.freepik.com/premium-photo/video-production-backstage-scenes-creating-video-content-professional-team_124865-39894.jpg",
        alt: "Product Explainer Videos",
        order: 3,
        active: true,
      },
      "tv-commercial": {
        title: "TV Commercial Ads",
        content: [
          {
            type: "paragraph",
            text: "TV commercials are one of the most impactful forms of advertising, allowing everyone to see an advert with a unique target audience.",
          },
          {
            type: "heading",
            text: "Why is an Advertisement on Television Ad Considered Creative Outreach?",
          },
          {
            type: "list",
            items: [
              {
                title: "Wide Reach:",
                text: "TV commercials reach a broad and diverse audience, maximizing brand exposure.",
              },
              {
                title: "Memorable Impact:",
                text: "Creative and engaging commercials leave a lasting impression on viewers.",
              },
            ],
          },
        ],
        image:
          "https://img.freepik.com/free-photo/press-reporter-fallowing-leads-case_23-2149579746.jpg",
        alt: "TV Commercial Ads",
        order: 4,
        active: true,
        reverse: true,
      },
      "youtube-ads": {
        title: "YouTube Video",
        content: [
          {
            type: "paragraph",
            text: "The concept presented here is quite simple: a brand like yours can create some powerful YouTube advertisements.",
          },
          { type: "heading", text: "The Benefits of YouTube Ads" },
          {
            type: "list",
            items: [
              {
                title: "Targeted Reach:",
                text: "Your ad campaign will be targeted for a very specific demographic.",
              },
              {
                title: "Cost-Effective:",
                text: "It's up to you how much this campaign means to you really.",
              },
            ],
          },
        ],
        image:
          "https://img.freepik.com/free-photo/man-filming-with-professional-camera_23-2149066342.jpg",
        alt: "YouTube Ads",
        order: 5,
        active: true,
      },
      photoshoot: {
        title: "Photo Shoot",
        content: [
          {
            type: "paragraph",
            text: "One of the most effective ways to visually uphold your brand, products, or services is via a high-quality photo shoot.",
          },
          { type: "heading", text: "Our Photoshoot Services Include" },
          {
            type: "list",
            items: [
              {
                title: "Product Photography:",
                text: "Showcase your products in the market by putting them in the best light possible.",
              },
              {
                title: "Corporate Headshots:",
                text: "Make a professional image for your team with high-quality images.",
              },
            ],
          },
        ],
        image:
          "https://img.freepik.com/premium-photo/cinema-camera-film-set-scenes-background-film-crew-production_1048944-12611948.jpg",
        alt: "Photoshoot Services",
        order: 6,
        active: true,
        reverse: true,
      },
      "model-shoot": {
        title: "Model Shoot",
        content: [
          {
            type: "paragraph",
            text: "Apart from just having high-quality and attention-catching images of the brand, given the visual environment today, it is very important.",
          },
          { type: "heading", text: "We Cater For" },
          {
            type: "list",
            items: [
              {
                title: "Fashion Shoots:",
                text: "Let it be a clothing line, accessories, or beauty products, fashion shoots offer an opportunity to emphasize the best of your creations.",
              },
              {
                title: "Product Promotion:",
                text: "The contribution of models will bring products to life.",
              },
            ],
          },
        ],
        image:
          "https://img.freepik.com/premium-photo/photographer-developing-film-darkroom-red-light_1280275-61227.jpg",
        alt: "Model Shoot Services",
        order: 7,
        active: true,
      },
      "interview-videos": {
        title: "Interviews",
        content: [
          {
            type: "paragraph",
            text: "Interviews are one of the most effective ways in terms of disseminating personal stories, insights, and advice to connect further with your audience.",
          },
          { type: "heading", text: "Our Interview Services" },
          {
            type: "list",
            items: [
              {
                title: "Effective Storytelling:",
                text: "We carry your message to the audience by building a beautiful piece from your voids.",
              },
              {
                title: "Flexible Formats:",
                text: "Interviews finding ways into your internal or social media have applications for several causes respectively.",
              },
            ],
          },
        ],
        image:
          "https://img.freepik.com/premium-photo/silhouette-production-crew-team-working-photo-shooting-studio-lighting-flash-led-headligh_258335-2020.jpg",
        alt: "Interview Videos",
        order: 8,
        active: true,
        reverse: true,
      },
      faqs: {
        title: "FAQs for Film Production Services",
        content: [
          {
            type: "faq",
            question:
              "What is a corporate video presentation and why is it necessary?",
            answer:
              "A corporate video is a professionally produced piece of video material that portrays the company's core values, services, products, or any other important messages that one wants to communicate to all listeners.",
          },
          {
            type: "faq",
            question:
              "What is the difference between explanatory video designs for products and commercials on television?",
            answer:
              "A product explanatory video provides more comprehensive information on the product, that traditionally concentrates on explaining its features, benefits, and how to use it.",
          },
        ],
        image:
          "https://img.freepik.com/free-photo/flat-lay-film-elements-white-background_23-2148416833.jpg",
        alt: "FAQs for Film Production Services",
        order: 9,
        active: true,
      },
    },
  });

  const [activeTab, setActiveTab] = useState<string>("hero");

  // Helper functions to update different parts of the data
  const updateData = (newData: Partial<FilmProductionData>) => {
    setData((prev) => ({
      ...prev,
      ...newData,
      meta: {
        ...prev.meta,
        lastUpdated: new Date().toISOString(),
      },
    }));
  };

  const updateHero = (newHero: any) => {
    updateData({ hero: newHero });
  };

  const updateCta = (newCta: any) => {
    updateData({ cta: newCta });
  };

  const updateMeta = (newMeta: any) => {
    updateData({ meta: newMeta });
  };

  const updateSection = (sectionId: string, newSection: Section) => {
    setData((prev) => ({
      ...prev,
      sections: {
        ...prev.sections,
        [sectionId]: newSection,
      },
      meta: {
        ...prev.meta,
        lastUpdated: new Date().toISOString(),
      },
    }));
  };

  const toggleSectionLock = (sectionId: string) => {
    setData((prev) => ({
      ...prev,
      sections: {
        ...prev.sections,
        [sectionId]: {
          ...prev.sections[sectionId],
          locked: !prev.sections[sectionId]?.locked,
        },
      },
      meta: {
        ...prev.meta,
        lastUpdated: new Date().toISOString(),
      },
    }));
  };

  const addNewSection = () => {
    const newId = `section-${Object.keys(data.sections).length + 1}`;
    setData((prev) => ({
      ...prev,
      sections: {
        ...prev.sections,
        [newId]: {
          title: "New Section",
          content: [{ type: "paragraph", text: "Enter your content here" }],
          image: "",
          alt: "New section image",
          order: Object.keys(prev.sections).length + 1,
          active: true,
          locked: false,
        },
      },
      meta: {
        ...prev.meta,
        lastUpdated: new Date().toISOString(),
      },
    }));
    setActiveTab(`section-${newId}`);
  };

  const deleteSection = (sectionId: string) => {
    const newSections = { ...data.sections };
    delete newSections[sectionId];
    updateData({ sections: newSections });
    setActiveTab("hero");
  };

  const addContentItem = (sectionId: string, type: string) => {
    const newItem =
      type === "paragraph"
        ? { type: "paragraph", text: "" }
        : type === "heading"
        ? { type: "heading", text: "" }
        : type === "list"
        ? { type: "list", items: [{ title: "", text: "" }] }
        : { type: "faq", question: "", answer: "" };

    setData((prev) => ({
      ...prev,
      sections: {
        ...prev.sections,
        [sectionId]: {
          ...prev.sections[sectionId],
          content: [...prev.sections[sectionId].content, newItem],
        },
      },
      meta: {
        ...prev.meta,
        lastUpdated: new Date().toISOString(),
      },
    }));
  };

  const updateContentItem = (
    sectionId: string,
    index: number,
    updatedItem: ContentItem
  ) => {
    setData((prev) => {
      const updatedContent = [...prev.sections[sectionId].content];
      updatedContent[index] = updatedItem;
      return {
        ...prev,
        sections: {
          ...prev.sections,
          [sectionId]: {
            ...prev.sections[sectionId],
            content: updatedContent,
          },
        },
        meta: {
          ...prev.meta,
          lastUpdated: new Date().toISOString(),
        },
      };
    });
  };

  const deleteContentItem = (sectionId: string, index: number) => {
    setData((prev) => {
      const updatedContent = [...prev.sections[sectionId].content];
      updatedContent.splice(index, 1);
      return {
        ...prev,
        sections: {
          ...prev.sections,
          [sectionId]: {
            ...prev.sections[sectionId],
            content: updatedContent,
          },
        },
        meta: {
          ...prev.meta,
          lastUpdated: new Date().toISOString(),
        },
      };
    });
  };

  const moveContentItemUp = (sectionId: string, index: number) => {
    if (index === 0) return;
    setData((prev) => {
      const updatedContent = [...prev.sections[sectionId].content];
      [updatedContent[index], updatedContent[index - 1]] = [
        updatedContent[index - 1],
        updatedContent[index],
      ];
      return {
        ...prev,
        sections: {
          ...prev.sections,
          [sectionId]: {
            ...prev.sections[sectionId],
            content: updatedContent,
          },
        },
        meta: {
          ...prev.meta,
          lastUpdated: new Date().toISOString(),
        },
      };
    });
  };

  const moveContentItemDown = (sectionId: string, index: number) => {
    setData((prev) => {
      const updatedContent = [...prev.sections[sectionId].content];
      if (index === updatedContent.length - 1) return prev;
      [updatedContent[index], updatedContent[index + 1]] = [
        updatedContent[index + 1],
        updatedContent[index],
      ];
      return {
        ...prev,
        sections: {
          ...prev.sections,
          [sectionId]: {
            ...prev.sections[sectionId],
            content: updatedContent,
          },
        },
        meta: {
          ...prev.meta,
          lastUpdated: new Date().toISOString(),
        },
      };
    });
  };

  const updateListItem = (
    sectionId: string,
    contentIndex: number,
    itemIndex: number,
    updatedItem: { title: string; text: string }
  ) => {
    setData((prev) => {
      const updatedContent = [...prev.sections[sectionId].content];
      const listItem = updatedContent[contentIndex] as {
        type: string;
        items: Array<{ title: string; text: string }>;
      };
      listItem.items[itemIndex] = updatedItem;
      return {
        ...prev,
        sections: {
          ...prev.sections,
          [sectionId]: {
            ...prev.sections[sectionId],
            content: updatedContent,
          },
        },
        meta: {
          ...prev.meta,
          lastUpdated: new Date().toISOString(),
        },
      };
    });
  };

  const addListItem = (sectionId: string, contentIndex: number) => {
    setData((prev) => {
      const updatedContent = [...prev.sections[sectionId].content];
      const listItem = updatedContent[contentIndex] as {
        type: string;
        items: Array<{ title: string; text: string }>;
      };
      listItem.items.push({ title: "", text: "" });
      return {
        ...prev,
        sections: {
          ...prev.sections,
          [sectionId]: {
            ...prev.sections[sectionId],
            content: updatedContent,
          },
        },
        meta: {
          ...prev.meta,
          lastUpdated: new Date().toISOString(),
        },
      };
    });
  };

  const deleteListItem = (
    sectionId: string,
    contentIndex: number,
    itemIndex: number
  ) => {
    setData((prev) => {
      const updatedContent = [...prev.sections[sectionId].content];
      const listItem = updatedContent[contentIndex] as {
        type: string;
        items: Array<{ title: string; text: string }>;
      };
      listItem.items.splice(itemIndex, 1);
      return {
        ...prev,
        sections: {
          ...prev.sections,
          [sectionId]: {
            ...prev.sections[sectionId],
            content: updatedContent,
          },
        },
        meta: {
          ...prev.meta,
          lastUpdated: new Date().toISOString(),
        },
      };
    });
  };

  const renderContentEditor = (
    content: ContentItem,
    index: number,
    sectionId: string
  ) => {
    switch (content.type) {
      case "paragraph":
        return (
          <div className="mb-4 p-4 bg-gray-800 rounded-lg relative group">
            <div className="absolute top-2 right-2 flex space-x-1 opacity-0 group-hover:opacity-100 transition-opacity">
              <button
                onClick={() => moveContentItemUp(sectionId, index)}
                className="p-1 bg-gray-700 rounded hover:bg-gray-600"
                title="Move up"
              >
                <FaArrowUp className="text-xs" />
              </button>
              <button
                onClick={() => moveContentItemDown(sectionId, index)}
                className="p-1 bg-gray-700 rounded hover:bg-gray-600"
                title="Move down"
              >
                <FaArrowDown className="text-xs" />
              </button>
              <button
                onClick={() => deleteContentItem(sectionId, index)}
                className="p-1 bg-red-700 rounded hover:bg-red-600"
                title="Delete"
              >
                <FaTrash className="text-xs" />
              </button>
            </div>
            <label className="block text-sm font-medium text-gray-300 mb-1">
              Paragraph
            </label>
            <textarea
              value={content.text}
              onChange={(e) =>
                updateContentItem(sectionId, index, {
                  ...content,
                  text: e.target.value,
                })
              }
              className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-red-500 focus:border-red-500"
              rows={4}
            />
          </div>
        );
      case "heading":
        return (
          <div className="mb-4 p-4 bg-gray-800 rounded-lg relative group">
            <div className="absolute top-2 right-2 flex space-x-1 opacity-0 group-hover:opacity-100 transition-opacity">
              <button
                onClick={() => moveContentItemUp(sectionId, index)}
                className="p-1 bg-gray-700 rounded hover:bg-gray-600"
                title="Move up"
              >
                <FaArrowUp className="text-xs" />
              </button>
              <button
                onClick={() => moveContentItemDown(sectionId, index)}
                className="p-1 bg-gray-700 rounded hover:bg-gray-600"
                title="Move down"
              >
                <FaArrowDown className="text-xs" />
              </button>
              <button
                onClick={() => deleteContentItem(sectionId, index)}
                className="p-1 bg-red-700 rounded hover:bg-red-600"
                title="Delete"
              >
                <FaTrash className="text-xs" />
              </button>
            </div>
            <label className="block text-sm font-medium text-gray-300 mb-1">
              Heading
            </label>
            <input
              type="text"
              value={content.text}
              onChange={(e) =>
                updateContentItem(sectionId, index, {
                  ...content,
                  text: e.target.value,
                })
              }
              className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-red-500 focus:border-red-500"
            />
          </div>
        );
      case "list":
        return (
          <div className="mb-4 p-4 bg-gray-800 rounded-lg relative group">
            <div className="absolute top-2 right-2 flex space-x-1 opacity-0 group-hover:opacity-100 transition-opacity">
              <button
                onClick={() => moveContentItemUp(sectionId, index)}
                className="p-1 bg-gray-700 rounded hover:bg-gray-600"
                title="Move up"
              >
                <FaArrowUp className="text-xs" />
              </button>
              <button
                onClick={() => moveContentItemDown(sectionId, index)}
                className="p-1 bg-gray-700 rounded hover:bg-gray-600"
                title="Move down"
              >
                <FaArrowDown className="text-xs" />
              </button>
              <button
                onClick={() => deleteContentItem(sectionId, index)}
                className="p-1 bg-red-700 rounded hover:bg-red-600"
                title="Delete"
              >
                <FaTrash className="text-xs" />
              </button>
            </div>
            <label className="block text-sm font-medium text-gray-300 mb-1">
              List
            </label>
            <div className="space-y-2">
              {content.items?.map((item, itemIndex) => (
                <div key={itemIndex} className="flex items-start space-x-2">
                  <div className="flex-1 space-y-1">
                    <input
                      type="text"
                      value={item.title}
                      onChange={(e) => {
                        updateListItem(sectionId, index, itemIndex, {
                          ...item,
                          title: e.target.value,
                        });
                      }}
                      className="w-full px-2 py-1 bg-gray-700 border border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-red-500 focus:border-red-500 text-sm"
                      placeholder="Item title"
                    />
                    <textarea
                      value={item.text}
                      onChange={(e) => {
                        updateListItem(sectionId, index, itemIndex, {
                          ...item,
                          text: e.target.value,
                        });
                      }}
                      className="w-full px-2 py-1 bg-gray-700 border border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-red-500 focus:border-red-500 text-sm"
                      placeholder="Item description"
                      rows={2}
                    />
                  </div>
                  <button
                    onClick={() => deleteListItem(sectionId, index, itemIndex)}
                    className="p-1 bg-red-700 rounded hover:bg-red-600 mt-1"
                    title="Delete item"
                  >
                    <FaTrash className="text-xs" />
                  </button>
                </div>
              ))}
              <button
                onClick={() => addListItem(sectionId, index)}
                className="mt-2 px-3 py-1 bg-gray-700 hover:bg-gray-600 rounded text-sm flex items-center"
              >
                <FaPlus className="mr-1" /> Add List Item
              </button>
            </div>
          </div>
        );
      case "faq":
        return (
          <div className="mb-4 p-4 bg-gray-800 rounded-lg relative group">
            <div className="absolute top-2 right-2 flex space-x-1 opacity-0 group-hover:opacity-100 transition-opacity">
              <button
                onClick={() => moveContentItemUp(sectionId, index)}
                className="p-1 bg-gray-700 rounded hover:bg-gray-600"
                title="Move up"
              >
                <FaArrowUp className="text-xs" />
              </button>
              <button
                onClick={() => moveContentItemDown(sectionId, index)}
                className="p-1 bg-gray-700 rounded hover:bg-gray-600"
                title="Move down"
              >
                <FaArrowDown className="text-xs" />
              </button>
              <button
                onClick={() => deleteContentItem(sectionId, index)}
                className="p-1 bg-red-700 rounded hover:bg-red-600"
                title="Delete"
              >
                <FaTrash className="text-xs" />
              </button>
            </div>
            <label className="block text-sm font-medium text-gray-300 mb-1">
              FAQ Item
            </label>
            <div className="space-y-2">
              <input
                type="text"
                value={content.question}
                onChange={(e) =>
                  updateContentItem(sectionId, index, {
                    ...content,
                    question: e.target.value,
                  })
                }
                className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-red-500 focus:border-red-500"
                placeholder="Question"
              />
              <textarea
                value={content.answer}
                onChange={(e) =>
                  updateContentItem(sectionId, index, {
                    ...content,
                    answer: e.target.value,
                  })
                }
                className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-red-500 focus:border-red-500"
                placeholder="Answer"
                rows={4}
              />
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  const renderTabContent = () => {
    if (activeTab === "hero") {
      return (
        <div className="space-y-4">
          <div className="p-4 bg-gray-800 rounded-lg">
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-300 mb-1">
                Title
              </label>
              <input
                type="text"
                value={data.hero.title}
                onChange={(e) =>
                  updateHero({ ...data.hero, title: e.target.value })
                }
                className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-red-500 focus:border-red-500"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-300 mb-1">
                Description
              </label>
              <textarea
                value={data.hero.description}
                onChange={(e) =>
                  updateHero({ ...data.hero, description: e.target.value })
                }
                className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-red-500 focus:border-red-500"
                rows={4}
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-300 mb-1">
                Image URL
              </label>
              <input
                type="text"
                value={data.hero.image}
                onChange={(e) =>
                  updateHero({ ...data.hero, image: e.target.value })
                }
                className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-red-500 focus:border-red-500"
              />
              {data.hero.image && (
                <div className="mt-2">
                  <img
                    src={data.hero.image}
                    alt="Hero"
                    className="w-full h-48 object-cover rounded"
                  />
                </div>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">
                CTA Text
              </label>
              <input
                type="text"
                value={data.hero.cta}
                onChange={(e) =>
                  updateHero({ ...data.hero, cta: e.target.value })
                }
                className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-red-500 focus:border-red-500"
              />
            </div>
          </div>
        </div>
      );
    } else if (activeTab === "cta") {
      return (
        <div className="space-y-4">
          <div className="p-4 bg-gray-800 rounded-lg">
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-300 mb-1">
                Title
              </label>
              <input
                type="text"
                value={data.cta.title}
                onChange={(e) =>
                  updateCta({ ...data.cta, title: e.target.value })
                }
                className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-red-500 focus:border-red-500"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-300 mb-1">
                Description
              </label>
              <textarea
                value={data.cta.description}
                onChange={(e) =>
                  updateCta({ ...data.cta, description: e.target.value })
                }
                className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-red-500 focus:border-red-500"
                rows={4}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">
                Button Text
              </label>
              <input
                type="text"
                value={data.cta.button}
                onChange={(e) =>
                  updateCta({ ...data.cta, button: e.target.value })
                }
                className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-red-500 focus:border-red-500"
              />
            </div>
          </div>
        </div>
      );
    } else if (activeTab === "meta") {
      return (
        <div className="space-y-4">
          <div className="p-4 bg-gray-800 rounded-lg">
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-300 mb-1">
                Page Title
              </label>
              <input
                type="text"
                value={data.meta.title}
                onChange={(e) =>
                  updateMeta({ ...data.meta, title: e.target.value })
                }
                className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-red-500 focus:border-red-500"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-300 mb-1">
                Meta Description
              </label>
              <textarea
                value={data.meta.description}
                onChange={(e) =>
                  updateMeta({ ...data.meta, description: e.target.value })
                }
                className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-red-500 focus:border-red-500"
                rows={4}
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-300 mb-1">
                Admin Theme
              </label>
              <select
                value={data.meta.adminTheme}
                onChange={(e) =>
                  updateMeta({ ...data.meta, adminTheme: e.target.value })
                }
                className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-red-500 focus:border-red-500"
              >
                <option value="dark-red">Dark Red</option>
                <option value="dark-blue">Dark Blue</option>
                <option value="dark-green">Dark Green</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">
                Last Updated
              </label>
              <input
                type="text"
                value={new Date(data.meta.lastUpdated).toLocaleString()}
                readOnly
                className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-red-500 focus:border-red-500"
              />
            </div>
          </div>
        </div>
      );
    } else if (activeTab.startsWith("section-")) {
      const sectionId = activeTab.replace("section-", "");
      const section = data.sections[sectionId];

      return (
        <div className="space-y-4">
          <div className="p-4 bg-gray-800 rounded-lg">
            <div className="flex justify-between items-start mb-4">
              <div className="w-full">
                <label className="block text-sm font-medium text-gray-300 mb-1">
                  Section Title
                </label>
                <input
                  type="text"
                  value={section.title}
                  onChange={(e) =>
                    updateSection(sectionId, {
                      ...section,
                      title: e.target.value,
                    })
                  }
                  className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-red-500 focus:border-red-500"
                />
              </div>
              <button
                onClick={() => toggleSectionLock(sectionId)}
                className="ml-2 p-2 rounded-full hover:bg-gray-700"
                title={section.locked ? "Unlock Section" : "Lock Section"}
              >
                {section.locked ? (
                  <FaLock className="text-red-500" />
                ) : (
                  <FaUnlock className="text-gray-400" />
                )}
              </button>
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-300 mb-1">
                Image URL
              </label>
              <input
                type="text"
                value={section.image}
                onChange={(e) =>
                  updateSection(sectionId, {
                    ...section,
                    image: e.target.value,
                  })
                }
                className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-red-500 focus:border-red-500"
              />
              {section.image && (
                <div className="mt-2">
                  <img
                    src={section.image}
                    alt={section.alt}
                    className="w-full h-48 object-cover rounded"
                  />
                </div>
              )}
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-300 mb-1">
                Image Alt Text
              </label>
              <input
                type="text"
                value={section.alt}
                onChange={(e) =>
                  updateSection(sectionId, { ...section, alt: e.target.value })
                }
                className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-red-500 focus:border-red-500"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-300 mb-1">
                Order
              </label>
              <input
                type="number"
                value={section.order}
                onChange={(e) =>
                  updateSection(sectionId, {
                    ...section,
                    order: parseInt(e.target.value) || 0,
                  })
                }
                className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-red-500 focus:border-red-500"
              />
            </div>
            <div className="flex items-center mb-4">
              <input
                type="checkbox"
                checked={section.reverse || false}
                onChange={(e) =>
                  updateSection(sectionId, {
                    ...section,
                    reverse: e.target.checked,
                  })
                }
                className="h-4 w-4 text-red-600 focus:ring-red-500 border-gray-600 rounded"
              />
              <label className="ml-2 block text-sm text-gray-300">
                Reverse Layout
              </label>
            </div>
            <div className="flex items-center mb-4">
              <input
                type="checkbox"
                checked={section.active || false}
                onChange={(e) =>
                  updateSection(sectionId, {
                    ...section,
                    active: e.target.checked,
                  })
                }
                className="h-4 w-4 text-red-600 focus:ring-red-500 border-gray-600 rounded"
              />
              <label className="ml-2 block text-sm text-gray-300">Active</label>
            </div>
          </div>
          <div className="p-4 bg-gray-800 rounded-lg">
            <h3 className="text-lg font-medium text-gray-300 mb-4">
              Section Content
            </h3>
            <div className="space-y-4">
              {section.content.map((content, index) =>
                renderContentEditor(content, index, sectionId)
              )}
            </div>
            <div className="mt-6">
              <h4 className="text-md font-medium text-gray-300 mb-3">
                Add New Content
              </h4>
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => addContentItem(sectionId, "paragraph")}
                  className="px-3 py-1 bg-gray-700 hover:bg-gray-600 rounded text-sm"
                >
                  Add Paragraph
                </button>
                <button
                  onClick={() => addContentItem(sectionId, "heading")}
                  className="px-3 py-1 bg-gray-700 hover:bg-gray-600 rounded text-sm"
                >
                  Add Heading
                </button>
                <button
                  onClick={() => addContentItem(sectionId, "list")}
                  className="px-3 py-1 bg-gray-700 hover:bg-gray-600 rounded text-sm"
                >
                  Add List
                </button>
                <button
                  onClick={() => addContentItem(sectionId, "faq")}
                  className="px-3 py-1 bg-gray-700 hover:bg-gray-600 rounded text-sm"
                >
                  Add FAQ
                </button>
              </div>
            </div>
          </div>
          <button
            onClick={() => deleteSection(sectionId)}
            className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
          >
            Delete Section
          </button>
        </div>
      );
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100">
      {/* Header */}
      <header className="bg-black border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <h1 className="text-xl font-bold text-red-500">
            Film Production Admin Panel
          </h1>
          <div className="flex items-center space-x-4">
            <span className="text-sm text-gray-400">
              Last Updated: {new Date(data.meta.lastUpdated).toLocaleString()}
            </span>
            <button
              onClick={() => {
                updateData({}); // Just updates the lastUpdated timestamp
              }}
              className="flex items-center px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
            >
              <FaSave className="mr-2" /> Save
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row gap-6">
          {/* Sidebar */}
          <div className="w-full md:w-64 flex-shrink-0">
            <nav className="space-y-1">
              <button
                onClick={() => setActiveTab("meta")}
                className={`w-full text-left px-4 py-2 rounded-md ${
                  activeTab === "meta"
                    ? "bg-red-900 text-white"
                    : "text-gray-300 hover:bg-gray-800"
                }`}
              >
                Meta Information
              </button>
              <button
                onClick={() => setActiveTab("hero")}
                className={`w-full text-left px-4 py-2 rounded-md ${
                  activeTab === "hero"
                    ? "bg-red-900 text-white"
                    : "text-gray-300 hover:bg-gray-800"
                }`}
              >
                Hero Section
              </button>
              <button
                onClick={() => setActiveTab("cta")}
                className={`w-full text-left px-4 py-2 rounded-md ${
                  activeTab === "cta"
                    ? "bg-red-900 text-white"
                    : "text-gray-300 hover:bg-gray-800"
                }`}
              >
                CTA Section
              </button>
              <div className="border-t border-gray-800 pt-2 mt-2">
                <div className="flex justify-between items-center px-4 py-2">
                  <span className="text-sm font-medium text-gray-400">
                    Sections
                  </span>
                  <button
                    onClick={addNewSection}
                    className="p-1 text-gray-400 hover:text-white hover:bg-gray-700 rounded"
                    title="Add New Section"
                  >
                    <FaPlus />
                  </button>
                </div>
                <div className="space-y-1">
                  {Object.entries(data.sections)
                    .sort(([, a], [, b]) => (a.order || 0) - (b.order || 0))
                    .map(([id, section]) => (
                      <button
                        key={id}
                        onClick={() => setActiveTab(`section-${id}`)}
                        className={`w-full text-left px-4 py-2 rounded-md flex items-center justify-between ${
                          activeTab === `section-${id}`
                            ? "bg-red-900 text-white"
                            : "text-gray-300 hover:bg-gray-800"
                        }`}
                      >
                        <span className="truncate">{section.title}</span>
                        {section.locked && (
                          <FaLock className="text-red-500 ml-2" />
                        )}
                      </button>
                    ))}
                </div>
              </div>
            </nav>
          </div>

          {/* Main Panel */}
          <div className="flex-1">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="bg-gray-800 rounded-lg shadow-lg overflow-hidden"
            >
              <div className="p-6">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-bold text-red-400">
                    {activeTab === "meta" && "Meta Information"}
                    {activeTab === "hero" && "Hero Section"}
                    {activeTab === "cta" && "CTA Section"}
                    {activeTab.startsWith("section-") &&
                      data.sections[activeTab.replace("section-", "")]?.title}
                  </h2>
                </div>
                {renderTabContent()}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FilmProductionAdmin;
