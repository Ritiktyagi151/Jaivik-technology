"use client";

import type React from "react"
import HoverEffectButton from "../buttons/HoverEffectButton";
import { useState } from "react";
const ServiceSectionCard: React.FC<{
    title: string;
    description: string;
    image: string;
}> = ({
    title = "",
    description = "",
    image = "",
}) => {
        const [isFullText, setIsFullText] = useState<boolean>(false);

        return <>
            <div className="flex flex-col md:flex-row gap-8 bg-main-secondary p-10 rounded-xl shadow-lg transition-all duration-1000 jt-content-block">
                <div className="flex-1 flex flex-col h-full w-full justify-start items-start">
                    <h3 className="relative text-xl sm:text-2xl border-b-2 pb-2 border-solid border-b-red-600 font-semibold mb-6 translate-y-8 transition-all duration-800 jt-section-heading">{title}</h3>
                    <p className="mt-6 leading-relaxed text-gray-300 font-light">
                        {(isFullText ? description : (description.substring(0, 1000) + '...')) || "Our CRM solutions empower businesses to manage customer relationships effectively, streamline operations, and drive growth. With advanced analytics, automation, and seamless integrations, Jaivik Technology delivers tailored solutions to meet your unique needs."}
                    </p>
                    <HoverEffectButton onClick={() => setIsFullText(!isFullText)}>
                        {
                            isFullText ? 'Read Less': 'Read More'
                        }
                    </HoverEffectButton>
                </div>
                <img
                    src={image || ""}
                    alt={`${title} Illustration`}
                    className="w-full max-w-[550px] max-h-[450px] rounded-xl brightness-75 contrast-110 hover:brightness-100 hover:scale-105 transition-all duration-500"
                />
            </div>
        </>
    }

export default ServiceSectionCard;