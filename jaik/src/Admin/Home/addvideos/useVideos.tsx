"use client";

import { useState, useCallback } from "react";
import type { Video } from "./video";
import initialVideos from "../../../configs/all-videos";

type VideoFormData = Omit<Video, "id">;

export const useVideos = () => {
  const [videos, setVideos] = useState<Video[]>(() =>
    initialVideos.map((video, index) => ({
      ...video,
      id: `video-${index}`,
      // Clean up poster paths by removing extra spaces
      poster: video.poster.trim(),
    }))
  );

  const createVideo = useCallback((newVideo: VideoFormData) => {
    const videoWithId: Video = {
      ...newVideo,
      id: `video-${Date.now()}`,
      poster: newVideo.poster?.trim() || "",
    };
    setVideos((prevVideos) => [...prevVideos, videoWithId]);
    return videoWithId;
  }, []);

  const updateVideo = useCallback((id: string, updatedVideo: VideoFormData) => {
    setVideos((prevVideos) =>
      prevVideos.map((video) =>
        video.id === id
          ? {
              ...video,
              ...updatedVideo,
              poster: updatedVideo.poster?.trim() || video.poster,
            }
          : video
      )
    );
    // Return the updated video directly instead of searching the array again
    return { id, ...updatedVideo };
  }, []);

  const deleteVideo = useCallback((id: string) => {
    setVideos((prevVideos) => prevVideos.filter((video) => video.id !== id));
  }, []);

  const getVideoById = useCallback(
    (id: string) => {
      return videos.find((video) => video.id === id);
    },
    [videos]
  );

  return {
    videos,
    createVideo,
    updateVideo,
    deleteVideo,
    getVideoById,
  };
};
