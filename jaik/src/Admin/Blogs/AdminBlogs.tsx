"use client";
import React, { useState, useEffect, useMemo, useCallback } from "react";
import axios from "axios";
import { EditorContent, useEditor, type Editor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import Link from "@tiptap/extension-link";
import Image from "@tiptap/extension-image";
import TextAlign from "@tiptap/extension-text-align";
import { Table } from "@tiptap/extension-table";
import { TableRow } from "@tiptap/extension-table-row";
import { TableCell } from "@tiptap/extension-table-cell";
import { TableHeader } from "@tiptap/extension-table-header";
import {
  FiAlignCenter,
  FiAlignJustify,
  FiAlignLeft,
  FiAlignRight,
  FiBold,
  FiCalendar,
  FiEdit2,
  FiEye,
  FiImage,
  FiItalic,
  FiLink,
  FiList,
  FiLock,
  FiPlus,
  FiRefreshCw,
  FiSearch,
  FiTrash2,
  FiType,
  FiUnderline,
  FiUnlock,
  FiUpload,
  FiUser,
  FiX,
} from "react-icons/fi";
import { useDebounce } from "use-debounce";
import type { blogInterface } from "../../interfaces/blogInterface";

const API_BASE = process.env.NEXT_PUBLIC_API_URL || "";
const MEDIA_BASE = API_BASE.replace("/api", "");

const isHtmlContent = (value: string) => /<\/?[a-z][\s\S]*>/i.test(value);

const escapeHtml = (value: string) =>
  value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");

const ensureHtmlContent = (value: string) => {
  const content = (value || "").trim();
  if (!content) return "<p></p>";
  if (isHtmlContent(content)) return content;

  return content
    .split(/\n{2,}/)
    .map((paragraph) => `<p>${escapeHtml(paragraph).replace(/\n/g, "<br />")}</p>`)
    .join("");
};

const toolbarButtonClass =
  "inline-flex h-9 min-w-9 items-center justify-center rounded-md border border-gray-700 bg-[#121212] px-2 text-sm text-gray-200 transition-all hover:border-red-500 hover:text-white";
const toolbarButtonActiveClass = "border-red-600 bg-red-600/15 text-white";

const tableActionButtonClass =
  "rounded-md border border-gray-700 bg-[#121212] px-3 py-2 text-xs font-semibold uppercase tracking-wide text-gray-200 transition-all hover:border-red-500 hover:text-white disabled:cursor-not-allowed disabled:opacity-40";

type BlogFormState = {
  title: string;
  content: string;
  description: string;
  category: string;
  author: string;
  tags: string;
  metaTitle: string;
  metaDescription: string;
  metaKeywords: string;
  canonicalUrl: string;
  status: string;
  publishedAt: string;
  scheduledAt: string;
};

type BlogFormModalProps = {
  initialData: blogInterface | null;
  onClose: () => void;
  onSave: (formData: FormData) => void;
  isLoading: boolean;
};

type TableInsertState = {
  rows: number;
  cols: number;
  withHeaderRow: boolean;
};

const clampTableSize = (value: number, fallback: number) => {
  if (!Number.isFinite(value)) return fallback;
  return Math.min(12, Math.max(1, Math.floor(value)));
};

const ToolbarButton = ({
  active = false,
  type = "button",
  onClick,
  title,
  children,
}: {
  active?: boolean;
  type?: "button" | "submit" | "reset";
  onClick?: () => void;
  title: string;
  children: React.ReactNode;
}) => (
  <button
    type={type}
    onClick={onClick}
    title={title}
    className={`${toolbarButtonClass} ${active ? toolbarButtonActiveClass : ""}`}
  >
    {children}
  </button>
);

const TableControls = ({
  editor,
  config,
  onConfigChange,
}: {
  editor: Editor;
  config: TableInsertState;
  onConfigChange: React.Dispatch<React.SetStateAction<TableInsertState>>;
}) => {
  const inTable = editor.isActive("table");

  const updateConfig = (key: "rows" | "cols", value: string) => {
    const numericValue = Number(value);
    onConfigChange((current) => ({
      ...current,
      [key]: clampTableSize(numericValue, current[key]),
    }));
  };

  return (
    <div className="w-full rounded-lg border border-gray-800 bg-[#0d0d0d] p-4">
      <div className="grid gap-3 md:grid-cols-[repeat(3,minmax(0,1fr))] md:items-end">
        <label className="block text-xs text-gray-400">
          Rows
          <input
            type="number"
            min={1}
            max={12}
            value={config.rows}
            onChange={(e) => updateConfig("rows", e.target.value)}
            className="mt-1 h-10 w-full rounded-md border border-gray-700 bg-[#121212] px-3 text-sm text-gray-100 outline-none focus:border-red-600"
          />
        </label>
        <label className="block text-xs text-gray-400">
          Columns
          <input
            type="number"
            min={1}
            max={12}
            value={config.cols}
            onChange={(e) => updateConfig("cols", e.target.value)}
            className="mt-1 h-10 w-full rounded-md border border-gray-700 bg-[#121212] px-3 text-sm text-gray-100 outline-none focus:border-red-600"
          />
        </label>
        <label className="flex h-10 items-center gap-2 rounded-md border border-gray-700 bg-[#121212] px-3 text-xs font-semibold uppercase tracking-wide text-gray-200">
          <input
            type="checkbox"
            checked={config.withHeaderRow}
            onChange={(e) =>
              onConfigChange((current) => ({
                ...current,
                withHeaderRow: e.target.checked,
              }))
            }
            className="h-4 w-4 accent-red-600"
          />
          Header row
        </label>
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        <button
          type="button"
          className={tableActionButtonClass}
          onClick={() =>
            editor
              .chain()
              .focus()
              .insertTable({
                rows: clampTableSize(config.rows, 3),
                cols: clampTableSize(config.cols, 3),
                withHeaderRow: config.withHeaderRow,
              })
              .run()
          }
        >
          Insert Table
        </button>
        <button
          type="button"
          className={tableActionButtonClass}
          onClick={() => editor.chain().focus().toggleHeaderRow().run()}
          disabled={!inTable}
        >
          Toggle Header
        </button>
        <button type="button" className={tableActionButtonClass} onClick={() => editor.chain().focus().addRowAfter().run()} disabled={!inTable}>
          Add Row
        </button>
        <button type="button" className={tableActionButtonClass} onClick={() => editor.chain().focus().deleteRow().run()} disabled={!inTable}>
          Remove Row
        </button>
        <button
          type="button"
          className={tableActionButtonClass}
          onClick={() => editor.chain().focus().addColumnAfter().run()}
          disabled={!inTable}
        >
          Add Column
        </button>
        <button
          type="button"
          className={tableActionButtonClass}
          onClick={() => editor.chain().focus().deleteColumn().run()}
          disabled={!inTable}
        >
          Remove Column
        </button>
        <button type="button" className={tableActionButtonClass} onClick={() => editor.chain().focus().deleteTable().run()} disabled={!inTable}>
          Delete Table
        </button>
      </div>
    </div>
  );
};

const TiptapEditor = ({
  value,
  onChange,
}: {
  value: string;
  onChange: (value: string) => void;
}) => {
  const [isTablePanelOpen, setIsTablePanelOpen] = useState(false);
  const [tableConfig, setTableConfig] = useState<TableInsertState>({
    rows: 3,
    cols: 3,
    withHeaderRow: true,
  });
  const editor = useEditor({
    immediatelyRender: false,
    extensions: [
      StarterKit.configure({
        heading: {
          levels: [1, 2, 3, 4, 5, 6],
        },
      }),
      Underline,
      Link.configure({
        autolink: true,
        openOnClick: false,
        defaultProtocol: "https",
      }),
      Image.configure({
        inline: false,
        allowBase64: false,
      }),
      TextAlign.configure({
        types: ["heading", "paragraph"],
      }),
      Table.configure({
        resizable: true,
      }),
      TableRow,
      TableHeader,
      TableCell,
    ],
    content: ensureHtmlContent(value),
    onUpdate: ({ editor: currentEditor }) => {
      onChange(currentEditor.getHTML());
    },
    editorProps: {
      attributes: {
        class:
          "content-render blog-rich-content min-h-[320px] rounded-b-lg bg-[#1a1a1a] px-4 py-4 text-gray-100 focus:outline-none",
      },
    },
  });

  useEffect(() => {
    if (!editor) return;
    const normalizedValue = ensureHtmlContent(value);
    if (editor.getHTML() !== normalizedValue) {
      editor.commands.setContent(normalizedValue, { emitUpdate: false });
    }
  }, [editor, value]);

  const uploadInlineImage = async (file: File) => {
    const formData = new FormData();
    formData.append("file", file);
    const response = await axios.post(`${API_BASE}/upload`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    const imageUrl = response.data?.url;
    if (imageUrl) {
      editor?.chain().focus().setImage({ src: imageUrl, alt: file.name }).run();
    }
  };

  const handleInlineImageUpload = async () => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "image/*";
    input.click();

    input.onchange = async () => {
      const file = input.files?.[0];
      if (!file) return;
      try {
        await uploadInlineImage(file);
      } catch (error) {
        console.error(error);
        alert("Image upload failed.");
      }
    };
  };

  const handleAddLink = () => {
    if (!editor) return;
    const previousUrl = editor.getAttributes("link").href || "";
    const url = window.prompt("Enter the link URL", previousUrl);

    if (url === null) return;
    if (url.trim() === "") {
      editor.chain().focus().unsetLink().run();
      return;
    }

    editor.chain().focus().extendMarkRange("link").setLink({ href: url.trim() }).run();
  };

  if (!editor) {
    return (
      <div className="min-h-[320px] rounded-lg border border-gray-800 bg-[#1a1a1a] p-4 text-gray-500">
        Loading editor...
      </div>
    );
  }

  const headingValue =
    [1, 2, 3, 4, 5, 6].find((level) => editor.isActive("heading", { level }))?.toString() || "paragraph";

  return (
    <div className="overflow-hidden rounded-lg border border-gray-800 bg-[#111]">
      <div className="flex flex-wrap gap-2 border-b border-gray-800 bg-black/30 p-3">
        <select
          value={headingValue}
          onChange={(e) => {
            const nextValue = e.target.value;
            if (nextValue === "paragraph") {
              editor.chain().focus().setParagraph().run();
              return;
            }

            const level = Number(nextValue) as 1 | 2 | 3 | 4 | 5 | 6;
            editor.chain().focus().toggleHeading({ level }).run();
          }}
          className="h-9 rounded-md border border-gray-700 bg-[#121212] px-3 text-sm text-gray-200 outline-none"
        >
          <option value="paragraph">Paragraph</option>
          <option value="1">Heading 1</option>
          <option value="2">Heading 2</option>
          <option value="3">Heading 3</option>
          <option value="4">Heading 4</option>
          <option value="5">Heading 5</option>
          <option value="6">Heading 6</option>
        </select>

        <ToolbarButton title="Bold" active={editor.isActive("bold")} onClick={() => editor.chain().focus().toggleBold().run()}>
          <FiBold />
        </ToolbarButton>
        <ToolbarButton title="Italic" active={editor.isActive("italic")} onClick={() => editor.chain().focus().toggleItalic().run()}>
          <FiItalic />
        </ToolbarButton>
        <ToolbarButton title="Underline" active={editor.isActive("underline")} onClick={() => editor.chain().focus().toggleUnderline().run()}>
          <FiUnderline />
        </ToolbarButton>
        <ToolbarButton title="Bullet List" active={editor.isActive("bulletList")} onClick={() => editor.chain().focus().toggleBulletList().run()}>
          <FiList />
        </ToolbarButton>
        <ToolbarButton title="Numbered List" active={editor.isActive("orderedList")} onClick={() => editor.chain().focus().toggleOrderedList().run()}>
          <span className="text-xs font-bold">1.</span>
        </ToolbarButton>
        <ToolbarButton title="Left Align" active={editor.isActive({ textAlign: "left" })} onClick={() => editor.chain().focus().setTextAlign("left").run()}>
          <FiAlignLeft />
        </ToolbarButton>
        <ToolbarButton title="Center Align" active={editor.isActive({ textAlign: "center" })} onClick={() => editor.chain().focus().setTextAlign("center").run()}>
          <FiAlignCenter />
        </ToolbarButton>
        <ToolbarButton title="Right Align" active={editor.isActive({ textAlign: "right" })} onClick={() => editor.chain().focus().setTextAlign("right").run()}>
          <FiAlignRight />
        </ToolbarButton>
        <ToolbarButton title="Justify" active={editor.isActive({ textAlign: "justify" })} onClick={() => editor.chain().focus().setTextAlign("justify").run()}>
          <FiAlignJustify />
        </ToolbarButton>
        <ToolbarButton title="Add or edit link" active={editor.isActive("link")} onClick={handleAddLink}>
          <FiLink />
        </ToolbarButton>
        <ToolbarButton title="Upload inline image" onClick={handleInlineImageUpload}>
          <FiImage />
        </ToolbarButton>
        <ToolbarButton title="Insert or edit table" active={isTablePanelOpen || editor.isActive("table")} onClick={() => setIsTablePanelOpen((current) => !current)}>
          <span className="text-xs font-bold uppercase">Tbl</span>
        </ToolbarButton>
        <ToolbarButton title="Clear formatting" onClick={() => editor.chain().focus().clearNodes().unsetAllMarks().run()}>
          <FiType />
        </ToolbarButton>
      </div>
      {isTablePanelOpen && <TableControls editor={editor} config={tableConfig} onConfigChange={setTableConfig} />}
      <EditorContent editor={editor} />
    </div>
  );
};

const BlogDashboard: React.FC = () => {
  const [blogs, setBlogs] = useState<blogInterface[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearch] = useDebounce(searchTerm, 300);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [currentBlog, setCurrentBlog] = useState<blogInterface | null>(null);

  const fetchBlogs = useCallback(async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${API_BASE}/blogs/admin?t=${new Date().getTime()}`);
      const incomingData = response.data.data || (Array.isArray(response.data) ? response.data : []);
      setBlogs(incomingData);
      setError(null);
    } catch (err) {
      console.error("Fetch Error:", err);
      const message = err instanceof Error ? err.message : "Unknown error";
      setError(`Fetch failed: ${message}`);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchBlogs();
  }, [fetchBlogs]);

  const handleSave = async (formData: FormData) => {
    try {
      setLoading(true);
      const id = currentBlog?._id || currentBlog?.id;
      const config = { headers: { "Content-Type": "multipart/form-data" } };

      if (id) {
        await axios.put(`${API_BASE}/blogs/${id}`, formData, config);
      } else {
        await axios.post(`${API_BASE}/blogs`, formData, config);
      }

      setIsFormOpen(false);
      fetchBlogs();
    } catch (err) {
      const message = axios.isAxiosError(err)
        ? (err.response?.data as { message?: string } | undefined)?.message || err.message
        : "Error saving blog.";
      alert(message);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (window.confirm("Are you sure you want to delete this blog?")) {
      try {
        await axios.delete(`${API_BASE}/blogs/${id}`);
        fetchBlogs();
      } catch {
        alert("Delete failed.");
      }
    }
  };

  const handleToggleLock = async (id: string) => {
    try {
      await axios.patch(`${API_BASE}/blogs/${id}/lock`);
      fetchBlogs();
    } catch (err) {
      console.error(err);
    }
  };

  const handleStatusChange = async (blog: blogInterface, status: string) => {
    const id = blog._id || blog.id;
    if (!id) return;
    try {
      const formData = new FormData();
      formData.append("status", status);
      if (status === "published") {
        formData.append("publishedAt", new Date().toISOString());
      }
      const config = { headers: { "Content-Type": "multipart/form-data" } };
      await axios.put(`${API_BASE}/blogs/${id}`, formData, config);
      fetchBlogs();
    } catch (err) {
      console.error(err);
      alert("Status update failed.");
    }
  };

  const filteredBlogs = useMemo(() => {
    return blogs.filter(
      (blog) =>
        (blog.draft?.title || blog.title || "").toLowerCase().includes(debouncedSearch.toLowerCase()) ||
        (blog.draft?.author || blog.author || "").toLowerCase().includes(debouncedSearch.toLowerCase())
    );
  }, [blogs, debouncedSearch]);

  return (
    <div className="min-h-screen bg-black p-4 font-sans text-gray-200 sm:p-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8 flex flex-col items-center justify-between gap-4 sm:flex-row">
          <h1 className="text-3xl font-bold uppercase tracking-tight text-red-600">Jaivik Technology Admin Panel</h1>
          <div className="flex gap-4">
            <button onClick={fetchBlogs} className="rounded border border-gray-700 p-2 text-white transition-all hover:bg-gray-800">
              <FiRefreshCw className={loading ? "animate-spin" : ""} />
            </button>
            <button
              onClick={() => {
                setCurrentBlog(null);
                setIsFormOpen(true);
              }}
              className="flex items-center gap-2 rounded bg-red-600 px-4 py-2 font-bold text-white shadow-lg transition-all hover:bg-red-700"
            >
              <FiPlus /> NEW BLOG
            </button>
          </div>
        </div>

        {error && <div className="mb-4 rounded border border-red-600 bg-red-900/20 p-4 text-red-500">{error}</div>}

        <div className="relative mb-6">
          <FiSearch className="absolute left-3 top-3 text-gray-500" />
          <input
            className="w-full rounded-md border border-gray-800 bg-[#111] p-2.5 pl-10 text-white outline-none transition-all focus:border-red-600"
            placeholder="Search blogs..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="overflow-x-auto rounded-lg border border-gray-800 bg-[#0a0a0a] shadow-2xl">
          <table className="w-full min-w-[980px] text-left">
            <thead className="border-b border-gray-800 bg-[#1a1a1a] text-sm font-bold uppercase text-gray-400">
              <tr>
                <th className="p-4">Title</th>
                <th className="p-4">Author</th>
                <th className="p-4">Date</th>
                <th className="p-4">Status</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-800">
              {filteredBlogs.length > 0 ? (
                filteredBlogs.map((blog) => (
                  <tr key={blog._id || blog.id} className="transition-colors hover:bg-gray-800/30">
                    <td className="max-w-[250px] truncate p-4 font-medium text-white">{blog.draft?.title || blog.title}</td>
                    <td className="p-4 font-semibold italic text-gray-300">{blog.draft?.author || blog.author || "Admin"}</td>
                    <td className="p-4 text-sm text-gray-400">
                      {blog.publishedAt
                        ? new Date(blog.publishedAt).toLocaleDateString("en-GB")
                        : blog.createdAt
                          ? new Date(blog.createdAt).toLocaleDateString("en-GB")
                          : "N/A"}
                    </td>
                    <td className="p-4 text-sm">
                      <span
                        className={`rounded-full px-2 py-1 text-[11px] font-bold uppercase ${
                          blog.status === "published"
                            ? "bg-green-900/40 text-green-400"
                            : blog.status === "scheduled"
                              ? "bg-yellow-900/40 text-yellow-400"
                              : "bg-gray-800 text-gray-300"
                        }`}
                      >
                        {blog.status || "draft"}
                      </span>
                    </td>
                    <td className="p-4 text-right">
                      <div className="flex justify-end gap-3">
                        <button
                          onClick={() => {
                            const id = blog._id || blog.id;
                            if (id) handleToggleLock(id);
                          }}
                          className="text-yellow-600"
                        >
                          <FiLock size={18} />
                        </button>
                        <button
                          onClick={() => handleStatusChange(blog, blog.status === "published" ? "draft" : "published")}
                          className="text-green-500 hover:text-green-400"
                        >
                          <FiUnlock size={18} />
                        </button>
                        <button
                          onClick={() => {
                            setCurrentBlog(blog);
                            setIsFormOpen(true);
                          }}
                          className="text-blue-400 hover:text-blue-300"
                        >
                          <FiEdit2 size={18} />
                        </button>
                        <button
                          onClick={() => {
                            const id = blog._id || blog.id;
                            if (id) handleDelete(id);
                          }}
                          className="text-red-600 hover:text-red-500"
                        >
                          <FiTrash2 size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5} className="p-16 text-center text-lg italic text-gray-600">
                    {loading ? "Data is loading..." : "No blogs found in the database."}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {isFormOpen && (
        <BlogFormModal
          initialData={currentBlog}
          onClose={() => setIsFormOpen(false)}
          onSave={handleSave}
          isLoading={loading}
        />
      )}
    </div>
  );
};

const BlogFormModal = ({ initialData, onClose, onSave, isLoading }: BlogFormModalProps) => {
  const initialDraft = initialData?.draft || initialData || {};
  const [data, setData] = useState<BlogFormState>({
    title: initialDraft.title || "",
    content: ensureHtmlContent(initialDraft.content || ""),
    description: initialDraft.description || "",
    category: initialDraft.category || "Marketing",
    author: initialDraft.author || "Admin",
    tags: (initialDraft.tags || []).join(", "),
    metaTitle: initialDraft.metaTitle || "",
    metaDescription: initialDraft.metaDescription || "",
    metaKeywords: (initialDraft.metaKeywords || []).join(", "),
    canonicalUrl: initialDraft.canonicalUrl || "",
    status: initialData?.status || "draft",
    publishedAt: initialData?.publishedAt ? new Date(initialData.publishedAt).toISOString().slice(0, 16) : "",
    scheduledAt: initialData?.scheduledAt ? new Date(initialData.scheduledAt).toISOString().slice(0, 16) : "",
  });

  const [imageFile, setImageFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string>(initialDraft.image ? `${MEDIA_BASE}${initialDraft.image}` : "");
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setImageFile(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData();
    (Object.keys(data) as Array<keyof BlogFormState>).forEach((key) => {
      if (data[key] !== undefined) {
        const value = key === "content" ? ensureHtmlContent(data[key]) : data[key];
        formData.append(key, value);
      }
    });
    if (imageFile) formData.append("image", imageFile);
    onSave(formData);
  };

  return (
    <div className="fixed inset-0 z-[999] flex items-center justify-center overflow-y-auto bg-black/95 p-4">
      <div className="my-auto w-full max-w-3xl rounded-lg border border-red-700/30 bg-[#0f0f0f] p-6 shadow-2xl">
        <div className="mb-6 flex items-center justify-between border-b border-red-700/50 pb-3">
          <h2 className="text-xl font-bold uppercase tracking-wider text-white">{initialData ? "Update Blog Post" : "Create New Blog"}</h2>
          <button onClick={onClose}>
            <FiX className="h-6 w-6 text-gray-400 hover:text-red-500" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
            <div className="col-span-1 md:col-span-2">
              <label className="mb-1 block text-[10px] font-black uppercase text-red-500">Blog Title *</label>
              <input
                required
                className="w-full rounded border border-gray-800 bg-[#1a1a1a] p-3 text-white outline-none focus:border-red-600"
                value={data.title}
                onChange={(e) => setData({ ...data, title: e.target.value })}
              />
            </div>

            <div>
              <label className="mb-1 block text-[10px] font-black uppercase tracking-widest text-red-500">
                <FiUser className="mr-1 inline" /> Author Name
              </label>
              <input
                required
                className="w-full rounded border border-gray-800 bg-[#1a1a1a] p-3 text-white outline-none focus:border-red-600"
                value={data.author}
                onChange={(e) => setData({ ...data, author: e.target.value })}
              />
            </div>

            <div>
              <label className="mb-1 block text-[10px] font-black uppercase tracking-widest text-red-500">
                <FiCalendar className="mr-1 inline" /> Publish Date
              </label>
              <input
                type="datetime-local"
                className="w-full rounded border border-gray-800 bg-[#1a1a1a] p-3 text-white outline-none focus:border-red-600"
                value={data.publishedAt || ""}
                onChange={(e) => setData({ ...data, publishedAt: e.target.value })}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
            <div>
              <label className="mb-1 block text-[10px] font-black uppercase text-red-500">Category</label>
              <select
                className="w-full rounded border border-gray-800 bg-[#1a1a1a] p-3 text-white outline-none focus:border-red-600"
                value={data.category}
                onChange={(e) => setData({ ...data, category: e.target.value })}
              >
                <option value="Marketing">Marketing</option>
                <option value="SEO">SEO</option>
                <option value="Development">Development</option>
                <option value="Social Media">Social Media Marketing</option>
                <option value="E-Commerce">E-Commerce Seo</option>
                <option value="Digital Marketing">Digital Marketing</option>
              </select>
            </div>
            <div>
              <label className="mb-1 block text-[10px] font-black uppercase text-red-500">Status</label>
              <select
                className="w-full rounded border border-gray-800 bg-[#1a1a1a] p-3 text-white outline-none focus:border-red-600"
                value={data.status}
                onChange={(e) => setData({ ...data, status: e.target.value })}
              >
                <option value="draft">Draft</option>
                <option value="scheduled">Scheduled</option>
                <option value="published">Published</option>
              </select>
            </div>
          </div>

          {data.status === "scheduled" && (
            <div>
              <label className="mb-1 block text-[10px] font-black uppercase text-red-500">Schedule Date</label>
              <input
                type="datetime-local"
                className="w-full rounded border border-gray-800 bg-[#1a1a1a] p-3 text-white outline-none focus:border-red-600"
                value={data.scheduledAt || ""}
                onChange={(e) => setData({ ...data, scheduledAt: e.target.value })}
              />
            </div>
          )}

          <div>
            <label className="mb-1 block text-[10px] font-black uppercase text-red-500">Tags (comma separated)</label>
            <input
              className="w-full rounded border border-gray-800 bg-[#1a1a1a] p-3 text-white outline-none focus:border-red-600"
              value={data.tags}
              onChange={(e) => setData({ ...data, tags: e.target.value })}
            />
          </div>

          <div>
            <label className="mb-1 block text-[10px] font-black uppercase text-red-500">Short Description</label>
            <textarea
              rows={4}
              required
              className="w-full resize-y rounded border border-gray-800 bg-[#1a1a1a] p-3 text-white outline-none focus:border-red-600"
              value={data.description}
              onChange={(e) => setData({ ...data, description: e.target.value })}
            />
          </div>

          <div className="rounded-lg border border-gray-800 bg-[#151515] p-4">
            <label className="mb-3 block text-[10px] font-black uppercase text-red-500">Featured Media</label>
            <div className="flex items-center gap-6">
              <label className="flex flex-1 cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-800 bg-black p-6 transition-all hover:border-red-600">
                <FiUpload className="mb-2 text-2xl text-red-600" />
                <span className="text-xs text-gray-500">Click to replace image</span>
                <input type="file" className="hidden" accept="image/*" onChange={handleFileChange} />
              </label>
              {preview && (
                <div className="h-28 w-28 overflow-hidden rounded-lg border border-red-600/30 shadow-xl">
                  <img src={preview} alt="Preview" className="h-full w-full object-cover" />
                </div>
              )}
            </div>
          </div>

          <div>
            <label className="mb-2 block text-[10px] font-black uppercase text-red-500">Content (Rich Editor)</label>
            <TiptapEditor value={data.content} onChange={(content) => setData({ ...data, content })} />
          </div>

          <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
            <div>
              <label className="mb-1 block text-[10px] font-black uppercase text-red-500">Meta Title</label>
              <input
                className="w-full rounded border border-gray-800 bg-[#1a1a1a] p-3 text-white outline-none focus:border-red-600"
                value={data.metaTitle}
                onChange={(e) => setData({ ...data, metaTitle: e.target.value })}
              />
            </div>
            <div>
              <label className="mb-1 block text-[10px] font-black uppercase text-red-500">Meta Keywords</label>
              <input
                className="w-full rounded border border-gray-800 bg-[#1a1a1a] p-3 text-white outline-none focus:border-red-600"
                value={data.metaKeywords}
                onChange={(e) => setData({ ...data, metaKeywords: e.target.value })}
              />
            </div>
          </div>

          <div>
            <label className="mb-1 block text-[10px] font-black uppercase text-red-500">Meta Description</label>
            <textarea
              rows={3}
              className="w-full rounded border border-gray-800 bg-[#1a1a1a] p-3 text-white outline-none focus:border-red-600"
              value={data.metaDescription}
              onChange={(e) => setData({ ...data, metaDescription: e.target.value })}
            />
          </div>

          <div>
            <label className="mb-1 block text-[10px] font-black uppercase text-red-500">Canonical URL</label>
            <input
              className="w-full rounded border border-gray-800 bg-[#1a1a1a] p-3 text-white outline-none focus:border-red-600"
              value={data.canonicalUrl}
              onChange={(e) => setData({ ...data, canonicalUrl: e.target.value })}
            />
          </div>

          <div className="flex justify-between gap-3 border-t border-gray-800/50 pt-6">
            <button
              type="button"
              onClick={() => setIsPreviewOpen(true)}
              className="flex items-center gap-2 px-6 py-2 font-bold text-gray-300 transition-colors hover:text-white"
            >
              <FiEye /> PREVIEW
            </button>
            <div className="flex gap-3">
              <button type="button" onClick={onClose} className="px-6 py-2 font-bold text-gray-400 transition-colors hover:text-white">
                CANCEL
              </button>
              <button
                disabled={isLoading}
                className="flex items-center gap-2 rounded bg-red-600 px-12 py-3 font-black tracking-widest text-white shadow-xl transition-all hover:bg-red-700 disabled:opacity-50"
              >
                {isLoading ? <FiRefreshCw className="animate-spin" /> : initialData ? "UPDATE POST" : "PUBLISH NOW"}
              </button>
            </div>
          </div>
        </form>
      </div>

      {isPreviewOpen && (
        <div className="fixed inset-0 z-[1000] flex items-center justify-center overflow-y-auto bg-black/95 p-6">
          <div className="my-auto w-full max-w-4xl rounded-lg border border-red-700/30 bg-[#0f0f0f] p-6 shadow-2xl">
            <div className="mb-4 flex items-center justify-between border-b border-gray-800 pb-3">
              <h3 className="text-lg font-bold uppercase tracking-wider text-white">Preview</h3>
              <button onClick={() => setIsPreviewOpen(false)}>
                <FiX className="h-6 w-6 text-gray-400 hover:text-red-500" />
              </button>
            </div>
            <div className="max-w-none">
              <h1 className="mb-2 text-3xl font-bold">{data.title || "Untitled"}</h1>
              <p className="mb-6 text-gray-400">{data.description}</p>
              <div
                className="content-render blog-rich-content text-gray-200"
                dangerouslySetInnerHTML={{ __html: ensureHtmlContent(data.content) }}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BlogDashboard;
