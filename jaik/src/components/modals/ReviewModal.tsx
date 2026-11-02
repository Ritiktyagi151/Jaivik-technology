"use client";

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { FaStar } from 'react-icons/fa';
import { FaCircleXmark } from 'react-icons/fa6';
import "../../styles/enquire-form.css";
import { sendExternalLead } from '@/lib/externalLead';
// Yup validation schema
const schema = yup.object().shape({
    fname: yup.string().required('Full Name is required'),
    email: yup.string().email('Invalid email').required('Email is required'),
    cname: yup.string().required('Company Name is required'),
    rating: yup.number().min(1, 'Please select a rating').required('Rating is required'),
    msg: yup.string().required('Feedback is required'),
});

// Form data type
interface FormData {
    fname: string;
    email: string;
    cname: string;
    rating: number;
    msg: string;
}

const ReviewModal = ({ onClose }: { onClose: () => void }) => {
    const API_BASE = process.env.NEXT_PUBLIC_API_URL || "";

    const [hoveredRating, setHoveredRating] = useState<number | null>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitStatus, setSubmitStatus] = useState<{ success: boolean; message: string } | null>(null);

    const {
        register,
        handleSubmit,
        setValue,
        reset,
        watch,
        formState: { errors },
    } = useForm<FormData>({
        resolver: yupResolver(schema),
        defaultValues: {
            fname: '',
            email: '',
            cname: '',
            rating: 0,
            msg: '',
        },
    });

    const rating = watch('rating');

    const onSubmit = async (data: FormData) => {
        setIsSubmitting(true);
        setSubmitStatus(null);

        try {
            if (!API_BASE) {
                throw new Error("Review service is unavailable right now.");
            }

            sendExternalLead({
                formName: "review-form",
                sourcePage: "review-modal",
                ...data,
            });

            const response = await fetch(`${API_BASE}/reviews`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json",
                },
                body: JSON.stringify(data),
            });

            const result = await response.json().catch(() => null);

            if (!response.ok || !result?.success) {
                throw new Error(result?.message || "Failed to submit review.");
            }

            setSubmitStatus({ success: true, message: result?.message || "Your review has been submitted and is under review." });
            reset({
                fname: "",
                email: "",
                cname: "",
                rating: 0,
                msg: "",
            });
            setHoveredRating(null);
            setTimeout(() => {
                setSubmitStatus(null);
                onClose();
            }, 1200);
        } catch (error) {
            setSubmitStatus({
                success: false,
                message: error instanceof Error ? error.message : "Failed to submit review.",
            });
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleRatingClick = (value: number) => {
        setValue('rating', value, { shouldValidate: true });
    };

    return (
        <>
            <div
                className="fixed w-full top-0 left-0 h-screen flex items-center justify-center bg-black/70 z-[99999] opacity-100 visible scale-100 transition-all duration-500"
            >
                <div className="bg-main-secondary max-w-[500px] w-[90%] overflow-hidden">
                    <div className="flex justify-between items-center bg-main-red px-4 py-3">
                        <h3 className="text-white text-lg">Add Your Review</h3>
                        <div
                            className="text-white cursor-pointer hover:rotate-180 transition-transform duration-300"
                            onClick={onClose}
                        >
                            <FaCircleXmark className="text-[25px] font-light" />
                        </div>
                    </div>
                    <form onSubmit={handleSubmit(onSubmit)} className="p-5">
                        {submitStatus && (
                            <div className={`mb-4 rounded p-3 text-sm ${submitStatus.success ? "bg-green-500/20 text-green-400" : "bg-red-500/20 text-red-400"}`}>
                                {submitStatus.message}
                            </div>
                        )}
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
                            <div className="relative">
                                <div className="input-contain">
                                    <input
                                        type="text"
                                        id="fname"
                                        {...register('fname')}
                                        placeholder=" "
                                        required
                                        autoComplete="off"
                                        aria-label="Full Name"
                                    />
                                    <label htmlFor="fname" className="placeholder-text-2">
                                        FULL NAME
                                    </label>
                                </div>
                                {errors.fname && <p className="text-red-500 text-sm mt-1">{errors.fname.message}</p>}
                            </div>
                            <div className="relative">
                                <div className="input-contain">
                                    <input
                                        type="email"
                                        id="email"
                                        {...register('email')}
                                        placeholder=" "
                                        required
                                        autoComplete="off"
                                        aria-label="Email Address"
                                    />
                                    <label htmlFor="fname" className="placeholder-text-2">
                                        Email Address
                                    </label>
                                </div>
                                {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
                            </div>
                            <div className="relative col-span-1 lg:col-span-2">
                                <div className="input-contain">
                                    <input
                                        type="text"
                                        id="cname"
                                        {...register('cname')}
                                        placeholder=" "
                                        required
                                        autoComplete="off"
                                        aria-label="Company Name"
                                    />
                                    <label htmlFor="cname" className="placeholder-text-2">
                                        Company Name
                                    </label>
                                </div>
                                {errors.cname && <p className="text-red-500 text-sm mt-1">{errors.cname.message}</p>}
                            </div>
                            <div className="col-span-1 lg:col-span-2">
                                <div className="flex justify-between items-center">
                                    <p className="text-white">Your Rating</p>
                                    <div className="flex flex-row-reverse items-center border border-white pl-5 relative">
                                        <div
                                            className="absolute -left-5 top-0 w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center text-white text-[22px] border-2 border-white transition-all duration-400"
                                            style={{
                                                animation: rating === 5 ? 'pulse 0.4s ease-out' : 'none',
                                            }}
                                        >
                                            {hoveredRating || rating || 0}
                                        </div>
                                        {[5, 4, 3, 2, 1].map((value) => (
                                            <React.Fragment key={value}>
                                                <input
                                                    type="radio"
                                                    id={`rate${value}`}
                                                    {...register('rating')}
                                                    value={value}
                                                    className="hidden"
                                                    onChange={() => handleRatingClick(value)}
                                                />
                                                <label
                                                    htmlFor={`rate${value}`}
                                                    className="w-10 h-10 flex items-center justify-center cursor-pointer"
                                                    onMouseEnter={() => setHoveredRating(value)}
                                                    onMouseLeave={() => setHoveredRating(null)}
                                                >
                                                    <FaStar
                                                        className={`w-6 h-6 transition-transform duration-400 ${(hoveredRating && hoveredRating >= value) || (rating >= value && !hoveredRating)
                                                            ? 'opacity-100 scale-125 rotate-[10deg] text-yellow-600'
                                                            : 'opacity-50 scale-100 text-yellow-600'
                                                            }`}
                                                    />
                                                </label>
                                            </React.Fragment>
                                        ))}
                                    </div>
                                </div>
                                {errors.rating && <p className="text-red-500 text-sm mt-1">{errors.rating.message}</p>}
                            </div>
                            <div className="col-span-1 lg:col-span-2">
                                <textarea
                                    id="msg"
                                    {...register('msg')}
                                    rows={3}
                                    placeholder="Write Your Feedback"
                                    required
                                    autoComplete="off"
                                    className="w-full p-4 text-white border border-white bg-transparent focus:border-red-500 focus:outline-none placeholder-white"
                                />
                                {errors.msg && <p className="text-red-500 text-sm mt-1">{errors.msg.message}</p>}
                            </div>
                            <div className="col-span-1 lg:col-span-2">
                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="bg-main-red text-white px-4 py-2 cursor-pointer border-none outline-none font-semibold hover:scale-90 transition-transform duration-300"
                                >
                                    {isSubmitting ? "Sending..." : "Send Message"}
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
            <style>
                {`
          @keyframes pulse {
            0% {
              height: 40px;
              width: 40px;
              top: 0;
              left: 0;
              opacity: 1;
            }
            100% {
              height: 48px;
              width: 48px;
              top: -4px;
              left: -4px;
              opacity: 0;
            }
          }
        `}
            </style>
        </>
    );
};

export default ReviewModal;
