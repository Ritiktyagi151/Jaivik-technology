"use client";

import React, { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import axios from "axios";
import { FaRegCalendarCheck, FaRegUser } from "react-icons/fa";
import SEOManagement from "../../components/seo/SEOManagement";
import type { blogInterface } from "../../interfaces/blogInterface";

// ✅ Dynamic URLs from environment
const API_URL = process.env.NEXT_PUBLIC_API_URL || "";
const MEDIA_BASE = API_URL.replace('/api', ''); // Removes /api to get base URL for images
const formatDate = (value?: string) => (value ? new Date(value).toLocaleDateString() : "N/A");

const BlogDetail: React.FC = () => {
  const params = useParams();
  const id = (params?.slug || params?.id) as string | undefined; 
  const [blog, setBlog] = useState<blogInterface | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDetail = async () => {
      try {
        setLoading(true);
        // ✅ Updated: Using dynamic environment variable
        const response = await axios.get(`${API_URL}/blogs/${id}`);
        if (response.data.success) {
          setBlog(response.data.data);
        }
      } catch (err) {
        console.error("Detail Fetch Error", err);
      } finally {
        setLoading(false);
      }
    };
    if (id) fetchDetail();
  }, [id]);

  if (loading) return <div className="text-center py-40 bg-black text-white text-2xl animate-pulse">Loading Content...</div>;
  
  if (!blog) return (
    <div className="text-center py-40 bg-black text-white">
      <h1 className="text-3xl text-red-600 font-bold mb-4">Post Not Found</h1>
      <p className="text-gray-400">The URL "{id}" is invalid or the post has been removed.</p>
    </div>
  );

  return (
    <div className="bg-black min-h-screen text-white">
      <SEOManagement
        title={blog.metaTitle || blog.title}
        description={blog.metaDescription || blog.description}
        keywords={
          (blog.metaKeywords && blog.metaKeywords.length > 0)
            ? blog.metaKeywords.join(", ")
            : (blog.tags && blog.tags.length > 0 ? blog.tags.join(", ") : "")
        }
        image={`${MEDIA_BASE}${blog.image}`}
        canonical={
          blog.canonicalUrl ||
          (typeof window !== "undefined" ? `${window.location.origin}/blog/${blog.slug}` : "")
        }
        author={blog.author}
        publisher={process.env.NEXT_PUBLIC_SITE_PUBLISHER || blog.author}
        useDefaults={false}
      />
      <div className="w-full h-[60vh] relative">
        <img 
          // ✅ Updated: Dynamic media base for local/live images
          src={`${MEDIA_BASE}${blog.image}`} 
          className="w-full h-full object-cover" 
          alt={blog.title} 
        />
        <div className="absolute inset-0 bg-black/60 flex items-center justify-center p-6">
          <h1 className="text-3xl md:text-6xl font-extrabold text-white text-center drop-shadow-2xl">{blog.title}</h1>
        </div>
      </div>

      <div className="container mx-auto px-4 py-16 max-w-4xl">
        <div className="flex flex-wrap gap-6 mb-10 text-sm text-gray-400 border-b border-gray-800 pb-6">
          <span className="flex items-center gap-2"><FaRegUser className="text-red-600"/> {blog.author || 'Admin'}</span>
          <span className="flex items-center gap-2"><FaRegCalendarCheck className="text-red-600"/> {formatDate(blog.publishedAt || blog.createdAt)}</span>
          {blog.updatedAt && (
            <span className="flex items-center gap-2 text-gray-500">Updated: {formatDate(blog.updatedAt)}</span>
          )}
          <span className="bg-red-600 text-white px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">{blog.category}</span>
        </div>

        <article className="max-w-none">
          <div className="text-2xl font-medium text-gray-300 italic mb-10 border-l-4 border-red-600 pl-6 leading-relaxed">
            "{blog.description}"
          </div>
          <div
            className="content-render blog-rich-content text-lg text-gray-200"
            dangerouslySetInnerHTML={{ __html: blog.content || "" }}
          />
        </article>
      </div>
    </div>
  );
};

export default BlogDetail;
