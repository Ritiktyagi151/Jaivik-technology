"use client";

import React, { useState, useEffect } from "react";
import axios from "axios"; // axios import karein
import CareerForm from "./CareerForm";
import EnquireSection from "../home/EnquireSection";
import SEOManagement from "../../components/seo/SEOManagement";

const API_URL = process.env.NEXT_PUBLIC_API_URL || ""; // Environment variable ka use

const Career: React.FC = () => {
  const [openings, setOpenings] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // API se jobs fetch karne ke liye
  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await axios.get(`${API_URL}/careers/jobs`);
        if (response.data.success) {
          setOpenings(response.data.data);
        }
      } catch (error) {
        console.error("Jobs fetch failed", error);
      } finally {
        setLoading(false);
      }
    };
    fetchJobs();
  }, []);

  return (
    <>
      <SEOManagement
        title="Careers at Jaivik Technology – Join Top IT & Digital Company in India"
        description="Explore exciting career opportunities at Jaivik Technology."
        keywords="Jaivik Technology Careers, Jaivik Technology Jobs"
        canonical=""
      />

      <div className="relative w-full h-[20vh] sm:h-[50vh] md:h-[60vh] overflow-hidden">
        <img
          src="https://jaikvik.in/lab/cloud/jaikvik/assets/images/banner/career.avif"
          alt="breadcrumb"
          className="w-full object-cover"
        />
      </div>

      <section className="py-12 px-4 sm:px-6 lg:px-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
          <div className="order-1 md:order-0">
            <CareerForm />
          </div>
          <div className=" bg-main-secondary rounded-md p-6 flex flex-col gap-3 order-0 md:order-1">
            <h4 className="text-xl text-white">
              Join Our Team and Build the Future
            </h4>
            <p className="text-white font-bold">Current Openings:</p>

            <ul className="list-decimal pl-4 flex flex-col gap-1 text-white">
              {loading ? (
                <p className="text-sm animate-pulse">Loading openings...</p>
              ) : openings.length > 0 ? (
                openings.map((job) => (
                  <li key={job._id}>
                    {job.title} - {job.experience}
                  </li>
                ))
              ) : (
                <p className="text-sm opacity-70">
                  No active openings right now.
                </p>
              )}
            </ul>

            <p className="text-white font-bold mt-4">How to Apply</p>
            <p className="text-white">
              Submit your resume and cover letter to{" "}
              <a
                href="mailto:"
                className="font-bold text-main-red"
              >
                
              </a>{" "}
              or apply directly via our website.
            </p>
          </div>
        </div>
      </section>
      
    </>
  );
};

export default Career;
