"use client";
import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import { cachedGet } from "@/lib/clientApiCache";
import "swiper/swiper-bundle.css";

// ✅ API Configuration (Dashboard ki tarah same)
const API_BASE = process.env.NEXT_PUBLIC_API_URL || ""; 
const MEDIA_BASE = API_BASE.replace('/api', '');

// Define client data interface
interface Client {
  _id?: string;
  website: string; // aapke dashboard mein 'website' field hai
  logo: string;    // aapke dashboard mein 'logo' field hai
  name: string;    // aapke dashboard mein 'name' field hai
}

const OurClients: React.FC = () => {
  const [clients, setClients] = useState<Client[]>([]);

  // ✅ 1. Fetch data from API (Dashboard ki tarah)
  useEffect(() => {
    const fetchOurClients = async () => {
      try {
        // Sirf 'active' clients ko hi dikhayenge slider mein
        const response = await cachedGet(`${API_BASE}/clients?status=active`);
        const incomingData = response.data.data || (Array.isArray(response.data) ? response.data : []);
        setClients(incomingData);
      } catch (err) {
        console.error("Failed to fetch slider clients:", err);
      }
    };

    fetchOurClients();
  }, []);

  // Agar data load nahi hua ya empty hai toh component hide rahega
  if (clients.length === 0) return null;

  return (
    <section className="py-6 px-[28px]">
      <div className="mb-2.5">
        <h2 className="uppercase text-gray-200 text-2xl font-bold">
          OUR Clients
        </h2>
      </div>
      <Swiper
        modules={[Autoplay]}
        spaceBetween={5}
        slidesPerView={5}
        autoplay={{
          delay: 0,
          disableOnInteraction: false,
        }}
        speed={3000}
        loop={clients.length > 5} // Loop tabhi chale jab slides kafi hon
        breakpoints={{
          320: { slidesPerView: 2 },
          640: { slidesPerView: 3 },
          768: { slidesPerView: 4 },
          1024: { slidesPerView: 7.5 },
        }}
        className="overflow-hidden"
      >
        {clients.map((client, index) => (
          <SwiperSlide key={client._id || index} className="flex-shrink-0">
            <a href={client.website} target="_blank" rel="noopener noreferrer">
              <img
                // ✅ Logo URL logic same as Dashboard
                src={client.logo?.startsWith('http') ? client.logo : `${MEDIA_BASE}${client.logo}`}
                alt={client.name}
                className="w-[150px] border border-[#808080] bg-gray-500 rounded-md h-[80px] object-contain p-2"
              />
            </a>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};

export default OurClients;