"use client";

import React, { useEffect, useRef } from 'react';
import { FaPlay, FaTimes } from 'react-icons/fa';
interface VideoItemProps {
    id?: string;
    label: string;
    teaserSrc: string;
    fullSrc: string;
    title: string;
    description: string;
}

const VideoItem: React.FC<VideoItemProps> = ({ id, label, teaserSrc, fullSrc, title, description }) => {
    const teaserVideoRef = useRef<HTMLVideoElement>(null);
    const fullVideoRef = useRef<HTMLVideoElement>(null);
    const expandedVideoRef = useRef<HTMLVideoElement>(null);
    const expandedContainerRef = useRef<HTMLDivElement>(null);
    const errorMessageRef = useRef<HTMLDivElement>(null);

    const showError = (message: string) => {
        if (errorMessageRef.current) {
            errorMessageRef.current.textContent = message;
            errorMessageRef.current.style.display = 'block';
            setTimeout(() => {
                if (errorMessageRef.current) errorMessageRef.current.style.display = 'none';
            }, 3000);
        }
    };

    const playVideoWithSound = (video: HTMLVideoElement | null) => {
        if (video) {
            video.muted = false;
            video.play().catch(() => {
                video.muted = true;
                video.play().catch(err => console.error('Playback failed:', err));
            });
        }
    };

    const muteAndLoopVideo = (video: HTMLVideoElement | null) => {
        if (video) {
            video.muted = true;
            video.loop = true;
            video.play().catch(err => console.error('Loop playback failed:', err));
        }
    };

    const openFullscreen = () => {
        if (!fullSrc) {
            showError('No video source available');
            return;
        }
        if (expandedContainerRef.current && expandedVideoRef.current) {
            expandedContainerRef.current.style.display = 'flex';
            expandedContainerRef.current.classList.add('loading');
            expandedVideoRef.current.src = fullSrc;
            expandedVideoRef.current.muted = false;
            expandedVideoRef.current.controls = true;

            expandedVideoRef.current.play().catch(() => {
                showError('Playback failed');
                expandedVideoRef.current!.muted = true;
                expandedVideoRef.current!.play().catch(() => showError('Muted playback failed'));
            });
        }
    };

    const closeFullscreen = () => {
        if (expandedContainerRef.current && expandedVideoRef.current) {
            expandedVideoRef.current.pause();
            expandedVideoRef.current.src = '';
            expandedContainerRef.current.style.display = 'none';
            expandedContainerRef.current.classList.remove('loading');
        }
    };

    useEffect(() => {
        const teaserVideo = teaserVideoRef.current;
        // const fullVideo = fullVideoRef.current;
        const expandedVideo = expandedVideoRef.current;
        const expandedContainer = expandedContainerRef.current;

        if (!fullSrc || !teaserVideo) {
            showError('Video source missing');
            return;
        }

        muteAndLoopVideo(teaserVideo);

        if (expandedVideo && expandedContainer) {
            expandedVideo.onended = () => {
                expandedContainer.style.display = 'none';
                expandedVideo.src = '';
                expandedContainer.classList.remove('loading');
            };
            expandedVideo.addEventListener('loadstart', () => expandedContainer.classList.add('loading'));
            expandedVideo.addEventListener('canplay', () => expandedContainer.classList.remove('loading'));
            expandedVideo.addEventListener('error', () => showError('Failed to load video'));

            const handleKeydown = (e: KeyboardEvent) => {
                if (e.key === 'Escape' && expandedContainer.style.display === 'flex') {
                    closeFullscreen();
                }
            };

            document.addEventListener('keydown', handleKeydown);
            return () => document.removeEventListener('keydown', handleKeydown);
        }
    }, [fullSrc]);

    return (
        <>
            <div
                id={id}
                className="relative w-full h-[clamp(200px,40vw,400px)] rounded-lg overflow-hidden transition-all duration-400 ease-[cubic-bezier(0.25,0.8,0.25,1)] shadow-[0_8px_25px_rgba(0,0,0,0.2)] bg-black group"
                onMouseEnter={() => window.innerWidth > 768 && playVideoWithSound(teaserVideoRef.current)}
                onMouseLeave={() => window.innerWidth > 768 && muteAndLoopVideo(teaserVideoRef.current)}
                onTouchStart={e => {
                    e.preventDefault();
                    openFullscreen();
                }}
                onClick={e => {
                    if (e.target !== document.querySelector('.start-button')) openFullscreen();
                }}
            >
                <span className="absolute top-4 right-4 bg-[#ff4d4d] text-white px-2.5 py-1 rounded-full text-[clamp(10px,1.2vw,12px)] font-semibold uppercase z-10 transition-all duration-400 ease-[cubic-bezier(0.25,0.8,0.25,1)] group-hover:opacity-0">
                    {label}
                </span>
                <video
                    ref={teaserVideoRef}
                    className="absolute inset-0 w-full h-full object-cover z-[2]"
                    loop
                    playsInline
                    muted
                >
                    <source src={teaserSrc} type="video/mp4" />
                </video>
                <video ref={fullVideoRef} className="absolute inset-0 w-full h-full object-cover z-[1]" playsInline>
                    <source src={fullSrc} type="video/mp4" />
                </video>
                <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-b from-transparent to-[rgba(0,0,0,0.8)] text-white z-[3] transition-all duration-400 ease-[cubic-bezier(0.25,0.8,0.25,1)] group-hover:opacity-0">
                    <h3 className="text-[clamp(14px,2vw,18px)] font-semibold mb-1 text-shadow-[0_2px_5px_rgba(0,0,0,0.5)]">
                        {title}
                    </h3>
                    <p className="text-[clamp(12px,1.5vw,14px)]">{description}</p>
                </div>
                <div
                    className="start-button absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60px] h-[60px] bg-[rgba(255,77,77,0.8)] rounded-full flex items-center justify-center z-[5] opacity-100 transition-all duration-400 ease-[cubic-bezier(0.25,0.8,0.25,1)] cursor-pointer group-hover:opacity-0"
                    role="button"
                    aria-label="Play video"
                    onClick={e => {
                        e.stopPropagation();
                        openFullscreen();
                    }}
                >
                    <FaPlay className="text-white text-2xl ml-0.5" />
                </div>
                <div ref={errorMessageRef} className="hidden text-white text-center p-5 bg-[rgba(255,77,77,0.8)] rounded-lg">
                    Video failed to load
                </div>
            </div>
            <div
                ref={expandedContainerRef}
                className="fixed inset-0 bg-black z-[1000] hidden justify-center items-center before:content-['Loading...'] before:absolute before:top-1/2 before:left-1/2 before:-translate-x-1/2 before:-translate-y-1/2 before:text-white before:text-lg before:hidden data-[loading=true]:before:block"
                data-loading="false"
            >
                <span
                    className="absolute top-4 right-4 text-white text-2xl cursor-pointer z-[1001] bg-[rgba(0,0,0,0.5)] w-[35px] h-[35px] rounded-full flex items-center justify-center"
                    role="button"
                    aria-label="Close fullscreen"
                    onClick={closeFullscreen}
                >
                    <FaTimes />
                </span>
                <video ref={expandedVideoRef} controls className="max-w-full max-h-full object-contain">
                    <source src={fullSrc} type="video/mp4" />
                    Your browser does not support the video tag.
                </video>
                <div className="hidden text-white text-center p-5 bg-[rgba(255,77,77,0.8)] rounded-lg">
                    Video failed to load
                </div>
            </div>
        </>
    );
};

export default VideoItem;