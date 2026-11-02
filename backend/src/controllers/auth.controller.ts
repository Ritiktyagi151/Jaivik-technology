import { Request, Response } from "express";
import jwt, { SignOptions } from "jsonwebtoken"; // SignOptions import kiya types ke liye
import { User } from "../models/user.model";
import logger from "../utils/logger";
import nodemailer from "nodemailer";

// JWT Token generate karne ka helper
const generateToken = (id: any): string => {
  // TypeScript ko batana padega ki secret string hi hai
  const secret = process.env.JWT_SECRET as string;
  
  const options: SignOptions = {
    expiresIn: (process.env.JWT_EXPIRES_IN as any) || "7d",
  };

  return jwt.sign({ id: id.toString() }, secret, options);
};

// --- LOGIN ---
export const login = async (req: Request, res: Response): Promise<any> => {
  try {
    const { email, password } = req.body;
    
    // User dhundna aur password select karna
    const user = await User.findOne({ email }).select("+password");
    
    if (!user || user.role !== "admin") {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    if (!user.isActive) {
      return res.status(401).json({ message: "Account is deactivated" });
    }

    // Password match check karna
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // Last login update karna
    user.lastLogin = new Date();
    await user.save();

    return res.json({
      success: true,
      data: { 
        _id: user._id, 
        name: user.name, 
        email: user.email, 
        token: generateToken(user._id) 
      },
    });
  } catch (error) {
    logger.error("Login error:", error);
    return res.status(500).json({ message: "Server error" });
  }
};

// --- FORGOT PASSWORD ---
export const forgotPassword = async (req: Request, res: Response): Promise<any> => {
  try {
    const { contact } = req.body; 
    
    const user = await User.findOne({ email: contact });

    if (!user) {
      return res.status(404).json({ message: "Admin not found with this email" });
    }

    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    user.resetOTP = otp;
    user.resetOTPExpires = new Date(Date.now() + 10 * 60 * 1000); 
    await user.save();

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: { 
        user: process.env.EMAIL_USER, 
        pass: process.env.EMAIL_PASS 
      },
    });

    await transporter.sendMail({
      to: user.email,
      subject: "Admin Password Reset OTP",
      text: `Your OTP for password reset is: ${otp}. It is valid for 10 minutes.`,
    });

    return res.json({ success: true, message: "OTP sent successfully to your email!" });
  } catch (error) {
    logger.error("Forgot password error:", error);
    return res.status(500).json({ message: "Failed to send OTP email." });
  }
};

// --- RESET PASSWORD ---
export const resetPasswordOTP = async (req: Request, res: Response): Promise<any> => {
  try {
    const { contact, otp, newPassword } = req.body;

    const user = await User.findOne({
      email: contact,
      resetOTP: otp,
      resetOTPExpires: { $gt: new Date() }, 
    });

    if (!user) {
      return res.status(400).json({ message: "Invalid or expired OTP" });
    }

    user.password = newPassword;
    user.resetOTP = undefined; 
    user.resetOTPExpires = undefined;
    await user.save();

    return res.json({ success: true, message: "Password reset successful! Please login." });
  } catch (error) {
    logger.error("Reset password error:", error);
    return res.status(500).json({ message: "Reset failed" });
  }
};

// --- REGISTER ---
export const register = async (req: Request, res: Response): Promise<any> => {
  try {
    const { name, email, password } = req.body;
    const adminExists = await User.findOne({ role: "admin" });
    if (adminExists) {
      return res.status(400).json({ message: "Admin account already exists" });
    }
    const user = await User.create({ name, email, password, role: "admin" });
    return res.status(201).json({ 
      success: true, 
      data: { 
        name: user.name, 
        email: user.email, 
        token: generateToken(user._id) 
      } 
    });
  } catch (error) {
    return res.status(500).json({ message: "Server error" });
  }
};

// --- GET ME ---
export const getMe = async (req: Request, res: Response): Promise<any> => {
  try {
    const user = await User.findById((req as any).user.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    return res.json({ success: true, data: user });
  } catch (error) {
    return res.status(500).json({ message: "Server error" });
  }
};

// --- LOGOUT ---
export const logout = async (req: Request, res: Response): Promise<any> => {
  return res.json({ success: true, message: "Logged out successfully" });
};