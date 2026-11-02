import { Request, Response } from "express";
import Post from "../models/post.model";
import { v2 as cloudinary } from "cloudinary";

// Cloudinary config (Isse aap .env se connect karein)
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});

export const getPosts = async (req: Request, res: Response) => {
  try {
    const posts = await Post.find().sort({ createdAt: -1 });
    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json({ message: "Error fetching posts", error });
  }
};

export const createPost = async (req: Request, res: Response) => {
  try {
    const { image } = req.body; // Image URL ya Base64 string
    let imageUrl = image;
    let publicId = "";

    if (image.startsWith("data:image")) {
      const uploadRes = await cloudinary.uploader.upload(image, {
        folder: "jaikvik_posts",
      });
      imageUrl = uploadRes.secure_url;
      publicId = uploadRes.public_id;
    }

    const newPost = new Post({ imageUrl, publicId });
    await newPost.save();
    res.status(201).json(newPost);
  } catch (error) {
    res.status(400).json({ message: "Post creation failed", error });
  }
};

export const updatePost = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { image } = req.body;
    let updateData: any = { imageUrl: image };

    if (image.startsWith("data:image")) {
      const uploadRes = await cloudinary.uploader.upload(image, { folder: "jaikvik_posts" });
      updateData = { imageUrl: uploadRes.secure_url, publicId: uploadRes.public_id };
    }

    const updatedPost = await Post.findByIdAndUpdate(id, updateData, { new: true });
    res.status(200).json(updatedPost);
  } catch (error) {
    res.status(400).json({ message: "Update failed", error });
  }
};

export const deletePost = async (req: Request, res: Response) => {
  try {
    const post = await Post.findById(req.params.id);
    if (post?.publicId) {
      await cloudinary.uploader.destroy(post.publicId);
    }
    await Post.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Post deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Delete failed", error });
  }
};