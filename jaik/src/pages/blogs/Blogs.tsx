"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";
import BlogCard from "../../components/cards/BlogCard";
import EnquireSection from "../home/EnquireSection";
import OurClients from "../home/OurClients";
import SEOManagement from "../../components/seo/SEOManagement";
import type { blogInterface } from "../../interfaces/blogInterface";

// ✅ API URL from environment
const API_URL = process.env.NEXT_PUBLIC_API_URL || "";

const Blogs: React.FC = () => {
  const [blogsList, setBlogsList] = useState<blogInterface[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        setLoading(true);
        // ✅ Updated: Using dynamic environment variable
        const response = await axios.get(`${API_URL}/blogs`);
        if (response.data.success) {
          setBlogsList(response.data.data);
        }
      } catch (error) {
        console.error("Fetch failed", error);
      } finally {
        setLoading(false);
      }
    };
    fetchBlogs();
  }, []);

  return (
    <>
      <SEOManagement 
        title="Jaivik Technology Blogs" 
        description="SEO, Marketing and Tech Insights." 
      />
      
      {/* Hero Section */}
      <div className="relative w-full h-[40vh] sm:h-[60vh] overflow-hidden">
        <img 
          src="https://images.unsplash.com/photo-1604933762023-7213af7ff7a7?w=1200" 
          className="w-full h-full object-cover" 
          alt="Hero" 
        />
        <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
          <h1 className="text-4xl md:text-6xl font-bold text-red-600">Our Blogs</h1>
        </div>
      </div>

      <section className="container mx-auto px-4 py-12">
        {loading ? (
          <div className="text-center py-20 text-white animate-pulse text-2xl">Fetching Latest Content...</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {blogsList.length > 0 ? blogsList.map((blog) => (
              <BlogCard 
                key={blog._id} 
                {...blog} 
                id={blog._id} 
                // BlogCard internal logic should handle image prefix if needed
                image={blog.image} 
              />
            )) : (
              <div className="col-span-3 text-center text-gray-500">No published blogs yet.</div>
            )}
          </div>
        )}
      </section>

      <OurClients />
      <EnquireSection />
    </>
  );
};

export default Blogs;
