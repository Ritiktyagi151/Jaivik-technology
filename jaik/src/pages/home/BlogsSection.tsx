"use client";

import React, { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";
import { cachedGet } from "@/lib/clientApiCache";
import BlogCard from "../../components/cards/BlogCard";
import "swiper/swiper-bundle.css";

// API URL (Apne env file ke mutabiq change karein)
const API_URL = `${process.env.NEXT_PUBLIC_API_URL || ""}/blogs`;

const NavigationArrowsLeft = () => {
  return (
    <div className="flex gap-3">
      <div className="swiper-button-prev-left border-2 border-solid border-red-500 text-red-500 rounded-full w-10 h-10 group cursor-pointer flex justify-center items-center hover:bg-red-500 hover:text-white transition">
        <MdKeyboardArrowLeft size={24} className="group-hover:-translate-x-1 transition" />
      </div>
      <div className="swiper-button-next-left border-2 border-solid border-red-500 text-red-500 rounded-full w-10 h-10 group cursor-pointer flex justify-center items-center hover:bg-red-500 hover:text-white transition">
        <MdKeyboardArrowRight size={24} className="group-hover:translate-x-1 transition" />
      </div>
    </div>
  );
};

const NavigationArrowsRight = () => {
  return (
    <div className="flex gap-3">
      <div className="swiper-button-prev-right border-2 border-solid border-red-500 text-red-500 rounded-full w-10 h-10 group cursor-pointer flex justify-center items-center hover:bg-red-500 hover:text-white transition">
        <MdKeyboardArrowLeft size={24} className="group-hover:-translate-x-1 transition" />
      </div>
      <div className="swiper-button-next-right border-2 border-solid border-red-500 text-red-500 rounded-full w-10 h-10 group cursor-pointer flex justify-center items-center hover:bg-red-500 hover:text-white transition">
        <MdKeyboardArrowRight size={24} className="group-hover:translate-x-1 transition" />
      </div>
    </div>
  );
};

const BlogsSection = () => {
  const [blogs, setBlogs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // API se data fetch karne ka function
  const fetchBlogs = async () => {
    try {
      setLoading(true);
      const res = await cachedGet(API_URL);
      // Agar aapka backend { success: true, data: [...] } bhej raha hai
      if (res.data.success) {
        setBlogs(res.data.data);
      } else {
        setBlogs(res.data); // Agar direct array aa rahi hai
      }
    } catch (error) {
      console.error("Error fetching blogs:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  if (loading) {
    return <div className="text-center py-10 text-white">Loading Blogs...</div>;
  }

  return (
    <section className="grid grid-cols-1 lg:grid-cols-[2fr_1fr] px-4 gap-6 w-full max-w-full overflow-hidden py-10">
      
      {/* LEFT: Our Latest News */}
      <div className="w-full h-full flex flex-col gap-2 justify-start items-start overflow-hidden">
        <div className="flex justify-between items-center w-full">
          <h2 className="uppercase text-gray-200 text-xl inline-block relative">
            <span className="flex font-bold items-center gap-1.5">
              Our Latest Blogs
            </span>
          </h2>
          <NavigationArrowsLeft />
        </div>

        <div className="w-full max-w-full overflow-hidden">
          <Swiper
            modules={[Navigation]}
            spaceBetween={20}
            slidesPerView={2}
            loop={blogs.length > 2} // Loop tabhi chale jab slides kafi hon
            navigation={{
              nextEl: ".swiper-button-next-left",
              prevEl: ".swiper-button-prev-left",
            }}
            breakpoints={{
              320: { slidesPerView: 1, spaceBetween: 15 },
              768: { slidesPerView: 2, spaceBetween: 20 },
            }}
            className="w-full"
          >
            {/* Pehle 3 blogs left side ke liye */}
            {blogs.slice(0, 3).map((blog) => (
              <SwiperSlide key={blog._id || blog.id} className="!h-auto">
                <BlogCard {...blog} />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>

      {/* RIGHT: Latest Updates */}
      <div className="w-full h-full flex flex-col justify-start gap-2 items-start overflow-hidden">
        <div className="flex justify-between items-center w-full">
          <h2 className="uppercase text-gray-200 text-xl inline-block relative">
            <span className="flex font-bold items-center gap-1.5">
              Latest Updates
            </span>
          </h2>
          <NavigationArrowsRight />
        </div>

        <div className="w-full max-w-full overflow-hidden">
          <Swiper
            modules={[Navigation]}
            spaceBetween={20}
            slidesPerView={1}
            loop={blogs.length > 3} 
            navigation={{
              nextEl: ".swiper-button-next-right",
              prevEl: ".swiper-button-prev-right",
            }}
            className="w-full"
          >
            {/* Index 3 ke baad wale blogs right side ke liye */}
            {blogs.slice(3, 6).map((blog) => (
              <SwiperSlide key={blog._id || blog.id} className="!h-auto">
                <BlogCard {...blog} />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </section>
  );
};

export default BlogsSection;
